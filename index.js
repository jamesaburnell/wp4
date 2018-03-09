const app = async () => {
    const node = document.getElementById('app')
    let a = await p()
    node.innerHTML = 'hi'
}

const p = () => new Promise((resolve, reject) => {
    setTimeout(() => {
        resolve('data')
    }, 5000)
})

app()