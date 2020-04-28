<template>
  <view class="main">
    <div id="app">
      <div class="box">
        <div id="room">
          <div class="row"
               style="margin-left:5%;">
            <div style="margin-left: 10rpx;">
              <div class="sit bg-sit"></div>
              <div>可选座位</div>
            </div>
            <div style="margin-left: 10rpx;">
              <div class="sit bg-sited"></div>
              <div>已售座位</div>
            </div>
            <div style="margin-left: 10rpx;">
              <div class="sit bg-temp"></div>
              <div>已选座位</div>
            </div>
          </div>
          <div class="row"
               style="width: 100%;text-align: center;">
            <span>
              银幕中央
            </span>
            <hr style="width: 90%;">
          </div>
          <div v-for="(item,i) in list"
               :key="i"
               class="row"
               style="margin-left: 1%;">
            <div class="sit bg-nosit"
                 style="margin-right:50rpx">{{i+1}}</div>
            <div @click="selectSeat(item1,i,j)"
                 :class="['sit',{'bg-temp':item1==3},{'bg-sited':item1==2},{'bg-sit':item1==1},{'bg-nosit':item1==0}]"
                 v-for="(item1,j) in item"
                 :key="j">
            </div>
          </div>
        </div>
        <div class="win-right">
          <div class="row">
            <div>
              <img class="film-img"
                   :src="filmSession.filmImg"
                   alt="">
            </div>
            <div>
              <div class="row film-title">{{filmSession.filmName}}</div>
              <div class="row">类型：{{filmSession.filmType}}</div>
              <div class="row">时长：120分钟</div>
            </div>
          </div>
          <div class="row">
            <span>影院：</span>
            <span>{{filmSession.svname}}</span>
          </div>
          <div class="row">
            <span>影厅：</span>
            <span>{{filmSession.svaddress}}</span>
          </div>
          <div class="row">
            <span>场次：</span>
            <span>{{filmSession.fstartTime|time}}</span>
          </div>
          <div class="row">
            <span>票价：</span>
            <span>￥{{filmSession.filmPrice|price}}</span>
          </div>
          <div class="row">
            <div>座位：</div>
            <div v-for="(sit,i) in msg"
                 :key="i">
              <div>
                <div class="select-sit">{{sit|f3}}</div>
              </div>
            </div>
          </div>
          <div class="row">
            <span>总价：</span>
            <span style="font-size: 25rpx;color: red;font-weight: 900;">￥{{filmSession.filmPrice*msg.length|price}}</span>
          </div>
          <div class="row">
            <button type="button"
                    class="btn"
                    @click="sub">确认选座</button>
          </div>
        </div>
      </div>
    </div>

  </view>
</template>

