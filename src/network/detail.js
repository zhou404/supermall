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
    // 商品描述
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
    // 加入购物车时的商品价格
    this.realPrice = itemInfo.lowNowPrice
  }
}

//店铺信息整合
export class Shop {
  constructor(shopInfo) {
    //店铺名称
    this.logo = shopInfo.shopLogo
    //店铺名称
    this.name = shopInfo.name
    //
    this.fans = shopInfo.cFans
    this.sells = shopInfo.cSells
    //店铺评分
    this.score = shopInfo.score
    //店铺商品数量
    this.goodsCount = shopInfo.cGoods
    //商品地址
    this.shopUrl =shopInfo.shopUrl
  }
}

//商品参数信息整合
export class GoodsParam {
  constructor(info, rule) {
    // 注：images可能没有值（某些商品有值，某些没有）
    this.image = info.images ? info.images[0] : ''
    this.infos = info.set
    this.sizes = rule.tables
  }
}

//获取推荐商品信息
export function getRecommendData() {
  return request({
    url: '/recommend'
  })
}

