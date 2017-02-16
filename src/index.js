import React from 'react';
import ReactDOM from 'react-dom';
import App from './app/App';

import ApolloClient, {createNetworkInterface, addTypename} from 'apollo-client';
import { ApolloProvider } from 'react-apollo';
const client = new ApolloClient({
	networkInterface: createNetworkInterface({ uri: 'https://api.graph.cool/simple/v1/ciz881au09ane0149cje413tr' }),
	queryTransformer: addTypename,
	dataIdFromObject: (result) => {
		if (result.id && result.__typename) { // eslint-disable-line no-underscore-dangle
			return result.__typename + result.id // eslint-disable-line no-underscore-dangle
		}
		return null
	},
});
import { Router, Route, Link, browserHistory } from 'react-router'
import { syncHistoryWithStore, routerReducer, routerMiddleware } from 'react-router-redux'

import { createStore, combineReducers, applyMiddleware, compose } from 'redux'
import { reducer as formReducer } from 'redux-form'
import {AddPost} from './components'

const store = createStore(
	combineReducers({
		form: formReducer,     // <---- Mounted at 'form',
		apollo: client.reducer(),
		routing: routerReducer
	}),
	{}, // initial state
	compose(
		applyMiddleware(
			client.middleware(),
			routerMiddleware(browserHistory)
		),
		// If you are using the devToolsExtension, you can add it here also
		window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
	)
);
const history = syncHistoryWithStore(browserHistory, store)

import './index.css'

ReactDOM.render(
	<ApolloProvider client={client} store={store}>
		<Router history={history}>
			<Route path="/" component={App}/>
			<Route path="/add-post" component={AddPost}/>
		</Router>
	</ApolloProvider>,
	document.getElementById('root')
)
