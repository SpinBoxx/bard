"use server";

import { constants } from "@/constants/constants";
import { CarFuel } from "@/enums/fuel-enum";
import { ActionError, createAction } from "@/lib/create-action";
import { getFuelPriceSchema } from "@/schemas/get-fuel-schema";
import queryString from "query-string";

type ApiResponse = {
  id: number;
  Brand: {
    id: number;
    name: string;
    short_name: string;
    nb_stations: number;
  };
  type: string;
  name: string;
  Address: {
    street_line: string;
    city_line: string;
  };
  Fuels: Array<{
    id: number;
    type: string;
    name: string;
    short_name: string;
    picto: string;
    Update: {
      value: string;
      text: string;
    };
    rupture: boolean;
    Price: {
      value: number;
      text: string;
    };
  }>;
  LastUpdate: {
    value: string;
    text: string;
  };
};

export const getFuelPrice = createAction
  .schema(getFuelPriceSchema)
  .action(async ({ parsedInput: { fuel } }) => {
    const defaultFuels = ["Gazole", "E10", "E85"];

    const selectMap = new Map();
    const whereMap = new Map();
    const { fuelApi } = constants.api;

    defaultFuels.forEach((fuel) => {
      selectMap.set("select", generateSqlClause("SELECT", defaultFuels));
    });

    defaultFuels.forEach((fuel) => {
      whereMap.set("where", generateSqlClause("WHERE", defaultFuels));
    });

    const paramsSelect = queryString.stringify(Object.fromEntries(selectMap));
    const paramsWhere = queryString.stringify(Object.fromEntries(whereMap));

    console.log(queryString.stringify(Object.fromEntries(selectMap)));

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

    const data: ApiResponse = await response.json();

    const currentFuel = data.Fuels.find(
      (_fuel) =>
        _fuel.short_name.toLowerCase() ===
        translateFuelsForApi(fuel).toLowerCase()
    );

    return currentFuel?.Price;
  });

const generateSqlClause = (clause: "SELECT" | "WHERE", data: string[]) => {
  let i = 0;
  let res = "";

  if (clause === "SELECT") {
    res = data.reduce((acc, curr) => {
      i++;
      return acc.concat(
        `${curr.toLowerCase()}_prix${i !== data.length ? "," : ""}`
      );
    }, "");
  }

  if (clause === "WHERE") {
    res = data.reduce((acc, curr) => {
      i++;
      return acc.concat(
        `carburants_disponibles like "${curr}" ${i !== data.length ? "AND " : ""}`
      );
    }, "");
  }

  return res;
};

const translateFuelsForApi = (fuel: CarFuel) => {
  switch (fuel) {
    case CarFuel.OIL:
      return "Gazole";
    case CarFuel.DIESEL:
      return "E85";
    case CarFuel.ETHANOL:
      return "SP95";
  }
};
