import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';

import { CarSearchService } from './car-search.service';
import { Car } from './car';

import 'rxjs/add/observable/of';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';
import 'rxjs/add/operator/switchMap';

@Component({
  selector: 'my-car-search',
  templateUrl: './car-search.component.html',
  styleUrls: ['./car-search.component.css'],
  providers: [CarSearchService]
})
export class CarSearchComponent implements OnInit {
  cars: Observable<Car[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private carSearchService: CarSearchService,
    private router: Router) { }

  search(term: string): void {
    // Push a search term into the observable stream.
    this.searchTerms.next(term);
  }

  ngOnInit(): void {
    this.cars = this.searchTerms
      .debounceTime(300)        // wait for 300ms pause in events
      .distinctUntilChanged()   // ignore if next search term is same as previous
      .switchMap(term => term   // switch to new observable each time
        // return the http search observable
        ? this.carSearchService.search(term)
        // or the observable of empty cars if no search term
        : Observable.of<Car[]>([]))
      .catch(error => {
        // TODO: real error handling
        console.log(`Error in component ... ${error}`);
        return Observable.of<Car[]>([]);
      });
  }

  gotoDetail(car: Car): void {
    const link = ['/detail', car.id];
    this.router.navigate(link);
  }
}
