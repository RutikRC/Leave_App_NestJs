import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document

@Schema()
export class User {
    @Prop()
    username: string;

    @Prop()
    password: string;

    @Prop({ enum: ['Admin', 'Staff', 'SuperUser', 'HR', 'Active']})
    role: string;

}

export const UserSchema = SchemaFactory.createForClass(User);