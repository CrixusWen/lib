<template>
  <div>
    <video ref="videoPlayer" class="video-js"></video>
  </div>
</template>
<script>
import "video.js/dist/video-js.css";
export default {
  name: "VideoPlayer",
  props: {
    options: {
      type: Object,
      default() {
        return {};
      },
    },
  },
  data() {
    return {
      player: null,
    };
  },
  mounted() {
    import("video.js").then((module) => {
      const videojs = module.default;
      this.player = videojs(
        this.$refs.videoPlayer,
        this.options,
        function onPlayerReady() {
          console.log("onPlayerReady", this);
        }
      );
    });
  },
  beforeDestroy() {
    if (this.player) {
      this.player.dispose();
    }
  },
};
</script>
