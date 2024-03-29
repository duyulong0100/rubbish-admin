import axios from 'axios'

export default {
  /**
   * 垃圾列表，带分页
   * @returns {*}
   */
  list (condition, pageInfo) {
    pageInfo = Object.assign({
      currentPage: 1,
      pageSize: 10
    }, pageInfo)
    return axios.post('/rubbish/item/list', {
      ...condition,
      ...pageInfo
    })
  },
  /**
   * 垃圾新增
   * @returns {*}
   */
  create (vo) {
    return axios.get('/rubbish/item/create', {
      params: {
        ...vo
      }
    })
  },
  /**
   * 垃圾编辑
   * @returns {*}
   */
  edit (vo) {
    return axios.get('/rubbish/item/edit', {
      params: {
        ...vo
      }
    })
  },
  /**
   * 垃圾删除
   * @returns {*}
   */
  del (id) {
    return axios.get('/rubbish/item/del', {
      params: {
        id
      }
    })
  },


  /**
   * 垃圾类型列表
   * @returns {*}
   */
  categoryList (condition, pageInfo) {
    pageInfo = Object.assign({
      currentPage: 1,
      pageSize: 10
    }, pageInfo)
    return axios.post('/rubbish/category/list', {
      ...condition,
      ...pageInfo
    })
  },
  /**
   * 垃圾类型新增
   * @returns {*}
   */
  categoryCreate (vo) {
    return axios.get('/rubbish/category/create', {
      params: {
        ...vo
      }
    })
  },
  /**
   * 垃圾类型编辑
   * @returns {*}
   */
  categoryEdit (vo) {
    return axios.get('/rubbish/category/edit', {
      params: {
        ...vo
      }
    })
  },
  /**
   * 垃圾类型删除
   * @returns {*}
   */
  categoryDel (id) {
    return axios.get('/rubbish/category/del', {
      params: {
        id
      }
    })
  },


}
