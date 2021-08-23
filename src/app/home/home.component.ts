// tslint:disable: max-line-length
import { Component, HostListener, OnInit } from '@angular/core';
import { HomeService } from './services/home.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  /** Start menu option as All and not Favorites */
  isAllSelected = true;

  /** Check if button to scroll to top can show in the app */
  scrollToTopButtonCanShow: boolean;
  /** Height that when meeted the scroll button show */
  showScrollHeight = 400;
  /** Height that when meeted the scroll button hide */
  hideScrollHeight = 200;

  selection = '';

  /** Finish page from api because it can show only 1000 hits from the required query. */
  finishPage = 49;

  actualPage: number;

  /** Options to select news from */
  selectionOptions = [
    {value: 'angular', viewValue: 'Angular'},
    {value: 'reactjs', viewValue: 'React'},
    {value: 'vuejs', viewValue: 'Vuejs'}
  ];

  data: any [];
  favorites = [];

  /**
   * Listener of the scroll position.
   */
  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (( window.pageYOffset ||
      document.documentElement.scrollTop ||
      document.body.scrollTop) > this.showScrollHeight) {
      this.scrollToTopButtonCanShow = true;
    } else if ( this.scrollToTopButtonCanShow &&
      (window.pageYOffset ||
        document.documentElement.scrollTop ||
        document.body.scrollTop)
      < this.hideScrollHeight) {
      this.scrollToTopButtonCanShow = false;
    }
  }

  constructor(
    private homeService: HomeService
  ) {
    this.actualPage = 1;
    this.scrollToTopButtonCanShow = false;
  }

  ngOnInit() {
    this.getSelectionFromLocalStorage();
    this.getFavoritesFromLocalStorage();
  }

  /**
   * Its executed everytime the select value is change. It set the selected value in the local storage and also execute the get news data method.
   * @param selection Option picked.
   */
  selectionChange(selection: string) {
    localStorage.setItem('selection', selection);
    this.getData(selection, 1);
    this.actualPage = 1;
  }

  /**
   *  Get news data from service.
   * @param selection Option picked.
   */
  getData(selection: string, page: number) {
    this.homeService.getNews(selection, page)
    .subscribe(res => {
      if (res && res.hits) {
        if (this.actualPage === 1) {
          this.data = res.hits;
          this.data = this.data.filter(item => (item.story_title && item.author && item.story_url && item.created_at));
        } else {
          const tempData = res.hits.filter(item => (item.story_title && item.author && item.story_url && item.created_at));
          if (tempData.length > 0) {
            console.warn('encuentra data');
            this.data.push.apply(this.data, tempData);
          }
        }
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

  /**
   * Method executed when clicked in favorites section of card to see if it have to ve add or removed of favorites array.
   * @param item object of news clicked.
   */
  toogleFavorite(item) {
    if (this.checkFavorite(item.objectID)) {
      this.removeFavorite(item.objectID);
    } else {
      this.addFavorite(item);
    }

    localStorage.setItem('favorites', JSON.stringify(this.favorites));
  }

  /**
   * Add item to favorites array.
   * @param item item to add.
   */
  addFavorite(item) {
    const favItem = {
      objectID: item.objectID,
      story_url: item.story_url,
      created_at: item.created_at,
      author: item.author,
      story_title: item.story_title
    };

    this.favorites.push(favItem);
  }

  /**
   * Remove item of favorites array.
   * @param id objectID to remove.
   */
  removeFavorite(id) {
    const index = this.favorites.map((i: any) => {
      return i.objectID
    }).indexOf(id);

    this.favorites.splice(index, 1);
  }

  /**
   * Check if item is part of the favorites array.
   * @param id objectID of item that we are checking.
   * @returns boolean of if it is find it.
   */
  checkFavorite(id) {
    return this.favorites.filter(e => e.objectID === id).length > 0;
  }

  /**
   * Check if there is a selection already selected and stored in local storage and return it if it is.
   */
  getSelectionFromLocalStorage() {
    if (localStorage.getItem('selection')) {
      const lsSelection = localStorage.getItem('selection');
      this.getData(lsSelection, 1);
      this.getData(lsSelection, 2);
      this.selection = lsSelection;
    }
  }

  /**
   * Check if there is a favorites stored in local storage and return it if it is.
   */
  getFavoritesFromLocalStorage() {
    if (localStorage.getItem('favorites')) {
      const favorites = JSON.parse(localStorage.getItem('favorites'));
      this.favorites = favorites;
    }
  }

  /**
   * Executed everytime user scroll down.
   */
  onScroll() {
    if ((this.actualPage < this.finishPage) && this.isAllSelected) {
      this.actualPage++;
      this.getData(this.selection, this.actualPage);
    }
  }

  /**
   * NavigateToTop
   */
  scrollTop($top) {
    $top.scrollIntoView({behavior: 'smooth', block: 'start', inline: 'nearest'})
  }
}
