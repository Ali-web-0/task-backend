import {
    WebSocketGateway,
    WebSocketServer,
    OnGatewayInit,
    OnGatewayConnection,
    OnGatewayDisconnect
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WebSocket as NativeWebSocket } from 'ws';

@WebSocketGateway({
    cors: {
        origin: '*',
    },
})
export class BinanceGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer() server: Server;
    private binanceWs!: NativeWebSocket;
    private readonly binanceUrl: string = 'wss://stream.binance.com:9443/ws/btcusdt@trade';
    private isReconnecting = false;

    afterInit(server: Server): void {
        console.log('WebSocket server initialized');
        this.connectToBinance();
    }

    handleConnection(client: Socket): void {
        console.log('Client connected:', client.id);
    }

    handleDisconnect(client: Socket): void {
        console.log('Client disconnected:', client.id);
    }

    private connectToBinance(): void {
        if (this.isReconnecting) return;
        this.binanceWs = new NativeWebSocket(this.binanceUrl);

        this.binanceWs.on('open', (): void => {
            this.isReconnecting = false;
            console.log('Connected to Binance WebSocket API');
        });

        this.binanceWs.on('message', (data: NativeWebSocket.Data): void => {
            const parsedData = JSON.parse(data.toString());
            const tradeData = {
                t: parsedData.T,
                p: parsedData.p,
                s: parsedData.s
            };
            console.log('Emitting trade data:', tradeData);
            this.server.emit('trade', tradeData);
        });

        this.binanceWs.on('error', (error: Error): void => {
            console.error('WebSocket error:', error);
            this.binanceWs.close();
        });

        this.binanceWs.on('close', (): void => {
            console.log('WebSocket connection closed. Reconnecting...');
            this.isReconnecting = true;
            setTimeout(() => this.connectToBinance(), 5000);  // Simple reconnect logic
        });
    }
}
