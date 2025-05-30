export interface DataDTO {
  method: string;
  id: string;
  username?: string;
  figure?: {
    type: string;
    strokeCol: string;
    fillCol: string;
    lineWidth: number;
    startX: number;
    startY: number;
    saved: string;
    x: number;
    y: number;
  };
}

export interface ImgDTO {
  img: string;
}
