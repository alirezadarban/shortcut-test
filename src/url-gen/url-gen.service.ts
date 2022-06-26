import { HttpStatus, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Url } from "./urls.entity";
import globalValues from "../globalValues";

@Injectable()
export class UrlGenService {
  constructor(
    @InjectRepository(Url)
    private readonly linkRepository: Repository<Url>
  ) {
  }

  async find(id: number): Promise<Url[]> {
    try {
      return this.linkRepository.find({ where: { user_id: id } });
    } catch (e) {
      throw new Error(e);
    }
  }

  async create(payload: any): Promise<any> {
    try {
      const link = this.linkRepository.create(payload);
      const result = await this.linkRepository.save(link);
      const converted = this.idToShortURL(result["id"]);
      return globalValues.response(
        true,
        `Your url converted '${converted}'! Copy this URL in your browser: http://localhost:3000/tinyUrl/${converted}`,
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

  async reverseUrl(url: any): Promise<string> {
    const id = this.shortURLtoID(url);
    const originalUrl = await this.linkRepository.findOne({ where: { id } });
    if (!originalUrl) {
      throw new NotFoundException(`Url not found`);
    }
    return originalUrl["url"];
  }

  // Function to generate a short url from integer ID
  idToShortURL(n: number): string {
    // Map to store 62 possible characters
    const map = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";

    const shortUrl = [];
    // Convert given integer id to a base 62 number
    while (n) {
      // use above map to store actual character
      // in short url
      shortUrl.push(map[n % 62]);
      n = Math.floor(n / 62);
    }

    // Reverse shortURL to complete base conversion
    shortUrl.reverse();
    return shortUrl.join("");
  }

// Function to get integer ID back from a short url
  shortURLtoID(shortURL: string): number {
    let id = 0; // initialize result

    // A simple base conversion logic
    for (let i = 0; i < shortURL.length; i++) {
      if ("a" <= shortURL[i] && shortURL[i] <= "z")
        id = id * 62 + shortURL[i].charCodeAt(0) - "a".charCodeAt(0);
      if ("A" <= shortURL[i] && shortURL[i] <= "Z")
        id = id * 62 + shortURL[i].charCodeAt(0) - "A".charCodeAt(0) + 26;
      if ("0" <= shortURL[i] && shortURL[i] <= "9")
        id = id * 62 + shortURL[i].charCodeAt(0) - "0".charCodeAt(0) + 52;
    }
    return id;
  }
}
