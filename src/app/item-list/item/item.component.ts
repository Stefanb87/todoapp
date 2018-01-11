import { ItemsService } from './../../services/items.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit, OnDestroy {

  items: string[] = [];
  serverPollingSubscription: Subscription;

  constructor(private itemsService: ItemsService) { }

  ngOnInit() {
    this.itemsService.getItems()
                      .subscribe((items: string[]) => {
                        this.items = items;
                      });

    this.serverPollingSubscription =  this.itemsService.serverPolling()
                                      .subscribe((item: string) => {
                                        this.items.push(item);
                                      });
  }

  ngOnDestroy() {
    this.serverPollingSubscription.unsubscribe();
  }

}
