<script>
export default {
  render() {
    return <div class="info-title">{this.$slots.default}</div>
  },
}
</script>

<style lang="scss" scoped>
.info-title {
  margin-bottom: 8px;
  font-size: 14px;
  font-weight: 600;
  &:before {
    margin-right: 6px;
    border-left: 2px solid #21aeff;
    content: ' ';
  }
}
</style>
