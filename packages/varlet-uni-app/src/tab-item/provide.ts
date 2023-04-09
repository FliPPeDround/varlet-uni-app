import { useParent } from '@varlet/use'
import { error } from '../utils/logger'
import { TABS_ITEMS_BIND_TAB_ITEM_KEY, type TabsItemsProvider } from '../tabs-items/provide'
import type { ComputedRef } from 'vue'

export interface TabItemProvider {
  index: ComputedRef<number>
  name: ComputedRef<string | number | undefined>
  setCurrent: (value: boolean) => void
}

export function useTabsItems() {
  const { parentProvider, bindParent, index } = useParent<TabsItemsProvider, TabItemProvider>(
    TABS_ITEMS_BIND_TAB_ITEM_KEY
  )

  if (!bindParent) {
    error('TabItem', '<var-tab-item/> must in <var-tabs-items/>')
  }

  return {
    index,
    tabsItems: parentProvider,
    bindTabsItems: bindParent,
  }
}
