/**
 * 处理图片静态资源
 * @param {string} imgUrlStr 图片url 相对路径
 * @returns href
 */
export const getImgUrl = (imgUrlStr: string | URL) => {
  return new URL(`/src/assets/images/${imgUrlStr}`, import.meta.url).href;
};