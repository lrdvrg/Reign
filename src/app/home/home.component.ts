import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';

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
  ];

  data: any [];

  constructor(
    private homeService: HomeService
  ) { }

  ngOnInit() {
  }

  selectionChange(selection: string) {
    this.homeService.getNews(selection, 1)
    .subscribe(res => {
      console.log('RESPONSE', res);
      if (res && res.hits) {
        this.data = res.hits;
      }
    });
  }

  navigateToUrl(url: string) {
    window.open(url);
  }
}
