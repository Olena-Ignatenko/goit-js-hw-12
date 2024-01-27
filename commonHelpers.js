import{S as q,a as M,i as h}from"./assets/vendor-951421c8.js";(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))s(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const a of o.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&s(a)}).observe(document,{childList:!0,subtree:!0});function n(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(e){if(e.ep)return;e.ep=!0;const o=n(e);fetch(e.href,o)}})();const P="https://pixabay.com/api/",I="41935591-0a413f499168cf3dc7607e044",$=document.querySelector(".search-form"),g=document.querySelector(".search-input"),u=document.querySelector(".gallery"),l=document.querySelector(".loader"),i=document.querySelector(".load-more-btn"),E=new q(".gallery a",{captionsData:"alt",captionPosition:"bottom",captionDelay:250});let d=1;const m=20;let f=0,c=!1;p();i.addEventListener("click",B);async function B(){try{if(c)return;c=!0;const t=await L(g.value.trim(),d,m);t.hits.length>0?(x(t.hits),d+=1,S(),H()):(p(),k())}catch(t){console.error(t)}finally{c=!1}}async function L(t,r,n){try{v();const s=new URLSearchParams({key:I,q:t,image_type:"photo",orientation:"horizontal",safesearch:!0,page:r,per_page:n}),e=`${P}?${s.toString()}`,o=await M.get(e);return f=o.data.totalHits,o.data}catch(s){throw console.error(s),s}finally{y(),S()}}function H(){const t=document.querySelector(".gallery-item").getBoundingClientRect().height;window.scrollBy({top:t*2,behavior:"smooth"})}$.addEventListener("submit",function(t){t.preventDefault();const r=encodeURIComponent(g.value.trim());if(r.trim()===""){h.error({title:"Error",message:"Please enter a search query."});return}v(),L(r,1,m).then(n=>{O(n.hits)}).catch(n=>{console.error(n)}).finally(()=>{y()})});function O(t){if(u.innerHTML="",t.length===0){h.info({title:"Info",message:"Sorry, there are no images matching your search query. Please try again."});return}const r=b(t);u.innerHTML+=r,E.refresh(),y(),T()}function b(t){return t.map(({webformatURL:r,largeImageURL:n,tags:s,likes:e,views:o,comments:a,downloads:w})=>`<li class="gallery-item">
      <a class="gallery-link" href="${n}">
        <img
          class="gallery-image"
          src="${r}"
          alt="${s}"
          width="360"
        />
      </a>
      <div class="thumb-block">
        <div class="block">
          <h2 class="title">Likes</h2>
          <p class="amount">${e}</p>
        </div>
        <div class="block">
          <h2 class="title">Views</h2>
          <p class="amount">${o}</p>
        </div>
        <div class="block">
          <h2 class="title">Comments</h2>
          <p class="amount">${a}</p>
        </div>
        <div class="block">
          <h2 class="title">Downloads</h2>
          <p class="amount">${w}</p>
        </div>
      </div>
    </li>`).join("")}function v(){l&&(l.style.display="block")}function y(){l&&(l.style.display="none")}function p(){i&&(i.style.display="none")}function T(){i&&(i.style.display="block")}function k(){h.info({title:"Info",message:"We're sorry, but you've reached the end of search results."})}function S(){f>0&&d>Math.ceil(f/m)&&(p(),k())}function x(t){const r=b(t);u.innerHTML+=r}
//# sourceMappingURL=commonHelpers.js.map
