"use client";

import { useState } from "react";
// import { AccountSidebar } from "@/components/account/AccountSidebar";
import AccountSidebar from "@/components/account/AccountSidebar";
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
  ChevronRight,
  Camera,
  Plus,
  Edit,
  Trash2,
  Check,
  Copy,
  Share2,
  Building2,
  Navigation
} from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/hooks/use-toast";
import { Modal } from "@/components/account/Modals/Modal";
import { FormInput } from "@/components/account/Forms/FormInput";

export default function AccountPage() {
  const { logout } = useAuth();
  const { toast } = useToast();
  const [section, setSection] = useState("main");
  
  // State for all sections
  const [darkMode, setDarkMode] = useState(false);
  const [notifications, setNotifications] = useState(true);
  
  // Edit Profile state
  const [profileImage, setProfileImage] = useState<string | null>(null);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [gender, setGender] = useState<"male" | "female" | "">("");
  const [phone, setPhone] = useState("");
  
  // Address state
  const [addresses, setAddresses] = useState([
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
  
  const [showAddAddress, setShowAddAddress] = useState(false);
  const [newAddress, setNewAddress] = useState({
    fullName: "",
    phone: "",
    alternatePhone: "",
    postalCode: "",
    useMyLocation: false,
    state: "",
    city: "",
    houseNo: "",
    landmark: ""
  });
  
  // Wallet state
  const [transactions] = useState([
    { id: 1, type: "credit", amount: 500, description: "Referral Bonus", date: "2024-01-15" },
    { id: 2, type: "debit", amount: 200, description: "Service Payment", date: "2024-01-10" },
  ]);
  
  // Refer & Earn state
  const [coins, setCoins] = useState(1250);
  const [showRedeemModal, setShowRedeemModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  
  // Bank Account state
  const [bankAccounts, setBankAccounts] = useState([
    {
      id: "1",
      bankName: "State Bank of India",
      accountHolderName: "John Doe",
      accountNumber: "****1234",
      ifscCode: "SBIN0002499",
      isDefault: true
    }
  ]);
  
  const [showAddBank, setShowAddBank] = useState(false);
  const [showConfirmDelete, setShowConfirmDelete] = useState(false);
  const [accountToDelete, setAccountToDelete] = useState<string | null>(null);
  const [newAccount, setNewAccount] = useState({
    bankName: "",
    accountHolderName: "",
    accountNumber: "",
    confirmAccountNumber: "",
    ifscCode: ""
  });
  
  // Language modal
  const [showLanguageModal, setShowLanguageModal] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("English");
  
  const languages = ["English", "Hindi", "Marathi", "Tamil", "Telugu", "Bengali"];

  const menuItems: Array<{
    id: string;
    icon: React.ReactNode;
    title: string;
    onClick?: () => void;
    hasToggle?: boolean;
    toggleState?: boolean;
    onToggle?: () => void;
  }> = [
    {
      id: "edit-profile",
      icon: <User className="w-5 h-5" />,
      title: "Edit Profile",
      onClick: () => setSection("editProfile")
    },
    {
      id: "saved-address",
      icon: <MapPin className="w-5 h-5" />,
      title: "Saved Address",
      onClick: () => setSection("address")
    },
    {
      id: "my-wallet",
      icon: <Wallet className="w-5 h-5" />,
      title: "My Wallet",
      onClick: () => setSection("wallet")
    },
    {
      id: "change-language",
      icon: <Globe className="w-5 h-5" />,
      title: "Change Language",
      onClick: () => setShowLanguageModal(true)
    },
    {
      id: "notifications",
      icon: <Bell className="w-5 h-5" />,
      title: "Notification Setting",
      hasToggle: true,
      toggleState: notifications,
      onToggle: () => setNotifications(!notifications)
    },
    {
      id: "dark-mode",
      icon: <Moon className="w-5 h-5" />,
      title: "Dark Mode",
      hasToggle: true,
      toggleState: darkMode,
      onToggle: () => setDarkMode(!darkMode)
    },
    {
      id: "my-activity",
      icon: <Activity className="w-5 h-5" />,
      title: "My Activity",
      onClick: () => setSection("activity")
    },
    {
      id: "my-reviews",
      icon: <Star className="w-5 h-5" />,
      title: "My Rating & Reviews",
      onClick: () => setSection("reviews")
    },
    {
      id: "my-coupons",
      icon: <Ticket className="w-5 h-5" />,
      title: "My Coupon",
      onClick: () => setSection("coupon")
    },
    {
      id: "refer-earn",
      icon: <Gift className="w-5 h-5" />,
      title: "Refer & Earn",
      onClick: () => setSection("refer")
    },
    {
      id: "bank-account",
      icon: <Building2 className="w-5 h-5" />,
      title: "Bank Account",
      onClick: () => setSection("bank")
    }
  ];

  const handleLogout = () => {
    logout();
    toast({ title: "Logged out successfully" });
  };
  
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setProfileImage(event.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };
  
  const handleAddAddress = () => {
    // Add address logic
    const addressToAdd = {
      id: Date.now().toString(),
      ...newAddress,
      isDefault: addresses.length === 0
    };
    setAddresses(prev => [...prev, addressToAdd]);
    setShowAddAddress(false);
    toast({ title: "Address added successfully" });
  };
  
  const handleDeleteAddress = (id: string) => {
    setAddresses(prev => prev.filter(addr => addr.id !== id));
    toast({ title: "Address deleted" });
  };
  
  const handleRedeem = () => {
    setShowRedeemModal(false);
    setShowSuccessModal(true);
    setTimeout(() => {
      setShowSuccessModal(false);
      setSection("main");
    }, 2000);
  };
  
  const handleAddBankAccount = () => {
    const accountToAdd = {
      id: Date.now().toString(),
      ...newAccount,
      accountNumber: `****${newAccount.accountNumber.slice(-4)}`,
      isDefault: bankAccounts.length === 0
    };
    setBankAccounts(prev => [...prev, accountToAdd]);
    setShowAddBank(false);
    toast({ title: "Bank account added successfully" });
  };
  
  const handleDeleteBankAccount = () => {
    if (accountToDelete) {
      setBankAccounts(prev => prev.filter(account => account.id !== accountToDelete));
      setShowConfirmDelete(false);
      setAccountToDelete(null);
      toast({ title: "Bank account removed" });
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-64 flex-shrink-0">
            <AccountSidebar />
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Main Account Settings */}
            {section === "main" && (
              <div className="bg-white rounded-[12px] shadow-sm p-6">
                <h2 className="text-xl font-bold mb-6">Account Settings</h2>
                
                <div className="space-y-0.5">
                  {menuItems.map((item) => (
                    <div key={item.id}>
                      {item.hasToggle ? (
                        <div className="flex items-center justify-between h-11 px-4 rounded-[12px] hover:bg-gray-50 transition-colors">
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                              {item.icon}
                            </div>
                            <span className="font-medium text-gray-900">{item.title}</span>
                          </div>
                          <div className="relative inline-block w-11 h-6 rounded-full bg-gray-300 transition-colors">
                            <div 
                              className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${item.toggleState ? "translate-x-6 bg-orange-500" : "translate-x-1"}`}
                            />
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={item.onClick}
                          className="w-full flex items-center justify-between h-11 px-4 rounded-[12px] hover:bg-gray-50 transition-colors text-left"
                        >
                          <div className="flex items-center gap-3">
                            <div className="flex-shrink-0 w-8 h-8 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600">
                              {item.icon}
                            </div>
                            <span className="font-medium text-gray-900">{item.title}</span>
                          </div>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </button>
                      )}
                    </div>
                  ))}

                  {/* Logout Button */}
                  <div className="pt-4 mt-4 border-t border-gray-100">
                    <button
                      onClick={handleLogout}
                      className="w-full h-11 rounded-[12px] border border-orange-400 text-orange-600 font-medium hover:bg-orange-50 transition-colors flex items-center justify-center gap-2"
                    >
                      <LogOut className="w-5 h-5" />
                      Logout
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Edit Profile Section */}
            {section === "editProfile" && (
              <div className="bg-white rounded-[12px] shadow-sm p-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Edit Profile</h2>
                  <button 
                    onClick={() => setSection("main")}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="flex flex-col items-center gap-6 mb-8">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden border-4 border-white shadow-lg">
                      {profileImage ? (
                        <img
                          src={profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-12 h-12 text-gray-400" />
                      )}
                    </div>
                    <label className="absolute bottom-0 right-0 bg-orange-500 p-2 rounded-full text-white shadow-lg cursor-pointer hover:bg-orange-600 transition-colors">
                      <Camera className="w-4 h-4" />
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                      />
                    </label>
                  </div>

                  <div className="w-full space-y-4">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <FormInput
                        label="First Name"
                        value={firstName}
                        onChange={setFirstName}
                        placeholder="Enter first name"
                      />
                      <FormInput
                        label="Last Name"
                        value={lastName}
                        onChange={setLastName}
                        placeholder="Enter last name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Gender</label>
                      <div className="grid grid-cols-2 gap-3">
                        <button
                          type="button"
                          onClick={() => setGender("male")}
                          className={`p-4 rounded-xl border-2 transition-all ${gender === "male" ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-300 hover:border-gray-400"}`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <User className="w-6 h-6" />
                            <span className="font-medium">Male</span>
                          </div>
                        </button>
                        
                        <button
                          type="button"
                          onClick={() => setGender("female")}
                          className={`p-4 rounded-xl border-2 transition-all ${gender === "female" ? "border-orange-500 bg-orange-50 text-orange-700" : "border-gray-300 hover:border-gray-400"}`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            <User className="w-6 h-6" />
                            <span className="font-medium">Female</span>
                          </div>
                        </button>
                      </div>
                    </div>

                    <FormInput
                      label="Phone Number"
                      type="tel"
                      value={phone}
                      onChange={setPhone}
                      placeholder="Enter phone number"
                    />

                    <button
                      className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md"
                    >
                      Save Changes
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Address Section */}
            {section === "address" && (
              <div className="bg-white rounded-[12px] shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Saved Addresses</h2>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSection("main")}
                      className="text-gray-500 hover:text-gray-700 px-3 py-1"
                    >
                      ✕
                    </button>
                    <button 
                      onClick={() => setShowAddAddress(true)}
                      className="flex items-center gap-2 h-11 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" /> Add Address
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {addresses.map((address) => (
                    <div key={address.id} className={`p-4 rounded-[12px] border ${address.isDefault ? 'border-orange-500' : 'border-gray-200'}`}>
                      <div className="flex justify-between">
                        <div>
                          <div className="flex items-center gap-2">
                            <div className="w-8 h-8 rounded-full bg-orange-100 flex items-center justify-center">
                              <Check className="w-4 h-4 text-orange-600" />
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
                          <button 
                            onClick={() => handleDeleteAddress(address.id)}
                            className="text-red-600 text-sm"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Wallet Section */}
            {section === "wallet" && (
              <div className="bg-white rounded-[12px] shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">My Wallet</h2>
                  <button 
                    onClick={() => setSection("main")}
                    className="text-gray-500 hover:text-gray-700 px-3 py-1"
                  >
                    ✕
                  </button>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-4">
                    <h3 className="text-lg font-semibold">Transaction History</h3>
                    <div className="space-y-3">
                      {transactions.map((transaction) => (
                        <div key={transaction.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-[12px]">
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
                    <div className="bg-gradient-to-r from-orange-500 to-orange-600 rounded-[12px] p-6 text-white text-center">
                      <h3 className="text-lg font-semibold mb-2">Balance</h3>
                      <div className="text-3xl font-bold">₹1,250</div>
                    </div>
                    
                    <button className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-[12px] hover:from-orange-600 hover:to-orange-700 transition-all">
                      Add Money
                    </button>
                    
                    <button className="w-full h-11 border border-orange-500 text-orange-600 font-semibold rounded-[12px] hover:bg-orange-50 transition-all">
                      Withdraw
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Activity Section */}
            {section === "activity" && (
              <div className="bg-white rounded-[12px] shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">My Activity</h2>
                  <button 
                    onClick={() => setSection("main")}
                    className="text-gray-500 hover:text-gray-700 px-3 py-1"
                  >
                    ✕
                  </button>
                </div>
                <div className="text-center py-12 text-gray-500">
                  <Activity className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No activity yet</p>
                </div>
              </div>
            )}

            {/* Reviews Section */}
            {section === "reviews" && (
              <div className="bg-white rounded-[12px] shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">My Rating & Reviews</h2>
                  <button 
                    onClick={() => setSection("main")}
                    className="text-gray-500 hover:text-gray-700 px-3 py-1"
                  >
                    ✕
                  </button>
                </div>
                <div className="text-center py-12 text-gray-500">
                  <Star className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No reviews yet</p>
                </div>
              </div>
            )}

            {/* Coupon Section */}
            {section === "coupon" && (
              <div className="bg-white rounded-[12px] shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">My Coupon</h2>
                  <button 
                    onClick={() => setSection("main")}
                    className="text-gray-500 hover:text-gray-700 px-3 py-1"
                  >
                    ✕
                  </button>
                </div>
                <div className="text-center py-12 text-gray-500">
                  <Ticket className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p>No coupons available</p>
                </div>
              </div>
            )}

            {/* Refer Section */}
            {section === "refer" && (
              <div className="bg-white rounded-[12px] shadow-sm p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Refer & Earn</h2>
                  <button 
                    onClick={() => setSection("main")}
                    className="text-gray-500 hover:text-gray-700 px-3 py-1"
                  >
                    ✕
                  </button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  <div className="lg:col-span-2 space-y-6">
                    <div className="bg-gradient-to-r from-blue-800 to-blue-900 rounded-[12px] p-6 text-white">
                      <div className="flex items-center justify-between">
                        <div>
                          <h3 className="text-lg font-semibold mb-1">Total Coins</h3>
                          <div className="text-3xl font-bold">{coins}</div>
                          <p className="text-blue-200 text-sm mt-1">Terms apply</p>
                        </div>
                        <Gift className="w-12 h-12 text-blue-300" />
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 rounded-[12px] p-4">
                      <p className="text-sm text-gray-600 mb-2">Your referral code:</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 bg-white p-3 rounded-lg border font-mono text-center">
                          REF123ABC
                        </div>
                        <button className="p-3 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors">
                          <Copy className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-2 gap-4">
                      <div className="bg-white border border-gray-200 rounded-[12px] p-4 text-center">
                        <div className="text-2xl font-bold text-orange-600">{coins}</div>
                        <div className="text-sm text-gray-600 mt-1">Total Coins</div>
                      </div>
                      <div className="bg-white border border-gray-200 rounded-[12px] p-4 text-center">
                        <div className="text-2xl font-bold text-green-600">₹{coins * 0.01}</div>
                        <div className="text-sm text-gray-600 mt-1">Coin Value</div>
                      </div>
                    </div>
                    
                    <button 
                      onClick={() => setShowRedeemModal(true)}
                      className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-[12px] hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2"
                    >
                      <Gift className="w-5 h-5" />
                      Redeem Coins
                    </button>
                  </div>
                  
                  <div className="space-y-4">
                    <button className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-[12px] hover:from-orange-600 hover:to-orange-700 transition-all flex items-center justify-center gap-2">
                      <Share2 className="w-5 h-5" />
                      Share Now
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Bank Section */}
            {section === "bank" && (
              <div className="bg-white rounded-[12px] shadow-sm p-6 max-w-2xl mx-auto">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-bold">Bank Accounts</h2>
                  <div className="flex gap-2">
                    <button 
                      onClick={() => setSection("main")}
                      className="text-gray-500 hover:text-gray-700 px-3 py-1"
                    >
                      ✕
                    </button>
                    <button 
                      onClick={() => setShowAddBank(true)}
                      className="flex items-center gap-2 h-11 px-4 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
                    >
                      <Plus className="w-4 h-4" /> Add Account
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  {bankAccounts.map((account) => (
                    <div key={account.id} className="p-4 border border-gray-200 rounded-[12px]">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h3 className="font-semibold text-gray-900">{account.bankName}</h3>
                          {account.isDefault && (
                            <span className="px-2 py-1 bg-orange-100 text-orange-700 text-xs font-medium rounded-full mt-1 inline-block">
                              Default
                            </span>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <button className="p-2 text-orange-500 hover:bg-orange-50 rounded-lg transition-colors">
                            <Edit className="w-4 h-4" />
                          </button>
                          <button 
                            onClick={() => {
                              setAccountToDelete(account.id);
                              setShowConfirmDelete(true);
                            }}
                            className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      
                      <div className="space-y-1 text-sm text-gray-600">
                        <p><span className="font-medium">Account Holder:</span> {account.accountHolderName}</p>
                        <p><span className="font-medium">Account Number:</span> {account.accountNumber}</p>
                        <p><span className="font-medium">IFSC Code:</span> {account.ifscCode}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Add Address Modal */}
      <Modal isOpen={showAddAddress} onClose={() => setShowAddAddress(false)} title="Add New Address" size="md">
        <div className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Full Name"
              value={newAddress.fullName}
              onChange={(value) => setNewAddress(prev => ({ ...prev, fullName: value }))}
              placeholder="Enter full name"
            />
            <FormInput
              label="Contact Number"
              type="tel"
              value={newAddress.phone}
              onChange={(value) => setNewAddress(prev => ({ ...prev, phone: value }))}
              placeholder="Enter phone number"
            />
          </div>

          <FormInput
            label="Alternate Number (Optional)"
            type="tel"
            value={newAddress.alternatePhone}
            onChange={(value) => setNewAddress(prev => ({ ...prev, alternatePhone: value }))}
            placeholder="Enter alternate number"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <FormInput
              label="Postal Code"
              value={newAddress.postalCode}
              onChange={(value) => setNewAddress(prev => ({ ...prev, postalCode: value }))}
              placeholder="Enter postal code"
            />
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">Use My Location</label>
              <button
                type="button"
                className="w-full p-3 border border-gray-300 rounded-xl hover:border-orange-500 transition-colors flex items-center justify-center gap-2"
              >
                <Navigation className="w-5 h-5 text-orange-500" />
                Detect Location
              </button>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">State</label>
              <select
                value={newAddress.state}
                onChange={(e) => setNewAddress(prev => ({ ...prev, state: e.target.value }))}
                className="w-full p-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-colors"
              >
                <option value="">Select State</option>
                <option value="Delhi">Delhi</option>
                <option value="Maharashtra">Maharashtra</option>
                <option value="Karnataka">Karnataka</option>
              </select>
            </div>
            <FormInput
              label="City"
              value={newAddress.city}
              onChange={(value) => setNewAddress(prev => ({ ...prev, city: value }))}
              placeholder="Enter city"
            />
          </div>

          <FormInput
            label="House No./Building Name"
            value={newAddress.houseNo}
            onChange={(value) => setNewAddress(prev => ({ ...prev, houseNo: value }))}
            placeholder="Enter house number or building name"
          />

          <FormInput
            label="Landmark (Optional)"
            value={newAddress.landmark}
            onChange={(value) => setNewAddress(prev => ({ ...prev, landmark: value }))}
            placeholder="Enter landmark"
          />

          <button
            onClick={handleAddAddress}
            className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md"
          >
            Confirm Address
          </button>
        </div>
      </Modal>

      {/* Language Modal */}
      <Modal isOpen={showLanguageModal} onClose={() => setShowLanguageModal(false)} title="Change Language" size="sm">
        <div className="space-y-3">
          {languages.map((language) => (
            <button
              key={language}
              onClick={() => setSelectedLanguage(language)}
              className={`w-full p-4 rounded-xl border-2 text-left transition-all ${selectedLanguage === language ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="font-medium">{language}</div>
            </button>
          ))}
          <button
            onClick={() => {
              setShowLanguageModal(false);
              toast({ title: `Language changed to ${selectedLanguage}` });
            }}
            className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md mt-4"
          >
            Save Changes
          </button>
        </div>
      </Modal>

      {/* Redeem Modal */}
      <Modal isOpen={showRedeemModal} onClose={() => setShowRedeemModal(false)} title="Redeem Coins" size="sm">
        <div className="space-y-6">
          <div className="bg-gray-50 rounded-xl p-6 space-y-4">
            <div className="flex justify-between">
              <span className="text-gray-600">Total Coins</span>
              <span className="font-semibold">{coins} coins</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Coin Value</span>
              <span className="font-semibold">₹{coins * 0.01}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Service Fee</span>
              <span className="font-semibold">₹10</span>
            </div>
            <div className="border-t pt-4 flex justify-between">
              <span className="font-semibold">Final Amount</span>
              <span className="font-bold text-orange-600">₹{coins * 0.01 - 10}</span>
            </div>
          </div>

          <button
            onClick={handleRedeem}
            className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md"
          >
            Redeem Now
          </button>
        </div>
      </Modal>

      {/* Success Modal */}
      <Modal isOpen={showSuccessModal} onClose={() => {}} size="sm">
        <div className="text-center py-8">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-green-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Success!</h3>
          <p className="text-gray-600">Coins redeemed successfully</p>
        </div>
      </Modal>

      {/* Add Bank Account Modal */}
      <Modal isOpen={showAddBank} onClose={() => setShowAddBank(false)} title="Add Bank Account" size="md">
        <div className="space-y-4">
          <FormInput
            label="Bank Name"
            value={newAccount.bankName}
            onChange={(value) => setNewAccount(prev => ({ ...prev, bankName: value }))}
            placeholder="Enter bank name"
          />
          <FormInput
            label="Account Holder Name"
            value={newAccount.accountHolderName}
            onChange={(value) => setNewAccount(prev => ({ ...prev, accountHolderName: value }))}
            placeholder="Enter account holder name"
          />
          <FormInput
            label="Account Number"
            type="password"
            value={newAccount.accountNumber}
            onChange={(value) => setNewAccount(prev => ({ ...prev, accountNumber: value }))}
            placeholder="Enter account number"
          />
          <FormInput
            label="Confirm Account Number"
            type="password"
            value={newAccount.confirmAccountNumber}
            onChange={(value) => setNewAccount(prev => ({ ...prev, confirmAccountNumber: value }))}
            placeholder="Confirm account number"
          />
          <FormInput
            label="IFSC Code"
            value={newAccount.ifscCode}
            onChange={(value) => setNewAccount(prev => ({ ...prev, ifscCode: value }))}
            placeholder="Enter IFSC code"
          />
          <button
            onClick={handleAddBankAccount}
            className="w-full h-11 bg-gradient-to-r from-orange-500 to-orange-600 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-orange-700 transition-all duration-200 shadow-md"
          >
            Add Account
          </button>
        </div>
      </Modal>

      {/* Confirm Delete Modal */}
      <Modal isOpen={showConfirmDelete} onClose={() => setShowConfirmDelete(false)} size="sm">
        <div className="text-center py-6">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Trash2 className="w-8 h-8 text-red-600" />
          </div>
          <h3 className="text-xl font-bold text-gray-900 mb-2">Remove Bank Account?</h3>
          <p className="text-gray-600 mb-6">Are you sure you want to remove this bank account? This action cannot be undone.</p>
          
          <div className="flex gap-3">
            <button
              onClick={() => setShowConfirmDelete(false)}
              className="flex-1 h-11 border border-gray-300 text-gray-700 font-semibold rounded-xl hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleDeleteBankAccount}
              className="flex-1 h-11 bg-red-500 text-white font-semibold rounded-xl hover:bg-red-600 transition-colors"
            >
              Remove
            </button>
          </div>
        </div>
      </Modal>
    </div>
  );
}