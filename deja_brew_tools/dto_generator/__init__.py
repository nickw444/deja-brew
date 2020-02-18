import inspect
from dataclasses import dataclass
from enum import Enum
from itertools import groupby
from os import path
from typing import List, Set, Union

from marshmallow import Schema

from deja_brew_tools.dto_generator.enum import DtoEnumMember, enum_tmpl, DtoEnum
from deja_brew_tools.dto_generator.service_object import service_object_tmpl, \
    DtoSchema, fieldOf, ObjectField, EnumField, Field


@dataclass(frozen=True)
class JsDependency:
    symbol: str
    module_path: str

    @staticmethod
    def ofField(field: Union[ObjectField, EnumField]):
        module_path = get_js_module_path(field.module)
        return JsDependency(field.impl, module_path)


PRECONDITIONS = JsDependency('UnreachableError', 'base/preconditions')
SERIALIZATION = JsDependency('Serialization', 'base/serialization')
DESERIALIZATION = JsDependency('Deserialization', 'base/deserialization')


def get_js_module_path(module) -> str:
    name = module.__name__.split('.')[-1]
    return path.join(
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
                    deps.add(dep)

                deps.add(SERIALIZATION)
                deps.add(DESERIALIZATION)

        imports = self._render_imports(deps)
        output = PREAMBLE + imports + output

        module_path = get_js_module_path(input_module)
        output_path = path.join(self._frontend_src_root, module_path + '.ts')
        with open(output_path, 'w') as fh:
            fh.write(output)

    def _render_schema(self, curr_module, Cls: Schema) -> [str, List[JsDependency]]:
        fields = []
        deps = []
        for field_name, field_impl in sorted(Cls().fields.items(), key=lambda x: x[0]):
            field = fieldOf(field_impl)
            fields.append(field)
            if isinstance(field, (EnumField, ObjectField)):
                if field.module is not None and field.module != curr_module:
                    deps.append(JsDependency.ofField(field))

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
        grouped_deps = groupby(deps, key=lambda d: d.module_path)
        for path, deps in grouped_deps:
            symbols = ', '.join([dep.symbol for dep in deps])
            output += "import { %s } from '%s';\n" % (
                symbols,
                path
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
        return any(fn(key(*args, **kwargs)) for fn in fns)

    return inner


def by_impl(value):
    _, impl = value
    return impl


def by_linenno(value):
    _, impl = value
    return inspect.findsource(impl)[1]


PREAMBLE = '// @formatter:off\n'
