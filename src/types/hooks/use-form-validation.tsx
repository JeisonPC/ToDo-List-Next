export interface ValidationErrors {
  [key: string]: string;
}

export interface UseFormValidationProps {
  initialValues: Record<string, string>;
  validate: (values: Record<string, string>) => ValidationErrors;
}
