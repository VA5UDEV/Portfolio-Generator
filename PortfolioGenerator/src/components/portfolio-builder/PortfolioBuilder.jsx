import { useState } from "react";
import {
  PortfolioForm,
  TemplateSelector,
  PortfolioPreview,
  ExportPortfolio,
} from "../index";

export default function PortfolioBuilder() {
  const [userData, setUserData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isFinalized, setIsFinalized] = useState(false);
  const [step, setStep] = useState(1);

  const handleFormSubmit = (data) => {
    setUserData(data);
    setStep(2);
  };

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    setStep(3);
  };

  const handleFinalize = () => {
    setIsFinalized(true);
  };

  const handleBack = () => {
    if (step === 3) {
      setStep(2);
    } else if (step === 2) {
      setStep(1);
    }
  };

  return (
    <div className="max-w-6xl mt-10 mx-auto py-10 px-4 sm:px-6 lg:px-8">
      {/* Progress Stepper */}
      <div className="mb-12">
        <div className="max-w-2xl mx-auto">
          {/* Step indicators with connecting lines */}
          <div className="flex items-center justify-between">
            {/* Step 1 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step >= 1
                    ? "bg-blue-600 text-white border-2 border-blue-600"
                    : "bg-white text-gray-500 border-2 border-gray-300"
                }`}
              >
                <span className="text-sm font-bold">1</span>
              </div>
              <span
                className={`text-sm font-medium ${
                  step >= 1 ? "text-blue-600" : "text-gray-500"
                }`}
              >
                Info
              </span>
            </div>

            {/* Line 1-2 */}
            <div
              className={`h-1 flex-1 mx-2 mb-7 ${
                step >= 2 ? "bg-blue-600" : "bg-gray-200"
              }`}
            ></div>

            {/* Step 2 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step >= 2
                    ? "bg-blue-600 text-white border-2 border-blue-600"
                    : "bg-white text-gray-500 border-2 border-gray-300"
                }`}
              >
                <span className="text-sm font-bold">2</span>
              </div>
              <span
                className={`text-sm font-medium ${
                  step >= 2 ? "text-blue-600" : "text-gray-500"
                }`}
              >
                Template
              </span>
            </div>

            {/* Line 2-3 */}
            <div
              className={`h-1 flex-1 mx-2 mb-7 ${
                step >= 3 ? "bg-blue-600" : "bg-gray-200"
              }`}
            ></div>

            {/* Step 3 */}
            <div className="flex flex-col items-center">
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center mb-2 ${
                  step >= 3
                    ? "bg-blue-600 text-white border-2 border-blue-600"
                    : "bg-white text-gray-500 border-2 border-gray-300"
                }`}
              >
                <span className="text-sm font-bold">3</span>
              </div>
              <span
                className={`text-sm font-medium ${
                  step >= 3 ? "text-blue-600" : "text-gray-500"
                }`}
              >
                Preview
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Page Title */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-900">
          {step === 1 && "Your Information"}
          {step === 2 && "Choose Your Portfolio Style"}
          {step === 3 && "Preview Your Portfolio"}
        </h1>
        <p className="mt-2 text-gray-600">
          {step === 1 && "Tell us about yourself and your work experience"}
          {step === 2 &&
            "Select a template that reflects your professional identity"}
          {step === 3 && "Review and finalize your professional portfolio"}
        </p>
      </div>

      {/* Content Container */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
        {step === 1 && (
          <PortfolioForm port={userData} onSubmit={handleFormSubmit} />
        )}

        {step === 2 && (
          <TemplateSelector onSelectTemplate={handleTemplateSelect} />
        )}

        {step === 3 && (
          <div className="space-y-8">
            <PortfolioPreview
              userData={userData}
              selectedTemplate={selectedTemplate}
            />

            {isFinalized && (
              <div className="mt-8 p-4 bg-blue-50 rounded-lg">
                <h3 className="text-lg font-medium text-blue-800 mb-2">
                  Your portfolio is ready!
                </h3>
                <ExportPortfolio userData={userData} />
              </div>
            )}
          </div>
        )}
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between">
        {step > 1 && (
          <button
            onClick={handleBack}
            className="px-5 py-2.5 rounded-lg bg-white border border-gray-300 text-gray-700 font-medium hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Back
          </button>
        )}

        {step === 1 && <div></div>}

        {step === 3 && !isFinalized && (
          <button
            onClick={handleFinalize}
            className="px-5 py-2.5 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ml-auto"
          >
            Finalize Portfolio
          </button>
        )}
      </div>
    </div>
  );
}
