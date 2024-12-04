import { Stack } from 'expo-router';
import { useEffect } from 'react';
import { AppOpenAd, TestIds } from 'react-native-google-mobile-ads';
import { useAds } from '../hooks/useAds';

export default function RootLayout() {
  const { showInterstitial, isAdsEnabled, config } = useAds();

  useEffect(() => {
    if (!isAdsEnabled || !config?.ads.units.appOpen.enabled) return;

    const appOpenId = config.ads.testMode 
      ? TestIds.APP_OPEN 
      : config.ads.units.appOpen.id;

    const appOpenAd = AppOpenAd.createForAdRequest(appOpenId);
    
    const loadAndShowAd = async () => {
      await appOpenAd.load();
      await appOpenAd.show();
    };

    loadAndShowAd();
  }, [isAdsEnabled, config]);

  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: '#004D40',
        },
        headerTintColor: '#fff',
        animation: 'slide_from_right',
      }}
    >
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
        listeners={{
          beforeRemove: () => {
            showInterstitial();
          },
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
        listeners={{
          beforeRemove: () => {
            showInterstitial();
          },
        }}
      />
    </Stack>
  );
}
