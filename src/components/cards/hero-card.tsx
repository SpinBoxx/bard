import { DollarSign } from "lucide-react";
import { ReactNode } from "react";

interface Props {
  data: {
    icon: ReactNode;
    title: string;
    description: string;
  };
}

const HeroCard = ({ data }: Props) => {
  const { icon, description, title } = data;
  return (
    <div className="space-y-3 group hover:bg-blue-200/50 transition-colors p-5 rounded-md">
      <div>
        <div className="bg-blue-100 p-2 rounded-full w-fit transition-colors group-hover:bg-blue-400/50 text-blue-700">
          {icon}
        </div>
      </div>
      <div className="space-y-3">
        <p className="font-bold text-lg">{title}</p>
        <p className="text-muted-foreground">{description}</p>
      </div>
    </div>
  );
};

export default HeroCard;
