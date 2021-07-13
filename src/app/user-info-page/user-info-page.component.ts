import { Component, OnInit } from '@angular/core';
import { CardReaderComponent } from '../card-reader/card-reader.component';
import { UserService } from '../user.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit {

  constructor(
    public user: UserService,
    private location: Location

    ) {
    setTimeout(() => {
      // this.location.back(); // edit sayfasına dönebiliyor
      window.location.replace('http://localhost:4200');
    }, 60000);
   }

  ngOnInit(): void {
  }


}

