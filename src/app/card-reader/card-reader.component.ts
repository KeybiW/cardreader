import { Component, OnInit } from '@angular/core';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../user.service';

@Component({
  selector: 'app-card-reader',
  templateUrl: './card-reader.component.html',
  styleUrls: ['./card-reader.component.css']
})
@Injectable({
  providedIn: 'root'
})

// 0xff 0x00 0x06 0x83 0x45 0x83 0x12 0xa4 0xab 0xb2  - Tam Kart
// 0xff 0x00 0x06 0x83 0xe3 0xd4 0xfe 0x73 0xab 0x5c  - Tam Kart 'e3d4fe73'
// 0xff 0x00 0x06 0x83 0x98 0xc7 0x95 0xdd 0xab 0x05  - Tam Kart '98c795dd'
// 0xff 0x00 0x06 0x83 0xc7 0x24 0xeb 0x44 0xab 0x4e  - Tam Kart 'c724eb44'
// 0xff 0x00 0x06 0x83 0xbf 0xb8 0xd6 0xd9 0xab 0x5a  - Tam Kart 'bfb8d6d9'
// 0xff 0x00 0x06 0x83 0xde 0xf7 0x1f 0x1d 0xab 0x45  - Tam Kart 'def71f1d'
// 0xff 0x00 0x06 0x83 0x57 0x36 0xcf 0x62 0xab 0xf2  - Tam Kart '5736cf62'
// 0xff 0x00 0x06 0x83 0xf3 0x2a 0x20 0x68 0xab 0xd9  - Tam Kart 'f32a2068'
// 0xff 0x00 0x06 0x83 0x34 0xf0 0x3f 0xef 0xab 0x86  - Tam Kart '34f04fef'
// 0xff 0x00 0x06 0x83                     d91f7cf2
// 0xff 0x00 0x06 0x83                     83949357





// 0xff 0x00 0x06 0x83 0x45 0x83 0x12 0xa4 0xab 0xb2 0xff 0x00  0x06 0x83 0x45 0x83 0x12 0xa4 0xab 0xb2 - Test Kartı
// ['ff','00','06','83','45','83','12','a4','ab','b2'];

/* Kart Okuyucu Kodu */
export class CardReaderComponent implements OnInit {

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private router: Router,
    private http: HttpClient,
    private user: UserService,
  ) {
    console.log('CardReader');
  }

  public httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  public cardData = {
    cardNo: [],
    artan: [],
  };


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
            this.user.getUser(cardNumber.join(''));
            return;
          } else {
            console.error('Son karakter hatalı, olması gereken: ', (sonuc % 256).toString(16), 'Gelen: ', hexVaultSliced10[9]);
            this.user.errorMsg = 'Son karakter hatalı, olması gereken: ' + (sonuc % 256).toString(16) + 'Gelen: ' + hexVaultSliced10[9];
          }

        } else {
          this.user.errorMsg = 'Yanlış Komut';
        }
      } else {
        this.user.errorMsg = '10 gelmedi';
      }

    }

  }


  /*this.cardData.cardNo.join('')*/
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








