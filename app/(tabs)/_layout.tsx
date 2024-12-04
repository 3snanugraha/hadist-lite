import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { View } from 'react-native';
import { AdBanner } from '../../components/ads/AdBanner';
import { useAds } from '../../hooks/useAds';

export default function TabsLayout() {
  const { showInterstitial } = useAds();

  return (
    <View style={{ flex: 1 }}>
      <Tabs screenOptions={{
        headerStyle: {
          backgroundColor: '#004D40',
        },
        headerShown: false,
        headerTintColor: '#fff',
        tabBarActiveTintColor: '#004D40',
        tabBarInactiveTintColor: 'gray',
      }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="home" size={24} color={color} />
            ),
          }}
          listeners={{
            tabPress: () => {
              showInterstitial();
            },
          }}
        />
        <Tabs.Screen
          name="arbain"
          options={{
            title: 'Arbain',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="collections-bookmark" size={24} color={color} />
            ),
          }}
          listeners={{
            tabPress: () => {
              showInterstitial();
            },
          }}
        />
        <Tabs.Screen
          name="bulughul"
          options={{
            title: 'Bulughul Maram',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="book" size={24} color={color} />
            ),
          }}
          listeners={{
            tabPress: () => {
              showInterstitial();
            },
          }}
        />
        <Tabs.Screen
          name="perawi"
          options={{
            title: 'Perawi',
            headerShown: false,
            tabBarIcon: ({ color }) => (
              <MaterialIcons name="people" size={24} color={color} />
            ),
          }}
          listeners={{
            tabPress: () => {
              showInterstitial();
            },
          }}
        />
      </Tabs>
      <AdBanner />
    </View>
  );
}
