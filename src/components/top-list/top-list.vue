<template>
  <transition name="slide">
    <music-list :rank="rank" :title="title" :bgImage="bgImage" :songs="songs"></music-list>
  </transition>
</template>

<script>
import MusicList from 'components/music-list/music-list'
import {mapGetters} from 'vuex'
import {getMusicList} from 'api/rank'
// import {ERR_OK} from 'api/config'
import {modifySong} from 'common/js/song'
export default {
  props: [],

  components: {
    MusicList
  },

  data () {
    return {
      songs: [],
      rank: true
    }
  },

  watch: {

  },

  computed: {
    title () {
      return this.topList.title
    },
    bgImage () {
      if (this.songs.length) {
        return this.songs[0].image
      }
    },
    ...mapGetters([
      'topList'
    ])
  },

  created () {
    this._getMusicList()
  },

  mounted () {

  },

  methods: {
    _getMusicList () {
      if (!this.topList.id) {
        this.$router.back()
        return
      }
      getMusicList(this.topList.id).then((res) => {
        this.songs = this._normalizeSongs(res.movies)
      })
    },
    _normalizeSongs (list) {
      let ret = []
      list.forEach((item) => {
        const musicData = item
        ret.push(modifySong(musicData))
      })
      return ret
    }
  }
}
</script>

<style scoped lang="stylus" rel="stylesheet/stylus">
  .slide-enter-active, .slide-leave-active
    transition: all 0.3s ease

  .slide-enter, .slide-leave-to
    transform: translate3d(100%, 0, 0)
</style>

