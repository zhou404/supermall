// 取别名
const path = require("path");
function resolve(dir) {
  return path.join(__dirname, dir);
}


module.exports = {
  configureWebpack: {
    resolve: {
      alias: {    // 这里 使用 "@/assets" 会报错
        assets: resolve("src/assets"),
        components: resolve("src/components"),
        views: resolve("src/views"),
      }
    }
  },
}
