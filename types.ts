export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
  groundingUrls?: Array<{
    title: string;
    uri: string;
  }>;
}

export enum View {
  HOME = 'HOME',
  GUIDE = 'GUIDE',
  STADIUM = 'STADIUM',
  OFFICIAL = 'OFFICIAL'
}

export interface Place {
  id: string;
  name: string;
  category: 'Food' | 'Culture' | 'Nightlife' | 'Nature';
  description: string;
  image: string;
  rating: number;
}

export interface OfficialAlert {
  id: string;
  type: 'info' | 'warning' | 'transport';
  title: string;
  message: string;
  date: string;
}