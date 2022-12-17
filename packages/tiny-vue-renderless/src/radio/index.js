export const handleChange = ({
  constants,
  dispatch,
  emit,
  state,
  nextTick
}) => () => {
  nextTick(() => {
    emit('change', state.model)

    state.isGroup &&
      dispatch(constants.RADIO_GROUP, 'handleChange', [state.model])
  })
}

export const isGroup = ({ constants, parent: $parent, state }) => () => {
  let parent = $parent.$parent.$parent

  while (parent) {
    if (parent.$options.componentName !== constants.RADIO_GROUP) {
      parent = parent.$parent
    } else {
      state.radioGroup = parent

      return true
    }
  }

  return false
}

export const radioSize = ({ props, state }) => () =>
  state.isGroup
    ? state.radioGroup.state.radioGroupSize || props.size
    : props.size

export const isDisabled = ({ props, state }) => () =>
  props.disabled || state.radioGroup.disabled || state.formDisabled

export const tabIndex = ({ props, state }) => () =>
  state.isDisabled || (state.isGroup && state.model !== props.label) ? -1 : 0

export const getModel = ({ props, state }) => () =>
  state.isGroup ? state.radioGroup.modelValue : props.modelValue

export const setModel = ({ constants, dispatch, emit, props, refs, state }) => (
  val
) => {
  if (state.isGroup) {
    dispatch(constants.RADIO_GROUP, 'update:modelValue', [val])
  } else {
    emit('update:modelValue', val)
  }

  refs.radio && (refs.radio.checked = state.model === props.label)
}

export const toggleEvent = ({ props, refs, type }) => {
  const radioEl = refs.radio

  Object.keys(props.events).forEach((ev) => {
    radioEl[type + 'EventListener'](ev, props.events[ev])
  })
}
