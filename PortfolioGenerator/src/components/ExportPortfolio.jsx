import { Button } from "@/components/ui/button";

export default function ExportPortfolio({ userData }) {
  const handleDownload = () => {
    const portfolioData = JSON.stringify(userData, null, 2);
    const blob = new Blob([portfolioData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "portfolio.json";
    link.click();
  };

  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">
        Export Your Portfolio
      </h2>
      <Button onClick={handleDownload} className="w-full">
        Download Portfolio (JSON)
      </Button>
    </div>
  );
}
