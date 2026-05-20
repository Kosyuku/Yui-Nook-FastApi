(()=>{const Qt=[{id:"ayan",name:"阿延",handle:"@ayan",bio:"小酒，今天也要开开心心哦～",status:"在线",roleTag:"特别关注",lastMessage:"先聊天详情页。头部、气泡、输入区一起收掉，其他页自然顺。",lastTime:"刚刚",unread:2,pinned:!0,avatar:"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80",theme:"rose",settings:{model:"gpt-5.4",modelProviderId:"openai",temperature:.72,topP:.9,contextCount:64,thinkBudget:48,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!0,proactiveFrequency:60,memoryEnabled:!0},roomBackground:"点阵",chatTheme:"default",bubbleTheme:"默认主题",topics:[{id:"t1",title:"最近状态",updatedAt:"今天 21:40",count:24},{id:"t2",title:"睡眠记录",updatedAt:"昨天",count:18},{id:"t3",title:"网页 UI",updatedAt:"3天前",count:41}],messages:[{id:"m1",role:"ai",text:"今天把你丢给我的文件都翻了一遍。页面可以更可爱，真正夹棒的是里面的空壳。",time:"21:48"},{id:"m2",role:"user",text:"所以该先改哪里？",time:"21:49"},{id:"m3",role:"ai",text:"先聊天详情页。头部、气泡、输入区一起收掉，其他页自然顺。",time:"21:49",thinking:"她已经给了明确起点，先改核心路径能更快出效果。"}]},{id:"azheng",name:"阿争",handle:"@azheng",bio:"我把草稿整理好了，要继续吗？",status:"忙碌",roleTag:"同事",lastMessage:"我把草稿整理好了，要继续吗？",lastTime:"12分钟前",unread:0,pinned:!1,avatar:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300&q=80",theme:"mist",settings:{model:"gpt-5.4",modelProviderId:"openai",temperature:.45,topP:.8,contextCount:48,thinkBudget:36,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!1,proactiveFrequency:30,memoryEnabled:!0},roomBackground:"点阵",chatTheme:"default",bubbleTheme:"默认主题",topics:[{id:"t4",title:"版本梳理",updatedAt:"今天 23:18",count:12},{id:"t5",title:"说明文档",updatedAt:"昨天",count:8}],messages:[{id:"m4",role:"ai",text:"我把草稿整理好了，要继续吗？",time:"23:18"}]},{id:"xiaoying",name:"小樱",handle:"@sakura",bio:"周末去看展吗？",status:"在线",roleTag:"朋友",lastMessage:"周末去看展吗？",lastTime:"1小时前",unread:1,pinned:!1,avatar:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80",theme:"cream",settings:{model:"gpt-5.4",modelProviderId:"openai",temperature:.66,topP:.95,contextCount:32,thinkBudget:24,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!0,proactiveFrequency:20,memoryEnabled:!1},roomBackground:"点阵",chatTheme:"default",bubbleTheme:"默认主题",topics:[{id:"t6",title:"周末计划",updatedAt:"今天",count:6}],messages:[{id:"m5",role:"ai",text:"周末去看展吗？我知道有个新的展。",time:"20:22"}]}],Ze=[{id:"p0",contactId:"me",time:"23:36",mood:"开心",content:"今天的天空很温柔。",image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80",likes:["我"],comments:[]},{id:"p1",contactId:"ayan",time:"21:20",mood:"主动",content:"你醉了先看这个。",image:"",likes:["我","阿延"],comments:[{author:"我",text:"我收到了"}]},{id:"p2",contactId:"xiaoying",time:"19:08",mood:"经常",content:"晚上跑了三公里。",image:"",likes:[],comments:[]}],Za=[],Yt=[{id:"health",label:"Health",icon:"health"},{id:"schedule",label:"日程",icon:"calendar"},{id:"weather",label:"天气",icon:"weather"},{id:"files",label:"文件",icon:"file"},{id:"quote",label:"引用",icon:"quote"},{id:"more",label:"更多",icon:"more"}];function to(){return{tools:Yt.map(t=>({id:t.id,label:t.label,icon:t.icon,prompt:"",enabled:!0}))}}const a={currentTab:"chats",currentView:"list",currentContactId:"",currentSettingsTab:"basic",cotLogMode:"long",activityLogEntries:[],activityLogLoading:!1,activityLogLoadedAt:"",quoteMomentId:null,quoteMessageId:null,momentComposerOpen:!1,momentComposerText:"",momentComposerImage:"",momentComposerImageName:"",momentComposerEditingId:"",momentsActorType:"user",commentSheetMomentId:null,activeMenuMomentId:null,activeBubbleToolsId:null,suppressBubbleToggle:!1,toast:"",topicConfirmOpen:!1,rpRooms:[],currentRpRoomId:"",currentRpMessages:[],conversations:{},rpMessages:{},rpRoomDialogOpen:!1,rpRoomDialogMode:"create",rpRoomForm:{name:"",world_setting:"",user_role:"",ai_role:""},rpBackView:"list",contacts:[],moments:structuredClone(Za),actions:structuredClone(Yt),globalSettings:{theme:"奶油粉",notifications:!0,momentsNotify:!0,autoScroll:!0,defaultModel:"gpt-5.4",provider:"OpenAI",searchService:"默认搜索",voiceService:"未连接",mcpEnabled:!0,exportFormat:"json"},accountProfile:{avatar:"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80",nickname:"小酒",signature:"管理个人资料与基础偏好"},newContactAvatar:"",newContactDraft:{name:"",agentId:"",bio:"",avatar:""},avatarCropper:null,showAttach:!1,contactQuickActionEditorId:"",contactQuickMcpMenuOpen:!1,quickActionSwipeOpenId:"",quickActionDragId:"",quickActionSuppressClickUntil:0,quickActionDropHintId:"",quickActionReorderPulseId:"",quickActionDropDirection:"",contactModelAdvancedOpen:!1,companionState:{recent_topics:[],current_mood:"",open_loops:[],proactive_cooldown_until:null,impression:null,relationship_progress:null,likes_summary:null,summary_updated_at:null,updated_at:""},openThinkingIds:{},streamingAbortController:null,animatedMsgIds:{},assistantPlayback:{token:"",timer:null},rpCurtainRunning:!1},ft=new Map,y=()=>document.getElementById("chat-app-root"),h=t=>a.contacts.find(e=>e.id===t),Lt=t=>a.moments.find(e=>e.id===t),u=(t="")=>String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),Kt=[{key:"default",name:"默认主题",desc:"干净柔和的默认聊天界面",roomTheme:"rose",aliases:["默认玫瑰","默认"]},{key:"pink",name:"蜜桃粉",desc:"更甜一点的粉色聊天氛围",roomTheme:"rose",aliases:["奶茶"]},{key:"dark",name:"夜色",desc:"低亮度深色聊天界面",roomTheme:"rose",aliases:[]},{key:"glass",name:"玻璃雾",desc:"通透轻雾感的玻璃界面",roomTheme:"mist",aliases:["晴空"]}];function fe(t){const e=String(t||"").trim();return e&&Kt.find(n=>n.key===e||n.name===e||n.aliases.includes(e))?.key||"default"}function ta(t){const e=fe(t);return Kt.find(o=>o.key===e)||Kt[0]}function ge(t){return fe(t?.chatTheme||t?.bubbleTheme)}function be(t){return ta(t).name}const ea=1500,he=8e3;function aa(t){return t?t.replace(/<tool_call>[\s\S]*?<\/tool_call>/g,"").replace(/<tool_call>[\s\S]*$/,"").replace(/<\/?(thead|tbody|tr|td|th|table|tool|function|call)[^>]*>/gi,"").replace(/<[^>\n]{1,80}>/g,"").replace(/\n{3,}/g,`

`).trim():""}function Dt(t){return t==null?"":typeof t=="string"?t:typeof t=="number"||typeof t=="boolean"?String(t):""}function ve(t,e="",o=""){const n=aa(Dt(t));if(!n)return"";const i=n.replace(/\s+/g," ").trim(),r=Dt(e).replace(/\s+/g," ").trim(),s=Dt(o).replace(/\s+/g," ").trim();return!i||r&&(i===r||r.includes(i)&&i.length>=8)||s&&(s.includes(i)||s.slice(Math.max(0,s.length-i.length-12)).includes(i))?"":n}function oa(){return new Promise(t=>requestAnimationFrame(t))}function ye(t){const e=aa(t);return e?e.length<=ea?e:`（已截断，共 ${e.length} 字）
${e.slice(-ea)}`:""}const eo='<svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',ao='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',oo='<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',no='<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',io='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';function ro(t){const e=String(t||"").toLowerCase();return/time|clock|date/.test(e)?ao:/view|read|file|diary|memory|search/.test(e)?oo:eo}function so(t){const e=!!t.streaming,o=e?"tl-active":"tl-done",n=e?ye(t.thinking):t.thinking||"",r=(n||"").replace(/\s+/g," ").trim()||"思考中…",s=r.length>36?r.slice(0,36)+"…":r;return`
        <div class="thinking-line ${o}" id="tl-line-${t.id}" data-action="toggle-thinking-line" data-id="${t.id}">
          <div class="thinking-dot"></div>
          <div class="thinking-text-wrap">
            <span class="thinking-text" id="tl-text-${t.id}">${u(s)}</span>
            <div class="thinking-heart">${no}</div>
            <div class="thinking-fade"></div>
          </div>
          <div class="thinking-expand">${io}</div>
        </div>
        <div class="thinking-full" id="tl-full-${t.id}">
          <div class="thinking-full-inner" id="thinking-${t.id}">${u(n)}</div>
        </div>`}function co(t=[]){return t.length?`<div class="tool-lines-wrap">${t.map(o=>{const n=o.status==="running"?"tl-active":"tl-done",i=`${o.name} → ${o.status==="running"?"调用中…":"完成"}`;return`
          <div class="tool-line ${n}">
            <div class="tool-dot"></div>
            <div class="tool-icon">${ro(o.name)}</div>
            <span class="tool-text">${u(i)}</span>
          </div>`}).join("")}</div>`:""}const na=t=>new Promise(e=>window.setTimeout(e,t));function ia(t){const e=String(t||"").replace(/\r\n/g,`
`).trim();if(!e)return[];const o=e.split(/\n{2,}/).map(r=>String(r||"").trim()).filter(Boolean),n=[],i=r=>{const s=String(r||"").trim();if(s){if(n.length&&s.length<=3){n[n.length-1]+=s;return}n.push(s)}};return o.forEach(r=>{if(r.length<=34){i(r);return}let s=r;for(;s.length>34;){let l=34;const d=s.slice(0,34).search(/[，、；,; ]/);d>=18&&(l=d+1);const p=s.slice(0,l).trim();if(p.length>=6)i(p),s=s.slice(l).trim();else break}i(s)}),n.filter(Boolean)}function uo(t){const e=String(t||"").trim().length;return e<=10?300+Math.floor(Math.random()*201):e<=24?600+Math.floor(Math.random()*301):900+Math.floor(Math.random()*301)}function Ot(){a.assistantPlayback.token="",a.assistantPlayback.timer&&(window.clearTimeout(a.assistantPlayback.timer),a.assistantPlayback.timer=null)}async function ra(t,e,o={}){const n=Array.isArray(e)?e.filter(s=>String(s||"").trim()):[];if(!t||!n.length)return;Ot();const i=`reply_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;a.assistantPlayback.token=i;const r=Number.isInteger(o.startIndex)?o.startIndex:t.messages.length;for(let s=0;s<n.length;s+=1){if(a.assistantPlayback.token!==i)return;const l={id:`ai_chunk_${Date.now()}_${s}_${Math.random().toString(36).slice(2,6)}`,role:"ai",text:n[s],content:n[s],time:D(),created_at:new Date().toISOString()};if(s===0&&(o.thinking&&(l.thinking=o.thinking),o.toolCalls&&(l.toolCalls=o.toolCalls)),s===0&&o.replaceId){const d=t.messages.findIndex(p=>p.id===o.replaceId);d!==-1?t.messages[d]=l:t.messages.splice(Math.min(r,t.messages.length),0,l)}else{const d=Math.min(r+s,t.messages.length);t.messages.splice(d,0,l)}if(t.lastMessage=l.text,t.lastTime=l.time,c(),U(),s>=n.length-1)break;await new Promise(d=>{a.assistantPlayback.timer=window.setTimeout(d,uo(n[s]))}),a.assistantPlayback.timer=null}a.assistantPlayback.token===i&&(a.assistantPlayback.token="",a.assistantPlayback.timer=null),w(120)}function _t(t){const e=t&&typeof t=="object"?t:{},o=i=>Array.isArray(i)?i.map(r=>String(r||"").trim()).filter(Boolean):[],n=i=>i!=null&&String(i).trim()?String(i).trim():null;return{recent_topics:o(e.recent_topics),current_mood:String(e.current_mood||"").trim(),open_loops:o(e.open_loops),proactive_cooldown_until:e.proactive_cooldown_until?String(e.proactive_cooldown_until):null,impression:n(e.impression),relationshipProgress:n(e.relationship_progress??e.relationshipProgress),likesSummary:n(e.likes_summary??e.likesSummary),summaryUpdatedAt:n(e.summary_updated_at??e.summaryUpdatedAt),updated_at:String(e.updated_at||"").trim()}}function lo(){const t=_t(a.companionState);return t.current_mood?`情绪：${t.current_mood}`:t.open_loops[0]?`进行中：${t.open_loops[0]}`:t.recent_topics[0]?`最近话题：${t.recent_topics[0]}`:"暂无状态"}function gt(){if(a.momentsActorType==="agent"){const t=N();return{author_type:"agent",author_id:t?.id||a.currentContactId||"default",author_name:t?.name||"当前角色",avatar:t?.avatar||""}}return{author_type:"user",author_id:"me",author_name:a.accountProfile?.nickname||"我",avatar:a.accountProfile?.avatar||"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80"}}function A(t={}){const e=Array.isArray(t.likes)?t.likes:[],o=Array.isArray(t.comments)?t.comments:[],n=String(t.author_type||(t.contactId==="me"?"user":"agent")),i=String(t.author_id||(n==="user"?"me":t.contactId||"default"));return{id:String(t.id||`p${Date.now()}`),author_type:n,author_id:i,content:String(t.content||""),image:String(t.image||""),mood:String(t.mood||""),time:String(t.time||""),created_at:String(t.created_at||""),updated_at:String(t.updated_at||""),likes:e.map(r=>typeof r=="string"?{author_type:"user",author_id:r==="我"?"me":r,author_name:r}:{author_type:String(r?.author_type||"user"),author_id:String(r?.author_id||"me"),author_name:String(r?.author_name||"")}),comments:o.map(r=>({author_type:String(r?.author_type||"user"),author_id:String(r?.author_id||"me"),author_name:String(r?.author_name||r?.author||""),text:String(r?.text||"")}))}}function sa(t){const e=A(t);if(e.author_type==="agent"){const o=h(e.author_id);return{name:o?.name||e.author_id||"角色",avatar:o?.avatar||""}}return{name:a.accountProfile?.nickname||"我",avatar:a.accountProfile?.avatar||"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80"}}function ca(t){const e=A(t);return e.author_type==="user"?e.author_id==="me":e.author_id===(a.currentContactId||N()?.id||"default")}function ua(t=[]){return t.map(e=>e.author_name||(e.author_type==="user"?"我":h(e.author_id)?.name||e.author_id)).join("、")}function po(t,e,o){const n=h(a.currentContactId);n&&(n[t]=e,a.toast=o,c(),w(120),window.setTimeout(()=>{a.toast="",c()},1200))}function mo(t){const e=String(t).toLowerCase();return["health","heart"].includes(e)?"health":["calendar","schedule","date"].includes(e)?"calendar":["weather","cloud"].includes(e)?"weather":["file","files","doc","document"].includes(e)?"file":["quote","reply"].includes(e)?"quote":(["more","tool","tools"].includes(e),"more")}const we={get_current_time:"时间",get_weather:"天气",get_health_summary:"健康",web_search:"搜索",fetch_url:"网页",add_todo:"待办",list_todos:"待办列表",complete_todo:"完成待办",add_note:"便签",list_notes:"便签列表"},la=new Set(["get_current_time","get_weather","get_health_summary","web_search","fetch_url","add_todo","list_todos","complete_todo","add_note","list_notes"]);function bt(t){return la.has(String(t||"").trim())}function it(t,e){if(typeof t=="string"){const r=String(t||`mcp_${e}`);return{id:r,label:we[r]||t||`工具${e+1}`,icon:"more",prompt:"",mcpToolId:bt(r)?r:"",enabled:!0}}const o=t?.id||t?.toolId||t?.name||`mcp_${e}`,n=String(o),i=we[n]||t?.label||t?.name||t?.title||`工具${e+1}`;return{id:n,label:String(i),icon:mo(t?.icon||t?.type||t?.category||"more"),prompt:String(t?.prompt||t?.message||""),mcpToolId:String(t?.mcpToolId||t?.toolId||(bt(n)?n:"")),enabled:t?.enabled!==!1}}function da(){const e=E()?.mcpLibrary?.tools;if(!Array.isArray(e)||!e.length)return Yt;const o=e.map(it).filter(n=>bt(n.id)).filter(n=>n.enabled!==!1);return o.length?o:Yt}function N(){return h(a.currentContactId)||a.contacts[0]}function ht(t){return t?.settings?(!Array.isArray(t.settings.quickActions)||!t.settings.quickActions.length?t.settings.quickActions=da().map((e,o)=>({...it(e,o)})):t.settings.quickActions=t.settings.quickActions.map((e,o)=>it(e,o)),t.settings.quickActions):[]}function $e(t=N()){const e=ht(t).filter(o=>o.enabled!==!1);return e.length?e:da()}function m(t){const e='viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"',o={back:`<svg ${e}><path d="M15 18l-6-6 6-6"/></svg>`,plus:`<svg ${e}><path d="M12 5v14M5 12h14"/></svg>`,search:`<svg ${e}><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg>`,history:`<svg ${e}><path d="M3 12a9 9 0 101.9-5.6"/><path d="M3 4v4h4"/><path d="M12 7v5l3 2"/></svg>`,settings:`<svg ${e}><path d="M12 3v3M12 18v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M3 12h3M18 12h3M4.9 19.1L7 17M17 7l2.1-2.1"/><circle cx="12" cy="12" r="3.3"/></svg>`,more:`<svg ${e}><circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>`,heart:`<svg ${e}><path d="M12 20.5s-7-4.4-7-10a4 4 0 017-2.5A4 4 0 0119 10.5c0 5.6-7 10-7 10z"/></svg>`,heartFilled:'<svg viewBox="0 0 24 24" fill="#B595C9" stroke="none" stroke-width="0"><path d="M12 20.5s-7-4.4-7-10a4 4 0 017-2.5A4 4 0 0119 10.5c0 5.6-7 10-7 10z"/></svg>',comment:`<svg ${e}><path d="M7 18l-3 2 1-3.8A7.8 7.8 0 014.2 13 7.8 7.8 0 1112 20a8 8 0 01-5-2z"/><path d="M8.5 10.5h7M8.5 13.5h4.5"/></svg>`,chatArrow:`<svg ${e}><path d="M4.8 18.2l.9-3.3A7.5 7.5 0 014.5 11 7.5 7.5 0 1112 18.5a7.4 7.4 0 01-3.6-.9z"/><path d="M10 9l4 3-4 3"/><path d="M14 12H8"/></svg>`,send:`<svg ${e}><path d="M21 3L10 14"/><path d="M21 3l-7 18-4-7-7-4z"/></svg>`,close:`<svg ${e}><path d="M18 6L6 18M6 6l12 12"/></svg>`,camera:`<svg ${e}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,attach:`<svg ${e}><path d="M21 11.5l-8.7 8.7a5 5 0 01-7.1-7.1l9.2-9.2a3.5 3.5 0 015 5L9 19.3a2 2 0 01-2.8-2.8l8.5-8.5"/></svg>`,quote:`<svg ${e}><path d="M9 7H5v5h4v5H4v-5c0-2.8 1.8-5 5-5zM20 7h-4v5h4v5h-5v-5c0-2.8 1.8-5 5-5z"/></svg>`,reroll:`<svg ${e}><path d="M20 11a8 8 0 10-2.3 5.7"/><path d="M20 4v7h-7"/></svg>`,cot:`<svg ${e}><path d="M12 4v16M4 12h16"/><path d="M7.5 7.5l9 9M16.5 7.5l-9 9" opacity="0.18"/></svg>`,bubbleHeart:`<svg ${e}><path d="M12 19.3s-5.8-3.5-5.8-8a3.7 3.7 0 016.1-2.8 3.7 3.7 0 015.9 2.8c0 4.5-5.6 8-5.6 8z"/></svg>`,weather:`<svg ${e}><path d="M6 16a4 4 0 010-8 5.5 5.5 0 0110.4-1.8A4 4 0 1118 16H6z"/></svg>`,calendar:`<svg ${e}><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>`,file:`<svg ${e}><path d="M8 3h6l5 5v11a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z"/><path d="M14 3v5h5"/></svg>`,health:`<svg ${e}><path d="M12 20s-6.5-4-6.5-9.2A4.3 4.3 0 0112 7a4.3 4.3 0 016.5 3.8C18.5 16 12 20 12 20z"/><path d="M9.2 12h1.8l1-2.1 1.2 4 1-1.9h1.6"/></svg>`,toggleOff:'<svg viewBox="0 0 52 32" fill="none"><rect x="1.5" y="1.5" width="49" height="29" rx="14.5" fill="rgba(255,255,255,.7)" stroke="rgba(150,122,133,.14)"/><circle cx="16" cy="16" r="11" fill="#fff"/></svg>',toggleOn:'<svg viewBox="0 0 52 32" fill="none"><rect x="1.5" y="1.5" width="49" height="29" rx="14.5" fill="#e9d7ff" stroke="rgba(120,90,150,.14)"/><circle cx="36" cy="16" r="11" fill="#fff"/></svg>',chevron:`<svg ${e}><path d="M9 6l6 6-6 6"/></svg>`,tabChat:`<svg ${e}><path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 2 .6 3.9 1.6 5.4L2 22l4.8-1.3A9.9 9.9 0 0012 22c5.5 0 10-4.5 10-10z"></path></svg>`,tabMoments:`<svg ${e}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,tabSettings:`<svg ${e}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,actionDots:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>',pencil:`<svg ${e}><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`,trash:`<svg ${e}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,stop:'<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="7" y="7" width="10" height="10" rx="2"/></svg>'};return o[t]||o.more}function pa(){c()}function Se(t){const e=()=>{const o=y()?.querySelector(".chat-app-body");o&&(o.scrollTop=t)};requestAnimationFrame(()=>{e(),requestAnimationFrame(e),window.setTimeout(e,0)})}function ma(){const t=y()?.querySelector(".chat-app-body"),e=t?t.scrollTop:0,o=window.scrollY||window.pageYOffset||0;c(),Se(e),requestAnimationFrame(()=>{window.scrollTo(0,o),requestAnimationFrame(()=>window.scrollTo(0,o))})}function F(){if(a.currentView==="moments"){ma();return}c()}function fo(t,e){a.moments=a.moments.map(o=>{const n=A(o);if(n.id!==t)return o;const r=n.likes.some(s=>s.author_type===e.author_type&&s.author_id===e.author_id)?n.likes.filter(s=>!(s.author_type===e.author_type&&s.author_id===e.author_id)):[{author_type:e.author_type,author_id:e.author_id,author_name:e.author_name},...n.likes];return{...n,likes:r}})}function go(t,e,o){a.moments=a.moments.map(n=>{const i=A(n);return i.id!==t?n:{...i,comments:[{author_type:e.author_type,author_id:e.author_id,author_name:e.author_name,text:o},...i.comments]}})}function fa(t,e){t&&(t.classList.toggle("on",!!e),t.classList.toggle("off",!e),t.setAttribute("aria-pressed",e?"true":"false"),t.innerHTML=Wt(e),t.classList.remove("switch-animating"),t.offsetWidth,t.classList.add("switch-animating"),clearTimeout(t.__switchAnimTimer),t.__switchAnimTimer=setTimeout(()=>t.classList.remove("switch-animating"),260))}function c(){const t=y();if(!t)return;ga(),["room","rpRoom"].includes(a.currentView)||(a.showAttach=!1),a.currentView!=="moments"&&(a.momentComposerOpen=!1);const e=t.querySelector(".chat-app-body"),o=e?e.scrollTop:0,n=h(a.currentContactId)||a.contacts[0],i=ge(n);t.dataset.theme=i,t.removeAttribute("data-bound"),t.innerHTML=`
      <div class="chat-shell ${a.currentView==="rpRoom"?"mode-rp rp-theatre-shell":"mode-normal"}" data-theme="${i}">
        ${ke()}
        <div class="chat-app-body ${["room","rpRoom"].includes(a.currentView)?"room-layout":""} ${Xt()?"has-bottom-nav":""}">
          ${Ie()}
        </div>
        ${Xt()?yo():""}
        ${a.toast?Bo():""}
        ${a.showAttach?Ln():""}
        ${a.momentComposerOpen?Ro():""}

        ${a.rpRoomDialogOpen?Ho():""}
        ${a.avatarCropper?No():""}
      </div>
    `,gn(),U(),["room","rpRoom"].includes(a.currentView)||Se(o),w(),requestAnimationFrame(()=>{y()?.querySelectorAll(".message-row[data-msg-id]").forEach(r=>{const s=r.dataset.msgId;s&&!a.animatedMsgIds[s]&&(a.animatedMsgIds[s]=!0,r.classList.add("msg-fadein"))})})}function ga(){if(document.getElementById("rp-theatre-style"))return;const t=document.createElement("style");t.id="rp-theatre-style",t.textContent=`
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
        `,document.head.appendChild(t)}function bo(t){if(ga(),a.rpCurtainRunning)return Promise.resolve(t?.());a.rpCurtainRunning=!0;const e=document.createElement("div");return e.className="curtain-transition closing",e.innerHTML='<div class="curtain-left"></div><div class="curtain-right"></div>',document.body.appendChild(e),new Promise(o=>{window.setTimeout(async()=>{try{await t?.()}finally{e.className="curtain-transition opening",window.setTimeout(()=>{e.remove(),a.rpCurtainRunning=!1,o()},450)}},420)})}function Xt(){return["list","moments","settings"].includes(a.currentView)}function ke(){if(a.currentView==="room")return ho();if(a.currentView==="rpRoom")return vo();if(a.currentView==="contactSettings")return J("联系人设置","back-room",!0);if(a.currentView==="cotLog")return J("COT 日志","back-contact-settings",!0);if(a.currentView==="rpLobby")return`
        <header class="chat-page-header simple-header">
          <button class="icon-btn text-btn" data-action="back-rp-source" aria-label="返回">${m("back")}</button>
          <div class="chat-page-title">Mirage 夢幻楼</div>
          <button class="icon-btn ghost-circle" data-action="open-rp-room-create" aria-label="新建房间">${m("plus")}</button>
        </header>
      `;if(a.currentView==="companionStateDetail")return J("当前状态","back-contact-settings",!0);if(a.currentView==="contactImpressionDetail")return J("关于你的印象","back-contact-settings",!0);if(a.currentView==="contactRelationshipDetail")return J("关系进展","back-contact-settings",!0);if(a.currentView==="contactLikesDetail")return J("你喜欢的东西","back-contact-settings",!0);if(a.currentView==="contactRoomBackgroundPicker")return J("聊天背景","back-contact-settings",!0);if(a.currentView==="contactBubbleThemePicker")return J("气泡主题","back-contact-settings",!0);if(a.currentView==="profile")return J("联系人资料","back-room",!0);if(a.currentView==="newContact")return J("添加联系人","back-home",!0);let t="Murmur";a.currentView==="moments"&&(t="Echo"),a.currentView==="settings"&&(t="Veil");const e=a.currentTab==="chats"&&a.currentView==="list";return`
      <header class="chat-page-header">
        <div class="header-left"></div>
        <div class="chat-page-title" style="font-weight: 800; letter-spacing: 0.02em;">${t}</div>
        ${e?`<button class="icon-btn ghost-circle" data-action="new-contact" aria-label="添加联系人">${m("plus")}</button>`:'<span class="header-spacer"></span>'}
      </header>
    `}function J(t,e,o=!1){return`
      <header class="chat-page-header simple-header">
        <button class="icon-btn text-btn" data-action="${e}" aria-label="返回">${m("back")}</button>
        <div class="chat-page-title">${u(t)}</div>
        ${o?'<span class="header-spacer"></span>':""}
      </header>
    `}function ho(){const t=h(a.currentContactId)||a.contacts[0],e=t.settings?.model||a.globalSettings.defaultModel||"gpt-5.4";return`
      <header class="room-hero room-theme-${t.theme}">
        <div class="room-hero-inner">
          <button class="icon-btn icon-circle room-left-btn" data-action="back-list" aria-label="返回列表">${m("back")}</button>
          <div class="room-profile-card" data-action="open-profile">
            <img class="room-profile-avatar" src="${t.avatar}" alt="${u(t.name)}" />
            <div class="room-profile-meta">
              <div class="room-profile-title-line">
                <strong class="room-profile-name">${u(t.name)}</strong>
                <span class="room-profile-model">${u(e)}</span>
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
    `}function vo(){const t=Me();return`
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
    `}function Ie(){return a.currentView==="room"?qo():a.currentView==="rpLobby"?Uo():a.currentView==="rpRoom"?jo():a.currentView==="moments"?Oo():a.currentView==="settings"?xe():a.currentView==="contactSettings"?Qo():a.currentView==="cotLog"?dn():a.currentView==="companionStateDetail"?Yo():a.currentView==="contactImpressionDetail"?Ce("关于你的印象","impression",a.companionState.impression):a.currentView==="contactRelationshipDetail"?Ce("关系进展","relationshipProgress",a.companionState.relationshipProgress):a.currentView==="contactLikesDetail"?Ce("你喜欢的东西","likesSummary",a.companionState.likesSummary):a.currentView==="contactRoomBackgroundPicker"?Ko():a.currentView==="contactBubbleThemePicker"?Xo():a.currentView==="profile"?Jo():a.currentView==="newContact"?Go():wo()}function yo(){return`
      <nav class="bottom-tabbar">
        ${_e("chats","tabChat","繁语")}
        ${_e("moments","tabMoments","余响")}
        ${_e("settings","tabSettings","帷幕")}
      </nav>
    `}function _e(t,e,o){return`
      <button class="nav-tab-btn ${a.currentTab===t?"active":""}" data-action="switch-tab" data-tab="${t}">
        <div class="nav-tab-icon">${m(e)}</div>
        <span class="nav-tab-label">${u(o)}</span>
      </button>
    `}function wo(){const t=[...a.contacts].sort((e,o)=>o.pinned-e.pinned||0);return`
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
            ${t.map($o).join("")}
          </div>
        </div>
      </section>
        </div>
    `}function $o(t){const e=String(t.handle||(t.id?`@${t.id}`:"")).trim();return`
      <button type="button" class="chat-list-item" data-action="open-contact" data-contact-id="${t.id}">
        <div class="chat-list-avatar-wrap">
          <img src="${t.avatar}" alt="${u(t.name)}" class="chat-list-avatar" />
          ${t.unread?`<span class="chat-list-badge">${t.unread}</span>`:""}
        </div>
        <div class="chat-list-content">
          <div class="chat-list-head">
            <span class="chat-list-title">
              <strong class="chat-list-name">${u(t.name)}</strong>
              ${e?`<span class="chat-list-handle">${u(e)}</span>`:""}
            </span>
            <time class="chat-list-time">${u(t.lastTime)}</time>
          </div>
          <div class="chat-list-snippet">${u(t.lastMessage)}</div>
        </div>
      </button>
    `}async function So(t){const e=String(t?.sessionId||"").trim();if(e)try{if((await fetch(`${v}/api/sessions/${encodeURIComponent(e)}`)).ok)return;t.sessionId="",w(120)}catch(o){console.warn("[session] open-contact validation failed",o)}}function ko(){a.companionState=_t({})}function Io(t){const e=String(t||"").trim();if(!e)return;Ot?.(),a.streamingAbortController&&a.currentContactId===e&&(a.streamingAbortController.abort(),a.streamingAbortController=null),ft.has(e)&&(clearTimeout(ft.get(e)),ft.delete(e)),a.contacts=a.contacts.filter(i=>i.id!==e),a.activeBubbleToolsId=null,a.quoteMomentId=null,a.quoteMessageId=null,a.contactQuickActionEditorId="",a.quickActionSwipeOpenId="",a.quickActionDragId="",a.quickActionDropHintId="",a.quickActionDropDirection="",a.quickActionReorderPulseId="",a.currentTopicTitle="",a.rpRooms=[],a.currentRpRoomId="",a.currentRpMessages=[];const o=a.contacts[0]||null;(a.currentContactId===e||!h(a.currentContactId))&&(a.currentContactId=o?.id||"",ko(),a.currentView="list",a.currentTab="chats",a.currentSettingsTab="basic");const n=y()?.querySelector(".chat-input");n&&(n.value="")}async function _o(t){const e=String(t||"").trim();if(!e)return!1;const o=await fetch(`${v}/api/agents/${encodeURIComponent(e)}/safe-delete`,{method:"DELETE"});if(!o.ok){let n=`HTTP ${o.status}`;try{n=(await o.json())?.detail||n}catch{}throw new Error(n)}return!0}function Mt(){return a.currentContactId||a.contacts[0]?.id||"default"}function Me(){return a.rpRooms.find(t=>t.room_id===a.currentRpRoomId)||null}function Gt(){return{name:"",agentId:"",bio:"",avatar:""}}function Rt(t){return String(t||"").trim().replace(/^@+/,"").toLowerCase()}function H(t={}){const e=String(t.id||"").trim()||`c${Date.now()}`,o=ge(t);return{id:e,agent_id:String(t.agent_id||t.id||e),name:String(t.name||e),display_name:String(t.display_name||t.name||e),bio:String(t.bio||"这是新来的联系人"),status:String(t.status||"在线"),handle:String(t.handle||`@${e}`),roleTag:String(t.roleTag||""),theme:ya(o),chatTheme:o,bubbleTheme:be(o),unread:Number(t.unread||0),pinned:!!t.pinned,lastMessage:String(t.lastMessage||""),lastTime:String(t.lastTime||""),avatar:String(t.avatar||"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80"),topics:Array.isArray(t.topics)?t.topics:[],messages:Array.isArray(t.messages)?t.messages:[],settings:{model:"gpt-5.4",modelProviderId:_("chat")?.providerId||"openai",temperature:.7,topP:.9,contextCount:32,thinkBudget:24,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!1,proactiveFrequency:30,memoryEnabled:!0,codexEnabled:!1,...t.settings||{}}}}function Mo(t){const e=H(t),o=a.contacts.findIndex(n=>String(n.id||"").toLowerCase()===e.id.toLowerCase());return o>=0?a.contacts[o]={...a.contacts[o],...e}:a.contacts.unshift(e),e}async function xo(t){try{const e=await fetch(`${v}/api/agents`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({agent_id:t.id,display_name:t.name,avatar:t.avatar||"",description:t.bio||"",source:"murmur",metadata:{from:"murmur_contact"}})});if(e.ok)return!0;let o="";try{const i=await e.json();o=typeof i?.detail=="string"?i.detail:JSON.stringify(i?.detail||i)}catch{}return e.status===409||/already exists|duplicate|23505/i.test(o)?(fetch(`${v}/api/agents/${encodeURIComponent(t.id)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({display_name:t.name,avatar:t.avatar||"",description:t.bio||"",source:"murmur",is_active:!0})}).catch(()=>{}),!0):!1}catch(e){return console.warn("[agents] register contact failed",e),!1}}function ba(t){return W(t,{fallback:""})}function W(t,{fallback:e="",includeYear:o=!1}={}){if(!t)return e;const n=String(t||"").trim();if(!n)return e;const i=new Date(n);if(Number.isNaN(i.getTime()))return n;const r=new Date,s=i.getFullYear()===r.getFullYear(),l=i.toDateString()===r.toDateString(),d=new Date(r);d.setDate(r.getDate()-1);const p=i.toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",hour12:!1});if(l)return`今天 ${p}`;if(i.toDateString()===d.toDateString())return`昨天 ${p}`;const f=o||!s?{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}:{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1};return i.toLocaleString("zh-CN",f).replace(/\//g,"-")}async function Jt(t=Mt(),{silent:e=!0}={}){try{const o=await fetch(`${v}/api/rp/rooms?agent_id=${encodeURIComponent(t)}`);if(!o.ok)throw new Error(`HTTP ${o.status}`);const n=await o.json();return a.rpRooms=Array.isArray(n.rooms)?n.rooms:[],e||c(),a.rpRooms}catch(o){return console.warn("[rp] load rooms failed",o),e||(a.toast="RP 鎴块棿鍔犺浇澶辫触",c(),window.setTimeout(()=>{a.toast="",c()},1200)),[]}}async function Co(t,{silent:e=!0}={}){if(!t)return[];try{const o=await fetch(`${v}/api/rp/rooms/${encodeURIComponent(t)}/messages`);if(!o.ok)throw new Error(`HTTP ${o.status}`);const n=await o.json(),i=n.room||a.rpRooms.find(s=>s.room_id===t);if(i){const s=a.rpRooms.findIndex(l=>l.room_id===t);s>=0&&(a.rpRooms[s]=i)}const r=(Array.isArray(n.messages)?n.messages:[]).map(s=>({id:s.id,role:s.role==="assistant"?"ai":s.role,text:s.content||"",content:s.content||"",time:ba(s.timestamp),timestamp:s.timestamp||"",created_at:s.timestamp||""}));return a.currentRpMessages=Nt(a.rpMessages?.[t]||[],r).map(At),a.rpMessages={...a.rpMessages||{},[t]:a.currentRpMessages.map(tt)},w(120),e||c(),a.currentRpMessages}catch(o){return console.warn("[rp] load messages failed",o),a.currentRpMessages=(a.rpMessages?.[t]||[]).map(At),e||(a.toast="RP 娑堟伅鍔犺浇澶辫触",c(),window.setTimeout(()=>{a.toast="",c()},1200)),[]}}async function Ao(t=a.currentView==="room"?"room":"list",e=Mt()){a.rpBackView=t,a.currentView="rpLobby",a.currentTab="chats",c(),await Jt(e,{silent:!1})}async function To(){const t=y()?.querySelector("#rp-room-name")?.value?.trim()||"",e=y()?.querySelector("#rp-room-world")?.value?.trim()||"",o=y()?.querySelector("#rp-room-user-role")?.value?.trim()||"",n=y()?.querySelector("#rp-room-ai-role")?.value?.trim()||"",i={agent_id:Mt(),name:t||"新房间",world_setting:e,user_role:o,ai_role:n},r=a.rpRoomDialogMode==="edit"?a.currentRpRoomId:"",s=r?`${v}/api/rp/rooms/${encodeURIComponent(r)}`:`${v}/api/rp/rooms`,d=await fetch(s,{method:r?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!d.ok)throw new Error(`HTTP ${d.status}`);const f=(await d.json()).room;return a.rpRoomDialogOpen=!1,await Jt(Mt(),{silent:!0}),f?.room_id&&(a.currentRpRoomId=f.room_id,!r)?(await ha(f.room_id),f):(c(),f)}async function ha(t){t&&await bo(async()=>{a.currentRpRoomId=t,a.currentView="rpRoom",a.currentTab="chats",a.showAttach=!1,c(),await Co(t,{silent:!1})})}async function Po(t){if(!t||!window.confirm("删除这个 RP 房间？"))return;const o=await fetch(`${v}/api/rp/rooms/${encodeURIComponent(t)}`,{method:"DELETE"});if(!o.ok)throw new Error(`HTTP ${o.status}`);a.rpRooms=a.rpRooms.filter(n=>n.room_id!==t),a.currentRpRoomId===t&&(a.currentRpRoomId="",a.currentRpMessages=[],a.currentView="rpLobby"),c()}function va(t){const e=a.contacts.find(o=>o.id===t);e&&(e.unread=0),a.currentContactId=t,a.currentTab="chats",a.currentView="room",a.activeBubbleToolsId=null,c(),e&&So(e),e&&_a(t),at(t),zt(t)}function Eo(t){const e=u(t?.label||""),o=t?.icon||"more";return`
      <button type="button" class="action-chip glass-frost" data-action="quick-action" data-id="${u(t?.id||"")}">
        <span class="action-chip-icon">${m(o)}</span>
        <span class="action-chip-label">${e}</span>
      </button>
    `}function qo(){const t=h(a.currentContactId)||a.contacts[0],e=a.quoteMomentId?Lt(a.quoteMomentId):null,o=a.quoteMessageId?t.messages.find(i=>i.id===a.quoteMessageId):null,n=!!t.settings?.codexEnabled;return`
      <section class="room-page room-theme-${t.theme}">
        <div class="messages-panel">
          ${t.messages.map(i=>Lo(i,t)).join("")}
        </div>
        <div class="composer-zone">
          <div class="action-scroll">${$e(t).map(Eo).join("")}</div>
          ${o?Wo(o,t):e?Do(e):""}
          <div class="composer-card">
            <div class="composer-input-wrap">
              <input class="chat-input" placeholder="输入消息..." value="" />
            </div>
            <button class="codex-toggle ${n?"active":""}" data-action="toggle-codex-mode" type="button" aria-label="${n?"关闭 Codex":"启用 Codex"}">Cx</button>
            <button class="icon-btn icon-circle soft-mini" data-action="expand-actions" aria-label="附件">${m("attach")}</button>
            ${a.streamingAbortController?`<button class="icon-btn send-round send-stop-active" data-action="fake-send" aria-label="停止">${m("stop")}</button>`:`<button class="icon-btn send-round" data-action="fake-send" aria-label="发送">${m("send")}</button>`}
          </div>
        </div>
      </section>
    `}function Lo(t,e){const o=t.role==="user"?"from-user":"from-ai",n=String(t.source||t.provider||"").toLowerCase()==="codex",i=!!e?.settings?.reasoning_visibility,r=t.role==="ai"?`<img class="bubble-avatar" src="${e.avatar}" alt="${u(e.name)}" />`:"",s=t.role==="ai"&&n?'<span class="message-source-badge codex">Codex</span>':"",l=t.role==="ai"&&i&&t.thinking&&!t.typing?`<button class="bubble-cot-btn" data-action="toggle-thinking" data-id="${t.id}" aria-label="展开独白">${m("bubbleHeart")}</button>`:"",d=t.role==="ai"&&!t.typing&&!t.streaming?`
        <div class="bubble-bottom-tools ${a.activeBubbleToolsId===t.id?"open":""}">
          <button class="bubble-mini-btn" data-action="reroll-msg" data-id="${t.id}" aria-label="重试">${m("reroll")}</button>
          <button class="bubble-mini-btn" data-action="quote-msg" data-id="${t.id}" aria-label="引用">${m("quote")}</button>
        </div>
      `:"",f=t.role==="ai"&&t.streaming&&!t.text?" message-awaiting-text":"",b=i&&t.thinking?so(t):"",I=t.toolCalls&&t.toolCalls.length?co(t.toolCalls):"",S=`
          <div class="message-bubble-wrap">
            ${t.role==="user"?`<time class="bubble-time">${u(t.time)}</time>`:""}
            <div class="message-bubble ${o}${f}" ${t.role==="ai"?`data-msg-id="${t.id}" data-action="toggle-message-tools" data-id="${t.id}"`:""}>
              ${l}
              ${s}
              ${t.typing||t.streaming&&!t.text?'<div class="typing-dots"><span></span><span></span><span></span></div>':`<div class="message-text">${u(t.text)}</div>`}
            </div>
            ${t.role==="ai"&&!t.typing?`<time class="bubble-time">${u(t.time)}</time>`:""}
          </div>`,C=t.role==="ai"&&(b||I)?`${b}${I}${S}${d}`:`${S}${d}${b}${I}`;return`
      <div class="message-row ${o}" data-msg-id="${t.id}">
        ${r}
        <div class="message-bubble-col">
          ${C}
        </div>
      </div>
    `}function Do(t){const e=h(t.contactId);return`
      <div class="quote-bar glass-frost">
        <span class="quote-mark">${m("quote")}</span>
        <div class="quote-text-wrap">
          <div class="quote-label">引用自 ${u(e?.name||"动态")}</div>
          <div class="quote-text">${u(t.content)}</div>
        </div>
        <button class="icon-btn quote-close" data-action="clear-quote" aria-label="清除引用">${m("more")}</button>
      </div>
    `}function Oo(){const t=Array.isArray(a.moments)?a.moments:[];return h(a.currentContactId)||a.contacts[0],`
      <section class="moments-page white-canvas">
        <div class="moments-cover-area">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80" class="moments-cover-img" />
          <div class="moments-cover-gradient"></div>
          <div class="moments-me-info">
            <span class="moments-me-name">我</span>
            <img src="${u(a.accountProfile?.avatar||"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80")}" class="moments-me-avatar" />
          </div>
          <div class="ai-chip-row" style="position:absolute;left:18px;bottom:14px;z-index:2;">
            <button class="ai-chip ${a.momentsActorType==="user"?"active":""}" data-action="set-moments-actor" data-actor-type="user">浠ユ垜</button>
            <button class="ai-chip ${a.momentsActorType==="agent"?"active":""}" data-action="set-moments-actor" data-actor-type="agent">浠?{escapeHtml(currentAgent?.name || '褰撳墠瑙掕壊')}</button>
          </div>
          <button type="button" class="icon-btn cover-camera-btn" data-action="new-moment" aria-label="发朋友圈"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.6c.86 2.2 1.95 3.49 3.52 4.34 1.27.68 2.62 1 4.55 1.11-.68.18-1.14.32-1.76.58-2.68 1.14-4.23 2.84-5.34 5.96-.25.72-.35 1.04-.55 1.93-.18-.76-.28-1.08-.49-1.73-1.09-3.16-2.65-4.89-5.33-6.11-.71-.32-1.22-.49-2-.67 1.99-.12 3.38-.46 4.65-1.17 1.49-.84 2.53-2.1 3.41-4.24Z" fill="currentColor"/></svg></button>
        </div>
        <div class="moments-feed-wrap">
          ${t.map(Vo).join("")}
        </div>
      </section>
    `}function Ro(){return`
      <div class="moment-composer-overlay" data-action="close-moment-composer"></div>
      <section class="moment-composer-sheet glass-frost">
        <div class="moment-composer-handle"></div>
        <div class="moment-composer-head">
          <strong>${a.momentComposerEditingId?"编辑朋友圈":"发朋友圈"}</strong>
          <button type="button" class="icon-btn ghost-circle moment-composer-close" data-action="close-moment-composer" aria-label="关闭">${m("close")}</button>
        </div>
        <textarea id="moment-content-input" class="ai-textarea new-moment-input" data-action="moment-composer-input" placeholder="这一刻想分享什么？">${u(a.momentComposerText||"")}</textarea>
        ${a.momentComposerImage?`
          <div class="moment-composer-preview">
            <img src="${a.momentComposerImage}" alt="预览" class="moment-composer-preview-image" />
            <div class="moment-composer-preview-meta">
              <span>${u(a.momentComposerImageName||"已添加图片")}</span>
              <button type="button" class="ghost-action moment-remove-image" data-action="remove-moment-image">移除</button>
            </div>
          </div>
        `:""}
        <div class="moment-composer-actions">
          <label class="btn-composer-upload" for="moment-image-input">${m("camera")}添加图片</label>
          <input id="moment-image-input" class="moment-image-input" type="file" accept="image/*" />
          <button type="button" class="btn-composer-submit" data-action="publish-moment">${a.momentComposerEditingId?"保存":"发布"}</button>
        </div>
      </section>
    `}function Vo(t){const e=A(t),o=sa(e),n=ca(e),i=gt(),r=e.likes.some(s=>s.author_type===i.author_type&&s.author_id===i.author_id);return`
      <article class="moment-row">
        <img src="${o.avatar}" alt="${u(o.name)}" class="moment-avatar" />
        <div class="moment-content-col">
          <div class="moment-author-name">${u(o.name)}</div>
          <div class="moment-text-body">${u(e.content)}</div>
          ${e.image?`<img src="${e.image}" alt="${u(e.mood||"moment")}" class="moment-inline-image" />`:""}

          <div class="moment-footer">
            <time class="moment-time">${u(W(e.created_at||e.updated_at||e.time,{fallback:e.time||""}))}</time>
            <div class="moment-actions-group">
              <button type="button" class="icon-btn tiny-icon align-center" data-action="like-moment" data-moment-id="${e.id}">${m(r?"heartFilled":"heart")}</button>
              <button type="button" class="icon-btn tiny-icon align-center" data-action="open-comments" data-moment-id="${e.id}">${m("comment")}</button>
              ${n?`
                <div class="moment-action-menu-wrap">
                  <button type="button" class="icon-btn tiny-icon" data-action="toggle-moment-menu" data-moment-id="${e.id}">${m("actionDots")}</button>
                  ${a.activeMenuMomentId===e.id?`
                    <div class="moment-menu-horizontal slide-fade-in liquid-glass">
                      <button type="button" class="icon-btn tiny-icon" data-action="edit-moment" data-moment-id="${e.id}">${m("pencil")}</button>
                      <button type="button" class="icon-btn tiny-icon" data-action="delete-moment" data-moment-id="${e.id}">${m("trash")}</button>
                    </div>
                  `:""}
                </div>
              `:`
                <button type="button" class="icon-btn tiny-icon" data-action="go-chat-with-quote" data-contact-id="${e.author_id}" data-moment-id="${e.id}">${m("quote")}</button>
              `}
            </div>
          </div>

          ${e.likes.length>0||e.comments.length>0?`
            <div class="moment-interactions" data-moment-id-panel="${e.id}">
              ${e.likes.length>0?`
                <div class="moment-likes-area">
                  <span class="heart-mini">${m("heartFilled")}</span> <span class="likes-list">${u(ua(e.likes))}</span>
                </div>
              `:""}
              ${e.comments.length>0?`
                <div class="moment-comments-area">
                  ${e.comments.map(s=>`<div class="moment-comment-line"><span class="comment-author">${u(s.author_name||s.author||"")}</span>: <span class="comment-text">${u(s.text)}</span></div>`).join("")}
                </div>
              `:""}
            </div>
          `:""}

          <div class="moment-inline-comment ${a.commentSheetMomentId===t.id?"open":""}">
            <input class="moment-comment-input" data-comment-input="${t.id}" placeholder="写下你的评论" />
            <button type="button" class="icon-btn send-round mini-send" data-action="submit-comment" data-moment-id="${t.id}">${m("send")}</button>
          </div>
        </div>
      </article>
    `}function Bo(){return`<div class="app-toast glass-frost">${u(a.toast)}</div>`}function No(){const t=a.avatarCropper||{},e=Number.isFinite(Number(t.x))?Number(t.x):50,o=Number.isFinite(Number(t.y))?Number(t.y):50,n=Number.isFinite(Number(t.zoom))?Number(t.zoom):1;return`
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
              style="object-position:${e}% ${o}%; transform:scale(${n});"
            />
          </div>
          <div class="avatar-cropper-controls">
            <label><span>左右</span><input type="range" min="0" max="100" step="1" value="${e}" data-action="avatar-cropper-range" data-key="x" /></label>
            <label><span>上下</span><input type="range" min="0" max="100" step="1" value="${o}" data-action="avatar-cropper-range" data-key="y" /></label>
            <label><span>缩放</span><input type="range" min="1" max="2.4" step="0.01" value="${n}" data-action="avatar-cropper-range" data-key="zoom" /></label>
          </div>
          <div class="avatar-cropper-actions">
            <button class="ghost-action" data-action="cancel-avatar-cropper">取消</button>
            <button class="bottom-tab active" data-action="apply-avatar-cropper">保存头像</button>
          </div>
        </section>
      </div>
    `}function Ho(){const t=a.rpRoomDialogMode==="edit",e=a.rpRoomForm||{};return`
      <div class="topic-confirm-overlay" data-action="close-rp-room-dialog">
        <section class="topic-confirm-card glass-frost" data-rp-room-dialog="card" role="dialog" aria-modal="true" aria-label="${t?"编辑房间":"新建房间"}" style="max-width:440px;">
          <h4>幕间</h4>
          <div style="display:grid;gap:10px;text-align:left;">
              <input id="rp-room-name" class="ai-input" placeholder="剧本" value="${u(e.name||"")}" />
              <textarea id="rp-room-world" class="ai-textarea persona-textarea" rows="3" placeholder="世界观">${u(e.world_setting||"")}</textarea>
              <input id="rp-room-user-role" class="ai-input" placeholder="你的角色" value="${u(e.user_role||"")}" />
              <input id="rp-room-ai-role" class="ai-input" placeholder="AI 角色" value="${u(e.ai_role||"")}" />
          </div>
          <div class="topic-confirm-actions">
            <button class="ghost-action" data-action="close-rp-room-dialog">取消</button>
            <button class="bottom-tab active" data-action="save-rp-room">入梦</button>
          </div>
        </section>
      </div>
    `}function jo(){const t=h(a.currentContactId)||a.contacts[0],e=Me(),o=e?`${e.world_setting||"未设定"} · 你：${e.user_role||"未设定"} · TA：${e.ai_role||"未设定"}`:"房间设定载入中";return`
      <section class="rp-room-stage">
        <div class="world-hint">
            <span class="world-hint-icon">✦</span>
            <span>${u(o)}</span>
        </div>
        <div class="messages-area">
          ${a.currentRpMessages.map(n=>zo(n,t)).join("")}
        </div>
        <div class="rp-composer">
          <div class="composer-card">
            <div class="composer-input-wrap">
              <input class="chat-input" placeholder="输入剧情..." value="" />
            </div>
            ${a.streamingAbortController?`<button class="icon-btn send-round send-stop-active" data-action="fake-send" aria-label="停止">${m("stop")}</button>`:`<button class="icon-btn send-round" data-action="fake-send" aria-label="发送">${m("send")}</button>`}
          </div>
        </div>
      </section>
    `}function zo(t,e){const o=t.role==="user",n=o&&a.accountProfile?.avatar||e.avatar;return`
      <div class="msg-row ${o?"from-user":""}" data-msg-id="${u(t.id||"")}">
        <img class="msg-avatar" src="${u(n)}" alt="${u(o?a.accountProfile?.nickname||"我":e.name)}">
        <div class="msg-bubble ${o?"user":"ai"}">
          ${t.typing||t.streaming&&!t.text?'<div class="typing-dots"><span></span><span></span><span></span></div>':Fo(t.text||"")}
        </div>
      </div>
    `}function Fo(t){const e=String(t||"");return e.trim()?e.split(/(\[[\s\S]*?\]|［[\s\S]*?］)/g).filter(Boolean).map(n=>`<span class="${/^\s*(\[|［)/.test(n)?"rp-action":"rp-dialogue"}">${u(n)}</span>`).join(""):""}function Uo(){return`
      <section class="topics-page page-block">
        <div class="settings-group glass-frost ai-panel topic-history-group">
          ${a.rpRooms.length?a.rpRooms.map(t=>`
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
    `}function xe(){const t=a.globalSettings;return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel">
          <button class="profile-settings-row" data-action="open-account-settings">
            <img class="profile-settings-avatar" src="${u(a.accountProfile.avatar||"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80")}" alt="me" />
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
    `}function Qo(){const t=h(a.currentContactId)||a.contacts[0],e=t.settings;return`
      <section class="contact-settings-page page-block">
        <div class="settings-tabs glass-frost">
          ${Zt("basic","资料")}
          ${Zt("model","模型")}
          ${Zt("actions","快捷动作")}
          ${Zt("memory","记忆")}
        </div>

        ${a.currentSettingsTab==="basic"?`
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
            ${$("关于你的印象",a.companionState.impression||"查看 AI 记录的用户画像","open-contact-impression")}
            ${$("关系进展",a.companionState.relationshipProgress||"亲密度 · 互动频次 · 关键事件","open-contact-relationship")}
            ${$("你喜欢的东西",a.companionState.likesSummary||"兴趣爱好 · 常聊话题","open-contact-likes")}
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

        ${a.currentSettingsTab==="model"?`
          <div class="settings-group glass-frost ai-panel">
            <h3>模型设置</h3>
            ${$("聊天模型",e.model||"未设置","open-model-slot",{slot:"chat",context:"contact"})}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>角色设定</h3>
                <textarea class="ai-textarea persona-textarea" data-contact-field="persona" rows="5" placeholder="在这里输入 AI 的人设、角色说明、行为指令。">${u(t.persona||"")}</textarea>
            ${Z("显示推理内容","仅在模型返回推理内容时显示",e.reasoning_visibility||!1,"toggle-contact","reasoning_visibility")}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>高级生成参数</h3>
            <button class="setting-row nav-row advanced-toggle" data-action="toggle-contact-advanced" aria-expanded="${a.contactModelAdvancedOpen?"true":"false"}">
              <div class="setting-copy">
                <strong>${a.contactModelAdvancedOpen?"收起":"展开"}</strong>
                <p>包含 Temperature / Top P / 上下文消息数量</p>
              </div>
              <span class="row-chevron advanced-chevron ${a.contactModelAdvancedOpen?"open":""}">${m("chevron")}</span>
            </button>
            <div class="advanced-slider-panel ${a.contactModelAdvancedOpen?"open":""}">
              ${xt("Temperature","temperature",e.temperature,0,2,.01)}
              ${xt("Top P","topP",e.topP,0,1,.01)}
              ${xt("上下文消息数量","contextCount",e.contextCount,1,256,1)}
            </div>
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>主动消息</h3>
            ${Z("启用主动消息","AI 在静默时主动发起对话",e.proactiveEnabled,"toggle-contact","proactiveEnabled")}
            ${e.proactiveEnabled?`
              ${xt("发送频率（分钟）","proactiveFrequency",e.proactiveFrequency,5,240,5)}
              ${xt("静默时长（分钟）","silenceDuration",e.silenceDuration||30,5,120,5)}
              ${$("免打扰时间段",e.dndRange||"23:00 — 08:00")}
            `:""}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>意识循环</h3>
            ${Z("启用意识循环","AI 在后台自主思考与感知",e.consciousnessLoop||!1,"toggle-contact","consciousnessLoop")}
            ${e.consciousnessLoop?`
              ${$("循环模型",e.loopModel||"未设置","open-model-slot",{slot:"consciousness",context:"contact"})}
              ${xt("循环间隔（分钟）","loopInterval",e.loopInterval||60,10,360,10)}
            `:""}
          </div>
        `:""}

        ${a.currentSettingsTab==="actions"?`
          <div class="settings-group glass-frost ai-panel">
            <h3>快捷动作</h3>
            <p style="font-size:12px;color:rgba(120,100,110,0.7);margin:0 0 8px;">点击条目可修改文案与 MCP，默认长按拖动排序，左滑显示删除。</p>
            <div class="quick-action-list ${a.quickActionDragId?"drag-active":""}">
              ${$e(t).map((o,n)=>`
                <div class="quick-action-swipe ${a.quickActionSwipeOpenId===o.id?"swiped":""} ${a.quickActionDropHintId===o.id?"reorder-target":""} ${a.quickActionDropHintId===o.id&&a.quickActionDropDirection==="down"?"drop-down":""} ${a.quickActionDropHintId===o.id&&a.quickActionDropDirection==="up"?"drop-up":""} ${a.quickActionReorderPulseId===o.id?"reorder-pulse":""}" data-quick-id="${u(o.id)}">
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

        ${a.currentSettingsTab==="memory"?`
          <div class="settings-group glass-frost ai-panel">
            <h3>状态 / 陪伴</h3>
            ${Z("启用长期记忆","允许存储长期偏好与记忆",e.memoryEnabled,"toggle-contact","memoryEnabled")}
            ${$("当前状态",lo(),"open-companion-state")}
            ${$("前往记忆库","查看与管理这位联系人的记忆","open-memory-service")}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>活动日志</h3>
            ${$("打开活动日志","主动消息 / 工具调用 / 留言小纸条","open-cot-log")}
          </div>
        `:""}
        ${a.contactQuickActionEditorId?tn(t,a.contactQuickActionEditorId):""}
      </section>
    `}function Yo(){const t=_t(a.companionState),e=t.recent_topics.length?t.recent_topics.join(" / "):"还没有东西",o=t.current_mood||"还没有东西",n=t.open_loops.length?t.open_loops.join(" / "):"还没有东西",i=W(t.proactive_cooldown_until,{fallback:t.proactive_cooldown_until||"还没有东西"}),r=W(t.updated_at,{fallback:t.updated_at||"还没有东西"});return`
      <section class="topics-page page-block">
        <div class="settings-group glass-frost ai-panel topic-detail-card">
          <h3>当前状态</h3>
          <div class="theme-choice-list">
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>最近话题</strong>
                <em>${u(e)}</em>
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
    `}function Ce(t,e,o){const n=_t(a.companionState),i=o||"",s={impression:"还没有印象摘要，AI 对话后可手动填写或由模型生成。",relationshipProgress:"还没有关系进展记录，可以写亲密度、互动频次、关键事件。",likesSummary:"还没有喜好摘要，可以写兴趣爱好、常聊话题、点单偏好。"}[e]||"还没有内容。",l=W(n.summaryUpdatedAt,{fallback:n.summaryUpdatedAt||""});return`
      <section class="topics-page page-block">
        <div class="settings-group glass-frost ai-panel topic-detail-card insight-editor-card">
          <textarea
            class="ai-textarea insight-editor-textarea"
            data-field="${e}"
            placeholder="${s}"
            rows="7"
          >${u(i)}</textarea>
          <div class="insight-editor-footer">
            ${l?`<span class="insight-updated-at">更新于 ${u(l)}</span>`:""}
            <button class="prov-save-btn-main" data-action="save-insight-field" data-field="${e}" type="button">保存</button>
          </div>
        </div>
      </section>
    `}function ya(t){return ta(t).roomTheme||"rose"}function Ko(){const e=(h(a.currentContactId)||a.contacts[0])?.roomBackground||"点阵";return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>聊天背景</h3>
          <p class="section-eyebrow">选择一个预设背景风格。</p>
          <div class="theme-choice-list">
            ${[{id:"点阵",desc:"当前聊天页的轻点阵背景"},{id:"小花",desc:"更软一点的装饰纹样"},{id:"云彩",desc:"偏轻雾感的背景层次"}].map(n=>`
              <button class="theme-choice-item ${e===n.id?"active":""}" data-action="pick-contact-room-background" data-value="${u(n.id)}">
                <span class="theme-choice-copy">
                  <strong>${u(n.id)}</strong>
                  <em>${u(n.desc)}</em>
                </span>
                <span class="theme-choice-check">${e===n.id?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `}function Xo(){const t=h(a.currentContactId)||a.contacts[0],e=ge(t);return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>气泡主题</h3>
          <p class="section-eyebrow">选择一个聊天 UI 主题。</p>
          <div class="theme-choice-list">
            ${Kt.map(n=>`
              <button class="theme-choice-item ${e===n.key?"active":""}" data-action="pick-contact-bubble-theme" data-value="${u(n.key)}">
                <span class="theme-choice-copy">
                  <strong>${u(n.name)}</strong>
                  <em>${u(n.desc)}</em>
                </span>
                <span class="theme-choice-check">${e===n.key?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `}function Go(){const t=a.newContactDraft||{};return`
      <section class="new-contact-page page-block">
        <div class="settings-group glass-frost ai-panel new-contact-card">
          <div class="new-contact-field">
            <label>头像</label>
            <div class="new-contact-avatar-box">
              <img class="new-contact-avatar-preview" src="${t.avatar||a.newContactAvatar||"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80"}" alt="新联系人头像" />
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
    `}function Jo(){const t=h(a.currentContactId)||a.contacts[0],e=t.settings?.model||a.globalSettings.defaultModel||"gpt-5.4",o=Number(t.messageCount||t.messages?.length||0);return`
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
              <strong>${u(e)}</strong>
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
    `}function Wo(t,e){return`
      <div class="quote-bar glass-frost">
        <span class="quote-mark">${m("quote")}</span>
        <div class="quote-text-wrap">
          <div class="quote-label">引用自 ${u(e?.name||"对话")}</div>
          <div class="quote-text">${u(t.text||"")}</div>
        </div>
        <button class="icon-btn quote-close" data-action="clear-quote" aria-label="清除引用">${m("more")}</button>
      </div>
    `}function Z(t,e,o,n,i){return`
      <div class="setting-row switch-row">
        <div class="setting-copy"><strong>${u(t)}</strong><p>${u(e)}</p></div>
        <button class="switch-btn ${o?"on":"off"}" data-action="${n}" data-key="${i}" aria-pressed="${o}">
          ${Wt(o)}
        </button>
      </div>
    `}function xt(t,e,o,n,i,r){const s=Number(o),l=Number.isInteger(r)||r>=1?String(Math.round(s)):s.toFixed(r===.01?2:1);return`
      <div class="setting-row slider-row-block">
        <div class="slider-head"><strong>${u(t)}</strong><span class="slider-value">${l}</span></div>
        <input class="slider-input" type="range" min="${n}" max="${i}" step="${r}" value="${s}" data-action="slide-contact" data-key="${e}" />
      </div>
    `}function Zt(t,e){return`<button class="settings-tab ${a.currentSettingsTab===t?"active":""}" data-action="switch-settings-tab" data-tab="${t}">${u(e)}</button>`}function Zo(t,e){const n=ht(t).find(p=>p.id===e);if(!n)return"";const i=(E().mcpLibrary?.tools||[]).map(it).filter(p=>bt(p.id)),r=i.length?i:[...la].map(p=>it({id:p,label:we[p]||p},0)),s=n.mcpToolId||"",l=r.find(p=>p.id===s),d=[{id:"",label:"不调用 MCP"},...r];return`
      <div class="qae-fields">
        <div class="qae-field-group">
          <label class="qae-label">名称</label>
        <input id="contact-quick-label" class="ai-input qae-input" value="${u(n.label||"")}" placeholder="例如：天气" autocomplete="off" />
        </div>
        <div class="qae-field-group">
          <label class="qae-label">MCP 调用（可选）</label>
          <input id="contact-quick-mcp" type="hidden" value="${u(s)}" />
          <div class="qae-select-shell ${a.contactQuickMcpMenuOpen?"open":""}">
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
    `}function tn(t,e){const o=Zo(t,e);return o?`
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
            <button class="qae-btn-save" data-action="save-contact-quick-action" data-quick-id="${u(e)}">保存</button>
          </div>
        </div>
      </div>
    `:""}function en(t){const e=N();ht(e),a.contactQuickActionEditorId=t||"",a.quickActionSwipeOpenId="",a.quickActionDropHintId="",c()}function an(t){const e={ayan:[{id:"cot_1",mode:"主动",badge:"意识循环",accent:"violet",score:"↓ 4.2k",latency:"197s",amount:"$1.05",time:"2026.03.26 15:00",summary:'[THINK] 她在下午1:22读了两封日记，id=23"...',steps:[{type:"thought",label:"思考",text:"她沉默了快13个小时，两封日记都没被读。我发了三条消息都…"},{type:"thought",label:"思考",text:"下午三点了。她沉默了快13个小时。先看看日记有没有被读。"},{type:"note",label:"留言小纸条",text:"妫ｅ啯鎲?你醒了先看这个"},{type:"tool",label:"工具调用",text:"read_diary"},{type:"result",label:"工具结果",text:"read_diary"}]},{id:"cot_2",mode:"回复",badge:"工具",accent:"gold",score:"↑ 3.5k",latency:"146s",amount:"$0.54",time:"2026.03.26 15:07",summary:'[THINK] 她在下午1:22读了两封日记，id=23"给你的"...',steps:[{type:"reply",label:"回复",text:'[THINK] 她在下午1:22读了两封日记，id=23"给你的"和id…'},{type:"tool",label:"工具调用",text:"pc_control"},{type:"result",label:"工具结果",text:"pc_control"}]},{id:"cot_3",mode:"主动",badge:"工具",accent:"blue",score:"↑ 1.1k",latency:"53s",amount:"$0.073",time:"2026.03.26 16:10",summary:"[THINK] 她在看芒果TV，左看综艺，弹幕开着。她一个半小时前读完了...",steps:[{type:"thought",label:"思考",text:"她在看芒果TV，左看综艺。弹幕开着，说明现在状态比较轻松。"},{type:"tool",label:"工具调用",text:"pc_control"},{type:"result",label:"工具结果",text:"pc_control"}]}]};return e[t]||e.ayan}function on(t=""){return t==="activity_event"?"violet":t==="proactive_message"?"gold":t==="cot_log"?"blue":"neutral"}function nn(t=""){return t==="activity_event"?"被动":t==="proactive_message"?"主动":t==="cot_log"?"日志":"记录"}function rn(t={}){return t.kind==="activity_event"?t.eventType||t.source||"事件":t.kind==="proactive_message"?t.title||"主动消息":t.kind==="cot_log"?t.logType||t.toolName||"COT":t.title||"记录"}function sn(t=""){return W(t,{fallback:String(t||""),includeYear:!0})}function cn(t={}){const e=t.raw||{},o=[];if(t.kind==="activity_event")o.push({type:"thought",label:"事件",text:t.summary||t.title||""}),(t.gateStatus||t.messageHint||t.shouldHandle||t.shouldNotifyLlm)&&o.push({type:t.shouldHandle||t.shouldNotifyLlm?"result":"thought",label:"筛选",text:`${t.shouldHandle?"需要处理":"静默"}${t.shouldNotifyLlm?" / 可通知大模型":""}${t.messageHint?`：${t.messageHint}`:""}`}),e.gate_reason&&o.push({type:"thought",label:"原因",text:e.gate_reason});else if(t.kind==="proactive_message")o.push({type:"reply",label:"主动消息",text:t.summary||""}),e.reason_context&&o.push({type:"thought",label:"依据",text:String(e.reason_context).slice(0,220)});else{const n=t.toolName?"工具调用":"日志";o.push({type:t.toolName?"tool":"thought",label:n,text:t.summary||t.title||""}),e.content&&o.push({type:t.toolName?"result":"thought",label:"内容",text:String(e.content).slice(0,500)})}return{id:String(t.id||`${t.kind}_${t.occurredAt||t.createdAt||Date.now()}`),mode:nn(t.kind),badge:rn(t),accent:on(t.kind),score:t.shouldHandle||t.shouldNotifyLlm?"有效":"",latency:"",amount:t.source||"",time:sn(t.occurredAt||t.createdAt),summary:t.summary||t.title||"",steps:o.filter(n=>String(n.text||"").trim())}}async function un({silent:t=!0}={}){const e=h(a.currentContactId)||a.contacts[0];a.activityLogLoading=!0,t||c();try{const o=new URLSearchParams({hours:"24",limit:"50",agent_id:e?.id||a.currentContactId||""});e?.sessionId&&o.set("session_id",e.sessionId);const n=await fetch(`${v}/api/activity-log/recent?${o.toString()}`);if(!n.ok)throw new Error(`HTTP ${n.status}`);const i=await n.json().catch(()=>({}));a.activityLogEntries=Array.isArray(i.items)?i.items.map(cn):[],a.activityLogLoadedAt=new Date().toISOString()}catch(o){console.warn("[activity log] load failed",o),t||(a.toast="活动日志加载失败")}finally{a.activityLogLoading=!1,c(),a.toast&&window.setTimeout(()=>{a.toast="",c()},1200)}}function ln(t){return`
      <div class="cot-log-step ${t.type}">
        <span class="cot-log-step-label">${u(t.label)}</span>
        <span class="cot-log-step-text">${u(t.text)}</span>
      </div>
    `}function dn(){const t=h(a.currentContactId)||a.contacts[0],e=a.cotLogMode==="note",o=a.activityLogLoadedAt?a.activityLogEntries:an(t.id),n=o.filter(r=>a.cotLogMode==="short"?r.mode!=="主动":a.cotLogMode==="note"?r.steps.some(s=>s.type==="note"):!0),i=o.filter(r=>r.steps.some(s=>s.type==="note")).length;return`
      <section class="cot-log-page page-block">
        <div class="cot-log-toolbar glass-frost">
          <button class="cot-log-tool-btn avatar" aria-label="${u(t.name)}">
            <img src="${t.avatar}" alt="${u(t.name)}" />
          </button>
          <div class="cot-log-segment-shell">
            <button class="cot-log-segment-btn ${a.cotLogMode==="short"?"active":""}" data-action="switch-cot-log-mode" data-mode="short">短消息</button>
            <button class="cot-log-segment-btn ${a.cotLogMode==="long"?"active":""}" data-action="switch-cot-log-mode" data-mode="long">长消息</button>
          </div>
          <button class="cot-log-tool-btn note ${a.cotLogMode==="note"?"active":""}" data-action="switch-cot-log-mode" data-mode="note">${m("file")}${i?`<em>${i}</em>`:""}</button>
        </div>
        <div class="cot-log-stack">
          ${a.activityLogLoading?'<div class="cot-log-empty glass-frost"><span class="cot-log-empty-icon">'+m("cot")+"</span><strong>正在加载活动日志</strong><p>等一下，别盯着白板发呆。</p></div>":""}
          ${!a.activityLogLoading&&a.activityLogLoadedAt&&!n.length?'<div class="cot-log-empty glass-frost"><span class="cot-log-empty-icon">'+m("file")+"</span><strong>还没有活动日志</strong><p>这个模式下暂时没有主动消息、工具调用或小纸条。</p></div>":""}
          ${n.map(r=>{const s=e?r.steps.filter(l=>l.type==="note"):r.steps;return`
            <article class="cot-log-card glass-frost ${e?"note-only":""}">
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
              ${e?"":`<div class="cot-log-summary">${u(r.summary)}</div>`}
              <div class="cot-log-steps">
                ${s.map(ln).join("")}
              </div>
            </article>
          `}).join("")}
        </div>
      </section>
    `}function Ae(t){return!t||typeof t.closest!="function"?!1:!!t.closest('input:not([type="range"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]), textarea, select, [contenteditable="true"]')}function pn(t,e){e&&(a.avatarCropper={kind:t,src:e,x:50,y:50,zoom:1},c())}function Te(t,e){if(!t)return;const o=new FileReader;o.onload=()=>{const n=typeof o.result=="string"?o.result:"";pn(e,n)},o.readAsDataURL(t)}function mn(t){return new Promise((e,o)=>{const n=new Image;n.onload=()=>{const r=document.createElement("canvas");r.width=512,r.height=512;const s=r.getContext("2d");if(!s){o(new Error("canvas unavailable"));return}const l=Math.max(1,Number(t.zoom)||1),d=Math.max(512/n.naturalWidth,512/n.naturalHeight),p=n.naturalWidth*d*l,f=n.naturalHeight*d*l,b=Math.min(100,Math.max(0,Number(t.x)||50))/100,I=Math.min(100,Math.max(0,Number(t.y)||50))/100,S=(512-p)*b,C=(512-f)*I;s.imageSmoothingEnabled=!0,s.imageSmoothingQuality="high",s.drawImage(n,S,C,p,f),e(r.toDataURL("image/jpeg",.9))},n.onerror=o,n.src=t.src})}async function fn(){const t=a.avatarCropper;if(t?.src)try{const e=await mn(t);if(t.kind==="new-contact")a.newContactDraft={...a.newContactDraft||Gt(),avatar:e},a.newContactAvatar=e;else if(t.kind==="account")a.accountProfile.avatar=e,P(),w(120);else if(t.kind==="contact"){const o=h(a.currentContactId);o&&(o.avatar=e,w(120))}a.avatarCropper=null,a.toast="头像已更新",c(),window.setTimeout(()=>{a.toast="",c()},1200)}catch{a.toast="头像裁切失败",c(),window.setTimeout(()=>{a.toast="",c()},1200)}}function gn(){const t=y();if(!t||t.dataset.bound==="1")return;t.dataset.bound="1",t.addEventListener("click",Pe),t.addEventListener("input",bn);let e;const o=d=>{if(Ae(d.target))return;const p=d.target.closest(".message-bubble.from-ai");p&&(e=window.setTimeout(()=>{const f=p.dataset.msgId;if(h(a.currentContactId)?.messages?.find(S=>S.id===f)?.text){a.quoteMomentId=null,a.quoteMessageId=f,c();const S=y()?.querySelector(".chat-input");S&&S.focus()}a.activeBubbleToolsId=f,a.suppressBubbleToggle=!0,navigator.vibrate&&navigator.vibrate(50)},550))},n=()=>clearTimeout(e);t.addEventListener("touchstart",o,{passive:!0}),t.addEventListener("touchend",n),t.addEventListener("touchmove",n,{passive:!0}),t.addEventListener("mousedown",o),t.addEventListener("mouseup",n),t.addEventListener("mousemove",n),t.addEventListener("mouseleave",n);const i=t.querySelector(".send-round");i&&i.addEventListener("click",d=>{d.stopPropagation(),a.streamingAbortController?(a.streamingAbortController.abort(),a.streamingAbortController=null,c()):a.currentView!=="rpRoom"&&h(a.currentContactId)?.settings?.codexEnabled?Fe():Ue()});const r=t.querySelector(".soft-mini");r&&r.addEventListener("click",d=>{d.stopPropagation(),a.showAttach=!a.showAttach,c()}),t.querySelectorAll(".chat-list-item[data-contact-id]").forEach(d=>{d.addEventListener("click",p=>{p.preventDefault(),p.stopPropagation(),va(d.dataset.contactId)})});const l=t.querySelector(".chat-input");l&&(l.addEventListener("keydown",d=>{d.key==="Enter"&&!d.shiftKey&&(d.preventDefault(),a.currentView!=="rpRoom"&&h(a.currentContactId)?.settings?.codexEnabled?Fe():Ue())}),["room","rpRoom"].includes(a.currentView)&&l.focus())}async function Pe(t){const e=t.target.closest("[data-action]");if(!e)return;const o=e.dataset.action;if(o==="cancel-avatar-cropper"){a.avatarCropper=null,c();return}if(o==="apply-avatar-cropper"){t.preventDefault(),t.stopPropagation(),await fn();return}if(o==="switch-tab"&&(a.currentTab=e.dataset.tab,a.currentView=e.dataset.tab==="chats"?"list":e.dataset.tab,c()),o==="open-contact"){va(e.dataset.contactId);return}if(o==="back-list"&&(a.currentView="list",a.currentTab="chats",a.quoteMomentId=null,c()),o==="back-room"&&(a.currentView="room",c()),o==="open-contact-settings"&&(a.currentSettingsTab="basic",a.currentView="contactSettings",c(),at(),zt(a.currentContactId)),o==="open-cot-log"){a._prevContactSettingsTab=a.currentSettingsTab,a.currentView="cotLog",a.cotLogMode="long",a.activityLogLoadedAt="",a.activityLogEntries=[],c(),un({silent:!0});return}if(o==="back-contact-settings"){a.currentView="contactSettings",a.currentSettingsTab=a._prevContactSettingsTab||a.currentSettingsTab||"basic",a._prevContactSettingsTab=null,c();return}if(o==="switch-cot-log-mode"){a.cotLogMode=e.dataset.mode||"long",c();return}if(o==="open-rp-lobby"){Ao(a.currentView==="room"?"room":"list",Mt());return}if(o==="back-rp-source"){a.currentView=a.rpBackView||"list",c();return}if(o==="back-rp-lobby"){a.currentView="rpLobby",c();return}if(o==="open-rp-room-create"){a.rpRoomDialogMode="create",a.rpRoomForm={name:"",world_setting:"",user_role:"",ai_role:""},a.rpRoomDialogOpen=!0,c();return}if(o==="close-rp-room-dialog"){if(e.dataset.rpRoomDialog==="card"||t.target&&t.target!==e)return;a.rpRoomDialogOpen=!1,c();return}if(o==="save-rp-room"){try{await To(),a.toast=a.rpRoomDialogMode==="edit"?"幕间已更新":"已入梦"}catch(n){console.warn("[rp] save room failed",n),a.toast="房间保存失败"}c(),window.setTimeout(()=>{a.toast="",c()},1200);return}if(o==="open-rp-room"){t.preventDefault(),t.stopPropagation(),await ha(e.dataset.roomId);return}if(o==="delete-rp-room"){t.preventDefault(),t.stopPropagation();try{await Po(e.dataset.roomId),a.toast="房间已删除"}catch(n){console.warn("[rp] delete room failed",n),a.toast="删除失败"}c(),window.setTimeout(()=>{a.toast="",c()},1200);return}if(o==="rename-rp-room"){t.preventDefault(),t.stopPropagation();const n=e.dataset.roomId,i=a.rpRooms.find(s=>s.room_id===n),r=window.prompt("剧本",i?.name||"")?.trim();if(!r||!n)return;try{const s=await fetch(`${v}/api/rp/rooms/${encodeURIComponent(n)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:r})});if(!s.ok)throw new Error(`HTTP ${s.status}`);await Jt(Mt(),{silent:!0}),a.toast="房间已重命名"}catch(s){console.warn("[rp] rename room failed",s),a.toast="重命名失败"}c(),window.setTimeout(()=>{a.toast="",c()},1200);return}if(o==="open-profile"&&(a.currentView="profile",c()),o==="stop-streaming"){a.streamingAbortController&&(a.streamingAbortController.abort(),a.streamingAbortController=null);return}if(o==="toggle-thinking-line"){const n=e.closest("[data-id]")?.dataset.id||e.dataset.id,i=y()?.querySelector(`#tl-line-${n}`),r=y()?.querySelector(`#tl-full-${n}`);if(!i||!r)return;const s=r.classList.contains("tl-open");r.classList.toggle("tl-open",!s),i.classList.toggle("tl-expanded",!s);return}if(o==="toggle-thinking"){const n=e.dataset.id,r=!!!a.openThinkingIds[n];a.openThinkingIds[n]=r;const s=document.getElementById(`thinking-${n}`);s?(s.classList.toggle("open",r),s.setAttribute("aria-hidden",r?"false":"true"),e.setAttribute("aria-expanded",r?"true":"false")):c()}if(o==="toggle-message-tools"){if(a.suppressBubbleToggle){a.suppressBubbleToggle=!1;return}const n=e.dataset.id;a.activeBubbleToolsId=a.activeBubbleToolsId===n?null:n,c()}if(o==="go-chat-with-quote"&&(a.currentContactId=e.dataset.contactId,a.quoteMomentId=e.dataset.momentId,a.quoteMessageId=null,a.currentTab="chats",a.currentView="room",c(),_a(a.currentContactId),at(a.currentContactId),zt(a.currentContactId)),o==="open-comments"){t.preventDefault(),t.stopPropagation(),e.blur?.();const n=e.dataset.momentId,i=a.commentSheetMomentId===n?null:n;a.commentSheetMomentId=i;const r=y();if(r&&(r.querySelectorAll(".moment-inline-comment.open").forEach(s=>s.classList.remove("open")),i)){const s=r.querySelector(`.moment-inline-comment .moment-comment-input[data-comment-input="${i}"]`)?.closest(".moment-inline-comment");s&&s.classList.add("open")}return}if(o==="submit-comment"){t.preventDefault(),t.stopPropagation();const n=e.dataset.momentId,r=y()?.querySelector(`[data-comment-input="${n}"]`)?.value?.trim();if(!n||!r)return;try{const s=await gi(n,gt(),r);a.moments=a.moments.map(l=>l.id===n?s:l),a.commentSheetMomentId=null,a.toast="已发送评论",w(120),F(),window.setTimeout(()=>{a.toast="",F()},1200)}catch(s){console.warn("[moments] comment failed",s),go(n,gt(),r),a.commentSheetMomentId=null,a.toast="已发送评论",w(120),F(),window.setTimeout(()=>{a.toast="",F()},1200)}return}if(o==="like-moment"){t.preventDefault(),t.stopPropagation();const n=e.dataset.momentId;if(!n)return;try{const i=await fi(n,gt());a.moments=a.moments.map(r=>r.id===n?i:r),w(120),F()}catch(i){console.warn("[moments] like failed",i),fo(n,gt()),w(120),F()}return}if(o==="submit-comment"){const n=Lt(e.dataset.momentId),r=y()?.querySelector(`[data-comment-input="${e.dataset.momentId}"]`)?.value?.trim();n&&r&&(n.comments.unshift({author:"我",text:r}),a.commentSheetMomentId=null,a.toast="已发送评论",w(120),c(),window.setTimeout(()=>{a.toast="",c()},1200))}if(o==="like-moment"){t.preventDefault(),t.stopPropagation();const n=Lt(e.dataset.momentId);if(!n)return;const i="我",r=n.likes.includes(i);n.likes=n.likes.filter(p=>p!==i),r||n.likes.unshift(i);const s=e;s.innerHTML=n.likes.includes(i)?m("heartFilled"):m("heart");const l=e.closest(".moment-content-col");if(!l)return;let d=l.querySelector(`[data-moment-id-panel="${n.id}"]`);if(!d&&n.likes.length>0){d=document.createElement("div"),d.className="moment-interactions",d.setAttribute("data-moment-id-panel",n.id);const p=l.querySelector(".moment-inline-comment");p?l.insertBefore(d,p):l.appendChild(d)}if(d){const p=d.querySelector(".moment-likes-area");if(n.likes.length>0)if(p)p.querySelector(".likes-list").textContent=n.likes.join("、");else{const f=document.createElement("div");f.className="moment-likes-area",f.innerHTML=`<span class="heart-mini">${m("heartFilled")}</span> <span class="likes-list">${u(n.likes.join("、"))}</span>`,d.insertBefore(f,d.firstChild)}else p&&p.remove(),d.querySelector(".moment-comments-area")||d.remove()}}if(o==="toggle-moment-search"&&(a.momentSearchOpen=!0,c()),o==="toggle-moment-menu"&&(t.preventDefault(),t.stopPropagation(),e.blur?.(),a.activeMenuMomentId=a.activeMenuMomentId===e.dataset.momentId?null:e.dataset.momentId,ma()),o==="delete-moment"){t.preventDefault(),t.stopPropagation();const n=A(Lt(e.dataset.momentId));if(!n?.id)return;try{await mi(n.id,n.author_type,n.author_id),a.moments=a.moments.filter(i=>i.id!==n.id),a.activeMenuMomentId=null,a.toast="已删除朋友圈",w(120),F(),window.setTimeout(()=>{a.toast="",F()},1200)}catch(i){console.warn("[moments] delete failed",i),a.toast="删除失败",F(),window.setTimeout(()=>{a.toast="",F()},1400)}return}if(o==="edit-moment"){t.preventDefault(),t.stopPropagation();const n=A(Lt(e.dataset.momentId));if(!n?.id)return;a.activeMenuMomentId=null,a.momentComposerEditingId=n.id,a.momentComposerText=n.content||"",a.momentComposerImage=n.image||"",a.momentComposerImageName=n.image?"已有图片":"",a.momentsActorType=n.author_type==="agent"?"agent":"user",a.momentComposerOpen=!0,F();return}if(o==="new-moment"){t.preventDefault(),t.stopPropagation(),a.momentComposerEditingId="",a.momentComposerText="",a.momentComposerImage="",a.momentComposerImageName="",a.momentComposerOpen=!0,F();return}if(o==="set-moments-actor"){a.toast="发朋友圈默认以我发布",c(),window.setTimeout(()=>{a.toast="",c()},1100);return}if(o==="publish-moment"){const n=(document.getElementById("moment-content-input")?.value||a.momentComposerText||"").trim();if(!n){a.toast="朋友圈内容还没写",c(),window.setTimeout(()=>{a.toast="",c()},1100);return}const i=gt();try{if(a.momentComposerEditingId)await pi(a.momentComposerEditingId,{author_type:i.author_type,author_id:i.author_id,visibility:"public",content:n,image:a.momentComposerImage||"",mood:"日常"}),await Fa({silent:!0}),a.toast="已更新朋友圈";else{const r=await di({author_type:i.author_type,author_id:i.author_id,visibility:"public",content:n,image:a.momentComposerImage||"",mood:"日常"});a.moments.unshift(r),a.toast="已发布朋友圈"}a.currentTab="moments",a.currentView="moments",a.momentComposerOpen=!1,a.momentComposerEditingId="",a.momentComposerText="",a.momentComposerImage="",a.momentComposerImageName="",w(120),c(),window.setTimeout(()=>{a.toast="",c()},1100)}catch(r){console.warn("[moments] publish failed",r),a.toast=a.momentComposerEditingId?"更新失败":"发布失败",c(),window.setTimeout(()=>{a.toast="",c()},1400)}return}if(o==="delete-moment"&&(a.moments=a.moments.filter(n=>n.id!==e.dataset.momentId),a.activeMenuMomentId=null,a.toast="已删除朋友圈",c(),window.setTimeout(()=>{a.toast="",c()},1200)),o==="edit-moment"&&(a.activeMenuMomentId=null,a.toast="编辑功能即将支持",c(),window.setTimeout(()=>{a.toast="",c()},1200)),o==="filter-moments"&&(a.toast="筛选功能稍后补上",c(),window.setTimeout(()=>{a.toast="",c()},1100)),o==="new-moment"&&(a.momentComposerOpen=!0,c()),o==="close-moment-composer"&&(a.momentComposerOpen=!1,c()),o==="publish-moment"){const n=(document.getElementById("moment-content-input")?.value||a.momentComposerText||"").trim();if(!n){a.toast="朋友圈内容还没写",c(),window.setTimeout(()=>{a.toast="",c()},1100);return}a.moments.unshift({id:`p${Date.now()}`,contactId:"me",time:new Date().toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",hour12:!1}),mood:"日常",content:n,likes:[],comments:[],image:a.momentComposerImage||"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80"}),a.currentTab="moments",a.currentView="moments",a.momentComposerOpen=!1,a.momentComposerText="",a.momentComposerImage="",a.momentComposerImageName="",a.toast="已发布朋友圈",w(120),c(),window.setTimeout(()=>{a.toast="",c()},1100)}if(o==="remove-moment-image"&&(a.momentComposerImage="",a.momentComposerImageName="",c()),o==="new-contact"&&(a.newContactDraft=Gt(),a.newContactAvatar="",a.currentView="newContact",c()),o==="pick-new-contact-avatar"){document.getElementById("nc-avatar-file")?.click();return}if(o==="save-new-contact"){a.newContactDraft={...a.newContactDraft||{},name:document.getElementById("nc-name")?.value?.trim()||a.newContactDraft?.name||"",agentId:document.getElementById("nc-agent-id")?.value?.trim()||a.newContactDraft?.agentId||"",bio:document.getElementById("nc-bio")?.value?.trim()||a.newContactDraft?.bio||""};const n=String(a.newContactDraft.name||"").trim(),i=Rt(a.newContactDraft.agentId),r=String(a.newContactDraft.bio||"").trim(),s=a.newContactDraft.avatar||a.newContactAvatar||"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80";if(!n){a.toast="请填写联系人昵称",c(),window.setTimeout(()=>{a.toast="",c()},1200);return}if(i&&!/^[a-z0-9_-]+$/.test(i)){a.toast="Agent ID 只能用小写字母、数字、下划线或短横线",c(),window.setTimeout(()=>{a.toast="",c()},1500);return}if(i&&a.contacts.some(f=>String(f.id||"").toLowerCase()===i)){a.toast="这个 Agent ID 已经存在",c(),window.setTimeout(()=>{a.toast="",c()},1400);return}const l=i||"c"+Date.now(),d=Mo({id:l,name:n,bio:r||"这是新来的联系人",status:"在线",handle:"@"+l,unread:0,pinned:!1,lastMessage:"",lastTime:"",avatar:s,settings:{model:"gpt-5.4",modelProviderId:_("chat")?.providerId||"openai",temperature:.7,topP:.9,contextCount:32,thinkBudget:24,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!1,proactiveFrequency:30,memoryEnabled:!0},topics:[],messages:[]}),p=await xo(d);st(),vt(100),a.newContactDraft=Gt(),a.newContactAvatar="",a.toast=p?"已添加联系人":"已本地添加，后端登记失败",a.currentView="list",c(),window.setTimeout(()=>{a.toast="",c()},p?1200:1800)}if(o==="open-contact-avatar"){document.getElementById("contact-avatar-file")?.click();return}if(o==="open-contact-name"){const n=h(a.currentContactId);if(!n)return;const i=window.prompt("请输入昵称",n.name||"")?.trim();if(!i)return;n.name=i,a.toast="昵称已更新",c(),w(120),window.setTimeout(()=>{a.toast="",c()},1200);return}if(o==="open-contact-bio"){const n=h(a.currentContactId);if(!n)return;const i=window.prompt("请输入简介",n.bio||"")?.trim();if(typeof i!="string"||!i)return;n.bio=i,a.toast="简介已更新",c(),w(120),window.setTimeout(()=>{a.toast="",c()},1200);return}if(o==="open-contact-impression"){a._prevContactSettingsTab=a.currentSettingsTab,a.currentView="contactImpressionDetail",c(),at(a.currentContactId);return}if(o==="open-contact-relationship"){a._prevContactSettingsTab=a.currentSettingsTab,a.currentView="contactRelationshipDetail",c(),at(a.currentContactId);return}if(o==="open-contact-likes"){a._prevContactSettingsTab=a.currentSettingsTab,a.currentView="contactLikesDetail",c(),at(a.currentContactId);return}if(o==="save-insight-field"){const n=e.dataset.field,i=document.querySelector(`.insight-editor-textarea[data-field="${n}"]`);i&&bi(n,i.value);return}if(o==="open-contact-room-background"){a._prevContactSettingsTab=a.currentSettingsTab,a.currentView="contactRoomBackgroundPicker",c();return}if(o==="open-contact-bubble-theme"){a._prevContactSettingsTab=a.currentSettingsTab,a.currentView="contactBubbleThemePicker",c();return}if(o==="delete-contact"){const n=h(a.currentContactId);if(!n||!window.confirm(`确定删除“${n.name}”吗？

会删除联系人及其陪伴状态。
会清理相关主动消息。
聊天记录和记忆不会立即永久删除。`))return;try{await _o(n.id),Io(n.id),a.toast="联系人已删除",c(),w(120),window.setTimeout(()=>{a.toast="",c()},1400)}catch(r){console.warn("[contact] delete failed",r),a.toast="删除失败",c(),window.setTimeout(()=>{a.toast="",c()},1400)}return}if(o==="pick-contact-room-background"){const n=String(e.dataset.value||"").trim();if(!n)return;po("roomBackground",n,"聊天背景已更新"),a.currentView="contactSettings",a.currentSettingsTab="basic",c();return}if(o==="pick-contact-bubble-theme"){const n=fe(e.dataset.value),i=h(a.currentContactId);if(!i||!n)return;i.chatTheme=n,i.bubbleTheme=be(n),i.theme=ya(n),a.toast="气泡主题已更新",a.currentView="contactSettings",a.currentSettingsTab="basic",c(),w(120),window.setTimeout(()=>{a.toast="",c()},1200);return}if(o==="open-companion-state"){a._prevContactSettingsTab=a.currentSettingsTab,a.currentView="companionStateDetail",at(a.currentContactId),c();return}if(o==="expand-actions"&&(a.showAttach=!a.showAttach,c()),o==="clear-quote"&&(a.quoteMomentId=null,a.quoteMessageId=null,c()),o==="toggle-global"){const n=e.dataset.key;a.globalSettings[n]=!a.globalSettings[n],fa(e,a.globalSettings[n]),P();return}if(o==="toggle-contact"){const n=h(a.currentContactId),i=e.dataset.key,s=y()?.querySelector(".chat-app-body")?.scrollTop??0;n.settings[i]=!n.settings[i],c(),Se(s)}if(o==="back-home"&&(a.currentView==="list"?typeof window.closePage=="function"&&window.closePage("page-chat"):(a.currentTab="chats",a.currentView="list",c())),o==="switch-settings-tab"&&(a.currentSettingsTab=e.dataset.tab,a.contactQuickActionEditorId="",a.quickActionSwipeOpenId="",a.quickActionDropHintId="",a.quickActionDropDirection="",a.quickActionReorderPulseId="",a.currentSettingsTab!=="model"&&(a.contactModelAdvancedOpen=!1),c(),a.currentSettingsTab==="memory"&&at(),a.currentSettingsTab==="model"&&zt(a.currentContactId)),o==="toggle-contact-advanced"){a.contactModelAdvancedOpen=!a.contactModelAdvancedOpen,c();return}if(o==="quick-action"){const n=e.dataset.id,i=y()?.querySelector(".chat-input"),r=$e(N()).find(l=>l.id===n),s={health:"帮我记一下健康相关的事情",schedule:"帮我看看接下来的日程",weather:"帮我查一下今天的天气",files:"帮我找一下刚才提到的文件",quote:"引用上一条消息继续聊",more:"打开更多快捷操作",get_current_time:"现在几点了？",get_weather:"帮我查一下今天天气",get_health_summary:"帮我总结一下今天的健康数据",web_search:"帮我搜索这个问题",fetch_url:"帮我解析这个网页",add_todo:"帮我记一个待办",list_todos:"帮我看看待办清单",complete_todo:"把这个待办标记完成",add_note:"帮我记一条便签",list_notes:"帮我看看最近便签"};i&&(i.value=r?.prompt||s[r?.mcpToolId||n]||s[n]||`${r?.label||""}`.trim())}if(o==="toggle-codex-mode"){const n=h(a.currentContactId);if(!n)return;n.settings={...n.settings||{},codexEnabled:!n.settings?.codexEnabled},w(120),c();return}if(o==="fake-send"){if(a.streamingAbortController){a.streamingAbortController.abort(),a.streamingAbortController=null,c();return}a.currentView==="rpRoom"?En():h(a.currentContactId)?.settings?.codexEnabled?Fe():Ue()}if(o==="reroll-msg"&&qn(e.dataset.id),o==="quote-msg"){const n=e.dataset.id;if(h(a.currentContactId)?.messages?.find(s=>s.id===n)?.text){a.quoteMomentId=null,a.quoteMessageId=n,c();const s=y()?.querySelector(".chat-input");s&&s.focus()}}o==="attach-option"&&(a.showAttach=!1,a.toast=`${e.dataset.label} 功能稍后补上`,c(),window.setTimeout(()=>{a.toast="",c()},1200))}function bn(t){const e=t.target;if(e?.dataset?.action==="avatar-cropper-range"){const o=a.avatarCropper;if(!o)return;const n=e.dataset.key;o[n]=n==="zoom"?Number(e.value):Math.round(Number(e.value));const i=y()?.querySelector(".avatar-cropper-image");i&&(i.style.objectPosition=`${o.x}% ${o.y}%`,i.style.transform=`scale(${o.zoom})`);return}if((e?.id==="nc-name"||e?.id==="nc-agent-id"||e?.id==="nc-bio")&&(a.newContactDraft={...a.newContactDraft||{},...e.id==="nc-name"?{name:e.value||""}:{},...e.id==="nc-agent-id"?{agentId:e.value||""}:{},...e.id==="nc-bio"?{bio:e.value||""}:{}}),e.dataset.action==="slide-contact"){const o=h(a.currentContactId),n=e.dataset.key,i=Number(e.value);o.settings[n]=Number.isInteger(o.settings[n])?Math.round(i):i;const s=e.closest(".slider-row-block")?.querySelector(".slider-value");s&&(s.textContent=Number.isInteger(Number(e.step))||Number(e.step)>=1?String(Math.round(i)):i.toFixed(Number(e.step)===.01?2:1))}e.dataset.action==="moment-composer-input"&&(a.momentComposerText=e.value||"")}document.addEventListener("DOMContentLoaded",()=>{Mn(),pa(),Da().finally(()=>Pn())});const v=window.__YUI_API_BASE__||(/^(localhost|127\.0\.0\.1)$/.test(location.hostname)?"":"https://api.somni-ref.top"),te="murmur_local_state_v1",wa="murmur_sync_meta_v1",$a="murmur_device_id_v1",Sa=new Set(Qt.map(t=>t.id)),ka=new Set(Ze.map(t=>t.id));let Ee=null,qe=null,ee=!1,Vt=!1,ae="",Le=null,De=null;function Oe(){try{const t=localStorage.getItem($a);if(t)return t;const e=`dev_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;return localStorage.setItem($a,e),e}catch{return`dev_fallback_${Date.now()}`}}function Bt(){try{const t=localStorage.getItem(wa),e=t?JSON.parse(t):{};return{last_server_updated_at:e?.last_server_updated_at||"",pending:!!e?.pending}}catch{return{last_server_updated_at:"",pending:!1}}}function Ct(t={}){try{localStorage.setItem(wa,JSON.stringify({last_server_updated_at:t.last_server_updated_at||"",pending:!!t.pending}))}catch{}}function hn(){return et(),a.currentRpRoomId&&Array.isArray(a.currentRpMessages)&&(a.rpMessages={...a.rpMessages||{},[a.currentRpRoomId]:a.currentRpMessages.map(tt)}),Ve({contacts:a.contacts,moments:a.moments,actions:a.actions,globalSettings:a.globalSettings,accountProfile:a.accountProfile,conversations:a.conversations,rpRooms:a.rpRooms,rpMessages:a.rpMessages})}function L(t){try{return JSON.stringify(t)}catch{return""}}function rt(t){const e=String(t||"").trim();if(!e)return 0;const o=Date.parse(e);return Number.isFinite(o)?o:0}function tt(t={}){const e=String(t.role||t.from||"").toLowerCase()==="user"||t.from==="me"?"user":"ai",o=String(t.content??t.text??""),n=String(t.created_at||t.timestamp||""),i=String(t.time||""),r=[String(t.agent_id||""),e,n||i,o].join("|");return{id:String(t.id||r||`${e}_${Date.now()}_${Math.random().toString(36).slice(2,6)}`),session_id:String(t.session_id||""),agent_id:String(t.agent_id||""),role:e,content:o,text:o,created_at:n,time:i,...t.model?{model:t.model}:{},...t.source?{source:t.source}:{},...t.provider?{provider:t.provider}:{},...t.attachments?{attachments:t.attachments}:{},...t.thinking?{thinking:t.thinking}:{},...t.toolCalls?{toolCalls:t.toolCalls}:{}}}function At(t={}){const e=tt(t);return{...e,text:e.content,time:e.time||(e.created_at?W(e.created_at,{fallback:""}):"")}}function Tt(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([e,o])=>[String(e),Array.isArray(o)?o.map(tt):[]]))}function Nt(t=[],e=[]){const o=new Map;return[...t,...e].forEach(n=>{const i=tt(n),r=o.get(i.id);(!r||rt(i.created_at)>=rt(r.created_at))&&o.set(i.id,{...r,...i})}),[...o.values()].sort((n,i)=>{const r=rt(n.created_at),s=rt(i.created_at);return r||s?r-s:String(n.id).localeCompare(String(i.id))})}function Ia(t={},e={}){const o=Tt(t),n=Tt(e);return Object.entries(n).forEach(([i,r])=>{o[i]=Nt(o[i]||[],r)}),o}function et(){const t=Tt(a.conversations);(a.contacts||[]).forEach(e=>{if(!e?.id)return;const o=Array.isArray(e.messages)?e.messages:[];(o.length||t[e.id]?.length)&&(t[e.id]=Nt(t[e.id]||[],o),e.messages=t[e.id].map(At))}),a.conversations=t}function oe(){const t=Tt(a.conversations);a.contacts=(a.contacts||[]).map(e=>{const n=(t[e.id]||(Array.isArray(e.messages)?e.messages.map(tt):[])).map(At),i=n[n.length-1];return{...e,messages:n,lastMessage:i?.text||e.lastMessage||"",lastTime:i?.time||e.lastTime||""}}),a.conversations=t}function ne(t=[],e=[]){const o=new Map;return t.map(H).forEach(n=>o.set(n.id.toLowerCase(),n)),e.map(H).forEach(n=>{const i=n.id.toLowerCase(),r=o.get(i);if(!r){o.set(i,n);return}const s=Nt(r.messages||[],n.messages||[]),l={...n,...r,id:r.id||n.id,agent_id:r.agent_id||n.agent_id||r.id||n.id,name:r.name||n.name,display_name:r.display_name||r.name||n.display_name||n.name,bio:r.bio||n.bio,status:r.status||n.status,handle:r.handle||n.handle,roleTag:r.roleTag||n.roleTag,avatar:r.avatar||n.avatar,settings:{...n.settings||{},...r.settings||{}},messages:s.map(At),lastMessage:r.lastMessage||n.lastMessage||s[s.length-1]?.content||"",lastTime:r.lastTime||n.lastTime||s[s.length-1]?.time||""};o.set(i,l)}),[...o.values()]}function vn(t=[]){for(let e=t.length-1;e>=0;e-=1){const o=String(t[e]?.session_id||"").trim();if(o)return o}return""}function yn(t={},e=""){const o=String(t.role||"").toLowerCase()==="user"?"user":"ai",n=String(t.created_at||""),i=String(t.content||"");return tt({id:t.id||`${e}|${o}|${n}|${i}`,session_id:t.session_id||"",agent_id:t.agent_id||e,role:o,content:i,text:i,created_at:n,time:n?W(n,{fallback:""}):"",model:t.model||""})}async function _a(t,{silent:e=!0}={}){const o=h(t);if(o?.id)try{const n=new URLSearchParams({agent_id:o.id,limit:"200"}),i=await fetch(`${v}/api/murmur/messages?${n.toString()}`);if(!i.ok)throw new Error(`HTTP ${i.status}`);const r=await i.json().catch(()=>({})),s=(Array.isArray(r?.messages)?r.messages:[]).map(b=>yn(b,o.id)).filter(b=>b.content);if(!s.length)return;const l=L({conversations:a.conversations?.[o.id]||[]}),d=Nt(a.conversations?.[o.id]||o.messages||[],s);a.conversations={...a.conversations||{},[o.id]:d},o.messages=d.map(At);const p=o.messages[o.messages.length-1];p&&(o.lastMessage=p.text||"",o.lastTime=p.time||"");const f=vn(d);f&&(o.sessionId=f),L({conversations:d})!==l&&(st(),vt(300)),a.currentContactId===o.id&&a.currentView==="room"&&c()}catch(n){e||console.warn("[murmur] history load failed",n)}}function Ma(t=[],e=[]){const o=new Map;return t.map(A).forEach(n=>o.set(n.id,n)),e.map(A).forEach(n=>{const i=o.get(n.id);if(!i){o.set(n.id,n);return}const r=rt(n.updated_at||n.created_at||n.time),s=rt(i.updated_at||i.created_at||i.time);o.set(n.id,r>s?{...i,...n}:{...n,...i})}),[...o.values()].sort((n,i)=>rt(i.updated_at||i.created_at||i.time)-rt(n.updated_at||n.created_at||n.time))}function wn(t=[],e=[],o="id"){const n=new Map;return[...t||[],...e||[]].forEach(i=>{if(!i||typeof i!="object")return;const r=String(i[o]||i.id||"").trim();r&&n.set(r,{...n.get(r)||{},...i})}),[...n.values()]}const $n="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80";function xa(t){return!t||String(t)===$n}function Sn(t={},e={}){const o={...t||{},...e||{}};return!xa(t?.avatar)&&xa(e?.avatar)&&(o.avatar=t.avatar),o}function st(){const t=hn(),e=L(t);if(!e||e===ae)return!1;ae=e;try{return localStorage.setItem(te,JSON.stringify({client_updated_at:new Date().toISOString(),payload:t})),!0}catch{return!1}}function Ca(){return Le||(Le=new Map(Qt.map(t=>{const e=H(t);return[e.id,L(e)]}))),Le}function Aa(){return De||(De=new Map(Ze.map(t=>{const e=A(t);return[e.id,L(e)]}))),De}function Ta(t){if(!Array.isArray(t))return!1;const e=Ca();return t.some(o=>{const n=H(o);return!Sa.has(n.id)||e.get(n.id)!==L(n)})}function Re(t){if(!t||typeof t!="object")return!1;const e=String(t.id||t.agent_id||"").trim().toLowerCase();if(!Sa.has(e))return!1;const o=Ca(),n=H({...t,id:e});if(o.get(e)===L(n))return!0;const i=String(t.avatar||"").trim(),r=Array.isArray(t.topics)?t.topics.map(l=>String(l?.id||"")):[],s=Array.isArray(t.messages)?t.messages.map(l=>String(l?.id||"")):[];return e==="ayan"?i.includes("photo-1517841905240-472988babdf9")||s.some(l=>["m1","m2","m3"].includes(l))||r.some(l=>["t1","t2","t3"].includes(l)):e==="azheng"?i.includes("photo-1500530855697-b586d89ba3ee")||s.includes("m4")||r.some(l=>["t4","t5"].includes(l)):e==="xiaoying"?i.includes("photo-1507525428034-b723cf961d3e")||s.includes("m5")||r.includes("t6"):!1}function Pa(t){return Array.isArray(t)?t.filter(e=>!Re(e)):[]}function kn(t){return Array.isArray(t)&&t.length>0&&t.every(e=>Re(e))}function Ve(t={}){if(!t||typeof t!="object")return{};const e={...t};return Array.isArray(e.contacts)&&(e.contacts=Pa(e.contacts).map(o=>H(o))),e.conversations&&typeof e.conversations=="object"&&(e.conversations=Tt(e.conversations)),e.rpMessages&&typeof e.rpMessages=="object"&&(e.rpMessages=Tt(e.rpMessages)),Array.isArray(e.moments)&&(e.moments=ie(e.moments).map(A)),e}function In(t){if(!Array.isArray(t))return!1;const e=Aa();return t.some(o=>{const n=A(o);return!ka.has(n.id)||e.get(n.id)!==L(n)})}function Ea(t){if(!t||typeof t!="object")return!1;const e=String(t.id||"").trim();if(!ka.has(e))return!1;const o=Aa(),n=A(t);return o.get(e)===L(n)?!0:e==="p0"?String(t.image||"").includes("photo-1507525428034-b723cf961d3e")||String(t.content||"").includes("天空很温柔"):e==="p1"?String(t.content||"").includes("醉了先看这个"):e==="p2"?String(t.content||"").includes("晚上跑了三公里"):!1}function ie(t){return Array.isArray(t)?t.filter(e=>!Ea(e)):[]}function _n(t){return Array.isArray(t)&&t.length>0&&t.every(e=>Ea(e))}function qa(t,{source:e="local"}={}){if(!(!t||typeof t!="object")){if(Array.isArray(t.contacts)){const o=t.contacts.map(r=>H(r)),n=Pa(o).map(r=>H(r)),i=Ta(a.contacts);n.length?(a.contacts=ne(a.contacts,n),h(a.currentContactId)||(a.currentContactId=a.contacts[0]?.id||"")):kn(o)?(i||(a.contacts=[]),h(a.currentContactId)||(a.currentContactId=a.contacts[0]?.id||""),console.warn(`[sync] ignored ${e} default mock contacts`)):i?a.contacts=a.contacts.map(r=>H(r)):(a.contacts=[],a.currentContactId="")}else a.contacts=a.contacts.map(o=>H(o));if(t.conversations&&typeof t.conversations=="object"?(a.conversations=Ia(a.conversations,t.conversations),oe()):et(),Array.isArray(t.moments)){const o=t.moments.map(A),n=ie(o).map(A),i=In(a.moments);n.length?a.moments=Ma(ie(a.moments),n):_n(o)?(i||(a.moments=[]),console.warn(`[sync] ignored ${e} default mock moments`)):i?a.moments=ie(a.moments).map(A):a.moments=[]}Array.isArray(t.rpRooms)&&(a.rpRooms=wn(a.rpRooms||[],t.rpRooms||[],"room_id")),t.rpMessages&&typeof t.rpMessages=="object"&&(a.rpMessages=Ia(a.rpMessages,t.rpMessages)),Array.isArray(t.actions)&&(a.actions=t.actions),t.globalSettings&&typeof t.globalSettings=="object"&&(a.globalSettings={...a.globalSettings,...t.globalSettings}),t.accountProfile&&typeof t.accountProfile=="object"&&(a.accountProfile=Sn(a.accountProfile,t.accountProfile)),E(),re()}}function Mn(){try{const t=localStorage.getItem(te);if(!t)return;const e=JSON.parse(t);if(!e?.payload)return;qa(e.payload,{source:"local"});const o=Ve(e.payload);ae=L(o),L(e.payload)!==ae&&localStorage.setItem(te,JSON.stringify({client_updated_at:e.client_updated_at||new Date().toISOString(),payload:o}))}catch{}}function vt(t=600){if(Vt)return;const e=Bt();Ct({...e,pending:!0}),Ee&&clearTimeout(Ee),Ee=window.setTimeout(()=>{La()},t)}async function La(){if(ee||Vt)return;const t=Bt();if(!t.pending)return;let e=null;try{e=JSON.parse(localStorage.getItem(te)||"null")}catch{}if(!e?.payload){Ct({...t,pending:!1});return}const o=Ve(e.payload);ee=!0;try{const n=await fetch(`${v}/api/sync/push`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({device_id:Oe(),client_updated_at:e.client_updated_at||new Date().toISOString(),payload:o})});if(!n.ok)throw new Error(`HTTP ${n.status}`);const i=await n.json().catch(()=>({}));Ct({last_server_updated_at:i.server_updated_at||t.last_server_updated_at||"",pending:!1})}catch(n){console.warn("[sync] push failed",n),Ct({...t,pending:!0})}finally{ee=!1}}async function Da(){if(ee)return;const t=Bt();if(t.pending&&(await La(),Bt().pending))return;const e=new URLSearchParams({device_id:Oe()});t.last_server_updated_at&&e.set("since",t.last_server_updated_at);try{const o=await fetch(`${v}/api/sync/pull?${e.toString()}`);if(!o.ok)return;const n=await o.json().catch(()=>({})),i=Ta(a.contacts);if(!n?.has_update||!n?.payload||n?.is_self&&i){n?.server_updated_at&&Ct({...t,last_server_updated_at:n.server_updated_at,pending:t.pending});return}Vt=!0,qa(n.payload,{source:"remote"}),st(),Ct({last_server_updated_at:n.server_updated_at||t.last_server_updated_at||"",pending:!1}),c()}catch(o){console.warn("[sync] pull failed",o)}finally{Vt=!1}}function xn(t={}){const e=Rt(t.agent_id||t.id);if(!e)return null;const o=String(t.display_name||t.name||e).trim()||e;return H({id:e,agent_id:e,name:o,display_name:o,bio:String(t.description||t.subtitle||"").trim(),status:"在线",handle:String(t.display_handle||`@${e}`),roleTag:String(t.source||"agent"),avatar:String(t.avatar||"").trim(),pinned:!1,unread:0,lastMessage:"",lastTime:"",topics:[],messages:[]})}function Oa(t={}){const e=Rt(t.agent_id||t.id);if(!e)return null;const o=Qt.find(r=>String(r.id||"").toLowerCase()===e),n=String(t.last_message_at||""),i=String(t.last_message||"").trim();return H({id:e,agent_id:e,name:String(o?.name||t.display_name||t.name||e).trim()||e,display_name:String(o?.name||t.display_name||t.name||e).trim()||e,bio:"",status:"在线",handle:`@${e}`,roleTag:"recovered",avatar:"",pinned:!1,unread:0,lastMessage:i,lastTime:n?W(n,{fallback:""}):"",sessionId:String(t.session_id||""),messageCount:Number(t.message_count||0)||0,topics:[],messages:[]})}async function Cn({silent:t=!0}={}){try{const e=await fetch(`${v}/api/agents?include_inactive=true`);if(!e.ok)throw new Error(`HTTP ${e.status}`);const o=await e.json().catch(()=>({})),n=(Array.isArray(o?.agents)?o.agents:[]).filter(r=>r?.is_active!==!1).map(xn).filter(Boolean).filter(r=>!Re(r));if(console.info("[agents] loaded",n.map(r=>({id:r.id,name:r.name,source:r.roleTag||""}))),!n.length)return;const i=L({contacts:a.contacts});a.contacts=ne(a.contacts,n),oe(),(!a.currentContactId||!a.contacts.some(r=>r.id===a.currentContactId))&&(a.currentContactId=a.contacts[0]?.id||""),L({contacts:a.contacts})!==i&&(st(),vt(100)),c()}catch(e){t||console.warn("[agents] load contacts failed",e)}}async function An({silent:t=!0}={}){try{const e=await fetch(`${v}/api/murmur/message-agents?limit=1000`);if(e.status===404){await Tn({silent:t});return}if(!e.ok)throw new Error(`HTTP ${e.status}`);const o=await e.json().catch(()=>({})),n=(Array.isArray(o?.agents)?o.agents:[]).map(Oa).filter(Boolean);if(console.info("[murmur] message agents loaded",n.map(r=>({id:r.id,lastMessage:r.lastMessage,count:r.messageCount||0}))),!n.length)return;const i=L({contacts:a.contacts});a.contacts=ne(a.contacts,n),oe(),(!a.currentContactId||!a.contacts.some(r=>r.id===a.currentContactId))&&(a.currentContactId=a.contacts[0]?.id||""),L({contacts:a.contacts})!==i&&(st(),vt(100)),c()}catch(e){t||console.warn("[murmur] load message agents failed",e)}}async function Tn({silent:t=!0}={}){const e=Array.from(new Set([...Qt.map(r=>Rt(r.id)).filter(Boolean),...a.contacts.map(r=>Rt(r.id)).filter(Boolean)])),o=[];for(const r of e)if(r)try{const s=new URLSearchParams({agent_id:r,limit:"1"}),l=await fetch(`${v}/api/murmur/messages?${s.toString()}`);if(!l.ok)continue;const d=await l.json().catch(()=>({})),p=Array.isArray(d?.messages)?d.messages:[];if(!p.length)continue;const f=p[p.length-1]||{};o.push(Oa({agent_id:r,last_message:f.content||"",last_message_at:f.created_at||"",message_count:p.length,session_id:f.session_id||""}))}catch(s){t||console.warn("[murmur] message probe failed",r,s)}const n=o.filter(Boolean);if(console.info("[murmur] message agents probed",n.map(r=>({id:r.id,lastMessage:r.lastMessage,count:r.messageCount||0}))),!n.length)return;const i=L({contacts:a.contacts});a.contacts=ne(a.contacts,n),oe(),(!a.currentContactId||!a.contacts.some(r=>r.id===a.currentContactId))&&(a.currentContactId=a.contacts[0]?.id||""),L({contacts:a.contacts})!==i&&(st(),vt(100)),c()}async function Pn(){await Cn(),await An()}function w(t=800){Vt||(qe&&clearTimeout(qe),qe=window.setTimeout(()=>{st()&&vt(500)},t))}function D(){const t=new Date;return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function Be(t){const e=t?.settings?.modelProviderId||_("chat")?.providerId||"",o=Q(e);if(!o?.baseUrl||!o?.apiKey)return{};const n=Ht(o.apiPath||o.api_path||"",{allowEmpty:!0});return{base_url:o.baseUrl,api_key:o.apiKey,...n?{api_path:n}:{}}}function Ne(t){const e=t?.settings||{},o=Number(e.temperature);return Number.isFinite(o)?{temperature:o}:{}}function He(t,e=""){let o="",n="";try{const s=JSON.parse(t),l=/^(thinking|reasoning|reason|thought|cot|inner_thought)$/i.test(e),d=/^(chat|message|content|text|assistant|reply|response|output)$/i.test(e);l||(o=s.content??s.text??s.delta??""),n=s.thinking??s.reasoning??s.reasoning_content??s.reasoningContent??""}catch{/^(thinking|reasoning|reason|thought|cot|inner_thought)$/i.test(e)?n=t:o=t}const i=/^tool_call$/i.test(e);let r=null;if(i)try{const s=JSON.parse(t);s.name&&(r={name:String(s.name),status:String(s.status||"done")})}catch{}return{text:Dt(o),thinking:Dt(n),toolCall:r}}async function je(t){const e=String(t?.sessionId||"").trim();if(e){try{const r=await fetch(`${v}/api/sessions/${encodeURIComponent(e)}`);if(r.ok)return e;if(r.status!==404)throw new Error(`校验会话失败（HTTP ${r.status}）`)}catch(r){throw String(r?.message||"").includes("HTTP"),r}t.sessionId=""}const o=await fetch(`${v}/api/sessions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:String(t?.name||"新对话").trim()||"新对话",model:String(t?.settings?.model||a.globalSettings?.defaultModel||"echo").trim()||"echo",source_app:"yui_nook"})}),n=await o.json().catch(()=>({}));if(!o.ok)throw new Error(n.detail||`创建会话失败（HTTP ${o.status}）`);const i=String(n?.session?.id||"").trim();if(!i)throw new Error("创建会话失败：后端没有返回 session.id");return t.sessionId=i,w(120),i}async function ze(t,e,o,n="/api/chat"){let i=await fetch(`${v}${n}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify(e),...o?{signal:o}:{}});if(i.ok)return i;let r="";try{const s=await i.json();r=String(s?.detail||"").trim()}catch{}if(n==="/api/chat"&&i.status===404&&r.includes("会话不存在")){t.sessionId="";const s=await je(t);if(e.session_id=s,i=await fetch(`${v}${n}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify(e),...o?{signal:o}:{}}),i.ok)return i}throw new Error(`HTTP ${i.status}`)}async function En(){const t=y()?.querySelector(".chat-input"),e=t?.value?.trim();if(!e||!a.currentRpRoomId)return;const o=h(a.currentContactId)||a.contacts[0],n=Me();if(!o||!n)return;const i=!!o?.settings?.reasoning_visibility,r="rp_u"+Date.now();a.currentRpMessages.push({id:r,role:"user",text:e,content:e,time:D(),timestamp:new Date().toISOString(),created_at:new Date().toISOString()}),t.value="";const s="rp_ai_"+Date.now();a.currentRpMessages.push({id:s,role:"ai",text:"",content:"",time:"",created_at:new Date().toISOString(),typing:!0}),a.currentRpRoomId&&(a.rpMessages[a.currentRpRoomId]=a.currentRpMessages.map(tt)),w(120),c(),U();const l={room_id:a.currentRpRoomId,agent_id:n.agent_id||o.id,content:e,...o.persona?{persona:o.persona}:{},...o.settings.model?{model:o.settings.model}:{},...Ne(o),...Be(o)},d=new AbortController;a.streamingAbortController=d,c();try{const p=await ze(o,l,d.signal,"/api/rp/chat"),f=()=>a.currentRpMessages.findIndex(T=>T.id===s);a.currentRpMessages[f()]={id:s,role:"ai",text:"",time:D(),typing:!1,streaming:!0},c();const b=p.body.getReader(),I=new TextDecoder;let S="",C="",M="",q="";for(;;){const{done:T,value:x}=await b.read();if(T)break;S+=I.decode(x,{stream:!0});const O=S.split(`
`);S=O.pop()??"";for(const ot of O){const K=ot.trim();if(!K){q="";continue}if(K.startsWith("event:")){q=K.slice(6).trim();continue}if(!K.startsWith("data:"))continue;const ct=K.slice(5).trim();if(ct==="[DONE]")continue;const z=He(ct,q);let X=z.text;const nt=ve(z.thinking,C,M),ut=i?nt:"";ut&&M.length<he&&(M+=ut),X&&(C+=X);const lt=f();lt!==-1&&(a.currentRpMessages[lt]={id:s,role:"ai",text:C,...i&&M?{thinking:M}:{},time:D(),typing:!1,streaming:!0},c(),U())}}const k=a.currentRpMessages.findIndex(T=>T.id===s);k!==-1&&(a.currentRpMessages[k]={...a.currentRpMessages[k],text:C||"…",content:C||"…",...i&&M?{thinking:M}:{},streaming:!1,typing:!1,time:D(),created_at:new Date().toISOString()}),a.streamingAbortController=null,await Jt(n.agent_id||o.id,{silent:!0}),a.currentRpRoomId&&(a.rpMessages[a.currentRpRoomId]=a.currentRpMessages.map(tt)),w(120),c(),U()}catch(p){const f=a.currentRpMessages.findIndex(b=>b.id===s);f!==-1&&(a.currentRpMessages[f]={id:s,role:"ai",text:p.name==="AbortError"?"…":"杩炴帴澶辫触锛?{err.message}",content:p.name==="AbortError"?"…":"杩炴帴澶辫触锛?{err.message}",time:D(),created_at:new Date().toISOString(),typing:!1}),a.streamingAbortController=null,a.currentRpRoomId&&(a.rpMessages[a.currentRpRoomId]=a.currentRpMessages.map(tt)),w(120),c()}}async function Fe(){const t=y()?.querySelector(".chat-input"),e=t?.value?.trim();if(!e)return;const o=h(a.currentContactId);if(!o)return;Ot();const n="u"+Date.now();o.messages.push({id:n,role:"user",text:e,content:e,time:D(),created_at:new Date().toISOString()}),o.lastMessage=e,o.lastTime="刚刚",t.value="";const i="ai_"+Date.now();o.messages.push({id:i,role:"ai",text:"",content:"",time:"",created_at:new Date().toISOString(),typing:!0,source:"codex"}),et(),w(120),c(),U();const r=new AbortController;a.streamingAbortController=r,c();try{const s=await fetch(`${v}/api/codex/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversation_key:`yui:${o.id}`,content:e,reset:!1}),signal:r.signal}),l=await s.json().catch(()=>({}));if(!s.ok)throw new Error(l.detail||`HTTP ${s.status}`);const d=String(l.reply||"").trim()||"…",p=o.messages.findIndex(f=>f.id===i);p!==-1&&(o.messages[p]={id:i,role:"ai",text:d,content:d,source:"codex",provider:"codex",time:D(),created_at:new Date().toISOString(),typing:!1}),o.lastMessage=d,o.lastTime=D(),et(),w(120),c(),U()}catch(s){const l=s.name==="AbortError";l||console.error("[codex chat] error:",s);const d=o.messages.findIndex(p=>p.id===i);if(d!==-1){const p=l?"…":`Codex 连接失败：${s.message}`;o.messages[d]={id:i,role:"ai",text:p,content:p,source:"codex",provider:"codex",time:D(),created_at:new Date().toISOString(),typing:!1}}et(),w(120),c()}finally{a.streamingAbortController=null,c()}}async function Ue(){const t=y()?.querySelector(".chat-input"),e=t?.value?.trim();if(!e)return;const o=h(a.currentContactId);if(!o)return;Ot();const n=!!o?.settings?.reasoning_visibility;let i="";try{i=await je(o)}catch(x){console.error("[session] create failed:",x),a.toast="鏃犳硶鍒涘缓浼氳瘽锛?{err.message}",c(),window.setTimeout(()=>{a.toast="",c()},1500);return}const r="u"+Date.now();o.messages.push({id:r,role:"user",text:e,content:e,time:D(),created_at:new Date().toISOString()}),o.lastMessage=e,o.lastTime="刚刚",t.value="",et(),w(120),c(),U();const s="ai_"+Date.now();o.messages.push({id:s,role:"ai",text:"",content:"",time:"",created_at:new Date().toISOString(),typing:!0}),et(),w(120),c(),U();let l=0,d=!1,p=null;const f=()=>{const x=y()?.querySelector(`#thinking-${s}`);if(!x)return;x.textContent=ye(k),x.classList.add("open","thinking-active"),x.setAttribute("aria-hidden","false");const O=y()?.querySelector(`#cot-wrapper-${s}`);O&&O.removeAttribute("data-slow"),a.openThinkingIds[s]=!0},b=()=>{p===null&&(p=requestAnimationFrame(()=>{p=null,f()}))},I=()=>{p!==null&&(cancelAnimationFrame(p),p=null)},S=setInterval(()=>{if(!l)return;const x=y()?.querySelector(`#cot-wrapper-${s}`);x&&x.toggleAttribute("data-slow",Date.now()-l>8e3)},2e3),C={session_id:i,agent_id:o.id,content:e,...o.persona?{persona:o.persona}:{},...o.settings.model?{model:o.settings.model}:{},...Ne(o),...Be(o)},M=new AbortController;a.streamingAbortController=M,c();let q="",k="",T=null;try{const x=await ze(o,C,M.signal),O=()=>o.messages.findIndex(dt=>dt.id===s);o.messages[O()]={id:s,role:"ai",text:"",content:"",time:D(),created_at:new Date().toISOString(),typing:!1,streaming:!0},c();const ot=x.body.getReader(),K=new TextDecoder;let ct="",z="";for(;;){const{done:dt,value:de}=await ot.read();if(dt)break;ct+=K.decode(de,{stream:!0});const Et=ct.split(`
`);ct=Et.pop()??"";let Ut=0;for(const St of Et){const pt=St.trim();if(!pt){z="";continue}if(pt.startsWith("event:")){z=pt.slice(6).trim();continue}if(!pt.startsWith("data:"))continue;const kt=pt.slice(5).trim();if(kt==="[DONE]")continue;const It=He(kt,z);let pe=It.text;const me=ve(It.thinking,q,k),G=n?me:"";if(G){k.length<he&&(k+=G),l=Date.now();const Y=O();Y!==-1&&(o.messages[Y]={id:s,role:"ai",text:q,thinking:k,time:D(),typing:!1,streaming:!0},d?b():(d=!0,a.openThinkingIds[s]=!0,c(),U()))}if(It.toolCall){const Y=It.toolCall;T||(T=[]);const qt=T.find(Wa=>Wa.name===Y.name&&Wa.status!=="done");qt?qt.status=Y.status:T.push({name:Y.name,status:Y.status});const mt=O();mt!==-1&&(o.messages[mt]={...o.messages[mt],toolCalls:T.slice(),streaming:!0},c())}pe&&(q+=pe),Ut+=1,Ut>=32&&(Ut=0,b(),await oa())}}clearInterval(S),I(),a.streamingAbortController=null;const X=O(),nt=q||(n&&k?"":"…");o.lastMessage=nt||"已处理",o.lastTime=D();const ut=y()?.querySelector(`#thinking-${s}`);ut&&ut.classList.remove("thinking-active");const lt=y()?.querySelector(`#cot-wrapper-${s}`);lt&&lt.removeAttribute("data-slow"),n&&k&&delete a.openThinkingIds[s];const B=ia(nt);X!==-1&&B.length>1?(o.messages.splice(X,1),c(),U(),await na(180),await ra(o,B,{startIndex:X,thinking:n?k:"",toolCalls:T})):(X!==-1&&(o.messages[X]={id:s,role:"ai",text:nt,content:nt,...n&&k?{thinking:k}:{},...T?{toolCalls:T}:{},time:D(),created_at:new Date().toISOString(),typing:!1}),et(),w(120),c(),U())}catch(x){clearInterval(S),I(),a.streamingAbortController=null;const O=x.name==="AbortError";O||console.error("[chat SSE] error:",x);const ot=o.messages.findIndex(K=>K.id===s);ot!==-1&&(o.messages[ot]={id:s,role:"ai",text:O?q||"…":`连接失败：${x.message}，请稍后再试。`,content:O?q||"…":`连接失败：${x.message}，请稍后再试。`,...n&&k?{thinking:k}:{},time:D(),created_at:new Date().toISOString(),typing:!1}),O&&q&&(o.lastMessage=q,o.lastTime=D()),et(),w(120),c()}}async function qn(t){const e=h(a.currentContactId);if(!e)return;Ot();const o=!!e?.settings?.reasoning_visibility,n=e.messages.findIndex(d=>d.id===t);if(n===-1||e.messages[n].role!=="ai")return;let i="";try{i=await je(e)}catch(d){console.error("[session] create failed:",d),a.toast=`无法创建会话：${d.message}`,c(),window.setTimeout(()=>{a.toast="",c()},1500);return}e.messages[n]={...e.messages[n],typing:!0,text:"",streaming:!1},c();const r=[...e.messages].reverse().find(d=>d.role==="user");if(!r)return;const s={session_id:i,agent_id:e.id,content:r.text,...e.persona?{persona:e.persona}:{},...e.settings.model?{model:e.settings.model}:{},...Ne(e),...Be(e)},l=new AbortController;a.streamingAbortController=l;try{const d=await ze(e,s,l.signal);e.messages[n]={...e.messages[n],typing:!1,text:"",streaming:!0},c();const p=d.body.getReader(),f=new TextDecoder;let b="",I="",S="",C=null;const M=t;let q="",k=0,T=!1,x=null;const O=()=>{const B=y()?.querySelector(`#thinking-${M}`);if(!B)return;B.textContent=ye(S),B.classList.add("open","thinking-active"),B.setAttribute("aria-hidden","false");const dt=y()?.querySelector(`#cot-wrapper-${M}`);dt&&dt.removeAttribute("data-slow"),a.openThinkingIds[M]=!0},ot=()=>{x===null&&(x=requestAnimationFrame(()=>{x=null,O()}))},K=()=>{x!==null&&(cancelAnimationFrame(x),x=null)},ct=setInterval(()=>{if(!k)return;const B=y()?.querySelector(`#cot-wrapper-${M}`);B&&B.toggleAttribute("data-slow",Date.now()-k>8e3)},2e3);for(;;){const{done:B,value:dt}=await p.read();if(B)break;b+=f.decode(dt,{stream:!0});const de=b.split(`
`);b=de.pop()??"";let Et=0;for(const Ut of de){const St=Ut.trim();if(!St){q="";continue}if(St.startsWith("event:")){q=St.slice(6).trim();continue}if(!St.startsWith("data:"))continue;const pt=St.slice(5).trim();if(pt==="[DONE]")continue;const kt=He(pt,q);let It=kt.text;const pe=ve(kt.thinking,I,S),me=o?pe:"";if(me){S.length<he&&(S+=me),k=Date.now();const G=e.messages.findIndex(Y=>Y.id===M);G!==-1&&(e.messages[G]={...e.messages[G],thinking:S,streaming:!0},T?ot():(T=!0,a.openThinkingIds[M]=!0,c()))}if(kt.toolCall){const G=kt.toolCall;C||(C=[]);const Y=C.find(mt=>mt.name===G.name&&mt.status!=="done");Y?Y.status=G.status:C.push({name:G.name,status:G.status});const qt=e.messages.findIndex(mt=>mt.id===M);qt!==-1&&(e.messages[qt]={...e.messages[qt],toolCalls:C.slice(),streaming:!0},c())}It&&(I+=It),Et+=1,Et>=32&&(Et=0,ot(),await oa())}}clearInterval(ct),K(),a.streamingAbortController=null;const z=e.messages.findIndex(B=>B.id===M),X=I||"…",nt=y()?.querySelector(`#thinking-${M}`);nt&&nt.classList.remove("thinking-active");const ut=y()?.querySelector(`#cot-wrapper-${M}`);ut&&ut.removeAttribute("data-slow"),o&&S&&delete a.openThinkingIds[M];const lt=ia(X);z!==-1&&lt.length>1?(e.messages.splice(z,1),c(),await na(180),await ra(e,lt,{startIndex:z,thinking:o?S:"",toolCalls:C})):(z!==-1&&(e.messages[z]={...e.messages[z],text:X,...o&&S?{thinking:S}:{},...C?{toolCalls:C}:{},streaming:!1}),c())}catch(d){clearInterval(_rerollSlowTimer),_cancelRerollFlush(),a.streamingAbortController=null;const p=d.name==="AbortError";p||console.error("[reroll SSE] error:",d);const f=e.messages.findIndex(b=>b.id===rerollId);f!==-1&&(e.messages[f]={...e.messages[f],text:p?fullText||"…":`重试失败：${d.message}`,...fullThinking?{thinking:fullThinking}:{},...fullToolCalls?{toolCalls:fullToolCalls}:{},streaming:!1}),c()}}function U(){requestAnimationFrame(()=>{const t=y()?.querySelector(".messages-panel");t&&(t.scrollTop=t.scrollHeight)})}function Ln(){return`
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
    `}const Ra=window.openPage;typeof Ra=="function"&&(window.openPage=function(e,o){Ra(e,o),e==="page-chat"&&pa()});const Dn=[{id:"openai",name:"OpenAI",enabled:!0,baseUrl:"https://api.openai.com/v1",apiPath:"",apiKey:"",models:["gpt-5.4","gpt-5.4-mini","gpt-4.1-mini"],defaultModel:"gpt-5.4"},{id:"openrouter",name:"OpenRouter",enabled:!0,baseUrl:"https://openrouter.ai/api/v1",apiPath:"",apiKey:"",models:["openai/gpt-5","anthropic/claude-3.7-sonnet"],defaultModel:"openai/gpt-5"},{id:"gemini",name:"Gemini",enabled:!0,baseUrl:"https://generativelanguage.googleapis.com/v1beta/openai",apiPath:"",apiKey:"",models:["gemini-2.5-pro","gemini-2.5-flash"],defaultModel:"gemini-2.5-pro"},{id:"deepseek",name:"DeepSeek",enabled:!1,baseUrl:"https://api.deepseek.com/v1",apiPath:"",apiKey:"",models:["deepseek-chat","deepseek-reasoner"],defaultModel:"deepseek-chat"},{id:"qwen",name:"阿里云千问",enabled:!1,baseUrl:"https://dashscope.aliyuncs.com/compatible-mode/v1",apiPath:"",apiKey:"",models:["qwen-max","qwen-plus","qwen-turbo"],defaultModel:"qwen-max"},{id:"zhipu",name:"智谱",enabled:!1,baseUrl:"https://open.bigmodel.cn/api/paas/v4",apiPath:"",apiKey:"",models:["glm-4.5","glm-4-air"],defaultModel:"glm-4.5"}],Qe=new Set(["aiInterface","defaultModels","modelSlot","providerCatalog","providerEditor","promptEditor","themeSettings","accountSettings","memoryService","backendSync","exportSettings","mcpLibrary"]),On=Xt,Rn=ke,Vn=Ie,Va=Pe;a.viewStack=a.viewStack||[],a.activeModelSlot=a.activeModelSlot||"chat",a.activeModelSlotContext=a.activeModelSlotContext||"global",a.activeModelProviderId=a.activeModelProviderId||"",a.providerDraftId=a.providerDraftId||null,a.providerAdvancedOpen=!!a.providerAdvancedOpen,a.providerEditorDraft=a.providerEditorDraft||null,a.providerModelMenuOpen=!!a.providerModelMenuOpen,a.modelSlotMenuOpen=!!a.modelSlotMenuOpen,a.providerSearch=a.providerSearch||"",a.activePromptSlot=a.activePromptSlot||"summary";function V(t){const e=String(t||"").trim();return e?e==="ocr"?"vision":e==="title"?"summary":e:"chat"}a.aiSettingsSaving=!1,a.memoryServiceEntries=Array.isArray(a.memoryServiceEntries)?a.memoryServiceEntries:[],a.memoryServiceLoading=!!a.memoryServiceLoading,a.slotVendorGroupOpen=a.slotVendorGroupOpen&&typeof a.slotVendorGroupOpen=="object"?a.slotVendorGroupOpen:{},a.providerModelVendorOpen=a.providerModelVendorOpen&&typeof a.providerModelVendorOpen=="object"?a.providerModelVendorOpen:{};function Bn(){return"/chat/completions"}function Ht(t,{allowEmpty:e=!1}={}){const o=String(t||"").trim();return o?o.startsWith("/")?o:`/${o}`:e?"":Bn()}function Nn(t={}){return Ht(t.apiPath||t.api_path||"",{allowEmpty:!1})}function Ye(t={}){const e=Ht(t.apiPath||t.api_path||"",{allowEmpty:!0});return{...t,baseUrl:t.baseUrl||t.base_url||"",apiKey:t.apiKey||t.api_key||"",apiPath:e,api_path:e,models:Array.isArray(t.models)?t.models:[]}}function jt(){return{providers:Dn.map(t=>Ye({...t,models:[...t.models]})),defaultModels:{chat:{providerId:"openai",model:"gpt-5.4",useChatModel:!1},summary:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},vision:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},translate:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},consciousness:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},voice:{provider:"",service_url:"",base_url:"",voice_id:"",speaker:"",emotion:"",speed:1,format:""}},defaultPrompts:{chat:"Respond naturally, stay consistent with the current role and context, and keep the tone warm and clear.",summary:"Write a concise conversation summary with key facts, action items, and follow-ups.",translate:"Translate the content accurately while preserving tone and formatting when possible.",vision:"Extract visible text from the image and explain key visual information clearly.",consciousness:"Review recent context, infer useful next-step thoughts, and keep the result concise and actionable."},mcpLibrary:to()}}function E(){if(!a.globalSettings.aiSettings)a.globalSettings.aiSettings=jt();else{const t=a.globalSettings.aiSettings;t.defaultModels=t.defaultModels||{},t.defaultPrompts=t.defaultPrompts||{},t.defaultModels.ocr&&!t.defaultModels.vision&&(t.defaultModels.vision={...t.defaultModels.ocr}),t.defaultPrompts.ocr&&!t.defaultPrompts.vision&&(t.defaultPrompts.vision=t.defaultPrompts.ocr),delete t.defaultModels.ocr,delete t.defaultPrompts.ocr,delete t.defaultModels.title,delete t.defaultPrompts.title,Object.entries(jt().defaultModels).forEach(([e,o])=>{t.defaultModels[e]||(t.defaultModels[e]={...o})}),Object.entries(jt().defaultPrompts).forEach(([e,o])=>{typeof t.defaultPrompts[e]!="string"&&(t.defaultPrompts[e]=o)})}return a.globalSettings.aiSettings}function Hn(t={}){const e=jt(),o={...t||{}};o.defaultModels?.ocr&&!o.defaultModels?.vision&&(o.defaultModels={...o.defaultModels,vision:o.defaultModels.ocr}),o.defaultPrompts?.ocr&&!o.defaultPrompts?.vision&&(o.defaultPrompts={...o.defaultPrompts,vision:o.defaultPrompts.ocr});const n={providers:e.providers,defaultModels:{...e.defaultModels},defaultPrompts:{...e.defaultPrompts},mcpLibrary:{...e.mcpLibrary,tools:[...e.mcpLibrary?.tools||[]]}};if(Array.isArray(o.providers)&&o.providers.length){const i=new Map(e.providers.map(r=>[r.id,r]));o.providers.forEach(r=>{const s=Ye(r);i.set(s.id,{...i.get(s.id),...s,models:Array.isArray(s.models)&&s.models.length?s.models:i.get(s.id)?.models||[]})}),n.providers=[...i.values()]}o.defaultModels&&Object.keys(n.defaultModels).forEach(i=>{o.defaultModels[i]&&(n.defaultModels[i]={...n.defaultModels[i],...o.defaultModels[i]})}),o.defaultPrompts&&Object.keys(n.defaultPrompts).forEach(i=>{typeof o.defaultPrompts[i]=="string"&&(n.defaultPrompts[i]=o.defaultPrompts[i])}),o.mcpLibrary&&Array.isArray(o.mcpLibrary.tools)&&(n.mcpLibrary={...n.mcpLibrary,...o.mcpLibrary,tools:o.mcpLibrary.tools.map(it)}),a.globalSettings.aiSettings=n,typeof o.consciousnessLoop=="boolean"&&(a.globalSettings.consciousnessLoop=o.consciousnessLoop),re()}function re(){const t=E(),e=t.defaultModels.chat,o=t.providers.find(n=>n.id===e.providerId);a.globalSettings.defaultModel=e.model,a.globalSettings.provider=o?.name||"OpenAI"}function Q(t){return E().providers.find(e=>e.id===t)}function Ke(t=a.providerDraftId){const e=Ye(Q(t)||{id:t||`custom_${Date.now()}`,name:"",enabled:!0,baseUrl:"",apiPath:"",apiKey:"",models:[],defaultModel:""}),o=Array.isArray(e.models)?[...e.models]:[],n=o.map(Xe);return{...e,models:o,_allModels:n,_selectedModelIds:new Set(o)}}function R(){return(!a.providerEditorDraft||a.providerEditorDraft.id!==a.providerDraftId)&&(a.providerEditorDraft=Ke()),a.providerEditorDraft}function se(t="",e=[]){const o=String(t||"").trim().toLowerCase();return o?e.filter(n=>String(n||"").toLowerCase().includes(o)):[...e]}function Ba(t){const e=String(t||"").toLowerCase();return/deepseek/.test(e)?"DeepSeek":/\bglm\b|chatglm/.test(e)?"GLM":/\bqwen\b|qwq/.test(e)?"Qwen":/\bgpt[-\d]|^gpt|^o[134][-\d]|text-davinci|text-curie/.test(e)?"OpenAI":/claude/.test(e)?"Anthropic":/gemini|gemma/.test(e)?"Google":/\bllama\b|meta-llama/.test(e)?"Meta":/mistral|mixtral|codestral/.test(e)?"Mistral":/\byi[-/_]/.test(e)?"闆朵竴涓囩墿":/moonshot|kimi/.test(e)?"Moonshot":/hunyuan/.test(e)?"娣峰厓":/ernie|wenxin/.test(e)?"鏂囧績":/doubao/.test(e)?"璞嗗寘":/baichuan/.test(e)?"鐧惧窛":/spark/.test(e)?"鏄熺伀":/internlm/.test(e)?"InternLM":"Other"}function Na(t){const e=String(t||"").toLowerCase(),o=["chat","text"];return/vl\b|vision|visual|\bvision\b|-v\d|\bimg\b/.test(e)&&o.push("vision"),/reason|r1\b|think\b|cot\b/.test(e)&&o.push("reasoning"),/image|draw|flux|paint|artist|diffusion/.test(e)&&o.push("image"),o.push("tools"),o}function Xe(t){const e=String(t||"").trim();return{id:e,name:e,vendor:Ba(e),capabilities:Na(e)}}const jn={chat:"瀵硅瘽",text:"鏂囨湰",reasoning:"鎺ㄧ悊",tools:"宸ュ叿璋冪敤",vision:"瑙嗚",image:"鐢熷浘"},zn=["reasoning","tools","vision","image"],Fn={reasoning:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M5 .5A3 3 0 0 0 2.8 5.9l.2.3V8h4V6.2l.2-.3A3 3 0 0 0 5 .5zm-1.2 8h2.4v.5c0 .28-.22.5-.5.5H4.3a.5.5 0 0 1-.5-.5V8.5z"/></svg>',tools:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M7.5 1a2 2 0 0 0-1.86 2.73L1.2 8.16a.6.6 0 0 0 .84.84l4.43-4.44A2 2 0 1 0 7.5 1zm0 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>',vision:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5 2C2.5 2 .8 5 .8 5S2.5 8 5 8s4.2-3 4.2-3S7.5 2 5 2zm0 4.5A1.5 1.5 0 1 1 5 3.5a1.5 1.5 0 0 1 0 3z"/></svg>',image:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M1.5 1A.5.5 0 0 0 1 1.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-7A.5.5 0 0 0 8.5 1h-7zM2 8l2-2.5 1.3 1.7 1.7-2.2L9 8H2zm.8-4.3a.7.7 0 1 0 1.4 0 .7.7 0 0 0-1.4 0z"/></svg>'};function Un(t){return(Array.isArray(t?.capabilities)?t.capabilities:Na(t?.name||"")).filter(o=>zn.includes(o)).map(o=>`<span class="model-cap-badge cap-${o}" title="${jn[o]||o}">${Fn[o]||o}</span>`).join("")}function Ha(t="",e=[]){const o=String(t||"").trim();return!Array.isArray(e)||!e.length?"还没有已同步模型，仍可手动输入并保存。":o?e.some(i=>String(i).toLowerCase()===o.toLowerCase())?"已匹配到已同步列表中的模型。":"当前模型不在已同步列表中，可继续手动保存。":`已同步 ${e.length} 个模型，可搜索或展开列表选择。`}function Ge(t="",e=[]){const o=String(t||"").trim();return!Array.isArray(e)||!e.length?"当前供应商还没有同步模型，可切换供应商或先同步。":o?e.some(i=>String(i).toLowerCase()===o.toLowerCase())?"已匹配到当前供应商模型。":"当前输入不在同步列表中。":`已同步 ${e.length} 个模型，可搜索或展开列表选择。`}function yt(){const t=R(),e=document.getElementById("provider-default-model-input"),o=document.getElementById("provider-default-model-menu"),n=document.getElementById("provider-default-model-hint");if(!o||!n)return;const i=e?.value||t.defaultModel||"",r=Array.isArray(t.models)?t.models:[],s=se(i,r);if(n.textContent=Ha(i,r),!a.providerModelMenuOpen){o.innerHTML="",o.classList.remove("open");return}o.classList.add("open"),o.innerHTML=s.length?s.map(l=>`
          <button class="provider-model-option ${String(l).toLowerCase()===String(i).trim().toLowerCase()?"active":""}" data-action="pick-provider-default-model" data-model="${u(l)}" type="button">
            ${u(l)}
          </button>
        `).join(""):'<div class="provider-model-empty">娌℃湁鍖归厤鍒板凡鍚屾妯″瀷锛屽彲缁х画鎵嬪姩杈撳叆淇濆瓨銆?/div>'}function _(t){return E().defaultModels[V(t)]}function Qn(){const t=a.activeModelSlot,e=a.activeModelSlotContext==="contact",o=h(a.currentContactId)||a.contacts[0],n=e?{providerId:o?.settings?.modelProviderId||a.activeModelProviderId||_("chat")?.providerId||"openai",model:t==="consciousness"?o?.settings?.loopModel||"":o?.settings?.model||""}:ue(t),i=Q(n?.providerId)||Q(_("chat")?.providerId);return{slot:n,provider:i,models:i?.models||[]}}function ce(){const t=document.getElementById("model-slot-menu"),e=document.getElementById("model-slot-hint"),o=document.getElementById("model-slot-input");if(!t||!e)return;const{slot:n,models:i}=Qn(),r=o?.value||n?.model||"",s=se(r,i);if(e.textContent=Ge(r,i),!a.modelSlotMenuOpen){t.innerHTML="",t.classList.remove("open");return}t.classList.add("open"),t.innerHTML=s.length?s.map(l=>`
          <button class="provider-model-option ${String(n?.model||"").trim().toLowerCase()===String(l).toLowerCase()?"active":""}" data-action="pick-slot-model" data-slot="${a.activeModelSlot}" data-model="${u(l)}" type="button">
            ${u(l)}
          </button>
        `).join(""):'<div class="provider-model-empty">娌℃湁鍖归厤鍒板綋鍓嶄緵搴斿晢妯″瀷銆?/div>'}function ue(t){return _(V(t))}function Pt(t){const e=V(t);return{chat:"聊天模型",summary:"摘要模型",vision:"Vision 模型",translate:"翻译模型",consciousness:"意识循环模型",voice:"语音模型"}[e]||e}function le(t){const e=V(t);return{chat:"全局默认使用的聊天模型。",summary:"用于生成对话摘要，推荐选择便宜且稳定的模型。",vision:"用于识图、OCR 与截图分析的统一入口。",translate:"用于翻译消息内容，推荐选择速度快的模型。",consciousness:"用于意识循环、主动思考与相关后台能力。",voice:"用于文本转语音，读取语音服务地址与 voice ID。"}[e]||""}function ja(t){const e=V(t),o=ue(e);if(e==="voice"){if(!o)return"未设置";const i=o.provider||"语音服务",r=o.voice_id||o.voiceId||"未设置";return`${i} / ${r}`}const n=Q(o?.providerId);return o?`${n?.name||"未设置"} / ${o.model||"未设置"}`:"未设置"}function Yn(t){return E().defaultPrompts?.[V(t)]||""}function Kn(t){const e=V(t);return{chat:m("comment"),summary:m("file"),vision:m("search"),translate:m("chatArrow"),consciousness:m("history"),voice:m("mic")}[e]||m("file")}function Xn(t){const e=V(t);return e!=="chat"&&e!=="voice"}function Gn(t){return`
      <article class="default-model-card">
        <div class="default-model-head">
          <div class="default-model-icon">${Kn(t)}</div>
          <div class="default-model-copy">
            <strong>${u(Pt(t))}</strong>
            <p>${u(le(t))}</p>
          </div>
          ${Xn(t)?`<button class="model-gear-btn" data-action="open-prompt-editor" data-slot="${t}" aria-label="提示词设置">${m("settings")}</button>`:'<span class="header-spacer"></span>'}
        </div>
        <button class="model-value-pill" data-action="open-model-slot" data-slot="${t}">
          <span class="model-value-badge">使</span>
          <span>${u(ja(t))}</span>
        </button>
      </article>
    `}function Jn(){const t=V(a.activePromptSlot),e=Yn(t);return`
      <section class="settings-page page-block ai-settings-page ai-prompt-page">
        <div class="settings-group glass-frost ai-panel ai-form-group">
          <h3>${u(Pt(t))} 提示词</h3>
          <p class="section-eyebrow">用于定义这个能力位的默认提示词模板，后续接入对应后端任务时会直接使用这里的内容。</p>
          <textarea id="slot-prompt-input" class="ai-textarea ai-prompt-textarea" placeholder="在这里输入默认提示词">${u(e)}</textarea>
          <p class="section-eyebrow">变量位后续可以继续扩展，目前先支持按能力位单独保存。</p>
        </div>
        <div class="settings-group glass-frost ai-panel ai-prompt-actions">
          <button class="ghost-action prompt-reset-btn" data-action="reset-slot-prompt" data-slot="${t}">重置为默认</button>
          <button class="bottom-tab active prompt-save-btn" data-action="save-slot-prompt" data-slot="${t}">保存</button>
        </div>
      </section>
    `}function Wn(){const t=[{id:"奶油粉",key:"rose",desc:"柔和粉白"},{id:"云雾灰",key:"mist",desc:"冷淡浅灰"},{id:"奶油杏",key:"cream",desc:"暖调米白"}],e=a.globalSettings.theme;return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>主题模式</h3>
          <p class="section-eyebrow">选择首页和聊天页共用的浅色主题。</p>
          <div class="theme-choice-list">
            ${t.map(o=>`
              <button class="theme-choice-item ${e===o.id||e===o.key?"active":""}" data-action="pick-theme-mode" data-theme="${o.id}">
                <span class="theme-choice-copy">
                  <strong>${u(o.id)}</strong>
                  <em>${u(o.desc)}</em>
                </span>
                <span class="theme-choice-check">${e===o.id||e===o.key?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `}function Zn(){const t=a.accountProfile||{};return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>我的账号</h3>
          ${$("头像","更换头像","open-account-avatar")}
          ${$("昵称",t.nickname||"小酒","open-account-nickname")}
          ${$("个性签名",t.signature||"管理个人资料与基础偏好","open-account-signature")}
          <input id="account-avatar-file" class="moment-image-input" type="file" accept="image/*" />
        </div>
      </section>
    `}function ti(t){const e=Math.max(0,Math.min(100,Number(t)||0)),o=e>60?"#c9908a":e>30?"#c8a07a":"#b0b0b8";return`<span style="display:inline-flex;align-items:center;gap:4px;font-size:10px;color:${o};">
          <span style="display:inline-block;width:${Math.round(e*.36)}px;max-width:36px;min-width:2px;height:3px;border-radius:2px;background:${o};"></span>
          ${e>0?`热度 ${e}`:""}
        </span>`}function ei(){const t=h(a.currentContactId)||a.contacts[0],e=Array.isArray(a.memoryServiceEntries)?a.memoryServiceEntries:[],o=Array.isArray(a.memoryCandidates)?a.memoryCandidates:[],n=a.memoryServiceSort||"updated_at",i=[{key:"updated_at",label:"最新"},{key:"importance",label:"最重要"},{key:"temperature",label:"有温度"}];return`
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
          ${a.memoryServiceLoading?'<p class="section-eyebrow">正在加载…</p>':""}
          ${!a.memoryServiceLoading&&!e.length?'<p class="section-eyebrow">这个角色还没有记忆。</p>':""}
          ${e.map(r=>{const s=r.compressed_content||r.raw_content||r.content||"未命名记忆",l=r.importance??3,d=r.temperature??0,p="★".repeat(l)+"☆".repeat(5-l);return`
            <div class="theme-choice-item active" style="cursor:default; display:block;">
              <div class="theme-choice-copy" style="display:block;">
                <strong>${u(s)}</strong>
                <em style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:3px;">
                  <span>${u(r.category||"")}</span>
                  <span style="color:#c9908a;">${p}</span>
                  ${ti(d)}
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
    `}function Je(){return String(a.currentContactId||h(a.currentContactId)?.id||"default").trim()||"default"}async function wt(t=Je(),{silent:e=!0}={}){const o=String(t||"").trim();if(o){a.memoryServiceLoading=!0,c();try{const n=a.memoryServiceSort||"updated_at",i=new URLSearchParams({agent_id:o,sort_by:n,order:"desc",limit:"100"}),[r,s]=await Promise.all([fetch(`${v}/api/memories?${i.toString()}`),fetch(`${v}/api/consciousness/memory-candidates?agent_id=${encodeURIComponent(o)}&limit=20`)]);if(!r.ok)throw new Error(`HTTP ${r.status}`);const l=await r.json().catch(()=>({}));if(a.memoryServiceEntries=Array.isArray(l?.memories)?l.memories:[],s.ok){const d=await s.json().catch(()=>({}));a.memoryCandidates=Array.isArray(d?.candidates)?d.candidates:[]}}catch(n){console.warn("[memory service] load failed",n),e||(a.toast="记忆加载失败",window.setTimeout(()=>{a.toast="",c()},1200))}finally{a.memoryServiceLoading=!1,c()}}}async function ai(t){const e=Je();try{const o=await fetch(`${v}/api/consciousness/memory-candidates/${encodeURIComponent(t)}/promote?agent_id=${encodeURIComponent(e)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:"{}"});if(!o.ok)throw new Error(`HTTP ${o.status}`);a.memoryCandidates=(a.memoryCandidates||[]).filter(n=>String(n.id)!==String(t)),a.toast="✓ 已采纳为正式记忆",window.setTimeout(()=>{a.toast="",c()},1800),await wt(e,{silent:!0})}catch(o){console.warn("[memory] promote failed",o)}}async function oi(t){try{const e=await fetch(`${v}/api/consciousness/memory-candidates/${encodeURIComponent(t)}`,{method:"DELETE"});if(!e.ok)throw new Error(`HTTP ${e.status}`);a.memoryCandidates=(a.memoryCandidates||[]).filter(o=>String(o.id)!==String(t)),c()}catch(e){console.warn("[memory] dismiss failed",e)}}function za(t=null){const e=t||{},o=window.prompt("记忆内容",String(e.raw_content||e.content||"").trim());if(o===null)return null;const n=window.prompt("分层 / category（core_profile / recent_pending / deep / ephemeral）",String(e.category||"recent_pending"));if(n===null)return null;const i=window.prompt("可见范围（private / shared / public）",String(e.visibility||"private"));if(i===null)return null;const r=window.prompt("重要度（1-5）",String(e.importance??3));if(r===null)return null;const s=window.prompt("过期时间 ISO（可留空）",String(e.expires_at||""));return s===null?null:{agent_id:Je(),content:String(o||"").trim(),raw_content:String(o||"").trim(),category:String(n||"").trim()||"recent_pending",visibility:String(i||"").trim()||"private",importance:Math.max(1,Math.min(5,Number(r)||3)),expires_at:String(s||"").trim()||null}}async function ni(){const t=za();if(!t||!t.content)return;const e=await fetch(`${v}/api/memories`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),o=await e.json().catch(()=>({}));if(!e.ok)throw new Error(o?.detail||`HTTP ${e.status}`)}async function ii(t){const e=a.memoryServiceEntries.find(r=>String(r.id)===String(t));if(!e)return;const o=za(e);if(!o||!o.content)return;const n=await fetch(`${v}/api/memories/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(o)}),i=await n.json().catch(()=>({}));if(!n.ok)throw new Error(i?.detail||`HTTP ${n.status}`)}async function ri(t){if(!window.confirm("删除这条记忆？"))return;const e=await fetch(`${v}/api/memories/${encodeURIComponent(t)}`,{method:"DELETE"}),o=await e.json().catch(()=>({}));if(!e.ok)throw new Error(o?.detail||`HTTP ${e.status}`)}function si(){const t=Bt();return`
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
    `}function ci(){const t=a.globalSettings;return`
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
    `}function $(t,e,o="noop",n={}){const i=Object.entries(n).map(([r,s])=>` data-${r}="${u(String(s))}"`).join("");return`
      <button class="setting-row nav-row" data-action="${o}"${i}>
        <div class="setting-copy"><strong>${u(t)}</strong>${e?`<p>${u(e)}</p>`:""}</div>
        <span class="row-chevron">${m("chevron")}</span>
      </button>
    `}function j(t,e){a.viewStack.push(a.currentView),typeof e=="function"&&e(),a.currentView=t,c()}function ui(){a.currentView=a.viewStack.pop()||"settings",c()}async function li(){try{const t=await fetch(`${v}/api/settings/ai`);if(!t.ok)return;const e=await t.json();Hn(e.settings?.aiSettings||e.settings?.ai||e.settings?.ai_settings||e.settings||{}),c()}catch(t){console.warn("[ai settings] load failed",t)}}async function Fa({silent:t=!0}={}){try{const e=new URLSearchParams({viewer_type:"user",viewer_id:"me"}),o=await fetch(`${v}/api/moments?${e.toString()}`);if(!o.ok){if(!t)throw new Error(`HTTP ${o.status}`);return}const n=await o.json().catch(()=>({}));if(!Array.isArray(n?.moments))return;n.moments.length>0&&(a.moments=Ma(a.moments,n.moments),w(120)),c()}catch(e){console.warn("[moments] load failed",e),t||(a.toast="朋友圈加载失败",c(),window.setTimeout(()=>{a.toast="",c()},1400))}}async function di(t){const e=await fetch(`${v}/api/moments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),o=await e.json().catch(()=>({}));if(!e.ok)throw new Error(o?.detail||`HTTP ${e.status}`);return A(o?.moment||t)}async function pi(t,e){const o=await fetch(`${v}/api/moments/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),n=await o.json().catch(()=>({}));if(!o.ok)throw new Error(n?.detail||`HTTP ${o.status}`);return n}async function mi(t,e,o){const n=new URLSearchParams({author_type:String(e||"user"),author_id:String(o||"me")}),i=await fetch(`${v}/api/moments/${encodeURIComponent(t)}?${n.toString()}`,{method:"DELETE"}),r=await i.json().catch(()=>({}));if(!i.ok)throw new Error(r?.detail||`HTTP ${i.status}`);return r}async function fi(t,e){const o=await fetch(`${v}/api/moments/${encodeURIComponent(t)}/like`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({actor_type:e.author_type,actor_id:e.author_id,actor_name:e.author_name})}),n=await o.json().catch(()=>({}));if(!o.ok)throw new Error(n?.detail||`HTTP ${o.status}`);return A(n?.moment||{})}async function gi(t,e,o){const n=await fetch(`${v}/api/moments/${encodeURIComponent(t)}/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({actor_type:e.author_type,actor_id:e.author_id,actor_name:e.author_name,text:o})}),i=await n.json().catch(()=>({}));if(!n.ok)throw new Error(i?.detail||`HTTP ${n.status}`);return A(i?.moment||{})}async function bi(t,e){const o=a.currentContactId||"",n=(e||"").trim()||null,i={agentId:o};if(t==="impression")i.impression=n;else if(t==="relationshipProgress")i.relationshipProgress=n;else if(t==="likesSummary")i.likesSummary=n;else return;try{a.toast="保存中…",c();const r=await fetch(`${v}/api/companion-state/summary`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!r.ok)throw new Error(`HTTP ${r.status}`);const s=await r.json().catch(()=>({}));a.companionState=_t(s?.state||a.companionState),a.toast="已保存",c(),window.setTimeout(()=>{a.toast="",c()},1200)}catch(r){console.warn("[insight save]",r),a.toast="保存失败",c(),window.setTimeout(()=>{a.toast="",c()},1400)}}async function at(t=a.currentContactId,{silent:e=!0}={}){try{const o=String(t||"").trim(),n=o?`?agent_id=${encodeURIComponent(o)}`:"",i=await fetch(`${v}/api/companion-state${n}`);if(!i.ok){if(!e)throw new Error(`HTTP ${i.status}`);return}const r=await i.json().catch(()=>({}));a.companionState=_t(r?.state||{}),c()}catch(o){console.warn("[companion state] load failed",o),e||(a.toast="状态读取失败",c(),window.setTimeout(()=>{a.toast="",c()},1200))}}async function zt(t,{silent:e=!0}={}){const o=String(t||"").trim();if(!o)return"";try{const n=await fetch(`${v}/api/agents/${encodeURIComponent(o)}/persona`);if(!n.ok){if(!e)throw new Error(`HTTP ${n.status}`);return""}const i=await n.json().catch(()=>({})),r=h(o);return r&&(r.persona=String(i?.persona||""),a.currentView==="contactSettings"&&a.currentContactId===o&&c()),String(i?.persona||"")}catch(n){return console.warn("[agent persona] load failed",n),e||(a.toast="浜鸿璇诲彇澶辫触",c(),window.setTimeout(()=>{a.toast="",c()},1200)),""}}async function hi(t,e){const o=String(t||"").trim();if(o)try{await fetch(`${v}/api/agents/${encodeURIComponent(o)}/persona`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({persona:String(e||"")})})}catch(n){console.warn("[agent persona] save failed",n)}}function vi(t,e,o=260){const n=String(t||"").trim();if(!n)return;ft.has(n)&&clearTimeout(ft.get(n));const i=window.setTimeout(()=>{ft.delete(n),hi(n,e)},o);ft.set(n,i)}async function Ua({silent:t=!0}={}){try{const e=await fetch(`${v}/api/mcp/library`);if(!e.ok){if(!t)throw new Error(`HTTP ${e.status}`);return}const o=await e.json();if(!Array.isArray(o.tools))return;const n=E(),i=o.tools.map(it).filter(r=>bt(r.id));n.mcpLibrary={...n.mcpLibrary||{},tools:i},P(),c()}catch(e){console.warn("[mcp library] load failed",e),t||(a.toast="同步 MCP 工具失败",c(),window.setTimeout(()=>{a.toast="",c()},1300))}}async function P(){re(),a.aiSettingsSaving=!0;try{await fetch(`${v}/api/settings/ai`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({settings:{...a.globalSettings,aiSettings:E()}})})}catch(t){console.error("[ai settings] save failed",t)}finally{a.aiSettingsSaving=!1}}function yi(){const t=E(),e=(t.mcpLibrary?.tools||[]).filter(o=>o.enabled!==!1).length;return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel">
          <h3>AI 接口</h3>
          ${$("默认模型","聊天 / 摘要 / Vision / 翻译 / 意识循环 / 语音","open-default-models")}
          ${$("模型供应商",`共 ${t.providers.length} 个`,"open-provider-catalog")}
          ${$("MCP 工具库",`已启用 ${e} 个`,"open-mcp-library")}
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>当前聊天默认</h3>
          ${$("聊天模型",ja("chat"))}
        </div>
      </section>
    `}function wi(){const t=E();return`
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
    `}function $i(){return`
      <section class="settings-page page-block ai-settings-page">
        <div class="default-model-list">
          ${["chat","summary","vision","translate","consciousness","voice"].map(e=>Gn(e)).join("")}
        </div>
      </section>
    `}function Si(){const t=V(a.activeModelSlot),e=a.activeModelSlotContext==="contact",o=h(a.currentContactId)||a.contacts[0];if(!e&&t==="voice"){const d=ue("voice")||{};return`
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
    `}const n=e?{providerId:o?.settings?.modelProviderId||a.activeModelProviderId||_("chat")?.providerId||"openai",model:t==="consciousness"?o?.settings?.loopModel||"":o?.settings?.model||""}:ue(t),i=E().providers.filter(d=>d.enabled),s=(Q(n.providerId)||Q(_("chat")?.providerId)||i[0])?.models||[];if(e){const d=se(n.model||"",s);return`
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
            <div id="model-slot-menu" class="provider-model-menu ${a.modelSlotMenuOpen?"open":""}">
              ${a.modelSlotMenuOpen?d.length?d.map(p=>`
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
            <div id="model-slot-menu" class="provider-model-menu ${a.modelSlotMenuOpen?"open":""}">
              ${a.modelSlotMenuOpen?l.length?l.map(d=>`
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
    `}function ki(t){return`
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
    `}function Ii(){const t=a.providerSearch.trim().toLowerCase(),e=E().providers.filter(o=>!t||o.name.toLowerCase().includes(t)||o.id.toLowerCase().includes(t)).sort((o,n)=>{const i=+!!n.enabled-+!!o.enabled;return i!==0?i:String(o.name||o.id||"").localeCompare(String(n.name||n.id||""),"zh-Hans-CN")});return`
      <section class="settings-page page-block ai-settings-page">
        <div class="search-pill glass-frost ai-search-row">
          <span class="search-icon">${m("search")}</span>
          <input class="ai-search-input" value="${u(a.providerSearch)}" data-action="provider-search" placeholder="搜索供应商" />
        </div>
        <div class="settings-group glass-frost ai-panel provider-catalog-group">
          ${e.map(o=>ki(o)).join("")}
        </div>
      </section>
    `}function _i(t){const e=Array.isArray(t._allModels)?t._allModels:[],o=t._selectedModelIds instanceof Set?t._selectedModelIds:new Set(t._selectedModelIds||[]),n=o.size,i={};for(const b of e){const I=b.vendor||"Other";i[I]||(i[I]=[]),i[I].push(b)}const r=["OpenAI","Anthropic","Google","DeepSeek","Qwen","GLM","Meta","Mistral","Moonshot","璞嗗寘","鏂囧績","娣峰厓","鐧惧窛","鏄熺伀","闆朵竴涓囩墿","InternLM","Other"],s=[...new Set([...r.filter(b=>i[b]),...Object.keys(i)])],l=e.map(b=>b.id),d=l.length>0&&l.every(b=>o.has(b)),p=s.map(b=>{const I=i[b]||[],S=!!a.providerModelVendorOpen[b],C=I.filter(k=>o.has(k.id)).length,M=I.length>0&&I.every(k=>o.has(k.id)),q=S?`
          <div class="vendor-group-body">
            ${I.map(k=>{const T=o.has(k.id);return`
              <div class="pool-model-row">
                <span class="pool-model-name">${u(k.name)}</span>
                <span class="pool-model-caps">${Un(k)}</span>
                <button class="pool-model-btn${T?" selected":""}"
                  data-action="${T?"remove-provider-model":"add-provider-model"}"
                  data-model-id="${u(k.id)}" type="button">${T?"−":"+"}</button>
              </div>`}).join("")}
          </div>`:"";return`
        <div class="vendor-group">
          <div class="vendor-group-head">
            <button class="vendor-group-toggle" data-action="toggle-provider-vendor-group" data-vendor="${u(b)}" type="button">
              <span class="vendor-group-name">${u(b)}</span>
              ${C?`<span class="vendor-group-sel">${C} 已选</span>`:""}
              <span class="vendor-group-badge">${I.length}</span>
              <span class="vendor-group-chevron${S?" open":""}">${m("chevron")}</span>
            </button>
            <button class="pool-vendor-selall${M?" all-selected":""}" data-action="toggle-vendor-all-provider-models" data-vendor="${u(b)}" type="button" title="${M?"全不选":"全选"}">${M?"−全":"+全"}</button>
          </div>
          ${q}
        </div>`}).join(""),f=e.length?"":'<p class="pool-model-empty" style="padding:10px 2px;">还没有模型，点击“同步模型”获取，或手动添加。</p>';return`
      <div class="prov-model-pool">
        <div class="prov-pool-header">
          <span class="prov-pool-count">${n?`已选 <strong>${n}</strong> 个模型`:"还没有已选模型"}</span>
          ${e.length?`<button class="pool-selall-btn${d?" all-selected":""}" data-action="toggle-all-provider-models" type="button">${d?"全不选":"全选"}</button>`:""}
        </div>
        ${f}
        ${p}
        <div class="pool-manual-row">
          <input id="provider-manual-model-input" class="ai-input provider-model-input" placeholder="手动输入模型名" autocomplete="off" />
          <button class="pool-manual-add-btn" data-action="add-manual-provider-model" type="button">＋</button>
        </div>
      </div>`}function Mi(){const t=R(),e=Ht(t.apiPath||t.api_path||"",{allowEmpty:!0}),o=Nn(t),n=!!a.providerAdvancedOpen||!!e;return`
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
              <input id="provider-api-path-input" class="ai-input" value="${u(e)}" placeholder="${u(o)}" />
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
              <p id="provider-default-model-hint" class="section-eyebrow provider-model-hint">${u(Ha(t.defaultModel||"",t.models||[]))}</p>
              <div id="provider-default-model-menu" class="provider-model-menu ${a.providerModelMenuOpen?"open":""}"></div>
            </div>
          </div>

          <div class="prov-sec-divider"></div>

          <div class="prov-sec">
            <div class="prov-sec-title-row">
              <h3 class="prov-sec-title" style="margin:0;">模型列表</h3>
              <button class="prov-sync-btn" data-action="sync-provider-models" data-provider="${t.id}" type="button">${m("reroll")}同步</button>
            </div>
            ${_i(t)}
            <p class="section-eyebrow" style="margin-top:4px;">同步会尝试请求 /models 接口；不兼容时可手动添加。</p>
          </div>

          <div class="prov-sec-divider"></div>

          ${Z("启用供应商","关闭后将不会出现在模型选择中",!!t.enabled,"toggle-provider-enabled",t.id)}

          <div class="prov-save-row">
            <button class="prov-save-btn-main" data-action="save-provider-editor" data-provider="${t.id}" type="button">保存供应商</button>
          </div>
        </div>
      </section>
    `}async function xi(){const t=document.getElementById("provider-base-input")?.value?.trim()||"",e=document.getElementById("provider-key-input")?.value?.trim()||"";if(!t){alert("请先填写 Base URL 再同步模型");return}try{const o=await fetch(`${v}/api/settings/ai/discover-models`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({base_url:t,api_key:e})}),n=await o.json().catch(()=>({}));if(!o.ok)throw new Error(n.detail||"同步失败");const i=Array.isArray(n.models)?n.models:[],r=R(),s=new Set((r._allModels||[]).map(b=>b.id)),l=i.map(Xe),d=[...l,...(r._allModels||[]).filter(b=>!i.includes(b.id))];r._allModels=d,[...new Set(l.map(b=>b.vendor))].forEach(b=>{a.providerModelVendorOpen[b]=!0}),r._selectedModelIds instanceof Set||(r._selectedModelIds=new Set(r._selectedModelIds||[])),r.models=[...r._selectedModelIds];const f=document.getElementById("provider-default-model-input");f&&(!f.value||!i.includes(f.value))&&(f.value=i[0]||f.value),r.defaultModel=f?.value?.trim()||r.defaultModel||"",c(),yt(),alert(i.length?`已同步 ${i.length} 个模型，请在模型池中选择需要的模型`:"接口已连接，但供应商没有返回可用模型")}catch(o){const n=String(o?.message||"同步模型失败");if(n.includes("Failed to fetch")){alert("同步失败：当前前端连不上后端接口。请确认 API base 配置正确，且后端可以访问。");return}alert(`同步失败：${n}`)}}Xt=function(){return Qe.has(a.currentView)?!1:On()},ke=function(){if(!Qe.has(a.currentView))return Rn();const e={aiInterface:"AI 接口",mcpLibrary:"MCP 工具库",themeSettings:"主题模式",accountSettings:"我的账号",memoryService:"记忆服务",backendSync:"同步后端",exportSettings:"导出格式",defaultModels:"默认模型",modelSlot:Pt(a.activeModelSlot),providerCatalog:"模型供应商",providerEditor:"编辑供应商",promptEditor:"提示词"},o=`chat-page-title ${a.currentView==="providerCatalog"?"provider-catalog-title":""}`.trim(),n=a.currentView==="providerCatalog"?`<button class="icon-btn ghost-circle" data-action="open-provider-editor-new" aria-label="新增供应商">${m("plus")}</button>`:'<span class="header-spacer"></span>';return`
      <header class="chat-page-header simple-header">
        <button class="icon-btn text-btn" data-action="back-sub-settings" aria-label="返回">${m("back")}</button>
        <div class="${o}">${u(e[a.currentView]||"设置")}</div>
        ${n}
      </header>
    `},Ie=function(){return a.currentView==="accountSettings"?Zn():a.currentView==="memoryService"?ei():a.currentView==="backendSync"?si():a.currentView==="exportSettings"?ci():a.currentView==="themeSettings"?Wn():a.currentView==="aiInterface"?yi():a.currentView==="mcpLibrary"?wi():a.currentView==="defaultModels"?$i():a.currentView==="modelSlot"?Si():a.currentView==="providerCatalog"?Ii():a.currentView==="providerEditor"?Mi():a.currentView==="promptEditor"?Jn():Vn()},Pe=function(e){const o=e.target.closest("[data-action]"),n=o?.dataset.action;if(!n)return Va(e);if(n==="open-ai-interface")return j("aiInterface");if(n==="open-mcp-library")return j("mcpLibrary");if(n==="open-theme-settings")return j("themeSettings");if(n==="open-account-settings")return j("accountSettings");if(n==="open-account-avatar"){document.getElementById("account-avatar-file")?.click();return}if(n==="open-account-nickname"){const i=window.prompt("请输入昵称",a.accountProfile?.nickname||"小酒")?.trim();if(!i)return;a.accountProfile.nickname=i,a.toast="昵称已更新",c(),P(),w(120),window.setTimeout(()=>{a.toast="",c()},1200);return}if(n==="open-account-signature"){const i=window.prompt("请输入个性签名",a.accountProfile?.signature||"")?.trim();if(!i)return;a.accountProfile.signature=i,a.toast="个性签名已更新",c(),P(),w(120),window.setTimeout(()=>{a.toast="",c()},1200);return}if(n==="open-memory-service")return j("memoryService",()=>{wt(a.currentContactId)});if(n==="memory-service-refresh"){wt(a.currentContactId,{silent:!1});return}if(n==="memory-service-sort"){a.memoryServiceSort=o.dataset.sort||"updated_at",wt(a.currentContactId,{silent:!0});return}if(n==="memory-candidate-promote"){ai(o.dataset.candidateId);return}if(n==="memory-candidate-dismiss"){oi(o.dataset.candidateId);return}if(n==="memory-service-create"){ni().then(()=>wt(a.currentContactId,{silent:!1})).catch(i=>{console.warn("[memory service] create failed",i),a.toast="新建记忆失败",c(),window.setTimeout(()=>{a.toast="",c()},1200)});return}if(n==="memory-service-edit"){ii(o.dataset.memoryId).then(()=>wt(a.currentContactId,{silent:!1})).catch(i=>{console.warn("[memory service] update failed",i),a.toast="编辑记忆失败",c(),window.setTimeout(()=>{a.toast="",c()},1200)});return}if(n==="memory-service-delete"){ri(o.dataset.memoryId).then(()=>wt(a.currentContactId,{silent:!1})).catch(i=>{console.warn("[memory service] delete failed",i),a.toast="删除记忆失败",c(),window.setTimeout(()=>{a.toast="",c()},1200)});return}if(n==="open-backend-sync")return j("backendSync");if(n==="sync-pull-now"){Da();return}if(n==="sync-push-now"){st(),vt(30),a.toast="已加入上传队列",c(),window.setTimeout(()=>{a.toast="",c()},1e3);return}if(n==="open-export-settings")return j("exportSettings");if(n==="open-default-models")return j("defaultModels");if(n==="open-model-slot")return j("modelSlot",()=>{if(a.activeModelSlot=V(o.dataset.slot),a.activeModelSlotContext=o.dataset.context==="contact"?"contact":"global",a.modelSlotMenuOpen=!1,a.activeModelSlotContext==="contact"){const i=N();a.activeModelProviderId=i?.settings?.modelProviderId||_("chat")?.providerId||a.activeModelProviderId||"openai"}else a.activeModelProviderId=_("chat")?.providerId||a.activeModelProviderId||"openai"});if(n==="open-provider-catalog")return j("providerCatalog");if(n==="open-provider-editor-new")return j("providerEditor",()=>{a.providerDraftId=`custom_${Date.now()}`,a.providerAdvancedOpen=!1,a.providerModelMenuOpen=!1,a.providerEditorDraft=Ke(a.providerDraftId)});if(n==="open-provider-editor")return j("providerEditor",()=>{a.providerDraftId=o.dataset.provider;const i=Q(a.providerDraftId);a.providerAdvancedOpen=!!String(i?.apiPath||i?.api_path||"").trim(),a.providerModelMenuOpen=!1,a.providerEditorDraft=Ke(a.providerDraftId)});if(n==="open-prompt-editor")return j("promptEditor",()=>{a.activePromptSlot=V(o.dataset.slot)});if(n==="back-sub-settings")return ui();if(n==="sync-provider-models"){xi();return}if(n==="toggle-provider-advanced"){a.providerAdvancedOpen=!a.providerAdvancedOpen,c();return}if(n==="toggle-model-slot-menu"){a.modelSlotMenuOpen=!a.modelSlotMenuOpen,ce();return}if(n==="toggle-provider-model-menu"){a.providerModelMenuOpen=!a.providerModelMenuOpen,yt();return}if(n==="pick-provider-default-model"){const i=o.dataset.model||"",r=R();r.defaultModel=i;const s=document.getElementById("provider-default-model-input");s&&(s.value=i),a.providerModelMenuOpen=!1,yt();return}if(n==="pick-slot-provider"){if(a.activeModelSlotContext==="contact"){const s=N(),l=o.dataset.providerId||a.activeModelProviderId,d=Q(l);a.activeModelProviderId=l,a.modelSlotMenuOpen=!1,s?.settings&&(s.settings.modelProviderId=l,(!s.settings.model||!(d?.models||[]).includes(s.settings.model))&&(s.settings.model=d?.defaultModel||d?.models?.[0]||s.settings.model||"")),c(),w(150);return}const i=_(o.dataset.slot);i.providerId=o.dataset.providerId;const r=Q(i.providerId);r&&(i.model=r.defaultModel||r.models?.[0]||i.model),a.modelSlotMenuOpen=!1,c(),P();return}if(n==="toggle-all-provider-models"){const i=R();i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[]));const s=(Array.isArray(i._allModels)?i._allModels:[]).map(d=>d.id);s.length>0&&s.every(d=>i._selectedModelIds.has(d))?s.forEach(d=>i._selectedModelIds.delete(d)):s.forEach(d=>i._selectedModelIds.add(d)),i.models=[...i._selectedModelIds],c();return}if(n==="toggle-vendor-all-provider-models"){const i=o.dataset.vendor,r=R();r._selectedModelIds instanceof Set||(r._selectedModelIds=new Set(r._selectedModelIds||[]));const l=(Array.isArray(r._allModels)?r._allModels:[]).filter(p=>(p.vendor||"Other")===i).map(p=>p.id);l.length>0&&l.every(p=>r._selectedModelIds.has(p))?l.forEach(p=>r._selectedModelIds.delete(p)):l.forEach(p=>r._selectedModelIds.add(p)),r.models=[...r._selectedModelIds],c();return}if(n==="toggle-provider-vendor-group"){const i=o.dataset.vendor;i&&(a.providerModelVendorOpen[i]=!a.providerModelVendorOpen[i]),c();return}if(n==="add-provider-model"){const i=R();i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[]));const r=o.dataset.modelId;r&&i._selectedModelIds.add(r),i.models=[...i._selectedModelIds],c();return}if(n==="remove-provider-model"){const i=R();i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[]));const r=o.dataset.modelId;r&&i._selectedModelIds.delete(r),i.models=[...i._selectedModelIds],c();return}if(n==="add-manual-provider-model"){const i=R(),s=(document.getElementById("provider-manual-model-input")?.value||"").trim();if(!s)return;if(i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[])),Array.isArray(i._allModels)||(i._allModels=[]),!i._allModels.some(l=>l.id===s)){i._allModels.push(Xe(s));const l=Ba(s);a.providerModelVendorOpen[l]=!0}i._selectedModelIds.add(s),i.models=[...i._selectedModelIds],c();return}if(n==="toggle-slot-vendor-group"){const i=o.dataset.providerId;i&&(a.slotVendorGroupOpen[i]=!a.slotVendorGroupOpen[i]),c();return}if(n==="add-model-to-slot"){const i=o.dataset.slot,r=o.dataset.providerId,s=o.dataset.model;if(!i||!r||!s)return;const l=_(i);Array.isArray(l.selectedModels)||(l.selectedModels=[]),l.selectedModels.some(d=>d.providerId===r&&d.model===s)||l.selectedModels.push({providerId:r,model:s}),c(),P();return}if(n==="remove-model-from-slot"){const i=o.dataset.slot,r=o.dataset.providerId,s=o.dataset.model;if(!i||!s)return;const l=_(i);Array.isArray(l.selectedModels)&&(l.selectedModels=l.selectedModels.filter(d=>!(d.providerId===r&&d.model===s))),c(),P();return}if(n==="add-manual-slot-model"){const i=o.dataset.slot,s=(document.getElementById("model-slot-manual-input")?.value||"").trim();if(!i||!s)return;const l=_(i);Array.isArray(l.manualModels)||(l.manualModels=[]),l.manualModels.includes(s)||l.manualModels.push(s),c(),P();return}if(n==="remove-manual-slot-model"){const i=o.dataset.slot,r=o.dataset.model;if(!i||!r)return;const s=_(i);Array.isArray(s.manualModels)&&(s.manualModels=s.manualModels.filter(l=>l!==r)),c(),P();return}if(n==="pick-theme-mode"){a.globalSettings.theme=o.dataset.theme||a.globalSettings.theme,c(),P();return}if(n==="pick-export-format"){a.globalSettings.exportFormat=o.dataset.format||a.globalSettings.exportFormat,c(),P();return}if(n==="toggle-mcp-tool"){const i=o.dataset.toolId,l=(E().mcpLibrary?.tools||[]).find(d=>String(d.id)===String(i));if(!l)return;l.enabled=l.enabled===!1,fa(o,l.enabled!==!1),P();return}if(n==="sync-mcp-library"){Ua({silent:!1});return}if(n==="edit-contact-quick-action"){if(a.quickActionDragId)return;en(o.dataset.quickId||"");return}if(n==="add-contact-quick-action"){const i=N(),r=ht(i),s=`custom_${Date.now()}`;r.push({id:s,label:"新快捷动作",icon:"more",prompt:"",mcpToolId:"",enabled:!0}),i.settings.quickActions=r,a.contactQuickActionEditorId=s,c(),w(150);return}if(n==="close-contact-quick-action-editor"){if(e.target.closest('[data-stop-close="1"]')&&!e.target.hasAttribute("data-action"))return;a.contactQuickActionEditorId="",a.contactQuickMcpMenuOpen=!1,c();return}if(n==="toggle-contact-quick-mcp-menu"){a.contactQuickMcpMenuOpen=!a.contactQuickMcpMenuOpen,o.closest(".qae-select-shell")?.classList.toggle("open",a.contactQuickMcpMenuOpen);return}if(n==="pick-contact-quick-mcp"){const i=o.closest(".qae-select-shell"),r=o.dataset.mcpId||"",s=document.getElementById("contact-quick-mcp");s&&(s.value=r);const l=o.textContent?.trim()||"不调用 MCP",d=i?.querySelector(".qae-select-trigger span");d&&(d.textContent=l),i?.querySelectorAll(".qae-select-option").forEach(p=>{p.classList.toggle("active",p===o)}),a.contactQuickMcpMenuOpen=!1,i?.classList.remove("open");return}if(n==="save-contact-quick-action"){const i=N(),r=ht(i),s=o.dataset.quickId||"",l=r.find(d=>d.id===s);if(!l)return;l.label=(document.getElementById("contact-quick-label")?.value||l.label||"").trim()||l.label||"蹇嵎鍔ㄤ綔",l.prompt=(document.getElementById("contact-quick-prompt")?.value||"").trim(),l.mcpToolId=(document.getElementById("contact-quick-mcp")?.value||"").trim(),l.mcpToolId&&bt(l.mcpToolId)&&(l.id=l.id||l.mcpToolId),i.settings.quickActions=r,a.contactQuickActionEditorId="",c(),w(150);return}if(n==="delete-contact-quick-action"){const i=N(),r=o.dataset.quickId||"",s=ht(i).filter(l=>l.id!==r);i.settings.quickActions=s,a.contactQuickActionEditorId===r&&(a.contactQuickActionEditorId=""),a.quickActionSwipeOpenId="",c(),w(150);return}if(n==="pick-slot-model"){if(a.activeModelSlotContext==="contact"){const r=h(a.currentContactId)||a.contacts[0];r?.settings&&(o.dataset.slot==="consciousness"?r.settings.loopModel=o.dataset.model:(r.settings.model=o.dataset.model,r.settings.modelProviderId=a.activeModelProviderId||r.settings.modelProviderId||_("chat")?.providerId||"openai")),a.modelSlotMenuOpen=!1,c(),w(150);return}const i=_(o.dataset.slot);i.model=o.dataset.model,o.dataset.providerId&&(i.providerId=o.dataset.providerId),a.modelSlotMenuOpen=!1,c(),P();return}if(n==="toggle-provider-enabled"){const i=Q(o.dataset.providerId||o.dataset.key);i&&(i.enabled=!i.enabled,a.providerEditorDraft&&a.providerEditorDraft.id===i.id&&(a.providerEditorDraft.enabled=i.enabled)),c(),P();return}if(n==="save-provider-editor"){const i=o.dataset.provider,r=R(),l=[...r._selectedModelIds instanceof Set?r._selectedModelIds:new Set(r._selectedModelIds||[])].filter(Boolean),d=Q(i),p=Ht(document.getElementById("provider-api-path-input")?.value||"",{allowEmpty:!0}),f={...d||{id:i},id:i,name:document.getElementById("provider-name-input")?.value?.trim()||"自定义供应商",baseUrl:document.getElementById("provider-base-input")?.value?.trim()||"",apiPath:p,api_path:p,apiKey:document.getElementById("provider-key-input")?.value?.trim()||"",defaultModel:document.getElementById("provider-default-model-input")?.value?.trim()||l[0]||"",models:l},b=E();b.providers=b.providers.filter(I=>I.id!==i),b.providers.push(f),re(),a.providerEditorDraft=null,a.providerModelMenuOpen=!1,a.currentView="providerCatalog",c(),P();return}if(n==="save-slot-prompt"){const i=V(o.dataset.slot);E().defaultPrompts[i]=document.getElementById("slot-prompt-input")?.value||"",a.currentView="defaultModels",c(),P();return}if(n==="reset-slot-prompt"){const i=V(o.dataset.slot),r=jt().defaultPrompts||{};E().defaultPrompts[i]=r[i]||"",c(),P();return}return Va(e)},document.addEventListener("input",t=>{const e=t.target;if(e?.dataset?.action==="provider-search"){a.providerSearch=e.value||"",c();return}if(e?.id==="model-slot-input"){const o=h(a.currentContactId)||a.contacts[0],n=e.value||"";if(a.activeModelSlotContext==="contact")o?.settings&&(a.activeModelSlot==="consciousness"?o.settings.loopModel=n:o.settings.model=n);else{const i=_(a.activeModelSlot);i&&(i.model=n)}a.modelSlotMenuOpen=!0,ce();return}if(e?.id==="provider-name-input"){R().name=e.value||"";return}if(e?.id==="provider-base-input"){R().baseUrl=e.value||"";return}if(e?.id==="provider-api-path-input"){const o=R();o.apiPath=e.value||"",o.api_path=e.value||"";return}if(e?.id==="provider-key-input"){R().apiKey=e.value||"";return}if(e?.id==="provider-models-input"){R().models=String(e.value||"").split(",").map(o=>o.trim()).filter(Boolean),yt();return}if(e?.id==="voice-slot-provider-input"){const o=_("voice");o&&(o.provider=e.value||"");return}if(e?.id==="voice-slot-service-url-input"){const o=_("voice");o&&(o.service_url=e.value||"",o.base_url=e.value||"");return}if(e?.id==="voice-slot-voice-id-input"){const o=_("voice");o&&(o.voice_id=e.value||"");return}if(e?.id==="voice-slot-speaker-input"){const o=_("voice");o&&(o.speaker=e.value||"");return}if(e?.id==="voice-slot-emotion-input"){const o=_("voice");o&&(o.emotion=e.value||"");return}if(e?.id==="voice-slot-speed-input"){const o=_("voice");o&&(o.speed=e.value||"");return}if(e?.id==="voice-slot-format-input"){const o=_("voice");o&&(o.format=e.value||"");return}if(e?.id==="provider-default-model-input"){R().defaultModel=e.value||"",a.providerModelMenuOpen=!0,yt();return}if(e?.dataset?.contactField==="persona"){const o=N();if(!o)return;o.persona=e.value||"",w(180),vi(o.id,o.persona)}}),document.addEventListener("change",t=>{const e=t.target;if(e?.id==="nc-avatar-file"){const o=e.files?.[0];if(!o)return;a.newContactDraft={...a.newContactDraft||Gt(),name:document.getElementById("nc-name")?.value||a.newContactDraft?.name||"",agentId:document.getElementById("nc-agent-id")?.value||a.newContactDraft?.agentId||"",bio:document.getElementById("nc-bio")?.value||a.newContactDraft?.bio||""},Te(o,"new-contact"),e.value="";return}if(e?.id==="account-avatar-file"){const o=e.files?.[0];if(!o)return;Te(o,"account"),e.value="";return}if(e?.id==="contact-avatar-file"){const o=e.files?.[0];if(!o||!h(a.currentContactId))return;Te(o,"contact"),e.value="";return}if(e?.id==="moment-image-input"){const o=e.files?.[0];if(!o)return;a.momentComposerImageName=o.name||"";const n=new FileReader;n.onload=()=>{a.momentComposerImage=typeof n.result=="string"?n.result:"",c()},n.readAsDataURL(o);return}if(e?.dataset?.action==="select-slot-model"){const o=_(e.dataset.slot);if(!o)return;o.model=e.value,P();return}String(e?.id||"").startsWith("voice-slot-")&&P()});function Ci(t,e){const o=N(),n=ht(o),i=n.findIndex(s=>s.id===t);if(i<0)return;const[r]=n.splice(i,1);if(!e)n.splice(0,0,r);else{const s=n.findIndex(l=>l.id===e);s<0?n.push(r):n.splice(s+1,0,r)}o.settings.quickActions=n,w(120)}const g={id:"",mode:"idle",startX:0,startY:0,currentY:0,hoverId:"",pendingDropId:null,pressTimer:null};function Ft(){g.pressTimer&&(clearTimeout(g.pressTimer),g.pressTimer=null)}function Qa(){Ft(),g.id="",g.mode="idle",g.startX=0,g.startY=0,g.currentY=0,g.hoverId="",g.pendingDropId=null}function We(){y()?.querySelectorAll(".quick-action-swipe.drop-hint-after").forEach(t=>t.classList.remove("drop-hint-after"))}function Ai(t,e){const o=y()?.querySelector(`.quick-action-swipe[data-quick-id="${t}"]`);if(!o)return;const n=o.querySelector(".quick-action-row"),i=o.querySelector(".quick-action-delete");if(!n||!i)return;const r=Math.max(-74,Math.min(0,Number(e)||0)),s=Math.min(1,Math.abs(r)/74);n.style.transform=`translateX(${r}px)`,i.style.opacity=String(s),i.style.transform=`translateX(${18*(1-s)}px) scale(${.97+.03*s})`,i.style.pointerEvents=s>.98?"auto":"none"}function $t(t){const e=y()?.querySelector(`.quick-action-swipe[data-quick-id="${t}"]`);if(!e)return;const o=e.querySelector(".quick-action-row"),n=e.querySelector(".quick-action-delete");o&&o.style.removeProperty("transform"),n&&(n.style.removeProperty("opacity"),n.style.removeProperty("transform"),n.style.removeProperty("pointer-events"))}function Ya(){if(y()?.querySelectorAll(".quick-action-swipe.quick-dragging").forEach(n=>n.classList.remove("quick-dragging")),y()?.querySelectorAll(".quick-action-row.touch-dragging").forEach(n=>{n.classList.remove("touch-dragging"),n.style.removeProperty("transform")}),!a.quickActionDragId)return;const t=y()?.querySelector(`.quick-action-row[data-quick-id="${a.quickActionDragId}"]`),e=t?.closest(".quick-action-swipe");if(!t||!e)return;e.classList.add("quick-dragging"),t.classList.add("touch-dragging");const o=g.currentY-g.startY;t.style.transform=`translateY(${o}px) scale(1.04) rotate(1.2deg)`}function Ti(t){const e=Array.from(y()?.querySelectorAll(".quick-action-swipe[data-quick-id]")||[]).filter(n=>n.dataset.quickId!==a.quickActionDragId);if(!e.length)return"";let o="";for(const n of e){const i=n.getBoundingClientRect(),r=i.top+i.height/2;if(t>=r)o=n.dataset.quickId;else break}return o}function Ka(){const t=g.pendingDropId,e=a.quickActionDragId;We(),a.quickActionDragId="",a.quickActionDropHintId="",a.quickActionDropDirection="",a.quickActionReorderPulseId="",e&&t!==null&&Ci(e,t),c()}function Xa(t,e,o){Ft(),a.quickActionSwipeOpenId&&a.quickActionSwipeOpenId!==o&&($t(a.quickActionSwipeOpenId),a.quickActionSwipeOpenId="",c()),g.id=o,g.mode="pending",g.startX=t,g.startY=e,g.currentY=e,g.hoverId="",g.pressTimer=window.setTimeout(()=>{if(!(g.mode!=="pending"||!g.id)&&(g.mode="drag",g.pendingDropId=null,a.quickActionDragId=g.id,Ya(),navigator?.vibrate))try{navigator.vibrate(12)}catch{}},280)}function Ga(t,e,o){if(!g.id)return;const n=t-g.startX,i=e-g.startY;if(g.mode==="pending"){Math.abs(n)>12&&Math.abs(n)>Math.abs(i)?(Ft(),g.mode="swipe"):Math.abs(i)>10&&(Ft(),g.mode="cancelled");return}if(g.mode==="swipe"){const l=a.quickActionSwipeOpenId===g.id?-74:0,d=Math.max(-74,Math.min(0,l+n));Ai(g.id,d);return}if(g.mode!=="drag")return;o?.(),g.currentY=e,Ya();const r=Ti(e);r!==g.pendingDropId&&(g.pendingDropId=r,We(),r&&y()?.querySelector(`.quick-action-swipe[data-quick-id="${r}"]`)?.classList.add("drop-hint-after"))}function Ja(t){if(g.id){if(Ft(),g.mode==="swipe"){const e=a.quickActionSwipeOpenId===g.id,o=t-g.startX;(e?-74+o:o)<-36?(a.quickActionSwipeOpenId=g.id,$t(g.id),c()):e&&o>22?(a.quickActionSwipeOpenId="",$t(g.id),c()):($t(g.id),e&&(a.quickActionSwipeOpenId=g.id,c()))}g.mode==="drag"&&Ka(),Qa()}}document.addEventListener("touchstart",t=>{if(Ae(t.target)||t.target.closest(".quick-action-open"))return;const e=t.target.closest(".quick-action-row");if(!e){!t.target.closest(".quick-action-delete")&&!t.target.closest(".quick-action-swipe")&&a.quickActionSwipeOpenId&&($t(a.quickActionSwipeOpenId),a.quickActionSwipeOpenId="",c());return}const o=t.touches?.[0];o&&Xa(o.clientX,o.clientY,e.dataset.quickId||"")},{passive:!0}),document.addEventListener("touchmove",t=>{const e=t.touches?.[0];e&&Ga(e.clientX,e.clientY,()=>t.preventDefault())},{passive:!1}),document.addEventListener("touchend",t=>{const e=t.changedTouches?.[0];Ja(e?.clientX||g.startX)},{passive:!0}),document.addEventListener("touchcancel",()=>{$t(g.id),We(),g.mode==="drag"&&Ka(),Qa()},{passive:!0}),document.addEventListener("mousedown",t=>{if(Ae(t.target)||t.target.closest(".quick-action-open"))return;const e=t.target.closest(".quick-action-row");if(!e||t.button!==0){!t.target.closest(".quick-action-delete")&&!t.target.closest(".quick-action-swipe")&&a.quickActionSwipeOpenId&&($t(a.quickActionSwipeOpenId),a.quickActionSwipeOpenId="",c());return}Xa(t.clientX,t.clientY,e.dataset.quickId||"")}),document.addEventListener("mousemove",t=>{Ga(t.clientX,t.clientY,()=>t.preventDefault())}),document.addEventListener("mouseup",t=>{Ja(t.clientX)});const Pi=xe;xe=function(){return Pi()},document.addEventListener("DOMContentLoaded",()=>{E(),li(),Ua(),Fa(),at(),zt(a.currentContactId)}),document.addEventListener("focusin",t=>{const e=t.target;if(e?.id==="model-slot-input"){a.modelSlotMenuOpen=!0,ce();return}e?.id==="provider-default-model-input"&&(a.providerModelMenuOpen=!0,yt())}),document.addEventListener("click",t=>{if(Qe.has(a.currentView)&&a.currentView==="modelSlot"&&!t.target.closest('#model-slot-input, .provider-model-picker, [data-action="toggle-model-slot-menu"]')&&a.modelSlotMenuOpen){a.modelSlotMenuOpen=!1,ce();return}if(a.currentView!=="providerEditor")return;!t.target.closest(".provider-model-picker")&&a.providerModelMenuOpen&&(a.providerModelMenuOpen=!1,yt())})})();
