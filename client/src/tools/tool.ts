export default class Tool {
  canvas;
  ctx;
  socket;
  fill;
  stroke;
  width;

  constructor(canvas: HTMLCanvasElement | null, socket: WebSocket) {
    this.canvas = canvas;
    this.ctx = canvas?.getContext("2d");
    this.socket = socket;
    this.fill = "black";
    this.stroke = "black";
    this.width = 1;

    this.fillColor = "black";
    this.strokeColor = "black";
    this.destroyEvents();
  }

  set fillColor(color: string) {
    this.fill = color;
    if (this.ctx) this.ctx.fillStyle = color;
  }

  set strokeColor(color: string) {
    this.stroke = color;
    if (this.ctx) this.ctx.strokeStyle = color;
  }

  set lineWidth(w: number) {
    this.width = w;
    if (this.ctx) this.ctx.lineWidth = w;
  }

  destroyEvents() {
    if (this.canvas) {
      this.canvas.onmouseup = null;
      this.canvas.onmousedown = null;
      this.canvas.onmousemove = null;
    }
  }
}
