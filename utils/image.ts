import fs from "fs";
import path from "path";

export function imageToBase64(imagePath: string): string {
  const filePath = path.join(process.cwd(), "public", "products", imagePath);

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  const imageBuffer = fs.readFileSync(filePath);
  return `data:image/jpeg;base64,${imageBuffer.toString("base64")}`;
}

export const saveBase64Image = (base64Data: string, filename: string) => {
  const imagePath = path.join(process.cwd(), "public", "products", filename);
  const base64Image = base64Data.split(";base64,").pop();

  if (base64Image) {
    fs.writeFileSync(imagePath, base64Image, { encoding: "base64" });
  }
  return `/public/products/${filename}`;
};
