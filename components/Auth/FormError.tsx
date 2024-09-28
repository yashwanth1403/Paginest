type FormSuccessProps = {
  message?: string;
};

const FormError = ({ message }: FormSuccessProps) => {
  if (!message) return null;
  return (
    <div className="text-red-300 dark:text-red-500 py-2">
      <p>⚠️{message}</p>
    </div>
  );
};

export default FormError;
