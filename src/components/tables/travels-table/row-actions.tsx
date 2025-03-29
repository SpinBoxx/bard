import { Button } from "@/components/ui/button";
import { useTravelStore } from "@/stores/use-travels-store";
import type { Travel } from "@/types/travel";
import type { Row } from "@tanstack/react-table";
import { Ellipsis, Pen, Trash } from "lucide-react";
import { toast } from "sonner";

function RowActions({ row }: { row: Row<Travel> }) {
  const { removeTravel } = useTravelStore();

  const onDelete = () => {
    const loadingToast = toast.loading("Suppression en cours...", {
      duration: 1000,
    });

    setTimeout(() => {
      removeTravel(row.original.id);
      toast.dismiss(loadingToast);
      toast.success("Trajet supprimé avec succès !");
    }, 1001);
  };

  return (
    <div>
      <Button variant="ghost" onClick={onDelete}>
        <Trash className="text-red-500" />
      </Button>
    </div>
  );
}

export { RowActions };
