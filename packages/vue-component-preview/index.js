const { defineComponent } = require('@vue/runtime-core');

function wrapProxy(data) {
    if (typeof data !== 'object') { return data; }
    return new Proxy({}, {
        get(target, p, receiver) {
            if (data[p]) { return wrapProxy(data[p]); }
            if (data.__get__) { return wrapProxy(data.__get__(p)); }
        }
    })
}
function preview(app, dataProvider) {
    return defineComponent({
        render() {
            const data = typeof dataProvider === 'function' ? dataProvider(this.$props) : dataProvider;
            const proxyToUse = wrapProxy(data);
            const wrappedComponents = {};
            const counters = {};
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
                return app.render.call(proxyToUse, proxyToUse, {}, {}, {}, data, {});
            }
        }
    })
}
exports = preview;
exports.default = preview;