import { TravelsDataTable } from "@/components/tables/travels-table/data-table";
import { useTravelStore } from "@/stores/use-travels-store";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/mes-trajets/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { getTravels } = useTravelStore();

  return (
    <div>
      <TravelsDataTable travels={getTravels()} />
    </div>
  );
}
