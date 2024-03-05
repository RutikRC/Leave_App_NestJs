import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class User extends Document { // Extend Document
    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop({ enum: ['admin', 'staff', 'superuser', 'hr', 'employee']})
    role: string;

    @Prop()
    email: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
