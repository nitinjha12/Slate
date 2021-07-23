module.exports = {
  env: {
    DATABASE_URL: process.env.DB_URL,
    NEXT_APP_UNSPLASH_API: process.env.UNSPLASH_API,
  },
  images: {
    domains: ["images.unsplash.com"],
  },
};
