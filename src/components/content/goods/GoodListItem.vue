<template>
  <div class="goods-list-item">
    <a @click="GoodsClick">
      <img :src="showImage" @load="itemImageLoad">
      <div class="goods-info">
        <p>{{goodsListItem.title}}</p>
        <span class="price">{{goodsListItem.price}}</span>
        <span class="collect">{{goodsListItem.cfav}}</span>
      </div>
    </a>
  </div>
</template>

<script>
export default {
  name: "GooListItem",
  props: {
    goodsListItem: {
      type: Object,
      default() {
        return {}
      }
    }
  },
  computed: {
    showImage() {
      return this.goodsListItem.image || this.goodsListItem.show.img
    }
  },
  methods: {
    itemImageLoad() {
      // 当我们在商品详情页的时候，下面的推荐商品也是需要进行监听->发出事件->刷新的
      // 区别于home页的刷新和detail页的刷新
      if (this.$route.path.indexOf('/home')) {
        // 判断当前页是不是home页，是则向home页发出事件
        this.$bus.$emit('homeItemImgLoad')
      } else if (this.$route.path.indexOf('/detail')) {
        // 判断当前页是不是detail页，是则向detail页发出事件
        this.$bus.$emit('detailItemImgLoad')
      }
      // 以上是第一种方法，这里是使用两种不同的事件，根据条件发出
      // 第二种方法，还是使用同一个事件，也就是说图片加载完毕之后都是发出同一个事件，
      // 当我们离开home页的时候，取消掉home页中对全局事件的监听(this.$bus.$off(事件名称, 需要取消执行的函数))
      // 然后在detail.vue中也是同样的操作，这里只是在home.vue中进行了编写和说明，detail.vue中同理，
      // 唯一不同的是detail.vue取消了keep-alive，所以deactivated()不会执行，但是destroyed()会执行，将代码移动到后者就行
      // 详情看home.vue deactivated 中的方法
    },
    GoodsClick() {
      // push()是可以返回上一个页面
      this.$router.push('/detail/' + this.goodsListItem.iid)

    }
  }
}
</script>

<style scoped>

.goods-list-item {
  padding-bottom: 40px;
  position: relative;

  width: 48%;
}

.goods-list-item img {
  width: 100%;
  height: 98%;
  border-radius: 5px;
}

.goods-info {
  font-size: 12px;
  position: absolute;
  bottom: 5px;
  left: 0;
  right: 0;
  overflow: hidden;
  text-align: center;
}

.goods-info p {
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  margin-bottom: 3px;
}

.goods-info .price {
  color: var(--color-high-text);
  margin-right: 20px;
}

.goods-info .collect {
  position: relative;
}

.goods-info .collect::before {
  content: '';
  position: absolute;
  left: -15px;
  top: -1px;
  width: 14px;
  height: 14px;
  background: url("~assets/img/common/collect.svg") 0 0/14px 14px;
}
</style>
