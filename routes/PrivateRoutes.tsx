import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import React from "react";
import { colors } from "../styles/colors";
import Route from "../screens/Route";

const Tab = createBottomTabNavigator();

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
        name="Parceiros"
        component={Route}
        options={{
          tabBarLabel: "Rotas",
          headerShown: false
        }}
      />
    </Tab.Navigator>
  );
}

