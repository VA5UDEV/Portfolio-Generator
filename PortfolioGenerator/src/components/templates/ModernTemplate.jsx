import React from 'react'

const ModernTemplate = ({ userData }) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-8 text-gray-900 bg-gradient-to-r from-blue-400 to-purple-500 rounded-lg shadow-lg">
      <h1 className="text-4xl font-bold">{userData.name}</h1>
      <h2 className="text-xl opacity-80">{userData.role}</h2>
      <p className="mt-4">{userData.profile}</p>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Skills</h3>
        <p>{userData.skills.join(", ")}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Experience</h3>
        <p>{userData.experience.join(", ")}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Education</h3>
        <p>{userData.education.join(", ")}</p>
      </div>

      <div className="mt-6">
        <h3 className="text-lg font-semibold">Contact</h3>
        <p>Email: {userData.contact.email}</p>
        <p>Phone: {userData.contact.phone}</p>
      </div>
    </div>
  );
};

export default ModernTemplate;
