import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule, ModalModule, PaginationModule } from 'ngx-bootstrap';
import { AuthNavbarComponent } from './components/auth-navbar/auth-navbar.component';
import { AuthSidebarComponent } from './components/auth-sidebar/auth-sidebar.component';
import { AuthContentComponent } from './components/auth-content/auth-content.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
import { AlertService } from './services/alert.service';
//import { AccountService } from './services/account.service';
import { ValidatorsService } from './services/validators.service';
import { DataTablesModule } from 'angular-datatables';
import { SharedsService } from './services/shareds.service';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    AuthNavbarComponent,
    AuthSidebarComponent,
    AuthContentComponent,
    LoadingComponent
  ],
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    RouterModule,
    ReactiveFormsModule,
    FormsModule,
    DataTablesModule,

  ],
  exports: [
    AuthNavbarComponent,
    AuthSidebarComponent,
    BsDropdownModule,
    AuthContentComponent,
    ReactiveFormsModule,
    FormsModule,
    ModalModule,
    PaginationModule,
    DataTablesModule
  ],
  providers: [
    AlertService,
    //AccountService,
    ValidatorsService,
    SharedsService,
  ]
})
export class SharedsModule { }
