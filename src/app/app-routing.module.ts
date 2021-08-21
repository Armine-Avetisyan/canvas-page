import { NgModule } from '@angular/core';
import {RouterModule, Routes} from "@angular/router";
import {SigninComponent} from "./pages/signin/signin.component";
import {SignupComponent} from "./pages/signup/signup.component";
import {CanvasComponent} from "./pages/canvas/canvas.component";

const routes: Routes = [

  {path: 'login', component: SigninComponent },
  {path: 'signup', component: SignupComponent },
  {path: 'canvas', component: CanvasComponent },
  { path: '**', component: SigninComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes)
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
