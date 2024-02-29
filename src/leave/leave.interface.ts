import { Document } from "mongoose";

export interface ILeave extends Document {
    id: number;
    userId: number;
    duration: {
        startDate: Date,
        endDate: Date
    };
    leaveType: 'Sick Leave' | 'Vacation' | 'Maternity/Paternity Leave' | 'Unpaid Leave' | 'Paid Leave' | 'Full Day Leave' | 'Half Day Leave';
    remarks: string;
    reason: 'Personal' | 'Not Well';
}
