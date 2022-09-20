import { Component, OnInit } from '@angular/core';
import { BaseComponent } from '../base/base.component';

@Component({
  selector: 'app-festival-program',
  templateUrl: './festival-program.component.html',
  styleUrls: ['./festival-program.component.scss']
})
export class FestivalProgramComponent extends BaseComponent implements OnInit {

  constructor() { super(); }
  public filmList: any = [];

  ngOnInit(): void {
    this.user = this.getUserObject();
    this.userId = this.user.id;
    this.filmList = [
      { id: '52', name: 'The Conversion', userFlg: true, director: 'Mathew DaLuz', url: 'https://youtu.be/kL182ZdM4QA', password: '', tagline: 'Left to his own devices, a man wrought with anger and sadness must come to terms with a decision that will change two lives forever.' },
      { id: '98', name: 'Tess Tetley-Girl Brand Manager', userFlg: true, director: 'Andrea Hays', url: 'https://www.youtube.com/watch?v=x65M3LYUJWY', password: '', tagline: 'Can our girl, Tess Tetley, get to the lab before villainous foes like Big Adhesive get to her first? Tune in and SEE!' },
      { id: '78', name: 'A Dinner Party From Hell', userFlg: true, director: 'Derek Schneider', url: 'https://youtu.be/MaSjmcWCjV8', password: '', tagline: 'The eggs aren\'t the only thing deviled at this party.' },
      { id: '77', name: 'You\'re Beautiful', userFlg: false, director: 'Amber Dalby', url: 'https://youtu.be/c8glviru8Lo', password: '', tagline: 'A teenager named Cora is not in the best place. She is struggling and surrounded by tons of negativity and problems, which overwhelm and bring her down.' },
      { id: '63', name: 'The Opener', userFlg: true, director: 'David Yama', url: '', password: '', tagline: 'Ben, a liquor store clerk on the opening shift, is bamboozled by a series of lively encounters' },
      { id: '62', name: 'Maybe it\'s the Apocalypse', userFlg: true, director: 'Diana Lanham', url: 'https://youtu.be/CSb8tyjjYgw', password: '', tagline: 'As the pandemic drags on, a mother begins to suspect her daughter is losing her grip on reality.' },
      { id: '83', name: 'Tarzan\'s Escape', userFlg: true, director: 'Linda Yordy', url: 'https://vimeo.com/user90938251/review/485331750/7c8c6b5ec6', password: '', tagline: 'Verna Keller was sent to prison in 1947 at the age of 17. She escaped. Just to prove she could do it.' },
      { id: '64', name: 'Milk Dreams', userFlg: true, director: 'David Over', url: '', password: '', tagline: 'Socially anxious Mack operates a craft milk bar out of his garage. His world unravels when the city\'s health department drops by for an inspection.' },
      { id: '57', name: 'Gary', userFlg: true, director: 'Michael Rognlie', url: 'https://vimeo.com/625593398', password: 'Gary', tagline: 'A man contends with his new smart home and the horrors of its past.' },
      { id: '87', name: 'Color of Sky', userFlg: true, director: 'Dominick Cura', url: 'https://vimeo.com/560992523', password: '', tagline: 'In a world where no one sees color, new glasses are created that grant the ability to see color.' },
      { id: '65', name: 'Mike Sizzer', userFlg: true, director: 'David Over', url: '', password: '', tagline: 'Meet Mike. He wrestles chairs. And yeah, he\'s pretty dang good at it.' },
      { id: '88', name: 'The House', userFlg: true, director: 'Rosie Grypma, Wayne Lai', url: 'https://vimeo.com/manage/videos/700075767', password: 'thehouse', tagline: 'On a cold day in 1957 a house was built on the closest point to Hell on Earth.' },
      { id: '89', name: 'Embers', userFlg: false, director: 'Benjamin Ross Johnson', url: 'https://vimeo.com/manage/videos/722010432', password: 'embersareglowing2022', tagline: 'On a camping trip, two sisters deal with the death of their mother.' },
      { id: '67', name: 'finding us // again', userFlg: true, director: 'Ieva Bračiulytė, David Comeaux', url: 'https://www.youtube.com/watch?v=pGV4z4atGGs&ab_channel=ComeauxCreative', password: '', tagline: 'This dance film explores themes of childhood friendships, growing up, and finding each other again.' },
      { id: '71', name: 'Kurt', userFlg: true, director: 'Rimone Brandom', url: 'https://vimeo.com/559251859', password: '', tagline: 'When Dan is confronted by his mother and therapist in an intervention, he must depend on his imaginary friend, Kurt, to guide him through the situation.' },
      { id: '91', name: 'Room 13', userFlg: true, director: 'Ross Hotchkiss', url: 'https://youtu.be/iQrwSG3E5O8', password: '', tagline: 'A vice stake out in a suburban motel has unforeseen consequences.' },
      { id: '85', name: 'MARBLE - red room', userFlg: false, director: 'Kevin Bailey', url: 'https://www.youtube.com/watch?v=AI4ubjYxtrw', password: '', tagline: 'A music video exploring depression leading to self destruction.' },
      { id: '82', name: 'Balloon', userFlg: true, director: 'Richard Martin', url: 'https://vimeo.com/485340751/0c2f7715d5', password: '', tagline: 'The film the balloon industry doesn’t want you to see!' },
      { id: '92', name: 'Moving On', userFlg: true, director: 'Kevin Leung', url: 'https://youtu.be/kC_Z7dYdybI', password: '', tagline: 'A human story about overcoming loss set in an Asian American backdrop.' },
      { id: '79', name: 'Cuz You\'re My Girl', userFlg: true, director: 'Rob Barnett', url: 'https://youtu.be/1LVTP96OJWw', password: '', tagline: 'A fun and funny look at a WWE love story parody with a surprise twist!' },
      { id: '93', name: 'Nowhere to Escape', userFlg: false, director: 'ZiYuan Wang', url: 'https://vimeo.com/693205041/646b738e08', password: '', tagline: 'A girl who studies psychology begins to have symptoms of mental disorder due to her overload research work.' },
      { id: '81', name: 'STAY', userFlg: true, director: 'Angela DiMarco', url: 'https://vimeo.com/660536428', password: 'STAYALWAYS2022', tagline: 'When life forces Caroline and Anthony apart, will their love last?' },
      { id: '68', name: 'The Artifact', userFlg: true, director: 'Scott G. Linson', url: 'https://youtu.be/X7p9Nmtcjvw', password: '', tagline: 'A veteran learns that his alien-abduction dreams are true and is reunited with a cube that can give powers.' },
      { id: '94', name: 'The Ghosts They Carry', userFlg: false, director: 'Pat McAbery', url: 'https://f.io/5SbKkjK8', password: '', tagline: 'First responders experience the very worst in what life can bring. They all carry scars of their service, but some can\'t overcome.' },
      { id: '95', name: 'Kitsune', userFlg: true, director: 'Joshua Woodcock', url: 'https://vimeo.com/662769379', password: 'Kitsune2022', tagline: 'A young foster girl finds a mysterious bell that opens the door to imaginary figures around her. When one befriends her asking for help, she runs away to help return him to his family.' },
      { id: '96', name: 'Amidst the Stars', userFlg: false, director: 'Dustin Morrow', url: 'https://vimeo.com/653933091', password: 'space', tagline: 'After discovering his spacecraft will be unable to return him to Earth, an astronaut deals with loneliness and isolation as he sends his final transmission home.' },
      { id: '70', name: 'Something Behind the Walls', userFlg: true, director: 'Kit Wilson', url: '', password: '', tagline: 'In 1936, a Philadelphia reporter journeys to a deserted farm to research local myths, only to discover an unspeakable horror that threatens to destroy her and the entire family.' },
      { id: '97', name: 'My Happy Place', userFlg: true, director: 'Devin Scott', url: 'https://vimeo.com/642532765', password: 'dreamcine', tagline: 'In 1965, 7 year old Anna Boreman sets off on a 6 week road trip across America with her estranged, traveling minister father in search of forgiveness and Autopia.' },
      { id: '86', name: 'Manly Men of the Mountains', userFlg: true, director: 'David L. Anderson, Charles Cruz', url: '', password: '', tagline: 'If life gives you trees, sharpen your saw.' },
      { id: '80', name: 'Neshamah', userFlg: true, director: 'Tony Doupe', url: 'https://vimeo.com/659122617', password: 'Soul2022', tagline: 'An estranged brother and sister\'s love is tested when they learn of their ailing father\'s wish for assisted suicide.' },
      { id: '56', name: 'Thingamajigs', userFlg: true, director: 'A. S. Templeton', url: '', password: '', tagline: 'Beware of picture books given you by strangers' },
    ]
  }

}
