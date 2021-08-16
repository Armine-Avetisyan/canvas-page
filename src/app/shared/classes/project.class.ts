import {ICircle} from "../interfaces/circle.interface";
import {IProject} from "../interfaces/project.interface";

export class Project implements IProject{
  id: string
  name: string
  circles: ICircle[]
  userEmail: string
  constructor(id:string, name:string, circles:ICircle[],userEmail: string) {
    this.id = id;
    this.name = name;
    this.circles = circles;
    this.userEmail = userEmail;
  }
}
