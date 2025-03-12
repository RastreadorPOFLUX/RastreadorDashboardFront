import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");
  return {
    define: {
      "process.env.VITE_APP_WEATHER_URL": JSON.stringify(
        env.WEATHER_URL
      ),
      "process.env.VITE_APP_WEATHER_ICON_URL": JSON.stringify(
        env.WEATHER_ICON_URL
      ),
      "process.env.WEATHER_API_KEY": JSON.stringify(env.WEATHER_API_KEY),
    },
    plugins: [react()],
  };
});

