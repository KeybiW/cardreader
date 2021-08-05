import { Component } from '@angular/core';
import { CardReaderComponent } from './card-reader/card-reader.component';


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'Antalya Otel';

  constructor(
    private readonly cardReaderService: CardReaderComponent,
  ) {

  }
}
