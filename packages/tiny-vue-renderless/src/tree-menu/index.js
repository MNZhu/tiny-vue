export const initData = ({ state, props, service, api }) => () => {
  if (props.data) {
    state.data = props.data
    return
  }

  if (typeof service.getMenuDataSync === 'function') {
    const menuData = service.getMenuDataSync()

    state.data = api.setMenuKey({ newData: [], menuData })
  }
}

export const setMenuKey = (api) => ({ newData, menuData }) => {
  Array.isArray(menuData) &&
    menuData.forEach((data) => {
      const item = {}

      Object.keys(data).forEach((key) => {
        if (key === 'name') {
          item.label = data[key]
        } else if (key === 'siteNodeId') {
          item.id = data[key]
        } else if (key === 'url' && data[key]) {
          if (data[key].indexOf('#') === -1) {
            item[key] = '#/' + data[key]
          } else {
            item[key] = data[key]
          }
        } else if (key === 'children' && data[key]) {
          item.children = api.setMenuKey({
            newData: [],
            menuData: data.children
          })
        } else {
          item[key] = data[key]
        }
      })

      newData.push({ ...data, ...item })
    })

  return newData
}

export const filterNode = () => (value, data) => {
  if (!value) return true
  return data.label.indexOf(value) !== -1
}

export const watchFilterText = (refs) => (value) => {
  refs.tree.filter(value)
}

export const nodeDragStart = (emit) => (node, event) => {
  emit('node-drag-start', node, event)
}

export const nodeDragEnter = (emit) => (dragNode, dropNode, event) => {
  emit('node-drag-enter', dragNode, dropNode, event)
}

export const nodeDragOver = (emit) => (dragNode, dropNode, event) => {
  emit('node-drag-over', dragNode, dropNode, event)
}

export const nodeDragEnd = (emit) => (dragNode, dropNode, dropType, event) => {
  emit('node-drag-end', dragNode, dropNode, dropType, event)
}

export const nodeDrop = (emit) => (dragNode, dropNode, dropType, event) => {
  emit('node-drop', dragNode, dropNode, dropType, event)
}

export const nodeExpand = (emit) => (nodeData, node) => {
  emit('node-expand', nodeData, node)
}

export const nodeCollapse = (emit) => (nodeData, node) => {
  emit('node-collapse', nodeData, node)
}

export const nodeClick = (emit) => (nodeData, node) => {
  emit('node-click', nodeData, node)
}

export const checkChange = (emit) => (data, checked, indeterminate) => {
  emit('check-change', data, checked, indeterminate)
}

export const check = (emit) => (data, checkedStatus) => {
  emit('check', data, checkedStatus)
}

export const currentChange = (emit) => (data, node) => {
  emit('current-change', data, node)
}

export const getTitle = (props) => (label) => {
  return props.showTitle ? label : ''
}
