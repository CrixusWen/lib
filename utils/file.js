// 图片后缀列表
const ImageExtList = ['.png', '.jpg', '.jpeg', '.bmp', '.gif', '.webp', '.svg']

// 视频后缀列表
const VideoExtList = ['.flv', '.avi', '.mp4', '.ogg']

// 音频后缀列表
const AudioExtList = ['.mp3', '.m4a', '.wav', '.mpeg']

// PDF后缀列表
const PDFExtList = ['.pdf']

// 文件类型
const FileType = {
  IMAGE: 'IMAGE',
  VIDEO: 'VIDEO',
  AUDIO: 'AUDIO',
  PDF: 'PDF',
  OTHER: 'OTHER',
}

// 文件类型列表
const FileTypeList = [
  {
    type: FileType.IMAGE,
    extList: ImageExtList,
  },
  {
    type: FileType.VIDEO,
    extList: VideoExtList,
  },
  {
    type: FileType.AUDIO,
    extList: AudioExtList,
  },
  {
    type: FileType.PDF,
    extList: PDFExtList,
  },
]

/**
 * 获取文件后缀名
 * @param {string} fileName 文件名
 * @param {boolean} [includeDot=false] 是否包含.
 * @returns
 */
const getExtName = (fileName, includeDot = true) => {
  if (!fileName) {
    return ''
  }
  const extReg = /^.+(\.(\w+))$/g
  const [, dotExt = '', ext = ''] = extReg.exec(fileName) || []
  return includeDot ? dotExt : ext
}

/**
 * 下载二进制文件
 * @param {Blob} file 二进制对象
 * @param {string} fileName 文件名
 * @param {type} type 规定被链接文档的的 MIME 类型。
 */
const downloadBlob = (file, fileName, type) => {
  const blob = new Blob([file], { type })
  const url = window.URL.createObjectURL(blob) //创建下载的链接
  download(url, fileName)
  window.URL.revokeObjectURL(url) //释放掉blob对象
}

/**
 * 处理文件下载
 * @param {string}} url 文件下载地址
 * @param {string} fileName 文件名
 * @param {type} type 规定被链接文档的的 MIME 类型。
 */
const download = (url, fileName, type) => {
  const tempLink = document.createElement('a')
  tempLink.style.display = 'none'
  tempLink.href = url
  fileName && tempLink.setAttribute('download', decodeURI(fileName))
  // 兼容：某些浏览器不支持HTML5的download属性
  if (typeof tempLink.download === 'undefined') {
    tempLink.setAttribute('target', '_blank')
  }
  document.body.appendChild(tempLink)
  tempLink.click()
  document.body.removeChild(tempLink)
}

/**
 * 获取文件类型
 * @param {string} fileName 文件名
 * @returns
 */
const getFileType = fileName => {
  const extName = getExtName(fileName)
  const fileTypeInfo = FileTypeList.find(item => {
    return item.extList.includes(extName)
  })
  return fileTypeInfo ? fileTypeInfo.type : FileType.OTHER
}

/**
 * 类型判断函数
 * @param {String} fileType 文件类型
 */
const isFileType = fileType => fileName => {
  const currentFileType = getFileType(fileName)
  return fileType === currentFileType
}

// 判断文件是否是图片
const isImage = isFileType(FileType.IMAGE)
// 判断文件是否是视频
const isVideo = isFileType(FileType.VIDEO)
// 判断文件是否是音频
const isAudio = isFileType(FileType.AUDIO)
// 判断文件是否是Video
const isPDF = isFileType(FileType.PDF)

export {
  getExtName,
  download,
  downloadBlob,
  getFileType,
  isImage,
  isVideo,
  isAudio,
  isPDF,
  FileType,
}
