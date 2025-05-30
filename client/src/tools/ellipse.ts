import Rectangle from "./rectangle.ts";
import canvasState from "../states/canvasState.ts";
import type { Figure } from "../types/data.ts";

export default class Ellipse extends Rectangle {
  constructor(canvas: HTMLCanvasElement | null, socket: WebSocket) {
    super(canvas, socket);
  }

  mouseMoveHandler(e) {
    const currentX = e.pageX - e.target.offsetLeft;
    const currentY = e.pageY - e.target.offsetTop;
    if (this.mouseDown) {
      this.socket.send(
        JSON.stringify({
          id: canvasState.data?.id,
          username: canvasState.data?.username,
          method: "draw",
          figure: {
            type: "ellipse",
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
        ctx.ellipse(
          figure.x + figure.startX,
          figure.y + figure.startY,
          Math.abs(figure.x),
          Math.abs(figure.y),
          0,
          0,
          90,
        );
        ctx.strokeStyle = figure.strokeCol;
        ctx.fillStyle = figure.fillCol;
        ctx.lineWidth = figure.lineWidth;
        ctx.fill();
        ctx.stroke();
      }
    };
  }
}
