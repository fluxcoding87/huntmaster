/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useUpdateProfile } from "@/hooks/profile/use-update-profile";
import { CldUploadButton, CldUploadWidget } from "next-cloudinary";
import Link from "next/link";
import { useState } from "react";
interface EditResumeWidgetProps {
  initialData: string;
  userName: string;
  id: string;
}

export const EditResumeForm = ({
  initialData,
  userName,
  id,
}: EditResumeWidgetProps) => {
  const { mutate, isPending } = useUpdateProfile(id);
  const [resumeUrl, setResumeUrl] = useState(initialData);
  const [uploadedResumeName, setUploadedResumeName] = useState(undefined);
  const handleUpload = (result: any) => {
    mutate({
      resumeUrl: result.info?.secure_url,
    });
    setResumeUrl(result.info?.secure_url);
    setUploadedResumeName(result.info?.display_name);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>
          <div className="flex flex-col gap-y-4">
            <h3 className="text-base font-semibold text-gray-800">Resume</h3>
            <p className="text-sm text-muted-foreground font-medium">
              Your resume is the first impression you make on potential
              employers. Craft it carefully to secure your desired job or
              internship.
            </p>
          </div>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-center gap-x-2 py-2 mb-2 bg-neutral-200 w-fit px-4 rounded-xl">
          <span className="text-sm font-semibold">Uploaded Resume:</span>
          <Link
            href={resumeUrl}
            className="text-sm font-semibold hover:underline"
            target="_blank"
          >
            {uploadedResumeName
              ? `${uploadedResumeName}.pdf`
              : `${userName.split(" ")[0]}'s Resume.pdf`}
          </Link>
        </div>
        <CldUploadWidget
          uploadPreset="denyk25q"
          options={{ maxFiles: 1, resourceType: "raw" }}
          onSuccess={handleUpload}
        >
          {({ open }) => (
            <div
              onClick={() => open()}
              className="flex flex-col gap-y-2 items-center justify-center p-8 rounded-xl border-2 border-spacing-10 border-dashed border-amber-600 cursor-pointer"
            >
              <div
                className="rounded-xl flex items-center ring-1 ring-amber-600 p-2 cursor-pointer"
                onClick={() => open()}
              >
                <span className="text-sm font-semibold tracking-tight text-amber-600">
                  Update Resume
                </span>
              </div>
              <span className="text-xs text-muted-foreground">
                Upload your most recent and updated resume.
              </span>
            </div>
          )}
        </CldUploadWidget>
      </CardContent>
    </Card>
  );
};
