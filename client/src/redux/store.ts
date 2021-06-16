import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { composeWithDevTools } from 'redux-devtools-extension';

import rootReducer from './reducers';
import { logger } from './middlewares/logger';

//createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));
const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(logger, thunk)));

export default store;