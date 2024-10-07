type FormSuccessProps = {
  message?: string;
};

const FormError = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="text-red-600 dark:text-red-700 py-2 font-bold bg-red-200/70 dark:bg-red-100 rounded-lg text-md">
      <p>⚠️ {message}</p>
    </div>
  );
};

export default FormError;
