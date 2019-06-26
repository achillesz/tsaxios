import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from "./types";


export default function xhr(config: AxiosRequestConfig ): AxiosPromise {
  return new Promise((resolve, reject) => {
    const {data = null, url, method = 'get', headers, responseType} = config
    const request = new XMLHttpRequest()

    if(responseType) {
      request.responseType = responseType
    }

    request.onreadystatechange = function handleLoad() {
      if(request.readyState !== 4) {
        return
      }

      const responseHeaders = request.getAllResponseHeaders()
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }

      resolve(response)
    }

    request.open(method.toUpperCase(), url, true)

    Object.keys(headers).forEach((name) => {
      if(data === null && name.toLocaleLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })

    request.send(data)
  })


}