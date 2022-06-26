import { Test, TestingModule } from "@nestjs/testing";
import { UsersService } from "./users.service";
import { User } from "./entities/users.entity";
import { getRepositoryToken } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import globalValues from "../globalValues";
import { HttpStatus } from "@nestjs/common";

describe("UsersService", () => {
  let service: UsersService;
  let repository: Repository<User>;

  const usersArray = [
    {
      username: "someone@xyz.com",
      password: "123456"
    },
    {
      username: "somebody@xyz.com",
      password: "654321"
    }
  ];

  beforeEach(async () => {
    const moduleRef: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: {
            // find: jest.fn().mockResolvedValue(usersArray)
            findOneBy: jest.fn().mockResolvedValue(usersArray[0]),
          }
        }
      ]
    }).compile();

    service = moduleRef.get<UsersService>(UsersService);
    repository = moduleRef.get<Repository<User>>(getRepositoryToken(User));
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  describe("create()", () => {
    it("should successfully insert a user", () => {
      expect(
        service.create(usersArray[0])
      ).resolves.toEqual(globalValues.response(
          true,
          "Welcome to TinyUrlGenerator!",
          HttpStatus.OK
        )
      );
    });
  });

});
