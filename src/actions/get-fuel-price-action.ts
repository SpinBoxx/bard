import { constants } from "@/constants/constants";
import { CarFuel } from "@/enums/fuel-enum";
import { ActionError, createAction } from "@/lib/create-action";
import { getFuelPriceSchema } from "@/schemas/get-fuel-schema";
import { FuelResponseApiType } from "@/types/api-responses/fuel-response-api";
import queryString from "query-string";

export const getFuelPriceAction = createAction
  .schema(getFuelPriceSchema)
  .action(async ({ parsedInput: { fuel } }) => {
    const selectMap = new Map();
    const whereMap = new Map();
    const { fuelApi } = constants.api;

    selectMap.set(
      "select",
      generateSqlClause("SELECT", "_prix", [translateFuelsForApi(fuel)])
    );

    whereMap.set(
      "where",
      generateSqlClause("WHERE", "carburants_disponibles", [
        translateFuelsForApi(fuel),
      ]) +
        "AND " +
        generateSqlClause("WHERE", "ville", ["Nantes"])
    );

    const paramsSelect = queryString.stringify(Object.fromEntries(selectMap));
    const paramsWhere = queryString.stringify(Object.fromEntries(whereMap));

    const response = await fetch(
      `${fuelApi}?${paramsSelect}&${paramsWhere}&limit=1`,
      {
        headers: {
          accept: "application/json",
        },
      }
    );

    if (!response.ok) {
      throw new ActionError("Impossible de récupérer le prix du carburant.");
    }

    const data: FuelResponseApiType = await response.json();
    console.log(data);
    const res: { prix: number } = {
      prix: data.results[0][`${translateFuelsForApi(fuel).toLowerCase()}_prix`],
    };

    return res;
  });

const generateSqlClause = (
  clause: "SELECT" | "WHERE",
  key: "carburants_disponibles" | "ville" | "_prix",
  data: string[]
) => {
  let i = 0;
  let res = "";

  if (clause === "SELECT") {
    res = data.reduce((acc, curr) => {
      i++;
      return acc.concat(
        `${curr.toLowerCase()}${key}${i !== data.length ? "," : ""}`
      );
    }, "");
  }

  if (clause === "WHERE") {
    res = data.reduce((acc, curr) => {
      i++;
      return acc.concat(
        `${key} like "${curr}" ${i !== data.length ? "AND " : ""}`
      );
    }, "");
  }

  return res;
};

const translateFuelsForApi = (fuel: CarFuel) => {
  switch (fuel) {
    case CarFuel.OIL:
      return "E10";
    case CarFuel.DIESEL:
      return "Gazole";
    case CarFuel.ETHANOL:
      return "E85";
  }
};
