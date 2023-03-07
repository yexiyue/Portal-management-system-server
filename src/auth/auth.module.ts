import { AuthGuard } from './auth.guard';
import { Module } from '@nestjs/common';
import { UserManageModule } from 'src/user-manage/user-manage.module';


@Module({
  imports:[UserManageModule],
  providers: [AuthGuard],
  exports:[AuthGuard]
})
export class AuthModule {}
