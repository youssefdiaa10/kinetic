import { LoaderCircle } from 'lucide-react';

interface LoadingProps {
  message?: string;
}

function Loading({ message = 'Loading...' }: LoadingProps) {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center gap-2 bg-black/50 text-sm text-white" role="status" aria-live="polite">
      <LoaderCircle aria-hidden="true" className="size-6 animate-spin" />
      <span>{message}</span>
    </div>
  );
}

export default Loading;
