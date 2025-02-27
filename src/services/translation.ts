import { Competition } from "@/enums/competition";
import { CarFuel } from "@/enums/fuel-enum";

export const translateCarFuelEnum = (carFuel: CarFuel) => {
  switch (carFuel) {
    case CarFuel.OIL:
      return "Essence";
    case CarFuel.DIESEL:
      return "Diesel";
    case CarFuel.ETHANOL:
      return "Ethanol";
  }
};

export const translateCompetitionEnum = (competition: Competition) => {
  switch (competition) {
    case Competition.CHAMPIONSHIP:
      return "Championnat";
    case Competition.CRITERIUM:
      return "Critérium";
    case Competition.TOURNAMENT:
      return "Tournoi";
  }
};
