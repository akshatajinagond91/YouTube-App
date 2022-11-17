// let url="https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=kgf&key=AIzaSyAExl5AFMZYy-QWWbk42Z-6pP6QP6gTvms";
const API_KEY="AIzaSyAExl5AFMZYy-QWWbk42Z-6pP6QP6gTvms";
// let data=[];
let q="";

let search=async ()=>{
let query=document.getElementById("query").value;
 let data=await getData(query);
 q=query;
append(data);
}

let getData=async (query)=>{
    let url=`https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=20&q=${query}&key=${API_KEY}`;

  let res=  await fetch(url);
  let data=await res.json();
//   append(data.items);
  console.log(data);
  return data.items;
};

let append=(data)=>{
    let container=document.getElementById("container");
    container.innerHTML=null;

    data.forEach((el)=>{
         let img=document.createElement("img");
         img.src=el.snippet.thumbnails.medium.url;
         let h3=document.createElement("h3");
         h3.innerText=el.snippet.title;

         let div=document.createElement("div");
         div.setAttribute("class","video")
         div.onclick=()=>{
            saveVideo(el);
         }

         div.append(img,h3);
         container.append(div);
    })
};

let saveVideo=(data)=>{
    localStorage.setItem("video",JSON.stringify(data));
    window.location.href="playVideo.html";
};


let filter=async ()=>{
    let data=await getData(q);
    console.log(data);
    data=data.filter((el)=>{
        return el.snippet.channelId=="UC3KjiiUE8ij5-IuM9xYGMEQ";
    });
    append(data);
}

