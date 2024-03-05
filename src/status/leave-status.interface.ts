import { Document } from "mongoose";
import { User } from "src/schemas/users.schema";

// Assuming the Leave schema is defined in 'src/schema/leave.schema'
import { Leave } from "src/schemas/leave.schema";

export interface IStatus extends Document {
    id: number;
    leaveId: Leave; // Foreign key reference to the Leave schema
    userId: User;
    status: 'approved' | 'rejected' | 'under scrunity';
    created_date: Date;
}
