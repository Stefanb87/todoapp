import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

@Injectable()
export class ItemsService {

  items: string[] = ['item 1', 'item2', 'item3'];
  randomNumber: number;

  constructor() {
    setInterval(() => { const no = Math.floor((Math.random() * 1000) + 1);
      this.randomNumber = no; }, 1000);
   }


  serverPolling() {
    const addItemObservable = Observable.create((observer: Observer<string>) => {
      setInterval(() => { observer.next('item ' + this.randomNumber); }, 40000);
    });
    return addItemObservable;
  }

  getItems() {
    const myObservable = Observable.create((observer: Observer<string[]>) => {
      observer.next(this.items);
    });
    return myObservable;
  }

  addItem(item) {
    this.items.push(item);
  }
}
