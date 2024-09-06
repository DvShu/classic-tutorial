# 手机联系人

使用JavaScript读取手机联系人列表

## 演示

<script setup>
  import '../styles/phone_contacts.css'
  import { getContactsData } from '../libs/contacts'
  import { ref } from 'vue'
 
  const errMsg = ref('');
  const contacts = ref('');

  async function handleGetContacts() {
    try {
      const data = await getContactsData();
      contacts.value = JSON.stringify(data, null, 2);
    } catch (error) {
      errMsg.value = error.message;
    }
  }
</script>

<button @click="handleGetContacts">读取联系人</button>

<hr />

<div>
  <span v-if="errMsg !== ''" class="color-red">{{ errMsg }}</span>
  <div>{{ contacts }}</div>
</div>

## 代码

### 简单说明

> 1. 联系人 `api` 运行在安全模式(`https`)下
> 2. 通过 `"contacts" in navigator` 判断浏览器是否支持该特性
> 3. `await navigator.contacts.select()` 打开联系人选择器，返回选中列表

```javascript
function isSupport() {
  return "contacts" in navigator;
}

const contacts: ContactItem[] = await navigator.contacts.select(propertys, {
  multiple,
});
```

> 对于源码, 请参考 [classic-tutorial](https://github.com/DvShu/classic-tutorial) 工程目录下: `docs/libs/contacts.ts`
