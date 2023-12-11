"use strict";(self.webpackChunk_N_E=self.webpackChunk_N_E||[]).push([[832],{95518:function(e,t,i){i.d(t,{Iw:function(){return useAtomicLibraryCollectionLoader},uN:function(){return u},yh:function(){return c}});var n=i(77665),s=i(97726),l=i(23890),o=i(2265),r=i(51472),a=i(57638);let c=(0,s.O4)("sea-library-collection",void 0,void 0,{unstable_getOnInit:!0}),u=(0,n.cn)(e=>e(c),(e,t,i)=>{var n;let s=null===(n=e(c))||void 0===n?void 0:n.lists;if(s)return s.flatMap(e=>e.entries).find(e=>e.mediaId===i)});function useAtomicLibraryCollectionLoader(){let e=(0,l.b9)(c),{data:t,status:i}=(0,r.tZ)({endpoint:a.E.LIBRARY_COLLECTION,queryKey:["get-library-collection"]});return(0,o.useEffect)(()=>{"success"===i&&e(t)},[t,i]),null}},70226:function(e,t,i){i.d(t,{Oh:function(){return useListenToMissingEpisodes},VK:function(){return useMissingEpisodeCount},wS:function(){return c}});var n=i(57638),s=i(77665),l=i(23890),o=i(51472),r=i(2265),a=i(24033);let c=(0,s.cn)([]),u=(0,s.cn)(e=>e(c).length);function useMissingEpisodeCount(){return(0,l.Dv)(u)}function useListenToMissingEpisodes(){let e=(0,a.usePathname)(),t=(0,l.b9)(c),{data:i}=(0,o.tZ)({endpoint:n.E.MISSING_EPISODES,queryKey:["get-missing-episodes"],enabled:"/schedule"!==e});return(0,r.useEffect)(()=>{t(null!=i?i:[])},[i]),null}},48761:function(e,t,i){i.d(t,{L:function(){return o},x:function(){return useCurrentUser}});var n=i(23890),s=i(751),l=i(77665);let o=(0,l.cn)(e=>{var t;let i=e(s.X);return null==i?void 0:null===(t=i.user)||void 0===t?void 0:t.viewer});function useCurrentUser(){let[e,t]=(0,n.KO)(o);return{user:e,setUser:t}}},42475:function(e,t,i){i.d(t,{X:function(){return AnilistMediaEntryModal}});var n=i(57437),s=i(2265),l=i(46246),o=i(26345),r=i(48761),a=i(23890),c=i(97622),u=i(56407),d=i(85208),m=i(33538),f=i(16691),g=i.n(f),p=i(54487),y=i(80024),h=i(67701),v=i(18743),E=i(87870),b=i(38038),L=i(51472),x=i(57638),N=i(5925);let S=(0,o.SC)(e=>{let{z:t,presets:i}=e;return t.object({status:t.custom().nullish(),score:t.number().min(0).max(1e3).nullish(),progress:t.number().min(0).nullish(),startedAt:i.datePicker.nullish().transform(e=>e?{day:e.getUTCDate(),month:e.getUTCMonth()+1,year:e.getUTCFullYear()}:null),completedAt:i.datePicker.nullish().transform(e=>e?{day:e.getUTCDate(),month:e.getUTCMonth()+1,year:e.getUTCFullYear()}:null)})}),AnilistMediaEntryModal=e=>{var t,i;let[f,w]=(0,l.Z)(!1),{children:A,media:I,listData:C,...j}=e,T=(0,a.Dv)(r.L),_=(0,b.NL)(),{mutate:D,isPending:k}=(0,L.$U)({endpoint:x.E.ANILIST_LIST_ENTRY,mutationKey:["update-anilist-list-entry"],onSuccess:async()=>{N.ZP.success("Entry updated"),await _.refetchQueries({queryKey:["get-media-entry",null==I?void 0:I.id]}),await _.refetchQueries({queryKey:["get-library-collection"]}),await _.refetchQueries({queryKey:["get-anilist-collection"]})}}),{mutate:K,isPending:F}=(0,L.$U)({endpoint:x.E.ANILIST_LIST_ENTRY,mutationKey:["delete-anilist-list-entry"],method:"delete",onSuccess:async()=>{N.ZP.success("Entry removed"),w(!1),await _.refetchQueries({queryKey:["get-media-entry",null==I?void 0:I.id]}),await _.refetchQueries({queryKey:["get-library-collection"]}),await _.refetchQueries({queryKey:["get-anilist-collection"]})}});return T?(0,n.jsxs)(n.Fragment,{children:[!!C&&(0,n.jsx)(c.hU,{intent:"gray-subtle",icon:(0,n.jsx)(u.Q,{}),rounded:!0,size:"sm",onClick:w}),!C&&(0,n.jsx)(c.hU,{intent:"primary-subtle",icon:(0,n.jsx)(d.p,{}),rounded:!0,size:"sm",onClick:()=>D({mediaId:(null==I?void 0:I.id)||0,status:"PLANNING",score:0,progress:0,startedAt:null,completedAt:null})}),(0,n.jsxs)(m.u_,{isOpen:f,onClose:w,title:null!==(i=null==I?void 0:null===(t=I.title)||void 0===t?void 0:t.userPreferred)&&void 0!==i?i:void 0,isClosable:!0,size:"xl",titleClassName:"text-xl",children:[(null==I?void 0:I.bannerImage)&&(0,n.jsxs)("div",{className:"h-24 w-full flex-none object-cover object-center overflow-hidden absolute left-0 top-0 z-[-1]",children:[(0,n.jsx)(g(),{src:null==I?void 0:I.bannerImage,alt:"banner",fill:!0,quality:80,priority:!0,sizes:"20rem",className:"object-cover object-center opacity-30"}),(0,n.jsx)("div",{className:"z-[5] absolute bottom-0 w-full h-[80%] bg-gradient-to-t from-gray-900 to-transparent"})]}),!!C&&(0,n.jsxs)(o.Fu,{schema:S,onSubmit:e=>{console.log(e.startedAt),D({mediaId:(null==I?void 0:I.id)||0,status:e.status,score:e.score?10*e.score:0,progress:e.progress,startedAt:e.startedAt,completedAt:e.completedAt})},className:(0,p.cn)({"mt-16":!!(null==I?void 0:I.bannerImage)}),onError:console.log,defaultValues:{status:null==C?void 0:C.status,score:null==C?void 0:C.score,progress:null==C?void 0:C.progress,startedAt:(null==C?void 0:C.startedAt)?new Date(null==C?void 0:C.startedAt):void 0,completedAt:(null==C?void 0:C.completedAt)?new Date(null==C?void 0:C.completedAt):void 0},children:[(0,n.jsxs)("div",{className:"flex flex-col sm:flex-row gap-4",children:[(0,n.jsx)(o.gN.Select,{label:"Status",name:"status",options:[(null==I?void 0:I.status)!=="NOT_YET_RELEASED"?{value:"CURRENT",label:"Watching"}:void 0,{value:"PLANNING",label:"Planning"},(null==I?void 0:I.status)!=="NOT_YET_RELEASED"?{value:"PAUSED",label:"Paused"}:void 0,(null==I?void 0:I.status)!=="NOT_YET_RELEASED"?{value:"COMPLETED",label:"Completed"}:void 0,(null==I?void 0:I.status)!=="NOT_YET_RELEASED"?{value:"DROPPED",label:"Dropped"}:void 0].filter(Boolean)}),(null==I?void 0:I.status)!=="NOT_YET_RELEASED"&&(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(o.gN.Number,{label:"Score",name:"score",discrete:!0,min:0,max:10,maxFractionDigits:0,minFractionDigits:0,precision:1,rightIcon:(0,n.jsx)(h.s,{})}),(0,n.jsx)(o.gN.Number,{label:"Progress",name:"progress",discrete:!0,min:0,maxFractionDigits:0,minFractionDigits:0,precision:1,rightIcon:(0,n.jsx)(y.g,{})})]})]}),(null==I?void 0:I.status)!=="NOT_YET_RELEASED"&&(0,n.jsxs)("div",{className:"flex flex-col sm:flex-row gap-4",children:[(0,n.jsx)(o.gN.DatePicker,{label:"Start date",name:"startedAt"}),(0,n.jsx)(o.gN.DatePicker,{label:"Completion date",name:"completedAt"})]}),(0,n.jsxs)("div",{className:"flex w-full items-center justify-between mt-4",children:[(0,n.jsx)("div",{className:"flex items-center gap-1",children:(0,n.jsxs)(v.p,{children:[(0,n.jsx)(v.p.Button,{as:s.Fragment,children:(0,n.jsx)(c.hU,{intent:"alert-subtle",icon:(0,n.jsx)(E.S,{}),rounded:!0,size:"md"})}),(0,n.jsx)(v.p.Panel,{children:(0,n.jsx)(c.zx,{intent:"alert-basic",rounded:!0,size:"md",isLoading:F,onClick:()=>K({mediaId:null==I?void 0:I.id}),children:"Confirm"})})]})}),(0,n.jsx)(o.gN.Submit,{role:"save",disableIfInvalid:!0,isLoading:k,isDisabled:F})]})]})]})]}):null}},59346:function(e,t,i){i.d(t,{t:function(){return imageShimmer}});let imageShimmerEffect=(e,t)=>'\n<svg width="'.concat(e,'" height="').concat(t,'" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">\n  <defs>\n    <linearGradient id="g">\n      <stop stop-color="#333" offset="20%" />\n      <stop stop-color="#222" offset="50%" />\n      <stop stop-color="#333" offset="70%" />\n    </linearGradient>\n  </defs>\n  <rect width="').concat(e,'" height="').concat(t,'" fill="#333" />\n  <rect id="r" width="').concat(e,'" height="').concat(t,'" fill="url(#g)" />\n  <animate xlink:href="#r" attributeName="x" from="-').concat(e,'" to="').concat(e,'" dur="1s" repeatCount="indefinite"  />\n</svg>'),toBase64=e=>window.btoa(e),imageShimmer=(e,t)=>"data:image/svg+xml;base64,".concat(toBase64(imageShimmerEffect(e,t)))},6469:function(e,t,i){i.d(t,{u:function(){return c}});var n=i(57437),s=i(2265),l=i(54487),o=i(96061),r=i(98265);let a=(0,l.xH)({tooltip:(0,o.j)(["UI-Tooltip__tooltip","z-50 overflow-hidden rounded-[--radius] px-3 py-1.5 text-sm shadow-md animate-in fade-in-50","bg-gray-800 text-white","data-[side=bottom]:slide-in-from-top-1 data-[side=left]:slide-in-from-right-1 data-[side=right]:slide-in-from-left-1 data-[side=top]:slide-in-from-bottom-1"])}),c=s.forwardRef((e,t)=>{let{children:i,tooltipClassName:s,className:o,trigger:c,...u}=e;return(0,n.jsx)(r.zt,{delayDuration:50,children:(0,n.jsxs)(r.fC,{children:[(0,n.jsx)(r.xz,{asChild:!0,children:c}),(0,n.jsx)(r.VY,{className:(0,l.cn)(a.tooltip(),s,o),...u,ref:t,children:i})]})})});c.displayName="Tooltip",r.zt},10137:function(e,t,i){i.d(t,{Jx:function(){return useScanLibrary},Kg:function(){return useMediaEntryBulkAction},Ye:function(){return useRemoveEmptyDirectories},_U:function(){return useUpdateLocalFile},d3:function(){return useLibraryCollection},qn:function(){return useMissingEpisodes},ss:function(){return useLocalFileBulkAction}});var n=i(38038),s=i(51472),l=i(57638),o=i(2265),r=i(5925),a=i(23890),c=i(95518),u=i(70226);function useScanLibrary(){let e=(0,n.NL)(),{mutate:t,isPending:i}=(0,s.$U)({endpoint:l.E.SCAN_LIBRARY,mutationKey:["scan-library"],onSuccess:async()=>{r.ZP.success("Library scanned"),await e.refetchQueries({queryKey:["get-library-collection"]}),await e.refetchQueries({queryKey:["get-missing-episodes"]})}});return{scanLibrary:t,isScanning:i}}function useLibraryCollection(){var e,t,i,n;let[r,u]=(0,a.KO)(c.yh),{data:d,isLoading:m,refetch:f}=(0,s.tZ)({endpoint:l.E.LIBRARY_COLLECTION,queryKey:["get-library-collection"],placeholderData:r});(0,o.useEffect)(()=>{d&&u(d)},[d]);let g=(0,o.useMemo)(()=>d?[d.lists.find(e=>"current"===e.type),d.lists.find(e=>"paused"===e.type),d.lists.find(e=>"planned"===e.type),d.lists.find(e=>"completed"===e.type),d.lists.find(e=>"dropped"===e.type)].filter(Boolean):[],[d]);return{libraryCollectionList:g,continueWatchingList:null!==(e=null==d?void 0:d.continueWatchingList)&&void 0!==e?e:[],isLoading:m,unmatchedLocalFiles:null!==(t=null==d?void 0:d.unmatchedLocalFiles)&&void 0!==t?t:[],ignoredLocalFiles:null!==(i=null==d?void 0:d.ignoredLocalFiles)&&void 0!==i?i:[],unmatchedGroups:null!==(n=null==d?void 0:d.unmatchedGroups)&&void 0!==n?n:[]}}function useMissingEpisodes(){let e=(0,a.b9)(u.wS),{data:t,isLoading:i,status:n}=(0,s.tZ)({endpoint:l.E.MISSING_EPISODES,queryKey:["get-missing-episodes"]});return(0,o.useEffect)(()=>{"success"===n&&e(null!=t?t:[])},[t]),{missingEpisodes:null!=t?t:[],isLoading:i}}function useMediaEntryBulkAction(e){let t=(0,n.NL)(),{mutate:i,isPending:o}=(0,s.$U)({endpoint:l.E.MEDIA_ENTRY_BULK_ACTION,mutationKey:["media-entry-bulk-action"],method:"patch",onSuccess:async()=>{await t.refetchQueries({queryKey:["get-library-collection"]}),e&&await t.refetchQueries({queryKey:["get-media-entry",e]})}});return{toggleLock:e=>i({mediaId:e,action:"toggle-lock"}),unmatchAll:e=>i({mediaId:e,action:"unmatch"},{onSuccess:()=>{r.ZP.success("Files unmatched")}}),isPending:o}}function useLocalFileBulkAction(){let e=(0,n.NL)(),{mutate:t,isPending:i}=(0,s.$U)({endpoint:l.E.LOCAL_FILES,mutationKey:["local-file-bulk-action"],method:"post",onSuccess:async()=>{await e.refetchQueries({queryKey:["get-library-collection"]})}});return{lockFiles:()=>t({action:"lock"},{onSuccess:()=>{r.ZP.success("Files locked")}}),unlockFiles:()=>t({action:"unlock"},{onSuccess:()=>{r.ZP.success("Files unlocked")}}),isPending:i}}function useRemoveEmptyDirectories(){let{mutate:e,isPending:t}=(0,s.$U)({endpoint:l.E.EMPTY_DIRECTORIES,mutationKey:["remove-empty-directories"],method:"delete",onSuccess:async()=>{r.ZP.success("Empty directories removed")}});return{removeEmptyDirectories:()=>e(),isPending:t}}function getDefaultLocalFileVariables(e){return{path:e.path,metadata:e.metadata,locked:e.locked,ignored:e.ignored,mediaId:e.mediaId}}function useUpdateLocalFile(e){let t=(0,n.NL)(),{mutate:i,isPending:o}=(0,s.$U)({endpoint:l.E.LOCAL_FILE,mutationKey:["patch-local-file"],method:"patch",onSuccess:async()=>{await t.refetchQueries({queryKey:["get-library-collection"]}),e&&await t.refetchQueries({queryKey:["get-media-entry",e]})}});return{updateLocalFile:(e,t,n)=>{i({...getDefaultLocalFileVariables(e),...t},{onSuccess:()=>{n&&n()}})},isPending:o}}}}]);