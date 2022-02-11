<template>
	<view class="water-fall">
		<view id="left" class="column">
			<slot name="left" :leftList="leftList"></slot>
		</view>
		<view id="right" class="column">
			<slot name="right" :rightList="rightList"></slot>
		</view>
	</view>
</template>

<script>
	export default {
		props: {
			value: {
				// 瀑布流数据
				type: Array,
				required: true,
				default: function() {
					return [];
				}
			},
			dataLoadTime: {
				// 每次插入数据的时间间隔，单位ms，间隔越长，越能保证两列高度相近，但是对用户体验越不好
				type: [Number, String],
				default: 200
			}
		},
		data() {
			return {
				leftList: [],
				rightList: [],
				tempList: []
			}
		},
		watch: {
			copyFlowList(nVal, oVal) {
				// 取差值，即这一次数组变化新增的部分
				let startIndex = Array.isArray(oVal) && oVal.length > 0 ? oVal.length : 0;
				// 拼接上原有数据
				this.tempList = this.tempList.concat(this.cloneData(nVal.slice(startIndex)));
				this.splitData();
			}
		},
		mounted() {
			this.tempList = this.cloneData(this.copyFlowList);
			this.splitData();
		},
		computed: {
			// 破坏flowList变量的引用，否则watch的结果新旧值是一样的
			copyFlowList() {
				return this.cloneData(this.value);
			}
		},
		methods: {
			// 查询节点信息
			getRect(selector, all) {
				return new Promise(resolve => {
					uni.createSelectorQuery().
					in(this)[all ? 'selectAll' : 'select'](selector)
						.boundingClientRect(rect => {
							if (all && Array.isArray(rect) && rect.length) {
								resolve(rect)
							}
							if (!all && rect) {
								resolve(rect)
							}
						})
						.exec()
				})
			},
			async splitData() {
				if (!this.tempList.length) return;
				let leftRect = await this.getRect('#left');
				let rightRect = await this.getRect('#right');
				// 如果左边小于或等于右边，就添加到左边，否则添加到右边
				let item = this.tempList[0];
				// 解决多次快速上拉后，可能数据会乱的问题，因为经过上面的两个await节点查询阻塞一定时间，加上后面的定时器干扰
				// 数组可能变成[]，导致此item值可能为undefined
				if (!item) return;
				if (leftRect.height < rightRect.height) {
					this.leftList.push(item);
				} else if (leftRect.height > rightRect.height) {
					this.rightList.push(item);
				} else {
					// 这里是为了保证第一和第二张添加时，左右都能有内容
					// 因为添加第一张，实际队列的高度可能还是0，这时需要根据队列元素长度判断下一个该放哪边
					if (this.leftList.length <= this.rightList.length) {
						this.leftList.push(item);
					} else {
						this.rightList.push(item);
					}
				}
				// 移除临时列表的第一项
				this.tempList.splice(0, 1);
				// 如果临时数组还有数据，继续循环
				if (this.tempList.length) {
					setTimeout(() => {
						this.splitData();
					}, this.dataLoadTime)
				}
			},
			// 复制而不是引用对象和数组
			cloneData(data) {
				return JSON.parse(JSON.stringify(data));
			},
		}
	}
</script>

<style lang="less" scoped>
	.water-fall {
		display: flex;
		justify-content: space-between;
		align-items: flex-start;

		.column {
			display: flex;
			flex-direction: column;
			height: auto;
		}
	}
</style>
