import Tool from "./tool.ts";
import canvasState from "../states/canvasState.ts";
import type { Figure } from "../types/data.ts";

export default class Rectangle extends Tool {
  mouseDown = false;
  startX = 0;
  startY = 0;
  saved = "";

  constructor(canvas: HTMLCanvasElement | null, socket: WebSocket) {
    super(canvas, socket);
    this.listen();
  }

  listen() {
    if (this.canvas) {
      this.canvas.onmouseup = this.mouseUpHandler.bind(this);
      this.canvas.onmousedown = this.mouseDownHandler.bind(this);
      this.canvas.onmousemove = this.mouseMoveHandler.bind(this);
    }
  }

  mouseUpHandler() {
    this.mouseDown = false;
    this.socket.send(
      JSON.stringify({
        method: "draw",
        id: canvasState.data?.id,
        figure: {
          type: "finish",
        },
      }),
    );
  }

  mouseDownHandler(e) {
    this.mouseDown = true;
    if (this.canvas) {
      this.startX = e.pageX - e.target.offsetLeft;
      this.startY = e.pageY - e.target.offsetTop;
      this.saved = this.canvas.toDataURL();
    }
  }

  mouseMoveHandler(e) {
    const currentX = e.pageX - e.target.offsetLeft;
    const currentY = e.pageY - e.target.offsetTop;
    if (this.mouseDown) {
      this.socket.send(
        JSON.stringify({
          id: canvasState.data?.id,
          method: "draw",
          figure: {
            type: "rect",
            startX: this.startX,
            startY: this.startY,
            strokeCol: this.ctx?.strokeStyle,
            lineWidth: this.ctx?.lineWidth,
            fillCol: this.ctx?.fillStyle,
            x: currentX - this.startX,
            y: currentY - this.startY,
            saved: this.saved,
          },
        }),
      );
    }
  }

  static draw(
    ctx: CanvasRenderingContext2D | null | undefined,
    canvas: HTMLCanvasElement | null,
    figure: Figure,
  ) {
    const img = new Image();
    img.src = figure.saved;
    img.onload = () => {
      if (ctx && canvas) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
        ctx.beginPath();
        ctx.rect(figure.startX, figure.startY, figure.x, figure.y);
        ctx.strokeStyle = figure.strokeCol;
        ctx.fillStyle = figure.fillCol;
        ctx.lineWidth = figure.lineWidth;
        ctx.fill();
        ctx.stroke();
      }
    };
  }
}
