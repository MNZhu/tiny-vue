<template>
  <div>
    <tiny-table :columns="columns" :data="tableData"></tiny-table>
  </div>
</template>

<script>
import { Table } from '@opentiny/vue'

export default {
  components: {
    TinyTable: Table
  },
  data() {
    return {
      columns: [
        {
          width: 60,
          title: '业务',
          field: 'business'
        },
        {
          width: 60,
          title: '空间（万/年）',
          field: 'space'
        },
        {
          width: 60,
          title: 'IDC',
          field: 'idc'
        },
        {
          width: 60,
          title: '阿里云',
          field: 'aliy'
        }
      ],

      tableData: [
        {
          id: '1',
          business: '直播/点播源站',
          space: 80,
          idc: 80,
          aliy: '99'
        },
        {
          id: '1',
          business: '直播/点播源站',
          space: 80,
          idc: 80,
          aliy: '99'
        },
        {
          id: '1',
          business: '直播/点播源站',
          space: 80,
          idc: 80,
          aliy: '99'
        },
        {
          id: '1',
          business: '直播/点播源站',
          space: 80,
          idc: 80,
          aliy: '99'
        },
        {
          id: '1',
          business: '直播/点播源站',
          space: 80,
          idc: 80,
          aliy: '99'
        },
        {
          id: '1',
          business: '直播/点播源站',
          space: 80,
          idc: 80,
          aliy: '99'
        }
      ]
    }
  }
}
</script>
