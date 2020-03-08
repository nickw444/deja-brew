from functools import lru_cache
from os import path


@lru_cache
def get_version() -> str:
    version_file_path = path.join(path.dirname(__file__), "version.txt")
    if path.exists(version_file_path):
        with open(version_file_path) as f:
            return f.read().strip()

    return "unknown"
