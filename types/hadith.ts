export interface Hadith {
    id: number;
    judul: string;
    arab: string;
    indo: string;
    number?: number;
    slug?: string;
    no: string | number;
  }
  
  export interface PerawiInfo {
    id: string;
    slug: string;
    name: string;
    total_hadith: number;
  }
  
  export interface HadithCollection {
    arbain: Hadith[];
    bulughul: Hadith[];
    perawi: PerawiInfo[];
  }
  