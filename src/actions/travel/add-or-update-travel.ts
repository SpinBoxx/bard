import { addOrUpdateTravelSchema } from "@/schemas/add-or-update-travel-schema";
import type { Travel } from "@/types/travel";
import { getFuelPriceAction } from "../get-fuel-price-action";
import { getDistanceBetweenTwoAddress } from "../get-distance-between-two-address";
import { v4 as uuidv4 } from "uuid";
import { validateSchema } from "@/lib/utils";
import { z } from "zod";

export const addOrUpdateTravelAction = async (
  body: z.infer<typeof addOrUpdateTravelSchema>
) => {
  const result = validateSchema(addOrUpdateTravelSchema, body);

  if (!result.success) {
    return {
      ok: false,
      error: "Le formulaire n'est pas valide !",
    };
  }
  let {
    isReturnTrip,
    startingAddress,
    destinationAddress,
    carFuel,
    tollPrice,
  } = body;

  const distanceResponse = await getDistanceBetweenTwoAddress({
    destination: destinationAddress,
    origin: startingAddress,
    isReturnTrip,
  });

  if (!distanceResponse?.data) {
    return {
      ok: false,
      error: "Impossible de calculer la distance entre les 2 adresses !",
    };
  }
  const { distanceText, distanceValue } = distanceResponse.data;

  const fuelPriceResponse = await getFuelPriceAction({
    fuel: carFuel,
  });

  if (fuelPriceResponse?.serverError || !fuelPriceResponse?.data?.prix) {
    return {
      ok: false,
      error: "Impossible de récuperer le prix du carburant !",
    };
  }

  const fuelPrice = fuelPriceResponse.data.prix;
  const conso = (distanceValue / 1000) * (8 / 100);

  const travelFuelPrice = conso * fuelPrice;

  if (isReturnTrip) {
    tollPrice = tollPrice * 2;
  }

  let travel: Travel;

  const { id, tollTickets, ...partialBody } = body;

  travel = {
    ...partialBody,
    distance: distanceText,
    id: uuidv4(),
    totalPrice: travelFuelPrice,
    createdAt: new Date(),
    updated: new Date(),
    tollTickets: [],
  };

  return {
    ok: true,
    travel,
  };
};
