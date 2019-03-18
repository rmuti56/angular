import { IAccount, IRoleAccount } from 'src/app/shareds/services/account.service';

export interface IMembersComponent {
  items: IAccount[];

  // ส่วนของการค้นหา
  searchText: string;
  searchType: IMemberSearchKey;
  searchTypeItems: IMemberSearchKey[];
  onSearchItem(): void;

  getRoleName(role: IRoleAccount): string;
}

export interface IMemberSearch {
  searchText: string;
  searchType: string;
}

export interface IMemberSearchKey {
  key: string;
  value: string;
}