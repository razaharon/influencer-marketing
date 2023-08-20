import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { IProfile } from '../interfaces/profile';
import { IPost } from '../interfaces/post';
import { IContact } from '../interfaces/contact';
import { SocialService } from './social.service';

@Injectable()
export class ProfileService {

  public readonly profile$ = new BehaviorSubject<IProfile | null>(null);
  public readonly posts$ = new BehaviorSubject<IPost[] | null>(null);
  public readonly contacts$ = new BehaviorSubject<IContact[] | null>(null);
  public readonly isLoading$ = new BehaviorSubject<boolean>(false);

  constructor(private readonly socialService: SocialService) {
    this.profile$.subscribe(profile => this.setProfileDetails(profile));
  }

  public setCurrentProfile(profile: IProfile | null): void {
    this.profile$.next(profile);
  }

  private updateContacts(username: string): void {
    this.socialService.getContacts(username).subscribe(contacts => this.contacts$.next(contacts));
  }

  private updatePosts(username: string): void {
    this.socialService.getFeed(username).subscribe(posts => {
      this.posts$.next(posts);
      this.isLoading$.next(false);
    });
  }

  private setProfileDetails(profile: IProfile | null): void {
    this.resetProfileDetails();
    if (!profile) return;
    this.isLoading$.next(true);
    this.updatePosts(profile.username);
    this.updateContacts(profile.username);
  }

  private resetProfileDetails(): void {
    this.posts$.next(null);
    this.contacts$.next(null);
  }
}
