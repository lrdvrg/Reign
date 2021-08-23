import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { SharedModule } from './shared/shared.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { TimeAgoPipe } from './home/pipes/time-ago.pipe';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { SelectionPipe} from './home/pipes/selection.pipe';

@NgModule({
  declarations: [
    AppComponent,
      HomeComponent,
      TimeAgoPipe,
      SelectionPipe
   ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    SharedModule,
    FormsModule,
    HttpClientModule,
    InfiniteScrollModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
