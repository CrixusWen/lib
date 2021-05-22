<script>
import TagsInput from './components/TagsInput'
import httpRequest from './httpRequest'
import { getExtName } from '../../utils/file'
import isFunction from 'lodash/isFunction'
export default {
  name: 'Upload',
  components: {
    TagsInput,
  },
  props: {
    // 默认文件列表
    defaultFileList: {
      type: [Array, Object],
      default: null,
    },
    // 文件列表
    value: {
      type: [Array, Object],
      default: null,
    },
    // 是否显示文件列表
    showFileList: {
      type: Boolean,
      default: false,
    },
    // 是否禁用
    disabled: {
      type: Boolean,
      default: false,
    },
    // 文件大小限制
    sizeLimit: {
      type: Number,
      default: null,
    },
    // 文件大小限制提示信息
    sizeLimitMsg: {
      type: [String, Function],
      default: () => (size, sizeLimit, file) =>
        `只能上传不超过 ${sizeLimit}kb 的文件，当前文件大小 ${size}kb ，请重新上传！`,
    },
    // 文件数量限制
    numberLimit: {
      type: Number,
      default: null,
    },
    // 文件数量限制提示信息
    numberLimitMsg: {
      type: [String, Function],
      default: () => (currentNumber, lastNumber, numberlimit) =>
        `只能上传不超过 ${numberlimit} 个文件，本次选择了 ${currentNumber} 个文件，共选择了 ${currentNumber +
          lastNumber} 个文件！`,
    },
    // 接受文件类型
    accept: {
      type: String,
      default: '',
    },
    // 文件类型错误提示信息
    acceptMsg: {
      type: [String, Function],
      default: () => (ext, accept, file) =>
        `只能上传 ${accept} 格式的文件，你选择的文件格式为 ${ext} ，请重新选择！`,
    },
    // 提示信息
    tip: {
      type: [String, Object],
      default: '',
    },
    // 文件列表移除文件时的钩子
    onRemove: {
      type: Function,
      default: () => {
        return undefined
      },
    },
    // 文件状态改变时的钩子，添加文件、上传成功和上传失败时都会被调用
    onChange: {
      type: Function,
      default: () => {
        return undefined
      },
    },
    // 覆盖默认的上传行为，可以自定义上传的实现
    httpRequest: {
      type: Function,
      default: httpRequest,
    },
    // 是否是单文件模式,将只返回最后一次上传的文件
    single: {
      type: Boolean,
      default: false,
    },
    listType: {
      type: String,
      default: 'text',
      validator: val =>
        ['text', 'picture', 'picture-card', 'tags-input'].includes(val),
    },
    // tagsInput模式下的placeholder
    tagsInputPlaceholder: {
      type: String,
      default: '点击上传',
    },
    // tagsInput模式下是否开启预览
    tagsInputPreview: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      uploadFiles: this.getUploadFiles(this.value || this.defaultFileList),
    }
  },
  watch: {
    value(val) {
      this.uploadFiles = this.getUploadFiles(val)
    },
  },
  methods: {
    getUploadFiles(value) {
      if (!value) {
        return []
      }
      if (Array.isArray(value)) {
        return value
      } else {
        return [value]
      }
    },
    // 验证文件格式
    validateAccept(file) {
      if (!this.accept) {
        return true
      }
      if (!file) {
        return false
      }
      const ext = getExtName(file.name)
      return this.accept.includes(ext)
    },
    // 验证文件大小
    validateSize(file) {
      if (!file) {
        return false
      }
      const size = Math.ceil(file.size / 1024)
      return size <= this.sizeLimit
    },
    // 根据提示信息函数，获取提示信息
    getMsg(msg, ...others) {
      return isFunction(msg) ? msg(...others) : msg
    },
    // 上传文件之前的钩子，参数为上传的文件，若返回 false 或者返回 Promise 且被 reject，则停止上传。
    handleBeforeUpload(file) {
      const { sizeLimit, sizeLimitMsg, accept, acceptMsg } = this.$props
      let validateStatus = true
      // 文件格式限制
      if (accept && !this.validateAccept(file)) {
        const ext = getExtName(file.name)
        const acceptMsgContent = this.getMsg(acceptMsg, ext, accept, file)
        this.$message.error(acceptMsgContent)
        validateStatus = false
      }
      // 文件大小限制
      if (sizeLimit && !this.validateSize(file)) {
        const size = Math.ceil(file.size / 1024)
        const sizeLimitMsgContent = this.getMsg(
          sizeLimitMsg,
          size,
          sizeLimit,
          file
        )
        this.$message.error(sizeLimitMsgContent)
        validateStatus = false
      }
      return validateStatus
    },
    // 处理超出数量
    handleExceed(files, fileList) {
      const { numberLimit, numberLimitMsg } = this.$props
      const exceedMsgContent = this.getMsg(
        numberLimitMsg,
        files.length,
        fileList.length,
        numberLimit
      )
      this.$message.error(exceedMsgContent)
    },

    // 处理文件移除
    handleRemove(file, fileList) {
      this.onRemove(file, fileList)
      this.handleChange(file, fileList)
    },

    // 处理文件改变，文添加文件、上传成功和上传失败时都会被调用
    handleChange(file, fileList) {
      this.uploadFiles = fileList
      this.onChange(file, fileList)
      this.$emit('input', file, fileList)
      this.$emit('change', file, fileList)
    },
    handleTagsInputChange(fileList, file) {
      this.handleRemove(file, fileList)
    },
  },
  render() {
    const { $props, $attrs, $scopedSlots, $slots } = this
    const {
      showFileList,
      accept,
      tip,
      numberLimit,
      disabled,
      listType,
      tagsInputPlaceholder,
      tagsInputPreview,
    } = $props || {}

    // 触发器，当trigger未定义的时候，默认内容将作为触发器使用

    const textTriggerContent = (
      <el-button type="primary" disabled={disabled}>
        上传
      </el-button>
    )

    const pictureTriggerContent = <i class="el-icon-plus"></i>

    const listTypeTriggerContentMap = {
      text: textTriggerContent,
      picture: pictureTriggerContent,
      'picture-card': pictureTriggerContent,
      'tags-input': (
        <TagsInput
          value={this.uploadFiles}
          onInput={this.handleTagsInputChange}
          placeholder={tagsInputPlaceholder}
          showPreview={tagsInputPreview}
        />
      ),
    }

    const triggerContent = $slots.trigger || listTypeTriggerContentMap[listType]

    // 默认内容
    const defaultContent = $slots.default

    // 提示信息内容
    const tipContent =
      $slots.tip || (tip ? <div class="upload-tip">{tip}</div> : null)

    return (
      <el-upload
        props={{
          ...$attrs,
          fileList: this.uploadFiles,
          showFileList: listType === 'tags-input' ? false : showFileList,
          action: '', // 自定义http-request后action不再生效，但是需要留空处理
          accept,
          limit: numberLimit,
          disabled,
          listType: listType === 'tags-input' ? 'picture' : listType,
          'http-request': this.httpRequest,
          'before-upload': this.handleBeforeUpload,
          'on-exceed': this.handleExceed,
          'on-change': this.handleChange,
          'on-remove': this.handleRemove,
        }}
        class={['upload', { 'upload-tag-input': listType === 'tags-input' }]}
        ref="upload"
        scopedSlots={$scopedSlots}
      >
        <template slot="trigger">{triggerContent}</template>
        {defaultContent}
        <template slot="tip">{tipContent}</template>
      </el-upload>
    )
  },
}
</script>

<style lang="scss" scoped>
.upload {
  &-tip {
    margin-top: 10px;
    font-size: 12px;
    color: #ccc;
  }
}
.upload-tag-input {
  width: 100%;
  >>> .el-upload {
    width: 100%;
  }
}
</style>
