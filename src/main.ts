import { TransformInterceptor } from './transform/transform.interceptor';
import { HttpFilter } from './http/http.filter';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { AuthGuard } from './auth/auth.guard';
import * as session from 'express-session';
import { resolve } from 'path';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.enableCors()

  app.useGlobalFilters(app.get(HttpFilter))
  app.useGlobalInterceptors(app.get(TransformInterceptor))
  app.useGlobalGuards(app.get(AuthGuard))
  app.useGlobalPipes(new ValidationPipe())
  //配置静态文件目录
  app.useStaticAssets(resolve(__dirname,'../public'))

  //配置session
  app.use(session({
    secret:'123456',
    name:'server.sid',
    cookie:{
      maxAge:3600*24,
    }
  }))
  
  await app.listen(3000);
}
bootstrap();
