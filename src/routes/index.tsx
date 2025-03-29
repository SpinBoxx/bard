import { createFileRoute } from "@tanstack/react-router";
import "../index.css";
import HeroSection from "@/components/hero";

export const Route = createFileRoute("/")({
  component: Index,
});

function Index() {

  return (
    <div className="p-2 space-y-9">
      <HeroSection />
    </div>
  );
}
