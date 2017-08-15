import * as nodeanimate from "nodeanimate";
import { boxInput, camMoveController, gamepadThing } from "./appInput";

//var container = document.getElementById('container');
var WIDTH = 720;
var HEIGHT = 405;

var loop = nodeanimate.create2d({container: container, height:HEIGHT, width: WIDTH});

loop.add({
  count: 0,
  position: {x: 1, y: 1},
  update: function(context){
    this.position.x += boxInput.x();
    this.position.y += boxInput.y();

    if (this.position.x < WIDTH / -2) { this.position.x = WIDTH / 2; }
    if (this.position.y < HEIGHT / -2) { this.position.y = HEIGHT / 2; }
    if (this.position.x > WIDTH / 2) { this.position.x = WIDTH / -2; }
    if (this.position.y > HEIGHT / 2) { this.position.y = HEIGHT / -2; }
  },
  draw: function(context){
    context.save();
    context.setTransform(1,0,0,1,0,0);
    context.fillStyle = "cornflowerblue";
    context.fillRect(0, 0, WIDTH, HEIGHT);
    cam.setTransform(context);
    context.translate(this.position.x, this.position.y);
    context.fillStyle = "red";
    context.fillRect(-5, -5, 10, 10);
    context.restore();
  }
});

var cam = window.cam = new nodeanimate.Camera.default();
cam.controller = new nodeanimate.Camera.LerpController();
cam.controller.controller = camMoveController;
loop.add(cam);
loop.add(camMoveController);

window.gp = gamepadThing;

loop.add(gamepadThing);

loop.add(new nodeanimate.Debug(cam));

