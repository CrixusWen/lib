<template>
  <div class="viewer">
    <slot v-bind="{ list: rebuildData, change, toggle }">
      <thumbnail-list
        :data="rebuildData"
        v-model="currentIndex"
        direction="horizontal"
        @click.native="toggle"
      />
    </slot>

    <transition name="fade">
      <div class="viewer-dialog" v-if="visible && current" ref="viewer-dialog">
        <div class="viewer-dialog-close" @click="toggle"></div>
        <el-scrollbar class="viewer-dialog-navbar">
          <thumbnail-list
            v-model="currentIndex"
            :data="rebuildData"
            direction="vertical"
          />
        </el-scrollbar>
        <div class="viewer-dialog-content">
          <image-viewer
            class="viewer-box"
            ref="imageViewer"
            v-bind="imageViewerProps"
            v-if="current._fileType === fileType['IMAGE']"
          >
            <div class="image-viewer-images">
              <img
                v-for="item in imageData"
                :key="item._typeIndex"
                :data-src="getSrc(item)"
                class="img"
                :src="getSrc(item)"
              />
            </div>
          </image-viewer>
          <video-player
            class="viewer-box"
            v-bind="videoPlayerProps"
            v-else-if="current._fileType === fileType['VIDEO']"
          />
          <audio-player
            v-bind="audioPlayerProps"
            v-else-if="current._fileType === fileType['AUDIO']"
          />
          <p-d-f-viewer
            class="viewer-box"
            v-bind="PDFViewerProps"
            v-else-if="current._fileType === fileType['PDF']"
          />
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import ThumbnailList from './ThumbnailList'
import AudioPlayer from '../AudioPlayer'
import ImageViewer from '../ImageViewer'
import PDFViewer from '../PDFViewer'
import VideoPlayer from '../VideoPlayer'
import { getFileType, FileType } from '../../utils/file'

export default {
  name: 'Viewer',
  components: {
    ThumbnailList,
    ImageViewer,
    PDFViewer,
    VideoPlayer,
    AudioPlayer,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    appendToBody: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      visible: false, // 弹窗显示隐藏
      currentIndex: 0, // 当前索引
      fileType: FileType, // 文件类型
      imageViewerProps: {
        // 图片预览器选项
        options: {
          inline: true,
          backdrop: false,
          button: false,
          ready: event => {
            if (this.current && this.current._fileType === FileType['IMAGE']) {
              const { _typeIndex } = this.current
              this.viewImage(_typeIndex)
            }
          },
          view: event => {
            const {
              detail: { index: typeIndex },
            } = event
            const current = this.imageData.find(
              item => item._typeIndex === typeIndex
            )
            current && this.change(current._originIndex)
          },
        },
      },
    }
  },
  computed: {
    // 视频播放器选项
    videoPlayerProps() {
      return {
        options: {
          autoplay: true,
          controls: true,
          fluid: true,
          sources: [
            {
              src: this.current ? this.current._src : '',
            },
          ],
        },
      }
    },
    // 音频播放器选项
    audioPlayerProps() {
      return {
        options: {
          autoplay: true,
          controls: true,
          src: this.current ? this.current._src : '',
        },
      }
    },
    // PDF查看器选项
    PDFViewerProps() {
      return {
        pdfSrc: this.current ? this.current._src : '',
        titleName: this.current
          ? this.current.title || this.current._filename
          : '',
      }
    },
    // 重构数据，添加索引和类型索引
    rebuildData() {
      const typeIndexMap = Object.values(FileType).reduce(
        (typendexValue, fileType) => {
          return {
            ...typendexValue,
            [fileType]: 0,
          }
        },
        {}
      )
      return this.data.reduce(
        (rebuildData, item, index) => {
          const filename = this.getFilename(item)
          const src = this.getSrc(item)
          const fileType = getFileType(filename)
          return {
            data: [
              ...rebuildData.data,
              {
                ...item,
                _filename: filename,
                _src: src,
                _fileType: fileType,
                _typeIndex: rebuildData.typeIndexMap[fileType]++,
                _originIndex: index,
              },
            ],
            typeIndexMap: rebuildData.typeIndexMap,
          }
        },
        { data: [], typeIndexMap }
      ).data
    },
    // 图像类型数据，用于渲染图像查看
    imageData() {
      return this.rebuildData.filter(item => {
        const fileType = getFileType(this.getFilename(item))
        return fileType === FileType['IMAGE']
      })
    },
    // 当前选中
    current() {
      if (!(this.rebuildData && this.rebuildData.length)) {
        return null
      }
      return this.rebuildData[this.currentIndex]
    },
  },
  watch: {
    current(val) {
      const { _typeIndex } = val

      if (this.isImage(val)) {
        this.viewImage(_typeIndex)
      }
    },
    visible(val) {
      this.appendViewerDialogToBody()
    },
  },
  mounted() {
    this.appendViewerDialogToBody()
  },
  destroyed() {
    if (
      this.appendToBody &&
      this.$refs['viewer-dialog'] &&
      this.$refs['viewer-dialog'].parentNode
    ) {
      this.$refs['viewer-dialog'].parentNode.removeChild(
        this.$refs['viewer-dialog']
      )
    }
  },
  methods: {
    appendViewerDialogToBody() {
      this.$nextTick(() => {
        if (this.visible && this.appendToBody && this.$refs['viewer-dialog']) {
          document.body.appendChild(this.$refs['viewer-dialog'])
        }
      })
    },
    isImage(file) {
      const fileType = getFileType(this.getFilename(file))

      return fileType === FileType['IMAGE']
    },

    viewImage(index) {
      this.$refs['imageViewer'] &&
        this.$refs['imageViewer'].$viewer &&
        this.$refs['imageViewer'].$viewer.view(index)
    },
    // 获取文件名
    getFilename(file) {
      if (!file) {
        return ''
      }
      const { name = '', src = '', url = '' } = file || {}
      return name || src || url
    },
    // 获取文件src
    getSrc(file) {
      if (!file) {
        return ''
      }
      const { src = '', url = '' } = file || {}
      let urlReal = src || url
      let re = new RegExp(
        /(http|ftp|https):\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\.,@?^=%&:/~\+#]*[\w\-\@?^=%&/~\+#])?/
      )
      return re.test(urlReal) ? urlReal : `${location.origin}/${urlReal}`
    },
    prev() {
      this.currentIndex--
    },
    next() {
      this.currentIndex++
    },
    change(index) {
      this.currentIndex = index
    },
    toggle() {
      this.visible = !this.visible
    },
  },
}
</script>

