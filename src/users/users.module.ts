import { Module } from "@nestjs/common";
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import {User} from "./entities/users.entity";
import { LinkGenModule } from "../link-gen/link-gen.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), LinkGenModule],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
