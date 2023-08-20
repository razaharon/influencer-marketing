import { Component } from '@angular/core';
import { faCertificate } from '@fortawesome/free-solid-svg-icons';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-profile-summary',
  templateUrl: './profile-summary.component.html',
  styleUrls: ['./profile-summary.component.scss']
})
export class ProfileSummaryComponent {

  public faCertificate = faCertificate;
  
  constructor(public readonly profileService: ProfileService) { }
}
