import AddOrUpdateTravelForm from "@/components/forms/add-or-update-travel";
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ajouter-un-trajet/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div>
      <AddOrUpdateTravelForm />
    </div>
  );
}
