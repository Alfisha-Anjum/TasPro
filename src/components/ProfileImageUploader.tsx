"use client";

import { useState, useRef, useEffect } from "react";
import { Camera, Upload, X, Check } from "lucide-react";

interface ProfileImageUploaderProps {
  currentImageUrl?: string | null;
  onImageUpdate?: (imageUrl: string) => void;
  userId?: string;
  className?: string;
}

const ProfileImageUploader = ({ 
  currentImageUrl, 
  onImageUpdate,
  userId,
  className = ""
}: ProfileImageUploaderProps) => {
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Set initial preview from current image
  useEffect(() => {
    if (currentImageUrl) {
      setPreviewUrl(currentImageUrl);
    }
  }, [currentImageUrl]);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
    if (!validTypes.includes(file.type)) {
      setError('Please select a valid image file (JPEG, PNG, GIF, or WebP)');
      return;
    }

    // Validate file size (5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError('File size must be less than 5MB');
      return;
    }

    setError(null);
    setSelectedImage(file);

    // Create preview
    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewUrl(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleUpload = async () => {
    if (!selectedImage) return;

    setIsUploading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('file', selectedImage);

      // Upload image to server
      const uploadResponse = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const uploadResult = await uploadResponse.json();

      if (!uploadResponse.ok || !uploadResult.success) {
        throw new Error(uploadResult.error || 'Upload failed');
      }

      // Update user profile with new image path
      if (userId) {
        const profileResponse = await fetch('/api/profile', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            userId,
            profileImage: uploadResult.filePath
          }),
        });

        const profileResult = await profileResponse.json();

        if (!profileResponse.ok || !profileResult.success) {
          throw new Error(profileResult.error || 'Profile update failed');
        }
      }

      // Notify parent component of update
      if (onImageUpdate) {
        onImageUpdate(uploadResult.filePath);
      }

      // Clear selection
      setSelectedImage(null);
      
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to upload image');
    } finally {
      setIsUploading(false);
    }
  };

  const handleCancel = () => {
    setSelectedImage(null);
    setPreviewUrl(currentImageUrl || null);
    setError(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className={`max-w-md mx-auto bg-white shadow-lg rounded-2xl p-6 text-center ${className}`}>
      {/* Profile Image */}
      <div className="relative mb-6">
        <div className="relative inline-block">
          <img
            src={previewUrl || "/placeholder.svg"}
            alt="Profile"
            className="w-28 h-28 rounded-full object-cover mx-auto border-4 border-gray-200"
            onError={(e) => {
              // Fallback to placeholder if image fails to load
              e.currentTarget.src = "/placeholder.svg";
            }}
          />
          
          {/* Overlay when image is selected */}
          {selectedImage && (
            <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
              <Check className="w-12 h-12 text-white" />
            </div>
          )}
        </div>
        
        {/* Camera icon overlay */}
        <button
          onClick={triggerFileSelect}
          className="absolute bottom-2 right-1/2 translate-x-1/2 bg-orange-500 p-2 rounded-full text-white hover:bg-orange-600 transition-colors shadow-lg"
          aria-label="Change profile picture"
        >
          <Camera className="w-4 h-4" />
        </button>
      </div>

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleImageChange}
        className="hidden"
      />

      {/* Error message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-lg text-sm">
          {error}
        </div>
      )}

      {/* Action buttons */}
      {selectedImage ? (
        <div className="flex gap-3 justify-center">
          <button
            onClick={handleCancel}
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300 transition-colors disabled:opacity-50"
          >
            <X className="w-4 h-4" />
            Cancel
          </button>
          <button
            onClick={handleUpload}
            disabled={isUploading}
            className="flex items-center gap-2 px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors disabled:opacity-50"
          >
            {isUploading ? (
              <>
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Uploading...
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                Save Image
              </>
            )}
          </button>
        </div>
      ) : (
        <button
          onClick={triggerFileSelect}
          className="flex items-center gap-2 mx-auto px-4 py-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition-colors"
        >
          <Upload className="w-4 h-4" />
          Change Profile Picture
        </button>
      )}

      {/* Helper text */}
      <p className="text-xs text-gray-500 mt-3">
        JPG, PNG, GIF, or WebP. Max 5MB.
      </p>
    </div>
  );
};

export default ProfileImageUploader;