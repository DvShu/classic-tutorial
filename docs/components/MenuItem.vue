<template>
  <li :data-action="action">
    <span>{{ name }}</span>
    <template v-if="children && children.length > 0">
      <Icon icon="ic:round-keyboard-arrow-right"></Icon>
      <ul class="context-menu">
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
import { Icon } from "@iconify/vue";

interface MenuItem {
  name: string;
  action: string;
  children?: MenuItem[];
}

defineProps<{
  name: string;
  action: string;
  children?: MenuItem[];
}>();
</script>

<style></style>
