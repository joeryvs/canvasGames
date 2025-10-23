
/**
 * Root element
 * @type {HTMLElement}
 */
const r = document.querySelector(':root');

/**
 * Change a CSS Variable on a change event
 * @param {keyof HTMLElementTagNameMap} selectors
 * @param {string} cssVariable 
 */
function set_value_property(selectors,cssVariable) {
    const val = document.querySelector(selectors=selectors);
    if (val) {
        val.addEventListener("change",function (ev) {
            r.style.setProperty(cssVariable,this.value + "cm");
        })
        // set default
        r.style.setProperty(cssVariable,val.value + "cm");
    }
}
// change the variables
set_value_property("input#height","--plate-height");
set_value_property("input#width","--plate-width");

