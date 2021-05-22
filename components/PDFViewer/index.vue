<template>
  <div class="pdf-viewer">
    <p v-if="!pdfSrc" class="pdf-viewer-errorMessage">
      {{ `暂无${titleName}信息` }}
    </p>
    <div id="pdf-content"></div>
  </div>
</template>

<script>
import pdfobject from 'pdfobject'
export default {
  props: {
    pdfSrc: {
      type: String,
      default: '',
    },
    titleName: {
      type: String,
      default: '',
    },
  },
  data() {
    return {}
  },
  watch: {
    pdfSrc() {
      this.updatePDF()
    },
  },
  mounted() {
    this.updatePDF()
  },
  methods: {
    updatePDF() {
      this.pdfSrc && pdfobject.embed(this.pdfSrc, '#pdf-content')
    },
  },
}
</script>
<style lang="scss" scoped>
#pdf-content {
  width: 100%;
}
.pdf-viewer-errorMessage {
  text-align: center;
}
.pdfobject-container {
  height: 40rem;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
</style>
