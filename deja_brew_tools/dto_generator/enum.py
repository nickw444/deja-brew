from typing import NamedTuple, List

from jinja2 import Template


class Enum(NamedTuple):
    name: str
    members: List['Member']


class Member(NamedTuple):
    name: str
    value: str


enum_tmpl = Template('''
export enum {{ enum.name }} {
  {%- for member in enum.members %}
  {{ member.name }} = '{{ member.name }}',
  {%- endfor %}
}

export const {{ enum.name}}Util = {
  deserialize(value: string): {{ enum.name }} {
    switch(value) {
      {%- for member in enum.members %}
      case '{{ member.name }}': return {{ enum.name }}.{{ member.name }};
      {%- endfor %}
      default: throw new Error('Unknown value: ' + value)
    }
  },
  serialize(value: {{ enum.name }}): string {
    switch(value) {
      {%- for member in enum.members %}
      case {{ enum.name }}.{{ member.name }}: return '{{ member.name }}';
      {%- endfor %}
      default: throw new UnreachableError(value)
    } 
  },
  values(): {{ enum.name}}[] {
    return [
      {%- for member in enum.members %}
      {{ enum.name }}.{{ member.name }},
      {%- endfor %}
    ]
  }
};

''')
