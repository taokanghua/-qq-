<template>
  <div class="discover-item" @click="addlook" :data-uniq="item.uniq" ref="q">
    <div class="dis-header">
      <div class="dis-left">
        <img :src="item.avatar" alt="" />
        <div class="dis-info">
          <h4>{{ item.name }}</h4>
          <div class="time">
            {{ item.time | timeF }}
            <span>{{ item.personal }}</span>
          </div>
        </div>
      </div>
      <van-icon name="ellipsis" size="1.2rem"/>
    </div>
    <!-- 用户内容栏 -->
    <div class="dis-content">
      <span class="content">{{ item.content }}</span>
      <div class="img-box" ref="imgs" @click="previewImg">
          <img v-lazy="i[0]" alt="" v-for="i in item.imgs" :key="i + ''" />
      </div>
      <p class="device">
        <span class="iconfont icon-iconmorendizhi"></span>{{ item.local }}
      </p>
    </div>
    <!-- 底部点赞 评论栏 -->
    <div class="dis-tools">
      <div class="dis-scan">浏览{{ item.looknum }}次</div>
      <div class="tool">
        <span :class="{'iconfont':true, 'icon-dianzan_active':true, 'zan-active':zan}" @click="dianzan"></span>
        <span class="iconfont icon-message1"></span>
        <span class="iconfont icon-share"></span>
      </div>
    </div>
    <!-- 评论和点赞列表栏 -->
    <div class="dis-commont">
      <div class="goodbox" v-show="item.goods.length > 0">
        <span class="iconfont icon-dianzan_active icon-dianzan"></span>
        <span v-for="a in item.goods" :key="a.id+''">{{ a.name +'. '  }}</span>
        <a href="#" style="font-size:12px">觉得很赞</a>
      </div>
      <div class="comment-box">
        <div class="comment-item" v-for="c in item.comment" :key="c.comment">
          <h4>{{ c.name+':' }}</h4>
          <p>{{c.comment}}</p>
        </div>
        
      </div>
      <div class="edit-comment">
        <input type="text" placeholder="评论..." v-model="comment" @focus="sendbtn=true"/>
        <div class="edit-send" v-show="sendbtn" @click="sendcomment">发送</div>
      </div>
    </div>
  </div>
</template>

<script>
import{ Toast, ImagePreview} from 'vant'
export default {
  data() {
    return {
      num: 0,
      zan: false, //是否点赞
      sendbtn:false, //发送按钮
      comment:'',
    };
  },
  props: ["item"],
  methods: {
    checknum(n) {
      // 设置如果只一张照片 就大屏现实
      this.$nextTick(() => {
        if (n == 1) {
          this.$refs.imgs.className = "sing-img";
        }
      });
    },
    addlook() { // 增加浏览次数
      let uniq = this.$refs.q.getAttribute("data-uniq");
      this.$axios.get("/dynamic/" + uniq);
    },
    async dianzan(){ //点赞  
        let data = {
            uniq: this.$refs.q.getAttribute('data-uniq'),
            id: this.$store.state.userinfo.id,
            name: this.$store.state.baseinfo.nickname
        } 
        this.checkzan()
        if(!this.zan){
          let {data:res} = await this.$axios.post('/dynamic/zan', this.$qs.stringify(data))
          if(res.meta.status == 200){
            this.item.goods.push({id:data.id, name:data.name})
            this.zan = true
          } 
          if(res.meta.status !== 200){Toast('点赞失败')}

        }else{
          Toast('你已经点过赞了')
          return
        }        
    },
    checkzan(){
        this.item.goods.some(item=>{
            if(item.id == this.$store.state.userinfo.id){
                this.zan = true
                return true
            }
        })
    },
    async sendcomment(){ //发送评论
      if(this.comment == '') {
        Toast('内容不能为空哦')
        return
      }
      let data = {
        id: this.$store.state.userinfo.id,
        name: this.$store.state.baseinfo.nickname,
        comment: this.comment,
        uniq: this.$refs.q.getAttribute("data-uniq")
      }
      console.log(data)
      let {data:res} = await this.$axios.post('/postcomment', this.$qs.stringify(data))
      if(res.meta.status == 200){
        Toast('评论成功！')
        this.item.comment.push(data)
      }
      this.comment = ''
    },
    previewImg(){ //图片预览
      let imgs = this.item.imgs.map(i=>i[0])
      ImagePreview(imgs)
    }
  },
  created() {
    this.num = this.item.imgs.length;
    this.checknum(this.num);
    this.checkzan()
  },
  filters: {
    timeF(n) {

      let date = new Date(n); //说说的时间

      let h = date
        .getHours()
        .toString()
        .padStart(2, "0");
      let m = date
        .getMinutes()
        .toString()
        .padStart(2, "0");
      let yue = date.getMonth() + 1;
      let ri = date.getDate();

        return `${yue}月${ri}日 ${h}:${m}`;

    },
  },
  components:{
    [ImagePreview.Component.name]: ImagePreview.Component
  }
};
</script>

