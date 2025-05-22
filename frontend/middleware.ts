// middleware.ts
import { authMiddleware } from "@clerk/nextjs/server";

export default authMiddleware({
  publicRoutes: [
    "/",
    "/features",
    "/pricing",
    "/about",
    "/demo",
    "/privacy",
    "/terms",
    "/contact",
  ],
});

export const config = {
  matcher: [
    "/((?!_next|.*\\..*).*)", // excludes static files and _next
    "/",
    "/(api|trpc)(.*)",
  ],
};
