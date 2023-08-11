export interface CountryWithZip {
  zip: string;
  country: string;
}

export type SearchResponse = {
  place_id: number | null;
  licence: string | null;
  boundingbox: string[] | null;
  lat: string | null;
  lon: string | null;
  display_name: string | null;
  class: string | null;
  type: string | null;
  importance: number | null;
};

export type LookupResponse = {
  lat: string;
  lon: string;
  country: string;
};
