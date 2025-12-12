export default () => ({
  rules: {
    userAgent: "*",
    allow: "/",
  },
  sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  host: process.env.NEXT_PUBLIC_SITE_URL,
});
