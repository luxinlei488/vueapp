<template>
  <div>
    <aplayer :audio="audio" :lrcType="0" @listSwitch="switchSong" />
  </div>
</template>

<script>
import Vue from "vue";
import APlayer from "@moefe/vue-aplayer";

Vue.use(APlayer, {
  defaultCover: "https://github.com/u3u.png",
  productionTip: true,
});
export default {
  created() {
    this.getData();
  },
  data() {
    return {
      audio: {
        name: "东西（Cover：林俊呈）",
        artist: "纳豆",
        url: "https://cdn.moefe.org/music/mp3/thing.mp3",
        cover: 'https://p1.music.126.net/5zs7IvmLv7KahY3BFzUmrg==/109951163635241613.jpg?param=300y300', // prettier-ignore
        lrc: "https://cdn.moefe.org/music/lrc/thing.lrc",
      },
      playList: [],
      mp3Url: "",
    };
  },
  methods: {
    getData() {
      this.axios
        .get("https://bird.ioliu.cn/netease/playlist?id=5051447966")
        .then((res) => {
          console.log(res);
          this.playList = res.data.playlist.tracks;
          this.audio = this.playList.map((item) => {
            this.getSong(item.id);
            return {
              name: item.name,
              artist: item.ar[0].name,
              url: this.mp3Url,
              cover: item.al.picUrl,
              id: item.id,
            };
          });
        });
    },
    getSong(id) {
      this.axios
        .get("https://bird.ioliu.cn/netease/song?id=" + id)
        .then((res) => {
          console.log(res);
          this.mp3Url = res.data.data.mp3.url;
        });
    },
    switchSong() {
      console.log(666);
    },
  },
};
</script>

<style lang="scss" scoped>
</style>