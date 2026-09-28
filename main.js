const sketch = require("./sketch");
const w = require("./window");

function loop() {
  while (sketch.running()) {
    sketch.update();
    sketch.draw();
  }
}

function main() {
  sketch.setup(w.screenWidth, w.screenHeight, w.title, w.FPS);
  loop();
  sketch.teardown();
}

main();