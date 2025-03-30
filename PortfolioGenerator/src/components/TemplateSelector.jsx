import { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, EffectCoverflow } from "swiper/modules";
import { Button } from "../components/index";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";

const templates = [
  {
    id: "template1",
    name: "Minimalist",
    preview: "https://via.placeholder.com/200x300?text=Minimalist",
    image: "https://via.placeholder.com/200x300?text=Minimalist",
    description: "Clean design focusing on content with minimal distractions.",
  },
  {
    id: "template2",
    name: "Creative",
    preview: "https://via.placeholder.com/200x300?text=Creative",
    image: "https://via.placeholder.com/200x300?text=Creative",
    description:
      "Visually dynamic layout perfect for showcasing creative work.",
  },
  {
    id: "template3",
    name: "Professional",
    preview: "https://via.placeholder.com/200x300?text=Professional",
    image: "https://via.placeholder.com/200x300?text=Professional",
    description:
      "Polished appearance ideal for corporate and business portfolios.",
  },
  {
    id: "template4",
    name: "Modern",
    preview: "https://via.placeholder.com/200x300?text=Modern",
    image: "https://via.placeholder.com/200x300?text=Modern",
    description: "Contemporary design with cutting-edge style elements.",
  },
  {
    id: "template5",
    name: "Classic",
    preview: "https://via.placeholder.com/200x300?text=Classic",
    image: "https://via.placeholder.com/200x300?text=Classic",
    description: "Timeless layout that never goes out of style.",
  },
];

