import { Component, OnDestroy, OnInit } from '@angular/core';
import { CardReaderComponent } from '../card-reader/card-reader.component';
import { UserService } from '../user.service';
import { Location } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';
import { ActivatedRoute, Router } from '@angular/router';


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

      router.navigate(['/']);
    }, 60000);
  }

  ngOnDestroy(): void {
    clearTimeout(timer);
  }

  ngOnInit(): void {
  }

}



