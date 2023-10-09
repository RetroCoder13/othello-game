const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

var aspect_ratio

var positions = {}
var dimensions = 8

function calculateHeight(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    if(aspect_ratio<=1){
        document.getElementById('colour').style.left = canvas.width + 10 + "px"
    } else {
        document.getElementById('colour').style.left = canvas.height + 10 + "px"
    }

    aspect_ratio = canvas.width/canvas.height
}

calculateHeight()

function update(){
    ctx.clearRect(0,0,canvas.clientWidth,canvas.height)

    drawGrid(dimensions)

    requestAnimationFrame(update)
}

function drawGrid(dimensions){
    let total = 0
    if(aspect_ratio<=1){
        let size = canvas.width/dimensions
        for(let x=0;x<dimensions;x++){
            for(let y=0;y<dimensions;y++){
                total++
                if(positions[`${[x+1,y+1]}`]){
                    ctx.fillStyle = positions[`${[x+1,y+1]}`]
                } else if(total%2==0){
                    ctx.fillStyle = "#000000"
                } else{
                    ctx.fillStyle = "#FFFFFF"
                }
                ctx.fillRect(x*size,y*size,size,size)
            }
            if(dimensions%2==0){
                total++
            }
        }
    } else {
        let size = canvas.height/dimensions
        for(let x=0;x<dimensions;x++){
            for(let y=0;y<dimensions;y++){
                total++
                if(positions[`${[x+1,y+1]}`]){
                    ctx.fillStyle = positions[`${[x+1,y+1]}`]
                } else if(total%2==0){
                    ctx.fillStyle = "#000000"
                } else{
                    ctx.fillStyle = "#FFFFFF"
                }
                ctx.fillRect(x*size,y*size,size,size)
            }
            if(dimensions%2==0){
                total++
            }
        }
    }
}

window.addEventListener('resize',calculateHeight)

canvas.addEventListener('mousedown',function(e){
    let size
    if(aspect_ratio<=1 && e.offsetX <= canvas.width){
        size = canvas.width/dimensions
        positions[`${[Math.ceil(e.offsetX%(dimensions*size)/size),Math.ceil(e.offsetY%(dimensions*size)/size)]}`] = document.getElementById('colour').value
    } else if(aspect_ratio>1 && e.offsetX <= canvas.height) {
        size = canvas.height/dimensions
        positions[`${[Math.ceil(e.offsetX%(dimensions*size)/size),Math.ceil(e.offsetY%(dimensions*size)/size)]}`] = document.getElementById('colour').value
    }
})

requestAnimationFrame(update)