import datetime
import typing

import marshmallow
from marshmallow import Schema
from werkzeug.datastructures import ImmutableMultiDict


def camelcase(s):
    parts = iter(s.split("_"))
    return next(parts) + "".join(i.title() for i in parts)


class CamelCaseSchema(Schema):
    """Schema that uses camel-case for its external representation
    and snake-case for its internal representation.
    """

    def on_bind_field(self, field_name, field_obj):
        field_obj.data_key = camelcase(field_obj.data_key or field_name)

        # Force omitted optional fields to be populated so they can be directly
        # accessed, i.e. `if data['foo'] == None`
        if not field_obj.required:
            field_obj.missing = None


class List(marshmallow.fields.List):
    """
    A List field type that supports deserialization from MultiDict structures.
    """

    def _deserialize(self, value, attr, data, **kwargs) -> typing.List[typing.Any]:
        if isinstance(data, ImmutableMultiDict):
            value = data.getlist(attr)
        return super()._deserialize(value, attr, data, **kwargs)


class Timestamp(marshmallow.fields.Integer):
    """
    A field which can serialize and deserialize a native python Datetime to an
    integer UTC timestamp.

    TODO(NW): Make sure this correctly handles UTC datetimes...
    """

    def _deserialize(self, value, attr, data, **kwargs):
        value = super(Timestamp, self)._deserialize(value, attr, data, **kwargs)
        if value is not None:
            return datetime.datetime.fromtimestamp(value)

    def _serialize(self, value, attr, obj, **kwargs):
        if value is not None:
            value = value.timestamp()
        return super(Timestamp, self)._serialize(value, attr, obj, **kwargs)
