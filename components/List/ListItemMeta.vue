<script>
import SvgIcon from '../SvgIcon'
export default {
  name: 'ListItemMeta',
  functional: true,
  __LIST_ITEM_META: true,
  components: {
    SvgIcon,
  },
  render(h, context) {
    const { props, slots, listeners } = context
    const slotsMap = slots()
    let index = props.index || slotsMap.index
    index = index !== undefined ? String(index) : ''
    const icon = props.icon ? <SvgIcon iconClass={props.icon} /> : slotsMap.icon
    const title = props.title || slotsMap.title
    const description = props.description || slotsMap.description

    const content = (
      <div class="list-item-meta-content">
        {title && <h4 class="list-item-meta-title">{title}</h4>}
        {description && (
          <div class="list-item-meta-description">{description}</div>
        )}
      </div>
    )
    return (
      <div {...{ on: listeners }} class="list-item-meta">
        {index && <div class="list-item-meta-index">{index}</div>}
        {icon && <div class="list-item-meta-icon">{icon}</div>}
        {(title || description) && content}
      </div>
    )
  },
}
</script>

<style lang="scss" scoped>
$title-color: #ddeefd;
$title-font-size: 14px;
$description-color: #92aec5;
$description-font-size: 12px;

.list-item-meta {
  display: flex;
  flex: 1;
  align-items: flex-start;
  &-index,
  &-icon {
    margin-right: 10px;
  }
  &-index {
    width: 20px;
    height: 20px;
    font-size: 12px;
    line-height: 23px;
    text-align: center;
    background-color: #2e7bbf;
    border-radius: 4px;
  }
  &-content {
    flex: 1 0;
  }
  &-title {
    margin: 0;
    margin-bottom: 4px;
    font-size: $title-font-size;
    line-height: 22px;
    color: $title-color;
  }
  &-description {
    font-size: $description-font-size;
    line-height: 22px;
    color: $description-color;
  }
}
</style>
