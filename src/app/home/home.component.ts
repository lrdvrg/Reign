import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  isAllSelected = true;
  selection = '';

  selectionOptions = [
    {value: 'angular', viewValue: 'Angular'},
    {value: 'reactjs', viewValue: 'React'},
    {value: 'vuejs', viewValue: 'Vuejs'}
  ]

  constructor() { }

  ngOnInit() {
  }

}
