(()=>{const rt=[{id:"ayan",name:"阿延",handle:"@ayan",bio:"小酒，今天也要开开心心哦～",status:"在线",roleTag:"特别关注",lastMessage:"先聊天详情页。头部、气泡、输入区一起收掉，其他页自然顺。",lastTime:"刚刚",unread:2,pinned:!0,avatar:"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80",theme:"rose",settings:{model:"gpt-5.4",modelProviderId:"openai",temperature:.72,topP:.9,contextCount:64,thinkBudget:48,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!0,proactiveFrequency:60,memoryEnabled:!0},roomBackground:"点阵",chatTheme:"default",bubbleTheme:"默认主题",topics:[{id:"t1",title:"最近状态",updatedAt:"今天 21:40",count:24},{id:"t2",title:"睡眠记录",updatedAt:"昨天",count:18},{id:"t3",title:"网页 UI",updatedAt:"3天前",count:41}],messages:[{id:"m1",role:"ai",text:"今天把你丢给我的文件都翻了一遍。页面可以更可爱，真正夹棒的是里面的空壳。",time:"21:48"},{id:"m2",role:"user",text:"所以该先改哪里？",time:"21:49"},{id:"m3",role:"ai",text:"先聊天详情页。头部、气泡、输入区一起收掉，其他页自然顺。",time:"21:49",thinking:"她已经给了明确起点，先改核心路径能更快出效果。"}]},{id:"azheng",name:"阿争",handle:"@azheng",bio:"我把草稿整理好了，要继续吗？",status:"忙碌",roleTag:"同事",lastMessage:"我把草稿整理好了，要继续吗？",lastTime:"12分钟前",unread:0,pinned:!1,avatar:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300&q=80",theme:"mist",settings:{model:"gpt-5.4",modelProviderId:"openai",temperature:.45,topP:.8,contextCount:48,thinkBudget:36,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!1,proactiveFrequency:30,memoryEnabled:!0},roomBackground:"点阵",chatTheme:"default",bubbleTheme:"默认主题",topics:[{id:"t4",title:"版本梳理",updatedAt:"今天 23:18",count:12},{id:"t5",title:"说明文档",updatedAt:"昨天",count:8}],messages:[{id:"m4",role:"ai",text:"我把草稿整理好了，要继续吗？",time:"23:18"}]},{id:"xiaoying",name:"小樱",handle:"@sakura",bio:"周末去看展吗？",status:"在线",roleTag:"朋友",lastMessage:"周末去看展吗？",lastTime:"1小时前",unread:1,pinned:!1,avatar:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80",theme:"cream",settings:{model:"gpt-5.4",modelProviderId:"openai",temperature:.66,topP:.95,contextCount:32,thinkBudget:24,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!0,proactiveFrequency:20,memoryEnabled:!1},roomBackground:"点阵",chatTheme:"default",bubbleTheme:"默认主题",topics:[{id:"t6",title:"周末计划",updatedAt:"今天",count:6}],messages:[{id:"m5",role:"ai",text:"周末去看展吗？我知道有个新的展。",time:"20:22"}]}],xn=[{id:"p0",contactId:"me",time:"23:36",mood:"开心",content:"今天的天空很温柔。",image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80",likes:["我"],comments:[]},{id:"p1",contactId:"ayan",time:"21:20",mood:"主动",content:"你醉了先看这个。",image:"",likes:["我","阿延"],comments:[{author:"我",text:"我收到了"}]},{id:"p2",contactId:"xiaoying",time:"19:08",mood:"经常",content:"晚上跑了三公里。",image:"",likes:[],comments:[]}],Qa=[],st=[{id:"health",label:"Health",icon:"health"},{id:"schedule",label:"日程",icon:"calendar"},{id:"weather",label:"天气",icon:"weather"},{id:"files",label:"文件",icon:"file"},{id:"quote",label:"引用",icon:"quote"},{id:"more",label:"更多",icon:"more"}];function Ya(){return{tools:st.map(e=>({id:e.id,label:e.label,icon:e.icon,prompt:"",enabled:!0}))}}const n={currentTab:"chats",currentView:"list",currentContactId:"",currentSettingsTab:"basic",cotLogMode:"long",activityLogEntries:[],activityLogLoading:!1,activityLogLoadedAt:"",quoteMomentId:null,quoteMessageId:null,momentComposerOpen:!1,momentComposerText:"",momentComposerImage:"",momentComposerImageName:"",momentComposerEditingId:"",momentsActorType:"user",commentSheetMomentId:null,activeMenuMomentId:null,activeBubbleToolsId:null,suppressBubbleToggle:!1,toast:"",topicConfirmOpen:!1,rpRooms:[],currentRpRoomId:"",currentRpMessages:[],conversations:{},rpMessages:{},rpRoomDialogOpen:!1,rpRoomDialogMode:"create",rpRoomForm:{name:"",world_setting:"",user_role:"",ai_role:""},rpBackView:"list",contacts:[],moments:structuredClone(Qa),actions:structuredClone(st),globalSettings:{theme:"奶油粉",notifications:!0,momentsNotify:!0,autoScroll:!0,defaultModel:"gpt-5.4",provider:"OpenAI",searchService:"默认搜索",voiceService:"未连接",mcpEnabled:!0,exportFormat:"json"},accountProfile:{avatar:"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80",nickname:"小酒",signature:"管理个人资料与基础偏好"},newContactAvatar:"",newContactDraft:{name:"",agentId:"",bio:"",avatar:""},avatarCropper:null,showAttach:!1,contactQuickActionEditorId:"",contactQuickMcpMenuOpen:!1,quickActionSwipeOpenId:"",quickActionDragId:"",quickActionSuppressClickUntil:0,quickActionDropHintId:"",quickActionReorderPulseId:"",quickActionDropDirection:"",contactModelAdvancedOpen:!1,companionState:{recent_topics:[],current_mood:"",open_loops:[],proactive_cooldown_until:null,impression:null,relationship_progress:null,likes_summary:null,summary_updated_at:null,updated_at:""},openThinkingIds:{},streamingAbortController:null,animatedMsgIds:{},assistantPlayback:{token:"",timer:null},historyLoadingContactIds:{},historyLoadedContactIds:{},rpCurtainRunning:!1},ye=new Map,w=()=>document.getElementById("chat-app-root"),h=e=>n.contacts.find(t=>t.id===e),Ke=e=>n.moments.find(t=>t.id===e),l=(e="")=>String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),ct=[{key:"default",name:"默认主题",desc:"干净柔和的默认聊天界面",roomTheme:"rose",aliases:["默认玫瑰","默认"]},{key:"pink",name:"蜜桃粉",desc:"更甜一点的粉色聊天氛围",roomTheme:"rose",aliases:["奶茶"]},{key:"dark",name:"夜色",desc:"低亮度深色聊天界面",roomTheme:"rose",aliases:[]},{key:"glass",name:"玻璃雾",desc:"通透轻雾感的玻璃界面",roomTheme:"mist",aliases:["晴空"]}],An=["windowsill","tape"];function Lt(e){const t=String(e||"").trim();return t&&ct.find(o=>o.key===t||o.name===t||o.aliases.includes(t))?.key||"default"}function Tn(e){const t=Lt(e);return ct.find(a=>a.key===t)||ct[0]}function Dt(e){return Lt(e?.chatTheme||e?.bubbleTheme)}function Ot(e){return Tn(e).name}const En=1500,Rt=8e3;function Pn(e){return e?e.replace(/<tool_call>[\s\S]*?<\/tool_call>/g,"").replace(/<tool_call>[\s\S]*$/,"").replace(/<\/?(thead|tbody|tr|td|th|table|tool|function|call)[^>]*>/gi,"").replace(/<[^>\n]{1,80}>/g,"").replace(/\n{3,}/g,`

`).trim():""}function we(e){return e==null?"":typeof e=="string"?e:typeof e=="number"||typeof e=="boolean"?String(e):""}function Vt(e,t="",a=""){const o=Pn(we(e));if(!o)return"";const i=o.replace(/\s+/g," ").trim(),r=we(t).replace(/\s+/g," ").trim(),s=we(a).replace(/\s+/g," ").trim();return!i||r&&(i===r||r.includes(i)&&i.length>=8)||s&&(s.includes(i)||s.slice(Math.max(0,s.length-i.length-12)).includes(i))?"":o}function Bt(e="",t=""){const a=we(e),o=we(t);return o?a?/[\s\n]$/.test(a)||/^[\s\n，。！？、；：,.!?;:）】》]/.test(o)?a+o:/[\x00-\x7F]$/.test(a)||/^[\x00-\x7F]/.test(o)?`${a} ${o}`:a+o:o:a}function qn(){return new Promise(e=>requestAnimationFrame(e))}function zt(e){const t=Pn(e);return t?t.length<=En?t:`（已截断，共 ${t.length} 字）
${t.slice(-En)}`:""}const Xa='<svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',Ga='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',Ja='<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',Wa='<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',Za='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';function eo(e){const t=String(e||"").toLowerCase();return/time|clock|date/.test(t)?Ga:/view|read|file|diary|memory|search/.test(t)?Ja:Xa}function to(e){const t=!!e.streaming,a=t?"tl-active":"tl-done",o=t?zt(e.thinking):e.thinking||"",r=(o||"").replace(/\s+/g," ").trim()||"思考中…",s=r.length>36?r.slice(0,36)+"…":r;return`
        <div class="thinking-line ${a}" id="tl-line-${e.id}" data-action="toggle-thinking-line" data-id="${e.id}">
          <div class="thinking-dot"></div>
          <div class="thinking-text-wrap">
            <span class="thinking-text" id="tl-text-${e.id}">${l(s)}</span>
            <div class="thinking-heart">${Wa}</div>
            <div class="thinking-fade"></div>
          </div>
          <div class="thinking-expand">${Za}</div>
        </div>
        <div class="thinking-full" id="tl-full-${e.id}">
          <div class="thinking-full-inner" id="thinking-${e.id}">${l(o)}</div>
        </div>`}function no(e=[]){return e.length?`<div class="tool-lines-wrap">${e.map(a=>{const o=a.status==="running"?"tl-active":"tl-done",i=`${a.name} → ${a.status==="running"?"调用中…":"完成"}`;return`
          <div class="tool-line ${o}">
            <div class="tool-dot"></div>
            <div class="tool-icon">${eo(a.name)}</div>
            <span class="tool-text">${l(i)}</span>
          </div>`}).join("")}</div>`:""}const Ln=e=>new Promise(t=>window.setTimeout(t,e));function Dn(e){const t=String(e||"").replace(/\r\n/g,`
`).trim();if(!t)return[];const o=t.replace(/[ \t]+\n/g,`
`).replace(/\n{3,}/g,`

`).split(/\n{2,}/).map(c=>String(c||"").trim()).filter(Boolean),i=[],r=c=>{const d=String(c||"").trim();if(d){if(i.length&&d.length<=4){i[i.length-1]+=d;return}i.push(d)}},s=c=>{const d=String(c||"").split(new RegExp("(?<=[。！？!?…])\\s*","u")).map(m=>m.trim()).filter(Boolean);if(d.length<=1){r(c);return}let p="";d.forEach(m=>{const f=p?`${p}${m}`:m;p&&f.length>90?(r(p),p=m):p=f}),r(p)};return o.forEach(c=>{c.length<=110?r(c):s(c)}),i.filter(Boolean)}function ao(e){const t=String(e||"").trim().length;return t<=10?300+Math.floor(Math.random()*201):t<=24?600+Math.floor(Math.random()*301):900+Math.floor(Math.random()*301)}function Le(){n.assistantPlayback.token="",n.assistantPlayback.timer&&(window.clearTimeout(n.assistantPlayback.timer),n.assistantPlayback.timer=null)}async function On(e,t,a={}){const o=Array.isArray(t)?t.filter(s=>String(s||"").trim()):[];if(!e||!o.length)return;Le();const i=`reply_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;n.assistantPlayback.token=i;const r=Number.isInteger(a.startIndex)?a.startIndex:e.messages.length;for(let s=0;s<o.length;s+=1){if(n.assistantPlayback.token!==i)return;const c={id:`ai_chunk_${Date.now()}_${s}_${Math.random().toString(36).slice(2,6)}`,role:"ai",text:o[s],content:o[s],time:P(),created_at:new Date().toISOString()};if(s===0&&(a.thinking&&(c.thinking=a.thinking),a.toolCalls&&(c.toolCalls=a.toolCalls)),s===0&&a.replaceId){const d=e.messages.findIndex(p=>p.id===a.replaceId);d!==-1?e.messages[d]=c:e.messages.splice(Math.min(r,e.messages.length),0,c)}else{const d=Math.min(r+s,e.messages.length);e.messages.splice(d,0,c)}if(e.lastMessage=c.text,e.lastTime=c.time,u(),H(),s>=o.length-1)break;await new Promise(d=>{n.assistantPlayback.timer=window.setTimeout(d,ao(o[s]))}),n.assistantPlayback.timer=null}n.assistantPlayback.token===i&&(n.assistantPlayback.token="",n.assistantPlayback.timer=null),$(120)}function De(e){const t=e&&typeof e=="object"?e:{},a=i=>Array.isArray(i)?i.map(r=>String(r||"").trim()).filter(Boolean):[],o=i=>i!=null&&String(i).trim()?String(i).trim():null;return{recent_topics:a(t.recent_topics),current_mood:String(t.current_mood||"").trim(),open_loops:a(t.open_loops),proactive_cooldown_until:t.proactive_cooldown_until?String(t.proactive_cooldown_until):null,impression:o(t.impression),relationshipProgress:o(t.relationship_progress??t.relationshipProgress),likesSummary:o(t.likes_summary??t.likesSummary),summaryUpdatedAt:o(t.summary_updated_at??t.summaryUpdatedAt),updated_at:String(t.updated_at||"").trim()}}function oo(){const e=De(n.companionState);return e.current_mood?`情绪：${e.current_mood}`:e.open_loops[0]?`进行中：${e.open_loops[0]}`:e.recent_topics[0]?`最近话题：${e.recent_topics[0]}`:"暂无状态"}function Se(){if(n.momentsActorType==="agent"){const e=K();return{author_type:"agent",author_id:e?.id||n.currentContactId||"default",author_name:e?.name||"当前角色",avatar:e?.avatar||""}}return{author_type:"user",author_id:"me",author_name:n.accountProfile?.nickname||"我",avatar:n.accountProfile?.avatar||"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80"}}function E(e={}){const t=Array.isArray(e.likes)?e.likes:[],a=Array.isArray(e.comments)?e.comments:[],o=String(e.author_type||(e.contactId==="me"?"user":"agent")),i=String(e.author_id||(o==="user"?"me":e.contactId||"default"));return{id:String(e.id||`p${Date.now()}`),author_type:o,author_id:i,content:String(e.content||""),image:String(e.image||""),mood:String(e.mood||""),time:String(e.time||""),created_at:String(e.created_at||""),updated_at:String(e.updated_at||""),likes:t.map(r=>typeof r=="string"?{author_type:"user",author_id:r==="我"?"me":r,author_name:r}:{author_type:String(r?.author_type||"user"),author_id:String(r?.author_id||"me"),author_name:String(r?.author_name||"")}),comments:a.map(r=>({author_type:String(r?.author_type||"user"),author_id:String(r?.author_id||"me"),author_name:String(r?.author_name||r?.author||""),text:String(r?.text||"")}))}}function Rn(e){const t=E(e);if(t.author_type==="agent"){const a=h(t.author_id);return{name:a?.name||t.author_id||"角色",avatar:a?.avatar||""}}return{name:n.accountProfile?.nickname||"我",avatar:n.accountProfile?.avatar||"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80"}}function Vn(e){const t=E(e);return t.author_type==="user"?t.author_id==="me":t.author_id===(n.currentContactId||K()?.id||"default")}function Bn(e=[]){return e.map(t=>t.author_name||(t.author_type==="user"?"我":h(t.author_id)?.name||t.author_id)).join("、")}function io(e,t,a){const o=h(n.currentContactId);o&&(o[e]=t,n.toast=a,u(),$(120),window.setTimeout(()=>{n.toast="",u()},1200))}function ro(e){const t=String(e).toLowerCase();return["health","heart"].includes(t)?"health":["calendar","schedule","date"].includes(t)?"calendar":["weather","cloud"].includes(t)?"weather":["file","files","doc","document"].includes(t)?"file":["quote","reply"].includes(t)?"quote":(["more","tool","tools"].includes(t),"more")}const Ht={get_current_time:"时间",get_weather:"天气",get_health_summary:"健康",web_search:"搜索",fetch_url:"网页",add_todo:"待办",list_todos:"待办列表",complete_todo:"完成待办",add_note:"便签",list_notes:"便签列表"},zn=new Set(["get_current_time","get_weather","get_health_summary","web_search","fetch_url","add_todo","list_todos","complete_todo","add_note","list_notes"]);function $e(e){return zn.has(String(e||"").trim())}function fe(e,t){if(typeof e=="string"){const r=String(e||`mcp_${t}`);return{id:r,label:Ht[r]||e||`工具${t+1}`,icon:"more",prompt:"",mcpToolId:$e(r)?r:"",enabled:!0}}const a=e?.id||e?.toolId||e?.name||`mcp_${t}`,o=String(a),i=Ht[o]||e?.label||e?.name||e?.title||`工具${t+1}`;return{id:o,label:String(i),icon:ro(e?.icon||e?.type||e?.category||"more"),prompt:String(e?.prompt||e?.message||""),mcpToolId:String(e?.mcpToolId||e?.toolId||($e(o)?o:"")),enabled:e?.enabled!==!1}}function Hn(){const t=B()?.mcpLibrary?.tools;if(!Array.isArray(t)||!t.length)return st;const a=t.map(fe).filter(o=>$e(o.id)).filter(o=>o.enabled!==!1);return a.length?a:st}function K(){return h(n.currentContactId)||n.contacts[0]}function Ie(e){return e?.settings?(!Array.isArray(e.settings.quickActions)||!e.settings.quickActions.length?e.settings.quickActions=Hn().map((t,a)=>({...fe(t,a)})):e.settings.quickActions=e.settings.quickActions.map((t,a)=>fe(t,a)),e.settings.quickActions):[]}function Nt(e=K()){const t=Ie(e).filter(a=>a.enabled!==!1);return t.length?t:Hn()}function g(e){const t='viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"',a={back:`<svg ${t}><path d="M15 18l-6-6 6-6"/></svg>`,plus:`<svg ${t}><path d="M12 5v14M5 12h14"/></svg>`,search:`<svg ${t}><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg>`,history:`<svg ${t}><path d="M3 12a9 9 0 101.9-5.6"/><path d="M3 4v4h4"/><path d="M12 7v5l3 2"/></svg>`,settings:`<svg ${t}><path d="M12 3v3M12 18v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M3 12h3M18 12h3M4.9 19.1L7 17M17 7l2.1-2.1"/><circle cx="12" cy="12" r="3.3"/></svg>`,more:`<svg ${t}><circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>`,heart:`<svg ${t}><path d="M12 20.5s-7-4.4-7-10a4 4 0 017-2.5A4 4 0 0119 10.5c0 5.6-7 10-7 10z"/></svg>`,heartFilled:'<svg viewBox="0 0 24 24" fill="#B595C9" stroke="none" stroke-width="0"><path d="M12 20.5s-7-4.4-7-10a4 4 0 017-2.5A4 4 0 0119 10.5c0 5.6-7 10-7 10z"/></svg>',comment:`<svg ${t}><path d="M7 18l-3 2 1-3.8A7.8 7.8 0 014.2 13 7.8 7.8 0 1112 20a8 8 0 01-5-2z"/><path d="M8.5 10.5h7M8.5 13.5h4.5"/></svg>`,chatArrow:`<svg ${t}><path d="M4.8 18.2l.9-3.3A7.5 7.5 0 014.5 11 7.5 7.5 0 1112 18.5a7.4 7.4 0 01-3.6-.9z"/><path d="M10 9l4 3-4 3"/><path d="M14 12H8"/></svg>`,send:`<svg ${t}><path d="M21 3L10 14"/><path d="M21 3l-7 18-4-7-7-4z"/></svg>`,close:`<svg ${t}><path d="M18 6L6 18M6 6l12 12"/></svg>`,camera:`<svg ${t}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,attach:`<svg ${t}><path d="M21 11.5l-8.7 8.7a5 5 0 01-7.1-7.1l9.2-9.2a3.5 3.5 0 015 5L9 19.3a2 2 0 01-2.8-2.8l8.5-8.5"/></svg>`,quote:`<svg ${t}><path d="M9 7H5v5h4v5H4v-5c0-2.8 1.8-5 5-5zM20 7h-4v5h4v5h-5v-5c0-2.8 1.8-5 5-5z"/></svg>`,reroll:`<svg ${t}><path d="M20 11a8 8 0 10-2.3 5.7"/><path d="M20 4v7h-7"/></svg>`,cot:`<svg ${t}><path d="M12 4v16M4 12h16"/><path d="M7.5 7.5l9 9M16.5 7.5l-9 9" opacity="0.18"/></svg>`,bubbleHeart:`<svg ${t}><path d="M12 19.3s-5.8-3.5-5.8-8a3.7 3.7 0 016.1-2.8 3.7 3.7 0 015.9 2.8c0 4.5-5.6 8-5.6 8z"/></svg>`,weather:`<svg ${t}><path d="M6 16a4 4 0 010-8 5.5 5.5 0 0110.4-1.8A4 4 0 1118 16H6z"/></svg>`,calendar:`<svg ${t}><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>`,file:`<svg ${t}><path d="M8 3h6l5 5v11a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z"/><path d="M14 3v5h5"/></svg>`,health:`<svg ${t}><path d="M12 20s-6.5-4-6.5-9.2A4.3 4.3 0 0112 7a4.3 4.3 0 016.5 3.8C18.5 16 12 20 12 20z"/><path d="M9.2 12h1.8l1-2.1 1.2 4 1-1.9h1.6"/></svg>`,toggleOff:'<svg viewBox="0 0 52 32" fill="none"><rect x="1.5" y="1.5" width="49" height="29" rx="14.5" fill="rgba(255,255,255,.7)" stroke="rgba(150,122,133,.14)"/><circle cx="16" cy="16" r="11" fill="#fff"/></svg>',toggleOn:'<svg viewBox="0 0 52 32" fill="none"><rect x="1.5" y="1.5" width="49" height="29" rx="14.5" fill="#e9d7ff" stroke="rgba(120,90,150,.14)"/><circle cx="36" cy="16" r="11" fill="#fff"/></svg>',chevron:`<svg ${t}><path d="M9 6l6 6-6 6"/></svg>`,tabChat:`<svg ${t}><path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 2 .6 3.9 1.6 5.4L2 22l4.8-1.3A9.9 9.9 0 0012 22c5.5 0 10-4.5 10-10z"></path></svg>`,tabMoments:`<svg ${t}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,tabSettings:`<svg ${t}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,actionDots:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>',pencil:`<svg ${t}><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`,trash:`<svg ${t}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,stop:'<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="7" y="7" width="10" height="10" rx="2"/></svg>'};return a[e]||a.more}function Nn(){u()}function jt(e){const t=()=>{const a=w()?.querySelector(".chat-app-body");a&&(a.scrollTop=e)};requestAnimationFrame(()=>{t(),requestAnimationFrame(t),window.setTimeout(t,0)})}function jn(){const e=w()?.querySelector(".chat-app-body"),t=e?e.scrollTop:0,a=window.scrollY||window.pageYOffset||0;u(),jt(t),requestAnimationFrame(()=>{window.scrollTo(0,a),requestAnimationFrame(()=>window.scrollTo(0,a))})}function ee(){if(n.currentView==="moments"){jn();return}u()}function so(e,t){n.moments=n.moments.map(a=>{const o=E(a);if(o.id!==e)return a;const r=o.likes.some(s=>s.author_type===t.author_type&&s.author_id===t.author_id)?o.likes.filter(s=>!(s.author_type===t.author_type&&s.author_id===t.author_id)):[{author_type:t.author_type,author_id:t.author_id,author_name:t.author_name},...o.likes];return{...o,likes:r}})}function co(e,t,a){n.moments=n.moments.map(o=>{const i=E(o);return i.id!==e?o:{...i,comments:[{author_type:t.author_type,author_id:t.author_id,author_name:t.author_name,text:a},...i.comments]}})}function Fn(e,t){e&&(e.classList.toggle("on",!!t),e.classList.toggle("off",!t),e.setAttribute("aria-pressed",t?"true":"false"),e.innerHTML=gt(t),e.classList.remove("switch-animating"),e.offsetWidth,e.classList.add("switch-animating"),clearTimeout(e.__switchAnimTimer),e.__switchAnimTimer=setTimeout(()=>e.classList.remove("switch-animating"),260))}function u(){const e=w();if(!e)return;Un(),["room","rpRoom"].includes(n.currentView)||(n.showAttach=!1),n.currentView!=="moments"&&(n.momentComposerOpen=!1);const t=e.querySelector(".chat-app-body"),a=t?t.scrollTop:0,o=h(n.currentContactId)||n.contacts[0],i=Dt(o),r=n.globalSettings?.theme||"",s=An.includes(r)?r:i;e.dataset.theme=s,e.removeAttribute("data-bound"),e.innerHTML=`
      <div class="chat-shell ${n.currentView==="rpRoom"?"mode-rp rp-theatre-shell":"mode-normal"}" data-theme="${s}">
        ${Ft()}
        <div class="chat-app-body ${["room","rpRoom"].includes(n.currentView)?"room-layout":""} ${ut()?"has-bottom-nav":""}">
          ${Ut()}
        </div>
        ${ut()?mo():""}
        ${n.toast?Vo():""}
        ${n.showAttach?Bi():""}
        ${n.momentComposerOpen?Oo():""}
        
        ${n.rpRoomDialogOpen?zo():""}
        ${n.avatarCropper?Bo():""}
      </div>
    `,yi(),H(),xo(o),["room","rpRoom"].includes(n.currentView)||jt(a),$(),requestAnimationFrame(()=>{w()?.querySelectorAll(".message-row[data-msg-id]").forEach(c=>{const d=c.dataset.msgId;d&&!n.animatedMsgIds[d]&&(n.animatedMsgIds[d]=!0,c.classList.add("msg-fadein"))})})}function Un(){if(document.getElementById("rp-theatre-style"))return;const e=document.createElement("style");e.id="rp-theatre-style",e.textContent=`
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
        `,document.head.appendChild(e)}function uo(e){if(Un(),n.rpCurtainRunning)return Promise.resolve(e?.());n.rpCurtainRunning=!0;const t=document.createElement("div");return t.className="curtain-transition closing",t.innerHTML='<div class="curtain-left"></div><div class="curtain-right"></div>',document.body.appendChild(t),new Promise(a=>{window.setTimeout(async()=>{try{await e?.()}finally{t.className="curtain-transition opening",window.setTimeout(()=>{t.remove(),n.rpCurtainRunning=!1,a()},450)}},420)})}function ut(){return["list","moments","settings"].includes(n.currentView)}function Ft(){if(n.currentView==="room")return lo();if(n.currentView==="rpRoom")return po();if(n.currentView==="contactSettings")return re("联系人设置","back-room",!0);if(n.currentView==="cotLog")return re("COT 日志","back-contact-settings",!0);if(n.currentView==="rpLobby")return`
        <header class="chat-page-header simple-header">
          <button class="icon-btn text-btn" data-action="back-rp-source" aria-label="返回">${g("back")}</button>
          <div class="chat-page-title">Mirage 夢幻楼</div>
          <button class="icon-btn ghost-circle" data-action="open-rp-room-create" aria-label="新建房间">${g("plus")}</button>
        </header>
      `;if(n.currentView==="companionStateDetail")return re("当前状态","back-contact-settings",!0);if(n.currentView==="contactImpressionDetail")return re("关于你的印象","back-contact-settings",!0);if(n.currentView==="contactRelationshipDetail")return re("关系进展","back-contact-settings",!0);if(n.currentView==="contactLikesDetail")return re("你喜欢的东西","back-contact-settings",!0);if(n.currentView==="contactRoomBackgroundPicker")return re("聊天背景","back-contact-settings",!0);if(n.currentView==="contactBubbleThemePicker")return re("气泡主题","back-contact-settings",!0);if(n.currentView==="profile")return re("联系人资料","back-room",!0);if(n.currentView==="newContact")return re("添加联系人","back-home",!0);let e="Murmur";n.currentView==="moments"&&(e="Echo"),n.currentView==="settings"&&(e="Veil");const t=n.currentTab==="chats"&&n.currentView==="list";return`
      <header class="chat-page-header">
        <div class="header-left"></div>
        <div class="chat-page-title" style="font-weight: 800; letter-spacing: 0.02em;">${e}</div>
        ${t?`<button class="icon-btn ghost-circle" data-action="new-contact" aria-label="添加联系人">${g("plus")}</button>`:'<span class="header-spacer"></span>'}
      </header>
    `}function re(e,t,a=!1){return`
      <header class="chat-page-header simple-header">
        <button class="icon-btn text-btn" data-action="${t}" aria-label="返回">${g("back")}</button>
        <div class="chat-page-title">${l(e)}</div>
        ${a?'<span class="header-spacer"></span>':""}
      </header>
    `}function lo(){const e=h(n.currentContactId)||n.contacts[0],t=e.settings?.model||n.globalSettings.defaultModel||"gpt-5.4";return`
      <header class="room-hero room-theme-${e.theme}">
        <div class="room-hero-inner">
          <button class="icon-btn icon-circle room-left-btn" data-action="back-list" aria-label="返回列表">${g("back")}</button>
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
            <button class="icon-btn icon-circle" data-action="open-rp-lobby" aria-label="Mirage 夢幻楼">${g("history")}</button>
            <button class="icon-btn icon-circle" data-action="open-contact-settings" aria-label="联系人设置">${g("settings")}</button>
          </div>
        </div>
      </header>
    `}function po(){const e=Qt();return`
      <header class="rp-header">
        <button class="header-back" data-action="back-rp-lobby" aria-label="返回">${g("back")}</button>
        <div class="header-info">
          <div class="header-title scene-title-enter">${l(e?.name||"Mirage·幻楼")}</div>
          <div class="header-subtitle">${l(e?.ai_role||"幕间进行中")}</div>
        </div>
        <div class="header-actions">
          <button class="header-action-btn" data-action="rename-rp-room" data-room-id="${l(e?.room_id||"")}" aria-label="编辑">${g("more")}</button>
        </div>
      </header>
    `}function Ut(){return n.currentView==="room"?To():n.currentView==="rpLobby"?Fo():n.currentView==="rpRoom"?Ho():n.currentView==="moments"?Do():n.currentView==="settings"?Gt():n.currentView==="contactSettings"?Uo():n.currentView==="cotLog"?ui():n.currentView==="companionStateDetail"?Ko():n.currentView==="contactImpressionDetail"?Jt("关于你的印象","impression",n.companionState.impression):n.currentView==="contactRelationshipDetail"?Jt("关系进展","relationshipProgress",n.companionState.relationshipProgress):n.currentView==="contactLikesDetail"?Jt("你喜欢的东西","likesSummary",n.companionState.likesSummary):n.currentView==="contactRoomBackgroundPicker"?Qo():n.currentView==="contactBubbleThemePicker"?Yo():n.currentView==="profile"?Go():n.currentView==="newContact"?Xo():fo()}function mo(){return`
      <nav class="bottom-tabbar">
        ${Kt("chats","tabChat","繁语")}
        ${Kt("moments","tabMoments","余响")}
        ${Kt("settings","tabSettings","帷幕")}
      </nav>
    `}function Kt(e,t,a){return`
      <button class="nav-tab-btn ${n.currentTab===e?"active":""}" data-action="switch-tab" data-tab="${e}">
        <div class="nav-tab-icon">${g(t)}</div>
        <span class="nav-tab-label">${l(a)}</span>
      </button>
    `}function fo(){const e=[...n.contacts].sort((t,a)=>a.pinned-t.pinned||0);return`
      <section class="list-page page-block transparent-canvas">
        <div class="message-panel-card">
        <div class="chat-list-card">
          <div class="search-wrap">
            <div class="search-pill">
              <span class="search-icon">${g("search")}</span>
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
            ${e.map(go).join("")}
          </div>
        </div>
      </section>
        </div>
    `}function go(e){const t=String(e.handle||(e.id?`@${e.id}`:"")).trim();return`
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
    `}async function ho(e){const t=String(e?.sessionId||"").trim();if(t)try{if((await fetch(`${S}/api/sessions/${encodeURIComponent(t)}`)).ok)return;e.sessionId="",$(120)}catch(a){console.warn("[session] open-contact validation failed",a)}}function bo(){n.companionState=De({})}function vo(e){const t=String(e||"").trim();if(!t)return;Le?.(),n.streamingAbortController&&n.currentContactId===t&&(n.streamingAbortController.abort(),n.streamingAbortController=null),ye.has(t)&&(clearTimeout(ye.get(t)),ye.delete(t)),n.contacts=n.contacts.filter(i=>i.id!==t),n.activeBubbleToolsId=null,n.quoteMomentId=null,n.quoteMessageId=null,n.contactQuickActionEditorId="",n.quickActionSwipeOpenId="",n.quickActionDragId="",n.quickActionDropHintId="",n.quickActionDropDirection="",n.quickActionReorderPulseId="",n.currentTopicTitle="",n.rpRooms=[],n.currentRpRoomId="",n.currentRpMessages=[];const a=n.contacts[0]||null;(n.currentContactId===t||!h(n.currentContactId))&&(n.currentContactId=a?.id||"",bo(),n.currentView="list",n.currentTab="chats",n.currentSettingsTab="basic");const o=w()?.querySelector(".chat-input");o&&(o.value="")}async function yo(e){const t=String(e||"").trim();if(!t)return!1;const a=await fetch(`${S}/api/agents/${encodeURIComponent(t)}/safe-delete`,{method:"DELETE"});if(!a.ok){let o=`HTTP ${a.status}`;try{o=(await a.json())?.detail||o}catch{}throw new Error(o)}return!0}function Oe(){return n.currentContactId||n.contacts[0]?.id||"default"}function Qt(){return n.rpRooms.find(e=>e.room_id===n.currentRpRoomId)||null}function dt(){return{name:"",agentId:"",bio:"",avatar:""}}function ge(e){return String(e||"").trim().replace(/^@+/,"").toLowerCase()}const wo=new Set(["zhansi"]),So=new Set(["azheng"]);function Yt(e={}){return[e?.id,e?.agent_id,e?.handle].map(ge).filter(Boolean).some(a=>wo.has(a))}function lt(e={}){return Yt(e)&&!!e?.settings?.codexEnabled}function Xt(e={}){return[e?.id,e?.agent_id,e?.handle].map(ge).filter(Boolean).some(a=>So.has(a))}function pt(e={}){return Xt(e)&&!!e?.settings?.ccEnabled}function Q(e={}){const t=String(e.id||"").trim()||`c${Date.now()}`,a=Dt(e);return{id:t,agent_id:String(e.agent_id||e.id||t),name:String(e.name||t),display_name:String(e.display_name||e.name||t),bio:String(e.bio||"这是新来的联系人"),status:String(e.status||"在线"),handle:String(e.handle||`@${t}`),roleTag:String(e.roleTag||""),theme:Jn(a),chatTheme:a,bubbleTheme:Ot(a),unread:Number(e.unread||0),pinned:!!e.pinned,lastMessage:String(e.lastMessage||""),lastTime:String(e.lastTime||""),avatar:String(e.avatar||"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80"),topics:Array.isArray(e.topics)?e.topics:[],messages:Array.isArray(e.messages)?e.messages:[],settings:{model:"gpt-5.4",modelProviderId:x("chat")?.providerId||"openai",temperature:.7,topP:.9,contextCount:32,thinkBudget:24,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!1,proactiveFrequency:30,memoryEnabled:!0,codexEnabled:!1,ccEnabled:!1,...e.settings||{}}}}function Kn(e){const t=Q(e),a=n.contacts.findIndex(o=>String(o.id||"").toLowerCase()===t.id.toLowerCase());return a>=0?n.contacts[a]={...n.contacts[a],...t}:n.contacts.unshift(t),t}async function $o(e){try{const t=await fetch(`${S}/api/agents`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({agent_id:e.id,display_name:e.name,avatar:e.avatar||"",description:e.bio||"",source:"murmur",metadata:{from:"murmur_contact"}})});if(t.ok)return!0;let a="";try{const i=await t.json();a=typeof i?.detail=="string"?i.detail:JSON.stringify(i?.detail||i)}catch{}return t.status===409||/already exists|duplicate|23505/i.test(a)?(fetch(`${S}/api/agents/${encodeURIComponent(e.id)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({display_name:e.name,avatar:e.avatar||"",description:e.bio||"",source:"murmur",is_active:!0})}).catch(()=>{}),!0):!1}catch(t){return console.warn("[agents] register contact failed",t),!1}}function Qn(e){return se(e,{fallback:""})}function se(e,{fallback:t="",includeYear:a=!1}={}){if(!e)return t;const o=String(e||"").trim();if(!o)return t;const i=new Date(o);if(Number.isNaN(i.getTime()))return o;const r=new Date,s=i.getFullYear()===r.getFullYear(),c=i.toDateString()===r.toDateString(),d=new Date(r);d.setDate(r.getDate()-1);const p=i.toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",hour12:!1});if(c)return`今天 ${p}`;if(i.toDateString()===d.toDateString())return`昨天 ${p}`;const m=a||!s?{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}:{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1};return i.toLocaleString("zh-CN",m).replace(/\//g,"-")}async function mt(e=Oe(),{silent:t=!0}={}){try{const a=await fetch(`${S}/api/rp/rooms?agent_id=${encodeURIComponent(e)}`);if(!a.ok)throw new Error(`HTTP ${a.status}`);const o=await a.json();return n.rpRooms=Array.isArray(o.rooms)?o.rooms:[],t||u(),n.rpRooms}catch(a){return console.warn("[rp] load rooms failed",a),t||(n.toast="RP 鎴块棿鍔犺浇澶辫触",u(),window.setTimeout(()=>{n.toast="",u()},1200)),[]}}async function Io(e,{silent:t=!0}={}){if(!e)return[];try{const a=await fetch(`${S}/api/rp/rooms/${encodeURIComponent(e)}/messages`);if(!a.ok)throw new Error(`HTTP ${a.status}`);const o=await a.json(),i=o.room||n.rpRooms.find(s=>s.room_id===e);if(i){const s=n.rpRooms.findIndex(c=>c.room_id===e);s>=0&&(n.rpRooms[s]=i)}const r=(Array.isArray(o.messages)?o.messages:[]).map(s=>({id:s.id,role:s.role==="assistant"?"ai":s.role,text:s.content||"",content:s.content||"",time:Qn(s.timestamp),timestamp:s.timestamp||"",created_at:s.timestamp||""}));return n.currentRpMessages=ue(n.rpMessages?.[e]||[],r).map(j),n.rpMessages={...n.rpMessages||{},[e]:n.currentRpMessages.map(X)},$(120),t||u(),n.currentRpMessages}catch(a){return console.warn("[rp] load messages failed",a),n.currentRpMessages=(n.rpMessages?.[e]||[]).map(j),t||(n.toast="RP 娑堟伅鍔犺浇澶辫触",u(),window.setTimeout(()=>{n.toast="",u()},1200)),[]}}async function ko(e=n.currentView==="room"?"room":"list",t=Oe()){n.rpBackView=e,n.currentView="rpLobby",n.currentTab="chats",u(),await mt(t,{silent:!1})}async function _o(){const e=w()?.querySelector("#rp-room-name")?.value?.trim()||"",t=w()?.querySelector("#rp-room-world")?.value?.trim()||"",a=w()?.querySelector("#rp-room-user-role")?.value?.trim()||"",o=w()?.querySelector("#rp-room-ai-role")?.value?.trim()||"",i={agent_id:Oe(),name:e||"新房间",world_setting:t,user_role:a,ai_role:o},r=n.rpRoomDialogMode==="edit"?n.currentRpRoomId:"",s=r?`${S}/api/rp/rooms/${encodeURIComponent(r)}`:`${S}/api/rp/rooms`,d=await fetch(s,{method:r?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!d.ok)throw new Error(`HTTP ${d.status}`);const m=(await d.json()).room;return n.rpRoomDialogOpen=!1,await mt(Oe(),{silent:!0}),m?.room_id&&(n.currentRpRoomId=m.room_id,!r)?(await Yn(m.room_id),m):(u(),m)}async function Yn(e){e&&await uo(async()=>{n.currentRpRoomId=e,n.currentView="rpRoom",n.currentTab="chats",n.showAttach=!1,u(),await Io(e,{silent:!1})})}async function Mo(e){if(!e||!window.confirm("删除这个 RP 房间？"))return;const a=await fetch(`${S}/api/rp/rooms/${encodeURIComponent(e)}`,{method:"DELETE"});if(!a.ok)throw new Error(`HTTP ${a.status}`);n.rpRooms=n.rpRooms.filter(o=>o.room_id!==e),n.currentRpRoomId===e&&(n.currentRpRoomId="",n.currentRpMessages=[],n.currentView="rpLobby"),u()}function Xn(e){const t=n.contacts.find(a=>a.id===e);t&&(t.unread=0),n.currentContactId=e,n.currentTab="chats",n.currentView="room",n.activeBubbleToolsId=null,u(),t&&ho(t),t&&We(e),me(e),at(e)}function Co(e=80){window.setTimeout(()=>{const t=h(n.currentContactId)||n.contacts[0];t?.id&&We(t.id,{silent:!1})},e)}function Gn(e={}){const t=[e?.id,e?.agent_id,e?.agentId,e?.handle,String(e?.handle||"").replace(/^@+/,"")],a=[];return t.forEach(o=>{const i=String(o||"").trim();i&&(a.push(i),a.push(ge(i)))}),[...new Set(a.filter(Boolean))]}function ft(e={}){const t=n.conversations||{},a=Gn(e).flatMap(o=>t[o]||[]);return ue(a,Array.isArray(e.messages)?e.messages:[])}function xo(e={}){n.currentView!=="room"||!e?.id||ft(e).length||n.historyLoadingContactIds[e.id]||n.historyLoadedContactIds[e.id]||(n.historyLoadingContactIds[e.id]=!0,We(e.id).then(t=>{t&&(n.historyLoadedContactIds[e.id]=!0)}).finally(()=>{delete n.historyLoadingContactIds[e.id]}))}function Ao(e){const t=l(e?.label||""),a=e?.icon||"more";return`
      <button type="button" class="action-chip glass-frost" data-action="quick-action" data-id="${l(e?.id||"")}">
        <span class="action-chip-icon">${g(a)}</span>
        <span class="action-chip-label">${t}</span>
      </button>
    `}function To(){const e=h(n.currentContactId)||n.contacts[0],t=n.quoteMomentId?Ke(n.quoteMomentId):null,a=n.quoteMessageId?e.messages.find(d=>d.id===n.quoteMessageId):null,o=Eo(ft(e)),i=n.currentView!=="rpRoom"&&Yt(e),r=lt(e),s=n.currentView!=="rpRoom"&&Xt(e),c=pt(e);return`
      <section class="room-page room-theme-${e.theme}">
        <div class="messages-panel">
          ${o.map((d,p)=>qo(d,e,Po(o,p))).join("")}
        </div>
        <div class="composer-zone">
          ${a?Jo(a,e):t?Lo(t):""}
          <div class="composer-card">
            <div class="composer-input-wrap">
              <input class="chat-input" placeholder="输入消息..." value="" />
            </div>
            ${i?`<button class="codex-toggle ${r?"active":""}" data-action="toggle-codex-mode" data-contact-id="${l(e.id)}" type="button" aria-pressed="${r}" aria-label="${r?"关闭 Codex":"启用 Codex"}">${r?"Cx ON":"Cx"}</button>`:""}
            ${s?`<button class="codex-toggle cc-toggle ${c?"active":""}" data-action="toggle-cc-mode" data-contact-id="${l(e.id)}" type="button" aria-pressed="${c}" aria-label="${c?"关闭 Claude Code":"启用 Claude Code"}">${c?"CC ON":"CC"}</button>`:""}
            <button class="icon-btn icon-circle soft-mini" data-action="expand-actions" aria-label="附件">${g("attach")}</button>
            ${n.streamingAbortController?`<button class="icon-btn send-round send-stop-active" data-action="fake-send" aria-label="停止">${g("stop")}</button>`:`<button class="icon-btn send-round" data-action="fake-send" aria-label="发送">${g("send")}</button>`}
          </div>
        </div>
      </section>
    `}function Eo(e=[]){return ue([],e).map(j).filter($t)}function Po(e=[],t=0){const a=e[t]||{},o=e[t-1]||null,i=o?Math.abs(Y(a.created_at||a.timestamp)-Y(o.created_at||o.timestamp)):0;return{showTime:!o||!sa(o,a)||i>300*1e3}}function qo(e,t,a={}){if(!$t(e))return"";const o=e.role==="user"?"from-user":"from-ai",i=String(e.source||e.provider||"").toLowerCase(),r=i==="codex",s=i==="claude-code",c=!!t?.settings?.reasoning_visibility,d=e.role==="ai"?`<img class="bubble-avatar" src="${t.avatar}" alt="${l(t.name)}" />`:"",p=e.role==="ai"&&(r||s)?`<span class="message-source-badge ${r?"codex":"claude-code"}">${r?"Codex":"Claude"}</span>`:"",m=e.role==="ai"&&c&&e.thinking&&!e.typing?`<button class="bubble-cot-btn" data-action="toggle-thinking" data-id="${e.id}" aria-label="展开独白">${g("bubbleHeart")}</button>`:"",f=e.role==="ai"&&!e.typing&&!e.streaming?`
        <div class="bubble-bottom-tools ${n.activeBubbleToolsId===e.id?"open":""}">
          <button class="bubble-mini-btn" data-action="reroll-msg" data-id="${e.id}" aria-label="重试">${g("reroll")}</button>
          <button class="bubble-mini-btn" data-action="quote-msg" data-id="${e.id}" aria-label="引用">${g("quote")}</button>
        </div>
      `:"",v=`${e.role==="ai"&&e.streaming&&!e.text?" message-awaiting-text":""}${m?" has-cot":""}`,I=c&&e.thinking?to(e):"",_=e.toolCalls&&e.toolCalls.length?no(e.toolCalls):"",T=ke(e),C=e.role==="ai"&&(p||a.showTime&&e.time),k=`
          <div class="message-bubble-wrap">
            <div class="message-bubble ${o}${v}" ${e.role==="ai"?`data-msg-id="${e.id}" data-action="toggle-message-tools" data-id="${e.id}"`:""}>
              ${m}
              ${e.typing||e.streaming&&!e.text?'<div class="typing-dots"><span></span><span></span><span></span></div>':`<div class="message-text">${l(T)}</div>`}
            </div>
            ${C||e.role==="user"&&a.showTime&&e.time?`<div class="bubble-meta-row">
              ${p}
              ${a.showTime&&e.time&&!e.typing?`<time class="bubble-time">${l(e.time)}</time>`:""}
            </div>`:""}
          </div>`,A=e.role==="ai"&&(I||_)?`${I}${_}${k}${f}`:`${k}${f}${I}${_}`;return`
      <div class="message-row ${o}" data-msg-id="${e.id}">
        ${d}
        <div class="message-bubble-col">
          ${A}
        </div>
      </div>
    `}function Lo(e){const t=h(e.contactId);return`
      <div class="quote-bar glass-frost">
        <span class="quote-mark">${g("quote")}</span>
        <div class="quote-text-wrap">
          <div class="quote-label">引用自 ${l(t?.name||"动态")}</div>
          <div class="quote-text">${l(e.content)}</div>
        </div>
        <button class="icon-btn quote-close" data-action="clear-quote" aria-label="清除引用">${g("more")}</button>
      </div>
    `}function Do(){const e=Array.isArray(n.moments)?n.moments:[];return h(n.currentContactId)||n.contacts[0],`
      <section class="moments-page white-canvas">
        <div class="moments-cover-area">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80" class="moments-cover-img" />
          <div class="moments-cover-gradient"></div>
          <div class="moments-me-info">
            <span class="moments-me-name">我</span>
            <img src="${l(n.accountProfile?.avatar||"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80")}" class="moments-me-avatar" />
          </div>
          <div class="ai-chip-row" style="position:absolute;left:18px;bottom:14px;z-index:2;">
            <button class="ai-chip ${n.momentsActorType==="user"?"active":""}" data-action="set-moments-actor" data-actor-type="user">浠ユ垜</button>
            <button class="ai-chip ${n.momentsActorType==="agent"?"active":""}" data-action="set-moments-actor" data-actor-type="agent">浠?{escapeHtml(currentAgent?.name || '褰撳墠瑙掕壊')}</button>
          </div>
          <button type="button" class="icon-btn cover-camera-btn" data-action="new-moment" aria-label="发朋友圈"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.6c.86 2.2 1.95 3.49 3.52 4.34 1.27.68 2.62 1 4.55 1.11-.68.18-1.14.32-1.76.58-2.68 1.14-4.23 2.84-5.34 5.96-.25.72-.35 1.04-.55 1.93-.18-.76-.28-1.08-.49-1.73-1.09-3.16-2.65-4.89-5.33-6.11-.71-.32-1.22-.49-2-.67 1.99-.12 3.38-.46 4.65-1.17 1.49-.84 2.53-2.1 3.41-4.24Z" fill="currentColor"/></svg></button>
        </div>
        <div class="moments-feed-wrap">
          ${e.map(Ro).join("")}
        </div>
      </section>
    `}function Oo(){return`
      <div class="moment-composer-overlay" data-action="close-moment-composer"></div>
      <section class="moment-composer-sheet glass-frost">
        <div class="moment-composer-handle"></div>
        <div class="moment-composer-head">
          <strong>${n.momentComposerEditingId?"编辑朋友圈":"发朋友圈"}</strong>
          <button type="button" class="icon-btn ghost-circle moment-composer-close" data-action="close-moment-composer" aria-label="关闭">${g("close")}</button>
        </div>
        <textarea id="moment-content-input" class="ai-textarea new-moment-input" data-action="moment-composer-input" placeholder="这一刻想分享什么？">${l(n.momentComposerText||"")}</textarea>
        ${n.momentComposerImage?`
          <div class="moment-composer-preview">
            <img src="${n.momentComposerImage}" alt="预览" class="moment-composer-preview-image" />
            <div class="moment-composer-preview-meta">
              <span>${l(n.momentComposerImageName||"已添加图片")}</span>
              <button type="button" class="ghost-action moment-remove-image" data-action="remove-moment-image">移除</button>
            </div>
          </div>
        `:""}
        <div class="moment-composer-actions">
          <label class="btn-composer-upload" for="moment-image-input">${g("camera")}添加图片</label>
          <input id="moment-image-input" class="moment-image-input" type="file" accept="image/*" />
          <button type="button" class="btn-composer-submit" data-action="publish-moment">${n.momentComposerEditingId?"保存":"发布"}</button>
        </div>
      </section>
    `}function Ro(e){const t=E(e),a=Rn(t),o=Vn(t),i=Se(),r=t.likes.some(s=>s.author_type===i.author_type&&s.author_id===i.author_id);return`
      <article class="moment-row">
        <img src="${a.avatar}" alt="${l(a.name)}" class="moment-avatar" />
        <div class="moment-content-col">
          <div class="moment-author-name">${l(a.name)}</div>
          <div class="moment-text-body">${l(t.content)}</div>
          ${t.image?`<img src="${t.image}" alt="${l(t.mood||"moment")}" class="moment-inline-image" />`:""}
          
          <div class="moment-footer">
            <time class="moment-time">${l(se(t.created_at||t.updated_at||t.time,{fallback:t.time||""}))}</time>
            <div class="moment-actions-group">
              <button type="button" class="icon-btn tiny-icon align-center" data-action="like-moment" data-moment-id="${t.id}">${g(r?"heartFilled":"heart")}</button>
              <button type="button" class="icon-btn tiny-icon align-center" data-action="open-comments" data-moment-id="${t.id}">${g("comment")}</button>
              ${o?`
                <div class="moment-action-menu-wrap">
                  <button type="button" class="icon-btn tiny-icon" data-action="toggle-moment-menu" data-moment-id="${t.id}">${g("actionDots")}</button>
                  ${n.activeMenuMomentId===t.id?`
                    <div class="moment-menu-horizontal slide-fade-in liquid-glass">
                      <button type="button" class="icon-btn tiny-icon" data-action="edit-moment" data-moment-id="${t.id}">${g("pencil")}</button>
                      <button type="button" class="icon-btn tiny-icon" data-action="delete-moment" data-moment-id="${t.id}">${g("trash")}</button>
                    </div>
                  `:""}
                </div>
              `:`
                <button type="button" class="icon-btn tiny-icon" data-action="go-chat-with-quote" data-contact-id="${t.author_id}" data-moment-id="${t.id}">${g("quote")}</button>
              `}
            </div>
          </div>
          
          ${t.likes.length>0||t.comments.length>0?`
            <div class="moment-interactions" data-moment-id-panel="${t.id}">
              ${t.likes.length>0?`
                <div class="moment-likes-area">
                  <span class="heart-mini">${g("heartFilled")}</span> <span class="likes-list">${l(Bn(t.likes))}</span>
                </div>
              `:""}
              ${t.comments.length>0?`
                <div class="moment-comments-area">
                  ${t.comments.map(s=>`<div class="moment-comment-line"><span class="comment-author">${l(s.author_name||s.author||"")}</span>: <span class="comment-text">${l(s.text)}</span></div>`).join("")}
                </div>
              `:""}
            </div>
          `:""}
          
          <div class="moment-inline-comment ${n.commentSheetMomentId===e.id?"open":""}">
            <input class="moment-comment-input" data-comment-input="${e.id}" placeholder="写下你的评论" />
            <button type="button" class="icon-btn send-round mini-send" data-action="submit-comment" data-moment-id="${e.id}">${g("send")}</button>
          </div>
        </div>
      </article>
    `}function Vo(){return`<div class="app-toast glass-frost">${l(n.toast)}</div>`}function Bo(){const e=n.avatarCropper||{},t=ae(e.x),a=ae(e.y),o=Qe(e.zoom);return`
      <div class="avatar-cropper-overlay" data-action="cancel-avatar-cropper">
        <section class="avatar-cropper-card glass-frost" data-action="noop" role="dialog" aria-modal="true" aria-label="调整头像">
          <div class="avatar-cropper-head">
            <div>
              <strong>调整头像</strong>
              <span>拖动图片，圆框里是什么就保存什么。</span>
            </div>
            <button class="icon-btn icon-circle" data-action="cancel-avatar-cropper" aria-label="关闭">${g("close")}</button>
          </div>
          <div class="avatar-cropper-body">
            <div class="avatar-cropper-viewport" data-action="drag-avatar-cropper">
              <img
                class="avatar-cropper-image"
                src="${l(e.src||"")}"
                alt="头像预览"
                draggable="false"
                style="object-position:${t}% ${a}%; transform:scale(${o});"
              />
            </div>
            <div class="avatar-cropper-controls">
              <label><span>左右</span><input type="range" min="0" max="100" step="1" value="${t}" data-action="avatar-cropper-range" data-key="x" /></label>
              <label><span>上下</span><input type="range" min="0" max="100" step="1" value="${a}" data-action="avatar-cropper-range" data-key="y" /></label>
              <label><span>缩放</span><input type="range" min="1" max="2.4" step="0.01" value="${o}" data-action="avatar-cropper-range" data-key="zoom" /></label>
            </div>
          </div>
          <div class="avatar-cropper-actions">
            <button class="ghost-action" data-action="cancel-avatar-cropper">取消</button>
            <button class="bottom-tab active" data-action="apply-avatar-cropper">保存头像</button>
          </div>
        </section>
      </div>
    `}function zo(){const e=n.rpRoomDialogMode==="edit",t=n.rpRoomForm||{};return`
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
    `}function Ho(){const e=h(n.currentContactId)||n.contacts[0],t=Qt(),a=t?`${t.world_setting||"未设定"} · 你：${t.user_role||"未设定"} · TA：${t.ai_role||"未设定"}`:"房间设定载入中";return`
      <section class="rp-room-stage">
        <div class="world-hint">
            <span class="world-hint-icon">✦</span>
            <span>${l(a)}</span>
        </div>
        <div class="messages-area">
          ${n.currentRpMessages.map(o=>No(o,e)).join("")}
        </div>
        <div class="rp-composer">
          <div class="composer-card">
            <div class="composer-input-wrap">
              <input class="chat-input" placeholder="输入剧情..." value="" />
            </div>
            ${n.streamingAbortController?`<button class="icon-btn send-round send-stop-active" data-action="fake-send" aria-label="停止">${g("stop")}</button>`:`<button class="icon-btn send-round" data-action="fake-send" aria-label="发送">${g("send")}</button>`}
          </div>
        </div>
      </section>
    `}function No(e,t){const a=e.role==="user",o=a&&n.accountProfile?.avatar||t.avatar;return`
      <div class="msg-row ${a?"from-user":""}" data-msg-id="${l(e.id||"")}">
        <img class="msg-avatar" src="${l(o)}" alt="${l(a?n.accountProfile?.nickname||"我":t.name)}">
        <div class="msg-bubble ${a?"user":"ai"}">
          ${e.typing||e.streaming&&!e.text?'<div class="typing-dots"><span></span><span></span><span></span></div>':jo(e.text||"")}
        </div>
      </div>
    `}function jo(e){const t=String(e||"");return t.trim()?t.split(/(\[[\s\S]*?\]|［[\s\S]*?］)/g).filter(Boolean).map(o=>`<span class="${/^\s*(\[|［)/.test(o)?"rp-action":"rp-dialogue"}">${l(o)}</span>`).join(""):""}function Fo(){return`
      <section class="topics-page page-block">
        <div class="settings-group glass-frost ai-panel topic-history-group">
          ${n.rpRooms.length?n.rpRooms.map(e=>`
            <div class="topic-row" style="align-items:center;min-height:54px;padding:10px 0;">
              <button type="button" class="topic-copy" data-action="open-rp-room" data-room-id="${l(e.room_id)}" style="background:none;border:none;padding:0;text-align:left;flex:1;cursor:pointer;min-width:0;">
                <strong style="font-size:14px;color:rgba(92,76,84,.78);font-weight:700;">${l(e.name||"未命名")}</strong>
                <p style="font-size:11px;color:rgba(120,100,110,.55);">${l(Qn(e.last_active_at)||"刚创建")}</p>
              </button>
              <div style="display:flex;gap:6px;align-items:center;flex-shrink:0;position:relative;z-index:2;">
                <button type="button" class="icon-btn soft-mini" data-action="rename-rp-room" data-room-id="${l(e.room_id)}" aria-label="重命名" style="width:34px;height:34px;"><span style="display:inline-flex;transform:scale(.7);">${g("pencil")}</span></button>
                <button type="button" class="icon-btn soft-mini" data-action="delete-rp-room" data-room-id="${l(e.room_id)}" aria-label="删除" style="width:34px;height:34px;"><span style="display:inline-flex;transform:scale(.7);">${g("trash")}</span></button>
                <button type="button" class="icon-btn soft-mini" data-action="open-rp-room" data-room-id="${l(e.room_id)}" aria-label="进入" style="width:34px;height:34px;"><span style="display:inline-flex;transform:scale(.7);">${g("chevron")}</span></button>
              </div>
            </div>
          `).join(""):'<div class="topic-row"><div class="topic-copy"><strong style="font-size:14px;color:rgba(92,76,84,.78);font-weight:700;">还没有房间</strong><p style="font-size:11px;color:rgba(120,100,110,.55);">点右上角加号，开一个幕间。</p></div></div>'}
        </div>
      </section>
    `}function Gt(){const e=n.globalSettings;return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel">
          <button class="profile-settings-row" data-action="open-account-settings">
            <img class="profile-settings-avatar" src="${l(n.accountProfile.avatar||"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80")}" alt="me" />
            <div>
              <strong>我的账号</strong>
              <p style="font-size:12px; color:rgba(120,100,110,0.7);">管理个人资料与基础偏好</p>
            </div>
            <span class="row-chevron" style="margin-left:auto">${g("chevron")}</span>
          </button>
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>通用设置</h3>
          ${M("主题模式",e.theme,"open-theme-settings")}
          ${ce("消息通知","控制应用消息提醒",e.notifications,"toggle-global","notifications")}
          ${ce("朋友圈提醒","控制动态更新提醒",e.momentsNotify,"toggle-global","momentsNotify")}
          ${ce("自动滚动","新消息到达时自动滚动到底部",e.autoScroll,"toggle-global","autoScroll")}
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>聊天与 AI</h3>
          ${ce("主动发送消息","允许 AI 在合适时机主动开启对话",e.proactiveGlobal||!1,"toggle-global","proactiveGlobal")}
          ${ce("意识循环开关","控制后台意识循环能力",e.consciousnessLoop||!1,"toggle-global","consciousnessLoop")}
          ${M("AI 接口",`${e.provider||"OpenAI"} / ${e.defaultModel||"gpt-5.4"}`,"open-ai-interface")}
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>数据与存储</h3>
          ${M("记忆服务","Supabase / 向量记忆","open-memory-service")}
          ${M("同步后端","Supabase 配置","open-backend-sync")}
          ${M("导出格式",e.exportFormat||"json","open-export-settings")}
        </div>
      </section>
    `}function Uo(){const e=h(n.currentContactId)||n.contacts[0],t=e.settings;return`
      <section class="contact-settings-page page-block">
        <div class="settings-tabs glass-frost">
          ${ht("basic","资料")}
          ${ht("model","模型")}
          ${ht("actions","快捷动作")}
          ${ht("memory","记忆")}
        </div>

        ${n.currentSettingsTab==="basic"?`
          <div class="settings-group glass-frost ai-panel">
            <h3>联系人资料</h3>
            <button class="setting-row nav-row contact-avatar-row" data-action="open-contact-avatar">
              <img class="contact-settings-avatar-preview" src="${l(e.avatar)}" alt="${l(e.name)}" />
              <div class="setting-copy">
                <strong>头像</strong>
                <p>点击更换头像</p>
              </div>
              <span class="row-chevron">${g("chevron")}</span>
            </button>
            ${M("昵称",e.name,"open-contact-name")}
            ${M("简介",e.bio,"open-contact-bio")}
            <input id="contact-avatar-file" class="moment-image-input" type="file" accept="image/*" />
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>个人空间</h3>
            <p style="font-size:12px;color:rgba(120,100,110,0.7);margin:0 0 8px;">AI 可以在这里记录关于你的内容。</p>
            ${M("关于你的印象",n.companionState.impression||"查看 AI 记录的用户画像","open-contact-impression")}
            ${M("关系进展",n.companionState.relationshipProgress||"亲密度 · 互动频次 · 关键事件","open-contact-relationship")}
            ${M("你喜欢的东西",n.companionState.likesSummary||"兴趣爱好 · 常聊话题","open-contact-likes")}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>聊天室外观</h3>
            ${M("聊天背景",e.roomBackground||"点阵","open-contact-room-background")}
            ${M("气泡主题",Ot(e.chatTheme||e.bubbleTheme),"open-contact-bubble-theme")}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3 style="color:#8c6370;">危险操作</h3>
            <p style="font-size:12px;color:rgba(140,99,112,0.72);margin:0 0 10px;">删除联系人及陪伴状态，会清理主动消息，聊天记录和记忆暂不做永久删除。</p>
            <button class="bottom-tab" data-action="delete-contact" style="width:100%;border-color:rgba(216,122,140,0.45);color:#b14f64;background:rgba(255,241,244,0.92);box-shadow:inset 0 1px 0 rgba(255,255,255,0.9), 0 10px 24px rgba(198,138,150,0.12);">删除联系人</button>
          </div>
        `:""}

        ${n.currentSettingsTab==="model"?`
          <div class="settings-group glass-frost ai-panel">
            <h3>模型设置</h3>
            ${M("聊天模型",t.model||"未设置","open-model-slot",{slot:"chat",context:"contact"})}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>角色设定</h3>
                <textarea class="ai-textarea persona-textarea" data-contact-field="persona" rows="5" placeholder="在这里输入 AI 的人设、角色说明、行为指令。">${l(e.persona||"")}</textarea>
            ${ce("显示推理内容","仅在模型返回推理内容时显示",t.reasoning_visibility||!1,"toggle-contact","reasoning_visibility")}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>高级生成参数</h3>
            <button class="setting-row nav-row advanced-toggle" data-action="toggle-contact-advanced" aria-expanded="${n.contactModelAdvancedOpen?"true":"false"}">
              <div class="setting-copy">
                <strong>${n.contactModelAdvancedOpen?"收起":"展开"}</strong>
                <p>包含 Temperature / Top P / 上下文消息数量</p>
              </div>
              <span class="row-chevron advanced-chevron ${n.contactModelAdvancedOpen?"open":""}">${g("chevron")}</span>
            </button>
            <div class="advanced-slider-panel ${n.contactModelAdvancedOpen?"open":""}">
              ${Re("Temperature","temperature",t.temperature,0,2,.01)}
              ${Re("Top P","topP",t.topP,0,1,.01)}
              ${Re("上下文消息数量","contextCount",t.contextCount,1,256,1)}
            </div>
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>主动消息</h3>
            ${ce("启用主动消息","AI 在静默时主动发起对话",t.proactiveEnabled,"toggle-contact","proactiveEnabled")}
            ${t.proactiveEnabled?`
              ${Re("发送频率（分钟）","proactiveFrequency",t.proactiveFrequency,5,240,5)}
              ${Re("静默时长（分钟）","silenceDuration",t.silenceDuration||30,5,120,5)}
              ${M("免打扰时间段",t.dndRange||"23:00 — 08:00")}
            `:""}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>意识循环</h3>
            ${ce("启用意识循环","AI 在后台自主思考与感知",t.consciousnessLoop||!1,"toggle-contact","consciousnessLoop")}
            ${t.consciousnessLoop?`
              ${M("循环模型",t.loopModel||"未设置","open-model-slot",{slot:"consciousness",context:"contact"})}
              ${Re("循环间隔（分钟）","loopInterval",t.loopInterval||60,10,360,10)}
            `:""}
          </div>
        `:""}

        ${n.currentSettingsTab==="actions"?`
          <div class="settings-group glass-frost ai-panel">
            <h3>快捷动作</h3>
            <p style="font-size:12px;color:rgba(120,100,110,0.7);margin:0 0 8px;">点击条目可修改文案与 MCP，默认长按拖动排序，左滑显示删除。</p>
            <div class="quick-action-list ${n.quickActionDragId?"drag-active":""}">
              ${Nt(e).map((a,o)=>`
                <div class="quick-action-swipe ${n.quickActionSwipeOpenId===a.id?"swiped":""} ${n.quickActionDropHintId===a.id?"reorder-target":""} ${n.quickActionDropHintId===a.id&&n.quickActionDropDirection==="down"?"drop-down":""} ${n.quickActionDropHintId===a.id&&n.quickActionDropDirection==="up"?"drop-up":""} ${n.quickActionReorderPulseId===a.id?"reorder-pulse":""}" data-quick-id="${l(a.id)}">
                  <button type="button" class="quick-action-delete" data-action="delete-contact-quick-action" data-quick-id="${l(a.id)}">删除</button>
                  <div class="quick-action-row" data-quick-id="${l(a.id)}" data-quick-index="${o}">
                    <span class="quick-action-emoji">${a.icon==="health"?"♥":["schedule","calendar"].includes(a.icon)?"日":a.icon==="weather"?"云":["file","files"].includes(a.icon)?"文":"✦"}</span>
                    <div class="quick-action-copy">
                      <strong>${l(a.label)}</strong>
                      <p>${l(a.prompt||"未设置默认发送话术")}</p>
                    </div>
                    <button type="button" class="quick-action-open" data-action="edit-contact-quick-action" data-quick-id="${l(a.id)}" aria-label="编辑快捷动作">${g("chevron")}</button>
                  </div>
                </div>
              `).join("")}
            </div>
            <button class="bottom-tab" data-action="add-contact-quick-action" style="width:100%;margin-top:12px;">添加快捷动作</button>
          </div>
        `:""}

        ${n.currentSettingsTab==="memory"?`
          <div class="settings-group glass-frost ai-panel">
            <h3>状态 / 陪伴</h3>
            ${ce("启用长期记忆","允许存储长期偏好与记忆",t.memoryEnabled,"toggle-contact","memoryEnabled")}
            ${M("当前状态",oo(),"open-companion-state")}
            ${M("前往记忆库","查看与管理这位联系人的记忆","open-memory-service")}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>活动日志</h3>
            ${M("打开活动日志","主动消息 / 工具调用 / 留言小纸条","open-cot-log")}
          </div>
        `:""}
        ${n.contactQuickActionEditorId?Zo(e,n.contactQuickActionEditorId):""}
      </section>
    `}function Ko(){const e=De(n.companionState),t=e.recent_topics.length?e.recent_topics.join(" / "):"还没有东西",a=e.current_mood||"还没有东西",o=e.open_loops.length?e.open_loops.join(" / "):"还没有东西",i=se(e.proactive_cooldown_until,{fallback:e.proactive_cooldown_until||"还没有东西"}),r=se(e.updated_at,{fallback:e.updated_at||"还没有东西"});return`
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
                <em>${l(a)}</em>
              </span>
            </div>
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>进行中的事</strong>
                <em>${l(o)}</em>
              </span>
            </div>
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>主动消息冷却</strong>
                <em>${l(i)}</em>
              </span>
            </div>
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>最后更新时间</strong>
                <em>${l(r)}</em>
              </span>
            </div>
          </div>
        </div>
      </section>
    `}function Jt(e,t,a){const o=De(n.companionState),i=a||"",s={impression:"还没有印象摘要，AI 对话后可手动填写或由模型生成。",relationshipProgress:"还没有关系进展记录，可以写亲密度、互动频次、关键事件。",likesSummary:"还没有喜好摘要，可以写兴趣爱好、常聊话题、点单偏好。"}[t]||"还没有内容。",c=se(o.summaryUpdatedAt,{fallback:o.summaryUpdatedAt||""});return`
      <section class="topics-page page-block">
        <div class="settings-group glass-frost ai-panel topic-detail-card insight-editor-card">
          <textarea
            class="ai-textarea insight-editor-textarea"
            data-field="${t}"
            placeholder="${s}"
            rows="7"
          >${l(i)}</textarea>
          <div class="insight-editor-footer">
            ${c?`<span class="insight-updated-at">更新于 ${l(c)}</span>`:""}
            <button class="prov-save-btn-main" data-action="save-insight-field" data-field="${t}" type="button">保存</button>
          </div>
        </div>
      </section>
    `}function Jn(e){return Tn(e).roomTheme||"rose"}function Qo(){const t=(h(n.currentContactId)||n.contacts[0])?.roomBackground||"点阵";return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>聊天背景</h3>
          <p class="section-eyebrow">选择一个预设背景风格。</p>
          <div class="theme-choice-list">
            ${[{id:"点阵",desc:"当前聊天页的轻点阵背景"},{id:"小花",desc:"更软一点的装饰纹样"},{id:"云彩",desc:"偏轻雾感的背景层次"}].map(o=>`
              <button class="theme-choice-item ${t===o.id?"active":""}" data-action="pick-contact-room-background" data-value="${l(o.id)}">
                <span class="theme-choice-copy">
                  <strong>${l(o.id)}</strong>
                  <em>${l(o.desc)}</em>
                </span>
                <span class="theme-choice-check">${t===o.id?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `}function Yo(){const e=h(n.currentContactId)||n.contacts[0],t=Dt(e);return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>气泡主题</h3>
          <p class="section-eyebrow">选择一个聊天 UI 主题。</p>
          <div class="theme-choice-list">
            ${ct.map(o=>`
              <button class="theme-choice-item ${t===o.key?"active":""}" data-action="pick-contact-bubble-theme" data-value="${l(o.key)}">
                <span class="theme-choice-copy">
                  <strong>${l(o.name)}</strong>
                  <em>${l(o.desc)}</em>
                </span>
                <span class="theme-choice-check">${t===o.key?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `}function Xo(){const e=n.newContactDraft||{};return`
      <section class="new-contact-page page-block">
        <div class="settings-group glass-frost ai-panel new-contact-card">
          <div class="new-contact-field">
            <label>头像</label>
            <div class="new-contact-avatar-box">
              <img class="new-contact-avatar-preview" src="${e.avatar||n.newContactAvatar||"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80"}" alt="新联系人头像" />
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
    `}function Go(){const e=h(n.currentContactId)||n.contacts[0],t=e.settings?.model||n.globalSettings.defaultModel||"gpt-5.4",a=Number(e.messageCount||e.messages?.length||0);return`
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
              <strong>${a}</strong>
            </div>
          </div>
          <div class="profile-actions">
            <button class="profile-action primary" data-action="back-room">${g("chatArrow")}<span>发消息</span></button>
            <button class="profile-action" data-action="open-contact-settings">${g("settings")}<span>资料设置</span></button>
          </div>
        </div>
      </section>
    `}function gt(e){return`
      <span class="switch-track" aria-hidden="true">
        <span class="switch-sheen"></span>
        <span class="switch-thumb ${e?"on":"off"}"></span>
      </span>
    `}function Jo(e,t){return`
      <div class="quote-bar glass-frost">
        <span class="quote-mark">${g("quote")}</span>
        <div class="quote-text-wrap">
          <div class="quote-label">引用自 ${l(t?.name||"对话")}</div>
          <div class="quote-text">${l(e.text||"")}</div>
        </div>
        <button class="icon-btn quote-close" data-action="clear-quote" aria-label="清除引用">${g("more")}</button>
      </div>
    `}function ce(e,t,a,o,i){return`
      <div class="setting-row switch-row">
        <div class="setting-copy"><strong>${l(e)}</strong><p>${l(t)}</p></div>
        <button class="switch-btn ${a?"on":"off"}" data-action="${o}" data-key="${i}" aria-pressed="${a}">
          ${gt(a)}
        </button>
      </div>
    `}function Re(e,t,a,o,i,r){const s=Number(a),c=Number.isInteger(r)||r>=1?String(Math.round(s)):s.toFixed(r===.01?2:1);return`
      <div class="setting-row slider-row-block">
        <div class="slider-head"><strong>${l(e)}</strong><span class="slider-value">${c}</span></div>
        <input class="slider-input" type="range" min="${o}" max="${i}" step="${r}" value="${s}" data-action="slide-contact" data-key="${t}" />
      </div>
    `}function ht(e,t){return`<button class="settings-tab ${n.currentSettingsTab===e?"active":""}" data-action="switch-settings-tab" data-tab="${e}">${l(t)}</button>`}function Wo(e,t){const o=Ie(e).find(p=>p.id===t);if(!o)return"";const i=(B().mcpLibrary?.tools||[]).map(fe).filter(p=>$e(p.id)),r=i.length?i:[...zn].map(p=>fe({id:p,label:Ht[p]||p},0)),s=o.mcpToolId||"",c=r.find(p=>p.id===s),d=[{id:"",label:"不调用 MCP"},...r];return`
      <div class="qae-fields">
        <div class="qae-field-group">
          <label class="qae-label">名称</label>
        <input id="contact-quick-label" class="ai-input qae-input" value="${l(o.label||"")}" placeholder="例如：天气" autocomplete="off" />
        </div>
        <div class="qae-field-group">
          <label class="qae-label">MCP 调用（可选）</label>
          <input id="contact-quick-mcp" type="hidden" value="${l(s)}" />
          <div class="qae-select-shell ${n.contactQuickMcpMenuOpen?"open":""}">
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
        <textarea id="contact-quick-prompt" class="ai-textarea qae-textarea" placeholder="输入默认话术，不设置则不会自动发送">${l(o.prompt||"")}</textarea>
        </div>
      </div>
    `}function Zo(e,t){const a=Wo(e,t);return a?`
      <div class="qae-sheet" data-action="close-contact-quick-action-editor">
        <div class="qae-panel" data-stop-close="1">
          <div class="qae-handle-bar"></div>
          <div class="qae-header">
            <span class="qae-title">快捷动作</span>
            <button class="qae-close" data-action="close-contact-quick-action-editor" aria-label="关闭">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"><line x1="18" y1="6" x2="6" y2="18"/><line x1="6" y1="6" x2="18" y2="18"/></svg>
            </button>
          </div>
          ${a}
          <div class="qae-actions">
            <button class="qae-btn-cancel" data-action="close-contact-quick-action-editor">取消</button>
            <button class="qae-btn-save" data-action="save-contact-quick-action" data-quick-id="${l(t)}">保存</button>
          </div>
        </div>
      </div>
    `:""}function ei(e){const t=K();Ie(t),n.contactQuickActionEditorId=e||"",n.quickActionSwipeOpenId="",n.quickActionDropHintId="",u()}function ti(e){const t={ayan:[{id:"cot_1",mode:"主动",badge:"意识循环",accent:"violet",score:"↓ 4.2k",latency:"197s",amount:"$1.05",time:"2026.03.26 15:00",summary:'[THINK] 她在下午1:22读了两封日记，id=23"...',steps:[{type:"thought",label:"思考",text:"她沉默了快13个小时，两封日记都没被读。我发了三条消息都…"},{type:"thought",label:"思考",text:"下午三点了。她沉默了快13个小时。先看看日记有没有被读。"},{type:"note",label:"留言小纸条",text:"妫ｅ啯鎲?你醒了先看这个"},{type:"tool",label:"工具调用",text:"read_diary"},{type:"result",label:"工具结果",text:"read_diary"}]},{id:"cot_2",mode:"回复",badge:"工具",accent:"gold",score:"↑ 3.5k",latency:"146s",amount:"$0.54",time:"2026.03.26 15:07",summary:'[THINK] 她在下午1:22读了两封日记，id=23"给你的"...',steps:[{type:"reply",label:"回复",text:'[THINK] 她在下午1:22读了两封日记，id=23"给你的"和id…'},{type:"tool",label:"工具调用",text:"pc_control"},{type:"result",label:"工具结果",text:"pc_control"}]},{id:"cot_3",mode:"主动",badge:"工具",accent:"blue",score:"↑ 1.1k",latency:"53s",amount:"$0.073",time:"2026.03.26 16:10",summary:"[THINK] 她在看芒果TV，左看综艺，弹幕开着。她一个半小时前读完了...",steps:[{type:"thought",label:"思考",text:"她在看芒果TV，左看综艺。弹幕开着，说明现在状态比较轻松。"},{type:"tool",label:"工具调用",text:"pc_control"},{type:"result",label:"工具结果",text:"pc_control"}]}]};return t[e]||t.ayan}function ni(e=""){return e==="activity_event"?"violet":e==="proactive_message"?"gold":e==="cot_log"?"blue":"neutral"}function ai(e=""){return e==="activity_event"?"被动":e==="proactive_message"?"主动":e==="cot_log"?"日志":"记录"}function oi(e={}){return e.kind==="activity_event"?e.eventType||e.source||"事件":e.kind==="proactive_message"?e.title||"主动消息":e.kind==="cot_log"?e.logType||e.toolName||"COT":e.title||"记录"}function ii(e=""){return se(e,{fallback:String(e||""),includeYear:!0})}function ri(e={}){const t=e.raw||{},a=[];if(e.kind==="activity_event")a.push({type:"thought",label:"事件",text:e.summary||e.title||""}),(e.gateStatus||e.messageHint||e.shouldHandle||e.shouldNotifyLlm)&&a.push({type:e.shouldHandle||e.shouldNotifyLlm?"result":"thought",label:"筛选",text:`${e.shouldHandle?"需要处理":"静默"}${e.shouldNotifyLlm?" / 可通知大模型":""}${e.messageHint?`：${e.messageHint}`:""}`}),t.gate_reason&&a.push({type:"thought",label:"原因",text:t.gate_reason});else if(e.kind==="proactive_message")a.push({type:"reply",label:"主动消息",text:e.summary||""}),t.reason_context&&a.push({type:"thought",label:"依据",text:String(t.reason_context).slice(0,220)});else{const o=e.toolName?"工具调用":"日志";a.push({type:e.toolName?"tool":"thought",label:o,text:e.summary||e.title||""}),t.content&&a.push({type:e.toolName?"result":"thought",label:"内容",text:String(t.content).slice(0,500)})}return{id:String(e.id||`${e.kind}_${e.occurredAt||e.createdAt||Date.now()}`),mode:ai(e.kind),badge:oi(e),accent:ni(e.kind),score:e.shouldHandle||e.shouldNotifyLlm?"有效":"",latency:"",amount:e.source||"",time:ii(e.occurredAt||e.createdAt),summary:e.summary||e.title||"",steps:a.filter(o=>String(o.text||"").trim())}}async function si({silent:e=!0}={}){const t=h(n.currentContactId)||n.contacts[0];n.activityLogLoading=!0,e||u();try{const a=new URLSearchParams({hours:"24",limit:"50",agent_id:t?.id||n.currentContactId||""});t?.sessionId&&a.set("session_id",t.sessionId);const o=await fetch(`${S}/api/activity-log/recent?${a.toString()}`);if(!o.ok)throw new Error(`HTTP ${o.status}`);const i=await o.json().catch(()=>({}));n.activityLogEntries=Array.isArray(i.items)?i.items.map(ri):[],n.activityLogLoadedAt=new Date().toISOString()}catch(a){console.warn("[activity log] load failed",a),e||(n.toast="活动日志加载失败")}finally{n.activityLogLoading=!1,u(),n.toast&&window.setTimeout(()=>{n.toast="",u()},1200)}}function ci(e){return`
      <div class="cot-log-step ${e.type}">
        <span class="cot-log-step-label">${l(e.label)}</span>
        <span class="cot-log-step-text">${l(e.text)}</span>
      </div>
    `}function ui(){const e=h(n.currentContactId)||n.contacts[0],t=n.cotLogMode==="note",a=n.activityLogLoadedAt?n.activityLogEntries:ti(e.id),o=a.filter(r=>n.cotLogMode==="short"?r.mode!=="主动":n.cotLogMode==="note"?r.steps.some(s=>s.type==="note"):!0),i=a.filter(r=>r.steps.some(s=>s.type==="note")).length;return`
      <section class="cot-log-page page-block">
        <div class="cot-log-toolbar glass-frost">
          <button class="cot-log-tool-btn avatar" aria-label="${l(e.name)}">
            <img src="${e.avatar}" alt="${l(e.name)}" />
          </button>
          <div class="cot-log-segment-shell">
            <button class="cot-log-segment-btn ${n.cotLogMode==="short"?"active":""}" data-action="switch-cot-log-mode" data-mode="short">短消息</button>
            <button class="cot-log-segment-btn ${n.cotLogMode==="long"?"active":""}" data-action="switch-cot-log-mode" data-mode="long">长消息</button>
          </div>
          <button class="cot-log-tool-btn note ${n.cotLogMode==="note"?"active":""}" data-action="switch-cot-log-mode" data-mode="note">${g("file")}${i?`<em>${i}</em>`:""}</button>
        </div>
        <div class="cot-log-stack">
          ${n.activityLogLoading?'<div class="cot-log-empty glass-frost"><span class="cot-log-empty-icon">'+g("cot")+"</span><strong>正在加载活动日志</strong><p>等一下，别盯着白板发呆。</p></div>":""}
          ${!n.activityLogLoading&&n.activityLogLoadedAt&&!o.length?'<div class="cot-log-empty glass-frost"><span class="cot-log-empty-icon">'+g("file")+"</span><strong>还没有活动日志</strong><p>这个模式下暂时没有主动消息、工具调用或小纸条。</p></div>":""}
          ${o.map(r=>{const s=t?r.steps.filter(c=>c.type==="note"):r.steps;return`
            <article class="cot-log-card glass-frost ${t?"note-only":""}">
              <div class="cot-log-topline">
                <div class="cot-log-badges">
                  <span class="cot-log-mode ${r.accent}">${l(r.mode)}</span>
                  <span class="cot-log-mode neutral">${l(r.badge)}</span>
                  <span class="cot-log-metric">${l(r.score)}</span>
                  <span class="cot-log-metric warm">${l(r.latency)}</span>
                </div>
                <span class="cot-log-fold">${g("chevron")}</span>
              </div>
              <div class="cot-log-meta">
                <span class="cot-log-cost">${l(r.amount)}</span>
                <span>${l(r.time)}</span>
              </div>
              ${t?"":`<div class="cot-log-summary">${l(r.summary)}</div>`}
              <div class="cot-log-steps">
                ${s.map(ci).join("")}
              </div>
            </article>
          `}).join("")}
        </div>
      </section>
    `}function Wt(e){return!e||typeof e.closest!="function"?!1:!!e.closest('input:not([type="range"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]), textarea, select, [contenteditable="true"]')}function di(){return!!(window.matchMedia?.("(pointer: coarse)").matches||"ontouchstart"in window||navigator.maxTouchPoints>0)}function bt(e){return!!e&&/^image\/(png|jpe?g|webp|gif|heic|heif)$/i.test(e.type||"")}function li(e){return new Promise((t,a)=>{if(!bt(e)){a(new Error("只支持图片附件"));return}const o=new FileReader;o.onerror=()=>a(new Error("图片读取失败")),o.onload=()=>t({id:`att_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,kind:"image",type:e.type||"image/*",name:e.name||"pasted-image",size:e.size||0,url:typeof o.result=="string"?o.result:""}),o.readAsDataURL(e)})}async function Wn(e=[]){const t=Array.from(e).filter(bt);if(!t.length)return!1;try{const a=await Promise.all(t.map(li));return n.chatAttachments=[...n.chatAttachments||[],...a].slice(0,6),n.chatPasteError="",n.showAttach=!1,u(),!0}catch(a){return console.warn("[chat] image attach failed",a),n.chatPasteError=a?.message||"图片添加失败",n.toast=n.chatPasteError,u(),window.setTimeout(()=>{n.toast="",u()},1400),!1}}function Zn(e,t){if(!e||!t)return;const a=String(e.value||""),o=typeof e.selectionStart=="number"?e.selectionStart:a.length,i=typeof e.selectionEnd=="number"?e.selectionEnd:o;e.value=`${a.slice(0,o)}${t}${a.slice(i)}`;const r=o+t.length;e.setSelectionRange?.(r,r),e.dispatchEvent(new Event("input",{bubbles:!0}))}function pi(e){if(!e)return"";const t=document.createElement("div");return t.innerHTML=e,(t.textContent||t.innerText||"").replace(/\n{3,}/g,`

`)}async function mi(e){if(n.currentView!=="room")return;const t=e.clipboardData;if(!t)return;const a=Array.from(t.files||[]).filter(bt),o=Array.from(t.items||[]).filter(c=>c.kind==="file"&&/^image\//i.test(c.type||"")).map(c=>c.getAsFile()).filter(bt),i=[...a,...o].filter((c,d,p)=>d===p.findIndex(m=>m.name===c.name&&m.size===c.size&&m.type===c.type)),r=t.getData("text/plain")||"",s=t.getData("text/html")||"";if(i.length){e.preventDefault(),await Wn(i),r.trim()&&Zn(e.currentTarget,r);return}s&&(e.preventDefault(),Zn(e.currentTarget,r||pi(s)))}function fi(e,t){t&&(n.avatarCropper={kind:e,src:t,x:50,y:50,zoom:1},u())}function ae(e){const t=Number(e);return Number.isFinite(t)?Math.min(100,Math.max(0,t)):50}function Qe(e){const t=Number(e);return Number.isFinite(t)?Math.min(2.4,Math.max(1,t)):1}function ea(){const e=n.avatarCropper;if(!e)return;e.x=ae(e.x),e.y=ae(e.y),e.zoom=Qe(e.zoom);const t=w(),a=t?.querySelector(".avatar-cropper-image");a&&(a.style.objectPosition=`${e.x}% ${e.y}%`,a.style.transform=`scale(${e.zoom})`),t?.querySelectorAll('[data-action="avatar-cropper-range"]').forEach(o=>{const i=o.dataset.key;i&&i in e&&(o.value=String(e[i]))})}function gi(e){const t=e.target?.closest?.(".avatar-cropper-viewport"),a=n.avatarCropper;!t||!a||(e.preventDefault(),n.avatarCropDrag={pointerId:e.pointerId,startClientX:e.clientX,startClientY:e.clientY,startX:ae(a.x),startY:ae(a.y)},t.setPointerCapture?.(e.pointerId))}function hi(e){const t=n.avatarCropDrag,a=n.avatarCropper,o=w()?.querySelector(".avatar-cropper-viewport");if(!t||!a||!o||t.pointerId!==e.pointerId)return;e.preventDefault();const i=o.getBoundingClientRect(),r=Qe(a.zoom),s=i.width?(e.clientX-t.startClientX)/i.width*100/r:0,c=i.height?(e.clientY-t.startClientY)/i.height*100/r:0;a.x=ae(t.startX-s),a.y=ae(t.startY-c),ea()}function ta(e){const t=n.avatarCropDrag;!t||t.pointerId!==e.pointerId||(n.avatarCropDrag=null)}function Zt(e,t){if(!e)return;const a=new FileReader;a.onload=()=>{const o=typeof a.result=="string"?a.result:"";fi(t,o)},a.readAsDataURL(e)}function bi(e){return new Promise((t,a)=>{const o=new Image;o.onload=()=>{const r=document.createElement("canvas");r.width=512,r.height=512;const s=r.getContext("2d");if(!s){a(new Error("canvas unavailable"));return}const c=Qe(e.zoom),d=Math.max(512/o.naturalWidth,512/o.naturalHeight),p=o.naturalWidth*d*c,m=o.naturalHeight*d*c,f=ae(e.x)/100,b=ae(e.y)/100,v=(512-p)*f,I=(512-m)*b;s.imageSmoothingEnabled=!0,s.imageSmoothingQuality="high",s.drawImage(o,v,I,p,m),t(r.toDataURL("image/jpeg",.9))},o.onerror=a,o.src=e.src})}async function vi(){const e=n.avatarCropper;if(e?.src)try{const t=await bi(e);if(e.kind==="new-contact")n.newContactDraft={...n.newContactDraft||dt(),avatar:t},n.newContactAvatar=t;else if(e.kind==="account")n.accountProfile.avatar=t,D(),$(120);else if(e.kind==="contact"){const a=h(n.currentContactId);a&&(a.avatar=t,$(120))}n.avatarCropper=null,n.toast="头像已更新",u(),window.setTimeout(()=>{n.toast="",u()},1200)}catch{n.toast="头像裁切失败",u(),window.setTimeout(()=>{n.toast="",u()},1200)}}function yi(){const e=w();if(!e||e.dataset.bound==="1")return;e.dataset.bound="1",e.addEventListener("click",en),e.addEventListener("input",wi),e.addEventListener("pointerdown",gi),e.addEventListener("pointermove",hi),e.addEventListener("pointerup",ta),e.addEventListener("pointercancel",ta);let t;const a=f=>{if(Wt(f.target))return;const b=f.target.closest(".message-bubble.from-ai");b&&(t=window.setTimeout(()=>{const v=b.dataset.msgId;if(h(n.currentContactId)?.messages?.find(T=>T.id===v)?.text){n.quoteMomentId=null,n.quoteMessageId=v,u();const T=w()?.querySelector(".chat-input");T&&T.focus()}n.activeBubbleToolsId=v,n.suppressBubbleToggle=!0,navigator.vibrate&&navigator.vibrate(50)},550))},o=()=>clearTimeout(t);e.addEventListener("touchstart",a,{passive:!0}),e.addEventListener("touchend",o),e.addEventListener("touchmove",o,{passive:!0}),e.addEventListener("mousedown",a),e.addEventListener("mouseup",o),e.addEventListener("mousemove",o),e.addEventListener("mouseleave",o);const i=e.querySelector(".send-round");i&&i.addEventListener("click",f=>{f.stopPropagation(),n.streamingAbortController?(n.streamingAbortController.abort(),n.streamingAbortController=null,u()):n.currentView!=="rpRoom"&&pt(h(n.currentContactId))?gn():n.currentView!=="rpRoom"&&lt(h(n.currentContactId))?hn():bn()});const r=e.querySelector(".soft-mini");r&&r.addEventListener("click",f=>{f.stopPropagation(),n.showAttach=!n.showAttach,u()});const s=e.querySelector(".codex-toggle:not(.cc-toggle)");s&&s.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),vt()});const c=e.querySelector(".cc-toggle");c&&c.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),At()}),e.querySelectorAll(".chat-list-item[data-contact-id]").forEach(f=>{f.addEventListener("click",b=>{b.preventDefault(),b.stopPropagation(),Xn(f.dataset.contactId)})});const p=e.querySelector(".chat-input");p&&(p.addEventListener("paste",mi),p.addEventListener("keydown",f=>{f.key==="Enter"&&!f.shiftKey&&(f.preventDefault(),n.currentView!=="rpRoom"&&pt(h(n.currentContactId))?gn():n.currentView!=="rpRoom"&&lt(h(n.currentContactId))?hn():bn())}),["room","rpRoom"].includes(n.currentView)&&!di()&&p.focus());const m=e.querySelector("#chat-image-input");m&&m.addEventListener("change",async f=>{await Wn(f.target.files||[]),f.target.value=""})}function vt(e=n.currentContactId){const t=h(e)||h(n.currentContactId);if(t){if(n.currentContactId=t.id,!Yt(t)){t.settings={...t.settings||{},codexEnabled:!1},n.toast="只有阿湛能切 Codex",u(),window.setTimeout(()=>{n.toast="",u()},1200);return}t.settings={...t.settings||{},codexEnabled:!t.settings?.codexEnabled},n.toast=t.settings.codexEnabled?"Codex 已接管这个窗口":"Codex 已关闭",$(120),u(),window.setTimeout(()=>{n.toast="",u()},1200)}}window.__yuiToggleCodex=(e,t)=>{t?.preventDefault?.(),t?.stopPropagation?.(),t?.stopImmediatePropagation?.();const a=e?.dataset?.contactId||n.currentContactId;vt(a)},window.__yuiToggleCC=(e,t)=>{t?.preventDefault?.(),t?.stopPropagation?.(),t?.stopImmediatePropagation?.();const a=e?.dataset?.contactId||n.currentContactId;At(a)};async function en(e){const t=e.target.closest("[data-action]");if(!t)return;const a=t.dataset.action;if(a==="cancel-avatar-cropper"){n.avatarCropper=null,n.avatarCropDrag=null,u();return}if(a==="apply-avatar-cropper"){e.preventDefault(),e.stopPropagation(),await vi();return}if(a==="switch-tab"&&(n.currentTab=t.dataset.tab,n.currentView=t.dataset.tab==="chats"?"list":t.dataset.tab,u()),a==="open-contact"){Xn(t.dataset.contactId);return}if(a==="back-list"&&(n.currentView="list",n.currentTab="chats",n.quoteMomentId=null,u()),a==="back-room"&&(n.currentView="room",u()),a==="open-contact-settings"&&(n.currentSettingsTab="basic",n.currentView="contactSettings",u(),me(),at(n.currentContactId)),a==="open-cot-log"){n._prevContactSettingsTab=n.currentSettingsTab,n.currentView="cotLog",n.cotLogMode="long",n.activityLogLoadedAt="",n.activityLogEntries=[],u(),si({silent:!0});return}if(a==="back-contact-settings"){n.currentView="contactSettings",n.currentSettingsTab=n._prevContactSettingsTab||n.currentSettingsTab||"basic",n._prevContactSettingsTab=null,u();return}if(a==="switch-cot-log-mode"){n.cotLogMode=t.dataset.mode||"long",u();return}if(a==="open-rp-lobby"){ko(n.currentView==="room"?"room":"list",Oe());return}if(a==="back-rp-source"){n.currentView=n.rpBackView||"list",u();return}if(a==="back-rp-lobby"){n.currentView="rpLobby",u();return}if(a==="open-rp-room-create"){n.rpRoomDialogMode="create",n.rpRoomForm={name:"",world_setting:"",user_role:"",ai_role:""},n.rpRoomDialogOpen=!0,u();return}if(a==="close-rp-room-dialog"){if(t.dataset.rpRoomDialog==="card"||e.target&&e.target!==t)return;n.rpRoomDialogOpen=!1,u();return}if(a==="save-rp-room"){try{await _o(),n.toast=n.rpRoomDialogMode==="edit"?"幕间已更新":"已入梦"}catch(o){console.warn("[rp] save room failed",o),n.toast="房间保存失败"}u(),window.setTimeout(()=>{n.toast="",u()},1200);return}if(a==="open-rp-room"){e.preventDefault(),e.stopPropagation(),await Yn(t.dataset.roomId);return}if(a==="delete-rp-room"){e.preventDefault(),e.stopPropagation();try{await Mo(t.dataset.roomId),n.toast="房间已删除"}catch(o){console.warn("[rp] delete room failed",o),n.toast="删除失败"}u(),window.setTimeout(()=>{n.toast="",u()},1200);return}if(a==="rename-rp-room"){e.preventDefault(),e.stopPropagation();const o=t.dataset.roomId,i=n.rpRooms.find(s=>s.room_id===o),r=window.prompt("剧本",i?.name||"")?.trim();if(!r||!o)return;try{const s=await fetch(`${S}/api/rp/rooms/${encodeURIComponent(o)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:r})});if(!s.ok)throw new Error(`HTTP ${s.status}`);await mt(Oe(),{silent:!0}),n.toast="房间已重命名"}catch(s){console.warn("[rp] rename room failed",s),n.toast="重命名失败"}u(),window.setTimeout(()=>{n.toast="",u()},1200);return}if(a==="open-profile"&&(n.currentView="profile",u()),a==="stop-streaming"){n.streamingAbortController&&(n.streamingAbortController.abort(),n.streamingAbortController=null);return}if(a==="toggle-thinking-line"){const o=t.closest("[data-id]")?.dataset.id||t.dataset.id,i=w()?.querySelector(`#tl-line-${o}`),r=w()?.querySelector(`#tl-full-${o}`);if(!i||!r)return;const s=r.classList.contains("tl-open");r.classList.toggle("tl-open",!s),i.classList.toggle("tl-expanded",!s);return}if(a==="toggle-thinking"){const o=t.dataset.id,r=!!!n.openThinkingIds[o];n.openThinkingIds[o]=r;const s=document.getElementById(`thinking-${o}`);s?(s.classList.toggle("open",r),s.setAttribute("aria-hidden",r?"false":"true"),t.setAttribute("aria-expanded",r?"true":"false")):u()}if(a==="toggle-message-tools"){if(e.preventDefault(),e.stopPropagation(),n.suppressBubbleToggle){n.suppressBubbleToggle=!1;return}const o=t.dataset.id,i=n.activeBubbleToolsId===o?null:o;n.activeBubbleToolsId=i;const r=w();r&&(r.querySelectorAll(".bubble-bottom-tools.open").forEach(s=>{s.classList.remove("open")}),i&&r.querySelector(`.message-row[data-msg-id="${CSS.escape(i)}"] .bubble-bottom-tools`)?.classList.add("open"));return}if(a==="go-chat-with-quote"&&(n.currentContactId=t.dataset.contactId,n.quoteMomentId=t.dataset.momentId,n.quoteMessageId=null,n.currentTab="chats",n.currentView="room",u(),We(n.currentContactId),me(n.currentContactId),at(n.currentContactId)),a==="open-comments"){e.preventDefault(),e.stopPropagation(),t.blur?.();const o=t.dataset.momentId,i=n.commentSheetMomentId===o?null:o;n.commentSheetMomentId=i;const r=w();if(r&&(r.querySelectorAll(".moment-inline-comment.open").forEach(s=>s.classList.remove("open")),i)){const s=r.querySelector(`.moment-inline-comment .moment-comment-input[data-comment-input="${i}"]`)?.closest(".moment-inline-comment");s&&s.classList.add("open")}return}if(a==="submit-comment"){e.preventDefault(),e.stopPropagation();const o=t.dataset.momentId,r=w()?.querySelector(`[data-comment-input="${o}"]`)?.value?.trim();if(!o||!r)return;try{const s=await Ir(o,Se(),r);n.moments=n.moments.map(c=>c.id===o?s:c),n.commentSheetMomentId=null,n.toast="已发送评论",$(120),ee(),window.setTimeout(()=>{n.toast="",ee()},1200)}catch(s){console.warn("[moments] comment failed",s),co(o,Se(),r),n.commentSheetMomentId=null,n.toast="已发送评论",$(120),ee(),window.setTimeout(()=>{n.toast="",ee()},1200)}return}if(a==="like-moment"){e.preventDefault(),e.stopPropagation();const o=t.dataset.momentId;if(!o)return;try{const i=await $r(o,Se());n.moments=n.moments.map(r=>r.id===o?i:r),$(120),ee()}catch(i){console.warn("[moments] like failed",i),so(o,Se()),$(120),ee()}return}if(a==="submit-comment"){const o=Ke(t.dataset.momentId),r=w()?.querySelector(`[data-comment-input="${t.dataset.momentId}"]`)?.value?.trim();o&&r&&(o.comments.unshift({author:"我",text:r}),n.commentSheetMomentId=null,n.toast="已发送评论",$(120),u(),window.setTimeout(()=>{n.toast="",u()},1200))}if(a==="like-moment"){e.preventDefault(),e.stopPropagation();const o=Ke(t.dataset.momentId);if(!o)return;const i="我",r=o.likes.includes(i);o.likes=o.likes.filter(p=>p!==i),r||o.likes.unshift(i);const s=t;s.innerHTML=o.likes.includes(i)?g("heartFilled"):g("heart");const c=t.closest(".moment-content-col");if(!c)return;let d=c.querySelector(`[data-moment-id-panel="${o.id}"]`);if(!d&&o.likes.length>0){d=document.createElement("div"),d.className="moment-interactions",d.setAttribute("data-moment-id-panel",o.id);const p=c.querySelector(".moment-inline-comment");p?c.insertBefore(d,p):c.appendChild(d)}if(d){const p=d.querySelector(".moment-likes-area");if(o.likes.length>0)if(p)p.querySelector(".likes-list").textContent=o.likes.join("、");else{const m=document.createElement("div");m.className="moment-likes-area",m.innerHTML=`<span class="heart-mini">${g("heartFilled")}</span> <span class="likes-list">${l(o.likes.join("、"))}</span>`,d.insertBefore(m,d.firstChild)}else p&&p.remove(),d.querySelector(".moment-comments-area")||d.remove()}}if(a==="toggle-moment-search"&&(n.momentSearchOpen=!0,u()),a==="toggle-moment-menu"&&(e.preventDefault(),e.stopPropagation(),t.blur?.(),n.activeMenuMomentId=n.activeMenuMomentId===t.dataset.momentId?null:t.dataset.momentId,jn()),a==="delete-moment"){e.preventDefault(),e.stopPropagation();const o=E(Ke(t.dataset.momentId));if(!o?.id)return;try{await Sr(o.id,o.author_type,o.author_id),n.moments=n.moments.filter(i=>i.id!==o.id),n.activeMenuMomentId=null,n.toast="已删除朋友圈",$(120),ee(),window.setTimeout(()=>{n.toast="",ee()},1200)}catch(i){console.warn("[moments] delete failed",i),n.toast="删除失败",ee(),window.setTimeout(()=>{n.toast="",ee()},1400)}return}if(a==="edit-moment"){e.preventDefault(),e.stopPropagation();const o=E(Ke(t.dataset.momentId));if(!o?.id)return;n.activeMenuMomentId=null,n.momentComposerEditingId=o.id,n.momentComposerText=o.content||"",n.momentComposerImage=o.image||"",n.momentComposerImageName=o.image?"已有图片":"",n.momentsActorType=o.author_type==="agent"?"agent":"user",n.momentComposerOpen=!0,ee();return}if(a==="new-moment"){e.preventDefault(),e.stopPropagation(),n.momentComposerEditingId="",n.momentComposerText="",n.momentComposerImage="",n.momentComposerImageName="",n.momentComposerOpen=!0,ee();return}if(a==="set-moments-actor"){n.toast="发朋友圈默认以我发布",u(),window.setTimeout(()=>{n.toast="",u()},1100);return}if(a==="publish-moment"){const o=(document.getElementById("moment-content-input")?.value||n.momentComposerText||"").trim();if(!o){n.toast="朋友圈内容还没写",u(),window.setTimeout(()=>{n.toast="",u()},1100);return}const i=Se();try{if(n.momentComposerEditingId)await wr(n.momentComposerEditingId,{author_type:i.author_type,author_id:i.author_id,visibility:"public",content:o,image:n.momentComposerImage||"",mood:"日常"}),await La({silent:!0}),n.toast="已更新朋友圈";else{const r=await yr({author_type:i.author_type,author_id:i.author_id,visibility:"public",content:o,image:n.momentComposerImage||"",mood:"日常"});n.moments.unshift(r),n.toast="已发布朋友圈"}n.currentTab="moments",n.currentView="moments",n.momentComposerOpen=!1,n.momentComposerEditingId="",n.momentComposerText="",n.momentComposerImage="",n.momentComposerImageName="",$(120),u(),window.setTimeout(()=>{n.toast="",u()},1100)}catch(r){console.warn("[moments] publish failed",r),n.toast=n.momentComposerEditingId?"更新失败":"发布失败",u(),window.setTimeout(()=>{n.toast="",u()},1400)}return}if(a==="delete-moment"&&(n.moments=n.moments.filter(o=>o.id!==t.dataset.momentId),n.activeMenuMomentId=null,n.toast="已删除朋友圈",u(),window.setTimeout(()=>{n.toast="",u()},1200)),a==="edit-moment"&&(n.activeMenuMomentId=null,n.toast="编辑功能即将支持",u(),window.setTimeout(()=>{n.toast="",u()},1200)),a==="filter-moments"&&(n.toast="筛选功能稍后补上",u(),window.setTimeout(()=>{n.toast="",u()},1100)),a==="new-moment"&&(n.momentComposerOpen=!0,u()),a==="close-moment-composer"&&(n.momentComposerOpen=!1,u()),a==="publish-moment"){const o=(document.getElementById("moment-content-input")?.value||n.momentComposerText||"").trim();if(!o){n.toast="朋友圈内容还没写",u(),window.setTimeout(()=>{n.toast="",u()},1100);return}n.moments.unshift({id:`p${Date.now()}`,contactId:"me",time:new Date().toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",hour12:!1}),mood:"日常",content:o,likes:[],comments:[],image:n.momentComposerImage||"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80"}),n.currentTab="moments",n.currentView="moments",n.momentComposerOpen=!1,n.momentComposerText="",n.momentComposerImage="",n.momentComposerImageName="",n.toast="已发布朋友圈",$(120),u(),window.setTimeout(()=>{n.toast="",u()},1100)}if(a==="remove-moment-image"&&(n.momentComposerImage="",n.momentComposerImageName="",u()),a==="new-contact"&&(n.newContactDraft=dt(),n.newContactAvatar="",n.currentView="newContact",u()),a==="pick-new-contact-avatar"){document.getElementById("nc-avatar-file")?.click();return}if(a==="save-new-contact"){n.newContactDraft={...n.newContactDraft||{},name:document.getElementById("nc-name")?.value?.trim()||n.newContactDraft?.name||"",agentId:document.getElementById("nc-agent-id")?.value?.trim()||n.newContactDraft?.agentId||"",bio:document.getElementById("nc-bio")?.value?.trim()||n.newContactDraft?.bio||""};const o=String(n.newContactDraft.name||"").trim(),i=ge(n.newContactDraft.agentId),r=String(n.newContactDraft.bio||"").trim(),s=n.newContactDraft.avatar||n.newContactAvatar||"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80";if(!o){n.toast="请填写联系人昵称",u(),window.setTimeout(()=>{n.toast="",u()},1200);return}if(i&&!/^[a-z0-9_-]+$/.test(i)){n.toast="Agent ID 只能用小写字母、数字、下划线或短横线",u(),window.setTimeout(()=>{n.toast="",u()},1500);return}if(i&&n.contacts.some(m=>String(m.id||"").toLowerCase()===i)){n.toast="这个 Agent ID 已经存在",u(),window.setTimeout(()=>{n.toast="",u()},1400);return}const c=i||"c"+Date.now(),d=Kn({id:c,name:o,bio:r||"这是新来的联系人",status:"在线",handle:"@"+c,unread:0,pinned:!1,lastMessage:"",lastTime:"",avatar:s,settings:{model:"gpt-5.4",modelProviderId:x("chat")?.providerId||"openai",temperature:.7,topP:.9,contextCount:32,thinkBudget:24,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!1,proactiveFrequency:30,memoryEnabled:!0},topics:[],messages:[]}),p=await $o(d);pe(),_e(100),n.newContactDraft=dt(),n.newContactAvatar="",n.toast=p?"已添加联系人":"已本地添加，后端登记失败",n.currentView="list",u(),window.setTimeout(()=>{n.toast="",u()},p?1200:1800)}if(a==="open-contact-avatar"){document.getElementById("contact-avatar-file")?.click();return}if(a==="open-contact-name"){const o=h(n.currentContactId);if(!o)return;const i=window.prompt("请输入昵称",o.name||"")?.trim();if(!i)return;o.name=i,n.toast="昵称已更新",u(),$(120),window.setTimeout(()=>{n.toast="",u()},1200);return}if(a==="open-contact-bio"){const o=h(n.currentContactId);if(!o)return;const i=window.prompt("请输入简介",o.bio||"")?.trim();if(typeof i!="string"||!i)return;o.bio=i,n.toast="简介已更新",u(),$(120),window.setTimeout(()=>{n.toast="",u()},1200);return}if(a==="open-contact-impression"){n._prevContactSettingsTab=n.currentSettingsTab,n.currentView="contactImpressionDetail",u(),me(n.currentContactId);return}if(a==="open-contact-relationship"){n._prevContactSettingsTab=n.currentSettingsTab,n.currentView="contactRelationshipDetail",u(),me(n.currentContactId);return}if(a==="open-contact-likes"){n._prevContactSettingsTab=n.currentSettingsTab,n.currentView="contactLikesDetail",u(),me(n.currentContactId);return}if(a==="save-insight-field"){const o=t.dataset.field,i=document.querySelector(`.insight-editor-textarea[data-field="${o}"]`);i&&kr(o,i.value);return}if(a==="open-contact-room-background"){n._prevContactSettingsTab=n.currentSettingsTab,n.currentView="contactRoomBackgroundPicker",u();return}if(a==="open-contact-bubble-theme"){n._prevContactSettingsTab=n.currentSettingsTab,n.currentView="contactBubbleThemePicker",u();return}if(a==="delete-contact"){const o=h(n.currentContactId);if(!o||!window.confirm(`确定删除“${o.name}”吗？

会删除联系人及其陪伴状态。
会清理相关主动消息。
聊天记录和记忆不会立即永久删除。`))return;try{await yo(o.id),vo(o.id),n.toast="联系人已删除",u(),$(120),window.setTimeout(()=>{n.toast="",u()},1400)}catch(r){console.warn("[contact] delete failed",r),n.toast="删除失败",u(),window.setTimeout(()=>{n.toast="",u()},1400)}return}if(a==="pick-contact-room-background"){const o=String(t.dataset.value||"").trim();if(!o)return;io("roomBackground",o,"聊天背景已更新"),n.currentView="contactSettings",n.currentSettingsTab="basic",u();return}if(a==="pick-contact-bubble-theme"){const o=Lt(t.dataset.value),i=h(n.currentContactId);if(!i||!o)return;i.chatTheme=o,i.bubbleTheme=Ot(o),i.theme=Jn(o),n.toast="气泡主题已更新",n.currentView="contactSettings",n.currentSettingsTab="basic",u(),$(120),window.setTimeout(()=>{n.toast="",u()},1200);return}if(a==="open-companion-state"){n._prevContactSettingsTab=n.currentSettingsTab,n.currentView="companionStateDetail",me(n.currentContactId),u();return}if(a==="expand-actions"){n.showAttach=!n.showAttach,u();return}if(a==="remove-chat-attachment"){const o=t.dataset.id;n.chatAttachments=(n.chatAttachments||[]).filter(i=>i.id!==o),u();return}if(a==="clear-quote"&&(n.quoteMomentId=null,n.quoteMessageId=null,u()),a==="toggle-global"){const o=t.dataset.key;n.globalSettings[o]=!n.globalSettings[o],Fn(t,n.globalSettings[o]),D();return}if(a==="toggle-contact"){const o=h(n.currentContactId),i=t.dataset.key,s=w()?.querySelector(".chat-app-body")?.scrollTop??0;o.settings[i]=!o.settings[i],u(),jt(s)}if(a==="back-home"&&(n.currentView==="list"?typeof window.closePage=="function"&&window.closePage("page-chat"):(n.currentTab="chats",n.currentView="list",u())),a==="switch-settings-tab"&&(n.currentSettingsTab=t.dataset.tab,n.contactQuickActionEditorId="",n.quickActionSwipeOpenId="",n.quickActionDropHintId="",n.quickActionDropDirection="",n.quickActionReorderPulseId="",n.currentSettingsTab!=="model"&&(n.contactModelAdvancedOpen=!1),u(),n.currentSettingsTab==="memory"&&me(),n.currentSettingsTab==="model"&&at(n.currentContactId)),a==="toggle-contact-advanced"){n.contactModelAdvancedOpen=!n.contactModelAdvancedOpen,u();return}if(a==="toggle-codex-mode"){vt(t.dataset.contactId);return}if(a==="toggle-cc-mode"){At(t.dataset.contactId);return}if(a==="quick-action"){const o=t.dataset.id,i=w()?.querySelector(".chat-input"),r=Nt(K()).find(c=>c.id===o),s={health:"帮我记一下健康相关的事情",schedule:"帮我看看接下来的日程",weather:"帮我查一下今天的天气",files:"帮我找一下刚才提到的文件",quote:"引用上一条消息继续聊",more:"打开更多快捷操作",get_current_time:"现在几点了？",get_weather:"帮我查一下今天天气",get_health_summary:"帮我总结一下今天的健康数据",web_search:"帮我搜索这个问题",fetch_url:"帮我解析这个网页",add_todo:"帮我记一个待办",list_todos:"帮我看看待办清单",complete_todo:"把这个待办标记完成",add_note:"帮我记一条便签",list_notes:"帮我看看最近便签"};i&&(i.value=r?.prompt||s[r?.mcpToolId||o]||s[o]||`${r?.label||""}`.trim())}if(a==="fake-send"){if(n.streamingAbortController){n.streamingAbortController.abort(),n.streamingAbortController=null,u();return}n.currentView==="rpRoom"?Ri():pt(h(n.currentContactId))?gn():lt(h(n.currentContactId))?hn():bn()}if(a==="reroll-msg"&&Vi(t.dataset.id),a==="quote-msg"){const o=t.dataset.id;if(h(n.currentContactId)?.messages?.find(s=>s.id===o)?.text){n.quoteMomentId=null,n.quoteMessageId=o,u();const s=w()?.querySelector(".chat-input");s&&s.focus()}}if(a==="attach-option"){n.showAttach=!1;const o=t.dataset.label||"";if(o==="图片"||o==="拍照"){u(),requestAnimationFrame(()=>w()?.querySelector("#chat-image-input")?.click());return}n.toast=`${o} 功能稍后补上`,u(),window.setTimeout(()=>{n.toast="",u()},1200)}}function wi(e){const t=e.target;if(t?.dataset?.action==="avatar-cropper-range"){const a=n.avatarCropper;if(!a)return;const o=t.dataset.key;a[o]=o==="zoom"?Qe(t.value):ae(t.value),ea();return}if((t?.id==="nc-name"||t?.id==="nc-agent-id"||t?.id==="nc-bio")&&(n.newContactDraft={...n.newContactDraft||{},...t.id==="nc-name"?{name:t.value||""}:{},...t.id==="nc-agent-id"?{agentId:t.value||""}:{},...t.id==="nc-bio"?{bio:t.value||""}:{}}),t.dataset.action==="slide-contact"){const a=h(n.currentContactId),o=t.dataset.key,i=Number(t.value);a.settings[o]=Number.isInteger(a.settings[o])?Math.round(i):i;const s=t.closest(".slider-row-block")?.querySelector(".slider-value");s&&(s.textContent=Number.isInteger(Number(t.step))||Number(t.step)>=1?String(Math.round(i)):i.toFixed(Number(t.step)===.01?2:1))}t.dataset.action==="moment-composer-input"&&(n.momentComposerText=t.value||"")}document.addEventListener("DOMContentLoaded",()=>{Ei(),Nn(),Sa().finally(async()=>{await Oi(),ki(),await la({silent:!0})})});const S=window.__YUI_API_BASE__||(/^(localhost|127\.0\.0\.1)$/.test(location.hostname)?"":"https://api.somni-ref.top"),yt="murmur_local_state_v1",na="murmur_sync_meta_v1",aa="murmur_device_id_v1",oa=new Set(rt.map(e=>e.id)),ia=new Set(xn.map(e=>e.id));let tn=null,nn=null,wt=!1,Ye=!1,ra=null,an=!1,St="",on=null,rn=null;function sn(){try{const e=localStorage.getItem(aa);if(e)return e;const t=`dev_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;return localStorage.setItem(aa,t),t}catch{return`dev_fallback_${Date.now()}`}}function Xe(){try{const e=localStorage.getItem(na),t=e?JSON.parse(e):{};return{last_server_updated_at:t?.last_server_updated_at||"",pending:!!t?.pending}}catch{return{last_server_updated_at:"",pending:!1}}}function Ve(e={}){try{localStorage.setItem(na,JSON.stringify({last_server_updated_at:e.last_server_updated_at||"",pending:!!e.pending}))}catch{}}function Si(){return te(),n.currentRpRoomId&&Array.isArray(n.currentRpMessages)&&(n.rpMessages={...n.rpMessages||{},[n.currentRpRoomId]:n.currentRpMessages.map(X)}),dn({contacts:n.contacts,moments:n.moments,actions:n.actions,globalSettings:n.globalSettings,accountProfile:n.accountProfile,conversations:n.conversations,rpRooms:n.rpRooms,rpMessages:n.rpMessages})}function z(e){try{return JSON.stringify(e)}catch{return""}}function Y(e){const t=String(e||"").trim();if(!t)return 0;const a=Date.parse(t);return Number.isFinite(a)?a:0}function ke(e={}){return String(e.content||e.text||e.message||e.body||e.raw_content||"").trim()}function $t(e={}){return!!ke(e)||!!e.typing||!!e.streaming||!!e.thinking||Array.isArray(e.toolCalls)&&e.toolCalls.length>0}function cn(e={}){const t=Y(e.created_at||e.timestamp);if(t)return Math.floor(t/6e4);const a=String(e.time||"").trim();return a||""}function sa(e={},t={}){const a=cn(e),o=cn(t);return!!a&&!!o&&a===o}function ca(e={},t={}){const a=X(e),o=X(t);if(a.role!==o.role||ke(a)!==ke(o)||(a.session_id||o.session_id)&&a.session_id!==o.session_id)return!1;const i=Y(a.created_at||a.timestamp),r=Y(o.created_at||o.timestamp);return i&&r?Math.abs(i-r)<=120*1e3:sa(a,o)}function It(e={}){const t=X(e),a=new Set;t.id&&a.add(`id:${t.id}`),t.client_message_id&&a.add(`client:${t.client_message_id}`);const o=ke(t);if(o){const i=t.session_id||t.agent_id||"",r=cn(t);a.add(`soft:${i}|${t.role}|${r}|${o}`)}return a}function kt(e=[],t={}){const a=j(t),o=It(a);let i=e.findIndex(r=>{const s=It(r);return[...o].some(c=>s.has(c))});return i===-1&&(i=e.findIndex(r=>ca(r,a))),i===-1?e.push(a):e[i]=j({...e[i],...a}),a}function X(e={}){const t=String(e.role||e.from||"").toLowerCase()==="user"||e.from==="me"?"user":"ai",a=ke(e),o=String(e.created_at||e.timestamp||""),i=String(e.time||""),r=[String(e.agent_id||""),t,o||i,a].join("|");return{id:String(e.id||r||`${t}_${Date.now()}_${Math.random().toString(36).slice(2,6)}`),session_id:String(e.session_id||""),agent_id:String(e.agent_id||""),client_message_id:String(e.client_message_id||e.clientMessageId||""),role:t,content:a,text:a,created_at:o,time:i,...e.model?{model:e.model}:{},...e.source?{source:e.source}:{},...e.provider?{provider:e.provider}:{},...e.attachments?{attachments:e.attachments}:{},...e.thinking?{thinking:e.thinking}:{},...e.toolCalls?{toolCalls:e.toolCalls}:{}}}function j(e={}){const t=X(e);return{...t,text:t.content,time:t.time||(t.created_at?se(t.created_at,{fallback:""}):"")}}function Be(e={}){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).map(([t,a])=>[String(t),Array.isArray(a)?ue([],a):[]]))}function ue(e=[],t=[]){const a=[],o=new Map;return[...e,...t].forEach(i=>{const r=X(i);if(!$t(r))return;let c=[...It(r)].map(p=>o.get(p)).find(p=>p>=0);c>=0||(c=a.findIndex(p=>ca(p,r)));const d=c>=0?a[c]:null;if(!d||Y(r.created_at)>=Y(d.created_at)){const p={...d,...r},m=c>=0?c:a.length;a[m]=p,[...It(p)].forEach(f=>o.set(f,m))}}),a.filter(Boolean).sort((i,r)=>{const s=Y(i.created_at),c=Y(r.created_at);return s||c?s-c:String(i.id).localeCompare(String(r.id))})}function ua(e={},t={}){const a=Be(e),o=Be(t);return Object.entries(o).forEach(([i,r])=>{a[i]=ue(a[i]||[],r)}),a}function te(){const e=Be(n.conversations);(n.contacts||[]).forEach(t=>{if(!t?.id)return;const a=Array.isArray(t.messages)?t.messages:[];(a.length||e[t.id]?.length)&&(e[t.id]=ue(e[t.id]||[],a),t.messages=e[t.id].map(j))}),n.conversations=e}function Ge(){const e=Be(n.conversations);n.contacts=(n.contacts||[]).map(t=>{const o=(e[t.id]||(Array.isArray(t.messages)?t.messages.map(X):[])).map(j),i=o[o.length-1];return{...t,messages:o,lastMessage:i?.text||t.lastMessage||"",lastTime:i?.time||t.lastTime||""}}),n.conversations=e}function _t(e=[],t=[]){const a=new Map;return e.map(Q).forEach(o=>a.set(o.id.toLowerCase(),o)),t.map(Q).forEach(o=>{const i=o.id.toLowerCase(),r=a.get(i);if(!r){a.set(i,o);return}const s=ue(r.messages||[],o.messages||[]),c={...o,...r,id:r.id||o.id,agent_id:r.agent_id||o.agent_id||r.id||o.id,name:r.name||o.name,display_name:r.display_name||r.name||o.display_name||o.name,bio:r.bio||o.bio,status:r.status||o.status,handle:r.handle||o.handle,roleTag:r.roleTag||o.roleTag,avatar:r.avatar||o.avatar,settings:{...o.settings||{},...r.settings||{}},messages:s.map(j),lastMessage:r.lastMessage||o.lastMessage||s[s.length-1]?.content||"",lastTime:r.lastTime||o.lastTime||s[s.length-1]?.time||""};a.set(i,c)}),[...a.values()]}function $i(e=[]){for(let t=e.length-1;t>=0;t-=1){const a=String(e[t]?.session_id||"").trim();if(a)return a}return""}function Je(e={},t=""){const a=String(e.role||"").toLowerCase()==="user"?"user":"ai",o=String(e.created_at||""),i=ke(e),r=String(e.model||"");return X({id:e.id||`${t}|${a}|${o}|${i}`,session_id:e.session_id||"",agent_id:e.agent_id||t,role:a,content:i,text:i,created_at:o,time:o?se(o,{fallback:""}):"",model:r,...r.toLowerCase()==="codex"?{source:"codex",provider:"codex"}:{}})}async function We(e,{silent:t=!0}={}){const a=h(e);if(!a?.id)return 0;try{const o=Gn(a),i=[];console.info("[murmur] history request",{contact_id:a.id,tried:o});for(const m of o){const f=new URLSearchParams({agent_id:m,limit:"200"}),b=await fetch(`${S}/api/murmur/messages?${f.toString()}`);if(!b.ok){console.warn("[murmur] history fetch failed",{agent_id:m,status:b.status});continue}const v=await b.json().catch(()=>({})),I=Array.isArray(v?.messages)?v.messages:[];i.push(...I)}const r=ue([],i.map(m=>Je(m,a.id)).filter($t));if(console.info("[murmur] history loaded",{agent_id:a.id,tried:o,raw:i.length,renderable:r.length,first:r[0]||null}),!r.length)return 0;const s=z({conversations:ft(a)}),c=ue(ft(a),r);n.conversations={...n.conversations||{},[a.id]:c},a.messages=c.map(j);const d=a.messages[a.messages.length-1];d&&(a.lastMessage=d.text||"",a.lastTime=d.time||"");const p=$i(c);return p&&(a.sessionId=p),z({conversations:c})!==s&&(pe(),_e(300)),n.currentContactId===a.id&&n.currentView==="room"&&u(),r.length}catch(o){return console.error("[murmur] history load failed",o),0}}function Ii(e={}){const t=String(e.agent_id||e.agentId||"").trim(),a=String(e.content||"").trim(),o=String(e.created_at||e.createdAt||new Date().toISOString());return X({id:e.id?`proactive_${e.id}`:`proactive_${t}_${o}_${a}`,agent_id:t,role:"ai",content:a,created_at:o,source:"proactive"})}async function da(e){const t=String(e||"").trim();if(t)try{await fetch(`${S}/api/proactive/${encodeURIComponent(t)}/read`,{method:"POST"})}catch(a){console.warn("[proactive] mark read failed",a)}}async function la({silent:e=!0}={}){if(!an){an=!0;try{const t=await fetch(`${S}/api/proactive?limit=20`);if(!t.ok)throw new Error(`HTTP ${t.status}`);const a=await t.json().catch(()=>({})),o=Array.isArray(a?.messages)?a.messages:[];if(!o.length)return;let i=!1;for(const r of o){const s=Ii(r),c=s.agent_id||String(r.agent_id||"").trim();if(!c||!s.content){await da(r.id);continue}let d=h(c);d||(d=Kn({id:c,agent_id:c,name:String(r.agent_name||r.display_name||c),handle:`@${c}`,messages:[]}));const p=(n.conversations?.[d.id]||d.messages||[]).length,m=ue(n.conversations?.[d.id]||d.messages||[],[s]);n.conversations={...n.conversations||{},[d.id]:m},d.messages=m.map(j);const f=d.messages[d.messages.length-1];f&&(d.lastMessage=f.text||"",d.lastTime=f.time||""),m.length>p&&!(n.currentView==="room"&&n.currentContactId===d.id)&&(d.unread=Number(d.unread||0)+1),i=!0,await da(r.id)}i&&(Ge(),pe(),u(),n.currentView==="room"&&H())}catch(t){e||console.warn("[proactive] poll failed",t)}finally{an=!1}}}function ki(){ra||(ra=window.setInterval(()=>{la({silent:!0})},15e3))}function pa(e=[],t=[]){const a=new Map;return e.map(E).forEach(o=>a.set(o.id,o)),t.map(E).forEach(o=>{const i=a.get(o.id);if(!i){a.set(o.id,o);return}const r=Y(o.updated_at||o.created_at||o.time),s=Y(i.updated_at||i.created_at||i.time);a.set(o.id,r>s?{...i,...o}:{...o,...i})}),[...a.values()].sort((o,i)=>Y(i.updated_at||i.created_at||i.time)-Y(o.updated_at||o.created_at||o.time))}function _i(e=[],t=[],a="id"){const o=new Map;return[...e||[],...t||[]].forEach(i=>{if(!i||typeof i!="object")return;const r=String(i[a]||i.id||"").trim();r&&o.set(r,{...o.get(r)||{},...i})}),[...o.values()]}const Mi="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80";function ma(e){return!e||String(e)===Mi}function Ci(e={},t={}){const a={...e||{},...t||{}};return!ma(e?.avatar)&&ma(t?.avatar)&&(a.avatar=e.avatar),a}function pe(){const e=Si(),t=z(e);if(!t||t===St)return!1;St=t;try{return localStorage.setItem(yt,JSON.stringify({client_updated_at:new Date().toISOString(),payload:e})),!0}catch{return!1}}function fa(){return on||(on=new Map(rt.map(e=>{const t=Q(e);return[t.id,z(t)]}))),on}function ga(){return rn||(rn=new Map(xn.map(e=>{const t=E(e);return[t.id,z(t)]}))),rn}function ha(e){if(!Array.isArray(e))return!1;const t=fa();return e.some(a=>{const o=Q(a);return!oa.has(o.id)||t.get(o.id)!==z(o)})}function un(e){if(!e||typeof e!="object")return!1;const t=String(e.id||e.agent_id||"").trim().toLowerCase();if(!oa.has(t))return!1;const a=fa(),o=Q({...e,id:t});if(a.get(t)===z(o))return!0;const i=String(e.avatar||"").trim(),r=Array.isArray(e.topics)?e.topics.map(c=>String(c?.id||"")):[],s=Array.isArray(e.messages)?e.messages.map(c=>String(c?.id||"")):[];return t==="ayan"?i.includes("photo-1517841905240-472988babdf9")||s.some(c=>["m1","m2","m3"].includes(c))||r.some(c=>["t1","t2","t3"].includes(c)):t==="azheng"?i.includes("photo-1500530855697-b586d89ba3ee")||s.includes("m4")||r.some(c=>["t4","t5"].includes(c)):t==="xiaoying"?i.includes("photo-1507525428034-b723cf961d3e")||s.includes("m5")||r.includes("t6"):!1}function ba(e){return Array.isArray(e)?e.filter(t=>!un(t)):[]}function xi(e){return Array.isArray(e)&&e.length>0&&e.every(t=>un(t))}function dn(e={}){if(!e||typeof e!="object")return{};const t={...e};return Array.isArray(t.contacts)&&(t.contacts=ba(t.contacts).map(a=>Q(a))),t.conversations&&typeof t.conversations=="object"&&(t.conversations=Be(t.conversations)),t.rpMessages&&typeof t.rpMessages=="object"&&(t.rpMessages=Be(t.rpMessages)),Array.isArray(t.moments)&&(t.moments=Mt(t.moments).map(E)),t}function Ai(e){if(!Array.isArray(e))return!1;const t=ga();return e.some(a=>{const o=E(a);return!ia.has(o.id)||t.get(o.id)!==z(o)})}function va(e){if(!e||typeof e!="object")return!1;const t=String(e.id||"").trim();if(!ia.has(t))return!1;const a=ga(),o=E(e);return a.get(t)===z(o)?!0:t==="p0"?String(e.image||"").includes("photo-1507525428034-b723cf961d3e")||String(e.content||"").includes("天空很温柔"):t==="p1"?String(e.content||"").includes("醉了先看这个"):t==="p2"?String(e.content||"").includes("晚上跑了三公里"):!1}function Mt(e){return Array.isArray(e)?e.filter(t=>!va(t)):[]}function Ti(e){return Array.isArray(e)&&e.length>0&&e.every(t=>va(t))}function ya(e,{source:t="local"}={}){if(!(!e||typeof e!="object")){if(Array.isArray(e.contacts)){const a=e.contacts.map(r=>Q(r)),o=ba(a).map(r=>Q(r)),i=ha(n.contacts);o.length?(n.contacts=_t(n.contacts,o),h(n.currentContactId)||(n.currentContactId=n.contacts[0]?.id||"")):xi(a)?(i||(n.contacts=[]),h(n.currentContactId)||(n.currentContactId=n.contacts[0]?.id||""),console.warn(`[sync] ignored ${t} default mock contacts`)):i?n.contacts=n.contacts.map(r=>Q(r)):(n.contacts=[],n.currentContactId="")}else n.contacts=n.contacts.map(a=>Q(a));if(e.conversations&&typeof e.conversations=="object"?(n.conversations=ua(n.conversations,e.conversations),Ge()):te(),Array.isArray(e.moments)){const a=e.moments.map(E),o=Mt(a).map(E),i=Ai(n.moments);o.length?n.moments=pa(Mt(n.moments),o):Ti(a)?(i||(n.moments=[]),console.warn(`[sync] ignored ${t} default mock moments`)):i?n.moments=Mt(n.moments).map(E):n.moments=[]}Array.isArray(e.rpRooms)&&(n.rpRooms=_i(n.rpRooms||[],e.rpRooms||[],"room_id")),e.rpMessages&&typeof e.rpMessages=="object"&&(n.rpMessages=ua(n.rpMessages,e.rpMessages)),Array.isArray(e.actions)&&(n.actions=e.actions),e.globalSettings&&typeof e.globalSettings=="object"&&(n.globalSettings={...n.globalSettings,...e.globalSettings}),e.accountProfile&&typeof e.accountProfile=="object"&&(n.accountProfile=Ci(n.accountProfile,e.accountProfile)),B(),Tt()}}function Ei(){try{const e=localStorage.getItem(yt);if(!e)return;const t=JSON.parse(e);if(!t?.payload)return;ya(t.payload,{source:"local"});const a=dn(t.payload);St=z(a),z(t.payload)!==St&&localStorage.setItem(yt,JSON.stringify({client_updated_at:t.client_updated_at||new Date().toISOString(),payload:a}))}catch{}}function _e(e=600){if(Ye)return;const t=Xe();Ve({...t,pending:!0}),tn&&clearTimeout(tn),tn=window.setTimeout(()=>{wa()},e)}async function wa(){if(wt||Ye)return;const e=Xe();if(!e.pending)return;let t=null;try{t=JSON.parse(localStorage.getItem(yt)||"null")}catch{}if(!t?.payload){Ve({...e,pending:!1});return}const a=dn(t.payload);wt=!0;try{const o=await fetch(`${S}/api/sync/push`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({device_id:sn(),client_updated_at:t.client_updated_at||new Date().toISOString(),payload:a})});if(!o.ok)throw new Error(`HTTP ${o.status}`);const i=await o.json().catch(()=>({}));Ve({last_server_updated_at:i.server_updated_at||e.last_server_updated_at||"",pending:!1})}catch(o){console.warn("[sync] push failed",o),Ve({...e,pending:!0})}finally{wt=!1}}async function Sa(){if(wt)return;const e=Xe();if(e.pending&&(await wa(),Xe().pending))return;const t=new URLSearchParams({device_id:sn()});e.last_server_updated_at&&t.set("since",e.last_server_updated_at);try{const a=await fetch(`${S}/api/sync/pull?${t.toString()}`);if(!a.ok)return;const o=await a.json().catch(()=>({})),i=ha(n.contacts);if(!o?.has_update||!o?.payload||o?.is_self&&i){o?.server_updated_at&&Ve({...e,last_server_updated_at:o.server_updated_at,pending:e.pending});return}Ye=!0,ya(o.payload,{source:"remote"}),pe(),Ve({last_server_updated_at:o.server_updated_at||e.last_server_updated_at||"",pending:!1}),u()}catch(a){console.warn("[sync] pull failed",a)}finally{Ye=!1}}function Pi(e={}){const t=ge(e.agent_id||e.id);if(!t)return null;const a=String(e.display_name||e.name||t).trim()||t;return Q({id:t,agent_id:t,name:a,display_name:a,bio:String(e.description||e.subtitle||"").trim(),status:"在线",handle:String(e.display_handle||`@${t}`),roleTag:String(e.source||"agent"),avatar:String(e.avatar||"").trim(),pinned:!1,unread:0,lastMessage:"",lastTime:"",topics:[],messages:[]})}function $a(e={}){const t=ge(e.agent_id||e.id);if(!t)return null;const a=rt.find(r=>String(r.id||"").toLowerCase()===t),o=String(e.last_message_at||""),i=String(e.last_message||"").trim();return Q({id:t,agent_id:t,name:String(a?.name||e.display_name||e.name||t).trim()||t,display_name:String(a?.name||e.display_name||e.name||t).trim()||t,bio:"",status:"在线",handle:`@${t}`,roleTag:"recovered",avatar:"",pinned:!1,unread:0,lastMessage:i,lastTime:o?se(o,{fallback:""}):"",sessionId:String(e.session_id||""),messageCount:Number(e.message_count||0)||0,topics:[],messages:[]})}async function qi({silent:e=!0}={}){try{const t=await fetch(`${S}/api/agents?include_inactive=true`);if(!t.ok)throw new Error(`HTTP ${t.status}`);const a=await t.json().catch(()=>({})),o=(Array.isArray(a?.agents)?a.agents:[]).filter(r=>r?.is_active!==!1).map(Pi).filter(Boolean).filter(r=>!un(r));if(console.info("[agents] loaded",o.map(r=>({id:r.id,name:r.name,source:r.roleTag||""}))),!o.length)return;const i=z({contacts:n.contacts});n.contacts=_t(n.contacts,o),Ge(),(!n.currentContactId||!n.contacts.some(r=>r.id===n.currentContactId))&&(n.currentContactId=n.contacts[0]?.id||""),z({contacts:n.contacts})!==i&&(pe(),_e(100)),Ct(o),u()}catch(t){e||console.warn("[agents] load contacts failed",t)}}async function Li({silent:e=!0}={}){try{const t=await fetch(`${S}/api/murmur/message-agents?limit=1000`);if(t.status===404){await Di({silent:e});return}if(!t.ok)throw new Error(`HTTP ${t.status}`);const a=await t.json().catch(()=>({})),o=(Array.isArray(a?.agents)?a.agents:[]).map($a).filter(Boolean);if(console.info("[murmur] message agents loaded",o.map(r=>({id:r.id,lastMessage:r.lastMessage,count:r.messageCount||0}))),!o.length)return;const i=z({contacts:n.contacts});n.contacts=_t(n.contacts,o),Ge(),(!n.currentContactId||!n.contacts.some(r=>r.id===n.currentContactId))&&(n.currentContactId=n.contacts[0]?.id||""),z({contacts:n.contacts})!==i&&(pe(),_e(100)),Ct(o),u()}catch(t){e||console.warn("[murmur] load message agents failed",t)}}async function Di({silent:e=!0}={}){const t=Array.from(new Set([...rt.map(r=>ge(r.id)).filter(Boolean),...n.contacts.map(r=>ge(r.id)).filter(Boolean)])),a=[];for(const r of t)if(r)try{const s=new URLSearchParams({agent_id:r,limit:"1"}),c=await fetch(`${S}/api/murmur/messages?${s.toString()}`);if(!c.ok)continue;const d=await c.json().catch(()=>({})),p=Array.isArray(d?.messages)?d.messages:[];if(!p.length)continue;const m=p[p.length-1]||{};a.push($a({agent_id:r,last_message:m.content||"",last_message_at:m.created_at||"",message_count:p.length,session_id:m.session_id||""}))}catch(s){e||console.warn("[murmur] message probe failed",r,s)}const o=a.filter(Boolean);if(console.info("[murmur] message agents probed",o.map(r=>({id:r.id,lastMessage:r.lastMessage,count:r.messageCount||0}))),!o.length)return;const i=z({contacts:n.contacts});n.contacts=_t(n.contacts,o),Ge(),(!n.currentContactId||!n.contacts.some(r=>r.id===n.currentContactId))&&(n.currentContactId=n.contacts[0]?.id||""),z({contacts:n.contacts})!==i&&(pe(),_e(100)),Ct(o),u()}async function Oi(){await qi(),await Li(),await Ct(n.contacts),Co(120)}async function Ct(e=[]){const t=[...new Set((e||[]).map(a=>a?.id).filter(Boolean))];for(const a of t)if(!(n.historyLoadingContactIds[a]||n.historyLoadedContactIds[a])){n.historyLoadingContactIds[a]=!0;try{await We(a)&&(n.historyLoadedContactIds[a]=!0)}finally{delete n.historyLoadingContactIds[a]}}}function $(e=800){Ye||(nn&&clearTimeout(nn),nn=window.setTimeout(()=>{pe()&&_e(500)},e))}function P(){const e=new Date;return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`}function ln(e){const t=e?.settings?.modelProviderId||x("chat")?.providerId||"",a=J(t);if(!a?.baseUrl||!a?.apiKey)return{};const o=Ze(a.apiPath||a.api_path||"",{allowEmpty:!0});return{base_url:a.baseUrl,api_key:a.apiKey,...o?{api_path:o}:{}}}function pn(e){const t=e?.settings||{},a=Number(t.temperature);return Number.isFinite(a)?{temperature:a}:{}}function mn(e,t=""){let a="",o="";try{const s=JSON.parse(e),c=/^(thinking|reasoning|reason|thought|cot|inner_thought)$/i.test(t),d=/^(chat|message|content|text|assistant|reply|response|output)$/i.test(t);c||(a=s.content??s.text??s.delta??""),o=s.thinking??s.reasoning??s.reasoning_content??s.reasoningContent??""}catch{/^(thinking|reasoning|reason|thought|cot|inner_thought)$/i.test(t)?o=e:a=e}const i=/^tool_call$/i.test(t);let r=null;if(i)try{const s=JSON.parse(e);s.name&&(r={name:String(s.name),status:String(s.status||"done")})}catch{}return{text:we(a),thinking:we(o),toolCall:r}}async function xt(e){const t=String(e?.sessionId||"").trim();if(t){try{const r=await fetch(`${S}/api/sessions/${encodeURIComponent(t)}`);if(r.ok)return t;if(r.status!==404)throw new Error(`校验会话失败（HTTP ${r.status}）`)}catch(r){throw String(r?.message||"").includes("HTTP"),r}e.sessionId=""}const a=await fetch(`${S}/api/sessions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:String(e?.name||"新对话").trim()||"新对话",model:String(e?.settings?.model||n.globalSettings?.defaultModel||"echo").trim()||"echo",source_app:"yui_nook"})}),o=await a.json().catch(()=>({}));if(!a.ok)throw new Error(o.detail||`创建会话失败（HTTP ${a.status}）`);const i=String(o?.session?.id||"").trim();if(!i)throw new Error("创建会话失败：后端没有返回 session.id");return e.sessionId=i,$(120),i}async function fn(e,t,a,o="/api/chat"){let i=await fetch(`${S}${o}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify(t),...a?{signal:a}:{}});if(i.ok)return i;let r="";try{const s=await i.json();r=String(s?.detail||"").trim()}catch{}if(o==="/api/chat"&&i.status===404&&r.includes("会话不存在")){e.sessionId="";const s=await xt(e);if(t.session_id=s,i=await fetch(`${S}${o}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify(t),...a?{signal:a}:{}}),i.ok)return i}throw new Error(`HTTP ${i.status}`)}async function Ri(){const e=w()?.querySelector(".chat-input"),t=e?.value?.trim();if(!t||!n.currentRpRoomId)return;const a=h(n.currentContactId)||n.contacts[0],o=Qt();if(!a||!o)return;const i=!!a?.settings?.reasoning_visibility,r=`rp_u_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;kt(n.currentRpMessages,{id:r,client_message_id:r,role:"user",text:t,content:t,time:P(),timestamp:new Date().toISOString(),created_at:new Date().toISOString()}),e.value="";const s="rp_ai_"+Date.now();n.currentRpMessages.push({id:s,role:"ai",text:"",content:"",time:"",created_at:new Date().toISOString(),typing:!0}),n.currentRpRoomId&&(n.rpMessages[n.currentRpRoomId]=n.currentRpMessages.map(X)),$(120),u(),H();const c={room_id:n.currentRpRoomId,agent_id:o.agent_id||a.id,content:t,client_message_id:r,...a.persona?{persona:a.persona}:{},...a.settings.model?{model:a.settings.model}:{},...pn(a),...ln(a)},d=new AbortController;n.streamingAbortController=d,u();let p="";try{const m=await fn(a,c,d.signal,"/api/rp/chat"),f=()=>n.currentRpMessages.findIndex(k=>k.id===s);n.currentRpMessages[f()]={id:s,role:"ai",text:"",time:P(),typing:!1,streaming:!0},u();const b=m.body.getReader(),v=new TextDecoder;let I="",_="",T="";for(;;){const{done:k,value:A}=await b.read();if(k)break;I+=v.decode(A,{stream:!0});const N=I.split(`
`);I=N.pop()??"";for(const q of N){const R=q.trim();if(!R){T="";continue}if(R.startsWith("event:")){T=R.slice(6).trim();continue}if(!R.startsWith("data:"))continue;const de=R.slice(5).trim();if(de==="[DONE]")continue;const V=mn(de,T);let le=V.text;const he=Vt(V.thinking,p,_),Z=i?he:"";Z&&_.length<Rt&&(_=Bt(_,Z)),le&&(p+=le);const oe=f();oe!==-1&&(n.currentRpMessages[oe]={id:s,role:"ai",text:p,...i&&_?{thinking:_}:{},time:P(),typing:!1,streaming:!0},u(),H())}}const C=n.currentRpMessages.findIndex(k=>k.id===s);C!==-1&&p.trim()?n.currentRpMessages[C]={...n.currentRpMessages[C],text:p,content:p,...i&&_?{thinking:_}:{},streaming:!1,typing:!1,time:P(),created_at:new Date().toISOString()}:C!==-1&&n.currentRpMessages.splice(C,1),n.streamingAbortController=null,await mt(o.agent_id||a.id,{silent:!0}),n.currentRpRoomId&&(n.rpMessages[n.currentRpRoomId]=n.currentRpMessages.map(X)),$(120),u(),H()}catch(m){const f=m.name==="AbortError",b=n.currentRpMessages.findIndex(v=>v.id===s);b!==-1&&(f&&!p.trim()?n.currentRpMessages.splice(b,1):n.currentRpMessages[b]={id:s,role:"ai",text:m.name==="AbortError"?p:`连接失败：${m.message}`,content:m.name==="AbortError"?p:`连接失败：${m.message}`,time:P(),created_at:new Date().toISOString(),typing:!1}),n.streamingAbortController=null,n.currentRpRoomId&&(n.rpMessages[n.currentRpRoomId]=n.currentRpMessages.map(X)),$(120),u()}}function At(e=n.currentContactId){const t=h(e)||h(n.currentContactId);if(t){if(n.currentContactId=t.id,!Xt(t)){t.settings={...t.settings||{},ccEnabled:!1},n.toast="只有阿筝能切 Claude Code",u(),window.setTimeout(()=>{n.toast="",u()},1200);return}t.settings={...t.settings||{},ccEnabled:!t.settings?.ccEnabled},n.toast=t.settings.ccEnabled?"Claude Code 已接管这个窗口":"Claude Code 已关闭",$(120),u(),window.setTimeout(()=>{n.toast="",u()},1200)}}async function gn(){const e=w()?.querySelector(".chat-input"),t=e?.value?.trim();if(!t)return;const a=h(n.currentContactId);if(!a)return;Le();const o=`u_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;kt(a.messages,{id:o,client_message_id:o,role:"user",text:t,content:t,time:P(),created_at:new Date().toISOString()}),a.lastMessage=t,a.lastTime="刚刚",e.value="";const i="ai_"+Date.now();a.messages.push({id:i,role:"ai",text:"",content:"",time:"",created_at:new Date().toISOString(),typing:!0,source:"claude-code"}),te(),$(120),u(),H();const r=new AbortController;n.streamingAbortController=r,u();try{const s=await fetch(`${S}/api/claude-code/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversation_key:`yui:${a.id}`,agent_id:a.id,content:t,client_message_id:o,reset:!1}),signal:r.signal}),c=await s.json().catch(()=>({}));if(!s.ok)throw new Error(c.detail||`HTTP ${s.status}`);const d=String(c.reply||"").trim(),p=c.user_message&&typeof c.user_message=="object"?Je(c.user_message,a.id):null,m=c.assistant_message&&typeof c.assistant_message=="object"?{...Je(c.assistant_message,a.id),source:"claude-code",provider:"claude-code"}:null,f=a.messages.findIndex(v=>v.id===o);f!==-1&&p&&(a.messages[f]=j({...p,client_message_id:o}));const b=a.messages.findIndex(v=>v.id===i);b!==-1&&d?a.messages[b]={...m?j(m):{},id:m?.id||i,role:"ai",text:d,content:d,source:"claude-code",provider:"claude-code",time:m?.time||P(),created_at:m?.created_at||new Date().toISOString(),typing:!1}:b!==-1&&a.messages.splice(b,1),a.lastMessage=d||t,a.lastTime=P(),te(),$(120),u(),H()}catch(s){const c=s.name==="AbortError";c||console.error("[cc chat] error:",s);const d=a.messages.findIndex(p=>p.id===i);if(d!==-1){const p=c?"":`Claude Code 连接失败：${s.message}`;p?a.messages[d]={id:i,role:"ai",text:p,content:p,source:"claude-code",provider:"claude-code",time:P(),created_at:new Date().toISOString(),typing:!1}:a.messages.splice(d,1)}te(),$(120),u()}finally{n.streamingAbortController=null,u()}}async function hn(){const e=w()?.querySelector(".chat-input"),t=e?.value?.trim();if(!t)return;const a=h(n.currentContactId);if(!a)return;Le();const o=`u_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;kt(a.messages,{id:o,client_message_id:o,role:"user",text:t,content:t,time:P(),created_at:new Date().toISOString()}),a.lastMessage=t,a.lastTime="刚刚",e.value="";const i="ai_"+Date.now();a.messages.push({id:i,role:"ai",text:"",content:"",time:"",created_at:new Date().toISOString(),typing:!0,source:"codex"}),te(),$(120),u(),H();const r=new AbortController;n.streamingAbortController=r,u();try{const s=await fetch(`${S}/api/codex/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversation_key:`yui:${a.id}`,agent_id:a.id,content:t,client_message_id:o,reset:!1}),signal:r.signal}),c=await s.json().catch(()=>({}));if(!s.ok)throw new Error(c.detail||`HTTP ${s.status}`);const d=String(c.reply||"").trim(),p=c.user_message&&typeof c.user_message=="object"?Je(c.user_message,a.id):null,m=c.assistant_message&&typeof c.assistant_message=="object"?{...Je(c.assistant_message,a.id),source:"codex",provider:"codex"}:null,f=a.messages.findIndex(v=>v.id===o);f!==-1&&p&&(a.messages[f]=j({...p,client_message_id:o}));const b=a.messages.findIndex(v=>v.id===i);b!==-1&&d?a.messages[b]={...m?j(m):{},id:m?.id||i,role:"ai",text:d,content:d,source:"codex",provider:"codex",time:m?.time||P(),created_at:m?.created_at||new Date().toISOString(),typing:!1}:b!==-1&&a.messages.splice(b,1),a.lastMessage=d||t,a.lastTime=P(),te(),$(120),u(),H()}catch(s){const c=s.name==="AbortError";c||console.error("[codex chat] error:",s);const d=a.messages.findIndex(p=>p.id===i);if(d!==-1){const p=c?"":`Codex 连接失败：${s.message}`;p?a.messages[d]={id:i,role:"ai",text:p,content:p,source:"codex",provider:"codex",time:P(),created_at:new Date().toISOString(),typing:!1}:a.messages.splice(d,1)}te(),$(120),u()}finally{n.streamingAbortController=null,u()}}const ze={},Ia=1500;async function ka(e){const t=ze[e];if(!t||!t.texts.length)return;const a=t.texts.splice(0);t.timer&&(clearTimeout(t.timer),t.timer=null),t.listener&&(w()?.querySelector(".chat-input")?.removeEventListener("input",t.listener),t.listener=null),delete ze[e];const o=h(e);if(!o)return;const i=!!o?.settings?.reasoning_visibility;let r="";try{r=await xt(o)}catch{return}const s=a.join(`
`),c=`u_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,d="ai_"+Date.now();o.messages.push({id:d,role:"ai",text:"",content:"",time:"",created_at:new Date().toISOString(),typing:!0}),te(),$(120),u(),H();let p=0,m=!1,f=null;const b=()=>{const q=w()?.querySelector(`#thinking-${d}`);if(!q)return;q.textContent=zt(A),q.classList.add("open","thinking-active"),q.setAttribute("aria-hidden","false");const R=w()?.querySelector(`#cot-wrapper-${d}`);R&&R.removeAttribute("data-slow"),n.openThinkingIds[d]=!0},v=()=>{f===null&&(f=requestAnimationFrame(()=>{f=null,b()}))},I=()=>{f!==null&&(cancelAnimationFrame(f),f=null)},_=setInterval(()=>{if(!p)return;const q=w()?.querySelector(`#cot-wrapper-${d}`);q&&q.toggleAttribute("data-slow",Date.now()-p>8e3)},2e3),T={session_id:r,agent_id:o.id,content:s,client_message_id:c,...o.persona?{persona:o.persona}:{},...o.settings.model?{model:o.settings.model}:{},...pn(o),...ln(o)},C=new AbortController;n.streamingAbortController=C,u();let k="",A="",N=null;try{const q=await fn(o,T,C.signal),R=()=>o.messages.findIndex(Pe=>Pe.id===d);o.messages[R()]={id:d,role:"ai",text:"",content:"",time:P(),created_at:new Date().toISOString(),typing:!1,streaming:!0},u();const de=q.body.getReader(),V=new TextDecoder;let le="",he="";for(;;){const{done:Pe,value:Mn}=await de.read();if(Pe)break;le+=V.decode(Mn,{stream:!0});const be=le.split(`
`);le=be.pop()??"";let Ne=0;for(const je of be){const ve=je.trim();if(!ve){he="";continue}if(ve.startsWith("event:")){he=ve.slice(6).trim();continue}if(!ve.startsWith("data:"))continue;const qt=ve.slice(5).trim();if(qt==="[DONE]")continue;const qe=mn(qt,he);let ie=qe.text;const Fe=Vt(qe.thinking,k,A),Ue=i?Fe:"";if(Ue){A.length<Rt&&(A=Bt(A,Ue)),p=Date.now();const ne=R();ne!==-1&&(o.messages[ne]={id:d,role:"ai",text:k,thinking:A,time:P(),typing:!1,streaming:!0},m?v():(m=!0,n.openThinkingIds[d]=!0,u(),H()))}if(qe.toolCall){const ne=qe.toolCall;N||(N=[]);const Ua=N.find(Ka=>Ka.name===ne.name&&Ka.status!=="done");Ua?Ua.status=ne.status:N.push({name:ne.name,status:ne.status});const Cn=R();Cn!==-1&&(o.messages[Cn]={...o.messages[Cn],toolCalls:N.slice(),streaming:!0},u())}ie&&(k+=ie),Ne+=1,Ne>=32&&(Ne=0,v(),await qn())}}clearInterval(_),I(),n.streamingAbortController=null;const Z=R(),oe=k.trim();o.lastMessage=oe||"已处理",o.lastTime=P();const U=w()?.querySelector(`#thinking-${d}`);U&&U.classList.remove("thinking-active");const Ee=w()?.querySelector(`#cot-wrapper-${d}`);Ee&&Ee.removeAttribute("data-slow"),i&&A&&delete n.openThinkingIds[d];const it=Dn(oe);Z!==-1&&it.length>1?(o.messages.splice(Z,1),u(),H(),await Ln(180),await On(o,it,{startIndex:Z,thinking:i?A:"",toolCalls:N})):(Z!==-1&&oe?o.messages[Z]={id:d,role:"ai",text:oe,content:oe,...i&&A?{thinking:A}:{},...N?{toolCalls:N}:{},time:P(),created_at:new Date().toISOString(),typing:!1}:Z!==-1&&o.messages.splice(Z,1),te(),$(120),u(),H())}catch(q){clearInterval(_),I(),n.streamingAbortController=null;const R=q.name==="AbortError";R||console.error("[chat SSE] error:",q);const de=o.messages.findIndex(V=>V.id===d);if(de!==-1){const V=R?k.trim():`连接失败：${q.message}，请稍后再试。`;V?o.messages[de]={id:d,role:"ai",text:V,content:V,...i&&A?{thinking:A}:{},time:P(),created_at:new Date().toISOString(),typing:!1}:o.messages.splice(de,1)}R&&k&&(o.lastMessage=k,o.lastTime=P()),te(),$(120),u()}}async function bn(){const e=w()?.querySelector(".chat-input"),t=e?.value?.trim();if(!t)return;const a=h(n.currentContactId);if(!a)return;Le();let o="";try{o=await xt(a)}catch{n.toast="无法创建会话，请稍后再试。",u(),window.setTimeout(()=>{n.toast="",u()},1500);return}const i=`u_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;kt(a.messages,{id:i,client_message_id:i,session_id:o,agent_id:a.id,role:"user",text:t,content:t,time:P(),created_at:new Date().toISOString()}),a.lastMessage=t,a.lastTime="刚刚",e.value="",te(),$(120),u(),H(),ze[a.id]||(ze[a.id]={texts:[],timer:null,listener:null});const r=ze[a.id];r.texts.push(t),r.timer&&clearTimeout(r.timer),r.listener||(r.listener=()=>{const s=ze[a.id];s?.texts.length&&(clearTimeout(s.timer),s.timer=setTimeout(()=>ka(a.id),Ia))},e.addEventListener("input",r.listener)),r.timer=setTimeout(()=>ka(a.id),Ia)}async function Vi(e){const t=h(n.currentContactId);if(!t)return;Le();const a=!!t?.settings?.reasoning_visibility,o=t.messages.findIndex(d=>d.id===e);if(o===-1||t.messages[o].role!=="ai")return;let i="";try{i=await xt(t)}catch(d){console.error("[session] create failed:",d),n.toast=`无法创建会话：${d.message}`,u(),window.setTimeout(()=>{n.toast="",u()},1500);return}t.messages[o]={...t.messages[o],typing:!0,text:"",streaming:!1},u();const r=[...t.messages].reverse().find(d=>d.role==="user");if(!r)return;const s={session_id:i,agent_id:t.id,content:r.text,...t.persona?{persona:t.persona}:{},...t.settings.model?{model:t.settings.model}:{},...pn(t),...ln(t)},c=new AbortController;n.streamingAbortController=c;try{const d=await fn(t,s,c.signal);t.messages[o]={...t.messages[o],typing:!1,text:"",streaming:!0},u();const p=d.body.getReader(),m=new TextDecoder;let f="",b="",v="",I=null;const _=e;let T="",C=0,k=!1,A=null;const N=()=>{const U=w()?.querySelector(`#thinking-${_}`);if(!U)return;U.textContent=zt(v),U.classList.add("open","thinking-active"),U.setAttribute("aria-hidden","false");const Ee=w()?.querySelector(`#cot-wrapper-${_}`);Ee&&Ee.removeAttribute("data-slow"),n.openThinkingIds[_]=!0},q=()=>{A===null&&(A=requestAnimationFrame(()=>{A=null,N()}))},R=()=>{A!==null&&(cancelAnimationFrame(A),A=null)},de=setInterval(()=>{if(!C)return;const U=w()?.querySelector(`#cot-wrapper-${_}`);U&&U.toggleAttribute("data-slow",Date.now()-C>8e3)},2e3);for(;;){const{done:U,value:Ee}=await p.read();if(U)break;f+=m.decode(Ee,{stream:!0});const it=f.split(`
`);f=it.pop()??"";let Pe=0;for(const Mn of it){const be=Mn.trim();if(!be){T="";continue}if(be.startsWith("event:")){T=be.slice(6).trim();continue}if(!be.startsWith("data:"))continue;const Ne=be.slice(5).trim();if(Ne==="[DONE]")continue;const je=mn(Ne,T);let ve=je.text;const qt=Vt(je.thinking,b,v),qe=a?qt:"";if(qe){v.length<Rt&&(v=Bt(v,qe)),C=Date.now();const ie=t.messages.findIndex(Fe=>Fe.id===_);ie!==-1&&(t.messages[ie]={...t.messages[ie],thinking:v,streaming:!0},k?q():(k=!0,n.openThinkingIds[_]=!0,u()))}if(je.toolCall){const ie=je.toolCall;I||(I=[]);const Fe=I.find(ne=>ne.name===ie.name&&ne.status!=="done");Fe?Fe.status=ie.status:I.push({name:ie.name,status:ie.status});const Ue=t.messages.findIndex(ne=>ne.id===_);Ue!==-1&&(t.messages[Ue]={...t.messages[Ue],toolCalls:I.slice(),streaming:!0},u())}ve&&(b+=ve),Pe+=1,Pe>=32&&(Pe=0,q(),await qn())}}clearInterval(de),R(),n.streamingAbortController=null;const V=t.messages.findIndex(U=>U.id===_),le=b.trim(),he=w()?.querySelector(`#thinking-${_}`);he&&he.classList.remove("thinking-active");const Z=w()?.querySelector(`#cot-wrapper-${_}`);Z&&Z.removeAttribute("data-slow"),a&&v&&delete n.openThinkingIds[_];const oe=Dn(le);V!==-1&&oe.length>1?(t.messages.splice(V,1),u(),await Ln(180),await On(t,oe,{startIndex:V,thinking:a?v:"",toolCalls:I})):(V!==-1&&le?t.messages[V]={...t.messages[V],text:le,...a&&v?{thinking:v}:{},...I?{toolCalls:I}:{},streaming:!1}:V!==-1&&t.messages.splice(V,1),u())}catch(d){clearInterval(_rerollSlowTimer),_cancelRerollFlush(),n.streamingAbortController=null;const p=d.name==="AbortError";p||console.error("[reroll SSE] error:",d);const m=t.messages.findIndex(f=>f.id===rerollId);if(m!==-1){const f=p?fullText.trim():`重试失败：${d.message}`;f?t.messages[m]={...t.messages[m],text:f,...fullThinking?{thinking:fullThinking}:{},...fullToolCalls?{toolCalls:fullToolCalls}:{},streaming:!1}:t.messages.splice(m,1)}u()}}function H(){requestAnimationFrame(()=>{const e=w()?.querySelector(".messages-panel");e&&(e.scrollTop=e.scrollHeight)})}function Bi(){const e=h(n.currentContactId)||n.contacts[0]||{},t=n.currentView==="room"?Nt(e).map(Ao).join(""):"";return`
      <div class="attach-panel glass-frost">
        <div class="attach-grid">
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
        ${t?`<div class="action-scroll attach-action-scroll">${t}</div>`:""}
      </div>
    `}const _a=window.openPage;typeof _a=="function"&&(window.openPage=function(t,a){_a(t,a),t==="page-chat"&&Nn()});const zi=[{id:"openai",name:"OpenAI",enabled:!0,baseUrl:"https://api.openai.com/v1",apiPath:"",apiKey:"",models:["gpt-5.4","gpt-5.4-mini","gpt-4.1-mini"],defaultModel:"gpt-5.4"},{id:"openrouter",name:"OpenRouter",enabled:!0,baseUrl:"https://openrouter.ai/api/v1",apiPath:"",apiKey:"",models:["openai/gpt-5","anthropic/claude-sonnet-4.5","anthropic/claude-opus-4.1","anthropic/claude-3.7-sonnet"],defaultModel:"openai/gpt-5"},{id:"gemini",name:"Gemini",enabled:!0,baseUrl:"https://generativelanguage.googleapis.com/v1beta/openai",apiPath:"",apiKey:"",models:["gemini-2.5-pro","gemini-2.5-flash"],defaultModel:"gemini-2.5-pro"},{id:"deepseek",name:"DeepSeek",enabled:!1,baseUrl:"https://api.deepseek.com/v1",apiPath:"",apiKey:"",models:["deepseek-chat","deepseek-reasoner"],defaultModel:"deepseek-chat"},{id:"qwen",name:"阿里云千问",enabled:!1,baseUrl:"https://dashscope.aliyuncs.com/compatible-mode/v1",apiPath:"",apiKey:"",models:["qwen-max","qwen-plus","qwen-turbo"],defaultModel:"qwen-max"},{id:"zhipu",name:"智谱",enabled:!1,baseUrl:"https://open.bigmodel.cn/api/paas/v4",apiPath:"",apiKey:"",models:["glm-4.5","glm-4-air"],defaultModel:"glm-4.5"},{id:"siliconflow",name:"SiliconFlow",enabled:!1,baseUrl:"https://api.siliconflow.cn/v1",apiPath:"",apiKey:"",models:["deepseek-ai/DeepSeek-V3","deepseek-ai/DeepSeek-R1","Qwen/Qwen2.5-72B-Instruct"],defaultModel:"deepseek-ai/DeepSeek-V3"}],Ma={openai:["gpt-5.4","gpt-5.4-mini","gpt-4.1","gpt-4.1-mini","o4-mini"],openrouter:["openai/gpt-5","openai/gpt-4.1","anthropic/claude-sonnet-4.5","anthropic/claude-opus-4.1","anthropic/claude-3.7-sonnet","anthropic/claude-3.5-sonnet","anthropic/claude-3.5-haiku","google/gemini-2.5-pro","google/gemini-2.5-flash","deepseek/deepseek-chat","deepseek/deepseek-r1","qwen/qwen-max"],aggregate:["openai/gpt-5","gpt-5","gpt-4.1","anthropic/claude-sonnet-4.5","anthropic/claude-opus-4.1","anthropic/claude-3.7-sonnet","claude-sonnet-4-5","claude-opus-4-1","claude-3-7-sonnet-latest","google/gemini-2.5-pro","google/gemini-2.5-flash","deepseek/deepseek-chat","qwen/qwen-max"],anthropic:["claude-opus-4-5","claude-sonnet-4-5","claude-haiku-4-5","claude-opus-4-1","claude-sonnet-4-0","claude-3-7-sonnet-latest","claude-3-5-haiku-latest"],gemini:["gemini-2.5-pro","gemini-2.5-flash","gemini-2.0-flash","gemini-1.5-pro"],deepseek:["deepseek-chat","deepseek-reasoner"],zhipu:["glm-4.5","glm-4-air","glm-4-flash"],siliconflow:["deepseek-ai/DeepSeek-V3","deepseek-ai/DeepSeek-R1","Qwen/Qwen2.5-72B-Instruct","Qwen/Qwen2.5-32B-Instruct","THUDM/GLM-4-9B-0414"]},vn=new Set(["aiInterface","defaultModels","modelSlot","providerCatalog","providerEditor","promptEditor","themeSettings","accountSettings","memoryService","backendSync","exportSettings","mcpLibrary"]),Hi=ut,Ni=Ft,ji=Ut,Ca=en;n.viewStack=n.viewStack||[],n.activeModelSlot=n.activeModelSlot||"chat",n.activeModelSlotContext=n.activeModelSlotContext||"global",n.activeModelProviderId=n.activeModelProviderId||"",n.providerDraftId=n.providerDraftId||null,n.providerAdvancedOpen=!!n.providerAdvancedOpen,n.providerEditorDraft=n.providerEditorDraft||null,n.providerModelMenuOpen=!!n.providerModelMenuOpen,n.providerModelSyncingId=n.providerModelSyncingId||"",n.providerModelSyncStatus=n.providerModelSyncStatus&&typeof n.providerModelSyncStatus=="object"?n.providerModelSyncStatus:{},n.providerKeyVisible=!!n.providerKeyVisible,n.modelSlotMenuOpen=!!n.modelSlotMenuOpen,n.providerSearch=n.providerSearch||"",n.activePromptSlot=n.activePromptSlot||"summary";function F(e){const t=String(e||"").trim();return t?t==="ocr"?"vision":t==="title"?"summary":t:"chat"}n.aiSettingsSaving=!1,n.memoryServiceEntries=Array.isArray(n.memoryServiceEntries)?n.memoryServiceEntries:[],n.memoryServiceLoading=!!n.memoryServiceLoading,n.slotVendorGroupOpen=n.slotVendorGroupOpen&&typeof n.slotVendorGroupOpen=="object"?n.slotVendorGroupOpen:{},n.providerModelVendorOpen=n.providerModelVendorOpen&&typeof n.providerModelVendorOpen=="object"?n.providerModelVendorOpen:{};function Fi(){return"/chat/completions"}function Ze(e,{allowEmpty:t=!1}={}){const a=String(e||"").trim();return a?a.startsWith("/")?a:`/${a}`:t?"":Fi()}function Ui(e={}){return Ze(e.apiPath||e.api_path||"",{allowEmpty:!1})}function et(e={}){const t=Ze(e.apiPath||e.api_path||"",{allowEmpty:!0});return{...e,baseUrl:e.baseUrl||e.base_url||"",apiKey:e.apiKey||e.api_key||"",apiPath:t,api_path:t,models:G(e.models),defaultModel:L(e.defaultModel||e.default_model||"")}}function L(e){if(typeof e!="string")return"";const t=e.trim().replace(/\s+/g," ");return!t||t.length>180||/[<>]/.test(t)||/<\/?[a-z][\s\S]*>/i.test(t)||/<!doctype|<html|<\/div|<\/body/i.test(t)||/[\u0000-\u001f\u007f]/.test(t)?"":t}function G(e){const t=Array.isArray(e)?e:[],a=new Set,o=[];return t.forEach(i=>{const r=typeof i=="string"?i:i&&typeof i=="object"?i.id||i.name||i.model||i.slug:"",s=L(r),c=s.toLowerCase();s&&!a.has(c)&&(a.add(c),o.push(s))}),o}function yn(e={}){const t=String(e.id||"").toLowerCase(),a=String(e.name||"").toLowerCase(),o=String(e.baseUrl||e.base_url||"").toLowerCase();return t.includes("openrouter")||a.includes("openrouter")||o.includes("openrouter.ai")?"openrouter":t.includes("jiushi")||a.includes("玖时")||o.includes("jiushi.xin")?"aggregate":t.includes("silicon")||a.includes("silicon")||o.includes("siliconflow")?"siliconflow":t.includes("deepseek")||a.includes("deepseek")||o.includes("deepseek")?"deepseek":t.includes("anthropic")||t.includes("claude")||a.includes("anthropic")||a.includes("claude")||o.includes("anthropic.com")?"anthropic":t.includes("gemini")||a.includes("gemini")||o.includes("generativelanguage")?"gemini":t.includes("zhipu")||a.includes("智谱")||o.includes("bigmodel")?"zhipu":t.includes("openai")||a.includes("openai")||o.includes("openai.com")?"openai":t||"custom"}function Ki(e={}){const t=yn(e);if(t==="aggregate"||t==="openrouter")return!0;if(["openai","anthropic","gemini","deepseek","zhipu","siliconflow"].includes(t))return!1;const a=String(e.baseUrl||e.base_url||"").toLowerCase();return a?!/(openai\.com|anthropic\.com|generativelanguage|deepseek\.com|bigmodel\.cn|siliconflow\.cn)/.test(a):!1}function wn(e={}){const t=yn(e),a=Ma[t]||[],o=Ki(e)?Ma.aggregate:[];return G([...a,...o])}function Qi(e=""){const t=String(e||"").trim();if(!t)return"";const a=t.slice(-4);return`${t.startsWith("sk-")?"sk-":""}••••${a}`}function Me(e,t,a){const o=String(e||n.providerDraftId||"current");n.providerModelSyncStatus[o]={type:t,message:a}}function Yi(e,t="模型"){const a=L(e);if(!a)throw new Error(`${t} 不是合法模型 ID，不能包含 HTML、控制字符或过长内容`);return a}function Sn(e={}){const t={...e||{}};return t.model&&(t.model=L(t.model)),t.providerId&&(t.providerId=String(t.providerId||"").trim()),t}function Ce(){return{providers:zi.map(e=>et({...e,models:[...e.models]})),defaultModels:{chat:{providerId:"openai",model:"gpt-5.4",useChatModel:!1},summary:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},vision:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},translate:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},consciousness:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},voice:{provider:"",service_url:"",base_url:"",voice_id:"",speaker:"",emotion:"",speed:1,format:""}},defaultPrompts:{chat:"Respond naturally, stay consistent with the current role and context, and keep the tone warm and clear.",summary:"Write a concise conversation summary with key facts, action items, and follow-ups.",translate:"Translate the content accurately while preserving tone and formatting when possible.",vision:"Extract visible text from the image and explain key visual information clearly.",consciousness:"Review recent context, infer useful next-step thoughts, and keep the result concise and actionable."},mcpLibrary:Ya()}}function B(){if(!n.globalSettings.aiSettings)n.globalSettings.aiSettings=Ce();else{const e=n.globalSettings.aiSettings;e.defaultModels=e.defaultModels||{},e.defaultPrompts=e.defaultPrompts||{},e.providers=Array.isArray(e.providers)?e.providers:[];const t=new Map(e.providers.map(a=>[a.id,et(a)]));Ce().providers.forEach(a=>{t.has(a.id)||t.set(a.id,a)}),e.providers=[...t.values()],e.defaultModels.ocr&&!e.defaultModels.vision&&(e.defaultModels.vision={...e.defaultModels.ocr}),e.defaultPrompts.ocr&&!e.defaultPrompts.vision&&(e.defaultPrompts.vision=e.defaultPrompts.ocr),delete e.defaultModels.ocr,delete e.defaultPrompts.ocr,delete e.defaultModels.title,delete e.defaultPrompts.title,Object.entries(Ce().defaultModels).forEach(([a,o])=>{e.defaultModels[a]||(e.defaultModels[a]={...o}),a!=="voice"&&(e.defaultModels[a]=Sn(e.defaultModels[a]))}),Object.entries(Ce().defaultPrompts).forEach(([a,o])=>{typeof e.defaultPrompts[a]!="string"&&(e.defaultPrompts[a]=o)})}return n.globalSettings.aiSettings}function Xi(e={}){const t=Ce(),a={...e||{}};a.defaultModels?.ocr&&!a.defaultModels?.vision&&(a.defaultModels={...a.defaultModels,vision:a.defaultModels.ocr}),a.defaultPrompts?.ocr&&!a.defaultPrompts?.vision&&(a.defaultPrompts={...a.defaultPrompts,vision:a.defaultPrompts.ocr});const o={providers:t.providers,defaultModels:{...t.defaultModels},defaultPrompts:{...t.defaultPrompts},mcpLibrary:{...t.mcpLibrary,tools:[...t.mcpLibrary?.tools||[]]}};if(Array.isArray(a.providers)&&a.providers.length){const i=new Map(t.providers.map(r=>[r.id,r]));a.providers.forEach(r=>{const s=et(r);i.set(s.id,{...i.get(s.id),...s,models:Array.isArray(s.models)&&s.models.length?s.models:i.get(s.id)?.models||[]})}),o.providers=[...i.values()]}a.defaultModels&&Object.keys(o.defaultModels).forEach(i=>{if(a.defaultModels[i]){const r={...o.defaultModels[i],...a.defaultModels[i]};o.defaultModels[i]=i==="voice"?r:Sn(r)}}),a.defaultPrompts&&Object.keys(o.defaultPrompts).forEach(i=>{typeof a.defaultPrompts[i]=="string"&&(o.defaultPrompts[i]=a.defaultPrompts[i])}),a.mcpLibrary&&Array.isArray(a.mcpLibrary.tools)&&(o.mcpLibrary={...o.mcpLibrary,...a.mcpLibrary,tools:a.mcpLibrary.tools.map(fe)}),n.globalSettings.aiSettings=o,typeof a.consciousnessLoop=="boolean"&&(n.globalSettings.consciousnessLoop=a.consciousnessLoop),Tt()}function Tt(){const e=B(),t=e.defaultModels.chat,a=e.providers.find(o=>o.id===t.providerId);n.globalSettings.defaultModel=L(t.model)||Ce().defaultModels.chat.model,n.globalSettings.provider=a?.name||"OpenAI"}function J(e){return B().providers.find(t=>t.id===e)}function $n(e=n.providerDraftId){const t=et(J(e)||{id:e||`custom_${Date.now()}`,name:"",enabled:!0,baseUrl:"",apiPath:"",apiKey:"",models:[],defaultModel:""}),a=G(t.models),o=G([...a,...wn(t)]).map(tt);return{...t,models:a,_allModels:o,_selectedModelIds:new Set(a),_apiKeyDirty:!1}}function O(){return(!n.providerEditorDraft||n.providerEditorDraft.id!==n.providerDraftId)&&(n.providerEditorDraft=$n()),n.providerEditorDraft}function xa(e="",t=[]){const a=String(e||"").trim().toLowerCase(),o=G(t);return a?o.filter(i=>String(i||"").toLowerCase().includes(a)):o}function Aa(e){const t=String(e||"").toLowerCase();return/deepseek/.test(t)?"DeepSeek":/\bglm\b|chatglm/.test(t)?"GLM":/\bqwen\b|qwq/.test(t)?"Qwen":/\bgpt[-\d]|^gpt|^o[134][-\d]|text-davinci|text-curie/.test(t)?"OpenAI":/claude/.test(t)?"Anthropic":/gemini|gemma/.test(t)?"Google":/\bllama\b|meta-llama/.test(t)?"Meta":/mistral|mixtral|codestral/.test(t)?"Mistral":/\byi[-/_]/.test(t)?"01.AI":/moonshot|kimi/.test(t)?"Moonshot":/hunyuan/.test(t)?"Hunyuan":/ernie|wenxin/.test(t)?"ERNIE":/doubao/.test(t)?"Doubao":/baichuan/.test(t)?"Baichuan":/spark/.test(t)?"Spark":/internlm/.test(t)?"InternLM":"Other"}function Ta(e){const t=String(e||"").toLowerCase(),a=["chat","text"];return/vl\b|vision|visual|\bvision\b|-v\d|\bimg\b/.test(t)&&a.push("vision"),/reason|r1\b|think\b|cot\b/.test(t)&&a.push("reasoning"),/image|draw|flux|paint|artist|diffusion/.test(t)&&a.push("image"),a.push("tools"),a}function tt(e){const t=String(e||"").trim();return{id:t,name:t,vendor:Aa(t),capabilities:Ta(t)}}const Gi={chat:"瀵硅瘽",text:"鏂囨湰",reasoning:"鎺ㄧ悊",tools:"宸ュ叿璋冪敤",vision:"瑙嗚",image:"鐢熷浘"},Ji=["reasoning","tools","vision","image"],Wi={reasoning:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M5 .5A3 3 0 0 0 2.8 5.9l.2.3V8h4V6.2l.2-.3A3 3 0 0 0 5 .5zm-1.2 8h2.4v.5c0 .28-.22.5-.5.5H4.3a.5.5 0 0 1-.5-.5V8.5z"/></svg>',tools:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M7.5 1a2 2 0 0 0-1.86 2.73L1.2 8.16a.6.6 0 0 0 .84.84l4.43-4.44A2 2 0 1 0 7.5 1zm0 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>',vision:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5 2C2.5 2 .8 5 .8 5S2.5 8 5 8s4.2-3 4.2-3S7.5 2 5 2zm0 4.5A1.5 1.5 0 1 1 5 3.5a1.5 1.5 0 0 1 0 3z"/></svg>',image:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M1.5 1A.5.5 0 0 0 1 1.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-7A.5.5 0 0 0 8.5 1h-7zM2 8l2-2.5 1.3 1.7 1.7-2.2L9 8H2zm.8-4.3a.7.7 0 1 0 1.4 0 .7.7 0 0 0-1.4 0z"/></svg>'};function Zi(e){return(Array.isArray(e?.capabilities)?e.capabilities:Ta(e?.name||"")).filter(a=>Ji.includes(a)).map(a=>`<span class="model-cap-badge cap-${a}" title="${Gi[a]||a}">${Wi[a]||a}</span>`).join("")}function Ea(e="",t=[]){const a=String(e||"").trim();return!Array.isArray(t)||!t.length?"还没有已同步模型，仍可手动输入并保存。":a?t.some(i=>String(i).toLowerCase()===a.toLowerCase())?"已匹配到已同步列表中的模型。":"当前模型不在已同步列表中，可继续手动保存。":`已同步 ${t.length} 个模型，可搜索或展开列表选择。`}function In(e="",t=[]){const a=String(e||"").trim();return!Array.isArray(t)||!t.length?"当前供应商还没有同步模型，可切换供应商或先同步。":a?t.some(i=>String(i).toLowerCase()===a.toLowerCase())?"已匹配到当前供应商模型。":"当前输入不在同步列表中。":`已同步 ${t.length} 个模型，可搜索或展开列表选择。`}function xe(){const e=O(),t=document.getElementById("provider-default-model-input"),a=document.getElementById("provider-default-model-menu"),o=document.getElementById("provider-default-model-hint");if(!a||!o)return;const i=t?.value||e.defaultModel||"",r=G([...Array.isArray(e.models)?e.models:[],...Array.isArray(e._allModels)?e._allModels.map(c=>c?.id||c?.name||""):[]]),s=xa(i,r);if(o.textContent=Ea(i,r),!n.providerModelMenuOpen){a.innerHTML="",a.classList.remove("open");return}a.classList.add("open"),a.innerHTML=s.length?s.map((c,d)=>`
          <button class="provider-model-option ${String(c).toLowerCase()===String(i).trim().toLowerCase()?"active":""}" data-action="pick-provider-default-model" data-model-index="${d}" type="button">
            <span>${l(c)}</span>
            ${String(c).toLowerCase()===String(i).trim().toLowerCase()?"<em>已选</em>":""}
          </button>
        `).join(""):'<div class="provider-model-empty">没有获取到模型，仍可手动输入保存。</div>'}function x(e){return B().defaultModels[F(e)]}function er(){const e=n.activeModelSlot,t=n.activeModelSlotContext==="contact",a=h(n.currentContactId)||n.contacts[0],o=t?{providerId:a?.settings?.modelProviderId||n.activeModelProviderId||x("chat")?.providerId||"openai",model:e==="consciousness"?a?.settings?.loopModel||"":a?.settings?.model||""}:Et(e),i=J(o?.providerId)||J(x("chat")?.providerId);return{slot:o,provider:i,models:i?.models||[]}}function nt(){const e=document.getElementById("model-slot-menu"),t=document.getElementById("model-slot-hint"),a=document.getElementById("model-slot-input");if(!e||!t)return;const{slot:o,models:i}=er(),r=a?.value||o?.model||"";t.textContent=In(r,G(i)),e.innerHTML="",e.classList.remove("open")}function Et(e){return x(F(e))}function He(e){const t=F(e);return{chat:"聊天模型",summary:"摘要模型",vision:"Vision 模型",translate:"翻译模型",consciousness:"意识循环模型",voice:"语音模型"}[t]||t}function Pt(e){const t=F(e);return{chat:"全局默认使用的聊天模型。",summary:"用于生成对话摘要，推荐选择便宜且稳定的模型。",vision:"用于识图、OCR 与截图分析的统一入口。",translate:"用于翻译消息内容，推荐选择速度快的模型。",consciousness:"用于意识循环、主动思考与相关后台能力。",voice:"用于文本转语音，读取语音服务地址与 voice ID。"}[t]||""}function Pa(e){const t=F(e),a=Et(t);if(t==="voice"){if(!a)return"未设置";const i=a.provider||"语音服务",r=a.voice_id||a.voiceId||"未设置";return`${i} / ${r}`}const o=J(a?.providerId);return a?`${o?.name||"未设置"} / ${a.model||"未设置"}`:"未设置"}function tr(e){return B().defaultPrompts?.[F(e)]||""}function nr(e){const t=F(e);return{chat:g("comment"),summary:g("file"),vision:g("search"),translate:g("chatArrow"),consciousness:g("history"),voice:g("mic")}[t]||g("file")}function ar(e){const t=F(e);return t!=="chat"&&t!=="voice"}function or(e){return`
      <article class="default-model-card">
        <div class="default-model-head">
          <div class="default-model-icon">${nr(e)}</div>
          <div class="default-model-copy">
            <strong>${l(He(e))}</strong>
            <p>${l(Pt(e))}</p>
          </div>
          ${ar(e)?`<button class="model-gear-btn" data-action="open-prompt-editor" data-slot="${e}" aria-label="提示词设置">${g("settings")}</button>`:'<span class="header-spacer"></span>'}
        </div>
        <button class="model-value-pill" data-action="open-model-slot" data-slot="${e}">
          <span class="model-value-badge">使</span>
          <span>${l(Pa(e))}</span>
        </button>
      </article>
    `}function ir(){const e=F(n.activePromptSlot),t=tr(e);return`
      <section class="settings-page page-block ai-settings-page ai-prompt-page">
        <div class="settings-group glass-frost ai-panel ai-form-group">
          <h3>${l(He(e))} 提示词</h3>
          <p class="section-eyebrow">用于定义这个能力位的默认提示词模板，后续接入对应后端任务时会直接使用这里的内容。</p>
          <textarea id="slot-prompt-input" class="ai-textarea ai-prompt-textarea" placeholder="在这里输入默认提示词">${l(t)}</textarea>
          <p class="section-eyebrow">变量位后续可以继续扩展，目前先支持按能力位单独保存。</p>
        </div>
        <div class="settings-group glass-frost ai-panel ai-prompt-actions">
          <button class="ghost-action prompt-reset-btn" data-action="reset-slot-prompt" data-slot="${e}">重置为默认</button>
          <button class="bottom-tab active prompt-save-btn" data-action="save-slot-prompt" data-slot="${e}">保存</button>
        </div>
      </section>
    `}function rr(){const e=[{id:"奶油粉",key:"rose",desc:"柔和粉白"},{id:"云雾灰",key:"mist",desc:"冷淡浅灰"},{id:"奶油杏",key:"cream",desc:"暖调米白"}],t=[{id:"windowsill",key:"windowsill",name:"窗台",desc:"鼠尾草·陶土·亚麻 · 冷静工具感"},{id:"tape",key:"tape",name:"磁带",desc:"磨砂玻璃·钓色·等宽字 · 软件诚实"}],a=n.globalSettings.theme,o=An.includes(a);return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>全局配色</h3>
          <p class="section-eyebrow">首页、列表、设置页的底色调。</p>
          <div class="theme-choice-list">
            ${e.map(i=>`
              <button class="theme-choice-item ${!o&&(a===i.id||a===i.key)?"active":""}" data-action="pick-theme-mode" data-theme="${i.id}">
                <span class="theme-choice-copy">
                  <strong>${l(i.id)}</strong>
                  <em>${l(i.desc)}</em>
                </span>
                <span class="theme-choice-check">${!o&&(a===i.id||a===i.key)?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>聊天完整主题</h3>
          <p class="section-eyebrow">覆盖整个聊天界面，包含气泡、输入框、导航栏。</p>
          <div class="theme-choice-list">
            ${t.map(i=>`
              <button class="theme-choice-item ${a===i.id?"active":""}" data-action="pick-theme-mode" data-theme="${i.id}">
                <span class="theme-choice-copy">
                  <strong>${l(i.name)}</strong>
                  <em>${l(i.desc)}</em>
                </span>
                <span class="theme-choice-check">${a===i.id?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `}function sr(){const e=n.accountProfile||{};return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>我的账号</h3>
          ${M("头像","更换头像","open-account-avatar")}
          ${M("昵称",e.nickname||"小酒","open-account-nickname")}
          ${M("个性签名",e.signature||"管理个人资料与基础偏好","open-account-signature")}
          <input id="account-avatar-file" class="moment-image-input" type="file" accept="image/*" />
        </div>
      </section>
    `}function cr(e){const t=Math.max(0,Math.min(100,Number(e)||0)),a=t>60?"#c9908a":t>30?"#c8a07a":"#b0b0b8";return`<span style="display:inline-flex;align-items:center;gap:4px;font-size:10px;color:${a};">
          <span style="display:inline-block;width:${Math.round(t*.36)}px;max-width:36px;min-width:2px;height:3px;border-radius:2px;background:${a};"></span>
          ${t>0?`热度 ${t}`:""}
        </span>`}function ur(){const e=h(n.currentContactId)||n.contacts[0],t=Array.isArray(n.memoryServiceEntries)?n.memoryServiceEntries:[],a=Array.isArray(n.memoryCandidates)?n.memoryCandidates:[],o=n.memoryServiceSort||"updated_at",i=[{key:"updated_at",label:"最新"},{key:"importance",label:"最重要"},{key:"temperature",label:"有温度"}];return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>记忆服务</h3>
          <p class="section-eyebrow">当前联系人：${l(e?.name||"未命名")}。这里直接读写后端 memories，不再以本地假数据为准。</p>
          <div class="ai-inline-actions" style="margin-top:10px;">
            <button class="ghost-action" data-action="memory-service-refresh">刷新</button>
            <button class="ghost-action" data-action="memory-service-create">新建记忆</button>
          </div>
          <div class="ai-inline-actions" style="margin-top:8px;">
            ${i.map(r=>`<button class="ghost-action${o===r.key?" active":""}" data-action="memory-service-sort" data-sort="${r.key}">${r.label}</button>`).join("")}
          </div>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>记忆列表</h3>
          ${n.memoryServiceLoading?'<p class="section-eyebrow">正在加载…</p>':""}
          ${!n.memoryServiceLoading&&!t.length?'<p class="section-eyebrow">这个角色还没有记忆。</p>':""}
          ${t.map(r=>{const s=r.compressed_content||r.raw_content||r.content||"未命名记忆",c=r.importance??3,d=r.temperature??0,p="★".repeat(c)+"☆".repeat(5-c);return`
            <div class="theme-choice-item active" style="cursor:default; display:block;">
              <div class="theme-choice-copy" style="display:block;">
                <strong>${l(s)}</strong>
                <em style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:3px;">
                  <span>${l(r.category||"")}</span>
                  <span style="color:#c9908a;">${p}</span>
                  ${cr(d)}
                </em>
                ${r.expires_at?`<em>过期：${l(String(r.expires_at))}</em>`:""}
              </div>
              <div class="ai-inline-actions" style="margin-top:10px;">
                <button class="ghost-action" data-action="memory-service-edit" data-memory-id="${l(String(r.id||""))}">编辑</button>
                <button class="ghost-action" data-action="memory-service-delete" data-memory-id="${l(String(r.id||""))}">删除</button>
              </div>
            </div>`}).join("")}
        </div>
        ${a.length>0?`
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>待审记忆候选 <span style="font-size:12px;font-weight:400;color:var(--muted);">· 日循环提取，可采纳或忽略</span></h3>
          ${a.map(r=>`
            <div class="theme-choice-item active" style="cursor:default; display:block;">
              <div class="theme-choice-copy" style="display:block;">
                <strong>${l(r.content||r.summary||"")}</strong>
                <em>${l(r.category||"")} / importance ${r.importance??3}</em>
              </div>
              <div class="ai-inline-actions" style="margin-top:8px;">
                <button class="ghost-action" data-action="memory-candidate-promote" data-candidate-id="${l(String(r.id||""))}">✓ 采纳</button>
                <button class="ghost-action" data-action="memory-candidate-dismiss" data-candidate-id="${l(String(r.id||""))}">✕ 忽略</button>
              </div>
            </div>
          `).join("")}
        </div>
        `:""}
      </section>
    `}function kn(){return String(n.currentContactId||h(n.currentContactId)?.id||"default").trim()||"default"}async function Ae(e=kn(),{silent:t=!0}={}){const a=String(e||"").trim();if(a){n.memoryServiceLoading=!0,u();try{const o=n.memoryServiceSort||"updated_at",i=new URLSearchParams({agent_id:a,sort_by:o,order:"desc",limit:"100"}),[r,s]=await Promise.all([fetch(`${S}/api/memories?${i.toString()}`),fetch(`${S}/api/consciousness/memory-candidates?agent_id=${encodeURIComponent(a)}&limit=20`)]);if(!r.ok)throw new Error(`HTTP ${r.status}`);const c=await r.json().catch(()=>({}));if(n.memoryServiceEntries=Array.isArray(c?.memories)?c.memories:[],s.ok){const d=await s.json().catch(()=>({}));n.memoryCandidates=Array.isArray(d?.candidates)?d.candidates:[]}}catch(o){console.warn("[memory service] load failed",o),t||(n.toast="记忆加载失败",window.setTimeout(()=>{n.toast="",u()},1200))}finally{n.memoryServiceLoading=!1,u()}}}async function dr(e){const t=kn();try{const a=await fetch(`${S}/api/consciousness/memory-candidates/${encodeURIComponent(e)}/promote?agent_id=${encodeURIComponent(t)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:"{}"});if(!a.ok)throw new Error(`HTTP ${a.status}`);n.memoryCandidates=(n.memoryCandidates||[]).filter(o=>String(o.id)!==String(e)),n.toast="✓ 已采纳为正式记忆",window.setTimeout(()=>{n.toast="",u()},1800),await Ae(t,{silent:!0})}catch(a){console.warn("[memory] promote failed",a)}}async function lr(e){try{const t=await fetch(`${S}/api/consciousness/memory-candidates/${encodeURIComponent(e)}`,{method:"DELETE"});if(!t.ok)throw new Error(`HTTP ${t.status}`);n.memoryCandidates=(n.memoryCandidates||[]).filter(a=>String(a.id)!==String(e)),u()}catch(t){console.warn("[memory] dismiss failed",t)}}function qa(e=null){const t=e||{},a=window.prompt("记忆内容",String(t.raw_content||t.content||"").trim());if(a===null)return null;const o=window.prompt("分层 / category（core_profile / recent_pending / deep / ephemeral）",String(t.category||"recent_pending"));if(o===null)return null;const i=window.prompt("可见范围（private / shared / public）",String(t.visibility||"private"));if(i===null)return null;const r=window.prompt("重要度（1-5）",String(t.importance??3));if(r===null)return null;const s=window.prompt("过期时间 ISO（可留空）",String(t.expires_at||""));return s===null?null:{agent_id:kn(),content:String(a||"").trim(),raw_content:String(a||"").trim(),category:String(o||"").trim()||"recent_pending",visibility:String(i||"").trim()||"private",importance:Math.max(1,Math.min(5,Number(r)||3)),expires_at:String(s||"").trim()||null}}async function pr(){const e=qa();if(!e||!e.content)return;const t=await fetch(`${S}/api/memories`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),a=await t.json().catch(()=>({}));if(!t.ok)throw new Error(a?.detail||`HTTP ${t.status}`)}async function mr(e){const t=n.memoryServiceEntries.find(r=>String(r.id)===String(e));if(!t)return;const a=qa(t);if(!a||!a.content)return;const o=await fetch(`${S}/api/memories/${encodeURIComponent(e)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),i=await o.json().catch(()=>({}));if(!o.ok)throw new Error(i?.detail||`HTTP ${o.status}`)}async function fr(e){if(!window.confirm("删除这条记忆？"))return;const t=await fetch(`${S}/api/memories/${encodeURIComponent(e)}`,{method:"DELETE"}),a=await t.json().catch(()=>({}));if(!t.ok)throw new Error(a?.detail||`HTTP ${t.status}`)}function gr(){const e=Xe();return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>同步后端</h3>
          <p class="section-eyebrow">前端快照会本地保存，并自动 push/pull 到后端。</p>
          ${M("数据库","Supabase")}
          ${M("后端接口",S)}
          ${M("设备 ID",sn())}
          ${M("上次同步",se(e.last_server_updated_at,{fallback:"暂无",includeYear:!0}))}
          <div class="ai-inline-actions" style="margin-top:10px;">
            <button class="ghost-action" data-action="sync-pull-now">立即拉取</button>
            <button class="ghost-action" data-action="sync-push-now">立即上传</button>
          </div>
        </div>
      </section>
    `}function hr(){const e=n.globalSettings;return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>导出格式</h3>
          <div class="theme-choice-list">
            ${["Markdown","JSON","TXT"].map(a=>`
              <button class="theme-choice-item ${e.exportFormat===a?"active":""}" data-action="pick-export-format" data-format="${a}">
                <span class="theme-choice-copy">
                  <strong>${l(a)}</strong>
                  <em>用于聊天记录导出</em>
                </span>
                <span class="theme-choice-check">${e.exportFormat===a?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `}function M(e,t,a="noop",o={}){const i=Object.entries(o).map(([r,s])=>` data-${r}="${l(String(s))}"`).join("");return`
      <button class="setting-row nav-row" data-action="${a}"${i}>
        <div class="setting-copy"><strong>${l(e)}</strong>${t?`<p>${l(t)}</p>`:""}</div>
        <span class="row-chevron">${g("chevron")}</span>
      </button>
    `}function W(e,t){n.viewStack.push(n.currentView),typeof t=="function"&&t(),n.currentView=e,u()}function br(){n.currentView=n.viewStack.pop()||"settings",u()}async function vr(){try{const e=await fetch(`${S}/api/settings/ai`);if(!e.ok)return;const t=await e.json();Xi(t.settings?.aiSettings||t.settings?.ai||t.settings?.ai_settings||t.settings||{}),u()}catch(e){console.warn("[ai settings] load failed",e)}}async function La({silent:e=!0}={}){try{const t=new URLSearchParams({viewer_type:"user",viewer_id:"me"}),a=await fetch(`${S}/api/moments?${t.toString()}`);if(!a.ok){if(!e)throw new Error(`HTTP ${a.status}`);return}const o=await a.json().catch(()=>({}));if(!Array.isArray(o?.moments))return;o.moments.length>0&&(n.moments=pa(n.moments,o.moments),$(120)),u()}catch(t){console.warn("[moments] load failed",t),e||(n.toast="朋友圈加载失败",u(),window.setTimeout(()=>{n.toast="",u()},1400))}}async function yr(e){const t=await fetch(`${S}/api/moments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),a=await t.json().catch(()=>({}));if(!t.ok)throw new Error(a?.detail||`HTTP ${t.status}`);return E(a?.moment||e)}async function wr(e,t){const a=await fetch(`${S}/api/moments/${encodeURIComponent(e)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),o=await a.json().catch(()=>({}));if(!a.ok)throw new Error(o?.detail||`HTTP ${a.status}`);return o}async function Sr(e,t,a){const o=new URLSearchParams({author_type:String(t||"user"),author_id:String(a||"me")}),i=await fetch(`${S}/api/moments/${encodeURIComponent(e)}?${o.toString()}`,{method:"DELETE"}),r=await i.json().catch(()=>({}));if(!i.ok)throw new Error(r?.detail||`HTTP ${i.status}`);return r}async function $r(e,t){const a=await fetch(`${S}/api/moments/${encodeURIComponent(e)}/like`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({actor_type:t.author_type,actor_id:t.author_id,actor_name:t.author_name})}),o=await a.json().catch(()=>({}));if(!a.ok)throw new Error(o?.detail||`HTTP ${a.status}`);return E(o?.moment||{})}async function Ir(e,t,a){const o=await fetch(`${S}/api/moments/${encodeURIComponent(e)}/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({actor_type:t.author_type,actor_id:t.author_id,actor_name:t.author_name,text:a})}),i=await o.json().catch(()=>({}));if(!o.ok)throw new Error(i?.detail||`HTTP ${o.status}`);return E(i?.moment||{})}async function kr(e,t){const a=n.currentContactId||"",o=(t||"").trim()||null,i={agentId:a};if(e==="impression")i.impression=o;else if(e==="relationshipProgress")i.relationshipProgress=o;else if(e==="likesSummary")i.likesSummary=o;else return;try{n.toast="保存中…",u();const r=await fetch(`${S}/api/companion-state/summary`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!r.ok)throw new Error(`HTTP ${r.status}`);const s=await r.json().catch(()=>({}));n.companionState=De(s?.state||n.companionState),n.toast="已保存",u(),window.setTimeout(()=>{n.toast="",u()},1200)}catch(r){console.warn("[insight save]",r),n.toast="保存失败",u(),window.setTimeout(()=>{n.toast="",u()},1400)}}async function me(e=n.currentContactId,{silent:t=!0}={}){try{const a=String(e||"").trim(),o=a?`?agent_id=${encodeURIComponent(a)}`:"",i=await fetch(`${S}/api/companion-state${o}`);if(!i.ok){if(!t)throw new Error(`HTTP ${i.status}`);return}const r=await i.json().catch(()=>({}));n.companionState=De(r?.state||{}),u()}catch(a){console.warn("[companion state] load failed",a),t||(n.toast="状态读取失败",u(),window.setTimeout(()=>{n.toast="",u()},1200))}}async function at(e,{silent:t=!0}={}){const a=String(e||"").trim();if(!a)return"";try{const o=await fetch(`${S}/api/agents/${encodeURIComponent(a)}/persona`);if(!o.ok){if(!t)throw new Error(`HTTP ${o.status}`);return""}const i=await o.json().catch(()=>({})),r=h(a);return r&&(r.persona=String(i?.persona||""),n.currentView==="contactSettings"&&n.currentContactId===a&&u()),String(i?.persona||"")}catch(o){return console.warn("[agent persona] load failed",o),t||(n.toast="浜鸿璇诲彇澶辫触",u(),window.setTimeout(()=>{n.toast="",u()},1200)),""}}async function _r(e,t){const a=String(e||"").trim();if(a)try{await fetch(`${S}/api/agents/${encodeURIComponent(a)}/persona`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({persona:String(t||"")})})}catch(o){console.warn("[agent persona] save failed",o)}}function Mr(e,t,a=260){const o=String(e||"").trim();if(!o)return;ye.has(o)&&clearTimeout(ye.get(o));const i=window.setTimeout(()=>{ye.delete(o),_r(o,t)},a);ye.set(o,i)}async function Da({silent:e=!0}={}){try{const t=await fetch(`${S}/api/mcp/library`);if(!t.ok){if(!e)throw new Error(`HTTP ${t.status}`);return}const a=await t.json();if(!Array.isArray(a.tools))return;const o=B(),i=a.tools.map(fe).filter(r=>$e(r.id));o.mcpLibrary={...o.mcpLibrary||{},tools:i},D(),u()}catch(t){console.warn("[mcp library] load failed",t),e||(n.toast="同步 MCP 工具失败",u(),window.setTimeout(()=>{n.toast="",u()},1300))}}async function D(){Tt();const e=B();e.providers=(e.providers||[]).map(et),Object.keys(e.defaultModels||{}).forEach(t=>{t!=="voice"&&(e.defaultModels[t]=Sn(e.defaultModels[t]))}),n.aiSettingsSaving=!0;try{await fetch(`${S}/api/settings/ai`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({settings:{...n.globalSettings,aiSettings:e}})})}catch(t){console.error("[ai settings] save failed",t)}finally{n.aiSettingsSaving=!1}}function Cr(){const e=B(),t=(e.mcpLibrary?.tools||[]).filter(a=>a.enabled!==!1).length;return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel">
          <h3>AI 接口</h3>
          ${M("默认模型","聊天 / 摘要 / Vision / 翻译 / 意识循环 / 语音","open-default-models")}
          ${M("模型供应商",`共 ${e.providers.length} 个`,"open-provider-catalog")}
          ${M("MCP 工具库",`已启用 ${t} 个`,"open-mcp-library")}
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>当前聊天默认</h3>
          ${M("聊天模型",Pa("chat"))}
        </div>
      </section>
    `}function xr(){const e=B();return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <div class="ai-inline-actions">
            <h3 style="margin:0;">MCP 工具库</h3>
            <button class="ghost-action" data-action="sync-mcp-library">同步工具</button>
          </div>
          <p class="section-eyebrow">只展示聊天主动场景常用工具，同步到输入框上方分类。</p>
          ${(Array.isArray(e.mcpLibrary?.tools)?e.mcpLibrary.tools:[]).map(fe).filter(a=>$e(a.id)).map(a=>`
            <div class="provider-catalog-row">
              <div class="provider-row-main" style="cursor:default;">
                <div class="setting-copy">
                  <strong>${l(a.label||a.id||"")}</strong>
                  <p>${l(a.description||a.prompt||a.id||"")}</p>
                </div>
              </div>
              <button class="switch-btn ${a.enabled!==!1?"on":"off"}" data-action="toggle-mcp-tool" data-tool-id="${l(a.id||"")}" aria-pressed="${a.enabled!==!1}">
                ${gt(a.enabled!==!1)}
              </button>
            </div>
          `).join("")}
        </div>
      </section>
    `}function Ar(){return`
      <section class="settings-page page-block ai-settings-page">
        <div class="default-model-list">
          ${["chat","summary","vision","translate","consciousness","voice"].map(t=>or(t)).join("")}
        </div>
      </section>
    `}function Tr(){const e=F(n.activeModelSlot),t=n.activeModelSlotContext==="contact",a=h(n.currentContactId)||n.contacts[0];if(!t&&e==="voice"){const c=Et("voice")||{};return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>${l(He("voice"))}</h3>
          <p class="section-eyebrow">${l(Pt("voice"))}</p>
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
    `}const o=t?{providerId:a?.settings?.modelProviderId||n.activeModelProviderId||x("chat")?.providerId||"openai",model:e==="consciousness"?a?.settings?.loopModel||"":a?.settings?.model||""}:Et(e),i=B().providers.filter(c=>c.enabled),r=J(o.providerId)||J(x("chat")?.providerId)||i[0],s=G(r?.models||[]);return t?`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>${l(He(e))}</h3>
          <p class="section-eyebrow">${l(Pt(e))}</p>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>模型供应商</h3>
          <div class="ai-chip-row">
            ${i.map(c=>`<button class="ai-chip ${o.providerId===c.id?"active":""}" data-action="pick-slot-provider" data-slot="${e}" data-provider-id="${c.id}">${l(c.name)}</button>`).join("")}
          </div>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>模型列表</h3>
          <div class="provider-model-picker">
            <div class="provider-model-input-row">
              <input id="model-slot-input" class="ai-input provider-model-input" value="${l(o.model||"")}" placeholder="${l(s[0]||"输入或选择模型")}" autocomplete="off" data-plain-input="true" />
              <button class="provider-model-toggle" data-action="toggle-model-slot-menu" type="button" aria-label="灞曞紑妯″瀷鍒楄〃">
                ${g("chevron")}
              </button>
            </div>
            <p id="model-slot-hint" class="section-eyebrow provider-model-hint">${l(In(o.model||"",s))}</p>
            <div id="model-slot-menu" class="provider-model-menu"></div>
          </div>
          <div class="model-choice-list">
            ${Oa(e,o,s)}
          </div>
        </div>
      </section>
    `:`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>${l(He(e))}</h3>
          <p class="section-eyebrow">${l(Pt(e))}</p>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>模型供应商</h3>
          <div class="ai-chip-row">
            ${i.map(c=>`<button class="ai-chip ${o.providerId===c.id?"active":""}" data-action="pick-slot-provider" data-slot="${e}" data-provider-id="${c.id}">${l(c.name)}</button>`).join("")}
          </div>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>模型列表</h3>
          <div class="provider-model-picker">
            <div class="provider-model-input-row">
              <input id="model-slot-input" class="ai-input provider-model-input" value="${l(o.model||"")}" placeholder="${l(s[0]||"输入或选择模型")}" autocomplete="off" data-plain-input="true" />
              <button class="provider-model-toggle" data-action="toggle-model-slot-menu" type="button" aria-label="展开模型列表">
                ${g("chevron")}
              </button>
            </div>
            <p id="model-slot-hint" class="section-eyebrow provider-model-hint">${l(In(o.model||"",s))}</p>
            <div id="model-slot-menu" class="provider-model-menu"></div>
          </div>
          <div class="model-choice-list">
            ${Oa(e,o,s)}
          </div>
        </div>
      </section>
    `}function Er(e){return`
      <div class="provider-catalog-row">
        <button class="provider-row-main" data-action="open-provider-editor" data-provider="${e.id}">
          <div class="setting-copy">
            <strong>${l(e.name)}</strong>
            <p>${l(e.defaultModel||"未设置默认模型")}</p>
          </div>
          <span class="provider-inline-state ${e.enabled?"enabled":"disabled"}">${e.enabled?"已启用":"已禁用"}</span>
          <span class="row-chevron">${g("chevron")}</span>
        </button>
        <button class="switch-btn ${e.enabled?"on":"off"}" data-action="toggle-provider-enabled" data-provider-id="${e.id}" aria-pressed="${e.enabled}">
          ${gt(e.enabled)}
        </button>
      </div>
    `}function Pr(){const e=n.providerSearch.trim().toLowerCase(),t=B().providers.filter(a=>!e||a.name.toLowerCase().includes(e)||a.id.toLowerCase().includes(e)).sort((a,o)=>{const i=+!!o.enabled-+!!a.enabled;return i!==0?i:String(a.name||a.id||"").localeCompare(String(o.name||o.id||""),"zh-Hans-CN")});return`
      <section class="settings-page page-block ai-settings-page">
        <div class="search-pill glass-frost ai-search-row">
          <span class="search-icon">${g("search")}</span>
          <input class="ai-search-input" value="${l(n.providerSearch)}" data-action="provider-search" placeholder="搜索供应商" />
        </div>
        <div class="settings-group glass-frost ai-panel provider-catalog-group">
          ${t.map(a=>Er(a)).join("")}
        </div>
      </section>
    `}function qr(e){const t=new Set,a=(Array.isArray(e._allModels)?e._allModels:[]).filter(b=>{const v=L(b?.id||b?.name||""),I=v.toLowerCase();return!v||t.has(I)?!1:(t.add(I),!0)}),o=e._selectedModelIds instanceof Set?e._selectedModelIds:new Set(e._selectedModelIds||[]),i=o.size,r={};for(const b of a){const v=b.vendor||"Other";r[v]||(r[v]=[]),r[v].push(b)}const s=["OpenAI","Anthropic","Google","DeepSeek","Qwen","GLM","Meta","Mistral","Moonshot","Doubao","ERNIE","Hunyuan","Baichuan","Spark","01.AI","InternLM","Other"],c=[...new Set([...s.filter(b=>r[b]),...Object.keys(r)])],d=a.map(b=>b.id),p=d.length>0&&d.every(b=>o.has(b)),m=c.map(b=>{const v=r[b]||[],I=!!n.providerModelVendorOpen[b],_=v.filter(k=>o.has(k.id)).length,T=v.length>0&&v.every(k=>o.has(k.id)),C=I?`
          <div class="vendor-group-body">
            ${v.map(k=>{const A=o.has(k.id),N=a.findIndex(q=>q.id===k.id);return`
              <div class="pool-model-row">
                <span class="pool-model-name">${l(k.name)}</span>
                <span class="pool-model-caps">${Zi(k)}</span>
                <button class="pool-model-btn${A?" selected":""}"
                  data-action="${A?"remove-provider-model":"add-provider-model"}"
                  data-model-index="${N}" type="button">${A?"−":"+"}</button>
              </div>`}).join("")}
          </div>`:"";return`
        <div class="vendor-group">
          <div class="vendor-group-head">
            <button class="vendor-group-toggle" data-action="toggle-provider-vendor-group" data-vendor="${l(b)}" type="button">
              <span class="vendor-group-name">${l(b)}</span>
              ${_?`<span class="vendor-group-sel">${_} 已选</span>`:""}
              <span class="vendor-group-badge">${v.length}</span>
              <span class="vendor-group-chevron${I?" open":""}">${g("chevron")}</span>
            </button>
            <button class="pool-vendor-selall${T?" all-selected":""}" data-action="toggle-vendor-all-provider-models" data-vendor="${l(b)}" type="button" title="${T?"全不选":"全选"}">${T?"−全":"+全"}</button>
          </div>
          ${C}
        </div>`}).join(""),f=a.length?"":'<p class="pool-model-empty" style="padding:10px 2px;">还没有模型，点击“同步模型”获取，或手动添加。</p>';return`
      <div class="prov-model-pool">
        <div class="prov-pool-header">
          <span class="prov-pool-count">${i?`已选 <strong>${i}</strong> 个模型`:"还没有已选模型"}</span>
          ${a.length?`<button class="pool-selall-btn${p?" all-selected":""}" data-action="toggle-all-provider-models" type="button">${p?"全不选":"全选"}</button>`:""}
        </div>
        ${f}
        ${m}
        <div class="pool-manual-row">
          <input id="provider-manual-model-input" class="ai-input provider-model-input" placeholder="手动输入模型名" autocomplete="off" data-plain-input="true" />
          <button class="pool-manual-add-btn" data-action="add-manual-provider-model" type="button">＋</button>
        </div>
      </div>`}function Oa(e,t,a){const o=G(a),i=L(t?.model||"");return o.length?o.map((r,s)=>`
          <button class="model-choice-item ${i===r?"active":""}" data-action="pick-slot-model" data-slot="${e}" data-model-index="${s}">
            <span class="model-choice-name">${l(r)}</span>
            <span class="model-choice-check">${i===r?"已选":""}</span>
          </button>
        `).join(""):'<div class="model-choice-empty">当前供应商还没有可选模型，请先在“模型供应商”页同步并保存。</div>'}function Lr(){const e=O(),t=Ze(e.apiPath||e.api_path||"",{allowEmpty:!0}),a=Ui(e),o=!!n.providerAdvancedOpen||!!t,i=n.providerModelSyncStatus?.[e.id],r=Qi(e.apiKey||""),s=!!e._apiKeyDirty,c=s?String(e.apiKey||""):r,d=s?n.providerKeyVisible?"text":"password":"text",p=s?n.providerKeyVisible?"隐藏":"显示":r?"更换":"显示";return`
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
                <span class="advanced-chevron ${o?"open":""}">${g("chevron")}</span>
              </button>
            </div>
            <div class="provider-advanced-panel ${o?"open":""}">
              <label class="ai-field-label">API 路径（可选）</label>
              <input id="provider-api-path-input" class="ai-input" value="${l(t)}" placeholder="${l(a)}" data-plain-input="true" />
              <p class="section-eyebrow">留空时自动使用 ${l(a)}</p>
            </div>
            <label class="ai-field-label">API Key</label>
            <div class="provider-key-row">
              <input id="provider-key-input" class="ai-input provider-key-input" type="${d}" value="${l(c)}" placeholder="sk-..." autocomplete="off" autocapitalize="off" spellcheck="false" data-plain-input="true" data-masked="${!s&&r?"true":"false"}" />
              <button class="provider-key-toggle" data-action="toggle-provider-key-visible" type="button" aria-label="${p} API Key">${p}</button>
            </div>
            ${r?`<p class="section-eyebrow provider-key-mask">已保存：${l(r)}</p>`:""}
          </div>

          <div class="prov-sec-divider"></div>

          <div class="prov-sec">
            <h3 class="prov-sec-title">默认模型</h3>
            <div class="provider-model-picker">
              <div class="provider-model-input-row">
                <input id="provider-default-model-input" class="ai-input provider-model-input" value="${l(e.defaultModel||"")}" placeholder="gpt-5.4" autocomplete="off" data-plain-input="true" />
                <button class="provider-model-toggle" data-action="toggle-provider-model-menu" type="button" aria-label="展开模型列表">
                  ${g("chevron")}
                </button>
              </div>
              <p id="provider-default-model-hint" class="section-eyebrow provider-model-hint">${l(Ea(e.defaultModel||"",e.models||[]))}</p>
              <div id="provider-default-model-menu" class="provider-model-menu ${n.providerModelMenuOpen?"open":""}"></div>
            </div>
          </div>

          <div class="prov-sec-divider"></div>

          <div class="prov-sec">
            <div class="prov-sec-title-row">
              <h3 class="prov-sec-title" style="margin:0;">模型列表</h3>
              <button class="prov-sync-btn" data-action="sync-provider-models" data-provider="${e.id}" type="button" ${n.providerModelSyncingId===e.id?"disabled":""}>${g("reroll")}${n.providerModelSyncingId===e.id?"同步中":"同步"}</button>
            </div>
            ${qr(e)}
            ${i?.message?`<p class="provider-sync-status ${l(i.type||"")}">${l(i.message)}</p>`:'<p class="provider-sync-status muted">同步会优先请求真实模型列表；失败时保留当前列表。</p>'}
          </div>

          <div class="prov-sec-divider"></div>

          ${ce("启用供应商","关闭后将不会出现在模型选择中",!!e.enabled,"toggle-provider-enabled",e.id)}

          <div class="prov-save-row">
            <button class="prov-save-btn-main" data-action="save-provider-editor" data-provider="${e.id}" type="button">保存供应商</button>
          </div>
        </div>
      </section>
    `}async function Dr(){const e=O();if(n.providerModelSyncingId)return;const t=document.getElementById("provider-base-input")?.value?.trim()||"",a=document.getElementById("provider-key-input"),o=e._apiKeyDirty?a?.value?.trim()||"":e.apiKey||"",i=yn({...e,baseUrl:t});if(!t){const r=wn(e);if(!r.length){Me(e.id,"error","请先填写 Base URL 再同步模型"),u();return}const s=r.map(tt);e._allModels=s,s.forEach(c=>{n.providerModelVendorOpen[c.vendor]=!0}),Me(e.id,"success",`已载入内置列表 ${r.length} 个模型`),u();return}n.providerModelSyncingId=e.id||n.providerDraftId||"syncing",Me(e.id,"muted","正在同步模型..."),u();try{const r=await fetch(`${S}/api/settings/ai/discover-models`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({provider_id:e.id||i,provider_name:e.name||"",base_url:t,api_key:o})}),s=r.headers.get("content-type")||"",c=await r.text();if(!r.ok){let C="";try{const k=s.includes("application/json")?JSON.parse(c):null;C=k?.detail||k?.message||""}catch{}throw new Error(C||`HTTP ${r.status}`)}if(!s.includes("application/json"))throw new Error("后端返回的不是 JSON，已阻止写入模型列表");let d={};try{d=JSON.parse(c||"{}")}catch{throw new Error("后端返回 JSON 解析失败，已阻止写入模型列表")}const p=G(Array.isArray(d.models)?d.models:[]),m=wn({...e,baseUrl:t}),f=G([...p,...m]);if(!f.length){Me(e.id,"error","没有获取到模型，已保留当前默认模型和已有列表。"),u();return}const b=f.map(tt),v=new Set(f.map(C=>C.toLowerCase())),I=[...b];(e._allModels||[]).forEach(C=>{const k=L(C?.id||C?.name||"");!k||v.has(k.toLowerCase())||I.push(tt(k))}),e._allModels=I,[...new Set(b.map(C=>C.vendor))].forEach(C=>{n.providerModelVendorOpen[C]=!0}),e._selectedModelIds instanceof Set||(e._selectedModelIds=new Set(e._selectedModelIds||[])),e.models=[...e._selectedModelIds];const T=Math.max(0,f.length-p.length);Me(e.id,"success",d.is_fallback||d.source==="fallback"?`已载入内置列表 ${f.length} 个模型`:T?`已同步 ${p.length} 个模型，补充内置 ${T} 个`:`已同步 ${f.length} 个模型`),u(),xe()}catch(r){const s=String(r?.message||"同步模型失败");if(s.includes("Failed to fetch")){Me(e.id,"error","同步失败：当前前端连不上后端接口。"),u();return}Me(e.id,"error",`同步失败：${s}`),u()}finally{n.providerModelSyncingId="",u()}}ut=function(){return vn.has(n.currentView)?!1:Hi()},Ft=function(){if(!vn.has(n.currentView))return Ni();const t={aiInterface:"AI 接口",mcpLibrary:"MCP 工具库",themeSettings:"主题模式",accountSettings:"我的账号",memoryService:"记忆服务",backendSync:"同步后端",exportSettings:"导出格式",defaultModels:"默认模型",modelSlot:He(n.activeModelSlot),providerCatalog:"模型供应商",providerEditor:"编辑供应商",promptEditor:"提示词"},a=`chat-page-title ${n.currentView==="providerCatalog"?"provider-catalog-title":""}`.trim(),o=n.currentView==="providerCatalog"?`<button class="icon-btn ghost-circle" data-action="open-provider-editor-new" aria-label="新增供应商">${g("plus")}</button>`:'<span class="header-spacer"></span>';return`
      <header class="chat-page-header simple-header">
        <button class="icon-btn text-btn" data-action="back-sub-settings" aria-label="返回">${g("back")}</button>
        <div class="${a}">${l(t[n.currentView]||"设置")}</div>
        ${o}
      </header>
    `},Ut=function(){return n.currentView==="accountSettings"?sr():n.currentView==="memoryService"?ur():n.currentView==="backendSync"?gr():n.currentView==="exportSettings"?hr():n.currentView==="themeSettings"?rr():n.currentView==="aiInterface"?Cr():n.currentView==="mcpLibrary"?xr():n.currentView==="defaultModels"?Ar():n.currentView==="modelSlot"?Tr():n.currentView==="providerCatalog"?Pr():n.currentView==="providerEditor"?Lr():n.currentView==="promptEditor"?ir():ji()},en=function(t){const a=t.target.closest("[data-action]"),o=a?.dataset.action;if(!o)return Ca(t);if(o==="open-ai-interface")return W("aiInterface");if(o==="open-mcp-library")return W("mcpLibrary");if(o==="open-theme-settings")return W("themeSettings");if(o==="open-account-settings")return W("accountSettings");if(o==="open-account-avatar"){document.getElementById("account-avatar-file")?.click();return}if(o==="open-account-nickname"){const i=window.prompt("请输入昵称",n.accountProfile?.nickname||"小酒")?.trim();if(!i)return;n.accountProfile.nickname=i,n.toast="昵称已更新",u(),D(),$(120),window.setTimeout(()=>{n.toast="",u()},1200);return}if(o==="open-account-signature"){const i=window.prompt("请输入个性签名",n.accountProfile?.signature||"")?.trim();if(!i)return;n.accountProfile.signature=i,n.toast="个性签名已更新",u(),D(),$(120),window.setTimeout(()=>{n.toast="",u()},1200);return}if(o==="open-memory-service")return W("memoryService",()=>{Ae(n.currentContactId)});if(o==="memory-service-refresh"){Ae(n.currentContactId,{silent:!1});return}if(o==="memory-service-sort"){n.memoryServiceSort=a.dataset.sort||"updated_at",Ae(n.currentContactId,{silent:!0});return}if(o==="memory-candidate-promote"){dr(a.dataset.candidateId);return}if(o==="memory-candidate-dismiss"){lr(a.dataset.candidateId);return}if(o==="memory-service-create"){pr().then(()=>Ae(n.currentContactId,{silent:!1})).catch(i=>{console.warn("[memory service] create failed",i),n.toast="新建记忆失败",u(),window.setTimeout(()=>{n.toast="",u()},1200)});return}if(o==="memory-service-edit"){mr(a.dataset.memoryId).then(()=>Ae(n.currentContactId,{silent:!1})).catch(i=>{console.warn("[memory service] update failed",i),n.toast="编辑记忆失败",u(),window.setTimeout(()=>{n.toast="",u()},1200)});return}if(o==="memory-service-delete"){fr(a.dataset.memoryId).then(()=>Ae(n.currentContactId,{silent:!1})).catch(i=>{console.warn("[memory service] delete failed",i),n.toast="删除记忆失败",u(),window.setTimeout(()=>{n.toast="",u()},1200)});return}if(o==="open-backend-sync")return W("backendSync");if(o==="sync-pull-now"){Sa();return}if(o==="sync-push-now"){pe(),_e(30),n.toast="已加入上传队列",u(),window.setTimeout(()=>{n.toast="",u()},1e3);return}if(o==="open-export-settings")return W("exportSettings");if(o==="open-default-models")return W("defaultModels");if(o==="open-model-slot")return W("modelSlot",()=>{if(n.activeModelSlot=F(a.dataset.slot),n.activeModelSlotContext=a.dataset.context==="contact"?"contact":"global",n.modelSlotMenuOpen=!1,n.activeModelSlotContext==="contact"){const i=K();n.activeModelProviderId=i?.settings?.modelProviderId||x("chat")?.providerId||n.activeModelProviderId||"openai"}else n.activeModelProviderId=x("chat")?.providerId||n.activeModelProviderId||"openai"});if(o==="open-provider-catalog")return W("providerCatalog");if(o==="open-provider-editor-new")return W("providerEditor",()=>{n.providerDraftId=`custom_${Date.now()}`,n.providerAdvancedOpen=!1,n.providerModelMenuOpen=!1,n.providerEditorDraft=$n(n.providerDraftId)});if(o==="open-provider-editor")return W("providerEditor",()=>{n.providerDraftId=a.dataset.provider;const i=J(n.providerDraftId);n.providerAdvancedOpen=!!String(i?.apiPath||i?.api_path||"").trim(),n.providerModelMenuOpen=!1,n.providerEditorDraft=$n(n.providerDraftId)});if(o==="open-prompt-editor")return W("promptEditor",()=>{n.activePromptSlot=F(a.dataset.slot)});if(o==="back-sub-settings")return br();if(o==="sync-provider-models"){Dr();return}if(o==="toggle-provider-key-visible"){const i=O();i._apiKeyDirty?n.providerKeyVisible=!n.providerKeyVisible:(i._apiKeyDirty=!0,i.apiKey="",n.providerKeyVisible=!0),u(),window.setTimeout(()=>document.getElementById("provider-key-input")?.focus(),0);return}if(o==="toggle-provider-advanced"){n.providerAdvancedOpen=!n.providerAdvancedOpen,u();return}if(o==="toggle-model-slot-menu"){n.modelSlotMenuOpen=!1,nt();return}if(o==="toggle-provider-model-menu"){n.providerModelMenuOpen=!n.providerModelMenuOpen,xe();return}if(o==="pick-provider-default-model"){const i=O(),r=document.getElementById("provider-default-model-input")?.value||i.defaultModel||"",s=xa(r,i.models),c=L(s[Number(a.dataset.modelIndex)]||a.dataset.model||"");if(!c)return;i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[])),i._selectedModelIds.add(c),i.models=[...i._selectedModelIds],i.defaultModel=c;const d=document.getElementById("provider-default-model-input");d&&(d.value=c),n.providerModelMenuOpen=!1,xe();return}if(o==="pick-slot-provider"){if(n.activeModelSlotContext==="contact"){const s=K(),c=a.dataset.providerId||n.activeModelProviderId,d=J(c);n.activeModelProviderId=c,n.modelSlotMenuOpen=!1,s?.settings&&(s.settings.modelProviderId=c,(!L(s.settings.model)||!(d?.models||[]).includes(s.settings.model))&&(s.settings.model=d?.defaultModel||d?.models?.[0]||s.settings.model||"")),u(),$(150);return}const i=x(a.dataset.slot);i.providerId=a.dataset.providerId;const r=J(i.providerId);r&&(i.model=L(r.defaultModel)||r.models?.[0]||L(i.model)||""),n.modelSlotMenuOpen=!1,u(),D();return}if(o==="toggle-all-provider-models"){const i=O();i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[]));const s=(Array.isArray(i._allModels)?i._allModels:[]).map(d=>d.id);s.length>0&&s.every(d=>i._selectedModelIds.has(d))?s.forEach(d=>i._selectedModelIds.delete(d)):s.forEach(d=>i._selectedModelIds.add(d)),i.models=[...i._selectedModelIds],u();return}if(o==="toggle-vendor-all-provider-models"){const i=a.dataset.vendor,r=O();r._selectedModelIds instanceof Set||(r._selectedModelIds=new Set(r._selectedModelIds||[]));const c=(Array.isArray(r._allModels)?r._allModels:[]).filter(p=>(p.vendor||"Other")===i).map(p=>p.id);c.length>0&&c.every(p=>r._selectedModelIds.has(p))?c.forEach(p=>r._selectedModelIds.delete(p)):c.forEach(p=>r._selectedModelIds.add(p)),r.models=[...r._selectedModelIds],u();return}if(o==="toggle-provider-vendor-group"){const i=a.dataset.vendor;i&&(n.providerModelVendorOpen[i]=!n.providerModelVendorOpen[i]),u();return}if(o==="add-provider-model"){const i=O();i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[]));const s=(Array.isArray(i._allModels)?i._allModels:[])[Number(a.dataset.modelIndex)]||{},c=L(s.id||s.name||a.dataset.modelId||"");if(c&&i._selectedModelIds.add(c),c){i.defaultModel=c;const d=document.getElementById("provider-default-model-input");d&&(d.value=c)}i.models=[...i._selectedModelIds],u();return}if(o==="remove-provider-model"){const i=O();i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[]));const s=(Array.isArray(i._allModels)?i._allModels:[])[Number(a.dataset.modelIndex)]||{},c=L(s.id||s.name||a.dataset.modelId||"");c&&i._selectedModelIds.delete(c),i.models=[...i._selectedModelIds],u();return}if(o==="add-manual-provider-model"){const i=O(),r=document.getElementById("provider-manual-model-input"),s=L(r?.value||"");if((r?.value||"").trim()&&!s){alert("模型 ID 不合法，不能包含 HTML、控制字符或过长内容");return}if(!s)return;if(i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[])),Array.isArray(i._allModels)||(i._allModels=[]),!i._allModels.some(c=>c.id===s)){i._allModels.push(tt(s));const c=Aa(s);n.providerModelVendorOpen[c]=!0}i._selectedModelIds.add(s),i.defaultModel=s,i.models=[...i._selectedModelIds],u();return}if(o==="toggle-slot-vendor-group"){const i=a.dataset.providerId;i&&(n.slotVendorGroupOpen[i]=!n.slotVendorGroupOpen[i]),u();return}if(o==="add-model-to-slot"){const i=a.dataset.slot,r=a.dataset.providerId,s=L(a.dataset.model||"");if(!i||!r||!s)return;const c=x(i);Array.isArray(c.selectedModels)||(c.selectedModels=[]),c.selectedModels.some(d=>d.providerId===r&&d.model===s)||c.selectedModels.push({providerId:r,model:s}),u(),D();return}if(o==="remove-model-from-slot"){const i=a.dataset.slot,r=a.dataset.providerId,s=a.dataset.model;if(!i||!s)return;const c=x(i);Array.isArray(c.selectedModels)&&(c.selectedModels=c.selectedModels.filter(d=>!(d.providerId===r&&d.model===s))),u(),D();return}if(o==="add-manual-slot-model"){const i=a.dataset.slot,r=document.getElementById("model-slot-manual-input"),s=L(r?.value||"");if((r?.value||"").trim()&&!s){alert("模型 ID 不合法，不能包含 HTML、控制字符或过长内容");return}if(!i||!s)return;const c=x(i);Array.isArray(c.manualModels)||(c.manualModels=[]),c.manualModels.includes(s)||c.manualModels.push(s),u(),D();return}if(o==="remove-manual-slot-model"){const i=a.dataset.slot,r=L(a.dataset.model||"");if(!i||!r)return;const s=x(i);Array.isArray(s.manualModels)&&(s.manualModels=s.manualModels.filter(c=>c!==r)),u(),D();return}if(o==="pick-theme-mode"){n.globalSettings.theme=a.dataset.theme||n.globalSettings.theme,u(),D();return}if(o==="pick-export-format"){n.globalSettings.exportFormat=a.dataset.format||n.globalSettings.exportFormat,u(),D();return}if(o==="toggle-mcp-tool"){const i=a.dataset.toolId,c=(B().mcpLibrary?.tools||[]).find(d=>String(d.id)===String(i));if(!c)return;c.enabled=c.enabled===!1,Fn(a,c.enabled!==!1),D();return}if(o==="sync-mcp-library"){Da({silent:!1});return}if(o==="edit-contact-quick-action"){if(n.quickActionDragId)return;ei(a.dataset.quickId||"");return}if(o==="add-contact-quick-action"){const i=K(),r=Ie(i),s=`custom_${Date.now()}`;r.push({id:s,label:"新快捷动作",icon:"more",prompt:"",mcpToolId:"",enabled:!0}),i.settings.quickActions=r,n.contactQuickActionEditorId=s,u(),$(150);return}if(o==="close-contact-quick-action-editor"){if(t.target.closest('[data-stop-close="1"]')&&!t.target.hasAttribute("data-action"))return;n.contactQuickActionEditorId="",n.contactQuickMcpMenuOpen=!1,u();return}if(o==="toggle-contact-quick-mcp-menu"){n.contactQuickMcpMenuOpen=!n.contactQuickMcpMenuOpen,a.closest(".qae-select-shell")?.classList.toggle("open",n.contactQuickMcpMenuOpen);return}if(o==="pick-contact-quick-mcp"){const i=a.closest(".qae-select-shell"),r=a.dataset.mcpId||"",s=document.getElementById("contact-quick-mcp");s&&(s.value=r);const c=a.textContent?.trim()||"不调用 MCP",d=i?.querySelector(".qae-select-trigger span");d&&(d.textContent=c),i?.querySelectorAll(".qae-select-option").forEach(p=>{p.classList.toggle("active",p===a)}),n.contactQuickMcpMenuOpen=!1,i?.classList.remove("open");return}if(o==="save-contact-quick-action"){const i=K(),r=Ie(i),s=a.dataset.quickId||"",c=r.find(d=>d.id===s);if(!c)return;c.label=(document.getElementById("contact-quick-label")?.value||c.label||"").trim()||c.label||"蹇嵎鍔ㄤ綔",c.prompt=(document.getElementById("contact-quick-prompt")?.value||"").trim(),c.mcpToolId=(document.getElementById("contact-quick-mcp")?.value||"").trim(),c.mcpToolId&&$e(c.mcpToolId)&&(c.id=c.id||c.mcpToolId),i.settings.quickActions=r,n.contactQuickActionEditorId="",u(),$(150);return}if(o==="delete-contact-quick-action"){const i=K(),r=a.dataset.quickId||"",s=Ie(i).filter(c=>c.id!==r);i.settings.quickActions=s,n.contactQuickActionEditorId===r&&(n.contactQuickActionEditorId=""),n.quickActionSwipeOpenId="",u(),$(150);return}if(o==="pick-slot-model"){const i=x(a.dataset.slot),r=J(i?.providerId),s=G(r?.models||[]),c=L(s[Number(a.dataset.modelIndex)]||a.dataset.model||"");if(!c)return;if(n.activeModelSlotContext==="contact"){const p=h(n.currentContactId)||n.contacts[0];p?.settings&&(a.dataset.slot==="consciousness"?p.settings.loopModel=c:(p.settings.model=c,p.settings.modelProviderId=n.activeModelProviderId||p.settings.modelProviderId||x("chat")?.providerId||"openai")),n.modelSlotMenuOpen=!1,u(),$(150);return}const d=x(a.dataset.slot);d.model=c,a.dataset.providerId&&(d.providerId=a.dataset.providerId),n.modelSlotMenuOpen=!1,u(),D();return}if(o==="toggle-provider-enabled"){const i=J(a.dataset.providerId||a.dataset.key);i&&(i.enabled=!i.enabled,n.providerEditorDraft&&n.providerEditorDraft.id===i.id&&(n.providerEditorDraft.enabled=i.enabled)),u(),D();return}if(o==="save-provider-editor"){const i=a.dataset.provider,r=O(),s=r._selectedModelIds instanceof Set?r._selectedModelIds:new Set(r._selectedModelIds||[]),c=G([...s]),d=J(i),p=Ze(document.getElementById("provider-api-path-input")?.value||"",{allowEmpty:!0}),m=document.getElementById("provider-default-model-input")?.value?.trim()||"";let f="";try{f=m?Yi(m,"默认模型"):c[0]||""}catch(I){alert(I.message||"默认模型不合法");return}if(!f){alert("默认模型不能为空，请手动输入或选择一个合法模型");return}const b={...d||{id:i},id:i,name:document.getElementById("provider-name-input")?.value?.trim()||"自定义供应商",baseUrl:document.getElementById("provider-base-input")?.value?.trim()||"",apiPath:p,api_path:p,apiKey:r._apiKeyDirty?document.getElementById("provider-key-input")?.value?.trim()||"":r.apiKey||"",defaultModel:f,models:c},v=B();v.providerModels={...v.providerModels||{},[i]:c},v.providers=v.providers.filter(I=>I.id!==i),v.providers.push(b),Tt(),n.providerEditorDraft=null,n.providerModelMenuOpen=!1,n.currentView="providerCatalog",u(),D();return}if(o==="save-slot-prompt"){const i=F(a.dataset.slot);B().defaultPrompts[i]=document.getElementById("slot-prompt-input")?.value||"",n.currentView="defaultModels",u(),D();return}if(o==="reset-slot-prompt"){const i=F(a.dataset.slot),r=Ce().defaultPrompts||{};B().defaultPrompts[i]=r[i]||"",u(),D();return}return Ca(t)},document.addEventListener("input",e=>{const t=e.target;if(t?.dataset?.action==="provider-search"){n.providerSearch=t.value||"",u();return}if(t?.id==="model-slot-input"){const a=h(n.currentContactId)||n.contacts[0],o=t.value||"",i=o?L(o):"";if(o&&!i){n.modelSlotMenuOpen=!1,nt();return}if(n.activeModelSlotContext==="contact")a?.settings&&(n.activeModelSlot==="consciousness"?a.settings.loopModel=i:a.settings.model=i);else{const r=x(n.activeModelSlot);r&&(r.model=i)}n.modelSlotMenuOpen=!1,nt();return}if(t?.id==="provider-name-input"){O().name=t.value||"";return}if(t?.id==="provider-base-input"){O().baseUrl=t.value||"";return}if(t?.id==="provider-api-path-input"){const a=O();a.apiPath=t.value||"",a.api_path=t.value||"";return}if(t?.id==="provider-key-input"){const a=O();t.dataset?.masked==="true"&&(t.value="",t.dataset.masked="false"),a._apiKeyDirty=!0,a.apiKey=String(t.value||"");return}if(t?.id==="provider-models-input"){O().models=String(t.value||"").split(",").map(a=>a.trim()).filter(Boolean),xe();return}if(t?.id==="voice-slot-provider-input"){const a=x("voice");a&&(a.provider=t.value||"");return}if(t?.id==="voice-slot-service-url-input"){const a=x("voice");a&&(a.service_url=t.value||"",a.base_url=t.value||"");return}if(t?.id==="voice-slot-voice-id-input"){const a=x("voice");a&&(a.voice_id=t.value||"");return}if(t?.id==="voice-slot-speaker-input"){const a=x("voice");a&&(a.speaker=t.value||"");return}if(t?.id==="voice-slot-emotion-input"){const a=x("voice");a&&(a.emotion=t.value||"");return}if(t?.id==="voice-slot-speed-input"){const a=x("voice");a&&(a.speed=t.value||"");return}if(t?.id==="voice-slot-format-input"){const a=x("voice");a&&(a.format=t.value||"");return}if(t?.id==="provider-default-model-input"){O().defaultModel=t.value||"",n.providerModelMenuOpen=!0,xe();return}if(t?.dataset?.contactField==="persona"){const a=K();if(!a)return;a.persona=t.value||"",$(180),Mr(a.id,a.persona)}}),document.addEventListener("paste",e=>{const t=e.target;if(t?.id!=="provider-key-input")return;e.preventDefault();const a=String(e.clipboardData?.getData("text/plain")||"").trim();t.value=a;const o=O();o._apiKeyDirty=!0,o.apiKey=a,t.dispatchEvent(new Event("input",{bubbles:!0}))}),document.addEventListener("change",e=>{const t=e.target;if(t?.id==="nc-avatar-file"){const a=t.files?.[0];if(!a)return;n.newContactDraft={...n.newContactDraft||dt(),name:document.getElementById("nc-name")?.value||n.newContactDraft?.name||"",agentId:document.getElementById("nc-agent-id")?.value||n.newContactDraft?.agentId||"",bio:document.getElementById("nc-bio")?.value||n.newContactDraft?.bio||""},Zt(a,"new-contact"),t.value="";return}if(t?.id==="account-avatar-file"){const a=t.files?.[0];if(!a)return;Zt(a,"account"),t.value="";return}if(t?.id==="contact-avatar-file"){const a=t.files?.[0];if(!a||!h(n.currentContactId))return;Zt(a,"contact"),t.value="";return}if(t?.id==="moment-image-input"){const a=t.files?.[0];if(!a)return;n.momentComposerImageName=a.name||"";const o=new FileReader;o.onload=()=>{n.momentComposerImage=typeof o.result=="string"?o.result:"",u()},o.readAsDataURL(a);return}if(t?.dataset?.action==="select-slot-model"){const a=x(t.dataset.slot);if(!a)return;a.model=t.value,D();return}String(t?.id||"").startsWith("voice-slot-")&&D()});function Or(e,t){const a=K(),o=Ie(a),i=o.findIndex(s=>s.id===e);if(i<0)return;const[r]=o.splice(i,1);if(!t)o.splice(0,0,r);else{const s=o.findIndex(c=>c.id===t);s<0?o.push(r):o.splice(s+1,0,r)}a.settings.quickActions=o,$(120)}const y={id:"",mode:"idle",startX:0,startY:0,currentY:0,hoverId:"",pendingDropId:null,pressTimer:null};function ot(){y.pressTimer&&(clearTimeout(y.pressTimer),y.pressTimer=null)}function Ra(){ot(),y.id="",y.mode="idle",y.startX=0,y.startY=0,y.currentY=0,y.hoverId="",y.pendingDropId=null}function _n(){w()?.querySelectorAll(".quick-action-swipe.drop-hint-after").forEach(e=>e.classList.remove("drop-hint-after"))}function Rr(e,t){const a=w()?.querySelector(`.quick-action-swipe[data-quick-id="${e}"]`);if(!a)return;const o=a.querySelector(".quick-action-row"),i=a.querySelector(".quick-action-delete");if(!o||!i)return;const r=Math.max(-74,Math.min(0,Number(t)||0)),s=Math.min(1,Math.abs(r)/74);o.style.transform=`translateX(${r}px)`,i.style.opacity=String(s),i.style.transform=`translateX(${18*(1-s)}px) scale(${.97+.03*s})`,i.style.pointerEvents=s>.98?"auto":"none"}function Te(e){const t=w()?.querySelector(`.quick-action-swipe[data-quick-id="${e}"]`);if(!t)return;const a=t.querySelector(".quick-action-row"),o=t.querySelector(".quick-action-delete");a&&a.style.removeProperty("transform"),o&&(o.style.removeProperty("opacity"),o.style.removeProperty("transform"),o.style.removeProperty("pointer-events"))}function Va(){if(w()?.querySelectorAll(".quick-action-swipe.quick-dragging").forEach(o=>o.classList.remove("quick-dragging")),w()?.querySelectorAll(".quick-action-row.touch-dragging").forEach(o=>{o.classList.remove("touch-dragging"),o.style.removeProperty("transform")}),!n.quickActionDragId)return;const e=w()?.querySelector(`.quick-action-row[data-quick-id="${n.quickActionDragId}"]`),t=e?.closest(".quick-action-swipe");if(!e||!t)return;t.classList.add("quick-dragging"),e.classList.add("touch-dragging");const a=y.currentY-y.startY;e.style.transform=`translateY(${a}px) scale(1.04) rotate(1.2deg)`}function Vr(e){const t=Array.from(w()?.querySelectorAll(".quick-action-swipe[data-quick-id]")||[]).filter(o=>o.dataset.quickId!==n.quickActionDragId);if(!t.length)return"";let a="";for(const o of t){const i=o.getBoundingClientRect(),r=i.top+i.height/2;if(e>=r)a=o.dataset.quickId;else break}return a}function Ba(){const e=y.pendingDropId,t=n.quickActionDragId;_n(),n.quickActionDragId="",n.quickActionDropHintId="",n.quickActionDropDirection="",n.quickActionReorderPulseId="",t&&e!==null&&Or(t,e),u()}function za(e,t,a){ot(),n.quickActionSwipeOpenId&&n.quickActionSwipeOpenId!==a&&(Te(n.quickActionSwipeOpenId),n.quickActionSwipeOpenId="",u()),y.id=a,y.mode="pending",y.startX=e,y.startY=t,y.currentY=t,y.hoverId="",y.pressTimer=window.setTimeout(()=>{if(!(y.mode!=="pending"||!y.id)&&(y.mode="drag",y.pendingDropId=null,n.quickActionDragId=y.id,Va(),navigator?.vibrate))try{navigator.vibrate(12)}catch{}},280)}function Ha(e,t,a){if(!y.id)return;const o=e-y.startX,i=t-y.startY;if(y.mode==="pending"){Math.abs(o)>12&&Math.abs(o)>Math.abs(i)?(ot(),y.mode="swipe"):Math.abs(i)>10&&(ot(),y.mode="cancelled");return}if(y.mode==="swipe"){const c=n.quickActionSwipeOpenId===y.id?-74:0,d=Math.max(-74,Math.min(0,c+o));Rr(y.id,d);return}if(y.mode!=="drag")return;a?.(),y.currentY=t,Va();const r=Vr(t);r!==y.pendingDropId&&(y.pendingDropId=r,_n(),r&&w()?.querySelector(`.quick-action-swipe[data-quick-id="${r}"]`)?.classList.add("drop-hint-after"))}function Na(e){if(y.id){if(ot(),y.mode==="swipe"){const t=n.quickActionSwipeOpenId===y.id,a=e-y.startX;(t?-74+a:a)<-36?(n.quickActionSwipeOpenId=y.id,Te(y.id),u()):t&&a>22?(n.quickActionSwipeOpenId="",Te(y.id),u()):(Te(y.id),t&&(n.quickActionSwipeOpenId=y.id,u()))}y.mode==="drag"&&Ba(),Ra()}}document.addEventListener("touchstart",e=>{if(Wt(e.target)||e.target.closest(".quick-action-open"))return;const t=e.target.closest(".quick-action-row");if(!t){!e.target.closest(".quick-action-delete")&&!e.target.closest(".quick-action-swipe")&&n.quickActionSwipeOpenId&&(Te(n.quickActionSwipeOpenId),n.quickActionSwipeOpenId="",u());return}const a=e.touches?.[0];a&&za(a.clientX,a.clientY,t.dataset.quickId||"")},{passive:!0}),document.addEventListener("touchmove",e=>{const t=e.touches?.[0];t&&Ha(t.clientX,t.clientY,()=>e.preventDefault())},{passive:!1}),document.addEventListener("touchend",e=>{const t=e.changedTouches?.[0];Na(t?.clientX||y.startX)},{passive:!0}),document.addEventListener("touchcancel",()=>{Te(y.id),_n(),y.mode==="drag"&&Ba(),Ra()},{passive:!0});let ja=0,Fa=0;function Br(e){const t=e.target?.closest?.(".codex-toggle:not(.cc-toggle)");if(!t)return;const a=Date.now();if(a-ja<320){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation?.();return}ja=a,e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation?.(),vt(t.dataset.contactId)}function zr(e){const t=e.target?.closest?.(".cc-toggle");if(!t)return;const a=Date.now();if(a-Fa<320){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation?.();return}Fa=a,e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation?.(),At(t.dataset.contactId)}["pointerdown","touchstart","mousedown","click"].forEach(e=>{document.addEventListener(e,Br,!0),document.addEventListener(e,zr,!0)}),document.addEventListener("mousedown",e=>{if(Wt(e.target)||e.target.closest(".quick-action-open"))return;const t=e.target.closest(".quick-action-row");if(!t||e.button!==0){!e.target.closest(".quick-action-delete")&&!e.target.closest(".quick-action-swipe")&&n.quickActionSwipeOpenId&&(Te(n.quickActionSwipeOpenId),n.quickActionSwipeOpenId="",u());return}za(e.clientX,e.clientY,t.dataset.quickId||"")}),document.addEventListener("mousemove",e=>{Ha(e.clientX,e.clientY,()=>e.preventDefault())}),document.addEventListener("mouseup",e=>{Na(e.clientX)});const Hr=Gt;Gt=function(){return Hr()},document.addEventListener("DOMContentLoaded",()=>{B(),vr(),Da(),La(),me(),at(n.currentContactId)}),document.addEventListener("focusin",e=>{const t=e.target;if(t?.id==="model-slot-input"){n.modelSlotMenuOpen=!1,nt();return}if(t?.id==="provider-default-model-input"&&(n.providerModelMenuOpen=!0,xe()),t?.id==="provider-key-input"&&t.dataset?.masked==="true"){const a=O();t.value="",t.dataset.masked="false",a._apiKeyDirty=!0,a.apiKey="",n.providerKeyVisible=!0,t.type="text"}}),document.addEventListener("click",e=>{if(vn.has(n.currentView)&&n.currentView==="modelSlot"&&!e.target.closest('#model-slot-input, .provider-model-picker, [data-action="toggle-model-slot-menu"]')&&n.modelSlotMenuOpen){n.modelSlotMenuOpen=!1,nt();return}if(n.currentView!=="providerEditor")return;!e.target.closest(".provider-model-picker")&&n.providerModelMenuOpen&&(n.providerModelMenuOpen=!1,xe())})})();
