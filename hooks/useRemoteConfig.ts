import { useState, useEffect } from 'react';

interface Donor {
  name: string;
  amount: string;
  date: string;
  message: string;
}

interface AdUnit {
  id: string;
  enabled: boolean;
}

interface AdsConfig {
  enabled: boolean;
  testMode: boolean;
  units: {
    appOpen: AdUnit;
    banner: AdUnit;
    interstitial: AdUnit & {
      frequency: number;
    };
  };
}

interface Donations {
  lastUpdated: string;
  donors: Donor[];
}

interface RemoteConfig {
  version: string;
  lastUpdated: string;
  appId: string;
  ads: AdsConfig;
  donations: Donations;
}

export const useRemoteConfig = () => {
  const [config, setConfig] = useState<RemoteConfig | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchConfig();
  }, []);

  const fetchConfig = async () => {
    try {
      const response = await fetch('https://gist.githubusercontent.com/3snanugraha/b3c85a9eb5f276b58efacb1f6e37695a/raw');
      const data = await response.json();
      setConfig(data);
    } catch (error) {
      console.error('Error fetching remote config:', error);
    } finally {
      setLoading(false);
    }
  };

  return { config, loading };
};
