import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UrlGenService } from "./url-gen.service";
import { Url } from "./urls.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Url])],
  providers: [UrlGenService],
  exports: [UrlGenService]
})
export class UrlGenModule {}
