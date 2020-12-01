// 工具类
// 刷新频繁的防抖动函数处理
// 参数：需要做防抖动处理的函数、延迟时间
export function debounce(func, delay) {
  let timer = null
  return function (...args) {
    if (timer) clearTimeout(timer)
    timer = setTimeout(() => {
      func.apply(this, args)
    }, delay)
  }
}
