import Services from '../../services'
import { Message } from 'element-ui'
const { request } = new Services()

/*
-------------Element httpRequest 调用上下文参考------------------
post(rawFile) {
  const { uid } = rawFile;
  const options = {
    headers: this.headers,
    withCredentials: this.withCredentials,
    file: rawFile,
    data: this.data,
    filename: this.name,
    action: this.action,
    onProgress: e => {
      this.onProgress(e, rawFile);
    },
    onSuccess: res => {
      this.onSuccess(res, rawFile);
      delete this.reqs[uid];
    },
    onError: err => {
      this.onError(err, rawFile);
      delete this.reqs[uid];
    }
  };
  const req = this.httpRequest(options);
  this.reqs[uid] = req;
  if (req && req.then) {
    req.then(options.onSuccess, options.onError);
  }
}

*/

export default options => {
  const { file } = options
  const formData = new FormData()
  formData.append('files', file)
  return request({
    url: 'file/file/uploadDetail',
    method: 'post',
    data: formData,
    // onUploadProgress: progressEvent => {
    //   const complete = ((progressEvent.loaded / progressEvent.total) * 100) | 0
    //   options.onProgress({ percent: complete })
    // },
  }).then(res => {
    if (res.code === 0 && res.data && res.data.length) {
      return res.data[0]
    } else {
      Message.error(`文件上传失败: ${res.msg},请稍后重试！`)
      throw new Error(res.msg)
    }
  })
}
