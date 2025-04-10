import React from "react";

const templates = [
  {
    name: "Minimalist",
    image: "/templates/minimalist.png",
    description: "Simple layout with clean lines and focus on content.",
  },
  {
    name: "Creative",
    image: "/templates/creative.png",
    description: "A vibrant layout for showcasing creative projects.",
  },
  {
    name: "Modern",
    image: "/templates/modern.png",
    description: "Sleek design with modern UI components and dark mode.",
  },
  {
    name: "Professional",
    image: "/templates/professional.png",
    description: "Perfect for resumes and job applications.",
  },
  {
    name: "Classic",
    image: "/templates/classic.png",
    description: "Timeless layout with structured sections.",
  },
];

export default function ViewTemplates() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-blue-50 py-12 px-6 sm:px-10">
      <div className="max-w-6xl mx-auto">
        <h1 className="text-3xl font-bold text-center mb-2">
          Choose a Template to Get Started
        </h1>
        <p className="text-center text-gray-600 mb-10">
          Preview and pick a template that suits your style. All templates are
          customizable and responsive.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {templates.map((template) => (
            <div
              key={template.name}
              className="bg-white rounded-2xl shadow-md p-4 hover:shadow-xl transition"
            >
              <img
                src={template.image}
                alt={`${template.name} Template`}
                className="rounded-lg mb-4 w-full h-48 object-cover"
              />
              <h3 className="text-xl font-semibold mb-1">{template.name}</h3>
              <p className="text-gray-500 text-sm">{template.description}</p>

              <div className="flex justify-between mt-5">
                <button
                  onClick={() =>
                    alert(`Previewing ${template.name} template...`)
                  }
                  className="text-blue-600 hover:underline"
                >
                  Preview
                </button>
                <button
                  onClick={() => alert(`Using ${template.name} template...`)}
                  className="bg-blue-600 text-white px-4 py-1 rounded-md hover:bg-blue-700"
                >
                  Use Template
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
