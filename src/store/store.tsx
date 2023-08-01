import { createStore, applyMiddleware,combineReducers } from 'redux';
import bankReducer from './Bank/bankReducer';
import thunk from 'redux-thunk';
import authReducer from './login/reducer';
import professionReducer from './Profession/ProfessionReducer';
import countryReducer from './Country/CountryReducer';
import customerReducer from './Customer/CustomerReducer';
import swiftAddressReducer from './SwiftAdress/SwiftAdressReducer';
import productListReducer from './ProductList/ProductListReducer';
import cardProductListReducer from './CardProductList/CardProductListReducer';
import industryReducer from './Industry/IndustryReducer';


const rootReducer = combineReducers({
  auth: authReducer, 
  banks: bankReducer,
  professions: professionReducer,
  countries: countryReducer,
  customers: customerReducer,
  swiftAddresses: swiftAddressReducer,
  productlists: productListReducer,
  cardProductLists: cardProductListReducer,
  industries : industryReducer,
});

export type RootState = ReturnType<typeof rootReducer>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;