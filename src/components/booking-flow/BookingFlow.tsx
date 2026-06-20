"use client";

import { useState } from "react";
import { SelectACTypeModal } from "./SelectACTypeModal";
import { SelectCapacityModal } from "./SelectCapacityModal";
import { SelectDateTimeModal } from "./SelectDateTimeModal";
import { SelectAddressModal } from "./SelectAddressModal";
import { AddNewAddressModal } from "./AddNewAddressModal";
import { OrderSummaryModal } from "./OrderSummaryModal";
import { PaymentOptionModal } from "./PaymentOptionModal";
import { OTPModal } from "./OTPModal";

interface BookingFlowProps {
  isOpen: boolean;
  onClose: () => void;
  service: any;
  onSuccess?: () => void;
}

interface Address {
  id: string;
  name: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
}

export const BookingFlow: React.FC<BookingFlowProps> = ({
  isOpen,
  onClose,
  service,
  onSuccess,
}) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [bookingData, setBookingData] = useState({
    acType: "",
    capacity: "",
    date: "",
    time: "",
    notes: "",
    address: null as Address | null,
    paymentMethod: "",
  });

  const handleACTypeSelect = (acType: string) => {
    setBookingData({ ...bookingData, acType });
    setCurrentStep(2);
  };

  const handleCapacitySelect = (capacity: string) => {
    setBookingData({ ...bookingData, capacity });
    setCurrentStep(3);
  };

  const handleDateTimeSelect = (date: string, time: string, notes: string) => {
    setBookingData({ ...bookingData, date, time, notes });
    setCurrentStep(4);
  };

  const handleAddressSelect = (address: Address) => {
    setBookingData({ ...bookingData, address });
    setCurrentStep(6);
  };

  const handleAddNewAddress = () => {
    setCurrentStep(5);
  };

  const handleSaveAddress = (newAddress: any) => {
    setBookingData({
      ...bookingData,
      address: {
        id: "new",
        name: newAddress.name,
        phone: newAddress.phone,
        address: `${newAddress.houseNo}, ${newAddress.street}`,
        city: newAddress.city,
        state: newAddress.state,
        pincode: newAddress.pincode,
      },
    });
    setCurrentStep(6);
  };

  const handlePaymentMethodSelect = (method: string) => {
    setBookingData({ ...bookingData, paymentMethod: method });
    setCurrentStep(8);
  };

  const handleOTPVerify = (otp: string) => {
    console.log("Booking confirmed with OTP:", otp);
    alert("Booking successful! Your service has been confirmed.");
    setCurrentStep(1);
    setBookingData({
      acType: "",
      capacity: "",
      date: "",
      time: "",
      notes: "",
      address: null,
      paymentMethod: "",
    });
    onClose();
    onSuccess?.();
  };

  if (!isOpen) return null;

  // Disable background scroll when modal is open
  if (typeof document !== "undefined") {
    document.body.style.overflow = isOpen ? "hidden" : "unset";
  }

  return (
    <>
      {/* Step 1: Select AC Type */}
      <SelectACTypeModal
        isOpen={currentStep === 1}
        onClose={onClose}
        onContinue={handleACTypeSelect}
        service={service}
      />

      {/* Step 2: Select Capacity */}
      <SelectCapacityModal
        isOpen={currentStep === 2}
        onClose={onClose}
        onContinue={handleCapacitySelect}
      />

      {/* Step 3: Select Date & Time */}
      <SelectDateTimeModal
        isOpen={currentStep === 3}
        onClose={onClose}
        onContinue={handleDateTimeSelect}
      />

      {/* Step 4: Select Address */}
      <SelectAddressModal
        isOpen={currentStep === 4}
        onClose={onClose}
        addresses={[]}
        onContinue={handleAddressSelect}
        onAddNew={handleAddNewAddress}
      />

      {/* Step 5: Add New Address */}
      <AddNewAddressModal
        isOpen={currentStep === 5}
        onClose={onClose}
        onSave={handleSaveAddress}
      />

      {/* Step 6: Order Summary */}
      <OrderSummaryModal
        isOpen={currentStep === 6}
        onClose={onClose}
        onContinue={() => setCurrentStep(7)}
        bookingData={bookingData}
      />

      {/* Step 7: Payment Option */}
      <PaymentOptionModal
        isOpen={currentStep === 7}
        onClose={onClose}
        onContinue={handlePaymentMethodSelect}
        totalPrice={3999}
      />

      {/* Step 8: OTP Verification */}
      <OTPModal
        isOpen={currentStep === 8}
        onClose={onClose}
        onVerify={handleOTPVerify}
      />
    </>
  );
};
