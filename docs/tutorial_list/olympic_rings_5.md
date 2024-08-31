# 奥运5环

## 演示

<script>
  import '../styles/olympics_rings_5.css'
</script>

<div class="rings-container">
  <div class="rings-item blue"></div>
  <div class="rings-item black"></div>
  <div class="rings-item red"></div>
  <div class="rings-item yellow"></div>
  <div class="rings-item green"></div>
</div>

## 代码

### 简单说明

其实看似是5个圆环实际是10个圆环，因为每一个圆环都是由两个重叠的圆环组成。重叠部分通过设置`z-index`来以及对应部分的边框颜色控制控制。

例如，蓝色圆环和黄色圆环, 右边部分是蓝色在中间，下边部分是黄色在上边. 实际是黄色圆环在两个蓝色圆环的中间, 然后通过最上层的蓝色圆环的底部边框为透明色就能实现此效果

> 关键是利用 `z-index` 的层叠, 以及通过 `border-color: transparent` 来设置重叠部分想要边框颜色为透明色。

::: code-group

```html [HTML]
<div class="rings-container">
  <div class="rings-item blue"></div>
  <div class="rings-item black"></div>
  <div class="rings-item red"></div>
  <div class="rings-item yellow"></div>
  <div class="rings-item green"></div>
</div>
```

```css [CSS]
.rings-container {
  position: relative;
  height: 90px;
}

.rings-item,
.rings-item::after {
  --olympics-ring-size: 80px;
  --olympics-ring-border-size: 3px;
  width: var(--olympics-ring-size);
  height: var(--olympics-ring-size);
  border: var(--olympics-ring-border-size) solid;
  border-radius: 50%;
  position: absolute;
  box-sizing: border-box;
}
.rings-item::after {
  content: "";
  /*相对于父级定位，但不包括border，所以利用负边距使他们重合*/
  left: calc(-1 * var(--olympics-ring-border-size));
  top: calc(-1 * var(--olympics-ring-border-size));
}
.blue {
  border-color: blue;
  top: 0;
  left: 0;
}
.blue::after {
  border-color: blue;
  z-index: 1;
  border-bottom-color: transparent; /*将下边框设为透明，使看到的为黄色环 以下同理*/
}
.black {
  border-color: black;
  top: 0;
  left: calc(var(--olympics-ring-size) + 10px);
}
.black::after {
  border-color: black;
  z-index: 1;
  border-left-color: transparent;
}
.red {
  border-color: red;
  top: 0;
  left: calc((var(--olympics-ring-size) + 10px) * 2);
}
.red::after {
  border-color: red;
  z-index: 1;
  border-left-color: transparent;
}
.yellow {
  border-color: yellow;
  top: 44px;
  left: 44px;
}
.yellow::after {
  border-color: yellow;
}
.green {
  border-color: green;
  top: 44px;
  left: 134px;
}
.green::after {
  border-color: green;
  z-index: 1;
  border-top-color: transparent;
  border-right-color: transparent;
}
```

:::
