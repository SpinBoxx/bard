import { Competition } from "@/enums/competition";
import { CarFuel } from "@/enums/fuel-enum";
import { TollTicket } from "./toll-ticket";

export type Travel = {
  id: number;
  name: string;
  competition: Competition;
  startDate: Date;
  endDate?: Date;
  isReturnTrip: boolean;
  startingAddress: string;
  destinationAddress: string;
  distance: string;
  tollPrice: number;
  totalPrice: number;
  carFuel: CarFuel;
  createdAt: Date;
  updated: Date;
  userId: string;
  tollTickets: TollTicket[];
};
