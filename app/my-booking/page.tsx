// app/my-booking/page.tsx

import { Suspense } from "react";
import MyBookingContent from "./MyBookingContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <MyBookingContent />
    </Suspense>
  );
}
