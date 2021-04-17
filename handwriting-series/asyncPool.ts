/** 异步控制并发流
 * 关键点
 * 1、定义 正在执行的任务池，合总的任务池
 * 2、当限制数小于总的任务池时，直接并发，不做控制
 * 3、当总任务数大于限制数时，控制并发，完成时，移除当前执行项
 */
// 固定模板 + 参数校验 + 返回值
// ES7 实现 充分利用了 Promise.all 和 Promise.race 函数特点 再结合 ES7 中提供的 async await 特性
async function asyncPool(limit = 6, array = [], iteratorFn) {
    if(!array || !array.length || typeof iteratorFn !== 'function') {
        throw Error('参数不对')
    }
    const allTask = []
    const executing = []
    for(const item of array) {
        const p = Promise.resolve().then(() => {
            iteratorFn(item, array)
        })
        allTask.push(p)
        if (limit <= array.length) {
            const e = p.then( () => executing.splice(executing.indexOf(e), 1))
            executing.push(e)
            if (executing.length === limit) {
                await Promise.race(executing)
            }
        }
    }
    return Promise.all(allTask)
}