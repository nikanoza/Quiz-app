import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HelloComponent } from './hello.component';
import { ContentComponent } from './content/content.component';
import { QuizService } from './adition/quiz.service';
import { HttpClientModule } from '@angular/common/http';
import { ServerService } from './adition/server.service';

@NgModule({
  imports:      [ BrowserModule, FormsModule, HttpClientModule ],
  declarations: [ AppComponent, HelloComponent, ContentComponent ],
  providers:    [ QuizService, ServerService ],
  bootstrap:    [ AppComponent ]
})
export class AppModule { }
