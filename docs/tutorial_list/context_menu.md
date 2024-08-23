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

## 效果

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
