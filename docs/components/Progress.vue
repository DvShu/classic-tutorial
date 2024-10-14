<template>
  <div
    class="nt-progress"
    :style="styls"
    @mousemove="handleMove"
    @mouseup="handleUp"
    @mouseleave="handleLeave"
  >
    <div
      class="nt-progress-handle"
      @mousedown="handleCircleDown"
      @mouseup="handleCircleUp"
    ></div>
  </div>
</template>

<script setup lang="ts">
import { ref } from "vue";

let _t: number;
const percent = ref(0);

const styls = ref({
  "--nt-progress-percent": 0,
});

let allowMove = false;

function handleCircleDown() {
  allowMove = true;
}

function handleCircleUp() {
  allowMove = false;
}

function changePercent(offsetX: number, progressEl: HTMLDivElement) {
  const rect = progressEl.getBoundingClientRect();
  const progressWidth = rect.width;
  const progressLeft = rect.left;
  let p = Number(((offsetX - progressLeft) / progressWidth).toFixed(2));
  p = Math.min(1, Math.max(0, p));
  percent.value = p;
  styls["value"]["--nt-progress-percent"] = p;
}

function leaveDebounce(offsetX: number, progressEl: HTMLDivElement) {
  clearTimeout(_t);
  _t = setTimeout(() => {
    allowMove = false;
    changePercent(offsetX, progressEl);
  }, 300) as unknown as number;
}

function handleMove(e: MouseEvent) {
  if (allowMove) {
    changePercent(e.clientX, e.currentTarget as HTMLDivElement);
  }
}

function handleLeave(e: MouseEvent) {
  if (allowMove) {
    leaveDebounce(e.clientX, e.currentTarget as HTMLDivElement);
    allowMove = false;
  }
}

function handleUp(e: MouseEvent) {
  changePercent(e.clientX, e.currentTarget as HTMLDivElement);
  allowMove = false;
}
</script>

<style lang="less">
.nt-progress {
  --nt-progress-height: 4px;
  --nt-progress-percent: 0;
  --nt-progress-inner-color: #ffc069;
  width: 100%;
  height: var(--nt-progress-height);
  background-color: rgba(0, 0, 0, 0.2);
  border-radius: calc(var(--nt-progress-height) / 2);
  cursor: pointer;
  position: relative;

  &::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: var(--nt-progress-inner-color);
    transform: scaleX(var(--nt-progress-percent));
    transform-origin: left;
    border-radius: calc(var(--nt-progress-height) / 2);
  }
  &:hover {
    background-color: rgba(0, 0, 0, 0.3);
  }

  .nt-progress-handle {
    --nt-progress-handle-size: 10px;
    position: absolute;
    top: calc(
      (var(--nt-progress-handle-size) - var(--nt-progress-height)) / 2 * -1
    );
    // left: calc(var(--nt-progress-handle-size) / 2 * -1);
    left: calc(
      (var(--nt-progress-percent) * 100% - var(--nt-progress-handle-size) / 2)
    );
    border-radius: 50%;
    width: var(--nt-progress-handle-size);
    height: var(--nt-progress-handle-size);
    display: flex;
    justify-content: center;
    align-items: center;
    border: 1px solid #dedede;
    background-color: #ffffff;
    transition:
      border-color 0.3s ease-in-out,
      width 0.3s ease-in-out;
    &::after {
      content: "";
      display: block;
      width: calc(var(--nt-progress-handle-size) / 2);
      height: calc(var(--nt-progress-handle-size) / 2);
      border: 1px solid;
      color: var(--nt-progress-inner-color);
      border-radius: 50%;
    }

    &:hover {
      --nt-progress-handle-size: 14px;
      border-color: var(--nt-progress-inner-color);
    }
  }
}
</style>
