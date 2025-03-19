import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserSchema } from 'src/schema/user.schema';
import { UserController } from './user.controller';
import { JwtModule } from '@nestjs/jwt';

@Module({
  providers: [UserService],
  exports: [UserModule, JwtModule],
  imports: [MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  JwtModule.register({
    secret: "a004976547ab3937176c0f918b680f4d18e7d74e6cebccfa9fa452bda6b723fa",
    signOptions: { expiresIn: '1h' }
  })
  ],
  controllers: [UserController]
})
export class UserModule { }
