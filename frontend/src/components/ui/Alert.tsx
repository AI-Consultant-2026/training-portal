interface AlertProps {
  message: string;
  variant?: "error" | "success" | "info";
}

const VARIANT_CLASSES = {
  error: "bg-red-50 text-red-700 border-red-200",
  success: "bg-green-50 text-green-700 border-green-200",
  info: "bg-blue-50 text-blue-700 border-blue-200",
};

export function Alert({ message, variant = "error" }: AlertProps) {
  return <div className={`rounded-md border px-3 py-2 text-sm ${VARIANT_CLASSES[variant]}`}>{message}</div>;
}
