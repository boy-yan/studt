import { Hooks } from "../interface/hooks"; 
import { Upload } from "../core";
import { addEvent } from '../utils/index'
const initDrap = (ctx: Upload) => {
    const { container } = ctx
    const { drag } = ctx.optiosn
    if (container && drag) {
        ['dragover', 'drop'].forEach(type => {
            addEvent(container,type, (e: Event) => {
                e.preventDefault()
                if (type === 'drop') {
                    const fileList = (e as DragEvent).dataTransfer.files
                    if (!fileList || !fileList.length) return
                    ctx.fileList.push(...Array.from(fileList))
                }
            })
        })
    }
}

export const attributesModule: Hooks = { init: initDrap }