<template>
  <Teleport to="body">
    <div></div>
  </Teleport>
</template>

<script setup lang="ts">
import { onMounted, onUnmounted } from "vue";

function handleContextMenu(e: Event) {
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
