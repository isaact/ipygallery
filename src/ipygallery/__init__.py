import importlib.metadata
import pathlib

import anywidget
import traitlets

try:
    __version__ = importlib.metadata.version("ipygallery")
except importlib.metadata.PackageNotFoundError:
    __version__ = "unknown"


class ImagePicker(anywidget.AnyWidget):
    _esm = pathlib.Path(__file__).parent / "static" / "widget.mjs"
    _css = pathlib.Path(__file__).parent / "static" / "widget.css"
    images = traitlets.List(trait=traitlets.Dict(), default_value=[]).tag(sync=True)
    numRows = traitlets.Float(1.0).tag(sync=True)
    numCols = traitlets.Float(2.5).tag(sync=True)
    height = traitlets.Unicode("400px").tag(sync=True)
    width = traitlets.Unicode("100%").tag(sync=True)
    gap = traitlets.Unicode("10px").tag(sync=True)
    verticalScroll = traitlets.Bool(False).tag(sync=True)
    carouselStyle = traitlets.Dict().tag(sync=True, default_value={})
    itemStyle = traitlets.Dict().tag(sync=True, default_value={})
