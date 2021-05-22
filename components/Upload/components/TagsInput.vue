<template>
  <div class="tags-input">
    <div class="tags-input-tag" v-for="file in value" :key="file.name">
      <el-tag
        closable
        :type="tagType"
        :size="tagSize"
        :effect="tagEffect"
        @close="handleClose(file)"
      >
        <el-popover
          v-if="file.url && showPreview"
          placement="top"
          :title="file.name"
          trigger="hover"
        >
          <span
            slot="reference"
            class="tags-input-tag-name"
            :title="file.name || file.url"
          >
            {{ file.name || file.url }}
          </span>
          <SvgIcon
            v-if="isSVG(file.name)"
            :icon-class="file.url"
            class-name="tags-input-tag-img"
          />
          <img
            :src="file.url"
            :alt="file.name"
            class="tags-input-tag-img"
            v-else
          />
        </el-popover>
        <span v-else class="tags-input-tag-name" :title="file.name || file.url">
          {{ file.name || file.url }}
        </span>
      </el-tag>
    </div>

    <span v-if="!(value && value.length) && placeholder">
      {{ placeholder }}
    </span>
  </div>
</template>

<script>
import SvgIcon from '../../SvgIcon'
import { getExtName } from '../../../utils/file'
export default {
  name: 'TagsInput',
  components: {
    SvgIcon,
  },
  props: {
    value: {
      type: Array,
      default: () => [],
    },
    tagType: {
      type: String,
      default: '',
      validator: val =>
        ['', 'success', 'info', 'warning', 'danger'].includes(val),
    },
    tagSize: {
      type: String,
      default: 'mini',
      validator: val => ['medium', 'small', 'mini'].includes(val),
    },
    tagEffect: {
      type: String,
      default: 'dark',
      validator: val => ['dark', 'light', 'plain'].includes(val),
    },
    placeholder: {
      type: String,
      default: '',
    },
    showPreview: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleClose(file) {
      this.$emit(
        'input',
        this.value.filter(item => item !== file),
        file
      )
    },
    isSVG(name) {
      return getExtName(name) === 'svg'
    },
  },
}
</script>

<style lang="scss" scoped>
.tags-input {
  font-size: 12px;
  text-align: left;
  min-width: 184px;
  vertical-align: top;
  width: 100%;
  box-sizing: border-box;
  -webkit-appearance: none;
  background-color: #103c5d;
  background-image: none;
  border-radius: 4px;
  border: 1px solid #1a4a72;
  box-sizing: border-box;
  color: #90b1cd;
  display: inline-block;
  min-height: 28px;
  line-height: 28px;
  outline: none;
  padding: 0 15px;
  transition: border-color 0.2s cubic-bezier(0.645, 0.045, 0.355, 1);
  &:hover,
  &:focus {
    border-color: #21aeff;
  }
}
.tags-input-tag {
  display: inline-block;
  margin-right: 0.5rem;
}
.tags-input-tag:last-of-type {
  margin-right: 0;
}
.tags-input-tag-name {
  display: inline-block;
  vertical-align: middle;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
}
.tags-input-tag-img {
  width: 200px;
  height: 200px;
  padding: 20px;
}
</style>
