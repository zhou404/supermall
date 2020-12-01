import {request} from "@/network/request";

//请求商品详情页数据
export function getDetailData(iid) {
  return request({
    url: '/detail',
    params: {
      iid
    }
  })
}
