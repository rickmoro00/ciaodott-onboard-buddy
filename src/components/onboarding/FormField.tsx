import { Label } from "@/components/ui/label";

interface FormFieldProps {
  label: string;
  description?: string;
  required?: boolean;
  children: React.ReactNode;
}

const FormField = ({ label, description, required, children }: FormFieldProps) => {
  return (
    <div className="space-y-2">
      <Label className="text-base font-medium">
        {label}
        {required && <span className="text-destructive ml-1">*</span>}
      </Label>
      {description && (
        <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
      )}
      {children}
    </div>
  );
};

export default FormField;
