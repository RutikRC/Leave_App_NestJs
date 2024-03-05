import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Leave } from './leave.schema';
import { User } from './users.schema';


export type StatusDocument = HydratedDocument<Status>;

@Schema()
export class Status{

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Leave'})
    leaveId: Leave;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;

    @Prop({ enum: ['approved', 'rejected', 'under scrunity']})
    status: string;

    @Prop({ type: Date, default: Date.now })
    created_date: Date;
}

export const StatusSchema = SchemaFactory.createForClass(Status);
