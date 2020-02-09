from typing import List, Tuple

from marshmallow import Schema, fields
from marshmallow_enum import EnumField

from deja_brew_tools.dto_generator.enum import Enum, Member, enum_tmpl
from deja_brew_tools.dto_generator.service_object import ServiceObject, Field, service_object_tmpl


class DtoGenerator():
    def __init__(self):
        pass

    def parse_module(self, module) -> Tuple[List[ServiceObject], List[Enum]]:
        service_objects = []
        enums_to_process = set()

        for name, impl in module.__dict__.items():
            if not hasattr(impl, '__module__') or impl.__module__ != module.__name__:
                # Exclude members which are not originally declared in the provided module
                continue

            if not issubclass(impl, Schema):
                # Exclude members which are no marshmallow schema objects
                continue

            so_fields = []
            for field_name, field_impl in impl().fields.items():
                so_fields.append(
                    Field(
                        name=camelcase(field_name),
                        type=jsTypeOf(field_impl),
                        required=field_impl.required
                    )
                )
                if isinstance(field_impl, EnumField):
                    enums_to_process.add(field_impl.enum)
                elif isinstance(field_impl, fields.Nested) \
                    and isinstance(field_impl.nested, EnumField):
                    enums_to_process.add(field_impl.nested.enum)
                elif isinstance(field_impl, fields.List) \
                    and isinstance(field_impl.inner, EnumField):
                    enums_to_process.add(field_impl.inner.enum)

            service_objects.append(ServiceObject(name=name, fields=so_fields))

        enums = []
        for enum in enums_to_process:
            members = []
            for member in enum:
                members.append(Member(name=member.name, value=member.value))

            enums.append(Enum(name=enum.__name__, members=members))

        return service_objects, enums

    def generate(self, input_module, output_path):
        output = ''
        output += preamble

        service_objects, enums  = self.parse_module(input_module)
        for enum in enums:
            output += enum_tmpl.render(dict(enum=enum))

        for service_object in service_objects:
            output += service_object_tmpl.render(dict(service_object=service_object))

        with open(output_path, 'w') as f:
            f.write(output)


def jsTypeOf(field: fields.Field) -> str:
    if isinstance(field, fields.String):
        return 'string'
    elif isinstance(field, fields.Nested):
        return field.nested.__name__
    elif isinstance(field, fields.List):
        return jsTypeOf(field.inner) + '[]'
    elif isinstance(field, EnumField):
        return field.enum.__name__
    elif isinstance(field, fields.Boolean):
        return 'boolean'
    elif isinstance(field, fields.Integer):
        return 'number'

    raise NotImplementedError("Unknown field type: ", type(field))

preamble = '''// @formatter:off
import {
  UnreachableError
} from 'base/preconditions'
'''

def camelcase(s):
    parts = iter(s.split("_"))
    return next(parts) + "".join(i.title() for i in parts)

