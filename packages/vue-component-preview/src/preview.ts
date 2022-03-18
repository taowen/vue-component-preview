import * as vue from '@vue/runtime-core';

export function preview(app: any, dataProvider: any) {
    return vue.defineComponent({
        render() {
            const data = dataProvider(this.$props);
            const proxyToUse = wrapProxy(data);
            const renderCache = {};
            const props = {};
            const setupState = {};
            const ctx = {};
            const wrappedComponents = {};
            const counters: Record<string, number> = {};
            for (const [componentName, componentType] of Object.entries(app.components || {})) {
                wrappedComponents[componentName] = preview(componentType, (props) => {
                    const counter = counters[componentName] = counters[componentName] || 0;
                    counters[componentName]++;
                    if (data.__render__) {
                        return data.__render__({ counter, componentName, componentType }, props);
                    }
                });
            }
            this.$.components = wrappedComponents;
            this.$.directives = app.directives;
            if (typeof app === 'function') {
                return app(this.$props, { slots: this.$slots });
            } else {
                return app.render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx);
            }
        }
    })
}

function wrapProxy(data: any) {
    if (typeof data !== 'object') { return data; }
    return new Proxy({}, {
        get(target, p, receiver) {
            if (data[p]) { return wrapProxy(data[p]); }
            if (data.__get__) { return wrapProxy(data.__get__(p)); }
        }
    })
}
