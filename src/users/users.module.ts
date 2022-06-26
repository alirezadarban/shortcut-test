import { Module } from "@nestjs/common";
import { UsersService } from "./users.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { User } from "./entities/users.entity";
import { UrlGenModule } from "../url-gen/url-gen.module";

@Module({
  imports: [TypeOrmModule.forFeature([User]), UrlGenModule],
  providers: [UsersService],
  exports: [UsersService]
})
export class UsersModule {}
