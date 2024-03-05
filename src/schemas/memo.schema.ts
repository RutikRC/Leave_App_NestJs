import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './users.schema';

@Schema()
export class Memo {

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;

    @Prop()
    title: string;

    @Prop()
    description: string;

    @Prop({ type: Date, default: Date.now })
    created_date: Date;
}

export const MemoSchema = SchemaFactory.createForClass(Memo);