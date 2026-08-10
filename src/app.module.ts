import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './modules/user/user.module';
import { TodosModule } from './modules/todos/todos.module';
import { AuthModule } from './modules/auth/auth.module';

@Module({
  imports: [UserModule, TodosModule, AuthModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
