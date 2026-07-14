"use client";

import { useState, useEffect } from "react";
import { useAuth } from "@/context/AuthContext";
import ProfileImageUploader from "@/components/ProfileImageUploader";
import Swal from "sweetalert2";
import { 
  Home, 
  Calendar, 
  Package, 
  User, 
  Mail, 
  MapPin, 
  Phone,
  Camera,
  Edit,
  Check,
  CreditCard,
  Shield
} from "lucide-react";

const MyProfilePage = () => {
  const { user, logout, updateUserProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [formData, setFormData] = useState({
    firstName: user?.firstName || '',
    lastName: user?.lastName || '',
    email: user?.email || '',
    phone: user?.phone || '',
    location: user?.location || '',
    gender: user?.gender || '',
    profileImage: user?.profileImage || null
  });
  
  const [passwordData, setPasswordData] = useState({
    currentPassword: '',
    newPassword: '',
    confirmNewPassword: ''
  });
  
  // Profile image state
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  // Update form data when user changes
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || '',
        lastName: user.lastName || '',
        email: user.email || '',
        phone: user.phone || '',
        location: user.location || '',
        gender: user.gender || '',
        profileImage: user.profileImage || null
      });
      // Reset image states when user changes
      setPreviewImage(null);
      setSelectedFile(null);
    }
  }, [user]);
  
  // Handle profile image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
     Swal.fire({
       icon: "warning",
       title: "Invalid Image",
       text: "Please select a valid image file (JPEG, PNG, GIF, or WebP).",
       confirmButtonColor: "#f97316",
     });
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
    Swal.fire({
      icon: "warning",
      title: "File Too Large",
      text: "File size must be less than 5MB.",
      confirmButtonColor: "#f97316",
    });
      return;
    }

    setSelectedFile(file);
    setPreviewImage(URL.createObjectURL(file));
  };
  

  
  // Handle profile image update
  const handleProfileImageUpdate = (imageUrl: string) => {
    const updatedData = { ...formData, profileImage: imageUrl };
    setFormData(updatedData);
    updateUserProfile({ profileImage: imageUrl });
  };

  
  if (!user) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login to View Profile</h2>
          <a href="/login" className="text-orange-600 font-medium hover:underline">
            Go to Login
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <h1 className="text-xl font-bold text-gray-900">My Profile</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar */}
          <div className="md:w-64">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <nav className="space-y-2">
                <a
                  href="/"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </a>
                <a
                  href="/schedule"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Calendar className="w-5 h-5" />
                  <span>My Schedule</span>
                </a>
                <a
                  href="/my-booking"
                  className="flex items-center gap-3 px-4 py-3 text-gray-700 rounded-lg hover:bg-gray-100 transition-colors"
                >
                  <Package className="w-5 h-5" />
                  <span>Bookings</span>
                </a>
                <a
                  href="/profile"
                  className="flex items-center gap-3 px-4 py-3 bg-orange-50 text-orange-600 rounded-lg font-medium"
                >
                  <User className="w-5 h-5" />
                  <span>My Profile</span>
                </a>
              </nav>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <div className="bg-white rounded-2xl shadow-sm overflow-hidden">
              {/* Profile Image Section - Centered Card */}
              <div className="p-8 bg-gray-50 border-b">
                <ProfileImageUploader
                  currentImageUrl={user?.profileImage}
                  onImageUpdate={handleProfileImageUpdate}
                  userId={user?.id ? String(user.id) : undefined}
                />
              </div>

              {/* Profile Header */}
              <div className="bg-gradient-to-r from-orange-500 to-orange-600 p-8 text-white">
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 rounded-full bg-white/20 flex items-center justify-center overflow-hidden">
                      {user?.profileImage ? (
                        <img
                          src={user.profileImage}
                          alt="Profile"
                          className="w-full h-full object-cover"
                        />
                      ) : (
                        <User className="w-12 h-12 text-white" />
                      )}
                    </div>
                  </div>
                  <div>
                    <h1 className="text-3xl font-bold">
                      {user?.firstName && user?.lastName
                        ? `${user.firstName} ${user.lastName}`
                        : user?.firstName
                          ? user.firstName
                          : "User Name"}
                    </h1>
                    <p className="text-orange-100 mt-1">
                      Member since {new Date().getFullYear()}
                    </p>
                  </div>
                </div>
              </div>

              {/* Profile Content */}
              <div className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Personal Information */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Personal Information
                    </h2>

                    {/* Profile Image Section - Always visible */}
                    <div className="flex flex-col items-center mb-6">
                      <img
                        src={
                          previewImage
                            ? previewImage
                            : user?.profileImage
                              ? user.profileImage
                              : "/default-avatar.png"
                        }
                        alt="Profile"
                        className="w-24 h-24 rounded-full object-cover border"
                      />

                      <label className="text-orange-500 cursor-pointer mt-2 text-sm font-medium">
                        Change Photo
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={handleImageChange}
                        />
                      </label>
                    </div>

                    <div className="space-y-4">
                      {isEditing ? (
                        <>
                          <div>
                            <label className="text-sm text-gray-500 mb-1 block">
                              First Name
                            </label>
                            <input
                              type="text"
                              value={formData.firstName}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  firstName: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-500 mb-1 block">
                              Last Name
                            </label>
                            <input
                              type="text"
                              value={formData.lastName}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  lastName: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-500 mb-1 block">
                              Email
                            </label>
                            <input
                              type="email"
                              value={formData.email}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  email: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-500 mb-1 block">
                              Phone Number
                            </label>
                            <input
                              type="tel"
                              value={formData.phone}
                              readOnly // Phone shouldn't be editable
                              className="w-full p-2 border border-gray-300 rounded-lg bg-gray-100 text-gray-500"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-500 mb-1 block">
                              Location
                            </label>
                            <input
                              type="text"
                              value={formData.location}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  location: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-500 mb-1 block">
                              Gender
                            </label>
                            <select
                              value={formData.gender}
                              onChange={(e) =>
                                setFormData({
                                  ...formData,
                                  gender: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                            >
                              <option value="">Select Gender</option>
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                        </>
                      ) : (
                        <>
                          <div className="flex items-center gap-3">
                            <div className="bg-orange-100 p-2 rounded-lg">
                              <User className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Full Name</p>
                              <p className="font-medium">
                                {user?.firstName && user?.lastName
                                  ? `${user.firstName} ${user.lastName}`
                                  : user?.firstName
                                    ? user.firstName
                                    : "Not provided"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="bg-orange-100 p-2 rounded-lg">
                              <Phone className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">
                                Phone Number
                              </p>
                              <p className="font-medium">{user?.phone}</p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="bg-orange-100 p-2 rounded-lg">
                              <Mail className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Email</p>
                              <p className="font-medium">
                                {user?.email || "Not provided"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="bg-orange-100 p-2 rounded-lg">
                              <MapPin className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Location</p>
                              <p className="font-medium">
                                {user?.location || "Not provided"}
                              </p>
                            </div>
                          </div>

                          <div className="flex items-center gap-3">
                            <div className="bg-orange-100 p-2 rounded-lg">
                              <User className="w-5 h-5 text-orange-600" />
                            </div>
                            <div>
                              <p className="text-sm text-gray-500">Gender</p>
                              <p className="font-medium">
                                {user?.gender || "Not provided"}
                              </p>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>

                  {/* Actions */}
                  <div>
                    <h2 className="text-xl font-bold text-gray-900 mb-6">
                      Account Settings
                    </h2>

                    <div className="space-y-4">
                      {isEditing ? (
                        <button
                          onClick={async () => {
                            updateUserProfile(formData);

                            await Swal.fire({
                              icon: "success",
                              title: "Profile Updated!",
                              text: "Your changes have been saved successfully.",
                              timer: 1800,
                              showConfirmButton: false,
                            });

                            setIsEditing(false);
                            setIsEditing(false);
                          }}
                          className="w-full py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Save Changes
                        </button>
                      ) : (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Edit Profile
                        </button>
                      )}

                      {/* Save Changes Button - handles image upload */}
                      {isEditing && (
                        <button
                          onClick={async () => {
                            try {
                              // Upload image first if selected
                              let imageUrl = formData.profileImage;
                              if (selectedFile) {
                                const uploadFormData = new FormData();
                                uploadFormData.append("image", selectedFile);

                                const uploadResponse = await fetch(
                                  "/api/upload",
                                  {
                                    method: "POST",
                                    body: uploadFormData,
                                  },
                                );

                                const uploadResult =
                                  await uploadResponse.json();

                                if (uploadResponse.ok && uploadResult.success) {
                                  imageUrl = uploadResult.filePath;
                                } else {
                                  throw new Error(
                                    uploadResult.error || "Image upload failed",
                                  );
                                }
                              }

                              // Update profile with new data including image
                              const updatedData = {
                                ...formData,
                                profileImage: imageUrl,
                              };
                              updateUserProfile(updatedData);
                              setFormData(updatedData);

                              // Reset image states
                              setPreviewImage(null);
                              setSelectedFile(null);

                              setIsEditing(false);
                            } catch (error) {
                              console.error("Save profile error:", error);
                              Swal.fire({
                                icon: "error",
                                title: "Save Failed",
                                text: "Failed to save profile. Please try again.",
                                confirmButtonColor: "#f97316",
                              });
                            }
                          }}
                          className="w-full py-3 bg-green-500 text-white font-medium rounded-lg hover:bg-green-600 transition-colors flex items-center justify-center gap-2"
                        >
                          <Check className="w-4 h-4" />
                          Save Changes
                        </button>
                      )}

                      {isChangingPassword ? (
                        <div className="space-y-3">
                          <div>
                            <label className="text-sm text-gray-500 mb-1 block">
                              Current Password
                            </label>
                            <input
                              type="password"
                              value={passwordData.currentPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  currentPassword: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              placeholder="Enter current password"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-500 mb-1 block">
                              New Password
                            </label>
                            <input
                              type="password"
                              value={passwordData.newPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  newPassword: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              placeholder="Enter new password"
                            />
                          </div>
                          <div>
                            <label className="text-sm text-gray-500 mb-1 block">
                              Confirm New Password
                            </label>
                            <input
                              type="password"
                              value={passwordData.confirmNewPassword}
                              onChange={(e) =>
                                setPasswordData({
                                  ...passwordData,
                                  confirmNewPassword: e.target.value,
                                })
                              }
                              className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-orange-500 focus:border-orange-500"
                              placeholder="Confirm new password"
                            />
                          </div>
                          <div className="flex gap-2 pt-2">
                            <button
                              onClick={() => {
                                // Reset password data and exit password change mode
                                setPasswordData({
                                  currentPassword: "",
                                  newPassword: "",
                                  confirmNewPassword: "",
                                });
                                setIsChangingPassword(false);
                              }}
                              className="flex-1 py-2 bg-gray-200 text-gray-700 font-medium rounded-lg hover:bg-gray-300 transition-colors"
                            >
                              Cancel
                            </button>
                            <button
                              onClick={() => {
                                // Handle password change
                                if (
                                  passwordData.newPassword !==
                                  passwordData.confirmNewPassword
                                ) {
                                  Swal.fire({
                                    icon: "warning",
                                    title: "Password Mismatch",
                                    text: "New passwords do not match.",
                                    confirmButtonColor: "#f97316",
                                  });
                                  return;
                                }
                                if (passwordData.newPassword.length < 6) {
                                  Swal.fire({
                                    icon: "warning",
                                    title: "Weak Password",
                                    text: "Password must be at least 6 characters.",
                                    confirmButtonColor: "#f97316",
                                  });
                                  return;
                                }
                                // In a real app, you would send the password change request to the backend
                                Swal.fire({
                                  icon: "success",
                                  title: "Success!",
                                  text: "Password changed successfully.",
                                  timer: 1800,
                                  showConfirmButton: false,
                                });
                                // Reset form and exit password change mode
                                setPasswordData({
                                  currentPassword: "",
                                  newPassword: "",
                                  confirmNewPassword: "",
                                });
                                setIsChangingPassword(false);
                              }}
                              className="flex-1 py-2 bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 transition-colors"
                            >
                              Update Password
                            </button>
                          </div>
                        </div>
                      ) : (
                        <button
                          onClick={() => setIsChangingPassword(true)}
                          className="w-full py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Change Password
                        </button>
                      )}

                      <button
                        onClick={async () => {
                          const result = await Swal.fire({
                            title: "Logout?",
                            text: "Are you sure you want to logout?",
                            icon: "question",
                            showCancelButton: true,
                            confirmButtonText: "Logout",
                            cancelButtonText: "Cancel",
                            confirmButtonColor: "#ef4444",
                            cancelButtonColor: "#6b7280",
                          });

                          if (result.isConfirmed) {
                            logout();
                          }
                        }}
                        className="w-full py-3 bg-red-50 text-red-600 font-medium rounded-lg hover:bg-red-100 transition-colors"
                      >
                        Logout
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;