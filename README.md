# A simple API Wrapper for OpenStreetMap in Typescript.

This package provides a simple wrapper for the usage of OpenStreetMap API in Node.js.

## Supported APIs
 - [OpenStreetMaps](https://wiki.openstreetmap.org/wiki/API) - [Docs](https://nominatim.org/release-docs/latest/api/Overview/)

## Client Usage

### Installation
```
yarn add openstreetmap-node
```

### Initialize Client
```ts
import { OpenStreetMap } from "openstreetmap-node";

const client = new OpenStreetMap();
```

### Lookup Postal Code
```ts
    // Single lookup
    // returns a single object {lat: number, lon: number, country: string}
    const singleLookup = await mapInstance.fetchCoordinates("90210", "US");
    
    // Bulk lookup
    // returns an array of objects [{lat: number, lon: number, country: string}]
    const bulkLookup =  await mapInstance.fetchCoordinates(["90210", "93108"], "US");
    
    // Multiple countries
    // returns an array of objects [{lat: number, lon: number, country: string}]
    const multipleCountries =  await mapInstance.fetchCoordinates([{zip: "90210", country: "US"}, {zip: "10243", country: "DE"}]);
```

Created under the [MIT License](LICENSE)