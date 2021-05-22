<template>
  <div class="thumbnail" :class="thumbnailClass">
    <div class="thumbnail-content">
      <img
        :src="data._src"
        :alt="data.title || data.__filename"
        v-if="data._fileType === fileType['IMAGE']"
      />
      <svg-icon
        :icon-class="thumbnailIconClass"
        class-name="thumbnail-icon"
        v-else
      />
      <div class="thumbnail-tip" v-if="thumbnailTip">{{ thumbnailTip }}</div>
    </div>
  </div>
</template>

<script>
import SvgIcon from '../../SvgIcon'
import { FileType } from '../../../utils/file'
export default {
  name: 'Thumbnail',
  components: {
    SvgIcon,
  },
  props: {
    data: {
      type: Object,
      required: true,
    },
    type: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      fileType: FileType, // 文件类型
    }
  },
  computed: {
    // 缩略图class
    thumbnailClass() {
      const fileType = this.data._fileType
      const fileTypeClassMap = {
        [FileType['IMAGE']]: 'is-image',
        [FileType['VIDEO']]: 'is-video',
        [FileType['AUDIO']]: 'is-audio',
        [FileType['PDF']]: 'is-pdf',
        [FileType['OTHER']]: 'is-other',
      }
      return fileTypeClassMap[fileType]
    },
    thumbnailIconClass() {
      const fileType = this.data._fileType
      const fileTypeIconClassMap = {
        [FileType['IMAGE']]: 'filetype-image',
        [FileType['VIDEO']]: 'filetype-video',
        [FileType['AUDIO']]: 'filetype-audio',
        [FileType['PDF']]: 'filetype-pdf',
        [FileType['OTHER']]: 'filetype-other',
      }
      return fileTypeIconClassMap[fileType]
    },
    thumbnailTip() {
      return this.data.title
    },
  },
}
</script>

<style lang="scss" scoped>
.thumbnail {
  width: 100%;
  height: 100%;
  cursor: pointer;
  img {
    width: 100%;
    height: 100%;
  }
}
.thumbnail-content {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  background: #fff;
  position: relative;
}
.thumbnail-icon {
  font-size: 60px;
  margin-bottom: 20px;
}
.thumbnail-tip {
  transition: all 0.2 ease-in-out;
  position: absolute;
  background: rgba(0, 0, 0, 0.2);
  bottom: 0;
  width: 100%;
  height: 20px;
  line-height: 20px;
  text-align: center;
  font-size: 12px;
  overflow: hidden;
  text-overflow: ellipsis;
}
</style>
