import { CommonModule } from '@angular/common';
import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { FaIconComponent } from '@fortawesome/angular-fontawesome';
import { UsersService } from '../../services/users.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-navbar',
  imports: [CommonModule, RouterLink, FaIconComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent implements OnInit, OnDestroy{

  private authSubscription: Subscription = new Subscription();

  constructor(private readonly userService: UsersService, private readonly cdr: ChangeDetectorRef
  ){}

  isAuthenticated:boolean = false;
  isAdmin:boolean = false;
  isUser:boolean = false;


  ngOnInit(): void {
      this.authSubscription = this.userService.authState$.subscribe((authState) => {
        this.isAuthenticated = authState.isAuthenticated;
        this.isAdmin = authState.isAdmin;
        this.isUser = authState.isUser;
      });
      
  }

  ngOnDestroy(): void {
    this.authSubscription.unsubscribe();
  }

  logout():void{
    this.userService.logOut();
    this.isAuthenticated = false;
    this.isAdmin = false;
    this.isUser = false;
    console.log("nav")
  }

}
