import { createFileRoute } from "@tanstack/react-router";
import "../index.css";
import { getFuelPrice } from "@/actions/get-fuel-price-action";
import { CarFuel } from "@/enums/fuel-enum";
import HeroSection from "@/components/hero";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {
  const res = getFuelPrice({
    fuel: CarFuel.DIESEL,
  });
  return (
    <div className="p-2 space-y-9">
      <HeroSection />
    </div>
  );
}
