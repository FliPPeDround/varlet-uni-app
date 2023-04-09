import type { App } from 'vue'

export const version: string
export const install: (app: App) => void

export * from './actionSheet'
export * from './appBar'
export * from './avatar'
export * from './avatarGroup'
export * from './backTop'
export * from './badge'
export * from './bottomNavigation'
export * from './bottomNavigationItem'
export * from './breadcrumb'
export * from './breadcrumbs'
export * from './button'
export * from './buttonGroup'
export * from './card'
export * from './cell'
export * from './checkbox'
export * from './checkboxGroup'
export * from './chip'
export * from './col'
export * from './collapse'
export * from './collapseItem'
export * from './context'
export * from './countdown'
export * from './counter'
export * from './datePicker'
export * from './dialog'
export * from './divider'
export * from './ellipsis'
export * from './fab'
export * from './form'
export * from './formDetails'
export * from './hover'
export * from './hoverOverlay'
export * from './icon'
export * from './image'
export * from './imagePreview'
export * from './indexAnchor'
export * from './indexBar'
export * from './input'
export * from './lazy'
export * from './link'
export * from './list'
export * from './loading'
export * from './loadingBar'
export * from './locale'
export * from './menu'
export * from './option'
export * from './overlay'
export * from './pagination'
export * from './paper'
export * from './picker'
export * from './popup'
export * from './progress'
export * from './pullRefresh'
export * from './radio'
export * from './radioGroup'
export * from './rate'
export * from './result'
export * from './ripple'
export * from './row'
export * from './select'
export * from './skeleton'
export * from './slider'
export * from './snackbar'
export * from './space'
export * from './step'
export * from './steps'
export * from './sticky'
export * from './styleProvider'
export * from './swipe'
export * from './swipeItem'
export * from './switch'
export * from './tab'
export * from './tabItem'
export * from './table'
export * from './tabs'
export * from './tabsItems'
export * from './themes'
export * from './timePicker'
export * from './tooltip'
export * from './uploader'
export * from './varComponent'
export * from './varDirective'

