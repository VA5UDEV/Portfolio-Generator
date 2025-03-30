import { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Button } from "../components/index";
import "swiper/css";

const templates = [
  {
    id: "template1",
    name: "Minimalist",
    preview: "https://via.placeholder.com/200x300?text=Minimalist",
    image: "https://via.placeholder.com/200x300?text=Minimalist",
  },
  {
    id: "template2",
    name: "Creative",
    preview: "https://via.placeholder.com/200x300?text=Creative",
    image: "https://via.placeholder.com/200x300?text=Creative",
  },
  {
    id: "template3",
    name: "Professional",
    preview: "https://via.placeholder.com/200x300?text=Professional",
    image: "https://via.placeholder.com/200x300?text=Professional",
  },
  {
    id: "template4",
    name: "Modern",
    preview: "https://via.placeholder.com/200x300?text=Modern",
    image: "https://via.placeholder.com/200x300?text=Modern",
  },
  {
    id: "template5",
    name: "Classic",
    preview: "https://via.placeholder.com/200x300?text=Classic",
    image: "https://via.placeholder.com/200x300?text=Classic",
  },
];

export default function TemplateSelector({ onSelectTemplate }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const handleSelect = (template) => {
    setSelectedTemplate(template.id);
  };

  const handleSubmit = () => {
    if (selectedTemplate) {
      const templateData = templates.find((t) => t.id === selectedTemplate);
      onSelectTemplate(templateData);
    }
  };

  return (
    <div className="min-h-[75vh] flex flex-col items-center justify-center bg-white p-6">
      {/* Title & Description */}
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-900">Choose a Template</h2>
        <p className="text-gray-600 mt-2">
          Select a portfolio template that best represents you.
        </p>
      </div>

      {/* Swiper Carousel */}
      <div className="w-full max-w-4xl overflow-hidden">
        <Swiper spaceBetween={20} slidesPerView={3.5} className="px-6">
          {templates.map((template) => (
            <SwiperSlide key={template.id}>
              <div
                className={`cursor-pointer transition-all border rounded-lg p-3 text-center ${
                  selectedTemplate === template.id
                    ? "border-blue-600 shadow-lg"
                    : "border-gray-300"
                } hover:border-blue-500`}
                onClick={() => handleSelect(template)}
              >
                <h3 className="font-semibold text-lg">{template.name}</h3>
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-40 object-cover rounded-md mt-2"
                />
                {selectedTemplate === template.id && (
                  <div className="mt-2 text-blue-600 font-semibold">
                    Selected
                  </div>
                )}
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Submit Button */}
      <Button
        onClick={handleSubmit}
        disabled={!selectedTemplate}
        className={`mt-6 w-64 py-3 text-white rounded-lg ${
          selectedTemplate
            ? "bg-blue-600 hover:bg-blue-700"
            : "bg-gray-400 cursor-not-allowed"
        }`}
      >
        Confirm Selection
      </Button>
    </div>
  );
}
