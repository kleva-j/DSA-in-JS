import { CheckIcon, CopyIcon } from 'lucide-react';
import { Button } from '@/components/atoms/button';
import { useState } from 'react';
import { cn } from '@/lib/utils';

import {
  TooltipProvider,
  TooltipTrigger,
  TooltipContent,
  Tooltip,
} from '@/components/atoms/tooltip';

export function CopyButton({ code }: { code: string }) {
  const [copied, setCopied] = useState<boolean>(false);

  const handleCopy = async () => {
    try {
      const cleanCode = code.replace(/^```.*\n([\s\S]*?)```$/m, '$1').trim();
      await navigator.clipboard.writeText(cleanCode);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  return (
    <TooltipProvider delayDuration={0}>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size="icon"
            className="size-7 rounded-md bg-zinc-800 text-gray-300 hover:text-gray-100 cursor-pointer transition-colors"
            onClick={handleCopy}
            aria-label={copied ? 'Copied' : 'Copy to clipboard'}
            disabled={copied}
          >
            <div
              className={cn(
                'transition-all',
                copied ? 'scale-100 opacity-100' : 'scale-0 opacity-0'
              )}
            >
              <CheckIcon className="stroke-emerald-500" size={16} aria-hidden="true" />
            </div>
            <div
              className={cn(
                'absolute transition-all',
                copied ? 'scale-0 opacity-0' : 'scale-100 opacity-100'
              )}
            >
              <CopyIcon size={16} aria-hidden="true" />
            </div>
          </Button>
        </TooltipTrigger>
        <TooltipContent className="px-2 py-1 text-xs">Click to copy</TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
}
