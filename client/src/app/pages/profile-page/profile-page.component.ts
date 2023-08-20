import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { ProfileService } from 'src/app/services/profile.service';


@Component({
  selector: 'app-profile-page',
  templateUrl: './profile-page.component.html',
  styleUrls: ['./profile-page.component.scss'],
})
export class ProfilePageComponent implements OnInit, OnDestroy {

  private destroy$ = new Subject<void>();

  constructor(public readonly profileService: ProfileService, private readonly router: Router) { }

  public ngOnInit(): void {
    this.profileService.profile$.pipe(takeUntil(this.destroy$)).subscribe(profile => {
        if (!profile) {
          void this.router.navigate(['']);
        }
      });
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
