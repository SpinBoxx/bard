//@ts-nocheck
import { dotSpinner } from "ldrs";
import "ldrs/helix";

interface Props {
  text: string;
}

export default function LoaderDotSpinner({ text }: Props) {
  dotSpinner.register();
  return (
    <div className="flex items-center gap-2">
      <l-dot-spinner color="white" size="20" />
      {text}
    </div>
  );
}
