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
    selectedIndexes = traitlets.List(trait=traitlets.Int(), default_value=[]).tag(sync=True)
    selected = traitlets.List(trait=traitlets.Dict(), default_value=[]).tag(sync=True)
    numRows = traitlets.Float(1.0).tag(sync=True)
    numCols = traitlets.Float(2.5).tag(sync=True)
    height = traitlets.Unicode("400px").tag(sync=True)
    width = traitlets.Unicode("100%").tag(sync=True)
    gap = traitlets.Unicode("10px").tag(sync=True)
    verticalScroll = traitlets.Bool(False).tag(sync=True)
    carouselStyle = traitlets.Dict().tag(sync=True, default_value={})
    itemStyle = traitlets.Dict().tag(sync=True, default_value={})
    
    # def __init__(self, **kwargs):
    #     super().__init__(**kwargs)
    #     # register a message handler
    #     self.on_msg(self._handle_js_event)
    #     # observe changes to selectedIndexes and images to update selected
    #     self.observe(self._update_selected, names=['selectedIndexes', 'images'])

    # def _update_selected(self, change):
    #     """Update the selected property based on selectedIndexes and images."""
    #     self.selected = [self.images[i] for i in self.selectedIndexes if i < len(self.images)]

    # def _handle_js_event(self, _, content, buffers):
    #     # content is the dict sent from JS
    #     event = content.get("event")
    #     payload = content.get("payload")
        
    #     if event == "image_clicked":
    #         self.on_image_clicked(payload)

    # def on_image_clicked(self, payload):
    #     selectedIndex = payload.get("index")
    #     if selectedIndex is not None:
    #         if selectedIndex in self.selectedIndexes:
    #             self.selectedIndexes.remove(selectedIndex)
    #         else:
    #             self.selectedIndexes.add(selectedIndex)
