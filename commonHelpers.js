import{S as k,i as c,a as M}from"./assets/vendor-951421c8.js";(function(){const o=document.createElement("link").relList;if(o&&o.supports&&o.supports("modulepreload"))return;for(const t of document.querySelectorAll('link[rel="modulepreload"]'))s(t);new MutationObserver(t=>{for(const r of t)if(r.type==="childList")for(const i of r.addedNodes)i.tagName==="LINK"&&i.rel==="modulepreload"&&s(i)}).observe(document,{childList:!0,subtree:!0});function n(t){const r={};return t.integrity&&(r.integrity=t.integrity),t.referrerpolicy&&(r.referrerPolicy=t.referrerpolicy),t.crossorigin==="use-credentials"?r.credentials="include":t.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function s(t){if(t.ep)return;t.ep=!0;const r=n(t);fetch(t.href,r)}})();const P="https://pixabay.com/api/",q="41935591-0a413f499168cf3dc7607e044",E=document.querySelector(".search-form"),y=document.querySelector(".search-input"),u=document.querySelector(".gallery"),d=document.querySelector(".loader"),l=document.querySelector(".load-more-btn"),p=new k(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});let a=1;const h=40;let g=0,f=!1;w();l.addEventListener("click",I);async function I(){try{if(f)return;f=!0;const e=await b(y.value.trim(),a,h);e.hits.length>0&&(O(e.hits),$(),a+=1,p.refresh())}catch(e){console.error(e),c.error({title:"Error",message:"An error occurred while fetching data."})}finally{f=!1}}async function b(e,o,n){try{v();const s=new URLSearchParams({key:q,q:e,image_type:"photo",orientation:"horizontal",safesearch:!0,page:o,per_page:n}),t=`${P}?${s.toString()}`,r=await M.get(t);return g=r.data.totalHits,a=o,r.data}catch(s){throw console.error(s),s}finally{m(),T()}}function $(){const e=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:e*2,behavior:"smooth"})}E.addEventListener("submit",async function(e){e.preventDefault();const o=encodeURIComponent(y.value.trim());if(o.trim()===""){c.error({title:"Error",message:"Please enter a search query."});return}a=1,u.innerHTML="",v();try{const n=await b(o,1,h);A(n.hits),a=2}catch(n){console.error(n),c.error({title:"Error",message:"An error occurred while fetching data."})}finally{m()}});function A(e){if(u.innerHTML="",e.length===0){c.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again."});return}u.insertAdjacentHTML("beforeend",L(e)),p.refresh(),m()}function L(e){return e.map(({webformatURL:o,largeImageURL:n,tags:s,likes:t,views:r,comments:i,downloads:S})=>`<li class="gallery-item">
      <a class="gallery-link" href="${n}">
        <img
          class="gallery-image"
          src="${o}"
          alt="${s}"
          width="360"
        />
      </a>
      <div class="thumb-block">
        <div class="block">
          <h2 class="title">Likes</h2>
          <p class="amount">${t}</p>
        </div>
        <div class="block">
          <h2 class="title">Views</h2>
          <p class="amount">${r}</p>
        </div>
        <div class="block">
          <h2 class="title">Comments</h2>
          <p class="amount">${i}</p>
        </div>
        <div class="block">
          <h2 class="title">Downloads</h2>
          <p class="amount">${S}</p>
        </div>
      </div>
    </li>`).join("")}function v(){d&&(d.style.display="block")}function m(){d&&(d.style.display="none")}function w(){l&&(l.style.display="none")}function H(){l&&(l.style.display="block")}function B(){c.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})}function T(){const e=Math.ceil(g/h);a>=e?(w(),B()):H()}function O(e){const o=L(e);u.insertAdjacentHTML("beforeend",o)}
//# sourceMappingURL=commonHelpers.js.map
