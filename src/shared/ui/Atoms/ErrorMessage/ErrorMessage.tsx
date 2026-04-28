import { VscError } from "react-icons/vsc";

type ErrorMessageProps = {
  message: string;
  retryAction?: () => void;
};

const ErrorMessage = ({ message, retryAction }: ErrorMessageProps) => (
  <div className="flex flex-col gap-2 bg-error/10 p-2 border border-error rounded-lg text-error">
    
    <div className="flex items-center gap-2 font-semibold">
      <VscError />
      <span>Error</span>
    </div>

    <div className="flex flex-col gap-1">
      <span>{message}</span>

      {retryAction && (
        <button
          onClick={retryAction}
          className="hover:opacity-80 w-fit font-semibold underline transition cursor-pointer"
        >
          Retry
        </button>
      )}
    </div>
    
  </div>
);

export default ErrorMessage;