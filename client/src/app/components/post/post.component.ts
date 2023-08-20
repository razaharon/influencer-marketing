import { Component, Input, OnInit } from '@angular/core';
import { IconDefinition, faClapperboard, faComment, faHeart, faLayerGroup } from '@fortawesome/free-solid-svg-icons';
import { MediaType } from 'src/app/enums/media-type';
import { IPost } from 'src/app/interfaces/post';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent implements OnInit {
  @Input() public post!: IPost;

  public heart = faHeart;
  public comment = faComment;
  public mediaTypeIcon: IconDefinition | null = null;

  ngOnInit(): void {
    this.setMediaTypeIcon();
  }

  setMediaTypeIcon() {
    let icon = null;
    switch(this.post.media_type) {
      case MediaType.VIDEO:
        icon = faClapperboard;
        break;
      case MediaType.CAROUSEL:
        icon = faLayerGroup;
        break;
    }
    this.mediaTypeIcon = icon;
  }

  public openPost(): void {
    window.open('https://www.instagram.com/p/' + this.post.code, '_blank');
  }
}
