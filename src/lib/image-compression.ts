import imageCompression from "browser-image-compression";

const defaultOptions = {
  maxSizeMB: 1,
  maxWidthOrHeight: 1920,
  useWebWorker: true,
  fileType: "image/webp" as const,
};

export async function compressImage(file: File): Promise<File> {
  try {
    const compressed = await imageCompression(file, defaultOptions);
    return compressed;
  } catch {
    return file;
  }
}

export function validateImageFile(file: File): string | null {
  const validTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];
  if (!validTypes.includes(file.type)) {
    return "Please upload a JPEG, PNG, WebP, or GIF image.";
  }
  if (file.size > 10 * 1024 * 1024) {
    return "Image must be less than 10MB.";
  }
  return null;
}
