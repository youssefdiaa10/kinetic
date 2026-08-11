import { Module } from '@nestjs/common';
import { TodosController } from './todos.controller';
import { TodosService } from './todos.service';
import { JwtAuthGuard } from '../../auth/guard/jwt-auth.guard';

@Module({
  controllers: [TodosController],
  providers: [TodosService, JwtAuthGuard]
})
export class TodosModule {}
