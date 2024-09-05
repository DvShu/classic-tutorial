/**
 * 检查浏览器是否支持联系人功能
 *
 * 该函数通过检查Navigator对象中是否存在contacts属性来判断浏览器是否支持联系人功能
 * Navigator对象包含有关浏览器的信息，通过检查其属性，我们可以确定当前浏览器是否支持某些特定功能
 *
 * @returns 返回一个布尔值，表示浏览器是否支持联系人功能
 */
export function isSupport() {
  return "contacts" in navigator;
}

export async function getContactsData() {
  if (isSupport()) {
    try {
      // 指定读取哪些信息
      const props = ["tel", "name", "email", "icon", "address"];
      // @ts-ignore
      const contacts = await navigator.contacts.select(props);
    } catch (error) {
      console.log(error);
    }
  }
}
