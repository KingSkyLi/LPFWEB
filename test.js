async function a(params) {
    console.log(444)
    let mm = await b()
    console.log(123)
}

async function b(params) {
    return new Promise((res, rej) => {
        console.log(555)
        let nn = c()
        console.log(111)
    })

}
async function c(params) {
    console.log(222)
}

a()