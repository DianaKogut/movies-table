import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { NgxsModule } from '@ngxs/store';

import { MoviesStore } from './state/movies.state';
import { HighlightSearchPipe } from './pipes/highlight-search.pipe';
import { SearchPipe } from './pipes/search.pipe';
import { environment } from 'src/environments/environment';

import { AppComponent } from './app.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { TableComponent } from './components/table/table.component';

@NgModule({
  declarations: [
    AppComponent,
    ControlPanelComponent,
    TableComponent,
    HighlightSearchPipe,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgxsModule.forRoot([MoviesStore], { developmentMode: !environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
