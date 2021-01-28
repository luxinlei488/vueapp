<template>
  <div>
    <ul class="tv-list">
      <li class="tv-item" v-for="item in tvList" 
      :key="item.id"
      @click="getDetail(item.id)">
        <div class="img-box">
          <img :src="'https://images.weserv.nl/?url=' + item.cover.url" alt />
        </div>
        <div class="content">
          <h3>{{ item.title }}</h3>
          <p>{{ item.info }}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // name:'Tv',
  data() {
    return {
      tvList:[],
      start: 0,
      isFinish:true,
    };
  },
  created() {
    this.getData();
  },
  mounted() {
    this.lazyLoad();
  },
  methods: {
    /*跨域问题：网页地址与接口地址（协议，域名，端口号）浏览器同源策略 
    解决：jsonp,后端帮助配置（cors），=第三方服务器代理
    */
    getData() {
      if (this.isFinish) {
        this.isFinish = false;
      }
      // 用v2
      let baseUrl = "https://bird.ioliu.cn/v2?url=";
      let tvUrl =
        "https://m.douban.com/rexxar/api/v2/subject_collection/tv_domestic/items?os=ios&for_mobile=1&start=0&count=18";
      this.axios
        .get(baseUrl + tvUrl,
        {
          params:{
            start:this.start,
            count:10,
        },
        }
        )
        .then((res) => {
          // this.tvList=res.data.subject_collection_items;
          this.tvList=this.tvList.concat(res.data.subject_collection_items);
          this.isFinish = true;
        })
        .catch((err) => console.log(err));
    },
    lazyLoad(){
      // 页面高度
      let htmlDom = document.documentElement;
      let fullHeight = 0;
      // 设备高度
      let deviceH = htmlDom.clientHeight;
      // 滚动出去的距离
      let scrollT = 0;
      window.onscroll = function(){
        fullHeight = htmlDom.offsetHeight;
        scrollT = htmlDom.scrollTop;
        // 滚动到底部
        if(fullHeight == deviceH + scrollT){
          if(this.start<40){
            this.start += 10;
            this.getData();
          }
          // 请求下一页数据
        }
      };
    },
    // 跳转详情页
    getDetail(id){
      this.$router.push('/tvDetail/'+id);
    },
  },
};
</script>

<style lang="scss" scoped>
.tv-list {
  .tv-item {
    display: flex;
    padding: 10px;
    border-bottom: 1px solid #cccccc;
    .img-box {
      flex: 4;
      img {
        width: 100%;
        height: 100%;
      }
    }
    .content {
      flex: 5;
      padding: 1rem;
      text-align: center;
      display: flex;
      flex-direction: column;
      justify-content: space-between;

      h3 {
        font-weight: bold;
        margin-bottom: 0.4rem;
      }
    }
  }
}
</style>