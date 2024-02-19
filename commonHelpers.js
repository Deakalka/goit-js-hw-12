import{a as d,S as L,i as l}from"./assets/vendor-64b55ca9.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const a of t)if(a.type==="childList")for(const i of a.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function o(t){const a={};return t.integrity&&(a.integrity=t.integrity),t.referrerPolicy&&(a.referrerPolicy=t.referrerPolicy),t.crossOrigin==="use-credentials"?a.credentials="include":t.crossOrigin==="anonymous"?a.credentials="omit":a.credentials="same-origin",a}function s(t){if(t.ep)return;t.ep=!0;const a=o(t);fetch(t.href,a)}})();const p="https://pixabay.com/api/",m="42435331-5518aafb74583ec5494003d9b",u=15;class w{constructor(){}async getImages(r){const o={key:m,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:1,per_page:u},s=`${p}`;return d.get(s,{params:o}).then(t=>t.data)}async getMoreImages(r,o){o++;const s={key:m,q:r,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:u},t=`${p}`;return d.get(t,{params:s}).then(a=>a.data)}}const M={captionsData:"alt",captionDelay:250};let f=new L(".gallery-link",M);function E(e,r){const o=e.hits.map(s=>h(s)).join("");r.innerHTML=o,f.refresh()}function v(e,r){const o=e.hits.map(s=>h(s)).join("");r.insertAdjacentHTML("beforeend",o),f.refresh()}function P(){l.error({position:"topRight",message:"Sorry, there are no images matching your search query. Please try again!"})}function h(e){return`
        <div class="photo-container">
            <a class="gallery-link" href="${e.largeImageURL}" data-lightbox="image">
                <img src="${e.webformatURL}" alt="${e.tags}" class="photo" />
            </a>
            <div class="photo-body">
                <p class="photo-name"> <span>Likes</span> <span>${e.likes}</span> </p>
                <p class="photo-name"> <span>Views</span> <span>${e.views}</span> </p>
                <p class="photo-name"> <span>Comments</span> <span>${e.comments}</span> </p>
                <p class="photo-name"> <span>Downloads</span> <span>${e.downloads}</span> </p>
            </div>
        </div>
    `}const n={formEl:document.querySelector(".js-search-form"),imgEl:document.querySelector(".js-image-container"),loader:document.querySelector(".loader"),btnLoadMore:document.querySelector(".loadmore-btn")};let c=1,y="";function I(){n.loader.classList.remove("hidden")}function g(){n.loader.classList.add("hidden")}n.formEl.addEventListener("submit",q);n.btnLoadMore.addEventListener("click",S);const b=new w;async function q(e){e.preventDefault(),I();const r=e.target.elements.text.value.trim();if(y=r,c=1,!r){g(),l.warning({position:"topRight",message:"Please enter a search query."});return}try{const o=await b.getImages(r);if(E(o,n.imgEl),o.hits.length===0)throw new Error("No images found");n.btnLoadMore.style.display="block"}catch{P()}finally{g()}}async function S(){try{const e=await b.getMoreImages(y,c);v(e,n.imgEl),c++,e.hits.length<15&&(n.btnLoadMore.style.display="none",l.show({title:"",message:"We're sorry, but you've reached the end of search results.",color:"red",position:"topRight"}))}catch{n.btnLoadMore.style.display="block"}}
//# sourceMappingURL=commonHelpers.js.map
