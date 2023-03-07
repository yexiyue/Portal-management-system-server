import { INestApplication, OnModuleInit, Logger } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';
import { Prisma } from '@prisma/client';
export class PrismaServer extends PrismaClient implements OnModuleInit{
    async onModuleInit() {
        await this.$connect()
        this.$use(this.updateTime)
    }

    //中间件
    updateTime:Prisma.Middleware=async (params,next)=>{
        if((params.model==='News' || params.model==='Product') && params.action==='update'){
            params.args.data['updateTime']=new Date()
        }
        if(params.model==='SdkData' && params.action==='create'){
            params.args.data['time']=new Date()
        }
        return await next(params)
    }

    async enableShutdownHooks(app: INestApplication) {
        this.$on('beforeExit', async () => {
          await app.close();
        });
    }
}
