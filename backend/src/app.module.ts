import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { LoginController } from './login/user.controller';
import { LoginModule } from './login/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { UserService } from './login/user.service';
import { UserSchema } from './schema/user.schema';

@Module({
  imports: [LoginModule,
    MongooseModule.forRoot('mongodb://localhost:27017/expense-tracker-app'),

    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
  ],
  controllers: [AppController, LoginController],
  providers: [AppService, UserService],
})
export class AppModule {}
