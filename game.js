// AUDIO
const typingSound = new Audio("typing.mp3")
const bg = new Audio("horror_ambience.mp3")
const shoot = new Audio("shoot.mp3")
const hit = new Audio("hit.mp3")
const levelSound = new Audio("level.mp3")
const winSound = new Audio("win.mp3")
const rewardSound = new Audio("reward.mp3")

bg.loop = true

// STORY
const story=`⚠️ CLASSIFIED TRANSMISSION — SECRET AGENCY ALERT ⚠️

Memory Status: Corrupted
Identity: Unknown
Location: Earth — Under Threat

A wormhole opened.
Enemies entered Earth.

Destroy targets.
Restore memory.

GOOD LUCK AGENT.`

const storyEl=document.getElementById("story")
const start=document.getElementById("start")

let i=0
function type(){
typingSound.play()
storyEl.textContent+=story[i]
i++
if(i<story.length)setTimeout(type,20)
else start.style.display="block"
}
type()

start.onclick=()=>{
typingSound.pause()
bg.play()
document.getElementById("intro").style.display="none"
document.getElementById("rotate").style.display="flex"
}

// ROTATE
function check(){
if(innerWidth>innerHeight){
document.getElementById("rotate").style.display="none"
document.getElementById("game").style.display="block"
}else{
document.getElementById("rotate").style.display="flex"
}
}
window.addEventListener("resize",check)
check()

// CANVAS
const canvas=document.getElementById("canvas")
const ctx=canvas.getContext("2d")
canvas.width=innerWidth
canvas.height=innerHeight

let cross={x:canvas.width/2,y:canvas.height/2}

// JOYSTICK
const joystick=document.getElementById("joystick")
const stick=document.getElementById("stick")
let drag=false

joystick.addEventListener("touchstart",()=>drag=true)

window.addEventListener("touchend",()=>{
drag=false
stick.style.left="30px"
stick.style.top="30px"
})

window.addEventListener("touchmove",e=>{
if(!drag)return
let r=joystick.getBoundingClientRect()
let x=e.touches[0].clientX-r.left
let y=e.touches[0].clientY-r.top

stick.style.left=x-30+"px"
stick.style.top=y-30+"px"

cross.x+=(x-60)*0.1
cross.y+=(y-60)*0.1
})

// LEVELS
let level=1
let hits=0
const levelText=document.getElementById("levelText")
const tiles=document.querySelectorAll(".tile")
const order=[5,3,2,0,6,8,4,7,1]

let enemies=[]

function spawn(){
const imgs=["enemy1.jpg","enemy2.jpg","enemy3.jpg","enemy4.jpg","enemy5.jpg"]
let img=new Image()
img.src=imgs[Math.floor(Math.random()*imgs.length)]

enemies.push({
x:Math.random()*canvas.width,
y:Math.random()*canvas.height/2,
vx:Math.random()*4-2,
vy:Math.random()*4-2,
img:img
})
}

function startLevel(){
hits=0
levelText.innerText="LEVEL "+level
enemies=[]
for(let i=0;i<level;i++)spawn()
}
startLevel()

// FIRE
document.getElementById("fire").onclick=()=>{
shoot.currentTime=0
shoot.play()

enemies.forEach((en,i)=>{
let dx=cross.x-en.x
let dy=cross.y-en.y
let d=Math.sqrt(dx*dx+dy*dy)

if(d<40){
hit.currentTime=0
hit.play()

enemies.splice(i,1)
hits++
if(hits>=level)complete()
}
})
}

// COMPLETE
function complete(){
levelSound.play()
tiles[order[level-1]].style.opacity=1
level++

if(level>9){
finish()
}else{
setTimeout(startLevel,1000)
}
}

function finish(){
tiles.forEach(t=>t.style.opacity=1)
document.getElementById("win").style.display="block"
document.getElementById("win").innerText=
"CONGRATULATIONS YOU SAVED THE WORLD"

winSound.play()
document.getElementById("reward").style.display="block"
}

document.getElementById("reward").onclick=()=>{
rewardSound.play()
tiles.forEach(t=>t.style.filter="blur(0)")
document.getElementById("next").style.display="block"
}

document.getElementById("next").onclick=()=>{
location.href="page7.html"
}

// LOOP
function loop(){
ctx.clearRect(0,0,canvas.width,canvas.height)

ctx.strokeStyle="red"
ctx.beginPath()
ctx.arc(cross.x,cross.y,15,0,Math.PI*2)
ctx.stroke()

enemies.forEach(en=>{
en.x+=en.vx
en.y+=en.vy

if(en.x<0||en.x>canvas.width)en.vx*=-1
if(en.y<0||en.y>canvas.height)en.vy*=-1

ctx.drawImage(en.img,en.x,en.y,50,50)
})

requestAnimationFrame(loop)
}
loop()
