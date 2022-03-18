import * as vue from '@vue/runtime-core';

export function preview(app: any, dataProvider: any) {
    return vue.defineComponent({
        render() {
            const proxyToUse = { todos: [{}] };
            const renderCache = {};
            const props = {};
            const setupState = {};
            const data = {};
            const ctx = {};
            this.$.directives = app.directives;
            return app.render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx);
        }
    })
}