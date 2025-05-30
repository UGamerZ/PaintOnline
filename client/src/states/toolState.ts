import { makeAutoObservable } from "mobx";
import type Tool from "../tools/tool.ts";

class ToolState {
  constructor() {
    makeAutoObservable(this);
  }

  tool: Tool | null = null;

  setTool(tool: Tool) {
    this.tool = tool;
  }
  setFillCol(color: string) {
    if (this.tool) this.tool.fillColor = color;
  }
  setStrokeCol(color: string) {
    if (this.tool) this.tool.strokeColor = color;
  }
  setLineWidth(w: number) {
    if (this.tool) this.tool.lineWidth = w;
  }
}

export default new ToolState();
