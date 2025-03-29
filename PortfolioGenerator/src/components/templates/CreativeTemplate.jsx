import React from "react";

const CreativeTemplate = ({ userData }) => {
  const profileImageSrc = userData.profileImageUrl || null;

  return (
    <div id="portfolio-container" className="w-full max-w-3xl mx-auto p-8 text-gray-900 bg-yellow-100 border-l-8 border-yellow-500 rounded-lg shadow-lg">
      <div className="flex items-center space-x-4">
        {profileImageSrc ? (
          <img
            src={profileImageSrc}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-yellow-400"
          />
        ) : (
          <div className="w-24 h-24 bg-yellow-200 rounded-full flex items-center justify-center text-yellow-600">
            <span>Photo</span>
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold">{userData.name}</h1>
          <h2 className="text-lg text-yellow-600">{userData.role}</h2>
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

export default CreativeTemplate;
