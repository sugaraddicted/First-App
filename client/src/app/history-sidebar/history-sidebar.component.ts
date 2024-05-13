import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivityService } from '../_services/activity.service';
import { ActivityLog } from '../_models/activityLog';

@Component({
  selector: 'app-history-sidebar',
  templateUrl: './history-sidebar.component.html',
  styleUrls: ['./history-sidebar.component.css']
})
export class HistorySidebarComponent implements OnInit{
  @Output() closeSidebar: EventEmitter<void> = new EventEmitter<void>();
  @Input() boardId?: string;
  activityLogs: ActivityLog[] = [];
  pageNumber = 1;
  pageSize = 10;
  
  constructor(private activityService: ActivityService){}

  ngOnInit(): void {
    this.loadActivityLogs();
  }

  loadActivityLogs(){
    if(this.boardId)
    this.activityService.getByBoardId(this.boardId, this.pageNumber, this.pageSize).subscribe({
    next: newActivityLogs => {
      this.activityLogs = this.activityLogs?.concat(newActivityLogs);
    },
    error: error => console.log(this.activityLogs)
    });
  }

  onCloseSidebar(){
    this.closeSidebar.emit();
  }

  loadMore(){
    this.pageNumber++;
    this.loadActivityLogs();
    this.scrollToTop();
  }

  scrollToTop(): void {
    const container = document.querySelector('.activity-list');
    if (container) {
      container.scrollTop = 0;
    }
  }
}
