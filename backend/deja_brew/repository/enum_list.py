import sqlalchemy as sa


class EnumList(sa.TypeDecorator):
    """
    Adds support for storing and retrieving a list of enum entries
    """

    impl = sa.String(255)

    def __init__(self, enumtype, *args, **kwargs):
        super(EnumList, self).__init__(*args, **kwargs)
        self._enumtype = enumtype

    def process_bind_param(self, value, dialect):
        if value:
            return ",".join([x.name for x in value])

        return ""

    def process_result_value(self, value, dialect):
        if value:
            return [self._enumtype[x] for x in value.split(",")]
        return []
