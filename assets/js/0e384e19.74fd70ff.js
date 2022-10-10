"use strict";(self.webpackChunkosc_website=self.webpackChunkosc_website||[]).push([[671],{3905:(e,t,n)=>{n.d(t,{Zo:()=>p,kt:()=>d});var r=n(7294);function o(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function i(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){o(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function l(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},a=Object.keys(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(e);for(r=0;r<a.length;r++)n=a[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var c=r.createContext({}),s=function(e){var t=r.useContext(c),n=t;return e&&(n="function"==typeof e?e(t):i(i({},t),e)),n},p=function(e){var t=s(e.components);return r.createElement(c.Provider,{value:t},e.children)},u={inlineCode:"code",wrapper:function(e){var t=e.children;return r.createElement(r.Fragment,{},t)}},m=r.forwardRef((function(e,t){var n=e.components,o=e.mdxType,a=e.originalType,c=e.parentName,p=l(e,["components","mdxType","originalType","parentName"]),m=s(n),d=o,y=m["".concat(c,".").concat(d)]||m[d]||u[d]||a;return n?r.createElement(y,i(i({ref:t},p),{},{components:n})):r.createElement(y,i({ref:t},p))}));function d(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var a=n.length,i=new Array(a);i[0]=m;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l.mdxType="string"==typeof e?e:o,i[1]=l;for(var s=2;s<a;s++)i[s]=n[s];return r.createElement.apply(null,i)}return r.createElement.apply(null,n)}m.displayName="MDXCreateElement"},9881:(e,t,n)=>{n.r(t),n.d(t,{assets:()=>c,contentTitle:()=>i,default:()=>u,frontMatter:()=>a,metadata:()=>l,toc:()=>s});var r=n(7462),o=(n(7294),n(3905));const a={sidebar_position:1},i="Introduction",l={unversionedId:"intro",id:"intro",title:"Introduction",description:"Let's discover Open Services Cloud in less than 5 minutes.",source:"@site/docs/intro.md",sourceDirName:".",slug:"/intro",permalink:"/osc/docs/intro",draft:!1,tags:[],version:"current",sidebarPosition:1,frontMatter:{sidebar_position:1},sidebar:"tutorialSidebar",next:{title:"Configuration Language",permalink:"/osc/docs/ocl"}},c={},s=[{value:"Getting Started",id:"getting-started",level:2},{value:"What you&#39;ll need",id:"what-youll-need",level:3},{value:"Create service descriptor",id:"create-service-descriptor",level:2},{value:"Deploy the service",id:"deploy-the-service",level:2}],p={toc:s};function u(e){let{components:t,...n}=e;return(0,o.kt)("wrapper",(0,r.Z)({},p,n,{components:t,mdxType:"MDXLayout"}),(0,o.kt)("h1",{id:"introduction"},"Introduction"),(0,o.kt)("p",null,"Let's discover ",(0,o.kt)("strong",{parentName:"p"},"Open Services Cloud in less than 5 minutes"),"."),(0,o.kt)("h2",{id:"getting-started"},"Getting Started"),(0,o.kt)("p",null,"Get started by ",(0,o.kt)("strong",{parentName:"p"},"creating a simple managed service"),"."),(0,o.kt)("p",null,"You will create a service configuration descriptor and you will submit to Open Services Cloud using one supported channel (CLI, REST, ...)."),(0,o.kt)("h3",{id:"what-youll-need"},"What you'll need"),(0,o.kt)("p",null,"To actually create the service, you have to submit the service descriptor to ",(0,o.kt)("strong",{parentName:"p"},"Open Services Cloud orchestrator"),"."),(0,o.kt)("p",null,"You can:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"install the orchestrator locally on your machine to test your service. This approach is mostly use for testing as some fundamental services can be mocked."),(0,o.kt)("li",{parentName:"ul"},"use a cloud provider supporting Open Services Cloud, meaning that the orchestrator runs directly on the cloud provider")),(0,o.kt)("h2",{id:"create-service-descriptor"},"Create service descriptor"),(0,o.kt)("p",null,"A service is described with a ",(0,o.kt)("strong",{parentName:"p"},"yaml file"),". In this descriptor, you will define:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"the service components"),(0,o.kt)("li",{parentName:"ul"},"the integration of the service with the fundamental services (computing, billing, ...)")),(0,o.kt)("p",null,"The yaml descriptor can be created by hand, or using CLI or starter site (interactive mode)."),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},"bin/ocl --create --name my-service --billing-model renting --billing-period monthly --network ...\n")),(0,o.kt)("p",null,"For example, here's a very simple service descriptor:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-json"},'{\n  "name": "my-service",\n  "category": "compute",\n  "namespace": "my-namespace",\n  "billing": {\n    "model": "flat",\n    "period": "monthly",\n    "currency": "euro",\n    "fixedPrice": 20,\n    "variablePrice": 10,\n    "variableItem": "instance"\n  },\n  "compute": {\n    "vm": [{\n      "name": "my-vm",\n      "type": "t2.large",\n      "platform": "linux-x64",\n      "vpc": "my-vpc",\n      "subnet": "my-subnet",\n      "security": "my-sg",\n      "storage": "my-storage",\n      "publicly": true\n    }]\n  },\n  "network": {\n    "vpc": [{\n      "name": "my-vpc",\n      "cidrs": "172.31.0.0/16",\n      "routes": "",\n      "acl": ""\n    }],\n    "subnet": [{\n      "name": "my-subnet",\n      "vpc": "my-vpc",\n      "table": "",\n      "routes": ""\n    }],\n    "security": [{\n      "name": "my-sg",\n      "inbound": [ "22->22", "443->443", "80->80" ],\n      "outbound": []\n    }]\n  },\n  "storage": [{\n    "name": "my-storage",\n    "type": "ssd",\n    "size": "8GiB" \n  }]\n}\n')),(0,o.kt)("h2",{id:"deploy-the-service"},"Deploy the service"),(0,o.kt)("p",null,"To actually deploy the service, you have to submit the ",(0,o.kt)("strong",{parentName:"p"},"yaml file")," to the ",(0,o.kt)("strong",{parentName:"p"},"Open Services Cloud orchestrator"),"."),(0,o.kt)("p",null,"The orchestrator supports several channels:"),(0,o.kt)("ul",null,(0,o.kt)("li",{parentName:"ul"},"CLI"),(0,o.kt)("li",{parentName:"ul"},"REST"),(0,o.kt)("li",{parentName:"ul"},"SDK")),(0,o.kt)("p",null,"For instance, you can deploy the service descriptor via REST:"),(0,o.kt)("pre",null,(0,o.kt)("code",{parentName:"pre",className:"language-bash"},'curl -XPOST -d @service.yaml -H "Content-Type: application/yaml" http://osc.orchestrator/path\n')))}u.isMDXComponent=!0}}]);