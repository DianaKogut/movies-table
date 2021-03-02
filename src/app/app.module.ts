import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { ControlPanelComponent } from './components/control-panel/control-panel.component';
import { TableComponent } from './components/table/table.component';
import { NgxsModule } from '@ngxs/store';
import { environment } from 'src/environments/environment';
import { MoviesStore } from './state/movies.state';
import { SearchPipe } from './pipes/search.pipe';

@NgModule({
  declarations: [
    AppComponent,
    ControlPanelComponent,
    TableComponent,
    SearchPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    NgxsModule.forRoot([MoviesStore], { developmentMode: !environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
