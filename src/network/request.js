import axios from 'axios'

// 最终封装方案
export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://123.207.32.32:8000',
    timeout: 5000
  })

  // 2.axios的拦截器（请求拦截）
  instance.interceptors.request.use(config => {
    // 请求成功
    // console.log(config)
    // 应用场景：
    // 1.比如config中的一些信息不符合服务器的要求
    // 2.比如每次发送网络请求时，都希望在界面中显示一个请求的图标
    // 3.某些网络请求（比如登录），必须携带一些特殊的信息（token）才能发送请求
    // 拦截之后会把结果配置留下，必须要返回
    return config;
  }, error => {
    // 请求失败
    return Promise.reject(error);
  });

  // 2.axios的拦截器（响应拦截）
  instance.interceptors.response.use(response => {
    // 服务器响应成功，并返回结果
    // response中有data
    return response;
  }, error => {
    // 服务器返回失败
    return Promise.reject(error);
  });

  // 3.发送真正的网络请求
  return instance(config)
}


