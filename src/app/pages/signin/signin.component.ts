import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AuthService} from "../../shared/services/auth.service";
import {LocalstorageService} from "../../shared/services/localstorage.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
})
export class SigninComponent implements OnInit {
  registerForm!: FormGroup;
  submitted = false;

  constructor(private fb: FormBuilder,
              private auth: AuthService,
              private storage: LocalstorageService,
              private router: Router) { }

  ngOnInit() {
    this.registerForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
    this.auth.getUsers();

    const user = this.storage.get(this.auth.currentUsersListName);
    if (user) {
      this.router.navigateByUrl("/canvas");
    }

  }

  get f() {
    return this.registerForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    if (this.registerForm.invalid && this.registerForm.markAllAsTouched() ) {
      return alert('Enter a valid email or password');
    }
    this.auth.login(this.registerForm.value.email, this.registerForm.value.password);

 }
}
