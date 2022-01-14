const path = require('path')

const createUrl = ({ req, urlPath: urlBasicPath = null, urlBasicFilenameOrData = null, urlCombinedPath = null }) => {
  const urlProtocol = (req.connection.encrypted ? 'https' : 'http') + ':'
  const urlHost = req.headers.host
  let urlPath = urlBasicPath
  let urlFilenameOrData = urlBasicFilenameOrData

  if (urlCombinedPath) {
    const pathArr = urlCombinedPath.split(path.sep)
    urlFilenameOrData = pathArr[pathArr.length - 1]
    urlPath = path.join(...pathArr.filter((el, i, arr) => i !== arr.length - 1))
  }

  const urlParams = {
    protocol: urlProtocol,
    host: urlHost,
    path: urlPath,
    filenameOrData: urlFilenameOrData
  }

  const urlPrepack = Object.values(urlParams).join('/')

  return new URL(urlPrepack.toString())
}

module.exports = createUrl
