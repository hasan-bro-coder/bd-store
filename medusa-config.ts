import { loadEnv, defineConfig } from "@medusajs/framework/utils";

loadEnv(process.env.NODE_ENV || "development", process.cwd());

export default defineConfig({
  // Use 'export default' for v2
  projectConfig: {
    databaseUrl: process.env.DATABASE_URL,
    http: {
      storeCors: process.env.STORE_CORS!,
      adminCors: process.env.ADMIN_CORS!,
      authCors: process.env.AUTH_CORS!,
      jwtSecret: process.env.JWT_SECRET || "supersecret",
      cookieSecret: process.env.COOKIE_SECRET || "supersecret",
    },
  },
  modules: {
    cacheService: {
      resolve: "@medusajs/cache-inmemory",
      options: {
        ttl: 30,
      },
    },
    file: {
      resolve: "@medusajs/file", // Corrected path
      options: {
        providers: [
          {
            resolve: "@medusajs/file-s3", // Corrected path
            id: "s3",
            options: {
              file_url: process.env.S3_FILE_URL,
              access_key_id: process.env.S3_ACCESS_KEY_ID,
              secret_access_key: process.env.S3_SECRET_ACCESS_KEY,
              region: process.env.S3_REGION,
              bucket: process.env.S3_BUCKET,
              endpoint: process.env.S3_ENDPOINT,
              // Corrected: Moved inside the options block
              additional_client_config: {
                forcePathStyle: true,
              },
            },
          },
        ],
      },
    },
  },
});

// import { loadEnv, defineConfig } from "@medusajs/framework/utils";

// loadEnv(process.env.NODE_ENV || "development", process.cwd());

// module.exports = defineConfig({
//   projectConfig: {
//     databaseUrl: process.env.DATABASE_URL,
//     http: {
//       storeCors: process.env.STORE_CORS!,
//       adminCors: process.env.ADMIN_CORS!,
//       authCors: process.env.AUTH_CORS!,
//       jwtSecret: process.env.JWT_SECRET || "supersecret",
//       cookieSecret: process.env.COOKIE_SECRET || "supersecret",
//     },
//   },
//   modules: {
//     cacheService: {
//       resolve: "@medusajs/cache-inmemory",
//       options: {
//         ttl: 30,
//       },
//     },
//     file: {
//       resolve: "@medusajs/medusa/file",
//       options: {
//         providers: [
//           {
//             resolve: "@medusajs/medusa/file-s3",
//             id: "s3",
//             options: {
//               file_url: process.env.S3_FILE_URL,

//               access_key_id: process.env.S3_ACCESS_KEY_ID,

//               secret_access_key: process.env.S3_SECRET_ACCESS_KEY,

//               region: process.env.S3_REGION,

//               bucket: process.env.S3_BUCKET,

//               endpoint: process.env.S3_ENDPOINT,
//               // other options...
//             },
//             additional_client_config: {
//               forcePathStyle: true,
//             },
//           },
//         ],
//       },
//     },
//   },
// });
