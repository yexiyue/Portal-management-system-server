import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from '@nestjs/common';
import { Request, Response } from 'express';
import { map, Observable } from 'rxjs';

@Injectable()
export class TransformInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const ctx=context.switchToHttp()
    const res=ctx.getResponse<Response>()
    return next.handle().pipe(map(data=>({
      data,
      message:'ok',
      status:res.statusCode,
      success:true
    })));
  }
}
