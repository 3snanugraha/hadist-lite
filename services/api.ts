const BASE_URL = 'https://api.myquran.com/v2/hadits';

export interface HadithResponse {
  status: boolean;
  request: {
    path: string;
  };
  data: any; // Can be refined based on specific endpoint responses
}

export const hadithApi = {
  // Arbain Nawawi endpoints
  getArbainHadith: async (number: number): Promise<HadithResponse> => {
    const response = await fetch(`${BASE_URL}/arbain/${number}`);
    return response.json();
  },

  getRandomArbain: async (): Promise<HadithResponse> => {
    const response = await fetch(`${BASE_URL}/arbain/acak`);
    return response.json();
  },

  getAllArbain: async (): Promise<HadithResponse> => {
    const response = await fetch(`${BASE_URL}/arbain/semua`);
    return response.json();
  },

  getBulughulHadith: async (number: number): Promise<HadithResponse> => {
    const response = await fetch(`${BASE_URL}/bm/${number}`);
    return response.json();
  },

  getRandomBulughul: async (): Promise<HadithResponse> => {
    const response = await fetch(`${BASE_URL}/bm/acak`);
    return response.json();
  },

  // 9 Perawi endpoints
  getPerawiList: async (): Promise<HadithResponse> => {
    const response = await fetch(`${BASE_URL}/perawi`);
    return response.json();
  },

  getHadithByPerawi: async (slug: string, number: number): Promise<HadithResponse> => {
    const response = await fetch(`${BASE_URL}/${slug}/${number}`);
    return response.json();
  },

  getRandomPerawi: async (): Promise<HadithResponse> => {
    const response = await fetch(`${BASE_URL}/perawi/acak`);
    return response.json();
  }
};
