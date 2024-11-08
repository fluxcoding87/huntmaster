"use client";
import { useEffect, useMemo, useRef } from "react";
import ReactQuill from "react-quill-new";
import "react-quill/dist/quill.snow.css";

interface RichTextEditorProps {
  value?: string;
  onChange: (value: string) => void;
}
export const RichTextEditor = ({ value, onChange }: RichTextEditorProps) => {
  return (
    <div className="bg-white">
      <ReactQuill
        theme="snow"
        value={value}
        onChange={onChange}
        className="h-40"
      />
    </div>
  );
};
