
const r = document.querySelector(':root');
const heightSet = document.querySelector("input#height");

/**
 * 
 * @param {keyof HTMLElementTagNameMap} selectors
 * @param {string} cssVariable 
 */
function set_value_property(selectors,cssVariable) {
    const val = document.querySelector(selectors=selectors);
    if (val) {
        val.addEventListener("change",function (ev) {
            r.style.setProperty(cssVariable,this.value + "cm");
        })
    }
}
set_value_property("input#height","--plate-height");
set_value_property("input#width","--plate-width");


// if (heightSet){
//     heightSet.addEventListener("change" ,(function (ev) {
//         console.log(ev);
//         console.log(this);  
//         console.log(this.value)
//         r.style.setProperty("--plate-width",this.value + "cm");

//     }))
// }
// console.log(heightSet);