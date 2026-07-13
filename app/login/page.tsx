"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Phone, ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import axios from "axios";
import Swal from "sweetalert2";

const LoginPage = () => {
  const router = useRouter();
  const [phone, setPhone] = useState("");
  const [countries, setCountries] = useState<any[]>([]);
  const [selectedCountry, setSelectedCountry] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchCountries = async () => {
      try {
        const res = await axios.get(
          "https://app.tasprocompany.in/api/countries",
        );
        if (res.data.status) {
          setCountries(res.data.data);

          // default India
          const india = res.data.data.find((c: any) => c.code === "91");
          setSelectedCountry(india || res.data.data[0]);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchCountries();
  }, []);

const handleSendOTP = async () => {
  if (phone.length !== 10) {
    Swal.fire({
      icon: "warning",
      title: "Invalid Phone Number",
      text: "Please enter a valid 10-digit phone number.",
      confirmButtonColor: "#f97316",
    });
    return;
  }

  try {
    setLoading(true);

    const res = await axios.post(
      "https://app.tasprocompany.in/api/customers/send-otp",
      {
        country_id: selectedCountry.id,
        mobile: phone,
      },
    );

    if (res.data.status) {
      Swal.fire({
        icon: "success",
        title: "OTP Sent",
        text: "OTP has been sent successfully.",
        timer: 1500,
        showConfirmButton: false,
      }).then(() => {
        router.push(`/otp?phone=${phone}`);
      });
    } else {
      Swal.fire({
        icon: "error",
        title: "Failed",
        text: res.data.message || "Unable to send OTP.",
        confirmButtonColor: "#f97316",
      });
    }
  } catch (error: any) {
    if (
      error?.response?.status === 401 ||
      error?.response?.data?.message === "Unauthenticated."
    ) {
      localStorage.removeItem("token");

      Swal.fire({
        icon: "warning",
        title: "Session Expired",
        text: "Please login again.",
        confirmButtonColor: "#f97316",
      }).then(() => {
        router.push("/login");
      });

      return;
    }

    console.error(error?.response?.data || error);

    Swal.fire({
      icon: "error",
      title: "Oops!",
      text:
        error?.response?.data?.message ||
        "Something went wrong. Please try again.",
      confirmButtonColor: "#f97316",
    });
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="md:min-h-screen flex flex-col">
      {/* <Header /> */}

      <main className="flex-1 flex items-center justify-center md:py-8">
        <div className="max-w-4xl w-full flex rounded-2xl overflow-hidden shadow-xl">
          {/* Left Side - White */}
          <div className="w-full md:w-1/2 bg-white p-6 md:p-12 flex flex-col justify-center">
            <div className="mb-8">
              <h1 className="text-4xl font-bold text-gray-900 mb-2">
                Hello &amp; Welcome!
              </h1>
              <p className="text-gray-600">
                Sign in to continue your journey with us
              </p>
            </div>

            <div className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Phone Number
                </label>
                <div className="relative flex items-center border border-gray-300 rounded-lg overflow-hidden">
                  {/* Country Code */}
                  <select
                    value={selectedCountry?.id}
                    onChange={(e) =>
                      setSelectedCountry(
                        countries.find((c) => c.id === Number(e.target.value)),
                      )
                    }
                    className="bg-gray-100 px-3 py-3 text-sm outline-none"
                  >
                    {countries.map((c) => (
                      <option key={c.id} value={c.id}>
                        +{c.code}
                      </option>
                    ))}
                  </select>

                  {/* Phone Icon */}
                  <Phone className="h-5 w-5 text-gray-400 ml-2" />

                  {/* Input */}
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) =>
                      setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))
                    }
                    placeholder="Enter your phone number"
                    className="bg-white w-full px-3 py-3 outline-none"
                  />
                </div>
              </div>

              <button
                onClick={handleSendOTP}
                disabled={loading}
                className="w-full py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-lg flex items-center justify-center gap-2"
              >
                {loading ? "Sending..." : "Send OTP"}
                <ArrowRight className="w-5 h-5" />
              </button>

              <div className="text-center pt-4">
                <p className="text-gray-600">
                  Don't have an account?{" "}
                  <a
                    href="/signup"
                    className="text-orange-600 font-medium hover:underline"
                  >
                    Sign Up
                  </a>
                </p>
              </div>
            </div>
          </div>

          {/* Right Side - Orange BG with Image */}
          <div className="w-1/2 hidden md:flex bg-gradient-to-br from-orange-500 to-orange-600 flex-col items-center justify-center p-12 relative overflow-hidden">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10 text-center text-white">
              <h2 className="text-3xl font-bold mb-4">
                Welcome to TASPRO Company
              </h2>
              <p className="text-orange-100 max-w-md">
                Join thousands of satisfied customers who trust us for their
                home service needs.
              </p>
            </div>
            <div className="relative z-10 mt-8">
              <img
                src="/heroimage.jpg"
                alt="Professional technician"
                className="w-64 h-64 object-cover rounded-full border-4 border-white shadow-xl"
              />
            </div>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default LoginPage;
