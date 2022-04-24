import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserInfoService } from './shared/services/user-info.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor(
    private router: Router,
    private _userInfo: UserInfoService
  ) { }

  showFiller = false;

  showSidenav(): boolean {
    return !this.router.url.includes('login');
  }

  onLeave() {
    localStorage.setItem('user', '');
    this._userInfo.setUserInfo(0);
    this.router.navigate(['/login']);
    this.showSidenav();
  }
}
