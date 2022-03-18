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
            if (app.components) {
                for (const [componentName, componentType] of Object.entries(app.components)) {
                    wrappedComponents[componentName] = preview(componentType, (props) => {
                        const counter = counters[componentName] = counters[componentName] || 0;
                        counters[componentName]++;
                        return data.__render__({ counter, componentName, componentType }, props);
                    });
                }
            }
            this.$.components = wrappedComponents;
            this.$.directives = app.directives;
            const rendered = app.render.call(proxyToUse, proxyToUse, renderCache, props, setupState, data, ctx);
            return rendered;
        }
    })
}

function wrapProxy(data: any) {
    if (!data) {
        return data;
    }
    if (typeof data !== 'object') {
        return data;
    }
    return new Proxy({}, {
        get(target, p, receiver) {
            if (data[p]) {
                return wrapProxy(data[p]);
            }
            if (data.__get__) {
                return wrapProxy(data.__get__(p));
            }
        }
    })
}
