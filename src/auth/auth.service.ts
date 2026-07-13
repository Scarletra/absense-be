import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../users/entities/user.entity';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async login(nip: string, pass: string) {
    const user = await this.usersRepository.findOneBy({ nip });
    
    if (!user) {
      throw new UnauthorizedException();
    }

    const isMatch = await bcrypt.compare(pass, user.passwordHash);
    
    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { 
      sub: user.id, 
      nip: user.nip, 
      isHrd: user.isHrd, 
      name: user.name 
    };
    
    return {
      access_token: await this.jwtService.signAsync(payload),
      user: payload
    };
  }
}