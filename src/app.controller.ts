import { Controller, Get, Post, Request, UseGuards, Body, Param, Res } from "@nestjs/common";
import { AuthService } from "./auth/auth.service";
import { JwtAuthGuard } from "./auth/guards/jwt-auth.guard";
import { LocalAuthGuard } from "./auth/guards/local-auth.guard";
import { CreateUserDto } from "./users/create-user.dto";
import { UsersService } from "./users/users.service";
import { LinkGenService } from "./link-gen/link-gen.service";
import { Response } from "express";

@Controller()
export class AppController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
    private readonly linkGenService: LinkGenService
  ) {}

  @Post("register")
  async register(@Body() createUserDto: CreateUserDto, @Res() res: Response): Promise<Response> {
    const result = await this.usersService.create(createUserDto);
    return res.status(result.status).send(result)
  }

  @UseGuards(LocalAuthGuard)
  @Post("login")
  async login(@Request() req, @Res() res: Response): Promise<Response> {
    const result = await this.authService.login(req.user);
    return res.status(result.status).send(result);
  }

  @UseGuards(JwtAuthGuard)
  @Post("profile")
  async profile(@Body("username") username: string, @Request() req, @Res() res: Response): Promise<Response> {
    const result = await this.usersService.profile(username);
    return res.status(result.status).send(result);
  }

  @UseGuards(JwtAuthGuard)
  @Post("generateUrl")
  async generateLink(@Body() body, @Request() req, @Res() res: Response): Promise<Response> {
    const result = await this.linkGenService.create({ url: body.url, user_id: req.user.user_id });
    return res.status(result.status).send(result);
  }

  @Get("tinyUrl/:url")
  async reverseLink(@Param("url") url: string, @Res() res: Response): Promise<void> {
    const originalUrl = await this.linkGenService.reverseUrl(url);
    res.redirect(originalUrl);
  }
}