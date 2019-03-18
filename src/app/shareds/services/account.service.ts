import { Injectable } from '@angular/core';
import { IRegister } from 'src/app/components/register/register.interface';
import { Iloign } from 'src/app/components/login/login.interface';
import { IProfile } from 'src/app/authentication/components/profile/prifile.interface';
import { IChangePassword } from 'src/app/authentication/components/profile/change-password/change-password.interface';
@Injectable({
  providedIn: 'root'
})
export class AccountService { //Service นี้คือ global service

  public mockUserItem: IAccount[] = [
    {
      id: 1,
      firstname: 'วัชระเทพ',
      lastname: 'คำหนูไทย',
      email: 'frontend@hotmail.com',
      password: '1111111',
      position: 'Frontend Developer',
      image: 'https://s3.amazonaws.com/uifaces/faces/twitter/jsa/48.jpg',
      role: IRoleAccount.Employee,
      created: new Date(),
      updated: new Date()

    }, {
      id: 2,
      firstname: 'วัชระเทพ',
      lastname: 'คำหนูไทย',
      email: 'backend@hotmail.com',
      password: '1111111',
      position: 'Backend Developer',
      image: null,
      role: IRoleAccount.Admin,
      created: new Date(),
      updated: new Date()
    }
  ];

  //เปลี่ยนรหัสผ่าน
  onChangePassword(accessToken: string, model: IChangePassword) {
    return new Promise((resolve, reject) => {
      const userProfile = this.mockUserItem.find(item => item.id == accessToken)
      if (!userProfile) return reject({ Message: 'ไม่มีผู้ใช้งานนี้ในระบบ' })
      if (userProfile.password != model.old_password) return reject({ Message: 'รหัสผ่านเดิมไม่ถูกต้อง' })
      userProfile.password = model.new_password;
      userProfile.updated = new Date();
      resolve(userProfile);
    })

  }

  // แก้ไขข้อมูลส่วนตัว Update profile
  onUpdateProfile(accessToken: string, model: IProfile) {
    return new Promise((resolve, reject) => {
      const userProfile = this.mockUserItem.find(user => user.id == accessToken)
      if (!userProfile) return reject({ Message: 'ไม่มีผู้ใช้นี้ในระบบ' });
      userProfile.firstname = model.firstname;
      userProfile.lastname = model.lastname;
      userProfile.position = model.position;
      userProfile.image = model.image;
      userProfile.updated = new Date();
      resolve(userProfile);

    })

  }

  // ดึงข้อมูลผู้ที่เข้าสู่ระบบจาก Token
  getUserLogin(accessToken: string) {
    return new Promise<IAccount>((resolve, reject) => {
      const userLogin = this.mockUserItem.find(m => m.id == accessToken);
      if (!userLogin) return reject({ Message: 'accessToken ไม่ถูกต้อง' });
      resolve(userLogin);
    })
  }

  //เข้าสู่ระบบ
  onLogin(model: Iloign) {
    return new Promise<{ accessToken: string }>((resolve, reject) => {
      const userLogin = this.mockUserItem.find(item => item.email == model.email && item.password == model.password);
      if (!userLogin) return reject({ Message: 'ชื่อผู้ใช้งานหรือรหัสผ่านไม่ถูกต้อง' })
      resolve({
        accessToken: userLogin.id
      });
    })
  }

  // ลงทะเบียน
  onRegister(model: IRegister) {
    return new Promise((resolve, reject) => {
      model['id'] = Math.random();
      this.mockUserItem.push(model);
      resolve(model);
    })
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