import { z } from "zod";

export const getDistanceBetweenTwoAddressSchema = z.object({
  origin: z.string(),
  destination: z.string(),
  isReturnTrip: z.boolean().default(false),
});
