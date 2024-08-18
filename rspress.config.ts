import * as path from "path";
import { defineConfig } from "rspress/config";

export default defineConfig({
  root: path.join(__dirname, "docs"),
  title: "经典教程",
  description: "各种实例演示教程",
  icon: "/logo.svg",
  logo: "/logo.svg",
  logoText: "经典教程",
  themeConfig: {
    socialLinks: [
      {
        icon: "github",
        mode: "link",
        content: "https://github.com/DvShu/classic-tutorial",
      },
    ],
  },
  markdown: {
    showLineNumbers: true,
  },
});
