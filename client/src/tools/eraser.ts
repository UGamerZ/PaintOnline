import Brush from "./brush.ts";
import type { Figure } from "../types/data.ts";
import canvasState from "../states/canvasState.ts";

export default class Eraser extends Brush {
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
            type: "eraser",
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
      ctx.strokeStyle = "#fdffcd";
      ctx.lineWidth = figure.lineWidth;
      ctx.stroke();
    }
  }
}
