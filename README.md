# TAS PRO - Professional Home Services

TAS PRO is a comprehensive home services platform offering professional repair, maintenance, and installation services for various home appliances and systems. Built with Next.js, TypeScript, and Tailwind CSS, this platform provides a seamless experience for customers to book services and manage their orders.

## Features

- **Service Booking**: Easy booking for AC repair, appliance services, cleaning, and more
- **Multiple Payment Options**: Support for cards, UPI, and cash payments
- **Order Management**: Track your service orders and history
- **Responsive Design**: Fully responsive for all devices
- **Modern UI**: Clean, intuitive user interface with consistent styling

## Pages Implemented

- **Homepage**: Main landing page with service categories
- **Services Page**: Comprehensive list of all available services
- **Service Detail Page**: Detailed information for individual services
- **Cart Page**: Manage items in your shopping cart
- **Checkout Page**: Multi-step checkout process with address and payment
- **Order Confirmation**: Post-order confirmation and details
- **Rate Card**: Transparent pricing for all services
- **Address Management**: Add and manage delivery addresses
- **Payment Options**: Manage saved payment methods
- **Card Details**: Secure card management
- **Terms & Conditions**: Legal information and policies
- **Success Page**: Payment success confirmation
- **AC Repair**: Dedicated page for AC repair services

## Tech Stack

- **Framework**: Next.js 14 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS with custom components
- **Icons**: Lucide React
- **State Management**: React Hooks
- **API Calls**: Next.js App Router features

## Design Principles

- **Consistent Styling**: Uniform color palette using orange as primary color
- **Responsive Layout**: Mobile-first approach with responsive breakpoints
- **Accessibility**: Proper semantic HTML and ARIA attributes
- **Performance**: Optimized images and lazy loading where appropriate

## Getting Started

First, install the dependencies:

```bash
npm install
```

Then, run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Project Structure

```
├── app/
│   ├── service/[id]/page.tsx
│   ├── cart/page.tsx
│   ├── checkout/page.tsx
│   ├── order-confirmation/page.tsx
│   ├── rate-card/page.tsx
│   ├── address/page.tsx
│   ├── payment-options/page.tsx
│   ├── card-details/page.tsx
│   ├── terms/page.tsx
│   ├── success/page.tsx
│   ├── ac-repair/page.tsx
│   ├── layout.tsx
│   ├── page.tsx
│   └── ...
├── src/
│   ├── components/
│   ├── hooks/
│   └── lib/
├── public/
└── package.json
```

## Contributing

We welcome contributions to enhance the TAS PRO platform. Please follow these steps:

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

This project is licensed under the MIT License.