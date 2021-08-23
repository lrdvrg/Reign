/* tslint:disable:no-unused-variable */
import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { FormsModule } from '@angular/forms';
import { SelectionPipe } from './pipes/selection.pipe';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, InfiniteScrollModule, FormsModule],
      declarations: [ HomeComponent, SelectionPipe ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('Should create.', () => {
    expect(component).toBeTruthy();
  });

  it('isAllSelected should initialize as true', () => {
    expect(component.isAllSelected).toBeTruthy(true);
  });

  it('finishPage should initialize as 49', () => {
    expect(component.finishPage === 49).toBeTruthy(true);
  });

  it('scrollToTopButtonCanShow should initialize as false', () => {
    expect(component.scrollToTopButtonCanShow).toBeFalsy(true);
  });

  it('Should try to get selection from local storage.', () => {
    const watchMethod = spyOn(component, 'getSelectionFromLocalStorage');
    component.getSelectionFromLocalStorage();

    expect(watchMethod).toHaveBeenCalled();
  });

  it('Local property selection should be angular after getting it from local storage.', () => {
    localStorage.setItem('selection', 'angular');
    component.getSelectionFromLocalStorage();

    expect(component.selection).toEqual('angular');
  });

  it('When selection drop-down is changed it should set new value in local storage.', () => {
    component.selectionChange('reactjs');
    const lsSelection = localStorage.getItem('selection');

    expect(lsSelection).toEqual('reactjs');
  });

  it('Should try to get favorites from local storage.', () => {
    const watchMethod = spyOn(component, 'getFavoritesFromLocalStorage');
    component.getFavoritesFromLocalStorage();

    expect(watchMethod).toHaveBeenCalled();
  });

  it('Change to favorites option when click menu button.', () => {
      const button: DebugElement = fixture.debugElement.query(By.css('.active'));
      button.triggerEventHandler('click', null);
      expect(component.isAllSelected).toBeFalsy(true);
  });

  it('checkFavorite returns true if favorites array does have an item with that objectID.', () => {
    component.favorites.push({objectID: 1})
    const isTrue = component.checkFavorite(1);
    expect(isTrue).toBeTruthy(true);
  });

  it('toogleFavorite call removeFavorite if item have objectID.', () => {
    const watchMethod = spyOn(component, 'removeFavorite');
    component.toogleFavorite({objectID: 1});

    expect(watchMethod).toHaveBeenCalled();
  });

  it('toogleFavorite call addFavorite if item does not have objectID.', () => {
    const watchMethod = spyOn(component, 'addFavorite');
    component.toogleFavorite({});

    expect(watchMethod).toHaveBeenCalled();
  });

  it('addFavorite add item to favorites.', () => {
    const body = {
      objectID: 2,
      story_url: '',
      created_at: '',
      author: '',
      story_title: ''
    }
    component.addFavorite(body);
    expect(component.checkFavorite(2)).toBeTruthy(true);
  });

  it('removeFavorite remove item to favorites.', () => {
    component.removeFavorite(2);
    expect(component.checkFavorite(2)).toBeFalsy(true);
  });

  it('When onScroll method is called actualPage property is increased.', () => {
    const before = component.actualPage;
    component.onScroll();
    const after = component.actualPage;

    expect(after > before).toBeTruthy(true);
  });

  it('When onScroll method is called getData method is called.', () => {
    const watchMethod = spyOn(component, 'getData');
    component.onScroll();

    expect(watchMethod).toHaveBeenCalled();
  });

  it('navigateToUrl should work correctly.', () => {
    spyOn(window, 'open');
    component.navigateToUrl('https://www.google.com/')
    expect(window.open).toHaveBeenCalledWith('https://www.google.com/');
  });

  it('scrollToTopButtonCanShow should start false', () => {
    component.onWindowScroll();
    expect(component.scrollToTopButtonCanShow).toBeFalsy(true);
  });

});
