import React, { useCallback } from "react";
import { NativeBaseProvider, extendTheme } from "native-base";
import Routes from "./routes";
import { NavigationContainer } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  useFonts,
  Poppins_300Light,
  Poppins_400Regular,
  Poppins_400Regular_Italic,
  Poppins_500Medium,
  Poppins_500Medium_Italic,
  Poppins_600SemiBold,
  Poppins_700Bold
} from '@expo-google-fonts/poppins';
import * as SplashScreen from "expo-splash-screen";
import * as SystemUI from 'expo-system-ui';
import { colors } from "./styles/colors";
//import AuthProvider from "./contexts/AuthContext";

SystemUI.setBackgroundColorAsync("black");
SplashScreen.preventAutoHideAsync();

const theme = extendTheme({
  backgroundColor: colors.black,
});


export default function App() {
  let [fontsLoaded] = useFonts({
    Poppins_300Light,
    Poppins_400Regular,
    Poppins_400Regular_Italic,
    Poppins_500Medium,
    Poppins_500Medium_Italic,
    Poppins_600SemiBold,
    Poppins_700Bold
  });

  const onLayoutRootView = useCallback(async () => {
    if (fontsLoaded) {
      await SplashScreen.hideAsync();
    }
  }, [fontsLoaded]);

  if (!fontsLoaded) {
    return null;
  }


  return (
    <NativeBaseProvider theme={theme}>
      <SafeAreaView
        style={{
          flex: 1,
          backgroundColor: colors.black
        }}
        onLayout={onLayoutRootView}
      >
        <NavigationContainer>
          {/* <AuthProvider> */}
            <Routes />
          {/* </AuthProvider> */}
        </NavigationContainer>
      </SafeAreaView>
    </NativeBaseProvider>
  );
}
