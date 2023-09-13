import { createStackNavigator  } from "@react-navigation/stack";
import React from "react";
import { SafeAreaView } from "react-native";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";

import SignUp from "../screens/SignUp";

const Stack = createStackNavigator();

export default function PublicRoutes() {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FFFFFF" }}>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{
        cardStyle: {
          backgroundColor: '#FFFFFF'
        },
      }}>
        <Stack.Screen
          name="Welcome"
          component={Welcome}
          options={{ headerShown: false }}
        />
         <Stack.Screen
           name="Login"
           component={Login}
           options={{ headerShown: false }}
         />
        
         <Stack.Screen
           name="SignUp"
           component={SignUp}
           options={{ headerShown: false }}
         /> 
      </Stack.Navigator>
    </SafeAreaView>
  );
}