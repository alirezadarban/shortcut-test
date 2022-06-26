import { Test, TestingModule } from "@nestjs/testing";
import { UrlGenService } from "./url-gen.service";
import { Repository } from "typeorm";
import { Url } from "./urls.entity";
import { getRepositoryToken } from "@nestjs/typeorm";

describe("LinkGenService", () => {
  let service: UrlGenService;
  let repository: Repository<Url>;

  const urlsArray = [
    {
      url: "https://someurl.com",
      user_id: 1
    },
    {
      url: "https://otherurl.com",
      user_id: 2
    }
  ];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UrlGenService,
        {
          provide: getRepositoryToken(Url),
          useValue: {
            // find: jest.fn().mockResolvedValue(usersArray)
          }
        }]
    }).compile();

    service = module.get<UrlGenService>(UrlGenService);
  });

  it("should be defined", () => {
    expect(service).toBeDefined();
  });

  // describe("create()", () => {
  //   it("should successfully generate a link", () => {
  //     expect(
  //       service.create(urlsArray[0])
  //     ).resolves.toEqual(globalValues.response(
  //         true,
  //         "Welcome to TinyUrlGenerator!",
  //         HttpStatus.OK
  //       )
  //     );
  //   });
  // });

  describe("IDtoShortUrl", () => {
    it("should successfully convert an id to url", () => {
      expect(service.idToShortURL(1)).toEqual('b');
    });
  });

  describe("shortURLtoID", () => {
    it("should successfully convert an url to id", () => {
      expect(service.shortURLtoID('b')).toEqual(1);
    });
  });
});
