import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../../services/confirmvalidation";
import {LocalstorageService} from "../../services/localstorage.service";
import {IUser} from "../../interfaces";
import {Router} from "@angular/router";
import {User} from "../../classes/userclass";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  implements OnInit {
  registerForm!: FormGroup;
  submitted = false;
  userList: IUser[] = [];
  usersListName = 'usersList';
  register: boolean = false;

  constructor(private fb: FormBuilder,
              private storage: LocalstorageService,
              private router: Router){ }

  ngOnInit() {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmPassword: ['', Validators.required],
    }, {
      validator: MustMatch('password', 'confirmPassword')
    });
    this.getUsers();

  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    console.log(this.userList)
    this.userList.push(this.registerForm.value
      // new User(
      // this.registerForm.value.firstName,
      // this.registerForm.value.lastName,
      // this.registerForm.value.email,
      // this.registerForm.value.password,)
    )
    const usersStr = JSON.stringify(this.userList);
    this.storage.set(this.usersListName, usersStr);
    this.reset();
  }

  getUsers(): void {
    const users = this.storage.get(this.usersListName);
    if (users) {
      this.userList = JSON.parse(users);
    }
  }
  reset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
