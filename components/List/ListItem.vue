<script>
import { getSlotOptions, isEmptyElement } from '../_util/props'
import ListItemMeta from './ListItemMeta'
export default {
  name: 'ListItem',
  __LIST_ITEM: true,
  Meta: ListItemMeta,
  functional: true,
  render(h, context) {
    const { props, slots, listeners } = context
    const slotsMap = slots()
    const actions = (props.actions || slotsMap.actions || []).filter(
      element => !isEmptyElement(element)
    )
    const metaContent = []
    const otherContent = []
    const extra = props.extra || slotsMap.extra

    ;(slotsMap.default || []).forEach(element => {
      if (!isEmptyElement(element)) {
        if (getSlotOptions(element).__LIST_ITEM_META) {
          metaContent.push(element)
        } else {
          otherContent.push(element)
        }
      }
    })

    const content =
      otherContent.length > 0 ? (
        <div
          class={
            metaContent.length
              ? 'list-item-content'
              : 'list-item-content-single'
          }
        >
          {otherContent}
        </div>
      ) : null

    let actionsContent
    if (actions && actions.length > 0) {
      const actionsContentItem = (action, i) => (
        <li key={`list-item-action-${i}`}>{action}</li>
      )
      actionsContent = (
        <ul class={`list-item-action`}>
          {actions.map((action, i) => actionsContentItem(action, i))}
        </ul>
      )
    }

    return (
      <div {...{ on: listeners }} class="list-item">
        <div class="list-item-main">
          {metaContent}
          {content}
          {actionsContent}
        </div>
        {extra && <div class="list-item-extra">{extra}</div>}
      </div>
    )
  },
}
</script>

<style lang="scss" scoped>
$list-item-padding: 12px 10px;
$action-color: rgb(41, 182, 255);
$action-font-size: 12px;
.list-item {
  padding: $list-item-padding;
  &-main {
    display: flex;
    align-items: center;
  }
  &-content {
    display: flex;
    flex: 1;
    justify-content: flex-end;
  }
  &-content-single {
    justify-content: flex-start;
    flex: 1;
  }
  &-action {
    padding: 0;
    margin-left: 48px;
    font-size: 0;
    list-style: none;
    flex: 0 0 auto;
    & > li {
      position: relative;
      display: inline-block;
      padding: 0 8px;
      font-size: $action-font-size;
      line-height: 22px;
      color: $action-color;
      text-align: center;
      cursor: pointer;
    }
    & > li:first-child {
      padding-left: 0;
    }
  }
}
</style>
