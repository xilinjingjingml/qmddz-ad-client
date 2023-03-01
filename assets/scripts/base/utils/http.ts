import { functions } from "./functions"

interface IHttpOption {
    url: string
    query?: { [key: string]: any }
    method?: "GET" | "POST"
    queryType?: "formdata"
    propertys?: any
    callback?: (res: any, err: Error) => void
}

/**
 * Http网络请求
 */
export namespace http {
    /**
     * 打开链接
     */
    export function open(url: string, query?: { [key: string]: any }, callback?: (res: any, err: Error) => void)
    export function open(url: IHttpOption)
    export function open(url: string | IHttpOption, query?: { [key: string]: any }, callback?: (res: any, err: Error) => void) {
        const option: IHttpOption = typeof url === "string" ? { url: url, query: query, callback: callback } : url
        option.url = option.url.replace("http://", "https://")

        const xhr = new XMLHttpRequest()

        if (option.propertys) {
            for (const key in option.propertys) {
                xhr[key] = option.propertys[key]
            }
        }

        if (option.propertys == null || option.propertys.timeout == null) {
            xhr.timeout = 20 * 1000
        }

        if (option.callback) {
            xhr.onabort = () => {
                cc.error("[http.onabort]", option.url)
                option.callback(null, new Error("onabort"))
            }
            xhr.onerror = () => {
                cc.error("[http.onerror]", option.url)
                option.callback(null, new Error("onerror"))
            }
            xhr.ontimeout = () => {
                cc.warn("[http.ontimeout]", option.url)
                option.callback(null, new Error("ontimeout"))
            }
            xhr.onload = () => {
                cc.log("[http.onload]", option.url)
                if ([200, 307].indexOf(xhr.status) !== -1) {
                    let content: any
                    if (xhr.responseType == "" || xhr.responseType == "text") {
                        if (functions.IsJSON(xhr.responseText)) {
                            content = JSON.parse(xhr.responseText)
                        } else {
                            content = xhr.responseText
                        }
                    } else {
                        content = xhr.response
                    }
                    if (xhr.status === 307 && content.Location) {
                        option.url = content.Location
                        open(option)
                        return
                    }
                    option.callback(content, null)
                } else {
                    option.callback(null, new Error("wrong status:" + xhr.status))
                }
            }
        }

        let body: string | null = null
        if (option.query) {
            if (option.method == "POST") {
                const querys = []
                for (const key in option.query) {
                    querys.push(key + "=" + encodeURIComponent(option.query[key]))
                }
                if (querys.length > 0) {
                    body = querys.join("&")
                }
            } else {
                if (option.url.indexOf("?") == -1) {
                    const querys = []
                    for (const key in option.query) {
                        querys.push(key + "=" + encodeURIComponent(option.query[key]))
                    }
                    if (querys.length > 0) {
                        option.url += "?"
                        option.url += querys.join("&")
                    }
                } else {
                    for (const key in option.query) {
                        option.url = option.url.replace("{" + key + "}", encodeURIComponent(option.query[key]))
                    }
                }
            }
        }

        xhr.open(option.method || "GET", option.url, true)
        if (option.method == "POST" && option.queryType == "formdata") {
            xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
        }
        xhr.send(body)
    }
}
