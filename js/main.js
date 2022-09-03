let rock=document.getElementById("back-ground");
let countDown=document.querySelector(".count-down")
let correct=document.querySelector(".info-container .correct span");
let wrong=document.querySelector(".info-container .tries span");
let nameP= document.querySelector(".info-container .name span");
let duration=2000;
let block=document.querySelector(".block");
let blocks=Array.from(block.children);
let orderRange=[...blocks.keys()];
let ar=[];
document.querySelector(".start-button span").onclick=()=>{
    rock.play();
    let yourName=prompt("enter your name");
    if (yourName==="") {
        nameP.textContent="Unknown";

    }  else {
        nameP.textContent=yourName;

    } 
    document.querySelector(".start-button").remove();
    showResult()
    blocks.forEach(block => {
        block.classList.add("has-match");
        setTimeout(() => {
            block.classList.remove("has-match");
        }, 2000);
    });
    countDownF(180);

    
}


 // add order css
shuffle(orderRange);
blocks.forEach((block,index) => {
block.style.order=orderRange[index];
block.addEventListener("click",function(){
   flipped(block);
})
});
function flipped(b) {
    b.classList.add("is-flipped");
    let allFlipped=blocks.filter(block => block.classList.contains('is-flipped'));
    if (allFlipped.length===2) {
        stopClicking();
        checkMatch(allFlipped[0],allFlipped[1]);
    } 
}

function shuffle(array){
    let current=array.length;
    let temp,random;
    while (current>0) {
        random=Math.floor(Math.random() * current);
        current--;
        temp=array[current];
        array[current]=array[random];
        array[random]=temp;
    }
    return array;
}
function stopClicking() {
    block.classList.add("no-clicking");
    setTimeout(()=>{
        block.classList.remove("no-clicking");
    },duration)
}
function checkMatch(a,b) {
    if (a.dataset.icon===b.dataset.icon) {
        a.classList.remove("is-flipped");
        b.classList.remove("is-flipped");
        a.classList.add("has-match");
        b.classList.add("has-match");
        correct.textContent=+correct.textContent + 1;
        if (+correct.textContent === blocks.length/2) {
            rock.pause();
            saveResul();
            document.getElementById("win").play();            
            document.querySelector(".end").classList.add("start-button");
            document.querySelector(".end.start-button span").textContent="congratulation you win" ;
            document.querySelector(".end.start-button span.second").textContent="restart the game";
            document.querySelector(".end.start-button span.second").onclick=()=>{
                window.location.reload()
                    }
            document.querySelector(".end.start-button span.first").onclick=()=>{ 
                alert(`congratulation ${nameP.textContent} Your score is ${correct.textContent}`);
            }
        }
        play(document.getElementById('success'),2000,"#009688");
     } else {
        wrong.textContent=+wrong.textContent + 1;
        setTimeout(()=>{
            a.classList.remove("is-flipped");
            b.classList.remove("is-flipped"); 
        },duration)
        play(document.getElementById('failed'),2000,"#E91E63");
     }

}
function play(a,b,c) {

    a.play();
    document.body.style.backgroundColor=c;
    setTimeout(()=>{

      
            document.body.style.backgroundColor="#fff";
        
        a.pause();
 },b)
}
function countDownF(duration) {

        let minutes,secondes;
       
    countinterval=setInterval((function(){
     
        minutes=parseInt(duration/60);
        secondes=parseInt(duration%60);
       minutes=minutes>=10 ? minutes : `0${minutes}`;
       secondes=secondes>=10 ? secondes : `0${secondes}`;
       countDown.innerHTML=`${minutes}:${secondes}`
       if(--duration < 0) {
        clearInterval(countinterval);
        rock.pause();
        saveResul();
        document.getElementById("lost").play();
        document.querySelector(".end").classList.add("start-button");
        document.querySelector(".end.start-button span").textContent=`Time is End`;
        document.querySelector(".end.start-button span.second").textContent="restart the game";
        document.querySelector(".end.start-button span.second").onclick=()=>{
            window.location.reload()
                }
        document.querySelector(".end.start-button span.first").onclick=()=>{ 
            alert(`Your score is ${correct.textContent}`);

        }
    }
    }),1000)
    
}
function saveResul() {
   let arr=JSON.parse(window.localStorage.getItem("results"));
    let r={"name":nameP.textContent,"correct":correct.textContent,"wrong":wrong.textContent};
    arr.push(r);
    window.localStorage.setItem("results",JSON.stringify(arr));
    }
function showResult() {
    let div=document.querySelector(".allResult");
    let arr=JSON.parse(window.localStorage.getItem("results"));

    if (arr!==null) {
        arr.forEach(e => {
            let main=document.createElement("div");
            main.classList.add("last-results");
            let player=document.createElement("span");
            player.textContent=e.name;
            let correct=document.createElement("span");
            correct.textContent=`correct: ${e.correct}`;
            let wrong=document.createElement("span");
            wrong.textContent=`wrong: ${e.wrong}`;
            main.appendChild(player);
            main.appendChild(correct);
            main.appendChild(wrong);
            div.appendChild(main);
        });
    } else {
        window.localStorage.setItem("results","[]");

    }
 
 
}
