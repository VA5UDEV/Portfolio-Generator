import { useState } from "react";
import { PortfolioForm, TemplateSelector, PortfolioPreview, ExportPortfolio, Button } from "../index";

export default function PortfolioBuilder() {
  const [userData, setUserData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isFinalized, setIsFinalized] = useState(false);
  const [step, setStep] = useState(1); // 1: Form, 2: Template Selection, 3: Preview & Export

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
    <div className="container mx-auto py-8 px-4">
      {/* Progress Steps */}
      <div className="flex justify-center mb-8">
        <div className="flex items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>1</div>
          <div className={`w-16 h-1 ${step >= 2 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>2</div>
          <div className={`w-16 h-1 ${step >= 3 ? 'bg-blue-600' : 'bg-gray-300'}`}></div>
          <div className={`w-8 h-8 rounded-full flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-300'}`}>3</div>
        </div>
      </div>

      <div className="min-h-[80vh]">
        {step === 1 && (
          <PortfolioForm port={userData} onSubmit={handleFormSubmit} />
        )}
        
        {step === 2 && (
          <>
            <TemplateSelector onSelectTemplate={handleTemplateSelect} />
            <div className="flex justify-between mt-6">
              <Button variant="outline" onClick={handleBack}>
                Back
              </Button>
            </div>
          </>
        )}
        
        {step === 3 && (
          <div className="space-y-8">
            <PortfolioPreview userData={userData} selectedTemplate={selectedTemplate} />
            
            {!isFinalized && (
              <div className="flex justify-between mt-6">
                <Button variant="outline" onClick={handleBack}>
                  Back
                </Button>
                <Button onClick={handleFinalize}>
                  Finalize Portfolio
                </Button>
              </div>
            )}
            
            {isFinalized && (
              <div className="mt-8">
                <ExportPortfolio userData={userData} />
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}