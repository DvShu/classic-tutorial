import { defineConfig } from "vitepress";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  lang: "zh-CN",
  title: "经典教程",
  description: "各种实例演示教程",
  base: "/classic-tutorial/",
  head: [
    [
      "link",
      {
        rel: "icon",
        href: "/classic-tutorial/logo.svg",
        type: "image/svg+xml",
      },
    ],
  ],
  cleanUrls: true,
  lastUpdated: true,
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    logo: "/logo.svg",
    nav: [
      { text: "Home", link: "/" },
      { text: "教程实例", link: "/list" },
    ],

    sidebar: [
      {
        text: "实例介绍",
        link: "/list",
      },
      {
        text: "实例列表",
        items: [
          { text: "四叶草布局", link: "/tutorial_list/four_leaf_clover" },
          { text: "上下文菜单", link: "/tutorial_list/context_menu" },
          { text: "奥运5环", link: "tutorial_list/olympic_rings_5" },
        ],
      },
    ],

    socialLinks: [
      { icon: "github", link: "https://github.com/DvShu/classic-tutorial" },
    ],
  },
});
