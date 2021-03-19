import { Controller, Get, Param, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalStrategy } from './local.strategy';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService, private readonly localStrategy: LocalStrategy) {}
    
  @Post()
  findOne(@Param('name') name: string) {
      let pass ="123";
    const user = this.authService.validateUser(name, pass);
    return user;
  }

}