export default function TemplateSelector({ onSelectTemplate }) {
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [viewMode, setViewMode] = useState("card"); // "card" or "carousel"
  const [activeIndex, setActiveIndex] = useState(0);

  const handleSelect = (template) => {
    setSelectedTemplate(template.id);
  };

  const handleSubmit = () => {
    if (selectedTemplate) {
      const templateData = templates.find((t) => t.id === selectedTemplate);
      onSelectTemplate(templateData);
    }
  };

  useEffect(() => {
    // Auto-select first template as default
    if (templates.length > 0 && !selectedTemplate) {
      setSelectedTemplate(templates[0].id);
    }
  }, []);

  // Adjust slidesPerView based on screen width
  const getSlidesPerView = () => {
    if (typeof window !== "undefined") {
      if (window.innerWidth < 640) return 1.2;
      if (window.innerWidth < 768) return 2.2;
      return 3;
    }
    return 3; // Default
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b from-blue-50 to-white p-6">
      {/* Header with Title & Tabs */}
      <div className="w-full max-w-4xl">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900">
            Choose Your Portfolio Style
          </h2>
          <p className="text-gray-600 mt-3 max-w-2xl mx-auto">
            Select a template that reflects your professional identity and
            showcases your work effectively.
          </p>
        </div>

        {/* View Mode Selector */}
        <div className="flex justify-center mb-8">
          <div className="inline-flex rounded-md shadow-sm" role="group">
            <button
              type="button"
              onClick={() => setViewMode("carousel")}
              className={`px-4 py-2 text-sm font-medium rounded-l-lg ${
                viewMode === "carousel"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              } border border-gray-300`}
            >
              Carousel View
            </button>
            <button
              type="button"
              onClick={() => setViewMode("card")}
              className={`px-4 py-2 text-sm font-medium rounded-r-lg ${
                viewMode === "card"
                  ? "bg-blue-600 text-white"
                  : "bg-white text-gray-700 hover:bg-gray-100"
              } border border-gray-300`}
            >
              Card View
            </button>
          </div>
        </div>
      </div>

      {/* Card View */}
      {viewMode === "card" && (
        <div className="w-full max-w-4xl grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mb-8">
          {templates.map((template) => (
            <div
              key={template.id}
              className={`cursor-pointer transition-all duration-300 bg-white rounded-xl overflow-hidden ${
                selectedTemplate === template.id
                  ? "ring-4 ring-blue-500 shadow-xl transform scale-105"
                  : "shadow-md hover:shadow-lg"
              }`}
              onClick={() => handleSelect(template)}
            >
              <div className="relative">
                <img
                  src={template.preview}
                  alt={template.name}
                  className="w-full h-48 object-cover"
                />
                {selectedTemplate === template.id && (
                  <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                    Selected
                  </div>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg text-gray-900">
                  {template.name}
                </h3>
                <p className="text-gray-600 text-sm mt-1">
                  {template.description}
                </p>
                <button
                  className={`mt-3 w-full py-2 px-4 rounded-md text-sm font-medium transition-colors ${
                    selectedTemplate === template.id
                      ? "bg-blue-600 text-white hover:bg-blue-700"
                      : "bg-gray-100 text-gray-800 hover:bg-gray-200"
                  }`}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelect(template);
                  }}
                >
                  {selectedTemplate === template.id ? "Selected" : "Select"}
                </button>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Carousel View */}
      {viewMode === "carousel" && (
        <div className="w-full max-w-4xl mb-8">
          <Swiper
            modules={[Navigation, Pagination, EffectCoverflow]}
            spaceBetween={30}
            slidesPerView={getSlidesPerView()}
            navigation
            pagination={{ clickable: true }}
            effect="coverflow"
            coverflowEffect={{
              rotate: 5,
              stretch: 0,
              depth: 100,
              modifier: 1,
              slideShadows: false,
            }}
            onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
            className="px-6 py-10"
          >
            {templates.map((template, index) => (
              <SwiperSlide key={template.id}>
                <div
                  className={`cursor-pointer transition-all duration-300 h-80 bg-white rounded-xl overflow-hidden ${
                    selectedTemplate === template.id
                      ? "ring-4 ring-blue-500 shadow-xl"
                      : "shadow-md hover:shadow-lg"
                  }`}
                  onClick={() => handleSelect(template)}
                >
                  <div className="relative h-48">
                    <img
                      src={template.preview}
                      alt={template.name}
                      className="w-full h-full object-cover"
                    />
                    {selectedTemplate === template.id && (
                      <div className="absolute top-3 right-3 bg-blue-600 text-white px-3 py-1 rounded-full text-xs font-bold">
                        Selected
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg text-gray-900">
                      {template.name}
                    </h3>
                    <p className="text-gray-600 text-sm mt-1 line-clamp-2">
                      {template.description}
                    </p>
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Template Details for Selected Slide in Carousel */}
          <div className="mt-4 p-6 bg-white rounded-lg shadow-md max-w-2xl mx-auto text-center">
            <h3 className="font-bold text-xl text-gray-900">
              {templates[activeIndex].name}
            </h3>
            <p className="text-gray-600 mt-2">
              {templates[activeIndex].description}
            </p>
            <button
              className={`mt-4 py-2 px-6 rounded-md text-sm font-medium transition-colors ${
                selectedTemplate === templates[activeIndex].id
                  ? "bg-blue-600 text-white hover:bg-blue-700"
                  : "bg-gray-100 text-gray-800 hover:bg-gray-200"
              }`}
              onClick={() => handleSelect(templates[activeIndex])}
            >
              {selectedTemplate === templates[activeIndex].id
                ? "Selected"
                : "Select This Template"}
            </button>
          </div>
        </div>
      )}

      {/* Preview & Submit */}
      <div className="w-full max-w-4xl flex flex-col md:flex-row items-center justify-between gap-6 bg-white p-6 rounded-lg shadow-md">
        {selectedTemplate && (
          <div className="flex-1 flex items-center space-x-4">
            <img
              src={templates.find((t) => t.id === selectedTemplate).preview}
              alt="Preview"
              className="w-20 h-28 object-cover rounded-md shadow-md"
            />
            <div>
              <h4 className="font-semibold text-gray-900">
                {templates.find((t) => t.id === selectedTemplate).name}
              </h4>
              <p className="text-sm text-gray-600">Selected Template</p>
              <button
                onClick={() => setSelectedTemplate(null)}
                className="text-blue-600 text-sm mt-1 hover:underline"
              >
                Change
              </button>
            </div>
          </div>
        )}

        <Button
          onClick={handleSubmit}
          disabled={!selectedTemplate}
          className={`py-3 px-8 rounded-lg text-white font-medium ${
            selectedTemplate
              ? "bg-blue-600 hover:bg-blue-700 shadow-md hover:shadow-lg transition-all"
              : "bg-gray-400 cursor-not-allowed"
          }`}
        >
          Proceed with Selected Template
        </Button>
      </div>
    </div>
  );
}
