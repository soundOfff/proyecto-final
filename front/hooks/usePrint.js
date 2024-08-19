import { useState } from "react";
import { generatePdf } from "/actions/generate-pdf";

export default function usePrint({ documentType, documentId }) {
  const [isGeneratingPdf, setIsGeneratingPdf] = useState(false);

  const handlePrint = async () => {
    setIsGeneratingPdf(true);
    try {
      const pdfUrl = await generatePdf({
        document_type: documentType,
        document_id: documentId,
      });
      window.open(pdfUrl, "_blank");
    } catch (error) {
      console.log(error);
    }
    setIsGeneratingPdf(false);
  };

  return {
    isGeneratingPdf,
    handlePrint,
  };
}
