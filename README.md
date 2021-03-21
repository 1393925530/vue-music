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

1. 利用better-scroll组件，让图片在水平方向滚动
2. 动态设置ref为slider-group的元素的宽度为轮播图数量加上2倍于轮播图可见宽度
3. dots数量就是轮播图数量，在better-scroll滚动完毕时通过getCurrentPage方法获取到当前index，实现active需求
4. 通过goToPage方法实现轮播图自动播放（自动轮播前清除定时器）
5. 在视口改变时需要重新计算宽度

### 歌单列表scroll组件

1. 利用better-scroll组件，让图片在垂直方向滚动
2. 在dom渲染后初始化better-scroll
3. 传入data，在歌单开始渲染时refresh组件
4. 由于异步请求问题，歌单列表scroll组件可能存在高度缺少轮播图高度BUG，解决措施是在轮播图图片load时调用better-scroll组件的refresh方法

### 歌手列表listview组件

1. 聚合歌手数据
```JavaScript
  list.forEach((item, index) => {
    if (index < HOT_SINGER_LEN) {
      map.hot.items.push(new Singer({
        id: item.Fsinger_mid,
        name: item.Fsinger_name
      }))
    }
    const key = item.Findex
    // 若key不在map中，添加key
    if (!map[key]) {
      map[key] = {
        title: key,
        items: []
      }
    }
    map[key].items.push(new Singer({
      id: item.Fsinger_mid,
      name: item.Fsinger_name
    }))
  })
  let hot = []
  let ret = []
  for(let key in map) {
    let val = map[key]
    if (val.title.match(/[a-zA-Z]/)) {
      ret.push(val)
    } else if (val.title === HOT_NAME) {
      hot.push(val)
    }
  }
  // 更改为有序
  ret.sort((a, b) => {
    return a.title.charCodeAt(0) - b.title.charCodeAt(0)
  })
  return hot.concat(ret)
```
2. 利用better-scroll组件，让列表在垂直方向滚动
3. 右侧快速入口点击和滑动通过scrollToElement方法跳转到对应歌手
4. 滑动时通过第一次和第二次点击的y值差计算出跳过的组
5. 列表滚动时传出当前的position，获取到当前位置高度，通过计算高度获取到对应区间
6. 滚动需要分为三种情况，因为新的y值有可能大于0