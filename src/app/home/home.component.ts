import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HousingLocationComponent } from '../housing-location/housing-location.component';
import { HousingService } from './../housing.service';
import { housingLocation } from './../housing-location';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, HousingLocationComponent],
  template: `
   <section class="content">
    <form>
      <input type="text" placeholder="Filter by city" #filter>
      <button class="primary" type="button" (click)="filteredResults(filter.value)">Search</button>
    </form>
  </section>
  
  <section class="results">
 <app-housing-location *ngFor="let housingLocation of filteredLocationList" [housingLocation]="housingLocation"></app-housing-location>
  </section>
  `,
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
 housingLocationList: housingLocation[]=[];
 HousingService: HousingService = inject (HousingService);
 filteredLocationList: housingLocation[]=[];
 constructor(){
  this.HousingService.getAllHousingLocations().then((housingLocationList: housingLocation[]) => {
    this.housingLocationList = housingLocationList;
    this.filteredLocationList = housingLocationList;

  });

 }

 filteredResults(text: string) {
  if(!text) this.filteredLocationList = this.housingLocationList;

  this.filteredLocationList = this.housingLocationList.filter(
    housinglocation => housinglocation?.city.toLowerCase().includes(text.toLowerCase())
  );
 }
}
