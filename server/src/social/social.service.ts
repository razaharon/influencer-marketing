import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { firstValueFrom, map } from 'rxjs';
import { AxiosResponse } from 'axios';
import GetUsersDTO from './dto/get-users.dto';
import GetFeedDTO from './dto/get-feed.dto';
import getContactsDTO from './dto/get-contacts.dto';

@Injectable()
export class SocialService {
    constructor(protected readonly http: HttpService) { }

    public async getUsers(params: GetUsersDTO) {
        return await firstValueFrom(
            this.http.get('dict/users', { params }).pipe(this.getAxiosPipes())
        );
    }

    public async getFeed(params: GetFeedDTO) {
        return await firstValueFrom(
            this.http.get('raw/ig/user/feed', { params }).pipe(this.getAxiosPipes())
        );
    }

    public async getContacts(params: getContactsDTO) {
        return await firstValueFrom(
            this.http.get('exports/contacts', { params }).pipe(this.getAxiosPipes())
        );
    }

    private getAxiosPipes() {
        return (
            map((result: AxiosResponse) => result.data)
        );
    }
}
