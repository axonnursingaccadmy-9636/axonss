import { useState, useCallback, type ChangeEvent } from "react";

interface ValidationRule {
  required?: boolean;
  email?: boolean;
  minLength?: number;
  maxLength?: number;
  passwordMatch?: string;
  custom?: (value: string) => boolean;
  message: string;
}

type ValidationRules = Record<string, ValidationRule[]>;
type ValidationErrors = Record<string, string>;
type FormValues = Record<string, string>;

export function useFormValidation(rules: ValidationRules) {
  const [values, setValues] = useState<FormValues>({});
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [touched, setTouched] = useState<Record<string, boolean>>({});

  const validateField = useCallback(
    (name: string, value: string): string | null => {
      const fieldRules = rules[name];
      if (!fieldRules) return null;

      for (const rule of fieldRules) {
        if (rule.required && !value.trim()) return rule.message;
        if (rule.email && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return rule.message;
        if (rule.minLength && value.length < rule.minLength) return rule.message;
        if (rule.maxLength && value.length > rule.maxLength) return rule.message;
        if (rule.passwordMatch && value !== values[rule.passwordMatch]) return rule.message;
        if (rule.custom && !rule.custom(value)) return rule.message;
      }
      return null;
    },
    [rules, values]
  );

  const handleChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setValues((prev) => ({ ...prev, [name]: value }));
      if (touched[name]) {
        const error = validateField(name, value);
        setErrors((prev) => ({ ...prev, [name]: error || "" }));
      }
    },
    [touched, validateField]
  );

  const handleBlur = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const { name, value } = e.target;
      setTouched((prev) => ({ ...prev, [name]: true }));
      const error = validateField(name, value);
      setErrors((prev) => ({ ...prev, [name]: error || "" }));
    },
    [validateField]
  );

  const validateAll = useCallback((): boolean => {
    const newErrors: ValidationErrors = {};
    let isValid = true;

    for (const fieldName of Object.keys(rules)) {
      const error = validateField(fieldName, values[fieldName] || "");
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    }

    setErrors(newErrors);
    setTouched(
      Object.keys(rules).reduce((acc, key) => ({ ...acc, [key]: true }), {})
    );
    return isValid;
  }, [rules, values, validateField]);

  const reset = useCallback(() => {
    setValues({});
    setErrors({});
    setTouched({});
  }, []);

  return {
    values,
    errors,
    touched,
    handleChange,
    handleBlur,
    validateAll,
    reset,
    setValues,
  };
}
