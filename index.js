let paramcount = 0;

// hide the params box initially
let parameterBox = document.getElementById("parameterBox");
parameterBox.style.display="none";

//utility function 
function getElementFromString(string) {
    let div = document.createElement("div");
    div.innerHTML=string;
    return div.firstElementChild;
}


//if the user clicks on json, hide the params box
let paramsRadio = document.getElementById("custom");
paramsRadio.addEventListener("click",()=>{
    document.getElementById("requestJsonBox").style.display="none";
    document.getElementById("parameterBox").style.display="block";
})



//if the user clicks on custom, hide the json box
let jsonRadio = document.getElementById("json");
jsonRadio.addEventListener("click",()=>{
    document.getElementById("parameterBox").style.display="none";
    document.getElementById("requestJsonBox").style.display="block";
})

//if the user clicks on + button add params
let addParam = document.getElementById("addParam");
addParam.addEventListener("click",()=>{
    let params = document.getElementById("params");
    let string = `
    

    <form class="row g-3 my-1">
        
        <div class="col-md-4">

            <input type="text" class="form-control" id="parameterKey${paramcount+2}" placeholder="Enter Key">
        </div>
        <div class="col-md-4">

            <input type="text" class="form-control" id="parameterValue${paramcount+2}" placeholder="Enter Value">
        </div>

        <button  class=" col-md-1 btn btn-secondary deleteParam">-</button>
    </form>

            `
            paramcount++;
            let paramElement = getElementFromString(string);

            params.appendChild(paramElement);

            let deleteParam= document.getElementsByClassName("deleteParam");
          for ( item of deleteParam) {
              item.addEventListener("click",(e)=>{
                  e.target.parentElement.remove();
              })
          }

})


let  submit = document.getElementById("submit");
submit.addEventListener("click",()=>{
    document.getElementById("responseText").value="please wait...fetching response..";

    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='content']:checked").value;

   
    if(contentType=="param"){
        data={};
        for ( i = 0; i <paramcount+1 ; i++) {
            if(document.getElementById("parameterKey"+(i+1))!=undefined)
            {
            let key = document.getElementById("parameterKey"+(i+1)).value;
            let value = document.getElementById("parameterValue"+(i+1)).value;
            data[key]= value;
            }
            data = JSON.stringify(data);
            console.log(data);
          
        }

       

    }
    else{
        data = document.getElementById("requestJsonText").value
    }

    console.log("url is", url);
    console.log("requestType is", requestType);
    console.log("contentType is", contentType);
    console.log("data is", data);

    if(requestType=="GET"){
        fetch(url,{
            method:"GET",

        })
        .then(response => response.text())
        .then(text=>{
            document.getElementById("responseText").value = text;
        })
    }
    
    
    else{
        fetch(url,{
            method:"POST",
            body:data,
            headers:{
                "Content-type": "application/json; charset = UTF-8"
            }

        })
        .then(response => response.text())
        .then(text=>{
            document.getElementById("responseText").value = text;
        })

    }





    //    {"title":"foo","body":"bar","userId":1}
    //  https://jsonplaceholder.typicode.com/posts

})