declare module 'vue' {
  export interface GlobalComponents {
    VarActionSheet: typeof import('@varlet/uni-app')['_ActionSheetComponent']
    VarAppBar: typeof import('@varlet/uni-app')['_AppBarComponent']
    VarAvatar: typeof import('@varlet/uni-app')['_AvatarComponent']
    VarAvatarGroup: typeof import('@varlet/uni-app')['_AvatarGroupComponent']
    VarBackTop: typeof import('@varlet/uni-app')['_BackTopComponent']
    VarBadge: typeof import('@varlet/uni-app')['_BadgeComponent']
    VarBottomNavigation: typeof import('@varlet/uni-app')['_BottomNavigationComponent']
    VarBottomNavigationItem: typeof import('@varlet/uni-app')['_BottomNavigationItemComponent']
    VarBreadcrumb: typeof import('@varlet/uni-app')['_BreadcrumbComponent']
    VarBreadcrumbs: typeof import('@varlet/uni-app')['_BreadcrumbsComponent']
    VarButton: typeof import('@varlet/uni-app')['_ButtonComponent']
    VarButtonGroup: typeof import('@varlet/uni-app')['_ButtonGroupComponent']
    VarCard: typeof import('@varlet/uni-app')['_CardComponent']
    VarCell: typeof import('@varlet/uni-app')['_CellComponent']
    VarCheckbox: typeof import('@varlet/uni-app')['_CheckboxComponent']
    VarCheckboxGroup: typeof import('@varlet/uni-app')['_CheckboxGroupComponent']
    VarChip: typeof import('@varlet/uni-app')['_ChipComponent']
    VarCol: typeof import('@varlet/uni-app')['_ColComponent']
    VarCollapse: typeof import('@varlet/uni-app')['_CollapseComponent']
    VarCollapseItem: typeof import('@varlet/uni-app')['_CollapseItemComponent']
    VarContext: typeof import('@varlet/uni-app')['_ContextComponent']
    VarCountdown: typeof import('@varlet/uni-app')['_CountdownComponent']
    VarCounter: typeof import('@varlet/uni-app')['_CounterComponent']
    VarDatePicker: typeof import('@varlet/uni-app')['_DatePickerComponent']
    VarDialog: typeof import('@varlet/uni-app')['_DialogComponent']
    VarDivider: typeof import('@varlet/uni-app')['_DividerComponent']
    VarEllipsis: typeof import('@varlet/uni-app')['_EllipsisComponent']
    VarFab: typeof import('@varlet/uni-app')['_FabComponent']
    VarForm: typeof import('@varlet/uni-app')['_FormComponent']
    VarFormDetails: typeof import('@varlet/uni-app')['_FormDetailsComponent']
    VarHoverOverlay: typeof import('@varlet/uni-app')['_HoverOverlayComponent']
    VarIcon: typeof import('@varlet/uni-app')['_IconComponent']
    VarImage: typeof import('@varlet/uni-app')['_ImageComponent']
    VarImagePreview: typeof import('@varlet/uni-app')['_ImagePreviewComponent']
    VarIndexAnchor: typeof import('@varlet/uni-app')['_IndexAnchorComponent']
    VarIndexBar: typeof import('@varlet/uni-app')['_IndexBarComponent']
    VarInput: typeof import('@varlet/uni-app')['_InputComponent']
    VarLink: typeof import('@varlet/uni-app')['_LinkComponent']
    VarList: typeof import('@varlet/uni-app')['_ListComponent']
    VarLoading: typeof import('@varlet/uni-app')['_LoadingComponent']
    VarLoadingBar: typeof import('@varlet/uni-app')['_LoadingBarComponent']
    VarLocale: typeof import('@varlet/uni-app')['_LocaleComponent']
    VarMenu: typeof import('@varlet/uni-app')['_MenuComponent']
    VarOption: typeof import('@varlet/uni-app')['_OptionComponent']
    VarOverlay: typeof import('@varlet/uni-app')['_OverlayComponent']
    VarPagination: typeof import('@varlet/uni-app')['_PaginationComponent']
    VarPaper: typeof import('@varlet/uni-app')['_PaperComponent']
    VarPicker: typeof import('@varlet/uni-app')['_PickerComponent']
    VarPopup: typeof import('@varlet/uni-app')['_PopupComponent']
    VarProgress: typeof import('@varlet/uni-app')['_ProgressComponent']
    VarPullRefresh: typeof import('@varlet/uni-app')['_PullRefreshComponent']
    VarRadio: typeof import('@varlet/uni-app')['_RadioComponent']
    VarRadioGroup: typeof import('@varlet/uni-app')['_RadioGroupComponent']
    VarRate: typeof import('@varlet/uni-app')['_RateComponent']
    VarResult: typeof import('@varlet/uni-app')['_ResultComponent']
    VarRow: typeof import('@varlet/uni-app')['_RowComponent']
    VarSelect: typeof import('@varlet/uni-app')['_SelectComponent']
    VarSkeleton: typeof import('@varlet/uni-app')['_SkeletonComponent']
    VarSlider: typeof import('@varlet/uni-app')['_SliderComponent']
    VarSnackbar: typeof import('@varlet/uni-app')['_SnackbarComponent']
    VarSpace: typeof import('@varlet/uni-app')['_SpaceComponent']
    VarStep: typeof import('@varlet/uni-app')['_StepComponent']
    VarSteps: typeof import('@varlet/uni-app')['_StepsComponent']
    VarSticky: typeof import('@varlet/uni-app')['_StickyComponent']
    VarStyleProvider: typeof import('@varlet/uni-app')['_StyleProviderComponent']
    VarSwipe: typeof import('@varlet/uni-app')['_SwipeComponent']
    VarSwipeItem: typeof import('@varlet/uni-app')['_SwipeItemComponent']
    VarSwitch: typeof import('@varlet/uni-app')['_SwitchComponent']
    VarTab: typeof import('@varlet/uni-app')['_TabComponent']
    VarTabItem: typeof import('@varlet/uni-app')['_TabItemComponent']
    VarTable: typeof import('@varlet/uni-app')['_TableComponent']
    VarTabs: typeof import('@varlet/uni-app')['_TabsComponent']
    VarTabsItems: typeof import('@varlet/uni-app')['_TabsItemsComponent']
    VarThemes: typeof import('@varlet/uni-app')['_ThemesComponent']
    VarTimePicker: typeof import('@varlet/uni-app')['_TimePickerComponent']
    VarTooltip: typeof import('@varlet/uni-app')['_TooltipComponent']
    VarUploader: typeof import('@varlet/uni-app')['_UploaderComponent']
  }

  export interface ComponentCustomProperties {
    vHover: typeof import('@varlet/uni-app')['_HoverComponent']
    vLazy: typeof import('@varlet/uni-app')['_LazyComponent']
    vRipple: typeof import('@varlet/uni-app')['_RippleComponent']
  }
}
