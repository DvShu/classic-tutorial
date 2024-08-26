# ContextMenu 右键菜单

右键菜单（即上下文菜单）常用于提供用户在特定区域或元素上进行快速操作的选项

<script setup>
  import "../styles/context_menu.css"
  import FileIcon from '../components/FileIcon.vue'
  import ContextMenu from '../components/ContextMenu.vue'

  function fileType(name, ftype) {
    if (ftype === 1) {
      return 1;
    } else if (name === '.gitignore') {
      return 3;
    } else if (name === 'LICENSE') {
      return 2;
    } else if (name.endsWith('.md')) {
      return 6;
    } else if (name.endsWith('.json')) {
      return 4;
    } else if (name.endsWith('.yaml')) {
      return 5;
    }
    return 0;
  }

  function fileTypeText(name, ftype) {
    if (ftype === 1) {
      return '文件夹';
    } else if (name === '.gitignore') {
      return 'gitignore';
    } else if (name === 'LICENSE') {
      return 'LICENSE';
    } else if (name.endsWith('.md')) {
      return 'Markdown 源文件';
    } else if (name.endsWith('.json')) {
      return 'JSON 文件';
    } else if (name.endsWith('.yaml')) {
      return 'Yaml 源文件';
    }
    return '文本文件';
  }

  const files = [{
    type: 1,
    name: '.github',
    updateTime: '2024/8/22 17:43'
  }, {
    type: 1,
    name: 'docs',
    updateTime: '2024/8/23 12:00'
  }, {
    type: 1,
    name: 'node_modules',
    updateTime: '2024/8/23 15:18'
  }, {
    type: 0,
    name: '.gitignore',
    updateTime: '2024/8/22 17:51',
    size: '1KB'
  }, {
    type: 0,
    name: 'LICENSE',
    updateTime: '2024/8/22 17:43',
    size: '2KB'
  }, {
    type: 0,
    name: 'package.json',
    updateTime: '2024/8/23 15:18',
    size: '1KB'
  }, {
    type: 0,
    name: 'pnpm-lock.yaml',
    updateTime: '2024/8/23 15:18',
    size: '56KB'
  }, {
    type: 0,
    name: 'README.md',
    updateTime: '2024/8/22 17:51',
    size: '1KB'
  }, {
    type: 0,
    name: 'tsconfig.json',
    updateTime: '2024/8/22 17:43',
    size: '1KB'
  }]
</script>

## 演示

<table class="file-table">
  <thead>
    <tr>
      <th>名称</th>
      <th>修改日期</th>
      <th>类型</th>
      <th>大小</th>
    </tr>
  </thead>
  <tbody data-context-menu>
    <tr v-for="file in files" :key="file.name" :data-context-menu="file.type">
      <td>
        <FileIcon 
          :type="fileType(file.name, file.type)"
          :class="['file-type-icon', 'file-icon' + file.type]"
        ></FileIcon>
        <span class="file-name">{{ file.name }}</span>
      </td>
      <td>{{ file.updateTime }}</td>
      <td>{{ fileTypeText(file.name, file.type) }}</td>
      <td>{{ file.size }}</td>
    </tr>
  </tbody>
</table>
<ContextMenu></ContextMenu>

## 代码

### 简单说明

1. 代码主要通过 `vue` 渲染的
2. 渲染子菜单[`MenuItem`]时，使用递归组件
3. 通过注册 `contextmenu` 来实现右键菜单
4. 有滚动条时，上下文菜单的位置为: `scrollTop + e.clientY`
5. 要判断上下文菜单是否在屏幕内, 做位置调整: `maxHeight = scrollTop + window.innerHeight - 15 - menuHeight`
6. 在注册点击菜单外关闭菜单时，要加 `capture: true` 捕获事件, 因为冒泡事情有可能会因为子事件停止冒泡而接收不到事件
7. 事件的注册与删除参数必须保持一致

### 代码片段

主要代码如下：

::: code-group

```js [js]
// 获取滚动容器
const container = document.documentElement;
// 获取鼠标位置
const containerRect = container.getBoundingClientRect();
// 滚动条水平方向滚动距离
const scrollLeft = container.scrollLeft;
// 滚动条垂直方向滚动距离
const scrollTop = container.scrollTop;
// 菜单的最终距离为鼠标位置 + 滚动距离
let menuTop = e.clientY + scrollTop;
let menuLeft = e.clientX + scrollLeft;
const menuRect = $menu.value.getBoundingClientRect();
// 如果菜单的右边界超出了容器的右边界，则将菜单的右边界限制在容器的右边界
const maxWidth = Math.floor(
  scrollLeft + window.innerWidth - 15 - menuRect.width
);
if (menuLeft > maxWidth) {
  menuLeft = menuLeft - menuRect.width;
}
// 如果菜单的底部超出了容器的底部，则将菜单的底部限制在容器的底部
// 同上判断宽度边界...
menuStyle.value = {
  top: `${menuTop}px`,
  left: `${menuLeft}px`,
};

// 事件处理
onMounted(() => {
  document.addEventListener("contextmenu", handleContextMenu);
  document.addEventListener("click", handleClickoutside, { capture: true });
});

onUnmounted(() => {
  document.removeEventListener("contextmenu", handleContextMenu);
  // 注意一定要加: capture: true, 事件的注册与删除参数必须保持一致
  document.removeEventListener("click", handleClickoutside, { capture: true });
});
```

```css [css]
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
}
.context-menu li:hover {
  background-color: rgba(0, 0, 0, 0.07);
}
```

```vue [MenuItem.vue]
<template>
  <li
    :data-action="action"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleMenuClick"
  >
    <span>{{ name }}</span>
    <template v-if="children && children.length > 0">
      <Icon icon="ic:round-keyboard-arrow-right"></Icon>
      <ul
        ref="$submenu"
        class="context-menu"
        v-show="showSubmenu"
        :style="submenuStyle"
      >
        <MenuItem
          v-for="child in children"
          :key="child.action"
          :name="child.name"
          :action="child.action"
          :children="child.children"
        ></MenuItem>
      </ul>
    </template>
  </li>
</template>
```

```json [data.json]
// 菜单数据
[
  { "name": "复制", "action": "copy" },
  { "name": "剪切", "action": "cut" },
  { "name": "删除", "action": "delete" },
  { "name": "打开", "action": "open" },
  {
    "name": "打开方式",
    "action": "openWith",
    "children": [
      {
        "name": "notepad",
        "action": "notepad"
      },
      {
        "name": "计算本",
        "action": "text"
      }
    ]
  },
  {
    "name": "新建",
    "action": "new",
    "children": [
      {
        "name": "文件夹",
        "action": "folder"
      },
      {
        "name": "文本文件",
        "action": "file"
      },
      {
        "name": "Word 文档",
        "action": "doc"
      },
      {
        "name": "PowerPoint 演示文稿",
        "action": "ppt"
      }
    ]
  }
]
```

:::

> 对于源码, 请参考 [classic-tutorial](https://github.com/DvShu/classic-tutorial) 工程目录下: `docs/components/[ContextMenu.vue,MenuItem.vue]`
