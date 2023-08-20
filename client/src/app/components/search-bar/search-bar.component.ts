import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subject, debounceTime, distinctUntilChanged, map, skipWhile, takeUntil } from 'rxjs';
import { IProfile } from 'src/app/interfaces/profile';
import { ProfileService } from 'src/app/services/profile.service';
import { SocialService } from 'src/app/services/social.service';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent implements OnInit, OnDestroy {

  public users: IProfile[] = [];
  public searchForm: FormGroup;

  private autocompleteLimit = 5;

  private destroy$ = new Subject<void>();

  constructor(private readonly userService: SocialService, private readonly router: Router,
    private readonly profileService: ProfileService, private readonly fb: FormBuilder) {
    this.searchForm = this.fb.group({ searchValue: null });
  }

  public ngOnInit(): void {
    this.searchForm.get('searchValue')!.valueChanges.pipe(
      debounceTime(350),
      distinctUntilChanged(),
      map(value => value.trim()),
      skipWhile(value => !value),
      takeUntil(this.destroy$)
    ).subscribe(value => this.fetchItems(value));
  }

  public fetchItems(value: string): void {
    if (!value) {
      this.users = [];
      return;
    }
    this.userService.getUsers(value, this.autocompleteLimit).subscribe(users => this.users = users);
  }

  public selectItem(profile: IProfile): void {
    this.searchForm.get('searchValue')?.patchValue(profile.username);
    this.profileService.setCurrentProfile(profile);
    void this.router.navigate(['profile', profile.username]);
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
