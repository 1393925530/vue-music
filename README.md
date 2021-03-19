# vue-music

> 音乐播放器

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```

For a detailed explanation on how things work, check out the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).

## 难点总结
### 轮播图组件开发
```
1.利用better-scroll组件，让图片在水平方向滚动
2.动态设置ref为slider-group的元素的宽度为轮播图数量加上2倍于轮播图可见宽度
3.dots数量就是轮播图数量，在better-scroll滚动完毕时通过getCurrentPage方法获取到当前index，实现active需求
4.通过goToPage方法实现轮播图自动播放（自动轮播前清除定时器）
5.在视口改变时需要重新计算宽度
```

