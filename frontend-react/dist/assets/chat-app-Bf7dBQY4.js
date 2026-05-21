(()=>{const at=[{id:"ayan",name:"阿延",handle:"@ayan",bio:"小酒，今天也要开开心心哦～",status:"在线",roleTag:"特别关注",lastMessage:"先聊天详情页。头部、气泡、输入区一起收掉，其他页自然顺。",lastTime:"刚刚",unread:2,pinned:!0,avatar:"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80",theme:"rose",settings:{model:"gpt-5.4",modelProviderId:"openai",temperature:.72,topP:.9,contextCount:64,thinkBudget:48,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!0,proactiveFrequency:60,memoryEnabled:!0},roomBackground:"点阵",chatTheme:"default",bubbleTheme:"默认主题",topics:[{id:"t1",title:"最近状态",updatedAt:"今天 21:40",count:24},{id:"t2",title:"睡眠记录",updatedAt:"昨天",count:18},{id:"t3",title:"网页 UI",updatedAt:"3天前",count:41}],messages:[{id:"m1",role:"ai",text:"今天把你丢给我的文件都翻了一遍。页面可以更可爱，真正夹棒的是里面的空壳。",time:"21:48"},{id:"m2",role:"user",text:"所以该先改哪里？",time:"21:49"},{id:"m3",role:"ai",text:"先聊天详情页。头部、气泡、输入区一起收掉，其他页自然顺。",time:"21:49",thinking:"她已经给了明确起点，先改核心路径能更快出效果。"}]},{id:"azheng",name:"阿争",handle:"@azheng",bio:"我把草稿整理好了，要继续吗？",status:"忙碌",roleTag:"同事",lastMessage:"我把草稿整理好了，要继续吗？",lastTime:"12分钟前",unread:0,pinned:!1,avatar:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300&q=80",theme:"mist",settings:{model:"gpt-5.4",modelProviderId:"openai",temperature:.45,topP:.8,contextCount:48,thinkBudget:36,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!1,proactiveFrequency:30,memoryEnabled:!0},roomBackground:"点阵",chatTheme:"default",bubbleTheme:"默认主题",topics:[{id:"t4",title:"版本梳理",updatedAt:"今天 23:18",count:12},{id:"t5",title:"说明文档",updatedAt:"昨天",count:8}],messages:[{id:"m4",role:"ai",text:"我把草稿整理好了，要继续吗？",time:"23:18"}]},{id:"xiaoying",name:"小樱",handle:"@sakura",bio:"周末去看展吗？",status:"在线",roleTag:"朋友",lastMessage:"周末去看展吗？",lastTime:"1小时前",unread:1,pinned:!1,avatar:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80",theme:"cream",settings:{model:"gpt-5.4",modelProviderId:"openai",temperature:.66,topP:.95,contextCount:32,thinkBudget:24,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!0,proactiveFrequency:20,memoryEnabled:!1},roomBackground:"点阵",chatTheme:"default",bubbleTheme:"默认主题",topics:[{id:"t6",title:"周末计划",updatedAt:"今天",count:6}],messages:[{id:"m5",role:"ai",text:"周末去看展吗？我知道有个新的展。",time:"20:22"}]}],ba=[{id:"p0",contactId:"me",time:"23:36",mood:"开心",content:"今天的天空很温柔。",image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80",likes:["我"],comments:[]},{id:"p1",contactId:"ayan",time:"21:20",mood:"主动",content:"你醉了先看这个。",image:"",likes:["我","阿延"],comments:[{author:"我",text:"我收到了"}]},{id:"p2",contactId:"xiaoying",time:"19:08",mood:"经常",content:"晚上跑了三公里。",image:"",likes:[],comments:[]}],To=[],ot=[{id:"health",label:"Health",icon:"health"},{id:"schedule",label:"日程",icon:"calendar"},{id:"weather",label:"天气",icon:"weather"},{id:"files",label:"文件",icon:"file"},{id:"quote",label:"引用",icon:"quote"},{id:"more",label:"更多",icon:"more"}];function Eo(){return{tools:ot.map(e=>({id:e.id,label:e.label,icon:e.icon,prompt:"",enabled:!0}))}}const a={currentTab:"chats",currentView:"list",currentContactId:"",currentSettingsTab:"basic",cotLogMode:"long",activityLogEntries:[],activityLogLoading:!1,activityLogLoadedAt:"",quoteMomentId:null,quoteMessageId:null,momentComposerOpen:!1,momentComposerText:"",momentComposerImage:"",momentComposerImageName:"",momentComposerEditingId:"",momentsActorType:"user",commentSheetMomentId:null,activeMenuMomentId:null,activeBubbleToolsId:null,suppressBubbleToggle:!1,toast:"",topicConfirmOpen:!1,rpRooms:[],currentRpRoomId:"",currentRpMessages:[],conversations:{},rpMessages:{},rpRoomDialogOpen:!1,rpRoomDialogMode:"create",rpRoomForm:{name:"",world_setting:"",user_role:"",ai_role:""},rpBackView:"list",contacts:[],moments:structuredClone(To),actions:structuredClone(ot),globalSettings:{theme:"奶油粉",notifications:!0,momentsNotify:!0,autoScroll:!0,defaultModel:"gpt-5.4",provider:"OpenAI",searchService:"默认搜索",voiceService:"未连接",mcpEnabled:!0,exportFormat:"json"},accountProfile:{avatar:"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80",nickname:"小酒",signature:"管理个人资料与基础偏好"},newContactAvatar:"",newContactDraft:{name:"",agentId:"",bio:"",avatar:""},avatarCropper:null,showAttach:!1,contactQuickActionEditorId:"",contactQuickMcpMenuOpen:!1,quickActionSwipeOpenId:"",quickActionDragId:"",quickActionSuppressClickUntil:0,quickActionDropHintId:"",quickActionReorderPulseId:"",quickActionDropDirection:"",contactModelAdvancedOpen:!1,companionState:{recent_topics:[],current_mood:"",open_loops:[],proactive_cooldown_until:null,impression:null,relationship_progress:null,likes_summary:null,summary_updated_at:null,updated_at:""},openThinkingIds:{},streamingAbortController:null,animatedMsgIds:{},assistantPlayback:{token:"",timer:null},rpCurtainRunning:!1},ve=new Map,S=()=>document.getElementById("chat-app-root"),g=e=>a.contacts.find(t=>t.id===e),je=e=>a.moments.find(t=>t.id===e),l=(e="")=>String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),nt=[{key:"default",name:"默认主题",desc:"干净柔和的默认聊天界面",roomTheme:"rose",aliases:["默认玫瑰","默认"]},{key:"pink",name:"蜜桃粉",desc:"更甜一点的粉色聊天氛围",roomTheme:"rose",aliases:["奶茶"]},{key:"dark",name:"夜色",desc:"低亮度深色聊天界面",roomTheme:"rose",aliases:[]},{key:"glass",name:"玻璃雾",desc:"通透轻雾感的玻璃界面",roomTheme:"mist",aliases:["晴空"]}];function _t(e){const t=String(e||"").trim();return t&&nt.find(n=>n.key===t||n.name===t||n.aliases.includes(t))?.key||"default"}function ha(e){const t=_t(e);return nt.find(o=>o.key===t)||nt[0]}function Mt(e){return _t(e?.chatTheme||e?.bubbleTheme)}function Ct(e){return ha(e).name}const va=1500,xt=8e3;function ya(e){return e?e.replace(/<tool_call>[\s\S]*?<\/tool_call>/g,"").replace(/<tool_call>[\s\S]*$/,"").replace(/<\/?(thead|tbody|tr|td|th|table|tool|function|call)[^>]*>/gi,"").replace(/<[^>\n]{1,80}>/g,"").replace(/\n{3,}/g,`

`).trim():""}function ye(e){return e==null?"":typeof e=="string"?e:typeof e=="number"||typeof e=="boolean"?String(e):""}function At(e,t="",o=""){const n=ya(ye(e));if(!n)return"";const r=n.replace(/\s+/g," ").trim(),i=ye(t).replace(/\s+/g," ").trim(),s=ye(o).replace(/\s+/g," ").trim();return!r||i&&(r===i||i.includes(r)&&r.length>=8)||s&&(s.includes(r)||s.slice(Math.max(0,s.length-r.length-12)).includes(r))?"":n}function Tt(e="",t=""){const o=ye(e),n=ye(t);return n?o?/[\s\n]$/.test(o)||/^[\s\n，。！？、；：,.!?;:）】》]/.test(n)?o+n:/[\x00-\x7F]$/.test(o)||/^[\x00-\x7F]/.test(n)?`${o} ${n}`:o+n:n:o}function wa(){return new Promise(e=>requestAnimationFrame(e))}function Et(e){const t=ya(e);return t?t.length<=va?t:`（已截断，共 ${t.length} 字）
${t.slice(-va)}`:""}const Po='<svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',qo='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',Do='<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',Lo='<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',Oo='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';function Ro(e){const t=String(e||"").toLowerCase();return/time|clock|date/.test(t)?qo:/view|read|file|diary|memory|search/.test(t)?Do:Po}function Vo(e){const t=!!e.streaming,o=t?"tl-active":"tl-done",n=t?Et(e.thinking):e.thinking||"",i=(n||"").replace(/\s+/g," ").trim()||"思考中…",s=i.length>36?i.slice(0,36)+"…":i;return`
        <div class="thinking-line ${o}" id="tl-line-${e.id}" data-action="toggle-thinking-line" data-id="${e.id}">
          <div class="thinking-dot"></div>
          <div class="thinking-text-wrap">
            <span class="thinking-text" id="tl-text-${e.id}">${l(s)}</span>
            <div class="thinking-heart">${Lo}</div>
            <div class="thinking-fade"></div>
          </div>
          <div class="thinking-expand">${Oo}</div>
        </div>
        <div class="thinking-full" id="tl-full-${e.id}">
          <div class="thinking-full-inner" id="thinking-${e.id}">${l(n)}</div>
        </div>`}function Bo(e=[]){return e.length?`<div class="tool-lines-wrap">${e.map(o=>{const n=o.status==="running"?"tl-active":"tl-done",r=`${o.name} → ${o.status==="running"?"调用中…":"完成"}`;return`
          <div class="tool-line ${n}">
            <div class="tool-dot"></div>
            <div class="tool-icon">${Ro(o.name)}</div>
            <span class="tool-text">${l(r)}</span>
          </div>`}).join("")}</div>`:""}const Sa=e=>new Promise(t=>window.setTimeout(t,e));function $a(e){const t=String(e||"").replace(/\r\n/g,`
`).trim();if(!t)return[];const n=t.replace(/[ \t]+\n/g,`
`).replace(/\n{3,}/g,`

`).split(/\n{2,}/).map(c=>String(c||"").trim()).filter(Boolean),r=[],i=c=>{const d=String(c||"").trim();if(d){if(r.length&&d.length<=4){r[r.length-1]+=d;return}r.push(d)}},s=c=>{const d=String(c||"").split(new RegExp("(?<=[。！？!?…])\\s*","u")).map(m=>m.trim()).filter(Boolean);if(d.length<=1){i(c);return}let p="";d.forEach(m=>{const b=p?`${p}${m}`:m;p&&b.length>90?(i(p),p=m):p=b}),i(p)};return n.forEach(c=>{c.length<=110?i(c):s(c)}),r.filter(Boolean)}function zo(e){const t=String(e||"").trim().length;return t<=10?300+Math.floor(Math.random()*201):t<=24?600+Math.floor(Math.random()*301):900+Math.floor(Math.random()*301)}function qe(){a.assistantPlayback.token="",a.assistantPlayback.timer&&(window.clearTimeout(a.assistantPlayback.timer),a.assistantPlayback.timer=null)}async function ka(e,t,o={}){const n=Array.isArray(t)?t.filter(s=>String(s||"").trim()):[];if(!e||!n.length)return;qe();const r=`reply_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;a.assistantPlayback.token=r;const i=Number.isInteger(o.startIndex)?o.startIndex:e.messages.length;for(let s=0;s<n.length;s+=1){if(a.assistantPlayback.token!==r)return;const c={id:`ai_chunk_${Date.now()}_${s}_${Math.random().toString(36).slice(2,6)}`,role:"ai",text:n[s],content:n[s],time:P(),created_at:new Date().toISOString()};if(s===0&&(o.thinking&&(c.thinking=o.thinking),o.toolCalls&&(c.toolCalls=o.toolCalls)),s===0&&o.replaceId){const d=e.messages.findIndex(p=>p.id===o.replaceId);d!==-1?e.messages[d]=c:e.messages.splice(Math.min(i,e.messages.length),0,c)}else{const d=Math.min(i+s,e.messages.length);e.messages.splice(d,0,c)}if(e.lastMessage=c.text,e.lastTime=c.time,u(),B(),s>=n.length-1)break;await new Promise(d=>{a.assistantPlayback.timer=window.setTimeout(d,zo(n[s]))}),a.assistantPlayback.timer=null}a.assistantPlayback.token===r&&(a.assistantPlayback.token="",a.assistantPlayback.timer=null),$(120)}function De(e){const t=e&&typeof e=="object"?e:{},o=r=>Array.isArray(r)?r.map(i=>String(i||"").trim()).filter(Boolean):[],n=r=>r!=null&&String(r).trim()?String(r).trim():null;return{recent_topics:o(t.recent_topics),current_mood:String(t.current_mood||"").trim(),open_loops:o(t.open_loops),proactive_cooldown_until:t.proactive_cooldown_until?String(t.proactive_cooldown_until):null,impression:n(t.impression),relationshipProgress:n(t.relationship_progress??t.relationshipProgress),likesSummary:n(t.likes_summary??t.likesSummary),summaryUpdatedAt:n(t.summary_updated_at??t.summaryUpdatedAt),updated_at:String(t.updated_at||"").trim()}}function No(){const e=De(a.companionState);return e.current_mood?`情绪：${e.current_mood}`:e.open_loops[0]?`进行中：${e.open_loops[0]}`:e.recent_topics[0]?`最近话题：${e.recent_topics[0]}`:"暂无状态"}function we(){if(a.momentsActorType==="agent"){const e=H();return{author_type:"agent",author_id:e?.id||a.currentContactId||"default",author_name:e?.name||"当前角色",avatar:e?.avatar||""}}return{author_type:"user",author_id:"me",author_name:a.accountProfile?.nickname||"我",avatar:a.accountProfile?.avatar||"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80"}}function E(e={}){const t=Array.isArray(e.likes)?e.likes:[],o=Array.isArray(e.comments)?e.comments:[],n=String(e.author_type||(e.contactId==="me"?"user":"agent")),r=String(e.author_id||(n==="user"?"me":e.contactId||"default"));return{id:String(e.id||`p${Date.now()}`),author_type:n,author_id:r,content:String(e.content||""),image:String(e.image||""),mood:String(e.mood||""),time:String(e.time||""),created_at:String(e.created_at||""),updated_at:String(e.updated_at||""),likes:t.map(i=>typeof i=="string"?{author_type:"user",author_id:i==="我"?"me":i,author_name:i}:{author_type:String(i?.author_type||"user"),author_id:String(i?.author_id||"me"),author_name:String(i?.author_name||"")}),comments:o.map(i=>({author_type:String(i?.author_type||"user"),author_id:String(i?.author_id||"me"),author_name:String(i?.author_name||i?.author||""),text:String(i?.text||"")}))}}function Ia(e){const t=E(e);if(t.author_type==="agent"){const o=g(t.author_id);return{name:o?.name||t.author_id||"角色",avatar:o?.avatar||""}}return{name:a.accountProfile?.nickname||"我",avatar:a.accountProfile?.avatar||"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80"}}function _a(e){const t=E(e);return t.author_type==="user"?t.author_id==="me":t.author_id===(a.currentContactId||H()?.id||"default")}function Ma(e=[]){return e.map(t=>t.author_name||(t.author_type==="user"?"我":g(t.author_id)?.name||t.author_id)).join("、")}function Ho(e,t,o){const n=g(a.currentContactId);n&&(n[e]=t,a.toast=o,u(),$(120),window.setTimeout(()=>{a.toast="",u()},1200))}function jo(e){const t=String(e).toLowerCase();return["health","heart"].includes(t)?"health":["calendar","schedule","date"].includes(t)?"calendar":["weather","cloud"].includes(t)?"weather":["file","files","doc","document"].includes(t)?"file":["quote","reply"].includes(t)?"quote":(["more","tool","tools"].includes(t),"more")}const Pt={get_current_time:"时间",get_weather:"天气",get_health_summary:"健康",web_search:"搜索",fetch_url:"网页",add_todo:"待办",list_todos:"待办列表",complete_todo:"完成待办",add_note:"便签",list_notes:"便签列表"},Ca=new Set(["get_current_time","get_weather","get_health_summary","web_search","fetch_url","add_todo","list_todos","complete_todo","add_note","list_notes"]);function Se(e){return Ca.has(String(e||"").trim())}function le(e,t){if(typeof e=="string"){const i=String(e||`mcp_${t}`);return{id:i,label:Pt[i]||e||`工具${t+1}`,icon:"more",prompt:"",mcpToolId:Se(i)?i:"",enabled:!0}}const o=e?.id||e?.toolId||e?.name||`mcp_${t}`,n=String(o),r=Pt[n]||e?.label||e?.name||e?.title||`工具${t+1}`;return{id:n,label:String(r),icon:jo(e?.icon||e?.type||e?.category||"more"),prompt:String(e?.prompt||e?.message||""),mcpToolId:String(e?.mcpToolId||e?.toolId||(Se(n)?n:"")),enabled:e?.enabled!==!1}}function xa(){const t=R()?.mcpLibrary?.tools;if(!Array.isArray(t)||!t.length)return ot;const o=t.map(le).filter(n=>Se(n.id)).filter(n=>n.enabled!==!1);return o.length?o:ot}function H(){return g(a.currentContactId)||a.contacts[0]}function $e(e){return e?.settings?(!Array.isArray(e.settings.quickActions)||!e.settings.quickActions.length?e.settings.quickActions=xa().map((t,o)=>({...le(t,o)})):e.settings.quickActions=e.settings.quickActions.map((t,o)=>le(t,o)),e.settings.quickActions):[]}function qt(e=H()){const t=$e(e).filter(o=>o.enabled!==!1);return t.length?t:xa()}function f(e){const t='viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"',o={back:`<svg ${t}><path d="M15 18l-6-6 6-6"/></svg>`,plus:`<svg ${t}><path d="M12 5v14M5 12h14"/></svg>`,search:`<svg ${t}><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg>`,history:`<svg ${t}><path d="M3 12a9 9 0 101.9-5.6"/><path d="M3 4v4h4"/><path d="M12 7v5l3 2"/></svg>`,settings:`<svg ${t}><path d="M12 3v3M12 18v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M3 12h3M18 12h3M4.9 19.1L7 17M17 7l2.1-2.1"/><circle cx="12" cy="12" r="3.3"/></svg>`,more:`<svg ${t}><circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>`,heart:`<svg ${t}><path d="M12 20.5s-7-4.4-7-10a4 4 0 017-2.5A4 4 0 0119 10.5c0 5.6-7 10-7 10z"/></svg>`,heartFilled:'<svg viewBox="0 0 24 24" fill="#B595C9" stroke="none" stroke-width="0"><path d="M12 20.5s-7-4.4-7-10a4 4 0 017-2.5A4 4 0 0119 10.5c0 5.6-7 10-7 10z"/></svg>',comment:`<svg ${t}><path d="M7 18l-3 2 1-3.8A7.8 7.8 0 014.2 13 7.8 7.8 0 1112 20a8 8 0 01-5-2z"/><path d="M8.5 10.5h7M8.5 13.5h4.5"/></svg>`,chatArrow:`<svg ${t}><path d="M4.8 18.2l.9-3.3A7.5 7.5 0 014.5 11 7.5 7.5 0 1112 18.5a7.4 7.4 0 01-3.6-.9z"/><path d="M10 9l4 3-4 3"/><path d="M14 12H8"/></svg>`,send:`<svg ${t}><path d="M21 3L10 14"/><path d="M21 3l-7 18-4-7-7-4z"/></svg>`,close:`<svg ${t}><path d="M18 6L6 18M6 6l12 12"/></svg>`,camera:`<svg ${t}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,attach:`<svg ${t}><path d="M21 11.5l-8.7 8.7a5 5 0 01-7.1-7.1l9.2-9.2a3.5 3.5 0 015 5L9 19.3a2 2 0 01-2.8-2.8l8.5-8.5"/></svg>`,quote:`<svg ${t}><path d="M9 7H5v5h4v5H4v-5c0-2.8 1.8-5 5-5zM20 7h-4v5h4v5h-5v-5c0-2.8 1.8-5 5-5z"/></svg>`,reroll:`<svg ${t}><path d="M20 11a8 8 0 10-2.3 5.7"/><path d="M20 4v7h-7"/></svg>`,cot:`<svg ${t}><path d="M12 4v16M4 12h16"/><path d="M7.5 7.5l9 9M16.5 7.5l-9 9" opacity="0.18"/></svg>`,bubbleHeart:`<svg ${t}><path d="M12 19.3s-5.8-3.5-5.8-8a3.7 3.7 0 016.1-2.8 3.7 3.7 0 015.9 2.8c0 4.5-5.6 8-5.6 8z"/></svg>`,weather:`<svg ${t}><path d="M6 16a4 4 0 010-8 5.5 5.5 0 0110.4-1.8A4 4 0 1118 16H6z"/></svg>`,calendar:`<svg ${t}><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>`,file:`<svg ${t}><path d="M8 3h6l5 5v11a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z"/><path d="M14 3v5h5"/></svg>`,health:`<svg ${t}><path d="M12 20s-6.5-4-6.5-9.2A4.3 4.3 0 0112 7a4.3 4.3 0 016.5 3.8C18.5 16 12 20 12 20z"/><path d="M9.2 12h1.8l1-2.1 1.2 4 1-1.9h1.6"/></svg>`,toggleOff:'<svg viewBox="0 0 52 32" fill="none"><rect x="1.5" y="1.5" width="49" height="29" rx="14.5" fill="rgba(255,255,255,.7)" stroke="rgba(150,122,133,.14)"/><circle cx="16" cy="16" r="11" fill="#fff"/></svg>',toggleOn:'<svg viewBox="0 0 52 32" fill="none"><rect x="1.5" y="1.5" width="49" height="29" rx="14.5" fill="#e9d7ff" stroke="rgba(120,90,150,.14)"/><circle cx="36" cy="16" r="11" fill="#fff"/></svg>',chevron:`<svg ${t}><path d="M9 6l6 6-6 6"/></svg>`,tabChat:`<svg ${t}><path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 2 .6 3.9 1.6 5.4L2 22l4.8-1.3A9.9 9.9 0 0012 22c5.5 0 10-4.5 10-10z"></path></svg>`,tabMoments:`<svg ${t}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,tabSettings:`<svg ${t}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,actionDots:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>',pencil:`<svg ${t}><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`,trash:`<svg ${t}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,stop:'<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="7" y="7" width="10" height="10" rx="2"/></svg>'};return o[e]||o.more}function Aa(){u()}function Dt(e){const t=()=>{const o=S()?.querySelector(".chat-app-body");o&&(o.scrollTop=e)};requestAnimationFrame(()=>{t(),requestAnimationFrame(t),window.setTimeout(t,0)})}function Ta(){const e=S()?.querySelector(".chat-app-body"),t=e?e.scrollTop:0,o=window.scrollY||window.pageYOffset||0;u(),Dt(t),requestAnimationFrame(()=>{window.scrollTo(0,o),requestAnimationFrame(()=>window.scrollTo(0,o))})}function Y(){if(a.currentView==="moments"){Ta();return}u()}function Fo(e,t){a.moments=a.moments.map(o=>{const n=E(o);if(n.id!==e)return o;const i=n.likes.some(s=>s.author_type===t.author_type&&s.author_id===t.author_id)?n.likes.filter(s=>!(s.author_type===t.author_type&&s.author_id===t.author_id)):[{author_type:t.author_type,author_id:t.author_id,author_name:t.author_name},...n.likes];return{...n,likes:i}})}function Uo(e,t,o){a.moments=a.moments.map(n=>{const r=E(n);return r.id!==e?n:{...r,comments:[{author_type:t.author_type,author_id:t.author_id,author_name:t.author_name,text:o},...r.comments]}})}function Ea(e,t){e&&(e.classList.toggle("on",!!t),e.classList.toggle("off",!t),e.setAttribute("aria-pressed",t?"true":"false"),e.innerHTML=lt(t),e.classList.remove("switch-animating"),e.offsetWidth,e.classList.add("switch-animating"),clearTimeout(e.__switchAnimTimer),e.__switchAnimTimer=setTimeout(()=>e.classList.remove("switch-animating"),260))}function u(){const e=S();if(!e)return;Pa(),["room","rpRoom"].includes(a.currentView)||(a.showAttach=!1),a.currentView!=="moments"&&(a.momentComposerOpen=!1);const t=e.querySelector(".chat-app-body"),o=t?t.scrollTop:0,n=g(a.currentContactId)||a.contacts[0],r=Mt(n);e.dataset.theme=r,e.removeAttribute("data-bound"),e.innerHTML=`
      <div class="chat-shell ${a.currentView==="rpRoom"?"mode-rp rp-theatre-shell":"mode-normal"}" data-theme="${r}">
        ${Lt()}
        <div class="chat-app-body ${["room","rpRoom"].includes(a.currentView)?"room-layout":""} ${rt()?"has-bottom-nav":""}">
          ${Ot()}
        </div>
        ${rt()?Xo():""}
        ${a.toast?hn():""}
        ${a.showAttach?vr():""}
        ${a.momentComposerOpen?gn():""}
        
        ${a.rpRoomDialogOpen?yn():""}
        ${a.avatarCropper?vn():""}
      </div>
    `,Wn(),B(),["room","rpRoom"].includes(a.currentView)||Dt(o),$(),requestAnimationFrame(()=>{S()?.querySelectorAll(".message-row[data-msg-id]").forEach(i=>{const s=i.dataset.msgId;s&&!a.animatedMsgIds[s]&&(a.animatedMsgIds[s]=!0,i.classList.add("msg-fadein"))})})}function Pa(){if(document.getElementById("rp-theatre-style"))return;const e=document.createElement("style");e.id="rp-theatre-style",e.textContent=`
          .chat-shell.mode-rp {
            background:#0e0a12;
            color:rgba(220,210,225,.92);
            position:relative;
            overflow:hidden;
          }
          .chat-shell.mode-rp::before {
            content:'';
            position:absolute;
            inset:0;
            z-index:0;
            background:
              radial-gradient(ellipse at 20% 0%, rgba(88,28,72,.18) 0%, transparent 55%),
              radial-gradient(ellipse at 80% 100%, rgba(38,18,68,.22) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(20,12,28,.95) 0%, #0e0a12 100%);
            pointer-events:none;
          }
          .chat-shell.mode-rp::after {
            content:'';
            position:absolute;
            inset:0;
            z-index:0;
            background:url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='.035'/%3E%3C/svg%3E");
            opacity:.5;
            pointer-events:none;
          }
          .chat-shell.mode-rp > * { position:relative; z-index:1; }
          .rp-header {
            padding:52px 18px 14px;
            display:flex;
            align-items:center;
            gap:12px;
            flex-shrink:0;
            background:rgba(18,12,24,.72);
            border-bottom:1px solid rgba(160,100,180,.12);
            backdrop-filter:blur(28px) saturate(1.1);
          }
          .rp-header .header-back,
          .rp-header .header-action-btn {
            width:36px;
            height:36px;
            border-radius:50%;
            border:none;
            cursor:pointer;
            display:flex;
            align-items:center;
            justify-content:center;
            background:rgba(160,100,180,.1);
            color:rgba(180,150,200,.7);
          }
          .rp-header .header-action-btn {
            width:34px;
            height:34px;
            background:rgba(160,100,180,.08);
            color:rgba(160,130,190,.5);
          }
          .rp-header .header-info { flex:1; min-width:0; }
          .rp-header .header-title {
            color:rgba(210,180,230,.9);
            font-family:'Cormorant Garamond','Zen Maru Gothic','Noto Sans SC',serif;
            font-size:17px;
            font-weight:500;
            letter-spacing:.03em;
          }
          .rp-header .header-subtitle {
            font-size:11px;
            margin-top:1px;
            color:rgba(160,120,180,.45);
            font-style:italic;
          }
          .scene-title-enter {
            animation:sceneFadeIn .6s ease-out both;
          }
          @keyframes sceneFadeIn {
            from { opacity:0; transform:translateY(-8px); }
            to { opacity:1; transform:translateY(0); }
          }
          .rp-room-stage {
            height:100%;
            display:flex;
            flex-direction:column;
            min-height:0;
            background:transparent;
          }
          .world-hint {
            margin:12px 14px 4px;
            padding:10px 14px;
            border-radius:14px;
            font-size:12px;
            display:flex;
            align-items:center;
            gap:8px;
            flex-shrink:0;
            background:rgba(80,40,100,.12);
            border:1px solid rgba(140,80,170,.1);
            backdrop-filter:blur(16px);
            color:rgba(180,150,210,.55);
            font-style:italic;
          }
          .world-hint-icon { font-size:14px; opacity:.6; }
          .messages-area {
            flex:1;
            overflow-y:auto;
            padding:10px 14px 14px;
            display:flex;
            flex-direction:column;
            gap:12px;
            min-height:0;
          }
          .msg-row {
            display:flex;
            gap:8px;
            align-items:flex-start;
          }
          .msg-row.from-user { flex-direction:row-reverse; }
          .msg-avatar {
            width:34px;
            height:34px;
            border-radius:50%;
            object-fit:cover;
            flex-shrink:0;
            border:1px solid rgba(140,80,170,.2);
            box-shadow:0 0 12px rgba(120,60,160,.15);
          }
          .msg-bubble {
            max-width:78%;
            padding:10px 14px;
            border-radius:18px;
            font-size:14px;
            line-height:1.65;
            position:relative;
            transition:all .5s ease;
          }
          .mode-rp .msg-bubble.ai {
            background:rgba(28,18,38,.65);
            border:1px solid rgba(140,80,180,.15);
            border-radius:18px 18px 18px 4px;
            color:rgba(220,210,235,.9);
            box-shadow:0 2px 16px rgba(100,40,140,.08), inset 0 1px 0 rgba(180,140,220,.06);
          }
          .mode-rp .msg-bubble.user {
            background:rgba(60,30,80,.25);
            border:1px solid rgba(160,100,200,.12);
            border-radius:18px 18px 4px 18px;
            color:rgba(210,195,225,.88);
            box-shadow:0 2px 12px rgba(80,30,120,.06);
          }
          .rp-action {
            color:rgba(180,140,210,.6);
            font-style:italic;
            display:block;
            margin:4px 0;
            line-height:1.7;
          }
          .rp-dialogue {
            display:block;
            margin:2px 0;
            color:rgba(230,220,245,.95);
          }
          .rp-composer {
            padding:10px 14px 28px;
            flex-shrink:0;
          }
          .rp-composer .composer-card {
            display:flex;
            align-items:center;
            gap:8px;
            padding:8px 10px 8px 16px;
            border-radius:24px;
            background:rgba(22,14,32,.6);
            border:1px solid rgba(140,80,180,.12);
            backdrop-filter:blur(24px);
            box-shadow:0 4px 20px rgba(80,30,120,.1);
          }
          .rp-composer .chat-input {
            color:rgba(210,200,225,.88);
            font-size:14px;
            padding:6px 0;
          }
          .rp-composer .chat-input::placeholder { color:rgba(140,110,170,.35); }
          .rp-composer .send-round {
            width:38px;
            height:38px;
            background:linear-gradient(135deg, rgba(120,50,160,.35), rgba(80,30,120,.4));
            color:rgba(200,170,230,.8);
            box-shadow:0 0 16px rgba(120,50,160,.15);
          }
          .mode-rp .msg-row { animation:rpMsgIn .35s ease-out both; }
          @keyframes rpMsgIn {
            from { opacity:0; transform:translateY(6px); }
            to { opacity:1; transform:translateY(0); }
          }
          .curtain-transition {
            position:fixed;
            inset:0;
            z-index:9999;
            pointer-events:none;
          }
          .curtain-transition .curtain-left,
          .curtain-transition .curtain-right {
            position:absolute;
            top:0;
            bottom:0;
            width:50%;
            background:linear-gradient(180deg,#1a0e24,#0e0a12);
          }
          .curtain-transition .curtain-left { left:0; transform:translateX(-100%); }
          .curtain-transition .curtain-right { right:0; transform:translateX(100%); }
          .curtain-transition.closing .curtain-left { animation:curtainCloseLeft .4s ease-in-out forwards; }
          .curtain-transition.closing .curtain-right { animation:curtainCloseRight .4s ease-in-out forwards; }
          .curtain-transition.opening .curtain-left { animation:curtainOpenLeft .4s ease-in-out forwards; }
          .curtain-transition.opening .curtain-right { animation:curtainOpenRight .4s ease-in-out forwards; }
          @keyframes curtainCloseLeft { from { transform:translateX(-100%); } to { transform:translateX(0); } }
          @keyframes curtainCloseRight { from { transform:translateX(100%); } to { transform:translateX(0); } }
          @keyframes curtainOpenLeft { from { transform:translateX(0); } to { transform:translateX(-100%); } }
          @keyframes curtainOpenRight { from { transform:translateX(0); } to { transform:translateX(100%); } }
          .chat-shell.mode-normal .message-bubble.from-ai {
            background:rgba(255,248,252,.96);
            border:1px solid rgba(236,195,212,.5);
            border-radius:18px 18px 18px 4px;
            color:rgba(72,56,64,.88);
          }
          .chat-shell.mode-normal .message-bubble.from-user {
            background:linear-gradient(135deg, rgba(200,160,190,.25), rgba(180,140,200,.2));
            border:1px solid rgba(200,160,190,.3);
            border-radius:18px 18px 4px 18px;
            color:rgba(72,56,64,.88);
          }
        `,document.head.appendChild(e)}function Ko(e){if(Pa(),a.rpCurtainRunning)return Promise.resolve(e?.());a.rpCurtainRunning=!0;const t=document.createElement("div");return t.className="curtain-transition closing",t.innerHTML='<div class="curtain-left"></div><div class="curtain-right"></div>',document.body.appendChild(t),new Promise(o=>{window.setTimeout(async()=>{try{await e?.()}finally{t.className="curtain-transition opening",window.setTimeout(()=>{t.remove(),a.rpCurtainRunning=!1,o()},450)}},420)})}function rt(){return["list","moments","settings"].includes(a.currentView)}function Lt(){if(a.currentView==="room")return Qo();if(a.currentView==="rpRoom")return Yo();if(a.currentView==="contactSettings")return ne("联系人设置","back-room",!0);if(a.currentView==="cotLog")return ne("COT 日志","back-contact-settings",!0);if(a.currentView==="rpLobby")return`
        <header class="chat-page-header simple-header">
          <button class="icon-btn text-btn" data-action="back-rp-source" aria-label="返回">${f("back")}</button>
          <div class="chat-page-title">Mirage 夢幻楼</div>
          <button class="icon-btn ghost-circle" data-action="open-rp-room-create" aria-label="新建房间">${f("plus")}</button>
        </header>
      `;if(a.currentView==="companionStateDetail")return ne("当前状态","back-contact-settings",!0);if(a.currentView==="contactImpressionDetail")return ne("关于你的印象","back-contact-settings",!0);if(a.currentView==="contactRelationshipDetail")return ne("关系进展","back-contact-settings",!0);if(a.currentView==="contactLikesDetail")return ne("你喜欢的东西","back-contact-settings",!0);if(a.currentView==="contactRoomBackgroundPicker")return ne("聊天背景","back-contact-settings",!0);if(a.currentView==="contactBubbleThemePicker")return ne("气泡主题","back-contact-settings",!0);if(a.currentView==="profile")return ne("联系人资料","back-room",!0);if(a.currentView==="newContact")return ne("添加联系人","back-home",!0);let e="Murmur";a.currentView==="moments"&&(e="Echo"),a.currentView==="settings"&&(e="Veil");const t=a.currentTab==="chats"&&a.currentView==="list";return`
      <header class="chat-page-header">
        <div class="header-left"></div>
        <div class="chat-page-title" style="font-weight: 800; letter-spacing: 0.02em;">${e}</div>
        ${t?`<button class="icon-btn ghost-circle" data-action="new-contact" aria-label="添加联系人">${f("plus")}</button>`:'<span class="header-spacer"></span>'}
      </header>
    `}function ne(e,t,o=!1){return`
      <header class="chat-page-header simple-header">
        <button class="icon-btn text-btn" data-action="${t}" aria-label="返回">${f("back")}</button>
        <div class="chat-page-title">${l(e)}</div>
        ${o?'<span class="header-spacer"></span>':""}
      </header>
    `}function Qo(){const e=g(a.currentContactId)||a.contacts[0],t=e.settings?.model||a.globalSettings.defaultModel||"gpt-5.4";return`
      <header class="room-hero room-theme-${e.theme}">
        <div class="room-hero-inner">
          <button class="icon-btn icon-circle room-left-btn" data-action="back-list" aria-label="返回列表">${f("back")}</button>
          <div class="room-profile-card" data-action="open-profile">
            <img class="room-profile-avatar" src="${e.avatar}" alt="${l(e.name)}" />
            <div class="room-profile-meta">
              <div class="room-profile-title-line">
                <strong class="room-profile-name">${l(e.name)}</strong>
                <span class="room-profile-model">${l(t)}</span>
              </div>
              <div class="room-profile-sub"><span class="online-dot"></span> 在线</div>
            </div>
          </div>
          <div class="room-actions">
            <button class="icon-btn icon-circle" data-action="open-rp-lobby" aria-label="Mirage 夢幻楼">${f("history")}</button>
            <button class="icon-btn icon-circle" data-action="open-contact-settings" aria-label="联系人设置">${f("settings")}</button>
          </div>
        </div>
      </header>
    `}function Yo(){const e=Vt();return`
      <header class="rp-header">
        <button class="header-back" data-action="back-rp-lobby" aria-label="返回">${f("back")}</button>
        <div class="header-info">
          <div class="header-title scene-title-enter">${l(e?.name||"Mirage·幻楼")}</div>
          <div class="header-subtitle">${l(e?.ai_role||"幕间进行中")}</div>
        </div>
        <div class="header-actions">
          <button class="header-action-btn" data-action="rename-rp-room" data-room-id="${l(e?.room_id||"")}" aria-label="编辑">${f("more")}</button>
        </div>
      </header>
    `}function Ot(){return a.currentView==="room"?dn():a.currentView==="rpLobby"?kn():a.currentView==="rpRoom"?wn():a.currentView==="moments"?fn():a.currentView==="settings"?Nt():a.currentView==="contactSettings"?In():a.currentView==="cotLog"?Hn():a.currentView==="companionStateDetail"?_n():a.currentView==="contactImpressionDetail"?Ht("关于你的印象","impression",a.companionState.impression):a.currentView==="contactRelationshipDetail"?Ht("关系进展","relationshipProgress",a.companionState.relationshipProgress):a.currentView==="contactLikesDetail"?Ht("你喜欢的东西","likesSummary",a.companionState.likesSummary):a.currentView==="contactRoomBackgroundPicker"?Mn():a.currentView==="contactBubbleThemePicker"?Cn():a.currentView==="profile"?An():a.currentView==="newContact"?xn():Go()}function Xo(){return`
      <nav class="bottom-tabbar">
        ${Rt("chats","tabChat","繁语")}
        ${Rt("moments","tabMoments","余响")}
        ${Rt("settings","tabSettings","帷幕")}
      </nav>
    `}function Rt(e,t,o){return`
      <button class="nav-tab-btn ${a.currentTab===e?"active":""}" data-action="switch-tab" data-tab="${e}">
        <div class="nav-tab-icon">${f(t)}</div>
        <span class="nav-tab-label">${l(o)}</span>
      </button>
    `}function Go(){const e=[...a.contacts].sort((t,o)=>o.pinned-t.pinned||0);return`
      <section class="list-page page-block transparent-canvas">
        <div class="message-panel-card">
        <div class="chat-list-card">
          <div class="search-wrap">
            <div class="search-pill">
              <span class="search-icon">${f("search")}</span>
              <input type="text" placeholder="搜索聊天记录" class="search-input" />
            </div>
          </div>
          <div class="contact-list-wrap">
            <button type="button" class="chat-list-item" data-action="open-rp-lobby" style="min-height:44px;padding:8px 14px;">
              <div class="chat-list-content" style="min-width:0;">
                <div class="chat-list-head">
                  <strong class="chat-list-name" style="font-size:14px;color:rgba(92,76,84,.72);font-weight:700;">Mirage 夢幻楼</strong>
                </div>
              </div>
            </button>
            ${e.map(Jo).join("")}
          </div>
        </div>
      </section>
        </div>
    `}function Jo(e){const t=String(e.handle||(e.id?`@${e.id}`:"")).trim();return`
      <button type="button" class="chat-list-item" data-action="open-contact" data-contact-id="${e.id}">
        <div class="chat-list-avatar-wrap">
          <img src="${e.avatar}" alt="${l(e.name)}" class="chat-list-avatar" />
          ${e.unread?`<span class="chat-list-badge">${e.unread}</span>`:""}
        </div>
        <div class="chat-list-content">
          <div class="chat-list-head">
            <span class="chat-list-title">
              <strong class="chat-list-name">${l(e.name)}</strong>
              ${t?`<span class="chat-list-handle">${l(t)}</span>`:""}
            </span>
            <time class="chat-list-time">${l(e.lastTime)}</time>
          </div>
          <div class="chat-list-snippet">${l(e.lastMessage)}</div>
        </div>
      </button>
    `}async function Wo(e){const t=String(e?.sessionId||"").trim();if(t)try{if((await fetch(`${y}/api/sessions/${encodeURIComponent(t)}`)).ok)return;e.sessionId="",$(120)}catch(o){console.warn("[session] open-contact validation failed",o)}}function Zo(){a.companionState=De({})}function en(e){const t=String(e||"").trim();if(!t)return;qe?.(),a.streamingAbortController&&a.currentContactId===t&&(a.streamingAbortController.abort(),a.streamingAbortController=null),ve.has(t)&&(clearTimeout(ve.get(t)),ve.delete(t)),a.contacts=a.contacts.filter(r=>r.id!==t),a.activeBubbleToolsId=null,a.quoteMomentId=null,a.quoteMessageId=null,a.contactQuickActionEditorId="",a.quickActionSwipeOpenId="",a.quickActionDragId="",a.quickActionDropHintId="",a.quickActionDropDirection="",a.quickActionReorderPulseId="",a.currentTopicTitle="",a.rpRooms=[],a.currentRpRoomId="",a.currentRpMessages=[];const o=a.contacts[0]||null;(a.currentContactId===t||!g(a.currentContactId))&&(a.currentContactId=o?.id||"",Zo(),a.currentView="list",a.currentTab="chats",a.currentSettingsTab="basic");const n=S()?.querySelector(".chat-input");n&&(n.value="")}async function tn(e){const t=String(e||"").trim();if(!t)return!1;const o=await fetch(`${y}/api/agents/${encodeURIComponent(t)}/safe-delete`,{method:"DELETE"});if(!o.ok){let n=`HTTP ${o.status}`;try{n=(await o.json())?.detail||n}catch{}throw new Error(n)}return!0}function Le(){return a.currentContactId||a.contacts[0]?.id||"default"}function Vt(){return a.rpRooms.find(e=>e.room_id===a.currentRpRoomId)||null}function it(){return{name:"",agentId:"",bio:"",avatar:""}}function ke(e){return String(e||"").trim().replace(/^@+/,"").toLowerCase()}const an=new Set(["zhansi"]),on=new Set(["azheng"]);function Bt(e={}){return[e?.id,e?.agent_id,e?.handle].map(ke).filter(Boolean).some(o=>an.has(o))}function st(e={}){return Bt(e)&&!!e?.settings?.codexEnabled}function zt(e={}){return[e?.id,e?.agent_id,e?.handle].map(ke).filter(Boolean).some(o=>on.has(o))}function ct(e={}){return zt(e)&&!!e?.settings?.ccEnabled}function j(e={}){const t=String(e.id||"").trim()||`c${Date.now()}`,o=Mt(e);return{id:t,agent_id:String(e.agent_id||e.id||t),name:String(e.name||t),display_name:String(e.display_name||e.name||t),bio:String(e.bio||"这是新来的联系人"),status:String(e.status||"在线"),handle:String(e.handle||`@${t}`),roleTag:String(e.roleTag||""),theme:Ra(o),chatTheme:o,bubbleTheme:Ct(o),unread:Number(e.unread||0),pinned:!!e.pinned,lastMessage:String(e.lastMessage||""),lastTime:String(e.lastTime||""),avatar:String(e.avatar||"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80"),topics:Array.isArray(e.topics)?e.topics:[],messages:Array.isArray(e.messages)?e.messages:[],settings:{model:"gpt-5.4",modelProviderId:A("chat")?.providerId||"openai",temperature:.7,topP:.9,contextCount:32,thinkBudget:24,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!1,proactiveFrequency:30,memoryEnabled:!0,codexEnabled:!1,ccEnabled:!1,...e.settings||{}}}}function qa(e){const t=j(e),o=a.contacts.findIndex(n=>String(n.id||"").toLowerCase()===t.id.toLowerCase());return o>=0?a.contacts[o]={...a.contacts[o],...t}:a.contacts.unshift(t),t}async function nn(e){try{const t=await fetch(`${y}/api/agents`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({agent_id:e.id,display_name:e.name,avatar:e.avatar||"",description:e.bio||"",source:"murmur",metadata:{from:"murmur_contact"}})});if(t.ok)return!0;let o="";try{const r=await t.json();o=typeof r?.detail=="string"?r.detail:JSON.stringify(r?.detail||r)}catch{}return t.status===409||/already exists|duplicate|23505/i.test(o)?(fetch(`${y}/api/agents/${encodeURIComponent(e.id)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({display_name:e.name,avatar:e.avatar||"",description:e.bio||"",source:"murmur",is_active:!0})}).catch(()=>{}),!0):!1}catch(t){return console.warn("[agents] register contact failed",t),!1}}function Da(e){return re(e,{fallback:""})}function re(e,{fallback:t="",includeYear:o=!1}={}){if(!e)return t;const n=String(e||"").trim();if(!n)return t;const r=new Date(n);if(Number.isNaN(r.getTime()))return n;const i=new Date,s=r.getFullYear()===i.getFullYear(),c=r.toDateString()===i.toDateString(),d=new Date(i);d.setDate(i.getDate()-1);const p=r.toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",hour12:!1});if(c)return`今天 ${p}`;if(r.toDateString()===d.toDateString())return`昨天 ${p}`;const m=o||!s?{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}:{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1};return r.toLocaleString("zh-CN",m).replace(/\//g,"-")}async function ut(e=Le(),{silent:t=!0}={}){try{const o=await fetch(`${y}/api/rp/rooms?agent_id=${encodeURIComponent(e)}`);if(!o.ok)throw new Error(`HTTP ${o.status}`);const n=await o.json();return a.rpRooms=Array.isArray(n.rooms)?n.rooms:[],t||u(),a.rpRooms}catch(o){return console.warn("[rp] load rooms failed",o),t||(a.toast="RP 鎴块棿鍔犺浇澶辫触",u(),window.setTimeout(()=>{a.toast="",u()},1200)),[]}}async function rn(e,{silent:t=!0}={}){if(!e)return[];try{const o=await fetch(`${y}/api/rp/rooms/${encodeURIComponent(e)}/messages`);if(!o.ok)throw new Error(`HTTP ${o.status}`);const n=await o.json(),r=n.room||a.rpRooms.find(s=>s.room_id===e);if(r){const s=a.rpRooms.findIndex(c=>c.room_id===e);s>=0&&(a.rpRooms[s]=r)}const i=(Array.isArray(n.messages)?n.messages:[]).map(s=>({id:s.id,role:s.role==="assistant"?"ai":s.role,text:s.content||"",content:s.content||"",time:Da(s.timestamp),timestamp:s.timestamp||"",created_at:s.timestamp||""}));return a.currentRpMessages=Be(a.rpMessages?.[e]||[],i).map(Z),a.rpMessages={...a.rpMessages||{},[e]:a.currentRpMessages.map(W)},$(120),t||u(),a.currentRpMessages}catch(o){return console.warn("[rp] load messages failed",o),a.currentRpMessages=(a.rpMessages?.[e]||[]).map(Z),t||(a.toast="RP 娑堟伅鍔犺浇澶辫触",u(),window.setTimeout(()=>{a.toast="",u()},1200)),[]}}async function sn(e=a.currentView==="room"?"room":"list",t=Le()){a.rpBackView=e,a.currentView="rpLobby",a.currentTab="chats",u(),await ut(t,{silent:!1})}async function cn(){const e=S()?.querySelector("#rp-room-name")?.value?.trim()||"",t=S()?.querySelector("#rp-room-world")?.value?.trim()||"",o=S()?.querySelector("#rp-room-user-role")?.value?.trim()||"",n=S()?.querySelector("#rp-room-ai-role")?.value?.trim()||"",r={agent_id:Le(),name:e||"新房间",world_setting:t,user_role:o,ai_role:n},i=a.rpRoomDialogMode==="edit"?a.currentRpRoomId:"",s=i?`${y}/api/rp/rooms/${encodeURIComponent(i)}`:`${y}/api/rp/rooms`,d=await fetch(s,{method:i?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!d.ok)throw new Error(`HTTP ${d.status}`);const m=(await d.json()).room;return a.rpRoomDialogOpen=!1,await ut(Le(),{silent:!0}),m?.room_id&&(a.currentRpRoomId=m.room_id,!i)?(await La(m.room_id),m):(u(),m)}async function La(e){e&&await Ko(async()=>{a.currentRpRoomId=e,a.currentView="rpRoom",a.currentTab="chats",a.showAttach=!1,u(),await rn(e,{silent:!1})})}async function un(e){if(!e||!window.confirm("删除这个 RP 房间？"))return;const o=await fetch(`${y}/api/rp/rooms/${encodeURIComponent(e)}`,{method:"DELETE"});if(!o.ok)throw new Error(`HTTP ${o.status}`);a.rpRooms=a.rpRooms.filter(n=>n.room_id!==e),a.currentRpRoomId===e&&(a.currentRpRoomId="",a.currentRpMessages=[],a.currentView="rpLobby"),u()}function Oa(e){const t=a.contacts.find(o=>o.id===e);t&&(t.unread=0),a.currentContactId=e,a.currentTab="chats",a.currentView="room",a.activeBubbleToolsId=null,u(),t&&Wo(t),t&&Ya(e),ce(e),Ze(e)}function ln(e){const t=l(e?.label||""),o=e?.icon||"more";return`
      <button type="button" class="action-chip glass-frost" data-action="quick-action" data-id="${l(e?.id||"")}">
        <span class="action-chip-icon">${f(o)}</span>
        <span class="action-chip-label">${t}</span>
      </button>
    `}function dn(){const e=g(a.currentContactId)||a.contacts[0],t=a.quoteMomentId?je(a.quoteMomentId):null,o=a.quoteMessageId?e.messages.find(c=>c.id===a.quoteMessageId):null,n=Bt(e),r=st(e),i=zt(e),s=ct(e);return`
      <section class="room-page room-theme-${e.theme}">
        <div class="messages-panel">
          ${e.messages.map(c=>pn(c,e)).join("")}
        </div>
        <div class="composer-zone">
          <div class="action-scroll">${qt(e).map(ln).join("")}</div>
          ${o?Tn(o,e):t?mn(t):""}
          <div class="composer-card">
            <div class="composer-input-wrap">
              <input class="chat-input" placeholder="输入消息..." value="" />
            </div>
            ${n?`<button class="codex-toggle ${r?"active":""}" data-action="toggle-codex-mode" data-contact-id="${l(e.id)}" type="button" aria-pressed="${r}" aria-label="${r?"关闭 Codex":"启用 Codex"}" onclick="window.__yuiToggleCodex?.(this,event)" onpointerdown="window.__yuiToggleCodex?.(this,event)">${r?"Cx ON":"Cx"}</button>`:""}
            ${i?`<button class="codex-toggle cc-toggle ${s?"active":""}" data-action="toggle-cc-mode" data-contact-id="${l(e.id)}" type="button" aria-pressed="${s}" aria-label="${s?"关闭 Claude Code":"启用 Claude Code"}" onclick="window.__yuiToggleCC?.(this,event)" onpointerdown="window.__yuiToggleCC?.(this,event)">${s?"CC ON":"CC"}</button>`:""}
            <button class="icon-btn icon-circle soft-mini" data-action="expand-actions" aria-label="附件">${f("attach")}</button>
            ${a.streamingAbortController?`<button class="icon-btn send-round send-stop-active" data-action="fake-send" aria-label="停止">${f("stop")}</button>`:`<button class="icon-btn send-round" data-action="fake-send" aria-label="发送">${f("send")}</button>`}
          </div>
        </div>
      </section>
    `}function pn(e,t){const o=e.role==="user"?"from-user":"from-ai",n=String(e.source||e.provider||"").toLowerCase()==="codex",r=!!t?.settings?.reasoning_visibility,i=e.role==="ai"?`<img class="bubble-avatar" src="${t.avatar}" alt="${l(t.name)}" />`:"",s=e.role==="ai"&&n?'<span class="message-source-badge codex">Codex</span>':"",c=e.role==="ai"&&r&&e.thinking&&!e.typing?`<button class="bubble-cot-btn" data-action="toggle-thinking" data-id="${e.id}" aria-label="展开独白">${f("bubbleHeart")}</button>`:"",d=e.role==="ai"&&!e.typing&&!e.streaming?`
        <div class="bubble-bottom-tools ${a.activeBubbleToolsId===e.id?"open":""}">
          <button class="bubble-mini-btn" data-action="reroll-msg" data-id="${e.id}" aria-label="重试">${f("reroll")}</button>
          <button class="bubble-mini-btn" data-action="quote-msg" data-id="${e.id}" aria-label="引用">${f("quote")}</button>
        </div>
      `:"",m=e.role==="ai"&&e.streaming&&!e.text?" message-awaiting-text":"",b=r&&e.thinking?Vo(e):"",w=e.toolCalls&&e.toolCalls.length?Bo(e.toolCalls):"",h=`
          <div class="message-bubble-wrap">
            ${e.role==="user"?`<time class="bubble-time">${l(e.time)}</time>`:""}
            <div class="message-bubble ${o}${m}" ${e.role==="ai"?`data-msg-id="${e.id}" data-action="toggle-message-tools" data-id="${e.id}"`:""}>
              ${c}
              ${s}
              ${e.typing||e.streaming&&!e.text?'<div class="typing-dots"><span></span><span></span><span></span></div>':`<div class="message-text">${l(e.text)}</div>`}
            </div>
            ${e.role==="ai"&&!e.typing?`<time class="bubble-time">${l(e.time)}</time>`:""}
          </div>`,I=e.role==="ai"&&(b||w)?`${b}${w}${h}${d}`:`${h}${d}${b}${w}`;return`
      <div class="message-row ${o}" data-msg-id="${e.id}">
        ${i}
        <div class="message-bubble-col">
          ${I}
        </div>
      </div>
    `}function mn(e){const t=g(e.contactId);return`
      <div class="quote-bar glass-frost">
        <span class="quote-mark">${f("quote")}</span>
        <div class="quote-text-wrap">
          <div class="quote-label">引用自 ${l(t?.name||"动态")}</div>
          <div class="quote-text">${l(e.content)}</div>
        </div>
        <button class="icon-btn quote-close" data-action="clear-quote" aria-label="清除引用">${f("more")}</button>
      </div>
    `}function fn(){const e=Array.isArray(a.moments)?a.moments:[];return g(a.currentContactId)||a.contacts[0],`
      <section class="moments-page white-canvas">
        <div class="moments-cover-area">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80" class="moments-cover-img" />
          <div class="moments-cover-gradient"></div>
          <div class="moments-me-info">
            <span class="moments-me-name">我</span>
            <img src="${l(a.accountProfile?.avatar||"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80")}" class="moments-me-avatar" />
          </div>
          <div class="ai-chip-row" style="position:absolute;left:18px;bottom:14px;z-index:2;">
            <button class="ai-chip ${a.momentsActorType==="user"?"active":""}" data-action="set-moments-actor" data-actor-type="user">浠ユ垜</button>
            <button class="ai-chip ${a.momentsActorType==="agent"?"active":""}" data-action="set-moments-actor" data-actor-type="agent">浠?{escapeHtml(currentAgent?.name || '褰撳墠瑙掕壊')}</button>
          </div>
          <button type="button" class="icon-btn cover-camera-btn" data-action="new-moment" aria-label="发朋友圈"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.6c.86 2.2 1.95 3.49 3.52 4.34 1.27.68 2.62 1 4.55 1.11-.68.18-1.14.32-1.76.58-2.68 1.14-4.23 2.84-5.34 5.96-.25.72-.35 1.04-.55 1.93-.18-.76-.28-1.08-.49-1.73-1.09-3.16-2.65-4.89-5.33-6.11-.71-.32-1.22-.49-2-.67 1.99-.12 3.38-.46 4.65-1.17 1.49-.84 2.53-2.1 3.41-4.24Z" fill="currentColor"/></svg></button>
        </div>
        <div class="moments-feed-wrap">
          ${e.map(bn).join("")}
        </div>
      </section>
    `}function gn(){return`
      <div class="moment-composer-overlay" data-action="close-moment-composer"></div>
      <section class="moment-composer-sheet glass-frost">
        <div class="moment-composer-handle"></div>
        <div class="moment-composer-head">
          <strong>${a.momentComposerEditingId?"编辑朋友圈":"发朋友圈"}</strong>
          <button type="button" class="icon-btn ghost-circle moment-composer-close" data-action="close-moment-composer" aria-label="关闭">${f("close")}</button>
        </div>
        <textarea id="moment-content-input" class="ai-textarea new-moment-input" data-action="moment-composer-input" placeholder="这一刻想分享什么？">${l(a.momentComposerText||"")}</textarea>
        ${a.momentComposerImage?`
          <div class="moment-composer-preview">
            <img src="${a.momentComposerImage}" alt="预览" class="moment-composer-preview-image" />
            <div class="moment-composer-preview-meta">
              <span>${l(a.momentComposerImageName||"已添加图片")}</span>
              <button type="button" class="ghost-action moment-remove-image" data-action="remove-moment-image">移除</button>
            </div>
          </div>
        `:""}
        <div class="moment-composer-actions">
          <label class="btn-composer-upload" for="moment-image-input">${f("camera")}添加图片</label>
          <input id="moment-image-input" class="moment-image-input" type="file" accept="image/*" />
          <button type="button" class="btn-composer-submit" data-action="publish-moment">${a.momentComposerEditingId?"保存":"发布"}</button>
        </div>
      </section>
    `}function bn(e){const t=E(e),o=Ia(t),n=_a(t),r=we(),i=t.likes.some(s=>s.author_type===r.author_type&&s.author_id===r.author_id);return`
      <article class="moment-row">
        <img src="${o.avatar}" alt="${l(o.name)}" class="moment-avatar" />
        <div class="moment-content-col">
          <div class="moment-author-name">${l(o.name)}</div>
          <div class="moment-text-body">${l(t.content)}</div>
          ${t.image?`<img src="${t.image}" alt="${l(t.mood||"moment")}" class="moment-inline-image" />`:""}
          
          <div class="moment-footer">
            <time class="moment-time">${l(re(t.created_at||t.updated_at||t.time,{fallback:t.time||""}))}</time>
            <div class="moment-actions-group">
              <button type="button" class="icon-btn tiny-icon align-center" data-action="like-moment" data-moment-id="${t.id}">${f(i?"heartFilled":"heart")}</button>
              <button type="button" class="icon-btn tiny-icon align-center" data-action="open-comments" data-moment-id="${t.id}">${f("comment")}</button>
              ${n?`
                <div class="moment-action-menu-wrap">
                  <button type="button" class="icon-btn tiny-icon" data-action="toggle-moment-menu" data-moment-id="${t.id}">${f("actionDots")}</button>
                  ${a.activeMenuMomentId===t.id?`
                    <div class="moment-menu-horizontal slide-fade-in liquid-glass">
                      <button type="button" class="icon-btn tiny-icon" data-action="edit-moment" data-moment-id="${t.id}">${f("pencil")}</button>
                      <button type="button" class="icon-btn tiny-icon" data-action="delete-moment" data-moment-id="${t.id}">${f("trash")}</button>
                    </div>
                  `:""}
                </div>
              `:`
                <button type="button" class="icon-btn tiny-icon" data-action="go-chat-with-quote" data-contact-id="${t.author_id}" data-moment-id="${t.id}">${f("quote")}</button>
              `}
            </div>
          </div>
          
          ${t.likes.length>0||t.comments.length>0?`
            <div class="moment-interactions" data-moment-id-panel="${t.id}">
              ${t.likes.length>0?`
                <div class="moment-likes-area">
                  <span class="heart-mini">${f("heartFilled")}</span> <span class="likes-list">${l(Ma(t.likes))}</span>
                </div>
              `:""}
              ${t.comments.length>0?`
                <div class="moment-comments-area">
                  ${t.comments.map(s=>`<div class="moment-comment-line"><span class="comment-author">${l(s.author_name||s.author||"")}</span>: <span class="comment-text">${l(s.text)}</span></div>`).join("")}
                </div>
              `:""}
            </div>
          `:""}
          
          <div class="moment-inline-comment ${a.commentSheetMomentId===e.id?"open":""}">
            <input class="moment-comment-input" data-comment-input="${e.id}" placeholder="写下你的评论" />
            <button type="button" class="icon-btn send-round mini-send" data-action="submit-comment" data-moment-id="${e.id}">${f("send")}</button>
          </div>
        </div>
      </article>
    `}function hn(){return`<div class="app-toast glass-frost">${l(a.toast)}</div>`}function vn(){const e=a.avatarCropper||{},t=J(e.x),o=J(e.y),n=Fe(e.zoom);return`
      <div class="avatar-cropper-overlay" data-action="cancel-avatar-cropper">
        <section class="avatar-cropper-card glass-frost" data-action="noop" role="dialog" aria-modal="true" aria-label="调整头像">
          <div class="avatar-cropper-head">
            <div>
              <strong>调整头像</strong>
              <span>拖动图片，圆框里是什么就保存什么。</span>
            </div>
            <button class="icon-btn icon-circle" data-action="cancel-avatar-cropper" aria-label="关闭">${f("close")}</button>
          </div>
          <div class="avatar-cropper-body">
            <div class="avatar-cropper-viewport" data-action="drag-avatar-cropper">
              <img
                class="avatar-cropper-image"
                src="${l(e.src||"")}"
                alt="头像预览"
                draggable="false"
                style="object-position:${t}% ${o}%; transform:scale(${n});"
              />
            </div>
            <div class="avatar-cropper-controls">
              <label><span>左右</span><input type="range" min="0" max="100" step="1" value="${t}" data-action="avatar-cropper-range" data-key="x" /></label>
              <label><span>上下</span><input type="range" min="0" max="100" step="1" value="${o}" data-action="avatar-cropper-range" data-key="y" /></label>
              <label><span>缩放</span><input type="range" min="1" max="2.4" step="0.01" value="${n}" data-action="avatar-cropper-range" data-key="zoom" /></label>
            </div>
          </div>
          <div class="avatar-cropper-actions">
            <button class="ghost-action" data-action="cancel-avatar-cropper">取消</button>
            <button class="bottom-tab active" data-action="apply-avatar-cropper">保存头像</button>
          </div>
        </section>
      </div>
    `}function yn(){const e=a.rpRoomDialogMode==="edit",t=a.rpRoomForm||{};return`
      <div class="topic-confirm-overlay" data-action="close-rp-room-dialog">
        <section class="topic-confirm-card glass-frost rp-room-dialog-card" data-rp-room-dialog="card" role="dialog" aria-modal="true" aria-label="${e?"编辑房间":"新建房间"}">
          <h4>幕间</h4>
          <div class="rp-room-dialog-fields">
              <input id="rp-room-name" class="ai-input" placeholder="剧本" value="${l(t.name||"")}" />
              <textarea id="rp-room-world" class="ai-textarea persona-textarea" rows="3" placeholder="世界观">${l(t.world_setting||"")}</textarea>
              <input id="rp-room-user-role" class="ai-input" placeholder="你的角色" value="${l(t.user_role||"")}" />
              <input id="rp-room-ai-role" class="ai-input" placeholder="AI 角色" value="${l(t.ai_role||"")}" />
          </div>
          <div class="topic-confirm-actions rp-room-dialog-actions">
            <button class="ghost-action rp-room-dialog-btn" type="button" data-action="close-rp-room-dialog">取消</button>
            <button class="bottom-tab active rp-room-dialog-btn" type="button" data-action="save-rp-room">入梦</button>
          </div>
        </section>
      </div>
    `}function wn(){const e=g(a.currentContactId)||a.contacts[0],t=Vt(),o=t?`${t.world_setting||"未设定"} · 你：${t.user_role||"未设定"} · TA：${t.ai_role||"未设定"}`:"房间设定载入中";return`
      <section class="rp-room-stage">
        <div class="world-hint">
            <span class="world-hint-icon">✦</span>
            <span>${l(o)}</span>
        </div>
        <div class="messages-area">
          ${a.currentRpMessages.map(n=>Sn(n,e)).join("")}
        </div>
        <div class="rp-composer">
          <div class="composer-card">
            <div class="composer-input-wrap">
              <input class="chat-input" placeholder="输入剧情..." value="" />
            </div>
            ${a.streamingAbortController?`<button class="icon-btn send-round send-stop-active" data-action="fake-send" aria-label="停止">${f("stop")}</button>`:`<button class="icon-btn send-round" data-action="fake-send" aria-label="发送">${f("send")}</button>`}
          </div>
        </div>
      </section>
    `}function Sn(e,t){const o=e.role==="user",n=o&&a.accountProfile?.avatar||t.avatar;return`
      <div class="msg-row ${o?"from-user":""}" data-msg-id="${l(e.id||"")}">
        <img class="msg-avatar" src="${l(n)}" alt="${l(o?a.accountProfile?.nickname||"我":t.name)}">
        <div class="msg-bubble ${o?"user":"ai"}">
          ${e.typing||e.streaming&&!e.text?'<div class="typing-dots"><span></span><span></span><span></span></div>':$n(e.text||"")}
        </div>
      </div>
    `}function $n(e){const t=String(e||"");return t.trim()?t.split(/(\[[\s\S]*?\]|［[\s\S]*?］)/g).filter(Boolean).map(n=>`<span class="${/^\s*(\[|［)/.test(n)?"rp-action":"rp-dialogue"}">${l(n)}</span>`).join(""):""}function kn(){return`
      <section class="topics-page page-block">
        <div class="settings-group glass-frost ai-panel topic-history-group">
          ${a.rpRooms.length?a.rpRooms.map(e=>`
            <div class="topic-row" style="align-items:center;min-height:54px;padding:10px 0;">
              <button type="button" class="topic-copy" data-action="open-rp-room" data-room-id="${l(e.room_id)}" style="background:none;border:none;padding:0;text-align:left;flex:1;cursor:pointer;min-width:0;">
                <strong style="font-size:14px;color:rgba(92,76,84,.78);font-weight:700;">${l(e.name||"未命名")}</strong>
                <p style="font-size:11px;color:rgba(120,100,110,.55);">${l(Da(e.last_active_at)||"刚创建")}</p>
              </button>
              <div style="display:flex;gap:6px;align-items:center;flex-shrink:0;position:relative;z-index:2;">
                <button type="button" class="icon-btn soft-mini" data-action="rename-rp-room" data-room-id="${l(e.room_id)}" aria-label="重命名" style="width:34px;height:34px;"><span style="display:inline-flex;transform:scale(.7);">${f("pencil")}</span></button>
                <button type="button" class="icon-btn soft-mini" data-action="delete-rp-room" data-room-id="${l(e.room_id)}" aria-label="删除" style="width:34px;height:34px;"><span style="display:inline-flex;transform:scale(.7);">${f("trash")}</span></button>
                <button type="button" class="icon-btn soft-mini" data-action="open-rp-room" data-room-id="${l(e.room_id)}" aria-label="进入" style="width:34px;height:34px;"><span style="display:inline-flex;transform:scale(.7);">${f("chevron")}</span></button>
              </div>
            </div>
          `).join(""):'<div class="topic-row"><div class="topic-copy"><strong style="font-size:14px;color:rgba(92,76,84,.78);font-weight:700;">还没有房间</strong><p style="font-size:11px;color:rgba(120,100,110,.55);">点右上角加号，开一个幕间。</p></div></div>'}
        </div>
      </section>
    `}function Nt(){const e=a.globalSettings;return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel">
          <button class="profile-settings-row" data-action="open-account-settings">
            <img class="profile-settings-avatar" src="${l(a.accountProfile.avatar||"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80")}" alt="me" />
            <div>
              <strong>我的账号</strong>
              <p style="font-size:12px; color:rgba(120,100,110,0.7);">管理个人资料与基础偏好</p>
            </div>
            <span class="row-chevron" style="margin-left:auto">${f("chevron")}</span>
          </button>
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>通用设置</h3>
          ${C("主题模式",e.theme,"open-theme-settings")}
          ${ie("消息通知","控制应用消息提醒",e.notifications,"toggle-global","notifications")}
          ${ie("朋友圈提醒","控制动态更新提醒",e.momentsNotify,"toggle-global","momentsNotify")}
          ${ie("自动滚动","新消息到达时自动滚动到底部",e.autoScroll,"toggle-global","autoScroll")}
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>聊天与 AI</h3>
          ${ie("主动发送消息","允许 AI 在合适时机主动开启对话",e.proactiveGlobal||!1,"toggle-global","proactiveGlobal")}
          ${ie("意识循环开关","控制后台意识循环能力",e.consciousnessLoop||!1,"toggle-global","consciousnessLoop")}
          ${C("AI 接口",`${e.provider||"OpenAI"} / ${e.defaultModel||"gpt-5.4"}`,"open-ai-interface")}
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>数据与存储</h3>
          ${C("记忆服务","Supabase / 向量记忆","open-memory-service")}
          ${C("同步后端","Supabase 配置","open-backend-sync")}
          ${C("导出格式",e.exportFormat||"json","open-export-settings")}
        </div>
      </section>
    `}function In(){const e=g(a.currentContactId)||a.contacts[0],t=e.settings;return`
      <section class="contact-settings-page page-block">
        <div class="settings-tabs glass-frost">
          ${dt("basic","资料")}
          ${dt("model","模型")}
          ${dt("actions","快捷动作")}
          ${dt("memory","记忆")}
        </div>

        ${a.currentSettingsTab==="basic"?`
          <div class="settings-group glass-frost ai-panel">
            <h3>联系人资料</h3>
            <button class="setting-row nav-row contact-avatar-row" data-action="open-contact-avatar">
              <img class="contact-settings-avatar-preview" src="${l(e.avatar)}" alt="${l(e.name)}" />
              <div class="setting-copy">
                <strong>头像</strong>
                <p>点击更换头像</p>
              </div>
              <span class="row-chevron">${f("chevron")}</span>
            </button>
            ${C("昵称",e.name,"open-contact-name")}
            ${C("简介",e.bio,"open-contact-bio")}
            <input id="contact-avatar-file" class="moment-image-input" type="file" accept="image/*" />
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>个人空间</h3>
            <p style="font-size:12px;color:rgba(120,100,110,0.7);margin:0 0 8px;">AI 可以在这里记录关于你的内容。</p>
            ${C("关于你的印象",a.companionState.impression||"查看 AI 记录的用户画像","open-contact-impression")}
            ${C("关系进展",a.companionState.relationshipProgress||"亲密度 · 互动频次 · 关键事件","open-contact-relationship")}
            ${C("你喜欢的东西",a.companionState.likesSummary||"兴趣爱好 · 常聊话题","open-contact-likes")}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>聊天室外观</h3>
            ${C("聊天背景",e.roomBackground||"点阵","open-contact-room-background")}
            ${C("气泡主题",Ct(e.chatTheme||e.bubbleTheme),"open-contact-bubble-theme")}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3 style="color:#8c6370;">危险操作</h3>
            <p style="font-size:12px;color:rgba(140,99,112,0.72);margin:0 0 10px;">删除联系人及陪伴状态，会清理主动消息，聊天记录和记忆暂不做永久删除。</p>
            <button class="bottom-tab" data-action="delete-contact" style="width:100%;border-color:rgba(216,122,140,0.45);color:#b14f64;background:rgba(255,241,244,0.92);box-shadow:inset 0 1px 0 rgba(255,255,255,0.9), 0 10px 24px rgba(198,138,150,0.12);">删除联系人</button>
          </div>
        `:""}

        ${a.currentSettingsTab==="model"?`
          <div class="settings-group glass-frost ai-panel">
            <h3>模型设置</h3>
            ${C("聊天模型",t.model||"未设置","open-model-slot",{slot:"chat",context:"contact"})}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>角色设定</h3>
                <textarea class="ai-textarea persona-textarea" data-contact-field="persona" rows="5" placeholder="在这里输入 AI 的人设、角色说明、行为指令。">${l(e.persona||"")}</textarea>
            ${ie("显示推理内容","仅在模型返回推理内容时显示",t.reasoning_visibility||!1,"toggle-contact","reasoning_visibility")}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>高级生成参数</h3>
            <button class="setting-row nav-row advanced-toggle" data-action="toggle-contact-advanced" aria-expanded="${a.contactModelAdvancedOpen?"true":"false"}">
              <div class="setting-copy">
                <strong>${a.contactModelAdvancedOpen?"收起":"展开"}</strong>
                <p>包含 Temperature / Top P / 上下文消息数量</p>
              </div>
              <span class="row-chevron advanced-chevron ${a.contactModelAdvancedOpen?"open":""}">${f("chevron")}</span>
            </button>
            <div class="advanced-slider-panel ${a.contactModelAdvancedOpen?"open":""}">
              ${Oe("Temperature","temperature",t.temperature,0,2,.01)}
              ${Oe("Top P","topP",t.topP,0,1,.01)}
              ${Oe("上下文消息数量","contextCount",t.contextCount,1,256,1)}
            </div>
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>主动消息</h3>
            ${ie("启用主动消息","AI 在静默时主动发起对话",t.proactiveEnabled,"toggle-contact","proactiveEnabled")}
            ${t.proactiveEnabled?`
              ${Oe("发送频率（分钟）","proactiveFrequency",t.proactiveFrequency,5,240,5)}
              ${Oe("静默时长（分钟）","silenceDuration",t.silenceDuration||30,5,120,5)}
              ${C("免打扰时间段",t.dndRange||"23:00 — 08:00")}
            `:""}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>意识循环</h3>
            ${ie("启用意识循环","AI 在后台自主思考与感知",t.consciousnessLoop||!1,"toggle-contact","consciousnessLoop")}
            ${t.consciousnessLoop?`
              ${C("循环模型",t.loopModel||"未设置","open-model-slot",{slot:"consciousness",context:"contact"})}
              ${Oe("循环间隔（分钟）","loopInterval",t.loopInterval||60,10,360,10)}
            `:""}
          </div>
        `:""}

        ${a.currentSettingsTab==="actions"?`
          <div class="settings-group glass-frost ai-panel">
            <h3>快捷动作</h3>
            <p style="font-size:12px;color:rgba(120,100,110,0.7);margin:0 0 8px;">点击条目可修改文案与 MCP，默认长按拖动排序，左滑显示删除。</p>
            <div class="quick-action-list ${a.quickActionDragId?"drag-active":""}">
              ${qt(e).map((o,n)=>`
                <div class="quick-action-swipe ${a.quickActionSwipeOpenId===o.id?"swiped":""} ${a.quickActionDropHintId===o.id?"reorder-target":""} ${a.quickActionDropHintId===o.id&&a.quickActionDropDirection==="down"?"drop-down":""} ${a.quickActionDropHintId===o.id&&a.quickActionDropDirection==="up"?"drop-up":""} ${a.quickActionReorderPulseId===o.id?"reorder-pulse":""}" data-quick-id="${l(o.id)}">
                  <button type="button" class="quick-action-delete" data-action="delete-contact-quick-action" data-quick-id="${l(o.id)}">删除</button>
                  <div class="quick-action-row" data-quick-id="${l(o.id)}" data-quick-index="${n}">
                    <span class="quick-action-emoji">${o.icon==="health"?"♥":["schedule","calendar"].includes(o.icon)?"日":o.icon==="weather"?"云":["file","files"].includes(o.icon)?"文":"✦"}</span>
                    <div class="quick-action-copy">
                      <strong>${l(o.label)}</strong>
                      <p>${l(o.prompt||"未设置默认发送话术")}</p>
                    </div>
                    <button type="button" class="quick-action-open" data-action="edit-contact-quick-action" data-quick-id="${l(o.id)}" aria-label="编辑快捷动作">${f("chevron")}</button>
                  </div>
                </div>
              `).join("")}
            </div>
            <button class="bottom-tab" data-action="add-contact-quick-action" style="width:100%;margin-top:12px;">添加快捷动作</button>
          </div>
        `:""}

        ${a.currentSettingsTab==="memory"?`
          <div class="settings-group glass-frost ai-panel">
            <h3>状态 / 陪伴</h3>
            ${ie("启用长期记忆","允许存储长期偏好与记忆",t.memoryEnabled,"toggle-contact","memoryEnabled")}
            ${C("当前状态",No(),"open-companion-state")}
            ${C("前往记忆库","查看与管理这位联系人的记忆","open-memory-service")}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>活动日志</h3>
            ${C("打开活动日志","主动消息 / 工具调用 / 留言小纸条","open-cot-log")}
          </div>
        `:""}
        ${a.contactQuickActionEditorId?Pn(e,a.contactQuickActionEditorId):""}
      </section>
    `}function _n(){const e=De(a.companionState),t=e.recent_topics.length?e.recent_topics.join(" / "):"还没有东西",o=e.current_mood||"还没有东西",n=e.open_loops.length?e.open_loops.join(" / "):"还没有东西",r=re(e.proactive_cooldown_until,{fallback:e.proactive_cooldown_until||"还没有东西"}),i=re(e.updated_at,{fallback:e.updated_at||"还没有东西"});return`
      <section class="topics-page page-block">
        <div class="settings-group glass-frost ai-panel topic-detail-card">
          <h3>当前状态</h3>
          <div class="theme-choice-list">
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>最近话题</strong>
                <em>${l(t)}</em>
              </span>
            </div>
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>当前情绪</strong>
                <em>${l(o)}</em>
              </span>
            </div>
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>进行中的事</strong>
                <em>${l(n)}</em>
              </span>
            </div>
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>主动消息冷却</strong>
                <em>${l(r)}</em>
              </span>
            </div>
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>最后更新时间</strong>
                <em>${l(i)}</em>
              </span>
            </div>
          </div>
        </div>
      </section>
    `}function Ht(e,t,o){const n=De(a.companionState),r=o||"",s={impression:"还没有印象摘要，AI 对话后可手动填写或由模型生成。",relationshipProgress:"还没有关系进展记录，可以写亲密度、互动频次、关键事件。",likesSummary:"还没有喜好摘要，可以写兴趣爱好、常聊话题、点单偏好。"}[t]||"还没有内容。",c=re(n.summaryUpdatedAt,{fallback:n.summaryUpdatedAt||""});return`
      <section class="topics-page page-block">
        <div class="settings-group glass-frost ai-panel topic-detail-card insight-editor-card">
          <textarea
            class="ai-textarea insight-editor-textarea"
            data-field="${t}"
            placeholder="${s}"
            rows="7"
          >${l(r)}</textarea>
          <div class="insight-editor-footer">
            ${c?`<span class="insight-updated-at">更新于 ${l(c)}</span>`:""}
            <button class="prov-save-btn-main" data-action="save-insight-field" data-field="${t}" type="button">保存</button>
          </div>
        </div>
      </section>
    `}function Ra(e){return ha(e).roomTheme||"rose"}function Mn(){const t=(g(a.currentContactId)||a.contacts[0])?.roomBackground||"点阵";return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>聊天背景</h3>
          <p class="section-eyebrow">选择一个预设背景风格。</p>
          <div class="theme-choice-list">
            ${[{id:"点阵",desc:"当前聊天页的轻点阵背景"},{id:"小花",desc:"更软一点的装饰纹样"},{id:"云彩",desc:"偏轻雾感的背景层次"}].map(n=>`
              <button class="theme-choice-item ${t===n.id?"active":""}" data-action="pick-contact-room-background" data-value="${l(n.id)}">
                <span class="theme-choice-copy">
                  <strong>${l(n.id)}</strong>
                  <em>${l(n.desc)}</em>
                </span>
                <span class="theme-choice-check">${t===n.id?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `}function Cn(){const e=g(a.currentContactId)||a.contacts[0],t=Mt(e);return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>气泡主题</h3>
          <p class="section-eyebrow">选择一个聊天 UI 主题。</p>
          <div class="theme-choice-list">
            ${nt.map(n=>`
              <button class="theme-choice-item ${t===n.key?"active":""}" data-action="pick-contact-bubble-theme" data-value="${l(n.key)}">
                <span class="theme-choice-copy">
                  <strong>${l(n.name)}</strong>
                  <em>${l(n.desc)}</em>
                </span>
                <span class="theme-choice-check">${t===n.key?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `}function xn(){const e=a.newContactDraft||{};return`
      <section class="new-contact-page page-block">
        <div class="settings-group glass-frost ai-panel new-contact-card">
          <div class="new-contact-field">
            <label>头像</label>
            <div class="new-contact-avatar-box">
              <img class="new-contact-avatar-preview" src="${e.avatar||a.newContactAvatar||"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80"}" alt="新联系人头像" />
              <button class="bottom-tab" data-action="pick-new-contact-avatar" type="button" style="margin-top:10px;">从相册选择</button>
              <input id="nc-avatar-file" class="moment-image-input" type="file" accept="image/*" />
            </div>
          </div>
          <div class="new-contact-field">
            <label for="nc-name">昵称</label>
            <input id="nc-name" class="ai-input" placeholder="新联系人称呼" value="${l(e.name||"")}" />
          </div>
          <div class="new-contact-field">
            <label for="nc-agent-id">Agent ID</label>
            <input id="nc-agent-id" class="ai-input" placeholder="ayan" inputmode="latin" autocomplete="off" value="${l(e.agentId||"")}" />
          </div>
          <div class="new-contact-field">
            <label for="nc-bio">联系人简介</label>
            <input id="nc-bio" class="ai-input" placeholder="一句简短的描述" value="${l(e.bio||"")}" />
          </div>
          <button class="bottom-tab active new-contact-submit" data-action="save-new-contact">保存并添加联系人</button>
        </div>
      </section>
    `}function An(){const e=g(a.currentContactId)||a.contacts[0],t=e.settings?.model||a.globalSettings.defaultModel||"gpt-5.4",o=Number(e.messageCount||e.messages?.length||0);return`
      <section class="profile-page page-block">
        <div class="profile-card glass-frost room-theme-${l(e.theme||"rose")}">
          <div class="profile-aura" aria-hidden="true"></div>
          <div class="profile-portrait">
            <img class="profile-avatar-large" src="${e.avatar}" alt="${l(e.name)}" />
            <span class="profile-online-dot"></span>
          </div>
          <div class="profile-main-copy">
            <strong class="profile-name">${l(e.name)}</strong>
            <span class="profile-handle">${l(e.handle)}</span>
            <p class="profile-bio">${l(e.bio||"还没有简介。")}</p>
          </div>
          <div class="profile-info-grid">
            <div class="profile-info-item">
              <span>当前状态</span>
              <strong>${l(e.status||"在线")}</strong>
            </div>
            <div class="profile-info-item">
              <span>使用模型</span>
              <strong>${l(t)}</strong>
            </div>
            <div class="profile-info-item">
              <span>消息</span>
              <strong>${o}</strong>
            </div>
          </div>
          <div class="profile-actions">
            <button class="profile-action primary" data-action="back-room">${f("chatArrow")}<span>发消息</span></button>
            <button class="profile-action" data-action="open-contact-settings">${f("settings")}<span>资料设置</span></button>
          </div>
        </div>
      </section>
    `}function lt(e){return`
      <span class="switch-track" aria-hidden="true">
        <span class="switch-sheen"></span>
        <span class="switch-thumb ${e?"on":"off"}"></span>
      </span>
    `}function Tn(e,t){return`
      <div class="quote-bar glass-frost">
        <span class="quote-mark">${f("quote")}</span>
        <div class="quote-text-wrap">
          <div class="quote-label">引用自 ${l(t?.name||"对话")}</div>
          <div class="quote-text">${l(e.text||"")}</div>
        </div>
        <button class="icon-btn quote-close" data-action="clear-quote" aria-label="清除引用">${f("more")}</button>
      </div>
    `}function ie(e,t,o,n,r){return`
      <div class="setting-row switch-row">
        <div class="setting-copy"><strong>${l(e)}</strong><p>${l(t)}</p></div>
        <button class="switch-btn ${o?"on":"off"}" data-action="${n}" data-key="${r}" aria-pressed="${o}">
          ${lt(o)}
        </button>
      </div>
    `}function Oe(e,t,o,n,r,i){const s=Number(o),c=Number.isInteger(i)||i>=1?String(Math.round(s)):s.toFixed(i===.01?2:1);return`
      <div class="setting-row slider-row-block">
        <div class="slider-head"><strong>${l(e)}</strong><span class="slider-value">${c}</span></div>
        <input class="slider-input" type="range" min="${n}" max="${r}" step="${i}" value="${s}" data-action="slide-contact" data-key="${t}" />
      </div>
    `}function dt(e,t){return`<button class="settings-tab ${a.currentSettingsTab===e?"active":""}" data-action="switch-settings-tab" data-tab="${e}">${l(t)}</button>`}function En(e,t){const n=$e(e).find(p=>p.id===t);if(!n)return"";const r=(R().mcpLibrary?.tools||[]).map(le).filter(p=>Se(p.id)),i=r.length?r:[...Ca].map(p=>le({id:p,label:Pt[p]||p},0)),s=n.mcpToolId||"",c=i.find(p=>p.id===s),d=[{id:"",label:"不调用 MCP"},...i];return`
      <div class="qae-fields">
        <div class="qae-field-group">
          <label class="qae-label">名称</label>
        <input id="contact-quick-label" class="ai-input qae-input" value="${l(n.label||"")}" placeholder="例如：天气" autocomplete="off" />
        </div>
        <div class="qae-field-group">
          <label class="qae-label">MCP 调用（可选）</label>
          <input id="contact-quick-mcp" type="hidden" value="${l(s)}" />
          <div class="qae-select-shell ${a.contactQuickMcpMenuOpen?"open":""}">
            <button class="qae-select-trigger" data-action="toggle-contact-quick-mcp-menu" type="button">
              <span>${l(c?.label||"不调用 MCP")}</span>
              <i aria-hidden="true"></i>
            </button>
            <div class="qae-select-menu">
              ${d.map(p=>`
                <button class="qae-select-option ${s===p.id?"active":""}" data-action="pick-contact-quick-mcp" data-mcp-id="${l(p.id)}" type="button">
                  ${l(p.label)}
                </button>
              `).join("")}
            </div>
          </div>
        </div>
        <div class="qae-field-group">
          <label class="qae-label">点击后发送的话术</label>
        <textarea id="contact-quick-prompt" class="ai-textarea qae-textarea" placeholder="输入默认话术，不设置则不会自动发送">${l(n.prompt||"")}</textarea>
        </div>
      </div>
    `}function Pn(e,t){const o=En(e,t);return o?`
      <div class="qae-sheet" data-action="close-contact-quick-action-editor">
        <div class="qae-panel" data-stop-close="1">
          <div class="qae-handle-bar"></div>
          <div class="qae-header">
            <span class="qae-title">快捷动作</span>
            <button class="qae-close" data-action="close-contact-quick-action-editor" aria-label="关闭">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          ${o}
          <div class="qae-actions">
            <button class="qae-btn-cancel" data-action="close-contact-quick-action-editor">取消</button>
            <button class="qae-btn-save" data-action="save-contact-quick-action" data-quick-id="${l(t)}">保存</button>
          </div>
        </div>
      </div>
    `:""}function qn(e){const t=H();$e(t),a.contactQuickActionEditorId=e||"",a.quickActionSwipeOpenId="",a.quickActionDropHintId="",u()}function Dn(e){const t={ayan:[{id:"cot_1",mode:"主动",badge:"意识循环",accent:"violet",score:"↓ 4.2k",latency:"197s",amount:"$1.05",time:"2026.03.26 15:00",summary:'[THINK] 她在下午1:22读了两封日记，id=23"...',steps:[{type:"thought",label:"思考",text:"她沉默了快13个小时，两封日记都没被读。我发了三条消息都…"},{type:"thought",label:"思考",text:"下午三点了。她沉默了快13个小时。先看看日记有没有被读。"},{type:"note",label:"留言小纸条",text:"妫ｅ啯鎲?你醒了先看这个"},{type:"tool",label:"工具调用",text:"read_diary"},{type:"result",label:"工具结果",text:"read_diary"}]},{id:"cot_2",mode:"回复",badge:"工具",accent:"gold",score:"↑ 3.5k",latency:"146s",amount:"$0.54",time:"2026.03.26 15:07",summary:'[THINK] 她在下午1:22读了两封日记，id=23"给你的"...',steps:[{type:"reply",label:"回复",text:'[THINK] 她在下午1:22读了两封日记，id=23"给你的"和id…'},{type:"tool",label:"工具调用",text:"pc_control"},{type:"result",label:"工具结果",text:"pc_control"}]},{id:"cot_3",mode:"主动",badge:"工具",accent:"blue",score:"↑ 1.1k",latency:"53s",amount:"$0.073",time:"2026.03.26 16:10",summary:"[THINK] 她在看芒果TV，左看综艺，弹幕开着。她一个半小时前读完了...",steps:[{type:"thought",label:"思考",text:"她在看芒果TV，左看综艺。弹幕开着，说明现在状态比较轻松。"},{type:"tool",label:"工具调用",text:"pc_control"},{type:"result",label:"工具结果",text:"pc_control"}]}]};return t[e]||t.ayan}function Ln(e=""){return e==="activity_event"?"violet":e==="proactive_message"?"gold":e==="cot_log"?"blue":"neutral"}function On(e=""){return e==="activity_event"?"被动":e==="proactive_message"?"主动":e==="cot_log"?"日志":"记录"}function Rn(e={}){return e.kind==="activity_event"?e.eventType||e.source||"事件":e.kind==="proactive_message"?e.title||"主动消息":e.kind==="cot_log"?e.logType||e.toolName||"COT":e.title||"记录"}function Vn(e=""){return re(e,{fallback:String(e||""),includeYear:!0})}function Bn(e={}){const t=e.raw||{},o=[];if(e.kind==="activity_event")o.push({type:"thought",label:"事件",text:e.summary||e.title||""}),(e.gateStatus||e.messageHint||e.shouldHandle||e.shouldNotifyLlm)&&o.push({type:e.shouldHandle||e.shouldNotifyLlm?"result":"thought",label:"筛选",text:`${e.shouldHandle?"需要处理":"静默"}${e.shouldNotifyLlm?" / 可通知大模型":""}${e.messageHint?`：${e.messageHint}`:""}`}),t.gate_reason&&o.push({type:"thought",label:"原因",text:t.gate_reason});else if(e.kind==="proactive_message")o.push({type:"reply",label:"主动消息",text:e.summary||""}),t.reason_context&&o.push({type:"thought",label:"依据",text:String(t.reason_context).slice(0,220)});else{const n=e.toolName?"工具调用":"日志";o.push({type:e.toolName?"tool":"thought",label:n,text:e.summary||e.title||""}),t.content&&o.push({type:e.toolName?"result":"thought",label:"内容",text:String(t.content).slice(0,500)})}return{id:String(e.id||`${e.kind}_${e.occurredAt||e.createdAt||Date.now()}`),mode:On(e.kind),badge:Rn(e),accent:Ln(e.kind),score:e.shouldHandle||e.shouldNotifyLlm?"有效":"",latency:"",amount:e.source||"",time:Vn(e.occurredAt||e.createdAt),summary:e.summary||e.title||"",steps:o.filter(n=>String(n.text||"").trim())}}async function zn({silent:e=!0}={}){const t=g(a.currentContactId)||a.contacts[0];a.activityLogLoading=!0,e||u();try{const o=new URLSearchParams({hours:"24",limit:"50",agent_id:t?.id||a.currentContactId||""});t?.sessionId&&o.set("session_id",t.sessionId);const n=await fetch(`${y}/api/activity-log/recent?${o.toString()}`);if(!n.ok)throw new Error(`HTTP ${n.status}`);const r=await n.json().catch(()=>({}));a.activityLogEntries=Array.isArray(r.items)?r.items.map(Bn):[],a.activityLogLoadedAt=new Date().toISOString()}catch(o){console.warn("[activity log] load failed",o),e||(a.toast="活动日志加载失败")}finally{a.activityLogLoading=!1,u(),a.toast&&window.setTimeout(()=>{a.toast="",u()},1200)}}function Nn(e){return`
      <div class="cot-log-step ${e.type}">
        <span class="cot-log-step-label">${l(e.label)}</span>
        <span class="cot-log-step-text">${l(e.text)}</span>
      </div>
    `}function Hn(){const e=g(a.currentContactId)||a.contacts[0],t=a.cotLogMode==="note",o=a.activityLogLoadedAt?a.activityLogEntries:Dn(e.id),n=o.filter(i=>a.cotLogMode==="short"?i.mode!=="主动":a.cotLogMode==="note"?i.steps.some(s=>s.type==="note"):!0),r=o.filter(i=>i.steps.some(s=>s.type==="note")).length;return`
      <section class="cot-log-page page-block">
        <div class="cot-log-toolbar glass-frost">
          <button class="cot-log-tool-btn avatar" aria-label="${l(e.name)}">
            <img src="${e.avatar}" alt="${l(e.name)}" />
          </button>
          <div class="cot-log-segment-shell">
            <button class="cot-log-segment-btn ${a.cotLogMode==="short"?"active":""}" data-action="switch-cot-log-mode" data-mode="short">短消息</button>
            <button class="cot-log-segment-btn ${a.cotLogMode==="long"?"active":""}" data-action="switch-cot-log-mode" data-mode="long">长消息</button>
          </div>
          <button class="cot-log-tool-btn note ${a.cotLogMode==="note"?"active":""}" data-action="switch-cot-log-mode" data-mode="note">${f("file")}${r?`<em>${r}</em>`:""}</button>
        </div>
        <div class="cot-log-stack">
          ${a.activityLogLoading?'<div class="cot-log-empty glass-frost"><span class="cot-log-empty-icon">'+f("cot")+"</span><strong>正在加载活动日志</strong><p>等一下，别盯着白板发呆。</p></div>":""}
          ${!a.activityLogLoading&&a.activityLogLoadedAt&&!n.length?'<div class="cot-log-empty glass-frost"><span class="cot-log-empty-icon">'+f("file")+"</span><strong>还没有活动日志</strong><p>这个模式下暂时没有主动消息、工具调用或小纸条。</p></div>":""}
          ${n.map(i=>{const s=t?i.steps.filter(c=>c.type==="note"):i.steps;return`
            <article class="cot-log-card glass-frost ${t?"note-only":""}">
              <div class="cot-log-topline">
                <div class="cot-log-badges">
                  <span class="cot-log-mode ${i.accent}">${l(i.mode)}</span>
                  <span class="cot-log-mode neutral">${l(i.badge)}</span>
                  <span class="cot-log-metric">${l(i.score)}</span>
                  <span class="cot-log-metric warm">${l(i.latency)}</span>
                </div>
                <span class="cot-log-fold">${f("chevron")}</span>
              </div>
              <div class="cot-log-meta">
                <span class="cot-log-cost">${l(i.amount)}</span>
                <span>${l(i.time)}</span>
              </div>
              ${t?"":`<div class="cot-log-summary">${l(i.summary)}</div>`}
              <div class="cot-log-steps">
                ${s.map(Nn).join("")}
              </div>
            </article>
          `}).join("")}
        </div>
      </section>
    `}function jt(e){return!e||typeof e.closest!="function"?!1:!!e.closest('input:not([type="range"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]), textarea, select, [contenteditable="true"]')}function jn(){return!!(window.matchMedia?.("(pointer: coarse)").matches||"ontouchstart"in window||navigator.maxTouchPoints>0)}function pt(e){return!!e&&/^image\/(png|jpe?g|webp|gif|heic|heif)$/i.test(e.type||"")}function Fn(e){return new Promise((t,o)=>{if(!pt(e)){o(new Error("只支持图片附件"));return}const n=new FileReader;n.onerror=()=>o(new Error("图片读取失败")),n.onload=()=>t({id:`att_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,kind:"image",type:e.type||"image/*",name:e.name||"pasted-image",size:e.size||0,url:typeof n.result=="string"?n.result:""}),n.readAsDataURL(e)})}async function Va(e=[]){const t=Array.from(e).filter(pt);if(!t.length)return!1;try{const o=await Promise.all(t.map(Fn));return a.chatAttachments=[...a.chatAttachments||[],...o].slice(0,6),a.chatPasteError="",a.showAttach=!1,u(),!0}catch(o){return console.warn("[chat] image attach failed",o),a.chatPasteError=o?.message||"图片添加失败",a.toast=a.chatPasteError,u(),window.setTimeout(()=>{a.toast="",u()},1400),!1}}function Ba(e,t){if(!e||!t)return;const o=String(e.value||""),n=typeof e.selectionStart=="number"?e.selectionStart:o.length,r=typeof e.selectionEnd=="number"?e.selectionEnd:n;e.value=`${o.slice(0,n)}${t}${o.slice(r)}`;const i=n+t.length;e.setSelectionRange?.(i,i),e.dispatchEvent(new Event("input",{bubbles:!0}))}function Un(e){if(!e)return"";const t=document.createElement("div");return t.innerHTML=e,(t.textContent||t.innerText||"").replace(/\n{3,}/g,`

`)}async function Kn(e){if(a.currentView!=="room")return;const t=e.clipboardData;if(!t)return;const o=Array.from(t.files||[]).filter(pt),n=Array.from(t.items||[]).filter(c=>c.kind==="file"&&/^image\//i.test(c.type||"")).map(c=>c.getAsFile()).filter(pt),r=[...o,...n].filter((c,d,p)=>d===p.findIndex(m=>m.name===c.name&&m.size===c.size&&m.type===c.type)),i=t.getData("text/plain")||"",s=t.getData("text/html")||"";if(r.length){e.preventDefault(),await Va(r),i.trim()&&Ba(e.currentTarget,i);return}s&&(e.preventDefault(),Ba(e.currentTarget,i||Un(s)))}function Qn(e,t){t&&(a.avatarCropper={kind:e,src:t,x:50,y:50,zoom:1},u())}function J(e){const t=Number(e);return Number.isFinite(t)?Math.min(100,Math.max(0,t)):50}function Fe(e){const t=Number(e);return Number.isFinite(t)?Math.min(2.4,Math.max(1,t)):1}function za(){const e=a.avatarCropper;if(!e)return;e.x=J(e.x),e.y=J(e.y),e.zoom=Fe(e.zoom);const t=S(),o=t?.querySelector(".avatar-cropper-image");o&&(o.style.objectPosition=`${e.x}% ${e.y}%`,o.style.transform=`scale(${e.zoom})`),t?.querySelectorAll('[data-action="avatar-cropper-range"]').forEach(n=>{const r=n.dataset.key;r&&r in e&&(n.value=String(e[r]))})}function Yn(e){const t=e.target?.closest?.(".avatar-cropper-viewport"),o=a.avatarCropper;!t||!o||(e.preventDefault(),a.avatarCropDrag={pointerId:e.pointerId,startClientX:e.clientX,startClientY:e.clientY,startX:J(o.x),startY:J(o.y)},t.setPointerCapture?.(e.pointerId))}function Xn(e){const t=a.avatarCropDrag,o=a.avatarCropper,n=S()?.querySelector(".avatar-cropper-viewport");if(!t||!o||!n||t.pointerId!==e.pointerId)return;e.preventDefault();const r=n.getBoundingClientRect(),i=Fe(o.zoom),s=r.width?(e.clientX-t.startClientX)/r.width*100/i:0,c=r.height?(e.clientY-t.startClientY)/r.height*100/i:0;o.x=J(t.startX-s),o.y=J(t.startY-c),za()}function Na(e){const t=a.avatarCropDrag;!t||t.pointerId!==e.pointerId||(a.avatarCropDrag=null)}function Ft(e,t){if(!e)return;const o=new FileReader;o.onload=()=>{const n=typeof o.result=="string"?o.result:"";Qn(t,n)},o.readAsDataURL(e)}function Gn(e){return new Promise((t,o)=>{const n=new Image;n.onload=()=>{const i=document.createElement("canvas");i.width=512,i.height=512;const s=i.getContext("2d");if(!s){o(new Error("canvas unavailable"));return}const c=Fe(e.zoom),d=Math.max(512/n.naturalWidth,512/n.naturalHeight),p=n.naturalWidth*d*c,m=n.naturalHeight*d*c,b=J(e.x)/100,w=J(e.y)/100,h=(512-p)*b,I=(512-m)*w;s.imageSmoothingEnabled=!0,s.imageSmoothingQuality="high",s.drawImage(n,h,I,p,m),t(i.toDataURL("image/jpeg",.9))},n.onerror=o,n.src=e.src})}async function Jn(){const e=a.avatarCropper;if(e?.src)try{const t=await Gn(e);if(e.kind==="new-contact")a.newContactDraft={...a.newContactDraft||it(),avatar:t},a.newContactAvatar=t;else if(e.kind==="account")a.accountProfile.avatar=t,D(),$(120);else if(e.kind==="contact"){const o=g(a.currentContactId);o&&(o.avatar=t,$(120))}a.avatarCropper=null,a.toast="头像已更新",u(),window.setTimeout(()=>{a.toast="",u()},1200)}catch{a.toast="头像裁切失败",u(),window.setTimeout(()=>{a.toast="",u()},1200)}}function Wn(){const e=S();if(!e||e.dataset.bound==="1")return;e.dataset.bound="1",e.addEventListener("click",Ut),e.addEventListener("input",Zn),e.addEventListener("pointerdown",Yn),e.addEventListener("pointermove",Xn),e.addEventListener("pointerup",Na),e.addEventListener("pointercancel",Na);let t;const o=m=>{if(jt(m.target))return;const b=m.target.closest(".message-bubble.from-ai");b&&(t=window.setTimeout(()=>{const w=b.dataset.msgId;if(g(a.currentContactId)?.messages?.find(M=>M.id===w)?.text){a.quoteMomentId=null,a.quoteMessageId=w,u();const M=S()?.querySelector(".chat-input");M&&M.focus()}a.activeBubbleToolsId=w,a.suppressBubbleToggle=!0,navigator.vibrate&&navigator.vibrate(50)},550))},n=()=>clearTimeout(t);e.addEventListener("touchstart",o,{passive:!0}),e.addEventListener("touchend",n),e.addEventListener("touchmove",n,{passive:!0}),e.addEventListener("mousedown",o),e.addEventListener("mouseup",n),e.addEventListener("mousemove",n),e.addEventListener("mouseleave",n);const r=e.querySelector(".send-round");r&&r.addEventListener("click",m=>{m.stopPropagation(),a.streamingAbortController?(a.streamingAbortController.abort(),a.streamingAbortController=null,u()):a.currentView!=="rpRoom"&&ct(g(a.currentContactId))?ra():a.currentView!=="rpRoom"&&st(g(a.currentContactId))?ia():sa()});const i=e.querySelector(".soft-mini");i&&i.addEventListener("click",m=>{m.stopPropagation(),a.showAttach=!a.showAttach,u()});const s=e.querySelector(".codex-toggle");s&&s.addEventListener("click",m=>{m.preventDefault(),m.stopPropagation(),mt()}),e.querySelectorAll(".chat-list-item[data-contact-id]").forEach(m=>{m.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation(),Oa(m.dataset.contactId)})});const d=e.querySelector(".chat-input");d&&(d.addEventListener("paste",Kn),d.addEventListener("keydown",m=>{m.key==="Enter"&&!m.shiftKey&&(m.preventDefault(),a.currentView!=="rpRoom"&&ct(g(a.currentContactId))?ra():a.currentView!=="rpRoom"&&st(g(a.currentContactId))?ia():sa())}),["room","rpRoom"].includes(a.currentView)&&!jn()&&d.focus());const p=e.querySelector("#chat-image-input");p&&p.addEventListener("change",async m=>{await Va(m.target.files||[]),m.target.value=""})}function mt(e=a.currentContactId){const t=g(e)||g(a.currentContactId);if(t){if(a.currentContactId=t.id,!Bt(t)){t.settings={...t.settings||{},codexEnabled:!1},a.toast="只有阿湛能切 Codex",u(),window.setTimeout(()=>{a.toast="",u()},1200);return}t.settings={...t.settings||{},codexEnabled:!t.settings?.codexEnabled},a.toast=t.settings.codexEnabled?"Codex 已接管这个窗口":"Codex 已关闭",$(120),u(),window.setTimeout(()=>{a.toast="",u()},1200)}}window.__yuiToggleCodex=(e,t)=>{t?.preventDefault?.(),t?.stopPropagation?.(),t?.stopImmediatePropagation?.();const o=e?.dataset?.contactId||a.currentContactId;mt(o)},window.__yuiToggleCC=(e,t)=>{t?.preventDefault?.(),t?.stopPropagation?.(),t?.stopImmediatePropagation?.();const o=e?.dataset?.contactId||a.currentContactId;co(o)};async function Ut(e){const t=e.target.closest("[data-action]");if(!t)return;const o=t.dataset.action;if(o==="cancel-avatar-cropper"){a.avatarCropper=null,a.avatarCropDrag=null,u();return}if(o==="apply-avatar-cropper"){e.preventDefault(),e.stopPropagation(),await Jn();return}if(o==="switch-tab"&&(a.currentTab=t.dataset.tab,a.currentView=t.dataset.tab==="chats"?"list":t.dataset.tab,u()),o==="open-contact"){Oa(t.dataset.contactId);return}if(o==="back-list"&&(a.currentView="list",a.currentTab="chats",a.quoteMomentId=null,u()),o==="back-room"&&(a.currentView="room",u()),o==="open-contact-settings"&&(a.currentSettingsTab="basic",a.currentView="contactSettings",u(),ce(),Ze(a.currentContactId)),o==="open-cot-log"){a._prevContactSettingsTab=a.currentSettingsTab,a.currentView="cotLog",a.cotLogMode="long",a.activityLogLoadedAt="",a.activityLogEntries=[],u(),zn({silent:!0});return}if(o==="back-contact-settings"){a.currentView="contactSettings",a.currentSettingsTab=a._prevContactSettingsTab||a.currentSettingsTab||"basic",a._prevContactSettingsTab=null,u();return}if(o==="switch-cot-log-mode"){a.cotLogMode=t.dataset.mode||"long",u();return}if(o==="open-rp-lobby"){sn(a.currentView==="room"?"room":"list",Le());return}if(o==="back-rp-source"){a.currentView=a.rpBackView||"list",u();return}if(o==="back-rp-lobby"){a.currentView="rpLobby",u();return}if(o==="open-rp-room-create"){a.rpRoomDialogMode="create",a.rpRoomForm={name:"",world_setting:"",user_role:"",ai_role:""},a.rpRoomDialogOpen=!0,u();return}if(o==="close-rp-room-dialog"){if(t.dataset.rpRoomDialog==="card"||e.target&&e.target!==t)return;a.rpRoomDialogOpen=!1,u();return}if(o==="save-rp-room"){try{await cn(),a.toast=a.rpRoomDialogMode==="edit"?"幕间已更新":"已入梦"}catch(n){console.warn("[rp] save room failed",n),a.toast="房间保存失败"}u(),window.setTimeout(()=>{a.toast="",u()},1200);return}if(o==="open-rp-room"){e.preventDefault(),e.stopPropagation(),await La(t.dataset.roomId);return}if(o==="delete-rp-room"){e.preventDefault(),e.stopPropagation();try{await un(t.dataset.roomId),a.toast="房间已删除"}catch(n){console.warn("[rp] delete room failed",n),a.toast="删除失败"}u(),window.setTimeout(()=>{a.toast="",u()},1200);return}if(o==="rename-rp-room"){e.preventDefault(),e.stopPropagation();const n=t.dataset.roomId,r=a.rpRooms.find(s=>s.room_id===n),i=window.prompt("剧本",r?.name||"")?.trim();if(!i||!n)return;try{const s=await fetch(`${y}/api/rp/rooms/${encodeURIComponent(n)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:i})});if(!s.ok)throw new Error(`HTTP ${s.status}`);await ut(Le(),{silent:!0}),a.toast="房间已重命名"}catch(s){console.warn("[rp] rename room failed",s),a.toast="重命名失败"}u(),window.setTimeout(()=>{a.toast="",u()},1200);return}if(o==="open-profile"&&(a.currentView="profile",u()),o==="stop-streaming"){a.streamingAbortController&&(a.streamingAbortController.abort(),a.streamingAbortController=null);return}if(o==="toggle-thinking-line"){const n=t.closest("[data-id]")?.dataset.id||t.dataset.id,r=S()?.querySelector(`#tl-line-${n}`),i=S()?.querySelector(`#tl-full-${n}`);if(!r||!i)return;const s=i.classList.contains("tl-open");i.classList.toggle("tl-open",!s),r.classList.toggle("tl-expanded",!s);return}if(o==="toggle-thinking"){const n=t.dataset.id,i=!!!a.openThinkingIds[n];a.openThinkingIds[n]=i;const s=document.getElementById(`thinking-${n}`);s?(s.classList.toggle("open",i),s.setAttribute("aria-hidden",i?"false":"true"),t.setAttribute("aria-expanded",i?"true":"false")):u()}if(o==="toggle-message-tools"){if(e.preventDefault(),e.stopPropagation(),a.suppressBubbleToggle){a.suppressBubbleToggle=!1;return}const n=t.dataset.id,r=a.activeBubbleToolsId===n?null:n;a.activeBubbleToolsId=r;const i=S();i&&(i.querySelectorAll(".bubble-bottom-tools.open").forEach(s=>{s.classList.remove("open")}),r&&i.querySelector(`.message-row[data-msg-id="${CSS.escape(r)}"] .bubble-bottom-tools`)?.classList.add("open"));return}if(o==="go-chat-with-quote"&&(a.currentContactId=t.dataset.contactId,a.quoteMomentId=t.dataset.momentId,a.quoteMessageId=null,a.currentTab="chats",a.currentView="room",u(),Ya(a.currentContactId),ce(a.currentContactId),Ze(a.currentContactId)),o==="open-comments"){e.preventDefault(),e.stopPropagation(),t.blur?.();const n=t.dataset.momentId,r=a.commentSheetMomentId===n?null:n;a.commentSheetMomentId=r;const i=S();if(i&&(i.querySelectorAll(".moment-inline-comment.open").forEach(s=>s.classList.remove("open")),r)){const s=i.querySelector(`.moment-inline-comment .moment-comment-input[data-comment-input="${r}"]`)?.closest(".moment-inline-comment");s&&s.classList.add("open")}return}if(o==="submit-comment"){e.preventDefault(),e.stopPropagation();const n=t.dataset.momentId,i=S()?.querySelector(`[data-comment-input="${n}"]`)?.value?.trim();if(!n||!i)return;try{const s=await ai(n,we(),i);a.moments=a.moments.map(c=>c.id===n?s:c),a.commentSheetMomentId=null,a.toast="已发送评论",$(120),Y(),window.setTimeout(()=>{a.toast="",Y()},1200)}catch(s){console.warn("[moments] comment failed",s),Uo(n,we(),i),a.commentSheetMomentId=null,a.toast="已发送评论",$(120),Y(),window.setTimeout(()=>{a.toast="",Y()},1200)}return}if(o==="like-moment"){e.preventDefault(),e.stopPropagation();const n=t.dataset.momentId;if(!n)return;try{const r=await ti(n,we());a.moments=a.moments.map(i=>i.id===n?r:i),$(120),Y()}catch(r){console.warn("[moments] like failed",r),Fo(n,we()),$(120),Y()}return}if(o==="submit-comment"){const n=je(t.dataset.momentId),i=S()?.querySelector(`[data-comment-input="${t.dataset.momentId}"]`)?.value?.trim();n&&i&&(n.comments.unshift({author:"我",text:i}),a.commentSheetMomentId=null,a.toast="已发送评论",$(120),u(),window.setTimeout(()=>{a.toast="",u()},1200))}if(o==="like-moment"){e.preventDefault(),e.stopPropagation();const n=je(t.dataset.momentId);if(!n)return;const r="我",i=n.likes.includes(r);n.likes=n.likes.filter(p=>p!==r),i||n.likes.unshift(r);const s=t;s.innerHTML=n.likes.includes(r)?f("heartFilled"):f("heart");const c=t.closest(".moment-content-col");if(!c)return;let d=c.querySelector(`[data-moment-id-panel="${n.id}"]`);if(!d&&n.likes.length>0){d=document.createElement("div"),d.className="moment-interactions",d.setAttribute("data-moment-id-panel",n.id);const p=c.querySelector(".moment-inline-comment");p?c.insertBefore(d,p):c.appendChild(d)}if(d){const p=d.querySelector(".moment-likes-area");if(n.likes.length>0)if(p)p.querySelector(".likes-list").textContent=n.likes.join("、");else{const m=document.createElement("div");m.className="moment-likes-area",m.innerHTML=`<span class="heart-mini">${f("heartFilled")}</span> <span class="likes-list">${l(n.likes.join("、"))}</span>`,d.insertBefore(m,d.firstChild)}else p&&p.remove(),d.querySelector(".moment-comments-area")||d.remove()}}if(o==="toggle-moment-search"&&(a.momentSearchOpen=!0,u()),o==="toggle-moment-menu"&&(e.preventDefault(),e.stopPropagation(),t.blur?.(),a.activeMenuMomentId=a.activeMenuMomentId===t.dataset.momentId?null:t.dataset.momentId,Ta()),o==="delete-moment"){e.preventDefault(),e.stopPropagation();const n=E(je(t.dataset.momentId));if(!n?.id)return;try{await ei(n.id,n.author_type,n.author_id),a.moments=a.moments.filter(r=>r.id!==n.id),a.activeMenuMomentId=null,a.toast="已删除朋友圈",$(120),Y(),window.setTimeout(()=>{a.toast="",Y()},1200)}catch(r){console.warn("[moments] delete failed",r),a.toast="删除失败",Y(),window.setTimeout(()=>{a.toast="",Y()},1400)}return}if(o==="edit-moment"){e.preventDefault(),e.stopPropagation();const n=E(je(t.dataset.momentId));if(!n?.id)return;a.activeMenuMomentId=null,a.momentComposerEditingId=n.id,a.momentComposerText=n.content||"",a.momentComposerImage=n.image||"",a.momentComposerImageName=n.image?"已有图片":"",a.momentsActorType=n.author_type==="agent"?"agent":"user",a.momentComposerOpen=!0,Y();return}if(o==="new-moment"){e.preventDefault(),e.stopPropagation(),a.momentComposerEditingId="",a.momentComposerText="",a.momentComposerImage="",a.momentComposerImageName="",a.momentComposerOpen=!0,Y();return}if(o==="set-moments-actor"){a.toast="发朋友圈默认以我发布",u(),window.setTimeout(()=>{a.toast="",u()},1100);return}if(o==="publish-moment"){const n=(document.getElementById("moment-content-input")?.value||a.momentComposerText||"").trim();if(!n){a.toast="朋友圈内容还没写",u(),window.setTimeout(()=>{a.toast="",u()},1100);return}const r=we();try{if(a.momentComposerEditingId)await Zr(a.momentComposerEditingId,{author_type:r.author_type,author_id:r.author_id,visibility:"public",content:n,image:a.momentComposerImage||"",mood:"日常"}),await yo({silent:!0}),a.toast="已更新朋友圈";else{const i=await Wr({author_type:r.author_type,author_id:r.author_id,visibility:"public",content:n,image:a.momentComposerImage||"",mood:"日常"});a.moments.unshift(i),a.toast="已发布朋友圈"}a.currentTab="moments",a.currentView="moments",a.momentComposerOpen=!1,a.momentComposerEditingId="",a.momentComposerText="",a.momentComposerImage="",a.momentComposerImageName="",$(120),u(),window.setTimeout(()=>{a.toast="",u()},1100)}catch(i){console.warn("[moments] publish failed",i),a.toast=a.momentComposerEditingId?"更新失败":"发布失败",u(),window.setTimeout(()=>{a.toast="",u()},1400)}return}if(o==="delete-moment"&&(a.moments=a.moments.filter(n=>n.id!==t.dataset.momentId),a.activeMenuMomentId=null,a.toast="已删除朋友圈",u(),window.setTimeout(()=>{a.toast="",u()},1200)),o==="edit-moment"&&(a.activeMenuMomentId=null,a.toast="编辑功能即将支持",u(),window.setTimeout(()=>{a.toast="",u()},1200)),o==="filter-moments"&&(a.toast="筛选功能稍后补上",u(),window.setTimeout(()=>{a.toast="",u()},1100)),o==="new-moment"&&(a.momentComposerOpen=!0,u()),o==="close-moment-composer"&&(a.momentComposerOpen=!1,u()),o==="publish-moment"){const n=(document.getElementById("moment-content-input")?.value||a.momentComposerText||"").trim();if(!n){a.toast="朋友圈内容还没写",u(),window.setTimeout(()=>{a.toast="",u()},1100);return}a.moments.unshift({id:`p${Date.now()}`,contactId:"me",time:new Date().toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",hour12:!1}),mood:"日常",content:n,likes:[],comments:[],image:a.momentComposerImage||"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80"}),a.currentTab="moments",a.currentView="moments",a.momentComposerOpen=!1,a.momentComposerText="",a.momentComposerImage="",a.momentComposerImageName="",a.toast="已发布朋友圈",$(120),u(),window.setTimeout(()=>{a.toast="",u()},1100)}if(o==="remove-moment-image"&&(a.momentComposerImage="",a.momentComposerImageName="",u()),o==="new-contact"&&(a.newContactDraft=it(),a.newContactAvatar="",a.currentView="newContact",u()),o==="pick-new-contact-avatar"){document.getElementById("nc-avatar-file")?.click();return}if(o==="save-new-contact"){a.newContactDraft={...a.newContactDraft||{},name:document.getElementById("nc-name")?.value?.trim()||a.newContactDraft?.name||"",agentId:document.getElementById("nc-agent-id")?.value?.trim()||a.newContactDraft?.agentId||"",bio:document.getElementById("nc-bio")?.value?.trim()||a.newContactDraft?.bio||""};const n=String(a.newContactDraft.name||"").trim(),r=ke(a.newContactDraft.agentId),i=String(a.newContactDraft.bio||"").trim(),s=a.newContactDraft.avatar||a.newContactAvatar||"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80";if(!n){a.toast="请填写联系人昵称",u(),window.setTimeout(()=>{a.toast="",u()},1200);return}if(r&&!/^[a-z0-9_-]+$/.test(r)){a.toast="Agent ID 只能用小写字母、数字、下划线或短横线",u(),window.setTimeout(()=>{a.toast="",u()},1500);return}if(r&&a.contacts.some(m=>String(m.id||"").toLowerCase()===r)){a.toast="这个 Agent ID 已经存在",u(),window.setTimeout(()=>{a.toast="",u()},1400);return}const c=r||"c"+Date.now(),d=qa({id:c,name:n,bio:i||"这是新来的联系人",status:"在线",handle:"@"+c,unread:0,pinned:!1,lastMessage:"",lastTime:"",avatar:s,settings:{model:"gpt-5.4",modelProviderId:A("chat")?.providerId||"openai",temperature:.7,topP:.9,contextCount:32,thinkBudget:24,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!1,proactiveFrequency:30,memoryEnabled:!0},topics:[],messages:[]}),p=await nn(d);se(),Ie(100),a.newContactDraft=it(),a.newContactAvatar="",a.toast=p?"已添加联系人":"已本地添加，后端登记失败",a.currentView="list",u(),window.setTimeout(()=>{a.toast="",u()},p?1200:1800)}if(o==="open-contact-avatar"){document.getElementById("contact-avatar-file")?.click();return}if(o==="open-contact-name"){const n=g(a.currentContactId);if(!n)return;const r=window.prompt("请输入昵称",n.name||"")?.trim();if(!r)return;n.name=r,a.toast="昵称已更新",u(),$(120),window.setTimeout(()=>{a.toast="",u()},1200);return}if(o==="open-contact-bio"){const n=g(a.currentContactId);if(!n)return;const r=window.prompt("请输入简介",n.bio||"")?.trim();if(typeof r!="string"||!r)return;n.bio=r,a.toast="简介已更新",u(),$(120),window.setTimeout(()=>{a.toast="",u()},1200);return}if(o==="open-contact-impression"){a._prevContactSettingsTab=a.currentSettingsTab,a.currentView="contactImpressionDetail",u(),ce(a.currentContactId);return}if(o==="open-contact-relationship"){a._prevContactSettingsTab=a.currentSettingsTab,a.currentView="contactRelationshipDetail",u(),ce(a.currentContactId);return}if(o==="open-contact-likes"){a._prevContactSettingsTab=a.currentSettingsTab,a.currentView="contactLikesDetail",u(),ce(a.currentContactId);return}if(o==="save-insight-field"){const n=t.dataset.field,r=document.querySelector(`.insight-editor-textarea[data-field="${n}"]`);r&&oi(n,r.value);return}if(o==="open-contact-room-background"){a._prevContactSettingsTab=a.currentSettingsTab,a.currentView="contactRoomBackgroundPicker",u();return}if(o==="open-contact-bubble-theme"){a._prevContactSettingsTab=a.currentSettingsTab,a.currentView="contactBubbleThemePicker",u();return}if(o==="delete-contact"){const n=g(a.currentContactId);if(!n||!window.confirm(`确定删除“${n.name}”吗？

会删除联系人及其陪伴状态。
会清理相关主动消息。
聊天记录和记忆不会立即永久删除。`))return;try{await tn(n.id),en(n.id),a.toast="联系人已删除",u(),$(120),window.setTimeout(()=>{a.toast="",u()},1400)}catch(i){console.warn("[contact] delete failed",i),a.toast="删除失败",u(),window.setTimeout(()=>{a.toast="",u()},1400)}return}if(o==="pick-contact-room-background"){const n=String(t.dataset.value||"").trim();if(!n)return;Ho("roomBackground",n,"聊天背景已更新"),a.currentView="contactSettings",a.currentSettingsTab="basic",u();return}if(o==="pick-contact-bubble-theme"){const n=_t(t.dataset.value),r=g(a.currentContactId);if(!r||!n)return;r.chatTheme=n,r.bubbleTheme=Ct(n),r.theme=Ra(n),a.toast="气泡主题已更新",a.currentView="contactSettings",a.currentSettingsTab="basic",u(),$(120),window.setTimeout(()=>{a.toast="",u()},1200);return}if(o==="open-companion-state"){a._prevContactSettingsTab=a.currentSettingsTab,a.currentView="companionStateDetail",ce(a.currentContactId),u();return}if(o==="expand-actions"){a.showAttach=!a.showAttach,u();return}if(o==="remove-chat-attachment"){const n=t.dataset.id;a.chatAttachments=(a.chatAttachments||[]).filter(r=>r.id!==n),u();return}if(o==="clear-quote"&&(a.quoteMomentId=null,a.quoteMessageId=null,u()),o==="toggle-global"){const n=t.dataset.key;a.globalSettings[n]=!a.globalSettings[n],Ea(t,a.globalSettings[n]),D();return}if(o==="toggle-contact"){const n=g(a.currentContactId),r=t.dataset.key,s=S()?.querySelector(".chat-app-body")?.scrollTop??0;n.settings[r]=!n.settings[r],u(),Dt(s)}if(o==="back-home"&&(a.currentView==="list"?typeof window.closePage=="function"&&window.closePage("page-chat"):(a.currentTab="chats",a.currentView="list",u())),o==="switch-settings-tab"&&(a.currentSettingsTab=t.dataset.tab,a.contactQuickActionEditorId="",a.quickActionSwipeOpenId="",a.quickActionDropHintId="",a.quickActionDropDirection="",a.quickActionReorderPulseId="",a.currentSettingsTab!=="model"&&(a.contactModelAdvancedOpen=!1),u(),a.currentSettingsTab==="memory"&&ce(),a.currentSettingsTab==="model"&&Ze(a.currentContactId)),o==="toggle-contact-advanced"){a.contactModelAdvancedOpen=!a.contactModelAdvancedOpen,u();return}if(o==="toggle-codex-mode"){mt(t.dataset.contactId);return}if(o==="toggle-cc-mode"){co(t.dataset.contactId);return}if(o==="quick-action"){const n=t.dataset.id,r=S()?.querySelector(".chat-input"),i=qt(H()).find(c=>c.id===n),s={health:"帮我记一下健康相关的事情",schedule:"帮我看看接下来的日程",weather:"帮我查一下今天的天气",files:"帮我找一下刚才提到的文件",quote:"引用上一条消息继续聊",more:"打开更多快捷操作",get_current_time:"现在几点了？",get_weather:"帮我查一下今天天气",get_health_summary:"帮我总结一下今天的健康数据",web_search:"帮我搜索这个问题",fetch_url:"帮我解析这个网页",add_todo:"帮我记一个待办",list_todos:"帮我看看待办清单",complete_todo:"把这个待办标记完成",add_note:"帮我记一条便签",list_notes:"帮我看看最近便签"};r&&(r.value=i?.prompt||s[i?.mcpToolId||n]||s[n]||`${i?.label||""}`.trim())}if(o==="fake-send"){if(a.streamingAbortController){a.streamingAbortController.abort(),a.streamingAbortController=null,u();return}a.currentView==="rpRoom"?br():ct(g(a.currentContactId))?ra():st(g(a.currentContactId))?ia():sa()}if(o==="reroll-msg"&&hr(t.dataset.id),o==="quote-msg"){const n=t.dataset.id;if(g(a.currentContactId)?.messages?.find(s=>s.id===n)?.text){a.quoteMomentId=null,a.quoteMessageId=n,u();const s=S()?.querySelector(".chat-input");s&&s.focus()}}if(o==="attach-option"){a.showAttach=!1;const n=t.dataset.label||"";if(n==="图片"||n==="拍照"){u(),requestAnimationFrame(()=>S()?.querySelector("#chat-image-input")?.click());return}a.toast=`${n} 功能稍后补上`,u(),window.setTimeout(()=>{a.toast="",u()},1200)}}function Zn(e){const t=e.target;if(t?.dataset?.action==="avatar-cropper-range"){const o=a.avatarCropper;if(!o)return;const n=t.dataset.key;o[n]=n==="zoom"?Fe(t.value):J(t.value),za();return}if((t?.id==="nc-name"||t?.id==="nc-agent-id"||t?.id==="nc-bio")&&(a.newContactDraft={...a.newContactDraft||{},...t.id==="nc-name"?{name:t.value||""}:{},...t.id==="nc-agent-id"?{agentId:t.value||""}:{},...t.id==="nc-bio"?{bio:t.value||""}:{}}),t.dataset.action==="slide-contact"){const o=g(a.currentContactId),n=t.dataset.key,r=Number(t.value);o.settings[n]=Number.isInteger(o.settings[n])?Math.round(r):r;const s=t.closest(".slider-row-block")?.querySelector(".slider-value");s&&(s.textContent=Number.isInteger(Number(t.step))||Number(t.step)>=1?String(Math.round(r)):r.toFixed(Number(t.step)===.01?2:1))}t.dataset.action==="moment-composer-input"&&(a.momentComposerText=t.value||"")}document.addEventListener("DOMContentLoaded",()=>{lr(),Aa(),io().finally(async()=>{await gr(),or(),await Ga({silent:!0})})});const y=window.__YUI_API_BASE__||(/^(localhost|127\.0\.0\.1)$/.test(location.hostname)?"":"https://api.somni-ref.top"),ft="murmur_local_state_v1",Ha="murmur_sync_meta_v1",ja="murmur_device_id_v1",Fa=new Set(at.map(e=>e.id)),Ua=new Set(ba.map(e=>e.id));let Kt=null,Qt=null,gt=!1,Ue=!1,Ka=null,Yt=!1,bt="",Xt=null,Gt=null;function Jt(){try{const e=localStorage.getItem(ja);if(e)return e;const t=`dev_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;return localStorage.setItem(ja,t),t}catch{return`dev_fallback_${Date.now()}`}}function Ke(){try{const e=localStorage.getItem(Ha),t=e?JSON.parse(e):{};return{last_server_updated_at:t?.last_server_updated_at||"",pending:!!t?.pending}}catch{return{last_server_updated_at:"",pending:!1}}}function Re(e={}){try{localStorage.setItem(Ha,JSON.stringify({last_server_updated_at:e.last_server_updated_at||"",pending:!!e.pending}))}catch{}}function er(){return X(),a.currentRpRoomId&&Array.isArray(a.currentRpMessages)&&(a.rpMessages={...a.rpMessages||{},[a.currentRpRoomId]:a.currentRpMessages.map(W)}),Zt({contacts:a.contacts,moments:a.moments,actions:a.actions,globalSettings:a.globalSettings,accountProfile:a.accountProfile,conversations:a.conversations,rpRooms:a.rpRooms,rpMessages:a.rpMessages})}function V(e){try{return JSON.stringify(e)}catch{return""}}function de(e){const t=String(e||"").trim();if(!t)return 0;const o=Date.parse(t);return Number.isFinite(o)?o:0}function W(e={}){const t=String(e.role||e.from||"").toLowerCase()==="user"||e.from==="me"?"user":"ai",o=String(e.content??e.text??""),n=String(e.created_at||e.timestamp||""),r=String(e.time||""),i=[String(e.agent_id||""),t,n||r,o].join("|");return{id:String(e.id||i||`${t}_${Date.now()}_${Math.random().toString(36).slice(2,6)}`),session_id:String(e.session_id||""),agent_id:String(e.agent_id||""),role:t,content:o,text:o,created_at:n,time:r,...e.model?{model:e.model}:{},...e.source?{source:e.source}:{},...e.provider?{provider:e.provider}:{},...e.attachments?{attachments:e.attachments}:{},...e.thinking?{thinking:e.thinking}:{},...e.toolCalls?{toolCalls:e.toolCalls}:{}}}function Z(e={}){const t=W(e);return{...t,text:t.content,time:t.time||(t.created_at?re(t.created_at,{fallback:""}):"")}}function Ve(e={}){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).map(([t,o])=>[String(t),Array.isArray(o)?o.map(W):[]]))}function Be(e=[],t=[]){const o=new Map;return[...e,...t].forEach(n=>{const r=W(n),i=o.get(r.id);(!i||de(r.created_at)>=de(i.created_at))&&o.set(r.id,{...i,...r})}),[...o.values()].sort((n,r)=>{const i=de(n.created_at),s=de(r.created_at);return i||s?i-s:String(n.id).localeCompare(String(r.id))})}function Qa(e={},t={}){const o=Ve(e),n=Ve(t);return Object.entries(n).forEach(([r,i])=>{o[r]=Be(o[r]||[],i)}),o}function X(){const e=Ve(a.conversations);(a.contacts||[]).forEach(t=>{if(!t?.id)return;const o=Array.isArray(t.messages)?t.messages:[];(o.length||e[t.id]?.length)&&(e[t.id]=Be(e[t.id]||[],o),t.messages=e[t.id].map(Z))}),a.conversations=e}function Qe(){const e=Ve(a.conversations);a.contacts=(a.contacts||[]).map(t=>{const n=(e[t.id]||(Array.isArray(t.messages)?t.messages.map(W):[])).map(Z),r=n[n.length-1];return{...t,messages:n,lastMessage:r?.text||t.lastMessage||"",lastTime:r?.time||t.lastTime||""}}),a.conversations=e}function ht(e=[],t=[]){const o=new Map;return e.map(j).forEach(n=>o.set(n.id.toLowerCase(),n)),t.map(j).forEach(n=>{const r=n.id.toLowerCase(),i=o.get(r);if(!i){o.set(r,n);return}const s=Be(i.messages||[],n.messages||[]),c={...n,...i,id:i.id||n.id,agent_id:i.agent_id||n.agent_id||i.id||n.id,name:i.name||n.name,display_name:i.display_name||i.name||n.display_name||n.name,bio:i.bio||n.bio,status:i.status||n.status,handle:i.handle||n.handle,roleTag:i.roleTag||n.roleTag,avatar:i.avatar||n.avatar,settings:{...n.settings||{},...i.settings||{}},messages:s.map(Z),lastMessage:i.lastMessage||n.lastMessage||s[s.length-1]?.content||"",lastTime:i.lastTime||n.lastTime||s[s.length-1]?.time||""};o.set(r,c)}),[...o.values()]}function tr(e=[]){for(let t=e.length-1;t>=0;t-=1){const o=String(e[t]?.session_id||"").trim();if(o)return o}return""}function Ye(e={},t=""){const o=String(e.role||"").toLowerCase()==="user"?"user":"ai",n=String(e.created_at||""),r=String(e.content||""),i=String(e.model||"");return W({id:e.id||`${t}|${o}|${n}|${r}`,session_id:e.session_id||"",agent_id:e.agent_id||t,role:o,content:r,text:r,created_at:n,time:n?re(n,{fallback:""}):"",model:i,...i.toLowerCase()==="codex"?{source:"codex",provider:"codex"}:{}})}async function Ya(e,{silent:t=!0}={}){const o=g(e);if(o?.id)try{const n=new URLSearchParams({agent_id:o.id,limit:"200"}),r=await fetch(`${y}/api/murmur/messages?${n.toString()}`);if(!r.ok)throw new Error(`HTTP ${r.status}`);const i=await r.json().catch(()=>({})),s=(Array.isArray(i?.messages)?i.messages:[]).map(b=>Ye(b,o.id)).filter(b=>b.content);if(!s.length)return;const c=V({conversations:a.conversations?.[o.id]||[]}),d=Be(a.conversations?.[o.id]||o.messages||[],s);a.conversations={...a.conversations||{},[o.id]:d},o.messages=d.map(Z);const p=o.messages[o.messages.length-1];p&&(o.lastMessage=p.text||"",o.lastTime=p.time||"");const m=tr(d);m&&(o.sessionId=m),V({conversations:d})!==c&&(se(),Ie(300)),a.currentContactId===o.id&&a.currentView==="room"&&u()}catch(n){t||console.warn("[murmur] history load failed",n)}}function ar(e={}){const t=String(e.agent_id||e.agentId||"").trim(),o=String(e.content||"").trim(),n=String(e.created_at||e.createdAt||new Date().toISOString());return W({id:e.id?`proactive_${e.id}`:`proactive_${t}_${n}_${o}`,agent_id:t,role:"ai",content:o,created_at:n,source:"proactive"})}async function Xa(e){const t=String(e||"").trim();if(t)try{await fetch(`${y}/api/proactive/${encodeURIComponent(t)}/read`,{method:"POST"})}catch(o){console.warn("[proactive] mark read failed",o)}}async function Ga({silent:e=!0}={}){if(!Yt){Yt=!0;try{const t=await fetch(`${y}/api/proactive?limit=20`);if(!t.ok)throw new Error(`HTTP ${t.status}`);const o=await t.json().catch(()=>({})),n=Array.isArray(o?.messages)?o.messages:[];if(!n.length)return;let r=!1;for(const i of n){const s=ar(i),c=s.agent_id||String(i.agent_id||"").trim();if(!c||!s.content){await Xa(i.id);continue}let d=g(c);d||(d=qa({id:c,agent_id:c,name:String(i.agent_name||i.display_name||c),handle:`@${c}`,messages:[]}));const p=(a.conversations?.[d.id]||d.messages||[]).length,m=Be(a.conversations?.[d.id]||d.messages||[],[s]);a.conversations={...a.conversations||{},[d.id]:m},d.messages=m.map(Z);const b=d.messages[d.messages.length-1];b&&(d.lastMessage=b.text||"",d.lastTime=b.time||""),m.length>p&&!(a.currentView==="room"&&a.currentContactId===d.id)&&(d.unread=Number(d.unread||0)+1),r=!0,await Xa(i.id)}r&&(Qe(),se(),u(),a.currentView==="room"&&B())}catch(t){e||console.warn("[proactive] poll failed",t)}finally{Yt=!1}}}function or(){Ka||(Ka=window.setInterval(()=>{Ga({silent:!0})},15e3))}function Ja(e=[],t=[]){const o=new Map;return e.map(E).forEach(n=>o.set(n.id,n)),t.map(E).forEach(n=>{const r=o.get(n.id);if(!r){o.set(n.id,n);return}const i=de(n.updated_at||n.created_at||n.time),s=de(r.updated_at||r.created_at||r.time);o.set(n.id,i>s?{...r,...n}:{...n,...r})}),[...o.values()].sort((n,r)=>de(r.updated_at||r.created_at||r.time)-de(n.updated_at||n.created_at||n.time))}function nr(e=[],t=[],o="id"){const n=new Map;return[...e||[],...t||[]].forEach(r=>{if(!r||typeof r!="object")return;const i=String(r[o]||r.id||"").trim();i&&n.set(i,{...n.get(i)||{},...r})}),[...n.values()]}const rr="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80";function Wa(e){return!e||String(e)===rr}function ir(e={},t={}){const o={...e||{},...t||{}};return!Wa(e?.avatar)&&Wa(t?.avatar)&&(o.avatar=e.avatar),o}function se(){const e=er(),t=V(e);if(!t||t===bt)return!1;bt=t;try{return localStorage.setItem(ft,JSON.stringify({client_updated_at:new Date().toISOString(),payload:e})),!0}catch{return!1}}function Za(){return Xt||(Xt=new Map(at.map(e=>{const t=j(e);return[t.id,V(t)]}))),Xt}function eo(){return Gt||(Gt=new Map(ba.map(e=>{const t=E(e);return[t.id,V(t)]}))),Gt}function to(e){if(!Array.isArray(e))return!1;const t=Za();return e.some(o=>{const n=j(o);return!Fa.has(n.id)||t.get(n.id)!==V(n)})}function Wt(e){if(!e||typeof e!="object")return!1;const t=String(e.id||e.agent_id||"").trim().toLowerCase();if(!Fa.has(t))return!1;const o=Za(),n=j({...e,id:t});if(o.get(t)===V(n))return!0;const r=String(e.avatar||"").trim(),i=Array.isArray(e.topics)?e.topics.map(c=>String(c?.id||"")):[],s=Array.isArray(e.messages)?e.messages.map(c=>String(c?.id||"")):[];return t==="ayan"?r.includes("photo-1517841905240-472988babdf9")||s.some(c=>["m1","m2","m3"].includes(c))||i.some(c=>["t1","t2","t3"].includes(c)):t==="azheng"?r.includes("photo-1500530855697-b586d89ba3ee")||s.includes("m4")||i.some(c=>["t4","t5"].includes(c)):t==="xiaoying"?r.includes("photo-1507525428034-b723cf961d3e")||s.includes("m5")||i.includes("t6"):!1}function ao(e){return Array.isArray(e)?e.filter(t=>!Wt(t)):[]}function sr(e){return Array.isArray(e)&&e.length>0&&e.every(t=>Wt(t))}function Zt(e={}){if(!e||typeof e!="object")return{};const t={...e};return Array.isArray(t.contacts)&&(t.contacts=ao(t.contacts).map(o=>j(o))),t.conversations&&typeof t.conversations=="object"&&(t.conversations=Ve(t.conversations)),t.rpMessages&&typeof t.rpMessages=="object"&&(t.rpMessages=Ve(t.rpMessages)),Array.isArray(t.moments)&&(t.moments=vt(t.moments).map(E)),t}function cr(e){if(!Array.isArray(e))return!1;const t=eo();return e.some(o=>{const n=E(o);return!Ua.has(n.id)||t.get(n.id)!==V(n)})}function oo(e){if(!e||typeof e!="object")return!1;const t=String(e.id||"").trim();if(!Ua.has(t))return!1;const o=eo(),n=E(e);return o.get(t)===V(n)?!0:t==="p0"?String(e.image||"").includes("photo-1507525428034-b723cf961d3e")||String(e.content||"").includes("天空很温柔"):t==="p1"?String(e.content||"").includes("醉了先看这个"):t==="p2"?String(e.content||"").includes("晚上跑了三公里"):!1}function vt(e){return Array.isArray(e)?e.filter(t=>!oo(t)):[]}function ur(e){return Array.isArray(e)&&e.length>0&&e.every(t=>oo(t))}function no(e,{source:t="local"}={}){if(!(!e||typeof e!="object")){if(Array.isArray(e.contacts)){const o=e.contacts.map(i=>j(i)),n=ao(o).map(i=>j(i)),r=to(a.contacts);n.length?(a.contacts=ht(a.contacts,n),g(a.currentContactId)||(a.currentContactId=a.contacts[0]?.id||"")):sr(o)?(r||(a.contacts=[]),g(a.currentContactId)||(a.currentContactId=a.contacts[0]?.id||""),console.warn(`[sync] ignored ${t} default mock contacts`)):r?a.contacts=a.contacts.map(i=>j(i)):(a.contacts=[],a.currentContactId="")}else a.contacts=a.contacts.map(o=>j(o));if(e.conversations&&typeof e.conversations=="object"?(a.conversations=Qa(a.conversations,e.conversations),Qe()):X(),Array.isArray(e.moments)){const o=e.moments.map(E),n=vt(o).map(E),r=cr(a.moments);n.length?a.moments=Ja(vt(a.moments),n):ur(o)?(r||(a.moments=[]),console.warn(`[sync] ignored ${t} default mock moments`)):r?a.moments=vt(a.moments).map(E):a.moments=[]}Array.isArray(e.rpRooms)&&(a.rpRooms=nr(a.rpRooms||[],e.rpRooms||[],"room_id")),e.rpMessages&&typeof e.rpMessages=="object"&&(a.rpMessages=Qa(a.rpMessages,e.rpMessages)),Array.isArray(e.actions)&&(a.actions=e.actions),e.globalSettings&&typeof e.globalSettings=="object"&&(a.globalSettings={...a.globalSettings,...e.globalSettings}),e.accountProfile&&typeof e.accountProfile=="object"&&(a.accountProfile=ir(a.accountProfile,e.accountProfile)),R(),yt()}}function lr(){try{const e=localStorage.getItem(ft);if(!e)return;const t=JSON.parse(e);if(!t?.payload)return;no(t.payload,{source:"local"});const o=Zt(t.payload);bt=V(o),V(t.payload)!==bt&&localStorage.setItem(ft,JSON.stringify({client_updated_at:t.client_updated_at||new Date().toISOString(),payload:o}))}catch{}}function Ie(e=600){if(Ue)return;const t=Ke();Re({...t,pending:!0}),Kt&&clearTimeout(Kt),Kt=window.setTimeout(()=>{ro()},e)}async function ro(){if(gt||Ue)return;const e=Ke();if(!e.pending)return;let t=null;try{t=JSON.parse(localStorage.getItem(ft)||"null")}catch{}if(!t?.payload){Re({...e,pending:!1});return}const o=Zt(t.payload);gt=!0;try{const n=await fetch(`${y}/api/sync/push`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({device_id:Jt(),client_updated_at:t.client_updated_at||new Date().toISOString(),payload:o})});if(!n.ok)throw new Error(`HTTP ${n.status}`);const r=await n.json().catch(()=>({}));Re({last_server_updated_at:r.server_updated_at||e.last_server_updated_at||"",pending:!1})}catch(n){console.warn("[sync] push failed",n),Re({...e,pending:!0})}finally{gt=!1}}async function io(){if(gt)return;const e=Ke();if(e.pending&&(await ro(),Ke().pending))return;const t=new URLSearchParams({device_id:Jt()});e.last_server_updated_at&&t.set("since",e.last_server_updated_at);try{const o=await fetch(`${y}/api/sync/pull?${t.toString()}`);if(!o.ok)return;const n=await o.json().catch(()=>({})),r=to(a.contacts);if(!n?.has_update||!n?.payload||n?.is_self&&r){n?.server_updated_at&&Re({...e,last_server_updated_at:n.server_updated_at,pending:e.pending});return}Ue=!0,no(n.payload,{source:"remote"}),se(),Re({last_server_updated_at:n.server_updated_at||e.last_server_updated_at||"",pending:!1}),u()}catch(o){console.warn("[sync] pull failed",o)}finally{Ue=!1}}function dr(e={}){const t=ke(e.agent_id||e.id);if(!t)return null;const o=String(e.display_name||e.name||t).trim()||t;return j({id:t,agent_id:t,name:o,display_name:o,bio:String(e.description||e.subtitle||"").trim(),status:"在线",handle:String(e.display_handle||`@${t}`),roleTag:String(e.source||"agent"),avatar:String(e.avatar||"").trim(),pinned:!1,unread:0,lastMessage:"",lastTime:"",topics:[],messages:[]})}function so(e={}){const t=ke(e.agent_id||e.id);if(!t)return null;const o=at.find(i=>String(i.id||"").toLowerCase()===t),n=String(e.last_message_at||""),r=String(e.last_message||"").trim();return j({id:t,agent_id:t,name:String(o?.name||e.display_name||e.name||t).trim()||t,display_name:String(o?.name||e.display_name||e.name||t).trim()||t,bio:"",status:"在线",handle:`@${t}`,roleTag:"recovered",avatar:"",pinned:!1,unread:0,lastMessage:r,lastTime:n?re(n,{fallback:""}):"",sessionId:String(e.session_id||""),messageCount:Number(e.message_count||0)||0,topics:[],messages:[]})}async function pr({silent:e=!0}={}){try{const t=await fetch(`${y}/api/agents?include_inactive=true`);if(!t.ok)throw new Error(`HTTP ${t.status}`);const o=await t.json().catch(()=>({})),n=(Array.isArray(o?.agents)?o.agents:[]).filter(i=>i?.is_active!==!1).map(dr).filter(Boolean).filter(i=>!Wt(i));if(console.info("[agents] loaded",n.map(i=>({id:i.id,name:i.name,source:i.roleTag||""}))),!n.length)return;const r=V({contacts:a.contacts});a.contacts=ht(a.contacts,n),Qe(),(!a.currentContactId||!a.contacts.some(i=>i.id===a.currentContactId))&&(a.currentContactId=a.contacts[0]?.id||""),V({contacts:a.contacts})!==r&&(se(),Ie(100)),u()}catch(t){e||console.warn("[agents] load contacts failed",t)}}async function mr({silent:e=!0}={}){try{const t=await fetch(`${y}/api/murmur/message-agents?limit=1000`);if(t.status===404){await fr({silent:e});return}if(!t.ok)throw new Error(`HTTP ${t.status}`);const o=await t.json().catch(()=>({})),n=(Array.isArray(o?.agents)?o.agents:[]).map(so).filter(Boolean);if(console.info("[murmur] message agents loaded",n.map(i=>({id:i.id,lastMessage:i.lastMessage,count:i.messageCount||0}))),!n.length)return;const r=V({contacts:a.contacts});a.contacts=ht(a.contacts,n),Qe(),(!a.currentContactId||!a.contacts.some(i=>i.id===a.currentContactId))&&(a.currentContactId=a.contacts[0]?.id||""),V({contacts:a.contacts})!==r&&(se(),Ie(100)),u()}catch(t){e||console.warn("[murmur] load message agents failed",t)}}async function fr({silent:e=!0}={}){const t=Array.from(new Set([...at.map(i=>ke(i.id)).filter(Boolean),...a.contacts.map(i=>ke(i.id)).filter(Boolean)])),o=[];for(const i of t)if(i)try{const s=new URLSearchParams({agent_id:i,limit:"1"}),c=await fetch(`${y}/api/murmur/messages?${s.toString()}`);if(!c.ok)continue;const d=await c.json().catch(()=>({})),p=Array.isArray(d?.messages)?d.messages:[];if(!p.length)continue;const m=p[p.length-1]||{};o.push(so({agent_id:i,last_message:m.content||"",last_message_at:m.created_at||"",message_count:p.length,session_id:m.session_id||""}))}catch(s){e||console.warn("[murmur] message probe failed",i,s)}const n=o.filter(Boolean);if(console.info("[murmur] message agents probed",n.map(i=>({id:i.id,lastMessage:i.lastMessage,count:i.messageCount||0}))),!n.length)return;const r=V({contacts:a.contacts});a.contacts=ht(a.contacts,n),Qe(),(!a.currentContactId||!a.contacts.some(i=>i.id===a.currentContactId))&&(a.currentContactId=a.contacts[0]?.id||""),V({contacts:a.contacts})!==r&&(se(),Ie(100)),u()}async function gr(){await pr(),await mr()}function $(e=800){Ue||(Qt&&clearTimeout(Qt),Qt=window.setTimeout(()=>{se()&&Ie(500)},e))}function P(){const e=new Date;return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`}function ea(e){const t=e?.settings?.modelProviderId||A("chat")?.providerId||"",o=U(t);if(!o?.baseUrl||!o?.apiKey)return{};const n=Xe(o.apiPath||o.api_path||"",{allowEmpty:!0});return{base_url:o.baseUrl,api_key:o.apiKey,...n?{api_path:n}:{}}}function ta(e){const t=e?.settings||{},o=Number(t.temperature);return Number.isFinite(o)?{temperature:o}:{}}function aa(e,t=""){let o="",n="";try{const s=JSON.parse(e),c=/^(thinking|reasoning|reason|thought|cot|inner_thought)$/i.test(t),d=/^(chat|message|content|text|assistant|reply|response|output)$/i.test(t);c||(o=s.content??s.text??s.delta??""),n=s.thinking??s.reasoning??s.reasoning_content??s.reasoningContent??""}catch{/^(thinking|reasoning|reason|thought|cot|inner_thought)$/i.test(t)?n=e:o=e}const r=/^tool_call$/i.test(t);let i=null;if(r)try{const s=JSON.parse(e);s.name&&(i={name:String(s.name),status:String(s.status||"done")})}catch{}return{text:ye(o),thinking:ye(n),toolCall:i}}async function oa(e){const t=String(e?.sessionId||"").trim();if(t){try{const i=await fetch(`${y}/api/sessions/${encodeURIComponent(t)}`);if(i.ok)return t;if(i.status!==404)throw new Error(`校验会话失败（HTTP ${i.status}）`)}catch(i){throw String(i?.message||"").includes("HTTP"),i}e.sessionId=""}const o=await fetch(`${y}/api/sessions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:String(e?.name||"新对话").trim()||"新对话",model:String(e?.settings?.model||a.globalSettings?.defaultModel||"echo").trim()||"echo",source_app:"yui_nook"})}),n=await o.json().catch(()=>({}));if(!o.ok)throw new Error(n.detail||`创建会话失败（HTTP ${o.status}）`);const r=String(n?.session?.id||"").trim();if(!r)throw new Error("创建会话失败：后端没有返回 session.id");return e.sessionId=r,$(120),r}async function na(e,t,o,n="/api/chat"){let r=await fetch(`${y}${n}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify(t),...o?{signal:o}:{}});if(r.ok)return r;let i="";try{const s=await r.json();i=String(s?.detail||"").trim()}catch{}if(n==="/api/chat"&&r.status===404&&i.includes("会话不存在")){e.sessionId="";const s=await oa(e);if(t.session_id=s,r=await fetch(`${y}${n}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify(t),...o?{signal:o}:{}}),r.ok)return r}throw new Error(`HTTP ${r.status}`)}async function br(){const e=S()?.querySelector(".chat-input"),t=e?.value?.trim();if(!t||!a.currentRpRoomId)return;const o=g(a.currentContactId)||a.contacts[0],n=Vt();if(!o||!n)return;const r=!!o?.settings?.reasoning_visibility,i="rp_u"+Date.now();a.currentRpMessages.push({id:i,role:"user",text:t,content:t,time:P(),timestamp:new Date().toISOString(),created_at:new Date().toISOString()}),e.value="";const s="rp_ai_"+Date.now();a.currentRpMessages.push({id:s,role:"ai",text:"",content:"",time:"",created_at:new Date().toISOString(),typing:!0}),a.currentRpRoomId&&(a.rpMessages[a.currentRpRoomId]=a.currentRpMessages.map(W)),$(120),u(),B();const c={room_id:a.currentRpRoomId,agent_id:n.agent_id||o.id,content:t,...o.persona?{persona:o.persona}:{},...o.settings.model?{model:o.settings.model}:{},...ta(o),...ea(o)},d=new AbortController;a.streamingAbortController=d,u();try{const p=await na(o,c,d.signal,"/api/rp/chat"),m=()=>a.currentRpMessages.findIndex(_=>_.id===s);a.currentRpMessages[m()]={id:s,role:"ai",text:"",time:P(),typing:!1,streaming:!0},u();const b=p.body.getReader(),w=new TextDecoder;let h="",I="",M="",T="";for(;;){const{done:_,value:x}=await b.read();if(_)break;h+=w.decode(x,{stream:!0});const O=h.split(`
`);h=O.pop()??"";for(const ee of O){const te=ee.trim();if(!te){T="";continue}if(te.startsWith("event:")){T=te.slice(6).trim();continue}if(!te.startsWith("data:"))continue;const pe=te.slice(5).trim();if(pe==="[DONE]")continue;const Q=aa(pe,T);let ae=Q.text;const ue=At(Q.thinking,I,M),me=r?ue:"";me&&M.length<xt&&(M=Tt(M,me)),ae&&(I+=ae);const fe=m();fe!==-1&&(a.currentRpMessages[fe]={id:s,role:"ai",text:I,...r&&M?{thinking:M}:{},time:P(),typing:!1,streaming:!0},u(),B())}}const k=a.currentRpMessages.findIndex(_=>_.id===s);k!==-1&&(a.currentRpMessages[k]={...a.currentRpMessages[k],text:I||"…",content:I||"…",...r&&M?{thinking:M}:{},streaming:!1,typing:!1,time:P(),created_at:new Date().toISOString()}),a.streamingAbortController=null,await ut(n.agent_id||o.id,{silent:!0}),a.currentRpRoomId&&(a.rpMessages[a.currentRpRoomId]=a.currentRpMessages.map(W)),$(120),u(),B()}catch(p){const m=a.currentRpMessages.findIndex(b=>b.id===s);m!==-1&&(a.currentRpMessages[m]={id:s,role:"ai",text:p.name==="AbortError"?"…":"杩炴帴澶辫触锛?{err.message}",content:p.name==="AbortError"?"…":"杩炴帴澶辫触锛?{err.message}",time:P(),created_at:new Date().toISOString(),typing:!1}),a.streamingAbortController=null,a.currentRpRoomId&&(a.rpMessages[a.currentRpRoomId]=a.currentRpMessages.map(W)),$(120),u()}}function co(e=a.currentContactId){const t=g(e)||g(a.currentContactId);if(t){if(a.currentContactId=t.id,!zt(t)){t.settings={...t.settings||{},ccEnabled:!1},a.toast="只有阿筝能切 Claude Code",u(),window.setTimeout(()=>{a.toast="",u()},1200);return}t.settings={...t.settings||{},ccEnabled:!t.settings?.ccEnabled},a.toast=t.settings.ccEnabled?"Claude Code 已接管这个窗口":"Claude Code 已关闭",$(120),u(),window.setTimeout(()=>{a.toast="",u()},1200)}}async function ra(){const e=S()?.querySelector(".chat-input"),t=e?.value?.trim();if(!t)return;const o=g(a.currentContactId);if(!o)return;qe();const n="u"+Date.now();o.messages.push({id:n,role:"user",text:t,content:t,time:P(),created_at:new Date().toISOString()}),o.lastMessage=t,o.lastTime="刚刚",e.value="";const r="ai_"+Date.now();o.messages.push({id:r,role:"ai",text:"",content:"",time:"",created_at:new Date().toISOString(),typing:!0,source:"claude-code"}),X(),$(120),u(),B();const i=new AbortController;a.streamingAbortController=i,u();try{const s=await fetch(`${y}/api/claude-code/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversation_key:`yui:${o.id}`,agent_id:o.id,content:t,reset:!1}),signal:i.signal}),c=await s.json().catch(()=>({}));if(!s.ok)throw new Error(c.detail||`HTTP ${s.status}`);const d=String(c.reply||"").trim()||"…",p=c.user_message&&typeof c.user_message=="object"?Ye(c.user_message,o.id):null,m=c.assistant_message&&typeof c.assistant_message=="object"?{...Ye(c.assistant_message,o.id),source:"claude-code",provider:"claude-code"}:null,b=o.messages.findIndex(h=>h.id===n);b!==-1&&p&&(o.messages[b]=Z(p));const w=o.messages.findIndex(h=>h.id===r);w!==-1&&(o.messages[w]={...m?Z(m):{},id:m?.id||r,role:"ai",text:d,content:d,source:"claude-code",provider:"claude-code",time:m?.time||P(),created_at:m?.created_at||new Date().toISOString(),typing:!1}),o.lastMessage=d,o.lastTime=P(),X(),$(120),u(),B()}catch(s){const c=s.name==="AbortError";c||console.error("[cc chat] error:",s);const d=o.messages.findIndex(p=>p.id===r);if(d!==-1){const p=c?"…":`Claude Code 连接失败：${s.message}`;o.messages[d]={id:r,role:"ai",text:p,content:p,source:"claude-code",provider:"claude-code",time:P(),created_at:new Date().toISOString(),typing:!1}}X(),$(120),u()}finally{a.streamingAbortController=null,u()}}async function ia(){const e=S()?.querySelector(".chat-input"),t=e?.value?.trim();if(!t)return;const o=g(a.currentContactId);if(!o)return;qe();const n="u"+Date.now();o.messages.push({id:n,role:"user",text:t,content:t,time:P(),created_at:new Date().toISOString()}),o.lastMessage=t,o.lastTime="刚刚",e.value="";const r="ai_"+Date.now();o.messages.push({id:r,role:"ai",text:"",content:"",time:"",created_at:new Date().toISOString(),typing:!0,source:"codex"}),X(),$(120),u(),B();const i=new AbortController;a.streamingAbortController=i,u();try{const s=await fetch(`${y}/api/codex/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversation_key:`yui:${o.id}`,agent_id:o.id,content:t,reset:!1}),signal:i.signal}),c=await s.json().catch(()=>({}));if(!s.ok)throw new Error(c.detail||`HTTP ${s.status}`);const d=String(c.reply||"").trim()||"…",p=c.user_message&&typeof c.user_message=="object"?Ye(c.user_message,o.id):null,m=c.assistant_message&&typeof c.assistant_message=="object"?{...Ye(c.assistant_message,o.id),source:"codex",provider:"codex"}:null,b=o.messages.findIndex(h=>h.id===n);b!==-1&&p&&(o.messages[b]=Z(p));const w=o.messages.findIndex(h=>h.id===r);w!==-1&&(o.messages[w]={...m?Z(m):{},id:m?.id||r,role:"ai",text:d,content:d,source:"codex",provider:"codex",time:m?.time||P(),created_at:m?.created_at||new Date().toISOString(),typing:!1}),o.lastMessage=d,o.lastTime=P(),X(),$(120),u(),B()}catch(s){const c=s.name==="AbortError";c||console.error("[codex chat] error:",s);const d=o.messages.findIndex(p=>p.id===r);if(d!==-1){const p=c?"…":`Codex 连接失败：${s.message}`;o.messages[d]={id:r,role:"ai",text:p,content:p,source:"codex",provider:"codex",time:P(),created_at:new Date().toISOString(),typing:!1}}X(),$(120),u()}finally{a.streamingAbortController=null,u()}}async function sa(){const e=S()?.querySelector(".chat-input"),t=e?.value?.trim();if(!t)return;const o=g(a.currentContactId);if(!o)return;qe();const n=!!o?.settings?.reasoning_visibility;let r="";try{r=await oa(o)}catch(x){console.error("[session] create failed:",x),a.toast="鏃犳硶鍒涘缓浼氳瘽锛?{err.message}",u(),window.setTimeout(()=>{a.toast="",u()},1500);return}const i="u"+Date.now();o.messages.push({id:i,role:"user",text:t,content:t,time:P(),created_at:new Date().toISOString()}),o.lastMessage=t,o.lastTime="刚刚",e.value="",X(),$(120),u(),B();const s="ai_"+Date.now();o.messages.push({id:s,role:"ai",text:"",content:"",time:"",created_at:new Date().toISOString(),typing:!0}),X(),$(120),u(),B();let c=0,d=!1,p=null;const m=()=>{const x=S()?.querySelector(`#thinking-${s}`);if(!x)return;x.textContent=Et(k),x.classList.add("open","thinking-active"),x.setAttribute("aria-hidden","false");const O=S()?.querySelector(`#cot-wrapper-${s}`);O&&O.removeAttribute("data-slow"),a.openThinkingIds[s]=!0},b=()=>{p===null&&(p=requestAnimationFrame(()=>{p=null,m()}))},w=()=>{p!==null&&(cancelAnimationFrame(p),p=null)},h=setInterval(()=>{if(!c)return;const x=S()?.querySelector(`#cot-wrapper-${s}`);x&&x.toggleAttribute("data-slow",Date.now()-c>8e3)},2e3),I={session_id:r,agent_id:o.id,content:t,...o.persona?{persona:o.persona}:{},...o.settings.model?{model:o.settings.model}:{},...ta(o),...ea(o)},M=new AbortController;a.streamingAbortController=M,u();let T="",k="",_=null;try{const x=await na(o,I,M.signal),O=()=>o.messages.findIndex(ge=>ge.id===s);o.messages[O()]={id:s,role:"ai",text:"",content:"",time:P(),created_at:new Date().toISOString(),typing:!1,streaming:!0},u();const ee=x.body.getReader(),te=new TextDecoder;let pe="",Q="";for(;;){const{done:ge,value:$t}=await ee.read();if(ge)break;pe+=te.decode($t,{stream:!0});const Ne=pe.split(`
`);pe=Ne.pop()??"";let tt=0;for(const Te of Ne){const be=Te.trim();if(!be){Q="";continue}if(be.startsWith("event:")){Q=be.slice(6).trim();continue}if(!be.startsWith("data:"))continue;const Ee=be.slice(5).trim();if(Ee==="[DONE]")continue;const Pe=aa(Ee,Q);let kt=Pe.text;const It=At(Pe.thinking,T,k),oe=n?It:"";if(oe){k.length<xt&&(k=Tt(k,oe)),c=Date.now();const G=O();G!==-1&&(o.messages[G]={id:s,role:"ai",text:T,thinking:k,time:P(),typing:!1,streaming:!0},d?b():(d=!0,a.openThinkingIds[s]=!0,u(),B()))}if(Pe.toolCall){const G=Pe.toolCall;_||(_=[]);const He=_.find(Ao=>Ao.name===G.name&&Ao.status!=="done");He?He.status=G.status:_.push({name:G.name,status:G.status});const he=O();he!==-1&&(o.messages[he]={...o.messages[he],toolCalls:_.slice(),streaming:!0},u())}kt&&(T+=kt),tt+=1,tt>=32&&(tt=0,b(),await wa())}}clearInterval(h),w(),a.streamingAbortController=null;const ae=O(),ue=T||(n&&k?"":"…");o.lastMessage=ue||"已处理",o.lastTime=P();const me=S()?.querySelector(`#thinking-${s}`);me&&me.classList.remove("thinking-active");const fe=S()?.querySelector(`#cot-wrapper-${s}`);fe&&fe.removeAttribute("data-slow"),n&&k&&delete a.openThinkingIds[s];const N=$a(ue);ae!==-1&&N.length>1?(o.messages.splice(ae,1),u(),B(),await Sa(180),await ka(o,N,{startIndex:ae,thinking:n?k:"",toolCalls:_})):(ae!==-1&&(o.messages[ae]={id:s,role:"ai",text:ue,content:ue,...n&&k?{thinking:k}:{},..._?{toolCalls:_}:{},time:P(),created_at:new Date().toISOString(),typing:!1}),X(),$(120),u(),B())}catch(x){clearInterval(h),w(),a.streamingAbortController=null;const O=x.name==="AbortError";O||console.error("[chat SSE] error:",x);const ee=o.messages.findIndex(te=>te.id===s);ee!==-1&&(o.messages[ee]={id:s,role:"ai",text:O?T||"…":`连接失败：${x.message}，请稍后再试。`,content:O?T||"…":`连接失败：${x.message}，请稍后再试。`,...n&&k?{thinking:k}:{},time:P(),created_at:new Date().toISOString(),typing:!1}),O&&T&&(o.lastMessage=T,o.lastTime=P()),X(),$(120),u()}}async function hr(e){const t=g(a.currentContactId);if(!t)return;qe();const o=!!t?.settings?.reasoning_visibility,n=t.messages.findIndex(d=>d.id===e);if(n===-1||t.messages[n].role!=="ai")return;let r="";try{r=await oa(t)}catch(d){console.error("[session] create failed:",d),a.toast=`无法创建会话：${d.message}`,u(),window.setTimeout(()=>{a.toast="",u()},1500);return}t.messages[n]={...t.messages[n],typing:!0,text:"",streaming:!1},u();const i=[...t.messages].reverse().find(d=>d.role==="user");if(!i)return;const s={session_id:r,agent_id:t.id,content:i.text,...t.persona?{persona:t.persona}:{},...t.settings.model?{model:t.settings.model}:{},...ta(t),...ea(t)},c=new AbortController;a.streamingAbortController=c;try{const d=await na(t,s,c.signal);t.messages[n]={...t.messages[n],typing:!1,text:"",streaming:!0},u();const p=d.body.getReader(),m=new TextDecoder;let b="",w="",h="",I=null;const M=e;let T="",k=0,_=!1,x=null;const O=()=>{const N=S()?.querySelector(`#thinking-${M}`);if(!N)return;N.textContent=Et(h),N.classList.add("open","thinking-active"),N.setAttribute("aria-hidden","false");const ge=S()?.querySelector(`#cot-wrapper-${M}`);ge&&ge.removeAttribute("data-slow"),a.openThinkingIds[M]=!0},ee=()=>{x===null&&(x=requestAnimationFrame(()=>{x=null,O()}))},te=()=>{x!==null&&(cancelAnimationFrame(x),x=null)},pe=setInterval(()=>{if(!k)return;const N=S()?.querySelector(`#cot-wrapper-${M}`);N&&N.toggleAttribute("data-slow",Date.now()-k>8e3)},2e3);for(;;){const{done:N,value:ge}=await p.read();if(N)break;b+=m.decode(ge,{stream:!0});const $t=b.split(`
`);b=$t.pop()??"";let Ne=0;for(const tt of $t){const Te=tt.trim();if(!Te){T="";continue}if(Te.startsWith("event:")){T=Te.slice(6).trim();continue}if(!Te.startsWith("data:"))continue;const be=Te.slice(5).trim();if(be==="[DONE]")continue;const Ee=aa(be,T);let Pe=Ee.text;const kt=At(Ee.thinking,w,h),It=o?kt:"";if(It){h.length<xt&&(h=Tt(h,It)),k=Date.now();const oe=t.messages.findIndex(G=>G.id===M);oe!==-1&&(t.messages[oe]={...t.messages[oe],thinking:h,streaming:!0},_?ee():(_=!0,a.openThinkingIds[M]=!0,u()))}if(Ee.toolCall){const oe=Ee.toolCall;I||(I=[]);const G=I.find(he=>he.name===oe.name&&he.status!=="done");G?G.status=oe.status:I.push({name:oe.name,status:oe.status});const He=t.messages.findIndex(he=>he.id===M);He!==-1&&(t.messages[He]={...t.messages[He],toolCalls:I.slice(),streaming:!0},u())}Pe&&(w+=Pe),Ne+=1,Ne>=32&&(Ne=0,ee(),await wa())}}clearInterval(pe),te(),a.streamingAbortController=null;const Q=t.messages.findIndex(N=>N.id===M),ae=w||"…",ue=S()?.querySelector(`#thinking-${M}`);ue&&ue.classList.remove("thinking-active");const me=S()?.querySelector(`#cot-wrapper-${M}`);me&&me.removeAttribute("data-slow"),o&&h&&delete a.openThinkingIds[M];const fe=$a(ae);Q!==-1&&fe.length>1?(t.messages.splice(Q,1),u(),await Sa(180),await ka(t,fe,{startIndex:Q,thinking:o?h:"",toolCalls:I})):(Q!==-1&&(t.messages[Q]={...t.messages[Q],text:ae,...o&&h?{thinking:h}:{},...I?{toolCalls:I}:{},streaming:!1}),u())}catch(d){clearInterval(_rerollSlowTimer),_cancelRerollFlush(),a.streamingAbortController=null;const p=d.name==="AbortError";p||console.error("[reroll SSE] error:",d);const m=t.messages.findIndex(b=>b.id===rerollId);m!==-1&&(t.messages[m]={...t.messages[m],text:p?fullText||"…":`重试失败：${d.message}`,...fullThinking?{thinking:fullThinking}:{},...fullToolCalls?{toolCalls:fullToolCalls}:{},streaming:!1}),u()}}function B(){requestAnimationFrame(()=>{const e=S()?.querySelector(".messages-panel");e&&(e.scrollTop=e.scrollHeight)})}function vr(){return`
      <div class="attach-panel glass-frost">
        <button class="attach-option" data-action="attach-option" data-label="图片">
          <span class="attach-icon">🖼️</span><span>图片</span>
        </button>
        <button class="attach-option" data-action="attach-option" data-label="文件">
          <span class="attach-icon">📄</span><span>文件</span>
        </button>
        <button class="attach-option" data-action="attach-option" data-label="语音">
          <span class="attach-icon">🎤</span><span>语音</span>
        </button>
        <button class="attach-option" data-action="attach-option" data-label="拍照">
          <span class="attach-icon">📸</span><span>拍照</span>
        </button>
      </div>
    `}const uo=window.openPage;typeof uo=="function"&&(window.openPage=function(t,o){uo(t,o),t==="page-chat"&&Aa()});const yr=[{id:"openai",name:"OpenAI",enabled:!0,baseUrl:"https://api.openai.com/v1",apiPath:"",apiKey:"",models:["gpt-5.4","gpt-5.4-mini","gpt-4.1-mini"],defaultModel:"gpt-5.4"},{id:"openrouter",name:"OpenRouter",enabled:!0,baseUrl:"https://openrouter.ai/api/v1",apiPath:"",apiKey:"",models:["openai/gpt-5","anthropic/claude-sonnet-4.5","anthropic/claude-opus-4.1","anthropic/claude-3.7-sonnet"],defaultModel:"openai/gpt-5"},{id:"gemini",name:"Gemini",enabled:!0,baseUrl:"https://generativelanguage.googleapis.com/v1beta/openai",apiPath:"",apiKey:"",models:["gemini-2.5-pro","gemini-2.5-flash"],defaultModel:"gemini-2.5-pro"},{id:"deepseek",name:"DeepSeek",enabled:!1,baseUrl:"https://api.deepseek.com/v1",apiPath:"",apiKey:"",models:["deepseek-chat","deepseek-reasoner"],defaultModel:"deepseek-chat"},{id:"qwen",name:"阿里云千问",enabled:!1,baseUrl:"https://dashscope.aliyuncs.com/compatible-mode/v1",apiPath:"",apiKey:"",models:["qwen-max","qwen-plus","qwen-turbo"],defaultModel:"qwen-max"},{id:"zhipu",name:"智谱",enabled:!1,baseUrl:"https://open.bigmodel.cn/api/paas/v4",apiPath:"",apiKey:"",models:["glm-4.5","glm-4-air"],defaultModel:"glm-4.5"},{id:"siliconflow",name:"SiliconFlow",enabled:!1,baseUrl:"https://api.siliconflow.cn/v1",apiPath:"",apiKey:"",models:["deepseek-ai/DeepSeek-V3","deepseek-ai/DeepSeek-R1","Qwen/Qwen2.5-72B-Instruct"],defaultModel:"deepseek-ai/DeepSeek-V3"}],lo={openai:["gpt-5.4","gpt-5.4-mini","gpt-4.1","gpt-4.1-mini","o4-mini"],openrouter:["openai/gpt-5","openai/gpt-4.1","anthropic/claude-sonnet-4.5","anthropic/claude-opus-4.1","anthropic/claude-3.7-sonnet","anthropic/claude-3.5-sonnet","anthropic/claude-3.5-haiku","google/gemini-2.5-pro","google/gemini-2.5-flash","deepseek/deepseek-chat","deepseek/deepseek-r1","qwen/qwen-max"],aggregate:["openai/gpt-5","gpt-5","gpt-4.1","anthropic/claude-sonnet-4.5","anthropic/claude-opus-4.1","anthropic/claude-3.7-sonnet","claude-sonnet-4-5","claude-opus-4-1","claude-3-7-sonnet-latest","google/gemini-2.5-pro","google/gemini-2.5-flash","deepseek/deepseek-chat","qwen/qwen-max"],anthropic:["claude-opus-4-5","claude-sonnet-4-5","claude-haiku-4-5","claude-opus-4-1","claude-sonnet-4-0","claude-3-7-sonnet-latest","claude-3-5-haiku-latest"],gemini:["gemini-2.5-pro","gemini-2.5-flash","gemini-2.0-flash","gemini-1.5-pro"],deepseek:["deepseek-chat","deepseek-reasoner"],zhipu:["glm-4.5","glm-4-air","glm-4-flash"],siliconflow:["deepseek-ai/DeepSeek-V3","deepseek-ai/DeepSeek-R1","Qwen/Qwen2.5-72B-Instruct","Qwen/Qwen2.5-32B-Instruct","THUDM/GLM-4-9B-0414"]},ca=new Set(["aiInterface","defaultModels","modelSlot","providerCatalog","providerEditor","promptEditor","themeSettings","accountSettings","memoryService","backendSync","exportSettings","mcpLibrary"]),wr=rt,Sr=Lt,$r=Ot,po=Ut;a.viewStack=a.viewStack||[],a.activeModelSlot=a.activeModelSlot||"chat",a.activeModelSlotContext=a.activeModelSlotContext||"global",a.activeModelProviderId=a.activeModelProviderId||"",a.providerDraftId=a.providerDraftId||null,a.providerAdvancedOpen=!!a.providerAdvancedOpen,a.providerEditorDraft=a.providerEditorDraft||null,a.providerModelMenuOpen=!!a.providerModelMenuOpen,a.providerModelSyncingId=a.providerModelSyncingId||"",a.providerModelSyncStatus=a.providerModelSyncStatus&&typeof a.providerModelSyncStatus=="object"?a.providerModelSyncStatus:{},a.providerKeyVisible=!!a.providerKeyVisible,a.modelSlotMenuOpen=!!a.modelSlotMenuOpen,a.providerSearch=a.providerSearch||"",a.activePromptSlot=a.activePromptSlot||"summary";function z(e){const t=String(e||"").trim();return t?t==="ocr"?"vision":t==="title"?"summary":t:"chat"}a.aiSettingsSaving=!1,a.memoryServiceEntries=Array.isArray(a.memoryServiceEntries)?a.memoryServiceEntries:[],a.memoryServiceLoading=!!a.memoryServiceLoading,a.slotVendorGroupOpen=a.slotVendorGroupOpen&&typeof a.slotVendorGroupOpen=="object"?a.slotVendorGroupOpen:{},a.providerModelVendorOpen=a.providerModelVendorOpen&&typeof a.providerModelVendorOpen=="object"?a.providerModelVendorOpen:{};function kr(){return"/chat/completions"}function Xe(e,{allowEmpty:t=!1}={}){const o=String(e||"").trim();return o?o.startsWith("/")?o:`/${o}`:t?"":kr()}function Ir(e={}){return Xe(e.apiPath||e.api_path||"",{allowEmpty:!1})}function Ge(e={}){const t=Xe(e.apiPath||e.api_path||"",{allowEmpty:!0});return{...e,baseUrl:e.baseUrl||e.base_url||"",apiKey:e.apiKey||e.api_key||"",apiPath:t,api_path:t,models:F(e.models),defaultModel:q(e.defaultModel||e.default_model||"")}}function q(e){if(typeof e!="string")return"";const t=e.trim().replace(/\s+/g," ");return!t||t.length>180||/[<>]/.test(t)||/<\/?[a-z][\s\S]*>/i.test(t)||/<!doctype|<html|<\/div|<\/body/i.test(t)||/[\u0000-\u001f\u007f]/.test(t)?"":t}function F(e){const t=Array.isArray(e)?e:[],o=new Set,n=[];return t.forEach(r=>{const i=typeof r=="string"?r:r&&typeof r=="object"?r.id||r.name||r.model||r.slug:"",s=q(i),c=s.toLowerCase();s&&!o.has(c)&&(o.add(c),n.push(s))}),n}function ua(e={}){const t=String(e.id||"").toLowerCase(),o=String(e.name||"").toLowerCase(),n=String(e.baseUrl||e.base_url||"").toLowerCase();return t.includes("openrouter")||o.includes("openrouter")||n.includes("openrouter.ai")?"openrouter":t.includes("jiushi")||o.includes("玖时")||n.includes("jiushi.xin")?"aggregate":t.includes("silicon")||o.includes("silicon")||n.includes("siliconflow")?"siliconflow":t.includes("deepseek")||o.includes("deepseek")||n.includes("deepseek")?"deepseek":t.includes("anthropic")||t.includes("claude")||o.includes("anthropic")||o.includes("claude")||n.includes("anthropic.com")?"anthropic":t.includes("gemini")||o.includes("gemini")||n.includes("generativelanguage")?"gemini":t.includes("zhipu")||o.includes("智谱")||n.includes("bigmodel")?"zhipu":t.includes("openai")||o.includes("openai")||n.includes("openai.com")?"openai":t||"custom"}function _r(e={}){const t=ua(e);if(t==="aggregate"||t==="openrouter")return!0;if(["openai","anthropic","gemini","deepseek","zhipu","siliconflow"].includes(t))return!1;const o=String(e.baseUrl||e.base_url||"").toLowerCase();return o?!/(openai\.com|anthropic\.com|generativelanguage|deepseek\.com|bigmodel\.cn|siliconflow\.cn)/.test(o):!1}function la(e={}){const t=ua(e),o=lo[t]||[],n=_r(e)?lo.aggregate:[];return F([...o,...n])}function Mr(e=""){const t=String(e||"").trim();if(!t)return"";const o=t.slice(-4);return`${t.startsWith("sk-")?"sk-":""}••••${o}`}function _e(e,t,o){const n=String(e||a.providerDraftId||"current");a.providerModelSyncStatus[n]={type:t,message:o}}function Cr(e,t="模型"){const o=q(e);if(!o)throw new Error(`${t} 不是合法模型 ID，不能包含 HTML、控制字符或过长内容`);return o}function da(e={}){const t={...e||{}};return t.model&&(t.model=q(t.model)),t.providerId&&(t.providerId=String(t.providerId||"").trim()),t}function Me(){return{providers:yr.map(e=>Ge({...e,models:[...e.models]})),defaultModels:{chat:{providerId:"openai",model:"gpt-5.4",useChatModel:!1},summary:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},vision:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},translate:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},consciousness:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},voice:{provider:"",service_url:"",base_url:"",voice_id:"",speaker:"",emotion:"",speed:1,format:""}},defaultPrompts:{chat:"Respond naturally, stay consistent with the current role and context, and keep the tone warm and clear.",summary:"Write a concise conversation summary with key facts, action items, and follow-ups.",translate:"Translate the content accurately while preserving tone and formatting when possible.",vision:"Extract visible text from the image and explain key visual information clearly.",consciousness:"Review recent context, infer useful next-step thoughts, and keep the result concise and actionable."},mcpLibrary:Eo()}}function R(){if(!a.globalSettings.aiSettings)a.globalSettings.aiSettings=Me();else{const e=a.globalSettings.aiSettings;e.defaultModels=e.defaultModels||{},e.defaultPrompts=e.defaultPrompts||{},e.providers=Array.isArray(e.providers)?e.providers:[];const t=new Map(e.providers.map(o=>[o.id,Ge(o)]));Me().providers.forEach(o=>{t.has(o.id)||t.set(o.id,o)}),e.providers=[...t.values()],e.defaultModels.ocr&&!e.defaultModels.vision&&(e.defaultModels.vision={...e.defaultModels.ocr}),e.defaultPrompts.ocr&&!e.defaultPrompts.vision&&(e.defaultPrompts.vision=e.defaultPrompts.ocr),delete e.defaultModels.ocr,delete e.defaultPrompts.ocr,delete e.defaultModels.title,delete e.defaultPrompts.title,Object.entries(Me().defaultModels).forEach(([o,n])=>{e.defaultModels[o]||(e.defaultModels[o]={...n}),o!=="voice"&&(e.defaultModels[o]=da(e.defaultModels[o]))}),Object.entries(Me().defaultPrompts).forEach(([o,n])=>{typeof e.defaultPrompts[o]!="string"&&(e.defaultPrompts[o]=n)})}return a.globalSettings.aiSettings}function xr(e={}){const t=Me(),o={...e||{}};o.defaultModels?.ocr&&!o.defaultModels?.vision&&(o.defaultModels={...o.defaultModels,vision:o.defaultModels.ocr}),o.defaultPrompts?.ocr&&!o.defaultPrompts?.vision&&(o.defaultPrompts={...o.defaultPrompts,vision:o.defaultPrompts.ocr});const n={providers:t.providers,defaultModels:{...t.defaultModels},defaultPrompts:{...t.defaultPrompts},mcpLibrary:{...t.mcpLibrary,tools:[...t.mcpLibrary?.tools||[]]}};if(Array.isArray(o.providers)&&o.providers.length){const r=new Map(t.providers.map(i=>[i.id,i]));o.providers.forEach(i=>{const s=Ge(i);r.set(s.id,{...r.get(s.id),...s,models:Array.isArray(s.models)&&s.models.length?s.models:r.get(s.id)?.models||[]})}),n.providers=[...r.values()]}o.defaultModels&&Object.keys(n.defaultModels).forEach(r=>{if(o.defaultModels[r]){const i={...n.defaultModels[r],...o.defaultModels[r]};n.defaultModels[r]=r==="voice"?i:da(i)}}),o.defaultPrompts&&Object.keys(n.defaultPrompts).forEach(r=>{typeof o.defaultPrompts[r]=="string"&&(n.defaultPrompts[r]=o.defaultPrompts[r])}),o.mcpLibrary&&Array.isArray(o.mcpLibrary.tools)&&(n.mcpLibrary={...n.mcpLibrary,...o.mcpLibrary,tools:o.mcpLibrary.tools.map(le)}),a.globalSettings.aiSettings=n,typeof o.consciousnessLoop=="boolean"&&(a.globalSettings.consciousnessLoop=o.consciousnessLoop),yt()}function yt(){const e=R(),t=e.defaultModels.chat,o=e.providers.find(n=>n.id===t.providerId);a.globalSettings.defaultModel=q(t.model)||Me().defaultModels.chat.model,a.globalSettings.provider=o?.name||"OpenAI"}function U(e){return R().providers.find(t=>t.id===e)}function pa(e=a.providerDraftId){const t=Ge(U(e)||{id:e||`custom_${Date.now()}`,name:"",enabled:!0,baseUrl:"",apiPath:"",apiKey:"",models:[],defaultModel:""}),o=F(t.models),n=F([...o,...la(t)]).map(Je);return{...t,models:o,_allModels:n,_selectedModelIds:new Set(o),_apiKeyDirty:!1}}function L(){return(!a.providerEditorDraft||a.providerEditorDraft.id!==a.providerDraftId)&&(a.providerEditorDraft=pa()),a.providerEditorDraft}function mo(e="",t=[]){const o=String(e||"").trim().toLowerCase(),n=F(t);return o?n.filter(r=>String(r||"").toLowerCase().includes(o)):n}function fo(e){const t=String(e||"").toLowerCase();return/deepseek/.test(t)?"DeepSeek":/\bglm\b|chatglm/.test(t)?"GLM":/\bqwen\b|qwq/.test(t)?"Qwen":/\bgpt[-\d]|^gpt|^o[134][-\d]|text-davinci|text-curie/.test(t)?"OpenAI":/claude/.test(t)?"Anthropic":/gemini|gemma/.test(t)?"Google":/\bllama\b|meta-llama/.test(t)?"Meta":/mistral|mixtral|codestral/.test(t)?"Mistral":/\byi[-/_]/.test(t)?"01.AI":/moonshot|kimi/.test(t)?"Moonshot":/hunyuan/.test(t)?"Hunyuan":/ernie|wenxin/.test(t)?"ERNIE":/doubao/.test(t)?"Doubao":/baichuan/.test(t)?"Baichuan":/spark/.test(t)?"Spark":/internlm/.test(t)?"InternLM":"Other"}function go(e){const t=String(e||"").toLowerCase(),o=["chat","text"];return/vl\b|vision|visual|\bvision\b|-v\d|\bimg\b/.test(t)&&o.push("vision"),/reason|r1\b|think\b|cot\b/.test(t)&&o.push("reasoning"),/image|draw|flux|paint|artist|diffusion/.test(t)&&o.push("image"),o.push("tools"),o}function Je(e){const t=String(e||"").trim();return{id:t,name:t,vendor:fo(t),capabilities:go(t)}}const Ar={chat:"瀵硅瘽",text:"鏂囨湰",reasoning:"鎺ㄧ悊",tools:"宸ュ叿璋冪敤",vision:"瑙嗚",image:"鐢熷浘"},Tr=["reasoning","tools","vision","image"],Er={reasoning:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M5 .5A3 3 0 0 0 2.8 5.9l.2.3V8h4V6.2l.2-.3A3 3 0 0 0 5 .5zm-1.2 8h2.4v.5c0 .28-.22.5-.5.5H4.3a.5.5 0 0 1-.5-.5V8.5z"/></svg>',tools:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M7.5 1a2 2 0 0 0-1.86 2.73L1.2 8.16a.6.6 0 0 0 .84.84l4.43-4.44A2 2 0 1 0 7.5 1zm0 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>',vision:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5 2C2.5 2 .8 5 .8 5S2.5 8 5 8s4.2-3 4.2-3S7.5 2 5 2zm0 4.5A1.5 1.5 0 1 1 5 3.5a1.5 1.5 0 0 1 0 3z"/></svg>',image:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M1.5 1A.5.5 0 0 0 1 1.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-7A.5.5 0 0 0 8.5 1h-7zM2 8l2-2.5 1.3 1.7 1.7-2.2L9 8H2zm.8-4.3a.7.7 0 1 0 1.4 0 .7.7 0 0 0-1.4 0z"/></svg>'};function Pr(e){return(Array.isArray(e?.capabilities)?e.capabilities:go(e?.name||"")).filter(o=>Tr.includes(o)).map(o=>`<span class="model-cap-badge cap-${o}" title="${Ar[o]||o}">${Er[o]||o}</span>`).join("")}function bo(e="",t=[]){const o=String(e||"").trim();return!Array.isArray(t)||!t.length?"还没有已同步模型，仍可手动输入并保存。":o?t.some(r=>String(r).toLowerCase()===o.toLowerCase())?"已匹配到已同步列表中的模型。":"当前模型不在已同步列表中，可继续手动保存。":`已同步 ${t.length} 个模型，可搜索或展开列表选择。`}function ma(e="",t=[]){const o=String(e||"").trim();return!Array.isArray(t)||!t.length?"当前供应商还没有同步模型，可切换供应商或先同步。":o?t.some(r=>String(r).toLowerCase()===o.toLowerCase())?"已匹配到当前供应商模型。":"当前输入不在同步列表中。":`已同步 ${t.length} 个模型，可搜索或展开列表选择。`}function Ce(){const e=L(),t=document.getElementById("provider-default-model-input"),o=document.getElementById("provider-default-model-menu"),n=document.getElementById("provider-default-model-hint");if(!o||!n)return;const r=t?.value||e.defaultModel||"",i=F([...Array.isArray(e.models)?e.models:[],...Array.isArray(e._allModels)?e._allModels.map(c=>c?.id||c?.name||""):[]]),s=mo(r,i);if(n.textContent=bo(r,i),!a.providerModelMenuOpen){o.innerHTML="",o.classList.remove("open");return}o.classList.add("open"),o.innerHTML=s.length?s.map((c,d)=>`
          <button class="provider-model-option ${String(c).toLowerCase()===String(r).trim().toLowerCase()?"active":""}" data-action="pick-provider-default-model" data-model-index="${d}" type="button">
            <span>${l(c)}</span>
            ${String(c).toLowerCase()===String(r).trim().toLowerCase()?"<em>已选</em>":""}
          </button>
        `).join(""):'<div class="provider-model-empty">没有获取到模型，仍可手动输入保存。</div>'}function A(e){return R().defaultModels[z(e)]}function qr(){const e=a.activeModelSlot,t=a.activeModelSlotContext==="contact",o=g(a.currentContactId)||a.contacts[0],n=t?{providerId:o?.settings?.modelProviderId||a.activeModelProviderId||A("chat")?.providerId||"openai",model:e==="consciousness"?o?.settings?.loopModel||"":o?.settings?.model||""}:wt(e),r=U(n?.providerId)||U(A("chat")?.providerId);return{slot:n,provider:r,models:r?.models||[]}}function We(){const e=document.getElementById("model-slot-menu"),t=document.getElementById("model-slot-hint"),o=document.getElementById("model-slot-input");if(!e||!t)return;const{slot:n,models:r}=qr(),i=o?.value||n?.model||"";t.textContent=ma(i,F(r)),e.innerHTML="",e.classList.remove("open")}function wt(e){return A(z(e))}function ze(e){const t=z(e);return{chat:"聊天模型",summary:"摘要模型",vision:"Vision 模型",translate:"翻译模型",consciousness:"意识循环模型",voice:"语音模型"}[t]||t}function St(e){const t=z(e);return{chat:"全局默认使用的聊天模型。",summary:"用于生成对话摘要，推荐选择便宜且稳定的模型。",vision:"用于识图、OCR 与截图分析的统一入口。",translate:"用于翻译消息内容，推荐选择速度快的模型。",consciousness:"用于意识循环、主动思考与相关后台能力。",voice:"用于文本转语音，读取语音服务地址与 voice ID。"}[t]||""}function ho(e){const t=z(e),o=wt(t);if(t==="voice"){if(!o)return"未设置";const r=o.provider||"语音服务",i=o.voice_id||o.voiceId||"未设置";return`${r} / ${i}`}const n=U(o?.providerId);return o?`${n?.name||"未设置"} / ${o.model||"未设置"}`:"未设置"}function Dr(e){return R().defaultPrompts?.[z(e)]||""}function Lr(e){const t=z(e);return{chat:f("comment"),summary:f("file"),vision:f("search"),translate:f("chatArrow"),consciousness:f("history"),voice:f("mic")}[t]||f("file")}function Or(e){const t=z(e);return t!=="chat"&&t!=="voice"}function Rr(e){return`
      <article class="default-model-card">
        <div class="default-model-head">
          <div class="default-model-icon">${Lr(e)}</div>
          <div class="default-model-copy">
            <strong>${l(ze(e))}</strong>
            <p>${l(St(e))}</p>
          </div>
          ${Or(e)?`<button class="model-gear-btn" data-action="open-prompt-editor" data-slot="${e}" aria-label="提示词设置">${f("settings")}</button>`:'<span class="header-spacer"></span>'}
        </div>
        <button class="model-value-pill" data-action="open-model-slot" data-slot="${e}">
          <span class="model-value-badge">使</span>
          <span>${l(ho(e))}</span>
        </button>
      </article>
    `}function Vr(){const e=z(a.activePromptSlot),t=Dr(e);return`
      <section class="settings-page page-block ai-settings-page ai-prompt-page">
        <div class="settings-group glass-frost ai-panel ai-form-group">
          <h3>${l(ze(e))} 提示词</h3>
          <p class="section-eyebrow">用于定义这个能力位的默认提示词模板，后续接入对应后端任务时会直接使用这里的内容。</p>
          <textarea id="slot-prompt-input" class="ai-textarea ai-prompt-textarea" placeholder="在这里输入默认提示词">${l(t)}</textarea>
          <p class="section-eyebrow">变量位后续可以继续扩展，目前先支持按能力位单独保存。</p>
        </div>
        <div class="settings-group glass-frost ai-panel ai-prompt-actions">
          <button class="ghost-action prompt-reset-btn" data-action="reset-slot-prompt" data-slot="${e}">重置为默认</button>
          <button class="bottom-tab active prompt-save-btn" data-action="save-slot-prompt" data-slot="${e}">保存</button>
        </div>
      </section>
    `}function Br(){const e=[{id:"奶油粉",key:"rose",desc:"柔和粉白"},{id:"云雾灰",key:"mist",desc:"冷淡浅灰"},{id:"奶油杏",key:"cream",desc:"暖调米白"}],t=a.globalSettings.theme;return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>主题模式</h3>
          <p class="section-eyebrow">选择首页和聊天页共用的浅色主题。</p>
          <div class="theme-choice-list">
            ${e.map(o=>`
              <button class="theme-choice-item ${t===o.id||t===o.key?"active":""}" data-action="pick-theme-mode" data-theme="${o.id}">
                <span class="theme-choice-copy">
                  <strong>${l(o.id)}</strong>
                  <em>${l(o.desc)}</em>
                </span>
                <span class="theme-choice-check">${t===o.id||t===o.key?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `}function zr(){const e=a.accountProfile||{};return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>我的账号</h3>
          ${C("头像","更换头像","open-account-avatar")}
          ${C("昵称",e.nickname||"小酒","open-account-nickname")}
          ${C("个性签名",e.signature||"管理个人资料与基础偏好","open-account-signature")}
          <input id="account-avatar-file" class="moment-image-input" type="file" accept="image/*" />
        </div>
      </section>
    `}function Nr(e){const t=Math.max(0,Math.min(100,Number(e)||0)),o=t>60?"#c9908a":t>30?"#c8a07a":"#b0b0b8";return`<span style="display:inline-flex;align-items:center;gap:4px;font-size:10px;color:${o};">
          <span style="display:inline-block;width:${Math.round(t*.36)}px;max-width:36px;min-width:2px;height:3px;border-radius:2px;background:${o};"></span>
          ${t>0?`热度 ${t}`:""}
        </span>`}function Hr(){const e=g(a.currentContactId)||a.contacts[0],t=Array.isArray(a.memoryServiceEntries)?a.memoryServiceEntries:[],o=Array.isArray(a.memoryCandidates)?a.memoryCandidates:[],n=a.memoryServiceSort||"updated_at",r=[{key:"updated_at",label:"最新"},{key:"importance",label:"最重要"},{key:"temperature",label:"有温度"}];return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>记忆服务</h3>
          <p class="section-eyebrow">当前联系人：${l(e?.name||"未命名")}。这里直接读写后端 memories，不再以本地假数据为准。</p>
          <div class="ai-inline-actions" style="margin-top:10px;">
            <button class="ghost-action" data-action="memory-service-refresh">刷新</button>
            <button class="ghost-action" data-action="memory-service-create">新建记忆</button>
          </div>
          <div class="ai-inline-actions" style="margin-top:8px;">
            ${r.map(i=>`<button class="ghost-action${n===i.key?" active":""}" data-action="memory-service-sort" data-sort="${i.key}">${i.label}</button>`).join("")}
          </div>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>记忆列表</h3>
          ${a.memoryServiceLoading?'<p class="section-eyebrow">正在加载…</p>':""}
          ${!a.memoryServiceLoading&&!t.length?'<p class="section-eyebrow">这个角色还没有记忆。</p>':""}
          ${t.map(i=>{const s=i.compressed_content||i.raw_content||i.content||"未命名记忆",c=i.importance??3,d=i.temperature??0,p="★".repeat(c)+"☆".repeat(5-c);return`
            <div class="theme-choice-item active" style="cursor:default; display:block;">
              <div class="theme-choice-copy" style="display:block;">
                <strong>${l(s)}</strong>
                <em style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:3px;">
                  <span>${l(i.category||"")}</span>
                  <span style="color:#c9908a;">${p}</span>
                  ${Nr(d)}
                </em>
                ${i.expires_at?`<em>过期：${l(String(i.expires_at))}</em>`:""}
              </div>
              <div class="ai-inline-actions" style="margin-top:10px;">
                <button class="ghost-action" data-action="memory-service-edit" data-memory-id="${l(String(i.id||""))}">编辑</button>
                <button class="ghost-action" data-action="memory-service-delete" data-memory-id="${l(String(i.id||""))}">删除</button>
              </div>
            </div>`}).join("")}
        </div>
        ${o.length>0?`
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>待审记忆候选 <span style="font-size:12px;font-weight:400;color:var(--muted);">· 日循环提取，可采纳或忽略</span></h3>
          ${o.map(i=>`
            <div class="theme-choice-item active" style="cursor:default; display:block;">
              <div class="theme-choice-copy" style="display:block;">
                <strong>${l(i.content||i.summary||"")}</strong>
                <em>${l(i.category||"")} / importance ${i.importance??3}</em>
              </div>
              <div class="ai-inline-actions" style="margin-top:8px;">
                <button class="ghost-action" data-action="memory-candidate-promote" data-candidate-id="${l(String(i.id||""))}">✓ 采纳</button>
                <button class="ghost-action" data-action="memory-candidate-dismiss" data-candidate-id="${l(String(i.id||""))}">✕ 忽略</button>
              </div>
            </div>
          `).join("")}
        </div>
        `:""}
      </section>
    `}function fa(){return String(a.currentContactId||g(a.currentContactId)?.id||"default").trim()||"default"}async function xe(e=fa(),{silent:t=!0}={}){const o=String(e||"").trim();if(o){a.memoryServiceLoading=!0,u();try{const n=a.memoryServiceSort||"updated_at",r=new URLSearchParams({agent_id:o,sort_by:n,order:"desc",limit:"100"}),[i,s]=await Promise.all([fetch(`${y}/api/memories?${r.toString()}`),fetch(`${y}/api/consciousness/memory-candidates?agent_id=${encodeURIComponent(o)}&limit=20`)]);if(!i.ok)throw new Error(`HTTP ${i.status}`);const c=await i.json().catch(()=>({}));if(a.memoryServiceEntries=Array.isArray(c?.memories)?c.memories:[],s.ok){const d=await s.json().catch(()=>({}));a.memoryCandidates=Array.isArray(d?.candidates)?d.candidates:[]}}catch(n){console.warn("[memory service] load failed",n),t||(a.toast="记忆加载失败",window.setTimeout(()=>{a.toast="",u()},1200))}finally{a.memoryServiceLoading=!1,u()}}}async function jr(e){const t=fa();try{const o=await fetch(`${y}/api/consciousness/memory-candidates/${encodeURIComponent(e)}/promote?agent_id=${encodeURIComponent(t)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:"{}"});if(!o.ok)throw new Error(`HTTP ${o.status}`);a.memoryCandidates=(a.memoryCandidates||[]).filter(n=>String(n.id)!==String(e)),a.toast="✓ 已采纳为正式记忆",window.setTimeout(()=>{a.toast="",u()},1800),await xe(t,{silent:!0})}catch(o){console.warn("[memory] promote failed",o)}}async function Fr(e){try{const t=await fetch(`${y}/api/consciousness/memory-candidates/${encodeURIComponent(e)}`,{method:"DELETE"});if(!t.ok)throw new Error(`HTTP ${t.status}`);a.memoryCandidates=(a.memoryCandidates||[]).filter(o=>String(o.id)!==String(e)),u()}catch(t){console.warn("[memory] dismiss failed",t)}}function vo(e=null){const t=e||{},o=window.prompt("记忆内容",String(t.raw_content||t.content||"").trim());if(o===null)return null;const n=window.prompt("分层 / category（core_profile / recent_pending / deep / ephemeral）",String(t.category||"recent_pending"));if(n===null)return null;const r=window.prompt("可见范围（private / shared / public）",String(t.visibility||"private"));if(r===null)return null;const i=window.prompt("重要度（1-5）",String(t.importance??3));if(i===null)return null;const s=window.prompt("过期时间 ISO（可留空）",String(t.expires_at||""));return s===null?null:{agent_id:fa(),content:String(o||"").trim(),raw_content:String(o||"").trim(),category:String(n||"").trim()||"recent_pending",visibility:String(r||"").trim()||"private",importance:Math.max(1,Math.min(5,Number(i)||3)),expires_at:String(s||"").trim()||null}}async function Ur(){const e=vo();if(!e||!e.content)return;const t=await fetch(`${y}/api/memories`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),o=await t.json().catch(()=>({}));if(!t.ok)throw new Error(o?.detail||`HTTP ${t.status}`)}async function Kr(e){const t=a.memoryServiceEntries.find(i=>String(i.id)===String(e));if(!t)return;const o=vo(t);if(!o||!o.content)return;const n=await fetch(`${y}/api/memories/${encodeURIComponent(e)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}),r=await n.json().catch(()=>({}));if(!n.ok)throw new Error(r?.detail||`HTTP ${n.status}`)}async function Qr(e){if(!window.confirm("删除这条记忆？"))return;const t=await fetch(`${y}/api/memories/${encodeURIComponent(e)}`,{method:"DELETE"}),o=await t.json().catch(()=>({}));if(!t.ok)throw new Error(o?.detail||`HTTP ${t.status}`)}function Yr(){const e=Ke();return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>同步后端</h3>
          <p class="section-eyebrow">前端快照会本地保存，并自动 push/pull 到后端。</p>
          ${C("数据库","Supabase")}
          ${C("后端接口",y)}
          ${C("设备 ID",Jt())}
          ${C("上次同步",re(e.last_server_updated_at,{fallback:"暂无",includeYear:!0}))}
          <div class="ai-inline-actions" style="margin-top:10px;">
            <button class="ghost-action" data-action="sync-pull-now">立即拉取</button>
            <button class="ghost-action" data-action="sync-push-now">立即上传</button>
          </div>
        </div>
      </section>
    `}function Xr(){const e=a.globalSettings;return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>导出格式</h3>
          <div class="theme-choice-list">
            ${["Markdown","JSON","TXT"].map(o=>`
              <button class="theme-choice-item ${e.exportFormat===o?"active":""}" data-action="pick-export-format" data-format="${o}">
                <span class="theme-choice-copy">
                  <strong>${l(o)}</strong>
                  <em>用于聊天记录导出</em>
                </span>
                <span class="theme-choice-check">${e.exportFormat===o?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `}function C(e,t,o="noop",n={}){const r=Object.entries(n).map(([i,s])=>` data-${i}="${l(String(s))}"`).join("");return`
      <button class="setting-row nav-row" data-action="${o}"${r}>
        <div class="setting-copy"><strong>${l(e)}</strong>${t?`<p>${l(t)}</p>`:""}</div>
        <span class="row-chevron">${f("chevron")}</span>
      </button>
    `}function K(e,t){a.viewStack.push(a.currentView),typeof t=="function"&&t(),a.currentView=e,u()}function Gr(){a.currentView=a.viewStack.pop()||"settings",u()}async function Jr(){try{const e=await fetch(`${y}/api/settings/ai`);if(!e.ok)return;const t=await e.json();xr(t.settings?.aiSettings||t.settings?.ai||t.settings?.ai_settings||t.settings||{}),u()}catch(e){console.warn("[ai settings] load failed",e)}}async function yo({silent:e=!0}={}){try{const t=new URLSearchParams({viewer_type:"user",viewer_id:"me"}),o=await fetch(`${y}/api/moments?${t.toString()}`);if(!o.ok){if(!e)throw new Error(`HTTP ${o.status}`);return}const n=await o.json().catch(()=>({}));if(!Array.isArray(n?.moments))return;n.moments.length>0&&(a.moments=Ja(a.moments,n.moments),$(120)),u()}catch(t){console.warn("[moments] load failed",t),e||(a.toast="朋友圈加载失败",u(),window.setTimeout(()=>{a.toast="",u()},1400))}}async function Wr(e){const t=await fetch(`${y}/api/moments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),o=await t.json().catch(()=>({}));if(!t.ok)throw new Error(o?.detail||`HTTP ${t.status}`);return E(o?.moment||e)}async function Zr(e,t){const o=await fetch(`${y}/api/moments/${encodeURIComponent(e)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),n=await o.json().catch(()=>({}));if(!o.ok)throw new Error(n?.detail||`HTTP ${o.status}`);return n}async function ei(e,t,o){const n=new URLSearchParams({author_type:String(t||"user"),author_id:String(o||"me")}),r=await fetch(`${y}/api/moments/${encodeURIComponent(e)}?${n.toString()}`,{method:"DELETE"}),i=await r.json().catch(()=>({}));if(!r.ok)throw new Error(i?.detail||`HTTP ${r.status}`);return i}async function ti(e,t){const o=await fetch(`${y}/api/moments/${encodeURIComponent(e)}/like`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({actor_type:t.author_type,actor_id:t.author_id,actor_name:t.author_name})}),n=await o.json().catch(()=>({}));if(!o.ok)throw new Error(n?.detail||`HTTP ${o.status}`);return E(n?.moment||{})}async function ai(e,t,o){const n=await fetch(`${y}/api/moments/${encodeURIComponent(e)}/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({actor_type:t.author_type,actor_id:t.author_id,actor_name:t.author_name,text:o})}),r=await n.json().catch(()=>({}));if(!n.ok)throw new Error(r?.detail||`HTTP ${n.status}`);return E(r?.moment||{})}async function oi(e,t){const o=a.currentContactId||"",n=(t||"").trim()||null,r={agentId:o};if(e==="impression")r.impression=n;else if(e==="relationshipProgress")r.relationshipProgress=n;else if(e==="likesSummary")r.likesSummary=n;else return;try{a.toast="保存中…",u();const i=await fetch(`${y}/api/companion-state/summary`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(r)});if(!i.ok)throw new Error(`HTTP ${i.status}`);const s=await i.json().catch(()=>({}));a.companionState=De(s?.state||a.companionState),a.toast="已保存",u(),window.setTimeout(()=>{a.toast="",u()},1200)}catch(i){console.warn("[insight save]",i),a.toast="保存失败",u(),window.setTimeout(()=>{a.toast="",u()},1400)}}async function ce(e=a.currentContactId,{silent:t=!0}={}){try{const o=String(e||"").trim(),n=o?`?agent_id=${encodeURIComponent(o)}`:"",r=await fetch(`${y}/api/companion-state${n}`);if(!r.ok){if(!t)throw new Error(`HTTP ${r.status}`);return}const i=await r.json().catch(()=>({}));a.companionState=De(i?.state||{}),u()}catch(o){console.warn("[companion state] load failed",o),t||(a.toast="状态读取失败",u(),window.setTimeout(()=>{a.toast="",u()},1200))}}async function Ze(e,{silent:t=!0}={}){const o=String(e||"").trim();if(!o)return"";try{const n=await fetch(`${y}/api/agents/${encodeURIComponent(o)}/persona`);if(!n.ok){if(!t)throw new Error(`HTTP ${n.status}`);return""}const r=await n.json().catch(()=>({})),i=g(o);return i&&(i.persona=String(r?.persona||""),a.currentView==="contactSettings"&&a.currentContactId===o&&u()),String(r?.persona||"")}catch(n){return console.warn("[agent persona] load failed",n),t||(a.toast="浜鸿璇诲彇澶辫触",u(),window.setTimeout(()=>{a.toast="",u()},1200)),""}}async function ni(e,t){const o=String(e||"").trim();if(o)try{await fetch(`${y}/api/agents/${encodeURIComponent(o)}/persona`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({persona:String(t||"")})})}catch(n){console.warn("[agent persona] save failed",n)}}function ri(e,t,o=260){const n=String(e||"").trim();if(!n)return;ve.has(n)&&clearTimeout(ve.get(n));const r=window.setTimeout(()=>{ve.delete(n),ni(n,t)},o);ve.set(n,r)}async function wo({silent:e=!0}={}){try{const t=await fetch(`${y}/api/mcp/library`);if(!t.ok){if(!e)throw new Error(`HTTP ${t.status}`);return}const o=await t.json();if(!Array.isArray(o.tools))return;const n=R(),r=o.tools.map(le).filter(i=>Se(i.id));n.mcpLibrary={...n.mcpLibrary||{},tools:r},D(),u()}catch(t){console.warn("[mcp library] load failed",t),e||(a.toast="同步 MCP 工具失败",u(),window.setTimeout(()=>{a.toast="",u()},1300))}}async function D(){yt();const e=R();e.providers=(e.providers||[]).map(Ge),Object.keys(e.defaultModels||{}).forEach(t=>{t!=="voice"&&(e.defaultModels[t]=da(e.defaultModels[t]))}),a.aiSettingsSaving=!0;try{await fetch(`${y}/api/settings/ai`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({settings:{...a.globalSettings,aiSettings:e}})})}catch(t){console.error("[ai settings] save failed",t)}finally{a.aiSettingsSaving=!1}}function ii(){const e=R(),t=(e.mcpLibrary?.tools||[]).filter(o=>o.enabled!==!1).length;return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel">
          <h3>AI 接口</h3>
          ${C("默认模型","聊天 / 摘要 / Vision / 翻译 / 意识循环 / 语音","open-default-models")}
          ${C("模型供应商",`共 ${e.providers.length} 个`,"open-provider-catalog")}
          ${C("MCP 工具库",`已启用 ${t} 个`,"open-mcp-library")}
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>当前聊天默认</h3>
          ${C("聊天模型",ho("chat"))}
        </div>
      </section>
    `}function si(){const e=R();return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <div class="ai-inline-actions">
            <h3 style="margin:0;">MCP 工具库</h3>
            <button class="ghost-action" data-action="sync-mcp-library">同步工具</button>
          </div>
          <p class="section-eyebrow">只展示聊天主动场景常用工具，同步到输入框上方分类。</p>
          ${(Array.isArray(e.mcpLibrary?.tools)?e.mcpLibrary.tools:[]).map(le).filter(o=>Se(o.id)).map(o=>`
            <div class="provider-catalog-row">
              <div class="provider-row-main" style="cursor:default;">
                <div class="setting-copy">
                  <strong>${l(o.label||o.id||"")}</strong>
                  <p>${l(o.description||o.prompt||o.id||"")}</p>
                </div>
              </div>
              <button class="switch-btn ${o.enabled!==!1?"on":"off"}" data-action="toggle-mcp-tool" data-tool-id="${l(o.id||"")}" aria-pressed="${o.enabled!==!1}">
                ${lt(o.enabled!==!1)}
              </button>
            </div>
          `).join("")}
        </div>
      </section>
    `}function ci(){return`
      <section class="settings-page page-block ai-settings-page">
        <div class="default-model-list">
          ${["chat","summary","vision","translate","consciousness","voice"].map(t=>Rr(t)).join("")}
        </div>
      </section>
    `}function ui(){const e=z(a.activeModelSlot),t=a.activeModelSlotContext==="contact",o=g(a.currentContactId)||a.contacts[0];if(!t&&e==="voice"){const c=wt("voice")||{};return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>${l(ze("voice"))}</h3>
          <p class="section-eyebrow">${l(St("voice"))}</p>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>语音服务配置</h3>
          <label class="ai-field-label">Provider</label>
          <input id="voice-slot-provider-input" class="ai-input" value="${l(c.provider||"")}" placeholder="voice-mcp" data-plain-input="true" />
          <label class="ai-field-label">Service URL</label>
          <input id="voice-slot-service-url-input" class="ai-input" value="${l(c.service_url||c.base_url||"")}" placeholder="https://voice.example.com/speak" data-plain-input="true" />
          <label class="ai-field-label">Voice ID</label>
          <input id="voice-slot-voice-id-input" class="ai-input" value="${l(c.voice_id||c.voiceId||"")}" placeholder="default voice_id" data-plain-input="true" />
          <label class="ai-field-label">Speaker</label>
          <input id="voice-slot-speaker-input" class="ai-input" value="${l(c.speaker||"")}" placeholder="可选 speaker" data-plain-input="true" />
          <label class="ai-field-label">Emotion</label>
          <input id="voice-slot-emotion-input" class="ai-input" value="${l(c.emotion||"")}" placeholder="可选 emotion" data-plain-input="true" />
          <label class="ai-field-label">Speed</label>
          <input id="voice-slot-speed-input" class="ai-input" value="${l(c.speed??1)}" placeholder="1.0" data-plain-input="true" />
          <label class="ai-field-label">Format</label>
          <input id="voice-slot-format-input" class="ai-input" value="${l(c.format||"")}" placeholder="audio/mpeg" data-plain-input="true" />
        </div>
      </section>
    `}const n=t?{providerId:o?.settings?.modelProviderId||a.activeModelProviderId||A("chat")?.providerId||"openai",model:e==="consciousness"?o?.settings?.loopModel||"":o?.settings?.model||""}:wt(e),r=R().providers.filter(c=>c.enabled),i=U(n.providerId)||U(A("chat")?.providerId)||r[0],s=F(i?.models||[]);return t?`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>${l(ze(e))}</h3>
          <p class="section-eyebrow">${l(St(e))}</p>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>模型供应商</h3>
          <div class="ai-chip-row">
            ${r.map(c=>`<button class="ai-chip ${n.providerId===c.id?"active":""}" data-action="pick-slot-provider" data-slot="${e}" data-provider-id="${c.id}">${l(c.name)}</button>`).join("")}
          </div>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>模型列表</h3>
          <div class="provider-model-picker">
            <div class="provider-model-input-row">
              <input id="model-slot-input" class="ai-input provider-model-input" value="${l(n.model||"")}" placeholder="${l(s[0]||"输入或选择模型")}" autocomplete="off" data-plain-input="true" />
              <button class="provider-model-toggle" data-action="toggle-model-slot-menu" type="button" aria-label="灞曞紑妯″瀷鍒楄〃">
                ${f("chevron")}
              </button>
            </div>
            <p id="model-slot-hint" class="section-eyebrow provider-model-hint">${l(ma(n.model||"",s))}</p>
            <div id="model-slot-menu" class="provider-model-menu"></div>
          </div>
          <div class="model-choice-list">
            ${So(e,n,s)}
          </div>
        </div>
      </section>
    `:`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>${l(ze(e))}</h3>
          <p class="section-eyebrow">${l(St(e))}</p>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>模型供应商</h3>
          <div class="ai-chip-row">
            ${r.map(c=>`<button class="ai-chip ${n.providerId===c.id?"active":""}" data-action="pick-slot-provider" data-slot="${e}" data-provider-id="${c.id}">${l(c.name)}</button>`).join("")}
          </div>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>模型列表</h3>
          <div class="provider-model-picker">
            <div class="provider-model-input-row">
              <input id="model-slot-input" class="ai-input provider-model-input" value="${l(n.model||"")}" placeholder="${l(s[0]||"输入或选择模型")}" autocomplete="off" data-plain-input="true" />
              <button class="provider-model-toggle" data-action="toggle-model-slot-menu" type="button" aria-label="展开模型列表">
                ${f("chevron")}
              </button>
            </div>
            <p id="model-slot-hint" class="section-eyebrow provider-model-hint">${l(ma(n.model||"",s))}</p>
            <div id="model-slot-menu" class="provider-model-menu"></div>
          </div>
          <div class="model-choice-list">
            ${So(e,n,s)}
          </div>
        </div>
      </section>
    `}function li(e){return`
      <div class="provider-catalog-row">
        <button class="provider-row-main" data-action="open-provider-editor" data-provider="${e.id}">
          <div class="setting-copy">
            <strong>${l(e.name)}</strong>
            <p>${l(e.defaultModel||"未设置默认模型")}</p>
          </div>
          <span class="provider-inline-state ${e.enabled?"enabled":"disabled"}">${e.enabled?"已启用":"已禁用"}</span>
          <span class="row-chevron">${f("chevron")}</span>
        </button>
        <button class="switch-btn ${e.enabled?"on":"off"}" data-action="toggle-provider-enabled" data-provider-id="${e.id}" aria-pressed="${e.enabled}">
          ${lt(e.enabled)}
        </button>
      </div>
    `}function di(){const e=a.providerSearch.trim().toLowerCase(),t=R().providers.filter(o=>!e||o.name.toLowerCase().includes(e)||o.id.toLowerCase().includes(e)).sort((o,n)=>{const r=+!!n.enabled-+!!o.enabled;return r!==0?r:String(o.name||o.id||"").localeCompare(String(n.name||n.id||""),"zh-Hans-CN")});return`
      <section class="settings-page page-block ai-settings-page">
        <div class="search-pill glass-frost ai-search-row">
          <span class="search-icon">${f("search")}</span>
          <input class="ai-search-input" value="${l(a.providerSearch)}" data-action="provider-search" placeholder="搜索供应商" />
        </div>
        <div class="settings-group glass-frost ai-panel provider-catalog-group">
          ${t.map(o=>li(o)).join("")}
        </div>
      </section>
    `}function pi(e){const t=new Set,o=(Array.isArray(e._allModels)?e._allModels:[]).filter(w=>{const h=q(w?.id||w?.name||""),I=h.toLowerCase();return!h||t.has(I)?!1:(t.add(I),!0)}),n=e._selectedModelIds instanceof Set?e._selectedModelIds:new Set(e._selectedModelIds||[]),r=n.size,i={};for(const w of o){const h=w.vendor||"Other";i[h]||(i[h]=[]),i[h].push(w)}const s=["OpenAI","Anthropic","Google","DeepSeek","Qwen","GLM","Meta","Mistral","Moonshot","Doubao","ERNIE","Hunyuan","Baichuan","Spark","01.AI","InternLM","Other"],c=[...new Set([...s.filter(w=>i[w]),...Object.keys(i)])],d=o.map(w=>w.id),p=d.length>0&&d.every(w=>n.has(w)),m=c.map(w=>{const h=i[w]||[],I=!!a.providerModelVendorOpen[w],M=h.filter(_=>n.has(_.id)).length,T=h.length>0&&h.every(_=>n.has(_.id)),k=I?`
          <div class="vendor-group-body">
            ${h.map(_=>{const x=n.has(_.id),O=o.findIndex(ee=>ee.id===_.id);return`
              <div class="pool-model-row">
                <span class="pool-model-name">${l(_.name)}</span>
                <span class="pool-model-caps">${Pr(_)}</span>
                <button class="pool-model-btn${x?" selected":""}"
                  data-action="${x?"remove-provider-model":"add-provider-model"}"
                  data-model-index="${O}" type="button">${x?"−":"+"}</button>
              </div>`}).join("")}
          </div>`:"";return`
        <div class="vendor-group">
          <div class="vendor-group-head">
            <button class="vendor-group-toggle" data-action="toggle-provider-vendor-group" data-vendor="${l(w)}" type="button">
              <span class="vendor-group-name">${l(w)}</span>
              ${M?`<span class="vendor-group-sel">${M} 已选</span>`:""}
              <span class="vendor-group-badge">${h.length}</span>
              <span class="vendor-group-chevron${I?" open":""}">${f("chevron")}</span>
            </button>
            <button class="pool-vendor-selall${T?" all-selected":""}" data-action="toggle-vendor-all-provider-models" data-vendor="${l(w)}" type="button" title="${T?"全不选":"全选"}">${T?"−全":"+全"}</button>
          </div>
          ${k}
        </div>`}).join(""),b=o.length?"":'<p class="pool-model-empty" style="padding:10px 2px;">还没有模型，点击“同步模型”获取，或手动添加。</p>';return`
      <div class="prov-model-pool">
        <div class="prov-pool-header">
          <span class="prov-pool-count">${r?`已选 <strong>${r}</strong> 个模型`:"还没有已选模型"}</span>
          ${o.length?`<button class="pool-selall-btn${p?" all-selected":""}" data-action="toggle-all-provider-models" type="button">${p?"全不选":"全选"}</button>`:""}
        </div>
        ${b}
        ${m}
        <div class="pool-manual-row">
          <input id="provider-manual-model-input" class="ai-input provider-model-input" placeholder="手动输入模型名" autocomplete="off" data-plain-input="true" />
          <button class="pool-manual-add-btn" data-action="add-manual-provider-model" type="button">＋</button>
        </div>
      </div>`}function So(e,t,o){const n=F(o),r=q(t?.model||"");return n.length?n.map((i,s)=>`
          <button class="model-choice-item ${r===i?"active":""}" data-action="pick-slot-model" data-slot="${e}" data-model-index="${s}">
            <span class="model-choice-name">${l(i)}</span>
            <span class="model-choice-check">${r===i?"已选":""}</span>
          </button>
        `).join(""):'<div class="model-choice-empty">当前供应商还没有可选模型，请先在“模型供应商”页同步并保存。</div>'}function mi(){const e=L(),t=Xe(e.apiPath||e.api_path||"",{allowEmpty:!0}),o=Ir(e),n=!!a.providerAdvancedOpen||!!t,r=a.providerModelSyncStatus?.[e.id],i=Mr(e.apiKey||""),s=!!e._apiKeyDirty,c=s?String(e.apiKey||""):i,d=s?a.providerKeyVisible?"text":"password":"text",p=s?a.providerKeyVisible?"隐藏":"显示":i?"更换":"显示";return`
      <section class="settings-page page-block ai-settings-page provider-editor-page">
        <div class="settings-group glass-frost ai-panel provider-editor-card">

          <div class="prov-sec">
            <h3 class="prov-sec-title">接口配置</h3>
            <label class="ai-field-label">名称</label>
            <input id="provider-name-input" class="ai-input" value="${l(e.name||"")}" placeholder="例如 SiliconFlow" data-plain-input="true" />
            <label class="ai-field-label">Base URL</label>
            <input id="provider-base-input" class="ai-input" value="${l(e.baseUrl||"")}" placeholder="https://api.example.com/v1" data-plain-input="true" />
            <div class="provider-advanced-head">
              <span class="section-eyebrow">Base URL 与 API 路径一起拼接请求地址</span>
              <button class="provider-advanced-toggle" data-action="toggle-provider-advanced" type="button">
                <span>高级选项</span>
                <span class="advanced-chevron ${n?"open":""}">${f("chevron")}</span>
              </button>
            </div>
            <div class="provider-advanced-panel ${n?"open":""}">
              <label class="ai-field-label">API 路径（可选）</label>
              <input id="provider-api-path-input" class="ai-input" value="${l(t)}" placeholder="${l(o)}" data-plain-input="true" />
              <p class="section-eyebrow">留空时自动使用 ${l(o)}</p>
            </div>
            <label class="ai-field-label">API Key</label>
            <div class="provider-key-row">
              <input id="provider-key-input" class="ai-input provider-key-input" type="${d}" value="${l(c)}" placeholder="sk-..." autocomplete="off" autocapitalize="off" spellcheck="false" data-plain-input="true" data-masked="${!s&&i?"true":"false"}" />
              <button class="provider-key-toggle" data-action="toggle-provider-key-visible" type="button" aria-label="${p} API Key">${p}</button>
            </div>
            ${i?`<p class="section-eyebrow provider-key-mask">已保存：${l(i)}</p>`:""}
          </div>

          <div class="prov-sec-divider"></div>

          <div class="prov-sec">
            <h3 class="prov-sec-title">默认模型</h3>
            <div class="provider-model-picker">
              <div class="provider-model-input-row">
                <input id="provider-default-model-input" class="ai-input provider-model-input" value="${l(e.defaultModel||"")}" placeholder="gpt-5.4" autocomplete="off" data-plain-input="true" />
                <button class="provider-model-toggle" data-action="toggle-provider-model-menu" type="button" aria-label="展开模型列表">
                  ${f("chevron")}
                </button>
              </div>
              <p id="provider-default-model-hint" class="section-eyebrow provider-model-hint">${l(bo(e.defaultModel||"",e.models||[]))}</p>
              <div id="provider-default-model-menu" class="provider-model-menu ${a.providerModelMenuOpen?"open":""}"></div>
            </div>
          </div>

          <div class="prov-sec-divider"></div>

          <div class="prov-sec">
            <div class="prov-sec-title-row">
              <h3 class="prov-sec-title" style="margin:0;">模型列表</h3>
              <button class="prov-sync-btn" data-action="sync-provider-models" data-provider="${e.id}" type="button" ${a.providerModelSyncingId===e.id?"disabled":""}>${f("reroll")}${a.providerModelSyncingId===e.id?"同步中":"同步"}</button>
            </div>
            ${pi(e)}
            ${r?.message?`<p class="provider-sync-status ${l(r.type||"")}">${l(r.message)}</p>`:'<p class="provider-sync-status muted">同步会优先请求真实模型列表；失败时保留当前列表。</p>'}
          </div>

          <div class="prov-sec-divider"></div>

          ${ie("启用供应商","关闭后将不会出现在模型选择中",!!e.enabled,"toggle-provider-enabled",e.id)}

          <div class="prov-save-row">
            <button class="prov-save-btn-main" data-action="save-provider-editor" data-provider="${e.id}" type="button">保存供应商</button>
          </div>
        </div>
      </section>
    `}async function fi(){const e=L();if(a.providerModelSyncingId)return;const t=document.getElementById("provider-base-input")?.value?.trim()||"",o=document.getElementById("provider-key-input"),n=e._apiKeyDirty?o?.value?.trim()||"":e.apiKey||"",r=ua({...e,baseUrl:t});if(!t){const i=la(e);if(!i.length){_e(e.id,"error","请先填写 Base URL 再同步模型"),u();return}const s=i.map(Je);e._allModels=s,s.forEach(c=>{a.providerModelVendorOpen[c.vendor]=!0}),_e(e.id,"success",`已载入内置列表 ${i.length} 个模型`),u();return}a.providerModelSyncingId=e.id||a.providerDraftId||"syncing",_e(e.id,"muted","正在同步模型..."),u();try{const i=await fetch(`${y}/api/settings/ai/discover-models`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({provider_id:e.id||r,provider_name:e.name||"",base_url:t,api_key:n})}),s=i.headers.get("content-type")||"",c=await i.text();if(!i.ok){let k="";try{const _=s.includes("application/json")?JSON.parse(c):null;k=_?.detail||_?.message||""}catch{}throw new Error(k||`HTTP ${i.status}`)}if(!s.includes("application/json"))throw new Error("后端返回的不是 JSON，已阻止写入模型列表");let d={};try{d=JSON.parse(c||"{}")}catch{throw new Error("后端返回 JSON 解析失败，已阻止写入模型列表")}const p=F(Array.isArray(d.models)?d.models:[]),m=la({...e,baseUrl:t}),b=F([...p,...m]);if(!b.length){_e(e.id,"error","没有获取到模型，已保留当前默认模型和已有列表。"),u();return}const w=b.map(Je),h=new Set(b.map(k=>k.toLowerCase())),I=[...w];(e._allModels||[]).forEach(k=>{const _=q(k?.id||k?.name||"");!_||h.has(_.toLowerCase())||I.push(Je(_))}),e._allModels=I,[...new Set(w.map(k=>k.vendor))].forEach(k=>{a.providerModelVendorOpen[k]=!0}),e._selectedModelIds instanceof Set||(e._selectedModelIds=new Set(e._selectedModelIds||[])),e.models=[...e._selectedModelIds];const T=Math.max(0,b.length-p.length);_e(e.id,"success",d.is_fallback||d.source==="fallback"?`已载入内置列表 ${b.length} 个模型`:T?`已同步 ${p.length} 个模型，补充内置 ${T} 个`:`已同步 ${b.length} 个模型`),u(),Ce()}catch(i){const s=String(i?.message||"同步模型失败");if(s.includes("Failed to fetch")){_e(e.id,"error","同步失败：当前前端连不上后端接口。"),u();return}_e(e.id,"error",`同步失败：${s}`),u()}finally{a.providerModelSyncingId="",u()}}rt=function(){return ca.has(a.currentView)?!1:wr()},Lt=function(){if(!ca.has(a.currentView))return Sr();const t={aiInterface:"AI 接口",mcpLibrary:"MCP 工具库",themeSettings:"主题模式",accountSettings:"我的账号",memoryService:"记忆服务",backendSync:"同步后端",exportSettings:"导出格式",defaultModels:"默认模型",modelSlot:ze(a.activeModelSlot),providerCatalog:"模型供应商",providerEditor:"编辑供应商",promptEditor:"提示词"},o=`chat-page-title ${a.currentView==="providerCatalog"?"provider-catalog-title":""}`.trim(),n=a.currentView==="providerCatalog"?`<button class="icon-btn ghost-circle" data-action="open-provider-editor-new" aria-label="新增供应商">${f("plus")}</button>`:'<span class="header-spacer"></span>';return`
      <header class="chat-page-header simple-header">
        <button class="icon-btn text-btn" data-action="back-sub-settings" aria-label="返回">${f("back")}</button>
        <div class="${o}">${l(t[a.currentView]||"设置")}</div>
        ${n}
      </header>
    `},Ot=function(){return a.currentView==="accountSettings"?zr():a.currentView==="memoryService"?Hr():a.currentView==="backendSync"?Yr():a.currentView==="exportSettings"?Xr():a.currentView==="themeSettings"?Br():a.currentView==="aiInterface"?ii():a.currentView==="mcpLibrary"?si():a.currentView==="defaultModels"?ci():a.currentView==="modelSlot"?ui():a.currentView==="providerCatalog"?di():a.currentView==="providerEditor"?mi():a.currentView==="promptEditor"?Vr():$r()},Ut=function(t){const o=t.target.closest("[data-action]"),n=o?.dataset.action;if(!n)return po(t);if(n==="open-ai-interface")return K("aiInterface");if(n==="open-mcp-library")return K("mcpLibrary");if(n==="open-theme-settings")return K("themeSettings");if(n==="open-account-settings")return K("accountSettings");if(n==="open-account-avatar"){document.getElementById("account-avatar-file")?.click();return}if(n==="open-account-nickname"){const r=window.prompt("请输入昵称",a.accountProfile?.nickname||"小酒")?.trim();if(!r)return;a.accountProfile.nickname=r,a.toast="昵称已更新",u(),D(),$(120),window.setTimeout(()=>{a.toast="",u()},1200);return}if(n==="open-account-signature"){const r=window.prompt("请输入个性签名",a.accountProfile?.signature||"")?.trim();if(!r)return;a.accountProfile.signature=r,a.toast="个性签名已更新",u(),D(),$(120),window.setTimeout(()=>{a.toast="",u()},1200);return}if(n==="open-memory-service")return K("memoryService",()=>{xe(a.currentContactId)});if(n==="memory-service-refresh"){xe(a.currentContactId,{silent:!1});return}if(n==="memory-service-sort"){a.memoryServiceSort=o.dataset.sort||"updated_at",xe(a.currentContactId,{silent:!0});return}if(n==="memory-candidate-promote"){jr(o.dataset.candidateId);return}if(n==="memory-candidate-dismiss"){Fr(o.dataset.candidateId);return}if(n==="memory-service-create"){Ur().then(()=>xe(a.currentContactId,{silent:!1})).catch(r=>{console.warn("[memory service] create failed",r),a.toast="新建记忆失败",u(),window.setTimeout(()=>{a.toast="",u()},1200)});return}if(n==="memory-service-edit"){Kr(o.dataset.memoryId).then(()=>xe(a.currentContactId,{silent:!1})).catch(r=>{console.warn("[memory service] update failed",r),a.toast="编辑记忆失败",u(),window.setTimeout(()=>{a.toast="",u()},1200)});return}if(n==="memory-service-delete"){Qr(o.dataset.memoryId).then(()=>xe(a.currentContactId,{silent:!1})).catch(r=>{console.warn("[memory service] delete failed",r),a.toast="删除记忆失败",u(),window.setTimeout(()=>{a.toast="",u()},1200)});return}if(n==="open-backend-sync")return K("backendSync");if(n==="sync-pull-now"){io();return}if(n==="sync-push-now"){se(),Ie(30),a.toast="已加入上传队列",u(),window.setTimeout(()=>{a.toast="",u()},1e3);return}if(n==="open-export-settings")return K("exportSettings");if(n==="open-default-models")return K("defaultModels");if(n==="open-model-slot")return K("modelSlot",()=>{if(a.activeModelSlot=z(o.dataset.slot),a.activeModelSlotContext=o.dataset.context==="contact"?"contact":"global",a.modelSlotMenuOpen=!1,a.activeModelSlotContext==="contact"){const r=H();a.activeModelProviderId=r?.settings?.modelProviderId||A("chat")?.providerId||a.activeModelProviderId||"openai"}else a.activeModelProviderId=A("chat")?.providerId||a.activeModelProviderId||"openai"});if(n==="open-provider-catalog")return K("providerCatalog");if(n==="open-provider-editor-new")return K("providerEditor",()=>{a.providerDraftId=`custom_${Date.now()}`,a.providerAdvancedOpen=!1,a.providerModelMenuOpen=!1,a.providerEditorDraft=pa(a.providerDraftId)});if(n==="open-provider-editor")return K("providerEditor",()=>{a.providerDraftId=o.dataset.provider;const r=U(a.providerDraftId);a.providerAdvancedOpen=!!String(r?.apiPath||r?.api_path||"").trim(),a.providerModelMenuOpen=!1,a.providerEditorDraft=pa(a.providerDraftId)});if(n==="open-prompt-editor")return K("promptEditor",()=>{a.activePromptSlot=z(o.dataset.slot)});if(n==="back-sub-settings")return Gr();if(n==="sync-provider-models"){fi();return}if(n==="toggle-provider-key-visible"){const r=L();r._apiKeyDirty?a.providerKeyVisible=!a.providerKeyVisible:(r._apiKeyDirty=!0,r.apiKey="",a.providerKeyVisible=!0),u(),window.setTimeout(()=>document.getElementById("provider-key-input")?.focus(),0);return}if(n==="toggle-provider-advanced"){a.providerAdvancedOpen=!a.providerAdvancedOpen,u();return}if(n==="toggle-model-slot-menu"){a.modelSlotMenuOpen=!1,We();return}if(n==="toggle-provider-model-menu"){a.providerModelMenuOpen=!a.providerModelMenuOpen,Ce();return}if(n==="pick-provider-default-model"){const r=L(),i=document.getElementById("provider-default-model-input")?.value||r.defaultModel||"",s=mo(i,r.models),c=q(s[Number(o.dataset.modelIndex)]||o.dataset.model||"");if(!c)return;r._selectedModelIds instanceof Set||(r._selectedModelIds=new Set(r._selectedModelIds||[])),r._selectedModelIds.add(c),r.models=[...r._selectedModelIds],r.defaultModel=c;const d=document.getElementById("provider-default-model-input");d&&(d.value=c),a.providerModelMenuOpen=!1,Ce();return}if(n==="pick-slot-provider"){if(a.activeModelSlotContext==="contact"){const s=H(),c=o.dataset.providerId||a.activeModelProviderId,d=U(c);a.activeModelProviderId=c,a.modelSlotMenuOpen=!1,s?.settings&&(s.settings.modelProviderId=c,(!q(s.settings.model)||!(d?.models||[]).includes(s.settings.model))&&(s.settings.model=d?.defaultModel||d?.models?.[0]||s.settings.model||"")),u(),$(150);return}const r=A(o.dataset.slot);r.providerId=o.dataset.providerId;const i=U(r.providerId);i&&(r.model=q(i.defaultModel)||i.models?.[0]||q(r.model)||""),a.modelSlotMenuOpen=!1,u(),D();return}if(n==="toggle-all-provider-models"){const r=L();r._selectedModelIds instanceof Set||(r._selectedModelIds=new Set(r._selectedModelIds||[]));const s=(Array.isArray(r._allModels)?r._allModels:[]).map(d=>d.id);s.length>0&&s.every(d=>r._selectedModelIds.has(d))?s.forEach(d=>r._selectedModelIds.delete(d)):s.forEach(d=>r._selectedModelIds.add(d)),r.models=[...r._selectedModelIds],u();return}if(n==="toggle-vendor-all-provider-models"){const r=o.dataset.vendor,i=L();i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[]));const c=(Array.isArray(i._allModels)?i._allModels:[]).filter(p=>(p.vendor||"Other")===r).map(p=>p.id);c.length>0&&c.every(p=>i._selectedModelIds.has(p))?c.forEach(p=>i._selectedModelIds.delete(p)):c.forEach(p=>i._selectedModelIds.add(p)),i.models=[...i._selectedModelIds],u();return}if(n==="toggle-provider-vendor-group"){const r=o.dataset.vendor;r&&(a.providerModelVendorOpen[r]=!a.providerModelVendorOpen[r]),u();return}if(n==="add-provider-model"){const r=L();r._selectedModelIds instanceof Set||(r._selectedModelIds=new Set(r._selectedModelIds||[]));const s=(Array.isArray(r._allModels)?r._allModels:[])[Number(o.dataset.modelIndex)]||{},c=q(s.id||s.name||o.dataset.modelId||"");if(c&&r._selectedModelIds.add(c),c){r.defaultModel=c;const d=document.getElementById("provider-default-model-input");d&&(d.value=c)}r.models=[...r._selectedModelIds],u();return}if(n==="remove-provider-model"){const r=L();r._selectedModelIds instanceof Set||(r._selectedModelIds=new Set(r._selectedModelIds||[]));const s=(Array.isArray(r._allModels)?r._allModels:[])[Number(o.dataset.modelIndex)]||{},c=q(s.id||s.name||o.dataset.modelId||"");c&&r._selectedModelIds.delete(c),r.models=[...r._selectedModelIds],u();return}if(n==="add-manual-provider-model"){const r=L(),i=document.getElementById("provider-manual-model-input"),s=q(i?.value||"");if((i?.value||"").trim()&&!s){alert("模型 ID 不合法，不能包含 HTML、控制字符或过长内容");return}if(!s)return;if(r._selectedModelIds instanceof Set||(r._selectedModelIds=new Set(r._selectedModelIds||[])),Array.isArray(r._allModels)||(r._allModels=[]),!r._allModels.some(c=>c.id===s)){r._allModels.push(Je(s));const c=fo(s);a.providerModelVendorOpen[c]=!0}r._selectedModelIds.add(s),r.defaultModel=s,r.models=[...r._selectedModelIds],u();return}if(n==="toggle-slot-vendor-group"){const r=o.dataset.providerId;r&&(a.slotVendorGroupOpen[r]=!a.slotVendorGroupOpen[r]),u();return}if(n==="add-model-to-slot"){const r=o.dataset.slot,i=o.dataset.providerId,s=q(o.dataset.model||"");if(!r||!i||!s)return;const c=A(r);Array.isArray(c.selectedModels)||(c.selectedModels=[]),c.selectedModels.some(d=>d.providerId===i&&d.model===s)||c.selectedModels.push({providerId:i,model:s}),u(),D();return}if(n==="remove-model-from-slot"){const r=o.dataset.slot,i=o.dataset.providerId,s=o.dataset.model;if(!r||!s)return;const c=A(r);Array.isArray(c.selectedModels)&&(c.selectedModels=c.selectedModels.filter(d=>!(d.providerId===i&&d.model===s))),u(),D();return}if(n==="add-manual-slot-model"){const r=o.dataset.slot,i=document.getElementById("model-slot-manual-input"),s=q(i?.value||"");if((i?.value||"").trim()&&!s){alert("模型 ID 不合法，不能包含 HTML、控制字符或过长内容");return}if(!r||!s)return;const c=A(r);Array.isArray(c.manualModels)||(c.manualModels=[]),c.manualModels.includes(s)||c.manualModels.push(s),u(),D();return}if(n==="remove-manual-slot-model"){const r=o.dataset.slot,i=q(o.dataset.model||"");if(!r||!i)return;const s=A(r);Array.isArray(s.manualModels)&&(s.manualModels=s.manualModels.filter(c=>c!==i)),u(),D();return}if(n==="pick-theme-mode"){a.globalSettings.theme=o.dataset.theme||a.globalSettings.theme,u(),D();return}if(n==="pick-export-format"){a.globalSettings.exportFormat=o.dataset.format||a.globalSettings.exportFormat,u(),D();return}if(n==="toggle-mcp-tool"){const r=o.dataset.toolId,c=(R().mcpLibrary?.tools||[]).find(d=>String(d.id)===String(r));if(!c)return;c.enabled=c.enabled===!1,Ea(o,c.enabled!==!1),D();return}if(n==="sync-mcp-library"){wo({silent:!1});return}if(n==="edit-contact-quick-action"){if(a.quickActionDragId)return;qn(o.dataset.quickId||"");return}if(n==="add-contact-quick-action"){const r=H(),i=$e(r),s=`custom_${Date.now()}`;i.push({id:s,label:"新快捷动作",icon:"more",prompt:"",mcpToolId:"",enabled:!0}),r.settings.quickActions=i,a.contactQuickActionEditorId=s,u(),$(150);return}if(n==="close-contact-quick-action-editor"){if(t.target.closest('[data-stop-close="1"]')&&!t.target.hasAttribute("data-action"))return;a.contactQuickActionEditorId="",a.contactQuickMcpMenuOpen=!1,u();return}if(n==="toggle-contact-quick-mcp-menu"){a.contactQuickMcpMenuOpen=!a.contactQuickMcpMenuOpen,o.closest(".qae-select-shell")?.classList.toggle("open",a.contactQuickMcpMenuOpen);return}if(n==="pick-contact-quick-mcp"){const r=o.closest(".qae-select-shell"),i=o.dataset.mcpId||"",s=document.getElementById("contact-quick-mcp");s&&(s.value=i);const c=o.textContent?.trim()||"不调用 MCP",d=r?.querySelector(".qae-select-trigger span");d&&(d.textContent=c),r?.querySelectorAll(".qae-select-option").forEach(p=>{p.classList.toggle("active",p===o)}),a.contactQuickMcpMenuOpen=!1,r?.classList.remove("open");return}if(n==="save-contact-quick-action"){const r=H(),i=$e(r),s=o.dataset.quickId||"",c=i.find(d=>d.id===s);if(!c)return;c.label=(document.getElementById("contact-quick-label")?.value||c.label||"").trim()||c.label||"蹇嵎鍔ㄤ綔",c.prompt=(document.getElementById("contact-quick-prompt")?.value||"").trim(),c.mcpToolId=(document.getElementById("contact-quick-mcp")?.value||"").trim(),c.mcpToolId&&Se(c.mcpToolId)&&(c.id=c.id||c.mcpToolId),r.settings.quickActions=i,a.contactQuickActionEditorId="",u(),$(150);return}if(n==="delete-contact-quick-action"){const r=H(),i=o.dataset.quickId||"",s=$e(r).filter(c=>c.id!==i);r.settings.quickActions=s,a.contactQuickActionEditorId===i&&(a.contactQuickActionEditorId=""),a.quickActionSwipeOpenId="",u(),$(150);return}if(n==="pick-slot-model"){const r=A(o.dataset.slot),i=U(r?.providerId),s=F(i?.models||[]),c=q(s[Number(o.dataset.modelIndex)]||o.dataset.model||"");if(!c)return;if(a.activeModelSlotContext==="contact"){const p=g(a.currentContactId)||a.contacts[0];p?.settings&&(o.dataset.slot==="consciousness"?p.settings.loopModel=c:(p.settings.model=c,p.settings.modelProviderId=a.activeModelProviderId||p.settings.modelProviderId||A("chat")?.providerId||"openai")),a.modelSlotMenuOpen=!1,u(),$(150);return}const d=A(o.dataset.slot);d.model=c,o.dataset.providerId&&(d.providerId=o.dataset.providerId),a.modelSlotMenuOpen=!1,u(),D();return}if(n==="toggle-provider-enabled"){const r=U(o.dataset.providerId||o.dataset.key);r&&(r.enabled=!r.enabled,a.providerEditorDraft&&a.providerEditorDraft.id===r.id&&(a.providerEditorDraft.enabled=r.enabled)),u(),D();return}if(n==="save-provider-editor"){const r=o.dataset.provider,i=L(),s=i._selectedModelIds instanceof Set?i._selectedModelIds:new Set(i._selectedModelIds||[]),c=F([...s]),d=U(r),p=Xe(document.getElementById("provider-api-path-input")?.value||"",{allowEmpty:!0}),m=document.getElementById("provider-default-model-input")?.value?.trim()||"";let b="";try{b=m?Cr(m,"默认模型"):c[0]||""}catch(I){alert(I.message||"默认模型不合法");return}if(!b){alert("默认模型不能为空，请手动输入或选择一个合法模型");return}const w={...d||{id:r},id:r,name:document.getElementById("provider-name-input")?.value?.trim()||"自定义供应商",baseUrl:document.getElementById("provider-base-input")?.value?.trim()||"",apiPath:p,api_path:p,apiKey:i._apiKeyDirty?document.getElementById("provider-key-input")?.value?.trim()||"":i.apiKey||"",defaultModel:b,models:c},h=R();h.providerModels={...h.providerModels||{},[r]:c},h.providers=h.providers.filter(I=>I.id!==r),h.providers.push(w),yt(),a.providerEditorDraft=null,a.providerModelMenuOpen=!1,a.currentView="providerCatalog",u(),D();return}if(n==="save-slot-prompt"){const r=z(o.dataset.slot);R().defaultPrompts[r]=document.getElementById("slot-prompt-input")?.value||"",a.currentView="defaultModels",u(),D();return}if(n==="reset-slot-prompt"){const r=z(o.dataset.slot),i=Me().defaultPrompts||{};R().defaultPrompts[r]=i[r]||"",u(),D();return}return po(t)},document.addEventListener("input",e=>{const t=e.target;if(t?.dataset?.action==="provider-search"){a.providerSearch=t.value||"",u();return}if(t?.id==="model-slot-input"){const o=g(a.currentContactId)||a.contacts[0],n=t.value||"",r=n?q(n):"";if(n&&!r){a.modelSlotMenuOpen=!1,We();return}if(a.activeModelSlotContext==="contact")o?.settings&&(a.activeModelSlot==="consciousness"?o.settings.loopModel=r:o.settings.model=r);else{const i=A(a.activeModelSlot);i&&(i.model=r)}a.modelSlotMenuOpen=!1,We();return}if(t?.id==="provider-name-input"){L().name=t.value||"";return}if(t?.id==="provider-base-input"){L().baseUrl=t.value||"";return}if(t?.id==="provider-api-path-input"){const o=L();o.apiPath=t.value||"",o.api_path=t.value||"";return}if(t?.id==="provider-key-input"){const o=L();t.dataset?.masked==="true"&&(t.value="",t.dataset.masked="false"),o._apiKeyDirty=!0,o.apiKey=String(t.value||"");return}if(t?.id==="provider-models-input"){L().models=String(t.value||"").split(",").map(o=>o.trim()).filter(Boolean),Ce();return}if(t?.id==="voice-slot-provider-input"){const o=A("voice");o&&(o.provider=t.value||"");return}if(t?.id==="voice-slot-service-url-input"){const o=A("voice");o&&(o.service_url=t.value||"",o.base_url=t.value||"");return}if(t?.id==="voice-slot-voice-id-input"){const o=A("voice");o&&(o.voice_id=t.value||"");return}if(t?.id==="voice-slot-speaker-input"){const o=A("voice");o&&(o.speaker=t.value||"");return}if(t?.id==="voice-slot-emotion-input"){const o=A("voice");o&&(o.emotion=t.value||"");return}if(t?.id==="voice-slot-speed-input"){const o=A("voice");o&&(o.speed=t.value||"");return}if(t?.id==="voice-slot-format-input"){const o=A("voice");o&&(o.format=t.value||"");return}if(t?.id==="provider-default-model-input"){L().defaultModel=t.value||"",a.providerModelMenuOpen=!0,Ce();return}if(t?.dataset?.contactField==="persona"){const o=H();if(!o)return;o.persona=t.value||"",$(180),ri(o.id,o.persona)}}),document.addEventListener("paste",e=>{const t=e.target;if(t?.id!=="provider-key-input")return;e.preventDefault();const o=String(e.clipboardData?.getData("text/plain")||"").trim();t.value=o;const n=L();n._apiKeyDirty=!0,n.apiKey=o,t.dispatchEvent(new Event("input",{bubbles:!0}))}),document.addEventListener("change",e=>{const t=e.target;if(t?.id==="nc-avatar-file"){const o=t.files?.[0];if(!o)return;a.newContactDraft={...a.newContactDraft||it(),name:document.getElementById("nc-name")?.value||a.newContactDraft?.name||"",agentId:document.getElementById("nc-agent-id")?.value||a.newContactDraft?.agentId||"",bio:document.getElementById("nc-bio")?.value||a.newContactDraft?.bio||""},Ft(o,"new-contact"),t.value="";return}if(t?.id==="account-avatar-file"){const o=t.files?.[0];if(!o)return;Ft(o,"account"),t.value="";return}if(t?.id==="contact-avatar-file"){const o=t.files?.[0];if(!o||!g(a.currentContactId))return;Ft(o,"contact"),t.value="";return}if(t?.id==="moment-image-input"){const o=t.files?.[0];if(!o)return;a.momentComposerImageName=o.name||"";const n=new FileReader;n.onload=()=>{a.momentComposerImage=typeof n.result=="string"?n.result:"",u()},n.readAsDataURL(o);return}if(t?.dataset?.action==="select-slot-model"){const o=A(t.dataset.slot);if(!o)return;o.model=t.value,D();return}String(t?.id||"").startsWith("voice-slot-")&&D()});function gi(e,t){const o=H(),n=$e(o),r=n.findIndex(s=>s.id===e);if(r<0)return;const[i]=n.splice(r,1);if(!t)n.splice(0,0,i);else{const s=n.findIndex(c=>c.id===t);s<0?n.push(i):n.splice(s+1,0,i)}o.settings.quickActions=n,$(120)}const v={id:"",mode:"idle",startX:0,startY:0,currentY:0,hoverId:"",pendingDropId:null,pressTimer:null};function et(){v.pressTimer&&(clearTimeout(v.pressTimer),v.pressTimer=null)}function $o(){et(),v.id="",v.mode="idle",v.startX=0,v.startY=0,v.currentY=0,v.hoverId="",v.pendingDropId=null}function ga(){S()?.querySelectorAll(".quick-action-swipe.drop-hint-after").forEach(e=>e.classList.remove("drop-hint-after"))}function bi(e,t){const o=S()?.querySelector(`.quick-action-swipe[data-quick-id="${e}"]`);if(!o)return;const n=o.querySelector(".quick-action-row"),r=o.querySelector(".quick-action-delete");if(!n||!r)return;const i=Math.max(-74,Math.min(0,Number(t)||0)),s=Math.min(1,Math.abs(i)/74);n.style.transform=`translateX(${i}px)`,r.style.opacity=String(s),r.style.transform=`translateX(${18*(1-s)}px) scale(${.97+.03*s})`,r.style.pointerEvents=s>.98?"auto":"none"}function Ae(e){const t=S()?.querySelector(`.quick-action-swipe[data-quick-id="${e}"]`);if(!t)return;const o=t.querySelector(".quick-action-row"),n=t.querySelector(".quick-action-delete");o&&o.style.removeProperty("transform"),n&&(n.style.removeProperty("opacity"),n.style.removeProperty("transform"),n.style.removeProperty("pointer-events"))}function ko(){if(S()?.querySelectorAll(".quick-action-swipe.quick-dragging").forEach(n=>n.classList.remove("quick-dragging")),S()?.querySelectorAll(".quick-action-row.touch-dragging").forEach(n=>{n.classList.remove("touch-dragging"),n.style.removeProperty("transform")}),!a.quickActionDragId)return;const e=S()?.querySelector(`.quick-action-row[data-quick-id="${a.quickActionDragId}"]`),t=e?.closest(".quick-action-swipe");if(!e||!t)return;t.classList.add("quick-dragging"),e.classList.add("touch-dragging");const o=v.currentY-v.startY;e.style.transform=`translateY(${o}px) scale(1.04) rotate(1.2deg)`}function hi(e){const t=Array.from(S()?.querySelectorAll(".quick-action-swipe[data-quick-id]")||[]).filter(n=>n.dataset.quickId!==a.quickActionDragId);if(!t.length)return"";let o="";for(const n of t){const r=n.getBoundingClientRect(),i=r.top+r.height/2;if(e>=i)o=n.dataset.quickId;else break}return o}function Io(){const e=v.pendingDropId,t=a.quickActionDragId;ga(),a.quickActionDragId="",a.quickActionDropHintId="",a.quickActionDropDirection="",a.quickActionReorderPulseId="",t&&e!==null&&gi(t,e),u()}function _o(e,t,o){et(),a.quickActionSwipeOpenId&&a.quickActionSwipeOpenId!==o&&(Ae(a.quickActionSwipeOpenId),a.quickActionSwipeOpenId="",u()),v.id=o,v.mode="pending",v.startX=e,v.startY=t,v.currentY=t,v.hoverId="",v.pressTimer=window.setTimeout(()=>{if(!(v.mode!=="pending"||!v.id)&&(v.mode="drag",v.pendingDropId=null,a.quickActionDragId=v.id,ko(),navigator?.vibrate))try{navigator.vibrate(12)}catch{}},280)}function Mo(e,t,o){if(!v.id)return;const n=e-v.startX,r=t-v.startY;if(v.mode==="pending"){Math.abs(n)>12&&Math.abs(n)>Math.abs(r)?(et(),v.mode="swipe"):Math.abs(r)>10&&(et(),v.mode="cancelled");return}if(v.mode==="swipe"){const c=a.quickActionSwipeOpenId===v.id?-74:0,d=Math.max(-74,Math.min(0,c+n));bi(v.id,d);return}if(v.mode!=="drag")return;o?.(),v.currentY=t,ko();const i=hi(t);i!==v.pendingDropId&&(v.pendingDropId=i,ga(),i&&S()?.querySelector(`.quick-action-swipe[data-quick-id="${i}"]`)?.classList.add("drop-hint-after"))}function Co(e){if(v.id){if(et(),v.mode==="swipe"){const t=a.quickActionSwipeOpenId===v.id,o=e-v.startX;(t?-74+o:o)<-36?(a.quickActionSwipeOpenId=v.id,Ae(v.id),u()):t&&o>22?(a.quickActionSwipeOpenId="",Ae(v.id),u()):(Ae(v.id),t&&(a.quickActionSwipeOpenId=v.id,u()))}v.mode==="drag"&&Io(),$o()}}document.addEventListener("touchstart",e=>{if(jt(e.target)||e.target.closest(".quick-action-open"))return;const t=e.target.closest(".quick-action-row");if(!t){!e.target.closest(".quick-action-delete")&&!e.target.closest(".quick-action-swipe")&&a.quickActionSwipeOpenId&&(Ae(a.quickActionSwipeOpenId),a.quickActionSwipeOpenId="",u());return}const o=e.touches?.[0];o&&_o(o.clientX,o.clientY,t.dataset.quickId||"")},{passive:!0}),document.addEventListener("touchmove",e=>{const t=e.touches?.[0];t&&Mo(t.clientX,t.clientY,()=>e.preventDefault())},{passive:!1}),document.addEventListener("touchend",e=>{const t=e.changedTouches?.[0];Co(t?.clientX||v.startX)},{passive:!0}),document.addEventListener("touchcancel",()=>{Ae(v.id),ga(),v.mode==="drag"&&Io(),$o()},{passive:!0});let xo=0;function vi(e){const t=e.target?.closest?.(".codex-toggle");if(!t)return;const o=Date.now();if(o-xo<320){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation?.();return}xo=o,e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation?.(),mt(t.dataset.contactId)}["pointerdown","touchstart","mousedown","click"].forEach(e=>{document.addEventListener(e,vi,!0)}),document.addEventListener("mousedown",e=>{if(jt(e.target)||e.target.closest(".quick-action-open"))return;const t=e.target.closest(".quick-action-row");if(!t||e.button!==0){!e.target.closest(".quick-action-delete")&&!e.target.closest(".quick-action-swipe")&&a.quickActionSwipeOpenId&&(Ae(a.quickActionSwipeOpenId),a.quickActionSwipeOpenId="",u());return}_o(e.clientX,e.clientY,t.dataset.quickId||"")}),document.addEventListener("mousemove",e=>{Mo(e.clientX,e.clientY,()=>e.preventDefault())}),document.addEventListener("mouseup",e=>{Co(e.clientX)});const yi=Nt;Nt=function(){return yi()},document.addEventListener("DOMContentLoaded",()=>{R(),Jr(),wo(),yo(),ce(),Ze(a.currentContactId)}),document.addEventListener("focusin",e=>{const t=e.target;if(t?.id==="model-slot-input"){a.modelSlotMenuOpen=!1,We();return}if(t?.id==="provider-default-model-input"&&(a.providerModelMenuOpen=!0,Ce()),t?.id==="provider-key-input"&&t.dataset?.masked==="true"){const o=L();t.value="",t.dataset.masked="false",o._apiKeyDirty=!0,o.apiKey="",a.providerKeyVisible=!0,t.type="text"}}),document.addEventListener("click",e=>{if(ca.has(a.currentView)&&a.currentView==="modelSlot"&&!e.target.closest('#model-slot-input, .provider-model-picker, [data-action="toggle-model-slot-menu"]')&&a.modelSlotMenuOpen){a.modelSlotMenuOpen=!1,We();return}if(a.currentView!=="providerEditor")return;!e.target.closest(".provider-model-picker")&&a.providerModelMenuOpen&&(a.providerModelMenuOpen=!1,Ce())})})();
