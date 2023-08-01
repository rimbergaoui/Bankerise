import { Country } from "views/admin/CountryList/components/table";
import CountryService from "services/CountryService";
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from "store/store";

export const FETCH_COUNTRIES: string = "FETCH_COUNTRIES";
export const FETCH_COUNTRIES_SUCCESS: string = "FETCH_COUNTRIES_SUCCESS";
export const FETCH_COUNTRIES_FAILURE: string = "FETCH_COUNTRIES_FAILURE";

export const CREATE_COUNTRY: string = "CREATE_COUNTRY";
export const CREATE_COUNTRY_SUCCESS: string = "CREATE_COUNTRY_SUCCESS";
export const CREATE_COUNTRY_FAILURE: string = "CREATE_COUNTRY_FAILURE";

export const UPDATE_COUNTRY: string = "UPDATE_COUNTRY";
export const UPDATE_COUNTRY_SUCCESS: string = "UPDATE_COUNTRY_SUCCESS";
export const UPDATE_COUNTRY_FAILURE: string = "UPDATE_COUNTRY_FAILURE";

export const DELETE_COUNTRY: string = "DELETE_COUNTRY";
export const DELETE_COUNTRY_SUCCESS: string = "DELETE_COUNTRY_SUCCESS";
export const DELETE_COUNTRY_FAILURE: string = "DELETE_COUNTRY_FAILURE";

export const fetchCountries = (): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await CountryService.getCountries();
      const countries: Country[] = response.data;
      dispatch(fetchCountriesSuccess(countries));
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(fetchCountriesFailure(errorMessage));
    }
  };
};

export const fetchCountriesSuccess = (countries: Country[]) => ({
  type: FETCH_COUNTRIES_SUCCESS,
  payload: countries,
});

export const fetchCountriesFailure = (error: string) => ({
  type: FETCH_COUNTRIES_FAILURE,
  payload: error,
});

export const createCountry = (country: Country): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await CountryService.createCountry(country);
      const newCountry: Country = response.data;
      dispatch(createCountrySuccess(newCountry));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(createCountryFailure(errorMessage));
    }
  };
};

export const createCountrySuccess = (country: Country) => ({
  type: CREATE_COUNTRY_SUCCESS,
  payload: country,
});

export const createCountryFailure = (error: string) => ({
  type: CREATE_COUNTRY_FAILURE,
  payload: error,
});

export const updateCountry = (country: Country): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await CountryService.updateCountry(country);
      const updatedCountry: Country = response.data;
      dispatch(updateCountrySuccess(updatedCountry));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(updateCountryFailure(errorMessage));
    }
  };
};

export const updateCountrySuccess = (country: Country) => ({
  type: UPDATE_COUNTRY_SUCCESS,
  payload: country,
});

export const updateCountryFailure = (error: string) => ({
  type: UPDATE_COUNTRY_FAILURE,
  payload: error,
});

export const deleteCountry = (countryId: string): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      await CountryService.deleteCountry(countryId);
      dispatch(deleteCountrySuccess(countryId));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(deleteCountryFailure(errorMessage));
    }
  };
};

export const deleteCountrySuccess = (countryId: string) => ({
  type: DELETE_COUNTRY_SUCCESS,
  payload: countryId,
});

export const deleteCountryFailure = (error: string) => ({
  type: DELETE_COUNTRY_FAILURE,
  payload: error,
});
