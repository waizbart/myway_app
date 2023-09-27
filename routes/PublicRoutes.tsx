import { createStackNavigator } from "@react-navigation/stack";
import React from "react";
import { SafeAreaView } from "react-native";

import Welcome from "../screens/Welcome";
import Login from "../screens/Login";
import SignUp from "../screens/SignUp";

import Route from "../screens/Route";

const Stack = createStackNavigator();

export default function PublicRoutes() {

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#0000" }}>
      <Stack.Navigator initialRouteName="Welcome" screenOptions={{
        cardStyle: {
          backgroundColor: '#0000'
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
        {/* Todo: Remove this when we have private routes */}
        <Stack.Screen
          name="Route"
          component={Route}
          options={{ headerShown: false }}
        />
      </Stack.Navigator>
    </SafeAreaView>
  );
}