import React from "react";

const MinimalistTemplate = ({ userData }) => {
  const profileImageSrc = userData.profileImageUrl || null;

  return (
    <div id="portfolio-container" className="w-full max-w-4xl mx-auto p-8 bg-white text-gray-800 shadow-lg rounded-lg">
      <header className="flex flex-col md:flex-row md:items-center gap-6 border-b border-gray-100 pb-6">
        {profileImageSrc ? (
          <img
            src={profileImageSrc}
            alt="Profile"
            className="w-24 h-24 rounded-full object-cover border-2 border-gray-200 shadow-sm"
          />
        ) : (
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center text-gray-400 shadow-sm">
            <span className="text-sm font-medium">Photo</span>
          </div>
        )}
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{userData.name}</h1>
          <h2 className="text-xl text-gray-600 mt-1">{userData.role}</h2>
        </div>
      </header>

      <section className="mt-8">
        <p className="text-lg leading-relaxed text-gray-700">{userData.profile}</p>
      </section>

      <section className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div>
          <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-3">Skills</h3>
          {Array.isArray(userData.skills) && userData.skills.length > 0 ? (
            <ul className="list-disc list-inside space-y-1">
              {userData.skills.map((skill, index) => (
                <li key={index} className="text-gray-700">{skill}</li>
              ))}
            </ul>
          ) : (
            <p className="text-gray-500 italic">No skills listed</p>
          )}
        </div>

        <div>
          <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-3">Contact</h3>
          <div className="space-y-2">
            {(userData.contact?.email || userData.email) && (
              <p className="flex items-center">
                <span className="font-medium w-20">Email:</span>
                <span className="text-gray-700">{userData.contact?.email || userData.email}</span>
              </p>
            )}
            {(userData.contact?.phone || userData.phone) && (
              <p className="flex items-center">
                <span className="font-medium w-20">Phone:</span>
                <span className="text-gray-700">{userData.contact?.phone || userData.phone}</span>
              </p>
            )}
            {(userData.contact?.address || userData.address) && (
              <p className="flex items-center">
                <span className="font-medium w-20">Address:</span>
                <span className="text-gray-700">{userData.contact?.address || userData.address}</span>
              </p>
            )}
          </div>
        </div>
      </section>

      <section className="mt-8">
        <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-3">Experience</h3>
        {Array.isArray(userData.experience) && userData.experience.length > 0 ? (
          <ul className="space-y-3">
            {userData.experience.map((exp, index) => (
              <li key={index} className="text-gray-700">{exp}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No experience listed</p>
        )}
      </section>

      <section className="mt-8">
        <h3 className="text-lg font-semibold border-b border-gray-200 pb-2 mb-3">Education</h3>
        {Array.isArray(userData.education) && userData.education.length > 0 ? (
          <ul className="space-y-3">
            {userData.education.map((edu, index) => (
              <li key={index} className="text-gray-700">{edu}</li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500 italic">No education listed</p>
        )}
      </section>
    </div>
  );
};

export default MinimalistTemplate;