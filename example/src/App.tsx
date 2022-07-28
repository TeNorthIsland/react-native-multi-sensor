import * as React from 'react';
// import { multiply } from 'react-native-rn-android-lib';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import routers from './routes';

// 收口
const Stack = createNativeStackNavigator();
const Router = () => {
  return (
    <Stack.Navigator initialRouteName="FeatureList">
      {routers.map((item) => {
        return (
          <Stack.Screen
            key={item.name}
            name={item.name}
            component={item.component}
          />
        );
      })}
    </Stack.Navigator>
  );
};

export default function App() {
  return (
    <NavigationContainer>
      <Router />
    </NavigationContainer>
  );
}
