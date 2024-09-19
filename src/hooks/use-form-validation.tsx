import { useState } from 'react';

interface ValidationErrors {
  title?: string;
  description?: string;
  status?: string;
}

export const useFormValidation = (initialValues: { title: string; description: string; status: string }) => {
  const [values, setValues] = useState(initialValues);
  const [errors, setErrors] = useState<ValidationErrors>({});

  const validate = () => {
    const newErrors: ValidationErrors = {};
    if (!values.title) newErrors.title = "El título es requerido";
    if (!values.description) newErrors.description = "La descripción es requerida";
    if (!values.status) newErrors.status = "El estado es requerido";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Devuelve true si no hay errores
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
  };

  return { values, errors, validate, handleChange };
};
