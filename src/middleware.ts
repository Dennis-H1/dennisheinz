import { defineMiddleware } from "astro:middleware";

export const onRequest = defineMiddleware(({ url, redirect }, next) => {
  const { pathname } = url;
  if (!pathname.endsWith("/") && !pathname.includes(".")) {
    return redirect(pathname + "/", 301);
  }
  return next();
});
