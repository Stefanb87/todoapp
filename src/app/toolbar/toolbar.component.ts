import { Component, OnInit } from '@angular/core';
import { ItemsService } from '../services/items.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.css']
})
export class ToolbarComponent implements OnInit {

  // pending = this.itemsService.pending;
  // completed = this.itemsService.completed;

  pending;
  completed;

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    this.itemsService.emitStatusNumberCompleted().subscribe((number: number) => {
      this.completed = number;
      // console.log(this.completed);
    });

    this.itemsService.emitStatusNumberPending().subscribe((number: number) => {
      this.pending = number;
      // console.log(this.pending);
    });
  }

}