<script>
export default {
  name: 'scenic-spot',
  components: {
  },
  data() {
    return {
      // 场次信息
      filmSession: {
        //放映点名称
        svname: "博纳",
        //放映点地址
        svaddress: "5号放映厅",
        //开始时间
        fstartTime: new Date(),
        filmName: "xxx",
        filmType: "动漫",
        filmImg: "images/2.jpg",
        filmPrice: 33.50
      },
      // 座位状态数组
      list: [
        [1, 1, 2, 2, 1, 0, 1, 2, 1, 1],
        [1, 1, 2, 2, 1, 0, 1, 2, 1, 2],
        [1, 1, 2, 2, 1, 0, 1, 2, 1, 1],
        [1, 1, 2, 0, 1, 0, 1, 2, 1, 1],
        [0, 1, 2, 2, 1, 0, 1, 1, 1, 2],
        [0, 1, 2, 2, 1, 0, 0, 0, 0, 0],
        [0, 1, 2, 2, 1, 2, 1, 1, 1, 0],
        [1, 1, 2, 2, 1, 2, 1, 1, 1, 0],
        [1, 1, 2, 2, 1, 1, 1, 2, 2, 0],
        [1, 1, 2, 2, 1, 1, 2, 2, 1, 0]
      ],
      // 已选座位数
      msgCount: 0,
      // 选座信息
      msg: []
    }
  },
  computed: {
  },
  onLoad(event) {
    this.orderCode = event.orderCode
    // #ifdef APP-PLUS
    if (!plus.runtime.isApplicationExist({
      pname: 'com.tencent.mm',
      action: 'weixin://'
    })) {
      this.isWeixin = false
    }
    // #endif
  },
  onReady() {
  },
  filters: {
    // 选座信息过滤器
    f3(data) {
      return (data[0] + 1) + "排 | " + (data[1] + 1) + "座";
    },
    // 日期过滤器
    time(data) {
      var date = new Date(data);
      var month = date.getMonth() + 1;
      var day = date.getDate();
      var hours = date.getHours() > 9 ? date.getHours() : ("0" + date.getHours());
      var minutes = date.getMinutes() > 9 ? date.getMinutes() : ("0" + date.getMinutes());
      return month + "月" + day + "日  " + hours + ":" + minutes;
    },
    // 价格过滤器,数字保留两位小数
    price(data) {
      var price = parseFloat(data);
      return price.toFixed(2);
    }
  },
  methods: {
    // 选座时触发
    selectSeat(data, x, y) {
      if (data == 1 && this.msgCount <= 3) {
        this.$set(this.msg, this.msgCount++, [x, y]);
        this.list[x][y] = 3;
      } else if (data == 3) {
        // 用于记录要删除的座位下标
        var temp = null;
        for (var i = 0; i < this.msg.length; i++) {
          if (this.msg[i][0] == x && this.msg[i][1] == y) {
            temp = i;
            break;
          }
        }
        this.msgCount--;
        this.$delete(this.msg, temp);
        this.list[x][y] = 1;
      } else {
        if (this.msgCount == 4) {
          layer.msg("最多只能订4张票！");
          // alert("最多只能订4张票！")
        }
      }
    },
    // 确认选座时触发
    sub() {
      var x, y;
      for (var i = 0; i < this.msg.length; i++) {
        x = this.msg[i][0];
        y = this.msg[i][1];
        this.$set(this.list, 'x,y', 2);
        this.list[x][y] = 2;
      }
    }
  }
}
</script>
<style lang="less" scoped>
.main {
  background: #fff;
  height: 100vh;
}
#app div {
  /* border: 1px solid black; */
  float: left;
  font-size: 14rpx;
}

#room {
  /* width: 300px; */
  width: 90%;
  border: 1px solid black;
  padding: 20rpx 20rpx 20rpx 20rpx;
}

.sit {
  height: 20rpx;
  width: 20rpx;
  min-height: 10rpx;
  min-width: 10rpx;
  margin: 4rpx 4rpx 4rpx 4rpx;
  background-size: cover;
  /* border: 1px solid black; */
}

/* 座位 */
.bg-sit {
  // background-image: url('/images/bg-sit.png');
  background: #fff;
  border: 1px solid grey
}

.bg-sit:hover {
  cursor: pointer;
}

/* 已售座位 */
.bg-sited {
  /* background-color: red; */
  // background-image: url('/images/bg-sited.png');
  background: red;
}

/* 空位置 */
.bg-nosit {
  /* border: 1px solid white; */
}

/* 已选座位 */
.bg-temp {
  cursor: pointer;
  // background-image: url('/images/bg-temp.png');
  background: green;
}

/* 已选座位号 */
.select-sit {
  border: 2rpx orange solid;
  border-radius: 10rpx;
  margin-left: 10rpx;
  padding: 4rpx 10rpx 4rpx 10rpx;
  background-color: rgba(255, 0, 0, 0.2);
}

.row {
  /* 清除格式并换行 */
  clear: both;
  span{
    font-size: 12rpx;
  }
}

/* 确认选座按钮 */
.btn {
  border-radius: 10rpx;
  width: 160rpx;
  height: 40rpx;
  line-height: 40rpx;
  /* padding: 4rpx 10rpx 4rpx 10rpx; */
  background-color: rgba(255, 0, 0, 0.8);
  font-size: 25rpx;
  color: white;
  font-family: "微软雅黑";
}

/* 右侧信息栏 */
.win-right {
  padding-left: 2%;
  padding-top: 2%;
  width: 27%;
  background-color: rgba(112, 112, 112, 0.2);
  border: 1px white solid;
  height: 100%;
}

/* 整体容器 */
.box {
  width: 90%;
  margin-left: 5%;
  height: 64%;
}

/* 电影封面 */
.film-img {
  width: 80%;
}

/* 电影名 */
.film-title {
  font-family: "微软雅黑";
  font-weight: 900;
  font-size: 25rpx;
}

#app {
  height: 100%;
}
</style>
