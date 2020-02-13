from typing import NamedTuple, List

from jinja2 import Template


class DtoSchema(NamedTuple):
    name: str
    fields: List['DtoSchemaField']


class DtoSchemaField(NamedTuple):
    name: str
    js_type: str
    optional: bool


service_object_tmpl = Template('''
export class {{ service_object.name }} {
  {%- for field in service_object.fields %}
  readonly {{ field.name }}: {{ field.js_type }}{{ ' | undefined' if not field.optional else '' }};
  {%- endfor %}
  constructor({
    {%- for field in service_object.fields %}
    {{ field.name }},
    {%- endfor %}  
  }: {
    {%- for field in service_object.fields %}
    {{ field.name }}{{ '?' if not field.optional else '' }}: {{ field.js_type }},
    {%- endfor %}  
  }) {
    {%- for field in service_object.fields %}
    this.{{ field.name }} = {{ field.name }};
    {%- endfor %}
  }
  
  static deserialize(o: any): {{ service_object.name }} {
    return new {{ service_object.name }}({
      {%- for field in service_object.fields %}
      {{ field.name }}: o['{{ field.name }}'],
      {%- endfor %}  
    })
  }
  
  static serialize(o: {{ service_object.name }}): object {
    return {
      {%- for field in service_object.fields %}
      '{{ field.name }}': o.{{ field.name }},
      {%- endfor %}  
    }
  }
}

''')
