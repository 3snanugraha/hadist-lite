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
      mobileAds().initialize();
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
      interstitial.load();
      interstitial.addAdEventListener(AdEventType.LOADED, () => {
        resolve(true);
      });
    });
  };

  const showInterstitial = async () => {
    if (!config?.ads.enabled || !config?.ads.units.interstitial.enabled) return;

    setInterstitialCount(prev => prev + 1);
    
    if (interstitialCount % (config.ads.units.interstitial.frequency || 3) === 0) {
      try {
        await loadInterstitial();
        if (interstitialAd) {
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
