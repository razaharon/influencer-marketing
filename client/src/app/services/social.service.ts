import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { IProfile } from '../interfaces/profile';
import { IPost } from '../interfaces/post';
import { IContact } from '../interfaces/contact';

type ContactsResponse = { user_profile: { contacts: IContact[] } };

@Injectable()
export class SocialService {

  private baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  public getUsers(value: string, limit: number = 5, type: string = 'search'): Observable<IProfile[]> {
    return this.http.get<{ data: IProfile[] }>(this.baseUrl + '/dict/users', this.getRequest({ q: value, limit, type }))
      .pipe(map(result => result.data));

  }

  public getFeed(url: string): Observable<IPost[]> {
    return this.http.get<{ items: IPost[] }>(this.baseUrl + '/raw/ig/user/feed', this.getRequest({ url }))
      .pipe(map(result => result.items));
  }

  public getContacts(url: string): Observable<IContact[]> {
    return this.http.get<ContactsResponse>(this.baseUrl + '/exports/contacts', this.getRequest({ url }))
      .pipe(map(result => result.user_profile.contacts));
  }

  private getRequest(params: any = {}): { headers: any, params: any } {
    return {
      headers: {
        authkey: environment.apiKey
      },
      params
    }
  }


}
