import { CarFuel } from "@/enums/fuel-enum";
import { z } from "zod";

export const getFuelPriceSchema = z.object({
  fuel: z.nativeEnum(CarFuel),
});
