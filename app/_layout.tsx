import { SplashScreen, Stack } from "expo-router";
import './globals.css';
import { useFonts } from 'expo-font';
import { useEffect } from "react";

export default function RootLayout() {
  const [fontsLoaded, error] = useFonts({
  "quicksand-bold": require('../assets/fonts/Quicksand-Bold.ttf'),
  "quicksand-medium": require('../assets/fonts/Quicksand-Medium.ttf'),
  "quicksand-regular": require('../assets/fonts/Quicksand-Regular.ttf'),
  "quicksand-semibold": require('../assets/fonts/Quicksand-SemiBold.ttf'),
  "quicksand-light": require('../assets/fonts/Quicksand-Light.ttf'),
});


  useEffect(() => {
    if(error) throw error;
    if(fontsLoaded) SplashScreen.hideAsync();
  }, [fontsLoaded, error]);

  return <Stack screenOptions={{ headerShown: false }}/>;
}
