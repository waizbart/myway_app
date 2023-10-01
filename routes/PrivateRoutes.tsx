import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createStackNavigator } from "@react-navigation/stack";

import React from "react";
import { colors } from "../styles/colors";
import { FontAwesome5 } from '@expo/vector-icons'; 
import { useAuth } from "../hooks/useAuth";

const Tab = createBottomTabNavigator();

import Route from "../screens/Route";
import CreateRoute from "../screens/Route/CreateRoute";
import RouteDetails from "../screens/Route/RouteDetails";

const Stack = createStackNavigator();

export default function PrivateRoutes() {
  const { handleLogout } = useAuth();

  return (
    <Tab.Navigator
      initialRouteName="Route"
      screenOptions={({ route }: any) => {
        return {
          tabBarStyle: {
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
            paddingBottom: 25,
            paddingTop: 5,
            height: 90,
            backgroundColor: colors.black,
          },
          tabBarActiveTintColor: colors.green,
          tabBarInactiveTintColor: colors.grey,
          tabBarLabelStyle: {
            fontFamily: 'Poppins_500Medium'
          },
          tabBarHideOnKeyboard: true
        };
      }}
    >
      <Tab.Screen
        name="Rotas"
        component={RouteStack}
        options={{
          tabBarLabel: "Rotas",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="route" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen
        name="Sair"
        component={RouteStack}
        listeners={{
          tabPress: e => {
            e.preventDefault();
            handleLogout();
          },
        }}
        options={{
          tabBarLabel: "Sair",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="sign-out-alt" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const RouteStack = () => {
  return (
    <Stack.Navigator initialRouteName="Club" screenOptions={{
      cardStyle: {
        backgroundColor: '#FFFFFF'
      },
    }}>
      <Stack.Screen
        name="Route"
        component={Route}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="CreateRoute"
        component={CreateRoute}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="RouteDetails"
        component={RouteDetails}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  )
}


