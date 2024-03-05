import { Document } from "mongoose";
import { User } from "src/schemas/users.schema";

export interface ILeave extends Document {
    //_id: string;
    // id: number;
    userId: User;
    duration: {
        startDate: Date,
        endDate: Date
    };
    leaveType: 'Sick Leave' | 'Vacation' | 'Maternity/Paternity Leave' | 'Unpaid Leave' | 'Paid Leave' | 'Full Day Leave' | 'Half Day Leave';
    remarks: string;
    reason: 'Personal' | 'Not Well';
    leave_create_date: Date;
}
