import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type MessageDocument = Message & Document;

@Schema({ timestamps: true })
export class Message {
    @Prop({ required: true })
    content: string;

    @Prop({ default: 'general' })
    type: string;

    @Prop()
    processedAt: Date;
}

export const MessageSchema = SchemaFactory.createForClass(Message);
