"use client";

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import { Upload, X, ImageIcon } from "lucide-react";
import Image from "next/image";
import toast from "react-hot-toast";
import { compressImage, validateImageFile } from "@/lib/image-compression";

interface ImageUploadProps {
  images: string[];
  onChange: (images: string[]) => void;
}

export function ImageUpload({ images, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const onDrop = useCallback(
    async (acceptedFiles: File[]) => {
      setUploading(true);
      const newImages: string[] = [];

      for (const file of acceptedFiles) {
        const error = validateImageFile(file);
        if (error) {
          toast.error(error);
          continue;
        }

        const compressed = await compressImage(file);
        const formData = new FormData();
        formData.append("file", compressed);

        try {
          const res = await fetch("/api/upload", { method: "POST", body: formData });
          if (res.ok) {
            const data = await res.json();
            newImages.push(data.url);
          } else {
            const reader = new FileReader();
            const url = await new Promise<string>((resolve) => {
              reader.onload = () => resolve(reader.result as string);
              reader.readAsDataURL(compressed);
            });
            newImages.push(url);
          }
        } catch {
          const reader = new FileReader();
          const url = await new Promise<string>((resolve) => {
            reader.onload = () => resolve(reader.result as string);
            reader.readAsDataURL(compressed);
          });
          newImages.push(url);
        }
      }

      onChange([...images, ...newImages]);
      setUploading(false);
    },
    [images, onChange]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpeg", ".jpg", ".png", ".webp", ".gif"] },
    multiple: true,
  });

  const removeImage = (index: number) => {
    onChange(images.filter((_, i) => i !== index));
  };

  return (
    <div className="space-y-4">
      <div
        {...getRootProps()}
        className={`border-2 border-dashed rounded-2xl p-8 text-center cursor-pointer transition-colors ${
          isDragActive
            ? "border-rose-500 bg-rose-50 dark:bg-rose-950/30"
            : "border-neutral-200 dark:border-neutral-700 hover:border-rose-300"
        }`}
      >
        <input {...getInputProps()} />
        <Upload className="w-10 h-10 text-neutral-400 mx-auto mb-3" />
        <p className="text-sm text-neutral-600 dark:text-neutral-400">
          {uploading
            ? "Uploading..."
            : isDragActive
            ? "Drop images here..."
            : "Drag & drop images, or click to browse"}
        </p>
        <p className="text-xs text-neutral-400 mt-1">JPEG, PNG, WebP up to 10MB</p>
      </div>

      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {images.map((url, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden group">
              {url.startsWith("data:") || url.startsWith("http") ? (
                <Image src={url} alt={`Upload ${i + 1}`} fill className="object-cover" sizes="150px" />
              ) : (
                <div className="w-full h-full bg-neutral-100 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-neutral-400" />
                </div>
              )}
              <button
                type="button"
                onClick={() => removeImage(i)}
                className="absolute top-2 right-2 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
