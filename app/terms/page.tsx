"use client";

// import Header from "@/components/Header";
// import Footer from "@/components/Footer";

const TermsPage = () => {
  return (
    <div className="min-h-screen w-full">
      {/* <Header /> */}

      <main className="py-8 md:py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl">
            {/* Heading */}
            <div className="mb-8">
              <h1 className="text-2xl sm:text-3xl md:text-4xl font-semibold text-gray-900 dark:text-white leading-tight">
                Terms and Conditions
              </h1>

              <p className="text-sm sm:text-base text-gray-600 dark:text-gray-400 mt-2">
                Last updated: January 29, 2026
              </p>
            </div>

            {/* Section */}
            <section className="mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                1. Introduction
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-400 leading-7 mb-4">
                Welcome to TAS PRO! These terms and conditions outline the rules
                and regulations for the use of TAS PRO's Website and Services.
              </p>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-400 leading-7">
                By accessing this website and booking our services, we assume
                you accept these terms and conditions. Do not continue to use
                TAS PRO if you do not agree to take all of the terms and
                conditions stated on this page.
              </p>
            </section>

            {/* Section */}
            <section className="mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                2. Interpretation and Definitions
              </h2>

              <h3 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">
                Interpretation
              </h3>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-400 leading-7 mb-4">
                The words of which the initial letter is capitalized have
                meanings as defined in the following conditions. The following
                definitions shall have the same meaning regardless of whether
                they appear in singular or in plural.
              </p>

              <h3 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">
                Definitions
              </h3>

              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-400 leading-7">
                <li>
                  <strong>Company:</strong> Refers to TAS PRO, the service
                  provider.
                </li>

                <li>
                  <strong>Customer:</strong> Refers to you as the individual who
                  accesses or uses our services.
                </li>

                <li>
                  <strong>Service:</strong> Refers to the home services provided
                  by TAS PRO.
                </li>

                <li>
                  <strong>Website:</strong> Refers to the TAS PRO website
                  accessible at www.taspro.com
                </li>

                <li>
                  <strong>Booking:</strong> Refers to the reservation made by
                  the Customer for a specific service.
                </li>
              </ul>
            </section>

            {/* Section */}
            <section className="mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                3. Booking and Service Terms
              </h2>

              <h3 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">
                Booking Process
              </h3>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-400 leading-7 mb-4">
                When you book a service through our platform, you agree to
                provide accurate and complete information. You are responsible
                for ensuring the accuracy of the service location and timing.
              </p>

              <h3 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">
                Service Execution
              </h3>

              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-400 leading-7">
                <li>
                  Our technicians will arrive within the scheduled time window
                </li>

                <li>
                  Any additional work beyond the booked service may incur extra
                  charges
                </li>

                <li>
                  Customers are responsible for providing access to the service
                  location
                </li>

                <li>
                  Payment is due upon completion of the service unless otherwise
                  agreed
                </li>
              </ul>
            </section>

            {/* Section */}
            <section className="mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                4. Pricing and Payment
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-400 leading-7 mb-4">
                All prices listed on our platform are fixed and inclusive of
                taxes unless otherwise stated. Prices are subject to change
                without prior notice.
              </p>

              <h3 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">
                Payment Methods
              </h3>

              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-400 leading-7">
                <li>
                  We accept various payment methods including credit/debit
                  cards, UPI, and cash
                </li>

                <li>
                  Payment details are securely processed through our payment
                  gateway
                </li>

                <li>
                  Partial payments are not accepted unless specifically agreed
                  upon
                </li>
              </ul>
            </section>

            {/* Section */}
            <section className="mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                5. Cancellation and Refund Policy
              </h2>

              <h3 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">
                Cancellation
              </h3>

              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-400 leading-7 mb-4">
                <li>
                  Cancellations made 24 hours before the scheduled service are
                  free of charge
                </li>

                <li>
                  Cancellations made less than 24 hours before the service may
                  incur a fee
                </li>

                <li>No-shows will be charged a cancellation fee</li>
              </ul>

              <h3 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">
                Refunds
              </h3>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-400 leading-7">
                Refunds are processed within 7-10 business days to the original
                payment method. Refunds may be partial depending on the service
                status and company discretion.
              </p>
            </section>

            {/* Section */}
            <section className="mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                6. Service Quality and Warranty
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-400 leading-7 mb-4">
                We guarantee the quality of our services. Any issues with the
                service must be reported within 24 hours of service completion.
              </p>

              <h3 className="text-base sm:text-lg font-medium text-gray-800 dark:text-gray-300 mb-2">
                Warranty Terms
              </h3>

              <ul className="list-disc pl-5 space-y-2 text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-400 leading-7">
                <li>Warranty periods vary by service type</li>
                <li>Warranty covers defects in workmanship</li>
                <li>Damage due to misuse is not covered under warranty</li>
              </ul>
            </section>

            {/* Section */}
            <section className="mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                7. Limitation of Liability
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-400 leading-7">
                TAS PRO shall not be liable for any indirect, incidental,
                special, or consequential damages arising out of or in
                connection with the use of our services. Our liability is
                limited to the amount paid for the specific service in question.
              </p>
            </section>

            {/* Section */}
            <section className="mb-8">
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                8. Changes to Terms
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-400 leading-7">
                We reserve the right to modify these terms at any time. Changes
                will be effective immediately upon posting to our website.
                Continued use of our services constitutes acceptance of the
                modified terms.
              </p>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-lg sm:text-xl md:text-2xl font-semibold text-gray-900 dark:text-white mb-4">
                9. Contact Information
              </h2>

              <p className="text-sm sm:text-base md:text-lg text-gray-700 dark:text-gray-400 leading-7">
                If you have any questions about these Terms and Conditions,
                please contact us at:
              </p>

              <div className="mt-4 p-4 sm:p-5 bg-gray-50 dark:bg-gray-900 rounded-xl border border-gray-200 dark:border-gray-800">
                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-7">
                  <strong>Email:</strong> support@taspro.com
                </p>

                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-7">
                  <strong>Phone:</strong> +91 98765 43210
                </p>

                <p className="text-sm sm:text-base text-gray-700 dark:text-gray-300 leading-7">
                  <strong>Address:</strong> Raipur, Chhattisgarh, India
                </p>
              </div>
            </section>
          </div>
        </div>
      </main>

      {/* <Footer /> */}
    </div>
  );
};

export default TermsPage;
