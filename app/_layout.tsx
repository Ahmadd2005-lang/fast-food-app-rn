import { SplashScreen, Stack } from "expo-router";
import './globals.css';
import { useFonts } from 'expo-font';
import { useEffect } from "react";
import * as Sentry from '@sentry/react-native';
import useAuthStore from "@/store/auth.store";

Sentry.init({
  dsn: 'https://505aefbace23e1896486933be9c40793@o4509909643034624.ingest.us.sentry.io/4509909646245888',

  // Adds more context data to events (IP address, cookies, user, etc.)
  // For more information, visit: https://docs.sentry.io/platforms/react-native/data-management/data-collected/
  sendDefaultPii: true,

  // Configure Session Replay
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1,
  integrations: [Sentry.mobileReplayIntegration(), Sentry.feedbackIntegration()],

  // uncomment the line below to enable Spotlight (https://spotlightjs.com)
  // spotlight: __DEV__,
});

export default Sentry.wrap(function RootLayout() {
  const { isLoading, fetchAuthenticatedUser } = useAuthStore();

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

  useEffect(() => {
    fetchAuthenticatedUser()
    
  }, [])

  // if(!fontsLoaded || isLoading) return null;

  return <Stack screenOptions={{ headerShown: false }}/>;
});

