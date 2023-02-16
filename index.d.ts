export interface User {
  id: number;
  instance_id: string;
  aud: string;
  role: string;
  email: string;
  created_at: string;
}

export interface Collection {
  thumbnail: string | undefined;
  id: number;
  created_at: string;
  name: string;
  type: number;
  max_supply: number;
  mint_price_sats: number;
  created_by: string;
  description: string;
  website: string;
  api_key: string;
  cid: string;
  end_time_ms: number;
}

export interface Inscription {
  id: number;
  bitcoin_address: string;
  collection: number;
  created_at: string;
  image: string;
  inscription_id: string;
  status: string;
}
