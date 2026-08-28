let input = document.querySelector("input");
let btn = document.querySelector("button");
let mainDiv = document.querySelector(".mainDiv");


fetch("https://api.imgflip.com/get_memes").then((request)=>request.json())
.then((data)=>{

    
    btn.addEventListener("click",()=>{
        let num =+input.value;
        mainDiv.innerHTML = "";
        let meme=data.data.memes[num]
        if(meme){
            let content=`
            
            <h1 class="text-warning">${meme.name}</h1>
            <img src="${meme.url}" class="w-25 h-25">
            `
            mainDiv.innerHTML=content
        } else {
            mainDiv.innerHTML = `<h1 class="text-danger">please enter a valid number</h1>`;
        }

        input.value = ""; 
    })


})




    



















    
