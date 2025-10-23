
const r = document.querySelector(':root');
const heightSet = document.querySelector("input#height");


function SetValueProperty(querySelect,cssVariable) {
    const val = document.querySelector(querySelect);
    if (val) {
        val.addEventListener("change",function (ev) {
            r.style.setProperty(cssVariable,this.value + "cm");
        })
    }
}

SetValueProperty("input#height","--plate-height");
SetValueProperty("input#width","--plate-width");

// if (heightSet){
//     heightSet.addEventListener("change" ,(function (ev) {
//         console.log(ev);
//         console.log(this);  
//         console.log(this.value)
//         r.style.setProperty("--plate-width",this.value + "cm");

//     }))
// }
// console.log(heightSet);