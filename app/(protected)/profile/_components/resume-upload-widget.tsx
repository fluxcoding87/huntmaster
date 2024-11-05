/* eslint-disable @typescript-eslint/no-explicit-any */
import { CldUploadButton } from "next-cloudinary";

interface ResumeUploadWidgetProps {
  onUpload: (url: string, name: string) => void;
}

export const ResumeUploadWidget = ({ onUpload }: ResumeUploadWidgetProps) => {
  const handleUpload = (result: any) => {
    onUpload(result.info?.secure_url, result.info?.display_name);
  };
  return (
    <CldUploadButton
      uploadPreset="denyk25q"
      options={{ maxFiles: 1, resourceType: "raw" }}
      onSuccess={handleUpload}
    >
      <div className="flex flex-col gap-y-2 items-center justify-center p-8 rounded-xl border-2 border-spacing-10 border-dashed border-amber-600">
        <div className="rounded-xl flex items-center ring-1 ring-amber-600 p-2">
          <span className="text-sm font-semibold tracking-tight text-amber-600">
            Upload Resume
          </span>
        </div>
        <span className="text-xs text-muted-foreground">
          Upload your most recent and updated resume.
        </span>
      </div>
    </CldUploadButton>
  );
};
