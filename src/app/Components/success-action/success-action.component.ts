import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-success-action',
  templateUrl: './success-action.component.html',
  styleUrls: ['./success-action.component.scss']
})
export class SuccessActionComponent implements OnInit {
alert:boolean=true;
  constructor() { }

  ngOnInit(): void {
  }

}
