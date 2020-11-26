import {request} from "@/network/request";

//请求轮播图、推荐数据
export function getHomeMultidata() {
  return request({
    url: '/home/multidata'
  })
}

//请求商品数据
export function getHomeGoods(type, page) {
  return request({
    url: '/home/data',
    params: {
      type,
      page
    }
  })
}
