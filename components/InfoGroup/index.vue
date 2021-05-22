<script>
import InfoTitle from '../InfoTitle'
import Viewer from '../Viewer'
export default {
  components: { InfoTitle },
  props: {
    title: {
      type: String,
      default: null,
    },
    cols: {
      type: Number,
      default: 2,
    },
    labelSuffix: {
      type: String,
      default: '',
    },
    labelWidth: {
      type: [String, Number],
      default: null,
    },
    labelPosition: {
      type: String,
      default: 'left',
    },
    data: {
      type: Array,
      required: true,
    },
  },
  computed: {
    itemWidthPercentage() {
      return 100 / this.cols
    },
  },
  render() {
    const { data, title, itemWidthPercentage, cols, labelSuffix } = this
    return (
      <div class="info-group">
        {title && <InfoTitle>{title}</InfoTitle>}
        <div class="info-group-body">
          {data &&
            data.map(
              (
                {
                  label,
                  type,
                  content,
                  width,
                  colspan,
                  labelWidth,
                  labelPosition,
                  itemStyle: itemStyleProp = {},
                  labelStyle: labelStyleProp = {},
                  contentStyle: contentStyleProp = {},
                },
                idx
              ) => {
                if (colspan && colspan > cols) {
                  colspan = cols
                }
                const itemStyle = {
                  width:
                    width ||
                    `${(colspan && itemWidthPercentage * colspan) ||
                      itemWidthPercentage}%`,
                  ...itemStyleProp,
                }
                const labelStyle = { ...labelStyleProp }
                const contentStyle = { ...contentStyleProp }
                labelWidth = labelWidth || this.labelWidth
                if (labelWidth) {
                  labelStyle.width =
                    typeof labelWidth === 'string'
                      ? labelWidth
                      : labelWidth + 'px'
                }
                labelPosition = labelPosition || this.labelPosition
                if (labelPosition === 'right') {
                  labelStyle['text-align'] = 'right'
                }
                if (type === 'image') {
                  const images = content
                  content =
                    images &&
                    images.map(img => {
                      if (!img) {
                        return null
                      }
                      if (img.path) {
                        return (
                          <el-image
                            src={img.path}
                            previewSrcList={[img.path]}
                          />
                        )
                      }
                      return <el-image src={img} previewSrcList={[img]} />
                    })
                }
                if (type === 'files' && content) {
                  const files = content
                  let data = files.map(item => {
                    if (typeof item === 'object') {
                      return {
                        url: item.url || item.src || item.path,
                      }
                    }
                    return { url: item }
                  })
                  content = <Viewer appendToBody data={data} />
                }
                if (
                  content === null ||
                  content === undefined ||
                  content === ''
                ) {
                  content = '-'
                }
                return (
                  <div class="info-group-item" key={idx} style={itemStyle}>
                    <div class="info-group-item-label" style={labelStyle}>
                      {label}
                      {labelSuffix && (
                        <span class="info-group-item-label-suffix">
                          {labelSuffix}
                        </span>
                      )}
                    </div>
                    <div class="info-group-item-content" style={contentStyle}>
                      {content}
                    </div>
                  </div>
                )
              }
            )}
        </div>
      </div>
    )
  },
}
</script>

<style lang="scss">
.info-group {
  position: relative;
  &-title {
    font-size: 14px;
    font-weight: 600;
    &:before {
      margin-right: 6px;
      border-left: 2px solid #21aeff;
      content: ' ';
    }
  }
  &-body {
    position: relative;
    display: flex;
    flex-wrap: wrap;
    font-size: 12px;
    line-height: 1.5;
  }
  &-item {
    display: flex;
    &-label {
      padding: 4px 0;
      color: #85a9c7;
      word-break: break-all;
    }
    &-content {
      padding: 4px 10px;
      word-break: break-all;
      flex: 1;
    }
    /deep/ .el-image {
      width: 80px;
      height: 80px;
      margin-right: 2px;
      margin-bottom: 2px;
    }
  }
}
</style>
