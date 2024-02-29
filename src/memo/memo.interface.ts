import { Document } from "mongoose";

export interface IMemo extends Document{
    id: Number;
    leaveId: Number;
    // duration: string;
    // leaveType: string;
    // remarks: string;
    // reason: string;
    userId: Number;
    // username: String;
    status: 'Approved' | 'Rejected' | 'Under Scrunity';
}
