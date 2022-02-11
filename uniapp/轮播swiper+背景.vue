<template>
	<view class="index">
		<headerNav></headerNav>
		<view class="scenic-story">
			<view class="scenic-bg">
				<image mode="top" class="scenic-img" :src="$getImg(activeItem.coverPlanUrl)" />
			</view>
			<view class="container">
				<view class="h1-title">{{codeList[advisoryCode] || ''}}</view>
				<!-- 轮播图 -->
				<swiper class="swiper" :circular="circular" :duration="duration" @change="changeImg">
					<swiper-item class="swiper-item" v-for="(item,index) in bannerList" :key="index"
						@click="gotoDetail(item)">
						<view :class="[active==index?'next':'','item']">
							<image class="img" :src="$getImg(item.coverPlanUrl)" mode="aspectFill"></image>
						</view>
					</swiper-item>
				</swiper>
				<view class="item-container">
					<view class="title">{{activeItem.title}}</view>
					<view class="description">{{activeItem.description}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import headerNav from '@/components/header-nav/index.vue'
	import uniIcons from '@/components/uni-icons/uni-icons.vue'
	export default {
		components: {
			headerNav,
			uniIcons
		},
		data() {
			return {
				bannerList: [],
				active: 1,
				advisoryCode: 'jq-001',
				duration: 500,
				circular: true,
				activeItem: {},
				codeList: {
					'history01': '历史介绍',
					'jq-001': '景区介绍',
					'ms-001': '美食介绍',
					'jq-002': '景区故事',
					'hd-001': '活动预告',
					'notice01': '景区公告',
					'wanghong': '网红打卡',
					'meizailiandao': '美在连岛',
					'shuishangyule': '水上娱乐',
					'zhoubianyoutuijian': '周边游推荐',
				}
			}
		},
		onLoad(e) {
			if (e.advisoryCode) {
				this.advisoryCode = e.advisoryCode
			}
			this.queryData()
		},
		methods: {
			queryData() {
				this.$ajax({
					method: 'post',
					url: '/weChat/cms/advisory/queryAdvisoryDetailsPage',
					data: {
						advisoryCode: this.advisoryCode,
						currentPage: 1,
						pageSize: 10
					}
				}).then(res => {
					this.bannerList = res.data.length > 0 ? res.data : []
					this.activeItem = this.bannerList[0] || {}
				})
			},
			changeImg(e) {
				this.active = e.target.current + 1
				if (this.bannerList.length === this.active) {
					this.active = 0
				}
				this.activeItem = this.bannerList[e.target.current]
			},
			gotoDetail(item) {
				uni.navigateTo({
					url: `/pages/story/detail?advisoryDetailsCode=${item.advisoryDetailsCode}`
				})
			}
		}
	}
</script>

<style lang="less" scoped>
	.index {
		.scenic-story {
			width: 100%;
			position: relative;
			height: 100vh;

			.go-back {
				position: absolute;
				top: 12%;
				left: 30rpx;
				z-index: 9;
			}

			.scenic-bg {
				width: 100%;
				height: 889rpx;
				filter: blur(10px);
				background-color: rgba(0, 0, 0, .1);

				.scenic-img {
					width: 100%;
					height: 889rpx;
				}
			}

			.container {
				width: 100%;
				position: absolute;
				top: 20%;
				left: 0;
				z-index: 9;

				.h1-title {
					margin: 0 0 50rpx 40rpx;
					font-size: 50rpx;
					font-weight: 500;
					color: #fff;
				}
			}

			.swiper {
				height: 740rpx;

				.swiper-item {
					width: 590rpx !important;

					.item {
						transition: all 0.4s ease;

						.img {
							transition: all 0.4s ease;
							width: 550rpx;
							height: 740rpx;
							margin-left: 40rpx;
							border-radius: 20rpx;
						}
					}
				}

				.next {
					margin-top: 40rpx;
					width: 450rpx;
					height: 660rpx;

					.img {
						width: 450rpx !important;
						height: 660rpx !important;
					}
				}
			}

			.item-container {
				margin: 50rpx 30rpx 0 45rpx;
				box-sizing: border-box;
				font-family: 'PingFangSC-Medium, PingFang SC';

				.title {
					padding-bottom: 8rpx;
					font-size: 40rpx;
					font-weight: 500;
					color: #000;
				}

				.description {
					font-size: 27rpx;
					font-weight: 400;
					color: #343434;
					line-height: 50rpx;
				}
			}
		}
	}
</style>
