import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { EventEmitter } from 'events';

@Injectable()
export class ItemsService {

  errorDuplicate: boolean;

  items = [];

  defaultItems = [
   {desc: 'item 1', isComplete: true},
   {desc: 'item 2', isComplete: false},
   {desc: 'item 3', isComplete: true}
  ];

  randomNumber;
  completed = 0;
  pending = 0;

  constructor() {
    this.getItemsFromLocalStorage();

    setInterval(() => { const no = Math.floor((Math.random() * 1000) + 1);
                      this.randomNumber = no; }, 1000);

    this.countStatus();
  }

// method for counting statuses of items (completed/pending)
  countStatus() {
    this.completed = 0;
    this.pending = 0;

    this.items.forEach(el => {
      if (el.isComplete === true) {
        this.completed += 1;
        this.emitStatusNumberCompleted();
        this.emitStatusNumberPending();
      } else {
        this.pending += 1;
        this.emitStatusNumberCompleted();
        this.emitStatusNumberPending();
      }
    });
  }

// method for emiting number of completed items
  emitStatusNumberCompleted() {
    const completedObservable = Observable.create((observer: Observer<number>) => {
      setInterval(() => {
        observer.next(this.completed);
      }, 500);
    });

    return completedObservable;
  }

  // method for emiting number of pending items
  emitStatusNumberPending() {
    const pendingObservable = Observable.create((observer: Observer<number>) => {
      setInterval(() => {
        observer.next(this.pending);
      }, 500);
    });

    return pendingObservable;
  }

// method for getting items from local storage
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

// method for simulating server polling functionality
  serverPolling() {
    const addItemObservable = Observable.create((observer: Observer<object>) => {
      setInterval(() => {
        const item = {
          desc: 'item ' + this.randomNumber,
          isComplete: this.randomNumber > 500
        };
        observer.next(item);
        this.addItem(item);
        this.errorDuplicate = false;
        localStorage.setItem('taskList', JSON.stringify(this.items)); //dodao jer iz nekog razloga u addItem met nije htelo da setuje
        this.countStatus();
      }, 100000);
    });

    return addItemObservable;
  }

// method for emitting items (with observable)
  getItems() {
    const myObservable = Observable.create((observer: Observer<object[]>) => {
      observer.next(this.items);
    });
    return myObservable;
  }

// method for adding new items and error checking
  addItem(item): boolean {
    if (this.items.filter(t => t.desc === item.desc).length === 0) {
      this.items.push(item);
      localStorage.setItem('taskList', JSON.stringify(this.items));
      this.countStatus();
      return true;
    } else {
      this.errorDuplicate = true;
      return false;
    }
  }

// method for updating item status
  updateItem(item): boolean {
    this.items.forEach(element => {
      if (element.desc === item.desc) {
        element.isComplete = !item.isComplete;
        localStorage.clear();
        localStorage.setItem('taskList', JSON.stringify(this.items));
        this.countStatus();
        return true;
      }
    });
    return false;
  }
}
