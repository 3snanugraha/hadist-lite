import AsyncStorage from '@react-native-async-storage/async-storage';
import { HadithCollection } from '@/types/hadith';

const STORAGE_KEYS = {
  HADITH_COLLECTION: 'hadith_collection',
  LAST_UPDATE: 'last_update'
};

export function useStorage() {
  const saveHadithCollection = async (collection: HadithCollection) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.HADITH_COLLECTION, JSON.stringify(collection));
      await AsyncStorage.setItem(STORAGE_KEYS.LAST_UPDATE, new Date().toISOString());
    } catch (error) {
      console.error('Error saving hadith collection:', error);
    }
  };

  const getHadithCollection = async (): Promise<HadithCollection | null> => {
    try {
      const data = await AsyncStorage.getItem(STORAGE_KEYS.HADITH_COLLECTION);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error('Error getting hadith collection:', error);
      return null;
    }
  };

  const getLastUpdate = async (): Promise<string | null> => {
    try {
      return await AsyncStorage.getItem(STORAGE_KEYS.LAST_UPDATE);
    } catch (error) {
      console.error('Error getting last update:', error);
      return null;
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.HADITH_COLLECTION,
        STORAGE_KEYS.LAST_UPDATE
      ]);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  };

  return {
    saveHadithCollection,
    getHadithCollection,
    getLastUpdate,
    clearStorage
  };
}
