import * as Notifications from 'expo-notifications';

// Configure how notifications behave when the app is open
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
    shouldShowBanner: true,  
    shouldShowList: true,
  }),
});

export const scheduleLowStockNotification = async (itemName: string) => {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Pantry Alert! ⚠️",
      body: `${itemName} is running low. Time to restock!`,
    },
    trigger: null, // Send immediately
  });
};