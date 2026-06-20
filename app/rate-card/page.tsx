import { Suspense } from "react";
import RateCardContent from "./RateCardContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <RateCardContent />
    </Suspense>
  );
}
