import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Observable, catchError, delay, map, of } from 'rxjs';
import { Country } from '../interfaces/country.interfaces';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  private apiUrl: string = 'https://restcountries.com/v3.1';

  public cacheStore = {
    byCapital:    {term: '', countries: []},
    byCountries:  {term: '', countries: []},
    byRegion:     {term: '', countries: []},
  }

  constructor(
    private httpClient: HttpClient
  ) {
    console.log('CountriesService: INIT');
    
   }

  private getCountriesRequest(url: string): Observable<Country[]>{
    return this.httpClient.get<Country[]>(url)
                        .pipe(
                          catchError( () => of([]) ),
                          // delay(2000)
                        );
  }

  public searchCountryByAlphaCode(code: string): Observable<Country | null> {
    const url = `${this.apiUrl}/alpha/${code}`;
    return this.httpClient.get<Country[]>(url)
              .pipe(
                map(countries => countries.length > 0 ? countries[0]: null),
                catchError( () => of(null) )
              );
  }

  public searchCapital (term: string): Observable<Country[]>{
    const url = `${this.apiUrl}/capital/${term}`;
    return this.getCountriesRequest(url);
  }

  public searchCountry (term: string): Observable<Country[]>{
    const url =  `${this.apiUrl}/name/${term}`;

    return this.getCountriesRequest(url);
  }
  
  public searchRegion (term: string): Observable<Country[]>{
    const url =  `${this.apiUrl}/region/${term}`;
    return this.getCountriesRequest(url);
  }


}
