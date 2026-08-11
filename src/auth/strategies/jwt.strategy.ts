/* eslint-disable @typescript-eslint/require-await */
import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly configService: ConfigService) {
    const secret = configService.get<string>("SECRET_KEY");
    console.log("SECRET_KEY:", secret);

    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("SECRET_KEY")!,
    });
  }

  async validate(payload: { sub: number; email: string }) {
    return {
      userId: payload.sub,
      email: payload.email,
    };
  }
}
