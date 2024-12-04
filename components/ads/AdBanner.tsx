import { View } from 'react-native';
import { BannerAd, BannerAdSize } from 'react-native-google-mobile-ads';
import { useAds } from '../../hooks/useAds';

export const AdBanner = () => {
  const { isAdsEnabled, getBannerAdId } = useAds();
  
  if (!isAdsEnabled) return null;
  
  const bannerId = getBannerAdId();
  if (!bannerId) return null;

  return (
    <View style={{ alignItems: 'center', marginVertical: 10 }}>
      <BannerAd
        unitId={bannerId}
        size={BannerAdSize.BANNER}
        requestOptions={{
          requestNonPersonalizedAdsOnly: true,
        }}
      />
    </View>
  );
};
