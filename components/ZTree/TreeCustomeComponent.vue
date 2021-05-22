<template>
  <span class="">
    测试自定义
    <!-- <span @click.stop="handleAdd">新增</span>
    <span @click.stop="handleEdit">编辑</span>
    <span @click.stop="handleDelete">删除</span> -->
  </span>
</template>

<script>
// import Vue from "vue";
export default {
  name: 'TreeCustomeComponent',
  components: {},
  props: {
    treeId: {
      type: String,
      default: '',
    },
    treeNode: {
      type: Object,
      default: null,
    },
    ztreeObj: {
      type: Object,
      default: null,
    },
    getZtreeobj: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {}
  },
  computed: {},
  watch: {},
  mounted() {
    // console.log(this.$refs);
  },
  methods: {
    // 新增
    handleAdd() {
      console.log('点击新增')
      // const ztreeObj = this.getZtreeobj();
    },
    // 编辑
    handleEdit() {
      console.log('点击编辑')
      // this.treeNode.name = "dsadac";
      // const ztreeObj = this.getZtreeobj();
      // ztreeObj.updateNode(this.treeNode);
    },
    handleDelete() {
      // console.log(this.treeNode);
      console.log('点击删除')
    },
  },
}
</script>
<style lang="scss" scoped>
//@import url(); 引入公共css类
</style>
