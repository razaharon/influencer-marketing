import { Controller, Get, HttpException, HttpStatus, Query } from '@nestjs/common';
import { SocialService } from './social.service';
import GetUsersDTO from './dto/get-users.dto';
import GetFeedDTO from './dto/get-feed.dto';
import getContactsDTO from './dto/get-contacts.dto';

@Controller()
export class SocialController {
  
  constructor(private readonly socialService: SocialService) {}

  @Get('dict/users')
  public async getUsers(@Query() query: GetUsersDTO) {
    try {
      return await this.socialService.getUsers(query);
    } catch (error) {
      throw new HttpException(error.response.data, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('raw/ig/user/feed')
  public async getFeed(@Query() query: GetFeedDTO) {
    try {
      return await this.socialService.getFeed(query);
    } catch (error) {
      throw new HttpException(error.response.data, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('exports/contacts')
  public async getContacts(@Query() query: getContactsDTO) {
    try {
      return await this.socialService.getContacts(query);
    } catch (error) {
      throw new HttpException(error.response.data, HttpStatus.BAD_REQUEST);
    }
  }
}
