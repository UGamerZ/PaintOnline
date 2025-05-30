import { makeAutoObservable } from "mobx";
import type { DataDTO } from "../types/data.ts";

class CanvasState {
  constructor() {
    makeAutoObservable(this);
  }

  canvas: HTMLCanvasElement | null = null;
  undoList: string[] = [];
  redoList: string[] = [];
  username = "";
  alertOpen = false;
  socket: WebSocket = new WebSocket("");
  sessionID: string | undefined = undefined;
  data: DataDTO | null = null;

  setAlertOpen(value: boolean) {
    this.alertOpen = value;
  }

  setData(data: DataDTO) {
    this.data = data;
  }

  setSocket(socket: WebSocket) {
    this.socket = socket;
  }

  setSessionID(sessionID: string | undefined) {
    this.sessionID = sessionID;
  }

  setCanvas(canvas: HTMLCanvasElement | null) {
    this.canvas = canvas;
  }

  setUsername(username: string) {
    this.username = username;
  }

  pushIntoUndo(data: string | undefined) {
    if (data) this.undoList.push(data);
  }

  undo() {
    if (this.canvas) {
      const ctx = this.canvas.getContext("2d");
      const dataUrl = this.undoList.pop();
      if (dataUrl) {
        this.redoList.push(this.canvas.toDataURL());
        this.fillWithImg(dataUrl, ctx);
      } else ctx?.clearRect(0, 0, this.canvas.height, this.canvas.height);
    }
  }

  redo() {
    if (this.canvas) {
      const ctx = this.canvas.getContext("2d");
      const dataUrl = this.redoList.pop();
      if (dataUrl) {
        this.undoList.push(this.canvas.toDataURL());
        this.fillWithImg(dataUrl, ctx);
      }
    }
  }

  fillWithImg(dataUrl: string, ctx: CanvasRenderingContext2D | null) {
    const img = new Image();
    img.src = dataUrl;
    img.onload = () => {
      if (this.canvas) {
        ctx?.clearRect(0, 0, this.canvas.width, this.canvas.height);
        ctx?.drawImage(img, 0, 0, this.canvas.width, this.canvas.height);
      }
    };
  }
}

export default new CanvasState();
