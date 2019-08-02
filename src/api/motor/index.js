import axios from 'axios'

export default {
  /**
   * 马达列表，带分页
   * @returns {*}
   */
  list (condition, pageInfo) {
    pageInfo = Object.assign({
      currentPage: 1,
      pageSize: 10
    }, pageInfo)
    return axios.post('/motor/item/list', {
      ...condition,
      ...pageInfo
    })
  },
  /**
   * 马达新增
   * @returns {*}
   */
  create (vo) {
    return axios.get('/motor/item/create', {
      params: {
        ...vo
      }
    })
  },
  /**
   * 马达编辑
   * @returns {*}
   */
  edit (vo) {
    return axios.get('/motor/item/edit', {
      params: {
        ...vo
      }
    })
  },
  /**
   * 马达删除
   * @returns {*}
   */
  del (id) {
    return axios.get('/motor/item/del', {
      params: {
        id
      }
    })
  },
}
