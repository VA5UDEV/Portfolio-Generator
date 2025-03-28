import React from "react";

export default function PortfolioPreview({ userData, selectedTemplate }) {
  if (!userData || !selectedTemplate) return null;

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-bold text-gray-900">Portfolio Preview</h2>
      <div className="p-6 border rounded-lg shadow-md bg-white">
        <h3 className="text-xl font-semibold">{userData.name}</h3>
        <p className="text-gray-600">{userData.profile}</p>
        <p className="text-gray-800">
          <strong>Skills:</strong> {userData.skills.join(", ")}
        </p>
        <p className="text-blue-600">
          <strong>Email:</strong> {userData.contact.email}
        </p>
        <p className="text-blue-600">
          <strong>Phone:</strong> {userData.contact.phone}
        </p>
        {selectedTemplate.image && (
          <img
            src={selectedTemplate.image}
            alt={selectedTemplate.name}
            className="w-60 h-80 object-cover mx-auto mt-4 rounded-lg shadow-lg"
          />
        )}
      </div>
    </div>
  );
}
