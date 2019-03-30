import { Injectable } from "@angular/core";
import { AccountService, IAccount, IRoleAccount } from 'src/app/shareds/services/account.service';
import { IMemberSearch } from '../components/members/merbers.interface';
import { reject } from 'q';
import { Message } from '@angular/compiler/src/i18n/i18n_ast';
import { ResolveEnd } from '@angular/router';
import { HttpService } from 'src/app/services/http.service';

@Injectable()
export class MemberService {
  constructor(
    private account: AccountService,
    private http: HttpService,
  ) {
    this.generaterMember();
  }

  //ดึงข้อมูลสมาชิก
  getMembers(options?: IMemberSearch) {
    return this.http.requestGet('members').
      toPromise() as Promise<any>
  }

  //ดึงข้อมูลสมาชิกแค่คนเดียว
  getMember(email) {
    return this.http.requestGet(`updatemembers?email=${email}`)
      .toPromise() as Promise<any>
  }

  //แก้ไขสมาชิก
  updateMember(email: any, model: IAccount) {
    return this.http.requestPost(`updatemembers?email=${email}`, model)
      .toPromise() as Promise<any>
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
    return this.http
      .requestPost('register', model)
      .toPromise() as Promise<IAccount>;
  }


  //ลบข้อมูลสมาชิก
  deleteMember(email: any) {
    return this.http.requestDelete(`deletemembers?email=${email}`)
      .toPromise() as Promise<any>
  }

}