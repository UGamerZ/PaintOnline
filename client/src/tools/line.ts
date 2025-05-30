import Rectangle from "./rectangle.ts";
import canvasState from "../states/canvasState.ts";
import type { Figure } from "../types/data.ts";

export default class Line extends Rectangle {
  constructor(canvas: HTMLCanvasElement | null, socket: WebSocket) {
    super(canvas, socket);
  }

  mouseMoveHandler(e) {
    if (this.mouseDown)
      this.socket.send(
        JSON.stringify({
          method: "draw",
          id: canvasState.data?.id,
          figure: {
            type: "line",
            strokeCol: this.ctx?.strokeStyle,
            lineWidth: this.ctx?.lineWidth,
            startX: this.startX,
            startY: this.startY,
            x: e.pageX - e.target.offsetLeft,
            y: e.pageY - e.target.offsetTop,
            saved: this.saved,
          },
        }),
      );
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
        ctx.lineTo(figure.startX, figure.startY);
        ctx.lineTo(figure.x, figure.y);
        ctx.strokeStyle = figure.strokeCol;
        ctx.fillStyle = figure.fillCol;
        ctx.lineWidth = figure.lineWidth;
        ctx.fill();
        ctx.stroke();
      }
    };
  }
}
