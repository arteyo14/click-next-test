import type { AxiosError } from "axios";

export function isAxiosError(value: any): value is AxiosError {
  return typeof value?.response === "object";
}
