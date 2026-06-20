# Account Management Dashboard - Implementation Guide

## Overview
Complete Account Management Dashboard with all requested features implemented pixel-perfect.

## Features Implemented

### ✅ UI/UX Features
- **Modern clean UI** with consistent 12px border radius
- **Orange primary gradient** (#FF6A00 to #FF8E53) throughout
- **Light background** design
- **Soft shadows** with consistent intensity
- **Left sidebar navigation** with active highlighting
- **All buttons 44px height** (h-11 class)
- **Center-aligned popups** with blur background
- **Mobile-responsive** with bottom sheet behavior

### ✅ Layout Structure
- **Left Sidebar**: Home, My Schedule, Bookings, Account (active)
- **Account Section**: Complete account management flow

### ✅ Account Management Features

#### 1. Account Settings Page
- Edit Profile
- Saved Address
- My Wallet
- Change Language
- Notification Toggle
- Dark Mode Toggle
- My Activity
- My Rating & Reviews
- My Coupon
- Refer & Earn
- Logout button

#### 2. Edit Profile Flow
- Profile image upload
- First name & last name fields
- Gender selection (Male/Female)
- Phone number validation
- Full-width gradient save button

#### 3. Refer & Earn Flow
- Coin card with total coins display
- Refer friends button
- Share popup with copy link + social icons
- Redeem popup with transaction summary
- Success popup with check icon

#### 4. Address Management
- Address list cards with edit/delete options
- Add new address popup with all required fields:
  - Full name
  - Contact number
  - Alternate number
  - Postal code
  - Use my location
  - State dropdown
  - City
  - House no
  - Landmark
  - Confirm button

#### 5. Wallet Screen
- Wallet balance card
- Transaction history list
- Credit/Debit tags with color coding
- Add money and withdraw buttons

#### 6. Bank Account Management
- Add bank account form
- Bank account list with default selection
- Remove bank account with confirmation
- Form validation for all fields

## Technical Implementation

### Reusable Components
- **Modal Component**: Center-aligned with blur background, mobile-responsive
- **FormInput Component**: Consistent styling with validation
- **ToggleSwitch Component**: Reusable toggle switches
- **AccountMenuItem Component**: Consistent menu item styling

### Form Validation
- Required field validation
- Phone number format validation
- IFSC code validation
- Password confirmation matching
- Real-time error display

### Toast Notifications
- Success messages
- Error notifications
- Action confirmations

### Mobile Responsiveness
- Bottom sheet behavior on mobile
- Full-width modals on small screens
- Responsive grid layouts
- Touch-friendly button sizes

## File Structure
```
src/components/account/
├── AccountPage.tsx           # Main account dashboard
├── AccountSidebar.tsx        # Navigation sidebar
├── AccountCard.tsx          # User profile card
├── AccountMenuItem.tsx      # Menu item component
├── ToggleSwitch.tsx         # Toggle switch component
├── index.ts                 # Component exports
├── Forms/
│   └── FormInput.tsx        # Reusable form input
├── Modals/
│   ├── Modal.tsx           # Base modal component
│   └── [All feature modals]
└── modals/
    ├── EditProfileModal.tsx
    ├── ReferAndEarnModal.tsx
    ├── AddressManagementModal.tsx
    ├── WalletModal.tsx
    └── BankAccountModal.tsx
```

## Usage

### Basic Implementation
```tsx
import { AccountPage } from '@/components/account';

export default function Account() {
  return <AccountPage />;
}
```

### Component Usage
```tsx
import { 
  AccountSidebar, 
  AccountCard, 
  EditProfileModal 
} from '@/components/account';

// Use individual components as needed
```

## Styling Consistency
- **Border Radius**: 12px everywhere (rounded-xl)
- **Shadows**: Consistent soft shadows (shadow-sm, shadow-md)
- **Colors**: Orange gradient (#FF6A00 to #FF8E53)
- **Button Height**: 44px (h-11)
- **Spacing**: Consistent padding/margin using Tailwind classes

## Mobile Behavior
- Modals become bottom sheets on mobile
- Full-width buttons and inputs
- Touch-friendly interface
- Responsive layouts using grid and flexbox

## Validation Rules
- Phone: 10-digit numbers only
- IFSC: Valid format (4 letters + 0 + 6 alphanumeric)
- Required fields marked with red asterisk
- Real-time validation feedback

## Toast Messages
- Profile updated successfully
- Address added/removed
- Bank account added
- Coins redeemed
- Error notifications with descriptions