<style lang="less">
.dicover-con{
  padding:8px 6px 47px 6px;
  overflow: auto;
  background-color: #fff;
  .discover-item{
    text-align: left;
    margin-bottom: 15px;
    .dis-header{
      display: flex;
      justify-content: space-between;
      .dis-left{
        display: flex;
        align-items: center;
        img{
          width: 45px;
          height: 45px;
          border-radius: 50%;
          box-shadow: 0 0 2px 1px #ccc;
        }
        .dis-info{
          text-align: left;
          margin-left: 10px;
          color: #404553;
          h4{
            margin: 0;
            font-size: 14px;
          }
          .time{
            font-size: 12px;
            span{
              margin-left: 8px;
              color: #43BC85;
            }
          }
        }
      }
      .more{
        font-size: 24px;
        color: slategray;
      }
    }
    .dis-content{
      margin-top: 16px;
      font-weight: 600;
      .content{
        width: 100px;
        font-size: 13px;
      }
      .img-box{
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: space-between;
        align-content: space-between;
        &:after{
          content: '';
          width: 32%;
        }
        img{
          width: 32%;
          height: 120px;
          margin-top: 5px;
        }
      }
      
      .device{
        margin-top: 6px;
        font-size: 12px;
        font-weight: bold;
        color: #FF4302;
      }
    }
    .dis-tools{
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #F4F5F9;
      .dis-scan{
        font-size: 12px;
        color: #B3B6BD;
      }
      .tool{
        span{
          font-size: 28px;
          margin-left: 8px;
        }
      }
    }
    .dis-commont{

      .goodbox{
        color: #3E6185;
        span{
          font-size: 13px;
          color: skyblue;
          border-bottom: 1px solid #F4F5F9;
        }
      }
      input{
        width: 100%;
        border: none;
        outline: none;
        padding:3px 0 3px 12px;
        border-radius: 5px;
        background-color: #F4F5F9;
      }
    }
  }
}
.sing-img{
          img{
            width: 100% !important;
            height: 100% !important;
          }
          
        }
    .comment-box{
      padding: 5px 0;
      font-size: 12px;
      .comment-item{
        display: flex;
        align-items: center;
        h4{
          color: black; 
          margin: 0;
          margin-right: 4px;
        }
        p{
          margin: 0;
        }
      }
    }
    .zan-active{
        color: skyblue;
    }
    .icon-dianzan{
      font-size: 20px ;
      vertical-align: middle;
    }
    .edit-comment{
      display: flex;
      font-size: 12px;
      input{
        flex: 9;
      }
      .edit-send{
        color: #ffffff;
        border-radius: 5px;
        background-color: blue;
        display: flex;
        align-items: center;
        justify-content: center;
        flex: 1;
        font-size: 12px;
      }
    }
</style>
