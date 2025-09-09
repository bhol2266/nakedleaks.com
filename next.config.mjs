/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  env: {
    BACKEND_URL: 'https://backend.fuckvideo.live/nakedleaks/', 
    // BACKEND_URL: 'http://localhost:4001/nakedleaks/', 
    // CLOUDFLARE_WORKER: 'https://my-worker.ukdevelopers007.workers.dev/desikahaniya/',  
    CLOUDFLARE_R2_AUDIOSTORY: 'https://pub-46cdeefeaf774247ab99232ab1ebaa66.r2.dev/Audio_sex_stories/',  
    FRONTEND_URL: 'https://www.Antarvasna.app/',
    // FRONTEND_URL: 'http://localhost:3000/', 
    // FRONTEND_URL: 'http://lko80k08gk0ccgc8kgc44kgs.217.15.175.148.sslip.io/',
    FACEBOOK_APP_SECRET: '4c30ed043dbfc9e5b59e9db484283609',
    FACEBOOK_APP_ID: '1762910734100962',
    GOOGLE_CLIENT_ID: '737624608726-qa70ffm7anrn03v0qu8pgoed8bcfsfk5.apps.googleusercontent.com',
    GOOGLE_CLIENT_SECRET: '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',
  },
};

export default nextConfig;
