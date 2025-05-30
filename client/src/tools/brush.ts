import Tool from "./tool.ts";
import canvasState from "../states/canvasState.ts";
import type { Figure } from "../types/data.ts";

export default class Brush extends Tool {
  mouseDown = false;
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
        username: canvasState.data?.username,
        figure: {
          type: "finish",
        },
      }),
    );
  }

  mouseDownHandler() {
    this.mouseDown = true;
    if (this.ctx) this.ctx.beginPath();
  }

  mouseMoveHandler(e) {
    if (this.mouseDown)
      this.socket.send(
        JSON.stringify({
          method: "draw",
          id: canvasState.data?.id,
          username: canvasState.data?.username,
          figure: {
            type: "brush",
            strokeCol: this.ctx?.strokeStyle,
            lineWidth: this.ctx?.lineWidth,
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop,
          },
        }),
      );
  }

  static draw(
    ctx: CanvasRenderingContext2D | null | undefined,
    figure: Figure,
  ) {
    if (ctx) {
      ctx.lineTo(figure?.x, figure?.y);
      ctx.strokeStyle = figure.strokeCol;
      ctx.lineWidth = figure.lineWidth;
      ctx.stroke();
    }
  }
}
