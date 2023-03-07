import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { Response,Request } from 'express';

@Catch()
export class HttpFilter<T> implements ExceptionFilter {
  constructor(private logger:Logger){}
  catch(exception: HttpException, host: ArgumentsHost) {
    const res=host.switchToHttp().getResponse<Response>()
    const req=host.switchToHttp().getRequest<Request>()
    const status=exception.getStatus()
    this.logger.error(`\n<<<<<<<<<<<<<<<<<<<<<<<<<<<<<
      path:${req.path}
      params:${JSON.stringify(req.params)}
      body:${JSON.stringify(req.body)}
      message:${exception.message}\n>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
    `,'异常请求')
    
    res.status(status).send({
      message:exception.message,
      success:false,
      status,
      data:exception.getResponse()
    })
  }
}
