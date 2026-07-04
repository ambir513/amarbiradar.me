"use client";
import { PDFViewer } from "@/components/resume/components/pdf-viewer";

export function ResumePage() {
  return (
    <main className="md:max-w-5xl w-full mx-auto px-6 py-12 sm:px-8">
      <PDFViewer
        src="/assets/resume.pdf"
        className="h-[1270px] w-full md:block hidden"
        showUpload={false}
        defaultZoom={1.5}
        fileName="amarbiradar"
        showRotateControls={false}
        showPages={false}
      />
      <PDFViewer
        src="/assets/resume.pdf"
        className="h-[477px] w-full md:hidden block"
        showUpload={false}
        defaultZoom={0.5}
        fileName="amarbiradar"
        showRotateControls={false}
        showSearchBar={false}
        showPages={false}
      />
    </main>
  );
}
