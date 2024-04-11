import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// // https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // define: {
  //   "process.env": process.env,
  // },
  // server: {
  //   host: true,
  // },
  // base: "./",
  base: "/ vit-4-0-1-react/",
});

// export default defineConfig({
//   plugins: [react()],
//   base:
//     process.env.NODE_ENV === "production"
//       ? "/shop-customer-view-front.github.io/" // Adjust this to match your GitHub Pages subdirectory
//       : "/",
//   build: {
//     assetsDir: "assets",
//   },
// });
