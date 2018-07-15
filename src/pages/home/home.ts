import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { NewPage } from '../new/new';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  page;
  constructor(public navCtrl: NavController) {
    this.page = NewPage;
  }

  navigate(){
    window.open('facetime:mail@mail.com', '_self');
    this.navCtrl.push(NewPage)
  }

  

}
