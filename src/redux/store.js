import { createStore, applyMiddleware } from 'redux'
import createSagaMiddleware, { END } from 'redux-saga'

import rootReducer from './root-reducer'
import rootSaga from './root-saga'

const sagaMiddleware = createSagaMiddleware()

const bindMiddleware = (middleware) => {
    if (process.env.NODE_ENV !== 'production') {
        const { composeWithDevTools } = require('redux-devtools-extension')
        return composeWithDevTools(applyMiddleware(...middleware))
    }
    return applyMiddleware(...middleware)
}

function initStore(initialState = {}) {

    const store = createStore(
        rootReducer,
        initialState,
        bindMiddleware([sagaMiddleware]),
    )


    store.runSaga = () => {
        if (store.saga) { return }
        store.saga = sagaMiddleware.run(rootSaga)
    }


    store.stopSaga = async () => {
        // Avoid running twice
        if (!store.saga) { return }
        store.dispatch(END)
        await store.saga.done
        store.saga = null
    }


    store.execSagaTasks = async (isServer, tasks) => {
        store.runSaga()
        tasks(store.dispatch)
        await store.stopSaga()
        if (!isServer) {
            store.runSaga()
        }
    }

    // Initial run
    store.runSaga()

    return store
}

export default initStore
