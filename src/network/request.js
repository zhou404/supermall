import axios from 'axios'

// 最终封装方案
export function request(config) {
  // 1.创建axios的实例
  const instance = axios.create({
    baseURL: 'http://152.136.185.210:7878/api/m5',
    timeout: 5000
  })

  // 2.axios的拦截器（请求拦截）
  instance.interceptors.request.use(config => {
    return config;
  }, error => {
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


