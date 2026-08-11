import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { Reflector } from "@nestjs/core";
import jwt from "jsonwebtoken";
import { IS_PUBLIC_KEY } from "../decorators/public.decorator";

@Injectable()
export class JwtAuthGuard implements CanActivate {
  constructor(
    private configService: ConfigService,
    private reflector: Reflector,
  ) {}

  canActivate(context: ExecutionContext): boolean {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader) throw new UnauthorizedException("No token provided");

    const token = authHeader.split(" ")[1];

    try {
      const secretKey = this.configService.get<string>("SECRET_KEY");
      const payload = jwt.verify(token, secretKey!);

      request.user = payload;

      return true;
    } catch (error) {
      if ((error as Error).name === "TokenExpiredError")
        throw new UnauthorizedException("Token expired");

      throw new UnauthorizedException("Invalid token!");
    }
  }
}
