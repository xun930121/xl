<template>
  <div>
    <nav-header></nav-header>
    <nav-bread>{{goods}}</nav-bread>
    <div class="accessory-result-page accessory-page">
      <div class="container">
        <div class="filter-nav">
          <span class="sortby">排序方式:</span>
          <a href="javascript:void(0)" class="default" :class="{'cur':sortord}" @click="defaultGoods(false)">默认</a>
          <a href="javascript:void(0)" class="price" :class="{'cur':!sortord}" @click="sortGoods">{{price1}}
            <svg class="icon icon-arrow-short">
              <use xlink:href="#icon-arrow-short"></use>
            </svg>
          </a>
          <a href="javascript:void(0)" class="filterby stopPop">筛选条件：</a>
        </div>
        <div class="accessory-result">
          <!-- filter -->
          <div class="filter stopPop" id="filter">
            <dl class="filter-price">
              <dt>价格</dt>
              <dd>
                <a href="javascript:void(0)" @click="setPriceFilter('all')" :class="{'cur':priceChecked == 'all'}">全部</a>
              </dd>
              <dd v-for="(price, index) in priceFilter">
                <a href="javascript:void(0)" @click="setPriceFilter(index)" :class="{'cur':priceChecked == index}">{{price.startPrice}} - {{price.endPrice}}</a>
              </dd>

            </dl>
          </div>

          <!-- search result accessories list -->
          <div class="accessory-list-wrap">
            <div class="accessory-list col-4">
              <ul>
                <li v-for="item in GoodsList">
                  <div class="pic">
                    <a href="#"><img v-lazy="item.productImage" alt=""></a>
                  </div>
                  <div class="main">
                    <div class="name">{{item.productName}}</div>
                    <div class="price">￥{{item.salePrice}}</div>
                    <div class="btn-area">
                      <a href="javascript:;" class="btn btn--m" @click="addCart(item.productId)">加入购物车</a>
                    </div>
                  </div>
                </li>
              </ul>
              <div v-infinite-scroll="loadMore" infinite-scroll-disabled="busy" infinite-scroll-distance="20">

              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- 未登录的情况下 -->
      <modal :mdShow='mdShow'>
        <button slot="btnClose" class="md-close" @click="mdShow = false">close</button>
        <p slot="message">请先登录，否则无法加入购物车</p>
        <div slot="btnGroup">
          <a href="javascript:;" class="btn-login" @click="mdShow = false">关闭</a>
        </div>
      </modal>

      <!-- 成功的情况下 -->

      <modal :mdShow="mdShowCart">
        <button slot="btnClose" class="md-close" @click="mdShowCart = false">close</button>
        <p slot="message">加入购物车成功</p>
        <div slot="btnGroup">
          <a href="javascript:;" class="btn btn--m" @click="mdShowCart = false">继续购物</a>
          <router-link class="btn btn--m" to="/cart">查看购物车</router-link>
        </div>
      </modal>
    </div>
  <nav-footer></nav-footer>
  </div>
</template>

<script>
  import axios from 'axios'
  import NavHeader from '@/components/Header'
  import NavFooter from '@/components/Footer'
  import NavBread from '@/components/NavBread'
  import Modal from '@/components/Modal'

  export default {
    name: 'GoodsList',
    data() {
      return {
        GoodsList: Array,
        sortFlag: true,
        busy: true,
        page: 1,
        sortord: true,
        pagesize: 12,
        goods: '商品',
        price1: '从低到高 ↑',
        priceChecked: 'all',
        mdShow: false,
        mdShowCart: false,
        priceFilter: [{
            startPrice: '1.00',
            endPrice: '500.00'
          },
          {
            startPrice: '500.00',
            endPrice: '1000.00'
          },
          {
            startPrice: '1000.00',
            endPrice: '5000.00'
          },
          {
            startPrice: '5000.00',
            endPrice: '以上'
          }
        ]
      }
    },
    components: {
      NavHeader,
      NavFooter,
      NavBread,
      Modal
    },
    mounted: function() {
      this.defaultGoods()
    },
    methods: {
      showGoods(flag, sortMode) {
        let param = {
          sort:sortMode,
          priceLevel: this.priceChecked,
          page: this.page,
          pagesize: this.pagesize
        }
        axios.get("/goods/list", {
          params: param
        }).then((result) => {
          // console.log(result)
          let res = result.data;
          if(res.status === '0') {
            if(flag) {
              this.GoodsList = this.GoodsList.concat(res.result);
              console.log(res.result)
              if(res.result.length === 0) {
                this.busy = true;
              } else {
                this.busy = false;
              }
            } else {
              this.GoodsList = res.result;
              this.busy = false;
            }
          } else {
            alert('系统繁忙')
          }
        })
      },
      getGoodsList(flag) {
        this.showGoods(flag, this.sortFlag ? 1 : -1)
      },
      // 排序商品信息
      sortGoods() {
      	if (this.sortFlag) {
      		this.price1 = '从高到低 ↓'
      	} else {
      		this.price1 = '从低到高 ↑'
      	}
        this.sortFlag = !this.sortFlag;
        this.sortord = false;
        this.getGoodsList(false);
        this.page = 1;
      },
      // 默认不排序商品信息
      defaultGoods(flag) {
        this.sortord = true;
        this.showGoods(flag, 0)
      },
      // 价格分区
      setPriceFilter(index) {
      	this.page = 1;
        this.priceChecked = index;
        this.defaultGoods();
      },
      // 添加购物车
      addCart(productId) {
        axios.post('/goods/addCart',{ productId }).then( (result) => {
        	let res = result.data
        	if (res.status === '0') {
            this.mdShowCart = true;
        		console.log(res.msg);
        	} else{
            this.mdShow = true;
        		console.log(res.msg);
        	}
        })
      },
      // 懒加载
      loadMore() {
        this.busy = true;
        setTimeout(() => {
          this.page++;
          if (this.sortord) {
            this.defaultGoods(true);
          } else {
            this.getGoodsList(true);
          }
        }, 1000);
      },
      //
      closeModal () {
        this.mdShow = false
      }
    }
  }
</script>

<style>

</style>
