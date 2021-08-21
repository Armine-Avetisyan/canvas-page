import { Injectable } from '@angular/core';
import {IUser} from "../interfaces/user.interface";
import {LocalstorageService} from "./localstorage.service";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  userList: IUser[] = [];
  usersListName = 'usersList';
  currentUsersListName = 'currentUsersList';
  currentUser!: IUser | undefined;


  constructor(private storage: LocalstorageService,
              private router: Router) { }

  getUsers(): void {
    const users = this.storage.get(this.usersListName);
    if (users) {
      this.userList= JSON.parse(users);
    }
  }
  getCurrentUsers(): void {
    const currentUsers = this.storage.get(this.currentUsersListName);
    if (currentUsers) {
      this.currentUser = JSON.parse(currentUsers);
    }
  }
  signup(user: IUser) {
    this.userList.push(user);
    const usersStr = JSON.stringify(this.userList);
    this.storage.set(this.usersListName, usersStr);
    this.router.navigateByUrl('/login')
  }

  login(email: string, password: string) {
    this.currentUser = this.userList.find(user => {
      return  user.email === email && user.password === password;
    });
    if (this.currentUser) {
     const currentUser = JSON.stringify(this.currentUser);
     this.storage.set(this.currentUsersListName, currentUser)
     this.router.navigateByUrl('/canvas')
    }

  }

  loginCheck() {
   this.getCurrentUsers();
   if(!this.currentUser) {
     this.router.navigateByUrl('/login')
   }
  }

  logout() {
    this.storage.remove(this.currentUsersListName);
    this.currentUser = undefined;
    this.router.navigateByUrl('/login');
  }

  isLoggedIn() {
    if (this.currentUser === undefined) {
      return false;
    }
    return true;
  }

}

