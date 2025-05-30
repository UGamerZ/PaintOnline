export interface DataDTO {
  method: string;
  id: string;
  username?: string;
  figure?: Figure;
}

export interface Figure {
  type: string;
  strokeCol: string;
  lineWidth: number;
  fillCol: string;
  startX: number;
  startY: number;
  saved: string;
  x: number;
  y: number;
}
