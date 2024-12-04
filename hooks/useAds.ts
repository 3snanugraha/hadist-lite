import { useState, useEffect } from 'react';
import mobileAds, { 
  BannerAd, 
  InterstitialAd, 
  TestIds,
  AdEventType 
} from 'react-native-google-mobile-ads';
import { useRemoteConfig } from './useRemoteConfig';

export const useAds = () => {
  const { config, loading } = useRemoteConfig();
  const [interstitialCount, setInterstitialCount] = useState(0);
  const [interstitialAd, setInterstitialAd] = useState<InterstitialAd | null>(null);

  useEffect(() => {
    if (config?.ads.enabled) {
      // console.log('Initializing mobile ads');
      mobileAds()
        .initialize()
        // .then(() => console.log('Mobile ads initialized'));
    }
  }, [config]);
  

  const loadInterstitial = async () => {
    if (!config?.ads.enabled || !config?.ads.units.interstitial.enabled) return;
  
    const adUnitId = config.ads.testMode 
      ? TestIds.INTERSTITIAL 
      : config.ads.units.interstitial.id;
  
    const interstitial = InterstitialAd.createForAdRequest(adUnitId);
    setInterstitialAd(interstitial);
  
    return new Promise((resolve) => {
      interstitial.addAdEventListener(AdEventType.LOADED, () => {
        resolve(true);
      });
      interstitial.load();
    });
  };

  const showInterstitial = async () => {
    // console.log('Showing interstitial, count:', interstitialCount);
    if (!config?.ads.enabled || !config?.ads.units.interstitial.enabled) {
      // console.log('Ads disabled or not configured');
      return;
    }
  
    setInterstitialCount(prev => prev + 1);
      
    if (interstitialCount % (config.ads.units.interstitial.frequency || 3) === 0) {
      try {
        // console.log('Loading interstitial');
        await loadInterstitial();
        if (interstitialAd) {
          // console.log('Showing interstitial ad');
          await interstitialAd.show();
        }
      } catch (error) {
        console.error('Interstitial error:', error);
      }
    }
  };
  

  const getBannerAdId = () => {
    if (!config?.ads.enabled || !config?.ads.units.banner.enabled) return null;
    return config.ads.testMode ? TestIds.BANNER : config.ads.units.banner.id;
  };

  return {
    isAdsEnabled: config?.ads.enabled ?? false,
    showInterstitial,
    getBannerAdId,
    loading,
    config
  };
};
