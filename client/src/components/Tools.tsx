import "../styles/tools.scss";
import toolState from "../states/toolState.ts";
import Brush from "../tools/brush.ts";
import canvasState from "../states/canvasState.ts";
import Rectangle from "../tools/rectangle.ts";
import Ellipse from "../tools/ellipse.ts";
import Eraser from "../tools/eraser.ts";
import Line from "../tools/line.ts";

const Tools = () => {
  const download = () => {
    const dataUrl = canvasState.canvas?.toDataURL();
    const link = document.createElement("a");
    if (dataUrl) link.href = dataUrl;
    link.download = canvasState.sessionID + ".jpg";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="toolbar">
      <button
        className="toolbar__btn brush"
        onClick={() =>
          toolState.setTool(new Brush(canvasState.canvas, canvasState.socket))
        }
      />
      <button
        className="toolbar__btn rectangle"
        onClick={() =>
          toolState.setTool(
            new Rectangle(canvasState.canvas, canvasState.socket),
          )
        }
      />
      <button
        className="toolbar__btn circle"
        onClick={() =>
          toolState.setTool(new Ellipse(canvasState.canvas, canvasState.socket))
        }
      />
      <button
        className="toolbar__btn line"
        onClick={() =>
          toolState.setTool(new Line(canvasState.canvas, canvasState.socket))
        }
      />
      <button
        className="toolbar__btn eraser"
        onClick={() =>
          toolState.setTool(new Eraser(canvasState.canvas, canvasState.socket))
        }
      />
      <button
        className="toolbar__btn undo"
        onClick={() => canvasState.undo()}
      />
      <button
        className="toolbar__btn redo"
        onClick={() => canvasState.redo()}
      />
      <button className="toolbar__btn save" onClick={download} />
    </div>
  );
};

export default Tools;
