// App.tsx
import React, { useEffect } from 'react';
import { Provider, useDispatch } from 'react-redux';
import { store } from './store/store';
import AppNavigator from './navigation/AppNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { setTrainingLog } from './features/gymSlice';

// useDispatchがReduxProviderのコンテクスト外で実行される問題の対策として子コンポーネントに収納
const AppInner: React.FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // アプリ起動時にAsyncStorageからstateをロード
    AsyncStorage.getItem('gymState').then((savedState) => {
      if (savedState !== null) {
        // AsyncStorageから読み込んだstateをReduxに反映
        const gymState = JSON.parse(savedState);
        dispatch(setTrainingLog(gymState.trainingLog));
      }
    });
  }, [dispatch]);

  return <AppNavigator />;
};

const App: React.FC = () => {
  return (
    <Provider store={store}>
      <AppInner />
    </Provider>
  );
};

export default App;
