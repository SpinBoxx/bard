import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CarFuel } from "@/enums/fuel-enum";
import { translateCarFuelEnum } from "@/services/translation";

interface Props {
  onValueChange: () => void;
  value: CarFuel;
}

export function CarFuelSelect({ onValueChange, value }: Props) {
  return (
    <Select onValueChange={onValueChange} defaultValue={value}>
      <SelectTrigger className="w-full">
        <SelectValue placeholder="Le carburant de voiture" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          {Object.values(CarFuel).map((carFuel) => (
            <SelectItem key={carFuel} value={carFuel}>
              {translateCarFuelEnum(carFuel)}
            </SelectItem>
          ))}
        </SelectGroup>
      </SelectContent>
    </Select>
  );
}
