import {createStore, compose, applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import reducers from '../reducers';
import { persistStore, persistCombineReducers } from 'redux-persist';
import {AsyncStorage} from 'react-native';


const config = {
    key: 'root',
    storage: AsyncStorage,
    whitelist: ['likedJobs']
   };

const reducer = persistCombineReducers(config, reducers);

export default function configureStore(initialState = {}) {
    const store = createStore(
      reducer,
      initialState,
      applyMiddleware(thunk),
    );
    const persistor = persistStore(store);
     return { persistor, store };
    }