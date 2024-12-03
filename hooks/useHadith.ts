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
        return response.data;
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
        return response.data;
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

  return {
    loading,
    error,
    getArbainHadith,
    getRandomArbainHadith,
    getBulughulHadith,
    getRandomBulughulHadith,
    getPerawiList
  };
}
