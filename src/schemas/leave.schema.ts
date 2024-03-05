import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import * as mongoose from 'mongoose';
import { User } from './users.schema';

@Schema()
export class Leave {

    @Prop({
        type: {
          startDate: Date,
          endDate: Date
        }
      })
      duration: {
        startDate: Date;
        endDate: Date;
      };

    @Prop({ enum: ['sick leave', 'vacation', 'maternity/paternity leave', 'unpaid leave', 'paid leave', 'full day leave', 'half day leave'] })
    leaveType: string;

    @Prop({ nullable: true })
    remarks: string;

    @Prop({ enum: ['personal', 'not well']})
    reason: string;

    @Prop({ type: Date, default: Date.now })
    leave_create_date: Date;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    userId: User;
}

export const LeaveSchema = SchemaFactory.createForClass(Leave);