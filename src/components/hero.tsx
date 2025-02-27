import { Car, DollarSign, Fuel } from "lucide-react";
import HeroCard from "./cards/hero-card";
import { HeroHighlight, Highlight } from "./framer/hero-highlight";
import { Button } from "./ui/button";
import { AnimatedText } from "./ui/animated-underline";
import { Link } from "@tanstack/react-router";

const HeroSection = () => {
  const heroCards = [
    {
      icon: <Fuel />,
      title: "Suivi des frais kilométriques",
      description:
        "Calculez automatiquement les indemnités pour chaque conducteur.",
    },
    {
      icon: <DollarSign />,
      title: "Gestion des péages",
      description:
        "Enregistrez et partagez les frais de péages en toute transparence.",
    },
    {
      icon: <Car />,
      title: "Covoiturage simplifié",
      description:
        "Optimisez les trajets et réduisez le nombre de véhicules utilisés.",
    },
  ];

  return (
    <div className="space-y-20 pb-20">
      <div className="space-y-5">
        <div className="xl:w-2/3">
          <HeroHighlight className="h1 text-balance text-">
            <Highlight>Gère tes déplacements sportifs</Highlight> facilement
            avec Bard !
          </HeroHighlight>
        </div>
        <p className="text-muted-foreground h3">
          Simplifiez la gestion des trajets pour vos compétitions et
          entraînements. Suivez les frais kilométriques, partagez les coûts des
          péages et organisez facilement les déplacements de votre équipe.
        </p>
        <div className="flex items-center gap-6 mt-10">
          <Link to="/ajouter-un-trajet">
            <Button size="xl" className="">
              Ajouter un trajet
            </Button>
          </Link>

          <Button variant="outline" size="xl">
            Consulter mes trajets
          </Button>
        </div>
      </div>

      <div className="space-y-14">
        <div className="space-y-5">
          <p className="font-medium text-blue-600">SOLUTIONS</p>
          <AnimatedText
            text="Ce que Bard peut vous apporter"
            textClassName="text-left justify-start h2"
          />
          <p className="h2"></p>
        </div>
        <div className="flex gap-7 flex-row">
          {heroCards.map((card) => (
            <HeroCard data={{ ...card }} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
