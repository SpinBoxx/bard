"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import type { Travel } from "@/types/travel";
import { DataTableColumnHeader } from "./data-table-column-header";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { fr } from "date-fns/locale";
import { Euro } from "lucide-react";
import { RowActions } from "./row-actions";
import { cn, parseAddress } from "@/lib/utils";
import { constants } from "@/constants/constants";
import { CarFuel } from "@/enums/fuel-enum";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { PropsWithChildren } from "react";

export const columns: ColumnDef<Travel>[] = [
  // {
  //   id: "select",
  //   header: ({ table }) => (
  //     <Checkbox
  //       checked={
  //         table.getIsAllPageRowsSelected() ||
  //         (table.getIsSomePageRowsSelected() && "indeterminate")
  //       }
  //       onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
  //       aria-label="Select all"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   cell: ({ row }) => (
  //     <Checkbox
  //       checked={row.getIsSelected()}
  //       onCheckedChange={(value) => row.toggleSelected(!!value)}
  //       aria-label="Select row"
  //       className="translate-y-[2px]"
  //     />
  //   ),
  //   enableSorting: false,
  //   enableHiding: false,
  // },
  {
    accessorKey: "startDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Début" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {format(row.getValue("startDate") as Date, "dd/MM/yyyy")}
          </span>
        </div>
      );
    },
    filterFn: "includesString",
    sortingFn: (a, b) => {
      const dateA = new Date(a.getValue("startDate") as Date);
      const dateB = new Date(b.getValue("startDate") as Date);
      return dateA.getTime() - dateB.getTime();
    },
  },
  {
    accessorKey: "competition",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Compétition" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Badge className="max-w-[200px] truncate font-medium">
            {row.getValue("competition")}
          </Badge>
        </div>
      );
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "name",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Nom" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("name")}
          </span>
        </div>
      );
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "travel",
    header: () => <span>Trajet</span>,
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span>
            {`${parseAddress(row.original.startingAddress).city} -> ${parseAddress(row.original.destinationAddress).city}`}
          </span>
        </div>
      );
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "distance",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Distance" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("distance")}
          </span>
        </div>
      );
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "carFuel",
    header: ({ column }) => (
      <FuelTypeTooltip>
        <span>Carburant</span>
      </FuelTypeTooltip>
    ),
    cell: ({ row }) => {
      return (
        <div className="flex space-x-2">
          <Badge
            className={cn(
              "max-w-[200px] truncate font-medium",
              constants.carFuelTypes[row.original.carFuel].bgColor
            )}
          >
            {row.getValue("carFuel")}
          </Badge>
        </div>
      );
    },
    filterFn: "includesString",
  },
  {
    accessorKey: "totalPrice",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Prix total" />
    ),
    cell: ({ row }) => {
      return (
        <div className="flex items-center gap-2">
          <span className="max-w-[500px] truncate font-medium">
            {Number(row.getValue("totalPrice")).toPrecision(2)}
          </span>
          <Euro className="text-black size-4" />
        </div>
      );
    },
    filterFn: "includesString",
  },

  {
    id: "actions",
    cell: ({ row }) => <RowActions row={row} />,
  },
];

const FuelTypeTooltip = ({ children }: PropsWithChildren) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>{children}</TooltipTrigger>
        <TooltipContent>
          <p>Basé sur une consommation de 8L au 100</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};
