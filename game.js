const story = `⚠️ CLASSIFIED TRANSMISSION — SECRET AGENCY ALERT ⚠️

Memory Status: Corrupted
Identity: Unknown
Location: Earth — Under Threat

You woke up with no past… no name… no memories.
But today, a secure transmission reached you from a deep underground secret agency.

"Listen carefully. This is not a coincidence.
A relativity time distortion has destabilized space-time.
A Wormhole Portal has opened… and hostile entities have crossed into Earth."

These enemies are not human.
They are here for invasion.

Our intelligence suggests one thing — You are the only one capable of stopping them.

Mission Objective:
• Enter combat zones
• Eliminate incoming enemies
• Close wormhole breaches
• Survive

In return… we will restore your lost memories.

But be warned…
⚠️ Enemies will increase each level
⚠️ Portal activity is unstable
⚠️ Failure may result in global collapse
⚠️ Trust no one

This is not just a mission anymore…
This is the only way to discover who you really are.

«OPERATION STARTS NOW
GOOD LUCK, AGENT.»`


const textEl = document.getElementById("storyText")
const startBtn = document.getElementById("startBtn")
const intro = document.getElementById("introScreen")
const game = document.getElementById("gameScreen")
const levelText = document.getElementById("levelText")
const winText = document.getElementById("winText")
const rewardBtn = document.getElementById("rewardBtn")
const nextBtn = document.getElementById("nextBtn")

const canvas = document.getElementById("gameCanvas")
const ctx = canvas.getContext("2d")

canvas.width = window.innerWidth
canvas.height = window.innerHeight

let i = 0

function type(){
textEl.textContent += story[i]
i++
if(i < story.length){
setTimeout(type,15)
}else{
startBtn.style.display="block"
}
}
type()

startBtn.onclick = () =>{
intro.style.display="none"
game.style.display="block"
startLevel()
}

let level = 1
let hits = 0

const tiles = document.querySelectorAll(".tile")

const order = [6,4,3,1,7,9,5,8,2]

let enemies = []

function spawnEnemy(){
const imgs = [
"enemy1.jpg",
"enemy2.jpg",
"enemy3.jpg",
"enemy4.jpg",
"enemy5.jpg"
]

let img = new Image()
img.src = imgs[Math.floor(Math.random()*imgs.length)]

enemies.push({
x: Math.random()*canvas.width,
y: Math.random()*canvas.height/2,
size:60,
img:img
})
}

function startLevel(){
levelText.innerText = "LEVEL " + level
hits = 0
enemies=[]
for(let i=0;i<level;i++){
spawnEnemy()
}
}

canvas.onclick = e=>{
const x = e.clientX
const y = e.clientY

enemies.forEach((en,i)=>{
if(x > en.x && x < en.x+en.size &&
y > en.y && y < en.y+en.size){

enemies.splice(i,1)
hits++

if(hits >= level){
completeLevel()
}
}
})
}

function completeLevel(){

tiles[order[level-1]-1].style.opacity = 1

level++

if(level==10){
finishGame()
}else{
setTimeout(startLevel,1000)
}
}

function finishGame(){

tiles.forEach(t=>{
t.style.opacity=1
})

winText.style.display="block"
winText.innerText="CONGRATULATIONS\nYOU SAVED THE WORLD"

rewardBtn.style.display="block"
}

rewardBtn.onclick=()=>{
tiles.forEach(t=>{
t.style.filter="blur(0px)"
})
rewardBtn.style.display="none"
nextBtn.style.display="block"
}

nextBtn.onclick=()=>{
window.location.href="page7.html"
}

function draw(){

ctx.clearRect(0,0,canvas.width,canvas.height)

enemies.forEach(en=>{
ctx.drawImage(en.img,en.x,en.y,en.size,en.size)

en.x += Math.sin(Date.now()/500)*1
})

requestAnimationFrame(draw)
}

draw()
