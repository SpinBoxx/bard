"use server";

import { constants } from "@/constants/constants";
import { ActionError } from "@/lib/create-action";
import { createAction } from "@/lib/create-action";
import { getDistanceBetweenTwoAddressSchema } from "@/schemas/get-distance-between-two-address-schema";
import queryString from "query-string";

interface GoogleMapsDistanceMatrixResponse {
  destination_addresses: string[];
  origin_addresses: string[];
  rows: Row[];
  status: string;
}

interface Row {
  elements: Element[];
}

interface Element {
  distance: Distance;
  duration: Duration;
  origin: string;
  destination: string;
  status: string;
}

interface Distance {
  text: string;
  value: number;
}

interface Duration {
  text: string;
  value: number;
}

export const getDistanceBetweenTwoAddress = createAction
  .schema(getDistanceBetweenTwoAddressSchema)
  .action(async ({ parsedInput: { destination, origin, isReturnTrip } }) => {
    const { VITE_MATRIX_GEO_KEY } = import.meta.env;
    const { geoApi } = constants.api;

    const parsedQuery = {
      destinations: destination,
      language: "fr-FR",
      units: "km",
      origins: origin,
      key: VITE_MATRIX_GEO_KEY,
    };

    const queryParams = queryString.stringify(parsedQuery);

    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/${geoApi}?${queryParams}`,
      {
        headers: {
          origin: "*",
        },
      }
    );

    if (!response.ok) {
      throw new ActionError(
        "Impossible de récuperer la distance entre les 2 adresses."
      );
    }

    const data: GoogleMapsDistanceMatrixResponse = await response.json();
    const calculationStatus = data.rows.at(0)?.elements.at(0)?.status;

    if (calculationStatus?.toLowerCase() === "zero_results") {
      throw new ActionError(
        "Une erreur est survenue. Veuillez vérifier la validité de votre adresse de départ et d'arrivé !"
      );
    }

    let distanceText = data.rows.at(0)?.elements.at(0)?.distance.text;
    let distanceValue = data.rows.at(0)?.elements.at(0)?.distance.value;
    const duration = data.rows.at(0)?.elements.at(0)?.duration.text;

    if (!distanceText || !distanceValue || !duration) {
      throw new ActionError(
        "Impossible de récuperer la distance entre les 2 adresses."
      );
    }

    // If we need to calculate the return trip, we may multiply the current distance by 2
    if (isReturnTrip) {
      const distance: string[] = distanceText.split(" ");
      distance[0] = (Number(distance[0]) * 2).toString();
      distanceText = distance.join(" ");
      distanceValue = distanceValue * 2;
    }

    return {
      distanceText,
      distanceValue,
      duration,
    };
  });
