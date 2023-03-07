import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC } from './auth.decorator';
import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { Request, Response } from 'express';
import { UserManageService } from 'src/user-manage/user-manage.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflect: Reflector,
    private jwt: JwtService,
    private userServer: UserManageService,
  ) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const isPublic = this.reflect.get(IS_PUBLIC, context.getHandler());
    if (isPublic) {
      return true;
    } else {
      const req = context.switchToHttp().getRequest<Request>();
      const token = req.headers.authorization;
      try {
        //解析后拿到值去数据库验证
        this.jwt.verify(token, {
          secret: '123456',
        });
        //从数据库读取数据并验证
        return true
      } catch (error) {
        throw new UnauthorizedException('登录过期，请重新登录');
      }
    }
  }
}
