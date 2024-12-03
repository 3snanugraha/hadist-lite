import { Stack } from 'expo-router';

export default function HadithLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="detail" 
        options={{
          headerStyle: {
            backgroundColor: '#004D40',
          },
          headerTintColor: '#fff',
          title: 'Detail Hadith'
        }} 
      />
      <Stack.Screen 
        name="[slug]/[id]" 
        options={{
          headerStyle: {
            backgroundColor: '#004D40',
          },
          headerTintColor: '#fff',
          title: 'Hadith'
        }} 
      />
    </Stack>
  );
}
