import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-card-reader',
  templateUrl: './card-reader.component.html',
  styleUrls: ['./card-reader.component.css']
})
@Injectable({
  providedIn: 'root'
})

// 0xff 0x00 0x06 0x83 0x45 0x83 0x12 0xa4 0xab 0xb2  - Tam Kart
// 0xff 0x00 0x06 0x83 0x45 0x83 0x12 0xa4 0xab 0xb2 0xff 0x00  0x06 0x83 0x45 0x83 0x12 0xa4 0xab 0xb2 - Test Kartı
// ['ff','00','06','83','45','83','12','a4','ab','b2'];

/* Kart Okuyucu Kodu */
export class CardReaderComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private readonly http: HttpClient,
  ) {
    console.log('CardReader');
  }

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public cardData = {
    cardNo: [],
    artan: [],
  };

  private apiUrl = 'https://randomuser.me/api/';
  user: User = null;

  public onRead(hexVault: Array<string>): any {
    console.log('Alınan Veri: ', hexVault);
    const cardRead = ['ff', '00', '06', '83'];
    this.router.navigateByUrl('/userinfo');

    for (let i = 0; i + 10 <= hexVault.length; i++) {
      const hexVaultSliced10 = hexVault.slice(i, i + 10);
      if (hexVaultSliced10.length === 10) {
        const hexVaultSliced4 = hexVaultSliced10.slice(0, 4);
        if (hexVaultSliced4.toString() === cardRead.toString()) {
          let sonuc = 0;
          for (let j = 1; j <= 8; j++) {
            sonuc += parseInt(hexVaultSliced10[j], 16);
          }
          console.log('mod', sonuc % 256);
          if ((sonuc % 256) === parseInt(hexVaultSliced10[9], 16)) {
            const cardNumber = hexVaultSliced10.slice(4, 8);
            const heksVault = hexVault.slice(10, hexVault.length);

            this.cardData.cardNo = cardNumber;
            this.cardData.artan = heksVault;
            this.getUser();
            return;
          }

        }
      }

    }

  }

  /* Api */
  public getUser(): void {
    this.http.get<UserApiResponse>(this.apiUrl + this.cardData.cardNo.join('')).subscribe(data => {
      this.user = data.results[0];
    });
  }


  public async connectSerial(): Promise<string | Array<string> | any> {
    try {
      const port = await navigator.serial.requestPort();
      await port.open({ baudRate: 9600 });

      // const decoder = new TextDecoderStream();

      // port.readable.pipeTo(decoder.writable);

      const inputStream = port.readable;
      const reader = inputStream.getReader();
      let hexVault = [];
      while (true) {
        const { value: bytes, done } = await reader.read() as { value: Uint8Array, done: boolean };
        if (bytes) {
          const hexArr: Array<string> = Array.from(bytes).map(x => {
            const inside = x.toString(16);
            if (inside.length === 1) {
              return '0' + inside;
            } else if (inside.length === 2) {
              return inside;
            } else {
              alert('Hatalı geldi');
              console.error('inside: ', inside);
              return '00';
            }
          });
          hexVault.push(...hexArr);
          this.onRead(hexVault);
          const result = this.cardData;

          if (result) {
            hexVault = result.artan;
            console.log('Artan Veri: ', result.artan);
            console.log('Kart Numarası: ', result.cardNo);
          }

        }



        if (done) {
          console.log('[readLoop] DONE', done);
          reader.releaseLock();
          break;
        }
      }

    } catch (error) {
      console.error(error);
    }
  }

  ngOnInit(): void {
  }

}






/* Api Kodu */
interface User {
  gender: string;
  name: {
    title: string;
    first: string;
    last: string;
  };
  location: {
    city: string;
    country: any;
  };
  email: any;
  dob: {
    age: number;
  };
  cell: string;
  picture: {
    large: string;
  };
}


interface UserApiResponse {
  // Create from here: https://randomuser.me/documentation#results
  results: User[];
  info: { /* ... */ };
}



