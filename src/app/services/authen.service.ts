import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root'
})
export class AuthenService {
  private accessKey = 'ssKey';

  //กำหนดค่า access token ไว้ในความจำ browser
  setAuthenticated(accessToken: any) {
    localStorage.setItem(this.accessKey, accessToken.accessToken);
  }

  //ดึงค่า access token ในความจำ browser ออกมา
  getAuthenticated(): string {
    return localStorage.getItem(this.accessKey)
  }

  //ล้างค่า access token ในความจำ  browser
  clearAuthenticated(): void {
    localStorage.removeItem(this.accessKey);
  }
}