import { constants } from "@/constants/constants";
import { Competition } from "@/enums/competition";
import { CarFuel } from "@/enums/fuel-enum";

import { z } from "zod";

export const addOrUpdateTravelSchema = z.object({
  id: z.string().optional(),
  name: z
    .string({
      required_error: "Requis",
    })
    .min(1, {
      message: "Le nom est requis",
    }),
  // Criterium, championship,etc.
  competition: z.nativeEnum(Competition),
  startDate: z.date({
    required_error: "Requis",
  }),
  endDate: z.date().optional(),
  isReturnTrip: z.boolean().default(false),
  startingAddress: z
    .string({
      required_error: "Requis",
    })
    .regex(constants.frenchAddressRegex, {
      message:
        "L'adresse de départ n'est pas valide, elle doit être au format \"numéro de rue, code postal, ville\". Exemple: 12 rue de la paix 75002 Paris",
    }),
  destinationAddress: z
    .string({
      required_error: "Requis",
    })
    .regex(constants.frenchAddressRegex, {
      message:
        "L'adresse de destination n'est pas valide, elle doit être au format \"numéro de rue, code postal, ville\". Exemple: 12 rue de la paix 75002 Paris",
    }),
  tollPrice: z
    .union([
      z.number().optional(),
      z.string().refine((val) => val === "", {
        message: "La valeur doit être un nombre ou une chaîne vide",
      }),
    ])
    .transform((val) => {
      return val === "" || val === undefined ? 0 : Number(val);
    }),
  carFuel: z.nativeEnum(CarFuel),
  tollTickets: z.array(
    z.object({
      id: z.number().optional(),
      image: z.string(),
    })
  ),
});
