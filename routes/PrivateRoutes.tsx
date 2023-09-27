import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { colors } from "../styles/colors";
import { FontAwesome5 } from '@expo/vector-icons'; 
const Tab = createBottomTabNavigator();

import Route from "../screens/Route";
import CreateRoute from "../screens/Route/CreateRoute";

export default function PrivateRoutes({ navigation }: any) {

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
        component={Route}
        options={{
          tabBarLabel: "Rotas",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="route" size={size} color={color} />
          ),
        }} 
      />
      <Tab.Screen
        name="CreateRoute"
        component={CreateRoute}
        options={{
          tabBarLabel: "Criar rota",
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <FontAwesome5 name="route" size={size} color={color} />
          ),
        }} 
      />
    </Tab.Navigator>
  );
}

