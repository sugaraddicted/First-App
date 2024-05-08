import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BoardComponent } from './board/board.component';
import { ActivityComponent } from './activity/activity.component';
import { CardComponent } from './card/card.component';
import { ListComponent } from './list/list.component';
import { HeaderComponent } from './header/header.component';
import { MatButtonModule } from '@angular/material/button';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { MatInputModule } from '@angular/material/input';
import { FormsModule } from '@angular/forms';
import { MatDialogModule } from '@angular/material/dialog';
import { MatNativeDateModule } from '@angular/material/core';
import {MatSelectModule} from '@angular/material/select';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { CardModalComponent } from './card-modal/card-modal.component';
import { CardDetailsModalComponent } from './card-details-modal/card-details-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    BoardComponent,
    ActivityComponent,
    CardComponent,
    ListComponent,
    HeaderComponent,
    CardModalComponent,
    CardDetailsModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    DragDropModule,
    FormsModule,
    MatInputModule,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  exports:[
    CardModalComponent,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
