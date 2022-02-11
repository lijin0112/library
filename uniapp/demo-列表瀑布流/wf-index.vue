<template>
	<view class="index">
		<!-- #ifdef H5 -->
		<view class="h5-search color-ccc">
			请输入关键词
		</view>
		<!-- #endif -->
		<!-- #ifndef H5 -->
		<view class="search color-ccc">
			<image class="scan" @click="useScan" :src="require('@/static/index/scan.png')" mode="aspectFill"></image>
			<view class="tip">请输入关键词</view>
			<image class="camera" @click="useCamera" :src="require('@/static/index/camera.png')" mode="aspectFill"></image>
		</view>
		<!-- #endif -->
		<swiper class="banner" :autoplay="true" :interval="5000" :duration="700" :circular="true">
			<swiper-item v-for="(item,index) in imgList" :key="index">
				<image class="swiper-item" :src="item" mode="aspectFill"></image>
			</swiper-item>
		</swiper>
		<view class="nav">
			<view class="item" v-for="(item,index) in navList" :key="index" @click="handleClick(item)">
				<view :class="['icon','color-fff',item.className,item.bgColor]">{{item.des}}</view>
				<view class="title">{{item.title}}</view>
			</view>
		</view>
		<view class="water-list">
			<water-fall v-model="flowList" ref="waterfall" :dataLoadTime="100">
				<template v-slot:left="{ leftList }">
					<view class="item" v-for="(item, index) in leftList" :key="index">
						<image class="img" :src="item.image" mode="aspectFill"></image>
						<view class="box">
							<view class="title font-weight-500">{{item.title}}</view>
							<view class="tags font-11" v-if="item.tags">{{item.tags}}</view>
							<view class="price font-11" v-if="item.referPrice">￥{{item.referPrice}}</view>
							<view class="day font-11" v-if="item.playDaysName">{{item.playDaysName}}</view>
						</view>
					</view>
				</template>
				<template v-slot:right="{ rightList }">
					<view class="item" v-for="(item, index) in rightList" :key="index">
						<image class="img" :src="item.image" mode="aspectFill"></image>
						<view class="box">
							<view class="title font-weight-500">{{item.title}}</view>
							<view class="tags font-11" v-if="item.tags">{{item.tags}}</view>
							<view class="price font-11" v-if="item.referPrice">￥{{item.referPrice}}</view>
							<view class="day font-11" v-if="item.playDaysName">{{item.playDaysName}}</view>
						</view>
					</view>
				</template>
			</water-fall>
		</view>
	</view>
</template>

<script>
	import waterFall from '@/components/waterfall/index.vue'
	import list from '@/common/js/list.js'
	import random from '@/common/js/random.js'
	export default {
		components: {
			waterFall
		},
		data() {
			return {
				navList: [{
						className: 'first',
						title: 'first',
						bgColor: 'first-bg',
						des: '好哦',
						link: ''
					},
					{
						className: 'second',
						title: 'second',
						bgColor: 'second-bg',
						des: '好啊',
						link: ''
					},
					{
						className: 'third',
						title: 'third',
						bgColor: 'third-bg',
						des: '可以',
						link: ''
					},
					{
						className: 'fourth',
						title: 'fourth',
						bgColor: 'fourth-bg',
						des: '不错',
						link: ''
					},
					{
						className: 'fifth',
						title: 'fifth',
						bgColor: 'fifth-bg',
						des: '呵呵',
						link: ''
					},
				],
				imgList: [],
				list: [],
				flowList: [],
				page: {
					pageSize: 10,
					currentPage: 1,
					sortType: '4',
					count: 0,
					loading: false,
				},
				count: 0,
				end: false,
			}
		},
		onLoad() {
			this.imgList = list.imgList
			this.queryData()
		},
		onReachBottom() {
			if (this.list.length < this.count) {
				setTimeout(() => {
					this.queryData();
				}, 1000);
			}
		},
		methods: {
			apart(values) {
				let tag = values.split(',').filter(t => {
					return t !== 'null'
				})
				return tag[0]
			},
			queryData() {
				this.$ajax({
					method: 'post',
					url: '/weChat/lineOrder/queryPage',
					data: {
						...this.page,
						productName: this.name || ''
					},
				}).then(res => {
					let arr = res.data.map(t => {
						return {
							...t,
							image: 'https://lishiots.oss-cn-hangzhou.aliyuncs.com/jilin_ygj' + t.cover,
							tags: this.apart(t.lineTypeName),
							title: t.productName
						}
					})
					this.list.push.apply(this.list, arr)
					this.flowList = this.list
					this.page.loading = false
					this.count = res.count
					// for (let i = 0; i < 10; i++) {
					// 	let index = random(0, arr.length - 1);
					// 	// 先转成字符串再转成对象，避免数组对象引用导致数据混乱
					// 	let item = JSON.parse(JSON.stringify(arr[index]));
					// 	this.flowList.push(item);
					// }
					this.page.currentPage += 1
					if (this.list.length >= this.count) {
						this.end = true
					}
					if (status === 'refresh') {
						uni.stopPullDownRefresh();
					}
				})
			},
			remove(id) {
				this.$refs.waterfall.remove(id);
			},
			clear() {
				this.$refs.waterfall.clear();
			},
			useScan() {
				uni.scanCode({
					success(res) {
						console.log(res)
					}
				})
			},
			useCamera() {
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					success: function(res) {
						console.log(JSON.stringify(res.tempFilePaths));
					}
				});
			},
			handleClick(item) {
				if (item.link) {
					uni.navigateTo({
						url: item.link
					})
				} else {
					uni.showToast({
						title: '功能开发中 敬请期待',
						icon: 'none'
					})
				}
			},
		}
	}
