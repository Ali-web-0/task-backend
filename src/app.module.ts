import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { WebsocketModule } from './modules/websocket/websocket.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env`,
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.mongodbUrl),  // Connect to MongoDB
    WebsocketModule,
  ],
})
export class AppModule {}
