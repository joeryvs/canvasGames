

try {
    canvas.addEventListener("click", (ev)=>{
        const longString = canvas.toDataURL("png")
        alert("new window open")
        open(longString)
    })
} catch (error) {
    console.error(error);
}
try {
    canv.addEventListener("click", (ev)=>{
        const longString = canv.toDataURL("png")
        alert("new window open")
        open(longString)
    })
} catch (error) {
    console.error(error);
}
try {
    canvv.addEventListener("click", (ev)=>{
        const longString = canvv.toDataURL("png")
        alert("new window open")
        console.log(longString);
        open(longString)
    })
} catch (error) {
    console.error(error);

}

