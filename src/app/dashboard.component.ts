import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { Car } from './car';
import { CarService } from './car.service';

@Component({
  selector: 'my-cars',
  templateUrl: './cars.component.html',
  styleUrls: ['./cars.component.css']
})
export class CarsComponent implements OnInit {
  heroes: Car[];
  selectedCar: Car;
  addingCar = false;
  error: any;
  showNgFor = false;

  constructor(
    private router: Router,
    private carService: CarService) { }

  getHeroes(): void {
    this.carService
      .getCars()
      .then(cars => this.cars = cars)
      .catch(error => this.error = error);
  }

  addCar(): void {
    this.addingCar = true;
    this.selectedCar = null;
  }

  close(savedCar: Car): void {
    this.addingCar = false;
    if (savedCar) { this.getCars(); }
  }

  deleteCar(car: Car, event: any): void {
    event.stopPropagation();
    this.carService
      .delete(car)
      .then(res => {
        this.cars = this.cars.filter(h => h !== car);
        if (this.selectedCar === car) { this.selectedCar = null; }
      })
      .catch(error => this.error = error);
  }

  ngOnInit(): void {
    this.getCars();
  }

  onSelect(car: Car): void {
    this.selectedCar = car;
    this.addingCar = false;
  }

  gotoDetail(): void {
    this.router.navigate(['/detail', this.selectedCar.id]);
  }
}
