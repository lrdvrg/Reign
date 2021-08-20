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
    if (localStorage.getItem('selection')) {
      const lsSelection = localStorage.getItem('selection');
      this.getData(lsSelection);
      this.selection = lsSelection;
    }
  }

  selectionChange(selection: string) {
    localStorage.setItem('selection', selection);
    this.getData(selection);
  }

  getData(selection: string) {
    this.homeService.getNews(selection, 1)
    .subscribe(res => {
      if (res && res.hits) {
        this.data = res.hits;
        this.data = this.data.filter(item => (item.story_title && item.author && item.story_url && item.created_at));
      }
    });
  }

  navigateToUrl(url: string) {
    window.open(url);
  }
}
