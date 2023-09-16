const LoadingSpinner = ({ fullpage = false }: { fullpage: boolean }) => {
  const Spinner = () => {
    return (
      <div className="w-8 h-8 border-4 border-gray-300 rounded-full animate-spin border-t-blue-500"></div>
    );
  };

  return fullpage ? (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 1000,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Spinner />
    </div>
  ) : (
    <Spinner />
  );
};

export default LoadingSpinner;
