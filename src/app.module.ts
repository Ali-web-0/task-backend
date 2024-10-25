
import { Module } from '@nestjs/common';
import { WebsocketModule } from './modules/websocket/websocket.module'; // Adjust the path as necessary

@Module({
  imports: [WebsocketModule],
})
export class AppModule { }