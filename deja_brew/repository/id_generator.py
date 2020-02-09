import datetime
import random
import string
import struct
from base64 import urlsafe_b64encode

EPOCH = datetime.datetime(year=2020, month=1, day=1, hour=0, minute=0, second=0).timestamp()
B64_ALPHA = string.ascii_uppercase + string.ascii_lowercase


class IdGenerator():
    """
    64      58                            34
    |xxxx xx|xxxx xxxx xxxx xxxx xxxx xxxx|xxxxxxxx xxxxxxxx xxxxxxxx xxxxxxxxxx xx|
    |prefix|timestamp                     |random
    """

    def __init__(self, prefix: str):
        self._prefix = prefix
        self._prefix_mask = B64_ALPHA.index(prefix) << (64 - 6)

    def __call__(self):
        data = self._prefix_mask
        data |= (int(datetime.datetime.now().timestamp() - EPOCH) & 0xffffff) << 34
        data |= random.getrandbits(34)

        bytes = struct.pack('>Q', data)
        return urlsafe_b64encode(bytes).decode('utf-8').strip('=')
