import { Slot } from 'expo-router';
import { Stack } from 'expo-router';

export default function HadithLayout() {
  return (
    <>
      <Stack.Screen options={{ headerShown: false }} />
      <Slot />
    </>
  );
}
