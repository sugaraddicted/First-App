import { Component, Input, OnInit } from '@angular/core';
import { ActivityLog } from '../_models/activityLog';

@Component({
  selector: 'app-activity',
  templateUrl: './activity.component.html',
  styleUrls: ['./activity.component.css']
})
export class ActivityComponent implements OnInit {
  @Input() activityLog?: ActivityLog;
  @Input() cardName?:string;

  ngOnInit(): void {
    if(!this.cardName)
      this.cardName = 'this card';
  }
}
