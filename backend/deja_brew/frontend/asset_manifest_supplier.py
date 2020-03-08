import json
from abc import ABC
from dataclasses import dataclass
from os import path
from typing import Dict, List, Literal


@dataclass
class AssetManifest:
    files: Dict[str, str]
    entrypoints: List[str]


class AssetManifestSupplier(ABC):
    def get(self) -> AssetManifest:
        ...


class BuildAssetManifestSupplier(AssetManifestSupplier):
    def __init__(self, asset_manifest_path: str):
        self._manifest = AssetManifest(**json.load(open(asset_manifest_path, "r")))

    def get(self):
        return self._manifest


class LocalAssetManifestSupplier(AssetManifestSupplier):
    def __init__(self):
        pass

    def get(self):
        return AssetManifest(
            files={},
            entrypoints=[
                "http://localhost:3000/static/js/bundle.js",
                "http://localhost:3000/static/js/0.chunk.js",
                "http://localhost:3000/static/js/1.chunk.js",
                "http://localhost:3000/static/js/main.chunk.js",
            ],
        )


def create_asset_manifest_supplier(impl: Literal["build", "local"]):
    if impl == "build":
        return BuildAssetManifestSupplier(
            path.join(path.dirname(__file__), "build/asset-manifest.json")
        )
    elif impl == "local":
        return LocalAssetManifestSupplier()
    else:
        raise AssertionError("Unknown asset manifest supplier impl: " + impl)
