import jwt from "jsonwebtoken";
import HttpStatusCode from "~/core/shared/http/HttpStatusCode";

const config = useRuntimeConfig();
const jwtSecret = config.public.jwtSecret;
export default defineEventHandler(async (event) => {
  const authHeader = event.headers.get("authorization");

  const unprotectedPaths = ["/api/auth/login"];

  if (
    unprotectedPaths.includes(event.node.req.url || "") ||
    !event.node.req.url?.startsWith("/api")
  ) {
    return;
  }

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    setResponseStatus(event, HttpStatusCode.UNAUTHORIZED);
    return {
      status: false,
      code: HttpStatusCode.UNAUTHORIZED,
      error: { message: "Unauthorized" },
    };
  }

  const token = authHeader.split(" ")[1];

  try {
    // ตรวจสอบ token
    const decoded = jwt.verify(token, jwtSecret);
    event.context.auth = decoded; // เก็บข้อมูล auth ไว้ใน context สำหรับใช้งานต่อ
  } catch (error) {
    setResponseStatus(event, HttpStatusCode.ACCESS_DENIED);
    return {
      status: false,
      code: HttpStatusCode.ACCESS_DENIED,
      error: { message: "Session was expired" },
    };
  }
});
