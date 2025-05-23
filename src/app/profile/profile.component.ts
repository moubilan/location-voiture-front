import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-profile',
  imports: [],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit{


  constructor(private readonly userService: UsersService,
    private readonly router: Router){}


    profileInfo: any;
    errorMessage: string = ''

  async ngOnInit() {
    try {
      const token = localStorage.getItem('token')
      if(!token){
        throw new Error("No Token Found")
      }

      this.profileInfo = await this.userService.getYourProfile(token);
      console.log(this.profileInfo)
    } catch (error:any) {
      this.showError(error.message)
    }
      
  }


  updateProfile(id: string){
      this.router.navigate(['/update', id])
  }


  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }

}
