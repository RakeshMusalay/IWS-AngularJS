import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

import { Car } from './car';
import { CarService } from './car.service';

@Component({
  selector: 'my-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  @Input() car: Car;
  @Output() close = new EventEmitter();
  error: any;
  navigated = false; // true if navigated here

  constructor(
    private heroService: CarService,
    private route: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.route.params.forEach((params: Params) => {
      if (params['id'] !== undefined) {
        const id = +params['id'];
        this.navigated = true;
        this.carService.getCar(id)
            .then(car => this.car = car);
      } else {
        this.navigated = false;
        this.car = new Car();
      }
    });
  }

  save(): void {
    this.carService
        .save(this.car)
        .then(car => {
          this.car = car; // saved hero, w/ id if new
          this.goBack(car);
        })
        .catch(error => this.error = error); // TODO: Display error message
  }

  goBack(savedCar: Car = null): void {
    this.close.emit(savedCar);
    if (this.navigated) { window.history.back(); }
  }
}
