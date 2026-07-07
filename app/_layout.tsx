import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Stack } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import 'react-native-reanimated';
import { Provider } from 'react-redux';
import { store } from '../store';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { useEffect } from 'react';
import * as Notifications from 'expo-notifications';

export const unstable_settings = {
  initialRouteName: '(tabs)', 
};

export default function RootLayout() {
  const colorScheme = useColorScheme();

  useEffect(() => {
    // Request permission on app start
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Please enable notifications to receive low stock alerts!');
      }
    };
    requestPermissions();
  }, []);
  
  return (
    <Provider store={store}>
      <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
        <Stack>
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen name="login" options={{ title: 'Login', headerShown: false }} />
          <Stack.Screen name="modal" options={{ presentation: 'modal' }} />
        </Stack>
        <StatusBar style="auto" />
      </ThemeProvider>
    </Provider>
  );
}