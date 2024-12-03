import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="(tabs)" 
        options={{ headerShown: false }} 
      />
      <Stack.Screen 
        name="detail-hadist/[id]" 
        options={{
          title: 'Detail Hadist',
          headerStyle: {
            backgroundColor: '#004D40',
          },
          headerTintColor: '#fff',
          headerShown: false,
        }}
      />
      <Stack.Screen 
        name="detail-hadist-perawi/[slug]/[id]" 
        options={{
          title: 'Detail Hadist Perawi',
          headerStyle: {
            backgroundColor: '#004D40',
          },
          headerTintColor: '#fff',
          headerShown: false,
        }}
      />
    </Stack>
  );
}
