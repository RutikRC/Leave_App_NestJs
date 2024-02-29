import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Leave {
    @Prop()
    id: number;

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

    @Prop({ enum: ['Sick Leave', 'Vacation', 'Maternity/Paternity Leave', 'Unpaid Leave', 'Paid Leave', 'Full Day Leave', 'Half Day Leave'] })
    leaveType: string;

    @Prop({ nullable: true })
    remarks: string;

    @Prop({ enum: ['Personal', 'Not Well']})
    reason: string;
}

export const LeaveSchema = SchemaFactory.createForClass(Leave);