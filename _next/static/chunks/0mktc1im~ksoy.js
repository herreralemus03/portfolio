(globalThis.TURBOPACK||(globalThis.TURBOPACK=[])).push(["object"==typeof document?document.currentScript:void 0,95057,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={formatUrl:function(){return i},formatWithValidation:function(){return u},urlObjectKeys:function(){return l}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let a=e.r(90809)._(e.r(98183)),s=/https?|ftp|gopher|file/;function i(e){let{auth:t,hostname:r}=e,n=e.protocol||"",o=e.pathname||"",i=e.hash||"",l=e.query||"",u=!1;t=t?encodeURIComponent(t).replace(/%3A/i,":")+"@":"",e.host?u=t+e.host:r&&(u=t+(~r.indexOf(":")?`[${r}]`:r),e.port&&(u+=":"+e.port)),l&&"object"==typeof l&&(l=String(a.urlQueryToSearchParams(l)));let c=e.search||l&&`?${l}`||"";return n&&!n.endsWith(":")&&(n+=":"),e.slashes||(!n||s.test(n))&&!1!==u?(u="//"+(u||""),o&&"/"!==o[0]&&(o="/"+o)):u||(u=""),i&&"#"!==i[0]&&(i="#"+i),c&&"?"!==c[0]&&(c="?"+c),o=o.replace(/[?#]/g,encodeURIComponent),c=c.replace("#","%23"),`${n}${u}${o}${c}${i}`}let l=["auth","hash","host","hostname","href","path","pathname","port","protocol","query","search","slashes"];function u(e){return i(e)}},18581,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"useMergedRef",{enumerable:!0,get:function(){return o}});let n=e.r(71645);function o(e,t){let r=(0,n.useRef)(null),o=(0,n.useRef)(null);return(0,n.useCallback)(n=>{if(null===n){let e=r.current;e&&(r.current=null,e());let t=o.current;t&&(o.current=null,t())}else e&&(r.current=a(e,n)),t&&(o.current=a(t,n))},[e,t])}function a(e,t){if("function"!=typeof e)return e.current=t,()=>{e.current=null};{let r=e(t);return"function"==typeof r?r:()=>e(null)}}("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},73668,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"isLocalURL",{enumerable:!0,get:function(){return a}});let n=e.r(18967),o=e.r(52817);function a(e){if(!(0,n.isAbsoluteUrl)(e))return!0;try{let t=(0,n.getLocationOrigin)(),r=new URL(e,t);return r.origin===t&&(0,o.hasBasePath)(r.pathname)}catch(e){return!1}}},84508,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0}),Object.defineProperty(r,"errorOnce",{enumerable:!0,get:function(){return n}});let n=e=>{}},22016,(e,t,r)=>{"use strict";Object.defineProperty(r,"__esModule",{value:!0});var n={default:function(){return b},useLinkStatus:function(){return k}};for(var o in n)Object.defineProperty(r,o,{enumerable:!0,get:n[o]});let a=e.r(90809),s=e.r(43476),i=a._(e.r(71645)),l=e.r(95057),u=e.r(8372),c=e.r(18581),f=e.r(18967),p=e.r(5550);e.r(33525);let d=e.r(88540),h=e.r(91949),x=e.r(73668),m=e.r(9396);function b(t){var r,n;let o,a,b,[k,y]=(0,i.useOptimistic)(h.IDLE_LINK_STATUS),v=(0,i.useRef)(null),{href:j,as:S,children:_,prefetch:w=null,passHref:P,replace:O,shallow:C,scroll:T,onClick:N,onMouseEnter:R,onTouchStart:U,legacyBehavior:E=!1,onNavigate:L,transitionTypes:M,ref:A,unstable_dynamicOnHover:I,...z}=t;o=_,E&&("string"==typeof o||"number"==typeof o)&&(o=(0,s.jsx)("a",{children:o}));let D=i.default.useContext(u.AppRouterContext),K=!1!==w,B=!1!==w?null===(n=w)||"auto"===n?m.FetchStrategy.PPR:m.FetchStrategy.Full:m.FetchStrategy.PPR,F="string"==typeof(r=S||j)?r:(0,l.formatUrl)(r);if(E){if(o?.$$typeof===Symbol.for("react.lazy"))throw Object.defineProperty(Error("`<Link legacyBehavior>` received a direct child that is either a Server Component, or JSX that was loaded with React.lazy(). This is not supported. Either remove legacyBehavior, or make the direct child a Client Component that renders the Link's `<a>` tag."),"__NEXT_ERROR_CODE",{value:"E863",enumerable:!1,configurable:!0});a=i.default.Children.only(o)}let $=E?a&&"object"==typeof a&&a.ref:A,X=i.default.useCallback(e=>(null!==D&&(v.current=(0,h.mountLinkInstance)(e,F,D,B,K,y)),()=>{v.current&&((0,h.unmountLinkForCurrentNavigation)(v.current),v.current=null),(0,h.unmountPrefetchableInstance)(e)}),[K,F,D,B,y]),q={ref:(0,c.useMergedRef)(X,$),onClick(t){E||"function"!=typeof N||N(t),E&&a.props&&"function"==typeof a.props.onClick&&a.props.onClick(t),!D||t.defaultPrevented||function(t,r,n,o,a,s,l){if("u">typeof window){let u,{nodeName:c}=t.currentTarget;if("A"===c.toUpperCase()&&((u=t.currentTarget.getAttribute("target"))&&"_self"!==u||t.metaKey||t.ctrlKey||t.shiftKey||t.altKey||t.nativeEvent&&2===t.nativeEvent.which)||t.currentTarget.hasAttribute("download"))return;if(!(0,x.isLocalURL)(r)){o&&(t.preventDefault(),location.replace(r));return}if(t.preventDefault(),s){let e=!1;if(s({preventDefault:()=>{e=!0}}),e)return}let{dispatchNavigateAction:f}=e.r(99781);i.default.startTransition(()=>{f(r,o?"replace":"push",!1===a?d.ScrollBehavior.NoScroll:d.ScrollBehavior.Default,n.current,l)})}}(t,F,v,O,T,L,M)},onMouseEnter(e){E||"function"!=typeof R||R(e),E&&a.props&&"function"==typeof a.props.onMouseEnter&&a.props.onMouseEnter(e),D&&K&&(0,h.onNavigationIntent)(e.currentTarget,!0===I)},onTouchStart:function(e){E||"function"!=typeof U||U(e),E&&a.props&&"function"==typeof a.props.onTouchStart&&a.props.onTouchStart(e),D&&K&&(0,h.onNavigationIntent)(e.currentTarget,!0===I)}};return(0,f.isAbsoluteUrl)(F)?q.href=F:E&&!P&&("a"!==a.type||"href"in a.props)||(q.href=(0,p.addBasePath)(F)),b=E?i.default.cloneElement(a,q):(0,s.jsx)("a",{...z,...q,children:o}),(0,s.jsx)(g.Provider,{value:k,children:b})}e.r(84508);let g=(0,i.createContext)(h.IDLE_LINK_STATUS),k=()=>(0,i.useContext)(g);("function"==typeof r.default||"object"==typeof r.default&&null!==r.default)&&void 0===r.default.__esModule&&(Object.defineProperty(r.default,"__esModule",{value:!0}),Object.assign(r.default,r),t.exports=r.default)},86334,e=>{"use strict";var t=e.i(43476),r=e.i(71645),n=e.i(22016);let o=[{name:"Fernando Herrera",role:"Full Stack Developer · Java · Go · Flutter"},{name:"Ana López",role:"UX/UI Designer focused on minimal interfaces"},{name:"Carlos Ruiz",role:"Backend Engineer specialized in cloud systems"}];function a(){return(0,t.jsxs)("div",{className:"sk-card",children:[(0,t.jsx)("div",{className:"sk-bone sk-title"}),(0,t.jsx)("div",{className:"sk-bone sk-line"}),(0,t.jsx)("div",{className:"sk-bone sk-line sk-short"})]})}function s({name:e,role:r}){return(0,t.jsxs)("div",{className:"sk-card sk-result",children:[(0,t.jsx)("h3",{children:e}),(0,t.jsx)("p",{children:r})]})}e.s(["default",0,function(){let[e,i]=(0,r.useState)(""),[l,u]=(0,r.useState)(!1),[c,f]=(0,r.useState)(null);function p(){e.trim()&&(u(!0),f(null),setTimeout(()=>{u(!1),f(o)},2500))}return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)("style",{children:`
        .sk-page {
          margin: 0;
          min-height: 100vh;
          background: #e6e7ee;
          font-family: "Segoe UI", sans-serif;
          display: flex;
          flex-direction: column;
          align-items: center;
          padding: 40px 20px;
          color: #4b4f5c;
        }
        .sk-container { width: 100%; max-width: 650px; }
        .sk-back { color: #999; text-decoration: none; font-size: 13px; font-family: monospace; display: inline-block; margin-bottom: 24px; }
        .sk-back:hover { color: #555; }
        .sk-title-main { font-size: 28px; font-weight: 700; margin-bottom: 25px; letter-spacing: 0.5px; }
        .sk-search-row { display: flex; gap: 14px; margin-bottom: 25px; }
        .sk-input {
          flex: 1; border: none; outline: none;
          padding: 18px 22px; border-radius: 18px;
          background: #e6e7ee; font-size: 16px; color: #555;
          box-shadow: 8px 8px 16px #c5c7d0, -8px -8px 16px #ffffff;
          transition: box-shadow 0.2s;
        }
        .sk-input:focus { box-shadow: inset 4px 4px 8px #c8cad1, inset -4px -4px 8px #ffffff; }
        .sk-btn {
          border: none; padding: 0 26px; border-radius: 18px;
          background: #e6e7ee; cursor: pointer; font-weight: 600;
          color: #4b4f5c; font-size: 15px;
          box-shadow: 8px 8px 16px #c5c7d0, -8px -8px 16px #ffffff;
          transition: transform 0.2s, box-shadow 0.2s;
        }
        .sk-btn:hover { transform: translateY(-1px); }
        .sk-btn:active { box-shadow: inset 4px 4px 8px #c8cad1, inset -4px -4px 8px #ffffff; }
        .sk-searching { margin-bottom: 20px; font-size: 14px; opacity: 0.65; padding-left: 6px; }
        .sk-list { display: flex; flex-direction: column; gap: 18px; }
        .sk-card {
          border-radius: 24px; padding: 22px; background: #e6e7ee;
          box-shadow: 10px 10px 20px #c8cad1, -10px -10px 20px #ffffff;
          transition: transform 0.2s;
        }
        .sk-result:hover { transform: translateY(-2px); }
        .sk-result h3 { margin: 0 0 10px; font-size: 18px; color: #444; }
        .sk-result p  { margin: 0; line-height: 1.5; opacity: 0.8; }
        .sk-bone {
          position: relative; overflow: hidden;
          background: #dfe1e8; border-radius: 10px;
        }
        .sk-bone::after {
          content: ""; position: absolute;
          top: 0; left: -180px; width: 180px; height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.7), transparent);
          animation: sk-shimmer 1.4s infinite;
        }
        @keyframes sk-shimmer { 100% { left: 100%; } }
        .sk-title { height: 22px; width: 55%; border-radius: 12px; margin-bottom: 16px; }
        .sk-line  { height: 14px; width: 100%; margin-bottom: 10px; }
        .sk-short { width: 75%; }
      `}),(0,t.jsx)("div",{className:"sk-page",children:(0,t.jsxs)("div",{className:"sk-container",children:[(0,t.jsx)(n.default,{href:"/",className:"sk-back",children:"← volver"}),(0,t.jsx)("div",{className:"sk-title-main",children:"Search Users"}),(0,t.jsxs)("div",{className:"sk-search-row",children:[(0,t.jsx)("input",{className:"sk-input",value:e,onChange:e=>i(e.target.value),onKeyDown:e=>"Enter"===e.key&&p(),placeholder:"Search something..."}),(0,t.jsx)("button",{className:"sk-btn",onClick:p,children:"Search"})]}),l&&(0,t.jsx)("div",{className:"sk-searching",children:"Searching..."}),(0,t.jsxs)("div",{className:"sk-list",children:[l&&[0,1,2].map(e=>(0,t.jsx)(a,{},e)),c&&c.map(e=>(0,t.jsx)(s,{...e},e.name))]})]})})]})}])}]);