import React from 'react'

const MinimalistTemplate = ({ userData }) => {
  return (
    <div className="w-full max-w-3xl mx-auto p-8 text-gray-900">
      <h1 className="text-4xl font-bold">{userData.name}</h1>
      <h2 className="text-xl text-gray-600">{userData.role}</h2>
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

export default MinimalistTemplate;
