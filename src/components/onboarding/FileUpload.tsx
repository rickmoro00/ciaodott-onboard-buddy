import { useId, useRef, useState } from "react";
import { Upload, X, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FileUploadProps {
  value?: File;
  onChange: (file: File | undefined) => void;
  accept?: string;
  maxSize?: number;
}

const FileUpload = ({ value, onChange, accept = ".pdf,.doc,.docx,.xls,.xlsx", maxSize = 10 }: FileUploadProps) => {
  const [dragActive, setDragActive] = useState(false);
  const inputId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    const file = e.target.files?.[0];
    if (file) {
      handleFile(file);
    }
  };

  const handleFile = (file: File) => {
    if (file.size > maxSize * 1024 * 1024) {
      alert(`Il file non deve superare ${maxSize}MB`);
      return;
    }
    onChange(file);
  };

  const handleRemove = () => {
    onChange(undefined);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  if (value) {
    return (
      <div className="border border-border rounded-lg p-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <FileText className="h-8 w-8 text-primary" />
          <div>
            <p className="text-sm font-medium">{value.name}</p>
            <p className="text-xs text-muted-foreground">
              {(value.size / 1024).toFixed(1)} KB
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Button
            type="button"
            variant="outline"
            size="sm"
            onClick={handleClick}
          >
            Cambia file
          </Button>
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleRemove}
            className="text-destructive hover:text-destructive"
          >
            <X className="h-4 w-4" />
          </Button>
        </div>
        <input
          ref={inputRef}
          id={inputId}
          type="file"
          className="hidden"
          accept={accept}
          onChange={handleChange}
        />
      </div>
    );
  }

  return (
    <div
      className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors cursor-pointer ${
        dragActive ? "border-primary bg-primary/5" : "border-border hover:border-primary"
      }`}
      onDragEnter={handleDrag}
      onDragLeave={handleDrag}
      onDragOver={handleDrag}
      onDrop={handleDrop}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleClick();
        }
      }}
      aria-describedby={`${inputId}-helper`}
    >
      <input
        ref={inputRef}
        id={inputId}
        type="file"
        className="hidden"
        accept={accept}
        onChange={handleChange}
      />
      <Upload className="h-8 w-8 mx-auto mb-2 text-muted-foreground" />
      <p className="text-sm text-muted-foreground mb-1">
        Clicca per caricare o trascina il file qui
      </p>
      <p id={`${inputId}-helper`} className="text-xs text-muted-foreground">
        {accept.split(",").join(", ").toUpperCase()} (max {maxSize}MB)
      </p>
    </div>
  );
};

export default FileUpload;
