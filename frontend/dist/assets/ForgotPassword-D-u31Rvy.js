import{r as a,n as z,x as F,o as A,m as D,j as e,y as H,F as y,w as C,A as U,v as J,p as W,q as _}from"./index-PY5ovYXI.js";const B={hidden:{opacity:0},visible:{opacity:1,transition:{ease:"easeIn",duration:.3}},exit:{opacity:0,transition:{ease:"easeIn",duration:.3}}};function K(){const[c,E]=a.useState(""),[d,k]=a.useState(""),[u,j]=a.useState(""),[f,O]=a.useState(!1),[I,b]=a.useState(!1),[T,N]=a.useState(!1),[m,x]=a.useState(!1),[v,o]=a.useState(null),[L,S]=a.useState(!1),[R,r]=a.useState(null),P=z(),{isNewClicked:h,setIsNewClicked:p,countdown:i}=F(),g=A(),{toastHandler:l,authUrl:w}=a.useContext(D);async function V(s){s.preventDefault();try{b(!0);const t=await fetch(`${w}/auth/forgot-password`,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:c})});if(t.ok){const n=await t.json();x(!0),r(n._id),o(n.email),l(!0,"OTP sent successfully")}else{const{error:n}=await t.json();throw new Error(n.msg||"Something went wrong. Please try again later.")}}catch(t){console.log(t),r(null),o(null),x(!1),l(!1,t.message||t.msg||"Something went wrong. Please try again later.")}finally{b(!1)}}async function $(s){if(s.preventDefault(),d.length!==6){l(!1,"The OTP must be exactly 6 characters.");return}try{N(!0);const t=await fetch(`${w}/auth/reset-password`,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({otp:d,newPassword:u,userId:R,verifiedRedirects:g})});if(t.ok){const n=await t.json();P(n.redirectUrl),l(!0,n.msg||"Password reset successfully")}else{const{error:n}=await t.json();throw new Error(n.msg||"Something went wrong. Please try again later.")}}catch(t){console.log(t),p(!1),l(!1,t.message||t.msg||"Something went wrong. Please try again later.")}finally{N(!1)}}async function q(){if(i>0&&h){l(!1,`Wait ${i} seconds`);return}try{S(!0);const s=await fetch(`${w}/auth/forgot-password`,{method:"POST",credentials:"include",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:c})});if(s.ok){const t=await s.json();p(!0),r(t._id),o(t.email),l(!0,"OTP sent successfully")}else{const{error:t}=await s.json();throw new Error(t.msg||"Something went wrong. Please try again later.")}}catch(s){console.log(s),r(null),o(null),p(!1),l(!1,s.message||s.msg||"Something went wrong. Please try again later.")}finally{S(!1)}}return a.useEffect(()=>{m?(document.body.style.height="100dvh",document.body.style.overflow="hidden"):(document.body.style.height="auto",document.body.style.overflow="auto")},[m]),e.jsxs("main",{className:"w-full  text-white px-5half pt-[150px] pb-10 min-h-dvh flex items-center flex-col justify-center gap-4",children:[e.jsx("img",{src:H,alt:"website logo",className:"w-[50px] aspect-square "}),e.jsxs("div",{className:"flex items-center flex-col gap-2 *:text-center",children:[e.jsx("h1",{className:"font-cinzel text-2xl font-black",children:" Reset Password"}),e.jsx("p",{className:"text-sm",children:"Enter email for verification"})]}),e.jsxs("form",{onSubmit:V,className:"sm:w-1/2 w-full flex flex-col gap-4 items-center ",children:[e.jsx("input",{type:"text",name:"email",value:c,onChange:({target:s})=>E(s.value),className:"w-full outline-none  bg-transparent border-b  placeholder:text-base text-white placeholder:italic  placeholder:font-cinzel  font-medium text-lg ",placeholder:"Enter email",required:!0}),e.jsxs("button",{type:"submit",className:" button flex items-center justify-center",children:["Verify ",I&&e.jsx("div",{className:"loader ml-1",id:"loader"})," "]})]}),e.jsxs("button",{onClick:()=>P(`/login${g?`?redirects=${encodeURIComponent(g)}`:""}`),className:"text-xs text-gray-300 flex items-center justify-center",children:[e.jsx(y,{icon:C,className:"mr-2"})," Back to Sign in"]}),e.jsx(U,{children:m&&e.jsxs(J.section,{variants:B,initial:"hidden",animate:"visible",exit:"exit",className:"w-full fixed top-0 left-0 px-5half items-center flex-col gap-6 blurred3 z-[300] flex  justify-center  min-h-dvh",children:[e.jsxs("form",{className:"w-full max-w-[400px]  shadow-lg text-white  bg-black  rounded-md flex flex-col gap-6 p-4",onSubmit:$,children:[e.jsxs("div",{className:"flex items-center flex-col gap-2 *:text-center",children:[e.jsxs("h1",{className:"font-cinzel text-2xl font-black",children:[" ","Enter verification code"]}),e.jsxs("p",{className:"text-sm",children:["We've sent a code to"," ",v||"your email"]})]}),e.jsx("input",{type:"text",required:!0,name:"code",onChange:({target:s})=>k(s.value),value:d,className:"w-full outline-none  bg-transparent border-b  placeholder:text-base text-white placeholder:italic  placeholder:font-cinzel  font-medium text-lg ",placeholder:"Enter code"}),e.jsxs("span",{className:"w-full relative",children:[e.jsx("input",{onChange:({target:s})=>j(s.value),name:"password",type:f?"text":"password",className:"w-full outline-none  bg-transparent border-b  pr-[35px] placeholder:text-base text-white placeholder:italic  placeholder:font-cinzel  font-medium text-lg ",placeholder:"Enter new password",required:!0,value:u}),u.length>0&&e.jsx(y,{icon:f?_:W,className:"w-[20px] aspect-square cursor-pointer flex items-center justify-center absolute right-0 top-2/4  translate-y-[-50%]",onClick:()=>{O(!f)}})]}),e.jsxs("div",{className:"flex  flex-wrap gap-2 justify-center items-center",children:[e.jsx("p",{className:"text-xs text-gray-300",children:"Didn't send code yet? "}),e.jsxs("button",{type:"button",className:"text-[#FFD700] text-sm p-2 flex  ",disabled:i>0&&h,onClick:q,children:[" ",i>0&&h?`Wait ${i} seconds`:"Resend code"," ",L&&e.jsx("div",{className:"loader ml-1",id:"loader"})]})]}),e.jsxs("button",{type:"submit",className:" button flex items-center justify-center",children:["Verify"," ",T&&e.jsx("div",{className:"loader ml-1",id:"loader"})," "]})]}),e.jsxs("button",{onClick:()=>{x(!1),r(null),o(null),j("")},className:" text-sm text-white flex items-center justify-center",children:[e.jsx(y,{icon:C,className:"mr-2"})," Go back"]})]},"modal")})]})}export{K as default};
