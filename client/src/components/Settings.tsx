import "../styles/tools.scss";
import toolState from "../states/toolState.ts";
import { useState } from "react";
import { Slider, Typography } from "@mui/material";

const Settings = () => {
  const [width, setWidth] = useState(1);

  return (
    <div className="toolbar" style={{ top: 40 }}>
      <Slider
        min={1}
        max={50}
        value={width}
        style={{ maxWidth: "10em" }}
        onChange={(_, newValue) => {
          toolState.setLineWidth(newValue);
          setWidth(newValue);
        }}
      />
      <Typography variant="body1">Line/stroke width: {width}px</Typography>
      <input
        type="color"
        className="toolbar__btn"
        onChange={(e) => toolState.setStrokeCol(e.target.value)}
      />
      <Typography variant="body1">Stroke</Typography>

      <input
        type="color"
        className="toolbar__btn"
        onChange={(e) => toolState.setFillCol(e.target.value)}
      />
      <Typography variant="body1">Fill</Typography>
    </div>
  );
};

export default Settings;
