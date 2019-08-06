import axios from 'axios'

export default {
  /**
   * 图片上传地址
   */
  uploadAction: '/file/upload',
  /**
   * 下载文件
   */
  getFile (file) {
    var params = {
      fileUrl: file.fileUrl || file.httppath || file.path,
      fileName: file.fileName
    }
    var form = document.createElement('form')
    form.name = 'form'
    document.body.appendChild(form)
    for (var obj in params) {
      if (params.hasOwnProperty(obj)) {
        var input = document.createElement('input')
        input.tpye = 'hidden'
        input.name = obj
        input.value = params[obj]
        form.appendChild(input)
      }
    }
    form.method = 'GET'
    form.action = process.env.VUE_APP_API_PREFIX + '/upload/attachment/downloadByFileUrl.htm'
    form.submit()
    document.body.removeChild(form)
  }
}
