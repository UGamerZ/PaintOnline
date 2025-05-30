import { Module } from '@nestjs/common';
import { AppGateway } from './app.gateway';
import { AppController } from './app.controller';

@Module({
  providers: [AppGateway],
  controllers: [AppController],
})
export class AppModule {}
