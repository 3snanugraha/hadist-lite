import { useState, useCallback } from 'react';
import { hadithApi } from '@/services/api';
import { Hadith, PerawiInfo } from '@/types/hadith';
import { useStorage } from '@/utils/storage';

export function useHadith() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const storage = useStorage();

  const getArbainHadith = useCallback(async (number: number) => {
    setLoading(true);
    try {
      const response = await hadithApi.getArbainHadith(number);
      if (response.status) {
        return response.data;
      }
      throw new Error('Failed to fetch Arbain hadith');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getRandomArbainHadith = useCallback(async () => {
    setLoading(true);
    try {
      const response = await hadithApi.getRandomArbain();
      if (response.status) {
        return response.data;
      }
      throw new Error('Failed to fetch random Arbain hadith');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  const getBulughulHadith = useCallback(async (number: number) => {
    setLoading(true);
    try {
      const response = await hadithApi.getBulughulHadith(number);
      if (response.status) {
        // Transform the data to match Hadith interface
        return {
          arab: response.data.ar,
          indo: response.data.id || '',
          no: response.data.no,
          judul: `Hadith Bulughul Maram No. ${response.data.no}`
        };
      }
      throw new Error('Failed to fetch Bulughul hadith');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);


  const getRandomBulughulHadith = useCallback(async () => {
    setLoading(true);
    try {
      const response = await hadithApi.getRandomBulughul();
      if (response.status) {
        // Add this transformation
        return {
          arab: response.data.ar,
          indo: response.data.id || '',
          no: response.data.no,
          judul: `Hadith Bulughul Maram No. ${response.data.no}`
        };
      }
      throw new Error('Failed to fetch random Bulughul hadith');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);
  

  const getPerawiList = useCallback(async () => {
    setLoading(true);
    try {
      const response = await hadithApi.getPerawiList();
      if (response.status) {
        return response.data;
      }
      throw new Error('Failed to fetch perawi list');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error');
      return null;
    } finally {
      setLoading(false);
    }
  }, []);

  // Add this to the existing useHadith hook
const getHadithByPerawi = useCallback(async (slug: string, number: number) => {
  setLoading(true);
  try {
    const response = await hadithApi.getHadithByPerawi(slug, number);
    if (response.status) {
      return response.data;
    }
    throw new Error('Failed to fetch hadith');
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Unknown error');
    return null;
  } finally {
    setLoading(false);
  }
}, []);

const getRandomPerawi = useCallback(async () => {
  setLoading(true);
  try {
    const response = await hadithApi.getRandomPerawi();
    if (response.status) {
      return response.data;
    }
    throw new Error('Failed to fetch random hadith');
  } catch (err) {
    setError(err instanceof Error ? err.message : 'Unknown error');
    return null;
  } finally {
    setLoading(false);
  }
}, []);

  return {
    loading,
    error,
    getArbainHadith,
    getRandomArbainHadith,
    getBulughulHadith,
    getRandomBulughulHadith,
    getPerawiList,
    getHadithByPerawi,
    getRandomPerawi
  };
}
