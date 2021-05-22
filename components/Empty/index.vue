<script>
import emptyImg from './empty.svg'
export default {
  name: 'Empty',
  functional: true,
  props: {
    image: {
      type: [String, Object],
      default: emptyImg,
    },
    description: {
      type: String,
      default: '暂无数据',
    },
  },
  render(h, context) {
    const { props, slots, listeners } = context
    const slotsMap = slots()

    const { image, description } = props

    const alt = typeof des === 'string' ? description : 'empty'

    let imageContent = null
    if (slotsMap.image) {
      imageContent = slotsMap.image
    } else if (image) {
      imageContent =
        typeof image === 'string' ? <img alt={alt} src={image} /> : image
    } else {
      imageContent = <img alt={alt} src={emptyImg} />
    }

    const descriptionContent = slotsMap.description || description

    return (
      <div class="empty" {...{ on: listeners }}>
        <div class="empty-image">{imageContent}</div>
        <p class="empty-description">{descriptionContent}</p>
        {slotsMap.default && <div class="empty-footer">{slotsMap.default}</div>}
      </div>
    )
  },
}
</script>

<style lang="scss" scoped>
.empty {
  margin: 0 8px;
  font-size: 12px;
  line-height: 22px;
  text-align: center;

  &-image {
    height: 100px;
    margin-bottom: 8px;

    img {
      height: 100%;
    }
  }

  &-description {
    margin: 0;
  }

  &-footer {
    margin-top: 16px;
  }
}
</style>
