import React from "react";
import MinimalistTemplate from "./templates/MinimalistTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import DarkTemplate from "./templates/DarkTemplate";

// Map template IDs to components
const templateComponents = {
  template1: MinimalistTemplate,
  template2: CreativeTemplate, 
  template3: ProfessionalTemplate,
  template4: ModernTemplate,
  template5: DarkTemplate,
};

export default function PortfolioPreview({ userData, selectedTemplate }) {
  if (!userData || !selectedTemplate) return null;
  
  // Format userData to ensure consistent structure for templates
  const formattedUserData = {
    name: userData.name || "",
    role: userData.role || "",
    profile: userData.profile || "",
    skills: Array.isArray(userData.skills) ? userData.skills : [],
    experience: Array.isArray(userData.experience) ? userData.experience : [],
    education: Array.isArray(userData.education) ? userData.education : [],
    contact: {
      email: userData.email || userData.contact?.email || "",
      phone: userData.phone || userData.contact?.phone || "",
      address: userData.address || userData.contact?.address || "",
    },
    // Handle both file objects and URLs for profile image
    profileImage: userData.profileImage || null,
    profileImageUrl: userData.profileImage instanceof File 
      ? URL.createObjectURL(userData.profileImage) 
      : (typeof userData.profileImage === 'string' 
        ? userData.profileImage 
        : null)
  };

  // Render the selected template component if available
  const TemplateComponent = templateComponents[selectedTemplate.id];

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-gray-900 text-center">Portfolio Preview</h2>
      
      {TemplateComponent ? (
        <TemplateComponent userData={formattedUserData} />
      ) : (
        <div className="p-6 border rounded-lg shadow-md bg-white text-center">
          <h3 className="text-xl font-semibold">{formattedUserData.name}</h3>
          
          {/* Display profile image if available */}
          {formattedUserData.profileImageUrl && (
            <div className="w-24 h-24 rounded-full mx-auto mt-4 overflow-hidden">
              <img 
                src={formattedUserData.profileImageUrl}
                alt="Profile" 
                className="w-full h-full object-cover"
              />
            </div>
          )}
          
          <p className="text-gray-600 mt-2">{formattedUserData.profile}</p>
          <p className="text-gray-800 mt-4">
            <strong>Skills:</strong>{" "}
            {formattedUserData.skills.join(", ")}
          </p>
          <p className="text-gray-800">
            <strong>Experience:</strong>{" "}
            {formattedUserData.experience.join(", ")}
          </p>
          <p className="text-gray-800">
            <strong>Education:</strong>{" "}
            {formattedUserData.education.join(", ")}
          </p>
          <div className="mt-4 text-blue-600">
            <p><strong>Email:</strong> {formattedUserData.contact.email}</p>
            <p><strong>Phone:</strong> {formattedUserData.contact.phone}</p>
            <p><strong>Address:</strong> {formattedUserData.contact.address}</p>
          </div>
        </div>
      )}
    </div>
  );
}