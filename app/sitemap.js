const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://fxsurya.com";

const routes = [
  "",
  "/about",
  "/contact",
  "/education",
  "/mentorship",
  "/partner",
];

export default function sitemap() {
  return routes.map((route) => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: route === "" || route === "/education" ? "daily" : "monthly",
    priority: route === "" ? 1 : route === "/mentorship" ? 0.9 : 0.8,
  }));
}
