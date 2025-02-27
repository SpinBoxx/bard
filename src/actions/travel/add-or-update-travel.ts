import { ActionError } from "@/lib/create-action";
import { createAction } from "@/lib/create-action";
import { addOrUpdateTravelSchema } from "@/schemas/add-or-update-travel-schema";
import { Travel } from "@/types/travel";
import { getFuelPriceAction } from "../get-fuel-price-action";
import { getDistanceBetweenTwoAddress } from "../get-distance-between-two-address";
import { v4 as uuidv4 } from "uuid";

export const addOrUpdateTravelAction = createAction
  .schema(addOrUpdateTravelSchema)
  .action(async ({ parsedInput }) => {
    let {
      isReturnTrip,
      startingAddress,
      destinationAddress,
      carFuel,
      tollPrice,
    } = parsedInput;

    const distanceResponse = await getDistanceBetweenTwoAddress({
      destination: destinationAddress,
      origin: startingAddress,
      isReturnTrip,
    });

    if (!distanceResponse?.data) {
      throw new ActionError(
        "Impossible de calculer la distance entre les 2 adresses !"
      );
    }
    const { distanceText, distanceValue } = distanceResponse.data;

    const fuelPriceResponse = await getFuelPriceAction({
      fuel: carFuel,
    });

    if (fuelPriceResponse?.serverError || !fuelPriceResponse?.data?.prix) {
      throw new ActionError("Impossible de récuperer le prix du carburant !");
    }

    const fuelPrice = fuelPriceResponse.data.prix;
    const conso = (distanceValue / 1000) * (8 / 100);

    let travelFuelPrice = conso * fuelPrice;

    if (isReturnTrip) {
      tollPrice = tollPrice * 2;
    }

    let travel: Travel;

    const { id, tollTickets, ...body } = parsedInput;

    travel = {
      ...body,
      distance: distanceText,
      id: uuidv4(),
      totalPrice: travelFuelPrice,
      createdAt: new Date(),
      updated: new Date(),
      tollTickets: [],
    };

    return { travel };
  });
