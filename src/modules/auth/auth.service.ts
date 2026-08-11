import {
  ConflictException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { InjectRepository } from "@nestjs/typeorm";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Repository } from "typeorm";
import { SigninDto, SignupDto, VerifyDto } from "../../dtos/auth/auth.dto";
import { User } from "../../entities/user.entity";

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private readonly userRepository: Repository<User>,
    private readonly configService: ConfigService,
  ) {}

  async signup(signupDto: SignupDto) {
    const { username, email, password } = signupDto;

    const isFound = await this.userRepository.findOne({
      where: {
        email,
      },
    });

    if (isFound) throw new ConflictException("Email is already exists");

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = this.userRepository.create({
      username,
      email,
      password: hashPassword,
    });

    await newUser.save();

    const response = {
      message: "Signed up successfully",
    };

    return response;
  }

  async signin(signinDto: SigninDto) {
    const { email, password } = signinDto;

    const user = await this.userRepository.findOne({
      where: {
        email,
      },
    });
    if (!user) throw new NotFoundException("Email does not exist");

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) throw new ForbiddenException("Invalid password");

    const secretkey = this.configService.get<string>("SECRET_KEY");

    const accessToken = jwt.sign(
      {
        sub: user.id,
        email: user.email,
      },
      secretkey!,
      { expiresIn: "15m" },
    );

    return {
      message: "Signed in successfully",
      accessToken,
    };
  }

  async verify(verifyDto: VerifyDto) {
    try {
      if (!verifyDto.token) throw new ForbiddenException("Ivalid Token");
      const secretkey = this.configService.get<string>("SECRET_KEY");
      const payload = jwt.verify(verifyDto.token, secretkey!) as {
        email: string;
      };
      const user = await this.userRepository.findOne({
        where: {
          email: payload.email,
        },
      });
      if (!user) throw new ForbiddenException("Verification Error");
      return {
        user,
        token: verifyDto.token,
      };
    } catch (error) {
      console.log(`Error: ${error}`);
      throw new ForbiddenException("Verification Error");
    }
  }

  async refresh(refreshToken: string) {
    try {
      const secretkey = this.configService.get<string>("SECRET_KEY");

      const payload = jwt.verify(refreshToken, secretkey!) as {
        sub: string;
      };

      const user = await this.userRepository.findOne({
        where: {
          id: payload.sub,
        },
      });

      if (!user || !user.refreshToken)
        throw new ForbiddenException("Access denied");

      const isMatch = await bcrypt.compare(refreshToken, user.refreshToken);
      if (!isMatch) throw new ForbiddenException("Access denied");

      const newAccessToken = jwt.sign(
        {
          sub: user.id,
          email: user.id,
        },
        secretkey!,
        { expiresIn: "15m" },
      );

      return {
        accessToken: newAccessToken,
      };
    } catch {
      throw new ForbiddenException("Invalid refresh token");
    }
  }
}
