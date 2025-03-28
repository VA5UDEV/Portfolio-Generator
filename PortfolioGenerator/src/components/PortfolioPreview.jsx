export default function PortfolioPreview({ userData, selectedTemplate }) {
  if (!userData || !selectedTemplate) return null;

  return (
    <div className="space-y-6 text-center">
      <h2 className="text-2xl font-bold text-gray-900">Portfolio Preview</h2>
      <div className="p-6 border rounded-lg shadow-md bg-white">
        <h3 className="text-xl font-semibold">{userData.name}</h3>
        <p className="text-gray-600">{userData.bio}</p>
        <p className="text-gray-800">Skills: {userData.skills}</p>
        <p className="text-blue-600">Email: {userData.email}</p>
        <p className="text-blue-600">LinkedIn: {userData.linkedin}</p>
        <img
          src={selectedTemplate.image}
          alt={selectedTemplate.name}
          className="w-60 h-80 object-cover mx-auto mt-4"
        />
      </div>
    </div>
  );
}
