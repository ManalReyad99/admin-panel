import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {
  UserRegister:FormGroup;
  customError={status:false,message:''};
  constructor() { }

  ngOnInit(): void {
  }

}
