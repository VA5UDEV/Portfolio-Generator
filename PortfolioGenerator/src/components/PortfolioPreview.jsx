import React from "react";

export default function PortfolioPreview({ userData, selectedTemplate }) {
  if (!userData || !selectedTemplate) return null;

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-bold text-gray-900">Portfolio Preview</h2>
      <div className="p-6 border rounded-lg shadow-md bg-white">
        {selectedTemplate.image && (
          <img
            src={selectedTemplate.image}
            alt={selectedTemplate.name}
            className="w-60 h-80 object-cover mx-auto mt-4 rounded-lg shadow-lg"
          />
        )}
        <h3 className="text-xl font-semibold">{userData.name}</h3>
        <p className="text-gray-600">{userData.profile}</p>
        <p className="text-gray-800">
          <strong>Skills:</strong>{" "}
          {Array.isArray(userData.skills) ? userData.skills.join(", ") : "N/A"}
        </p>
        <p className="text-gray-800">
          <strong>Experience:</strong>{" "}
          {Array.isArray(userData.experience)
            ? userData.experience.join(", ")
            : "N/A"}
        </p>
        <p className="text-gray-800">
          <strong>Education:</strong>{" "}
          {Array.isArray(userData.education)
            ? userData.education.join(", ")
            : "N/A"}
        </p>
        <p className="text-blue-600">
          <strong>Email:</strong> {userData.email}
        </p>
        <p className="text-blue-600">
          <strong>Phone:</strong> {userData.phone}
        </p>
        <p className="text-blue-600">
          <strong>Address:</strong> {userData.address}
        </p>
      </div>
    </div>
  );
}
