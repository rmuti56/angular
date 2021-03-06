import { Component, OnInit, ViewChild } from '@angular/core';
import { AppURL } from 'src/app/app.url';
import { AuthURL } from '../../authentication.url';
import { MemberService } from '../../services/member.service';
import { IMembersComponent, IMemberSearchKey, IMemberSearch } from './merbers.interface';
import { IAccount, IRoleAccount, AccountService } from 'src/app/shareds/services/account.service';
import { AlertService } from 'src/app/shareds/services/alert.service';
import { DataTableDirective } from 'angular-datatables';
import { Subject } from 'rxjs';
import { Router } from '@angular/router';
import { AuthenService } from 'src/app/services/authen.service';

@Component({
  selector: 'app-members',
  templateUrl: './members.component.html',
  styleUrls: ['./members.component.css'],
  providers: [MemberService]
})
export class MembersComponent implements IMembersComponent {
  items: IAccount[] = [];
  dtOptions: DataTables.Settings = {};
  @ViewChild(DataTableDirective)
  dtElement: DataTableDirective;
  dtTrigger: Subject<any> = new Subject();
  constructor(
    private member: MemberService,
    private alert: AlertService,
    private router: Router,
    private authen: AuthenService,
    private account: AccountService
  ) {

    //กำหนดค่าเริ่มต้นให้กับ searchType
    this.searchType = this.searchTypeItems[0];

    this.initialLoadUserLogin();
    console.log(this.Role)
  }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 10,
      order: [5, "desc"]
    };
    this.initialLoadMember();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  // ตรวจสอบสิทธิ์ผู้ใช้งาน
  UserLogin: IAccount;
  Role = IRoleAccount;
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

  //ลบข้อมูลสมาชิก
  onDeleteMember(item: IAccount) {
    console.log(item.email)
    this.alert.confirm('คุณต้องการลบข้อมูลใช่หรือไม่').then(status => {
      if (!status) return;
      this.member.deleteMember(item.email)
        .then(res => {
          this.dtElement.dtInstance.then((dtInstance: DataTables.Api) => {
            dtInstance.destroy();
            this.initialLoadMember();
          });
        })
        .catch(err => {
          console.log(err)
          this.alert.notify(err.Message)
        })

    })
  }

  // แก้ไขข้อมูลสมาชิกโดยส่ง id ไปยัง url
  onUpdateMember(item: IAccount) {
    this.router.navigate(['',
      AppURL.Authen,
      AuthURL.MemberCreate, item.email]
    )//หรืออีกวิธี ,item.id(ต้องสร้าง path ให้รู้จัก) ,{id:item.id}, { queryParams: { id: item.id }
  }


  //โหลดข้อมูลสมาชิก
  private initialLoadMember(options?: IMemberSearch) {
    this.member
      .getMembers(options)
      .then(item => {
        this.items = item;
        this.dtTrigger.next();
      })
      .catch(err => {
        console.log(err)
        this.alert.notify(err.Message)
      })
  }

  //โหลดข้อมูลผู้ใช้ที่ login
  private initialLoadUserLogin() {
    this.UserLogin = this.account.UserLogin;
    this.account
      .getUserLogin(this.authen.getAuthenticated())
      .then(UserLogin => this.UserLogin = UserLogin)
      .catch(err => this.alert.notify(err.Message))

  }

  AppURL = AppURL;
  AuthURL = AuthURL;

}
