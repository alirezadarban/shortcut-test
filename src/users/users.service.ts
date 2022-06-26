import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./entities/users.entity";
import { CreateUserDto } from "./create-user.dto";
import * as bcrypt from "bcrypt";
import globalValues from "../globalValues";
import { UrlGenService } from "../url-gen/url-gen.service";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private readonly urkGenService: UrlGenService
  ) {
  }

  async findOne(username: string): Promise<User> {
    try {
      return this.userRepository.findOne({ where: { username } });
    } catch (e) {
      throw new Error(e)
    }
  }

  async create(createUserDto: CreateUserDto): Promise<any> {
    try {
      const existUser = await this.findOne(createUserDto.username);
      if (existUser) {
        throw new Error("Username already exists!");
      }
      const saltOrRounds = 10;
      const hash = await bcrypt.hash(createUserDto.password, saltOrRounds);
      const user = this.userRepository.create({ ...createUserDto, password: hash });
      await this.userRepository.save(user);
      return globalValues.response(
        true,
        "Welcome to TinyUrlGenerator!",
        HttpStatus.OK
      );
    } catch (e) {
      return globalValues.response(
        false,
        { error: e.message },
        HttpStatus.INTERNAL_SERVER_ERROR
      );
    }
  }

  async profile(username: string): Promise<any> {
    try {
      const existUser = await this.findOne(username);
      if (!existUser) {
        throw new NotFoundException();
      }
      const urls = await this.urkGenService.find(existUser.id);
      const urlsArray = urls.map(x => {
        return {url: x['url'], converted: this.urkGenService.idToShortURL(x['id'])}
      });
      return globalValues.response(
        true,
        {username: username, urls: urlsArray},
        HttpStatus.OK
      );
    } catch (e) {
      return globalValues.response(
        false,
        { error: e.message },
        e.status
      );
    }
  }
}