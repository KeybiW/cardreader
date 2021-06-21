import { Component, OnInit } from '@angular/core';
import { CardReaderComponent } from '../card-reader/card-reader.component';

@Component({
  selector: 'app-user-info-page',
  templateUrl: './user-info-page.component.html',
  styleUrls: ['./user-info-page.component.css']
})
export class UserInfoPageComponent implements OnInit {

  constructor(public readonly cardReaderService: CardReaderComponent) { }

  ngOnInit(): void {
  }

}
