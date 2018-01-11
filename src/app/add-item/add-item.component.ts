import { ItemsService } from './../services/items.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.css']
})
export class AddItemComponent implements OnInit {

  inputValue;

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
  }

  addItem(taskDesc) {
    //this.itemsService.addItem(taskDesc);
    console.log(taskDesc);
    this.inputValue = '';
    taskDesc.control.value = '';
    //taskDesc.control.status = 'INVALID';
  }

}
