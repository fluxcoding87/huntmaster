"use client";
import ReactQuill from "react-quill-new";

import "react-quill/dist/quill.bubble.css";

interface PreviewProps {
  value: string;
}

export const Preview = ({ value }: PreviewProps) => {
  return (
    <div className="bg-white">
      <ReactQuill theme="bubble" value={value} readOnly />
    </div>
  );
};
