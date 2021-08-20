// tslint:disable: max-line-length
import { Component, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /** Start menu option as All and not Favorites */
  isAllSelected = true;

  selection = '';

  /** Options to select news from */
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
    /** Check if there is a selection alredy picked and storaged in local storage */
    if (localStorage.getItem('selection')) {
      const lsSelection = localStorage.getItem('selection');
      this.getData(lsSelection);
      this.selection = lsSelection;
    }
  }

  /**
   * Its executed everytime the select value is change. It set the selected value in the local storage and also execute the get news data method.
   * @param selection Option picked.
   */
  selectionChange(selection: string) {
    localStorage.setItem('selection', selection);
    this.getData(selection);
  }

  /**
   *  Get news data from service.
   * @param selection Option picked.
   */
  getData(selection: string) {
    this.homeService.getNews(selection, 1)
    .subscribe(res => {
      if (res && res.hits) {
        this.data = res.hits;
        this.data = this.data.filter(item => (item.story_title && item.author && item.story_url && item.created_at));
      }
    });
  }

  /**
   * Navigate to certain url when click on card.
   * @param url string to navigate to.
   */
  navigateToUrl(url: string) {
    window.open(url);
  }
}
