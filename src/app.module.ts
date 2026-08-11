import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import configuration from './config/configuration';
import { AuthModule } from './modules/auth/auth.module';
import { TodosModule } from './modules/todos/todos.module';
import { UserModule } from './modules/user/user.module';


@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: configuration().database.sqlite3.type,
      database: configuration().database.sqlite3.database,
      // entities: configuration().database.sqlite3.entities,
      autoLoadEntities: true,
      synchronize: configuration().database.sqlite3.synchronize,
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    UserModule,
    TodosModule,
    AuthModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
