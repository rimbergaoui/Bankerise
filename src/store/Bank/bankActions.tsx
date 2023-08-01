import { Bank } from "views/admin/BankList/components/table";
import BankService from "services/BankService";
import { Action } from 'redux';
import { ThunkAction } from 'redux-thunk';
import { RootState } from "store/store";

export const FETCH_BANKS: string = "FETCH_BANKS";
export const FETCH_BANKS_SUCCESS: string = "FETCH_BANKS_SUCCESS";
export const FETCH_BANKS_FAILURE: string = "FETCH_BANKS_FAILURE";

export const CREATE_BANK: string = "CREATE_BANK";
export const CREATE_BANK_SUCCESS: string = "CREATE_BANK_SUCCESS";
export const CREATE_BANK_FAILURE: string = "CREATE_BANK_FAILURE";

export const UPDATE_BANK: string = "UPDATE_BANK";
export const UPDATE_BANK_SUCCESS: string = "UPDATE_BANK_SUCCESS";
export const UPDATE_BANK_FAILURE: string = "UPDATE_BANK_FAILURE";

export const DELETE_BANK: string = "DELETE_BANK";
export const DELETE_BANK_SUCCESS: string = "DELETE_BANK_SUCCESS";
export const DELETE_BANK_FAILURE: string = "DELETE_BANK_FAILURE";

export const fetchBanks = (): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await BankService.getBanks();
      const banks: Bank[] = response.data;
      dispatch(fetchBanksSuccess(banks));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(fetchBanksFailure(errorMessage));
    }
  };
};

export const fetchBanksSuccess = (banks: Bank[]) => ({
  type: FETCH_BANKS_SUCCESS,
  payload: banks,
});

export const fetchBanksFailure = (error: string) => ({
  type: FETCH_BANKS_FAILURE,
  payload: error,
});

export const createBank = (bank: Bank): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await BankService.createBank(bank);
      const newBank: Bank = response.data;
      dispatch(createBankSuccess(newBank));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(createBankFailure(errorMessage));
    }
  };
};

export const createBankSuccess = (bank: Bank) => ({
  type: CREATE_BANK_SUCCESS,
  payload: bank,
});

export const createBankFailure = (error: string) => ({
  type: CREATE_BANK_FAILURE,
  payload: error,
});

export const updateBank = (bank: Bank): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      const response = await BankService.updateBank(bank);
      const updatedBank: Bank = response.data;
      dispatch(updateBankSuccess(updatedBank));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(updateBankFailure(errorMessage));
    }
  };
};

export const updateBankSuccess = (bank: Bank) => ({
  type: UPDATE_BANK_SUCCESS,
  payload: bank,
});

export const updateBankFailure = (error: string) => ({
  type: UPDATE_BANK_FAILURE,
  payload: error,
});

export const deleteBank = (bankId: string): ThunkAction<void, RootState, unknown, Action<string>> => {
  return async (dispatch) => {
    try {
      await BankService.deleteBank(bankId);
      dispatch(deleteBankSuccess(bankId));
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Une erreur s'est produite";
      dispatch(deleteBankFailure(errorMessage));
    }
  };
};

export const deleteBankSuccess = (bankId: string) => ({
  type: DELETE_BANK_SUCCESS,
  payload: bankId,
});

export const deleteBankFailure = (error: string) => ({
  type: DELETE_BANK_FAILURE,
  payload: error,
});