<style lang="scss" scoped>
.viewer-dialog {
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  z-index: 2999;
}
.viewer-dialog-navbar {
  padding: $--padding-base;
  width: 260px;
  height: 100%;
  background: #000;
  box-sizing: border-box;
}
.viewer-dialog-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: $--padding-medium;
}
.viewer-dialog-close {
  z-index: 1;
  background-color: rgba(0, 0, 0, 0.5);
  border-radius: 50%;
  cursor: pointer;
  height: 80px;
  overflow: hidden;
  position: absolute;
  right: -40px;
  top: -40px;
  transition: background-color 0.15s;
  width: 80px;
  &:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }
  &::before {
    bottom: 15px;
    left: 15px;
    position: absolute;
    background-position: -260px 0;
    content: 'Close';
    background-image: url('data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAARgAAAAUCAYAAABWOyJDAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAABx0RVh0U29mdHdhcmUAQWRvYmUgRmlyZXdvcmtzIENTNui8sowAAAQPSURBVHic7Zs/iFxVFMa/0U2UaJGksUgnIVhYxVhpjDbZCBmLdAYECxsRFBTUamcXUiSNncgKQbSxsxH8gzAP3FU2jY0kKKJNiiiIghFlccnP4p3nPCdv3p9778vsLOcHB2bfveeb7955c3jvvNkBIMdxnD64a94GHMfZu3iBcRynN7zAOI7TG15gHCeeNUkr8zaxG2lbYDYsdgMbktBsP03jdQwljSXdtBhLOmtjowC9Mg9L+knSlcD8TNKpSA9lBpK2JF2VdDSR5n5J64m0qli399hNFMUlpshQii5jbXTbHGviB0nLNeNDSd9VO4A2UdB2fp+x0eCnaXxWXGA2X0au/3HgN9P4LFCjIANOJdrLr0zzZ+BEpNYDwKbpnQMeAw4m8HjQtM6Z9qa917zPQwFr3M5KgA6J5rTJCdFZJj9/lyvGhsDvwFNVuV2MhhjrK6b9bFiE+j1r87eBl4HDwCF7/U/k+ofAX5b/EXBv5JoLMuILzf3Ap6Z3EzgdqHMCuF7hcQf4HDgeoHnccncqdK/TvSDWffFXI/exICY/xZyqc6XLWF1UFZna4gJ7q8BsRvgd2/xXpo6P+D9dfT7PpECtA3cnWPM0GXGFZh/wgWltA+cDNC7X+AP4GzjZQe+k5dRxuYPeiuXU7e1qwLpDz7dFjXKRaSwuMLvAlG8zZlG+YmiK1HoFqT7wP2z+4Q45TfEGcMt01xLoNZEBTwRqD4BLpnMLeC1A41UmVxsXgXeBayV/Wx20rpTyrpnWRft7p6O/FdqzGrDukPNtkaMoMo3FBdBSQMOnYBCReyf05s126fU9ytfX98+mY54Kxnp7S9K3kj6U9KYdG0h6UdLbkh7poFXMfUnSOyVvL0h6VtIXHbS6nOP+s/Zm9mvyXW1uuC9ohZ72E9uDmXWLJOB1GxsH+DxPftsB8B6wlGDN02TAkxG6+4D3TWsbeC5CS8CDFce+AW500LhhOW2020TRjK3b21HEmgti9m0RonxbdMZeVzV+/4tF3cBpP7E9mKHNL5q8h5g0eYsCMQz0epq8gQrwMXAgcs0FGXGFRcB9wCemF9PkbYqM/Bas7fxLwNeJPdTdpo4itQti8lPMqTpXuozVRVXPpbHI3KkNTB1NfkL81j2mvhDp91HgV9MKuRIqrykj3WPq4rHyL+axj8/qGPmTqi6F9YDlHOvJU6oYcTsh/TYSzWmTE6JT19CtLTJt32D6CmHe0eQn1O8z5AXgT4sx4Vcu0/EQecMydB8z0hUWkTd2t4CrwNEePqMBcAR4mrBbwyXLPWJa8zrXmmLEhNBmfpkuY2102xxrih+pb+ieAb6vGhuA97UcJ5KR8gZ77K+99xxeYBzH6Q3/Z0fHcXrDC4zjOL3hBcZxnN74F+zlvXFWXF9PAAAAAElFTkSuQmCC');
    background-repeat: no-repeat;
    background-size: 280px;
    color: transparent;
    display: block;
    font-size: 0;
    height: 20px;
    line-height: 0;
    width: 20px;
  }
}
.viewer-box {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
}
.image-viewer-images {
  display: none;
}
</style>
