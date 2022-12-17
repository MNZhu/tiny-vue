import {
  visibleHandle,
  watchVisible,
  formatCascade,
  format,
  getDataType,
  change,
  setColumnValue,
  setValues,
  getColumnValue,
  confirm,
  cancel,
  getColumnIndex,
  getValues,
  getIndexes,
  setIndexes,
  setColumnIndex,
  getColumnValues,
  setColumnValues,
  onChange,
  onCascadeChange,
  emitEvent,
  getColumn,
  getChildrenComponent
} from './index'

export const api = [
  'state',
  'visibleHandle',
  'watchVisible',
  'change',
  'setValues',
  'getColumnValue',
  'confirm',
  'cancel',
  'getColumnIndex',
  'getValues',
  'getIndexes',
  'setIndexes',
  'setColumnIndex',
  'getColumnValues',
  'setColumnValues',
  'onChange',
  'onCascadeChange',
  'emitEvent',
  'getColumn',
  'setColumnValue'
]

const initState = ({ reactive, computed, props, api }) => {
  const state = reactive({
    columns: props.columns,
    toggle: false,
    itemHeight: +props.itemHeight,
    defaultIndex: props.defaultIndex,
    visibleItemCount: props.visibleItemCount,
    clumnsWrapHeight: null,
    formattedColumns: [],
    dataType: computed(() => api.getDataType())
  })

  return state
}

const initApi = ({ api, props, state, emit, refs }) => {
  Object.assign(api, {
    state,
    getColumn: getColumn(refs),
    getValues: getValues(refs),
    getIndexes: getIndexes(refs),
    getDataType: getDataType(state),
    visibleHandle: visibleHandle(emit),
    formatCascade: formatCascade({ state, props }),
    getColumnValues: getColumnValues(refs),
    setColumnValues: setColumnValues(refs),
    emitEvent: emitEvent({ api, state, emit }),
    change: change(api),
    onChange: onChange({ api, state, emit }),
    cancel: cancel({ api, emit }),
    confirm: confirm({ api, refs }),
    format: format({ state, api }),
    setValues: setValues(api),
    setIndexes: setIndexes(api),
    watchVisible: watchVisible(emit),
    setColumnIndex: setColumnIndex(api),
    getColumnValue: getColumnValue(api),
    getColumnIndex: getColumnIndex(api),
    setColumnValue: setColumnValue(api),
    onCascadeChange: onCascadeChange({ api, state, props })
  })
}

const initWatch = ({ watch, props, state, api }) => {
  watch(
    () => props.visible,
    (value) => {
      api.watchVisible({ state, value })
    }
  )

  watch(
    () => props.columns,
    (value) => {
      state.columns = value
      api.format()
    }
  )
}

export const renderless = (props, { computed, onMounted, reactive, watch }, { emit, nextTick, vm, constants }) => {
  const api = {}
  const refs = { childrenPicker: null }
  const state = initState({ reactive, computed, props, api })

  initApi({ api, props, state, emit, refs })

  initWatch({ watch, props, state, api })

  onMounted(() => {
    nextTick(() => {
      refs.childrenPicker = getChildrenComponent({ state, vm, constants })
    })

    api.format()
    state.clumnsWrapHeight = state.itemHeight * state.visibleItemCount
  })

  return api
}
