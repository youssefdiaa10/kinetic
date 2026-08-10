import { Injectable } from '@nestjs/common';
import { SigninDto, SignupDto, VerifyDto } from 'src/dtos/auth/auth.dto';

@Injectable()
export class AuthService {

    signup(signupDto: SignupDto) {
        return "await signupDto" 
    }

    signin(signinDto: SigninDto) {
        return "await signinDto" 
    }

    verify(verifyDto: VerifyDto) {
        return "await verifypDto" 
    }
}
