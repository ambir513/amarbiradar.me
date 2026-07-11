"use client";

import { CheckIcon, CopyIcon } from "lucide-react";
import { useRef } from "react";
import { useCopyToClipboard } from "@/hooks/use-copy-to-clipboard";
import { Button } from "@/components/ui/button";
import { anchoredToastManager } from "@/components/ui/toast";
import {
  Tooltip,
  TooltipTrigger,
  TooltipContent,
} from "@/components/ui/tooltip";

interface Props {
  url: string;
}

export function CopyLink({ url }: Props) {
  const copyButtonRef = useRef<HTMLButtonElement>(null);
  const toastTimeout = 2000;

  const { copyToClipboard, isCopied } = useCopyToClipboard({
    onCopy: () => {
      if (copyButtonRef.current) {
        anchoredToastManager.add({
          data: {
            tooltipStyle: true,
          },
          positionerProps: {
            anchor: copyButtonRef.current,
          },
          timeout: toastTimeout,
          title: "Copied!",
        });
      }
    },
    timeout: toastTimeout,
  });

  function handleCopy() {
    copyToClipboard(url);
  }

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Button
            aria-label="Copy link"
            disabled={isCopied}
            onClick={handleCopy}
            ref={copyButtonRef}
            variant="outline"
          />
        }
      >
        {isCopied ? (
          <>
            <CheckIcon className="size-4" />
            <span className="md:inline hidden">Copy link</span>
          </>
        ) : (
          <>
            <CopyIcon className="size-4" />
            <span className="md:inline hidden">Copy link</span>
          </>
        )}
      </TooltipTrigger>
      <TooltipContent>
        <p>Copy to clipboard</p>
      </TooltipContent>
    </Tooltip>
  );
}
