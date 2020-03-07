import sqlalchemy as sa

from .base import Base
from .id_generator import IdGenerator


class Cafe(Base):
    """
    Represents a Cafe within the system.

    For the time being, it is expected that there will only ever be a single row in this
    table.

    In the future we could extend support to make the deployment multi-tenanted to support
    many different, independent cafes.
    """

    __tablename__ = 'cafe'

    _id = sa.Column(sa.Integer(), primary_key=True)
    id = sa.Column(sa.String(63), unique=True, default=IdGenerator('C'))

    accepting_orders = sa.Column(sa.Boolean(), nullable=False)
