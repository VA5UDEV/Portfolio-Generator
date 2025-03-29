import { Button } from "@/components/ui/button";
import { Printer, Download } from "lucide-react";

export default function ExportPortfolio({ userData }) {
  const handleDownloadJSON = () => {
    const portfolioData = JSON.stringify(userData, null, 2);
    const blob = new Blob([portfolioData], { type: "application/json" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "portfolio.json";
    link.click();
  };

  const handlePrintPDF = () => {
    const printContent = document.getElementById("portfolio-container");

    if (!printContent) {
      alert("Could not find the portfolio content to print.");
      return;
    }

    const printWindow = window.open("", "_blank", "width=800,height=600");

    if (!printWindow) {
      alert("Please allow pop-ups to print your portfolio.");
      return;
    }

    printWindow.document.write(`
      <html>
        <head>
          <title>${userData.name} - Portfolio</title>
          <style>
            body { font-family: Arial, sans-serif; margin: 0; padding: 20px; }
            .print-container { max-width: 800px; margin: 0 auto; }
          </style>
          <link href="https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css" rel="stylesheet">
        </head>
        <body>
          <div class="print-container">
            ${printContent.outerHTML}
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.onload = function () {
      printWindow.focus();
      printWindow.print();
      printWindow.onafterprint = function () {
        printWindow.close();
      };
    };
  };

  return (
    <div className="text-center space-y-4">
      <h2 className="text-2xl font-bold text-gray-900">
        Export Your Portfolio
      </h2>
      <div className="space-y-2">
        <Button
          onClick={handlePrintPDF}
          className="w-full bg-blue-600 hover:bg-blue-700 flex items-center justify-center gap-2"
        >
          <Printer size={18} />
          Print as PDF
        </Button>
        <Button
          onClick={handleDownloadJSON}
          className="w-full flex items-center justify-center gap-2"
          variant="outline"
        >
          <Download size={18} />
          Download Data (JSON)
        </Button>
      </div>
    </div>
  );
}
