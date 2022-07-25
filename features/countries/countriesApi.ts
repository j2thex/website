import { api } from '../../app/api';
import { CountryFlag } from '../../app/types';

export const countriesApi = api.injectEndpoints({
    endpoints: (builder) => ({
        fetchCountries: builder.query<{ countries: CountryFlag[] }, void>({
            query() {
                return {
                    url: '/public/countries',
                    method: 'POST',
                };
            },
        }),
    }),
});

export const { useFetchCountriesQuery } = countriesApi;
