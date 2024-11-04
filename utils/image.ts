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
