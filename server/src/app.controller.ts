import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Query,
} from '@nestjs/common';
import { ImgDTO } from './types/data';
import * as fs from 'fs';
import * as path from 'path';

@Controller()
export class AppController {
  @Post('/image')
  uploadImage(@Body() data: ImgDTO, @Query('id') id: string) {
    try {
      const img = data.img.replace('data:image/png;base64,', '');
      const imgPath = path.resolve(__dirname, '..', 'static');
      if(!imgPath) fs.mkdirSync(imgPath)
      fs.writeFileSync(
        path.resolve(__dirname, '..', 'static', `${id}.jpg`),
        img,
        'base64',
      );
      return 'File uploaded';
    } catch (e) {
      console.log(e);
      return InternalServerErrorException;
    }
  }

  @Get('/image')
  getImage(@Query('id') id: string) {
    try {
      const img = fs.readFileSync(
        path.resolve(__dirname, '..', 'static', `${id}.jpg`),
      );
      return 'data:image/png;base64,' + img.toString('base64');
    } catch (e) {
      console.log(e);
      return InternalServerErrorException;
    }
  }
}
