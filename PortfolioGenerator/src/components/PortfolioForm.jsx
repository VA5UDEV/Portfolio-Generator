import { useState } from "react";
import { Input, Label, Button } from "./index";
import { useForm } from "react-hook-form";
import { useSelector } from "react-redux";
import service from "../appwrite/config";

export default function PortfolioForm({ port, onSubmit }) {
  const { register, handleSubmit, setValue } = useForm({
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
  const [previewImage, setPreviewImage] = useState(null);
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        profileImage: profileImageId || null,
        profileImageUrl: previewImage || null,
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
    if (file) {
      setProfileImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => setPreviewImage(reader.result);
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-white px-4 py-10">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8 border-b border-gray-300 pb-4">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
            Create Portfolio
          </h2>
          <p className="text-gray-600 mt-1">
            Showcase your work professionally
          </p>
        </div>

        <form
          className="space-y-8"
          onSubmit={handleSubmit(handleProfileUpload)}
        >
          {/* Profile Image Section */}
          <div className="flex flex-col items-center">
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Profile Image
            </h3>
            {previewImage ? (
              <img
                src={previewImage}
                alt="Profile Preview"
                className="w-24 h-24 md:w-28 md:h-28 rounded-full object-cover border border-gray-300"
              />
            ) : (
              <div className="w-24 h-24 md:w-28 md:h-28 rounded-full bg-gray-200 flex items-center justify-center text-gray-500">
                No Image
              </div>
            )}
            <Label className="cursor-pointer bg-gray-600 text-white px-4 py-1 rounded-md hover:bg-black text-xs md:text-sm mt-2">
              Upload Image
              <Input
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleImageUpload}
              />
            </Label>
          </div>

          {/* Information Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Information</h3>
            <div className="space-y-2">
              <Label htmlFor="name">Name</Label>
              <Input
                id="name"
                placeholder="Your Name"
                {...register("name", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>
              <Input
                id="role"
                placeholder="Your Role"
                {...register("role", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="profile">Short Bio</Label>
              <Input
                id="profile"
                placeholder="Short Bio"
                {...register("profile", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="skills">Skills</Label>
              <Input
                id="skills"
                placeholder="Skills (comma-separated)"
                {...register("skills", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience">Experience</Label>
              <Input
                id="experience"
                placeholder="Experience (comma-separated)"
                {...register("experience", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="education">Education</Label>
              <Input
                id="education"
                placeholder="Education (comma-separated)"
                {...register("education", { required: true })}
              />
            </div>
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
            <div className="space-y-2">
              <Label htmlFor="phone">Phone</Label>
              <Input
                id="phone"
                placeholder="Phone"
                {...register("phone", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="Email"
                {...register("email", { required: true })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                placeholder="Address"
                {...register("address", { required: true })}
              />
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white py-2 text-sm md:text-base hover:bg-black"
            >
              {isSubmitting ? "Processing..." : "Continue →"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
