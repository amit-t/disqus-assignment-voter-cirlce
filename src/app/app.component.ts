import {Component} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'disqus-voter-circle';


  comments = [
    {
      'name': 'Matt',
      'src': 'https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/73.jpg',
      'time': 'Today at 5:43 PM',
      'comment': 'This is Aweomse!',

    }
  ];
}
