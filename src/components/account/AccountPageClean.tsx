"use client";
import { useState } from "react";
import Image from "next/image";
import { 
  User, 
  MapPin, 
  Wallet, 
  Globe, 
  Bell, 
  Moon, 
  Activity, 
  Star, 
  Ticket, 
  Gift, 
  LogOut,
  Package,
  Calendar,
  Home
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";

export default function AccountPage() {
  const { user, logout } = useAuth();
  const { toast } = useToast();
  const [section, setSection] = useState("main");
  
  // State for all sections
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  // Edit Profile state
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [phone, setPhone] = useState(user?.phone || "");
  
  // Address state
  const [addresses] = useState([
    {
      id: "1",
      fullName: "John Doe",
      phone: "9876543210",
      alternatePhone: "9876543211",
      postalCode: "110001",
      state: "Delhi",
      city: "New Delhi",
      houseNo: "123, Main Street",
      landmark: "Near Metro Station",
      isDefault: true
    }
  ]);
  
  // Wallet state
  const [transactions] = useState([
    { id: 1, type: "credit", amount: 500, description: "Referral Bonus", date: "2024-01-15" },
    { id: 2, type: "debit", amount: 200, description: "Service Payment", date: "2024-01-10" },
  ]);
  
  // Refer & Earn state
  const [coins] = useState(1250);

  const menuItems = [
    { id: "edit-profile", title: "Edit Profile", icon: <User className="w-5 h-5" />, onClick: () => setSection("editProfile") },
    { id: "saved-address", title: "Saved Address", icon: <MapPin className="w-5 h-5" />, onClick: () => setSection("address") },
    { id: "my-wallet", title: "My Wallet", icon: <Wallet className="w-5 h-5" />, onClick: () => setSection("wallet") },
    { id: "change-language", title: "Change Language", icon: <Globe className="w-5 h-5" />, onClick: () => setSection("language") },
    { 
      id: "notifications", 
      title: "Notification Setting", 
      icon: <Bell className="w-5 h-5" />, 
      hasToggle: true,
      toggleState: notifications,
      onToggle: () => setNotifications(!notifications),
      onClick: () => setSection("notifications")
    },
    { 
      id: "dark-mode", 
      title: "Dark Mode", 
      icon: <Moon className="w-5 h-5" />, 
      hasToggle: true,
      toggleState: darkMode,
      onToggle: () => setDarkMode(!darkMode),
      onClick: () => setSection("darkMode")
    },
    { id: "my-activity", title: "My Activity", icon: <Activity className="w-5 h-5" />, onClick: () => setSection("activity") },
    { id: "my-reviews", title: "My Rating & Reviews", icon: <Star className="w-5 h-5" />, onClick: () => setSection("reviews") },
    { id: "my-coupons", title: "My Coupon", icon: <Ticket className="w-5 h-5" />, onClick: () => setSection("coupon") },
    { id: "refer-earn", title: "Refer & Earn", icon: <Gift className="w-5 h-5" />, onClick: () => setSection("refer") },
    { id: "bank-account", title: "Bank Account", icon: <User className="w-5 h-5" />, onClick: () => setSection("bank") }
  ];

  const sidebarItems = [
    { label: "Home", icon: <Home className="w-4 h-4" />, href: "/" },
    { label: "My Schedule", icon: <Calendar className="w-4 h-4" />, href: "/schedule" },
    { label: "Bookings", icon: <Package className="w-4 h-4" />, href: "/my-booking" },
    { label: "Account", icon: <User className="w-4 h-4" />, href: "/account", active: true },
  ];

  const handleLogout = () => {
    logout();
    toast({ title: "Logged out successfully" });
  };

  // Render functions for each section
  const renderMainContent = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
      <div className="space-y-4 text-gray-700">
        {menuItems.map((item) => (
          <div
            key={item.id}
            className="flex justify-between items-center py-3 border-b last:border-none hover:bg-gray-50 px-2 rounded-lg cursor-pointer transition"
            onClick={item.onClick}
          >
            <div className="flex items-center gap-3">
              {item.icon}
              <span>{item.title}</span>
            </div>
            {item.hasToggle ? (
              <div className="relative inline-block w-11 h-6 rounded-full bg-gray-300 transition-colors">
                <div 
                  className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                    item.toggleState ? "translate-x-6 bg-orange-500" : "translate-x-1"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    if (item.onToggle) item.onToggle();
                  }}
                />
              </div>
            ) : (
              <span>›</span>
            )}
          </div>
        ))}
        <button 
          className="w-full mt-6 border border-orange-500 text-orange-500 py-3 rounded-lg hover:bg-orange-50 transition"
          onClick={handleLogout}
        >
          Logout
        </button>
      </div>
    </div>
  );

  const renderEditProfile = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Edit Profile</h3>
        <button 
          onClick={() => setSection("main")}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="flex flex-col items-center gap-6 mb-8">
        <div className="relative">
          <Image
            src={profileImage || user?.profileImage || "/profile.png"}
            alt="Profile"
            width={96}
            height={96}
            className="rounded-full object-cover border-4 border-white shadow-lg"
          />
        </div>

        <div className="w-full space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Enter first name"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
                placeholder="Enter last name"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setGender("male")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  gender === "male" 
                    ? "border-orange-500 bg-orange-50 text-orange-700" 
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <User className="w-6 h-6" />
                  <span className="font-medium">Male</span>
                </div>
              </button>
              
              <button
                type="button"
                onClick={() => setGender("female")}
                className={`p-4 rounded-xl border-2 transition-all ${
                  gender === "female" 
                    ? "border-orange-500 bg-orange-50 text-orange-700" 
                    : "border-gray-300 hover:border-gray-400"
                }`}
              >
                <div className="flex flex-col items-center gap-2">
                  <User className="w-6 h-6" />
                  <span className="font-medium">Female</span>
                </div>
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              placeholder="Enter phone number"
            />
          </div>

          <button className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md">
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );

  const renderAddress = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Saved Addresses</h3>
        <button 
          onClick={() => setSection("main")}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="space-y-4">
        {addresses.map((address) => (
          <div key={address.id} className={`p-4 rounded-xl border ${address.isDefault ? 'border-orange-500' : 'border-gray-200'}`}>
            <div className="flex justify-between">
              <div>
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M20 10c0-4.4-3.6-8-8-8s-8 3.6-8 8 3.6 8 8 8 8-3.6 8-8z"></path>
                      <circle cx="12" cy="10" r="3"></circle>
                    </svg>
                  </div>
                  <div className="font-medium">{address.fullName}</div>
                  <span className="px-2 py-1 bg-gray-100 text-gray-600 text-xs rounded-full">{address.isDefault ? 'Default' : 'Home'}</span>
                </div>
                <div className="text-sm text-gray-600 mt-2">
                  <div>{address.houseNo}</div>
                  <div>{address.landmark && `${address.landmark}, `}{address.city}, {address.state} - {address.postalCode}</div>
                  <div>Phone: {address.phone}</div>
                  {address.alternatePhone && <div>Alt: {address.alternatePhone}</div>}
                </div>
              </div>

              <div className="flex flex-col gap-2">
                {!address.isDefault && (
                  <button className="text-orange-600 text-sm">Set as Default</button>
                )}
                <button className="text-blue-600 text-sm">Edit</button>
                <button className="text-red-600 text-sm">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderWallet = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">My Wallet</h3>
        <button 
          onClick={() => setSection("main")}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <h4 className="text-md font-semibold">Transaction History</h4>
          <div className="space-y-3">
            {transactions.map((transaction) => (
              <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-xl">
                <div>
                  <div className="font-medium">{transaction.description}</div>
                  <div className="text-sm text-gray-500">{transaction.date}</div>
                </div>
                <div className={`font-semibold ${transaction.type === 'credit' ? 'text-green-600' : 'text-red-600'}`}>
                  {transaction.type === 'credit' ? '+' : '-'}₹{transaction.amount}
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-xl p-6 text-white text-center">
            <h4 className="text-md font-semibold mb-2">Balance</h4>
            <div className="text-2xl font-bold">₹1,250</div>
          </div>
          
          <button className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all">
            Add Money
          </button>
          
          <button className="w-full h-11 border border-orange-500 text-orange-600 font-semibold rounded-xl hover:bg-orange-50 transition-all">
            Withdraw
          </button>
        </div>
      </div>
    </div>
  );

  const renderLanguage = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Change Language</h3>
        <button 
          onClick={() => setSection("main")}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-3">
        {["English", "Hindi", "Marathi", "Tamil", "Telugu", "Bengali"].map((language) => (
          <button
            key={language}
            className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
              language === "English" 
                ? "border-orange-500 bg-orange-50 text-orange-700" 
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            <div className="font-medium">{language}</div>
          </button>
        ))}
        <button
          onClick={() => {
            setSection("main");
            toast({ title: "Language changed to English" });
          }}
          className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md mt-4"
        >
          Save Changes
        </button>
      </div>
    </div>
  );

  const renderActivity = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">My Activity</h3>
        <button 
          onClick={() => setSection("main")}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      <div className="text-center py-12 text-gray-500">
        <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p>No activity yet</p>
      </div>
    </div>
  );

  const renderReviews = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">My Rating & Reviews</h3>
        <button 
          onClick={() => setSection("main")}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      <div className="text-center py-12 text-gray-500">
        <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p>No reviews yet</p>
      </div>
    </div>
  );

  const renderCoupon = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">My Coupon</h3>
        <button 
          onClick={() => setSection("main")}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      <div className="text-center py-12 text-gray-500">
        <Ticket className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p>No coupons available</p>
      </div>
    </div>
  );

  const renderRefer = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Refer & Earn</h3>
        <button 
          onClick={() => setSection("main")}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-xl p-6 text-white">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-md font-semibold mb-1">Total Coins</h4>
                <div className="text-2xl font-bold">{coins}</div>
                <p className="text-blue-200 text-sm mt-1">Terms apply</p>
              </div>
              <Gift className="w-12 h-12 text-blue-300" />
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-xl p-4">
            <p className="text-sm text-gray-600 mb-2">Your referral code:</p>
            <div className="flex items-center gap-2">
              <div className="flex-1 bg-white p-3 rounded-lg border font-mono text-center">
                REF123ABC
              </div>
              <button className="p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-xl font-bold text-orange-600">{coins}</div>
              <div className="text-xs text-gray-600 mt-1">Total Coins</div>
            </div>
            <div className="bg-white border border-gray-200 rounded-xl p-4 text-center">
              <div className="text-xl font-bold text-green-600">₹{coins * 0.01}</div>
              <div className="text-xs text-gray-600 mt-1">Coin Value</div>
            </div>
          </div>
          
          <button className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2">
            <Gift className="w-5 h-5" />
            Redeem Coins
          </button>
        </div>
        
        <div className="space-y-4">
          <button className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
              <polyline points="16 6 12 2 8 6"></polyline>
              <line x1="12" y1="2" x2="12" y2="15"></line>
            </svg>
            Share Now
          </button>
        </div>
      </div>
    </div>
  );

  const renderBank = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Bank Accounts</h3>
        <button 
          onClick={() => setSection("main")}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="text-center py-12 text-gray-500">
        <User className="w-12 h-12 mx-auto mb-4 text-gray-300" />
        <p>No bank accounts added yet</p>
        <button className="mt-4 px-6 py-3 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all">
          Add Bank Account
        </button>
      </div>
    </div>
  );

  const renderNotifications = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Notification Settings</h3>
        <button 
          onClick={() => setSection("main")}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center py-3 border-b">
          <div>
            <h4 className="font-medium">Push Notifications</h4>
            <p className="text-sm text-gray-500">Receive notifications on your device</p>
          </div>
          <div className="relative inline-block w-11 h-6 rounded-full bg-gray-300 transition-colors">
            <div 
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                notifications ? "translate-x-6 bg-orange-500" : "translate-x-1"
              }`}
              onClick={() => setNotifications(!notifications)}
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center py-3 border-b">
          <div>
            <h4 className="font-medium">Email Notifications</h4>
            <p className="text-sm text-gray-500">Receive updates via email</p>
          </div>
          <div className="relative inline-block w-11 h-6 rounded-full bg-gray-300 transition-colors">
            <div 
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                notifications ? "translate-x-6 bg-orange-500" : "translate-x-1"
              }`}
              onClick={() => setNotifications(!notifications)}
            />
          </div>
        </div>
        
        <div className="flex justify-between items-center py-3 border-b">
          <div>
            <h4 className="font-medium">SMS Notifications</h4>
            <p className="text-sm text-gray-500">Receive updates via SMS</p>
          </div>
          <div className="relative inline-block w-11 h-6 rounded-full bg-gray-300 transition-colors">
            <div 
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                notifications ? "translate-x-6 bg-orange-500" : "translate-x-1"
              }`}
              onClick={() => setNotifications(!notifications)}
            />
          </div>
        </div>
      </div>
    </div>
  );

  const renderDarkMode = () => (
    <div className="bg-white p-6 rounded-xl shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <h3 className="text-lg font-semibold">Dark Mode Settings</h3>
        <button 
          onClick={() => setSection("main")}
          className="text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>
      </div>
      
      <div className="space-y-4">
        <div className="flex justify-between items-center py-3 border-b">
          <div>
            <h4 className="font-medium">Dark Mode</h4>
            <p className="text-sm text-gray-500">Enable dark theme for the app</p>
          </div>
          <div className="relative inline-block w-11 h-6 rounded-full bg-gray-300 transition-colors">
            <div 
              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${
                darkMode ? "translate-x-6 bg-orange-500" : "translate-x-1"
              }`}
              onClick={() => setDarkMode(!darkMode)}
            />
          </div>
        </div>
        
        <div className="pt-4">
          <h4 className="font-medium mb-3">Schedule</h4>
          <div className="grid grid-cols-2 gap-3">
            <div className="border border-gray-300 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">Start Time</p>
              <p className="font-medium">6:00 PM</p>
            </div>
            <div className="border border-gray-300 rounded-lg p-3 text-center">
              <p className="text-xs text-gray-500 mb-1">End Time</p>
              <p className="font-medium">6:00 AM</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="flex gap-8 p-8 bg-gray-50 min-h-screen">
      {/* Sidebar */}
      <div className="w-64 bg-white rounded-xl shadow-sm p-6">
        <ul className="space-y-6 text-gray-600">
          {sidebarItems.map((item, index) => (
            <li 
              key={index} 
              className={`${item.active ? 'text-orange-500 font-semibold' : ''}`}
            >
              <a href={item.href} className="flex items-center gap-2">
                {item.icon}
                {item.label}
              </a>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section */}
      <div className="flex-1 space-y-6">
        {/* Profile Summary Section */}
        <div className="flex justify-between items-center bg-white p-6 rounded-xl shadow-sm">
          <div className="flex items-center gap-6">
            <Image
              src={user?.profileImage || "/profile.png"}
              alt="profile"
              width={90}
              height={90}
              className="rounded-full object-cover"
            />

            <div>
              <h2 className="text-xl font-semibold">{user?.firstName} {user?.lastName}</h2>
              <p className="text-gray-500 text-sm">
                {user?.email}
              </p>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex gap-4">
            <button 
              className="border border-orange-500 text-orange-500 px-6 py-2 rounded-lg hover:bg-orange-50 transition"
              onClick={() => window.location.href = "/my-booking"}
            >
              My Bookings
            </button>

            <button 
              className="border border-orange-500 text-orange-500 px-6 py-2 rounded-lg hover:bg-orange-50 transition"
              onClick={() => window.location.href = "/help"}
            >
              Help Center
            </button>
          </div>
        </div>

        {/* Main Content based on section */}
        {section === "main" && renderMainContent()}
        {section === "editProfile" && renderEditProfile()}
        {section === "address" && renderAddress()}
        {section === "wallet" && renderWallet()}
        {section === "language" && renderLanguage()}
        {section === "activity" && renderActivity()}
        {section === "reviews" && renderReviews()}
        {section === "coupon" && renderCoupon()}
        {section === "refer" && renderRefer()}
        {section === "bank" && renderBank()}
        {section === "notifications" && renderNotifications()}
        {section === "darkMode" && renderDarkMode()}
      </div>
    </div>
  );
}