import inspect
from dataclasses import dataclass
from typing import NamedTuple, List, Optional, Any

import marshmallow_enum
from jinja2 import Template
from marshmallow import fields


class DtoSchema(NamedTuple):
    name: str
    fields: List['Field']


@dataclass(frozen=True)
class Field:
    name: str
    required: bool

    @property
    def _modifier(self):
        return 'required' if self.required else 'optional'

    @property
    def type(self):
        raise NotImplementedError()

    @property
    def deserializer(self) -> str:
        raise NotImplementedError()

    @property
    def serializer(self) -> str:
        raise NotImplementedError()


@dataclass(frozen=True)
class ObjectField(Field):
    impl: str
    # Module where the type originated (if applicable)
    module: Optional[Any] = None

    @property
    def type(self):
        return f'{self.impl}'

    @property
    def deserializer(self) -> str:
        return f"Deserialization.{self._modifier}Object({self.impl}.deserialize, o, '{self.name}')"

    @property
    def serializer(self) -> str:
        return f"Serialization.{self._modifier}Object({self.impl}.serialize, o.{self.name})"


@dataclass(frozen=True)
class EnumField(Field):
    impl: str
    # Module where the type originated (if applicable)
    module: Optional[Any] = None

    @property
    def type(self):
        return f'{self.impl}'

    @property
    def deserializer(self) -> str:
        return f"Deserialization.{self._modifier}Enum({self.impl}Util.deserialize, o, '{self.name}')"

    @property
    def serializer(self) -> str:
        return f"Serialization.{self._modifier}Enum({self.impl}Util.serialize, o.{self.name})"


@dataclass(frozen=True)
class StringField(Field):
    @property
    def type(self):
        return f'string'

    @property
    def deserializer(self) -> str:
        return f"Deserialization.{self._modifier}String(o, '{self.name}')"

    @property
    def serializer(self) -> str:
        return f"o.{self.name}"


@dataclass(frozen=True)
class NumberField(Field):
    @property
    def type(self):
        return f'number'

    @property
    def deserializer(self) -> str:
        return f"Deserialization.{self._modifier}Number(o, '{self.name}')"

    @property
    def serializer(self) -> str:
        return f"o.{self.name}"


@dataclass(frozen=True)
class BoolField(Field):
    @property
    def type(self):
        return f'boolean'

    @property
    def deserializer(self) -> str:
        return f"Deserialization.{self._modifier}Boolean(o, '{self.name}')"

    @property
    def serializer(self) -> str:
        return f"o.{self.name}"


@dataclass(frozen=True)
class ListField(Field):
    inner: Field

    @property
    def type(self):
        return f'{self.inner.type}[]'

    @property
    def deserializer(self) -> str:
        if isinstance(self.inner, EnumField):
            return f"Deserialization.repeatedEnum({self.inner.impl}Util.deserialize, o, '{self.name}')"
        elif isinstance(self.inner, ObjectField):
            return f"Deserialization.repeatedObject({self.inner.impl}.deserialize, o, '{self.name}')"
        elif isinstance(self.inner, BoolField):
            return f"Deserialization.repeatedBoolean(o, '{self.name}')"
        elif isinstance(self.inner, StringField):
            return f"Deserialization.repeatedString(o, '{self.name}')"
        elif isinstance(self.inner, NumberField):
            return f"Deserialization.repeatedNumber(o, '{self.name}')"
        else:
            raise NotImplementedError()

    @property
    def serializer(self) -> str:
        if isinstance(self.inner, EnumField):
            return f"Serialization.repeatedEnum({self.inner.impl}Util.serialize, o.{self.name})"
        elif isinstance(self.inner, ObjectField):
            return f"Serialization.repeatedObject({self.inner.impl}.serialize, o.{self.name})"
        else:
            return f"o.{self.name}"


def camelcase(s):
    parts = iter(s.split("_"))
    return next(parts) + "".join(i.title() for i in parts)


def fieldOf(field: fields.Field) -> Field:
    field_name = camelcase(field.name)
    if isinstance(field, fields.String):
        return StringField(name=field_name, required=field.required)
    elif isinstance(field, fields.Boolean):
        return BoolField(name=field_name, required=field.required)
    elif isinstance(field, fields.Integer):
        return NumberField(name=field_name, required=field.required)
    elif isinstance(field, fields.Nested):
        if isinstance(field.nested, str):
            # TODO(NW): Consult with class registry so we can resolve cross package
            #  dependencies
            return ObjectField(
                name=field_name,
                required=field.required,
                impl=field.nested,
                module=None
            )
        else:
            return ObjectField(
                name=field_name,
                required=field.required,
                impl=field.nested.__name__,
                module=inspect.getmodule(field.nested)
            )
    elif isinstance(field, fields.List):
        return ListField(
            name=field_name,
            required=True,
            inner=fieldOf(field.inner)
        )
    elif isinstance(field, marshmallow_enum.EnumField):
        return EnumField(
            name=field_name,
            required=field.required,
            impl=field.enum.__name__,
            module=inspect.getmodule(field.enum),
        )

    raise NotImplementedError("Unknown field type: ", type(field))


service_object_tmpl = Template('''
export class {{ service_object.name }} {
  {%- for field in service_object.fields %}
  readonly {{ field.name }}: {{ field.type }}{{ ' | undefined' if not field.required else '' }};
  {%- endfor %}
  constructor({
    {%- for field in service_object.fields %}
    {{ field.name }},
    {%- endfor %}  
  }: {
    {%- for field in service_object.fields %}
    {{ field.name }}{{ '?' if not field.required else '' }}: {{ field.type }},
    {%- endfor %}  
  }) {
    {%- for field in service_object.fields %}
    this.{{ field.name }} = {{ field.name }};
    {%- endfor %}
  }
  
  static deserialize(o: any): {{ service_object.name }} {
    return new {{ service_object.name }}({
      {%- for field in service_object.fields %}
      {{ field.name }}: {{ field.deserializer }},
      {%- endfor %}  
    })
  }
  
  static serialize(o: {{ service_object.name }}): object {
    return {
      {%- for field in service_object.fields %}
      '{{ field.name }}': {{ field.serializer }},
      {%- endfor %}  
    }
  }
}

''')
