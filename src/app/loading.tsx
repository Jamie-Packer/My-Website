// src/app/loading.tsx
export default function Loading() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background">
      <div className="h-16 w-16 animate-spin rounded-full border-4 border-background2 border-t-accent"></div>
    </div>
  );
}