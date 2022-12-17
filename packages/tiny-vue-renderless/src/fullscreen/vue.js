import sf from '@opentiny/vue-renderless/common/deps/fullscreen/screenfull'
import {
  exit,
  enter,
  toggle,
  request,
  getState,
  shadeClick,
  keypressCallback,
  fullScreenCallback,
  onChangeFullScreen,
  computeWrapperStyle
} from './index'

export const api = [
  'state',
  'exit',
  'enter',
  'toggle',
  'request',
  'getState',
  'shadeClick',
  'keypressCallback',
  'fullScreenCallback',
  'onChangeFullScreen'
]

export const renderless = (props, { reactive, computed, watch }, { vm, emit }) => {
  const api = {}

  const state = reactive({
    isFullscreen: false,
    isEnabled: false,
    support: computed(() => state.isEnabled),
    // 如果不支持浏览器全屏，改用网页全屏
    isPageOnly: computed(() => props.pageOnly || !sf.isEnabled),
    wrapperStyle: computed(() => api.computeWrapperStyle())
  })

  Object.assign(api, {
    state,
    getState: getState(state),
    enter: enter(api),
    exit: exit({ state, api, sf }),
    toggle: toggle({ state, api }),
    keypressCallback: keypressCallback(api),
    shadeClick: shadeClick({ props, vm, api }),
    request: request({ props, state, vm, sf, api }),
    fullScreenCallback: fullScreenCallback({ state, sf, api }),
    computeWrapperStyle: computeWrapperStyle({ props, state }),
    onChangeFullScreen: onChangeFullScreen({ props, state, vm, emit })
  })

  watch(
    () => props.fullscreen,
    (value) => {
      if (value !== state.isFullscreen) {
        value ? api.request() : api.exit()
      }
    },
    { lazy: true }
  )

  state.isEnabled = sf.isEnabled

  return api
}
