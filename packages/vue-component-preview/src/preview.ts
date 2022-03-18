import * as vue from '@vue/runtime-core';

export function preview(app: any, dataProvider: any) {
    return vue.defineComponent({
        render() {
            const proxyToUse = wrapProxy(dataProvider);
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

function wrapProxy(dataProvider: any) {
    if (!dataProvider) {
        return dataProvider;
    }
    if (typeof dataProvider !== 'object') {
        return dataProvider;
    }
    return new Proxy({}, {
        get(target, p, receiver) {
            if (dataProvider[p]) {
                return wrapProxy(dataProvider[p]);
            }
            if (dataProvider.__get__) {
                return wrapProxy(dataProvider.__get__(p));
            }
        }
    })
}
