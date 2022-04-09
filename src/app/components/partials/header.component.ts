import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../models/auth.service';
import { LocalStorageService } from '../../models/local-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  @Input() title?: string;

  constructor(public localStorageService:LocalStorageService,public auth:AuthService, private router:Router) {
    auth.username = localStorageService.getItem('username');
  }

  logout(){
    if (confirm('Are you sure?')){
      this.auth.clear();
      this.localStorageService.clear();
      this.router.navigateByUrl("/");
    }
  }
}
