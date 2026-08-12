import { Module } from "@nestjs/common";
import { APP_GUARD } from "@nestjs/core";
import { TypeOrmModule } from "@nestjs/typeorm";
import { JwtAuthGuard } from "../../auth/guard/jwt-auth.guard";
import { JwtStrategy } from "../../auth/strategies/jwt.strategy";
import { RefreshToken } from "../../entities/refresh-token.entity";
import { User } from "../../entities/user.entity";
import { AuthController } from "./auth.controller";
import { AuthService } from "./auth.service";

@Module({
  imports: [TypeOrmModule.forFeature([User, RefreshToken])],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: APP_GUARD,
      useClass: JwtAuthGuard,
    },
  ],
  controllers: [AuthController],
})
export class AuthModule {}
