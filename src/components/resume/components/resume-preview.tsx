"use client";
import * as React from "react";
import { FileThumbnail } from "@/components/ui/file-thumbnail";
import { renderPdfThumbnailUrl } from "../lib/pdf-thumbnail-utils";

export function ResumePreview({ fileUrl }: { fileUrl: string }) {
  const [imageUrl, setImageUrl] = React.useState<string | null>(null);

  React.useEffect(() => {
    let isCurrent = true;

    renderPdfThumbnailUrl({
      pageIndex: 0,
      url: fileUrl,
      width: 240,
    }).then((nextImageUrl) => {
      if (isCurrent) setImageUrl(nextImageUrl);
    });

    return () => {
      isCurrent = false;
    };
  }, [fileUrl]);

  return (
    <FileThumbnail
      file={{ name: "contract.pdf", type: "application/pdf" }}
      previewAspectRatio={0.77}
      previewClassName="bg-white"
      previewImageUrl={imageUrl}
      isLoading={!imageUrl}
    />
  );
}
