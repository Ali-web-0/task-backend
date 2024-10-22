import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Message, MessageDocument } from '../models/message.schema';
import { CreateMessageDto } from '../dto/create-message.dto';

@Injectable()
export class WebsocketService {
    constructor(
        @InjectModel(Message.name) private messageModel: Model<MessageDocument>,
    ) { }

    async processData(createMessageDto: CreateMessageDto): Promise<Message> {
        const { content, type } = createMessageDto;

        const processedAt = new Date();

        const message = new this.messageModel({ content, type, processedAt });
        return message.save();
    }

    async getAllMessages(): Promise<Message[]> {
        return this.messageModel.find().exec();
    }
}
