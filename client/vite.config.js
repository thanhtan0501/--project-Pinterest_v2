import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        host: "localhost",
        port: "3001",
    },
    // optimizeDeps: {
    //     exclude: ["material-ui-chip-input"],
    // },
});
