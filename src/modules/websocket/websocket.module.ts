import { Module } from '@nestjs/common';
import { BinanceGateway } from './gateway/binance.gateway';

@Module({
    providers: [BinanceGateway],
})
export class WebsocketModule { }
