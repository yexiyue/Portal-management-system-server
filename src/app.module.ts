import { extname, resolve } from 'path';
import { HttpFilter } from './http/http.filter';
import { Module, Logger, Global } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransformInterceptor } from './transform/transform.interceptor';
import { PrismaServer } from './prisma/prisma';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UserManageModule } from './user-manage/user-manage.module';
import { MulterModule } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { NewsModule } from './news/news.module';
import { ProductModule } from './product/product.module';
import { WebsocketGateway } from './websocket/websocket.gateway';
import { WebModule } from './web/web.module';
import { SdkModule } from './sdk/sdk.module';
@Global()
@Module({
  imports: [
    JwtModule,
    AuthModule,
    UserManageModule,
    //设置上传模块
    MulterModule.register({
      storage: diskStorage({
        destination: resolve(__dirname, '../public/images'),
        filename: (_, file, cb) => {
          return cb(null, `${Date.now() + extname(file.originalname)}`);
        },
      }),
    }),
    NewsModule,
    ProductModule,
    WebModule,
    SdkModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    Logger,
    HttpFilter,
    TransformInterceptor,
    PrismaServer,
    JwtService,
    WebsocketGateway,
  ],
  exports: [Logger, HttpFilter, TransformInterceptor, PrismaServer, JwtService],
})
export class AppModule {}
