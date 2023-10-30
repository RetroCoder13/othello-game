const canvas = document.getElementById('game')
const ctx = canvas.getContext('2d')

var aspect_ratio
var savedPositions = {}

var positions = {}
var dimensions = 8

function calculateHeight(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight

    if(aspect_ratio<=1){
        document.getElementById('options').style.left = canvas.width + 10 + "px"
    } else {
        document.getElementById('options').style.left = canvas.height + 10 + "px"
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
    let added = 0
    ctx.font = "30px Arial"
    if(aspect_ratio<=1){
        let size = canvas.width/dimensions
        for(let x=0;x<dimensions;x++){
            for(let y=0;y<dimensions;y++){
                total++
                if(total%2==0){
                    ctx.fillStyle = "#000000"
                    ctx.fillRect(x*size,y*size,size,size)
                } else{
                    ctx.fillStyle = "#FFFFFF"
                    ctx.fillRect(x*size,y*size,size,size)
                }
                if(positions[`${[x+1,y+1]}`]){
                    ctx.fillStyle = positions[`${[x+1,y+1]}`]
                    ctx.beginPath()
                    ctx.ellipse(x*size+size/2,y*size+size/2,size/2,size/2,0,0,360)
                    ctx.fill()
                }
                if(total<dimensions+1){
                    ctx.fillStyle = "#AAA"
                    ctx.textAlign = "start"
                    ctx.fillText(y+1,x*size,y*size+size/2)
                }
                if((total-added)%dimensions == 1){
                    ctx.fillStyle = "#AAA"
                    ctx.textAlign = "center"
                    ctx.fillText(String.fromCharCode(65+x),x*size+size/2,y*size+30)
                }
            }
            if(dimensions%2==0){
                total++
                added++
            }
        }
    } else {
        let size = canvas.height/dimensions
        for(let x=0;x<dimensions;x++){
            for(let y=0;y<dimensions;y++){
                total++
                if(total%2==0){
                    ctx.fillStyle = "#000000"
                    ctx.fillRect(x*size,y*size,size,size)
                } else{
                    ctx.fillStyle = "#FFFFFF"
                    ctx.fillRect(x*size,y*size,size,size)
                }
                if(positions[`${[x+1,y+1]}`]){
                    ctx.fillStyle = positions[`${[x+1,y+1]}`]
                    ctx.beginPath()
                    ctx.ellipse(x*size+size/2,y*size+size/2,size/2,size/2,0,0,360)
                    ctx.fill()
                }
                if(total<dimensions+1){
                    ctx.fillStyle = "#AAA"
                    ctx.textAlign = "start"
                    ctx.fillText(y+1,x*size,y*size+size/2)
                }
                if((total-added)%dimensions == 1){
                    ctx.fillStyle = "#AAA"
                    ctx.textAlign = "center"
                    ctx.fillText(String.fromCharCode(65+x),x*size+size/2,y*size+30)
                }
            }
            if(dimensions%2==0){
                total++
                added++
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
        logic(`${[Math.ceil(e.offsetX%(dimensions*size)/size),Math.ceil(e.offsetY%(dimensions*size)/size)]}`,document.getElementById('colour').value)
    } else if(aspect_ratio>1 && e.offsetX <= canvas.height) {
        size = canvas.height/dimensions
        positions[`${[Math.ceil(e.offsetX%(dimensions*size)/size),Math.ceil(e.offsetY%(dimensions*size)/size)]}`] = document.getElementById('colour').value
        logic(`${[Math.ceil(e.offsetX%(dimensions*size)/size),Math.ceil(e.offsetY%(dimensions*size)/size)]}`,document.getElementById('colour').value)
    }
})

function logic(position,colour){
    position = position.split(',')
    // if(positions[`${[parseInt(position[0])-2,parseInt(position[1])-2]}`] == colour && positions[`${[parseInt(position[0])-1,parseInt(position[1])-1]}`]){
    //     positions[`${[parseInt(position[0])-1,parseInt(position[1])-1]}`] = colour
    // }
    // if(positions[`${[parseInt(position[0]),parseInt(position[1])-2]}`] == colour && positions[`${[parseInt(position[0]),parseInt(position[1])-1]}`]){
    //     positions[`${[parseInt(position[0]),parseInt(position[1])-1]}`] = colour
    // }
    // if(positions[`${[parseInt(position[0])+2,parseInt(position[1])-2]}`] == colour && positions[`${[parseInt(position[0])+1,parseInt(position[1])-1]}`]){
    //     positions[`${[parseInt(position[0])+1,parseInt(position[1])-1]}`] = colour
    // }
    // if(positions[`${[parseInt(position[0])+2,parseInt(position[1])]}`] == colour && positions[`${[parseInt(position[0])+1,parseInt(position[1])]}`]){
    //     positions[`${[parseInt(position[0])+1,parseInt(position[1])]}`] = colour
    // }
    // if(positions[`${[parseInt(position[0])+2,parseInt(position[1])+2]}`] == colour && positions[`${[parseInt(position[0])+1,parseInt(position[1])+1]}`]){
    //     positions[`${[parseInt(position[0])+1,parseInt(position[1])+1]}`] = colour
    // }
    // if(positions[`${[parseInt(position[0]),parseInt(position[1])+2]}`] == colour && positions[`${[parseInt(position[0]),parseInt(position[1])+1]}`]){
    //     positions[`${[parseInt(position[0]),parseInt(position[1])+1]}`] = colour
    // }
    // if(positions[`${[parseInt(position[0])-2,parseInt(position[1])+2]}`] == colour && positions[`${[parseInt(position[0])-1,parseInt(position[1])+1]}`]){
    //     positions[`${[parseInt(position[0])-1,parseInt(position[1])+1]}`] = colour
    // }
    // if(positions[`${[parseInt(position[0])-2,parseInt(position[1])]}`] == colour && positions[`${[parseInt(position[0])-1,parseInt(position[1])]}`]){
    //     positions[`${[parseInt(position[0])-1,parseInt(position[1])]}`] = colour
    // }
    let newPositions = JSON.parse(JSON.stringify(positions))
    for(let i=1;i<dimensions;i++){
        if(positions[`${[parseInt(position[0])-i,parseInt(position[1])-i]}`]){
            if(positions[`${[parseInt(position[0])-i,parseInt(position[1])-i]}`] == colour){
                positions = newPositions
                break
            }
            newPositions[`${[parseInt(position[0])-i,parseInt(position[1])-i]}`] = colour
        }
    }

    newPositions = JSON.parse(JSON.stringify(positions))
    for(let i=1;i<dimensions;i++){
        if(positions[`${[parseInt(position[0]),parseInt(position[1])-i]}`]){
            if(positions[`${[parseInt(position[0]),parseInt(position[1])-i]}`] == colour){
                positions = newPositions
                break
            }
            newPositions[`${[parseInt(position[0]),parseInt(position[1])-i]}`] = colour
        }
    }

    newPositions = JSON.parse(JSON.stringify(positions))
    for(let i=1;i<dimensions;i++){
        if(positions[`${[parseInt(position[0])+i,parseInt(position[1])-i]}`]){
            if(positions[`${[parseInt(position[0])+i,parseInt(position[1])-i]}`] == colour){
                positions = newPositions
                break
            }
            newPositions[`${[parseInt(position[0])+i,parseInt(position[1])-i]}`] = colour
        }
    }

    newPositions = JSON.parse(JSON.stringify(positions))
    for(let i=1;i<dimensions;i++){
        if(positions[`${[parseInt(position[0])+i,parseInt(position[1])]}`]){
            if(positions[`${[parseInt(position[0])+i,parseInt(position[1])]}`] == colour){
                positions = newPositions
                break
            }
            newPositions[`${[parseInt(position[0])+i,parseInt(position[1])]}`] = colour
        }
    }

    newPositions = JSON.parse(JSON.stringify(positions))
    for(let i=1;i<dimensions;i++){
        if(positions[`${[parseInt(position[0])+i,parseInt(position[1])+i]}`]){
            if(positions[`${[parseInt(position[0])+i,parseInt(position[1])+i]}`] == colour){
                positions = newPositions
                break
            }
            newPositions[`${[parseInt(position[0])+i,parseInt(position[1])+i]}`] = colour
        }
    }

    newPositions = JSON.parse(JSON.stringify(positions))
    for(let i=1;i<dimensions;i++){
        if(positions[`${[parseInt(position[0]),parseInt(position[1])+i]}`]){
            if(positions[`${[parseInt(position[0]),parseInt(position[1])+i]}`] == colour){
                positions = newPositions
                break
            }
            newPositions[`${[parseInt(position[0]),parseInt(position[1])+i]}`] = colour
        }
    }

    newPositions = JSON.parse(JSON.stringify(positions))
    for(let i=1;i<dimensions;i++){
        if(positions[`${[parseInt(position[0])-i,parseInt(position[1])+i]}`]){
            if(positions[`${[parseInt(position[0])-i,parseInt(position[1])+i]}`] == colour){
                positions = newPositions
                break
            }
            newPositions[`${[parseInt(position[0])-i,parseInt(position[1])+i]}`] = colour
        }
    }

    newPositions = JSON.parse(JSON.stringify(positions))
    for(let i=1;i<dimensions;i++){
        if(positions[`${[parseInt(position[0])-i,parseInt(position[1])]}`]){
            if(positions[`${[parseInt(position[0])-i,parseInt(position[1])]}`] == colour){
                positions = newPositions
                break
            }
            newPositions[`${[parseInt(position[0])-i,parseInt(position[1])]}`] = colour
        }
    }
}

requestAnimationFrame(update)

function save(){
    eval(`savedPositions["${prompt("Save as")}"] = positions`)
    localStorage.setItem("othello-game-positions",JSON.stringify(savedPositions))
    loadSaveData()
}

function loadSaveData(){
    if(localStorage.getItem("othello-game-positions")){
        savedPositions = JSON.parse(localStorage.getItem("othello-game-positions"))
        document.getElementById("load").innerHTML = "<option selected disabled>Load</option>"

        for(let i=0;i<Object.keys(savedPositions).length;i++){
            document.getElementById("load").innerHTML += `<option value="${Object.keys(savedPositions)[i]}">${Object.keys(savedPositions)[i]}</option>`
        }
    }
}

loadSaveData()

function load(){
    positions = eval(`savedPositions["${document.getElementById("load").value}"]`)
}

function deleteSave(){
    eval(`delete savedPositions["${document.getElementById("load").value}"]`)
    localStorage.setItem("othello-game-positions",JSON.stringify(savedPositions))
    newGame()
}

function newGame(){
    positions = {}
    loadSaveData()
}