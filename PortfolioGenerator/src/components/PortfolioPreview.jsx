import React from "react";
import MinimalistTemplate from "./templates/MinimalistTemplate";
import CreativeTemplate from "./templates/CreativeTemplate";
import ProfessionalTemplate from "./templates/ProfessionalTemplate";
import ModernTemplate from "./templates/ModernTemplate";
import DarkTemplate from "./templates/DarkTemplate";

const templateComponents = {
  template1: MinimalistTemplate,
  template2: CreativeTemplate,
  template3: ProfessionalTemplate,
  template4: ModernTemplate,
  template5: DarkTemplate,
};

export default function PortfolioPreview({ userData, selectedTemplate }) {
  if (!userData || !selectedTemplate) {
    return (
      <div className="flex items-center justify-center h-64 bg-gray-50 rounded-lg border border-gray-200">
        <p className="text-gray-500 italic">
          Select a template and add your information to preview
        </p>
      </div>
    );
  }

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
    profileImage: userData.profileImage || null,
    profileImageUrl:
      userData.profileImageUrl ||
      (userData.profileImage instanceof File
        ? URL.createObjectURL(userData.profileImage)
        : typeof userData.profileImage === "string" && userData.profileImage
        ? `${import.meta.env.VITE_APPWRITE_URL}/storage/buckets/${
            import.meta.env.VITE_APPWRITE_BUCKET_ID
          }/files/${userData.profileImage}/view?project=${
            import.meta.env.VITE_APPWRITE_PROJECT_ID
          }`
        : null),
  };

  const TemplateComponent = templateComponents[selectedTemplate.id];

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-900">Portfolio Preview</h2>
        <span className="px-3 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
          {selectedTemplate.name || "Custom Template"}
        </span>
      </div>

      <div className="overflow-hidden rounded-xl border border-gray-200 shadow-md bg-white">
        {TemplateComponent ? (
          <TemplateComponent userData={formattedUserData} />
        ) : (
          <div className="p-8">
            <div className="flex flex-col md:flex-row md:items-start gap-8">
              {/* Profile Image Section */}
              {formattedUserData.profileImageUrl && (
                <div className="flex-shrink-0">
                  <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-gray-100 shadow-md mx-auto md:mx-0">
                    <img
                      src={formattedUserData.profileImageUrl}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                </div>
              )}

              {/* Profile Info Section */}
              <div className="flex-grow">
                <div className="text-center md:text-left">
                  <h1 className="text-3xl font-bold text-gray-900">
                    {formattedUserData.name || "Your Name"}
                  </h1>
                  <p className="text-lg text-blue-600 font-medium mt-1">
                    {formattedUserData.role || "Professional Role"}
                  </p>
                </div>

                <div className="mt-6">
                  <h3 className="text-sm uppercase tracking-wider text-gray-500 font-semibold">
                    About
                  </h3>
                  <p className="mt-2 text-gray-700 leading-relaxed">
                    {formattedUserData.profile ||
                      "Add your professional profile here..."}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              {/* Skills Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {formattedUserData.skills.length > 0 ? (
                    formattedUserData.skills.map((skill, index) => (
                      <span
                        key={index}
                        className="px-3 py-1 bg-white text-gray-800 text-sm rounded-full border border-gray-200"
                      >
                        {skill}
                      </span>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">Add your skills...</p>
                  )}
                </div>
              </div>

              {/* Contact Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Contact
                </h3>
                <div className="space-y-2">
                  {formattedUserData.contact.email && (
                    <p className="flex items-center text-gray-700">
                      <svg
                        className="w-4 h-4 mr-2 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                        <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                      </svg>
                      {formattedUserData.contact.email}
                    </p>
                  )}
                  {formattedUserData.contact.phone && (
                    <p className="flex items-center text-gray-700">
                      <svg
                        className="w-4 h-4 mr-2 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                      </svg>
                      {formattedUserData.contact.phone}
                    </p>
                  )}
                  {formattedUserData.contact.address && (
                    <p className="flex items-center text-gray-700">
                      <svg
                        className="w-4 h-4 mr-2 text-gray-500"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M10 18a8 8 0 100-16 8 8 0 000 16zM4.332 8.027a6.012 6.012 0 011.912-2.706C6.512 5.73 6.974 6 7.5 6A1.5 1.5 0 019 7.5V8a2 2 0 004 0 2 2 0 011.523-1.943A5.977 5.977 0 0116 10c0 .34-.028.675-.083 1H15a2 2 0 00-2 2v2.197A5.973 5.973 0 0110 16v-2a2 2 0 00-2-2 2 2 0 01-2-2 2 2 0 00-1.668-1.973z" />
                      </svg>
                      {formattedUserData.contact.address}
                    </p>
                  )}
                  {!formattedUserData.contact.email &&
                    !formattedUserData.contact.phone &&
                    !formattedUserData.contact.address && (
                      <p className="text-gray-500 italic">
                        Add your contact information...
                      </p>
                    )}
                </div>
              </div>

              {/* Experience Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Experience
                </h3>
                <div className="space-y-3">
                  {formattedUserData.experience.length > 0 ? (
                    formattedUserData.experience.map((exp, index) => (
                      <div
                        key={index}
                        className="bg-white p-3 rounded border border-gray-200"
                      >
                        <p className="text-gray-800">{exp}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">
                      Add your work experience...
                    </p>
                  )}
                </div>
              </div>

              {/* Education Section */}
              <div className="bg-gray-50 p-6 rounded-lg">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                  Education
                </h3>
                <div className="space-y-3">
                  {formattedUserData.education.length > 0 ? (
                    formattedUserData.education.map((edu, index) => (
                      <div
                        key={index}
                        className="bg-white p-3 rounded border border-gray-200"
                      >
                        <p className="text-gray-800">{edu}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 italic">
                      Add your education...
                    </p>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
