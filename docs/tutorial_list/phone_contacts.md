# 手机联系人

使用JavaScript读取手机联系人列表

## 演示

<script setup>
  import '../styles/phone_contacts.css'
  import { isSupport } from '../libs/contacts'
  import { ref } from 'vue'
 
  const errMsg = ref('')

  function handleGetContacts() {
    if (!isSupport()) {
      errMsg.value = '当前设备不支持读取联系人'
    }
  }
</script>

<button @click="handleGetContacts">读取联系人</button>

<hr />

<div>
  <span v-if="errMsg !== ''" class="color-red">{{ errMsg }}</span>
</div>
