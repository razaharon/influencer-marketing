import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AutocompleteInputComponent } from './components/autocomplete-input/autocomplete-input.component';
import { ProfileSummaryComponent } from './components/profile-summary/profile-summary.component';

import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SocialService } from './services/social.service';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { ShortNumberPipe } from './pipes/short-number.pipe';
import { ProfilePageComponent } from './pages/profile-page/profile-page.component';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { PostComponent } from './components/post/post.component';
import { ProfileService } from './services/profile.service';

@NgModule({
  declarations: [
    AppComponent,
    AutocompleteInputComponent,
    ProfileSummaryComponent,
    SearchBarComponent,
    ShortNumberPipe,
    ProfilePageComponent,
    HomePageComponent,
    PostComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [
    SocialService,
    ProfileService
  ],
  bootstrap: [
    AppComponent
  ]
})
export class AppModule { }
