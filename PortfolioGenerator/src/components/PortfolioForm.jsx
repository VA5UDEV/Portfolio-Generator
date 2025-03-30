import { useState, useEffect } from "react";
import { Input, Label, Button } from "./index";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import service from "../appwrite/config";

export default function PortfolioForm({ port, onSubmit }) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: port?.name || "",
      role: port?.role || "",
      profile: port?.profile || "",
      skills: Array.isArray(port?.skills) ? port?.skills.join(", ") : "",
      experience: Array.isArray(port?.experience)
        ? port?.experience.join(", ")
        : "",
      education: Array.isArray(port?.education)
        ? port?.education.join(", ")
        : "",
      email: port?.contact?.email || port?.email || "",
      phone: port?.contact?.phone || port?.phone || "",
      address: port?.contact?.address || port?.address || "",
    },
  });

  const userData = useSelector((state) => state.auth.userData);
  const [previewImage, setPreviewImage] = useState(
    port?.profileImageUrl || null
  );
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Initialize previewImage with existing image if available
  useEffect(() => {
    if (port?.profileImageUrl) {
      setPreviewImage(port.profileImageUrl);
    }
  }, [port]);

  const handleProfileUpload = async (data) => {
    try {
      setIsSubmitting(true);
      console.log("Submitted Data:", data);

      let profileImageId = null;

      if (profileImageFile && service.uploadProfileImage) {
        try {
          const uploadedImage = await service.uploadProfileImage(
            profileImageFile
          );
          if (uploadedImage) {
            profileImageId = uploadedImage.$id;
          }
        } catch (error) {
          console.error("Error uploading to backend:", error);
        }
      }

      // Process form data
      const formData = {
        name: data.name || "",
        role: data.role || "",
        profile: data.profile || "",
        skills: data.skills
          .split(",")
          .map((s) => s.trim())
          .filter((s) => s),
        experience: data.experience
          .split(",")
          .map((e) => e.trim())
          .filter((e) => e),
        education: data.education
          .split(",")
          .map((edu) => edu.trim())
          .filter((edu) => edu),
        contact: {
          email: data.email || "",
          phone: data.phone || "",
          address: data.address || "",
        },
        email: data.email || "",
        phone: data.phone || "",
        address: data.address || "",
        profileImage: profileImageId || port?.profileImage || null,
        profileImageUrl: previewImage || port?.profileImageUrl || null,
      };

      // If we're connected to backend
      if (userData && userData.$id && service.savePortfolio) {
        try {
          const response = await service.savePortfolio(userData.$id, formData);
          if (response) {
            console.log("Profile updated successfully:", response);
            onSubmit({
              ...response,
              profileImageUrl: previewImage, // Add the URL for preview
            });
          } else {
            console.error("Failed to update profile");
            // Fall back to local data if backend save fails
            onSubmit(formData);
          }
        } catch (error) {
          console.error("Error saving to backend:", error);
          // Fall back to local data
          onSubmit(formData);
        }
      } else {
        // Just pass the form data to parent if no backend
        onSubmit(formData);
      }
    } catch (error) {
      console.error("Error processing form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    console.log("File selected:", file);
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        console.log("Image loaded successfully");
        setPreviewImage(reader.result);
      };
      reader.onerror = (error) => {
        console.error("Error reading file:", error);
      };
      reader.readAsDataURL(file);
    }
  };

  console.log("Current previewImage state:", previewImage ? "exists" : "null");

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-b from-gray-50 to-white px-4 py-10">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg overflow-hidden">
        {/* Header */}
        <div className="bg-blue-600 text-white text-center py-6 px-4">
          <h2 className="text-2xl md:text-3xl font-bold">
            Create Your Portfolio
          </h2>
          <p className="text-blue-100 mt-2">
            Showcase your professional journey and talents
          </p>
        </div>

        <form
          className="p-6 md:p-8 space-y-8"
          onSubmit={handleSubmit(handleProfileUpload)}
        >
          {/* Profile Image Section */}
          <div className="flex flex-col items-center bg-gray-50 p-6 rounded-lg border border-gray-100">
            <h3 className="text-lg font-semibold text-gray-900 mb-3">
              Profile Image
            </h3>
            <div className="relative group">
              {previewImage ? (
                <img
                  src={previewImage}
                  alt="Profile Preview"
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-md bg-gray-100"
                  onError={(e) => {
                    console.error("Image failed to load");
                    e.target.src = ""; // Clear src on error
                    e.target.classList.add("bg-gray-300"); // Add visible background
                  }}
                />
              ) : (
                <div className="w-28 h-28 md:w-32 md:h-32 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 border-4 border-white shadow-md">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-12 w-12"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
              )}
              <div className="absolute inset-0 rounded-full bg-black bg-opacity-0 flex items-center justify-center transition-all duration-300 group-hover:bg-opacity-20">
                <Label className="cursor-pointer bg-blue-600 text-white px-4 py-2 rounded-full hover:bg-blue-700 text-xs md:text-sm opacity-0 group-hover:opacity-100 shadow-lg transition-all duration-300 transform translate-y-2 group-hover:translate-y-0">
                  Upload Image
                  <Input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={handleImageUpload}
                  />
                </Label>
              </div>
            </div>
            {/* Debug information - remove in production */}
            {process.env.NODE_ENV === "development" && (
              <div className="mt-2 text-xs text-gray-500">
                {previewImage ? "Image data loaded" : "No image data"}
              </div>
            )}
          </div>

          {/* Form Grid Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Personal Information Section */}
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center border-b border-gray-200 pb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900">
                  Personal Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name" className="font-medium text-gray-700">
                    Full Name
                  </Label>
                  <Input
                    id="name"
                    placeholder="John Doe"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register("name", { required: "Name is required" })}
                  />
                  {errors.name && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.name.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="role" className="font-medium text-gray-700">
                    Professional Role
                  </Label>
                  <Input
                    id="role"
                    placeholder="Frontend Developer"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register("role", { required: "Role is required" })}
                  />
                  {errors.role && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.role.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="profile" className="font-medium text-gray-700">
                  Professional Summary
                </Label>
                <textarea
                  id="profile"
                  rows="3"
                  placeholder="A brief overview of your professional background and expertise"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("profile", { required: "Summary is required" })}
                ></textarea>
                {errors.profile && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.profile.message}
                  </p>
                )}
              </div>
            </div>

            {/* Skills & Experience Section */}
            <div className="space-y-6 md:col-span-2">
              <div className="flex items-center border-b border-gray-200 pb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z"
                    clipRule="evenodd"
                  />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900">
                  Skills & Experience
                </h3>
              </div>

              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="skills" className="font-medium text-gray-700">
                    Skills
                  </Label>
                  <Input
                    id="skills"
                    placeholder="React, JavaScript, UI/UX Design, etc. (comma-separated)"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register("skills", { required: "Skills are required" })}
                  />
                  {errors.skills && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.skills.message}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Separate each skill with a comma
                  </p>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="experience"
                    className="font-medium text-gray-700"
                  >
                    Experience
                  </Label>
                  <textarea
                    id="experience"
                    rows="3"
                    placeholder="Senior Developer at XYZ (2020-Present), Frontend Developer at ABC (2018-2020), etc. (comma-separated)"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register("experience", {
                      required: "Experience is required",
                    })}
                  ></textarea>
                  {errors.experience && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.experience.message}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Separate each experience with a comma
                  </p>
                </div>

                <div className="space-y-2">
                  <Label
                    htmlFor="education"
                    className="font-medium text-gray-700"
                  >
                    Education
                  </Label>
                  <textarea
                    id="education"
                    rows="2"
                    placeholder="B.S. Computer Science, University Name (2014-2018), etc. (comma-separated)"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register("education", {
                      required: "Education is required",
                    })}
                  ></textarea>
                  {errors.education && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.education.message}
                    </p>
                  )}
                  <p className="text-xs text-gray-500">
                    Separate each education entry with a comma
                  </p>
                </div>
              </div>
            </div>

            {/* Contact Section */}
            <div className="space-y-6 md:col-span-2">
              <div className="flex items-center border-b border-gray-200 pb-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 text-blue-600 mr-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <h3 className="text-lg font-semibold text-gray-900">
                  Contact Information
                </h3>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone" className="font-medium text-gray-700">
                    Phone Number
                  </Label>
                  <Input
                    id="phone"
                    placeholder="+1 (123) 456-7890"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register("phone", { required: "Phone is required" })}
                  />
                  {errors.phone && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.phone.message}
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email" className="font-medium text-gray-700">
                    Email Address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="your.name@example.com"
                    className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    {...register("email", {
                      required: "Email is required",
                      pattern: {
                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                        message: "Invalid email address",
                      },
                    })}
                  />
                  {errors.email && (
                    <p className="text-red-500 text-xs mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="address" className="font-medium text-gray-700">
                  Address
                </Label>
                <Input
                  id="address"
                  placeholder="City, State, Country"
                  className="w-full px-4 py-2 border rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  {...register("address", { required: "Address is required" })}
                />
                {errors.address && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.address.message}
                  </p>
                )}
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-3 text-sm md:text-base font-medium rounded-md hover:bg-blue-700 transition-colors duration-300 flex items-center justify-center space-x-2 shadow-md"
            >
              {isSubmitting ? (
                <>
                  <svg
                    className="animate-spin h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  <span>Processing...</span>
                </>
              ) : (
                <>
                  <span>Create Portfolio</span>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                      clipRule="evenodd"
                    />
                  </svg>
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
