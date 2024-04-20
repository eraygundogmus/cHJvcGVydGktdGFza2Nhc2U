import { LoadingSpinner } from "@/components/ui/spinner";

function Loading() {
  return (
    <div className="w-full h-screen flex items-center justify-center">
      <LoadingSpinner />
    </div>
  );
}

export default Loading;
