import { Component, OnInit, OnDestroy } from '@angular/core';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit, OnDestroy {

  // pending = this.itemsService.pending;
  // completed = this.itemsService.completed;

  pending;
  completed;

  pendingUnsubscribe;
  completedUnsubscribe;

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    this.completedUnsubscribe =  this.itemsService.emitStatusNumberCompleted().subscribe((number: number) => {
      this.completed = number;
    });

    this.pendingUnsubscribe = this.itemsService.emitStatusNumberPending().subscribe((number: number) => {
      this.pending = number;
    });
  }

  ngOnDestroy() {
    this.pendingUnsubscribe.unsubscribe();
    this.completedUnsubscribe.unsubscribe();
  }

}
