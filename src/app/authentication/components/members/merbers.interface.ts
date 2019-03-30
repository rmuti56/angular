import { IAccount, IRoleAccount } from 'src/app/shareds/services/account.service';

export interface IMembersComponent {
  items: IAccount[];

  // ส่วนของการค้นหา
  searchText: string;
  searchType: IMemberSearchKey;
  searchTypeItems: IMemberSearchKey[];
  Role: typeof IRoleAccount;
  UserLogin: IAccount;
  onSearchItem(): void;
  getRoleName(role: IRoleAccount): string;
  onDeleteMember(item: IAccount): void;
  ngOnDestroy(): void;
  ngOnInit(): void;
  onUpdateMember(item: IAccount): void;

}

export interface IMemberSearch {
  searchText: string;
  searchType: string;
}

export interface IMemberSearchKey {
  key: string;
  value: string;
}