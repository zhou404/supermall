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

//商品信息数据整合
export class GoodsInfo {
  // 需要传入的参数
  constructor(itemInfo, columns, services) {
    // 商品标题
    this.title = itemInfo.title
    // 商品
    this.desc = itemInfo.desc
    // 新的价格
    this.newPrice = itemInfo.price
    // 旧的价格
    this.oldPrice = itemInfo.oldPrice
    // 打折信息
    this.discount = itemInfo.discountDesc
    // 打折信息bgc
    this.discountBgColor = itemInfo.discountBgColor
    // 销量、收藏
    this.columns = columns
    // 保障信息
    this.services = services
    //
    this.realPrice = itemInfo.lowNowPrice
  }
}
