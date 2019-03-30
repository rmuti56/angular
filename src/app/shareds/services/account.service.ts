import { Injectable } from '@angular/core';
import { IRegister } from 'src/app/components/register/register.interface';
import { Iloign } from 'src/app/components/login/login.interface';
import { IProfile } from 'src/app/authentication/components/profile/prifile.interface';
import { IChangePassword } from 'src/app/authentication/components/profile/change-password/change-password.interface';
import { HttpService } from 'src/app/services/http.service';
@Injectable({
  providedIn: 'root'
})
export class AccountService { //Service นี้คือ global service

  constructor(
    private http: HttpService
  ) {

  }

  public mockUserItem: IAccount[] = [
    {
      id: 1,
      firstname: 'employee',
      lastname: 'employee',
      email: 'frontend@hotmail.com',
      password: '1111111',
      position: 'Frontend Developer',
      image: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/48.jpg',
      role: IRoleAccount.Employee,
      created: new Date(),
      updated: new Date()

    }, {
      id: 2,
      firstname: 'admin',
      lastname: 'admin',
      email: 'backend@hotmail.com',
      password: '1111111',
      position: 'Backend Developer',
      image: null,
      role: IRoleAccount.Admin,
      created: new Date(),
      updated: new Date()
    },
    {
      id: 3,
      firstname: 'วัชระเทพ',
      lastname: 'คำหนูไทย',
      email: 'test@hotmail.com',
      password: '1111111',
      position: 'Backend Developer',
      image: null,
      role: IRoleAccount.Member,
      created: new Date(),
      updated: new Date()
    }
  ];

  //เปลี่ยนรหัสผ่าน
  onChangePassword(accessToken: string, model: IChangePassword) {
    return this.http.requestPost('changepassword', model, accessToken)
      .toPromise() as Promise<any>
  }

  // แก้ไขข้อมูลส่วนตัว Update profile
  onUpdateProfile(accessToken: string, model: IProfile) {
    return (this.http.requestPost('profile', model, accessToken)
      .toPromise() as Promise<IAccount>)
      .then(user => {
        console.log(user)
        this.setUserLogin(user)
      })
  }
  //store user login
  public UserLogin: IAccount = {} as any;
  public setUserLogin(userLogin: IAccount) {
    this.UserLogin.id = userLogin.id;
    this.UserLogin.firstname = userLogin.firstname;
    this.UserLogin.lastname = userLogin.lastname;
    this.UserLogin.password = userLogin.password;
    this.UserLogin.position = userLogin.position;
    this.UserLogin.image = userLogin.image;
    this.UserLogin.updated = userLogin.updated;
    this.UserLogin.created = userLogin.created;
    this.UserLogin.email = userLogin.email;
    this.UserLogin.role = userLogin.role;
    return this.UserLogin;
  }

  // ดึงข้อมูลผู้ที่เข้าสู่ระบบจาก Token
  getUserLogin(accessToken: string) {
    return (this.http
      .requestGet('data', accessToken)
      .toPromise() as Promise<IAccount>)
      .then(userLogin => this.setUserLogin(userLogin))
  }

  //เข้าสู่ระบบ
  onLogin(model: Iloign) {
    return this.http
      .requestPost('login', model)
      .toPromise() as Promise<IAccount>
  }

  // ลงทะเบียน
  onRegister(model: IRegister) {
    return this.http
      .requestPost('register', model)
      .toPromise() as Promise<IAccount>;
  }
}

export interface IAccount {
  firstname: string;
  lastname: string;
  email: string;
  password: string;

  id?: any;
  position?: string;
  image?: string;
  role?: IRoleAccount;
  created?: Date;
  updated?: Date;
}

export enum IRoleAccount {
  Member,
  Employee,
  Admin
}