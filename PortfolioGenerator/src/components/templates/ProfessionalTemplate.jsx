import React from "react";

const ProfessionalTemplate = ({ userData }) => {
  const profileImageSrc = userData.profileImageUrl || null;

  return (
    <div className="w-full max-w-3xl mx-auto p-8 text-gray-900 bg-gray-100 border border-gray-300 rounded-md">
      <div className="flex items-center space-x-4">
        {profileImageSrc ? (
          <img
            src={profileImageSrc}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-300"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center text-gray-500">
            <span>Photo</span>
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold">{userData.name}</h1>
          <h2 className="text-lg text-gray-600">{userData.role}</h2>
        </div>
      </div>

      <p className="mt-4">{userData.profile}</p>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Skills</h3>
        <p>
          {Array.isArray(userData.skills) ? userData.skills.join(", ") : ""}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Experience</h3>
        <p>
          {Array.isArray(userData.experience)
            ? userData.experience.join(", ")
            : ""}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Education</h3>
        <p>
          {Array.isArray(userData.education)
            ? userData.education.join(", ")
            : ""}
        </p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Contact</h3>
        <p>Email: {userData.contact?.email || userData.email || ""}</p>
        <p>Phone: {userData.contact?.phone || userData.phone || ""}</p>
        <p>Address: {userData.contact?.address || userData.address || ""}</p>
      </div>
    </div>
  );
};

export default ProfessionalTemplate;
