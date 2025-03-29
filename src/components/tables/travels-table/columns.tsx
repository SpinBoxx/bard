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

export const columns: ColumnDef<Travel>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
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
