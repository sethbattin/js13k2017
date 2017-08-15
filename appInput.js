import { Input } from "nodeanimate";

function bx() {return ((Input.keyboard.isKeyDown("a") ? -1 : 0) + (Input.keyboard.isKeyDown("d") ? 1 : 0)); }
function by() {return ((Input.keyboard.isKeyDown("w") ? -1 : 0) + (Input.keyboard.isKeyDown("s") ? 1 : 0)); }
export const boxInput = {x: bx, y: by};

function cx() {return ((Input.keyboard.isKeyDown("l") ? 1 : 0) + (Input.keyboard.isKeyDown("j") ? -1 : 0)); }
function cy() {return ((Input.keyboard.isKeyDown("i") ? -1 : 0) + (Input.keyboard.isKeyDown("k") ? 1 : 0)); }
function cz() {return (1 + (Input.keyboard.isKeyDown("u") ? -0.01 : 0) + (Input.keyboard.isKeyDown("o") ? 0.01 : 0)); }

export const camMoveController = {
  moveY: 0,
  moveX: 0,
  zoomChange: 1,
  control: function(camera){
    camera.position.x += this.moveX;
    camera.position.y += this.moveY;
    camera.zoom *= this.zoomChange;
  },
  update: function(){
    this.moveX = cx();
    this.moveY = cy();
    this.zoomChange = cz();
  }, 
};

export const gamepadInput = {
  gp: null,
  getMove: function() { 
    return this.gp ?
      {x: this.gp.axes[0], y: this.gp.axes[1] } : 
      {x: 0, y: 0 }; 
  },
  update: function(ctx, delta, time) {
    if (!this.gp){
      const gp = Input.gamepads.getGamepadPush(time);
      if (gp) { this.setGp(gp); }
    }
    if (this.gp){
      this.gp.update(ctx, delta, time);
    }
  },
  setGp: function(gp) {
    this.gp = gp;
    var self = this;
    this.gp.disconnect = function(){
      self.gp = null;
    }
  },
};

export const gamepadThing  = {
  gpi: gamepadInput,
  textFade: 1,
  pos: {x: -300, y: 150 },
  update: function(context, delta, time) {
    gamepadInput.update(context, delta, time);
    const move = gamepadInput.getMove();
    this.pos.x += move.x;
    this.pos.y += move.y;
    const cos = Math.cos(time / 500);
    this.textFade = (1 - (cos * cos));
  },
  draw: function(context, delta, time) {
    context.save();
    context.fillStyle = "black";
    if (gamepadInput.gp){
      context.fillRect(this.pos.x, this.pos.y, 20, 20);
    } else {
      context.globalAlpha = this.textFade;
      context.fillText("Press any Gamepad Button", this.pos.x, this.pos.y);
    }
    context.restore();
  }
}

