import json
from dataclasses import dataclass
from typing import Dict, List


@dataclass
class AssetManifest():
    files: Dict[str, str]
    entrypoints: List[str]


class AssetManifestSupplier():
    def __init__(self, asset_manifest_path: str):
        self._manifest = AssetManifest(**json.load(open(asset_manifest_path, 'r')))

    def get(self):
        return self._manifest
