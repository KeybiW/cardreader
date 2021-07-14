import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardReaderComponent } from '../card-reader/card-reader.component';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { ActivatedRoute, Router } from '@angular/router';
import { timeout } from 'q';

let timer;
@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit, OnDestroy {
  constructor(
    private route: ActivatedRoute,
    public user: UserService,
    private location: Location,
    private router: Router,
    ) {
    timer = setTimeout(() => {
      // this.location.back();
      // window.location.replace('http://localhost:4200');
      router.navigate(['/']);
    }, 6000);
  }

  ngOnDestroy(): void {
    clearTimeout(timer);
  }


  ngOnInit(): void {

  }


}



