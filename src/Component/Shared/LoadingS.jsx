import { RotateSpinner } from "react-spinners-kit";

const Loading = () => {
  return (
    <div className="max-w-screen-xl h-screen flex items-center justify-center mx-auto">
      <RotateSpinner size={45} color="#59815B" loading={true} />
    </div>
  );
};

export default Loading;
