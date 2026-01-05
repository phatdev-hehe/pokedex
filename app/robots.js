export default () => ({
  host: process.env.NEXT_PUBLIC_SITE_URL,
  rules: {
    allow: "/",
    userAgent: "*",
  },
  sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
});
