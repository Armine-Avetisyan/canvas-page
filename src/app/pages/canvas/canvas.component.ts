import { Component, ElementRef, OnInit, ViewEncapsulation} from '@angular/core';
import {ICircle} from "../../shared/interfaces/circle.interface";
import {ECircleCount} from "../../shared/enums/circle-count.enum";
import {LocalstorageService} from "../../shared/services/localstorage.service";
import {IProject} from "../../shared/interfaces/project.interface";
import {Circle} from "../../shared/classes/circle.class";
import {Project} from "../../shared/classes/project.class";
import {IUser} from "../../shared/interfaces/user.interface";
import {AuthService} from "../../shared/services/auth.service";

@Component({
  selector: 'app-canvas',
  templateUrl: './canvas.component.html',
  styleUrls: ['./canvas.component.css']
})
export class CanvasComponent implements OnInit{
  circles: ICircle[] = [];
  selectedProject = {};
  projectName: string = '';
  projectList: IProject[] = [];
  projectListName = 'circlesProject';
  canvasSizes: number[] = [
    ECircleCount.MIN, // 100
    ECircleCount.MID, // 225
    ECircleCount.MAX, // 400
  ];
  selectedSize: number = this.canvasSizes[0];
  currentColor: string = '#bfb718';
  currentUser!: IUser;
  currentUsersProjects: IProject[] = [];

  constructor(private storage: LocalstorageService,
              private auth: AuthService) { }

  ngOnInit(): void {
     this.getProjects();
     // console.log(this.projectList)

  }


  onGenerateCircles(): void {
    this.resetColors()
  }

  onSizeSelect(): void {
    this.selectedProject = {} as IProject;
    this.circles = [];
  }

  onCircleClick(circle: ICircle): void {
    this.circles[circle.id].color = this.currentColor !== circle.color ? this.currentColor : "";
  }

  onResetColor(): void {
    if (!this.isEmpty(this.circles)) {
      this.resetColors();
    }
  }

  resetColors(): void {
    this.circles = [];
    for (let i = 0; i < this.selectedSize; i++) {
      this.circles.push(new Circle(i, this.newId(), ""));
    }
  }

  onFillCircles(): void {
    if (this.isEmpty(this.circles)) {
      return;
    }
    this.circles.forEach((item) => {
      item.color = this.currentColor;
    })
  }

  isEmpty(arr: ICircle[]): boolean {
    return !arr.length;
  }

  newId(): string {
    return String(Date.now());
  }

  saveProjects() {
    const projectsStr = JSON.stringify(this.projectList);
    return this.storage.set(this.projectListName, projectsStr);
  }

  onSave(): void {
    if (this.isEmpty(this.circles) || !this.projectName) {
      return;
    }
    this.projectList.push(new Project(
      this.newId(),
      this.projectName,
      this.circles,
      this.currentUser.email,
    ))
    this.currentUsersProjects.push(new Project(
      this.newId(),
      this.projectName,
      this.circles,
      this.currentUser.email,
    ))
    this.saveProjects();
    this.projectName = "";
  }

  getProjects(): void {
    const currentUser = this.storage.get(this.auth.currentUsersListName);
    if(currentUser) {
      this.currentUser = JSON.parse(currentUser);
    }
    this.currentUsersProjects = [];
    const projects = this.storage.get(this.projectListName);
    if (projects) {
      this.projectList = JSON.parse(projects);
      this.projectList.map(el => {
        if (el.userEmail === this.currentUser.email)
          this.currentUsersProjects.push(el);
      })
    }
  }


  selectProject(project: IProject): void {
    this.selectedProject = project;
    this.circles = project.circles;
    this.selectedSize = project.circles.length;
  }

  onDelete(proj: IProject):void {
    if (proj === this.selectedProject) {
      this.selectedProject = {} as IProject;
    }
    this.projectList = this.projectList.filter(item => {
      return  item.id !== proj.id;
    })
    this.currentUsersProjects = this.currentUsersProjects.filter(item => {
      return  item.id !== proj.id;
    })
    this.circles = [];
    this.saveProjects();
  }
}
