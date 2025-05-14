import { CarFuel } from "@/enums/fuel-enum";

export const constants = {
  api: {
    fuelApi:
      "https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records",
    geoApi: "https://maps.googleapis.com/maps/api/distancematrix/json",
  },
  frenchAddressRegex:
    /^(\d+)\s+((?:[A-Za-zÀ-ÿ\s'-]+\.?)+)\s+(\d{5})\s+([A-Za-zÀ-ÿ\s'-]+)$/,

  carFuelTypes: {
    [CarFuel.DIESEL]: {
      bgColor: "bg-yellow-500",
      textColor: "text-yellow-800",
    },
    [CarFuel.ETHANOL]: {
      bgColor: "bg-cyan-600",
      textColor: "text-cyan-300",
    },
    [CarFuel.OIL]: {
      bgColor: "bg-green-700",
      textColor: "text-green-300",
    },
  },
};
