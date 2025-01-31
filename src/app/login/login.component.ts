import { Component } from '@angular/core';
import { UsersService } from '../services/users.service';
import { Router, RouterLink } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {

  constructor(
    private readonly usersService: UsersService,
    private router: Router
  ) { }


  email: string = ''
  password: string = ''
  errorMessage: string = ''

  async handleSubmit() {

    if (!this.email || !this.password) {
      this.showError("Email and Password is required");
      return
    }

    try {
      const response = await this.usersService.login(this.email, this.password);
      if(response.statusCode == 200){
        console.log(response)
        const { id, email, username } = response.ourUser;
        const userData = { id, email, username };
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', response.token)
        localStorage.setItem('role', response.role)
        this.router.navigate(['/home'])
      }else{
        this.showError(response.message)
      }
    } catch (error: any) {
      this.showError(error.message)
    }

  }
  

  showError(mess: string) {
    this.errorMessage = mess;
    setTimeout(() => {
      this.errorMessage = ''
    }, 3000)
  }


}
