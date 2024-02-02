import { Component } from '@angular/core';
import { CountriesService } from '../../services/countries.service';
import { Country } from '../../interfaces/country.interfaces';

type Region = 'Africa'|'Americas'|'Asia'|'Europe'|'Oceania';

@Component({
  selector: 'app-by-region-page',
  templateUrl: './by-region-page.component.html',
  styleUrls: ['./by-region-page.component.css']
})
export class ByRegionPageComponent {

  public countries: Country[] = [];
  public regions: Region[] = ['Africa', 'Americas', 'Asia', 'Europe', 'Oceania'];
  public selectedRegion?: Region;
  public isLoading: boolean = false;

  constructor(
    private countriesService: CountriesService
  ){}

  public searchByRegion( region: Region ): void {

    this.selectedRegion = region;
    this.isLoading = true;

    this.countriesService.searchRegion(region).subscribe(
      (countries) => {
        this.countries = countries;
        this.isLoading = false;
      }
    );
  }
}
