import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Leave } from './leave.schema';
import { User } from './users.schema';


export type MemoDocument = HydratedDocument<Memo>;

@Schema()
export class Memo{

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Leave'})
    leaveId: Leave;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;

    @Prop({ enum: ['Approved', 'Rejected', 'Under Scrunity']})
    status: string;
}

export const MemoSchema = SchemaFactory.createForClass(Memo);