</script>

<style lang="less" scoped>
	.index {

		.h5-search,
		.search {
			display: flex;
			align-items: center;
			width: 690rpx;
			height: 60rpx;
			margin: 20rpx auto;
			border: 1rpx solid #eaeaea;
			border-radius: 50rpx;
			box-sizing: border-box;
		}

		.h5-search {
			padding: 0 30rpx;
		}

		.search {
			padding: 0 40rpx;
			position: relative;
			justify-content: space-between;

			&::before {
				position: absolute;
				content: '';
				width: 2rpx;
				height: 30rpx;
				background-color: #ccc;
				top: 50%;
				left: 90rpx;
				transform: translateY(-50%);
			}

			.scan {
				width: 30rpx;
				height: 30rpx;
				margin-right: 40rpx;
			}

			.tip {
				flex: 1;
			}

			.camera {
				width: 34rpx;
				height: 34rpx;
			}

		}

		.banner {
			height: 300rpx;

			.swiper-item {
				margin: 0 30rpx;
				width: 690rpx;
				height: 300rpx;
				border-radius: 20rpx;
			}
		}

		.nav {
			display: flex;
			justify-content: space-between;
			align-items: center;
			padding: 20rpx 30rpx;

			.item {
				display: flex;
				align-items: center;
				flex-direction: column;
				flex: 1;

				.icon {
					width: 80rpx;
					height: 80rpx;
					border-radius: 50%;
					display: flex;
					justify-content: center;
					align-items: center;
				}

				.first-bg {
					background-color: #e69f69;
				}

				.second-bg {
					background-color: #c8a482;
				}

				.third-bg {
					background-color: #fe5d65;
				}

				.fourth-bg {
					background-color: #e5b297;
				}

				.fifth-bg {
					background-color: #ea6580;
				}

				.title {
					padding-top: 20rpx;

				}
			}
		}

		.water-list {
			padding: 30rpx;

			.water-fall {
				.item {
					box-shadow: 0rpx 5rpx 10rpx 6rpx rgba(0, 0, 0, 0.07);
					margin-bottom: 20rpx;
					border-radius: 20rpx;

					.img {
						width: 340rpx;
						height: 300rpx;
						border-radius: 20rpx 20rpx 0 0;
					}

					.box {
						box-sizing: border-box;
						padding: 20rpx;
						width: 340rpx;

						.title {
							padding-bottom: 6rpx;
							line-height: 40rpx;
						}

						.tags {
							display: inline-block;
							border-radius: 8rpx;
							border: 1rpx solid #eaeaea;
							padding: 4rpx 10rpx;
							color: #FFFFFF;
							background-color: #007AFF;
							margin-right: 8rpx;
						}

						.price {
							padding-top: 10rpx;
							color: #F9240A;
						}

						.day {
							padding-top: 10rpx;
						}
					}
				}
			}
		}
	}
</style>
