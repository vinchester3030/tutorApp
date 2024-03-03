import AsyncStorage from '@react-native-async-storage/async-storage';
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";
import {configureStore} from '@reduxjs/toolkit';
import {Provider} from 'react-redux';
import {
	persistStore,
	persistReducer,
  FLUSH,
	REHYDRATE,
	PAUSE,
	PERSIST,
	PURGE,
	REGISTER,
} from 'redux-persist';
import {PersistGate} from 'redux-persist/integration/react';

import {userDataReducer} from './app/redux/reducers/userDataReducer';

import { firebaseConfig } from './app/constants/firebaseConfig';

import { getStorage } from 'firebase/storage';
import RootNavigator from './app/navigation/RootNavigator';


const app = initializeApp(firebaseConfig);

// Initialize Realtime Database and get a reference to the service
const database = getDatabase(app);
const storage = getStorage(app);

const userDataPersistConfig = {
	key: 'userData',
	storage: AsyncStorage,

	// В данном списке перечислены данные, которые сохраняются в базе
	// (все остальные очищаются при перезагрузке приложения)
	whitelist: [
		'role',
    'key',
    'name',
    'childName',
    'childKey'
	],
};

export const store = configureStore({
	reducer: {
		userData: persistReducer(userDataPersistConfig, userDataReducer),
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
});

const persistor = persistStore(store);


export default function App() {
  return (
    <Provider store={store} >
			<PersistGate loading={null} persistor={persistor}>
        <RootNavigator
          database={database}
          storage={storage}
        />
      </PersistGate>
    </Provider>
  );
}

