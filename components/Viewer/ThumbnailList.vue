<template>
  <ul class="thumbnail-list" :class="directionClass">
    <li
      v-for="(item, index) in data"
      :key="index"
      ref="thumbnails"
      class="thumbnail-item"
      :class="{ 'is-active': isActive(index) }"
    >
      <thumbnail :data="item" @click.native="handleView(index)" />
    </li>
  </ul>
</template>

<script>
import Thumbnail from './components/Thumbnail'
export default {
  name: 'ThumbnailList',
  components: {
    Thumbnail,
  },
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    value: {
      type: Number,
      default: 0,
    },
    direction: {
      type: String,
      default: 'horizontal',
      validator(val) {
        return ['horizontal', 'vertical'].includes(val)
      },
    },
  },
  computed: {
    directionClass() {
      return `is-${this.direction}`
    },
  },
  watch: {
    value() {
      this.scrollIntoView()
    },
  },
  mounted() {
    this.scrollIntoView()
  },
  methods: {
    handleView(index) {
      this.$emit('input', index)
    },
    isActive(index) {
      return this.value === index
    },
    scrollIntoView() {
      if (this.direction === 'horizontal') {
        return
      }
      this.$refs['thumbnails'] &&
        this.$refs['thumbnails'][this.value] &&
        this.$refs['thumbnails'][this.value].scrollIntoView()
    },
  },
}
</script>

<style lang="scss" scoped>
.thumbnail-list {
  display: flex;
  &.is-horizontal {
    display: inline-flex;
    flex-direction: row;
    flex-wrap: wrap;
    .thumbnail-item {
      width: 60px;
      height: 80px;
      margin-top: 10px;
    }
    .thumbnail-item {
      margin-left: 20px;
    }
  }
  &.is-vertical {
    flex-direction: column;

    .thumbnail-item {
      width: 180px;
      height: 200px;
      margin: 0 auto;
    }
    .thumbnail-item + .thumbnail-item {
      margin-top: 20px;
    }
  }
}
.thumbnail-item {
  cursor: pointer;
  opacity: 0.5;
  overflow: hidden;
  transition: opacity 0.15s;
  border-radius: $--border-radius-base;

  &:hover {
    opacity: 0.8;
  }
}
.thumbnail-list.is-vertical {
  .thumbnail-item.is-active {
    opacity: 1;
  }
}
</style>
