import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose'

export type UserDocument = User & Document;

@Schema({ timestamps: true })

export class User {
    @Prop()
    uid: string

    @Prop({ required: true })
    username: string;

    @Prop({ required: true })
    email: string;

    @Prop({ required: false })
    password?: string

    @Prop({ required: true, default: 'user' })
    role: string
}

export const UserSchema = SchemaFactory.createForClass(User);