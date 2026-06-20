interface AmountSummaryProps {
  totalItems: number;
  totalMRP: number;
  totalDiscount: number;
  couponDiscount: number;
  totalAmount: number;
}

export default function AmountSummary({
  totalItems,
  totalMRP,
  totalDiscount,
  couponDiscount,
  totalAmount,
}: AmountSummaryProps) {
  return (
    <div className="bg-white border rounded-xl p-6">
      <h2 className="font-semibold mb-4">Amount Summary</h2>

      <div className="space-y-2 text-sm mb-4">
        <div className="flex justify-between">
          <span>Total Item ({totalItems})</span>
          <span>₹{totalMRP}</span>
        </div>

        <div className="flex justify-between text-gray-400">
          <span>Total Discount</span>
          <span>₹{totalDiscount}</span>
        </div>

        <div className="flex justify-between text-green-600">
          <span>Coupon Discount</span>
          <span>₹{couponDiscount}</span>
        </div>
      </div>

      <div className="flex justify-between font-semibold text-lg">
        <span>Total Amount</span>
        <span>₹{totalAmount}</span>
      </div>
    </div>
  );
}
