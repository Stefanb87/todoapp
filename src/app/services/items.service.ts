import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class ItemsService {

  // items: string[] = ['item 1', 'item2', 'item3'];
  items = [];
  //defaultItems: string[] = ['item 1', 'item2', 'item3'];
  defaultItems = [
   {desc: 'item 1', isComplete: true},
   {desc: 'item 2', isComplete: false},
   {desc: 'item 3', isComplete: true}
  ];

  randomNumber: number;

  constructor() {
    this.getItemsFromLocalStorage();
    setInterval(() => { const no = Math.floor((Math.random() * 1000) + 1);
      this.randomNumber = no; }, 1000);
   }

  getItemsFromLocalStorage(): any {
    const itemsFromLocalStorage = JSON.parse(localStorage.getItem('taskList'));
    if (!itemsFromLocalStorage) {
      localStorage.clear();
      localStorage.setItem('taskList', JSON.stringify(this.defaultItems));
      this.items = this.defaultItems;
    } else {
      this.items = itemsFromLocalStorage;
    }
    return this.items;
  }


  serverPolling() {
    const addItemObservable = Observable.create((observer: Observer<object>) => {
      setInterval(() => {
        const item = {
          desc: 'item ' + this.randomNumber,
          isComplete: this.randomNumber > 500
        };
        
        observer.next(item);
        this.addItem(item);
    }, 6000);
    });

    return addItemObservable;

  }

  getItems() {
    const myObservable = Observable.create((observer: Observer<object[]>) => {
      observer.next(this.items);
    });
    return myObservable;
  }

  addItem(item): boolean {
    if (this.items.filter(t => t.desc === item.desc).length === 0) {
      this.items.push(item);
      localStorage.clear();
      localStorage.setItem('taskList', JSON.stringify(this.items));
      return true;
    } else {
      return false;
    }
  }

  updateItem(item): boolean {
    this.items.forEach(element => {
      if (element.desc === item.desc) {
        element.isComplete = item.isComplete;
        localStorage.clear();
        localStorage.setItem('taskList', JSON.stringify(this.items));
        return true;
      }
    });
    return false;
  }
}
