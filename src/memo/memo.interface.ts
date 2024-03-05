import { Document } from 'mongoose';
import { User } from 'src/schemas/users.schema';

export interface IMemo extends Document {
    userId: User;
    title: string;
    description: string;
    created_date: Date;
}
