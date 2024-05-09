import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as ListsActions from '../app/store/actions/lists.action'

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  constructor(private store: Store){}
  ngOnInit(): void {
    
  }

  title = 'My Task Board';
  activityMenuOpen: boolean = false;

  loadLists(){
    this.store.dispatch(ListsActions.loadLists());
  }

  toggleActivityMenu() {
    this.activityMenuOpen = !this.activityMenuOpen;
  }

  closeSidebar() {
    this.activityMenuOpen = false;
  }
}
