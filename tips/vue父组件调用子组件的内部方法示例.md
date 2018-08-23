https://www.jb51.net/article/126448.htm

父组件里调用子组件的方法
this.$refs.mychild.xxx();

子组件
```
<template>
  <div>
    child
  </div>
</template>
 
<script>
  export default {
    name: "child",
    props: "someprops",
    methods: {
      parentHandleclick(e) {
        console.log(e)
      }
    }
  }
</script>
```

父组件
```
<template>
  <div>
    <button @click="clickParent">点击</button>
    <child ref="mychild"></child>
  </div>
</template>
 
<script>
  import Child from './child';
  export default {
    name: "parent",
    components: {
      child: Child
    },
    methods: {
      clickParent() {
        this.$refs.mychild.parentHandleclick("嘿嘿嘿");
      }
    }
  }
</script>
```


vue项目如何刷新当前页面

https://www.cnblogs.com/yinn/p/9056731.html

https://blog.csdn.net/guapizz/article/details/79214267

https://blog.csdn.net/mnhn456/article/details/78758789

http://www.cnblogs.com/first-time/p/7067674.html