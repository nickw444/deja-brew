from typing import NamedTuple, List

from jinja2 import Template


class ServiceObject(NamedTuple):
    name: str
    fields: List['Field']


class Field(NamedTuple):
    name: str
    type: str
    required: bool


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
