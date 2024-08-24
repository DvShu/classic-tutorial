<template>
  <Teleport to="body">
    <template v-if="showMenu">
      <ul ref="$menu" class="context-menu" :style="menuStyle">
        <MenuItem
          v-for="menu in menus"
          :key="menu.action"
          :name="menu.name"
          :action="menu.action"
          :children="menu.children"
        ></MenuItem>
      </ul>
    </template>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted, ref, nextTick } from "vue";
import MenuItem from "./MenuItem.vue";

const menus = [
  { name: "复制", action: "copy" },
  { name: "剪切", action: "cut" },
  { name: "删除", action: "delete" },
  { name: "打开", action: "open" },
  {
    name: "打开方式",
    action: "openWith",
    children: [
      {
        name: "notepad",
        action: "notepad",
      },
      {
        name: "计算本",
        action: "text",
      },
    ],
  },
  {
    name: "新建",
    action: "new",
    children: [
      {
        name: "文件夹",
        action: "folder",
      },
      {
        name: "文本文件",
        action: "file",
      },
      {
        name: "Word 文档",
        action: "doc",
      },
      {
        name: "PowerPoint 演示文稿",
        action: "ppt",
      },
    ],
  },
];

const showMenu = ref(false);
const menuStyle = ref({});
const $menu = ref<HTMLUListElement>();

/** 获取某个节点距离容器顶部和左边的距离 */
function getDistanceToContainer(el: HTMLElement) {
  let offsetLeft = 0;
  let offsetTop = 0;
  let top = 0;
  let bottom = 0;
  let left = 0;
  let right = 0;
  let scroller: HTMLElement = el;
  while (el) {
    scroller = el;
    const rect = el.getBoundingClientRect();
    offsetTop += el.offsetTop;
    offsetLeft += el.offsetLeft;
    top = rect.top;
    bottom = rect.bottom;
    left = rect.left;
    right = rect.right;
    el = el.offsetParent as HTMLElement;
  }

  return { offsetLeft, offsetTop, top, bottom, left, right, scroller };
}

function handleContextMenu(e: MouseEvent) {
  let stop = false;
  let $target = e.target as HTMLElement;
  let contextMenu: string | null;

  do {
    contextMenu = $target.getAttribute("data-context-menu");
    if (contextMenu != null) {
      stop = true;
    } else {
      if ($target.tagName === "BODY") {
        stop = true;
      } else {
        $target = $target.parentElement as HTMLElement;
      }
    }
  } while (stop === false);
  if (contextMenu != null) {
    e.preventDefault();
    showMenu.value = true;
    nextTick().then(() => {
      if ($menu.value != null) {
        // 获取滚动容器
        const { scroller: container, top } = getDistanceToContainer(
          $menu.value
        );
        // 获取鼠标位置
        const containerRect = container.getBoundingClientRect();
        // 滚动条水平方向滚动距离
        const scrollLeft = container.scrollLeft;
        // 滚动条垂直方向滚动距离
        const scrollTop = Math.abs(top);
        // 菜单的最终距离为鼠标位置 + 滚动距离
        let menuTop = e.clientY + scrollTop;
        let menuLeft = e.clientX + scrollLeft;
        const menuRect = $menu.value.getBoundingClientRect();
        // 如果菜单的右边界超出了容器的右边界，则将菜单的右边界限制在容器的右边界
        const maxWidth = Math.floor(containerRect.width - menuRect.width);
        if (menuLeft > maxWidth) {
          menuLeft = maxWidth;
        }
        // 如果菜单的底部超出了容器的底部，则将菜单的底部限制在容器的底部
        const maxHeight = Math.floor(containerRect.height - menuRect.height);
        console.log(scrollTop);
        if (menuTop > maxHeight) {
          menuTop = maxHeight;
        }
        // 如果菜单的左边界超出了容器的左边界，则将菜单的左边界限制在容器的左边界
        // 解决滚动内容后右键菜单显示在底部问题
        if (e.clientY + menuRect.height < containerRect.height) {
          menuTop = e.clientY;
        } else {
          console.log("over");
        }
        if (menuTop < maxHeight) {
          menuTop = e.clientY;
        }
        menuStyle.value = {
          top: `${menuTop}px`,
          left: `${menuLeft}px`,
        };
      }
    });
  } else {
    console.log(contextMenu);
  }
}

onMounted(() => {
  document.addEventListener("contextmenu", handleContextMenu);
});

onUnmounted(() => {
  document.removeEventListener("contextmenu", handleContextMenu);
});
</script>

<style lang="less">
.context-menu {
  list-style: none;
  margin: 0;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 30;
  width: 200px;
  background-color: #ffffff;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.07);
  padding: 5px;
  border-radius: 5px;

  li {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 7px;
    cursor: pointer;
    position: relative;
    &:not(:first-child) {
      margin-top: 5px;
    }
  }
}

.context-menu .context-menu {
  top: 0;
  left: 100%;
  display: none;
}
.context-menu li:hover {
  background-color: rgba(0, 0, 0, 0.07);
}
.context-menu li:hover .context-menu {
  display: block;
}
</style>
