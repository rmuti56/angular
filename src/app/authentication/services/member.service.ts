import { Injectable } from "@angular/core";
import { AccountService, IAccount, IRoleAccount } from 'src/app/shareds/services/account.service';
import { IMemberSearch } from '../components/members/merbers.interface';
import { reject } from 'q';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ResolveEnd } from '@angular/router';

@Injectable()
export class MemberService {
  constructor(
    private account: AccountService
  ) {
    this.generaterMember();
  }

  //ดึงข้อมูลสมาชิก
  getMembers(options?: IMemberSearch) {
    return new Promise<IAccount[]>((resolve, reject) => {
      let items = this.account.mockUserItem;
      //หากมีการค้นหาข้อมูล
      if (options) {
        //ค้นหาข้อมุลแล้วนำค่ามาเก็บไว้ในตัวแปร items
        items = this.account
          .mockUserItem
          .filter(item => item[options.searchType].toString().toLowerCase()
            .indexOf(options.searchText.toString().toLowerCase()) >= 0
          );
      }
      resolve(items);
    })
  }

  //ดึงข้อมูลสมาชิกแค่คนเดียว
  getMember(id) {
    return new Promise<IAccount>((resolve, reject) => {
      const member = this.account.mockUserItem.find(item => item.id == id);
      if (!member) return reject({ Message: 'ไม่มีข้อมูลสมาชิกในระบบ' })
      return resolve(member);
    })
  }

  //แก้ไขสมาชิก
  updateMember(id: any, model: IAccount) {
    return new Promise<IAccount>((resolve, reject) => {
      const member = this.account.mockUserItem.find(item => item.id == id)
      if (!member) return reject({ Message: 'ไม่ข้อมูลในระบบ' })
      const findEmail = this.account.mockUserItem.find(item => { return item.email == model.email && item.email != member.email })
      if (findEmail) return reject({ Message: 'มีอีเมลล์นี้อยู่ในระบบแล้ว' })
      member.email = model.email;
      member.password = model.password || member.password; //หากไม่กรอก password ใช้อันเดิม
      member.firstname = model.firstname;
      member.lastname = model.lastname;
      member.position = model.position;
      member.role = model.role;
      member.image = model.image;
      member.updated = new Date();
      resolve(member);
    })
  }

  //จำลองข้อมูลสมาชิก
  private generaterMember() {
    const position = ['Frontend Developer', 'Backend Developer']
    const roles = [IRoleAccount.Member, IRoleAccount.Employee, IRoleAccount.Admin]
    // for (let i = 3; i <= 300; i++) {
    //   this.account.mockUserItem.push({
    //     id: i.toString(),
    //     firstname: `Firstname ${i}`,
    //     lastname: `lastname ${i}`,
    //     email: `mail-${i}@hotmail.com`,
    //     password: '111111',
    //     position: position[Math.round(Math.random() * 1)],
    //     role: roles[Math.round(Math.random() * 2)],
    //     created: new Date(),
    //     updated: new Date()
    //   })
    // }
  }

  //เพิ่มข้อมูลสมาชิก
  createMember(model: IAccount) {
    return new Promise<IAccount>((resolve, reject) => {
      if (this.account.mockUserItem.find(item => item.email == model.email))
        return reject({ Message: 'อีเมลล์นี้มีในระบบแล้ว' })
      model.id = Math.random();
      model.created = new Date();
      model.updated = new Date();
      this.account.mockUserItem.push(model);
      resolve(model);
    })
  }

  //ลบข้อมูลสมาชิก
  deleteMember(id: any) {
    return new Promise((resolve, reject) => {
      const findIndex = this.account.mockUserItem.findIndex(item => item.id == id);
      if (findIndex < 0) return reject({ Message: 'ไม่มีข้อมูลในระบบ' });
      resolve(this.account.mockUserItem.splice(findIndex, 1));
    })
  }

}