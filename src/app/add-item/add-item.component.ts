import { ItemsService } from './../services/items.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  taskName = '';
  //errorEnabled = false;

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
  }

  addItem(taskForm) {
    // console.log(taskDesc);
    this.itemsService.addItem({desc: taskForm.value.taskName, isComplete: false});
    // console.log(taskDesc);
    taskForm.resetForm();
    // this.taskName = '';
  }

}
