import type { Place } from "@repo/entity/src/place";
import type { RawPlace } from "@repo/api/src/desserbee-web/place";

export default class PlaceConverter {
  convertRawToPlace(raw: RawPlace): Place {
    return {
      name: raw.placeName,
      address: raw.address,
      latitude: raw.latitude,
      longitude: raw.longitude,
    };
  }

  convertPlaceToRaw(place: Place): RawPlace {
    return {
      placeName: place.name,
      address: place.address,
      latitude: place.latitude,
      longitude: place.longitude,
    };
  }
}
