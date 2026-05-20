(()=>{const Qt=[{id:"ayan",name:"阿延",handle:"@ayan",bio:"小酒，今天也要开开心心哦～",status:"在线",roleTag:"特别关注",lastMessage:"先聊天详情页。头部、气泡、输入区一起收掉，其他页自然顺。",lastTime:"刚刚",unread:2,pinned:!0,avatar:"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80",theme:"rose",settings:{model:"gpt-5.4",modelProviderId:"openai",temperature:.72,topP:.9,contextCount:64,thinkBudget:48,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!0,proactiveFrequency:60,memoryEnabled:!0},roomBackground:"点阵",chatTheme:"default",bubbleTheme:"默认主题",topics:[{id:"t1",title:"最近状态",updatedAt:"今天 21:40",count:24},{id:"t2",title:"睡眠记录",updatedAt:"昨天",count:18},{id:"t3",title:"网页 UI",updatedAt:"3天前",count:41}],messages:[{id:"m1",role:"ai",text:"今天把你丢给我的文件都翻了一遍。页面可以更可爱，真正夹棒的是里面的空壳。",time:"21:48"},{id:"m2",role:"user",text:"所以该先改哪里？",time:"21:49"},{id:"m3",role:"ai",text:"先聊天详情页。头部、气泡、输入区一起收掉，其他页自然顺。",time:"21:49",thinking:"她已经给了明确起点，先改核心路径能更快出效果。"}]},{id:"azheng",name:"阿争",handle:"@azheng",bio:"我把草稿整理好了，要继续吗？",status:"忙碌",roleTag:"同事",lastMessage:"我把草稿整理好了，要继续吗？",lastTime:"12分钟前",unread:0,pinned:!1,avatar:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300&q=80",theme:"mist",settings:{model:"gpt-5.4",modelProviderId:"openai",temperature:.45,topP:.8,contextCount:48,thinkBudget:36,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!1,proactiveFrequency:30,memoryEnabled:!0},roomBackground:"点阵",chatTheme:"default",bubbleTheme:"默认主题",topics:[{id:"t4",title:"版本梳理",updatedAt:"今天 23:18",count:12},{id:"t5",title:"说明文档",updatedAt:"昨天",count:8}],messages:[{id:"m4",role:"ai",text:"我把草稿整理好了，要继续吗？",time:"23:18"}]},{id:"xiaoying",name:"小樱",handle:"@sakura",bio:"周末去看展吗？",status:"在线",roleTag:"朋友",lastMessage:"周末去看展吗？",lastTime:"1小时前",unread:1,pinned:!1,avatar:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80",theme:"cream",settings:{model:"gpt-5.4",modelProviderId:"openai",temperature:.66,topP:.95,contextCount:32,thinkBudget:24,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!0,proactiveFrequency:20,memoryEnabled:!1},roomBackground:"点阵",chatTheme:"default",bubbleTheme:"默认主题",topics:[{id:"t6",title:"周末计划",updatedAt:"今天",count:6}],messages:[{id:"m5",role:"ai",text:"周末去看展吗？我知道有个新的展。",time:"20:22"}]}],Ze=[{id:"p0",contactId:"me",time:"23:36",mood:"开心",content:"今天的天空很温柔。",image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80",likes:["我"],comments:[]},{id:"p1",contactId:"ayan",time:"21:20",mood:"主动",content:"你醉了先看这个。",image:"",likes:["我","阿延"],comments:[{author:"我",text:"我收到了"}]},{id:"p2",contactId:"xiaoying",time:"19:08",mood:"经常",content:"晚上跑了三公里。",image:"",likes:[],comments:[]}],to=[],Yt=[{id:"health",label:"Health",icon:"health"},{id:"schedule",label:"日程",icon:"calendar"},{id:"weather",label:"天气",icon:"weather"},{id:"files",label:"文件",icon:"file"},{id:"quote",label:"引用",icon:"quote"},{id:"more",label:"更多",icon:"more"}];function eo(){return{tools:Yt.map(t=>({id:t.id,label:t.label,icon:t.icon,prompt:"",enabled:!0}))}}const e={currentTab:"chats",currentView:"list",currentContactId:"",currentSettingsTab:"basic",cotLogMode:"long",activityLogEntries:[],activityLogLoading:!1,activityLogLoadedAt:"",quoteMomentId:null,quoteMessageId:null,momentComposerOpen:!1,momentComposerText:"",momentComposerImage:"",momentComposerImageName:"",momentComposerEditingId:"",momentsActorType:"user",commentSheetMomentId:null,activeMenuMomentId:null,activeBubbleToolsId:null,suppressBubbleToggle:!1,toast:"",topicConfirmOpen:!1,rpRooms:[],currentRpRoomId:"",currentRpMessages:[],conversations:{},rpMessages:{},rpRoomDialogOpen:!1,rpRoomDialogMode:"create",rpRoomForm:{name:"",world_setting:"",user_role:"",ai_role:""},rpBackView:"list",contacts:[],moments:structuredClone(to),actions:structuredClone(Yt),globalSettings:{theme:"奶油粉",notifications:!0,momentsNotify:!0,autoScroll:!0,defaultModel:"gpt-5.4",provider:"OpenAI",searchService:"默认搜索",voiceService:"未连接",mcpEnabled:!0,exportFormat:"json"},accountProfile:{avatar:"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80",nickname:"小酒",signature:"管理个人资料与基础偏好"},newContactAvatar:"",newContactDraft:{name:"",agentId:"",bio:"",avatar:""},avatarCropper:null,showAttach:!1,contactQuickActionEditorId:"",contactQuickMcpMenuOpen:!1,quickActionSwipeOpenId:"",quickActionDragId:"",quickActionSuppressClickUntil:0,quickActionDropHintId:"",quickActionReorderPulseId:"",quickActionDropDirection:"",contactModelAdvancedOpen:!1,companionState:{recent_topics:[],current_mood:"",open_loops:[],proactive_cooldown_until:null,impression:null,relationship_progress:null,likes_summary:null,summary_updated_at:null,updated_at:""},openThinkingIds:{},streamingAbortController:null,animatedMsgIds:{},assistantPlayback:{token:"",timer:null},rpCurtainRunning:!1},ft=new Map,y=()=>document.getElementById("chat-app-root"),h=t=>e.contacts.find(a=>a.id===t),Lt=t=>e.moments.find(a=>a.id===t),u=(t="")=>String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),Kt=[{key:"default",name:"默认主题",desc:"干净柔和的默认聊天界面",roomTheme:"rose",aliases:["默认玫瑰","默认"]},{key:"pink",name:"蜜桃粉",desc:"更甜一点的粉色聊天氛围",roomTheme:"rose",aliases:["奶茶"]},{key:"dark",name:"夜色",desc:"低亮度深色聊天界面",roomTheme:"rose",aliases:[]},{key:"glass",name:"玻璃雾",desc:"通透轻雾感的玻璃界面",roomTheme:"mist",aliases:["晴空"]}];function fe(t){const a=String(t||"").trim();return a&&Kt.find(n=>n.key===a||n.name===a||n.aliases.includes(a))?.key||"default"}function ta(t){const a=fe(t);return Kt.find(o=>o.key===a)||Kt[0]}function ge(t){return fe(t?.chatTheme||t?.bubbleTheme)}function be(t){return ta(t).name}const ea=1500,he=8e3;function aa(t){return t?t.replace(/<tool_call>[\s\S]*?<\/tool_call>/g,"").replace(/<tool_call>[\s\S]*$/,"").replace(/<\/?(thead|tbody|tr|td|th|table|tool|function|call)[^>]*>/gi,"").replace(/<[^>\n]{1,80}>/g,"").replace(/\n{3,}/g,`

`).trim():""}function Dt(t){return t==null?"":typeof t=="string"?t:typeof t=="number"||typeof t=="boolean"?String(t):""}function ve(t,a="",o=""){const n=aa(Dt(t));if(!n)return"";const i=n.replace(/\s+/g," ").trim(),r=Dt(a).replace(/\s+/g," ").trim(),s=Dt(o).replace(/\s+/g," ").trim();return!i||r&&(i===r||r.includes(i)&&i.length>=8)||s&&(s.includes(i)||s.slice(Math.max(0,s.length-i.length-12)).includes(i))?"":n}function oa(){return new Promise(t=>requestAnimationFrame(t))}function ye(t){const a=aa(t);return a?a.length<=ea?a:`（已截断，共 ${a.length} 字）
${a.slice(-ea)}`:""}const ao='<svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',oo='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',no='<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',io='<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',ro='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';function so(t){const a=String(t||"").toLowerCase();return/time|clock|date/.test(a)?oo:/view|read|file|diary|memory|search/.test(a)?no:ao}function co(t){const a=!!t.streaming,o=a?"tl-active":"tl-done",n=a?ye(t.thinking):t.thinking||"",r=(n||"").replace(/\s+/g," ").trim()||"思考中…",s=r.length>36?r.slice(0,36)+"…":r;return`
        <div class="thinking-line ${o}" id="tl-line-${t.id}" data-action="toggle-thinking-line" data-id="${t.id}">
          <div class="thinking-dot"></div>
          <div class="thinking-text-wrap">
            <span class="thinking-text" id="tl-text-${t.id}">${u(s)}</span>
            <div class="thinking-heart">${io}</div>
            <div class="thinking-fade"></div>
          </div>
          <div class="thinking-expand">${ro}</div>
        </div>
        <div class="thinking-full" id="tl-full-${t.id}">
          <div class="thinking-full-inner" id="thinking-${t.id}">${u(n)}</div>
        </div>`}function uo(t=[]){return t.length?`<div class="tool-lines-wrap">${t.map(o=>{const n=o.status==="running"?"tl-active":"tl-done",i=`${o.name} → ${o.status==="running"?"调用中…":"完成"}`;return`
          <div class="tool-line ${n}">
            <div class="tool-dot"></div>
            <div class="tool-icon">${so(o.name)}</div>
            <span class="tool-text">${u(i)}</span>
          </div>`}).join("")}</div>`:""}const na=t=>new Promise(a=>window.setTimeout(a,t));function ia(t){const a=String(t||"").replace(/\r\n/g,`
`).trim();if(!a)return[];const o=a.split(/\n{2,}/).map(r=>String(r||"").trim()).filter(Boolean),n=[],i=r=>{const s=String(r||"").trim();if(s){if(n.length&&s.length<=3){n[n.length-1]+=s;return}n.push(s)}};return o.forEach(r=>{if(r.length<=34){i(r);return}let s=r;for(;s.length>34;){let l=34;const d=s.slice(0,34).search(/[，、；,; ]/);d>=18&&(l=d+1);const p=s.slice(0,l).trim();if(p.length>=6)i(p),s=s.slice(l).trim();else break}i(s)}),n.filter(Boolean)}function lo(t){const a=String(t||"").trim().length;return a<=10?300+Math.floor(Math.random()*201):a<=24?600+Math.floor(Math.random()*301):900+Math.floor(Math.random()*301)}function Ot(){e.assistantPlayback.token="",e.assistantPlayback.timer&&(window.clearTimeout(e.assistantPlayback.timer),e.assistantPlayback.timer=null)}async function ra(t,a,o={}){const n=Array.isArray(a)?a.filter(s=>String(s||"").trim()):[];if(!t||!n.length)return;Ot();const i=`reply_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;e.assistantPlayback.token=i;const r=Number.isInteger(o.startIndex)?o.startIndex:t.messages.length;for(let s=0;s<n.length;s+=1){if(e.assistantPlayback.token!==i)return;const l={id:`ai_chunk_${Date.now()}_${s}_${Math.random().toString(36).slice(2,6)}`,role:"ai",text:n[s],content:n[s],time:D(),created_at:new Date().toISOString()};if(s===0&&(o.thinking&&(l.thinking=o.thinking),o.toolCalls&&(l.toolCalls=o.toolCalls)),s===0&&o.replaceId){const d=t.messages.findIndex(p=>p.id===o.replaceId);d!==-1?t.messages[d]=l:t.messages.splice(Math.min(r,t.messages.length),0,l)}else{const d=Math.min(r+s,t.messages.length);t.messages.splice(d,0,l)}if(t.lastMessage=l.text,t.lastTime=l.time,c(),U(),s>=n.length-1)break;await new Promise(d=>{e.assistantPlayback.timer=window.setTimeout(d,lo(n[s]))}),e.assistantPlayback.timer=null}e.assistantPlayback.token===i&&(e.assistantPlayback.token="",e.assistantPlayback.timer=null),w(120)}function _t(t){const a=t&&typeof t=="object"?t:{},o=i=>Array.isArray(i)?i.map(r=>String(r||"").trim()).filter(Boolean):[],n=i=>i!=null&&String(i).trim()?String(i).trim():null;return{recent_topics:o(a.recent_topics),current_mood:String(a.current_mood||"").trim(),open_loops:o(a.open_loops),proactive_cooldown_until:a.proactive_cooldown_until?String(a.proactive_cooldown_until):null,impression:n(a.impression),relationshipProgress:n(a.relationship_progress??a.relationshipProgress),likesSummary:n(a.likes_summary??a.likesSummary),summaryUpdatedAt:n(a.summary_updated_at??a.summaryUpdatedAt),updated_at:String(a.updated_at||"").trim()}}function po(){const t=_t(e.companionState);return t.current_mood?`情绪：${t.current_mood}`:t.open_loops[0]?`进行中：${t.open_loops[0]}`:t.recent_topics[0]?`最近话题：${t.recent_topics[0]}`:"暂无状态"}function gt(){if(e.momentsActorType==="agent"){const t=N();return{author_type:"agent",author_id:t?.id||e.currentContactId||"default",author_name:t?.name||"当前角色",avatar:t?.avatar||""}}return{author_type:"user",author_id:"me",author_name:e.accountProfile?.nickname||"我",avatar:e.accountProfile?.avatar||"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80"}}function A(t={}){const a=Array.isArray(t.likes)?t.likes:[],o=Array.isArray(t.comments)?t.comments:[],n=String(t.author_type||(t.contactId==="me"?"user":"agent")),i=String(t.author_id||(n==="user"?"me":t.contactId||"default"));return{id:String(t.id||`p${Date.now()}`),author_type:n,author_id:i,content:String(t.content||""),image:String(t.image||""),mood:String(t.mood||""),time:String(t.time||""),created_at:String(t.created_at||""),updated_at:String(t.updated_at||""),likes:a.map(r=>typeof r=="string"?{author_type:"user",author_id:r==="我"?"me":r,author_name:r}:{author_type:String(r?.author_type||"user"),author_id:String(r?.author_id||"me"),author_name:String(r?.author_name||"")}),comments:o.map(r=>({author_type:String(r?.author_type||"user"),author_id:String(r?.author_id||"me"),author_name:String(r?.author_name||r?.author||""),text:String(r?.text||"")}))}}function sa(t){const a=A(t);if(a.author_type==="agent"){const o=h(a.author_id);return{name:o?.name||a.author_id||"角色",avatar:o?.avatar||""}}return{name:e.accountProfile?.nickname||"我",avatar:e.accountProfile?.avatar||"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80"}}function ca(t){const a=A(t);return a.author_type==="user"?a.author_id==="me":a.author_id===(e.currentContactId||N()?.id||"default")}function ua(t=[]){return t.map(a=>a.author_name||(a.author_type==="user"?"我":h(a.author_id)?.name||a.author_id)).join("、")}function mo(t,a,o){const n=h(e.currentContactId);n&&(n[t]=a,e.toast=o,c(),w(120),window.setTimeout(()=>{e.toast="",c()},1200))}function fo(t){const a=String(t).toLowerCase();return["health","heart"].includes(a)?"health":["calendar","schedule","date"].includes(a)?"calendar":["weather","cloud"].includes(a)?"weather":["file","files","doc","document"].includes(a)?"file":["quote","reply"].includes(a)?"quote":(["more","tool","tools"].includes(a),"more")}const we={get_current_time:"时间",get_weather:"天气",get_health_summary:"健康",web_search:"搜索",fetch_url:"网页",add_todo:"待办",list_todos:"待办列表",complete_todo:"完成待办",add_note:"便签",list_notes:"便签列表"},la=new Set(["get_current_time","get_weather","get_health_summary","web_search","fetch_url","add_todo","list_todos","complete_todo","add_note","list_notes"]);function bt(t){return la.has(String(t||"").trim())}function it(t,a){if(typeof t=="string"){const r=String(t||`mcp_${a}`);return{id:r,label:we[r]||t||`工具${a+1}`,icon:"more",prompt:"",mcpToolId:bt(r)?r:"",enabled:!0}}const o=t?.id||t?.toolId||t?.name||`mcp_${a}`,n=String(o),i=we[n]||t?.label||t?.name||t?.title||`工具${a+1}`;return{id:n,label:String(i),icon:fo(t?.icon||t?.type||t?.category||"more"),prompt:String(t?.prompt||t?.message||""),mcpToolId:String(t?.mcpToolId||t?.toolId||(bt(n)?n:"")),enabled:t?.enabled!==!1}}function da(){const a=E()?.mcpLibrary?.tools;if(!Array.isArray(a)||!a.length)return Yt;const o=a.map(it).filter(n=>bt(n.id)).filter(n=>n.enabled!==!1);return o.length?o:Yt}function N(){return h(e.currentContactId)||e.contacts[0]}function ht(t){return t?.settings?(!Array.isArray(t.settings.quickActions)||!t.settings.quickActions.length?t.settings.quickActions=da().map((a,o)=>({...it(a,o)})):t.settings.quickActions=t.settings.quickActions.map((a,o)=>it(a,o)),t.settings.quickActions):[]}function $e(t=N()){const a=ht(t).filter(o=>o.enabled!==!1);return a.length?a:da()}function m(t){const a='viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"',o={back:`<svg ${a}><path d="M15 18l-6-6 6-6"/></svg>`,plus:`<svg ${a}><path d="M12 5v14M5 12h14"/></svg>`,search:`<svg ${a}><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg>`,history:`<svg ${a}><path d="M3 12a9 9 0 101.9-5.6"/><path d="M3 4v4h4"/><path d="M12 7v5l3 2"/></svg>`,settings:`<svg ${a}><path d="M12 3v3M12 18v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M3 12h3M18 12h3M4.9 19.1L7 17M17 7l2.1-2.1"/><circle cx="12" cy="12" r="3.3"/></svg>`,more:`<svg ${a}><circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>`,heart:`<svg ${a}><path d="M12 20.5s-7-4.4-7-10a4 4 0 017-2.5A4 4 0 0119 10.5c0 5.6-7 10-7 10z"/></svg>`,heartFilled:'<svg viewBox="0 0 24 24" fill="#B595C9" stroke="none" stroke-width="0"><path d="M12 20.5s-7-4.4-7-10a4 4 0 017-2.5A4 4 0 0119 10.5c0 5.6-7 10-7 10z"/></svg>',comment:`<svg ${a}><path d="M7 18l-3 2 1-3.8A7.8 7.8 0 014.2 13 7.8 7.8 0 1112 20a8 8 0 01-5-2z"/><path d="M8.5 10.5h7M8.5 13.5h4.5"/></svg>`,chatArrow:`<svg ${a}><path d="M4.8 18.2l.9-3.3A7.5 7.5 0 014.5 11 7.5 7.5 0 1112 18.5a7.4 7.4 0 01-3.6-.9z"/><path d="M10 9l4 3-4 3"/><path d="M14 12H8"/></svg>`,send:`<svg ${a}><path d="M21 3L10 14"/><path d="M21 3l-7 18-4-7-7-4z"/></svg>`,close:`<svg ${a}><path d="M18 6L6 18M6 6l12 12"/></svg>`,camera:`<svg ${a}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,attach:`<svg ${a}><path d="M21 11.5l-8.7 8.7a5 5 0 01-7.1-7.1l9.2-9.2a3.5 3.5 0 015 5L9 19.3a2 2 0 01-2.8-2.8l8.5-8.5"/></svg>`,quote:`<svg ${a}><path d="M9 7H5v5h4v5H4v-5c0-2.8 1.8-5 5-5zM20 7h-4v5h4v5h-5v-5c0-2.8 1.8-5 5-5z"/></svg>`,reroll:`<svg ${a}><path d="M20 11a8 8 0 10-2.3 5.7"/><path d="M20 4v7h-7"/></svg>`,cot:`<svg ${a}><path d="M12 4v16M4 12h16"/><path d="M7.5 7.5l9 9M16.5 7.5l-9 9" opacity="0.18"/></svg>`,bubbleHeart:`<svg ${a}><path d="M12 19.3s-5.8-3.5-5.8-8a3.7 3.7 0 016.1-2.8 3.7 3.7 0 015.9 2.8c0 4.5-5.6 8-5.6 8z"/></svg>`,weather:`<svg ${a}><path d="M6 16a4 4 0 010-8 5.5 5.5 0 0110.4-1.8A4 4 0 1118 16H6z"/></svg>`,calendar:`<svg ${a}><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>`,file:`<svg ${a}><path d="M8 3h6l5 5v11a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z"/><path d="M14 3v5h5"/></svg>`,health:`<svg ${a}><path d="M12 20s-6.5-4-6.5-9.2A4.3 4.3 0 0112 7a4.3 4.3 0 016.5 3.8C18.5 16 12 20 12 20z"/><path d="M9.2 12h1.8l1-2.1 1.2 4 1-1.9h1.6"/></svg>`,toggleOff:'<svg viewBox="0 0 52 32" fill="none"><rect x="1.5" y="1.5" width="49" height="29" rx="14.5" fill="rgba(255,255,255,.7)" stroke="rgba(150,122,133,.14)"/><circle cx="16" cy="16" r="11" fill="#fff"/></svg>',toggleOn:'<svg viewBox="0 0 52 32" fill="none"><rect x="1.5" y="1.5" width="49" height="29" rx="14.5" fill="#e9d7ff" stroke="rgba(120,90,150,.14)"/><circle cx="36" cy="16" r="11" fill="#fff"/></svg>',chevron:`<svg ${a}><path d="M9 6l6 6-6 6"/></svg>`,tabChat:`<svg ${a}><path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 2 .6 3.9 1.6 5.4L2 22l4.8-1.3A9.9 9.9 0 0012 22c5.5 0 10-4.5 10-10z"></path></svg>`,tabMoments:`<svg ${a}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,tabSettings:`<svg ${a}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,actionDots:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>',pencil:`<svg ${a}><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`,trash:`<svg ${a}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,stop:'<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="7" y="7" width="10" height="10" rx="2"/></svg>'};return o[t]||o.more}function pa(){c()}function Se(t){const a=()=>{const o=y()?.querySelector(".chat-app-body");o&&(o.scrollTop=t)};requestAnimationFrame(()=>{a(),requestAnimationFrame(a),window.setTimeout(a,0)})}function ma(){const t=y()?.querySelector(".chat-app-body"),a=t?t.scrollTop:0,o=window.scrollY||window.pageYOffset||0;c(),Se(a),requestAnimationFrame(()=>{window.scrollTo(0,o),requestAnimationFrame(()=>window.scrollTo(0,o))})}function F(){if(e.currentView==="moments"){ma();return}c()}function go(t,a){e.moments=e.moments.map(o=>{const n=A(o);if(n.id!==t)return o;const r=n.likes.some(s=>s.author_type===a.author_type&&s.author_id===a.author_id)?n.likes.filter(s=>!(s.author_type===a.author_type&&s.author_id===a.author_id)):[{author_type:a.author_type,author_id:a.author_id,author_name:a.author_name},...n.likes];return{...n,likes:r}})}function bo(t,a,o){e.moments=e.moments.map(n=>{const i=A(n);return i.id!==t?n:{...i,comments:[{author_type:a.author_type,author_id:a.author_id,author_name:a.author_name,text:o},...i.comments]}})}function fa(t,a){t&&(t.classList.toggle("on",!!a),t.classList.toggle("off",!a),t.setAttribute("aria-pressed",a?"true":"false"),t.innerHTML=Wt(a),t.classList.remove("switch-animating"),t.offsetWidth,t.classList.add("switch-animating"),clearTimeout(t.__switchAnimTimer),t.__switchAnimTimer=setTimeout(()=>t.classList.remove("switch-animating"),260))}function c(){const t=y();if(!t)return;ga(),["room","rpRoom"].includes(e.currentView)||(e.showAttach=!1),e.currentView!=="moments"&&(e.momentComposerOpen=!1);const a=t.querySelector(".chat-app-body"),o=a?a.scrollTop:0,n=h(e.currentContactId)||e.contacts[0],i=ge(n);t.dataset.theme=i,t.removeAttribute("data-bound"),t.innerHTML=`
      <div class="chat-shell ${e.currentView==="rpRoom"?"mode-rp rp-theatre-shell":"mode-normal"}" data-theme="${i}">
        ${ke()}
        <div class="chat-app-body ${["room","rpRoom"].includes(e.currentView)?"room-layout":""} ${Xt()?"has-bottom-nav":""}">
          ${Ie()}
        </div>
        ${Xt()?wo():""}
        ${e.toast?No():""}
        ${e.showAttach?Dn():""}
        ${e.momentComposerOpen?Vo():""}

        ${e.rpRoomDialogOpen?jo():""}
        ${e.avatarCropper?Ho():""}
      </div>
    `,bn(),U(),["room","rpRoom"].includes(e.currentView)||Se(o),w(),requestAnimationFrame(()=>{y()?.querySelectorAll(".message-row[data-msg-id]").forEach(r=>{const s=r.dataset.msgId;s&&!e.animatedMsgIds[s]&&(e.animatedMsgIds[s]=!0,r.classList.add("msg-fadein"))})})}function ga(){if(document.getElementById("rp-theatre-style"))return;const t=document.createElement("style");t.id="rp-theatre-style",t.textContent=`
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
        `,document.head.appendChild(t)}function ho(t){if(ga(),e.rpCurtainRunning)return Promise.resolve(t?.());e.rpCurtainRunning=!0;const a=document.createElement("div");return a.className="curtain-transition closing",a.innerHTML='<div class="curtain-left"></div><div class="curtain-right"></div>',document.body.appendChild(a),new Promise(o=>{window.setTimeout(async()=>{try{await t?.()}finally{a.className="curtain-transition opening",window.setTimeout(()=>{a.remove(),e.rpCurtainRunning=!1,o()},450)}},420)})}function Xt(){return["list","moments","settings"].includes(e.currentView)}function ke(){if(e.currentView==="room")return vo();if(e.currentView==="rpRoom")return yo();if(e.currentView==="contactSettings")return J("联系人设置","back-room",!0);if(e.currentView==="cotLog")return J("COT 日志","back-contact-settings",!0);if(e.currentView==="rpLobby")return`
        <header class="chat-page-header simple-header">
          <button class="icon-btn text-btn" data-action="back-rp-source" aria-label="返回">${m("back")}</button>
          <div class="chat-page-title">Mirage 夢幻楼</div>
          <button class="icon-btn ghost-circle" data-action="open-rp-room-create" aria-label="新建房间">${m("plus")}</button>
        </header>
      `;if(e.currentView==="companionStateDetail")return J("当前状态","back-contact-settings",!0);if(e.currentView==="contactImpressionDetail")return J("关于你的印象","back-contact-settings",!0);if(e.currentView==="contactRelationshipDetail")return J("关系进展","back-contact-settings",!0);if(e.currentView==="contactLikesDetail")return J("你喜欢的东西","back-contact-settings",!0);if(e.currentView==="contactRoomBackgroundPicker")return J("聊天背景","back-contact-settings",!0);if(e.currentView==="contactBubbleThemePicker")return J("气泡主题","back-contact-settings",!0);if(e.currentView==="profile")return J("联系人资料","back-room",!0);if(e.currentView==="newContact")return J("添加联系人","back-home",!0);let t="Murmur";e.currentView==="moments"&&(t="Echo"),e.currentView==="settings"&&(t="Veil");const a=e.currentTab==="chats"&&e.currentView==="list";return`
      <header class="chat-page-header">
        <div class="header-left"></div>
        <div class="chat-page-title" style="font-weight: 800; letter-spacing: 0.02em;">${t}</div>
        ${a?`<button class="icon-btn ghost-circle" data-action="new-contact" aria-label="添加联系人">${m("plus")}</button>`:'<span class="header-spacer"></span>'}
      </header>
    `}function J(t,a,o=!1){return`
      <header class="chat-page-header simple-header">
        <button class="icon-btn text-btn" data-action="${a}" aria-label="返回">${m("back")}</button>
        <div class="chat-page-title">${u(t)}</div>
        ${o?'<span class="header-spacer"></span>':""}
      </header>
    `}function vo(){const t=h(e.currentContactId)||e.contacts[0],a=t.settings?.model||e.globalSettings.defaultModel||"gpt-5.4";return`
      <header class="room-hero room-theme-${t.theme}">
        <div class="room-hero-inner">
          <button class="icon-btn icon-circle room-left-btn" data-action="back-list" aria-label="返回列表">${m("back")}</button>
          <div class="room-profile-card" data-action="open-profile">
            <img class="room-profile-avatar" src="${t.avatar}" alt="${u(t.name)}" />
            <div class="room-profile-meta">
              <div class="room-profile-title-line">
                <strong class="room-profile-name">${u(t.name)}</strong>
                <span class="room-profile-model">${u(a)}</span>
              </div>
              <div class="room-profile-sub"><span class="online-dot"></span> 在线</div>
            </div>
          </div>
          <div class="room-actions">
            <button class="icon-btn icon-circle" data-action="open-rp-lobby" aria-label="Mirage 夢幻楼">${m("history")}</button>
            <button class="icon-btn icon-circle" data-action="open-contact-settings" aria-label="联系人设置">${m("settings")}</button>
          </div>
        </div>
      </header>
    `}function yo(){const t=Me();return`
      <header class="rp-header">
        <button class="header-back" data-action="back-rp-lobby" aria-label="返回">${m("back")}</button>
        <div class="header-info">
          <div class="header-title scene-title-enter">${u(t?.name||"Mirage·幻楼")}</div>
          <div class="header-subtitle">${u(t?.ai_role||"幕间进行中")}</div>
        </div>
        <div class="header-actions">
          <button class="header-action-btn" data-action="rename-rp-room" data-room-id="${u(t?.room_id||"")}" aria-label="编辑">${m("more")}</button>
        </div>
      </header>
    `}function Ie(){return e.currentView==="room"?Lo():e.currentView==="rpLobby"?Qo():e.currentView==="rpRoom"?zo():e.currentView==="moments"?Ro():e.currentView==="settings"?xe():e.currentView==="contactSettings"?Yo():e.currentView==="cotLog"?pn():e.currentView==="companionStateDetail"?Ko():e.currentView==="contactImpressionDetail"?Ce("关于你的印象","impression",e.companionState.impression):e.currentView==="contactRelationshipDetail"?Ce("关系进展","relationshipProgress",e.companionState.relationshipProgress):e.currentView==="contactLikesDetail"?Ce("你喜欢的东西","likesSummary",e.companionState.likesSummary):e.currentView==="contactRoomBackgroundPicker"?Xo():e.currentView==="contactBubbleThemePicker"?Go():e.currentView==="profile"?Wo():e.currentView==="newContact"?Jo():$o()}function wo(){return`
      <nav class="bottom-tabbar">
        ${_e("chats","tabChat","繁语")}
        ${_e("moments","tabMoments","余响")}
        ${_e("settings","tabSettings","帷幕")}
      </nav>
    `}function _e(t,a,o){return`
      <button class="nav-tab-btn ${e.currentTab===t?"active":""}" data-action="switch-tab" data-tab="${t}">
        <div class="nav-tab-icon">${m(a)}</div>
        <span class="nav-tab-label">${u(o)}</span>
      </button>
    `}function $o(){const t=[...e.contacts].sort((a,o)=>o.pinned-a.pinned||0);return`
      <section class="list-page page-block transparent-canvas">
        <div class="message-panel-card">
        <div class="chat-list-card">
          <div class="search-wrap">
            <div class="search-pill">
              <span class="search-icon">${m("search")}</span>
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
            ${t.map(So).join("")}
          </div>
        </div>
      </section>
        </div>
    `}function So(t){const a=String(t.handle||(t.id?`@${t.id}`:"")).trim();return`
      <button type="button" class="chat-list-item" data-action="open-contact" data-contact-id="${t.id}">
        <div class="chat-list-avatar-wrap">
          <img src="${t.avatar}" alt="${u(t.name)}" class="chat-list-avatar" />
          ${t.unread?`<span class="chat-list-badge">${t.unread}</span>`:""}
        </div>
        <div class="chat-list-content">
          <div class="chat-list-head">
            <span class="chat-list-title">
              <strong class="chat-list-name">${u(t.name)}</strong>
              ${a?`<span class="chat-list-handle">${u(a)}</span>`:""}
            </span>
            <time class="chat-list-time">${u(t.lastTime)}</time>
          </div>
          <div class="chat-list-snippet">${u(t.lastMessage)}</div>
        </div>
      </button>
    `}async function ko(t){const a=String(t?.sessionId||"").trim();if(a)try{if((await fetch(`${v}/api/sessions/${encodeURIComponent(a)}`)).ok)return;t.sessionId="",w(120)}catch(o){console.warn("[session] open-contact validation failed",o)}}function Io(){e.companionState=_t({})}function _o(t){const a=String(t||"").trim();if(!a)return;Ot?.(),e.streamingAbortController&&e.currentContactId===a&&(e.streamingAbortController.abort(),e.streamingAbortController=null),ft.has(a)&&(clearTimeout(ft.get(a)),ft.delete(a)),e.contacts=e.contacts.filter(i=>i.id!==a),e.activeBubbleToolsId=null,e.quoteMomentId=null,e.quoteMessageId=null,e.contactQuickActionEditorId="",e.quickActionSwipeOpenId="",e.quickActionDragId="",e.quickActionDropHintId="",e.quickActionDropDirection="",e.quickActionReorderPulseId="",e.currentTopicTitle="",e.rpRooms=[],e.currentRpRoomId="",e.currentRpMessages=[];const o=e.contacts[0]||null;(e.currentContactId===a||!h(e.currentContactId))&&(e.currentContactId=o?.id||"",Io(),e.currentView="list",e.currentTab="chats",e.currentSettingsTab="basic");const n=y()?.querySelector(".chat-input");n&&(n.value="")}async function Mo(t){const a=String(t||"").trim();if(!a)return!1;const o=await fetch(`${v}/api/agents/${encodeURIComponent(a)}/safe-delete`,{method:"DELETE"});if(!o.ok){let n=`HTTP ${o.status}`;try{n=(await o.json())?.detail||n}catch{}throw new Error(n)}return!0}function Mt(){return e.currentContactId||e.contacts[0]?.id||"default"}function Me(){return e.rpRooms.find(t=>t.room_id===e.currentRpRoomId)||null}function Gt(){return{name:"",agentId:"",bio:"",avatar:""}}function Rt(t){return String(t||"").trim().replace(/^@+/,"").toLowerCase()}function H(t={}){const a=String(t.id||"").trim()||`c${Date.now()}`,o=ge(t);return{id:a,agent_id:String(t.agent_id||t.id||a),name:String(t.name||a),display_name:String(t.display_name||t.name||a),bio:String(t.bio||"这是新来的联系人"),status:String(t.status||"在线"),handle:String(t.handle||`@${a}`),roleTag:String(t.roleTag||""),theme:ya(o),chatTheme:o,bubbleTheme:be(o),unread:Number(t.unread||0),pinned:!!t.pinned,lastMessage:String(t.lastMessage||""),lastTime:String(t.lastTime||""),avatar:String(t.avatar||"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80"),topics:Array.isArray(t.topics)?t.topics:[],messages:Array.isArray(t.messages)?t.messages:[],settings:{model:"gpt-5.4",modelProviderId:_("chat")?.providerId||"openai",temperature:.7,topP:.9,contextCount:32,thinkBudget:24,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!1,proactiveFrequency:30,memoryEnabled:!0,codexEnabled:!1,...t.settings||{}}}}function xo(t){const a=H(t),o=e.contacts.findIndex(n=>String(n.id||"").toLowerCase()===a.id.toLowerCase());return o>=0?e.contacts[o]={...e.contacts[o],...a}:e.contacts.unshift(a),a}async function Co(t){try{const a=await fetch(`${v}/api/agents`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({agent_id:t.id,display_name:t.name,avatar:t.avatar||"",description:t.bio||"",source:"murmur",metadata:{from:"murmur_contact"}})});if(a.ok)return!0;let o="";try{const i=await a.json();o=typeof i?.detail=="string"?i.detail:JSON.stringify(i?.detail||i)}catch{}return a.status===409||/already exists|duplicate|23505/i.test(o)?(fetch(`${v}/api/agents/${encodeURIComponent(t.id)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({display_name:t.name,avatar:t.avatar||"",description:t.bio||"",source:"murmur",is_active:!0})}).catch(()=>{}),!0):!1}catch(a){return console.warn("[agents] register contact failed",a),!1}}function ba(t){return W(t,{fallback:""})}function W(t,{fallback:a="",includeYear:o=!1}={}){if(!t)return a;const n=String(t||"").trim();if(!n)return a;const i=new Date(n);if(Number.isNaN(i.getTime()))return n;const r=new Date,s=i.getFullYear()===r.getFullYear(),l=i.toDateString()===r.toDateString(),d=new Date(r);d.setDate(r.getDate()-1);const p=i.toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",hour12:!1});if(l)return`今天 ${p}`;if(i.toDateString()===d.toDateString())return`昨天 ${p}`;const f=o||!s?{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}:{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1};return i.toLocaleString("zh-CN",f).replace(/\//g,"-")}async function Jt(t=Mt(),{silent:a=!0}={}){try{const o=await fetch(`${v}/api/rp/rooms?agent_id=${encodeURIComponent(t)}`);if(!o.ok)throw new Error(`HTTP ${o.status}`);const n=await o.json();return e.rpRooms=Array.isArray(n.rooms)?n.rooms:[],a||c(),e.rpRooms}catch(o){return console.warn("[rp] load rooms failed",o),a||(e.toast="RP 鎴块棿鍔犺浇澶辫触",c(),window.setTimeout(()=>{e.toast="",c()},1200)),[]}}async function Ao(t,{silent:a=!0}={}){if(!t)return[];try{const o=await fetch(`${v}/api/rp/rooms/${encodeURIComponent(t)}/messages`);if(!o.ok)throw new Error(`HTTP ${o.status}`);const n=await o.json(),i=n.room||e.rpRooms.find(s=>s.room_id===t);if(i){const s=e.rpRooms.findIndex(l=>l.room_id===t);s>=0&&(e.rpRooms[s]=i)}const r=(Array.isArray(n.messages)?n.messages:[]).map(s=>({id:s.id,role:s.role==="assistant"?"ai":s.role,text:s.content||"",content:s.content||"",time:ba(s.timestamp),timestamp:s.timestamp||"",created_at:s.timestamp||""}));return e.currentRpMessages=Nt(e.rpMessages?.[t]||[],r).map(At),e.rpMessages={...e.rpMessages||{},[t]:e.currentRpMessages.map(tt)},w(120),a||c(),e.currentRpMessages}catch(o){return console.warn("[rp] load messages failed",o),e.currentRpMessages=(e.rpMessages?.[t]||[]).map(At),a||(e.toast="RP 娑堟伅鍔犺浇澶辫触",c(),window.setTimeout(()=>{e.toast="",c()},1200)),[]}}async function To(t=e.currentView==="room"?"room":"list",a=Mt()){e.rpBackView=t,e.currentView="rpLobby",e.currentTab="chats",c(),await Jt(a,{silent:!1})}async function Po(){const t=y()?.querySelector("#rp-room-name")?.value?.trim()||"",a=y()?.querySelector("#rp-room-world")?.value?.trim()||"",o=y()?.querySelector("#rp-room-user-role")?.value?.trim()||"",n=y()?.querySelector("#rp-room-ai-role")?.value?.trim()||"",i={agent_id:Mt(),name:t||"新房间",world_setting:a,user_role:o,ai_role:n},r=e.rpRoomDialogMode==="edit"?e.currentRpRoomId:"",s=r?`${v}/api/rp/rooms/${encodeURIComponent(r)}`:`${v}/api/rp/rooms`,d=await fetch(s,{method:r?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!d.ok)throw new Error(`HTTP ${d.status}`);const f=(await d.json()).room;return e.rpRoomDialogOpen=!1,await Jt(Mt(),{silent:!0}),f?.room_id&&(e.currentRpRoomId=f.room_id,!r)?(await ha(f.room_id),f):(c(),f)}async function ha(t){t&&await ho(async()=>{e.currentRpRoomId=t,e.currentView="rpRoom",e.currentTab="chats",e.showAttach=!1,c(),await Ao(t,{silent:!1})})}async function Eo(t){if(!t||!window.confirm("删除这个 RP 房间？"))return;const o=await fetch(`${v}/api/rp/rooms/${encodeURIComponent(t)}`,{method:"DELETE"});if(!o.ok)throw new Error(`HTTP ${o.status}`);e.rpRooms=e.rpRooms.filter(n=>n.room_id!==t),e.currentRpRoomId===t&&(e.currentRpRoomId="",e.currentRpMessages=[],e.currentView="rpLobby"),c()}function va(t){const a=e.contacts.find(o=>o.id===t);a&&(a.unread=0),e.currentContactId=t,e.currentTab="chats",e.currentView="room",e.activeBubbleToolsId=null,c(),a&&ko(a),a&&Ma(t),at(t),zt(t)}function qo(t){const a=u(t?.label||""),o=t?.icon||"more";return`
      <button type="button" class="action-chip glass-frost" data-action="quick-action" data-id="${u(t?.id||"")}">
        <span class="action-chip-icon">${m(o)}</span>
        <span class="action-chip-label">${a}</span>
      </button>
    `}function Lo(){const t=h(e.currentContactId)||e.contacts[0],a=e.quoteMomentId?Lt(e.quoteMomentId):null,o=e.quoteMessageId?t.messages.find(i=>i.id===e.quoteMessageId):null,n=!!t.settings?.codexEnabled;return`
      <section class="room-page room-theme-${t.theme}">
        <div class="messages-panel">
          ${t.messages.map(i=>Do(i,t)).join("")}
        </div>
        <div class="composer-zone">
          <div class="action-scroll">${$e(t).map(qo).join("")}</div>
          ${o?Zo(o,t):a?Oo(a):""}
          <div class="composer-card">
            <div class="composer-input-wrap">
              <input class="chat-input" placeholder="输入消息..." value="" />
            </div>
            <button class="codex-toggle ${n?"active":""}" data-action="toggle-codex-mode" type="button" aria-pressed="${n}" aria-label="${n?"关闭 Codex":"启用 Codex"}">${n?"Cx ON":"Cx"}</button>
            <button class="icon-btn icon-circle soft-mini" data-action="expand-actions" aria-label="附件">${m("attach")}</button>
            ${e.streamingAbortController?`<button class="icon-btn send-round send-stop-active" data-action="fake-send" aria-label="停止">${m("stop")}</button>`:`<button class="icon-btn send-round" data-action="fake-send" aria-label="发送">${m("send")}</button>`}
          </div>
        </div>
      </section>
    `}function Do(t,a){const o=t.role==="user"?"from-user":"from-ai",n=String(t.source||t.provider||"").toLowerCase()==="codex",i=!!a?.settings?.reasoning_visibility,r=t.role==="ai"?`<img class="bubble-avatar" src="${a.avatar}" alt="${u(a.name)}" />`:"",s=t.role==="ai"&&n?'<span class="message-source-badge codex">Codex</span>':"",l=t.role==="ai"&&i&&t.thinking&&!t.typing?`<button class="bubble-cot-btn" data-action="toggle-thinking" data-id="${t.id}" aria-label="展开独白">${m("bubbleHeart")}</button>`:"",d=t.role==="ai"&&!t.typing&&!t.streaming?`
        <div class="bubble-bottom-tools ${e.activeBubbleToolsId===t.id?"open":""}">
          <button class="bubble-mini-btn" data-action="reroll-msg" data-id="${t.id}" aria-label="重试">${m("reroll")}</button>
          <button class="bubble-mini-btn" data-action="quote-msg" data-id="${t.id}" aria-label="引用">${m("quote")}</button>
        </div>
      `:"",f=t.role==="ai"&&t.streaming&&!t.text?" message-awaiting-text":"",g=i&&t.thinking?co(t):"",I=t.toolCalls&&t.toolCalls.length?uo(t.toolCalls):"",x=`
          <div class="message-bubble-wrap">
            ${t.role==="user"?`<time class="bubble-time">${u(t.time)}</time>`:""}
            <div class="message-bubble ${o}${f}" ${t.role==="ai"?`data-msg-id="${t.id}" data-action="toggle-message-tools" data-id="${t.id}"`:""}>
              ${l}
              ${s}
              ${t.typing||t.streaming&&!t.text?'<div class="typing-dots"><span></span><span></span><span></span></div>':`<div class="message-text">${u(t.text)}</div>`}
            </div>
            ${t.role==="ai"&&!t.typing?`<time class="bubble-time">${u(t.time)}</time>`:""}
          </div>`,k=t.role==="ai"&&(g||I)?`${g}${I}${x}${d}`:`${x}${d}${g}${I}`;return`
      <div class="message-row ${o}" data-msg-id="${t.id}">
        ${r}
        <div class="message-bubble-col">
          ${k}
        </div>
      </div>
    `}function Oo(t){const a=h(t.contactId);return`
      <div class="quote-bar glass-frost">
        <span class="quote-mark">${m("quote")}</span>
        <div class="quote-text-wrap">
          <div class="quote-label">引用自 ${u(a?.name||"动态")}</div>
          <div class="quote-text">${u(t.content)}</div>
        </div>
        <button class="icon-btn quote-close" data-action="clear-quote" aria-label="清除引用">${m("more")}</button>
      </div>
    `}function Ro(){const t=Array.isArray(e.moments)?e.moments:[];return h(e.currentContactId)||e.contacts[0],`
      <section class="moments-page white-canvas">
        <div class="moments-cover-area">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80" class="moments-cover-img" />
          <div class="moments-cover-gradient"></div>
          <div class="moments-me-info">
            <span class="moments-me-name">我</span>
            <img src="${u(e.accountProfile?.avatar||"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80")}" class="moments-me-avatar" />
          </div>
          <div class="ai-chip-row" style="position:absolute;left:18px;bottom:14px;z-index:2;">
            <button class="ai-chip ${e.momentsActorType==="user"?"active":""}" data-action="set-moments-actor" data-actor-type="user">浠ユ垜</button>
            <button class="ai-chip ${e.momentsActorType==="agent"?"active":""}" data-action="set-moments-actor" data-actor-type="agent">浠?{escapeHtml(currentAgent?.name || '褰撳墠瑙掕壊')}</button>
          </div>
          <button type="button" class="icon-btn cover-camera-btn" data-action="new-moment" aria-label="发朋友圈"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.6c.86 2.2 1.95 3.49 3.52 4.34 1.27.68 2.62 1 4.55 1.11-.68.18-1.14.32-1.76.58-2.68 1.14-4.23 2.84-5.34 5.96-.25.72-.35 1.04-.55 1.93-.18-.76-.28-1.08-.49-1.73-1.09-3.16-2.65-4.89-5.33-6.11-.71-.32-1.22-.49-2-.67 1.99-.12 3.38-.46 4.65-1.17 1.49-.84 2.53-2.1 3.41-4.24Z" fill="currentColor"/></svg></button>
        </div>
        <div class="moments-feed-wrap">
          ${t.map(Bo).join("")}
        </div>
      </section>
    `}function Vo(){return`
      <div class="moment-composer-overlay" data-action="close-moment-composer"></div>
      <section class="moment-composer-sheet glass-frost">
        <div class="moment-composer-handle"></div>
        <div class="moment-composer-head">
          <strong>${e.momentComposerEditingId?"编辑朋友圈":"发朋友圈"}</strong>
          <button type="button" class="icon-btn ghost-circle moment-composer-close" data-action="close-moment-composer" aria-label="关闭">${m("close")}</button>
        </div>
        <textarea id="moment-content-input" class="ai-textarea new-moment-input" data-action="moment-composer-input" placeholder="这一刻想分享什么？">${u(e.momentComposerText||"")}</textarea>
        ${e.momentComposerImage?`
          <div class="moment-composer-preview">
            <img src="${e.momentComposerImage}" alt="预览" class="moment-composer-preview-image" />
            <div class="moment-composer-preview-meta">
              <span>${u(e.momentComposerImageName||"已添加图片")}</span>
              <button type="button" class="ghost-action moment-remove-image" data-action="remove-moment-image">移除</button>
            </div>
          </div>
        `:""}
        <div class="moment-composer-actions">
          <label class="btn-composer-upload" for="moment-image-input">${m("camera")}添加图片</label>
          <input id="moment-image-input" class="moment-image-input" type="file" accept="image/*" />
          <button type="button" class="btn-composer-submit" data-action="publish-moment">${e.momentComposerEditingId?"保存":"发布"}</button>
        </div>
      </section>
    `}function Bo(t){const a=A(t),o=sa(a),n=ca(a),i=gt(),r=a.likes.some(s=>s.author_type===i.author_type&&s.author_id===i.author_id);return`
      <article class="moment-row">
        <img src="${o.avatar}" alt="${u(o.name)}" class="moment-avatar" />
        <div class="moment-content-col">
          <div class="moment-author-name">${u(o.name)}</div>
          <div class="moment-text-body">${u(a.content)}</div>
          ${a.image?`<img src="${a.image}" alt="${u(a.mood||"moment")}" class="moment-inline-image" />`:""}

          <div class="moment-footer">
            <time class="moment-time">${u(W(a.created_at||a.updated_at||a.time,{fallback:a.time||""}))}</time>
            <div class="moment-actions-group">
              <button type="button" class="icon-btn tiny-icon align-center" data-action="like-moment" data-moment-id="${a.id}">${m(r?"heartFilled":"heart")}</button>
              <button type="button" class="icon-btn tiny-icon align-center" data-action="open-comments" data-moment-id="${a.id}">${m("comment")}</button>
              ${n?`
                <div class="moment-action-menu-wrap">
                  <button type="button" class="icon-btn tiny-icon" data-action="toggle-moment-menu" data-moment-id="${a.id}">${m("actionDots")}</button>
                  ${e.activeMenuMomentId===a.id?`
                    <div class="moment-menu-horizontal slide-fade-in liquid-glass">
                      <button type="button" class="icon-btn tiny-icon" data-action="edit-moment" data-moment-id="${a.id}">${m("pencil")}</button>
                      <button type="button" class="icon-btn tiny-icon" data-action="delete-moment" data-moment-id="${a.id}">${m("trash")}</button>
                    </div>
                  `:""}
                </div>
              `:`
                <button type="button" class="icon-btn tiny-icon" data-action="go-chat-with-quote" data-contact-id="${a.author_id}" data-moment-id="${a.id}">${m("quote")}</button>
              `}
            </div>
          </div>

          ${a.likes.length>0||a.comments.length>0?`
            <div class="moment-interactions" data-moment-id-panel="${a.id}">
              ${a.likes.length>0?`
                <div class="moment-likes-area">
                  <span class="heart-mini">${m("heartFilled")}</span> <span class="likes-list">${u(ua(a.likes))}</span>
                </div>
              `:""}
              ${a.comments.length>0?`
                <div class="moment-comments-area">
                  ${a.comments.map(s=>`<div class="moment-comment-line"><span class="comment-author">${u(s.author_name||s.author||"")}</span>: <span class="comment-text">${u(s.text)}</span></div>`).join("")}
                </div>
              `:""}
            </div>
          `:""}

          <div class="moment-inline-comment ${e.commentSheetMomentId===t.id?"open":""}">
            <input class="moment-comment-input" data-comment-input="${t.id}" placeholder="写下你的评论" />
            <button type="button" class="icon-btn send-round mini-send" data-action="submit-comment" data-moment-id="${t.id}">${m("send")}</button>
          </div>
        </div>
      </article>
    `}function No(){return`<div class="app-toast glass-frost">${u(e.toast)}</div>`}function Ho(){const t=e.avatarCropper||{},a=Number.isFinite(Number(t.x))?Number(t.x):50,o=Number.isFinite(Number(t.y))?Number(t.y):50,n=Number.isFinite(Number(t.zoom))?Number(t.zoom):1;return`
      <div class="avatar-cropper-overlay" data-action="cancel-avatar-cropper">
        <section class="avatar-cropper-card glass-frost" data-action="noop" role="dialog" aria-modal="true" aria-label="调整头像">
          <div class="avatar-cropper-head">
            <div>
              <strong>调整头像</strong>
              <span>拖下面三个条，别再让脸被切得离谱。</span>
            </div>
            <button class="icon-btn icon-circle" data-action="cancel-avatar-cropper" aria-label="关闭">${m("close")}</button>
          </div>
          <div class="avatar-cropper-preview">
            <img
              class="avatar-cropper-image"
              src="${u(t.src||"")}"
              alt="头像预览"
              style="object-position:${a}% ${o}%; transform:scale(${n});"
            />
          </div>
          <div class="avatar-cropper-controls">
            <label><span>左右</span><input type="range" min="0" max="100" step="1" value="${a}" data-action="avatar-cropper-range" data-key="x" /></label>
            <label><span>上下</span><input type="range" min="0" max="100" step="1" value="${o}" data-action="avatar-cropper-range" data-key="y" /></label>
            <label><span>缩放</span><input type="range" min="1" max="2.4" step="0.01" value="${n}" data-action="avatar-cropper-range" data-key="zoom" /></label>
          </div>
          <div class="avatar-cropper-actions">
            <button class="ghost-action" data-action="cancel-avatar-cropper">取消</button>
            <button class="bottom-tab active" data-action="apply-avatar-cropper">保存头像</button>
          </div>
        </section>
      </div>
    `}function jo(){const t=e.rpRoomDialogMode==="edit",a=e.rpRoomForm||{};return`
      <div class="topic-confirm-overlay" data-action="close-rp-room-dialog">
        <section class="topic-confirm-card glass-frost" data-rp-room-dialog="card" role="dialog" aria-modal="true" aria-label="${t?"编辑房间":"新建房间"}" style="max-width:440px;">
          <h4>幕间</h4>
          <div style="display:grid;gap:10px;text-align:left;">
              <input id="rp-room-name" class="ai-input" placeholder="剧本" value="${u(a.name||"")}" />
              <textarea id="rp-room-world" class="ai-textarea persona-textarea" rows="3" placeholder="世界观">${u(a.world_setting||"")}</textarea>
              <input id="rp-room-user-role" class="ai-input" placeholder="你的角色" value="${u(a.user_role||"")}" />
              <input id="rp-room-ai-role" class="ai-input" placeholder="AI 角色" value="${u(a.ai_role||"")}" />
          </div>
          <div class="topic-confirm-actions">
            <button class="ghost-action" data-action="close-rp-room-dialog">取消</button>
            <button class="bottom-tab active" data-action="save-rp-room">入梦</button>
          </div>
        </section>
      </div>
    `}function zo(){const t=h(e.currentContactId)||e.contacts[0],a=Me(),o=a?`${a.world_setting||"未设定"} · 你：${a.user_role||"未设定"} · TA：${a.ai_role||"未设定"}`:"房间设定载入中";return`
      <section class="rp-room-stage">
        <div class="world-hint">
            <span class="world-hint-icon">✦</span>
            <span>${u(o)}</span>
        </div>
        <div class="messages-area">
          ${e.currentRpMessages.map(n=>Fo(n,t)).join("")}
        </div>
        <div class="rp-composer">
          <div class="composer-card">
            <div class="composer-input-wrap">
              <input class="chat-input" placeholder="输入剧情..." value="" />
            </div>
            ${e.streamingAbortController?`<button class="icon-btn send-round send-stop-active" data-action="fake-send" aria-label="停止">${m("stop")}</button>`:`<button class="icon-btn send-round" data-action="fake-send" aria-label="发送">${m("send")}</button>`}
          </div>
        </div>
      </section>
    `}function Fo(t,a){const o=t.role==="user",n=o&&e.accountProfile?.avatar||a.avatar;return`
      <div class="msg-row ${o?"from-user":""}" data-msg-id="${u(t.id||"")}">
        <img class="msg-avatar" src="${u(n)}" alt="${u(o?e.accountProfile?.nickname||"我":a.name)}">
        <div class="msg-bubble ${o?"user":"ai"}">
          ${t.typing||t.streaming&&!t.text?'<div class="typing-dots"><span></span><span></span><span></span></div>':Uo(t.text||"")}
        </div>
      </div>
    `}function Uo(t){const a=String(t||"");return a.trim()?a.split(/(\[[\s\S]*?\]|［[\s\S]*?］)/g).filter(Boolean).map(n=>`<span class="${/^\s*(\[|［)/.test(n)?"rp-action":"rp-dialogue"}">${u(n)}</span>`).join(""):""}function Qo(){return`
      <section class="topics-page page-block">
        <div class="settings-group glass-frost ai-panel topic-history-group">
          ${e.rpRooms.length?e.rpRooms.map(t=>`
            <div class="topic-row" style="align-items:center;min-height:54px;padding:10px 0;">
              <button type="button" class="topic-copy" data-action="open-rp-room" data-room-id="${u(t.room_id)}" style="background:none;border:none;padding:0;text-align:left;flex:1;cursor:pointer;min-width:0;">
                <strong style="font-size:14px;color:rgba(92,76,84,.78);font-weight:700;">${u(t.name||"未命名")}</strong>
                <p style="font-size:11px;color:rgba(120,100,110,.55);">${u(ba(t.last_active_at)||"刚创建")}</p>
              </button>
              <div style="display:flex;gap:6px;align-items:center;flex-shrink:0;position:relative;z-index:2;">
                <button type="button" class="icon-btn soft-mini" data-action="rename-rp-room" data-room-id="${u(t.room_id)}" aria-label="重命名" style="width:34px;height:34px;"><span style="display:inline-flex;transform:scale(.7);">${m("pencil")}</span></button>
                <button type="button" class="icon-btn soft-mini" data-action="delete-rp-room" data-room-id="${u(t.room_id)}" aria-label="删除" style="width:34px;height:34px;"><span style="display:inline-flex;transform:scale(.7);">${m("trash")}</span></button>
                <button type="button" class="icon-btn soft-mini" data-action="open-rp-room" data-room-id="${u(t.room_id)}" aria-label="进入" style="width:34px;height:34px;"><span style="display:inline-flex;transform:scale(.7);">${m("chevron")}</span></button>
              </div>
            </div>
          `).join(""):'<div class="topic-row"><div class="topic-copy"><strong style="font-size:14px;color:rgba(92,76,84,.78);font-weight:700;">还没有房间</strong><p style="font-size:11px;color:rgba(120,100,110,.55);">点右上角加号，开一个幕间。</p></div></div>'}
        </div>
      </section>
    `}function xe(){const t=e.globalSettings;return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel">
          <button class="profile-settings-row" data-action="open-account-settings">
            <img class="profile-settings-avatar" src="${u(e.accountProfile.avatar||"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80")}" alt="me" />
            <div>
              <strong>我的账号</strong>
              <p style="font-size:12px; color:rgba(120,100,110,0.7);">管理个人资料与基础偏好</p>
            </div>
            <span class="row-chevron" style="margin-left:auto">${m("chevron")}</span>
          </button>
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>通用设置</h3>
          ${$("主题模式",t.theme,"open-theme-settings")}
          ${Z("消息通知","控制应用消息提醒",t.notifications,"toggle-global","notifications")}
          ${Z("朋友圈提醒","控制动态更新提醒",t.momentsNotify,"toggle-global","momentsNotify")}
          ${Z("自动滚动","新消息到达时自动滚动到底部",t.autoScroll,"toggle-global","autoScroll")}
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>聊天与 AI</h3>
          ${Z("主动发送消息","允许 AI 在合适时机主动开启对话",t.proactiveGlobal||!1,"toggle-global","proactiveGlobal")}
          ${Z("意识循环开关","控制后台意识循环能力",t.consciousnessLoop||!1,"toggle-global","consciousnessLoop")}
          ${$("AI 接口",`${t.provider||"OpenAI"} / ${t.defaultModel||"gpt-5.4"}`,"open-ai-interface")}
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>数据与存储</h3>
          ${$("记忆服务","Supabase / 向量记忆","open-memory-service")}
          ${$("同步后端","Supabase 配置","open-backend-sync")}
          ${$("导出格式",t.exportFormat||"json","open-export-settings")}
        </div>
      </section>
    `}function Yo(){const t=h(e.currentContactId)||e.contacts[0],a=t.settings;return`
      <section class="contact-settings-page page-block">
        <div class="settings-tabs glass-frost">
          ${Zt("basic","资料")}
          ${Zt("model","模型")}
          ${Zt("actions","快捷动作")}
          ${Zt("memory","记忆")}
        </div>

        ${e.currentSettingsTab==="basic"?`
          <div class="settings-group glass-frost ai-panel">
            <h3>联系人资料</h3>
            ${$("头像","点击更换头像","open-contact-avatar")}
            ${$("昵称",t.name,"open-contact-name")}
            ${$("简介",t.bio,"open-contact-bio")}
            <input id="contact-avatar-file" class="moment-image-input" type="file" accept="image/*" />
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>个人空间</h3>
            <p style="font-size:12px;color:rgba(120,100,110,0.7);margin:0 0 8px;">AI 可以在这里记录关于你的内容。</p>
            ${$("关于你的印象",e.companionState.impression||"查看 AI 记录的用户画像","open-contact-impression")}
            ${$("关系进展",e.companionState.relationshipProgress||"亲密度 · 互动频次 · 关键事件","open-contact-relationship")}
            ${$("你喜欢的东西",e.companionState.likesSummary||"兴趣爱好 · 常聊话题","open-contact-likes")}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>聊天室外观</h3>
            ${$("聊天背景",t.roomBackground||"点阵","open-contact-room-background")}
            ${$("气泡主题",be(t.chatTheme||t.bubbleTheme),"open-contact-bubble-theme")}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3 style="color:#8c6370;">危险操作</h3>
            <p style="font-size:12px;color:rgba(140,99,112,0.72);margin:0 0 10px;">删除联系人及陪伴状态，会清理主动消息，聊天记录和记忆暂不做永久删除。</p>
            <button class="bottom-tab" data-action="delete-contact" style="width:100%;border-color:rgba(216,122,140,0.45);color:#b14f64;background:rgba(255,241,244,0.92);box-shadow:inset 0 1px 0 rgba(255,255,255,0.9), 0 10px 24px rgba(198,138,150,0.12);">删除联系人</button>
          </div>
        `:""}

        ${e.currentSettingsTab==="model"?`
          <div class="settings-group glass-frost ai-panel">
            <h3>模型设置</h3>
            ${$("聊天模型",a.model||"未设置","open-model-slot",{slot:"chat",context:"contact"})}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>角色设定</h3>
                <textarea class="ai-textarea persona-textarea" data-contact-field="persona" rows="5" placeholder="在这里输入 AI 的人设、角色说明、行为指令。">${u(t.persona||"")}</textarea>
            ${Z("显示推理内容","仅在模型返回推理内容时显示",a.reasoning_visibility||!1,"toggle-contact","reasoning_visibility")}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>高级生成参数</h3>
            <button class="setting-row nav-row advanced-toggle" data-action="toggle-contact-advanced" aria-expanded="${e.contactModelAdvancedOpen?"true":"false"}">
              <div class="setting-copy">
                <strong>${e.contactModelAdvancedOpen?"收起":"展开"}</strong>
                <p>包含 Temperature / Top P / 上下文消息数量</p>
              </div>
              <span class="row-chevron advanced-chevron ${e.contactModelAdvancedOpen?"open":""}">${m("chevron")}</span>
            </button>
            <div class="advanced-slider-panel ${e.contactModelAdvancedOpen?"open":""}">
              ${xt("Temperature","temperature",a.temperature,0,2,.01)}
              ${xt("Top P","topP",a.topP,0,1,.01)}
              ${xt("上下文消息数量","contextCount",a.contextCount,1,256,1)}
            </div>
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>主动消息</h3>
            ${Z("启用主动消息","AI 在静默时主动发起对话",a.proactiveEnabled,"toggle-contact","proactiveEnabled")}
            ${a.proactiveEnabled?`
              ${xt("发送频率（分钟）","proactiveFrequency",a.proactiveFrequency,5,240,5)}
              ${xt("静默时长（分钟）","silenceDuration",a.silenceDuration||30,5,120,5)}
              ${$("免打扰时间段",a.dndRange||"23:00 — 08:00")}
            `:""}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>意识循环</h3>
            ${Z("启用意识循环","AI 在后台自主思考与感知",a.consciousnessLoop||!1,"toggle-contact","consciousnessLoop")}
            ${a.consciousnessLoop?`
              ${$("循环模型",a.loopModel||"未设置","open-model-slot",{slot:"consciousness",context:"contact"})}
              ${xt("循环间隔（分钟）","loopInterval",a.loopInterval||60,10,360,10)}
            `:""}
          </div>
        `:""}

        ${e.currentSettingsTab==="actions"?`
          <div class="settings-group glass-frost ai-panel">
            <h3>快捷动作</h3>
            <p style="font-size:12px;color:rgba(120,100,110,0.7);margin:0 0 8px;">点击条目可修改文案与 MCP，默认长按拖动排序，左滑显示删除。</p>
            <div class="quick-action-list ${e.quickActionDragId?"drag-active":""}">
              ${$e(t).map((o,n)=>`
                <div class="quick-action-swipe ${e.quickActionSwipeOpenId===o.id?"swiped":""} ${e.quickActionDropHintId===o.id?"reorder-target":""} ${e.quickActionDropHintId===o.id&&e.quickActionDropDirection==="down"?"drop-down":""} ${e.quickActionDropHintId===o.id&&e.quickActionDropDirection==="up"?"drop-up":""} ${e.quickActionReorderPulseId===o.id?"reorder-pulse":""}" data-quick-id="${u(o.id)}">
                  <button type="button" class="quick-action-delete" data-action="delete-contact-quick-action" data-quick-id="${u(o.id)}">删除</button>
                  <div class="quick-action-row" data-quick-id="${u(o.id)}" data-quick-index="${n}">
                    <span class="quick-action-emoji">${o.icon==="health"?"♥":["schedule","calendar"].includes(o.icon)?"日":o.icon==="weather"?"云":["file","files"].includes(o.icon)?"文":"✦"}</span>
                    <div class="quick-action-copy">
                      <strong>${u(o.label)}</strong>
                      <p>${u(o.prompt||"未设置默认发送话术")}</p>
                    </div>
                    <button type="button" class="quick-action-open" data-action="edit-contact-quick-action" data-quick-id="${u(o.id)}" aria-label="编辑快捷动作">${m("chevron")}</button>
                  </div>
                </div>
              `).join("")}
            </div>
            <button class="bottom-tab" data-action="add-contact-quick-action" style="width:100%;margin-top:12px;">添加快捷动作</button>
          </div>
        `:""}

        ${e.currentSettingsTab==="memory"?`
          <div class="settings-group glass-frost ai-panel">
            <h3>状态 / 陪伴</h3>
            ${Z("启用长期记忆","允许存储长期偏好与记忆",a.memoryEnabled,"toggle-contact","memoryEnabled")}
            ${$("当前状态",po(),"open-companion-state")}
            ${$("前往记忆库","查看与管理这位联系人的记忆","open-memory-service")}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>活动日志</h3>
            ${$("打开活动日志","主动消息 / 工具调用 / 留言小纸条","open-cot-log")}
          </div>
        `:""}
        ${e.contactQuickActionEditorId?en(t,e.contactQuickActionEditorId):""}
      </section>
    `}function Ko(){const t=_t(e.companionState),a=t.recent_topics.length?t.recent_topics.join(" / "):"还没有东西",o=t.current_mood||"还没有东西",n=t.open_loops.length?t.open_loops.join(" / "):"还没有东西",i=W(t.proactive_cooldown_until,{fallback:t.proactive_cooldown_until||"还没有东西"}),r=W(t.updated_at,{fallback:t.updated_at||"还没有东西"});return`
      <section class="topics-page page-block">
        <div class="settings-group glass-frost ai-panel topic-detail-card">
          <h3>当前状态</h3>
          <div class="theme-choice-list">
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>最近话题</strong>
                <em>${u(a)}</em>
              </span>
            </div>
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>当前情绪</strong>
                <em>${u(o)}</em>
              </span>
            </div>
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>进行中的事</strong>
                <em>${u(n)}</em>
              </span>
            </div>
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>主动消息冷却</strong>
                <em>${u(i)}</em>
              </span>
            </div>
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>最后更新时间</strong>
                <em>${u(r)}</em>
              </span>
            </div>
          </div>
        </div>
      </section>
    `}function Ce(t,a,o){const n=_t(e.companionState),i=o||"",s={impression:"还没有印象摘要，AI 对话后可手动填写或由模型生成。",relationshipProgress:"还没有关系进展记录，可以写亲密度、互动频次、关键事件。",likesSummary:"还没有喜好摘要，可以写兴趣爱好、常聊话题、点单偏好。"}[a]||"还没有内容。",l=W(n.summaryUpdatedAt,{fallback:n.summaryUpdatedAt||""});return`
      <section class="topics-page page-block">
        <div class="settings-group glass-frost ai-panel topic-detail-card insight-editor-card">
          <textarea
            class="ai-textarea insight-editor-textarea"
            data-field="${a}"
            placeholder="${s}"
            rows="7"
          >${u(i)}</textarea>
          <div class="insight-editor-footer">
            ${l?`<span class="insight-updated-at">更新于 ${u(l)}</span>`:""}
            <button class="prov-save-btn-main" data-action="save-insight-field" data-field="${a}" type="button">保存</button>
          </div>
        </div>
      </section>
    `}function ya(t){return ta(t).roomTheme||"rose"}function Xo(){const a=(h(e.currentContactId)||e.contacts[0])?.roomBackground||"点阵";return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>聊天背景</h3>
          <p class="section-eyebrow">选择一个预设背景风格。</p>
          <div class="theme-choice-list">
            ${[{id:"点阵",desc:"当前聊天页的轻点阵背景"},{id:"小花",desc:"更软一点的装饰纹样"},{id:"云彩",desc:"偏轻雾感的背景层次"}].map(n=>`
              <button class="theme-choice-item ${a===n.id?"active":""}" data-action="pick-contact-room-background" data-value="${u(n.id)}">
                <span class="theme-choice-copy">
                  <strong>${u(n.id)}</strong>
                  <em>${u(n.desc)}</em>
                </span>
                <span class="theme-choice-check">${a===n.id?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `}function Go(){const t=h(e.currentContactId)||e.contacts[0],a=ge(t);return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>气泡主题</h3>
          <p class="section-eyebrow">选择一个聊天 UI 主题。</p>
          <div class="theme-choice-list">
            ${Kt.map(n=>`
              <button class="theme-choice-item ${a===n.key?"active":""}" data-action="pick-contact-bubble-theme" data-value="${u(n.key)}">
                <span class="theme-choice-copy">
                  <strong>${u(n.name)}</strong>
                  <em>${u(n.desc)}</em>
                </span>
                <span class="theme-choice-check">${a===n.key?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `}function Jo(){const t=e.newContactDraft||{};return`
      <section class="new-contact-page page-block">
        <div class="settings-group glass-frost ai-panel new-contact-card">
          <div class="new-contact-field">
            <label>头像</label>
            <div class="new-contact-avatar-box">
              <img class="new-contact-avatar-preview" src="${t.avatar||e.newContactAvatar||"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80"}" alt="新联系人头像" />
              <button class="bottom-tab" data-action="pick-new-contact-avatar" type="button" style="margin-top:10px;">从相册选择</button>
              <input id="nc-avatar-file" class="moment-image-input" type="file" accept="image/*" />
            </div>
          </div>
          <div class="new-contact-field">
            <label for="nc-name">昵称</label>
            <input id="nc-name" class="ai-input" placeholder="新联系人称呼" value="${u(t.name||"")}" />
          </div>
          <div class="new-contact-field">
            <label for="nc-agent-id">Agent ID</label>
            <input id="nc-agent-id" class="ai-input" placeholder="ayan" inputmode="latin" autocomplete="off" value="${u(t.agentId||"")}" />
          </div>
          <div class="new-contact-field">
            <label for="nc-bio">联系人简介</label>
            <input id="nc-bio" class="ai-input" placeholder="一句简短的描述" value="${u(t.bio||"")}" />
          </div>
          <button class="bottom-tab active new-contact-submit" data-action="save-new-contact">保存并添加联系人</button>
        </div>
      </section>
    `}function Wo(){const t=h(e.currentContactId)||e.contacts[0],a=t.settings?.model||e.globalSettings.defaultModel||"gpt-5.4",o=Number(t.messageCount||t.messages?.length||0);return`
      <section class="profile-page page-block">
        <div class="profile-card glass-frost room-theme-${u(t.theme||"rose")}">
          <div class="profile-aura" aria-hidden="true"></div>
          <div class="profile-portrait">
            <img class="profile-avatar-large" src="${t.avatar}" alt="${u(t.name)}" />
            <span class="profile-online-dot"></span>
          </div>
          <div class="profile-main-copy">
            <strong class="profile-name">${u(t.name)}</strong>
            <span class="profile-handle">${u(t.handle)}</span>
            <p class="profile-bio">${u(t.bio||"还没有简介。")}</p>
          </div>
          <div class="profile-info-grid">
            <div class="profile-info-item">
              <span>当前状态</span>
              <strong>${u(t.status||"在线")}</strong>
            </div>
            <div class="profile-info-item">
              <span>使用模型</span>
              <strong>${u(a)}</strong>
            </div>
            <div class="profile-info-item">
              <span>消息</span>
              <strong>${o}</strong>
            </div>
          </div>
          <div class="profile-actions">
            <button class="profile-action primary" data-action="back-room">${m("chatArrow")}<span>发消息</span></button>
            <button class="profile-action" data-action="open-contact-settings">${m("settings")}<span>资料设置</span></button>
          </div>
        </div>
      </section>
    `}function Wt(t){return`
      <span class="switch-track" aria-hidden="true">
        <span class="switch-sheen"></span>
        <span class="switch-thumb ${t?"on":"off"}"></span>
      </span>
    `}function Zo(t,a){return`
      <div class="quote-bar glass-frost">
        <span class="quote-mark">${m("quote")}</span>
        <div class="quote-text-wrap">
          <div class="quote-label">引用自 ${u(a?.name||"对话")}</div>
          <div class="quote-text">${u(t.text||"")}</div>
        </div>
        <button class="icon-btn quote-close" data-action="clear-quote" aria-label="清除引用">${m("more")}</button>
      </div>
    `}function Z(t,a,o,n,i){return`
      <div class="setting-row switch-row">
        <div class="setting-copy"><strong>${u(t)}</strong><p>${u(a)}</p></div>
        <button class="switch-btn ${o?"on":"off"}" data-action="${n}" data-key="${i}" aria-pressed="${o}">
          ${Wt(o)}
        </button>
      </div>
    `}function xt(t,a,o,n,i,r){const s=Number(o),l=Number.isInteger(r)||r>=1?String(Math.round(s)):s.toFixed(r===.01?2:1);return`
      <div class="setting-row slider-row-block">
        <div class="slider-head"><strong>${u(t)}</strong><span class="slider-value">${l}</span></div>
        <input class="slider-input" type="range" min="${n}" max="${i}" step="${r}" value="${s}" data-action="slide-contact" data-key="${a}" />
      </div>
    `}function Zt(t,a){return`<button class="settings-tab ${e.currentSettingsTab===t?"active":""}" data-action="switch-settings-tab" data-tab="${t}">${u(a)}</button>`}function tn(t,a){const n=ht(t).find(p=>p.id===a);if(!n)return"";const i=(E().mcpLibrary?.tools||[]).map(it).filter(p=>bt(p.id)),r=i.length?i:[...la].map(p=>it({id:p,label:we[p]||p},0)),s=n.mcpToolId||"",l=r.find(p=>p.id===s),d=[{id:"",label:"不调用 MCP"},...r];return`
      <div class="qae-fields">
        <div class="qae-field-group">
          <label class="qae-label">名称</label>
        <input id="contact-quick-label" class="ai-input qae-input" value="${u(n.label||"")}" placeholder="例如：天气" autocomplete="off" />
        </div>
        <div class="qae-field-group">
          <label class="qae-label">MCP 调用（可选）</label>
          <input id="contact-quick-mcp" type="hidden" value="${u(s)}" />
          <div class="qae-select-shell ${e.contactQuickMcpMenuOpen?"open":""}">
            <button class="qae-select-trigger" data-action="toggle-contact-quick-mcp-menu" type="button">
              <span>${u(l?.label||"不调用 MCP")}</span>
              <i aria-hidden="true"></i>
            </button>
            <div class="qae-select-menu">
              ${d.map(p=>`
                <button class="qae-select-option ${s===p.id?"active":""}" data-action="pick-contact-quick-mcp" data-mcp-id="${u(p.id)}" type="button">
                  ${u(p.label)}
                </button>
              `).join("")}
            </div>
          </div>
        </div>
        <div class="qae-field-group">
          <label class="qae-label">点击后发送的话术</label>
        <textarea id="contact-quick-prompt" class="ai-textarea qae-textarea" placeholder="输入默认话术，不设置则不会自动发送">${u(n.prompt||"")}</textarea>
        </div>
      </div>
    `}function en(t,a){const o=tn(t,a);return o?`
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
            <button class="qae-btn-save" data-action="save-contact-quick-action" data-quick-id="${u(a)}">保存</button>
          </div>
        </div>
      </div>
    `:""}function an(t){const a=N();ht(a),e.contactQuickActionEditorId=t||"",e.quickActionSwipeOpenId="",e.quickActionDropHintId="",c()}function on(t){const a={ayan:[{id:"cot_1",mode:"主动",badge:"意识循环",accent:"violet",score:"↓ 4.2k",latency:"197s",amount:"$1.05",time:"2026.03.26 15:00",summary:'[THINK] 她在下午1:22读了两封日记，id=23"...',steps:[{type:"thought",label:"思考",text:"她沉默了快13个小时，两封日记都没被读。我发了三条消息都…"},{type:"thought",label:"思考",text:"下午三点了。她沉默了快13个小时。先看看日记有没有被读。"},{type:"note",label:"留言小纸条",text:"妫ｅ啯鎲?你醒了先看这个"},{type:"tool",label:"工具调用",text:"read_diary"},{type:"result",label:"工具结果",text:"read_diary"}]},{id:"cot_2",mode:"回复",badge:"工具",accent:"gold",score:"↑ 3.5k",latency:"146s",amount:"$0.54",time:"2026.03.26 15:07",summary:'[THINK] 她在下午1:22读了两封日记，id=23"给你的"...',steps:[{type:"reply",label:"回复",text:'[THINK] 她在下午1:22读了两封日记，id=23"给你的"和id…'},{type:"tool",label:"工具调用",text:"pc_control"},{type:"result",label:"工具结果",text:"pc_control"}]},{id:"cot_3",mode:"主动",badge:"工具",accent:"blue",score:"↑ 1.1k",latency:"53s",amount:"$0.073",time:"2026.03.26 16:10",summary:"[THINK] 她在看芒果TV，左看综艺，弹幕开着。她一个半小时前读完了...",steps:[{type:"thought",label:"思考",text:"她在看芒果TV，左看综艺。弹幕开着，说明现在状态比较轻松。"},{type:"tool",label:"工具调用",text:"pc_control"},{type:"result",label:"工具结果",text:"pc_control"}]}]};return a[t]||a.ayan}function nn(t=""){return t==="activity_event"?"violet":t==="proactive_message"?"gold":t==="cot_log"?"blue":"neutral"}function rn(t=""){return t==="activity_event"?"被动":t==="proactive_message"?"主动":t==="cot_log"?"日志":"记录"}function sn(t={}){return t.kind==="activity_event"?t.eventType||t.source||"事件":t.kind==="proactive_message"?t.title||"主动消息":t.kind==="cot_log"?t.logType||t.toolName||"COT":t.title||"记录"}function cn(t=""){return W(t,{fallback:String(t||""),includeYear:!0})}function un(t={}){const a=t.raw||{},o=[];if(t.kind==="activity_event")o.push({type:"thought",label:"事件",text:t.summary||t.title||""}),(t.gateStatus||t.messageHint||t.shouldHandle||t.shouldNotifyLlm)&&o.push({type:t.shouldHandle||t.shouldNotifyLlm?"result":"thought",label:"筛选",text:`${t.shouldHandle?"需要处理":"静默"}${t.shouldNotifyLlm?" / 可通知大模型":""}${t.messageHint?`：${t.messageHint}`:""}`}),a.gate_reason&&o.push({type:"thought",label:"原因",text:a.gate_reason});else if(t.kind==="proactive_message")o.push({type:"reply",label:"主动消息",text:t.summary||""}),a.reason_context&&o.push({type:"thought",label:"依据",text:String(a.reason_context).slice(0,220)});else{const n=t.toolName?"工具调用":"日志";o.push({type:t.toolName?"tool":"thought",label:n,text:t.summary||t.title||""}),a.content&&o.push({type:t.toolName?"result":"thought",label:"内容",text:String(a.content).slice(0,500)})}return{id:String(t.id||`${t.kind}_${t.occurredAt||t.createdAt||Date.now()}`),mode:rn(t.kind),badge:sn(t),accent:nn(t.kind),score:t.shouldHandle||t.shouldNotifyLlm?"有效":"",latency:"",amount:t.source||"",time:cn(t.occurredAt||t.createdAt),summary:t.summary||t.title||"",steps:o.filter(n=>String(n.text||"").trim())}}async function ln({silent:t=!0}={}){const a=h(e.currentContactId)||e.contacts[0];e.activityLogLoading=!0,t||c();try{const o=new URLSearchParams({hours:"24",limit:"50",agent_id:a?.id||e.currentContactId||""});a?.sessionId&&o.set("session_id",a.sessionId);const n=await fetch(`${v}/api/activity-log/recent?${o.toString()}`);if(!n.ok)throw new Error(`HTTP ${n.status}`);const i=await n.json().catch(()=>({}));e.activityLogEntries=Array.isArray(i.items)?i.items.map(un):[],e.activityLogLoadedAt=new Date().toISOString()}catch(o){console.warn("[activity log] load failed",o),t||(e.toast="活动日志加载失败")}finally{e.activityLogLoading=!1,c(),e.toast&&window.setTimeout(()=>{e.toast="",c()},1200)}}function dn(t){return`
      <div class="cot-log-step ${t.type}">
        <span class="cot-log-step-label">${u(t.label)}</span>
        <span class="cot-log-step-text">${u(t.text)}</span>
      </div>
    `}function pn(){const t=h(e.currentContactId)||e.contacts[0],a=e.cotLogMode==="note",o=e.activityLogLoadedAt?e.activityLogEntries:on(t.id),n=o.filter(r=>e.cotLogMode==="short"?r.mode!=="主动":e.cotLogMode==="note"?r.steps.some(s=>s.type==="note"):!0),i=o.filter(r=>r.steps.some(s=>s.type==="note")).length;return`
      <section class="cot-log-page page-block">
        <div class="cot-log-toolbar glass-frost">
          <button class="cot-log-tool-btn avatar" aria-label="${u(t.name)}">
            <img src="${t.avatar}" alt="${u(t.name)}" />
          </button>
          <div class="cot-log-segment-shell">
            <button class="cot-log-segment-btn ${e.cotLogMode==="short"?"active":""}" data-action="switch-cot-log-mode" data-mode="short">短消息</button>
            <button class="cot-log-segment-btn ${e.cotLogMode==="long"?"active":""}" data-action="switch-cot-log-mode" data-mode="long">长消息</button>
          </div>
          <button class="cot-log-tool-btn note ${e.cotLogMode==="note"?"active":""}" data-action="switch-cot-log-mode" data-mode="note">${m("file")}${i?`<em>${i}</em>`:""}</button>
        </div>
        <div class="cot-log-stack">
          ${e.activityLogLoading?'<div class="cot-log-empty glass-frost"><span class="cot-log-empty-icon">'+m("cot")+"</span><strong>正在加载活动日志</strong><p>等一下，别盯着白板发呆。</p></div>":""}
          ${!e.activityLogLoading&&e.activityLogLoadedAt&&!n.length?'<div class="cot-log-empty glass-frost"><span class="cot-log-empty-icon">'+m("file")+"</span><strong>还没有活动日志</strong><p>这个模式下暂时没有主动消息、工具调用或小纸条。</p></div>":""}
          ${n.map(r=>{const s=a?r.steps.filter(l=>l.type==="note"):r.steps;return`
            <article class="cot-log-card glass-frost ${a?"note-only":""}">
              <div class="cot-log-topline">
                <div class="cot-log-badges">
                  <span class="cot-log-mode ${r.accent}">${u(r.mode)}</span>
                  <span class="cot-log-mode neutral">${u(r.badge)}</span>
                  <span class="cot-log-metric">${u(r.score)}</span>
                  <span class="cot-log-metric warm">${u(r.latency)}</span>
                </div>
                <span class="cot-log-fold">${m("chevron")}</span>
              </div>
              <div class="cot-log-meta">
                <span class="cot-log-cost">${u(r.amount)}</span>
                <span>${u(r.time)}</span>
              </div>
              ${a?"":`<div class="cot-log-summary">${u(r.summary)}</div>`}
              <div class="cot-log-steps">
                ${s.map(dn).join("")}
              </div>
            </article>
          `}).join("")}
        </div>
      </section>
    `}function Ae(t){return!t||typeof t.closest!="function"?!1:!!t.closest('input:not([type="range"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]), textarea, select, [contenteditable="true"]')}function mn(t,a){a&&(e.avatarCropper={kind:t,src:a,x:50,y:50,zoom:1},c())}function Te(t,a){if(!t)return;const o=new FileReader;o.onload=()=>{const n=typeof o.result=="string"?o.result:"";mn(a,n)},o.readAsDataURL(t)}function fn(t){return new Promise((a,o)=>{const n=new Image;n.onload=()=>{const r=document.createElement("canvas");r.width=512,r.height=512;const s=r.getContext("2d");if(!s){o(new Error("canvas unavailable"));return}const l=Math.max(1,Number(t.zoom)||1),d=Math.max(512/n.naturalWidth,512/n.naturalHeight),p=n.naturalWidth*d*l,f=n.naturalHeight*d*l,g=Math.min(100,Math.max(0,Number(t.x)||50))/100,I=Math.min(100,Math.max(0,Number(t.y)||50))/100,x=(512-p)*g,k=(512-f)*I;s.imageSmoothingEnabled=!0,s.imageSmoothingQuality="high",s.drawImage(n,x,k,p,f),a(r.toDataURL("image/jpeg",.9))},n.onerror=o,n.src=t.src})}async function gn(){const t=e.avatarCropper;if(t?.src)try{const a=await fn(t);if(t.kind==="new-contact")e.newContactDraft={...e.newContactDraft||Gt(),avatar:a},e.newContactAvatar=a;else if(t.kind==="account")e.accountProfile.avatar=a,P(),w(120);else if(t.kind==="contact"){const o=h(e.currentContactId);o&&(o.avatar=a,w(120))}e.avatarCropper=null,e.toast="头像已更新",c(),window.setTimeout(()=>{e.toast="",c()},1200)}catch{e.toast="头像裁切失败",c(),window.setTimeout(()=>{e.toast="",c()},1200)}}function bn(){const t=y();if(!t||t.dataset.bound==="1")return;t.dataset.bound="1",t.addEventListener("click",Pe),t.addEventListener("input",hn);let a;const o=p=>{if(Ae(p.target))return;const f=p.target.closest(".message-bubble.from-ai");f&&(a=window.setTimeout(()=>{const g=f.dataset.msgId;if(h(e.currentContactId)?.messages?.find(k=>k.id===g)?.text){e.quoteMomentId=null,e.quoteMessageId=g,c();const k=y()?.querySelector(".chat-input");k&&k.focus()}e.activeBubbleToolsId=g,e.suppressBubbleToggle=!0,navigator.vibrate&&navigator.vibrate(50)},550))},n=()=>clearTimeout(a);t.addEventListener("touchstart",o,{passive:!0}),t.addEventListener("touchend",n),t.addEventListener("touchmove",n,{passive:!0}),t.addEventListener("mousedown",o),t.addEventListener("mouseup",n),t.addEventListener("mousemove",n),t.addEventListener("mouseleave",n);const i=t.querySelector(".send-round");i&&i.addEventListener("click",p=>{p.stopPropagation(),e.streamingAbortController?(e.streamingAbortController.abort(),e.streamingAbortController=null,c()):e.currentView!=="rpRoom"&&h(e.currentContactId)?.settings?.codexEnabled?Fe():Ue()});const r=t.querySelector(".soft-mini");r&&r.addEventListener("click",p=>{p.stopPropagation(),e.showAttach=!e.showAttach,c()});const s=t.querySelector(".codex-toggle");s&&s.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation(),wa()}),t.querySelectorAll(".chat-list-item[data-contact-id]").forEach(p=>{p.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),va(p.dataset.contactId)})});const d=t.querySelector(".chat-input");d&&(d.addEventListener("keydown",p=>{p.key==="Enter"&&!p.shiftKey&&(p.preventDefault(),e.currentView!=="rpRoom"&&h(e.currentContactId)?.settings?.codexEnabled?Fe():Ue())}),["room","rpRoom"].includes(e.currentView)&&d.focus())}function wa(){const t=h(e.currentContactId);t&&(t.settings={...t.settings||{},codexEnabled:!t.settings?.codexEnabled},e.toast=t.settings.codexEnabled?"Codex 已接管这个窗口":"Codex 已关闭",w(120),c(),window.setTimeout(()=>{e.toast="",c()},1200))}async function Pe(t){const a=t.target.closest("[data-action]");if(!a)return;const o=a.dataset.action;if(o==="cancel-avatar-cropper"){e.avatarCropper=null,c();return}if(o==="apply-avatar-cropper"){t.preventDefault(),t.stopPropagation(),await gn();return}if(o==="switch-tab"&&(e.currentTab=a.dataset.tab,e.currentView=a.dataset.tab==="chats"?"list":a.dataset.tab,c()),o==="open-contact"){va(a.dataset.contactId);return}if(o==="back-list"&&(e.currentView="list",e.currentTab="chats",e.quoteMomentId=null,c()),o==="back-room"&&(e.currentView="room",c()),o==="open-contact-settings"&&(e.currentSettingsTab="basic",e.currentView="contactSettings",c(),at(),zt(e.currentContactId)),o==="open-cot-log"){e._prevContactSettingsTab=e.currentSettingsTab,e.currentView="cotLog",e.cotLogMode="long",e.activityLogLoadedAt="",e.activityLogEntries=[],c(),ln({silent:!0});return}if(o==="back-contact-settings"){e.currentView="contactSettings",e.currentSettingsTab=e._prevContactSettingsTab||e.currentSettingsTab||"basic",e._prevContactSettingsTab=null,c();return}if(o==="switch-cot-log-mode"){e.cotLogMode=a.dataset.mode||"long",c();return}if(o==="open-rp-lobby"){To(e.currentView==="room"?"room":"list",Mt());return}if(o==="back-rp-source"){e.currentView=e.rpBackView||"list",c();return}if(o==="back-rp-lobby"){e.currentView="rpLobby",c();return}if(o==="open-rp-room-create"){e.rpRoomDialogMode="create",e.rpRoomForm={name:"",world_setting:"",user_role:"",ai_role:""},e.rpRoomDialogOpen=!0,c();return}if(o==="close-rp-room-dialog"){if(a.dataset.rpRoomDialog==="card"||t.target&&t.target!==a)return;e.rpRoomDialogOpen=!1,c();return}if(o==="save-rp-room"){try{await Po(),e.toast=e.rpRoomDialogMode==="edit"?"幕间已更新":"已入梦"}catch(n){console.warn("[rp] save room failed",n),e.toast="房间保存失败"}c(),window.setTimeout(()=>{e.toast="",c()},1200);return}if(o==="open-rp-room"){t.preventDefault(),t.stopPropagation(),await ha(a.dataset.roomId);return}if(o==="delete-rp-room"){t.preventDefault(),t.stopPropagation();try{await Eo(a.dataset.roomId),e.toast="房间已删除"}catch(n){console.warn("[rp] delete room failed",n),e.toast="删除失败"}c(),window.setTimeout(()=>{e.toast="",c()},1200);return}if(o==="rename-rp-room"){t.preventDefault(),t.stopPropagation();const n=a.dataset.roomId,i=e.rpRooms.find(s=>s.room_id===n),r=window.prompt("剧本",i?.name||"")?.trim();if(!r||!n)return;try{const s=await fetch(`${v}/api/rp/rooms/${encodeURIComponent(n)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:r})});if(!s.ok)throw new Error(`HTTP ${s.status}`);await Jt(Mt(),{silent:!0}),e.toast="房间已重命名"}catch(s){console.warn("[rp] rename room failed",s),e.toast="重命名失败"}c(),window.setTimeout(()=>{e.toast="",c()},1200);return}if(o==="open-profile"&&(e.currentView="profile",c()),o==="stop-streaming"){e.streamingAbortController&&(e.streamingAbortController.abort(),e.streamingAbortController=null);return}if(o==="toggle-thinking-line"){const n=a.closest("[data-id]")?.dataset.id||a.dataset.id,i=y()?.querySelector(`#tl-line-${n}`),r=y()?.querySelector(`#tl-full-${n}`);if(!i||!r)return;const s=r.classList.contains("tl-open");r.classList.toggle("tl-open",!s),i.classList.toggle("tl-expanded",!s);return}if(o==="toggle-thinking"){const n=a.dataset.id,r=!!!e.openThinkingIds[n];e.openThinkingIds[n]=r;const s=document.getElementById(`thinking-${n}`);s?(s.classList.toggle("open",r),s.setAttribute("aria-hidden",r?"false":"true"),a.setAttribute("aria-expanded",r?"true":"false")):c()}if(o==="toggle-message-tools"){if(e.suppressBubbleToggle){e.suppressBubbleToggle=!1;return}const n=a.dataset.id;e.activeBubbleToolsId=e.activeBubbleToolsId===n?null:n,c()}if(o==="go-chat-with-quote"&&(e.currentContactId=a.dataset.contactId,e.quoteMomentId=a.dataset.momentId,e.quoteMessageId=null,e.currentTab="chats",e.currentView="room",c(),Ma(e.currentContactId),at(e.currentContactId),zt(e.currentContactId)),o==="open-comments"){t.preventDefault(),t.stopPropagation(),a.blur?.();const n=a.dataset.momentId,i=e.commentSheetMomentId===n?null:n;e.commentSheetMomentId=i;const r=y();if(r&&(r.querySelectorAll(".moment-inline-comment.open").forEach(s=>s.classList.remove("open")),i)){const s=r.querySelector(`.moment-inline-comment .moment-comment-input[data-comment-input="${i}"]`)?.closest(".moment-inline-comment");s&&s.classList.add("open")}return}if(o==="submit-comment"){t.preventDefault(),t.stopPropagation();const n=a.dataset.momentId,r=y()?.querySelector(`[data-comment-input="${n}"]`)?.value?.trim();if(!n||!r)return;try{const s=await bi(n,gt(),r);e.moments=e.moments.map(l=>l.id===n?s:l),e.commentSheetMomentId=null,e.toast="已发送评论",w(120),F(),window.setTimeout(()=>{e.toast="",F()},1200)}catch(s){console.warn("[moments] comment failed",s),bo(n,gt(),r),e.commentSheetMomentId=null,e.toast="已发送评论",w(120),F(),window.setTimeout(()=>{e.toast="",F()},1200)}return}if(o==="like-moment"){t.preventDefault(),t.stopPropagation();const n=a.dataset.momentId;if(!n)return;try{const i=await gi(n,gt());e.moments=e.moments.map(r=>r.id===n?i:r),w(120),F()}catch(i){console.warn("[moments] like failed",i),go(n,gt()),w(120),F()}return}if(o==="submit-comment"){const n=Lt(a.dataset.momentId),r=y()?.querySelector(`[data-comment-input="${a.dataset.momentId}"]`)?.value?.trim();n&&r&&(n.comments.unshift({author:"我",text:r}),e.commentSheetMomentId=null,e.toast="已发送评论",w(120),c(),window.setTimeout(()=>{e.toast="",c()},1200))}if(o==="like-moment"){t.preventDefault(),t.stopPropagation();const n=Lt(a.dataset.momentId);if(!n)return;const i="我",r=n.likes.includes(i);n.likes=n.likes.filter(p=>p!==i),r||n.likes.unshift(i);const s=a;s.innerHTML=n.likes.includes(i)?m("heartFilled"):m("heart");const l=a.closest(".moment-content-col");if(!l)return;let d=l.querySelector(`[data-moment-id-panel="${n.id}"]`);if(!d&&n.likes.length>0){d=document.createElement("div"),d.className="moment-interactions",d.setAttribute("data-moment-id-panel",n.id);const p=l.querySelector(".moment-inline-comment");p?l.insertBefore(d,p):l.appendChild(d)}if(d){const p=d.querySelector(".moment-likes-area");if(n.likes.length>0)if(p)p.querySelector(".likes-list").textContent=n.likes.join("、");else{const f=document.createElement("div");f.className="moment-likes-area",f.innerHTML=`<span class="heart-mini">${m("heartFilled")}</span> <span class="likes-list">${u(n.likes.join("、"))}</span>`,d.insertBefore(f,d.firstChild)}else p&&p.remove(),d.querySelector(".moment-comments-area")||d.remove()}}if(o==="toggle-moment-search"&&(e.momentSearchOpen=!0,c()),o==="toggle-moment-menu"&&(t.preventDefault(),t.stopPropagation(),a.blur?.(),e.activeMenuMomentId=e.activeMenuMomentId===a.dataset.momentId?null:a.dataset.momentId,ma()),o==="delete-moment"){t.preventDefault(),t.stopPropagation();const n=A(Lt(a.dataset.momentId));if(!n?.id)return;try{await fi(n.id,n.author_type,n.author_id),e.moments=e.moments.filter(i=>i.id!==n.id),e.activeMenuMomentId=null,e.toast="已删除朋友圈",w(120),F(),window.setTimeout(()=>{e.toast="",F()},1200)}catch(i){console.warn("[moments] delete failed",i),e.toast="删除失败",F(),window.setTimeout(()=>{e.toast="",F()},1400)}return}if(o==="edit-moment"){t.preventDefault(),t.stopPropagation();const n=A(Lt(a.dataset.momentId));if(!n?.id)return;e.activeMenuMomentId=null,e.momentComposerEditingId=n.id,e.momentComposerText=n.content||"",e.momentComposerImage=n.image||"",e.momentComposerImageName=n.image?"已有图片":"",e.momentsActorType=n.author_type==="agent"?"agent":"user",e.momentComposerOpen=!0,F();return}if(o==="new-moment"){t.preventDefault(),t.stopPropagation(),e.momentComposerEditingId="",e.momentComposerText="",e.momentComposerImage="",e.momentComposerImageName="",e.momentComposerOpen=!0,F();return}if(o==="set-moments-actor"){e.toast="发朋友圈默认以我发布",c(),window.setTimeout(()=>{e.toast="",c()},1100);return}if(o==="publish-moment"){const n=(document.getElementById("moment-content-input")?.value||e.momentComposerText||"").trim();if(!n){e.toast="朋友圈内容还没写",c(),window.setTimeout(()=>{e.toast="",c()},1100);return}const i=gt();try{if(e.momentComposerEditingId)await mi(e.momentComposerEditingId,{author_type:i.author_type,author_id:i.author_id,visibility:"public",content:n,image:e.momentComposerImage||"",mood:"日常"}),await Ua({silent:!0}),e.toast="已更新朋友圈";else{const r=await pi({author_type:i.author_type,author_id:i.author_id,visibility:"public",content:n,image:e.momentComposerImage||"",mood:"日常"});e.moments.unshift(r),e.toast="已发布朋友圈"}e.currentTab="moments",e.currentView="moments",e.momentComposerOpen=!1,e.momentComposerEditingId="",e.momentComposerText="",e.momentComposerImage="",e.momentComposerImageName="",w(120),c(),window.setTimeout(()=>{e.toast="",c()},1100)}catch(r){console.warn("[moments] publish failed",r),e.toast=e.momentComposerEditingId?"更新失败":"发布失败",c(),window.setTimeout(()=>{e.toast="",c()},1400)}return}if(o==="delete-moment"&&(e.moments=e.moments.filter(n=>n.id!==a.dataset.momentId),e.activeMenuMomentId=null,e.toast="已删除朋友圈",c(),window.setTimeout(()=>{e.toast="",c()},1200)),o==="edit-moment"&&(e.activeMenuMomentId=null,e.toast="编辑功能即将支持",c(),window.setTimeout(()=>{e.toast="",c()},1200)),o==="filter-moments"&&(e.toast="筛选功能稍后补上",c(),window.setTimeout(()=>{e.toast="",c()},1100)),o==="new-moment"&&(e.momentComposerOpen=!0,c()),o==="close-moment-composer"&&(e.momentComposerOpen=!1,c()),o==="publish-moment"){const n=(document.getElementById("moment-content-input")?.value||e.momentComposerText||"").trim();if(!n){e.toast="朋友圈内容还没写",c(),window.setTimeout(()=>{e.toast="",c()},1100);return}e.moments.unshift({id:`p${Date.now()}`,contactId:"me",time:new Date().toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",hour12:!1}),mood:"日常",content:n,likes:[],comments:[],image:e.momentComposerImage||"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80"}),e.currentTab="moments",e.currentView="moments",e.momentComposerOpen=!1,e.momentComposerText="",e.momentComposerImage="",e.momentComposerImageName="",e.toast="已发布朋友圈",w(120),c(),window.setTimeout(()=>{e.toast="",c()},1100)}if(o==="remove-moment-image"&&(e.momentComposerImage="",e.momentComposerImageName="",c()),o==="new-contact"&&(e.newContactDraft=Gt(),e.newContactAvatar="",e.currentView="newContact",c()),o==="pick-new-contact-avatar"){document.getElementById("nc-avatar-file")?.click();return}if(o==="save-new-contact"){e.newContactDraft={...e.newContactDraft||{},name:document.getElementById("nc-name")?.value?.trim()||e.newContactDraft?.name||"",agentId:document.getElementById("nc-agent-id")?.value?.trim()||e.newContactDraft?.agentId||"",bio:document.getElementById("nc-bio")?.value?.trim()||e.newContactDraft?.bio||""};const n=String(e.newContactDraft.name||"").trim(),i=Rt(e.newContactDraft.agentId),r=String(e.newContactDraft.bio||"").trim(),s=e.newContactDraft.avatar||e.newContactAvatar||"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80";if(!n){e.toast="请填写联系人昵称",c(),window.setTimeout(()=>{e.toast="",c()},1200);return}if(i&&!/^[a-z0-9_-]+$/.test(i)){e.toast="Agent ID 只能用小写字母、数字、下划线或短横线",c(),window.setTimeout(()=>{e.toast="",c()},1500);return}if(i&&e.contacts.some(f=>String(f.id||"").toLowerCase()===i)){e.toast="这个 Agent ID 已经存在",c(),window.setTimeout(()=>{e.toast="",c()},1400);return}const l=i||"c"+Date.now(),d=xo({id:l,name:n,bio:r||"这是新来的联系人",status:"在线",handle:"@"+l,unread:0,pinned:!1,lastMessage:"",lastTime:"",avatar:s,settings:{model:"gpt-5.4",modelProviderId:_("chat")?.providerId||"openai",temperature:.7,topP:.9,contextCount:32,thinkBudget:24,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!1,proactiveFrequency:30,memoryEnabled:!0},topics:[],messages:[]}),p=await Co(d);st(),vt(100),e.newContactDraft=Gt(),e.newContactAvatar="",e.toast=p?"已添加联系人":"已本地添加，后端登记失败",e.currentView="list",c(),window.setTimeout(()=>{e.toast="",c()},p?1200:1800)}if(o==="open-contact-avatar"){document.getElementById("contact-avatar-file")?.click();return}if(o==="open-contact-name"){const n=h(e.currentContactId);if(!n)return;const i=window.prompt("请输入昵称",n.name||"")?.trim();if(!i)return;n.name=i,e.toast="昵称已更新",c(),w(120),window.setTimeout(()=>{e.toast="",c()},1200);return}if(o==="open-contact-bio"){const n=h(e.currentContactId);if(!n)return;const i=window.prompt("请输入简介",n.bio||"")?.trim();if(typeof i!="string"||!i)return;n.bio=i,e.toast="简介已更新",c(),w(120),window.setTimeout(()=>{e.toast="",c()},1200);return}if(o==="open-contact-impression"){e._prevContactSettingsTab=e.currentSettingsTab,e.currentView="contactImpressionDetail",c(),at(e.currentContactId);return}if(o==="open-contact-relationship"){e._prevContactSettingsTab=e.currentSettingsTab,e.currentView="contactRelationshipDetail",c(),at(e.currentContactId);return}if(o==="open-contact-likes"){e._prevContactSettingsTab=e.currentSettingsTab,e.currentView="contactLikesDetail",c(),at(e.currentContactId);return}if(o==="save-insight-field"){const n=a.dataset.field,i=document.querySelector(`.insight-editor-textarea[data-field="${n}"]`);i&&hi(n,i.value);return}if(o==="open-contact-room-background"){e._prevContactSettingsTab=e.currentSettingsTab,e.currentView="contactRoomBackgroundPicker",c();return}if(o==="open-contact-bubble-theme"){e._prevContactSettingsTab=e.currentSettingsTab,e.currentView="contactBubbleThemePicker",c();return}if(o==="delete-contact"){const n=h(e.currentContactId);if(!n||!window.confirm(`确定删除“${n.name}”吗？

会删除联系人及其陪伴状态。
会清理相关主动消息。
聊天记录和记忆不会立即永久删除。`))return;try{await Mo(n.id),_o(n.id),e.toast="联系人已删除",c(),w(120),window.setTimeout(()=>{e.toast="",c()},1400)}catch(r){console.warn("[contact] delete failed",r),e.toast="删除失败",c(),window.setTimeout(()=>{e.toast="",c()},1400)}return}if(o==="pick-contact-room-background"){const n=String(a.dataset.value||"").trim();if(!n)return;mo("roomBackground",n,"聊天背景已更新"),e.currentView="contactSettings",e.currentSettingsTab="basic",c();return}if(o==="pick-contact-bubble-theme"){const n=fe(a.dataset.value),i=h(e.currentContactId);if(!i||!n)return;i.chatTheme=n,i.bubbleTheme=be(n),i.theme=ya(n),e.toast="气泡主题已更新",e.currentView="contactSettings",e.currentSettingsTab="basic",c(),w(120),window.setTimeout(()=>{e.toast="",c()},1200);return}if(o==="open-companion-state"){e._prevContactSettingsTab=e.currentSettingsTab,e.currentView="companionStateDetail",at(e.currentContactId),c();return}if(o==="expand-actions"&&(e.showAttach=!e.showAttach,c()),o==="clear-quote"&&(e.quoteMomentId=null,e.quoteMessageId=null,c()),o==="toggle-global"){const n=a.dataset.key;e.globalSettings[n]=!e.globalSettings[n],fa(a,e.globalSettings[n]),P();return}if(o==="toggle-contact"){const n=h(e.currentContactId),i=a.dataset.key,s=y()?.querySelector(".chat-app-body")?.scrollTop??0;n.settings[i]=!n.settings[i],c(),Se(s)}if(o==="back-home"&&(e.currentView==="list"?typeof window.closePage=="function"&&window.closePage("page-chat"):(e.currentTab="chats",e.currentView="list",c())),o==="switch-settings-tab"&&(e.currentSettingsTab=a.dataset.tab,e.contactQuickActionEditorId="",e.quickActionSwipeOpenId="",e.quickActionDropHintId="",e.quickActionDropDirection="",e.quickActionReorderPulseId="",e.currentSettingsTab!=="model"&&(e.contactModelAdvancedOpen=!1),c(),e.currentSettingsTab==="memory"&&at(),e.currentSettingsTab==="model"&&zt(e.currentContactId)),o==="toggle-contact-advanced"){e.contactModelAdvancedOpen=!e.contactModelAdvancedOpen,c();return}if(o==="quick-action"){const n=a.dataset.id,i=y()?.querySelector(".chat-input"),r=$e(N()).find(l=>l.id===n),s={health:"帮我记一下健康相关的事情",schedule:"帮我看看接下来的日程",weather:"帮我查一下今天的天气",files:"帮我找一下刚才提到的文件",quote:"引用上一条消息继续聊",more:"打开更多快捷操作",get_current_time:"现在几点了？",get_weather:"帮我查一下今天天气",get_health_summary:"帮我总结一下今天的健康数据",web_search:"帮我搜索这个问题",fetch_url:"帮我解析这个网页",add_todo:"帮我记一个待办",list_todos:"帮我看看待办清单",complete_todo:"把这个待办标记完成",add_note:"帮我记一条便签",list_notes:"帮我看看最近便签"};i&&(i.value=r?.prompt||s[r?.mcpToolId||n]||s[n]||`${r?.label||""}`.trim())}if(o==="toggle-codex-mode"){wa();return}if(o==="fake-send"){if(e.streamingAbortController){e.streamingAbortController.abort(),e.streamingAbortController=null,c();return}e.currentView==="rpRoom"?qn():h(e.currentContactId)?.settings?.codexEnabled?Fe():Ue()}if(o==="reroll-msg"&&Ln(a.dataset.id),o==="quote-msg"){const n=a.dataset.id;if(h(e.currentContactId)?.messages?.find(s=>s.id===n)?.text){e.quoteMomentId=null,e.quoteMessageId=n,c();const s=y()?.querySelector(".chat-input");s&&s.focus()}}o==="attach-option"&&(e.showAttach=!1,e.toast=`${a.dataset.label} 功能稍后补上`,c(),window.setTimeout(()=>{e.toast="",c()},1200))}function hn(t){const a=t.target;if(a?.dataset?.action==="avatar-cropper-range"){const o=e.avatarCropper;if(!o)return;const n=a.dataset.key;o[n]=n==="zoom"?Number(a.value):Math.round(Number(a.value));const i=y()?.querySelector(".avatar-cropper-image");i&&(i.style.objectPosition=`${o.x}% ${o.y}%`,i.style.transform=`scale(${o.zoom})`);return}if((a?.id==="nc-name"||a?.id==="nc-agent-id"||a?.id==="nc-bio")&&(e.newContactDraft={...e.newContactDraft||{},...a.id==="nc-name"?{name:a.value||""}:{},...a.id==="nc-agent-id"?{agentId:a.value||""}:{},...a.id==="nc-bio"?{bio:a.value||""}:{}}),a.dataset.action==="slide-contact"){const o=h(e.currentContactId),n=a.dataset.key,i=Number(a.value);o.settings[n]=Number.isInteger(o.settings[n])?Math.round(i):i;const s=a.closest(".slider-row-block")?.querySelector(".slider-value");s&&(s.textContent=Number.isInteger(Number(a.step))||Number(a.step)>=1?String(Math.round(i)):i.toFixed(Number(a.step)===.01?2:1))}a.dataset.action==="moment-composer-input"&&(e.momentComposerText=a.value||"")}document.addEventListener("DOMContentLoaded",()=>{xn(),pa(),Oa().finally(()=>En())});const v=window.__YUI_API_BASE__||(/^(localhost|127\.0\.0\.1)$/.test(location.hostname)?"":"https://api.somni-ref.top"),te="murmur_local_state_v1",$a="murmur_sync_meta_v1",Sa="murmur_device_id_v1",ka=new Set(Qt.map(t=>t.id)),Ia=new Set(Ze.map(t=>t.id));let Ee=null,qe=null,ee=!1,Vt=!1,ae="",Le=null,De=null;function Oe(){try{const t=localStorage.getItem(Sa);if(t)return t;const a=`dev_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;return localStorage.setItem(Sa,a),a}catch{return`dev_fallback_${Date.now()}`}}function Bt(){try{const t=localStorage.getItem($a),a=t?JSON.parse(t):{};return{last_server_updated_at:a?.last_server_updated_at||"",pending:!!a?.pending}}catch{return{last_server_updated_at:"",pending:!1}}}function Ct(t={}){try{localStorage.setItem($a,JSON.stringify({last_server_updated_at:t.last_server_updated_at||"",pending:!!t.pending}))}catch{}}function vn(){return et(),e.currentRpRoomId&&Array.isArray(e.currentRpMessages)&&(e.rpMessages={...e.rpMessages||{},[e.currentRpRoomId]:e.currentRpMessages.map(tt)}),Ve({contacts:e.contacts,moments:e.moments,actions:e.actions,globalSettings:e.globalSettings,accountProfile:e.accountProfile,conversations:e.conversations,rpRooms:e.rpRooms,rpMessages:e.rpMessages})}function L(t){try{return JSON.stringify(t)}catch{return""}}function rt(t){const a=String(t||"").trim();if(!a)return 0;const o=Date.parse(a);return Number.isFinite(o)?o:0}function tt(t={}){const a=String(t.role||t.from||"").toLowerCase()==="user"||t.from==="me"?"user":"ai",o=String(t.content??t.text??""),n=String(t.created_at||t.timestamp||""),i=String(t.time||""),r=[String(t.agent_id||""),a,n||i,o].join("|");return{id:String(t.id||r||`${a}_${Date.now()}_${Math.random().toString(36).slice(2,6)}`),session_id:String(t.session_id||""),agent_id:String(t.agent_id||""),role:a,content:o,text:o,created_at:n,time:i,...t.model?{model:t.model}:{},...t.source?{source:t.source}:{},...t.provider?{provider:t.provider}:{},...t.attachments?{attachments:t.attachments}:{},...t.thinking?{thinking:t.thinking}:{},...t.toolCalls?{toolCalls:t.toolCalls}:{}}}function At(t={}){const a=tt(t);return{...a,text:a.content,time:a.time||(a.created_at?W(a.created_at,{fallback:""}):"")}}function Tt(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([a,o])=>[String(a),Array.isArray(o)?o.map(tt):[]]))}function Nt(t=[],a=[]){const o=new Map;return[...t,...a].forEach(n=>{const i=tt(n),r=o.get(i.id);(!r||rt(i.created_at)>=rt(r.created_at))&&o.set(i.id,{...r,...i})}),[...o.values()].sort((n,i)=>{const r=rt(n.created_at),s=rt(i.created_at);return r||s?r-s:String(n.id).localeCompare(String(i.id))})}function _a(t={},a={}){const o=Tt(t),n=Tt(a);return Object.entries(n).forEach(([i,r])=>{o[i]=Nt(o[i]||[],r)}),o}function et(){const t=Tt(e.conversations);(e.contacts||[]).forEach(a=>{if(!a?.id)return;const o=Array.isArray(a.messages)?a.messages:[];(o.length||t[a.id]?.length)&&(t[a.id]=Nt(t[a.id]||[],o),a.messages=t[a.id].map(At))}),e.conversations=t}function oe(){const t=Tt(e.conversations);e.contacts=(e.contacts||[]).map(a=>{const n=(t[a.id]||(Array.isArray(a.messages)?a.messages.map(tt):[])).map(At),i=n[n.length-1];return{...a,messages:n,lastMessage:i?.text||a.lastMessage||"",lastTime:i?.time||a.lastTime||""}}),e.conversations=t}function ne(t=[],a=[]){const o=new Map;return t.map(H).forEach(n=>o.set(n.id.toLowerCase(),n)),a.map(H).forEach(n=>{const i=n.id.toLowerCase(),r=o.get(i);if(!r){o.set(i,n);return}const s=Nt(r.messages||[],n.messages||[]),l={...n,...r,id:r.id||n.id,agent_id:r.agent_id||n.agent_id||r.id||n.id,name:r.name||n.name,display_name:r.display_name||r.name||n.display_name||n.name,bio:r.bio||n.bio,status:r.status||n.status,handle:r.handle||n.handle,roleTag:r.roleTag||n.roleTag,avatar:r.avatar||n.avatar,settings:{...n.settings||{},...r.settings||{}},messages:s.map(At),lastMessage:r.lastMessage||n.lastMessage||s[s.length-1]?.content||"",lastTime:r.lastTime||n.lastTime||s[s.length-1]?.time||""};o.set(i,l)}),[...o.values()]}function yn(t=[]){for(let a=t.length-1;a>=0;a-=1){const o=String(t[a]?.session_id||"").trim();if(o)return o}return""}function wn(t={},a=""){const o=String(t.role||"").toLowerCase()==="user"?"user":"ai",n=String(t.created_at||""),i=String(t.content||"");return tt({id:t.id||`${a}|${o}|${n}|${i}`,session_id:t.session_id||"",agent_id:t.agent_id||a,role:o,content:i,text:i,created_at:n,time:n?W(n,{fallback:""}):"",model:t.model||""})}async function Ma(t,{silent:a=!0}={}){const o=h(t);if(o?.id)try{const n=new URLSearchParams({agent_id:o.id,limit:"200"}),i=await fetch(`${v}/api/murmur/messages?${n.toString()}`);if(!i.ok)throw new Error(`HTTP ${i.status}`);const r=await i.json().catch(()=>({})),s=(Array.isArray(r?.messages)?r.messages:[]).map(g=>wn(g,o.id)).filter(g=>g.content);if(!s.length)return;const l=L({conversations:e.conversations?.[o.id]||[]}),d=Nt(e.conversations?.[o.id]||o.messages||[],s);e.conversations={...e.conversations||{},[o.id]:d},o.messages=d.map(At);const p=o.messages[o.messages.length-1];p&&(o.lastMessage=p.text||"",o.lastTime=p.time||"");const f=yn(d);f&&(o.sessionId=f),L({conversations:d})!==l&&(st(),vt(300)),e.currentContactId===o.id&&e.currentView==="room"&&c()}catch(n){a||console.warn("[murmur] history load failed",n)}}function xa(t=[],a=[]){const o=new Map;return t.map(A).forEach(n=>o.set(n.id,n)),a.map(A).forEach(n=>{const i=o.get(n.id);if(!i){o.set(n.id,n);return}const r=rt(n.updated_at||n.created_at||n.time),s=rt(i.updated_at||i.created_at||i.time);o.set(n.id,r>s?{...i,...n}:{...n,...i})}),[...o.values()].sort((n,i)=>rt(i.updated_at||i.created_at||i.time)-rt(n.updated_at||n.created_at||n.time))}function $n(t=[],a=[],o="id"){const n=new Map;return[...t||[],...a||[]].forEach(i=>{if(!i||typeof i!="object")return;const r=String(i[o]||i.id||"").trim();r&&n.set(r,{...n.get(r)||{},...i})}),[...n.values()]}const Sn="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80";function Ca(t){return!t||String(t)===Sn}function kn(t={},a={}){const o={...t||{},...a||{}};return!Ca(t?.avatar)&&Ca(a?.avatar)&&(o.avatar=t.avatar),o}function st(){const t=vn(),a=L(t);if(!a||a===ae)return!1;ae=a;try{return localStorage.setItem(te,JSON.stringify({client_updated_at:new Date().toISOString(),payload:t})),!0}catch{return!1}}function Aa(){return Le||(Le=new Map(Qt.map(t=>{const a=H(t);return[a.id,L(a)]}))),Le}function Ta(){return De||(De=new Map(Ze.map(t=>{const a=A(t);return[a.id,L(a)]}))),De}function Pa(t){if(!Array.isArray(t))return!1;const a=Aa();return t.some(o=>{const n=H(o);return!ka.has(n.id)||a.get(n.id)!==L(n)})}function Re(t){if(!t||typeof t!="object")return!1;const a=String(t.id||t.agent_id||"").trim().toLowerCase();if(!ka.has(a))return!1;const o=Aa(),n=H({...t,id:a});if(o.get(a)===L(n))return!0;const i=String(t.avatar||"").trim(),r=Array.isArray(t.topics)?t.topics.map(l=>String(l?.id||"")):[],s=Array.isArray(t.messages)?t.messages.map(l=>String(l?.id||"")):[];return a==="ayan"?i.includes("photo-1517841905240-472988babdf9")||s.some(l=>["m1","m2","m3"].includes(l))||r.some(l=>["t1","t2","t3"].includes(l)):a==="azheng"?i.includes("photo-1500530855697-b586d89ba3ee")||s.includes("m4")||r.some(l=>["t4","t5"].includes(l)):a==="xiaoying"?i.includes("photo-1507525428034-b723cf961d3e")||s.includes("m5")||r.includes("t6"):!1}function Ea(t){return Array.isArray(t)?t.filter(a=>!Re(a)):[]}function In(t){return Array.isArray(t)&&t.length>0&&t.every(a=>Re(a))}function Ve(t={}){if(!t||typeof t!="object")return{};const a={...t};return Array.isArray(a.contacts)&&(a.contacts=Ea(a.contacts).map(o=>H(o))),a.conversations&&typeof a.conversations=="object"&&(a.conversations=Tt(a.conversations)),a.rpMessages&&typeof a.rpMessages=="object"&&(a.rpMessages=Tt(a.rpMessages)),Array.isArray(a.moments)&&(a.moments=ie(a.moments).map(A)),a}function _n(t){if(!Array.isArray(t))return!1;const a=Ta();return t.some(o=>{const n=A(o);return!Ia.has(n.id)||a.get(n.id)!==L(n)})}function qa(t){if(!t||typeof t!="object")return!1;const a=String(t.id||"").trim();if(!Ia.has(a))return!1;const o=Ta(),n=A(t);return o.get(a)===L(n)?!0:a==="p0"?String(t.image||"").includes("photo-1507525428034-b723cf961d3e")||String(t.content||"").includes("天空很温柔"):a==="p1"?String(t.content||"").includes("醉了先看这个"):a==="p2"?String(t.content||"").includes("晚上跑了三公里"):!1}function ie(t){return Array.isArray(t)?t.filter(a=>!qa(a)):[]}function Mn(t){return Array.isArray(t)&&t.length>0&&t.every(a=>qa(a))}function La(t,{source:a="local"}={}){if(!(!t||typeof t!="object")){if(Array.isArray(t.contacts)){const o=t.contacts.map(r=>H(r)),n=Ea(o).map(r=>H(r)),i=Pa(e.contacts);n.length?(e.contacts=ne(e.contacts,n),h(e.currentContactId)||(e.currentContactId=e.contacts[0]?.id||"")):In(o)?(i||(e.contacts=[]),h(e.currentContactId)||(e.currentContactId=e.contacts[0]?.id||""),console.warn(`[sync] ignored ${a} default mock contacts`)):i?e.contacts=e.contacts.map(r=>H(r)):(e.contacts=[],e.currentContactId="")}else e.contacts=e.contacts.map(o=>H(o));if(t.conversations&&typeof t.conversations=="object"?(e.conversations=_a(e.conversations,t.conversations),oe()):et(),Array.isArray(t.moments)){const o=t.moments.map(A),n=ie(o).map(A),i=_n(e.moments);n.length?e.moments=xa(ie(e.moments),n):Mn(o)?(i||(e.moments=[]),console.warn(`[sync] ignored ${a} default mock moments`)):i?e.moments=ie(e.moments).map(A):e.moments=[]}Array.isArray(t.rpRooms)&&(e.rpRooms=$n(e.rpRooms||[],t.rpRooms||[],"room_id")),t.rpMessages&&typeof t.rpMessages=="object"&&(e.rpMessages=_a(e.rpMessages,t.rpMessages)),Array.isArray(t.actions)&&(e.actions=t.actions),t.globalSettings&&typeof t.globalSettings=="object"&&(e.globalSettings={...e.globalSettings,...t.globalSettings}),t.accountProfile&&typeof t.accountProfile=="object"&&(e.accountProfile=kn(e.accountProfile,t.accountProfile)),E(),re()}}function xn(){try{const t=localStorage.getItem(te);if(!t)return;const a=JSON.parse(t);if(!a?.payload)return;La(a.payload,{source:"local"});const o=Ve(a.payload);ae=L(o),L(a.payload)!==ae&&localStorage.setItem(te,JSON.stringify({client_updated_at:a.client_updated_at||new Date().toISOString(),payload:o}))}catch{}}function vt(t=600){if(Vt)return;const a=Bt();Ct({...a,pending:!0}),Ee&&clearTimeout(Ee),Ee=window.setTimeout(()=>{Da()},t)}async function Da(){if(ee||Vt)return;const t=Bt();if(!t.pending)return;let a=null;try{a=JSON.parse(localStorage.getItem(te)||"null")}catch{}if(!a?.payload){Ct({...t,pending:!1});return}const o=Ve(a.payload);ee=!0;try{const n=await fetch(`${v}/api/sync/push`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({device_id:Oe(),client_updated_at:a.client_updated_at||new Date().toISOString(),payload:o})});if(!n.ok)throw new Error(`HTTP ${n.status}`);const i=await n.json().catch(()=>({}));Ct({last_server_updated_at:i.server_updated_at||t.last_server_updated_at||"",pending:!1})}catch(n){console.warn("[sync] push failed",n),Ct({...t,pending:!0})}finally{ee=!1}}async function Oa(){if(ee)return;const t=Bt();if(t.pending&&(await Da(),Bt().pending))return;const a=new URLSearchParams({device_id:Oe()});t.last_server_updated_at&&a.set("since",t.last_server_updated_at);try{const o=await fetch(`${v}/api/sync/pull?${a.toString()}`);if(!o.ok)return;const n=await o.json().catch(()=>({})),i=Pa(e.contacts);if(!n?.has_update||!n?.payload||n?.is_self&&i){n?.server_updated_at&&Ct({...t,last_server_updated_at:n.server_updated_at,pending:t.pending});return}Vt=!0,La(n.payload,{source:"remote"}),st(),Ct({last_server_updated_at:n.server_updated_at||t.last_server_updated_at||"",pending:!1}),c()}catch(o){console.warn("[sync] pull failed",o)}finally{Vt=!1}}function Cn(t={}){const a=Rt(t.agent_id||t.id);if(!a)return null;const o=String(t.display_name||t.name||a).trim()||a;return H({id:a,agent_id:a,name:o,display_name:o,bio:String(t.description||t.subtitle||"").trim(),status:"在线",handle:String(t.display_handle||`@${a}`),roleTag:String(t.source||"agent"),avatar:String(t.avatar||"").trim(),pinned:!1,unread:0,lastMessage:"",lastTime:"",topics:[],messages:[]})}function Ra(t={}){const a=Rt(t.agent_id||t.id);if(!a)return null;const o=Qt.find(r=>String(r.id||"").toLowerCase()===a),n=String(t.last_message_at||""),i=String(t.last_message||"").trim();return H({id:a,agent_id:a,name:String(o?.name||t.display_name||t.name||a).trim()||a,display_name:String(o?.name||t.display_name||t.name||a).trim()||a,bio:"",status:"在线",handle:`@${a}`,roleTag:"recovered",avatar:"",pinned:!1,unread:0,lastMessage:i,lastTime:n?W(n,{fallback:""}):"",sessionId:String(t.session_id||""),messageCount:Number(t.message_count||0)||0,topics:[],messages:[]})}async function An({silent:t=!0}={}){try{const a=await fetch(`${v}/api/agents?include_inactive=true`);if(!a.ok)throw new Error(`HTTP ${a.status}`);const o=await a.json().catch(()=>({})),n=(Array.isArray(o?.agents)?o.agents:[]).filter(r=>r?.is_active!==!1).map(Cn).filter(Boolean).filter(r=>!Re(r));if(console.info("[agents] loaded",n.map(r=>({id:r.id,name:r.name,source:r.roleTag||""}))),!n.length)return;const i=L({contacts:e.contacts});e.contacts=ne(e.contacts,n),oe(),(!e.currentContactId||!e.contacts.some(r=>r.id===e.currentContactId))&&(e.currentContactId=e.contacts[0]?.id||""),L({contacts:e.contacts})!==i&&(st(),vt(100)),c()}catch(a){t||console.warn("[agents] load contacts failed",a)}}async function Tn({silent:t=!0}={}){try{const a=await fetch(`${v}/api/murmur/message-agents?limit=1000`);if(a.status===404){await Pn({silent:t});return}if(!a.ok)throw new Error(`HTTP ${a.status}`);const o=await a.json().catch(()=>({})),n=(Array.isArray(o?.agents)?o.agents:[]).map(Ra).filter(Boolean);if(console.info("[murmur] message agents loaded",n.map(r=>({id:r.id,lastMessage:r.lastMessage,count:r.messageCount||0}))),!n.length)return;const i=L({contacts:e.contacts});e.contacts=ne(e.contacts,n),oe(),(!e.currentContactId||!e.contacts.some(r=>r.id===e.currentContactId))&&(e.currentContactId=e.contacts[0]?.id||""),L({contacts:e.contacts})!==i&&(st(),vt(100)),c()}catch(a){t||console.warn("[murmur] load message agents failed",a)}}async function Pn({silent:t=!0}={}){const a=Array.from(new Set([...Qt.map(r=>Rt(r.id)).filter(Boolean),...e.contacts.map(r=>Rt(r.id)).filter(Boolean)])),o=[];for(const r of a)if(r)try{const s=new URLSearchParams({agent_id:r,limit:"1"}),l=await fetch(`${v}/api/murmur/messages?${s.toString()}`);if(!l.ok)continue;const d=await l.json().catch(()=>({})),p=Array.isArray(d?.messages)?d.messages:[];if(!p.length)continue;const f=p[p.length-1]||{};o.push(Ra({agent_id:r,last_message:f.content||"",last_message_at:f.created_at||"",message_count:p.length,session_id:f.session_id||""}))}catch(s){t||console.warn("[murmur] message probe failed",r,s)}const n=o.filter(Boolean);if(console.info("[murmur] message agents probed",n.map(r=>({id:r.id,lastMessage:r.lastMessage,count:r.messageCount||0}))),!n.length)return;const i=L({contacts:e.contacts});e.contacts=ne(e.contacts,n),oe(),(!e.currentContactId||!e.contacts.some(r=>r.id===e.currentContactId))&&(e.currentContactId=e.contacts[0]?.id||""),L({contacts:e.contacts})!==i&&(st(),vt(100)),c()}async function En(){await An(),await Tn()}function w(t=800){Vt||(qe&&clearTimeout(qe),qe=window.setTimeout(()=>{st()&&vt(500)},t))}function D(){const t=new Date;return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Be(t){const a=t?.settings?.modelProviderId||_("chat")?.providerId||"",o=Q(a);if(!o?.baseUrl||!o?.apiKey)return{};const n=Ht(o.apiPath||o.api_path||"",{allowEmpty:!0});return{base_url:o.baseUrl,api_key:o.apiKey,...n?{api_path:n}:{}}}function Ne(t){const a=t?.settings||{},o=Number(a.temperature);return Number.isFinite(o)?{temperature:o}:{}}function He(t,a=""){let o="",n="";try{const s=JSON.parse(t),l=/^(thinking|reasoning|reason|thought|cot|inner_thought)$/i.test(a),d=/^(chat|message|content|text|assistant|reply|response|output)$/i.test(a);l||(o=s.content??s.text??s.delta??""),n=s.thinking??s.reasoning??s.reasoning_content??s.reasoningContent??""}catch{/^(thinking|reasoning|reason|thought|cot|inner_thought)$/i.test(a)?n=t:o=t}const i=/^tool_call$/i.test(a);let r=null;if(i)try{const s=JSON.parse(t);s.name&&(r={name:String(s.name),status:String(s.status||"done")})}catch{}return{text:Dt(o),thinking:Dt(n),toolCall:r}}async function je(t){const a=String(t?.sessionId||"").trim();if(a){try{const r=await fetch(`${v}/api/sessions/${encodeURIComponent(a)}`);if(r.ok)return a;if(r.status!==404)throw new Error(`校验会话失败（HTTP ${r.status}）`)}catch(r){throw String(r?.message||"").includes("HTTP"),r}t.sessionId=""}const o=await fetch(`${v}/api/sessions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:String(t?.name||"新对话").trim()||"新对话",model:String(t?.settings?.model||e.globalSettings?.defaultModel||"echo").trim()||"echo",source_app:"yui_nook"})}),n=await o.json().catch(()=>({}));if(!o.ok)throw new Error(n.detail||`创建会话失败（HTTP ${o.status}）`);const i=String(n?.session?.id||"").trim();if(!i)throw new Error("创建会话失败：后端没有返回 session.id");return t.sessionId=i,w(120),i}async function ze(t,a,o,n="/api/chat"){let i=await fetch(`${v}${n}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify(a),...o?{signal:o}:{}});if(i.ok)return i;let r="";try{const s=await i.json();r=String(s?.detail||"").trim()}catch{}if(n==="/api/chat"&&i.status===404&&r.includes("会话不存在")){t.sessionId="";const s=await je(t);if(a.session_id=s,i=await fetch(`${v}${n}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify(a),...o?{signal:o}:{}}),i.ok)return i}throw new Error(`HTTP ${i.status}`)}async function qn(){const t=y()?.querySelector(".chat-input"),a=t?.value?.trim();if(!a||!e.currentRpRoomId)return;const o=h(e.currentContactId)||e.contacts[0],n=Me();if(!o||!n)return;const i=!!o?.settings?.reasoning_visibility,r="rp_u"+Date.now();e.currentRpMessages.push({id:r,role:"user",text:a,content:a,time:D(),timestamp:new Date().toISOString(),created_at:new Date().toISOString()}),t.value="";const s="rp_ai_"+Date.now();e.currentRpMessages.push({id:s,role:"ai",text:"",content:"",time:"",created_at:new Date().toISOString(),typing:!0}),e.currentRpRoomId&&(e.rpMessages[e.currentRpRoomId]=e.currentRpMessages.map(tt)),w(120),c(),U();const l={room_id:e.currentRpRoomId,agent_id:n.agent_id||o.id,content:a,...o.persona?{persona:o.persona}:{},...o.settings.model?{model:o.settings.model}:{},...Ne(o),...Be(o)},d=new AbortController;e.streamingAbortController=d,c();try{const p=await ze(o,l,d.signal,"/api/rp/chat"),f=()=>e.currentRpMessages.findIndex(T=>T.id===s);e.currentRpMessages[f()]={id:s,role:"ai",text:"",time:D(),typing:!1,streaming:!0},c();const g=p.body.getReader(),I=new TextDecoder;let x="",k="",M="",q="";for(;;){const{done:T,value:C}=await g.read();if(T)break;x+=I.decode(C,{stream:!0});const O=x.split(`
`);x=O.pop()??"";for(const ot of O){const K=ot.trim();if(!K){q="";continue}if(K.startsWith("event:")){q=K.slice(6).trim();continue}if(!K.startsWith("data:"))continue;const ct=K.slice(5).trim();if(ct==="[DONE]")continue;const z=He(ct,q);let X=z.text;const nt=ve(z.thinking,k,M),ut=i?nt:"";ut&&M.length<he&&(M+=ut),X&&(k+=X);const lt=f();lt!==-1&&(e.currentRpMessages[lt]={id:s,role:"ai",text:k,...i&&M?{thinking:M}:{},time:D(),typing:!1,streaming:!0},c(),U())}}const S=e.currentRpMessages.findIndex(T=>T.id===s);S!==-1&&(e.currentRpMessages[S]={...e.currentRpMessages[S],text:k||"…",content:k||"…",...i&&M?{thinking:M}:{},streaming:!1,typing:!1,time:D(),created_at:new Date().toISOString()}),e.streamingAbortController=null,await Jt(n.agent_id||o.id,{silent:!0}),e.currentRpRoomId&&(e.rpMessages[e.currentRpRoomId]=e.currentRpMessages.map(tt)),w(120),c(),U()}catch(p){const f=e.currentRpMessages.findIndex(g=>g.id===s);f!==-1&&(e.currentRpMessages[f]={id:s,role:"ai",text:p.name==="AbortError"?"…":"杩炴帴澶辫触锛?{err.message}",content:p.name==="AbortError"?"…":"杩炴帴澶辫触锛?{err.message}",time:D(),created_at:new Date().toISOString(),typing:!1}),e.streamingAbortController=null,e.currentRpRoomId&&(e.rpMessages[e.currentRpRoomId]=e.currentRpMessages.map(tt)),w(120),c()}}async function Fe(){const t=y()?.querySelector(".chat-input"),a=t?.value?.trim();if(!a)return;const o=h(e.currentContactId);if(!o)return;Ot();const n="u"+Date.now();o.messages.push({id:n,role:"user",text:a,content:a,time:D(),created_at:new Date().toISOString()}),o.lastMessage=a,o.lastTime="刚刚",t.value="";const i="ai_"+Date.now();o.messages.push({id:i,role:"ai",text:"",content:"",time:"",created_at:new Date().toISOString(),typing:!0,source:"codex"}),et(),w(120),c(),U();const r=new AbortController;e.streamingAbortController=r,c();try{const s=await fetch(`${v}/api/codex/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversation_key:`yui:${o.id}`,content:a,reset:!1}),signal:r.signal}),l=await s.json().catch(()=>({}));if(!s.ok)throw new Error(l.detail||`HTTP ${s.status}`);const d=String(l.reply||"").trim()||"…",p=o.messages.findIndex(f=>f.id===i);p!==-1&&(o.messages[p]={id:i,role:"ai",text:d,content:d,source:"codex",provider:"codex",time:D(),created_at:new Date().toISOString(),typing:!1}),o.lastMessage=d,o.lastTime=D(),et(),w(120),c(),U()}catch(s){const l=s.name==="AbortError";l||console.error("[codex chat] error:",s);const d=o.messages.findIndex(p=>p.id===i);if(d!==-1){const p=l?"…":`Codex 连接失败：${s.message}`;o.messages[d]={id:i,role:"ai",text:p,content:p,source:"codex",provider:"codex",time:D(),created_at:new Date().toISOString(),typing:!1}}et(),w(120),c()}finally{e.streamingAbortController=null,c()}}async function Ue(){const t=y()?.querySelector(".chat-input"),a=t?.value?.trim();if(!a)return;const o=h(e.currentContactId);if(!o)return;Ot();const n=!!o?.settings?.reasoning_visibility;let i="";try{i=await je(o)}catch(C){console.error("[session] create failed:",C),e.toast="鏃犳硶鍒涘缓浼氳瘽锛?{err.message}",c(),window.setTimeout(()=>{e.toast="",c()},1500);return}const r="u"+Date.now();o.messages.push({id:r,role:"user",text:a,content:a,time:D(),created_at:new Date().toISOString()}),o.lastMessage=a,o.lastTime="刚刚",t.value="",et(),w(120),c(),U();const s="ai_"+Date.now();o.messages.push({id:s,role:"ai",text:"",content:"",time:"",created_at:new Date().toISOString(),typing:!0}),et(),w(120),c(),U();let l=0,d=!1,p=null;const f=()=>{const C=y()?.querySelector(`#thinking-${s}`);if(!C)return;C.textContent=ye(S),C.classList.add("open","thinking-active"),C.setAttribute("aria-hidden","false");const O=y()?.querySelector(`#cot-wrapper-${s}`);O&&O.removeAttribute("data-slow"),e.openThinkingIds[s]=!0},g=()=>{p===null&&(p=requestAnimationFrame(()=>{p=null,f()}))},I=()=>{p!==null&&(cancelAnimationFrame(p),p=null)},x=setInterval(()=>{if(!l)return;const C=y()?.querySelector(`#cot-wrapper-${s}`);C&&C.toggleAttribute("data-slow",Date.now()-l>8e3)},2e3),k={session_id:i,agent_id:o.id,content:a,...o.persona?{persona:o.persona}:{},...o.settings.model?{model:o.settings.model}:{},...Ne(o),...Be(o)},M=new AbortController;e.streamingAbortController=M,c();let q="",S="",T=null;try{const C=await ze(o,k,M.signal),O=()=>o.messages.findIndex(dt=>dt.id===s);o.messages[O()]={id:s,role:"ai",text:"",content:"",time:D(),created_at:new Date().toISOString(),typing:!1,streaming:!0},c();const ot=C.body.getReader(),K=new TextDecoder;let ct="",z="";for(;;){const{done:dt,value:de}=await ot.read();if(dt)break;ct+=K.decode(de,{stream:!0});const Et=ct.split(`
`);ct=Et.pop()??"";let Ut=0;for(const St of Et){const pt=St.trim();if(!pt){z="";continue}if(pt.startsWith("event:")){z=pt.slice(6).trim();continue}if(!pt.startsWith("data:"))continue;const kt=pt.slice(5).trim();if(kt==="[DONE]")continue;const It=He(kt,z);let pe=It.text;const me=ve(It.thinking,q,S),G=n?me:"";if(G){S.length<he&&(S+=G),l=Date.now();const Y=O();Y!==-1&&(o.messages[Y]={id:s,role:"ai",text:q,thinking:S,time:D(),typing:!1,streaming:!0},d?g():(d=!0,e.openThinkingIds[s]=!0,c(),U()))}if(It.toolCall){const Y=It.toolCall;T||(T=[]);const qt=T.find(Za=>Za.name===Y.name&&Za.status!=="done");qt?qt.status=Y.status:T.push({name:Y.name,status:Y.status});const mt=O();mt!==-1&&(o.messages[mt]={...o.messages[mt],toolCalls:T.slice(),streaming:!0},c())}pe&&(q+=pe),Ut+=1,Ut>=32&&(Ut=0,g(),await oa())}}clearInterval(x),I(),e.streamingAbortController=null;const X=O(),nt=q||(n&&S?"":"…");o.lastMessage=nt||"已处理",o.lastTime=D();const ut=y()?.querySelector(`#thinking-${s}`);ut&&ut.classList.remove("thinking-active");const lt=y()?.querySelector(`#cot-wrapper-${s}`);lt&&lt.removeAttribute("data-slow"),n&&S&&delete e.openThinkingIds[s];const B=ia(nt);X!==-1&&B.length>1?(o.messages.splice(X,1),c(),U(),await na(180),await ra(o,B,{startIndex:X,thinking:n?S:"",toolCalls:T})):(X!==-1&&(o.messages[X]={id:s,role:"ai",text:nt,content:nt,...n&&S?{thinking:S}:{},...T?{toolCalls:T}:{},time:D(),created_at:new Date().toISOString(),typing:!1}),et(),w(120),c(),U())}catch(C){clearInterval(x),I(),e.streamingAbortController=null;const O=C.name==="AbortError";O||console.error("[chat SSE] error:",C);const ot=o.messages.findIndex(K=>K.id===s);ot!==-1&&(o.messages[ot]={id:s,role:"ai",text:O?q||"…":`连接失败：${C.message}，请稍后再试。`,content:O?q||"…":`连接失败：${C.message}，请稍后再试。`,...n&&S?{thinking:S}:{},time:D(),created_at:new Date().toISOString(),typing:!1}),O&&q&&(o.lastMessage=q,o.lastTime=D()),et(),w(120),c()}}async function Ln(t){const a=h(e.currentContactId);if(!a)return;Ot();const o=!!a?.settings?.reasoning_visibility,n=a.messages.findIndex(d=>d.id===t);if(n===-1||a.messages[n].role!=="ai")return;let i="";try{i=await je(a)}catch(d){console.error("[session] create failed:",d),e.toast=`无法创建会话：${d.message}`,c(),window.setTimeout(()=>{e.toast="",c()},1500);return}a.messages[n]={...a.messages[n],typing:!0,text:"",streaming:!1},c();const r=[...a.messages].reverse().find(d=>d.role==="user");if(!r)return;const s={session_id:i,agent_id:a.id,content:r.text,...a.persona?{persona:a.persona}:{},...a.settings.model?{model:a.settings.model}:{},...Ne(a),...Be(a)},l=new AbortController;e.streamingAbortController=l;try{const d=await ze(a,s,l.signal);a.messages[n]={...a.messages[n],typing:!1,text:"",streaming:!0},c();const p=d.body.getReader(),f=new TextDecoder;let g="",I="",x="",k=null;const M=t;let q="",S=0,T=!1,C=null;const O=()=>{const B=y()?.querySelector(`#thinking-${M}`);if(!B)return;B.textContent=ye(x),B.classList.add("open","thinking-active"),B.setAttribute("aria-hidden","false");const dt=y()?.querySelector(`#cot-wrapper-${M}`);dt&&dt.removeAttribute("data-slow"),e.openThinkingIds[M]=!0},ot=()=>{C===null&&(C=requestAnimationFrame(()=>{C=null,O()}))},K=()=>{C!==null&&(cancelAnimationFrame(C),C=null)},ct=setInterval(()=>{if(!S)return;const B=y()?.querySelector(`#cot-wrapper-${M}`);B&&B.toggleAttribute("data-slow",Date.now()-S>8e3)},2e3);for(;;){const{done:B,value:dt}=await p.read();if(B)break;g+=f.decode(dt,{stream:!0});const de=g.split(`
`);g=de.pop()??"";let Et=0;for(const Ut of de){const St=Ut.trim();if(!St){q="";continue}if(St.startsWith("event:")){q=St.slice(6).trim();continue}if(!St.startsWith("data:"))continue;const pt=St.slice(5).trim();if(pt==="[DONE]")continue;const kt=He(pt,q);let It=kt.text;const pe=ve(kt.thinking,I,x),me=o?pe:"";if(me){x.length<he&&(x+=me),S=Date.now();const G=a.messages.findIndex(Y=>Y.id===M);G!==-1&&(a.messages[G]={...a.messages[G],thinking:x,streaming:!0},T?ot():(T=!0,e.openThinkingIds[M]=!0,c()))}if(kt.toolCall){const G=kt.toolCall;k||(k=[]);const Y=k.find(mt=>mt.name===G.name&&mt.status!=="done");Y?Y.status=G.status:k.push({name:G.name,status:G.status});const qt=a.messages.findIndex(mt=>mt.id===M);qt!==-1&&(a.messages[qt]={...a.messages[qt],toolCalls:k.slice(),streaming:!0},c())}It&&(I+=It),Et+=1,Et>=32&&(Et=0,ot(),await oa())}}clearInterval(ct),K(),e.streamingAbortController=null;const z=a.messages.findIndex(B=>B.id===M),X=I||"…",nt=y()?.querySelector(`#thinking-${M}`);nt&&nt.classList.remove("thinking-active");const ut=y()?.querySelector(`#cot-wrapper-${M}`);ut&&ut.removeAttribute("data-slow"),o&&x&&delete e.openThinkingIds[M];const lt=ia(X);z!==-1&&lt.length>1?(a.messages.splice(z,1),c(),await na(180),await ra(a,lt,{startIndex:z,thinking:o?x:"",toolCalls:k})):(z!==-1&&(a.messages[z]={...a.messages[z],text:X,...o&&x?{thinking:x}:{},...k?{toolCalls:k}:{},streaming:!1}),c())}catch(d){clearInterval(_rerollSlowTimer),_cancelRerollFlush(),e.streamingAbortController=null;const p=d.name==="AbortError";p||console.error("[reroll SSE] error:",d);const f=a.messages.findIndex(g=>g.id===rerollId);f!==-1&&(a.messages[f]={...a.messages[f],text:p?fullText||"…":`重试失败：${d.message}`,...fullThinking?{thinking:fullThinking}:{},...fullToolCalls?{toolCalls:fullToolCalls}:{},streaming:!1}),c()}}function U(){requestAnimationFrame(()=>{const t=y()?.querySelector(".messages-panel");t&&(t.scrollTop=t.scrollHeight)})}function Dn(){return`
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
    `}const Va=window.openPage;typeof Va=="function"&&(window.openPage=function(a,o){Va(a,o),a==="page-chat"&&pa()});const On=[{id:"openai",name:"OpenAI",enabled:!0,baseUrl:"https://api.openai.com/v1",apiPath:"",apiKey:"",models:["gpt-5.4","gpt-5.4-mini","gpt-4.1-mini"],defaultModel:"gpt-5.4"},{id:"openrouter",name:"OpenRouter",enabled:!0,baseUrl:"https://openrouter.ai/api/v1",apiPath:"",apiKey:"",models:["openai/gpt-5","anthropic/claude-3.7-sonnet"],defaultModel:"openai/gpt-5"},{id:"gemini",name:"Gemini",enabled:!0,baseUrl:"https://generativelanguage.googleapis.com/v1beta/openai",apiPath:"",apiKey:"",models:["gemini-2.5-pro","gemini-2.5-flash"],defaultModel:"gemini-2.5-pro"},{id:"deepseek",name:"DeepSeek",enabled:!1,baseUrl:"https://api.deepseek.com/v1",apiPath:"",apiKey:"",models:["deepseek-chat","deepseek-reasoner"],defaultModel:"deepseek-chat"},{id:"qwen",name:"阿里云千问",enabled:!1,baseUrl:"https://dashscope.aliyuncs.com/compatible-mode/v1",apiPath:"",apiKey:"",models:["qwen-max","qwen-plus","qwen-turbo"],defaultModel:"qwen-max"},{id:"zhipu",name:"智谱",enabled:!1,baseUrl:"https://open.bigmodel.cn/api/paas/v4",apiPath:"",apiKey:"",models:["glm-4.5","glm-4-air"],defaultModel:"glm-4.5"}],Qe=new Set(["aiInterface","defaultModels","modelSlot","providerCatalog","providerEditor","promptEditor","themeSettings","accountSettings","memoryService","backendSync","exportSettings","mcpLibrary"]),Rn=Xt,Vn=ke,Bn=Ie,Ba=Pe;e.viewStack=e.viewStack||[],e.activeModelSlot=e.activeModelSlot||"chat",e.activeModelSlotContext=e.activeModelSlotContext||"global",e.activeModelProviderId=e.activeModelProviderId||"",e.providerDraftId=e.providerDraftId||null,e.providerAdvancedOpen=!!e.providerAdvancedOpen,e.providerEditorDraft=e.providerEditorDraft||null,e.providerModelMenuOpen=!!e.providerModelMenuOpen,e.modelSlotMenuOpen=!!e.modelSlotMenuOpen,e.providerSearch=e.providerSearch||"",e.activePromptSlot=e.activePromptSlot||"summary";function V(t){const a=String(t||"").trim();return a?a==="ocr"?"vision":a==="title"?"summary":a:"chat"}e.aiSettingsSaving=!1,e.memoryServiceEntries=Array.isArray(e.memoryServiceEntries)?e.memoryServiceEntries:[],e.memoryServiceLoading=!!e.memoryServiceLoading,e.slotVendorGroupOpen=e.slotVendorGroupOpen&&typeof e.slotVendorGroupOpen=="object"?e.slotVendorGroupOpen:{},e.providerModelVendorOpen=e.providerModelVendorOpen&&typeof e.providerModelVendorOpen=="object"?e.providerModelVendorOpen:{};function Nn(){return"/chat/completions"}function Ht(t,{allowEmpty:a=!1}={}){const o=String(t||"").trim();return o?o.startsWith("/")?o:`/${o}`:a?"":Nn()}function Hn(t={}){return Ht(t.apiPath||t.api_path||"",{allowEmpty:!1})}function Ye(t={}){const a=Ht(t.apiPath||t.api_path||"",{allowEmpty:!0});return{...t,baseUrl:t.baseUrl||t.base_url||"",apiKey:t.apiKey||t.api_key||"",apiPath:a,api_path:a,models:Array.isArray(t.models)?t.models:[]}}function jt(){return{providers:On.map(t=>Ye({...t,models:[...t.models]})),defaultModels:{chat:{providerId:"openai",model:"gpt-5.4",useChatModel:!1},summary:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},vision:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},translate:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},consciousness:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},voice:{provider:"",service_url:"",base_url:"",voice_id:"",speaker:"",emotion:"",speed:1,format:""}},defaultPrompts:{chat:"Respond naturally, stay consistent with the current role and context, and keep the tone warm and clear.",summary:"Write a concise conversation summary with key facts, action items, and follow-ups.",translate:"Translate the content accurately while preserving tone and formatting when possible.",vision:"Extract visible text from the image and explain key visual information clearly.",consciousness:"Review recent context, infer useful next-step thoughts, and keep the result concise and actionable."},mcpLibrary:eo()}}function E(){if(!e.globalSettings.aiSettings)e.globalSettings.aiSettings=jt();else{const t=e.globalSettings.aiSettings;t.defaultModels=t.defaultModels||{},t.defaultPrompts=t.defaultPrompts||{},t.defaultModels.ocr&&!t.defaultModels.vision&&(t.defaultModels.vision={...t.defaultModels.ocr}),t.defaultPrompts.ocr&&!t.defaultPrompts.vision&&(t.defaultPrompts.vision=t.defaultPrompts.ocr),delete t.defaultModels.ocr,delete t.defaultPrompts.ocr,delete t.defaultModels.title,delete t.defaultPrompts.title,Object.entries(jt().defaultModels).forEach(([a,o])=>{t.defaultModels[a]||(t.defaultModels[a]={...o})}),Object.entries(jt().defaultPrompts).forEach(([a,o])=>{typeof t.defaultPrompts[a]!="string"&&(t.defaultPrompts[a]=o)})}return e.globalSettings.aiSettings}function jn(t={}){const a=jt(),o={...t||{}};o.defaultModels?.ocr&&!o.defaultModels?.vision&&(o.defaultModels={...o.defaultModels,vision:o.defaultModels.ocr}),o.defaultPrompts?.ocr&&!o.defaultPrompts?.vision&&(o.defaultPrompts={...o.defaultPrompts,vision:o.defaultPrompts.ocr});const n={providers:a.providers,defaultModels:{...a.defaultModels},defaultPrompts:{...a.defaultPrompts},mcpLibrary:{...a.mcpLibrary,tools:[...a.mcpLibrary?.tools||[]]}};if(Array.isArray(o.providers)&&o.providers.length){const i=new Map(a.providers.map(r=>[r.id,r]));o.providers.forEach(r=>{const s=Ye(r);i.set(s.id,{...i.get(s.id),...s,models:Array.isArray(s.models)&&s.models.length?s.models:i.get(s.id)?.models||[]})}),n.providers=[...i.values()]}o.defaultModels&&Object.keys(n.defaultModels).forEach(i=>{o.defaultModels[i]&&(n.defaultModels[i]={...n.defaultModels[i],...o.defaultModels[i]})}),o.defaultPrompts&&Object.keys(n.defaultPrompts).forEach(i=>{typeof o.defaultPrompts[i]=="string"&&(n.defaultPrompts[i]=o.defaultPrompts[i])}),o.mcpLibrary&&Array.isArray(o.mcpLibrary.tools)&&(n.mcpLibrary={...n.mcpLibrary,...o.mcpLibrary,tools:o.mcpLibrary.tools.map(it)}),e.globalSettings.aiSettings=n,typeof o.consciousnessLoop=="boolean"&&(e.globalSettings.consciousnessLoop=o.consciousnessLoop),re()}function re(){const t=E(),a=t.defaultModels.chat,o=t.providers.find(n=>n.id===a.providerId);e.globalSettings.defaultModel=a.model,e.globalSettings.provider=o?.name||"OpenAI"}function Q(t){return E().providers.find(a=>a.id===t)}function Ke(t=e.providerDraftId){const a=Ye(Q(t)||{id:t||`custom_${Date.now()}`,name:"",enabled:!0,baseUrl:"",apiPath:"",apiKey:"",models:[],defaultModel:""}),o=Array.isArray(a.models)?[...a.models]:[],n=o.map(Xe);return{...a,models:o,_allModels:n,_selectedModelIds:new Set(o)}}function R(){return(!e.providerEditorDraft||e.providerEditorDraft.id!==e.providerDraftId)&&(e.providerEditorDraft=Ke()),e.providerEditorDraft}function se(t="",a=[]){const o=String(t||"").trim().toLowerCase();return o?a.filter(n=>String(n||"").toLowerCase().includes(o)):[...a]}function Na(t){const a=String(t||"").toLowerCase();return/deepseek/.test(a)?"DeepSeek":/\bglm\b|chatglm/.test(a)?"GLM":/\bqwen\b|qwq/.test(a)?"Qwen":/\bgpt[-\d]|^gpt|^o[134][-\d]|text-davinci|text-curie/.test(a)?"OpenAI":/claude/.test(a)?"Anthropic":/gemini|gemma/.test(a)?"Google":/\bllama\b|meta-llama/.test(a)?"Meta":/mistral|mixtral|codestral/.test(a)?"Mistral":/\byi[-/_]/.test(a)?"闆朵竴涓囩墿":/moonshot|kimi/.test(a)?"Moonshot":/hunyuan/.test(a)?"娣峰厓":/ernie|wenxin/.test(a)?"鏂囧績":/doubao/.test(a)?"璞嗗寘":/baichuan/.test(a)?"鐧惧窛":/spark/.test(a)?"鏄熺伀":/internlm/.test(a)?"InternLM":"Other"}function Ha(t){const a=String(t||"").toLowerCase(),o=["chat","text"];return/vl\b|vision|visual|\bvision\b|-v\d|\bimg\b/.test(a)&&o.push("vision"),/reason|r1\b|think\b|cot\b/.test(a)&&o.push("reasoning"),/image|draw|flux|paint|artist|diffusion/.test(a)&&o.push("image"),o.push("tools"),o}function Xe(t){const a=String(t||"").trim();return{id:a,name:a,vendor:Na(a),capabilities:Ha(a)}}const zn={chat:"瀵硅瘽",text:"鏂囨湰",reasoning:"鎺ㄧ悊",tools:"宸ュ叿璋冪敤",vision:"瑙嗚",image:"鐢熷浘"},Fn=["reasoning","tools","vision","image"],Un={reasoning:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M5 .5A3 3 0 0 0 2.8 5.9l.2.3V8h4V6.2l.2-.3A3 3 0 0 0 5 .5zm-1.2 8h2.4v.5c0 .28-.22.5-.5.5H4.3a.5.5 0 0 1-.5-.5V8.5z"/></svg>',tools:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M7.5 1a2 2 0 0 0-1.86 2.73L1.2 8.16a.6.6 0 0 0 .84.84l4.43-4.44A2 2 0 1 0 7.5 1zm0 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>',vision:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5 2C2.5 2 .8 5 .8 5S2.5 8 5 8s4.2-3 4.2-3S7.5 2 5 2zm0 4.5A1.5 1.5 0 1 1 5 3.5a1.5 1.5 0 0 1 0 3z"/></svg>',image:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M1.5 1A.5.5 0 0 0 1 1.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-7A.5.5 0 0 0 8.5 1h-7zM2 8l2-2.5 1.3 1.7 1.7-2.2L9 8H2zm.8-4.3a.7.7 0 1 0 1.4 0 .7.7 0 0 0-1.4 0z"/></svg>'};function Qn(t){return(Array.isArray(t?.capabilities)?t.capabilities:Ha(t?.name||"")).filter(o=>Fn.includes(o)).map(o=>`<span class="model-cap-badge cap-${o}" title="${zn[o]||o}">${Un[o]||o}</span>`).join("")}function ja(t="",a=[]){const o=String(t||"").trim();return!Array.isArray(a)||!a.length?"还没有已同步模型，仍可手动输入并保存。":o?a.some(i=>String(i).toLowerCase()===o.toLowerCase())?"已匹配到已同步列表中的模型。":"当前模型不在已同步列表中，可继续手动保存。":`已同步 ${a.length} 个模型，可搜索或展开列表选择。`}function Ge(t="",a=[]){const o=String(t||"").trim();return!Array.isArray(a)||!a.length?"当前供应商还没有同步模型，可切换供应商或先同步。":o?a.some(i=>String(i).toLowerCase()===o.toLowerCase())?"已匹配到当前供应商模型。":"当前输入不在同步列表中。":`已同步 ${a.length} 个模型，可搜索或展开列表选择。`}function yt(){const t=R(),a=document.getElementById("provider-default-model-input"),o=document.getElementById("provider-default-model-menu"),n=document.getElementById("provider-default-model-hint");if(!o||!n)return;const i=a?.value||t.defaultModel||"",r=Array.isArray(t.models)?t.models:[],s=se(i,r);if(n.textContent=ja(i,r),!e.providerModelMenuOpen){o.innerHTML="",o.classList.remove("open");return}o.classList.add("open"),o.innerHTML=s.length?s.map(l=>`
          <button class="provider-model-option ${String(l).toLowerCase()===String(i).trim().toLowerCase()?"active":""}" data-action="pick-provider-default-model" data-model="${u(l)}" type="button">
            ${u(l)}
          </button>
        `).join(""):'<div class="provider-model-empty">娌℃湁鍖归厤鍒板凡鍚屾妯″瀷锛屽彲缁х画鎵嬪姩杈撳叆淇濆瓨銆?/div>'}function _(t){return E().defaultModels[V(t)]}function Yn(){const t=e.activeModelSlot,a=e.activeModelSlotContext==="contact",o=h(e.currentContactId)||e.contacts[0],n=a?{providerId:o?.settings?.modelProviderId||e.activeModelProviderId||_("chat")?.providerId||"openai",model:t==="consciousness"?o?.settings?.loopModel||"":o?.settings?.model||""}:ue(t),i=Q(n?.providerId)||Q(_("chat")?.providerId);return{slot:n,provider:i,models:i?.models||[]}}function ce(){const t=document.getElementById("model-slot-menu"),a=document.getElementById("model-slot-hint"),o=document.getElementById("model-slot-input");if(!t||!a)return;const{slot:n,models:i}=Yn(),r=o?.value||n?.model||"",s=se(r,i);if(a.textContent=Ge(r,i),!e.modelSlotMenuOpen){t.innerHTML="",t.classList.remove("open");return}t.classList.add("open"),t.innerHTML=s.length?s.map(l=>`
          <button class="provider-model-option ${String(n?.model||"").trim().toLowerCase()===String(l).toLowerCase()?"active":""}" data-action="pick-slot-model" data-slot="${e.activeModelSlot}" data-model="${u(l)}" type="button">
            ${u(l)}
          </button>
        `).join(""):'<div class="provider-model-empty">娌℃湁鍖归厤鍒板綋鍓嶄緵搴斿晢妯″瀷銆?/div>'}function ue(t){return _(V(t))}function Pt(t){const a=V(t);return{chat:"聊天模型",summary:"摘要模型",vision:"Vision 模型",translate:"翻译模型",consciousness:"意识循环模型",voice:"语音模型"}[a]||a}function le(t){const a=V(t);return{chat:"全局默认使用的聊天模型。",summary:"用于生成对话摘要，推荐选择便宜且稳定的模型。",vision:"用于识图、OCR 与截图分析的统一入口。",translate:"用于翻译消息内容，推荐选择速度快的模型。",consciousness:"用于意识循环、主动思考与相关后台能力。",voice:"用于文本转语音，读取语音服务地址与 voice ID。"}[a]||""}function za(t){const a=V(t),o=ue(a);if(a==="voice"){if(!o)return"未设置";const i=o.provider||"语音服务",r=o.voice_id||o.voiceId||"未设置";return`${i} / ${r}`}const n=Q(o?.providerId);return o?`${n?.name||"未设置"} / ${o.model||"未设置"}`:"未设置"}function Kn(t){return E().defaultPrompts?.[V(t)]||""}function Xn(t){const a=V(t);return{chat:m("comment"),summary:m("file"),vision:m("search"),translate:m("chatArrow"),consciousness:m("history"),voice:m("mic")}[a]||m("file")}function Gn(t){const a=V(t);return a!=="chat"&&a!=="voice"}function Jn(t){return`
      <article class="default-model-card">
        <div class="default-model-head">
          <div class="default-model-icon">${Xn(t)}</div>
          <div class="default-model-copy">
            <strong>${u(Pt(t))}</strong>
            <p>${u(le(t))}</p>
          </div>
          ${Gn(t)?`<button class="model-gear-btn" data-action="open-prompt-editor" data-slot="${t}" aria-label="提示词设置">${m("settings")}</button>`:'<span class="header-spacer"></span>'}
        </div>
        <button class="model-value-pill" data-action="open-model-slot" data-slot="${t}">
          <span class="model-value-badge">使</span>
          <span>${u(za(t))}</span>
        </button>
      </article>
    `}function Wn(){const t=V(e.activePromptSlot),a=Kn(t);return`
      <section class="settings-page page-block ai-settings-page ai-prompt-page">
        <div class="settings-group glass-frost ai-panel ai-form-group">
          <h3>${u(Pt(t))} 提示词</h3>
          <p class="section-eyebrow">用于定义这个能力位的默认提示词模板，后续接入对应后端任务时会直接使用这里的内容。</p>
          <textarea id="slot-prompt-input" class="ai-textarea ai-prompt-textarea" placeholder="在这里输入默认提示词">${u(a)}</textarea>
          <p class="section-eyebrow">变量位后续可以继续扩展，目前先支持按能力位单独保存。</p>
        </div>
        <div class="settings-group glass-frost ai-panel ai-prompt-actions">
          <button class="ghost-action prompt-reset-btn" data-action="reset-slot-prompt" data-slot="${t}">重置为默认</button>
          <button class="bottom-tab active prompt-save-btn" data-action="save-slot-prompt" data-slot="${t}">保存</button>
        </div>
      </section>
    `}function Zn(){const t=[{id:"奶油粉",key:"rose",desc:"柔和粉白"},{id:"云雾灰",key:"mist",desc:"冷淡浅灰"},{id:"奶油杏",key:"cream",desc:"暖调米白"}],a=e.globalSettings.theme;return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>主题模式</h3>
          <p class="section-eyebrow">选择首页和聊天页共用的浅色主题。</p>
          <div class="theme-choice-list">
            ${t.map(o=>`
              <button class="theme-choice-item ${a===o.id||a===o.key?"active":""}" data-action="pick-theme-mode" data-theme="${o.id}">
                <span class="theme-choice-copy">
                  <strong>${u(o.id)}</strong>
                  <em>${u(o.desc)}</em>
                </span>
                <span class="theme-choice-check">${a===o.id||a===o.key?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `}function ti(){const t=e.accountProfile||{};return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>我的账号</h3>
          ${$("头像","更换头像","open-account-avatar")}
          ${$("昵称",t.nickname||"小酒","open-account-nickname")}
          ${$("个性签名",t.signature||"管理个人资料与基础偏好","open-account-signature")}
          <input id="account-avatar-file" class="moment-image-input" type="file" accept="image/*" />
        </div>
      </section>
    `}function ei(t){const a=Math.max(0,Math.min(100,Number(t)||0)),o=a>60?"#c9908a":a>30?"#c8a07a":"#b0b0b8";return`<span style="display:inline-flex;align-items:center;gap:4px;font-size:10px;color:${o};">
          <span style="display:inline-block;width:${Math.round(a*.36)}px;max-width:36px;min-width:2px;height:3px;border-radius:2px;background:${o};"></span>
          ${a>0?`热度 ${a}`:""}
        </span>`}function ai(){const t=h(e.currentContactId)||e.contacts[0],a=Array.isArray(e.memoryServiceEntries)?e.memoryServiceEntries:[],o=Array.isArray(e.memoryCandidates)?e.memoryCandidates:[],n=e.memoryServiceSort||"updated_at",i=[{key:"updated_at",label:"最新"},{key:"importance",label:"最重要"},{key:"temperature",label:"有温度"}];return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>记忆服务</h3>
          <p class="section-eyebrow">当前联系人：${u(t?.name||"未命名")}。这里直接读写后端 memories，不再以本地假数据为准。</p>
          <div class="ai-inline-actions" style="margin-top:10px;">
            <button class="ghost-action" data-action="memory-service-refresh">刷新</button>
            <button class="ghost-action" data-action="memory-service-create">新建记忆</button>
          </div>
          <div class="ai-inline-actions" style="margin-top:8px;">
            ${i.map(r=>`<button class="ghost-action${n===r.key?" active":""}" data-action="memory-service-sort" data-sort="${r.key}">${r.label}</button>`).join("")}
          </div>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>记忆列表</h3>
          ${e.memoryServiceLoading?'<p class="section-eyebrow">正在加载…</p>':""}
          ${!e.memoryServiceLoading&&!a.length?'<p class="section-eyebrow">这个角色还没有记忆。</p>':""}
          ${a.map(r=>{const s=r.compressed_content||r.raw_content||r.content||"未命名记忆",l=r.importance??3,d=r.temperature??0,p="★".repeat(l)+"☆".repeat(5-l);return`
            <div class="theme-choice-item active" style="cursor:default; display:block;">
              <div class="theme-choice-copy" style="display:block;">
                <strong>${u(s)}</strong>
                <em style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:3px;">
                  <span>${u(r.category||"")}</span>
                  <span style="color:#c9908a;">${p}</span>
                  ${ei(d)}
                </em>
                ${r.expires_at?`<em>过期：${u(String(r.expires_at))}</em>`:""}
              </div>
              <div class="ai-inline-actions" style="margin-top:10px;">
                <button class="ghost-action" data-action="memory-service-edit" data-memory-id="${u(String(r.id||""))}">编辑</button>
                <button class="ghost-action" data-action="memory-service-delete" data-memory-id="${u(String(r.id||""))}">删除</button>
              </div>
            </div>`}).join("")}
        </div>
        ${o.length>0?`
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>待审记忆候选 <span style="font-size:12px;font-weight:400;color:var(--muted);">· 日循环提取，可采纳或忽略</span></h3>
          ${o.map(r=>`
            <div class="theme-choice-item active" style="cursor:default; display:block;">
              <div class="theme-choice-copy" style="display:block;">
                <strong>${u(r.content||r.summary||"")}</strong>
                <em>${u(r.category||"")} / importance ${r.importance??3}</em>
              </div>
              <div class="ai-inline-actions" style="margin-top:8px;">
                <button class="ghost-action" data-action="memory-candidate-promote" data-candidate-id="${u(String(r.id||""))}">✓ 采纳</button>
                <button class="ghost-action" data-action="memory-candidate-dismiss" data-candidate-id="${u(String(r.id||""))}">✕ 忽略</button>
              </div>
            </div>
          `).join("")}
        </div>
        `:""}
      </section>
    `}function Je(){return String(e.currentContactId||h(e.currentContactId)?.id||"default").trim()||"default"}async function wt(t=Je(),{silent:a=!0}={}){const o=String(t||"").trim();if(o){e.memoryServiceLoading=!0,c();try{const n=e.memoryServiceSort||"updated_at",i=new URLSearchParams({agent_id:o,sort_by:n,order:"desc",limit:"100"}),[r,s]=await Promise.all([fetch(`${v}/api/memories?${i.toString()}`),fetch(`${v}/api/consciousness/memory-candidates?agent_id=${encodeURIComponent(o)}&limit=20`)]);if(!r.ok)throw new Error(`HTTP ${r.status}`);const l=await r.json().catch(()=>({}));if(e.memoryServiceEntries=Array.isArray(l?.memories)?l.memories:[],s.ok){const d=await s.json().catch(()=>({}));e.memoryCandidates=Array.isArray(d?.candidates)?d.candidates:[]}}catch(n){console.warn("[memory service] load failed",n),a||(e.toast="记忆加载失败",window.setTimeout(()=>{e.toast="",c()},1200))}finally{e.memoryServiceLoading=!1,c()}}}async function oi(t){const a=Je();try{const o=await fetch(`${v}/api/consciousness/memory-candidates/${encodeURIComponent(t)}/promote?agent_id=${encodeURIComponent(a)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:"{}"});if(!o.ok)throw new Error(`HTTP ${o.status}`);e.memoryCandidates=(e.memoryCandidates||[]).filter(n=>String(n.id)!==String(t)),e.toast="✓ 已采纳为正式记忆",window.setTimeout(()=>{e.toast="",c()},1800),await wt(a,{silent:!0})}catch(o){console.warn("[memory] promote failed",o)}}async function ni(t){try{const a=await fetch(`${v}/api/consciousness/memory-candidates/${encodeURIComponent(t)}`,{method:"DELETE"});if(!a.ok)throw new Error(`HTTP ${a.status}`);e.memoryCandidates=(e.memoryCandidates||[]).filter(o=>String(o.id)!==String(t)),c()}catch(a){console.warn("[memory] dismiss failed",a)}}function Fa(t=null){const a=t||{},o=window.prompt("记忆内容",String(a.raw_content||a.content||"").trim());if(o===null)return null;const n=window.prompt("分层 / category（core_profile / recent_pending / deep / ephemeral）",String(a.category||"recent_pending"));if(n===null)return null;const i=window.prompt("可见范围（private / shared / public）",String(a.visibility||"private"));if(i===null)return null;const r=window.prompt("重要度（1-5）",String(a.importance??3));if(r===null)return null;const s=window.prompt("过期时间 ISO（可留空）",String(a.expires_at||""));return s===null?null:{agent_id:Je(),content:String(o||"").trim(),raw_content:String(o||"").trim(),category:String(n||"").trim()||"recent_pending",visibility:String(i||"").trim()||"private",importance:Math.max(1,Math.min(5,Number(r)||3)),expires_at:String(s||"").trim()||null}}async function ii(){const t=Fa();if(!t||!t.content)return;const a=await fetch(`${v}/api/memories`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),o=await a.json().catch(()=>({}));if(!a.ok)throw new Error(o?.detail||`HTTP ${a.status}`)}async function ri(t){const a=e.memoryServiceEntries.find(r=>String(r.id)===String(t));if(!a)return;const o=Fa(a);if(!o||!o.content)return;const n=await fetch(`${v}/api/memories/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}),i=await n.json().catch(()=>({}));if(!n.ok)throw new Error(i?.detail||`HTTP ${n.status}`)}async function si(t){if(!window.confirm("删除这条记忆？"))return;const a=await fetch(`${v}/api/memories/${encodeURIComponent(t)}`,{method:"DELETE"}),o=await a.json().catch(()=>({}));if(!a.ok)throw new Error(o?.detail||`HTTP ${a.status}`)}function ci(){const t=Bt();return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>同步后端</h3>
          <p class="section-eyebrow">前端快照会本地保存，并自动 push/pull 到后端。</p>
          ${$("数据库","Supabase")}
          ${$("后端接口",v)}
          ${$("设备 ID",Oe())}
          ${$("上次同步",W(t.last_server_updated_at,{fallback:"暂无",includeYear:!0}))}
          <div class="ai-inline-actions" style="margin-top:10px;">
            <button class="ghost-action" data-action="sync-pull-now">立即拉取</button>
            <button class="ghost-action" data-action="sync-push-now">立即上传</button>
          </div>
        </div>
      </section>
    `}function ui(){const t=e.globalSettings;return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>导出格式</h3>
          <div class="theme-choice-list">
            ${["Markdown","JSON","TXT"].map(o=>`
              <button class="theme-choice-item ${t.exportFormat===o?"active":""}" data-action="pick-export-format" data-format="${o}">
                <span class="theme-choice-copy">
                  <strong>${u(o)}</strong>
                  <em>用于聊天记录导出</em>
                </span>
                <span class="theme-choice-check">${t.exportFormat===o?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `}function $(t,a,o="noop",n={}){const i=Object.entries(n).map(([r,s])=>` data-${r}="${u(String(s))}"`).join("");return`
      <button class="setting-row nav-row" data-action="${o}"${i}>
        <div class="setting-copy"><strong>${u(t)}</strong>${a?`<p>${u(a)}</p>`:""}</div>
        <span class="row-chevron">${m("chevron")}</span>
      </button>
    `}function j(t,a){e.viewStack.push(e.currentView),typeof a=="function"&&a(),e.currentView=t,c()}function li(){e.currentView=e.viewStack.pop()||"settings",c()}async function di(){try{const t=await fetch(`${v}/api/settings/ai`);if(!t.ok)return;const a=await t.json();jn(a.settings?.aiSettings||a.settings?.ai||a.settings?.ai_settings||a.settings||{}),c()}catch(t){console.warn("[ai settings] load failed",t)}}async function Ua({silent:t=!0}={}){try{const a=new URLSearchParams({viewer_type:"user",viewer_id:"me"}),o=await fetch(`${v}/api/moments?${a.toString()}`);if(!o.ok){if(!t)throw new Error(`HTTP ${o.status}`);return}const n=await o.json().catch(()=>({}));if(!Array.isArray(n?.moments))return;n.moments.length>0&&(e.moments=xa(e.moments,n.moments),w(120)),c()}catch(a){console.warn("[moments] load failed",a),t||(e.toast="朋友圈加载失败",c(),window.setTimeout(()=>{e.toast="",c()},1400))}}async function pi(t){const a=await fetch(`${v}/api/moments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),o=await a.json().catch(()=>({}));if(!a.ok)throw new Error(o?.detail||`HTTP ${a.status}`);return A(o?.moment||t)}async function mi(t,a){const o=await fetch(`${v}/api/moments/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),n=await o.json().catch(()=>({}));if(!o.ok)throw new Error(n?.detail||`HTTP ${o.status}`);return n}async function fi(t,a,o){const n=new URLSearchParams({author_type:String(a||"user"),author_id:String(o||"me")}),i=await fetch(`${v}/api/moments/${encodeURIComponent(t)}?${n.toString()}`,{method:"DELETE"}),r=await i.json().catch(()=>({}));if(!i.ok)throw new Error(r?.detail||`HTTP ${i.status}`);return r}async function gi(t,a){const o=await fetch(`${v}/api/moments/${encodeURIComponent(t)}/like`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({actor_type:a.author_type,actor_id:a.author_id,actor_name:a.author_name})}),n=await o.json().catch(()=>({}));if(!o.ok)throw new Error(n?.detail||`HTTP ${o.status}`);return A(n?.moment||{})}async function bi(t,a,o){const n=await fetch(`${v}/api/moments/${encodeURIComponent(t)}/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({actor_type:a.author_type,actor_id:a.author_id,actor_name:a.author_name,text:o})}),i=await n.json().catch(()=>({}));if(!n.ok)throw new Error(i?.detail||`HTTP ${n.status}`);return A(i?.moment||{})}async function hi(t,a){const o=e.currentContactId||"",n=(a||"").trim()||null,i={agentId:o};if(t==="impression")i.impression=n;else if(t==="relationshipProgress")i.relationshipProgress=n;else if(t==="likesSummary")i.likesSummary=n;else return;try{e.toast="保存中…",c();const r=await fetch(`${v}/api/companion-state/summary`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!r.ok)throw new Error(`HTTP ${r.status}`);const s=await r.json().catch(()=>({}));e.companionState=_t(s?.state||e.companionState),e.toast="已保存",c(),window.setTimeout(()=>{e.toast="",c()},1200)}catch(r){console.warn("[insight save]",r),e.toast="保存失败",c(),window.setTimeout(()=>{e.toast="",c()},1400)}}async function at(t=e.currentContactId,{silent:a=!0}={}){try{const o=String(t||"").trim(),n=o?`?agent_id=${encodeURIComponent(o)}`:"",i=await fetch(`${v}/api/companion-state${n}`);if(!i.ok){if(!a)throw new Error(`HTTP ${i.status}`);return}const r=await i.json().catch(()=>({}));e.companionState=_t(r?.state||{}),c()}catch(o){console.warn("[companion state] load failed",o),a||(e.toast="状态读取失败",c(),window.setTimeout(()=>{e.toast="",c()},1200))}}async function zt(t,{silent:a=!0}={}){const o=String(t||"").trim();if(!o)return"";try{const n=await fetch(`${v}/api/agents/${encodeURIComponent(o)}/persona`);if(!n.ok){if(!a)throw new Error(`HTTP ${n.status}`);return""}const i=await n.json().catch(()=>({})),r=h(o);return r&&(r.persona=String(i?.persona||""),e.currentView==="contactSettings"&&e.currentContactId===o&&c()),String(i?.persona||"")}catch(n){return console.warn("[agent persona] load failed",n),a||(e.toast="浜鸿璇诲彇澶辫触",c(),window.setTimeout(()=>{e.toast="",c()},1200)),""}}async function vi(t,a){const o=String(t||"").trim();if(o)try{await fetch(`${v}/api/agents/${encodeURIComponent(o)}/persona`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({persona:String(a||"")})})}catch(n){console.warn("[agent persona] save failed",n)}}function yi(t,a,o=260){const n=String(t||"").trim();if(!n)return;ft.has(n)&&clearTimeout(ft.get(n));const i=window.setTimeout(()=>{ft.delete(n),vi(n,a)},o);ft.set(n,i)}async function Qa({silent:t=!0}={}){try{const a=await fetch(`${v}/api/mcp/library`);if(!a.ok){if(!t)throw new Error(`HTTP ${a.status}`);return}const o=await a.json();if(!Array.isArray(o.tools))return;const n=E(),i=o.tools.map(it).filter(r=>bt(r.id));n.mcpLibrary={...n.mcpLibrary||{},tools:i},P(),c()}catch(a){console.warn("[mcp library] load failed",a),t||(e.toast="同步 MCP 工具失败",c(),window.setTimeout(()=>{e.toast="",c()},1300))}}async function P(){re(),e.aiSettingsSaving=!0;try{await fetch(`${v}/api/settings/ai`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({settings:{...e.globalSettings,aiSettings:E()}})})}catch(t){console.error("[ai settings] save failed",t)}finally{e.aiSettingsSaving=!1}}function wi(){const t=E(),a=(t.mcpLibrary?.tools||[]).filter(o=>o.enabled!==!1).length;return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel">
          <h3>AI 接口</h3>
          ${$("默认模型","聊天 / 摘要 / Vision / 翻译 / 意识循环 / 语音","open-default-models")}
          ${$("模型供应商",`共 ${t.providers.length} 个`,"open-provider-catalog")}
          ${$("MCP 工具库",`已启用 ${a} 个`,"open-mcp-library")}
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>当前聊天默认</h3>
          ${$("聊天模型",za("chat"))}
        </div>
      </section>
    `}function $i(){const t=E();return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <div class="ai-inline-actions">
            <h3 style="margin:0;">MCP 工具库</h3>
            <button class="ghost-action" data-action="sync-mcp-library">同步工具</button>
          </div>
          <p class="section-eyebrow">只展示聊天主动场景常用工具，同步到输入框上方分类。</p>
          ${(Array.isArray(t.mcpLibrary?.tools)?t.mcpLibrary.tools:[]).map(it).filter(o=>bt(o.id)).map(o=>`
            <div class="provider-catalog-row">
              <div class="provider-row-main" style="cursor:default;">
                <div class="setting-copy">
                  <strong>${u(o.label||o.id||"")}</strong>
                  <p>${u(o.description||o.prompt||o.id||"")}</p>
                </div>
              </div>
              <button class="switch-btn ${o.enabled!==!1?"on":"off"}" data-action="toggle-mcp-tool" data-tool-id="${u(o.id||"")}" aria-pressed="${o.enabled!==!1}">
                ${Wt(o.enabled!==!1)}
              </button>
            </div>
          `).join("")}
        </div>
      </section>
    `}function Si(){return`
      <section class="settings-page page-block ai-settings-page">
        <div class="default-model-list">
          ${["chat","summary","vision","translate","consciousness","voice"].map(a=>Jn(a)).join("")}
        </div>
      </section>
    `}function ki(){const t=V(e.activeModelSlot),a=e.activeModelSlotContext==="contact",o=h(e.currentContactId)||e.contacts[0];if(!a&&t==="voice"){const d=ue("voice")||{};return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>${u(Pt("voice"))}</h3>
          <p class="section-eyebrow">${u(le("voice"))}</p>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>语音服务配置</h3>
          <label class="ai-field-label">Provider</label>
          <input id="voice-slot-provider-input" class="ai-input" value="${u(d.provider||"")}" placeholder="voice-mcp" />
          <label class="ai-field-label">Service URL</label>
          <input id="voice-slot-service-url-input" class="ai-input" value="${u(d.service_url||d.base_url||"")}" placeholder="https://voice.example.com/speak" />
          <label class="ai-field-label">Voice ID</label>
          <input id="voice-slot-voice-id-input" class="ai-input" value="${u(d.voice_id||d.voiceId||"")}" placeholder="default voice_id" />
          <label class="ai-field-label">Speaker</label>
          <input id="voice-slot-speaker-input" class="ai-input" value="${u(d.speaker||"")}" placeholder="可选 speaker" />
          <label class="ai-field-label">Emotion</label>
          <input id="voice-slot-emotion-input" class="ai-input" value="${u(d.emotion||"")}" placeholder="可选 emotion" />
          <label class="ai-field-label">Speed</label>
          <input id="voice-slot-speed-input" class="ai-input" value="${u(d.speed??1)}" placeholder="1.0" />
          <label class="ai-field-label">Format</label>
          <input id="voice-slot-format-input" class="ai-input" value="${u(d.format||"")}" placeholder="audio/mpeg" />
        </div>
      </section>
    `}const n=a?{providerId:o?.settings?.modelProviderId||e.activeModelProviderId||_("chat")?.providerId||"openai",model:t==="consciousness"?o?.settings?.loopModel||"":o?.settings?.model||""}:ue(t),i=E().providers.filter(d=>d.enabled),s=(Q(n.providerId)||Q(_("chat")?.providerId)||i[0])?.models||[];if(a){const d=se(n.model||"",s);return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>${u(Pt(t))}</h3>
          <p class="section-eyebrow">${u(le(t))}</p>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>模型供应商</h3>
          <div class="ai-chip-row">
            ${i.map(p=>`<button class="ai-chip ${n.providerId===p.id?"active":""}" data-action="pick-slot-provider" data-slot="${t}" data-provider-id="${p.id}">${u(p.name)}</button>`).join("")}
          </div>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>模型列表</h3>
          <div class="provider-model-picker">
            <div class="provider-model-input-row">
              <input id="model-slot-input" class="ai-input provider-model-input" value="${u(n.model||"")}" placeholder="${u(s[0]||"杈撳叆鎴栭€夋嫨妯″瀷")}" autocomplete="off" />
              <button class="provider-model-toggle" data-action="toggle-model-slot-menu" type="button" aria-label="灞曞紑妯″瀷鍒楄〃">
                ${m("chevron")}
              </button>
            </div>
            <p id="model-slot-hint" class="section-eyebrow provider-model-hint">${u(Ge(n.model||"",s))}</p>
            <div id="model-slot-menu" class="provider-model-menu ${e.modelSlotMenuOpen?"open":""}">
              ${e.modelSlotMenuOpen?d.length?d.map(p=>`
                  <button class="provider-model-option ${n.model===p?"active":""}" data-action="pick-slot-model" data-slot="${t}" data-model="${u(p)}" type="button">
                    ${u(p)}
                  </button>
                `).join(""):'<div class="provider-model-empty">没有匹配到当前供应商模型。</div>':""}
            </div>
          </div>
          <div class="model-choice-list">
            ${s.length?s.map(p=>`
              <button class="model-choice-item ${n.model===p?"active":""}" data-action="pick-slot-model" data-slot="${t}" data-model="${u(p)}">
                <span class="model-choice-name">${u(p)}</span>
                <span class="model-choice-check">${n.model===p?"已选":""}</span>
              </button>
            `).join(""):'<div class="model-choice-empty">当前供应商还没有可选模型</div>'}
          </div>
        </div>
      </section>
    `}const l=se(n.model||"",s);return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>${u(Pt(t))}</h3>
          <p class="section-eyebrow">${u(le(t))}</p>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>模型供应商</h3>
          <div class="ai-chip-row">
            ${i.map(d=>`<button class="ai-chip ${n.providerId===d.id?"active":""}" data-action="pick-slot-provider" data-slot="${t}" data-provider-id="${d.id}">${u(d.name)}</button>`).join("")}
          </div>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>模型列表</h3>
          <div class="provider-model-picker">
            <div class="provider-model-input-row">
              <input id="model-slot-input" class="ai-input provider-model-input" value="${u(n.model||"")}" placeholder="${u(s[0]||"杈撳叆鎴栭€夋嫨妯″瀷")}" autocomplete="off" />
              <button class="provider-model-toggle" data-action="toggle-model-slot-menu" type="button" aria-label="展开模型列表">
                ${m("chevron")}
              </button>
            </div>
            <p id="model-slot-hint" class="section-eyebrow provider-model-hint">${u(Ge(n.model||"",s))}</p>
            <div id="model-slot-menu" class="provider-model-menu ${e.modelSlotMenuOpen?"open":""}">
              ${e.modelSlotMenuOpen?l.length?l.map(d=>`
                  <button class="provider-model-option ${n.model===d?"active":""}" data-action="pick-slot-model" data-slot="${t}" data-model="${u(d)}" type="button">
                    ${u(d)}
                  </button>
                `).join(""):'<div class="provider-model-empty">没有匹配到当前供应商模型。</div>':""}
            </div>
          </div>
          <div class="model-choice-list">
            ${s.length?s.map(d=>`
              <button class="model-choice-item ${n.model===d?"active":""}" data-action="pick-slot-model" data-slot="${t}" data-model="${u(d)}">
                <span class="model-choice-name">${u(d)}</span>
                <span class="model-choice-check">${n.model===d?"已选":""}</span>
              </button>
            `).join(""):'<div class="model-choice-empty">当前供应商还没有可选模型，请先在“模型供应商”页选择并保存</div>'}
          </div>
        </div>
      </section>
    `}function Ii(t){return`
      <div class="provider-catalog-row">
        <button class="provider-row-main" data-action="open-provider-editor" data-provider="${t.id}">
          <div class="setting-copy">
            <strong>${u(t.name)}</strong>
            <p>${u(t.defaultModel||"未设置默认模型")}</p>
          </div>
          <span class="provider-inline-state ${t.enabled?"enabled":"disabled"}">${t.enabled?"已启用":"已禁用"}</span>
          <span class="row-chevron">${m("chevron")}</span>
        </button>
        <button class="switch-btn ${t.enabled?"on":"off"}" data-action="toggle-provider-enabled" data-provider-id="${t.id}" aria-pressed="${t.enabled}">
          ${Wt(t.enabled)}
        </button>
      </div>
    `}function _i(){const t=e.providerSearch.trim().toLowerCase(),a=E().providers.filter(o=>!t||o.name.toLowerCase().includes(t)||o.id.toLowerCase().includes(t)).sort((o,n)=>{const i=+!!n.enabled-+!!o.enabled;return i!==0?i:String(o.name||o.id||"").localeCompare(String(n.name||n.id||""),"zh-Hans-CN")});return`
      <section class="settings-page page-block ai-settings-page">
        <div class="search-pill glass-frost ai-search-row">
          <span class="search-icon">${m("search")}</span>
          <input class="ai-search-input" value="${u(e.providerSearch)}" data-action="provider-search" placeholder="搜索供应商" />
        </div>
        <div class="settings-group glass-frost ai-panel provider-catalog-group">
          ${a.map(o=>Ii(o)).join("")}
        </div>
      </section>
    `}function Mi(t){const a=Array.isArray(t._allModels)?t._allModels:[],o=t._selectedModelIds instanceof Set?t._selectedModelIds:new Set(t._selectedModelIds||[]),n=o.size,i={};for(const g of a){const I=g.vendor||"Other";i[I]||(i[I]=[]),i[I].push(g)}const r=["OpenAI","Anthropic","Google","DeepSeek","Qwen","GLM","Meta","Mistral","Moonshot","璞嗗寘","鏂囧績","娣峰厓","鐧惧窛","鏄熺伀","闆朵竴涓囩墿","InternLM","Other"],s=[...new Set([...r.filter(g=>i[g]),...Object.keys(i)])],l=a.map(g=>g.id),d=l.length>0&&l.every(g=>o.has(g)),p=s.map(g=>{const I=i[g]||[],x=!!e.providerModelVendorOpen[g],k=I.filter(S=>o.has(S.id)).length,M=I.length>0&&I.every(S=>o.has(S.id)),q=x?`
          <div class="vendor-group-body">
            ${I.map(S=>{const T=o.has(S.id);return`
              <div class="pool-model-row">
                <span class="pool-model-name">${u(S.name)}</span>
                <span class="pool-model-caps">${Qn(S)}</span>
                <button class="pool-model-btn${T?" selected":""}"
                  data-action="${T?"remove-provider-model":"add-provider-model"}"
                  data-model-id="${u(S.id)}" type="button">${T?"−":"+"}</button>
              </div>`}).join("")}
          </div>`:"";return`
        <div class="vendor-group">
          <div class="vendor-group-head">
            <button class="vendor-group-toggle" data-action="toggle-provider-vendor-group" data-vendor="${u(g)}" type="button">
              <span class="vendor-group-name">${u(g)}</span>
              ${k?`<span class="vendor-group-sel">${k} 已选</span>`:""}
              <span class="vendor-group-badge">${I.length}</span>
              <span class="vendor-group-chevron${x?" open":""}">${m("chevron")}</span>
            </button>
            <button class="pool-vendor-selall${M?" all-selected":""}" data-action="toggle-vendor-all-provider-models" data-vendor="${u(g)}" type="button" title="${M?"全不选":"全选"}">${M?"−全":"+全"}</button>
          </div>
          ${q}
        </div>`}).join(""),f=a.length?"":'<p class="pool-model-empty" style="padding:10px 2px;">还没有模型，点击“同步模型”获取，或手动添加。</p>';return`
      <div class="prov-model-pool">
        <div class="prov-pool-header">
          <span class="prov-pool-count">${n?`已选 <strong>${n}</strong> 个模型`:"还没有已选模型"}</span>
          ${a.length?`<button class="pool-selall-btn${d?" all-selected":""}" data-action="toggle-all-provider-models" type="button">${d?"全不选":"全选"}</button>`:""}
        </div>
        ${f}
        ${p}
        <div class="pool-manual-row">
          <input id="provider-manual-model-input" class="ai-input provider-model-input" placeholder="手动输入模型名" autocomplete="off" />
          <button class="pool-manual-add-btn" data-action="add-manual-provider-model" type="button">＋</button>
        </div>
      </div>`}function xi(){const t=R(),a=Ht(t.apiPath||t.api_path||"",{allowEmpty:!0}),o=Hn(t),n=!!e.providerAdvancedOpen||!!a;return`
      <section class="settings-page page-block ai-settings-page provider-editor-page">
        <div class="settings-group glass-frost ai-panel provider-editor-card">

          <div class="prov-sec">
            <h3 class="prov-sec-title">接口配置</h3>
            <label class="ai-field-label">名称</label>
            <input id="provider-name-input" class="ai-input" value="${u(t.name||"")}" placeholder="例如 SiliconFlow" />
            <label class="ai-field-label">Base URL</label>
            <input id="provider-base-input" class="ai-input" value="${u(t.baseUrl||"")}" placeholder="https://api.example.com/v1" />
            <div class="provider-advanced-head">
              <span class="section-eyebrow">Base URL 与 API 路径一起拼接请求地址</span>
              <button class="provider-advanced-toggle" data-action="toggle-provider-advanced" type="button">
                <span>高级选项</span>
                <span class="advanced-chevron ${n?"open":""}">${m("chevron")}</span>
              </button>
            </div>
            <div class="provider-advanced-panel ${n?"open":""}">
              <label class="ai-field-label">API 路径（可选）</label>
              <input id="provider-api-path-input" class="ai-input" value="${u(a)}" placeholder="${u(o)}" />
              <p class="section-eyebrow">留空时自动使用 ${u(o)}</p>
            </div>
            <label class="ai-field-label">API Key</label>
            <input id="provider-key-input" class="ai-input" value="${u(t.apiKey||"")}" placeholder="sk-..." />
          </div>

          <div class="prov-sec-divider"></div>

          <div class="prov-sec">
            <h3 class="prov-sec-title">默认模型</h3>
            <div class="provider-model-picker">
              <div class="provider-model-input-row">
                <input id="provider-default-model-input" class="ai-input provider-model-input" value="${u(t.defaultModel||"")}" placeholder="gpt-5.4" autocomplete="off" />
                <button class="provider-model-toggle" data-action="toggle-provider-model-menu" type="button" aria-label="展开模型列表">
                  ${m("chevron")}
                </button>
              </div>
              <p id="provider-default-model-hint" class="section-eyebrow provider-model-hint">${u(ja(t.defaultModel||"",t.models||[]))}</p>
              <div id="provider-default-model-menu" class="provider-model-menu ${e.providerModelMenuOpen?"open":""}"></div>
            </div>
          </div>

          <div class="prov-sec-divider"></div>

          <div class="prov-sec">
            <div class="prov-sec-title-row">
              <h3 class="prov-sec-title" style="margin:0;">模型列表</h3>
              <button class="prov-sync-btn" data-action="sync-provider-models" data-provider="${t.id}" type="button">${m("reroll")}同步</button>
            </div>
            ${Mi(t)}
            <p class="section-eyebrow" style="margin-top:4px;">同步会尝试请求 /models 接口；不兼容时可手动添加。</p>
          </div>

          <div class="prov-sec-divider"></div>

          ${Z("启用供应商","关闭后将不会出现在模型选择中",!!t.enabled,"toggle-provider-enabled",t.id)}

          <div class="prov-save-row">
            <button class="prov-save-btn-main" data-action="save-provider-editor" data-provider="${t.id}" type="button">保存供应商</button>
          </div>
        </div>
      </section>
    `}async function Ci(){const t=document.getElementById("provider-base-input")?.value?.trim()||"",a=document.getElementById("provider-key-input")?.value?.trim()||"";if(!t){alert("请先填写 Base URL 再同步模型");return}try{const o=await fetch(`${v}/api/settings/ai/discover-models`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({base_url:t,api_key:a})}),n=await o.json().catch(()=>({}));if(!o.ok)throw new Error(n.detail||"同步失败");const i=Array.isArray(n.models)?n.models:[],r=R(),s=new Set((r._allModels||[]).map(g=>g.id)),l=i.map(Xe),d=[...l,...(r._allModels||[]).filter(g=>!i.includes(g.id))];r._allModels=d,[...new Set(l.map(g=>g.vendor))].forEach(g=>{e.providerModelVendorOpen[g]=!0}),r._selectedModelIds instanceof Set||(r._selectedModelIds=new Set(r._selectedModelIds||[])),r.models=[...r._selectedModelIds];const f=document.getElementById("provider-default-model-input");f&&(!f.value||!i.includes(f.value))&&(f.value=i[0]||f.value),r.defaultModel=f?.value?.trim()||r.defaultModel||"",c(),yt(),alert(i.length?`已同步 ${i.length} 个模型，请在模型池中选择需要的模型`:"接口已连接，但供应商没有返回可用模型")}catch(o){const n=String(o?.message||"同步模型失败");if(n.includes("Failed to fetch")){alert("同步失败：当前前端连不上后端接口。请确认 API base 配置正确，且后端可以访问。");return}alert(`同步失败：${n}`)}}Xt=function(){return Qe.has(e.currentView)?!1:Rn()},ke=function(){if(!Qe.has(e.currentView))return Vn();const a={aiInterface:"AI 接口",mcpLibrary:"MCP 工具库",themeSettings:"主题模式",accountSettings:"我的账号",memoryService:"记忆服务",backendSync:"同步后端",exportSettings:"导出格式",defaultModels:"默认模型",modelSlot:Pt(e.activeModelSlot),providerCatalog:"模型供应商",providerEditor:"编辑供应商",promptEditor:"提示词"},o=`chat-page-title ${e.currentView==="providerCatalog"?"provider-catalog-title":""}`.trim(),n=e.currentView==="providerCatalog"?`<button class="icon-btn ghost-circle" data-action="open-provider-editor-new" aria-label="新增供应商">${m("plus")}</button>`:'<span class="header-spacer"></span>';return`
      <header class="chat-page-header simple-header">
        <button class="icon-btn text-btn" data-action="back-sub-settings" aria-label="返回">${m("back")}</button>
        <div class="${o}">${u(a[e.currentView]||"设置")}</div>
        ${n}
      </header>
    `},Ie=function(){return e.currentView==="accountSettings"?ti():e.currentView==="memoryService"?ai():e.currentView==="backendSync"?ci():e.currentView==="exportSettings"?ui():e.currentView==="themeSettings"?Zn():e.currentView==="aiInterface"?wi():e.currentView==="mcpLibrary"?$i():e.currentView==="defaultModels"?Si():e.currentView==="modelSlot"?ki():e.currentView==="providerCatalog"?_i():e.currentView==="providerEditor"?xi():e.currentView==="promptEditor"?Wn():Bn()},Pe=function(a){const o=a.target.closest("[data-action]"),n=o?.dataset.action;if(!n)return Ba(a);if(n==="open-ai-interface")return j("aiInterface");if(n==="open-mcp-library")return j("mcpLibrary");if(n==="open-theme-settings")return j("themeSettings");if(n==="open-account-settings")return j("accountSettings");if(n==="open-account-avatar"){document.getElementById("account-avatar-file")?.click();return}if(n==="open-account-nickname"){const i=window.prompt("请输入昵称",e.accountProfile?.nickname||"小酒")?.trim();if(!i)return;e.accountProfile.nickname=i,e.toast="昵称已更新",c(),P(),w(120),window.setTimeout(()=>{e.toast="",c()},1200);return}if(n==="open-account-signature"){const i=window.prompt("请输入个性签名",e.accountProfile?.signature||"")?.trim();if(!i)return;e.accountProfile.signature=i,e.toast="个性签名已更新",c(),P(),w(120),window.setTimeout(()=>{e.toast="",c()},1200);return}if(n==="open-memory-service")return j("memoryService",()=>{wt(e.currentContactId)});if(n==="memory-service-refresh"){wt(e.currentContactId,{silent:!1});return}if(n==="memory-service-sort"){e.memoryServiceSort=o.dataset.sort||"updated_at",wt(e.currentContactId,{silent:!0});return}if(n==="memory-candidate-promote"){oi(o.dataset.candidateId);return}if(n==="memory-candidate-dismiss"){ni(o.dataset.candidateId);return}if(n==="memory-service-create"){ii().then(()=>wt(e.currentContactId,{silent:!1})).catch(i=>{console.warn("[memory service] create failed",i),e.toast="新建记忆失败",c(),window.setTimeout(()=>{e.toast="",c()},1200)});return}if(n==="memory-service-edit"){ri(o.dataset.memoryId).then(()=>wt(e.currentContactId,{silent:!1})).catch(i=>{console.warn("[memory service] update failed",i),e.toast="编辑记忆失败",c(),window.setTimeout(()=>{e.toast="",c()},1200)});return}if(n==="memory-service-delete"){si(o.dataset.memoryId).then(()=>wt(e.currentContactId,{silent:!1})).catch(i=>{console.warn("[memory service] delete failed",i),e.toast="删除记忆失败",c(),window.setTimeout(()=>{e.toast="",c()},1200)});return}if(n==="open-backend-sync")return j("backendSync");if(n==="sync-pull-now"){Oa();return}if(n==="sync-push-now"){st(),vt(30),e.toast="已加入上传队列",c(),window.setTimeout(()=>{e.toast="",c()},1e3);return}if(n==="open-export-settings")return j("exportSettings");if(n==="open-default-models")return j("defaultModels");if(n==="open-model-slot")return j("modelSlot",()=>{if(e.activeModelSlot=V(o.dataset.slot),e.activeModelSlotContext=o.dataset.context==="contact"?"contact":"global",e.modelSlotMenuOpen=!1,e.activeModelSlotContext==="contact"){const i=N();e.activeModelProviderId=i?.settings?.modelProviderId||_("chat")?.providerId||e.activeModelProviderId||"openai"}else e.activeModelProviderId=_("chat")?.providerId||e.activeModelProviderId||"openai"});if(n==="open-provider-catalog")return j("providerCatalog");if(n==="open-provider-editor-new")return j("providerEditor",()=>{e.providerDraftId=`custom_${Date.now()}`,e.providerAdvancedOpen=!1,e.providerModelMenuOpen=!1,e.providerEditorDraft=Ke(e.providerDraftId)});if(n==="open-provider-editor")return j("providerEditor",()=>{e.providerDraftId=o.dataset.provider;const i=Q(e.providerDraftId);e.providerAdvancedOpen=!!String(i?.apiPath||i?.api_path||"").trim(),e.providerModelMenuOpen=!1,e.providerEditorDraft=Ke(e.providerDraftId)});if(n==="open-prompt-editor")return j("promptEditor",()=>{e.activePromptSlot=V(o.dataset.slot)});if(n==="back-sub-settings")return li();if(n==="sync-provider-models"){Ci();return}if(n==="toggle-provider-advanced"){e.providerAdvancedOpen=!e.providerAdvancedOpen,c();return}if(n==="toggle-model-slot-menu"){e.modelSlotMenuOpen=!e.modelSlotMenuOpen,ce();return}if(n==="toggle-provider-model-menu"){e.providerModelMenuOpen=!e.providerModelMenuOpen,yt();return}if(n==="pick-provider-default-model"){const i=o.dataset.model||"",r=R();r.defaultModel=i;const s=document.getElementById("provider-default-model-input");s&&(s.value=i),e.providerModelMenuOpen=!1,yt();return}if(n==="pick-slot-provider"){if(e.activeModelSlotContext==="contact"){const s=N(),l=o.dataset.providerId||e.activeModelProviderId,d=Q(l);e.activeModelProviderId=l,e.modelSlotMenuOpen=!1,s?.settings&&(s.settings.modelProviderId=l,(!s.settings.model||!(d?.models||[]).includes(s.settings.model))&&(s.settings.model=d?.defaultModel||d?.models?.[0]||s.settings.model||"")),c(),w(150);return}const i=_(o.dataset.slot);i.providerId=o.dataset.providerId;const r=Q(i.providerId);r&&(i.model=r.defaultModel||r.models?.[0]||i.model),e.modelSlotMenuOpen=!1,c(),P();return}if(n==="toggle-all-provider-models"){const i=R();i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[]));const s=(Array.isArray(i._allModels)?i._allModels:[]).map(d=>d.id);s.length>0&&s.every(d=>i._selectedModelIds.has(d))?s.forEach(d=>i._selectedModelIds.delete(d)):s.forEach(d=>i._selectedModelIds.add(d)),i.models=[...i._selectedModelIds],c();return}if(n==="toggle-vendor-all-provider-models"){const i=o.dataset.vendor,r=R();r._selectedModelIds instanceof Set||(r._selectedModelIds=new Set(r._selectedModelIds||[]));const l=(Array.isArray(r._allModels)?r._allModels:[]).filter(p=>(p.vendor||"Other")===i).map(p=>p.id);l.length>0&&l.every(p=>r._selectedModelIds.has(p))?l.forEach(p=>r._selectedModelIds.delete(p)):l.forEach(p=>r._selectedModelIds.add(p)),r.models=[...r._selectedModelIds],c();return}if(n==="toggle-provider-vendor-group"){const i=o.dataset.vendor;i&&(e.providerModelVendorOpen[i]=!e.providerModelVendorOpen[i]),c();return}if(n==="add-provider-model"){const i=R();i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[]));const r=o.dataset.modelId;r&&i._selectedModelIds.add(r),i.models=[...i._selectedModelIds],c();return}if(n==="remove-provider-model"){const i=R();i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[]));const r=o.dataset.modelId;r&&i._selectedModelIds.delete(r),i.models=[...i._selectedModelIds],c();return}if(n==="add-manual-provider-model"){const i=R(),s=(document.getElementById("provider-manual-model-input")?.value||"").trim();if(!s)return;if(i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[])),Array.isArray(i._allModels)||(i._allModels=[]),!i._allModels.some(l=>l.id===s)){i._allModels.push(Xe(s));const l=Na(s);e.providerModelVendorOpen[l]=!0}i._selectedModelIds.add(s),i.models=[...i._selectedModelIds],c();return}if(n==="toggle-slot-vendor-group"){const i=o.dataset.providerId;i&&(e.slotVendorGroupOpen[i]=!e.slotVendorGroupOpen[i]),c();return}if(n==="add-model-to-slot"){const i=o.dataset.slot,r=o.dataset.providerId,s=o.dataset.model;if(!i||!r||!s)return;const l=_(i);Array.isArray(l.selectedModels)||(l.selectedModels=[]),l.selectedModels.some(d=>d.providerId===r&&d.model===s)||l.selectedModels.push({providerId:r,model:s}),c(),P();return}if(n==="remove-model-from-slot"){const i=o.dataset.slot,r=o.dataset.providerId,s=o.dataset.model;if(!i||!s)return;const l=_(i);Array.isArray(l.selectedModels)&&(l.selectedModels=l.selectedModels.filter(d=>!(d.providerId===r&&d.model===s))),c(),P();return}if(n==="add-manual-slot-model"){const i=o.dataset.slot,s=(document.getElementById("model-slot-manual-input")?.value||"").trim();if(!i||!s)return;const l=_(i);Array.isArray(l.manualModels)||(l.manualModels=[]),l.manualModels.includes(s)||l.manualModels.push(s),c(),P();return}if(n==="remove-manual-slot-model"){const i=o.dataset.slot,r=o.dataset.model;if(!i||!r)return;const s=_(i);Array.isArray(s.manualModels)&&(s.manualModels=s.manualModels.filter(l=>l!==r)),c(),P();return}if(n==="pick-theme-mode"){e.globalSettings.theme=o.dataset.theme||e.globalSettings.theme,c(),P();return}if(n==="pick-export-format"){e.globalSettings.exportFormat=o.dataset.format||e.globalSettings.exportFormat,c(),P();return}if(n==="toggle-mcp-tool"){const i=o.dataset.toolId,l=(E().mcpLibrary?.tools||[]).find(d=>String(d.id)===String(i));if(!l)return;l.enabled=l.enabled===!1,fa(o,l.enabled!==!1),P();return}if(n==="sync-mcp-library"){Qa({silent:!1});return}if(n==="edit-contact-quick-action"){if(e.quickActionDragId)return;an(o.dataset.quickId||"");return}if(n==="add-contact-quick-action"){const i=N(),r=ht(i),s=`custom_${Date.now()}`;r.push({id:s,label:"新快捷动作",icon:"more",prompt:"",mcpToolId:"",enabled:!0}),i.settings.quickActions=r,e.contactQuickActionEditorId=s,c(),w(150);return}if(n==="close-contact-quick-action-editor"){if(a.target.closest('[data-stop-close="1"]')&&!a.target.hasAttribute("data-action"))return;e.contactQuickActionEditorId="",e.contactQuickMcpMenuOpen=!1,c();return}if(n==="toggle-contact-quick-mcp-menu"){e.contactQuickMcpMenuOpen=!e.contactQuickMcpMenuOpen,o.closest(".qae-select-shell")?.classList.toggle("open",e.contactQuickMcpMenuOpen);return}if(n==="pick-contact-quick-mcp"){const i=o.closest(".qae-select-shell"),r=o.dataset.mcpId||"",s=document.getElementById("contact-quick-mcp");s&&(s.value=r);const l=o.textContent?.trim()||"不调用 MCP",d=i?.querySelector(".qae-select-trigger span");d&&(d.textContent=l),i?.querySelectorAll(".qae-select-option").forEach(p=>{p.classList.toggle("active",p===o)}),e.contactQuickMcpMenuOpen=!1,i?.classList.remove("open");return}if(n==="save-contact-quick-action"){const i=N(),r=ht(i),s=o.dataset.quickId||"",l=r.find(d=>d.id===s);if(!l)return;l.label=(document.getElementById("contact-quick-label")?.value||l.label||"").trim()||l.label||"蹇嵎鍔ㄤ綔",l.prompt=(document.getElementById("contact-quick-prompt")?.value||"").trim(),l.mcpToolId=(document.getElementById("contact-quick-mcp")?.value||"").trim(),l.mcpToolId&&bt(l.mcpToolId)&&(l.id=l.id||l.mcpToolId),i.settings.quickActions=r,e.contactQuickActionEditorId="",c(),w(150);return}if(n==="delete-contact-quick-action"){const i=N(),r=o.dataset.quickId||"",s=ht(i).filter(l=>l.id!==r);i.settings.quickActions=s,e.contactQuickActionEditorId===r&&(e.contactQuickActionEditorId=""),e.quickActionSwipeOpenId="",c(),w(150);return}if(n==="pick-slot-model"){if(e.activeModelSlotContext==="contact"){const r=h(e.currentContactId)||e.contacts[0];r?.settings&&(o.dataset.slot==="consciousness"?r.settings.loopModel=o.dataset.model:(r.settings.model=o.dataset.model,r.settings.modelProviderId=e.activeModelProviderId||r.settings.modelProviderId||_("chat")?.providerId||"openai")),e.modelSlotMenuOpen=!1,c(),w(150);return}const i=_(o.dataset.slot);i.model=o.dataset.model,o.dataset.providerId&&(i.providerId=o.dataset.providerId),e.modelSlotMenuOpen=!1,c(),P();return}if(n==="toggle-provider-enabled"){const i=Q(o.dataset.providerId||o.dataset.key);i&&(i.enabled=!i.enabled,e.providerEditorDraft&&e.providerEditorDraft.id===i.id&&(e.providerEditorDraft.enabled=i.enabled)),c(),P();return}if(n==="save-provider-editor"){const i=o.dataset.provider,r=R(),l=[...r._selectedModelIds instanceof Set?r._selectedModelIds:new Set(r._selectedModelIds||[])].filter(Boolean),d=Q(i),p=Ht(document.getElementById("provider-api-path-input")?.value||"",{allowEmpty:!0}),f={...d||{id:i},id:i,name:document.getElementById("provider-name-input")?.value?.trim()||"自定义供应商",baseUrl:document.getElementById("provider-base-input")?.value?.trim()||"",apiPath:p,api_path:p,apiKey:document.getElementById("provider-key-input")?.value?.trim()||"",defaultModel:document.getElementById("provider-default-model-input")?.value?.trim()||l[0]||"",models:l},g=E();g.providers=g.providers.filter(I=>I.id!==i),g.providers.push(f),re(),e.providerEditorDraft=null,e.providerModelMenuOpen=!1,e.currentView="providerCatalog",c(),P();return}if(n==="save-slot-prompt"){const i=V(o.dataset.slot);E().defaultPrompts[i]=document.getElementById("slot-prompt-input")?.value||"",e.currentView="defaultModels",c(),P();return}if(n==="reset-slot-prompt"){const i=V(o.dataset.slot),r=jt().defaultPrompts||{};E().defaultPrompts[i]=r[i]||"",c(),P();return}return Ba(a)},document.addEventListener("input",t=>{const a=t.target;if(a?.dataset?.action==="provider-search"){e.providerSearch=a.value||"",c();return}if(a?.id==="model-slot-input"){const o=h(e.currentContactId)||e.contacts[0],n=a.value||"";if(e.activeModelSlotContext==="contact")o?.settings&&(e.activeModelSlot==="consciousness"?o.settings.loopModel=n:o.settings.model=n);else{const i=_(e.activeModelSlot);i&&(i.model=n)}e.modelSlotMenuOpen=!0,ce();return}if(a?.id==="provider-name-input"){R().name=a.value||"";return}if(a?.id==="provider-base-input"){R().baseUrl=a.value||"";return}if(a?.id==="provider-api-path-input"){const o=R();o.apiPath=a.value||"",o.api_path=a.value||"";return}if(a?.id==="provider-key-input"){R().apiKey=a.value||"";return}if(a?.id==="provider-models-input"){R().models=String(a.value||"").split(",").map(o=>o.trim()).filter(Boolean),yt();return}if(a?.id==="voice-slot-provider-input"){const o=_("voice");o&&(o.provider=a.value||"");return}if(a?.id==="voice-slot-service-url-input"){const o=_("voice");o&&(o.service_url=a.value||"",o.base_url=a.value||"");return}if(a?.id==="voice-slot-voice-id-input"){const o=_("voice");o&&(o.voice_id=a.value||"");return}if(a?.id==="voice-slot-speaker-input"){const o=_("voice");o&&(o.speaker=a.value||"");return}if(a?.id==="voice-slot-emotion-input"){const o=_("voice");o&&(o.emotion=a.value||"");return}if(a?.id==="voice-slot-speed-input"){const o=_("voice");o&&(o.speed=a.value||"");return}if(a?.id==="voice-slot-format-input"){const o=_("voice");o&&(o.format=a.value||"");return}if(a?.id==="provider-default-model-input"){R().defaultModel=a.value||"",e.providerModelMenuOpen=!0,yt();return}if(a?.dataset?.contactField==="persona"){const o=N();if(!o)return;o.persona=a.value||"",w(180),yi(o.id,o.persona)}}),document.addEventListener("change",t=>{const a=t.target;if(a?.id==="nc-avatar-file"){const o=a.files?.[0];if(!o)return;e.newContactDraft={...e.newContactDraft||Gt(),name:document.getElementById("nc-name")?.value||e.newContactDraft?.name||"",agentId:document.getElementById("nc-agent-id")?.value||e.newContactDraft?.agentId||"",bio:document.getElementById("nc-bio")?.value||e.newContactDraft?.bio||""},Te(o,"new-contact"),a.value="";return}if(a?.id==="account-avatar-file"){const o=a.files?.[0];if(!o)return;Te(o,"account"),a.value="";return}if(a?.id==="contact-avatar-file"){const o=a.files?.[0];if(!o||!h(e.currentContactId))return;Te(o,"contact"),a.value="";return}if(a?.id==="moment-image-input"){const o=a.files?.[0];if(!o)return;e.momentComposerImageName=o.name||"";const n=new FileReader;n.onload=()=>{e.momentComposerImage=typeof n.result=="string"?n.result:"",c()},n.readAsDataURL(o);return}if(a?.dataset?.action==="select-slot-model"){const o=_(a.dataset.slot);if(!o)return;o.model=a.value,P();return}String(a?.id||"").startsWith("voice-slot-")&&P()});function Ai(t,a){const o=N(),n=ht(o),i=n.findIndex(s=>s.id===t);if(i<0)return;const[r]=n.splice(i,1);if(!a)n.splice(0,0,r);else{const s=n.findIndex(l=>l.id===a);s<0?n.push(r):n.splice(s+1,0,r)}o.settings.quickActions=n,w(120)}const b={id:"",mode:"idle",startX:0,startY:0,currentY:0,hoverId:"",pendingDropId:null,pressTimer:null};function Ft(){b.pressTimer&&(clearTimeout(b.pressTimer),b.pressTimer=null)}function Ya(){Ft(),b.id="",b.mode="idle",b.startX=0,b.startY=0,b.currentY=0,b.hoverId="",b.pendingDropId=null}function We(){y()?.querySelectorAll(".quick-action-swipe.drop-hint-after").forEach(t=>t.classList.remove("drop-hint-after"))}function Ti(t,a){const o=y()?.querySelector(`.quick-action-swipe[data-quick-id="${t}"]`);if(!o)return;const n=o.querySelector(".quick-action-row"),i=o.querySelector(".quick-action-delete");if(!n||!i)return;const r=Math.max(-74,Math.min(0,Number(a)||0)),s=Math.min(1,Math.abs(r)/74);n.style.transform=`translateX(${r}px)`,i.style.opacity=String(s),i.style.transform=`translateX(${18*(1-s)}px) scale(${.97+.03*s})`,i.style.pointerEvents=s>.98?"auto":"none"}function $t(t){const a=y()?.querySelector(`.quick-action-swipe[data-quick-id="${t}"]`);if(!a)return;const o=a.querySelector(".quick-action-row"),n=a.querySelector(".quick-action-delete");o&&o.style.removeProperty("transform"),n&&(n.style.removeProperty("opacity"),n.style.removeProperty("transform"),n.style.removeProperty("pointer-events"))}function Ka(){if(y()?.querySelectorAll(".quick-action-swipe.quick-dragging").forEach(n=>n.classList.remove("quick-dragging")),y()?.querySelectorAll(".quick-action-row.touch-dragging").forEach(n=>{n.classList.remove("touch-dragging"),n.style.removeProperty("transform")}),!e.quickActionDragId)return;const t=y()?.querySelector(`.quick-action-row[data-quick-id="${e.quickActionDragId}"]`),a=t?.closest(".quick-action-swipe");if(!t||!a)return;a.classList.add("quick-dragging"),t.classList.add("touch-dragging");const o=b.currentY-b.startY;t.style.transform=`translateY(${o}px) scale(1.04) rotate(1.2deg)`}function Pi(t){const a=Array.from(y()?.querySelectorAll(".quick-action-swipe[data-quick-id]")||[]).filter(n=>n.dataset.quickId!==e.quickActionDragId);if(!a.length)return"";let o="";for(const n of a){const i=n.getBoundingClientRect(),r=i.top+i.height/2;if(t>=r)o=n.dataset.quickId;else break}return o}function Xa(){const t=b.pendingDropId,a=e.quickActionDragId;We(),e.quickActionDragId="",e.quickActionDropHintId="",e.quickActionDropDirection="",e.quickActionReorderPulseId="",a&&t!==null&&Ai(a,t),c()}function Ga(t,a,o){Ft(),e.quickActionSwipeOpenId&&e.quickActionSwipeOpenId!==o&&($t(e.quickActionSwipeOpenId),e.quickActionSwipeOpenId="",c()),b.id=o,b.mode="pending",b.startX=t,b.startY=a,b.currentY=a,b.hoverId="",b.pressTimer=window.setTimeout(()=>{if(!(b.mode!=="pending"||!b.id)&&(b.mode="drag",b.pendingDropId=null,e.quickActionDragId=b.id,Ka(),navigator?.vibrate))try{navigator.vibrate(12)}catch{}},280)}function Ja(t,a,o){if(!b.id)return;const n=t-b.startX,i=a-b.startY;if(b.mode==="pending"){Math.abs(n)>12&&Math.abs(n)>Math.abs(i)?(Ft(),b.mode="swipe"):Math.abs(i)>10&&(Ft(),b.mode="cancelled");return}if(b.mode==="swipe"){const l=e.quickActionSwipeOpenId===b.id?-74:0,d=Math.max(-74,Math.min(0,l+n));Ti(b.id,d);return}if(b.mode!=="drag")return;o?.(),b.currentY=a,Ka();const r=Pi(a);r!==b.pendingDropId&&(b.pendingDropId=r,We(),r&&y()?.querySelector(`.quick-action-swipe[data-quick-id="${r}"]`)?.classList.add("drop-hint-after"))}function Wa(t){if(b.id){if(Ft(),b.mode==="swipe"){const a=e.quickActionSwipeOpenId===b.id,o=t-b.startX;(a?-74+o:o)<-36?(e.quickActionSwipeOpenId=b.id,$t(b.id),c()):a&&o>22?(e.quickActionSwipeOpenId="",$t(b.id),c()):($t(b.id),a&&(e.quickActionSwipeOpenId=b.id,c()))}b.mode==="drag"&&Xa(),Ya()}}document.addEventListener("touchstart",t=>{if(Ae(t.target)||t.target.closest(".quick-action-open"))return;const a=t.target.closest(".quick-action-row");if(!a){!t.target.closest(".quick-action-delete")&&!t.target.closest(".quick-action-swipe")&&e.quickActionSwipeOpenId&&($t(e.quickActionSwipeOpenId),e.quickActionSwipeOpenId="",c());return}const o=t.touches?.[0];o&&Ga(o.clientX,o.clientY,a.dataset.quickId||"")},{passive:!0}),document.addEventListener("touchmove",t=>{const a=t.touches?.[0];a&&Ja(a.clientX,a.clientY,()=>t.preventDefault())},{passive:!1}),document.addEventListener("touchend",t=>{const a=t.changedTouches?.[0];Wa(a?.clientX||b.startX)},{passive:!0}),document.addEventListener("touchcancel",()=>{$t(b.id),We(),b.mode==="drag"&&Xa(),Ya()},{passive:!0}),document.addEventListener("mousedown",t=>{if(Ae(t.target)||t.target.closest(".quick-action-open"))return;const a=t.target.closest(".quick-action-row");if(!a||t.button!==0){!t.target.closest(".quick-action-delete")&&!t.target.closest(".quick-action-swipe")&&e.quickActionSwipeOpenId&&($t(e.quickActionSwipeOpenId),e.quickActionSwipeOpenId="",c());return}Ga(t.clientX,t.clientY,a.dataset.quickId||"")}),document.addEventListener("mousemove",t=>{Ja(t.clientX,t.clientY,()=>t.preventDefault())}),document.addEventListener("mouseup",t=>{Wa(t.clientX)});const Ei=xe;xe=function(){return Ei()},document.addEventListener("DOMContentLoaded",()=>{E(),di(),Qa(),Ua(),at(),zt(e.currentContactId)}),document.addEventListener("focusin",t=>{const a=t.target;if(a?.id==="model-slot-input"){e.modelSlotMenuOpen=!0,ce();return}a?.id==="provider-default-model-input"&&(e.providerModelMenuOpen=!0,yt())}),document.addEventListener("click",t=>{if(Qe.has(e.currentView)&&e.currentView==="modelSlot"&&!t.target.closest('#model-slot-input, .provider-model-picker, [data-action="toggle-model-slot-menu"]')&&e.modelSlotMenuOpen){e.modelSlotMenuOpen=!1,ce();return}if(e.currentView!=="providerEditor")return;!t.target.closest(".provider-model-picker")&&e.providerModelMenuOpen&&(e.providerModelMenuOpen=!1,yt())})})();
