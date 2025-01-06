function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = ["assets/LazyIframe-BzzvfShb.js","assets/index-PY5ovYXI.js","assets/index-jfGlKgwo.css","assets/LazyImages-DaJuMugQ.js"]
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i])
}
import{R as p,_ as te,r as l,m as de,e as fe,j as e,g as h,a as w,F as o,h as Z,i as ee,k as me,l as xe,C as he,L as ue,N as pe,d as u}from"./index-PY5ovYXI.js";const ge={prefix:"fab",iconName:"imdb",icon:[448,512,[],"f2d8","M89.5 323.6H53.93V186.2H89.5V323.6zM156.1 250.5L165.2 186.2H211.5V323.6H180.5V230.9L167.1 323.6H145.8L132.8 232.9L132.7 323.6H101.5V186.2H147.6C148.1 194.5 150.4 204.3 151.9 215.6L156.1 250.5zM223.7 323.6V186.2H250.3C267.3 186.2 277.3 187.1 283.3 188.6C289.4 190.3 294 192.8 297.2 196.5C300.3 199.8 302.3 203.1 303 208.5C303.9 212.9 304.4 221.6 304.4 234.7V282.9C304.4 295.2 303.7 303.4 302.5 307.6C301.4 311.7 299.4 315 296.5 317.3C293.7 319.7 290.1 321.4 285.8 322.3C281.6 323.1 275.2 323.6 266.7 323.6H223.7zM259.2 209.7V299.1C264.3 299.1 267.5 298.1 268.6 296.8C269.7 294.8 270.4 289.2 270.4 280.1V226.8C270.4 220.6 270.3 216.6 269.7 214.8C269.4 213 268.5 211.8 267.1 210.1C265.7 210.1 263 209.7 259.2 209.7V209.7zM316.5 323.6V186.2H350.6V230.1C353.5 227.7 356.7 225.2 360.1 223.5C363.7 222 368.9 221.1 372.9 221.1C377.7 221.1 381.8 221.9 385.2 223.3C388.6 224.8 391.2 226.8 393.2 229.5C394.9 232.1 395.9 234.8 396.3 237.3C396.7 239.9 396.1 245.3 396.1 253.5V292.1C396.1 300.3 396.3 306.4 395.3 310.5C394.2 314.5 391.5 318.1 387.5 320.1C383.4 324 378.6 325.4 372.9 325.4C368.9 325.4 363.7 324.5 360.2 322.9C356.7 321.1 353.5 318.4 350.6 314.9L348.5 323.6L316.5 323.6zM361.6 302.9C362.3 301.1 362.6 296.9 362.6 290.4V255C362.6 249.4 362.3 245.5 361.5 243.8C360.8 241.9 357.8 241.1 355.7 241.1C353.7 241.1 352.3 241.9 351.6 243.4C351 244.9 350.6 248.8 350.6 255V291.4C350.6 297.5 351 301.4 351.8 303C352.4 304.7 353.9 305.5 355.9 305.5C358.1 305.5 360.1 304.7 361.6 302.9L361.6 302.9zM418.4 32.04C434.1 33.27 447.1 47.28 447.1 63.92V448.1C447.1 464.5 435.2 478.5 418.9 479.1C418.6 479.1 418.4 480 418.1 480H29.88C29.6 480 29.32 479.1 29.04 479.9C13.31 478.5 1.093 466.1 0 449.7L.0186 61.78C1.081 45.88 13.82 33.09 30.26 31.1H417.7C417.9 31.1 418.2 32.01 418.4 32.04L418.4 32.04zM30.27 41.26C19 42.01 10.02 51.01 9.257 62.4V449.7C9.63 455.1 11.91 460.2 15.7 464C19.48 467.9 24.51 470.3 29.89 470.7H418.1C429.6 469.7 438.7 459.1 438.7 448.1V63.91C438.7 58.17 436.6 52.65 432.7 48.45C428.8 44.24 423.4 41.67 417.7 41.26L30.27 41.26z"]},se=p.lazy(()=>te(()=>import("./LazyIframe-BzzvfShb.js"),__vite__mapDeps([0,1,2]))),_=p.lazy(()=>te(()=>import("./LazyImages-DaJuMugQ.js"),__vite__mapDeps([3,1,2])));function we(){const[b,y]=l.useState(!0),[d,D]=l.useState(!1),[s,N]=l.useState(null),[v,S]=l.useState(!0),[L,V]=l.useState(!1),[g,E]=l.useState([]),[k,$]=l.useState(!0),[I,F]=l.useState(!1),[j,z]=l.useState([]),[H,U]=l.useState(!0),[M,T]=l.useState(!1),[n,P]=l.useState([]),[R,O]=l.useState(!0),[A,G]=l.useState(!1),[W,Y]=l.useState([]),[q,B]=l.useState(!0),[J,K]=l.useState(!1),[f,Q]=l.useState([]),{movieType:m,authParams:x,imgUrl:C,scrollToTop:ae,setDocumentTitle:X,setMovieType:je}=l.useContext(de),{detailsId:c,detailsType:r}=fe(),le=["movie","tv"],re=async()=>{const t=`https://api.themoviedb.org/3/${r}/${c}/similar?language=en-US&page=1`;try{B(!0);const a=await u.get(t,x);if(a.status===200){const i=a.data.results;Y(i),K(!1)}else throw new Error("Failed to fetch data")}catch(a){console.log(a),Y([]),K(!0)}finally{B(!1)}},ie=async()=>{const t=`https://api.themoviedb.org/3/${r}/${c}/videos?language=en-US`;try{O(!0);const a=await u.get(t,x);if(a.status===200){const i=a.data.results;P(i),G(!1)}else throw new Error("Failed to fetch data")}catch(a){console.log(a),P([]),G(!0)}finally{O(!1)}},ne=async()=>{const t=`https://api.themoviedb.org/3/${r}/${c}/credits?language=en-US`;try{U(!0);const a=await u.get(t,x);if(a.status===200){const i=a.data.cast;z(i),T(!1)}else throw new Error("Failed to fetch data")}catch(a){console.log(a),z([]),T(!0)}finally{U(!1)}},ce=async()=>{const t=`https://api.themoviedb.org/3/${r}/${c}/images`;try{$(!0);const a=await u.get(t,x);if(a.status===200){const i=a.data.backdrops;E(i),F(!1)}else throw new Error("Failed to fetch data")}catch(a){console.log(a),E([]),F(!0)}finally{$(!1)}},oe=async()=>{const t=`https://api.themoviedb.org/3/${r}/${c}?language=en-US`;try{S(!0);const a=await u.get(t,x);if(a.status===200){const i=a.data;N(i),V(!1)}else throw new Error("Failed to fetch data")}catch(a){console.log(a),N(null),V(!0)}finally{S(!1)}};return l.useEffect(()=>{X(s&&!d?`${r==="movie"?s.title:s.name} | Cinematico`:"Cinematico")},[s,d]),l.useEffect(()=>{le.includes(r)&&!L&&!I&&!M&&!A&&!J?D(!1):D(!0)},[r,L,I,M,A,J]),l.useEffect(()=>{y(!(!v&&!k&&!H&&!R&&!q))},[v,k,H,R,q]),l.useEffect(()=>{r&&c&&(ae(),oe(),ce(),ne(),ie(),re())},[c,r]),l.useEffect(()=>{if(n.length>0){const t=n.filter(a=>a.name.includes("Official Trailer"));Q(t)}else Q([])},[n]),e.jsxs("main",{className:"w-full text-white px-5half ",children:[!d&&!b&&e.jsxs(e.Fragment,{children:[e.jsxs("section",{className:"w-full pt-[150px] relative bg-no-repeat bg-cover bg-center pb-10 items-center flex justify-center ",children:[!f.length>0&&!n.length>0&&g.length>0&&e.jsx(l.Suspense,{fallback:e.jsx(h,{classes:"class4"}),children:e.jsx(_,{imageUrl:`${C}${g[0].file_path}`,title:m,styles:"w-full block xl:hidden object-cover rounded-md shadow "})}),!f.length>0&&!n.length>0&&!g.length>0&&e.jsx(l.Suspense,{fallback:e.jsx(h,{classes:"class4"}),children:e.jsx(_,{imageUrl:w,title:m,styles:"w-full block xl:hidden object-cover rounded-md shadow "})}),!f.length>0&&n.length>0&&e.jsx(l.Suspense,{fallback:e.jsx(h,{classes:"iframe"}),children:e.jsx(se,{videoUrl:`https://www.youtube.com/embed/${n[0].key}`})}),f.length>0&&e.jsx(l.Suspense,{fallback:e.jsx(h,{classes:"iframe"}),children:e.jsx(se,{videoUrl:`https://www.youtube.com/embed/${f[0].key}`})})]}),e.jsxs("section",{className:"w-full  flex items-center justify- pb-10   flex-wrap",children:[e.jsx("div",{className:"xl:w-[20%] xl:block hidden",children:e.jsx(l.Suspense,{fallback:e.jsx(h,{classes:"class5"}),children:e.jsx(_,{imageUrl:s&&s.poster_path?`${C}${s.poster_path}`:w,title:m,styles:"w-full object-cover rounded h-[400px]"})})}),e.jsxs("div",{className:"xl:w-[80%]  w-full  flex flex-col gap-4 justify-center pl-5half ",children:[e.jsx("span",{className:"w-full flex items-center justify-between ",children:e.jsxs("h2",{className:"font-cinzel font-black    text-center text-2xl",children:[s&&r==="movie"&&s.title,s&&r==="tv"&&s.name]})}),e.jsx("div",{className:"w-full flex items-center text-xs gap-4 flex-wrap ",children:s&&e.jsxs(e.Fragment,{children:[s.genres&&s.genres.length>0&&e.jsx(e.Fragment,{children:s.genres.map(t=>e.jsx("h6",{className:"p-2 rounded-lg bg-white text-black text-xs font-black",children:t.name},t.name))}),r==="tv"&&s.first_air_date&&s.first_air_date.length>3&&e.jsxs("p",{children:[" ",e.jsx(o,{icon:Z,className:"mr-1"})," ",s.first_air_date.substring(0,4)]}),r==="movie"&&s.release_date&&s.release_date.length>3&&e.jsxs("p",{children:[" ",e.jsx(o,{icon:Z,className:"mr-2"})," ",s.release_date.substring(0,4)]}),r==="movie"&&s.runtime&&e.jsxs("p",{children:[e.jsx(o,{icon:ee,className:"mr-2"}),s.runtime," mins"]}),r==="tv"&&s.number_of_seasons&&e.jsxs("p",{children:[e.jsx(o,{icon:ee,className:"mr-2"}),s.number_of_seasons," seasons"]}),s.vote_average&&s.vote_average>0&&e.jsxs("p",{children:[e.jsx(o,{icon:me,className:"mr-2"}),Number(s.vote_average).toFixed(1)]})]})}),s&&s.overview&&e.jsx("p",{className:"w-full ",children:s.overview}),e.jsxs("ul",{className:"w-full list-none flex flex-col text-sm gap-2",children:[s.genres&&s.genres.length>0&&e.jsxs("li",{className:"flex gap-1 flex-wrap font-light",children:[e.jsxs("p",{children:["Genre ",e.jsx("strong",{className:"px-1",children:" :"})," "]}),s.genres.map((t,a)=>e.jsx(p.Fragment,{children:e.jsxs("span",{className:"flex",children:[e.jsx("p",{children:t.name}),a<s.genres.length-1&&e.jsx("span",{className:"pr-[2px]",children:","})]})},t.name))]}),s.status&&e.jsxs("li",{className:" flex    font-light",children:["Status ",e.jsx("strong",{className:"px-2",children:" :"})," ",s.status]}),r==="tv"&&s.first_air_date&&e.jsxs("li",{className:" flex    font-light",children:["Date Released ",e.jsx("strong",{className:"px-2",children:" :"})," ",s.first_air_date]}),r==="movie"&&s.release_date&&e.jsxs("li",{className:" flex  font-light",children:["Date Released ",e.jsx("strong",{className:"px-2",children:" :"})," ",s.release_date]}),s.production_companies&&s.production_companies.length>0&&e.jsxs("li",{className:"flex gap-1 flex-wrap  font-light",children:[" ",e.jsxs("p",{children:["Production ",e.jsx("strong",{className:"px-1",children:" :"})," "]}),s.production_companies.map((t,a)=>e.jsx(p.Fragment,{children:e.jsxs("span",{className:"flex",children:[e.jsx("p",{children:t.name}),a<s.production_companies.length-1&&e.jsx("span",{className:"pr-[2px]",children:","})]})},t.name))]}),j.length>0&&e.jsxs("li",{className:"flex gap-1 flex-wrap font-light",children:[" ",e.jsxs("p",{children:["Cast ",e.jsx("strong",{className:"px-1",children:" :"})," "]}),j.map((t,a)=>e.jsx(p.Fragment,{children:e.jsxs("span",{className:"flex ",children:[e.jsx("p",{children:t.name}),a<j.length-1&&e.jsx("span",{className:"pr-[2px]",children:","})]})},t.name))]})]}),m==="movie"&&s&&e.jsxs("section",{className:"w-full flex items-center flex-wrap gap-4",children:[s.homepage&&s.homepage.length>0&&e.jsxs("a",{className:"button flex items-center gap-4 justify-center  active_btn",href:s.homepage,target:"_blank",rel:"noopener noreferrer ",children:["Website ",e.jsx(o,{icon:xe})]}),m!=="tv"&&s.imdb_id&&s.imdb_id.length>0&&e.jsxs("a",{className:"button justify-center  flex items-center gap-4   active_btn",href:`https://www.imdb.com/title/${s.imdb_id}`,target:"_blank",rel:"noopener noreferrer ",children:["Imdb ",e.jsx(o,{icon:ge})]})]})]})]}),W.length>0&&e.jsxs("section",{className:"w-full  flex flex-col gap-4 justify- pb-10   ",children:[e.jsx("h2",{className:"font-bold text-xl text-left w-full",children:"You may also like"}),e.jsx("div",{className:"w-full flex overflow-x-hidden flex-wrap  justify-center items-center gap-y-4  gap-x-[2%]",children:W.slice(0,10).map(t=>{const a=r==="movie"&&t.release_date&&t.release_date.length>3&&t.release_date.substring(0,4),i=r==="tv"&&t.first_air_date&&t.first_air_date.length>3&&t.first_air_date.substring(0,4);return e.jsx(he,{img:t.poster_path?`${C}${t.poster_path}`:w,title:r==="movie"?t.title:t.name,year:r==="movie"?a:i,id:t.id,type:r},t.id)})})]})]}),!d&&b&&e.jsx("section",{className:"w-full flex items-center justify-center h-dvh max-h-[1300px] min-h-[500px] ",children:e.jsx(ue,{})}),d&&e.jsx("section",{className:"w-full flex items-center px-[2.5%]  flex-col gap-4 justify-center ipad:max-h-[1300px] h-dvh min-h-[500px] ",children:e.jsx(pe,{})})]})}export{we as default};