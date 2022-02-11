<template>
	<view class="page">
		<map class="map" :latitude="latitude" :longitude="longitude" :markers="covers" :style="{'height':height+'px'}">
		</map>
		<div class="contain cover" style="height:80px">
			<div class="text">{{name}}<br>{{address}}</div>
			<div class="icon" @click="openMap">
				<image :src="require('static/public/nav.png')" mode="aspectFill" class="nav"></image>
			</div>
		</div>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				latitude: 39.909,
				longitude: 116.39742,
				name: '',
				address: '',
				top: 0,
				id: '',
				covers: [],
				height: ''
			}
		},
		onLoad(e) {
			this.latitude = parseFloat(e.latitude)
			this.longitude = parseFloat(e.longitude)
			this.name = e.name
			this.address = e.address
			var res = uni.getSystemInfoSync();
			this.height = res.windowHeight - 80;
		},
		onReady(e) {
			let obj = {
				id: 0,
				latitude: this.latitude,
				longitude: this.longitude,
				title: this.name,
				callout: {
					content: this.name,
				},
				iconPath: require('static/public/point.png')
			}
			this.covers.push(obj)
		},
		methods: {
			clickMarket() {
				uni.showToast({
					title: '喝喝'
				})
			},
			openMap() {
				var url = "";
				let address = encodeURI(this.address)
				let name = encodeURI(this.name)
				let _this = this
				if (plus.os.name == "Android") {
					var hasBaiduMap = plus.runtime.isApplicationExist({
						pname: 'com.baidu.BaiduMap',
						action: 'baidumap://'
					});
					var hasAmap = plus.runtime.isApplicationExist({
						pname: 'com.autonavi.minimap',
						action: 'androidamap://'
					});
					var urlBaiduMap =
						`baidumap://map/marker?location=${_this.latitude},${_this.longitude}&title=${name}&coord_type=gcj02&src=Hello%20uni-app`;
					var urlAmap =
						`androidamap://viewMap?sourceApplication=Hello%20uni-app&poiname=${name}&lat=${_this.latitude}&lon=${_this.longitude}&dev=0`;
					if (hasAmap && hasBaiduMap) {
						plus.nativeUI.actionSheet({
							title: "选择地图应用",
							cancel: "取消",
							buttons: [{
								title: "百度地图"
							}, {
								title: "高德地图"
							}]
						}, function(e) {
							switch (e.index) {
								case 1:
									plus.runtime.openURL(urlBaiduMap);
									break;
								case 2:
									plus.runtime.openURL(urlAmap);
									break;
							}
						})
					} else if (hasAmap) {
						plus.runtime.openURL(urlAmap);
					} else if (hasBaiduMap) {
						plus.runtime.openURL(urlBaiduMap);
					}
				} else {
					// iOS上获取本机是否安装了百度高德地图，需要在manifest里配置，在manifest.json文件app-plus->distribute->apple->urlschemewhitelist节点下添加（如urlschemewhitelist:["iosamap","baidumap"]）  
					//baidumap://map/marker?location=40.057406655722,116.2964407172&title=Marker&content=makeamarker&traffic=on&src=andr.baidu.openAPIdemo
					plus.nativeUI.actionSheet({
						title: "选择地图应用",
						cancel: "取消",
						buttons: [{
							title: "百度地图"
						}, {
							title: "高德地图"
						}]
					}, function(e) {
						console.log("e.index: " + e.index);
						switch (e.index) {
							// case 1:  
							//     url = "http://maps.apple.com/?q=%e6%95%b0%e5%ad%97%e5%a4%a9%e5%a0%82&ll=39.96310,116.340698&spn=0.008766,0.019441";  
							//     break;  
							case 1:
								url =
									`baidumap://map/marker?location=${_this.latitude},${_this.longitude}&title=${name}&coord_type=gcj02&content=${address}&traffic=on&src=Hello%20uni-app`;
								break;
							case 2:
								url =
									`iosamap://viewMap?sourceApplication=Hello%20uni-app&poiname=${name}&lat=${_this.latitude}&lon=${_this.longitude}&dev=0`;
								break;
							default:
								break;
						}
						if (url != "") {
							plus.runtime.openURL(url, function(e) {
								plus.nativeUI.alert("本机未安装指定的地图应用");
							});
						}
					})
				}
			}
		}
	}
</script>

<style lang="less" scoped>
	/deep/body {
		background: #FFF
	}

	.contain {
		overflow: hidden;
	}

	.map {
		width: 750upx;
		height: 1000upx;
	}

	.title,
	.desc {
		background: #FFF;
		position: absolute;
		left: 50upx;
		width: 600upx;
		bottom: 100upx;
		height: 30upx;
		font-size: 26upx;
		line-height: 100upx;
		white-space: normal;
	}

	.blank_left {
		background: #FFF;
		position: absolute;
		width: 50upx;
		bottom: 0;
		height: 100upx;
	}

	.blank_right {
		position: absolute;
		width: 110upx;
		height: 150upx;
		right: 0;
		bottom: 0;
	}

	.desc {
		bottom: 0;
		line-height: 30upx;
		height: 100upx;
		white-space: normal;
	}

	.navImg {
		width: 64upx;
		height: 64upx;
		position: absolute;
		left: 20upx;
		top: 20upx;
		border: 1px #1296db solid;
	}


	.cover {
		width: 100%;
		background: #FFF;
		font-size: 28upx;
		line-height: 40upx;
		padding: 20upx 30upx 40upx 30upx;
		white-space: normal;
		box-sizing: border-box;
		display: flex;
		justify-content: space-between;
		align-items: center;

		.text {
			width: 550upx;
			font-size: 28upx;
			line-height: 40upx;
			white-space: normal;
		}

		.icon {
			width: 64upx;
		}

		.nav {
			width: 64upx;
			height: 64upx;
		}
	}
</style>
