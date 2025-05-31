import { useEffect, useRef } from "react";
import "../styles/canvas.scss";
import { observer } from "mobx-react-lite";
import canvasState from "../states/canvasState.ts";
import toolState from "../states/toolState.ts";
import Brush from "../tools/brush.ts";
import { useParams } from "react-router-dom";
import Rectangle from "../tools/rectangle.ts";
import Eraser from "../tools/eraser.ts";
import Line from "../tools/line.ts";
import Ellipse from "../tools/ellipse.ts";
import axios from "axios";

const Canvas = observer(() => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { id } = useParams();

  useEffect(() => {
    canvasState.setCanvas(canvasRef.current);
    axios.get(`https://paintonline.onrender.com/image?id=${id}`).then((res) => {
      const ctx = canvasRef.current?.getContext("2d");
      const img = new Image();
      img.src = res.data;
      img.onload = () => {
        if (ctx && canvasRef.current) {
          ctx.clearRect(
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
          );
          ctx.drawImage(
            img,
            0,
            0,
            canvasRef.current.width,
            canvasRef.current.height,
          );
        }
      };
    });
  }, []);

  useEffect(() => {
    if (canvasState.username) {
      const socket = new WebSocket("https://paintonline.onrender.com");
      canvasState.setSocket(socket);
      canvasState.setSessionID(id);
      toolState.setTool(new Brush(canvasRef.current, socket));
      canvasState.setAlertOpen(true);

      socket.onopen = () => {
        socket.send(
          JSON.stringify({
            id,
            username: canvasState.username,
            method: "connection",
          }),
        );
      };

      socket.onmessage = (event) => {
        canvasState.setData(JSON.parse(event.data));
        switch (canvasState.data?.method) {
          case "connection":
            canvasState.setAlertOpen(true);
            break;
          case "draw":
            drawHandler();
            break;
        }
      };
    }
  }, [canvasState.username]);

  const drawHandler = () => {
    const figure = canvasState.data?.figure;
    const ctx = canvasRef.current?.getContext("2d");
    switch (figure?.type) {
      case "brush":
        Brush.draw(ctx, figure);
        break;
      case "rect":
        Rectangle.draw(ctx, canvasRef.current, figure);
        break;
      case "ellipse":
        Ellipse.draw(ctx, canvasRef.current, figure);
        break;
      case "line":
        Line.draw(ctx, canvasRef.current, figure);
        break;
      case "eraser":
        Eraser.draw(ctx, figure);
        break;
      case "action":
        canvasState.fillWithImg(figure?.saved, ctx);
        mouseupHandler();
        break;
      case "finish":
        if (ctx) {
          if (toolState.tool?.stroke) ctx.strokeStyle = toolState.tool.stroke;
          else ctx.strokeStyle = "#000000";
          if (toolState.tool?.fill) ctx.fillStyle = toolState.tool.fill;
          else ctx.strokeStyle = "#000000";
          if (toolState.tool?.width) ctx.lineWidth = toolState.tool.width;
          else ctx.lineWidth = 1;
          ctx?.beginPath();
        }
        break;
    }
  };

  const mousedownHandler = () => {
    canvasState.pushIntoUndo(canvasRef.current?.toDataURL());
  };

  const mouseupHandler = () => {
    setTimeout(
      () =>
        axios
          .post(`https://paintonline.onrender.com/image?id=${id}`, {
            img: canvasState.canvas?.toDataURL(),
          })
          .then((res) => console.log(res)),
      100,
    );
  };

  return (
    <div className="canvas">
      <canvas
        onMouseDown={mousedownHandler}
        onMouseUp={mouseupHandler}
        ref={canvasRef}
        width={600}
        height={400}
      ></canvas>
    </div>
  );
});

export default Canvas;
