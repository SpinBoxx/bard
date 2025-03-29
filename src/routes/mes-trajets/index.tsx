import { TravelsDataTable } from "@/components/tables/travels-table/data-table";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mes-trajets/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <TravelsDataTable />
    </div>
  );
}
