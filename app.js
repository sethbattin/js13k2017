import { Camera, create2d , Debug, Clear} from "nodeanimate";
import { camMoveController } from "./appInput";


var WIDTH = 720;
var HEIGHT = 405;

var loop = create2d({container: container, height:HEIGHT, width: WIDTH});

loop.add(new Clear());

loop.add({
  p: {x: 0, y: 0},
  stuck: true,
  size: 10,
  update: function(context, delta, time){

  },
  draw: function(context, delta, time){
    context.fillStyle = "black";
    context.fillRect(this.p.x - this.size / 2, this.p.y - this.size / 2, this.size, this.size);
  }
});

var cam = window.cam = new Camera.default();
cam.controller = new Camera.LerpController();
cam.controller.controller = camMoveController;
loop.add(cam);
loop.add(camMoveController);

loop.add(new Debug(cam));

