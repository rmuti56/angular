import { Injectable } from "@angular/core";
import { AccountService, IAccount, IRoleAccount } from 'src/app/shareds/services/account.service';
import { IMemberSearch } from '../components/members/merbers.interface';

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

  //จำลองข้อมูลสมาชิก
  private generaterMember() {
    const position = ['Frontend Developer', 'Backend Developer']
    const roles = [IRoleAccount.Member, IRoleAccount.Employee, IRoleAccount.Admin]
    for (let i = 3; i <= 300; i++) {
      this.account.mockUserItem.push({
        id: i.toString(),
        firstname: `Firstname ${i}`,
        lastname: `lastname ${i}`,
        email: `mail-${i}@hotmail.com`,
        password: '111111',
        position: position[Math.round(Math.random() * 1)],
        role: roles[Math.round(Math.random() * 2)],
        created: new Date(),
        updated: new Date()
      })
    }
  }
}