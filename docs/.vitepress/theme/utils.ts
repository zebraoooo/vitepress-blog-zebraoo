/**
 * 获取 URL 路径中的指定参数
 *https://github.com/Charles7c/charles7c.github.io/blob/main/docs/.vitepress/theme/utils.ts
 * @param paramName 参数名
 * @returns 参数值
 */
export function getQueryParam(paramName) {
    const reg = new RegExp("(^|&)"+ paramName +"=([^&]*)(&|$)");
    let value = decodeURIComponent(window.location.search.substr(1)).match(reg);
    if (value != null) {
      return unescape(value[2]);
    } 
    return null;
  }