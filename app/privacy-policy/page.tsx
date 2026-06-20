"use client";

import { useEffect, useState } from "react";
import axios from "axios";

const BASE_URL = "https://app.tasprocompany.in/api";
// or your local API URL

const PrivacyPage = () => {
  const [privacyPolicy, setPrivacyPolicy] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchPrivacyPolicy();
  }, []);

  const fetchPrivacyPolicy = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/customer-policies`, {
        headers: {
          Accept: "application/json",
        },
      });

      console.log("POLICY API:", res.data);

      if (res.data?.status) {
        setPrivacyPolicy(res.data?.data?.privacy_policy || "");
      }
    } catch (error) {
      console.error("Privacy Policy Error:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full">
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white mb-8">
            Privacy Policy
          </h1>

          <div className="max-w-5xl">
            {loading ? (
              <p className="text-gray-500">Loading...</p>
            ) : (
              <div
                className="text-[18px] leading-[2.2] text-gray-700 dark:text-gray-300"
                dangerouslySetInnerHTML={{
                  __html: privacyPolicy,
                }}
              />
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default PrivacyPage;
