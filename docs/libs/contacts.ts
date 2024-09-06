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

interface ContactItem {
  /** 联系人地址 */
  address?: string[];
  /** 邮件地址 */
  email?: string[];
  /** 图标 */
  icon?: string[];
  /** 联系人姓名 */
  name?: string[];
  /** 联系电话 */
  tel?: string[];
}

/**
 * 导出一个异步函数，用于获取联系人数据
 *
 * @param propertys 需要获取的联系人属性，默认为 ["tel", "name", "email", "icon", "address"]
 * @param multiple 是否允许选择多个联系人，默认为 false
 *
 * @returns 返回一个 Promise，其中包含联系人数据
 * @throws 如果当前浏览器不支持联系人功能，抛出一个错误
 * @throws 如果发生其他错误，抛出一个错误
 */
export async function getContactsData(
  propertys: (keyof ContactItem)[] = [
    "tel",
    "name",
    "email",
    "icon",
    "address",
  ],
  multiple: false
) {
  // 判断是否支持联系人功能
  if (!isSupport()) {
    throw new Error("-1:当前浏览器不支持联系人功能");
  }

  try {
    // @ts-ignore: 假设 navigator.contacts.select 是浏览器特定的 API，忽略类型检查
    const contacts: ContactItem[] = await navigator.contacts.select(propertys, {
      multiple,
    });

    return contacts;
  } catch (error) {
    // 捕获任何错误并抛出具有适当信息的错误
    throw new Error("2:" + ((error as Error).message || "未知错误"));
  }
}
