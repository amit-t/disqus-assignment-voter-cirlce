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

    },
    {
      'name': 'Elliot Fu',
      'src': 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=wavatar&f=y',
      'time': 'Yesterday at 5:43 PM',
      'comment': 'This has been helpful!',
      'comments': [
        {
          'name': 'Matt',
          'src': 'https://s3.amazonaws.com/uifaces/faces/twitter/dancounsell/73.jpg',
          'time': 'Just now',
          'comment': 'You are right!',
        }
      ]

    },
    {
      'name': 'Joe Henderson',
      'src': 'https://www.gravatar.com/avatar/00000000000000000000000000000000?d=retro&f=y',
      'time': '5 days ago',
      'comment': 'Thankyou dude!',

    }
  ];
}
