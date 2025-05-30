import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  providers: [AppGateway, AppService],
  controllers: [AppController],
})
export class AppModule {}
