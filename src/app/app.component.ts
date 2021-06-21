import { Component } from '@angular/core';
import { CardReaderComponent } from './card-reader/card-reader.component';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Random User Generator';

  constructor(
    private readonly cardReaderService: CardReaderComponent,
  ) {
    // this.cardReaderService.connectSerial();
    // this.cardReaderService.getUser();
  }


}
