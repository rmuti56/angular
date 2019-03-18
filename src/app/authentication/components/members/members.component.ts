import { Component, OnInit } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from '../../authentication.url';
import { MemberService } from '../../services/member.service';
import { IMembersComponent, IMemberSearchKey, IMemberSearch } from './merbers.interface';
import { IAccount, IRoleAccount } from 'src/app/shareds/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [MemberService]
})
export class MembersComponent implements IMembersComponent {
  constructor(
    private member: MemberService,
    private alert: AlertService,

  ) {
    this.initialLoadMember();
    //กำหนดค่าเริ่มต้นให้กับ searchType
    this.searchType = this.searchTypeItems[0];
  }
  items: IAccount[] = [];
  //ตัวแปรสำหรับค้นหา
  searchText: string = '';
  searchType: IMemberSearchKey;
  searchTypeItems: IMemberSearchKey[] = [
    { key: 'email', value: 'ค้นหาจากอีเมลล์' },
    { key: 'firstname', value: 'ค้นหาจากชื่อ' },
    { key: 'lastname', value: 'ค้นหาจากนามสกุล' },
    { key: 'position', value: 'ค้นหาจากตำแหน่ง' },
    { key: 'role', value: 'ค้นหาจากสิทธิ์ผู้ใช้' },
  ]

  //ค้นหาข้อมูล
  onSearchItem() {

    this.initialLoadMember({
      searchText: this.searchType.key == 'role' ? IRoleAccount[this.searchText] || '' : this.searchText,
      searchType: this.searchType.key
    }
    );

  }

  //แสดงชื่อสิทธิ์ผู้ใช้งาน
  getRoleName(role: IRoleAccount) {
    return IRoleAccount[role];
  }

  //โหลดข้อมูลสมาชิก
  private initialLoadMember(options?: IMemberSearch) {
    this.member
      .getMembers(options)
      .then(item => {
        console.log(item)
        this.items = item;

      })
      .catch(err => this.alert.notify(err.Message));
  }

  AppURL = AppURL;
  AuthURL = AuthURL;

}
