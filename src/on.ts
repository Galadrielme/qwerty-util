/**
 * @description 绑定事件 on(element, event, handler)
 */

type Ele = Element | Document;

type Handler = (this: Ele, ev: Event) => any;

export const on = (function () {
    if (!!document.addEventListener) {
        return function (element: Ele, event: string, handler: Handler) {
            if (element && event && handler) {
                element.addEventListener(event, handler, false)
            }
        }
    } else {
        return function (element: Ele, event: string, handler: Handler) {
            if (element && event && handler) {
                (<any>element).attachEvent('on' + event, handler)
            }
        }
    }
})()

/**
 * @description 解绑事件 off(element, event, handler)
 */
export const off = (function () {
    if (!!document.removeEventListener) {
        return function (element: Ele, event: string, handler: Handler) {
            if (element && event) {
                element.removeEventListener(event, handler, false)
            }
        }
    } else {
        return function (element: Ele, event: string, handler: Handler) {
            if (element && event) {
                (<any>element).detachEvent('on' + event, handler)
            }
        }
    }
})()
