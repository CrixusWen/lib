<template>
  <Viewer :data="data" append-to-body />
</template>

<script>
import Viewer from './Viewer'
export default {
  name: 'Playground',
  components: { Viewer },
  data() {
    return {
      data: [
        { src: 'https://i.picsum.photos/id/50/346/216.jpg', title: '测试' },
        {
          src: 'group1/M00/00/01/wKgKfl68-Z6AGuwBAABiRqByskk500.pdf',
          title: '测试',
        },
        {
          src:
            'http://36.110.47.222:18765/group1/M00/00/03/wKgKfl7GM7mABssZAANxRxB2kag825.pdf',
          title: '测试',
        },
        { src: '//vjs.zencdn.net/v/oceans.mp4', title: '测试' },
        {
          src:
            'http://m7.music.126.net/20200522102021/6aa7c2807f2b6d6c67972af3de89a0f4/ymusic/e33e/ce89/f6b0/03021c4140edc953808280ac78bd35be.mp3',
        },
        {
          src: 'https://i.picsum.photos/id/50/346/216.jpg',
          title: 'https://i.picsum.photos/id/50/346/216.jpg',
        },
      ],
    }
  },
}
</script>
