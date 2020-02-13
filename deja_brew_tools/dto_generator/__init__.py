import inspect
from dataclasses import dataclass
from enum import Enum
from os import path
from pprint import pprint
from typing import List, Optional, Any, Set

from marshmallow import Schema, fields
from marshmallow_enum import EnumField

from deja_brew_tools.dto_generator.enum import DtoEnumMember, enum_tmpl, DtoEnum
from deja_brew_tools.dto_generator.service_object import DtoSchemaField, service_object_tmpl, \
    DtoSchema


@dataclass(frozen=True)
class JsType:
    impl: str
    symbol: str
    # Module where the type originated (if applicable)
    module: Optional[Any] = None


@dataclass(frozen=True)
class JsDependency:
    symbol: str
    module_path: str

    @staticmethod
    def ofType(typ: JsType):
        module_path = get_js_module_path(typ.module)
        return JsDependency(typ.symbol, module_path)

PRECONDITIONS = JsDependency('UnreachableError', 'base/preconditions')


def get_js_module_path(module) -> str:
    name = module.__name__.split('.')[-1]
    return '{}/{}'.format(
        module.FRONTEND_PACKAGE.replace('.', '/'),
        '{}'.format(name),
    )

class DtoGenerator():
    def __init__(self, frontend_src_root: str):
        self._frontend_src_root = frontend_src_root

    def generate(self, input_module):
        module_members = inspect.getmembers(input_module)
        module_members = filter(is_in_module(input_module), module_members)
        module_members = filter(any_fn(is_enum, is_schema, key=by_impl), module_members)
        module_members = sorted(module_members, key=by_linenno)

        deps = set()
        output = ""

        for name, impl in module_members:
            if is_enum(impl):
                rendered = self._render_enum(impl)
                output += rendered
                deps.add(PRECONDITIONS)

            if is_schema(impl):
                rendered, schema_deps = self._render_schema(input_module, impl)
                output += rendered
                for dep in schema_deps:
                    deps.add(JsDependency.ofType(dep))

        imports = self._render_imports(deps)
        output = PREAMBLE + imports + output

        module_path = get_js_module_path(input_module)
        output_path = path.join(self._frontend_src_root, module_path + '.ts')
        with open(output_path, 'w') as fh:
            fh.write(output)



    def _render_schema(self, curr_module, Cls: Schema) -> [str, List[JsType]]:
        fields = []
        deps = []
        for field_name, field_impl in Cls().fields.items():
            field_type = jsTypeOf(field_impl)
            fields.append(
                DtoSchemaField(
                    name=camelcase(field_name),
                    js_type=field_type.impl,
                    optional=not field_impl.required
                )
            )
            if field_type.module is not None and field_type.module != curr_module:
                deps.append(field_type)

        return (
            service_object_tmpl.render(dict(
                service_object=DtoSchema(
                    name=Cls.__name__,
                    fields=fields,
                )
            )),
            deps
        )

    def _render_enum(self, Cls: Enum) -> [str]:
        members = []
        for member in Cls:
            members.append(DtoEnumMember(name=member.name, value=member.value))

        return enum_tmpl.render(dict(
            enum=DtoEnum(name=Cls.__name__, members=members)
        ))

    def _render_imports(self, deps: Set[JsDependency]):
        output = ''
        unique_deps = set(deps)
        for dep in unique_deps:
            output += "import { %s } from '%s';\n" % (
                dep.symbol,
                dep.module_path
            )

        return output



def is_in_module(module):
    def inner(value):
        _, impl = value
        return hasattr(impl, '__module__') and impl.__module__ == module.__name__
    return inner


def is_schema(impl):
    return issubclass(impl, Schema)

def is_enum(impl):
    return issubclass(impl, Enum)

def any_fn(*fns, key=None):
    if key is None:
        key = lambda x: x

    def inner(*args, **kwargs):
        return any(fn(key(*args,**kwargs)) for fn in fns)

    return inner

def by_impl(value):
    _, impl = value
    return impl

def by_linenno(value):
    _, impl = value
    return inspect.findsource(impl)[1]


def jsTypeOf(field: fields.Field) -> JsType:
    if isinstance(field, fields.String):
        return JsType('string', 'string')
    elif isinstance(field, fields.Boolean):
        return JsType('boolean', 'boolean')
    elif isinstance(field, fields.Integer):
        return JsType('number', 'number')
    elif isinstance(field, fields.Nested):
        if isinstance(field.nested, str):
            # TODO(NW): Consult with class registry...
            return JsType(field.nested, field.nested)
        else:
            return JsType(field.nested.__name__, field.nested.__name__, module=inspect.getmodule(field.nested))
    elif isinstance(field, fields.List):
        inner_type = jsTypeOf(field.inner)
        return JsType(inner_type.impl + '[]', inner_type.impl, inner_type.module)
    elif isinstance(field, EnumField):
        return JsType(field.enum.__name__, field.enum.__name__, module=inspect.getmodule(field.enum))

    raise NotImplementedError("Unknown field type: ", type(field))

PREAMBLE = '// @formatter:off\n'

def camelcase(s):
    parts = iter(s.split("_"))
    return next(parts) + "".join(i.title() for i in parts)

