import { ItemsService } from './../services/items.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  taskName = '';
  error: boolean;

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
  }

  addItem(taskForm) {
      // console.log(taskForm);
      this.itemsService.addItem({desc: taskForm.value.taskName, isComplete: false});

      if (this.itemsService.errorDuplicate) {
        this.error = true;
      } else {
        this.error = false;
      }

      taskForm.resetForm();
  }

}
