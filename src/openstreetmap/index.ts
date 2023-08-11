import { MapClient } from "../base";
import { CountryWithZip, LookupResponse, SearchResponse } from "./types";

export class OpenStreetMap extends MapClient {
  constructor() {
    super();
    this.http.defaults.baseURL = "https://nominatim.openstreetmap.org";
  }

  async fetchCoordinates(
    postalCode: string | string[] | CountryWithZip[],
    country?: string
  ): Promise<LookupResponse | LookupResponse[]> {
    if (typeof postalCode === "string" && typeof country === "string") {
      const lookupResult = await this.fetchPostalCode(postalCode, country);
      return OpenStreetMap.formatCoordinateResponse(lookupResult, country);
    }

    const lookupResults: LookupResponse[] = [];

    if (Array.isArray(postalCode)) {
      for (const code of postalCode) {
        if (typeof code === "string" && typeof country === "string") {
          const lookupResult = await this.fetchPostalCode(code, country);
          lookupResults.push(OpenStreetMap.formatCoordinateResponse(lookupResult, country));
        } else if (
          typeof code === "object" &&
          typeof code.zip === "string" &&
          typeof code.country === "string"
        ) {
          const lookupResult = await this.fetchPostalCode(code.zip, code.country);
          lookupResults.push(OpenStreetMap.formatCoordinateResponse(lookupResult, code.country));
        } else {
          throw new Error("Invalid parameters for lookupPostalCode");
        }
      }
    } else {
      throw new Error("Invalid parameters for lookupPostalCode");
    }

    return lookupResults;
  }

  private async fetchPostalCode(postalCode: string, country: string): Promise<SearchResponse> {
    const response = await this.http.get<SearchResponse[]>("/search", {
      params: {
        format: "json",
        postalcode: postalCode,
        country: country,
        limit: 1,
      },
    });
    const { data } = response;

    if (response.status !== 200 || data.length === 0)
      throw new Error("Openstreetmap lookup failed");

    const apiResponse = data[0];

    if (!apiResponse.lat || !apiResponse.lon) throw new Error("Openstreetmap lookup failed");

    return apiResponse;
  }

  private static formatCoordinateResponse(
    response: SearchResponse,
    country: string
  ): LookupResponse {
    return <LookupResponse>{
      lat: response.lat,
      lon: response.lon,
      country: country,
    };
  }
}

export default OpenStreetMap;
