  export interface Hadith {
    id?: number;
    judul: string;  // Remove optional
    arab: string;
    indo: string;
    number?: number;
    slug?: string;
    no: string | number;
  }
  
  export interface BulughulHadith {
    ar: string;    
    id: string;   
    no: number;    
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
  