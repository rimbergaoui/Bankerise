import { Customer } from "views/admin/CustomerSegments/components/table";
import CustomerService from "services/CustomerService";
import { Action } from 'redux';
import { ThunkAction, ThunkDispatch } from 'redux-thunk';
import { RootState } from 'store/store'; 


export const FETCH_CUSTOMERS: string = "FETCH_CUSTOMERS";
export const FETCH_CUSTOMERS_SUCCESS: string = "FETCH_CUSTOMERS_SUCCESS";
export const FETCH_CUSTOMERS_FAILURE: string = "FETCH_CUSTOMERS_FAILURE";

export const CREATE_CUSTOMER: string = "CREATE_CUSTOMER";
export const CREATE_CUSTOMER_SUCCESS: string = "CREATE_CUSTOMER_SUCCESS";
export const CREATE_CUSTOMER_FAILURE: string = "CREATE_CUSTOMER_FAILURE";

export const UPDATE_CUSTOMER: string = "UPDATE_CUSTOMER";
export const UPDATE_CUSTOMER_SUCCESS: string = "UPDATE_CUSTOMER_SUCCESS";
export const UPDATE_CUSTOMER_FAILURE: string = "UPDATE_CUSTOMER_FAILURE";

export const DELETE_CUSTOMER: string = "DELETE_CUSTOMER";
export const DELETE_CUSTOMER_SUCCESS: string = "DELETE_CUSTOMER_SUCCESS";
export const DELETE_CUSTOMER_FAILURE: string = "DELETE_CUSTOMER_FAILURE";

export const fetchCustomers = (): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await CustomerService.getCustomers();
      const customers: Customer[] = response.data;
      dispatch(fetchCustomersSuccess(customers));
      
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(fetchCustomersFailure(errorMessage));
    }
  };
};

export const fetchCustomersSuccess = (customers: Customer[]) => ({
  type: FETCH_CUSTOMERS_SUCCESS,
  payload: customers,
});

export const fetchCustomersFailure = (error: string) => ({
  type: FETCH_CUSTOMERS_FAILURE,
  payload: error,
});

export const createCustomer = (customer: Customer): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await CustomerService.createCustomer(customer);
      const newCustomer: Customer = response.data;
      dispatch(createCustomerSuccess(newCustomer));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(createCustomerFailure(errorMessage));
    }
  };
};

export const createCustomerSuccess = (customer: Customer) => ({
  type: CREATE_CUSTOMER_SUCCESS,
  payload: customer,
});

export const createCustomerFailure = (error: string) => ({
  type: CREATE_CUSTOMER_FAILURE,
  payload: error,
});

export const updateCustomer = (customer: Customer): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await CustomerService.updateCustomer(customer);
      const updatedCustomer: Customer = response.data;
      dispatch(updateCustomerSuccess(updatedCustomer));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(updateCustomerFailure(errorMessage));
    }
  };
};

export const updateCustomerSuccess = (customer: Customer) => ({
  type: UPDATE_CUSTOMER_SUCCESS,
  payload: customer,
});

export const updateCustomerFailure = (error: string) => ({
  type: UPDATE_CUSTOMER_FAILURE,
  payload: error,
});

export const deleteCustomer = (customerId: string): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      await CustomerService.deleteCustomer(customerId);
      dispatch(deleteCustomerSuccess(customerId));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(deleteCustomerFailure(errorMessage));
    }
  };
};

export const deleteCustomerSuccess = (customerId: string) => ({
  type: DELETE_CUSTOMER_SUCCESS,
  payload: customerId,
});

export const deleteCustomerFailure = (error: string) => ({
  type: DELETE_CUSTOMER_FAILURE,
  payload: error,
});
