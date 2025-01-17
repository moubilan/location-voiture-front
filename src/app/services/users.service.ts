import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, lastValueFrom } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  private BASE_URL = "http://localhost:8080";

  private authState = new BehaviorSubject<{ isAuthenticated: boolean; isAdmin: boolean; isUser: boolean }>({
    isAuthenticated: this.isAuthenticated(),
    isAdmin: this.isAdmin(),
    isUser: this.isUser(),
  });

  authState$ = this.authState.asObservable();

  constructor(private http: HttpClient, private router:Router) { }

  private updateAuthState(): void {
    this.authState.next({
      isAuthenticated: this.isAuthenticated(),
      isAdmin: this.isAdmin(),
      isUser: this.isUser(),
    });
  }


  async login(email:string, password:string):Promise<any>{
    const url = `${this.BASE_URL}/auth/login`;
    try{
      const response =  await lastValueFrom(this.http.post<any>(url, {email, password}))
      localStorage.setItem('token', response.token);
      localStorage.setItem('role', response.role);
      localStorage.setItem('user', JSON.stringify(response.user));
      this.updateAuthState();
      return response;

    }catch(error){
      throw error;
    }
  }

  async register(userData:any):Promise<any>{
    const url = `${this.BASE_URL}/auth/register`;
    try{
      const response =  await lastValueFrom(this.http.post<any>(url, userData))
      return response;
    }catch(error){
      throw error;
    }
  }

  getLoggedUserId(): number | null {
    const user = localStorage.getItem('user');
    if (user) {
      return JSON.parse(user).id;
    }
    return null;
  }

  async getAllUsers(token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/get-all-users`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  await lastValueFrom(this.http.get<any>(url, {headers}))
      return response;
    }catch(error){
      throw error;
    }
  }

  async getYourProfile(token:string):Promise<any>{
    const url = `${this.BASE_URL}/adminuser/get-profile`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  await lastValueFrom(this.http.get<any>(url, {headers}))
      console.log(response)
      return response;
    }catch(error){
      throw error;
    }
  }

  async getUsersById(userId: string, token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/get-users/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  await lastValueFrom(this.http.get<any>(url, {headers}))
      return response;
    }catch(error){
      throw error;
    }
  }

  async deleteUser(userId: string, token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/delete/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  await lastValueFrom(this.http.delete<any>(url, {headers}))
      return response;
    }catch(error){
      throw error;
    }
  }

  async updateUSer(userId: string, userData: any, token:string):Promise<any>{
    const url = `${this.BASE_URL}/admin/update/${userId}`;
    const headers = new HttpHeaders({
      'Authorization': `Bearer ${token}`
    })
    try{
      const response =  await lastValueFrom(this.http.put<any>(url, userData, {headers}))
      return response;
    }catch(error){
      throw error;
    }
  }

  /***AUTHEMNTICATION METHODS */
  logOut():void{
      localStorage.removeItem('token')
      localStorage.removeItem('role')
      localStorage.removeItem('user')
      this.updateAuthState();
      this.router.navigate(['/login'])
      console.log("logout")
  }

  isAuthenticated(): boolean {
    if(typeof localStorage !== 'undefined'){
      const token = localStorage.getItem('token');
      return !!token;
    }
    return false;

  }

  isAdmin(): boolean {
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('role');
      return role === 'MANAGER'
    }
    return false;

  }

  isUser(): boolean {
    if(typeof localStorage !== 'undefined'){
      const role = localStorage.getItem('role');
      return role === 'CLIENT'
    }
    return false;

  }


}
