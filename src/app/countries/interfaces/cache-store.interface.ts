import { Country } from "./country.interfaces";

export interface CacheStore {
    byCapital: TermCountries;
    byCountries: TermCountries;
}

export interface TermCountries{
    term: string;
    countries: Country[];
}