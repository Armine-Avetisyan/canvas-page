import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {MustMatch} from "../../shared/services/confirmvalidation";
import {LocalstorageService} from "../../shared/services/localstorage.service";
import {IUser} from "../../shared/interfaces/user.interface";
import {Router} from "@angular/router";
import {User} from "../../shared/classes/user.class";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent  implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              private storage: LocalstorageService,
              private router: Router,
              private auth: AuthService){ }

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
    this.auth.getUsers()

  }

  get f() {
    return this.registerForm.controls;
  }

  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid) {
      return;
    }
    delete this.registerForm.value.confirmPassword;
    this.auth.signup(this.registerForm.value)
  }

  // reset() {
  //   this.submitted = false;
  //   this.registerForm.reset();
  // }
}
