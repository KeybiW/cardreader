import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';

export interface User {
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

const errorCodes = {
  400: 'Kart bulunamadı.',
  403: 'Gerekli izinlere sahip değilsiniz.',
  404: 'Bulunamadı.',
  408: 'İstek zaman aşımına uğradı.',
  429: 'Kullanıcı çok fazla istek gönderdi.',
  500: '500 - Dahili sunucu hatası.',
  502: '502 - Geçersiz ağ geçidi.',
  503: '503 - Hizmete erişilemiyor.',
  504: '504 - Ağ geçidi zaman aşımına uğradı.',
  0:   '0 - Internet bağlantısı mevcut değil.'
};

@Injectable({
  providedIn: 'root'
})

export class UserService {

  private apiUrl = 'https://europe-west3-easypms-angus-internal-chat.cloudfunctions.net/function-1/';
  user: User = null;
  errorMsg = 'Lütfen Kart Okutunuz';

  constructor(private http: HttpClient) { }

  public async getUser(cardNo: string): Promise<User> {
    try {
      const data = await this.http.post<User>(this.apiUrl, { cardNo: cardNo }).toPromise();
      console.log('data', data);
      this.user = data;
      return data;
    } catch (error) {
      this.errorMsg = 'Hata';
      this.user = null;
      if (error instanceof HttpErrorResponse) {
        if (error.status in errorCodes) {
          this.errorMsg = errorCodes[error.status];
        } else {
          this.errorMsg = 'Bilinmeyen hata';
        }
      }
    }
  }
}
