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
      skills: port?.skills || [],
      experience: port?.experience || [],
      education: port?.education || [],
      contact: {
        email: port?.contact?.email || "",
        phone: port?.contact?.phone || "",
        address: port?.contact?.address || "",
      },
    },
  });

  const userData = useSelector((state) => state.auth.userData);
  const [previewImage, setPreviewImage] = useState(null);

  const handleProfileUpload = async (data) => {
    try {
      console.log("Submitted Data:", data);
      if (!data.profileImage) throw new Error("No image selected");

      const uploadedImage = await service.uploadProfileImage(data.profileImage);
      if (!uploadedImage) throw new Error("Profile image upload failed");

      const formData = {
        name: data.name || "",
        role: data.role || "",
        profile: data.profile || "",
        skills: data.skills.split(",").map((s) => s.trim()),
        experience: data.experience.split(",").map((e) => e.trim()),
        education: data.education.split(",").map((edu) => edu.trim()),
        email: data.email,
        phone: data.phone,
        address: data.address,
        profileImage: uploadedImage.$id,
      };

      const response = await service.savePortfolio(userData.$id, formData);
      if (response) {
        console.log("Profile updated successfully:", response);
        onSubmit(response);
      } else console.error("Failed to update profile");
    } catch (error) {
      console.error("Error uploading profile image:", error);
    }
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("profileImage", file);
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
            <Label className="cursor-pointer bg-gray-600 text-white px-2 py-0.5 rounded-md hover:bg-black text-xs md:text-sm mt-2">
              Add
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
            <Input
              name="name"
              placeholder="Your Name"
              {...register("name", { required: true })}
            />
            <Input
              name="role"
              placeholder="Your Role"
              {...register("role", { required: true })}
            />
            <Input
              name="profile"
              placeholder="Short Bio"
              {...register("profile", { required: true })}
            />
            <Input
              name="skills"
              placeholder="Skills (comma-separated)"
              {...register("skills", { required: true })}
            />
            <Input
              name="experience"
              placeholder="Experience (comma-separated)"
              {...register("experience", { required: true })}
            />
            <Input
              name="education"
              placeholder="Education (comma-separated)"
              {...register("education", { required: true })}
            />
          </div>

          {/* Contact Section */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900">Contact</h3>
            <Input
              name="phone"
              placeholder="Phone"
              {...register("phone", { required: true })}
            />
            <Input
              name="email"
              type="email"
              placeholder="Email"
              {...register("email", { required: true })}
            />
            <Input
              name="address"
              placeholder="Address"
              {...register("address", { required: true })}
            />
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 text-sm md:text-base hover:bg-black"
            >
              Continue →
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
