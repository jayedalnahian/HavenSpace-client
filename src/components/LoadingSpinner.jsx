const LoadingSpinner = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <span className="loading loading-spinner loading-lg text-primary"></span>
      <p className="text-lg font-medium text-primary">Loading...</p>
    </div>
  );
};

export default LoadingSpinner;