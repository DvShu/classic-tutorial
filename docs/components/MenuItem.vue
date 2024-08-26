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

<script setup lang="ts">
import { ref, nextTick } from "vue";
import { Icon } from "@iconify/vue";

interface MenuItem {
  name: string;
  action: string;
  children?: MenuItem[];
}

const props = defineProps<{
  name: string;
  action: string;
  children?: MenuItem[];
}>();

const $submenu = ref<HTMLUListElement>();
const showSubmenu = ref(false);
const submenuStyle = ref({});

function handleMouseEnter(e: MouseEvent) {
  showSubmenu.value = true;
  nextTick().then(() => {
    if ($submenu.value != null) {
      const $target = e.target as HTMLLIElement;
      const rect = $target.getBoundingClientRect();
      const submenuRect = $submenu.value.getBoundingClientRect();
      if (rect.top + submenuRect.height > window.innerHeight - 10) {
        submenuStyle.value = { top: "auto", bottom: 0 };
      } else {
        submenuStyle.value = { top: 0, bottom: "auto" };
      }
    }
  });
}

function handleMouseLeave(e: MouseEvent) {
  showSubmenu.value = false;
}

function handleMenuClick(e: Event) {
  const $target = e.currentTarget as HTMLLIElement;
  const action = $target.getAttribute("data-action");
  if (props.children == null || props.children.length === 0) {
    alert(action);
  }
}
</script>

<style></style>
