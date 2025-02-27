export const constants = {
  api: {
    fuelApi:
      "https://data.economie.gouv.fr/api/explore/v2.1/catalog/datasets/prix-des-carburants-en-france-flux-instantane-v2/records",
    geoApi: "https://maps.googleapis.com/maps/api/distancematrix/json",
  },
  frenchAddressRegex:
    /^(\d+)\s+((?:[A-Za-zÀ-ÿ\s'-]+\.?)+)\s+(\d{5})\s+([A-Za-zÀ-ÿ\s'-]+)$/,
};
