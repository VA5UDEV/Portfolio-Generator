import { useState } from "react";
import { PortfolioForm, TemplateSelector, PortfolioPreview, ExportPortfolio } from "../index";
import { Button } from "../index";

export default function PortfolioBuilder() {
  const [userData, setUserData] = useState(null);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [isFinalized, setIsFinalized] = useState(false);

  return (
    <div>
      <div className="h-[82vh]">
        {!isFinalized ? (
          <>
            {!userData ? (
              <PortfolioForm />
            ) : (
              <TemplateSelector onSelectTemplate={setSelectedTemplate} />
            )}
            {userData && selectedTemplate && (
              <Button onClick={() => setIsFinalized(true)} className="w-full mt-4">
                Finalize Portfolio
              </Button>
            )}
          </>
        ) : (
          <>
            <PortfolioPreview userData={userData} selectedTemplate={selectedTemplate} />
            <ExportPortfolio userData={userData} />
          </>
        )}
      </div>
    </div>
  );
}
