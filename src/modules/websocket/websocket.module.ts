import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { WebsocketGateway } from './gateway/websocket.gateway';
import { WebsocketService } from './services/websocket.service';
import { Message, MessageSchema } from './models/message.schema';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Message.name, schema: MessageSchema }]),  // Register MongoDB schema
    ],
    providers: [WebsocketGateway, WebsocketService],
    exports: [WebsocketService],
})
export class WebsocketModule { }
