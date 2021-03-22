//this file is for testing...

import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService, private jwtService: JwtService) {}

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.usersService.findName(username);
    if (user && user.Password === pass) {
      const { Password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const payload = { username: user.Uname, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
