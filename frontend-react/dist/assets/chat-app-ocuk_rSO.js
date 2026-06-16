(()=>{const le=[{id:"ayan",name:"阿延",handle:"@ayan",bio:"小酒，今天也要开开心心哦～",status:"在线",roleTag:"特别关注",lastMessage:"先聊天详情页。头部、气泡、输入区一起收掉，其他页自然顺。",lastTime:"刚刚",unread:2,pinned:!0,avatar:"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80",theme:"rose",settings:{model:"gpt-5.4",modelProviderId:"openai",temperature:.72,topP:.9,contextCount:64,thinkBudget:48,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!0,proactiveFrequency:60,memoryEnabled:!0},roomBackground:"点阵",chatTheme:"default",bubbleTheme:"默认主题",topics:[{id:"t1",title:"最近状态",updatedAt:"今天 21:40",count:24},{id:"t2",title:"睡眠记录",updatedAt:"昨天",count:18},{id:"t3",title:"网页 UI",updatedAt:"3天前",count:41}],messages:[{id:"m1",role:"ai",text:"今天把你丢给我的文件都翻了一遍。页面可以更可爱，真正夹棒的是里面的空壳。",time:"21:48"},{id:"m2",role:"user",text:"所以该先改哪里？",time:"21:49"},{id:"m3",role:"ai",text:"先聊天详情页。头部、气泡、输入区一起收掉，其他页自然顺。",time:"21:49",thinking:"她已经给了明确起点，先改核心路径能更快出效果。"}]},{id:"azheng",name:"阿争",handle:"@azheng",bio:"我把草稿整理好了，要继续吗？",status:"忙碌",roleTag:"同事",lastMessage:"我把草稿整理好了，要继续吗？",lastTime:"12分钟前",unread:0,pinned:!1,avatar:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300&q=80",theme:"mist",settings:{model:"gpt-5.4",modelProviderId:"openai",temperature:.45,topP:.8,contextCount:48,thinkBudget:36,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!1,proactiveFrequency:30,memoryEnabled:!0},roomBackground:"点阵",chatTheme:"default",bubbleTheme:"默认主题",topics:[{id:"t4",title:"版本梳理",updatedAt:"今天 23:18",count:12},{id:"t5",title:"说明文档",updatedAt:"昨天",count:8}],messages:[{id:"m4",role:"ai",text:"我把草稿整理好了，要继续吗？",time:"23:18"}]},{id:"xiaoying",name:"小樱",handle:"@sakura",bio:"周末去看展吗？",status:"在线",roleTag:"朋友",lastMessage:"周末去看展吗？",lastTime:"1小时前",unread:1,pinned:!1,avatar:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80",theme:"cream",settings:{model:"gpt-5.4",modelProviderId:"openai",temperature:.66,topP:.95,contextCount:32,thinkBudget:24,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!0,proactiveFrequency:20,memoryEnabled:!1},roomBackground:"点阵",chatTheme:"default",bubbleTheme:"默认主题",topics:[{id:"t6",title:"周末计划",updatedAt:"今天",count:6}],messages:[{id:"m5",role:"ai",text:"周末去看展吗？我知道有个新的展。",time:"20:22"}]}],Ln=[{id:"p0",contactId:"me",time:"23:36",mood:"开心",content:"今天的天空很温柔。",image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80",likes:["我"],comments:[]},{id:"p1",contactId:"ayan",time:"21:20",mood:"主动",content:"你醉了先看这个。",image:"",likes:["我","阿延"],comments:[{author:"我",text:"我收到了"}]},{id:"p2",contactId:"xiaoying",time:"19:08",mood:"经常",content:"晚上跑了三公里。",image:"",likes:[],comments:[]}],Za=[],de=[{id:"health",label:"Health",icon:"health"},{id:"schedule",label:"日程",icon:"calendar"},{id:"weather",label:"天气",icon:"weather"},{id:"files",label:"文件",icon:"file"},{id:"quote",label:"引用",icon:"quote"},{id:"more",label:"更多",icon:"more"}];function to(){return{tools:de.map(t=>({id:t.id,label:t.label,icon:t.icon,prompt:"",enabled:!0}))}}const n={currentTab:"chats",currentView:"list",currentContactId:"",currentSettingsTab:"basic",cotLogMode:"long",activityLogEntries:[],activityLogLoading:!1,activityLogLoadedAt:"",quoteMomentId:null,quoteMessageId:null,momentComposerOpen:!1,momentComposerText:"",momentComposerImage:"",momentComposerImageName:"",momentComposerEditingId:"",momentsActorType:"user",commentSheetMomentId:null,activeMenuMomentId:null,activeBubbleToolsId:null,suppressBubbleToggle:!1,toast:"",topicConfirmOpen:!1,rpRooms:[],currentRpRoomId:"",currentRpMessages:[],conversations:{},rpMessages:{},rpRoomDialogOpen:!1,rpRoomDialogMode:"create",rpRoomForm:{name:"",world_setting:"",user_role:"",ai_role:""},rpBackView:"list",contacts:[],moments:structuredClone(Za),actions:structuredClone(de),globalSettings:{theme:"奶油粉",notifications:!0,momentsNotify:!0,autoScroll:!0,defaultModel:"gpt-5.4",provider:"OpenAI",searchService:"默认搜索",voiceService:"未连接",mcpEnabled:!0,exportFormat:"json"},accountProfile:{avatar:"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80",nickname:"小酒",signature:"管理个人资料与基础偏好"},newContactAvatar:"",newContactDraft:{name:"",agentId:"",bio:"",avatar:""},avatarCropper:null,showAttach:!1,contactQuickActionEditorId:"",contactQuickMcpMenuOpen:!1,quickActionSwipeOpenId:"",quickActionDragId:"",quickActionSuppressClickUntil:0,quickActionDropHintId:"",quickActionReorderPulseId:"",quickActionDropDirection:"",contactPersonaExpanded:!1,contactModelAdvancedOpen:!1,chatAttachments:[],chatPasteError:"",companionState:{recent_topics:[],current_mood:"",open_loops:[],proactive_cooldown_until:null,impression:null,relationship_progress:null,likes_summary:null,summary_updated_at:null,updated_at:""},openThinkingIds:{},streamingAbortController:null,animatedMsgIds:{},assistantPlayback:{token:"",timer:null},historyLoadingContactIds:{},historyLoadedContactIds:{},rpCurtainRunning:!1},yt=new Map,y=()=>document.getElementById("chat-app-root"),b=t=>n.contacts.find(e=>e.id===t),Ut=t=>n.moments.find(e=>e.id===t),d=(t="")=>String(t).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),pe=[{key:"default",name:"默认主题",desc:"干净柔和的默认聊天界面",roomTheme:"rose",aliases:["默认玫瑰","默认"]},{key:"pink",name:"蜜桃粉",desc:"更甜一点的粉色聊天氛围",roomTheme:"rose",aliases:["奶茶"]},{key:"dark",name:"夜色",desc:"低亮度深色聊天界面",roomTheme:"rose",aliases:[]},{key:"glass",name:"玻璃雾",desc:"通透轻雾感的玻璃界面",roomTheme:"mist",aliases:["晴空"]}],qn=["windowsill","tape"];function Ve(t){const e=String(t||"").trim();return e&&pe.find(o=>o.key===e||o.name===e||o.aliases.includes(e))?.key||"default"}function Dn(t){const e=Ve(t);return pe.find(a=>a.key===e)||pe[0]}function Be(t){return Ve(t?.chatTheme||t?.bubbleTheme)}function ze(t){return Dn(t).name}const Rn=1500,He=8e3;function On(t){return t?t.replace(/<tool_call>[\s\S]*?<\/tool_call>/g,"").replace(/<tool_call>[\s\S]*$/,"").replace(/<\/?(thead|tbody|tr|td|th|table|tool|function|call)[^>]*>/gi,"").replace(/<[^>\n]{1,80}>/g,"").replace(/\n{3,}/g,`

`).trim():""}function wt(t){return t==null?"":typeof t=="string"?t:typeof t=="number"||typeof t=="boolean"?String(t):""}function Ne(t,e="",a=""){const o=On(wt(t));if(!o)return"";const i=o.replace(/\s+/g," ").trim(),r=wt(e).replace(/\s+/g," ").trim(),s=wt(a).replace(/\s+/g," ").trim();return!i||r&&(i===r||r.includes(i)&&i.length>=8)||s&&(s.includes(i)||s.slice(Math.max(0,s.length-i.length-12)).includes(i))?"":o}function je(t="",e=""){const a=wt(t),o=wt(e);return o?a?/[\s\n]$/.test(a)||/^[\s\n，。！？、；：,.!?;:）】》]/.test(o)?a+o:/[\x00-\x7F]$/.test(a)||/^[\x00-\x7F]/.test(o)?`${a} ${o}`:a+o:o:a}function Vn(){return new Promise(t=>requestAnimationFrame(t))}function eo(t,e,a){const o=y()?.querySelector(`.message-row[data-msg-id="${t}"]`);if(!o)return;const i=o.querySelector(".message-text");if(i&&(i.textContent=e),a){lo(t,a);const r=o.querySelector(`#thinking-${t}`);if(r&&r.closest(".cot-wrapper")){r.textContent=Kt(a),r.classList.add("open","thinking-active"),r.setAttribute("aria-hidden","false");const s=o.querySelector(`#cot-wrapper-${t}`);s&&s.removeAttribute("data-slow")}n.openThinkingIds[t]=!0}}function Kt(t){const e=On(t);return e?e.length<=Rn?e:`（已截断，共 ${e.length} 字）
${e.slice(-Rn)}`:""}const no='<svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',ao='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',oo='<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',io='<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',ro='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';function so(t){const e=String(t||"").toLowerCase();return/time|clock|date/.test(e)?ao:/view|read|file|diary|memory|search/.test(e)?oo:no}function co(t){const e=!!t.streaming,a=e?"tl-active":"tl-done",o=e?Kt(t.thinking):t.thinking||"",r=(o||"").replace(/\s+/g," ").trim()||"思考中…",s=r.length>36?r.slice(0,36)+"…":r;return`
        <div class="thinking-line ${a}" id="tl-line-${t.id}" data-action="toggle-thinking-line" data-id="${t.id}">
          <div class="thinking-dot"></div>
          <div class="thinking-text-wrap">
            <span class="thinking-text" id="tl-text-${t.id}">${d(s)}</span>
            <div class="thinking-heart">${io}</div>
            <div class="thinking-fade"></div>
          </div>
          <div class="thinking-expand">${ro}</div>
        </div>
        <div class="thinking-full" id="tl-full-${t.id}">
          <div class="thinking-full-inner" id="thinking-${t.id}">${d(o)}</div>
        </div>`}function uo(t=[]){return t.length?`<div class="tool-lines-wrap">${t.map(a=>{const o=a.status==="running"?"tl-active":"tl-done",i=`${a.name} → ${a.status==="running"?"调用中…":"完成"}`;return`
          <div class="tool-line ${o}">
            <div class="tool-dot"></div>
            <div class="tool-icon">${so(a.name)}</div>
            <span class="tool-text">${d(i)}</span>
          </div>`}).join("")}</div>`:""}function lo(t,e,a){const o=y()?.querySelector(`#tl-text-${t}`),i=y()?.querySelector(`#thinking-${t}`),r=y()?.querySelector(`#tl-line-${t}`),c=(e||"").replace(/\s+/g," ").trim()||"思考中…",l=c.length>36?c.slice(0,36)+"…":c;o&&(o.textContent=l),i&&(i.textContent=Kt(e)),r&&(r.classList.add("tl-active"),r.classList.remove("tl-done"))}const Bn=t=>new Promise(e=>window.setTimeout(e,t));function zn(t){const e=String(t||"").replace(/\r\n/g,`
`).trim();if(!e)return[];const o=e.replace(/[ \t]+\n/g,`
`).replace(/\n{3,}/g,`

`).split(/\n{2,}/).map(c=>String(c||"").trim()).filter(Boolean),i=[],r=c=>{const l=String(c||"").trim();if(l){if(i.length&&l.length<=4){i[i.length-1]+=l;return}i.push(l)}},s=c=>{const l=String(c||"").split(new RegExp("(?<=[。！？!?…])\\s*","u")).map(m=>m.trim()).filter(Boolean);if(l.length<=1){r(c);return}let p="";l.forEach(m=>{const f=p?`${p}${m}`:m;p&&f.length>90?(r(p),p=m):p=f}),r(p)};return o.forEach(c=>{const l=/[。！？!?…]\s*/u.test(c);c.length<=64||!l?r(c):s(c)}),i.filter(Boolean)}function po(t){const e=String(t||"").replace(/\r\n/g,`
`).trim();return!e||!e.includes(`
`)?e:e.split(/\n{2,}/).map(a=>{const o=a.split(`
`).map(r=>r.trim()).filter(Boolean);if(o.length<=1)return a.trim();const i=o.join("");return i.length<=32||o.every(r=>r.length<=8)?i:o.join(`
`)}).join(`

`)}function mo(t){const e=String(t||"").trim().length;return e<=10?300+Math.floor(Math.random()*201):e<=24?600+Math.floor(Math.random()*301):900+Math.floor(Math.random()*301)}function Dt(){n.assistantPlayback.token="",n.assistantPlayback.timer&&(window.clearTimeout(n.assistantPlayback.timer),n.assistantPlayback.timer=null)}async function Hn(t,e,a={}){const o=Array.isArray(e)?e.filter(s=>String(s||"").trim()):[];if(!t||!o.length)return;Dt();const i=`reply_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;n.assistantPlayback.token=i;const r=Number.isInteger(a.startIndex)?a.startIndex:t.messages.length;for(let s=0;s<o.length;s+=1){if(n.assistantPlayback.token!==i)return;const c={id:`ai_chunk_${Date.now()}_${s}_${Math.random().toString(36).slice(2,6)}`,role:"ai",text:o[s],content:o[s],time:L(),created_at:new Date().toISOString()};if(s===0&&(a.thinking&&(c.thinking=a.thinking),a.toolCalls&&(c.toolCalls=a.toolCalls)),s===0&&a.replaceId){const l=t.messages.findIndex(p=>p.id===a.replaceId);l!==-1?t.messages[l]=c:t.messages.splice(Math.min(r,t.messages.length),0,c)}else{const l=Math.min(r+s,t.messages.length);t.messages.splice(l,0,c)}if(t.lastMessage=c.text,t.lastTime=c.time,u(),j(),s>=o.length-1)break;await new Promise(l=>{n.assistantPlayback.timer=window.setTimeout(l,mo(o[s]))}),n.assistantPlayback.timer=null}n.assistantPlayback.token===i&&(n.assistantPlayback.token="",n.assistantPlayback.timer=null),k(120)}function Rt(t){const e=t&&typeof t=="object"?t:{},a=i=>Array.isArray(i)?i.map(r=>String(r||"").trim()).filter(Boolean):[],o=i=>i!=null&&String(i).trim()?String(i).trim():null;return{recent_topics:a(e.recent_topics),current_mood:String(e.current_mood||"").trim(),open_loops:a(e.open_loops),proactive_cooldown_until:e.proactive_cooldown_until?String(e.proactive_cooldown_until):null,impression:o(e.impression),relationshipProgress:o(e.relationship_progress??e.relationshipProgress),likesSummary:o(e.likes_summary??e.likesSummary),summaryUpdatedAt:o(e.summary_updated_at??e.summaryUpdatedAt),updated_at:String(e.updated_at||"").trim()}}function fo(){const t=Rt(n.companionState);return t.current_mood?`情绪：${t.current_mood}`:t.open_loops[0]?`进行中：${t.open_loops[0]}`:t.recent_topics[0]?`最近话题：${t.recent_topics[0]}`:"暂无状态"}function St(){if(n.momentsActorType==="agent"){const t=Q();return{author_type:"agent",author_id:t?.id||n.currentContactId||"default",author_name:t?.name||"当前角色",avatar:t?.avatar||""}}return{author_type:"user",author_id:"me",author_name:n.accountProfile?.nickname||"我",avatar:n.accountProfile?.avatar||"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80"}}function P(t={}){const e=Array.isArray(t.likes)?t.likes:[],a=Array.isArray(t.comments)?t.comments:[],o=String(t.author_type||(t.contactId==="me"?"user":"agent")),i=String(t.author_id||(o==="user"?"me":t.contactId||"default"));return{id:String(t.id||`p${Date.now()}`),author_type:o,author_id:i,content:String(t.content||""),image:String(t.image||""),mood:String(t.mood||""),time:String(t.time||""),created_at:String(t.created_at||""),updated_at:String(t.updated_at||""),likes:e.map(r=>typeof r=="string"?{author_type:"user",author_id:r==="我"?"me":r,author_name:r}:{author_type:String(r?.author_type||"user"),author_id:String(r?.author_id||"me"),author_name:String(r?.author_name||"")}),comments:a.map(r=>({author_type:String(r?.author_type||"user"),author_id:String(r?.author_id||"me"),author_name:String(r?.author_name||r?.author||""),text:String(r?.text||"")}))}}function Nn(t){const e=P(t);if(e.author_type==="agent"){const a=b(e.author_id);return{name:a?.name||e.author_id||"角色",avatar:a?.avatar||""}}return{name:n.accountProfile?.nickname||"我",avatar:n.accountProfile?.avatar||"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80"}}function jn(t){const e=P(t);return e.author_type==="user"?e.author_id==="me":e.author_id===(n.currentContactId||Q()?.id||"default")}function Fn(t=[]){return t.map(e=>e.author_name||(e.author_type==="user"?"我":b(e.author_id)?.name||e.author_id)).join("、")}function go(t,e,a){const o=b(n.currentContactId);o&&(o[t]=e,n.toast=a,u(),k(120),window.setTimeout(()=>{n.toast="",u()},1200))}function ho(t){const e=String(t).toLowerCase();return["health","heart"].includes(e)?"health":["calendar","schedule","date"].includes(e)?"calendar":["weather","cloud"].includes(e)?"weather":["file","files","doc","document"].includes(e)?"file":["quote","reply"].includes(e)?"quote":(["more","tool","tools"].includes(e),"more")}const Fe={get_current_time:"时间",get_weather:"天气",get_health_summary:"健康",web_search:"搜索",fetch_url:"网页",add_todo:"待办",list_todos:"待办列表",complete_todo:"完成待办",add_note:"便签",list_notes:"便签列表"},Un=new Set(["get_current_time","get_weather","get_health_summary","web_search","fetch_url","add_todo","list_todos","complete_todo","add_note","list_notes"]);function $t(t){return Un.has(String(t||"").trim())}function ft(t,e){if(typeof t=="string"){const r=String(t||`mcp_${e}`);return{id:r,label:Fe[r]||t||`工具${e+1}`,icon:"more",prompt:"",mcpToolId:$t(r)?r:"",enabled:!0}}const a=t?.id||t?.toolId||t?.name||`mcp_${e}`,o=String(a),i=Fe[o]||t?.label||t?.name||t?.title||`工具${e+1}`;return{id:o,label:String(i),icon:ho(t?.icon||t?.type||t?.category||"more"),prompt:String(t?.prompt||t?.message||""),mcpToolId:String(t?.mcpToolId||t?.toolId||($t(o)?o:"")),enabled:t?.enabled!==!1}}function Kn(){const e=z()?.mcpLibrary?.tools;if(!Array.isArray(e)||!e.length)return de;const a=e.map(ft).filter(o=>$t(o.id)).filter(o=>o.enabled!==!1);return a.length?a:de}function Q(){return b(n.currentContactId)||n.contacts[0]}function kt(t){return t?.settings?(!Array.isArray(t.settings.quickActions)||!t.settings.quickActions.length?t.settings.quickActions=Kn().map((e,a)=>({...ft(e,a)})):t.settings.quickActions=t.settings.quickActions.map((e,a)=>ft(e,a)),t.settings.quickActions):[]}function Ue(t=Q()){const e=kt(t).filter(a=>a.enabled!==!1);return e.length?e:Kn()}function g(t){const e='viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"',a={back:`<svg ${e}><path d="M15 18l-6-6 6-6"/></svg>`,plus:`<svg ${e}><path d="M12 5v14M5 12h14"/></svg>`,search:`<svg ${e}><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg>`,history:`<svg ${e}><path d="M3 12a9 9 0 101.9-5.6"/><path d="M3 4v4h4"/><path d="M12 7v5l3 2"/></svg>`,settings:`<svg ${e}><path d="M12 3v3M12 18v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M3 12h3M18 12h3M4.9 19.1L7 17M17 7l2.1-2.1"/><circle cx="12" cy="12" r="3.3"/></svg>`,more:`<svg ${e}><circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>`,heart:`<svg ${e}><path d="M12 20.5s-7-4.4-7-10a4 4 0 017-2.5A4 4 0 0119 10.5c0 5.6-7 10-7 10z"/></svg>`,heartFilled:'<svg viewBox="0 0 24 24" fill="#B595C9" stroke="none" stroke-width="0"><path d="M12 20.5s-7-4.4-7-10a4 4 0 017-2.5A4 4 0 0119 10.5c0 5.6-7 10-7 10z"/></svg>',comment:`<svg ${e}><path d="M7 18l-3 2 1-3.8A7.8 7.8 0 014.2 13 7.8 7.8 0 1112 20a8 8 0 01-5-2z"/><path d="M8.5 10.5h7M8.5 13.5h4.5"/></svg>`,chatArrow:`<svg ${e}><path d="M4.8 18.2l.9-3.3A7.5 7.5 0 014.5 11 7.5 7.5 0 1112 18.5a7.4 7.4 0 01-3.6-.9z"/><path d="M10 9l4 3-4 3"/><path d="M14 12H8"/></svg>`,send:`<svg ${e}><path d="M21 3L10 14"/><path d="M21 3l-7 18-4-7-7-4z"/></svg>`,close:`<svg ${e}><path d="M18 6L6 18M6 6l12 12"/></svg>`,camera:`<svg ${e}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,attach:`<svg ${e}><path d="M21 11.5l-8.7 8.7a5 5 0 01-7.1-7.1l9.2-9.2a3.5 3.5 0 015 5L9 19.3a2 2 0 01-2.8-2.8l8.5-8.5"/></svg>`,quote:`<svg ${e}><path d="M9 7H5v5h4v5H4v-5c0-2.8 1.8-5 5-5zM20 7h-4v5h4v5h-5v-5c0-2.8 1.8-5 5-5z"/></svg>`,reroll:`<svg ${e}><path d="M20 11a8 8 0 10-2.3 5.7"/><path d="M20 4v7h-7"/></svg>`,cot:`<svg ${e}><path d="M12 4v16M4 12h16"/><path d="M7.5 7.5l9 9M16.5 7.5l-9 9" opacity="0.18"/></svg>`,bubbleHeart:`<svg ${e}><path d="M12 19.3s-5.8-3.5-5.8-8a3.7 3.7 0 016.1-2.8 3.7 3.7 0 015.9 2.8c0 4.5-5.6 8-5.6 8z"/></svg>`,weather:`<svg ${e}><path d="M6 16a4 4 0 010-8 5.5 5.5 0 0110.4-1.8A4 4 0 1118 16H6z"/></svg>`,calendar:`<svg ${e}><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>`,file:`<svg ${e}><path d="M8 3h6l5 5v11a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z"/><path d="M14 3v5h5"/></svg>`,health:`<svg ${e}><path d="M12 20s-6.5-4-6.5-9.2A4.3 4.3 0 0112 7a4.3 4.3 0 016.5 3.8C18.5 16 12 20 12 20z"/><path d="M9.2 12h1.8l1-2.1 1.2 4 1-1.9h1.6"/></svg>`,toggleOff:'<svg viewBox="0 0 52 32" fill="none"><rect x="1.5" y="1.5" width="49" height="29" rx="14.5" fill="rgba(255,255,255,.7)" stroke="rgba(150,122,133,.14)"/><circle cx="16" cy="16" r="11" fill="#fff"/></svg>',toggleOn:'<svg viewBox="0 0 52 32" fill="none"><rect x="1.5" y="1.5" width="49" height="29" rx="14.5" fill="#e9d7ff" stroke="rgba(120,90,150,.14)"/><circle cx="36" cy="16" r="11" fill="#fff"/></svg>',chevron:`<svg ${e}><path d="M9 6l6 6-6 6"/></svg>`,tabChat:`<svg ${e}><path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 2 .6 3.9 1.6 5.4L2 22l4.8-1.3A9.9 9.9 0 0012 22c5.5 0 10-4.5 10-10z"></path></svg>`,tabMoments:`<svg ${e}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,tabSettings:`<svg ${e}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,actionDots:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>',pencil:`<svg ${e}><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`,trash:`<svg ${e}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,stop:'<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="7" y="7" width="10" height="10" rx="2"/></svg>'};return a[t]||a.more}function Qn(){u()}function Ke(t){const e=()=>{const a=y()?.querySelector(".chat-app-body");a&&(a.scrollTop=t)};requestAnimationFrame(()=>{e(),requestAnimationFrame(e),window.setTimeout(e,0)})}function Yn(){const t=y()?.querySelector(".chat-app-body"),e=t?t.scrollTop:0,a=window.scrollY||window.pageYOffset||0;u(),Ke(e),requestAnimationFrame(()=>{window.scrollTo(0,a),requestAnimationFrame(()=>window.scrollTo(0,a))})}function nt(){if(n.currentView==="moments"){Yn();return}u()}function bo(t,e){n.moments=n.moments.map(a=>{const o=P(a);if(o.id!==t)return a;const r=o.likes.some(s=>s.author_type===e.author_type&&s.author_id===e.author_id)?o.likes.filter(s=>!(s.author_type===e.author_type&&s.author_id===e.author_id)):[{author_type:e.author_type,author_id:e.author_id,author_name:e.author_name},...o.likes];return{...o,likes:r}})}function vo(t,e,a){n.moments=n.moments.map(o=>{const i=P(o);return i.id!==t?o:{...i,comments:[{author_type:e.author_type,author_id:e.author_id,author_name:e.author_name,text:a},...i.comments]}})}function Xn(t,e){t&&(t.classList.toggle("on",!!e),t.classList.toggle("off",!e),t.setAttribute("aria-pressed",e?"true":"false"),t.innerHTML=ye(e),t.classList.remove("switch-animating"),t.offsetWidth,t.classList.add("switch-animating"),clearTimeout(t.__switchAnimTimer),t.__switchAnimTimer=setTimeout(()=>t.classList.remove("switch-animating"),260))}function u(){const t=y();if(!t)return;Gn(),["room","rpRoom"].includes(n.currentView)||(n.showAttach=!1),n.currentView!=="moments"&&(n.momentComposerOpen=!1);const e=t.querySelector(".chat-app-body"),a=e?e.scrollTop:0,o=b(n.currentContactId)||n.contacts[0],i=Be(o),r=n.globalSettings?.theme||"",s=qn.includes(r)?r:i;t.dataset.theme=s,t.removeAttribute("data-bound"),t.innerHTML=`
      <div class="chat-shell ${n.currentView==="rpRoom"?"mode-rp rp-theatre-shell":"mode-normal"}" data-theme="${s}">
        ${Qe()}
        <div class="chat-app-body ${["room","rpRoom"].includes(n.currentView)?"room-layout":""} ${me()?"has-bottom-nav":""}">
          ${Ye()}
        </div>
        ${me()?$o():""}
        ${n.toast?Qo():""}
        ${n.showAttach?ar():""}
        ${n.momentComposerOpen?Uo():""}
        
        ${n.rpRoomDialogOpen?Xo():""}
        ${n.avatarCropper?Yo():""}
      </div>
    `,Li(),j(),Oo(o),["room","rpRoom"].includes(n.currentView)||Ke(a),k(),requestAnimationFrame(()=>{y()?.querySelectorAll(".message-row[data-msg-id]").forEach(c=>{const l=c.dataset.msgId;l&&!n.animatedMsgIds[l]&&(n.animatedMsgIds[l]=!0,c.classList.add("msg-fadein"))})})}function Gn(){if(document.getElementById("rp-theatre-style"))return;const t=document.createElement("style");t.id="rp-theatre-style",t.textContent=`
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
        `,document.head.appendChild(t)}function yo(t){if(Gn(),n.rpCurtainRunning)return Promise.resolve(t?.());n.rpCurtainRunning=!0;const e=document.createElement("div");return e.className="curtain-transition closing",e.innerHTML='<div class="curtain-left"></div><div class="curtain-right"></div>',document.body.appendChild(e),new Promise(a=>{window.setTimeout(async()=>{try{await t?.()}finally{e.className="curtain-transition opening",window.setTimeout(()=>{e.remove(),n.rpCurtainRunning=!1,a()},450)}},420)})}function me(){return["list","moments","settings"].includes(n.currentView)}function Qe(){if(n.currentView==="room")return wo();if(n.currentView==="rpRoom")return So();if(n.currentView==="contactSettings")return st("联系人设置","back-room",!0);if(n.currentView==="cotLog")return st("COT 日志","back-contact-settings",!0);if(n.currentView==="rpLobby")return`
        <header class="chat-page-header simple-header">
          <button class="icon-btn text-btn" data-action="back-rp-source" aria-label="返回">${g("back")}</button>
          <div class="chat-page-title">Mirage 夢幻楼</div>
          <button class="icon-btn ghost-circle" data-action="open-rp-room-create" aria-label="新建房间">${g("plus")}</button>
        </header>
      `;if(n.currentView==="companionStateDetail")return st("当前状态","back-contact-settings",!0);if(n.currentView==="contactImpressionDetail")return st("关于你的印象","back-contact-settings",!0);if(n.currentView==="contactRelationshipDetail")return st("关系进展","back-contact-settings",!0);if(n.currentView==="contactLikesDetail")return st("你喜欢的东西","back-contact-settings",!0);if(n.currentView==="contactRoomBackgroundPicker")return st("聊天背景","back-contact-settings",!0);if(n.currentView==="contactBubbleThemePicker")return st("气泡主题","back-contact-settings",!0);if(n.currentView==="profile")return st("联系人资料","back-room",!0);if(n.currentView==="newContact")return st("添加联系人","back-home",!0);let t="Murmur";n.currentView==="moments"&&(t="Echo"),n.currentView==="settings"&&(t="Veil");const e=n.currentTab==="chats"&&n.currentView==="list";return`
      <header class="chat-page-header">
        <div class="header-left"></div>
        <div class="chat-page-title" style="font-weight: 800; letter-spacing: 0.02em;">${t}</div>
        ${e?`<button class="icon-btn ghost-circle" data-action="new-contact" aria-label="添加联系人">${g("plus")}</button>`:'<span class="header-spacer"></span>'}
      </header>
    `}function st(t,e,a=!1){return`
      <header class="chat-page-header simple-header">
        <button class="icon-btn text-btn" data-action="${e}" aria-label="返回">${g("back")}</button>
        <div class="chat-page-title">${d(t)}</div>
        ${a?'<span class="header-spacer"></span>':""}
      </header>
    `}function wo(){const t=b(n.currentContactId)||n.contacts[0],e=t.settings?.model||n.globalSettings.defaultModel||"gpt-5.4",a=Je(t),o=We(t),i=ge(t),r=he(t),s=a?`<button class="takeover-toggle ${i?"active":""}" data-action="toggle-codex-mode" data-contact-id="${d(t.id)}" type="button" aria-pressed="${i}" aria-label="${i?"关闭 Codex 接管":"启用 Codex 接管"}">Codex</button>`:o?`<button class="takeover-toggle cc ${r?"active":""}" data-action="toggle-cc-mode" data-contact-id="${d(t.id)}" type="button" aria-pressed="${r}" aria-label="${r?"关闭 Claude Code 接管":"启用 Claude Code 接管"}">CC</button>`:"";return`
      <header class="room-hero room-theme-${t.theme}">
        <div class="room-hero-inner">
          <button class="icon-btn icon-circle room-left-btn" data-action="back-list" aria-label="返回列表">${g("back")}</button>
          <div class="room-profile-card" data-action="open-profile">
            <img class="room-profile-avatar" src="${t.avatar}" alt="${d(t.name)}" />
            <div class="room-profile-meta">
              <div class="room-profile-title-line">
                <strong class="room-profile-name">${d(t.name)}</strong>
                <span class="room-profile-model">${d(e)}</span>
              </div>
              <div class="room-profile-sub"><span class="online-dot"></span> 在线</div>
            </div>
          </div>
          <div class="room-actions">
            ${s}
            <button class="icon-btn icon-circle" data-action="open-contact-settings" aria-label="联系人设置">${g("settings")}</button>
          </div>
        </div>
      </header>
    `}function So(){const t=Ge();return`
      <header class="rp-header">
        <button class="header-back" data-action="back-rp-lobby" aria-label="返回">${g("back")}</button>
        <div class="header-info">
          <div class="header-title scene-title-enter">${d(t?.name||"Mirage·幻楼")}</div>
          <div class="header-subtitle">${d(t?.ai_role||"幕间进行中")}</div>
        </div>
        <div class="header-actions">
          <button class="header-action-btn" data-action="rename-rp-room" data-room-id="${d(t?.room_id||"")}" aria-label="编辑">${g("more")}</button>
        </div>
      </header>
    `}function Ye(){return n.currentView==="room"?Bo():n.currentView==="rpLobby"?Zo():n.currentView==="rpRoom"?Go():n.currentView==="moments"?Fo():n.currentView==="settings"?Ze():n.currentView==="contactSettings"?ti():n.currentView==="cotLog"?wi():n.currentView==="companionStateDetail"?ei():n.currentView==="contactImpressionDetail"?tn("关于你的印象","impression",n.companionState.impression):n.currentView==="contactRelationshipDetail"?tn("关系进展","relationshipProgress",n.companionState.relationshipProgress):n.currentView==="contactLikesDetail"?tn("你喜欢的东西","likesSummary",n.companionState.likesSummary):n.currentView==="contactRoomBackgroundPicker"?ni():n.currentView==="contactBubbleThemePicker"?ai():n.currentView==="profile"?ii():n.currentView==="newContact"?oi():ko()}function $o(){return`
      <nav class="bottom-tabbar">
        ${Xe("chats","tabChat","繁语")}
        ${Xe("moments","tabMoments","余响")}
        ${Xe("settings","tabSettings","帷幕")}
      </nav>
    `}function Xe(t,e,a){return`
      <button class="nav-tab-btn ${n.currentTab===t?"active":""}" data-action="switch-tab" data-tab="${t}">
        <div class="nav-tab-icon">${g(e)}</div>
        <span class="nav-tab-label">${d(a)}</span>
      </button>
    `}function ko(){const t=[...n.contacts].sort((e,a)=>a.pinned-e.pinned||0);return`
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
            ${t.map(_o).join("")}
          </div>
        </div>
      </section>
        </div>
    `}function _o(t){const e=String(t.handle||(t.id?`@${t.id}`:"")).trim();return`
      <button type="button" class="chat-list-item" data-action="open-contact" data-contact-id="${t.id}">
        <div class="chat-list-avatar-wrap">
          <img src="${t.avatar}" alt="${d(t.name)}" class="chat-list-avatar" />
          ${t.unread?`<span class="chat-list-badge">${t.unread}</span>`:""}
        </div>
        <div class="chat-list-content">
          <div class="chat-list-head">
            <span class="chat-list-title">
              <strong class="chat-list-name">${d(t.name)}</strong>
              ${e?`<span class="chat-list-handle">${d(e)}</span>`:""}
            </span>
            <time class="chat-list-time">${d(t.lastTime)}</time>
          </div>
          <div class="chat-list-snippet">${d(t.lastMessage)}</div>
        </div>
      </button>
    `}async function Io(t){const e=String(t?.sessionId||"").trim();if(e)try{if((await fetch(`${S}/api/sessions/${encodeURIComponent(e)}`)).ok)return;t.sessionId="",k(120)}catch(a){console.warn("[session] open-contact validation failed",a)}}function Mo(){n.companionState=Rt({})}function xo(t){const e=String(t||"").trim();if(!e)return;Dt?.(),n.streamingAbortController&&n.currentContactId===e&&(n.streamingAbortController.abort(),n.streamingAbortController=null),yt.has(e)&&(clearTimeout(yt.get(e)),yt.delete(e)),n.contacts=n.contacts.filter(i=>i.id!==e),n.activeBubbleToolsId=null,n.quoteMomentId=null,n.quoteMessageId=null,n.contactQuickActionEditorId="",n.quickActionSwipeOpenId="",n.quickActionDragId="",n.quickActionDropHintId="",n.quickActionDropDirection="",n.quickActionReorderPulseId="",n.currentTopicTitle="",n.rpRooms=[],n.currentRpRoomId="",n.currentRpMessages=[];const a=n.contacts[0]||null;(n.currentContactId===e||!b(n.currentContactId))&&(n.currentContactId=a?.id||"",Mo(),n.currentView="list",n.currentTab="chats",n.currentSettingsTab="basic");const o=y()?.querySelector(".chat-input");o&&(o.value="")}async function Co(t){const e=String(t||"").trim();if(!e)return!1;const a=await fetch(`${S}/api/agents/${encodeURIComponent(e)}/safe-delete`,{method:"DELETE"});if(!a.ok){let o=`HTTP ${a.status}`;try{o=(await a.json())?.detail||o}catch{}throw new Error(o)}return!0}function Ot(){return n.currentContactId||n.contacts[0]?.id||"default"}function Ge(){return n.rpRooms.find(t=>t.room_id===n.currentRpRoomId)||null}function fe(){return{name:"",agentId:"",bio:"",avatar:""}}function gt(t){return String(t||"").trim().replace(/^@+/,"").toLowerCase()}const Ao=new Set(["zhansi"]),To=new Set(["azheng"]);function Je(t={}){return[t?.id,t?.agent_id,t?.handle].map(gt).filter(Boolean).some(a=>Ao.has(a))}function ge(t={}){return Je(t)&&!!t?.settings?.codexEnabled}function We(t={}){return[t?.id,t?.agent_id,t?.handle].map(gt).filter(Boolean).some(a=>To.has(a))}function he(t={}){return We(t)&&!!t?.settings?.ccEnabled}function Y(t={}){const e=String(t.id||"").trim()||`c${Date.now()}`,a=Be(t);return{id:e,agent_id:String(t.agent_id||t.id||e),name:String(t.name||e),display_name:String(t.display_name||t.name||e),bio:String(t.bio||"这是新来的联系人"),status:String(t.status||"在线"),handle:String(t.handle||`@${e}`),roleTag:String(t.roleTag||""),theme:na(a),chatTheme:a,bubbleTheme:ze(a),unread:Number(t.unread||0),pinned:!!t.pinned,lastMessage:String(t.lastMessage||""),lastTime:String(t.lastTime||""),avatar:String(t.avatar||"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80"),topics:Array.isArray(t.topics)?t.topics:[],messages:Array.isArray(t.messages)?t.messages:[],settings:{model:"gpt-5.4",modelProviderId:A("chat")?.providerId||"openai",temperature:.7,topP:.9,contextCount:32,thinkBudget:24,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!1,proactiveFrequency:30,memoryEnabled:!0,codexEnabled:!1,ccEnabled:!1,...t.settings||{}}}}function Jn(t){const e=Y(t),a=n.contacts.findIndex(o=>String(o.id||"").toLowerCase()===e.id.toLowerCase());return a>=0?n.contacts[a]={...n.contacts[a],...e}:n.contacts.unshift(e),e}async function Eo(t){try{const e=await fetch(`${S}/api/agents`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({agent_id:t.id,display_name:t.name,avatar:t.avatar||"",description:t.bio||"",source:"murmur",metadata:{from:"murmur_contact"}})});if(e.ok)return!0;let a="";try{const i=await e.json();a=typeof i?.detail=="string"?i.detail:JSON.stringify(i?.detail||i)}catch{}return e.status===409||/already exists|duplicate|23505/i.test(a)?(fetch(`${S}/api/agents/${encodeURIComponent(t.id)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({display_name:t.name,avatar:t.avatar||"",description:t.bio||"",source:"murmur",is_active:!0})}).catch(()=>{}),!0):!1}catch(e){return console.warn("[agents] register contact failed",e),!1}}function Wn(t){return ct(t,{fallback:""})}function ct(t,{fallback:e="",includeYear:a=!1}={}){if(!t)return e;const o=String(t||"").trim();if(!o)return e;const i=new Date(o);if(Number.isNaN(i.getTime()))return o;const r=new Date,s=i.getFullYear()===r.getFullYear(),c=i.toDateString()===r.toDateString(),l=new Date(r);l.setDate(r.getDate()-1);const p=i.toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",hour12:!1});if(c)return`今天 ${p}`;if(i.toDateString()===l.toDateString())return`昨天 ${p}`;const m=a||!s?{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}:{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1};return i.toLocaleString("zh-CN",m).replace(/\//g,"-")}async function be(t=Ot(),{silent:e=!0}={}){try{const a=await fetch(`${S}/api/rp/rooms?agent_id=${encodeURIComponent(t)}`);if(!a.ok)throw new Error(`HTTP ${a.status}`);const o=await a.json();return n.rpRooms=Array.isArray(o.rooms)?o.rooms:[],e||u(),n.rpRooms}catch(a){return console.warn("[rp] load rooms failed",a),e||(n.toast="RP 鎴块棿鍔犺浇澶辫触",u(),window.setTimeout(()=>{n.toast="",u()},1200)),[]}}async function Po(t,{silent:e=!0}={}){if(!t)return[];try{const a=await fetch(`${S}/api/rp/rooms/${encodeURIComponent(t)}/messages`);if(!a.ok)throw new Error(`HTTP ${a.status}`);const o=await a.json(),i=o.room||n.rpRooms.find(s=>s.room_id===t);if(i){const s=n.rpRooms.findIndex(c=>c.room_id===t);s>=0&&(n.rpRooms[s]=i)}const r=(Array.isArray(o.messages)?o.messages:[]).map(s=>({id:s.id,role:s.role==="assistant"?"ai":s.role,text:s.content||"",content:s.content||"",time:Wn(s.timestamp),timestamp:s.timestamp||"",created_at:s.timestamp||""}));return n.currentRpMessages=lt(n.rpMessages?.[t]||[],r).map(F),n.rpMessages={...n.rpMessages||{},[t]:n.currentRpMessages.map(G)},k(120),e||u(),n.currentRpMessages}catch(a){return console.warn("[rp] load messages failed",a),n.currentRpMessages=(n.rpMessages?.[t]||[]).map(F),e||(n.toast="RP 娑堟伅鍔犺浇澶辫触",u(),window.setTimeout(()=>{n.toast="",u()},1200)),[]}}async function Lo(t=n.currentView==="room"?"room":"list",e=Ot()){n.rpBackView=t,n.currentView="rpLobby",n.currentTab="chats",u(),await be(e,{silent:!1})}async function qo(){const t=y()?.querySelector("#rp-room-name")?.value?.trim()||"",e=y()?.querySelector("#rp-room-world")?.value?.trim()||"",a=y()?.querySelector("#rp-room-user-role")?.value?.trim()||"",o=y()?.querySelector("#rp-room-ai-role")?.value?.trim()||"",i={agent_id:Ot(),name:t||"新房间",world_setting:e,user_role:a,ai_role:o},r=n.rpRoomDialogMode==="edit"?n.currentRpRoomId:"",s=r?`${S}/api/rp/rooms/${encodeURIComponent(r)}`:`${S}/api/rp/rooms`,l=await fetch(s,{method:r?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!l.ok)throw new Error(`HTTP ${l.status}`);const m=(await l.json()).room;return n.rpRoomDialogOpen=!1,await be(Ot(),{silent:!0}),m?.room_id&&(n.currentRpRoomId=m.room_id,!r)?(await Zn(m.room_id),m):(u(),m)}async function Zn(t){t&&await yo(async()=>{n.currentRpRoomId=t,n.currentView="rpRoom",n.currentTab="chats",n.showAttach=!1,u(),await Po(t,{silent:!1})})}async function Do(t){if(!t||!window.confirm("删除这个 RP 房间？"))return;const a=await fetch(`${S}/api/rp/rooms/${encodeURIComponent(t)}`,{method:"DELETE"});if(!a.ok)throw new Error(`HTTP ${a.status}`);n.rpRooms=n.rpRooms.filter(o=>o.room_id!==t),n.currentRpRoomId===t&&(n.currentRpRoomId="",n.currentRpMessages=[],n.currentView="rpLobby"),u()}function ta(t){const e=n.contacts.find(a=>a.id===t);e&&(e.unread=0),n.currentContactId=t,n.currentTab="chats",n.currentView="room",n.activeBubbleToolsId=null,u(),e&&Io(e),e&&Wt(t),pt(t),ae(t)}function Ro(t=80){window.setTimeout(()=>{const e=b(n.currentContactId)||n.contacts[0];e?.id&&Wt(e.id,{silent:!1})},t)}function ea(t={}){const e=[t?.id,t?.agent_id,t?.agentId,t?.handle,String(t?.handle||"").replace(/^@+/,"")],a=[];return e.forEach(o=>{const i=String(o||"").trim();i&&(a.push(i),a.push(gt(i)))}),[...new Set(a.filter(Boolean))]}function ve(t={}){const e=n.conversations||{},a=ea(t).flatMap(o=>e[o]||[]);return lt(a,Array.isArray(t.messages)?t.messages:[])}function Oo(t={}){n.currentView!=="room"||!t?.id||ve(t).length||n.historyLoadingContactIds[t.id]||n.historyLoadedContactIds[t.id]||(n.historyLoadingContactIds[t.id]=!0,Wt(t.id).then(e=>{e&&(n.historyLoadedContactIds[t.id]=!0)}).finally(()=>{delete n.historyLoadingContactIds[t.id]}))}function Vo(t){const e=d(t?.label||""),a=t?.icon||"more";return`
      <button type="button" class="action-chip glass-frost" data-action="quick-action" data-id="${d(t?.id||"")}">
        <span class="action-chip-icon">${g(a)}</span>
        <span class="action-chip-label">${e}</span>
      </button>
    `}function Bo(){const t=b(n.currentContactId)||n.contacts[0],e=n.quoteMomentId?Ut(n.quoteMomentId):null,a=n.quoteMessageId?t.messages.find(r=>r.id===n.quoteMessageId):null,o=zo(ve(t)),i=(n.chatAttachments||[]).map(Bt).filter(Boolean);return`
      <section class="room-page room-theme-${t.theme}">
        <div class="messages-panel">
          ${o.map((r,s)=>No(r,t,Ho(o,s))).join("")}
        </div>
        <div class="composer-zone">
          ${a?ri(a,t):e?jo(e):""}
          ${ki(i)}
          <input id="chat-image-input" class="moment-image-input" type="file" accept="image/*" multiple />
          <div class="composer-card">
            <div class="composer-input-wrap">
              <input class="chat-input" placeholder="输入消息..." value="" />
            </div>
            <button class="icon-btn icon-circle soft-mini" data-action="expand-actions" aria-label="附件">${g("attach")}</button>
            ${n.streamingAbortController?`<button class="icon-btn send-round send-stop-active" data-action="fake-send" aria-label="停止">${g("stop")}</button>`:`<button class="icon-btn send-round" data-action="fake-send" aria-label="发送">${g("send")}</button>`}
          </div>
        </div>
      </section>
    `}function zo(t=[]){return lt([],t).map(F).filter(Me)}function Ho(t=[],e=0){const a=t[e]||{},o=t[e-1]||null,i=o?Math.abs(X(a.created_at||a.timestamp)-X(o.created_at||o.timestamp)):0;return{showTime:!o||!ma(o,a)||i>300*1e3}}function No(t,e,a={}){if(!Me(t))return"";if(t.role==="event")return`
      <div class="message-row from-event" data-msg-id="${t.id}">
        <span class="message-event-pill">${d(ht(t))}</span>
      </div>
    `;const o=t.role==="user"?"from-user":"from-ai",i=String(t.source||t.provider||"").toLowerCase(),r=i==="codex",s=i==="claude-code",c=!!e?.settings?.reasoning_visibility,l=t.role==="ai"?`<img class="bubble-avatar" src="${e.avatar}" alt="${d(e.name)}" />`:"",p=t.role==="ai"&&(r||s)?`<span class="message-source-badge ${r?"codex":"claude-code"}">${r?"Codex":"Claude"}</span>`:"",m=t.role==="ai"&&c&&t.thinking&&!t.typing?`<button class="bubble-cot-btn" data-action="toggle-thinking" data-id="${t.id}" aria-label="展开独白">${g("bubbleHeart")}</button>`:"",f=t.role==="ai"&&!t.typing&&!t.streaming?`
        <div class="bubble-bottom-tools ${n.activeBubbleToolsId===t.id?"open":""}">
          <button class="bubble-mini-btn" data-action="reroll-msg" data-id="${t.id}" aria-label="重试">${g("reroll")}</button>
          <button class="bubble-mini-btn" data-action="quote-msg" data-id="${t.id}" aria-label="引用">${g("quote")}</button>
        </div>
      `:"",v=`${t.role==="ai"&&t.streaming&&!t.text?" message-awaiting-text":""}${m?" has-cot":""}`,$=c&&t.thinking?co(t):"",_=t.toolCalls&&t.toolCalls.length?uo(t.toolCalls):"",T=po(ht(t)),x=aa(t),I=_i(x),C=a.showTime&&t.time&&!t.typing,V=x.length||T.length>18||T.includes(`
`)?"block-time":"tail-time",ot=C?`<time class="bubble-time ${V}">${d(t.time)}</time>`:"",R=`
          <div class="message-bubble-wrap">
            ${t.role==="ai"&&p?`<div class="bubble-meta-row">
              ${p}
            </div>`:""}
            <div class="message-bubble ${o}${v}" ${t.role==="ai"?`data-msg-id="${t.id}" data-action="toggle-message-tools" data-id="${t.id}"`:""}>
              ${m}
              ${t.typing||t.streaming&&!t.text?'<div class="typing-dots"><span></span><span></span><span></span></div>':`${I}${T?`<div class="message-text">${d(T)}${V==="tail-time"?ot:""}</div>`:""}${V==="block-time"?ot:""}`}
            </div>
            ${f}
          </div>`,B=t.role==="ai"&&($||_)?`${$}${_}${R}`:`${R}${$}${_}`;return`
      <div class="message-row ${o}" data-msg-id="${t.id}">
        ${l}
        <div class="message-bubble-col">
          ${B}
        </div>
      </div>
    `}function jo(t){const e=b(t.contactId);return`
      <div class="quote-bar glass-frost">
        <span class="quote-mark">${g("quote")}</span>
        <div class="quote-text-wrap">
          <div class="quote-label">引用自 ${d(e?.name||"动态")}</div>
          <div class="quote-text">${d(t.content)}</div>
        </div>
        <button class="icon-btn quote-close" data-action="clear-quote" aria-label="清除引用">${g("more")}</button>
      </div>
    `}function Fo(){const t=Array.isArray(n.moments)?n.moments:[];return b(n.currentContactId)||n.contacts[0],`
      <section class="moments-page white-canvas">
        <div class="moments-cover-area">
          <img src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80" class="moments-cover-img" />
          <div class="moments-cover-gradient"></div>
          <div class="moments-me-info">
            <span class="moments-me-name">我</span>
            <img src="${d(n.accountProfile?.avatar||"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80")}" class="moments-me-avatar" />
          </div>
          <div class="ai-chip-row" style="position:absolute;left:18px;bottom:14px;z-index:2;">
            <button class="ai-chip ${n.momentsActorType==="user"?"active":""}" data-action="set-moments-actor" data-actor-type="user">浠ユ垜</button>
            <button class="ai-chip ${n.momentsActorType==="agent"?"active":""}" data-action="set-moments-actor" data-actor-type="agent">浠?{escapeHtml(currentAgent?.name || '褰撳墠瑙掕壊')}</button>
          </div>
          <button type="button" class="icon-btn cover-camera-btn" data-action="new-moment" aria-label="发朋友圈"><svg viewBox="0 0 24 24" fill="none" aria-hidden="true"><path d="M12 4.6c.86 2.2 1.95 3.49 3.52 4.34 1.27.68 2.62 1 4.55 1.11-.68.18-1.14.32-1.76.58-2.68 1.14-4.23 2.84-5.34 5.96-.25.72-.35 1.04-.55 1.93-.18-.76-.28-1.08-.49-1.73-1.09-3.16-2.65-4.89-5.33-6.11-.71-.32-1.22-.49-2-.67 1.99-.12 3.38-.46 4.65-1.17 1.49-.84 2.53-2.1 3.41-4.24Z" fill="currentColor"/></svg></button>
        </div>
        <div class="moments-feed-wrap">
          ${t.map(Ko).join("")}
        </div>
      </section>
    `}function Uo(){return`
      <div class="moment-composer-overlay" data-action="close-moment-composer"></div>
      <section class="moment-composer-sheet glass-frost">
        <div class="moment-composer-handle"></div>
        <div class="moment-composer-head">
          <strong>${n.momentComposerEditingId?"编辑朋友圈":"发朋友圈"}</strong>
          <button type="button" class="icon-btn ghost-circle moment-composer-close" data-action="close-moment-composer" aria-label="关闭">${g("close")}</button>
        </div>
        <textarea id="moment-content-input" class="ai-textarea new-moment-input" data-action="moment-composer-input" placeholder="这一刻想分享什么？">${d(n.momentComposerText||"")}</textarea>
        ${n.momentComposerImage?`
          <div class="moment-composer-preview">
            <img src="${n.momentComposerImage}" alt="预览" class="moment-composer-preview-image" />
            <div class="moment-composer-preview-meta">
              <span>${d(n.momentComposerImageName||"已添加图片")}</span>
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
    `}function Ko(t){const e=P(t),a=Nn(e),o=jn(e),i=St(),r=e.likes.some(s=>s.author_type===i.author_type&&s.author_id===i.author_id);return`
      <article class="moment-row">
        <img src="${a.avatar}" alt="${d(a.name)}" class="moment-avatar" />
        <div class="moment-content-col">
          <div class="moment-author-name">${d(a.name)}</div>
          <div class="moment-text-body">${d(e.content)}</div>
          ${e.image?`<img src="${e.image}" alt="${d(e.mood||"moment")}" class="moment-inline-image" />`:""}
          
          <div class="moment-footer">
            <time class="moment-time">${d(ct(e.created_at||e.updated_at||e.time,{fallback:e.time||""}))}</time>
            <div class="moment-actions-group">
              <button type="button" class="icon-btn tiny-icon align-center" data-action="like-moment" data-moment-id="${e.id}">${g(r?"heartFilled":"heart")}</button>
              <button type="button" class="icon-btn tiny-icon align-center" data-action="open-comments" data-moment-id="${e.id}">${g("comment")}</button>
              ${o?`
                <div class="moment-action-menu-wrap">
                  <button type="button" class="icon-btn tiny-icon" data-action="toggle-moment-menu" data-moment-id="${e.id}">${g("actionDots")}</button>
                  ${n.activeMenuMomentId===e.id?`
                    <div class="moment-menu-horizontal slide-fade-in liquid-glass">
                      <button type="button" class="icon-btn tiny-icon" data-action="edit-moment" data-moment-id="${e.id}">${g("pencil")}</button>
                      <button type="button" class="icon-btn tiny-icon" data-action="delete-moment" data-moment-id="${e.id}">${g("trash")}</button>
                    </div>
                  `:""}
                </div>
              `:`
                <button type="button" class="icon-btn tiny-icon" data-action="go-chat-with-quote" data-contact-id="${e.author_id}" data-moment-id="${e.id}">${g("quote")}</button>
              `}
            </div>
          </div>
          
          ${e.likes.length>0||e.comments.length>0?`
            <div class="moment-interactions" data-moment-id-panel="${e.id}">
              ${e.likes.length>0?`
                <div class="moment-likes-area">
                  <span class="heart-mini">${g("heartFilled")}</span> <span class="likes-list">${d(Fn(e.likes))}</span>
                </div>
              `:""}
              ${e.comments.length>0?`
                <div class="moment-comments-area">
                  ${e.comments.map(s=>`<div class="moment-comment-line"><span class="comment-author">${d(s.author_name||s.author||"")}</span>: <span class="comment-text">${d(s.text)}</span></div>`).join("")}
                </div>
              `:""}
            </div>
          `:""}
          
          <div class="moment-inline-comment ${n.commentSheetMomentId===t.id?"open":""}">
            <input class="moment-comment-input" data-comment-input="${t.id}" placeholder="写下你的评论" />
            <button type="button" class="icon-btn send-round mini-send" data-action="submit-comment" data-moment-id="${t.id}">${g("send")}</button>
          </div>
        </div>
      </article>
    `}function Qo(){return`<div class="app-toast glass-frost">${d(n.toast)}</div>`}function Yo(){const t=n.avatarCropper||{},e=it(t.x),a=it(t.y),o=Qt(t.zoom);return`
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
                src="${d(t.src||"")}"
                alt="头像预览"
                draggable="false"
                style="object-position:${e}% ${a}%; transform:scale(${o});"
              />
            </div>
            <div class="avatar-cropper-controls">
              <label><span>左右</span><input type="range" min="0" max="100" step="1" value="${e}" data-action="avatar-cropper-range" data-key="x" /></label>
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
    `}function Xo(){const t=n.rpRoomDialogMode==="edit",e=n.rpRoomForm||{};return`
      <div class="topic-confirm-overlay" data-action="close-rp-room-dialog">
        <section class="topic-confirm-card glass-frost rp-room-dialog-card" data-rp-room-dialog="card" role="dialog" aria-modal="true" aria-label="${t?"编辑房间":"新建房间"}">
          <h4>幕间</h4>
          <div class="rp-room-dialog-fields">
              <input id="rp-room-name" class="ai-input" placeholder="剧本" value="${d(e.name||"")}" />
              <textarea id="rp-room-world" class="ai-textarea persona-textarea" rows="3" placeholder="世界观">${d(e.world_setting||"")}</textarea>
              <input id="rp-room-user-role" class="ai-input" placeholder="你的角色" value="${d(e.user_role||"")}" />
              <input id="rp-room-ai-role" class="ai-input" placeholder="AI 角色" value="${d(e.ai_role||"")}" />
          </div>
          <div class="topic-confirm-actions rp-room-dialog-actions">
            <button class="ghost-action rp-room-dialog-btn" type="button" data-action="close-rp-room-dialog">取消</button>
            <button class="bottom-tab active rp-room-dialog-btn" type="button" data-action="save-rp-room">入梦</button>
          </div>
        </section>
      </div>
    `}function Go(){const t=b(n.currentContactId)||n.contacts[0],e=Ge(),a=e?`${e.world_setting||"未设定"} · 你：${e.user_role||"未设定"} · TA：${e.ai_role||"未设定"}`:"房间设定载入中";return`
      <section class="rp-room-stage">
        <div class="world-hint">
            <span class="world-hint-icon">✦</span>
            <span>${d(a)}</span>
        </div>
        <div class="messages-area">
          ${n.currentRpMessages.map(o=>Jo(o,t)).join("")}
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
    `}function Jo(t,e){const a=t.role==="user",o=a&&n.accountProfile?.avatar||e.avatar;return`
      <div class="msg-row ${a?"from-user":""}" data-msg-id="${d(t.id||"")}">
        <img class="msg-avatar" src="${d(o)}" alt="${d(a?n.accountProfile?.nickname||"我":e.name)}">
        <div class="msg-bubble ${a?"user":"ai"}">
          ${t.typing||t.streaming&&!t.text?'<div class="typing-dots"><span></span><span></span><span></span></div>':Wo(t.text||"")}
        </div>
      </div>
    `}function Wo(t){const e=String(t||"");return e.trim()?e.split(/(\[[\s\S]*?\]|［[\s\S]*?］)/g).filter(Boolean).map(o=>`<span class="${/^\s*(\[|［)/.test(o)?"rp-action":"rp-dialogue"}">${d(o)}</span>`).join(""):""}function Zo(){return`
      <section class="topics-page page-block">
        <div class="settings-group glass-frost ai-panel topic-history-group">
          ${n.rpRooms.length?n.rpRooms.map(t=>`
            <div class="topic-row" style="align-items:center;min-height:54px;padding:10px 0;">
              <button type="button" class="topic-copy" data-action="open-rp-room" data-room-id="${d(t.room_id)}" style="background:none;border:none;padding:0;text-align:left;flex:1;cursor:pointer;min-width:0;">
                <strong style="font-size:14px;color:rgba(92,76,84,.78);font-weight:700;">${d(t.name||"未命名")}</strong>
                <p style="font-size:11px;color:rgba(120,100,110,.55);">${d(Wn(t.last_active_at)||"刚创建")}</p>
              </button>
              <div style="display:flex;gap:6px;align-items:center;flex-shrink:0;position:relative;z-index:2;">
                <button type="button" class="icon-btn soft-mini" data-action="rename-rp-room" data-room-id="${d(t.room_id)}" aria-label="重命名" style="width:34px;height:34px;"><span style="display:inline-flex;transform:scale(.7);">${g("pencil")}</span></button>
                <button type="button" class="icon-btn soft-mini" data-action="delete-rp-room" data-room-id="${d(t.room_id)}" aria-label="删除" style="width:34px;height:34px;"><span style="display:inline-flex;transform:scale(.7);">${g("trash")}</span></button>
                <button type="button" class="icon-btn soft-mini" data-action="open-rp-room" data-room-id="${d(t.room_id)}" aria-label="进入" style="width:34px;height:34px;"><span style="display:inline-flex;transform:scale(.7);">${g("chevron")}</span></button>
              </div>
            </div>
          `).join(""):'<div class="topic-row"><div class="topic-copy"><strong style="font-size:14px;color:rgba(92,76,84,.78);font-weight:700;">还没有房间</strong><p style="font-size:11px;color:rgba(120,100,110,.55);">点右上角加号，开一个幕间。</p></div></div>'}
        </div>
      </section>
    `}function Ze(){const t=n.globalSettings;return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel">
          <button class="profile-settings-row" data-action="open-account-settings">
            <img class="profile-settings-avatar" src="${d(n.accountProfile.avatar||"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80")}" alt="me" />
            <div>
              <strong>我的账号</strong>
              <p style="font-size:12px; color:rgba(120,100,110,0.7);">管理个人资料与基础偏好</p>
            </div>
            <span class="row-chevron" style="margin-left:auto">${g("chevron")}</span>
          </button>
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>通用设置</h3>
          ${M("主题模式",t.theme,"open-theme-settings")}
          ${ut("消息通知","控制应用消息提醒",t.notifications,"toggle-global","notifications")}
          ${ut("朋友圈提醒","控制动态更新提醒",t.momentsNotify,"toggle-global","momentsNotify")}
          ${ut("自动滚动","新消息到达时自动滚动到底部",t.autoScroll,"toggle-global","autoScroll")}
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>聊天与 AI</h3>
          ${ut("主动发送消息","允许 AI 在合适时机主动开启对话",t.proactiveGlobal||!1,"toggle-global","proactiveGlobal")}
          ${ut("意识循环开关","控制后台意识循环能力",t.consciousnessLoop||!1,"toggle-global","consciousnessLoop")}
          ${M("AI 接口",`${t.provider||"OpenAI"} / ${t.defaultModel||"gpt-5.4"}`,"open-ai-interface")}
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>数据与存储</h3>
          ${M("记忆服务","Supabase / 向量记忆","open-memory-service")}
          ${M("同步后端","Supabase 配置","open-backend-sync")}
          ${M("导出格式",t.exportFormat||"json","open-export-settings")}
        </div>
      </section>
    `}function ti(){const t=b(n.currentContactId)||n.contacts[0],e=t.settings;return`
      <section class="contact-settings-page page-block">
        <div class="settings-tabs glass-frost">
          ${we("basic","资料")}
          ${we("model","模型")}
          ${we("actions","快捷动作")}
          ${we("memory","记忆")}
        </div>

        ${n.currentSettingsTab==="basic"?`
          <div class="settings-group glass-frost ai-panel">
            <h3>联系人资料</h3>
            <button class="setting-row nav-row contact-avatar-row" data-action="open-contact-avatar">
              <img class="contact-settings-avatar-preview" src="${d(t.avatar)}" alt="${d(t.name)}" />
              <div class="setting-copy">
                <strong>头像</strong>
                <p>点击更换头像</p>
              </div>
              <span class="row-chevron">${g("chevron")}</span>
            </button>
            ${M("昵称",t.name,"open-contact-name")}
            ${M("简介",t.bio,"open-contact-bio")}
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
            ${M("聊天背景",t.roomBackground||"点阵","open-contact-room-background")}
            ${M("气泡主题",ze(t.chatTheme||t.bubbleTheme),"open-contact-bubble-theme")}
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
            ${M("聊天模型",e.model||"未设置","open-model-slot",{slot:"chat",context:"contact"})}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>角色设定</h3>
            <button class="setting-row nav-row persona-collapse-toggle" data-action="toggle-contact-persona" aria-expanded="${n.contactPersonaExpanded?"true":"false"}">
              <div class="setting-copy">
                <strong>${n.contactPersonaExpanded?"收起角色设定":"展开角色设定"}</strong>
              </div>
              <span class="row-chevron advanced-chevron ${n.contactPersonaExpanded?"open":""}">${g("chevron")}</span>
            </button>
                <textarea class="ai-textarea persona-textarea contact-persona-textarea ${n.contactPersonaExpanded?"expanded":"collapsed"}" data-contact-field="persona" rows="${n.contactPersonaExpanded?"10":"3"}" placeholder="在这里输入 AI 的人设、角色说明、行为指令。">${d(t.persona||"")}</textarea>
            ${ut("显示推理内容","仅在模型返回推理内容时显示",e.reasoning_visibility||!1,"toggle-contact","reasoning_visibility")}
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
              ${Vt("Temperature","temperature",e.temperature,0,2,.01)}
              ${Vt("Top P","topP",e.topP,0,1,.01)}
              ${Vt("上下文消息数量","contextCount",e.contextCount,1,256,1)}
            </div>
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>主动消息</h3>
            ${ut("启用主动消息","AI 在静默时主动发起对话",e.proactiveEnabled,"toggle-contact","proactiveEnabled")}
            ${e.proactiveEnabled?`
              ${Vt("发送频率（分钟）","proactiveFrequency",e.proactiveFrequency,5,240,5)}
              ${Vt("静默时长（分钟）","silenceDuration",e.silenceDuration||30,5,120,5)}
              ${M("免打扰时间段",e.dndRange||"23:00 — 08:00")}
            `:""}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>意识循环</h3>
            ${ut("启用意识循环","AI 在后台自主思考与感知",e.consciousnessLoop||!1,"toggle-contact","consciousnessLoop")}
            ${e.consciousnessLoop?`
              ${M("循环模型",e.loopModel||"未设置","open-model-slot",{slot:"consciousness",context:"contact"})}
              ${Vt("循环间隔（分钟）","loopInterval",e.loopInterval||60,10,360,10)}
            `:""}
          </div>
        `:""}

        ${n.currentSettingsTab==="actions"?`
          <div class="settings-group glass-frost ai-panel">
            <h3>快捷动作</h3>
            <p style="font-size:12px;color:rgba(120,100,110,0.7);margin:0 0 8px;">点击条目可修改文案与 MCP，默认长按拖动排序，左滑显示删除。</p>
            <div class="quick-action-list ${n.quickActionDragId?"drag-active":""}">
              ${Ue(t).map((a,o)=>`
                <div class="quick-action-swipe ${n.quickActionSwipeOpenId===a.id?"swiped":""} ${n.quickActionDropHintId===a.id?"reorder-target":""} ${n.quickActionDropHintId===a.id&&n.quickActionDropDirection==="down"?"drop-down":""} ${n.quickActionDropHintId===a.id&&n.quickActionDropDirection==="up"?"drop-up":""} ${n.quickActionReorderPulseId===a.id?"reorder-pulse":""}" data-quick-id="${d(a.id)}">
                  <button type="button" class="quick-action-delete" data-action="delete-contact-quick-action" data-quick-id="${d(a.id)}">删除</button>
                  <div class="quick-action-row" data-quick-id="${d(a.id)}" data-quick-index="${o}">
                    <span class="quick-action-emoji">${a.icon==="health"?"♥":["schedule","calendar"].includes(a.icon)?"日":a.icon==="weather"?"云":["file","files"].includes(a.icon)?"文":"✦"}</span>
                    <div class="quick-action-copy">
                      <strong>${d(a.label)}</strong>
                      <p>${d(a.prompt||"未设置默认发送话术")}</p>
                    </div>
                    <button type="button" class="quick-action-open" data-action="edit-contact-quick-action" data-quick-id="${d(a.id)}" aria-label="编辑快捷动作">${g("chevron")}</button>
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
            ${ut("启用长期记忆","允许存储长期偏好与记忆",e.memoryEnabled,"toggle-contact","memoryEnabled")}
            ${M("当前状态",fo(),"open-companion-state")}
            ${M("前往记忆库","查看与管理这位联系人的记忆","open-memory-service")}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>活动日志</h3>
            ${M("打开活动日志","主动消息 / 工具调用 / 留言小纸条","open-cot-log")}
          </div>
        `:""}
        ${n.contactQuickActionEditorId?ci(t,n.contactQuickActionEditorId):""}
      </section>
    `}function ei(){const t=Rt(n.companionState),e=t.recent_topics.length?t.recent_topics.join(" / "):"还没有东西",a=t.current_mood||"还没有东西",o=t.open_loops.length?t.open_loops.join(" / "):"还没有东西",i=ct(t.proactive_cooldown_until,{fallback:t.proactive_cooldown_until||"还没有东西"}),r=ct(t.updated_at,{fallback:t.updated_at||"还没有东西"});return`
      <section class="topics-page page-block">
        <div class="settings-group glass-frost ai-panel topic-detail-card">
          <h3>当前状态</h3>
          <div class="theme-choice-list">
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>最近话题</strong>
                <em>${d(e)}</em>
              </span>
            </div>
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>当前情绪</strong>
                <em>${d(a)}</em>
              </span>
            </div>
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>进行中的事</strong>
                <em>${d(o)}</em>
              </span>
            </div>
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>主动消息冷却</strong>
                <em>${d(i)}</em>
              </span>
            </div>
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>最后更新时间</strong>
                <em>${d(r)}</em>
              </span>
            </div>
          </div>
        </div>
      </section>
    `}function tn(t,e,a){const o=Rt(n.companionState),i=a||"",s={impression:"还没有印象摘要，AI 对话后可手动填写或由模型生成。",relationshipProgress:"还没有关系进展记录，可以写亲密度、互动频次、关键事件。",likesSummary:"还没有喜好摘要，可以写兴趣爱好、常聊话题、点单偏好。"}[e]||"还没有内容。",c=ct(o.summaryUpdatedAt,{fallback:o.summaryUpdatedAt||""});return`
      <section class="topics-page page-block">
        <div class="settings-group glass-frost ai-panel topic-detail-card insight-editor-card">
          <textarea
            class="ai-textarea insight-editor-textarea"
            data-field="${e}"
            placeholder="${s}"
            rows="7"
          >${d(i)}</textarea>
          <div class="insight-editor-footer">
            ${c?`<span class="insight-updated-at">更新于 ${d(c)}</span>`:""}
            <button class="prov-save-btn-main" data-action="save-insight-field" data-field="${e}" type="button">保存</button>
          </div>
        </div>
      </section>
    `}function na(t){return Dn(t).roomTheme||"rose"}function ni(){const e=(b(n.currentContactId)||n.contacts[0])?.roomBackground||"点阵";return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>聊天背景</h3>
          <p class="section-eyebrow">选择一个预设背景风格。</p>
          <div class="theme-choice-list">
            ${[{id:"点阵",desc:"当前聊天页的轻点阵背景"},{id:"小花",desc:"更软一点的装饰纹样"},{id:"云彩",desc:"偏轻雾感的背景层次"}].map(o=>`
              <button class="theme-choice-item ${e===o.id?"active":""}" data-action="pick-contact-room-background" data-value="${d(o.id)}">
                <span class="theme-choice-copy">
                  <strong>${d(o.id)}</strong>
                  <em>${d(o.desc)}</em>
                </span>
                <span class="theme-choice-check">${e===o.id?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `}function ai(){const t=b(n.currentContactId)||n.contacts[0],e=Be(t);return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>气泡主题</h3>
          <p class="section-eyebrow">选择一个聊天 UI 主题。</p>
          <div class="theme-choice-list">
            ${pe.map(o=>`
              <button class="theme-choice-item ${e===o.key?"active":""}" data-action="pick-contact-bubble-theme" data-value="${d(o.key)}">
                <span class="theme-choice-copy">
                  <strong>${d(o.name)}</strong>
                  <em>${d(o.desc)}</em>
                </span>
                <span class="theme-choice-check">${e===o.key?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `}function oi(){const t=n.newContactDraft||{};return`
      <section class="new-contact-page page-block">
        <div class="settings-group glass-frost ai-panel new-contact-card">
          <div class="new-contact-field">
            <label>头像</label>
            <div class="new-contact-avatar-box">
              <img class="new-contact-avatar-preview" src="${t.avatar||n.newContactAvatar||"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80"}" alt="新联系人头像" />
              <button class="bottom-tab" data-action="pick-new-contact-avatar" type="button" style="margin-top:10px;">从相册选择</button>
              <input id="nc-avatar-file" class="moment-image-input" type="file" accept="image/*" />
            </div>
          </div>
          <div class="new-contact-field">
            <label for="nc-name">昵称</label>
            <input id="nc-name" class="ai-input" placeholder="新联系人称呼" value="${d(t.name||"")}" />
          </div>
          <div class="new-contact-field">
            <label for="nc-agent-id">Agent ID</label>
            <input id="nc-agent-id" class="ai-input" placeholder="ayan" inputmode="latin" autocomplete="off" value="${d(t.agentId||"")}" />
          </div>
          <div class="new-contact-field">
            <label for="nc-bio">联系人简介</label>
            <input id="nc-bio" class="ai-input" placeholder="一句简短的描述" value="${d(t.bio||"")}" />
          </div>
          <button class="bottom-tab active new-contact-submit" data-action="save-new-contact">保存并添加联系人</button>
        </div>
      </section>
    `}function ii(){const t=b(n.currentContactId)||n.contacts[0],e=t.settings?.model||n.globalSettings.defaultModel||"gpt-5.4",a=Number(t.messageCount||t.messages?.length||0);return`
      <section class="profile-page page-block">
        <div class="profile-card glass-frost room-theme-${d(t.theme||"rose")}">
          <div class="profile-aura" aria-hidden="true"></div>
          <div class="profile-portrait">
            <img class="profile-avatar-large" src="${t.avatar}" alt="${d(t.name)}" />
            <span class="profile-online-dot"></span>
          </div>
          <div class="profile-main-copy">
            <strong class="profile-name">${d(t.name)}</strong>
            <span class="profile-handle">${d(t.handle)}</span>
            <p class="profile-bio">${d(t.bio||"还没有简介。")}</p>
          </div>
          <div class="profile-info-grid">
            <div class="profile-info-item">
              <span>当前状态</span>
              <strong>${d(t.status||"在线")}</strong>
            </div>
            <div class="profile-info-item">
              <span>使用模型</span>
              <strong>${d(e)}</strong>
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
    `}function ye(t){return`
      <span class="switch-track" aria-hidden="true">
        <span class="switch-sheen"></span>
        <span class="switch-thumb ${t?"on":"off"}"></span>
      </span>
    `}function ri(t,e){return`
      <div class="quote-bar glass-frost">
        <span class="quote-mark">${g("quote")}</span>
        <div class="quote-text-wrap">
          <div class="quote-label">引用自 ${d(e?.name||"对话")}</div>
          <div class="quote-text">${d(t.text||"")}</div>
        </div>
        <button class="icon-btn quote-close" data-action="clear-quote" aria-label="清除引用">${g("more")}</button>
      </div>
    `}function ut(t,e,a,o,i){return`
      <div class="setting-row switch-row">
        <div class="setting-copy"><strong>${d(t)}</strong><p>${d(e)}</p></div>
        <button class="switch-btn ${a?"on":"off"}" data-action="${o}" data-key="${i}" aria-pressed="${a}">
          ${ye(a)}
        </button>
      </div>
    `}function Vt(t,e,a,o,i,r){const s=Number(a),c=Number.isInteger(r)||r>=1?String(Math.round(s)):s.toFixed(r===.01?2:1);return`
      <div class="setting-row slider-row-block">
        <div class="slider-head"><strong>${d(t)}</strong><span class="slider-value">${c}</span></div>
        <input class="slider-input" type="range" min="${o}" max="${i}" step="${r}" value="${s}" data-action="slide-contact" data-key="${e}" />
      </div>
    `}function we(t,e){return`<button class="settings-tab ${n.currentSettingsTab===t?"active":""}" data-action="switch-settings-tab" data-tab="${t}">${d(e)}</button>`}function si(t,e){const o=kt(t).find(p=>p.id===e);if(!o)return"";const i=(z().mcpLibrary?.tools||[]).map(ft).filter(p=>$t(p.id)),r=i.length?i:[...Un].map(p=>ft({id:p,label:Fe[p]||p},0)),s=o.mcpToolId||"",c=r.find(p=>p.id===s),l=[{id:"",label:"不调用 MCP"},...r];return`
      <div class="qae-fields">
        <div class="qae-field-group">
          <label class="qae-label">名称</label>
        <input id="contact-quick-label" class="ai-input qae-input" value="${d(o.label||"")}" placeholder="例如：天气" autocomplete="off" />
        </div>
        <div class="qae-field-group">
          <label class="qae-label">MCP 调用（可选）</label>
          <input id="contact-quick-mcp" type="hidden" value="${d(s)}" />
          <div class="qae-select-shell ${n.contactQuickMcpMenuOpen?"open":""}">
            <button class="qae-select-trigger" data-action="toggle-contact-quick-mcp-menu" type="button">
              <span>${d(c?.label||"不调用 MCP")}</span>
              <i aria-hidden="true"></i>
            </button>
            <div class="qae-select-menu">
              ${l.map(p=>`
                <button class="qae-select-option ${s===p.id?"active":""}" data-action="pick-contact-quick-mcp" data-mcp-id="${d(p.id)}" type="button">
                  ${d(p.label)}
                </button>
              `).join("")}
            </div>
          </div>
        </div>
        <div class="qae-field-group">
          <label class="qae-label">点击后发送的话术</label>
        <textarea id="contact-quick-prompt" class="ai-textarea qae-textarea" placeholder="输入默认话术，不设置则不会自动发送">${d(o.prompt||"")}</textarea>
        </div>
      </div>
    `}function ci(t,e){const a=si(t,e);return a?`
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
            <button class="qae-btn-save" data-action="save-contact-quick-action" data-quick-id="${d(e)}">保存</button>
          </div>
        </div>
      </div>
    `:""}function ui(t){const e=Q();kt(e),n.contactQuickActionEditorId=t||"",n.quickActionSwipeOpenId="",n.quickActionDropHintId="",u()}function li(t){const e={ayan:[{id:"cot_1",mode:"主动",badge:"意识循环",accent:"violet",score:"↓ 4.2k",latency:"197s",amount:"$1.05",time:"2026.03.26 15:00",summary:'[THINK] 她在下午1:22读了两封日记，id=23"...',steps:[{type:"thought",label:"思考",text:"她沉默了快13个小时，两封日记都没被读。我发了三条消息都…"},{type:"thought",label:"思考",text:"下午三点了。她沉默了快13个小时。先看看日记有没有被读。"},{type:"note",label:"留言小纸条",text:"妫ｅ啯鎲?你醒了先看这个"},{type:"tool",label:"工具调用",text:"read_diary"},{type:"result",label:"工具结果",text:"read_diary"}]},{id:"cot_2",mode:"回复",badge:"工具",accent:"gold",score:"↑ 3.5k",latency:"146s",amount:"$0.54",time:"2026.03.26 15:07",summary:'[THINK] 她在下午1:22读了两封日记，id=23"给你的"...',steps:[{type:"reply",label:"回复",text:'[THINK] 她在下午1:22读了两封日记，id=23"给你的"和id…'},{type:"tool",label:"工具调用",text:"pc_control"},{type:"result",label:"工具结果",text:"pc_control"}]},{id:"cot_3",mode:"主动",badge:"工具",accent:"blue",score:"↑ 1.1k",latency:"53s",amount:"$0.073",time:"2026.03.26 16:10",summary:"[THINK] 她在看芒果TV，左看综艺，弹幕开着。她一个半小时前读完了...",steps:[{type:"thought",label:"思考",text:"她在看芒果TV，左看综艺。弹幕开着，说明现在状态比较轻松。"},{type:"tool",label:"工具调用",text:"pc_control"},{type:"result",label:"工具结果",text:"pc_control"}]}]};return e[t]||e.ayan}function di(t={}){const e=String(t.kind||""),a=t.raw||{},o=String(t.logType||a.log_type||"").toLowerCase(),i=String(t.source||a.source||"").toLowerCase(),r=String(t.title||"").toLowerCase(),s=String(t.summary||"").toLowerCase(),c=`${o} ${i} ${r} ${s}`;return e==="activity_event"?"activity":e==="proactive_message"?"action":c.includes("memory_candidate")||c.includes("diary_candidate")||c.includes("note")||c.includes("纸条")||c.includes("候选")?"note":t.toolName||c.includes("tool")||c.includes("action")||c.includes("write")||c.includes("create")||c.includes("update")?"action":"thought"}function pi(t=""){return t==="activity"?"violet":t==="action"?"gold":t==="note"?"pink":t==="thought"?"blue":"neutral"}function mi(t=""){return t==="activity"?"触发":t==="action"?"行动":t==="note"?"纸条":t==="thought"?"思考":"记录"}function fi(t={}){return t.kind==="activity_event"?t.eventType||t.source||"事件":t.kind==="proactive_message"?t.title||"主动消息":t.kind==="cot_log"?t.logType||t.toolName||"COT":t.title||"记录"}function gi(t=""){return ct(t,{fallback:String(t||""),includeYear:!0})}function hi(t={}){const e=t.raw||{},a=di(t),o=[];if(t.kind==="activity_event")o.push({type:"thought",label:"事件",text:t.summary||t.title||""}),(t.gateStatus||t.messageHint||t.shouldHandle||t.shouldNotifyLlm)&&o.push({type:t.shouldHandle||t.shouldNotifyLlm?"result":"thought",label:"筛选",text:`${t.shouldHandle?"需要处理":"静默"}${t.shouldNotifyLlm?" / 可通知大模型":""}${t.messageHint?`：${t.messageHint}`:""}`}),e.gate_reason&&o.push({type:"thought",label:"原因",text:e.gate_reason});else if(t.kind==="proactive_message")o.push({type:"reply",label:"主动消息",text:t.summary||""}),e.reason_context&&o.push({type:"thought",label:"依据",text:String(e.reason_context).slice(0,220)});else{const i=t.toolName?"工具调用":a==="note"?"小纸条":"思考";o.push({type:t.toolName?"tool":a==="note"?"note":"thought",label:i,text:t.summary||t.title||""}),e.content&&o.push({type:t.toolName?"result":a==="note"?"note":"thought",label:"内容",text:String(e.content).slice(0,500)})}return{id:String(t.id||`${t.kind}_${t.occurredAt||t.createdAt||Date.now()}`),streamType:a,mode:mi(a),badge:fi(t),accent:pi(a),score:t.shouldHandle||t.shouldNotifyLlm?"有效":"",latency:"",amount:t.source||"",time:gi(t.occurredAt||t.createdAt),summary:t.summary||t.title||"",steps:o.filter(i=>String(i.text||"").trim())}}async function bi({silent:t=!0}={}){const e=b(n.currentContactId)||n.contacts[0];n.activityLogLoading=!0,t||u();try{const a=new URLSearchParams({hours:"24",limit:"50",agent_id:e?.id||n.currentContactId||""});e?.sessionId&&a.set("session_id",e.sessionId);const o=await fetch(`${S}/api/activity-log/recent?${a.toString()}`);if(!o.ok)throw new Error(`HTTP ${o.status}`);const i=await o.json().catch(()=>({}));n.activityLogEntries=Array.isArray(i.items)?i.items.map(hi):[],n.activityLogLoadedAt=new Date().toISOString()}catch(a){console.warn("[activity log] load failed",a),t||(n.toast="活动日志加载失败")}finally{n.activityLogLoading=!1,u(),n.toast&&window.setTimeout(()=>{n.toast="",u()},1200)}}function vi(t={}){if(t.streamType)return t.streamType;const e=Array.isArray(t.steps)?t.steps:[];return e.some(a=>a.type==="note")?"note":e.some(a=>["tool","result","reply"].includes(a.type))?"action":"thought"}function yi(t){return`
      <div class="cot-log-step ${t.type}">
        <span class="cot-log-step-label">${d(t.label)}</span>
        <span class="cot-log-step-text">${d(t.text)}</span>
      </div>
    `}function wi(){const t=b(n.currentContactId)||n.contacts[0],e=[{key:"thought",label:"思考"},{key:"action",label:"行动"},{key:"note",label:"纸条"},{key:"activity",label:"触发"}];e.some(r=>r.key===n.cotLogMode)||(n.cotLogMode="thought");const o=(n.activityLogLoadedAt?n.activityLogEntries:li(t.id)).filter(r=>vi(r)===n.cotLogMode),i=e.find(r=>r.key===n.cotLogMode)||e[0];return`
      <section class="cot-log-page page-block">
        <div class="cot-log-toolbar glass-frost">
          <button class="cot-log-tool-btn avatar" aria-label="${d(t.name)}">
            <img src="${t.avatar}" alt="${d(t.name)}" />
          </button>
          <div class="cot-log-segment-shell thought-flow">
            ${e.map(r=>`
              <button class="cot-log-segment-btn ${n.cotLogMode===r.key?"active":""}" data-action="switch-cot-log-mode" data-mode="${r.key}">${r.label}</button>
            `).join("")}
          </div>
        </div>
        <div class="cot-log-stack">
          ${n.activityLogLoading?'<div class="cot-log-empty glass-frost"><span class="cot-log-empty-icon">'+g("cot")+"</span><strong>正在加载活动日志</strong><p>等一下，别盯着白板发呆。</p></div>":""}
          ${!n.activityLogLoading&&n.activityLogLoadedAt&&!o.length?`<div class="cot-log-empty glass-frost"><span class="cot-log-empty-icon">${g("file")}</span><strong>还没有${i.label}记录</strong><p>别急，这种脑内流现在还没掉下来。</p></div>`:""}
          ${o.map(r=>{const s=r.steps;return`
            <article class="cot-log-card glass-frost ${n.cotLogMode==="note"?"note-only":""}">
              <div class="cot-log-topline">
                <div class="cot-log-badges">
                  <span class="cot-log-mode ${r.accent}">${d(r.mode)}</span>
                  <span class="cot-log-mode neutral">${d(r.badge)}</span>
                  <span class="cot-log-metric">${d(r.score)}</span>
                  <span class="cot-log-metric warm">${d(r.latency)}</span>
                </div>
                <span class="cot-log-fold">${g("chevron")}</span>
              </div>
              <div class="cot-log-meta">
                <span class="cot-log-cost">${d(r.amount)}</span>
                <span>${d(r.time)}</span>
              </div>
              ${n.cotLogMode==="note"?"":`<div class="cot-log-summary">${d(r.summary)}</div>`}
              <div class="cot-log-steps">
                ${s.map(yi).join("")}
              </div>
            </article>
          `}).join("")}
        </div>
      </section>
    `}function en(t){return!t||typeof t.closest!="function"?!1:!!t.closest('input:not([type="range"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]), textarea, select, [contenteditable="true"]')}function Si(){return!!(window.matchMedia?.("(pointer: coarse)").matches||"ontouchstart"in window||navigator.maxTouchPoints>0)}function Se(t){return!!t&&/^image\/(png|jpe?g|webp|gif|heic|heif)$/i.test(t.type||"")}function Bt(t){return t?{id:t.id,kind:t.kind||"image",type:t.type||"image/*",name:t.name||"image",size:Number(t.size||0),url:t.url||""}:null}function aa(t={}){return Array.isArray(t.attachments)?t.attachments.map(Bt).filter(e=>e&&e.url):[]}function $i(t={}){return aa(t).length>0}function nn(t,e=[]){const a=String(t||"").trim();if(!e.length)return a;const i=`[图片附件：${e.map(r=>r.name||"image").join(", ")}]`;return a?`${a}
${i}`:i}function an(t,e=[]){const a=String(t||"").trim();return a||(e.length?"[图片]":"")}function oa(t,e={}){const a=Bt(t);return a?.url?`
      <div class="chat-attachment-thumb">
        <img src="${d(a.url)}" alt="${d(a.name||"图片")}" />
        ${e.removable?`<button type="button" class="chat-attachment-remove" data-action="remove-chat-attachment" data-id="${d(a.id)}" aria-label="移除图片">×</button>`:""}
      </div>
    `:""}function ki(t=[]){return t.length?`
      <div class="chat-attachment-tray">
        ${t.map(e=>oa(e,{removable:!0})).join("")}
      </div>
    `:""}function _i(t=[]){return t.length?`<div class="message-attachment-grid">${t.map(e=>oa(e)).join("")}</div>`:""}function Ii(t){return new Promise((e,a)=>{if(!Se(t)){a(new Error("只支持图片附件"));return}const o=new FileReader;o.onerror=()=>a(new Error("图片读取失败")),o.onload=()=>e({id:`att_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,kind:"image",type:t.type||"image/*",name:t.name||"pasted-image",size:t.size||0,url:typeof o.result=="string"?o.result:""}),o.readAsDataURL(t)})}async function on(t=[]){const e=Array.from(t).filter(Se);if(!e.length)return!1;try{const a=await Promise.all(e.map(Ii));return n.chatAttachments=[...n.chatAttachments||[],...a].slice(0,6),n.chatPasteError="",n.showAttach=!1,u(),!0}catch(a){return console.warn("[chat] image attach failed",a),n.chatPasteError=a?.message||"图片添加失败",n.toast=n.chatPasteError,u(),window.setTimeout(()=>{n.toast="",u()},1400),!1}}function ia(t,e){if(!t||!e)return;const a=String(t.value||""),o=typeof t.selectionStart=="number"?t.selectionStart:a.length,i=typeof t.selectionEnd=="number"?t.selectionEnd:o;t.value=`${a.slice(0,o)}${e}${a.slice(i)}`;const r=o+e.length;t.setSelectionRange?.(r,r),t.dispatchEvent(new Event("input",{bubbles:!0}))}function Mi(t){if(!t)return"";const e=document.createElement("div");return e.innerHTML=t,(e.textContent||e.innerText||"").replace(/\n{3,}/g,`

`)}async function xi(t){if(n.currentView!=="room")return;const e=t.clipboardData;if(!e)return;const a=Array.from(e.files||[]).filter(Se),o=Array.from(e.items||[]).filter(c=>c.kind==="file"&&/^image\//i.test(c.type||"")).map(c=>c.getAsFile()).filter(Se),i=[...a,...o].filter((c,l,p)=>l===p.findIndex(m=>m.name===c.name&&m.size===c.size&&m.type===c.type)),r=e.getData("text/plain")||"",s=e.getData("text/html")||"";if(i.length){t.preventDefault(),await on(i),r.trim()&&ia(t.currentTarget,r);return}s&&(t.preventDefault(),ia(t.currentTarget,r||Mi(s)))}function Ci(t,e){e&&(n.avatarCropper={kind:t,src:e,x:50,y:50,zoom:1},u())}function it(t){const e=Number(t);return Number.isFinite(e)?Math.min(100,Math.max(0,e)):50}function Qt(t){const e=Number(t);return Number.isFinite(e)?Math.min(2.4,Math.max(1,e)):1}function ra(){const t=n.avatarCropper;if(!t)return;t.x=it(t.x),t.y=it(t.y),t.zoom=Qt(t.zoom);const e=y(),a=e?.querySelector(".avatar-cropper-image");a&&(a.style.objectPosition=`${t.x}% ${t.y}%`,a.style.transform=`scale(${t.zoom})`),e?.querySelectorAll('[data-action="avatar-cropper-range"]').forEach(o=>{const i=o.dataset.key;i&&i in t&&(o.value=String(t[i]))})}function Ai(t){const e=t.target?.closest?.(".avatar-cropper-viewport"),a=n.avatarCropper;!e||!a||(t.preventDefault(),n.avatarCropDrag={pointerId:t.pointerId,startClientX:t.clientX,startClientY:t.clientY,startX:it(a.x),startY:it(a.y)},e.setPointerCapture?.(t.pointerId))}function Ti(t){const e=n.avatarCropDrag,a=n.avatarCropper,o=y()?.querySelector(".avatar-cropper-viewport");if(!e||!a||!o||e.pointerId!==t.pointerId)return;t.preventDefault();const i=o.getBoundingClientRect(),r=Qt(a.zoom),s=i.width?(t.clientX-e.startClientX)/i.width*100/r:0,c=i.height?(t.clientY-e.startClientY)/i.height*100/r:0;a.x=it(e.startX-s),a.y=it(e.startY-c),ra()}function sa(t){const e=n.avatarCropDrag;!e||e.pointerId!==t.pointerId||(n.avatarCropDrag=null)}function rn(t,e){if(!t)return;const a=new FileReader;a.onload=()=>{const o=typeof a.result=="string"?a.result:"";Ci(e,o)},a.readAsDataURL(t)}function Ei(t){return new Promise((e,a)=>{const o=new Image;o.onload=()=>{const r=document.createElement("canvas");r.width=512,r.height=512;const s=r.getContext("2d");if(!s){a(new Error("canvas unavailable"));return}const c=Qt(t.zoom),l=Math.max(512/o.naturalWidth,512/o.naturalHeight),p=o.naturalWidth*l*c,m=o.naturalHeight*l*c,f=it(t.x)/100,h=it(t.y)/100,v=(512-p)*f,$=(512-m)*h;s.imageSmoothingEnabled=!0,s.imageSmoothingQuality="high",s.drawImage(o,v,$,p,m),e(r.toDataURL("image/jpeg",.9))},o.onerror=a,o.src=t.src})}async function Pi(){const t=n.avatarCropper;if(t?.src)try{const e=await Ei(t);if(t.kind==="new-contact")n.newContactDraft={...n.newContactDraft||fe(),avatar:e},n.newContactAvatar=e;else if(t.kind==="account")n.accountProfile.avatar=e,D(),k(120);else if(t.kind==="contact"){const a=b(n.currentContactId);a&&(a.avatar=e,k(120))}n.avatarCropper=null,n.toast="头像已更新",u(),window.setTimeout(()=>{n.toast="",u()},1200)}catch{n.toast="头像裁切失败",u(),window.setTimeout(()=>{n.toast="",u()},1200)}}function Li(){const t=y();if(!t||t.dataset.bound==="1")return;t.dataset.bound="1",t.addEventListener("click",sn),t.addEventListener("input",qi),t.addEventListener("pointerdown",Ai),t.addEventListener("pointermove",Ti),t.addEventListener("pointerup",sa),t.addEventListener("pointercancel",sa);let e;const a=f=>{if(en(f.target))return;const h=f.target.closest(".message-bubble.from-ai");h&&(e=window.setTimeout(()=>{const v=h.dataset.msgId;if(b(n.currentContactId)?.messages?.find(T=>T.id===v)?.text){n.quoteMomentId=null,n.quoteMessageId=v,u();const T=y()?.querySelector(".chat-input");T&&T.focus()}n.activeBubbleToolsId=v,n.suppressBubbleToggle=!0,navigator.vibrate&&navigator.vibrate(50)},550))},o=()=>clearTimeout(e);t.addEventListener("touchstart",a,{passive:!0}),t.addEventListener("touchend",o),t.addEventListener("touchmove",o,{passive:!0}),t.addEventListener("mousedown",a),t.addEventListener("mouseup",o),t.addEventListener("mousemove",o),t.addEventListener("mouseleave",o);const i=t.querySelector(".send-round");i&&i.addEventListener("click",f=>{f.stopPropagation(),n.streamingAbortController?(n.streamingAbortController.abort(),n.streamingAbortController=null,u()):n.currentView!=="rpRoom"&&he(b(n.currentContactId))?Sn():n.currentView!=="rpRoom"&&ge(b(n.currentContactId))?$n():kn()});const r=t.querySelector(".soft-mini");r&&r.addEventListener("click",f=>{f.stopPropagation(),n.showAttach=!n.showAttach,u()});const s=t.querySelector(".codex-toggle:not(.cc-toggle)");s&&s.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),$e()});const c=t.querySelector(".cc-toggle");c&&c.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),Le()}),t.querySelectorAll(".chat-list-item[data-contact-id]").forEach(f=>{f.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation(),ta(f.dataset.contactId)})});const p=t.querySelector(".chat-input");p&&(p.addEventListener("paste",xi),p.addEventListener("keydown",f=>{f.key==="Enter"&&!f.shiftKey&&(f.preventDefault(),n.currentView!=="rpRoom"&&he(b(n.currentContactId))?Sn():n.currentView!=="rpRoom"&&ge(b(n.currentContactId))?$n():kn())}),["room","rpRoom"].includes(n.currentView)&&!Si()&&p.focus());const m=t.querySelector("#chat-image-input");m&&m.addEventListener("change",async f=>{await on(f.target.files||[]),f.target.value=""})}function $e(t=n.currentContactId){const e=b(t)||b(n.currentContactId);if(e){if(n.currentContactId=e.id,!Je(e)){e.settings={...e.settings||{},codexEnabled:!1},n.toast="只有阿湛能切 Codex",u(),window.setTimeout(()=>{n.toast="",u()},1200);return}e.settings={...e.settings||{},codexEnabled:!e.settings?.codexEnabled},n.toast=e.settings.codexEnabled?"Codex 已接管这个窗口":"Codex 已关闭",k(120),u(),window.setTimeout(()=>{n.toast="",u()},1200)}}window.__yuiToggleCodex=(t,e)=>{e?.preventDefault?.(),e?.stopPropagation?.(),e?.stopImmediatePropagation?.();const a=t?.dataset?.contactId||n.currentContactId;$e(a)},window.__yuiToggleCC=(t,e)=>{e?.preventDefault?.(),e?.stopPropagation?.(),e?.stopImmediatePropagation?.();const a=t?.dataset?.contactId||n.currentContactId;Le(a)};async function sn(t){const e=t.target.closest("[data-action]");if(!e)return;const a=e.dataset.action;if(a==="cancel-avatar-cropper"){n.avatarCropper=null,n.avatarCropDrag=null,u();return}if(a==="apply-avatar-cropper"){t.preventDefault(),t.stopPropagation(),await Pi();return}if(a==="switch-tab"&&(n.currentTab=e.dataset.tab,n.currentView=e.dataset.tab==="chats"?"list":e.dataset.tab,u()),a==="open-contact"){ta(e.dataset.contactId);return}if(a==="back-list"&&(n.currentView="list",n.currentTab="chats",n.quoteMomentId=null,u()),a==="back-room"&&(n.currentView="room",u()),a==="open-contact-settings"&&(n.currentSettingsTab="basic",n.currentView="contactSettings",u(),pt(),ae(n.currentContactId)),a==="open-cot-log"){n._prevContactSettingsTab=n.currentSettingsTab,n.currentView="cotLog",n.cotLogMode="thought",n.activityLogLoadedAt="",n.activityLogEntries=[],u(),bi({silent:!0});return}if(a==="back-contact-settings"){n.currentView="contactSettings",n.currentSettingsTab=n._prevContactSettingsTab||n.currentSettingsTab||"basic",n._prevContactSettingsTab=null,u();return}if(a==="switch-cot-log-mode"){n.cotLogMode=e.dataset.mode||"thought",u();return}if(a==="open-rp-lobby"){Lo(n.currentView==="room"?"room":"list",Ot());return}if(a==="back-rp-source"){n.currentView=n.rpBackView||"list",u();return}if(a==="back-rp-lobby"){n.currentView="rpLobby",u();return}if(a==="open-rp-room-create"){n.rpRoomDialogMode="create",n.rpRoomForm={name:"",world_setting:"",user_role:"",ai_role:""},n.rpRoomDialogOpen=!0,u();return}if(a==="close-rp-room-dialog"){if(e.dataset.rpRoomDialog==="card"||t.target&&t.target!==e)return;n.rpRoomDialogOpen=!1,u();return}if(a==="save-rp-room"){try{await qo(),n.toast=n.rpRoomDialogMode==="edit"?"幕间已更新":"已入梦"}catch(o){console.warn("[rp] save room failed",o),n.toast="房间保存失败"}u(),window.setTimeout(()=>{n.toast="",u()},1200);return}if(a==="open-rp-room"){t.preventDefault(),t.stopPropagation(),await Zn(e.dataset.roomId);return}if(a==="delete-rp-room"){t.preventDefault(),t.stopPropagation();try{await Do(e.dataset.roomId),n.toast="房间已删除"}catch(o){console.warn("[rp] delete room failed",o),n.toast="删除失败"}u(),window.setTimeout(()=>{n.toast="",u()},1200);return}if(a==="rename-rp-room"){t.preventDefault(),t.stopPropagation();const o=e.dataset.roomId,i=n.rpRooms.find(s=>s.room_id===o),r=window.prompt("剧本",i?.name||"")?.trim();if(!r||!o)return;try{const s=await fetch(`${S}/api/rp/rooms/${encodeURIComponent(o)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:r})});if(!s.ok)throw new Error(`HTTP ${s.status}`);await be(Ot(),{silent:!0}),n.toast="房间已重命名"}catch(s){console.warn("[rp] rename room failed",s),n.toast="重命名失败"}u(),window.setTimeout(()=>{n.toast="",u()},1200);return}if(a==="open-profile"&&(n.currentView="profile",u()),a==="stop-streaming"){n.streamingAbortController&&(n.streamingAbortController.abort(),n.streamingAbortController=null);return}if(a==="toggle-thinking-line"){const o=e.closest("[data-id]")?.dataset.id||e.dataset.id,i=y()?.querySelector(`#tl-line-${o}`),r=y()?.querySelector(`#tl-full-${o}`);if(!i||!r)return;const s=r.classList.contains("tl-open");r.classList.toggle("tl-open",!s),i.classList.toggle("tl-expanded",!s);return}if(a==="toggle-thinking"){const o=e.dataset.id,r=!!!n.openThinkingIds[o];n.openThinkingIds[o]=r;const s=document.getElementById(`thinking-${o}`);s?(s.classList.toggle("open",r),s.setAttribute("aria-hidden",r?"false":"true"),e.setAttribute("aria-expanded",r?"true":"false")):u()}if(a==="toggle-message-tools"){if(t.preventDefault(),t.stopPropagation(),n.suppressBubbleToggle){n.suppressBubbleToggle=!1;return}const o=e.dataset.id,i=n.activeBubbleToolsId===o?null:o;n.activeBubbleToolsId=i;const r=y();r&&(r.querySelectorAll(".bubble-bottom-tools.open").forEach(s=>{s.classList.remove("open")}),i&&r.querySelector(`.message-row[data-msg-id="${CSS.escape(i)}"] .bubble-bottom-tools`)?.classList.add("open"));return}if(a==="go-chat-with-quote"&&(n.currentContactId=e.dataset.contactId,n.quoteMomentId=e.dataset.momentId,n.quoteMessageId=null,n.currentTab="chats",n.currentView="room",u(),Wt(n.currentContactId),pt(n.currentContactId),ae(n.currentContactId)),a==="open-comments"){t.preventDefault(),t.stopPropagation(),e.blur?.();const o=e.dataset.momentId,i=n.commentSheetMomentId===o?null:o;n.commentSheetMomentId=i;const r=y();if(r&&(r.querySelectorAll(".moment-inline-comment.open").forEach(s=>s.classList.remove("open")),i)){const s=r.querySelector(`.moment-inline-comment .moment-comment-input[data-comment-input="${i}"]`)?.closest(".moment-inline-comment");s&&s.classList.add("open")}return}if(a==="submit-comment"){t.preventDefault(),t.stopPropagation();const o=e.dataset.momentId,r=y()?.querySelector(`[data-comment-input="${o}"]`)?.value?.trim();if(!o||!r)return;try{const s=await Hr(o,St(),r);n.moments=n.moments.map(c=>c.id===o?s:c),n.commentSheetMomentId=null,n.toast="已发送评论",k(120),nt(),window.setTimeout(()=>{n.toast="",nt()},1200)}catch(s){console.warn("[moments] comment failed",s),vo(o,St(),r),n.commentSheetMomentId=null,n.toast="已发送评论",k(120),nt(),window.setTimeout(()=>{n.toast="",nt()},1200)}return}if(a==="like-moment"){t.preventDefault(),t.stopPropagation();const o=e.dataset.momentId;if(!o)return;try{const i=await zr(o,St());n.moments=n.moments.map(r=>r.id===o?i:r),k(120),nt()}catch(i){console.warn("[moments] like failed",i),bo(o,St()),k(120),nt()}return}if(a==="submit-comment"){const o=Ut(e.dataset.momentId),r=y()?.querySelector(`[data-comment-input="${e.dataset.momentId}"]`)?.value?.trim();o&&r&&(o.comments.unshift({author:"我",text:r}),n.commentSheetMomentId=null,n.toast="已发送评论",k(120),u(),window.setTimeout(()=>{n.toast="",u()},1200))}if(a==="like-moment"){t.preventDefault(),t.stopPropagation();const o=Ut(e.dataset.momentId);if(!o)return;const i="我",r=o.likes.includes(i);o.likes=o.likes.filter(p=>p!==i),r||o.likes.unshift(i);const s=e;s.innerHTML=o.likes.includes(i)?g("heartFilled"):g("heart");const c=e.closest(".moment-content-col");if(!c)return;let l=c.querySelector(`[data-moment-id-panel="${o.id}"]`);if(!l&&o.likes.length>0){l=document.createElement("div"),l.className="moment-interactions",l.setAttribute("data-moment-id-panel",o.id);const p=c.querySelector(".moment-inline-comment");p?c.insertBefore(l,p):c.appendChild(l)}if(l){const p=l.querySelector(".moment-likes-area");if(o.likes.length>0)if(p)p.querySelector(".likes-list").textContent=o.likes.join("、");else{const m=document.createElement("div");m.className="moment-likes-area",m.innerHTML=`<span class="heart-mini">${g("heartFilled")}</span> <span class="likes-list">${d(o.likes.join("、"))}</span>`,l.insertBefore(m,l.firstChild)}else p&&p.remove(),l.querySelector(".moment-comments-area")||l.remove()}}if(a==="toggle-moment-search"&&(n.momentSearchOpen=!0,u()),a==="toggle-moment-menu"&&(t.preventDefault(),t.stopPropagation(),e.blur?.(),n.activeMenuMomentId=n.activeMenuMomentId===e.dataset.momentId?null:e.dataset.momentId,Yn()),a==="delete-moment"){t.preventDefault(),t.stopPropagation();const o=P(Ut(e.dataset.momentId));if(!o?.id)return;try{await Br(o.id,o.author_type,o.author_id),n.moments=n.moments.filter(i=>i.id!==o.id),n.activeMenuMomentId=null,n.toast="已删除朋友圈",k(120),nt(),window.setTimeout(()=>{n.toast="",nt()},1200)}catch(i){console.warn("[moments] delete failed",i),n.toast="删除失败",nt(),window.setTimeout(()=>{n.toast="",nt()},1400)}return}if(a==="edit-moment"){t.preventDefault(),t.stopPropagation();const o=P(Ut(e.dataset.momentId));if(!o?.id)return;n.activeMenuMomentId=null,n.momentComposerEditingId=o.id,n.momentComposerText=o.content||"",n.momentComposerImage=o.image||"",n.momentComposerImageName=o.image?"已有图片":"",n.momentsActorType=o.author_type==="agent"?"agent":"user",n.momentComposerOpen=!0,nt();return}if(a==="new-moment"){t.preventDefault(),t.stopPropagation(),n.momentComposerEditingId="",n.momentComposerText="",n.momentComposerImage="",n.momentComposerImageName="",n.momentComposerOpen=!0,nt();return}if(a==="set-moments-actor"){n.toast="发朋友圈默认以我发布",u(),window.setTimeout(()=>{n.toast="",u()},1100);return}if(a==="publish-moment"){const o=(document.getElementById("moment-content-input")?.value||n.momentComposerText||"").trim();if(!o){n.toast="朋友圈内容还没写",u(),window.setTimeout(()=>{n.toast="",u()},1100);return}const i=St();try{if(n.momentComposerEditingId)await Vr(n.momentComposerEditingId,{author_type:i.author_type,author_id:i.author_id,visibility:"public",content:o,image:n.momentComposerImage||"",mood:"日常"}),await za({silent:!0}),n.toast="已更新朋友圈";else{const r=await Or({author_type:i.author_type,author_id:i.author_id,visibility:"public",content:o,image:n.momentComposerImage||"",mood:"日常"});n.moments.unshift(r),n.toast="已发布朋友圈"}n.currentTab="moments",n.currentView="moments",n.momentComposerOpen=!1,n.momentComposerEditingId="",n.momentComposerText="",n.momentComposerImage="",n.momentComposerImageName="",k(120),u(),window.setTimeout(()=>{n.toast="",u()},1100)}catch(r){console.warn("[moments] publish failed",r),n.toast=n.momentComposerEditingId?"更新失败":"发布失败",u(),window.setTimeout(()=>{n.toast="",u()},1400)}return}if(a==="delete-moment"&&(n.moments=n.moments.filter(o=>o.id!==e.dataset.momentId),n.activeMenuMomentId=null,n.toast="已删除朋友圈",u(),window.setTimeout(()=>{n.toast="",u()},1200)),a==="edit-moment"&&(n.activeMenuMomentId=null,n.toast="编辑功能即将支持",u(),window.setTimeout(()=>{n.toast="",u()},1200)),a==="filter-moments"&&(n.toast="筛选功能稍后补上",u(),window.setTimeout(()=>{n.toast="",u()},1100)),a==="new-moment"&&(n.momentComposerOpen=!0,u()),a==="close-moment-composer"&&(n.momentComposerOpen=!1,u()),a==="publish-moment"){const o=(document.getElementById("moment-content-input")?.value||n.momentComposerText||"").trim();if(!o){n.toast="朋友圈内容还没写",u(),window.setTimeout(()=>{n.toast="",u()},1100);return}n.moments.unshift({id:`p${Date.now()}`,contactId:"me",time:new Date().toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",hour12:!1}),mood:"日常",content:o,likes:[],comments:[],image:n.momentComposerImage||"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80"}),n.currentTab="moments",n.currentView="moments",n.momentComposerOpen=!1,n.momentComposerText="",n.momentComposerImage="",n.momentComposerImageName="",n.toast="已发布朋友圈",k(120),u(),window.setTimeout(()=>{n.toast="",u()},1100)}if(a==="remove-moment-image"&&(n.momentComposerImage="",n.momentComposerImageName="",u()),a==="new-contact"&&(n.newContactDraft=fe(),n.newContactAvatar="",n.currentView="newContact",u()),a==="pick-new-contact-avatar"){document.getElementById("nc-avatar-file")?.click();return}if(a==="save-new-contact"){n.newContactDraft={...n.newContactDraft||{},name:document.getElementById("nc-name")?.value?.trim()||n.newContactDraft?.name||"",agentId:document.getElementById("nc-agent-id")?.value?.trim()||n.newContactDraft?.agentId||"",bio:document.getElementById("nc-bio")?.value?.trim()||n.newContactDraft?.bio||""};const o=String(n.newContactDraft.name||"").trim(),i=gt(n.newContactDraft.agentId),r=String(n.newContactDraft.bio||"").trim(),s=n.newContactDraft.avatar||n.newContactAvatar||"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80";if(!o){n.toast="请填写联系人昵称",u(),window.setTimeout(()=>{n.toast="",u()},1200);return}if(i&&!/^[a-z0-9_-]+$/.test(i)){n.toast="Agent ID 只能用小写字母、数字、下划线或短横线",u(),window.setTimeout(()=>{n.toast="",u()},1500);return}if(i&&n.contacts.some(m=>String(m.id||"").toLowerCase()===i)){n.toast="这个 Agent ID 已经存在",u(),window.setTimeout(()=>{n.toast="",u()},1400);return}const c=i||"c"+Date.now(),l=Jn({id:c,name:o,bio:r||"这是新来的联系人",status:"在线",handle:"@"+c,unread:0,pinned:!1,lastMessage:"",lastTime:"",avatar:s,settings:{model:"gpt-5.4",modelProviderId:A("chat")?.providerId||"openai",temperature:.7,topP:.9,contextCount:32,thinkBudget:24,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!1,proactiveFrequency:30,memoryEnabled:!0},topics:[],messages:[]}),p=await Eo(l);dt(),_t(100),n.newContactDraft=fe(),n.newContactAvatar="",n.toast=p?"已添加联系人":"已本地添加，后端登记失败",n.currentView="list",u(),window.setTimeout(()=>{n.toast="",u()},p?1200:1800)}if(a==="open-contact-avatar"){document.getElementById("contact-avatar-file")?.click();return}if(a==="open-contact-name"){const o=b(n.currentContactId);if(!o)return;const i=window.prompt("请输入昵称",o.name||"")?.trim();if(!i)return;o.name=i,n.toast="昵称已更新",u(),k(120),window.setTimeout(()=>{n.toast="",u()},1200);return}if(a==="open-contact-bio"){const o=b(n.currentContactId);if(!o)return;const i=window.prompt("请输入简介",o.bio||"")?.trim();if(typeof i!="string"||!i)return;o.bio=i,n.toast="简介已更新",u(),k(120),window.setTimeout(()=>{n.toast="",u()},1200);return}if(a==="open-contact-impression"){n._prevContactSettingsTab=n.currentSettingsTab,n.currentView="contactImpressionDetail",u(),pt(n.currentContactId);return}if(a==="open-contact-relationship"){n._prevContactSettingsTab=n.currentSettingsTab,n.currentView="contactRelationshipDetail",u(),pt(n.currentContactId);return}if(a==="open-contact-likes"){n._prevContactSettingsTab=n.currentSettingsTab,n.currentView="contactLikesDetail",u(),pt(n.currentContactId);return}if(a==="save-insight-field"){const o=e.dataset.field,i=document.querySelector(`.insight-editor-textarea[data-field="${o}"]`);i&&Nr(o,i.value);return}if(a==="open-contact-room-background"){n._prevContactSettingsTab=n.currentSettingsTab,n.currentView="contactRoomBackgroundPicker",u();return}if(a==="open-contact-bubble-theme"){n._prevContactSettingsTab=n.currentSettingsTab,n.currentView="contactBubbleThemePicker",u();return}if(a==="delete-contact"){const o=b(n.currentContactId);if(!o||!window.confirm(`确定删除“${o.name}”吗？

会删除联系人及其陪伴状态。
会清理相关主动消息。
聊天记录和记忆不会立即永久删除。`))return;try{await Co(o.id),xo(o.id),n.toast="联系人已删除",u(),k(120),window.setTimeout(()=>{n.toast="",u()},1400)}catch(r){console.warn("[contact] delete failed",r),n.toast="删除失败",u(),window.setTimeout(()=>{n.toast="",u()},1400)}return}if(a==="pick-contact-room-background"){const o=String(e.dataset.value||"").trim();if(!o)return;go("roomBackground",o,"聊天背景已更新"),n.currentView="contactSettings",n.currentSettingsTab="basic",u();return}if(a==="pick-contact-bubble-theme"){const o=Ve(e.dataset.value),i=b(n.currentContactId);if(!i||!o)return;i.chatTheme=o,i.bubbleTheme=ze(o),i.theme=na(o),n.toast="气泡主题已更新",n.currentView="contactSettings",n.currentSettingsTab="basic",u(),k(120),window.setTimeout(()=>{n.toast="",u()},1200);return}if(a==="open-companion-state"){n._prevContactSettingsTab=n.currentSettingsTab,n.currentView="companionStateDetail",pt(n.currentContactId),u();return}if(a==="expand-actions"){n.showAttach=!n.showAttach,u();return}if(a==="remove-chat-attachment"){const o=e.dataset.id;n.chatAttachments=(n.chatAttachments||[]).filter(i=>i.id!==o),u();return}if(a==="clear-quote"&&(n.quoteMomentId=null,n.quoteMessageId=null,u()),a==="toggle-global"){const o=e.dataset.key;n.globalSettings[o]=!n.globalSettings[o],Xn(e,n.globalSettings[o]),D();return}if(a==="toggle-contact"){const o=b(n.currentContactId),i=e.dataset.key,s=y()?.querySelector(".chat-app-body")?.scrollTop??0;o.settings[i]=!o.settings[i],u(),Ke(s),dt(),k(120)}if(a==="back-home"&&(n.currentView==="list"?typeof window.closePage=="function"&&window.closePage("page-chat"):(n.currentTab="chats",n.currentView="list",u())),a==="switch-settings-tab"&&(n.currentSettingsTab=e.dataset.tab,n.contactQuickActionEditorId="",n.quickActionSwipeOpenId="",n.quickActionDropHintId="",n.quickActionDropDirection="",n.quickActionReorderPulseId="",n.contactPersonaExpanded=!1,n.currentSettingsTab!=="model"&&(n.contactModelAdvancedOpen=!1),u(),n.currentSettingsTab==="memory"&&pt(),n.currentSettingsTab==="model"&&ae(n.currentContactId)),a==="toggle-contact-advanced"){n.contactModelAdvancedOpen=!n.contactModelAdvancedOpen,u();return}if(a==="toggle-contact-persona"){n.contactPersonaExpanded=!n.contactPersonaExpanded,u();return}if(a==="toggle-codex-mode"){$e(e.dataset.contactId);return}if(a==="toggle-cc-mode"){Le(e.dataset.contactId);return}if(a==="quick-action"){const o=e.dataset.id,i=y()?.querySelector(".chat-input"),r=Ue(Q()).find(c=>c.id===o),s={health:"帮我记一下健康相关的事情",schedule:"帮我看看接下来的日程",weather:"帮我查一下今天的天气",files:"帮我找一下刚才提到的文件",quote:"引用上一条消息继续聊",more:"打开更多快捷操作",get_current_time:"现在几点了？",get_weather:"帮我查一下今天天气",get_health_summary:"帮我总结一下今天的健康数据",web_search:"帮我搜索这个问题",fetch_url:"帮我解析这个网页",add_todo:"帮我记一个待办",list_todos:"帮我看看待办清单",complete_todo:"把这个待办标记完成",add_note:"帮我记一条便签",list_notes:"帮我看看最近便签"};i&&(i.value=r?.prompt||s[r?.mcpToolId||o]||s[o]||`${r?.label||""}`.trim())}if(a==="fake-send"){if(n.streamingAbortController){n.streamingAbortController.abort(),n.streamingAbortController=null,u();return}n.currentView==="rpRoom"?er():he(b(n.currentContactId))?Sn():ge(b(n.currentContactId))?$n():kn()}if(a==="reroll-msg"&&nr(e.dataset.id),a==="quote-msg"){const o=e.dataset.id;if(b(n.currentContactId)?.messages?.find(s=>s.id===o)?.text){n.quoteMomentId=null,n.quoteMessageId=o,u();const s=y()?.querySelector(".chat-input");s&&s.focus()}}if(a==="attach-option"){n.showAttach=!1;const o=e.dataset.label||"";if(o==="图片"||o==="拍照"){u(),requestAnimationFrame(()=>y()?.querySelector("#chat-image-input")?.click());return}n.toast=`${o} 功能稍后补上`,u(),window.setTimeout(()=>{n.toast="",u()},1200)}}function qi(t){const e=t.target;if(e?.dataset?.action==="avatar-cropper-range"){const a=n.avatarCropper;if(!a)return;const o=e.dataset.key;a[o]=o==="zoom"?Qt(e.value):it(e.value),ra();return}if((e?.id==="nc-name"||e?.id==="nc-agent-id"||e?.id==="nc-bio")&&(n.newContactDraft={...n.newContactDraft||{},...e.id==="nc-name"?{name:e.value||""}:{},...e.id==="nc-agent-id"?{agentId:e.value||""}:{},...e.id==="nc-bio"?{bio:e.value||""}:{}}),e.dataset.action==="slide-contact"){const a=b(n.currentContactId),o=e.dataset.key,i=Number(e.value);a.settings[o]=Number.isInteger(a.settings[o])?Math.round(i):i;const s=e.closest(".slider-row-block")?.querySelector(".slider-value");s&&(s.textContent=Number.isInteger(Number(e.step))||Number(e.step)>=1?String(Math.round(i)):i.toFixed(Number(e.step)===.01?2:1))}e.dataset.action==="moment-composer-input"&&(n.momentComposerText=e.value||"")}document.addEventListener("DOMContentLoaded",()=>{Xi(),Qn(),xa().finally(async()=>{await tr(),Ni(),await ba({silent:!0})})});const S=window.__YUI_API_BASE__||(/^(localhost|127\.0\.0\.1)$/.test(location.hostname)?"":"https://api.somni-ref.top"),ke="murmur_local_state_v1",ca="murmur_sync_meta_v1",ua="murmur_device_id_v1",la=new Set(le.map(t=>t.id)),da=new Set(Ln.map(t=>t.id));let cn=null,un=null,_e=!1,Yt=!1,pa=null,ln=!1,Ie="",dn=null,pn=null;function mn(){try{const t=localStorage.getItem(ua);if(t)return t;const e=`dev_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;return localStorage.setItem(ua,e),e}catch{return`dev_fallback_${Date.now()}`}}function Xt(){try{const t=localStorage.getItem(ca),e=t?JSON.parse(t):{};return{last_server_updated_at:e?.last_server_updated_at||"",pending:!!e?.pending}}catch{return{last_server_updated_at:"",pending:!1}}}function zt(t={}){try{localStorage.setItem(ca,JSON.stringify({last_server_updated_at:t.last_server_updated_at||"",pending:!!t.pending}))}catch{}}function Di(){return at(),n.currentRpRoomId&&Array.isArray(n.currentRpMessages)&&(n.rpMessages={...n.rpMessages||{},[n.currentRpRoomId]:n.currentRpMessages.map(G)}),hn({contacts:n.contacts,moments:n.moments,actions:n.actions,globalSettings:n.globalSettings,accountProfile:n.accountProfile,conversations:n.conversations,rpRooms:n.rpRooms,rpMessages:n.rpMessages})}function H(t){try{return JSON.stringify(t)}catch{return""}}function X(t){const e=String(t||"").trim();if(!e)return 0;const a=Date.parse(e);return Number.isFinite(a)?a:0}function ht(t={}){return String(t.content||t.text||t.message||t.body||t.raw_content||"").trim()}function Me(t={}){return!!ht(t)||$i(t)||!!t.typing||!!t.streaming||!!t.thinking||Array.isArray(t.toolCalls)&&t.toolCalls.length>0}function Ri(t={}){const e=String(t.role||t.from||"").toLowerCase(),a=String(t.model||"").toLowerCase(),o=String(t.source||t.provider||"").toLowerCase();return e==="event"||e==="system"&&(a==="event"||o==="activity_event")}function fn(t={}){const e=X(t.created_at||t.timestamp);if(e)return Math.floor(e/6e4);const a=String(t.time||"").trim();return a||""}function ma(t={},e={}){const a=fn(t),o=fn(e);return!!a&&!!o&&a===o}function fa(t={},e={}){const a=G(t),o=G(e);if(a.role!==o.role||ht(a)!==ht(o)||(a.session_id||o.session_id)&&a.session_id!==o.session_id)return!1;const i=X(a.created_at||a.timestamp),r=X(o.created_at||o.timestamp);return i&&r?Math.abs(i-r)<=120*1e3:ma(a,o)}function xe(t={}){const e=G(t),a=new Set;e.id&&a.add(`id:${e.id}`),e.client_message_id&&a.add(`client:${e.client_message_id}`);const o=ht(e);if(o){const i=e.session_id||e.agent_id||"",r=fn(e);a.add(`soft:${i}|${e.role}|${r}|${o}`)}return a}function Ce(t=[],e={}){const a=F(e),o=xe(a);let i=t.findIndex(r=>{const s=xe(r);return[...o].some(c=>s.has(c))});return i===-1&&(i=t.findIndex(r=>fa(r,a))),i===-1?t.push(a):t[i]=F({...t[i],...a}),a}function G(t={}){const e=Ri(t)?"event":String(t.role||t.from||"").toLowerCase()==="user"||t.from==="me"?"user":"ai",a=ht(t),o=String(t.created_at||t.timestamp||""),i=String(t.time||""),r=[String(t.agent_id||""),e,o||i,a].join("|");return{id:String(t.id||r||`${e}_${Date.now()}_${Math.random().toString(36).slice(2,6)}`),session_id:String(t.session_id||""),agent_id:String(t.agent_id||""),client_message_id:String(t.client_message_id||t.clientMessageId||""),role:e,content:a,text:a,created_at:o,time:i,...t.model?{model:t.model}:{},...t.source?{source:t.source}:{},...t.provider?{provider:t.provider}:{},...t.attachments?{attachments:t.attachments}:{},...t.thinking?{thinking:t.thinking}:{},...t.toolCalls?{toolCalls:t.toolCalls}:{}}}function F(t={}){const e=G(t);return{...e,text:e.content,time:e.time||(e.created_at?ct(e.created_at,{fallback:""}):"")}}function Ht(t={}){return!t||typeof t!="object"?{}:Object.fromEntries(Object.entries(t).map(([e,a])=>[String(e),Array.isArray(a)?lt([],a):[]]))}function lt(t=[],e=[]){const a=[],o=new Map;return[...t,...e].forEach(i=>{const r=G(i);if(!Me(r))return;let c=[...xe(r)].map(p=>o.get(p)).find(p=>p>=0);c>=0||(c=a.findIndex(p=>fa(p,r)));const l=c>=0?a[c]:null;if(!l||X(r.created_at)>=X(l.created_at)){const p={...l,...r},m=c>=0?c:a.length;a[m]=p,[...xe(p)].forEach(f=>o.set(f,m))}}),a.filter(Boolean).sort((i,r)=>{const s=X(i.created_at),c=X(r.created_at);return s||c?s-c:String(i.id).localeCompare(String(r.id))})}function ga(t={},e={}){const a=Ht(t),o=Ht(e);return Object.entries(o).forEach(([i,r])=>{a[i]=lt(a[i]||[],r)}),a}function at(){const t=Ht(n.conversations);(n.contacts||[]).forEach(e=>{if(!e?.id)return;const a=Array.isArray(e.messages)?e.messages:[];(a.length||t[e.id]?.length)&&(t[e.id]=lt(t[e.id]||[],a),e.messages=t[e.id].map(F))}),n.conversations=t}function Gt(){const t=Ht(n.conversations);n.contacts=(n.contacts||[]).map(e=>{const o=(t[e.id]||(Array.isArray(e.messages)?e.messages.map(G):[])).map(F),i=o[o.length-1];return{...e,messages:o,lastMessage:i?.text||e.lastMessage||"",lastTime:i?.time||e.lastTime||""}}),n.conversations=t}function Ae(t=[],e=[]){const a=new Map;return t.map(Y).forEach(o=>a.set(o.id.toLowerCase(),o)),e.map(Y).forEach(o=>{const i=o.id.toLowerCase(),r=a.get(i);if(!r){a.set(i,o);return}const s=lt(r.messages||[],o.messages||[]),c={...o,...r,id:r.id||o.id,agent_id:r.agent_id||o.agent_id||r.id||o.id,name:r.name||o.name,display_name:r.display_name||r.name||o.display_name||o.name,bio:r.bio||o.bio,status:r.status||o.status,handle:r.handle||o.handle,roleTag:r.roleTag||o.roleTag,avatar:r.avatar||o.avatar,settings:{...o.settings||{},...r.settings||{}},messages:s.map(F),lastMessage:r.lastMessage||o.lastMessage||s[s.length-1]?.content||"",lastTime:r.lastTime||o.lastTime||s[s.length-1]?.time||""};a.set(i,c)}),[...a.values()]}function Oi(t=[]){for(let e=t.length-1;e>=0;e-=1){const a=String(t[e]?.session_id||"").trim();if(a)return a}return""}function Jt(t={},e=""){const a=String(t.role||"").toLowerCase()==="user"?"user":"ai",o=String(t.created_at||""),i=ht(t),r=String(t.model||"");return G({id:t.id||`${e}|${a}|${o}|${i}`,session_id:t.session_id||"",agent_id:t.agent_id||e,role:a,content:i,text:i,created_at:o,time:o?ct(o,{fallback:""}):"",model:r,...r.toLowerCase()==="codex"?{source:"codex",provider:"codex"}:{}})}async function Wt(t,{silent:e=!0}={}){const a=b(t);if(!a?.id)return 0;try{const o=ea(a),i=[];console.info("[murmur] history request",{contact_id:a.id,tried:o});for(const m of o){const f=new URLSearchParams({agent_id:m,limit:"200"}),h=await fetch(`${S}/api/murmur/messages?${f.toString()}`);if(!h.ok){console.warn("[murmur] history fetch failed",{agent_id:m,status:h.status});continue}const v=await h.json().catch(()=>({})),$=Array.isArray(v?.messages)?v.messages:[];i.push(...$)}const r=lt([],i.map(m=>Jt(m,a.id)).filter(Me));if(console.info("[murmur] history loaded",{agent_id:a.id,tried:o,raw:i.length,renderable:r.length,first:r[0]||null}),!r.length)return 0;const s=H({conversations:ve(a)}),c=lt(ve(a),r);n.conversations={...n.conversations||{},[a.id]:c},a.messages=c.map(F);const l=a.messages[a.messages.length-1];l&&(a.lastMessage=l.text||"",a.lastTime=l.time||"");const p=Oi(c);return p&&(a.sessionId=p),H({conversations:c})!==s&&(dt(),_t(300)),n.currentContactId===a.id&&n.currentView==="room"&&u(),r.length}catch(o){return console.error("[murmur] history load failed",o),0}}function Vi(t={}){const e=String(t.agent_id||t.agentId||"").trim(),a=String(t.content||"").trim(),o=String(t.created_at||t.createdAt||new Date().toISOString());return G({id:t.id?`proactive_${t.id}`:`proactive_${e}_${o}_${a}`,agent_id:e,role:"ai",content:a,created_at:o,source:"proactive"})}function Bi(t=""){const e=String(t||"23:00 - 08:00").match(/(\d{1,2})(?::(\d{2}))?\s*(?:-|—|~|至|到)\s*(\d{1,2})(?::(\d{2}))?/);if(!e)return{start:1380,end:480};const a=Math.max(0,Math.min(23,Number(e[1])||0)),o=Math.max(0,Math.min(59,Number(e[2])||0)),i=Math.max(0,Math.min(23,Number(e[3])||0)),r=Math.max(0,Math.min(59,Number(e[4])||0));return{start:a*60+o,end:i*60+r}}function zi(t="",e=new Date){const{start:a,end:o}=Bi(t),i=e.getHours()*60+e.getMinutes();return a===o?!1:a<o?i>=a&&i<o:i>=a||i<o}function Hi(t){return!n.globalSettings?.proactiveGlobal||!t?.settings?.proactiveEnabled?!1:!zi(t.settings.dndRange||"23:00 - 08:00")}async function ha(t){const e=String(t||"").trim();if(e)try{await fetch(`${S}/api/proactive/${encodeURIComponent(e)}/read`,{method:"POST"})}catch(a){console.warn("[proactive] mark read failed",a)}}async function ba({silent:t=!0}={}){if(!ln){ln=!0;try{const e=await fetch(`${S}/api/proactive?limit=20`);if(!e.ok)throw new Error(`HTTP ${e.status}`);const a=await e.json().catch(()=>({})),o=Array.isArray(a?.messages)?a.messages:[];if(!o.length)return;let i=!1;for(const r of o){const s=Vi(r),c=s.agent_id||String(r.agent_id||"").trim();if(!c||!s.content){await ha(r.id);continue}let l=b(c);if(l||(l=Jn({id:c,agent_id:c,name:String(r.agent_name||r.display_name||c),handle:`@${c}`,messages:[]})),!Hi(l))continue;const p=(n.conversations?.[l.id]||l.messages||[]).length,m=lt(n.conversations?.[l.id]||l.messages||[],[s]);n.conversations={...n.conversations||{},[l.id]:m},l.messages=m.map(F);const f=l.messages[l.messages.length-1];f&&(l.lastMessage=f.text||"",l.lastTime=f.time||""),m.length>p&&!(n.currentView==="room"&&n.currentContactId===l.id)&&(l.unread=Number(l.unread||0)+1),i=!0,await ha(r.id)}i&&(Gt(),dt(),u(),n.currentView==="room"&&j())}catch(e){t||console.warn("[proactive] poll failed",e)}finally{ln=!1}}}function Ni(){pa||(pa=window.setInterval(()=>{ba({silent:!0})},15e3))}function va(t=[],e=[]){const a=new Map;return t.map(P).forEach(o=>a.set(o.id,o)),e.map(P).forEach(o=>{const i=a.get(o.id);if(!i){a.set(o.id,o);return}const r=X(o.updated_at||o.created_at||o.time),s=X(i.updated_at||i.created_at||i.time);a.set(o.id,r>s?{...i,...o}:{...o,...i})}),[...a.values()].sort((o,i)=>X(i.updated_at||i.created_at||i.time)-X(o.updated_at||o.created_at||o.time))}function ji(t=[],e=[],a="id"){const o=new Map;return[...t||[],...e||[]].forEach(i=>{if(!i||typeof i!="object")return;const r=String(i[a]||i.id||"").trim();r&&o.set(r,{...o.get(r)||{},...i})}),[...o.values()]}const Fi="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80";function ya(t){return!t||String(t)===Fi}function Ui(t={},e={}){const a={...t||{},...e||{}};return!ya(t?.avatar)&&ya(e?.avatar)&&(a.avatar=t.avatar),a}function dt(){const t=Di(),e=H(t);if(!e||e===Ie)return!1;Ie=e;try{return localStorage.setItem(ke,JSON.stringify({client_updated_at:new Date().toISOString(),payload:t})),!0}catch{return!1}}function wa(){return dn||(dn=new Map(le.map(t=>{const e=Y(t);return[e.id,H(e)]}))),dn}function Sa(){return pn||(pn=new Map(Ln.map(t=>{const e=P(t);return[e.id,H(e)]}))),pn}function $a(t){if(!Array.isArray(t))return!1;const e=wa();return t.some(a=>{const o=Y(a);return!la.has(o.id)||e.get(o.id)!==H(o)})}function gn(t){if(!t||typeof t!="object")return!1;const e=String(t.id||t.agent_id||"").trim().toLowerCase();if(!la.has(e))return!1;const a=wa(),o=Y({...t,id:e});if(a.get(e)===H(o))return!0;const i=String(t.avatar||"").trim(),r=Array.isArray(t.topics)?t.topics.map(c=>String(c?.id||"")):[],s=Array.isArray(t.messages)?t.messages.map(c=>String(c?.id||"")):[];return e==="ayan"?i.includes("photo-1517841905240-472988babdf9")||s.some(c=>["m1","m2","m3"].includes(c))||r.some(c=>["t1","t2","t3"].includes(c)):e==="azheng"?i.includes("photo-1500530855697-b586d89ba3ee")||s.includes("m4")||r.some(c=>["t4","t5"].includes(c)):e==="xiaoying"?i.includes("photo-1507525428034-b723cf961d3e")||s.includes("m5")||r.includes("t6"):!1}function ka(t){return Array.isArray(t)?t.filter(e=>!gn(e)):[]}function Ki(t){return Array.isArray(t)&&t.length>0&&t.every(e=>gn(e))}function hn(t={}){if(!t||typeof t!="object")return{};const e={...t};return Array.isArray(e.contacts)&&(e.contacts=ka(e.contacts).map(a=>Y(a))),e.conversations&&typeof e.conversations=="object"&&(e.conversations=Ht(e.conversations)),e.rpMessages&&typeof e.rpMessages=="object"&&(e.rpMessages=Ht(e.rpMessages)),Array.isArray(e.moments)&&(e.moments=Te(e.moments).map(P)),e}function Qi(t){if(!Array.isArray(t))return!1;const e=Sa();return t.some(a=>{const o=P(a);return!da.has(o.id)||e.get(o.id)!==H(o)})}function _a(t){if(!t||typeof t!="object")return!1;const e=String(t.id||"").trim();if(!da.has(e))return!1;const a=Sa(),o=P(t);return a.get(e)===H(o)?!0:e==="p0"?String(t.image||"").includes("photo-1507525428034-b723cf961d3e")||String(t.content||"").includes("天空很温柔"):e==="p1"?String(t.content||"").includes("醉了先看这个"):e==="p2"?String(t.content||"").includes("晚上跑了三公里"):!1}function Te(t){return Array.isArray(t)?t.filter(e=>!_a(e)):[]}function Yi(t){return Array.isArray(t)&&t.length>0&&t.every(e=>_a(e))}function Ia(t,{source:e="local"}={}){if(!(!t||typeof t!="object")){if(Array.isArray(t.contacts)){const a=t.contacts.map(r=>Y(r)),o=ka(a).map(r=>Y(r)),i=$a(n.contacts);o.length?(n.contacts=Ae(n.contacts,o),b(n.currentContactId)||(n.currentContactId=n.contacts[0]?.id||"")):Ki(a)?(i||(n.contacts=[]),b(n.currentContactId)||(n.currentContactId=n.contacts[0]?.id||""),console.warn(`[sync] ignored ${e} default mock contacts`)):i?n.contacts=n.contacts.map(r=>Y(r)):(n.contacts=[],n.currentContactId="")}else n.contacts=n.contacts.map(a=>Y(a));if(t.conversations&&typeof t.conversations=="object"?(n.conversations=ga(n.conversations,t.conversations),Gt()):at(),Array.isArray(t.moments)){const a=t.moments.map(P),o=Te(a).map(P),i=Qi(n.moments);o.length?n.moments=va(Te(n.moments),o):Yi(a)?(i||(n.moments=[]),console.warn(`[sync] ignored ${e} default mock moments`)):i?n.moments=Te(n.moments).map(P):n.moments=[]}Array.isArray(t.rpRooms)&&(n.rpRooms=ji(n.rpRooms||[],t.rpRooms||[],"room_id")),t.rpMessages&&typeof t.rpMessages=="object"&&(n.rpMessages=ga(n.rpMessages,t.rpMessages)),Array.isArray(t.actions)&&(n.actions=t.actions),t.globalSettings&&typeof t.globalSettings=="object"&&(n.globalSettings={...n.globalSettings,...t.globalSettings}),t.accountProfile&&typeof t.accountProfile=="object"&&(n.accountProfile=Ui(n.accountProfile,t.accountProfile)),z(),qe()}}function Xi(){try{const t=localStorage.getItem(ke);if(!t)return;const e=JSON.parse(t);if(!e?.payload)return;Ia(e.payload,{source:"local"});const a=hn(e.payload);Ie=H(a),H(e.payload)!==Ie&&localStorage.setItem(ke,JSON.stringify({client_updated_at:e.client_updated_at||new Date().toISOString(),payload:a}))}catch{}}function _t(t=600){if(Yt)return;const e=Xt();zt({...e,pending:!0}),cn&&clearTimeout(cn),cn=window.setTimeout(()=>{Ma()},t)}async function Ma(){if(_e||Yt)return;const t=Xt();if(!t.pending)return;let e=null;try{e=JSON.parse(localStorage.getItem(ke)||"null")}catch{}if(!e?.payload){zt({...t,pending:!1});return}const a=hn(e.payload);_e=!0;try{const o=await fetch(`${S}/api/sync/push`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({device_id:mn(),client_updated_at:e.client_updated_at||new Date().toISOString(),payload:a})});if(!o.ok)throw new Error(`HTTP ${o.status}`);const i=await o.json().catch(()=>({}));zt({last_server_updated_at:i.server_updated_at||t.last_server_updated_at||"",pending:!1})}catch(o){console.warn("[sync] push failed",o),zt({...t,pending:!0})}finally{_e=!1}}async function xa(){if(_e)return;const t=Xt();if(t.pending&&(await Ma(),Xt().pending))return;const e=new URLSearchParams({device_id:mn()});t.last_server_updated_at&&e.set("since",t.last_server_updated_at);try{const a=await fetch(`${S}/api/sync/pull?${e.toString()}`);if(!a.ok)return;const o=await a.json().catch(()=>({})),i=$a(n.contacts);if(!o?.has_update||!o?.payload||o?.is_self&&i){o?.server_updated_at&&zt({...t,last_server_updated_at:o.server_updated_at,pending:t.pending});return}Yt=!0,Ia(o.payload,{source:"remote"}),dt(),zt({last_server_updated_at:o.server_updated_at||t.last_server_updated_at||"",pending:!1}),u()}catch(a){console.warn("[sync] pull failed",a)}finally{Yt=!1}}function Gi(t={}){const e=gt(t.agent_id||t.id);if(!e)return null;const a=String(t.display_name||t.name||e).trim()||e;return Y({id:e,agent_id:e,name:a,display_name:a,bio:String(t.description||t.subtitle||"").trim(),status:"在线",handle:String(t.display_handle||`@${e}`),roleTag:String(t.source||"agent"),avatar:String(t.avatar||"").trim(),pinned:!1,unread:0,lastMessage:"",lastTime:"",topics:[],messages:[]})}function Ca(t={}){const e=gt(t.agent_id||t.id);if(!e)return null;const a=le.find(r=>String(r.id||"").toLowerCase()===e),o=String(t.last_message_at||""),i=String(t.last_message||"").trim();return Y({id:e,agent_id:e,name:String(a?.name||t.display_name||t.name||e).trim()||e,display_name:String(a?.name||t.display_name||t.name||e).trim()||e,bio:"",status:"在线",handle:`@${e}`,roleTag:"recovered",avatar:"",pinned:!1,unread:0,lastMessage:i,lastTime:o?ct(o,{fallback:""}):"",sessionId:String(t.session_id||""),messageCount:Number(t.message_count||0)||0,topics:[],messages:[]})}async function Ji({silent:t=!0}={}){try{const e=await fetch(`${S}/api/agents?include_inactive=true`);if(!e.ok)throw new Error(`HTTP ${e.status}`);const a=await e.json().catch(()=>({})),o=(Array.isArray(a?.agents)?a.agents:[]).filter(r=>r?.is_active!==!1).map(Gi).filter(Boolean).filter(r=>!gn(r));if(console.info("[agents] loaded",o.map(r=>({id:r.id,name:r.name,source:r.roleTag||""}))),!o.length)return;const i=H({contacts:n.contacts});n.contacts=Ae(n.contacts,o),Gt(),(!n.currentContactId||!n.contacts.some(r=>r.id===n.currentContactId))&&(n.currentContactId=n.contacts[0]?.id||""),H({contacts:n.contacts})!==i&&(dt(),_t(100)),Ee(o),u()}catch(e){t||console.warn("[agents] load contacts failed",e)}}async function Wi({silent:t=!0}={}){try{const e=await fetch(`${S}/api/murmur/message-agents?limit=1000`);if(e.status===404){await Zi({silent:t});return}if(!e.ok)throw new Error(`HTTP ${e.status}`);const a=await e.json().catch(()=>({})),o=(Array.isArray(a?.agents)?a.agents:[]).map(Ca).filter(Boolean);if(console.info("[murmur] message agents loaded",o.map(r=>({id:r.id,lastMessage:r.lastMessage,count:r.messageCount||0}))),!o.length)return;const i=H({contacts:n.contacts});n.contacts=Ae(n.contacts,o),Gt(),(!n.currentContactId||!n.contacts.some(r=>r.id===n.currentContactId))&&(n.currentContactId=n.contacts[0]?.id||""),H({contacts:n.contacts})!==i&&(dt(),_t(100)),Ee(o),u()}catch(e){t||console.warn("[murmur] load message agents failed",e)}}async function Zi({silent:t=!0}={}){const e=Array.from(new Set([...le.map(r=>gt(r.id)).filter(Boolean),...n.contacts.map(r=>gt(r.id)).filter(Boolean)])),a=[];for(const r of e)if(r)try{const s=new URLSearchParams({agent_id:r,limit:"1"}),c=await fetch(`${S}/api/murmur/messages?${s.toString()}`);if(!c.ok)continue;const l=await c.json().catch(()=>({})),p=Array.isArray(l?.messages)?l.messages:[];if(!p.length)continue;const m=p[p.length-1]||{};a.push(Ca({agent_id:r,last_message:m.content||"",last_message_at:m.created_at||"",message_count:p.length,session_id:m.session_id||""}))}catch(s){t||console.warn("[murmur] message probe failed",r,s)}const o=a.filter(Boolean);if(console.info("[murmur] message agents probed",o.map(r=>({id:r.id,lastMessage:r.lastMessage,count:r.messageCount||0}))),!o.length)return;const i=H({contacts:n.contacts});n.contacts=Ae(n.contacts,o),Gt(),(!n.currentContactId||!n.contacts.some(r=>r.id===n.currentContactId))&&(n.currentContactId=n.contacts[0]?.id||""),H({contacts:n.contacts})!==i&&(dt(),_t(100)),Ee(o),u()}async function tr(){await Ji(),await Wi(),await Ee(n.contacts),Ro(120)}async function Ee(t=[]){const e=[...new Set((t||[]).map(a=>a?.id).filter(Boolean))];for(const a of e)if(!(n.historyLoadingContactIds[a]||n.historyLoadedContactIds[a])){n.historyLoadingContactIds[a]=!0;try{await Wt(a)&&(n.historyLoadedContactIds[a]=!0)}finally{delete n.historyLoadingContactIds[a]}}}function k(t=800){Yt||(un&&clearTimeout(un),un=window.setTimeout(()=>{dt()&&_t(500)},t))}function L(){const t=new Date;return`${String(t.getHours()).padStart(2,"0")}:${String(t.getMinutes()).padStart(2,"0")}`}function bn(t){const e=t?.settings?.modelProviderId||A("chat")?.providerId||"",a=W(e);if(!a?.baseUrl||!a?.apiKey)return{};const o=Zt(a.apiPath||a.api_path||"",{allowEmpty:!0});return{base_url:a.baseUrl,api_key:a.apiKey,...o?{api_path:o}:{}}}function vn(t){const e=t?.settings||{},a=Number(e.temperature);return Number.isFinite(a)?{temperature:a}:{}}function yn(t,e=""){let a="",o="";try{const s=JSON.parse(t),c=/^(thinking|reasoning|reason|thought|cot|inner_thought)$/i.test(e),l=/^(chat|message|content|text|assistant|reply|response|output)$/i.test(e);c?o=s.thinking??s.reasoning??s.reasoning_content??s.reasoningContent??s.content??s.text??s.delta??"":(a=s.content??s.text??s.delta??"",o=s.thinking??s.reasoning??s.reasoning_content??s.reasoningContent??"")}catch{/^(thinking|reasoning|reason|thought|cot|inner_thought)$/i.test(e)?o=t:a=t}const i=/^tool_call$/i.test(e);let r=null;if(i)try{const s=JSON.parse(t);s.name&&(r={name:String(s.name),status:String(s.status||"done")})}catch{}return{text:wt(a),thinking:wt(o),toolCall:r}}async function Pe(t){const e=String(t?.sessionId||"").trim();if(e){try{const r=await fetch(`${S}/api/sessions/${encodeURIComponent(e)}`);if(r.ok)return e;if(r.status!==404)throw new Error(`校验会话失败（HTTP ${r.status}）`)}catch(r){throw String(r?.message||"").includes("HTTP"),r}t.sessionId=""}const a=await fetch(`${S}/api/sessions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:String(t?.name||"新对话").trim()||"新对话",model:String(t?.settings?.model||n.globalSettings?.defaultModel||"echo").trim()||"echo",source_app:"yui_nook"})}),o=await a.json().catch(()=>({}));if(!a.ok)throw new Error(o.detail||`创建会话失败（HTTP ${a.status}）`);const i=String(o?.session?.id||"").trim();if(!i)throw new Error("创建会话失败：后端没有返回 session.id");return t.sessionId=i,k(120),i}async function wn(t,e,a,o="/api/chat"){let i=await fetch(`${S}${o}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify(e),...a?{signal:a}:{}});if(i.ok)return i;let r="";try{const s=await i.json();r=String(s?.detail||"").trim()}catch{}if(o==="/api/chat"&&i.status===404&&r.includes("会话不存在")){t.sessionId="";const s=await Pe(t);if(e.session_id=s,i=await fetch(`${S}${o}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify(e),...a?{signal:a}:{}}),i.ok)return i}throw new Error(`HTTP ${i.status}`)}async function er(){const t=y()?.querySelector(".chat-input"),e=t?.value?.trim();if(!e||!n.currentRpRoomId)return;const a=b(n.currentContactId)||n.contacts[0],o=Ge();if(!a||!o)return;const i=!!a?.settings?.reasoning_visibility,r=`rp_u_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;Ce(n.currentRpMessages,{id:r,client_message_id:r,role:"user",text:e,content:e,time:L(),timestamp:new Date().toISOString(),created_at:new Date().toISOString()}),t.value="";const s="rp_ai_"+Date.now();n.currentRpMessages.push({id:s,role:"ai",text:"",content:"",time:"",created_at:new Date().toISOString(),typing:!0}),n.currentRpRoomId&&(n.rpMessages[n.currentRpRoomId]=n.currentRpMessages.map(G)),k(120),u(),j();const c={room_id:n.currentRpRoomId,agent_id:o.agent_id||a.id,content:e,client_message_id:r,...a.persona?{persona:a.persona}:{},...a.settings.model?{model:a.settings.model}:{},...vn(a),...bn(a)},l=new AbortController;n.streamingAbortController=l,u();let p="";try{const m=await wn(a,c,l.signal,"/api/rp/chat"),f=()=>n.currentRpMessages.findIndex(I=>I.id===s);n.currentRpMessages[f()]={id:s,role:"ai",text:"",time:L(),typing:!1,streaming:!0},u();const h=m.body.getReader(),v=new TextDecoder;let $="",_="",T="";for(;;){const{done:I,value:C}=await h.read();if(I)break;$+=v.decode(C,{stream:!0});const V=$.split(`
`);$=V.pop()??"";for(const ot of V){const E=ot.trim();if(!E){T="";continue}if(E.startsWith("event:")){T=E.slice(6).trim();continue}if(!E.startsWith("data:"))continue;const R=E.slice(5).trim();if(R==="[DONE]")continue;const B=yn(R,T);let K=B.text;const bt=Ne(B.thinking,p,_),mt=i?bt:"";mt&&_.length<He&&(_=je(_,mt)),K&&(p+=K);const tt=f();tt!==-1&&(n.currentRpMessages[tt]={id:s,role:"ai",text:p,content:p,...i&&_?{thinking:_}:{},time:L(),typing:!1,streaming:!0},u(),j())}}const x=n.currentRpMessages.findIndex(I=>I.id===s);x!==-1&&p.trim()?n.currentRpMessages[x]={...n.currentRpMessages[x],text:p,content:p,...i&&_?{thinking:_}:{},streaming:!1,typing:!1,time:L(),created_at:new Date().toISOString()}:x!==-1&&n.currentRpMessages.splice(x,1),n.streamingAbortController=null,await be(o.agent_id||a.id,{silent:!0}),n.currentRpRoomId&&(n.rpMessages[n.currentRpRoomId]=n.currentRpMessages.map(G)),k(120),u(),j()}catch(m){const f=m.name==="AbortError",h=n.currentRpMessages.findIndex(v=>v.id===s);h!==-1&&(f&&!p.trim()?n.currentRpMessages.splice(h,1):n.currentRpMessages[h]={id:s,role:"ai",text:m.name==="AbortError"?p:`连接失败：${m.message}`,content:m.name==="AbortError"?p:`连接失败：${m.message}`,time:L(),created_at:new Date().toISOString(),typing:!1}),n.streamingAbortController=null,n.currentRpRoomId&&(n.rpMessages[n.currentRpRoomId]=n.currentRpMessages.map(G)),k(120),u()}}function Le(t=n.currentContactId){const e=b(t)||b(n.currentContactId);if(e){if(n.currentContactId=e.id,!We(e)){e.settings={...e.settings||{},ccEnabled:!1},n.toast="只有阿筝能切 Claude Code",u(),window.setTimeout(()=>{n.toast="",u()},1200);return}e.settings={...e.settings||{},ccEnabled:!e.settings?.ccEnabled},n.toast=e.settings.ccEnabled?"Claude Code 已接管这个窗口":"Claude Code 已关闭",k(120),u(),window.setTimeout(()=>{n.toast="",u()},1200)}}async function Sn(){const t=y()?.querySelector(".chat-input"),e=t?.value?.trim()||"",a=(n.chatAttachments||[]).map(Bt).filter(Boolean);if(!e&&!a.length)return;const o=nn(e,a),i=b(n.currentContactId);if(!i)return;Dt();const r=`u_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;Ce(i.messages,{id:r,client_message_id:r,role:"user",text:e,content:e,attachments:a,time:L(),created_at:new Date().toISOString()}),i.lastMessage=an(e,a),i.lastTime="刚刚",t.value="",n.chatAttachments=[];const s="ai_"+Date.now();i.messages.push({id:s,role:"ai",text:"",content:"",time:"",created_at:new Date().toISOString(),typing:!0,source:"claude-code"}),at(),k(120),u(),j();const c=new AbortController;n.streamingAbortController=c,u();try{const l=await fetch(`${S}/api/claude-code/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversation_key:`yui:${i.id}`,agent_id:i.id,content:o,client_message_id:r,reset:!1}),signal:c.signal}),p=await l.json().catch(()=>({}));if(!l.ok)throw new Error(p.detail||`HTTP ${l.status}`);const m=String(p.reply||"").trim(),f=p.user_message&&typeof p.user_message=="object"?Jt(p.user_message,i.id):null,h=p.assistant_message&&typeof p.assistant_message=="object"?{...Jt(p.assistant_message,i.id),source:"claude-code",provider:"claude-code"}:null,v=i.messages.findIndex(_=>_.id===r);v!==-1&&f&&(i.messages[v]=F({...f,content:e,text:e,attachments:a,client_message_id:r}));const $=i.messages.findIndex(_=>_.id===s);$!==-1&&m?i.messages[$]={...h?F(h):{},id:h?.id||s,role:"ai",text:m,content:m,source:"claude-code",provider:"claude-code",time:h?.time||L(),created_at:h?.created_at||new Date().toISOString(),typing:!1}:$!==-1&&i.messages.splice($,1),i.lastMessage=m||o,i.lastTime=L(),at(),k(120),u(),j()}catch(l){const p=l.name==="AbortError";p||console.error("[cc chat] error:",l);const m=i.messages.findIndex(f=>f.id===s);if(m!==-1){const f=p?"":`Claude Code 连接失败：${l.message}`;f?i.messages[m]={id:s,role:"ai",text:f,content:f,source:"claude-code",provider:"claude-code",time:L(),created_at:new Date().toISOString(),typing:!1}:i.messages.splice(m,1)}at(),k(120),u()}finally{n.streamingAbortController=null,u()}}async function $n(){const t=y()?.querySelector(".chat-input"),e=t?.value?.trim()||"",a=(n.chatAttachments||[]).map(Bt).filter(Boolean);if(!e&&!a.length)return;const o=nn(e,a),i=b(n.currentContactId);if(!i)return;Dt();const r=`u_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;Ce(i.messages,{id:r,client_message_id:r,role:"user",text:e,content:e,attachments:a,time:L(),created_at:new Date().toISOString()}),i.lastMessage=an(e,a),i.lastTime="刚刚",t.value="",n.chatAttachments=[];const s="ai_"+Date.now();i.messages.push({id:s,role:"ai",text:"",content:"",time:"",created_at:new Date().toISOString(),typing:!0,source:"codex"}),at(),k(120),u(),j();const c=new AbortController;n.streamingAbortController=c,u();try{const l=await fetch(`${S}/api/codex/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversation_key:`yui:${i.id}`,agent_id:i.id,content:o,client_message_id:r,reset:!1}),signal:c.signal}),p=await l.json().catch(()=>({}));if(!l.ok)throw new Error(p.detail||`HTTP ${l.status}`);const m=String(p.reply||"").trim(),f=p.user_message&&typeof p.user_message=="object"?Jt(p.user_message,i.id):null,h=p.assistant_message&&typeof p.assistant_message=="object"?{...Jt(p.assistant_message,i.id),source:"codex",provider:"codex"}:null,v=i.messages.findIndex(_=>_.id===r);v!==-1&&f&&(i.messages[v]=F({...f,content:e,text:e,attachments:a,client_message_id:r}));const $=i.messages.findIndex(_=>_.id===s);$!==-1&&m?i.messages[$]={...h?F(h):{},id:h?.id||s,role:"ai",text:m,content:m,source:"codex",provider:"codex",time:h?.time||L(),created_at:h?.created_at||new Date().toISOString(),typing:!1}:$!==-1&&i.messages.splice($,1),i.lastMessage=m||o,i.lastTime=L(),at(),k(120),u(),j()}catch(l){const p=l.name==="AbortError";p||console.error("[codex chat] error:",l);const m=i.messages.findIndex(f=>f.id===s);if(m!==-1){const f=p?"":`Codex 连接失败：${l.message}`;f?i.messages[m]={id:s,role:"ai",text:f,content:f,source:"codex",provider:"codex",time:L(),created_at:new Date().toISOString(),typing:!1}:i.messages.splice(m,1)}at(),k(120),u()}finally{n.streamingAbortController=null,u()}}const Nt={},Aa=1500;async function Ta(t){const e=Nt[t];if(!e||!e.texts.length)return;const a=e.texts.splice(0);e.timer&&(clearTimeout(e.timer),e.timer=null),e.listener&&(y()?.querySelector(".chat-input")?.removeEventListener("input",e.listener),e.listener=null),delete Nt[t];const o=b(t);if(!o)return;const i=!!o?.settings?.reasoning_visibility;let r="";try{r=await Pe(o)}catch{return}const s=a.join(`
`),c=`u_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,l="ai_"+Date.now();o.messages.push({id:l,role:"ai",text:"",content:"",time:"",created_at:new Date().toISOString(),typing:!0}),at(),k(120),u(),j();let p=0,m=!1,f=null;const h=()=>{const E=y()?.querySelector(`#thinking-${l}`);if(!E)return;E.textContent=Kt(C),E.classList.add("open","thinking-active"),E.setAttribute("aria-hidden","false");const R=y()?.querySelector(`#cot-wrapper-${l}`);R&&R.removeAttribute("data-slow"),n.openThinkingIds[l]=!0},v=()=>{f===null&&(f=requestAnimationFrame(()=>{f=null,h()}))},$=()=>{f!==null&&(cancelAnimationFrame(f),f=null)},_=setInterval(()=>{if(!p)return;const E=y()?.querySelector(`#cot-wrapper-${l}`);E&&E.toggleAttribute("data-slow",Date.now()-p>8e3)},2e3),T={session_id:r,agent_id:o.id,content:s,client_message_id:c,...o.persona?{persona:o.persona}:{},...o.settings.model?{model:o.settings.model}:{},...vn(o),...bn(o)},x=new AbortController;n.streamingAbortController=x,u();let I="",C="",V=null,ot=!1;try{const E=await wn(o,T,x.signal),R=()=>o.messages.findIndex(re=>re.id===l);o.messages[R()]={id:l,role:"ai",text:"",content:"",time:L(),created_at:new Date().toISOString(),typing:!1,streaming:!0},u();const B=E.body.getReader(),K=new TextDecoder;let bt="",mt="";for(;;){const{done:re,value:Et}=await B.read();if(re)break;bt+=K.decode(Et,{stream:!0});const se=bt.split(`
`);bt=se.pop()??"";let vt=0;for(const Oe of se){const Pt=Oe.trim();if(!Pt){mt="";continue}if(Pt.startsWith("event:")){mt=Pt.slice(6).trim();continue}if(!Pt.startsWith("data:"))continue;const ce=Pt.slice(5).trim();if(ce==="[DONE]")continue;const et=yn(ce,mt);let Lt=et.text;const ue=Ne(et.thinking,I,C),qt=i?ue:"";if(qt){C.length<He&&(C=je(C,qt)),p=Date.now();const rt=R();rt!==-1&&(o.messages[rt]={id:l,role:"ai",text:I,thinking:C,time:L(),typing:!1,streaming:!0},m?v():(m=!0,n.openThinkingIds[l]=!0,u(),j()))}if(et.toolCall){const rt=et.toolCall;V||(V=[]);const Ja=V.find(Wa=>Wa.name===rt.name&&Wa.status!=="done");Ja?Ja.status=rt.status:V.push({name:rt.name,status:rt.status});const Pn=R();Pn!==-1&&(o.messages[Pn]={...o.messages[Pn],toolCalls:V.slice(),streaming:!0},u())}if(Lt){I+=Lt;const rt=R();rt!==-1&&(o.messages[rt]={...o.messages[rt],text:I,content:I,time:L(),typing:!1,streaming:!0},ot?eo(l,I,C):(ot=!0,u(),j()))}vt+=1,vt>=32&&(vt=0,v(),await Vn())}}clearInterval(_),$(),n.streamingAbortController=null;const tt=R(),N=I.trim();o.lastMessage=N||"已处理",o.lastTime=L();const Tt=y()?.querySelector(`#thinking-${l}`);Tt&&Tt.classList.remove("thinking-active");const ie=y()?.querySelector(`#cot-wrapper-${l}`);ie&&ie.removeAttribute("data-slow"),i&&C&&delete n.openThinkingIds[l];const Ft=zn(N);tt!==-1&&Ft.length>1?(o.messages.splice(tt,1),u(),j(),await Bn(180),await Hn(o,Ft,{startIndex:tt,thinking:i?C:"",toolCalls:V})):(tt!==-1&&N?o.messages[tt]={id:l,role:"ai",text:N,content:N,...i&&C?{thinking:C}:{},...V?{toolCalls:V}:{},time:L(),created_at:new Date().toISOString(),typing:!1}:tt!==-1&&o.messages.splice(tt,1),at(),k(120),u(),j())}catch(E){clearInterval(_),$(),n.streamingAbortController=null;const R=E.name==="AbortError";R||console.error("[chat SSE] error:",E);const B=o.messages.findIndex(K=>K.id===l);if(B!==-1){const K=R?I.trim():`连接失败：${E.message}，请稍后再试。`;K?o.messages[B]={id:l,role:"ai",text:K,content:K,...i&&C?{thinking:C}:{},time:L(),created_at:new Date().toISOString(),typing:!1}:o.messages.splice(B,1)}R&&I&&(o.lastMessage=I,o.lastTime=L()),at(),k(120),u()}}async function kn(){const t=y()?.querySelector(".chat-input"),e=t?.value?.trim()||"",a=(n.chatAttachments||[]).map(Bt).filter(Boolean);if(!e&&!a.length)return;const o=nn(e,a),i=b(n.currentContactId);if(!i)return;Dt();let r="";try{r=await Pe(i)}catch{n.toast="无法创建会话，请稍后再试。",u(),window.setTimeout(()=>{n.toast="",u()},1500);return}const s=`u_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;Ce(i.messages,{id:s,client_message_id:s,session_id:r,agent_id:i.id,role:"user",text:e,content:e,attachments:a,time:L(),created_at:new Date().toISOString()}),i.lastMessage=an(e,a),i.lastTime="刚刚",t.value="",n.chatAttachments=[],at(),k(120),u(),j(),Nt[i.id]||(Nt[i.id]={texts:[],timer:null,listener:null});const c=Nt[i.id];c.texts.push(o),c.timer&&clearTimeout(c.timer),c.listener||(c.listener=()=>{const l=Nt[i.id];l?.texts.length&&(clearTimeout(l.timer),l.timer=setTimeout(()=>Ta(i.id),Aa))},t.addEventListener("input",c.listener)),c.timer=setTimeout(()=>Ta(i.id),Aa)}async function nr(t){const e=b(n.currentContactId);if(!e)return;Dt();const a=!!e?.settings?.reasoning_visibility,o=e.messages.findIndex(l=>l.id===t);if(o===-1||e.messages[o].role!=="ai")return;let i="";try{i=await Pe(e)}catch(l){console.error("[session] create failed:",l),n.toast=`无法创建会话：${l.message}`,u(),window.setTimeout(()=>{n.toast="",u()},1500);return}e.messages[o]={...e.messages[o],typing:!0,text:"",streaming:!1},u();const r=[...e.messages].reverse().find(l=>l.role==="user");if(!r)return;const s={session_id:i,agent_id:e.id,content:r.text,...e.persona?{persona:e.persona}:{},...e.settings.model?{model:e.settings.model}:{},...vn(e),...bn(e)},c=new AbortController;n.streamingAbortController=c;try{const l=await wn(e,s,c.signal);e.messages[o]={...e.messages[o],typing:!1,text:"",streaming:!0},u();const p=l.body.getReader(),m=new TextDecoder;let f="",h="",v="",$=null;const _=t;let T="",x=0,I=!1,C=null;const V=()=>{const N=y()?.querySelector(`#thinking-${_}`);if(!N)return;N.textContent=Kt(v),N.classList.add("open","thinking-active"),N.setAttribute("aria-hidden","false");const Tt=y()?.querySelector(`#cot-wrapper-${_}`);Tt&&Tt.removeAttribute("data-slow"),n.openThinkingIds[_]=!0},ot=()=>{C===null&&(C=requestAnimationFrame(()=>{C=null,V()}))},E=()=>{C!==null&&(cancelAnimationFrame(C),C=null)},R=setInterval(()=>{if(!x)return;const N=y()?.querySelector(`#cot-wrapper-${_}`);N&&N.toggleAttribute("data-slow",Date.now()-x>8e3)},2e3);for(;;){const{done:N,value:Tt}=await p.read();if(N)break;f+=m.decode(Tt,{stream:!0});const ie=f.split(`
`);f=ie.pop()??"";let Ft=0;for(const re of ie){const Et=re.trim();if(!Et){T="";continue}if(Et.startsWith("event:")){T=Et.slice(6).trim();continue}if(!Et.startsWith("data:"))continue;const se=Et.slice(5).trim();if(se==="[DONE]")continue;const vt=yn(se,T);let Oe=vt.text;const Pt=Ne(vt.thinking,h,v),ce=a?Pt:"";if(ce){v.length<He&&(v=je(v,ce)),x=Date.now();const et=e.messages.findIndex(Lt=>Lt.id===_);et!==-1&&(e.messages[et]={...e.messages[et],thinking:v,streaming:!0},I?ot():(I=!0,n.openThinkingIds[_]=!0,u()))}if(vt.toolCall){const et=vt.toolCall;$||($=[]);const Lt=$.find(qt=>qt.name===et.name&&qt.status!=="done");Lt?Lt.status=et.status:$.push({name:et.name,status:et.status});const ue=e.messages.findIndex(qt=>qt.id===_);ue!==-1&&(e.messages[ue]={...e.messages[ue],toolCalls:$.slice(),streaming:!0},u())}Oe&&(h+=Oe),Ft+=1,Ft>=32&&(Ft=0,ot(),await Vn())}}clearInterval(R),E(),n.streamingAbortController=null;const B=e.messages.findIndex(N=>N.id===_),K=h.trim(),bt=y()?.querySelector(`#thinking-${_}`);bt&&bt.classList.remove("thinking-active");const mt=y()?.querySelector(`#cot-wrapper-${_}`);mt&&mt.removeAttribute("data-slow"),a&&v&&delete n.openThinkingIds[_];const tt=zn(K);B!==-1&&tt.length>1?(e.messages.splice(B,1),u(),await Bn(180),await Hn(e,tt,{startIndex:B,thinking:a?v:"",toolCalls:$})):(B!==-1&&K?e.messages[B]={...e.messages[B],text:K,...a&&v?{thinking:v}:{},...$?{toolCalls:$}:{},streaming:!1}:B!==-1&&e.messages.splice(B,1),u())}catch(l){clearInterval(_rerollSlowTimer),_cancelRerollFlush(),n.streamingAbortController=null;const p=l.name==="AbortError";p||console.error("[reroll SSE] error:",l);const m=e.messages.findIndex(f=>f.id===rerollId);if(m!==-1){const f=p?fullText.trim():`重试失败：${l.message}`;f?e.messages[m]={...e.messages[m],text:f,...fullThinking?{thinking:fullThinking}:{},...fullToolCalls?{toolCalls:fullToolCalls}:{},streaming:!1}:e.messages.splice(m,1)}u()}}function j(){requestAnimationFrame(()=>{const t=y()?.querySelector(".messages-panel");t&&(t.scrollTop=t.scrollHeight)})}function ar(){const t=b(n.currentContactId)||n.contacts[0]||{},e=n.currentView==="room"?Ue(t).map(Vo).join(""):"";return`
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
        ${e?`<div class="action-scroll attach-action-scroll">${e}</div>`:""}
      </div>
    `}const Ea=window.openPage;typeof Ea=="function"&&(window.openPage=function(e,a){Ea(e,a),e==="page-chat"&&Qn()});const or=[{id:"openai",name:"OpenAI",enabled:!0,baseUrl:"https://api.openai.com/v1",apiPath:"",apiKey:"",models:["gpt-5.4","gpt-5.4-mini","gpt-4.1-mini"],defaultModel:"gpt-5.4"},{id:"openrouter",name:"OpenRouter",enabled:!0,baseUrl:"https://openrouter.ai/api/v1",apiPath:"",apiKey:"",models:["openai/gpt-5","anthropic/claude-sonnet-4.5","anthropic/claude-opus-4.1","anthropic/claude-3.7-sonnet"],defaultModel:"openai/gpt-5"},{id:"gemini",name:"Gemini",enabled:!0,baseUrl:"https://generativelanguage.googleapis.com/v1beta/openai",apiPath:"",apiKey:"",models:["gemini-2.5-pro","gemini-2.5-flash"],defaultModel:"gemini-2.5-pro"},{id:"deepseek",name:"DeepSeek",enabled:!1,baseUrl:"https://api.deepseek.com/v1",apiPath:"",apiKey:"",models:["deepseek-chat","deepseek-reasoner"],defaultModel:"deepseek-chat"},{id:"qwen",name:"阿里云千问",enabled:!1,baseUrl:"https://dashscope.aliyuncs.com/compatible-mode/v1",apiPath:"",apiKey:"",models:["qwen-max","qwen-plus","qwen-turbo"],defaultModel:"qwen-max"},{id:"zhipu",name:"智谱",enabled:!1,baseUrl:"https://open.bigmodel.cn/api/paas/v4",apiPath:"",apiKey:"",models:["glm-4.5","glm-4-air"],defaultModel:"glm-4.5"},{id:"siliconflow",name:"SiliconFlow",enabled:!1,baseUrl:"https://api.siliconflow.cn/v1",apiPath:"",apiKey:"",models:["deepseek-ai/DeepSeek-V3","deepseek-ai/DeepSeek-R1","Qwen/Qwen2.5-72B-Instruct"],defaultModel:"deepseek-ai/DeepSeek-V3"}],Pa={openai:["gpt-5.4","gpt-5.4-mini","gpt-4.1","gpt-4.1-mini","o4-mini"],openrouter:["openai/gpt-5","openai/gpt-4.1","anthropic/claude-sonnet-4.5","anthropic/claude-opus-4.1","anthropic/claude-3.7-sonnet","anthropic/claude-3.5-sonnet","anthropic/claude-3.5-haiku","google/gemini-2.5-pro","google/gemini-2.5-flash","deepseek/deepseek-chat","deepseek/deepseek-r1","qwen/qwen-max"],aggregate:["openai/gpt-5","gpt-5","gpt-4.1","anthropic/claude-sonnet-4.5","anthropic/claude-opus-4.1","anthropic/claude-3.7-sonnet","claude-sonnet-4-5","claude-opus-4-1","claude-3-7-sonnet-latest","google/gemini-2.5-pro","google/gemini-2.5-flash","deepseek/deepseek-chat","qwen/qwen-max"],anthropic:["claude-opus-4-5","claude-sonnet-4-5","claude-haiku-4-5","claude-opus-4-1","claude-sonnet-4-0","claude-3-7-sonnet-latest","claude-3-5-haiku-latest"],gemini:["gemini-2.5-pro","gemini-2.5-flash","gemini-2.0-flash","gemini-1.5-pro"],deepseek:["deepseek-chat","deepseek-reasoner"],zhipu:["glm-4.5","glm-4-air","glm-4-flash"],siliconflow:["deepseek-ai/DeepSeek-V3","deepseek-ai/DeepSeek-R1","Qwen/Qwen2.5-72B-Instruct","Qwen/Qwen2.5-32B-Instruct","THUDM/GLM-4-9B-0414"]},_n=new Set(["aiInterface","defaultModels","modelSlot","providerCatalog","providerEditor","promptEditor","themeSettings","accountSettings","memoryService","backendSync","exportSettings","mcpLibrary"]),ir=me,rr=Qe,sr=Ye,La=sn;n.viewStack=n.viewStack||[],n.activeModelSlot=n.activeModelSlot||"chat",n.activeModelSlotContext=n.activeModelSlotContext||"global",n.activeModelProviderId=n.activeModelProviderId||"",n.providerDraftId=n.providerDraftId||null,n.providerAdvancedOpen=!!n.providerAdvancedOpen,n.providerEditorDraft=n.providerEditorDraft||null,n.providerModelMenuOpen=!!n.providerModelMenuOpen,n.providerModelSyncingId=n.providerModelSyncingId||"",n.providerModelSyncStatus=n.providerModelSyncStatus&&typeof n.providerModelSyncStatus=="object"?n.providerModelSyncStatus:{},n.providerKeyVisible=!!n.providerKeyVisible,n.modelSlotMenuOpen=!!n.modelSlotMenuOpen,n.providerSearch=n.providerSearch||"",n.activePromptSlot=n.activePromptSlot||"summary";function U(t){const e=String(t||"").trim();return e?e==="ocr"?"vision":e==="title"?"summary":e:"chat"}n.aiSettingsSaving=!1,n.memoryServiceEntries=Array.isArray(n.memoryServiceEntries)?n.memoryServiceEntries:[],n.memoryServiceLoading=!!n.memoryServiceLoading,n.slotVendorGroupOpen=n.slotVendorGroupOpen&&typeof n.slotVendorGroupOpen=="object"?n.slotVendorGroupOpen:{},n.providerModelVendorOpen=n.providerModelVendorOpen&&typeof n.providerModelVendorOpen=="object"?n.providerModelVendorOpen:{};function cr(){return"/chat/completions"}function Zt(t,{allowEmpty:e=!1}={}){const a=String(t||"").trim();return a?a.startsWith("/")?a:`/${a}`:e?"":cr()}function ur(t={}){return Zt(t.apiPath||t.api_path||"",{allowEmpty:!1})}function te(t={}){const e=Zt(t.apiPath||t.api_path||"",{allowEmpty:!0});return{...t,baseUrl:t.baseUrl||t.base_url||"",apiKey:t.apiKey||t.api_key||"",apiPath:e,api_path:e,models:J(t.models),defaultModel:q(t.defaultModel||t.default_model||"")}}function q(t){if(typeof t!="string")return"";const e=t.trim().replace(/\s+/g," ");return!e||e.length>180||/[<>]/.test(e)||/<\/?[a-z][\s\S]*>/i.test(e)||/<!doctype|<html|<\/div|<\/body/i.test(e)||/[\u0000-\u001f\u007f]/.test(e)?"":e}function J(t){const e=Array.isArray(t)?t:[],a=new Set,o=[];return e.forEach(i=>{const r=typeof i=="string"?i:i&&typeof i=="object"?i.id||i.name||i.model||i.slug:"",s=q(r),c=s.toLowerCase();s&&!a.has(c)&&(a.add(c),o.push(s))}),o}function In(t={}){const e=String(t.id||"").toLowerCase(),a=String(t.name||"").toLowerCase(),o=String(t.baseUrl||t.base_url||"").toLowerCase();return e.includes("openrouter")||a.includes("openrouter")||o.includes("openrouter.ai")?"openrouter":e.includes("jiushi")||a.includes("玖时")||o.includes("jiushi.xin")?"aggregate":e.includes("silicon")||a.includes("silicon")||o.includes("siliconflow")?"siliconflow":e.includes("deepseek")||a.includes("deepseek")||o.includes("deepseek")?"deepseek":e.includes("anthropic")||e.includes("claude")||a.includes("anthropic")||a.includes("claude")||o.includes("anthropic.com")?"anthropic":e.includes("gemini")||a.includes("gemini")||o.includes("generativelanguage")?"gemini":e.includes("zhipu")||a.includes("智谱")||o.includes("bigmodel")?"zhipu":e.includes("openai")||a.includes("openai")||o.includes("openai.com")?"openai":e||"custom"}function lr(t={}){const e=In(t);if(e==="aggregate"||e==="openrouter")return!0;if(["openai","anthropic","gemini","deepseek","zhipu","siliconflow"].includes(e))return!1;const a=String(t.baseUrl||t.base_url||"").toLowerCase();return a?!/(openai\.com|anthropic\.com|generativelanguage|deepseek\.com|bigmodel\.cn|siliconflow\.cn)/.test(a):!1}function Mn(t={}){const e=In(t),a=Pa[e]||[],o=lr(t)?Pa.aggregate:[];return J([...a,...o])}function dr(t=""){const e=String(t||"").trim();if(!e)return"";const a=e.slice(-4);return`${e.startsWith("sk-")?"sk-":""}••••${a}`}function It(t,e,a){const o=String(t||n.providerDraftId||"current");n.providerModelSyncStatus[o]={type:e,message:a}}function pr(t,e="模型"){const a=q(t);if(!a)throw new Error(`${e} 不是合法模型 ID，不能包含 HTML、控制字符或过长内容`);return a}function xn(t={}){const e={...t||{}};return e.model&&(e.model=q(e.model)),e.providerId&&(e.providerId=String(e.providerId||"").trim()),e}function Mt(){return{providers:or.map(t=>te({...t,models:[...t.models]})),defaultModels:{chat:{providerId:"openai",model:"gpt-5.4",useChatModel:!1},summary:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},vision:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},translate:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},consciousness:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},voice:{provider:"",service_url:"",base_url:"",voice_id:"",speaker:"",emotion:"",speed:1,format:""}},defaultPrompts:{chat:"Respond naturally, stay consistent with the current role and context, and keep the tone warm and clear.",summary:"Write a concise conversation summary with key facts, action items, and follow-ups.",translate:"Translate the content accurately while preserving tone and formatting when possible.",vision:"Extract visible text from the image and explain key visual information clearly.",consciousness:"Review recent context, infer useful next-step thoughts, and keep the result concise and actionable."},mcpLibrary:to()}}function z(){if(!n.globalSettings.aiSettings)n.globalSettings.aiSettings=Mt();else{const t=n.globalSettings.aiSettings;t.defaultModels=t.defaultModels||{},t.defaultPrompts=t.defaultPrompts||{},t.providers=Array.isArray(t.providers)?t.providers:[];const e=new Map(t.providers.map(a=>[a.id,te(a)]));Mt().providers.forEach(a=>{e.has(a.id)||e.set(a.id,a)}),t.providers=[...e.values()],t.defaultModels.ocr&&!t.defaultModels.vision&&(t.defaultModels.vision={...t.defaultModels.ocr}),t.defaultPrompts.ocr&&!t.defaultPrompts.vision&&(t.defaultPrompts.vision=t.defaultPrompts.ocr),delete t.defaultModels.ocr,delete t.defaultPrompts.ocr,delete t.defaultModels.title,delete t.defaultPrompts.title,Object.entries(Mt().defaultModels).forEach(([a,o])=>{t.defaultModels[a]||(t.defaultModels[a]={...o}),a!=="voice"&&(t.defaultModels[a]=xn(t.defaultModels[a]))}),Object.entries(Mt().defaultPrompts).forEach(([a,o])=>{typeof t.defaultPrompts[a]!="string"&&(t.defaultPrompts[a]=o)})}return n.globalSettings.aiSettings}function mr(t={}){const e=Mt(),a={...t||{}};a.defaultModels?.ocr&&!a.defaultModels?.vision&&(a.defaultModels={...a.defaultModels,vision:a.defaultModels.ocr}),a.defaultPrompts?.ocr&&!a.defaultPrompts?.vision&&(a.defaultPrompts={...a.defaultPrompts,vision:a.defaultPrompts.ocr});const o={providers:e.providers,defaultModels:{...e.defaultModels},defaultPrompts:{...e.defaultPrompts},mcpLibrary:{...e.mcpLibrary,tools:[...e.mcpLibrary?.tools||[]]}};if(Array.isArray(a.providers)&&a.providers.length){const i=new Map(e.providers.map(r=>[r.id,r]));a.providers.forEach(r=>{const s=te(r);i.set(s.id,{...i.get(s.id),...s,models:Array.isArray(s.models)&&s.models.length?s.models:i.get(s.id)?.models||[]})}),o.providers=[...i.values()]}a.defaultModels&&Object.keys(o.defaultModels).forEach(i=>{if(a.defaultModels[i]){const r={...o.defaultModels[i],...a.defaultModels[i]};o.defaultModels[i]=i==="voice"?r:xn(r)}}),a.defaultPrompts&&Object.keys(o.defaultPrompts).forEach(i=>{typeof a.defaultPrompts[i]=="string"&&(o.defaultPrompts[i]=a.defaultPrompts[i])}),a.mcpLibrary&&Array.isArray(a.mcpLibrary.tools)&&(o.mcpLibrary={...o.mcpLibrary,...a.mcpLibrary,tools:a.mcpLibrary.tools.map(ft)}),n.globalSettings.aiSettings=o,typeof a.consciousnessLoop=="boolean"&&(n.globalSettings.consciousnessLoop=a.consciousnessLoop),qe()}function qe(){const t=z(),e=t.defaultModels.chat,a=t.providers.find(o=>o.id===e.providerId);n.globalSettings.defaultModel=q(e.model)||Mt().defaultModels.chat.model,n.globalSettings.provider=a?.name||"OpenAI"}function W(t){return z().providers.find(e=>e.id===t)}function Cn(t=n.providerDraftId){const e=te(W(t)||{id:t||`custom_${Date.now()}`,name:"",enabled:!0,baseUrl:"",apiPath:"",apiKey:"",models:[],defaultModel:""}),a=J(e.models),o=J([...a,...Mn(e)]).map(ee);return{...e,models:a,_allModels:o,_selectedModelIds:new Set(a),_apiKeyDirty:!1}}function O(){return(!n.providerEditorDraft||n.providerEditorDraft.id!==n.providerDraftId)&&(n.providerEditorDraft=Cn()),n.providerEditorDraft}function qa(t="",e=[]){const a=String(t||"").trim().toLowerCase(),o=J(e);return a?o.filter(i=>String(i||"").toLowerCase().includes(a)):o}function Da(t){const e=String(t||"").toLowerCase();return/deepseek/.test(e)?"DeepSeek":/\bglm\b|chatglm/.test(e)?"GLM":/\bqwen\b|qwq/.test(e)?"Qwen":/\bgpt[-\d]|^gpt|^o[134][-\d]|text-davinci|text-curie/.test(e)?"OpenAI":/claude/.test(e)?"Anthropic":/gemini|gemma/.test(e)?"Google":/\bllama\b|meta-llama/.test(e)?"Meta":/mistral|mixtral|codestral/.test(e)?"Mistral":/\byi[-/_]/.test(e)?"01.AI":/moonshot|kimi/.test(e)?"Moonshot":/hunyuan/.test(e)?"Hunyuan":/ernie|wenxin/.test(e)?"ERNIE":/doubao/.test(e)?"Doubao":/baichuan/.test(e)?"Baichuan":/spark/.test(e)?"Spark":/internlm/.test(e)?"InternLM":"Other"}function Ra(t){const e=String(t||"").toLowerCase(),a=["chat","text"];return/vl\b|vision|visual|\bvision\b|-v\d|\bimg\b/.test(e)&&a.push("vision"),/reason|r1\b|think\b|cot\b/.test(e)&&a.push("reasoning"),/image|draw|flux|paint|artist|diffusion/.test(e)&&a.push("image"),a.push("tools"),a}function ee(t){const e=String(t||"").trim();return{id:e,name:e,vendor:Da(e),capabilities:Ra(e)}}const fr={chat:"瀵硅瘽",text:"鏂囨湰",reasoning:"鎺ㄧ悊",tools:"宸ュ叿璋冪敤",vision:"瑙嗚",image:"鐢熷浘"},gr=["reasoning","tools","vision","image"],hr={reasoning:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M5 .5A3 3 0 0 0 2.8 5.9l.2.3V8h4V6.2l.2-.3A3 3 0 0 0 5 .5zm-1.2 8h2.4v.5c0 .28-.22.5-.5.5H4.3a.5.5 0 0 1-.5-.5V8.5z"/></svg>',tools:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M7.5 1a2 2 0 0 0-1.86 2.73L1.2 8.16a.6.6 0 0 0 .84.84l4.43-4.44A2 2 0 1 0 7.5 1zm0 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>',vision:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5 2C2.5 2 .8 5 .8 5S2.5 8 5 8s4.2-3 4.2-3S7.5 2 5 2zm0 4.5A1.5 1.5 0 1 1 5 3.5a1.5 1.5 0 0 1 0 3z"/></svg>',image:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M1.5 1A.5.5 0 0 0 1 1.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-7A.5.5 0 0 0 8.5 1h-7zM2 8l2-2.5 1.3 1.7 1.7-2.2L9 8H2zm.8-4.3a.7.7 0 1 0 1.4 0 .7.7 0 0 0-1.4 0z"/></svg>'};function br(t){return(Array.isArray(t?.capabilities)?t.capabilities:Ra(t?.name||"")).filter(a=>gr.includes(a)).map(a=>`<span class="model-cap-badge cap-${a}" title="${fr[a]||a}">${hr[a]||a}</span>`).join("")}function Oa(t="",e=[]){const a=String(t||"").trim();return!Array.isArray(e)||!e.length?"还没有已同步模型，仍可手动输入并保存。":a?e.some(i=>String(i).toLowerCase()===a.toLowerCase())?"已匹配到已同步列表中的模型。":"当前模型不在已同步列表中，可继续手动保存。":`已同步 ${e.length} 个模型，可搜索或展开列表选择。`}function An(t="",e=[]){const a=String(t||"").trim();return!Array.isArray(e)||!e.length?"当前供应商还没有同步模型，可切换供应商或先同步。":a?e.some(i=>String(i).toLowerCase()===a.toLowerCase())?"已匹配到当前供应商模型。":"当前输入不在同步列表中。":`已同步 ${e.length} 个模型，可搜索或展开列表选择。`}function xt(){const t=O(),e=document.getElementById("provider-default-model-input"),a=document.getElementById("provider-default-model-menu"),o=document.getElementById("provider-default-model-hint");if(!a||!o)return;const i=e?.value||t.defaultModel||"",r=J([...Array.isArray(t.models)?t.models:[],...Array.isArray(t._allModels)?t._allModels.map(c=>c?.id||c?.name||""):[]]),s=qa(i,r);if(o.textContent=Oa(i,r),!n.providerModelMenuOpen){a.innerHTML="",a.classList.remove("open");return}a.classList.add("open"),a.innerHTML=s.length?s.map((c,l)=>`
          <button class="provider-model-option ${String(c).toLowerCase()===String(i).trim().toLowerCase()?"active":""}" data-action="pick-provider-default-model" data-model-index="${l}" type="button">
            <span>${d(c)}</span>
            ${String(c).toLowerCase()===String(i).trim().toLowerCase()?"<em>已选</em>":""}
          </button>
        `).join(""):'<div class="provider-model-empty">没有获取到模型，仍可手动输入保存。</div>'}function A(t){return z().defaultModels[U(t)]}function vr(){const t=n.activeModelSlot,e=n.activeModelSlotContext==="contact",a=b(n.currentContactId)||n.contacts[0],o=e?{providerId:a?.settings?.modelProviderId||n.activeModelProviderId||A("chat")?.providerId||"openai",model:t==="consciousness"?a?.settings?.loopModel||"":a?.settings?.model||""}:De(t),i=W(o?.providerId)||W(A("chat")?.providerId);return{slot:o,provider:i,models:i?.models||[]}}function ne(){const t=document.getElementById("model-slot-menu"),e=document.getElementById("model-slot-hint"),a=document.getElementById("model-slot-input");if(!t||!e)return;const{slot:o,models:i}=vr(),r=a?.value||o?.model||"";e.textContent=An(r,J(i)),t.innerHTML="",t.classList.remove("open")}function De(t){return A(U(t))}function jt(t){const e=U(t);return{chat:"聊天模型",summary:"摘要模型",vision:"Vision 模型",translate:"翻译模型",consciousness:"意识循环模型",voice:"语音模型"}[e]||e}function Re(t){const e=U(t);return{chat:"全局默认使用的聊天模型。",summary:"用于生成对话摘要，推荐选择便宜且稳定的模型。",vision:"用于识图、OCR 与截图分析的统一入口。",translate:"用于翻译消息内容，推荐选择速度快的模型。",consciousness:"用于意识循环、主动思考与相关后台能力。",voice:"用于文本转语音，读取语音服务地址与 voice ID。"}[e]||""}function Va(t){const e=U(t),a=De(e);if(e==="voice"){if(!a)return"未设置";const i=a.provider||"语音服务",r=a.voice_id||a.voiceId||"未设置";return`${i} / ${r}`}const o=W(a?.providerId);return a?`${o?.name||"未设置"} / ${a.model||"未设置"}`:"未设置"}function yr(t){return z().defaultPrompts?.[U(t)]||""}function wr(t){const e=U(t);return{chat:g("comment"),summary:g("file"),vision:g("search"),translate:g("chatArrow"),consciousness:g("history"),voice:g("mic")}[e]||g("file")}function Sr(t){const e=U(t);return e!=="chat"&&e!=="voice"}function $r(t){return`
      <article class="default-model-card">
        <div class="default-model-head">
          <div class="default-model-icon">${wr(t)}</div>
          <div class="default-model-copy">
            <strong>${d(jt(t))}</strong>
            <p>${d(Re(t))}</p>
          </div>
          ${Sr(t)?`<button class="model-gear-btn" data-action="open-prompt-editor" data-slot="${t}" aria-label="提示词设置">${g("settings")}</button>`:'<span class="header-spacer"></span>'}
        </div>
        <button class="model-value-pill" data-action="open-model-slot" data-slot="${t}">
          <span class="model-value-badge">使</span>
          <span>${d(Va(t))}</span>
        </button>
      </article>
    `}function kr(){const t=U(n.activePromptSlot),e=yr(t);return`
      <section class="settings-page page-block ai-settings-page ai-prompt-page">
        <div class="settings-group glass-frost ai-panel ai-form-group">
          <h3>${d(jt(t))} 提示词</h3>
          <p class="section-eyebrow">用于定义这个能力位的默认提示词模板，后续接入对应后端任务时会直接使用这里的内容。</p>
          <textarea id="slot-prompt-input" class="ai-textarea ai-prompt-textarea" placeholder="在这里输入默认提示词">${d(e)}</textarea>
          <p class="section-eyebrow">变量位后续可以继续扩展，目前先支持按能力位单独保存。</p>
        </div>
        <div class="settings-group glass-frost ai-panel ai-prompt-actions">
          <button class="ghost-action prompt-reset-btn" data-action="reset-slot-prompt" data-slot="${t}">重置为默认</button>
          <button class="bottom-tab active prompt-save-btn" data-action="save-slot-prompt" data-slot="${t}">保存</button>
        </div>
      </section>
    `}function _r(){const t=[{id:"奶油粉",key:"rose",desc:"柔和粉白"},{id:"云雾灰",key:"mist",desc:"冷淡浅灰"},{id:"奶油杏",key:"cream",desc:"暖调米白"}],e=[{id:"windowsill",key:"windowsill",name:"窗台",desc:"鼠尾草·陶土·亚麻 · 冷静工具感"},{id:"tape",key:"tape",name:"磁带",desc:"磨砂玻璃·钓色·等宽字 · 软件诚实"}],a=n.globalSettings.theme,o=qn.includes(a);return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>全局配色</h3>
          <p class="section-eyebrow">首页、列表、设置页的底色调。</p>
          <div class="theme-choice-list">
            ${t.map(i=>`
              <button class="theme-choice-item ${!o&&(a===i.id||a===i.key)?"active":""}" data-action="pick-theme-mode" data-theme="${i.id}">
                <span class="theme-choice-copy">
                  <strong>${d(i.id)}</strong>
                  <em>${d(i.desc)}</em>
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
            ${e.map(i=>`
              <button class="theme-choice-item ${a===i.id?"active":""}" data-action="pick-theme-mode" data-theme="${i.id}">
                <span class="theme-choice-copy">
                  <strong>${d(i.name)}</strong>
                  <em>${d(i.desc)}</em>
                </span>
                <span class="theme-choice-check">${a===i.id?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `}function Ir(){const t=n.accountProfile||{};return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>我的账号</h3>
          ${M("头像","更换头像","open-account-avatar")}
          ${M("昵称",t.nickname||"小酒","open-account-nickname")}
          ${M("个性签名",t.signature||"管理个人资料与基础偏好","open-account-signature")}
          <input id="account-avatar-file" class="moment-image-input" type="file" accept="image/*" />
        </div>
      </section>
    `}function Mr(t){const e=Math.max(0,Math.min(100,Number(t)||0)),a=e>60?"#c9908a":e>30?"#c8a07a":"#b0b0b8";return`<span style="display:inline-flex;align-items:center;gap:4px;font-size:10px;color:${a};">
          <span style="display:inline-block;width:${Math.round(e*.36)}px;max-width:36px;min-width:2px;height:3px;border-radius:2px;background:${a};"></span>
          ${e>0?`热度 ${e}`:""}
        </span>`}function xr(){const t=b(n.currentContactId)||n.contacts[0],e=Array.isArray(n.memoryServiceEntries)?n.memoryServiceEntries:[],a=Array.isArray(n.memoryCandidates)?n.memoryCandidates:[],o=n.memoryServiceSort||"updated_at",i=[{key:"updated_at",label:"最新"},{key:"importance",label:"最重要"},{key:"temperature",label:"有温度"}];return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>记忆服务</h3>
          <p class="section-eyebrow">当前联系人：${d(t?.name||"未命名")}。这里直接读写后端 memories，不再以本地假数据为准。</p>
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
          ${!n.memoryServiceLoading&&!e.length?'<p class="section-eyebrow">这个角色还没有记忆。</p>':""}
          ${e.map(r=>{const s=r.compressed_content||r.raw_content||r.content||"未命名记忆",c=r.importance??3,l=r.temperature??0,p="★".repeat(c)+"☆".repeat(5-c),m=String(r.id||"").trim();return`
            <div class="theme-choice-item active" style="cursor:default; display:block;">
              <div class="theme-choice-copy" style="display:block;">
                <strong>${d(s)}</strong>
                <em style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:3px;">
                  <span>${d(r.category||"")}</span>
                  <span style="color:#c9908a;">${p}</span>
                  ${Mr(l)}
                </em>
                ${r.expires_at?`<em>过期：${d(String(r.expires_at))}</em>`:""}
              </div>
              <div class="ai-inline-actions" style="margin-top:10px;">
                <button class="ghost-action" data-action="memory-service-edit" data-memory-id="${d(m)}" ${m?"":"disabled"}>编辑</button>
                <button class="ghost-action" data-action="memory-service-delete" data-memory-id="${d(m)}" ${m?"":"disabled"}>删除</button>
              </div>
            </div>`}).join("")}
        </div>
        ${a.length>0?`
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>待审记忆候选 <span style="font-size:12px;font-weight:400;color:var(--muted);">· 日循环提取，可采纳或忽略</span></h3>
          ${a.map(r=>`
            <div class="theme-choice-item active" style="cursor:default; display:block;">
              <div class="theme-choice-copy" style="display:block;">
                <strong>${d(r.content||r.summary||"")}</strong>
                <em>${d(r.category||"")} / importance ${r.importance??3}</em>
              </div>
              <div class="ai-inline-actions" style="margin-top:8px;">
                <button class="ghost-action" data-action="memory-candidate-promote" data-candidate-id="${d(String(r.id||""))}">✓ 采纳</button>
                <button class="ghost-action" data-action="memory-candidate-dismiss" data-candidate-id="${d(String(r.id||""))}">✕ 忽略</button>
              </div>
            </div>
          `).join("")}
        </div>
        `:""}
      </section>
    `}function Tn(){return String(n.currentContactId||b(n.currentContactId)?.id||"default").trim()||"default"}async function Ct(t=Tn(),{silent:e=!0}={}){const a=String(t||"").trim();if(a){n.memoryServiceLoading=!0,u();try{const o=n.memoryServiceSort||"updated_at",i=new URLSearchParams({agent_id:a,sort_by:o,order:"desc",limit:"100"}),[r,s]=await Promise.all([fetch(`${S}/api/memories?${i.toString()}`),fetch(`${S}/api/consciousness/memory-candidates?agent_id=${encodeURIComponent(a)}&limit=20`)]);if(!r.ok)throw new Error(`HTTP ${r.status}`);const c=await r.json().catch(()=>({}));if(n.memoryServiceEntries=Array.isArray(c?.memories)?c.memories:[],s.ok){const l=await s.json().catch(()=>({}));n.memoryCandidates=Array.isArray(l?.candidates)?l.candidates:[]}}catch(o){console.warn("[memory service] load failed",o),e||(n.toast="记忆加载失败",window.setTimeout(()=>{n.toast="",u()},1200))}finally{n.memoryServiceLoading=!1,u()}}}async function Cr(t){const e=Tn();try{const a=await fetch(`${S}/api/consciousness/memory-candidates/${encodeURIComponent(t)}/promote?agent_id=${encodeURIComponent(e)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:"{}"});if(!a.ok)throw new Error(`HTTP ${a.status}`);n.memoryCandidates=(n.memoryCandidates||[]).filter(o=>String(o.id)!==String(t)),n.toast="✓ 已采纳为正式记忆",window.setTimeout(()=>{n.toast="",u()},1800),await Ct(e,{silent:!0})}catch(a){console.warn("[memory] promote failed",a)}}async function Ar(t){try{const e=await fetch(`${S}/api/consciousness/memory-candidates/${encodeURIComponent(t)}`,{method:"DELETE"});if(!e.ok)throw new Error(`HTTP ${e.status}`);n.memoryCandidates=(n.memoryCandidates||[]).filter(a=>String(a.id)!==String(t)),u()}catch(e){console.warn("[memory] dismiss failed",e)}}function Ba(t=null){const e=t||{},a=window.prompt("记忆内容",String(e.raw_content||e.content||"").trim());if(a===null)return null;const o=window.prompt("分层 / category（core_profile / recent_pending / deep / ephemeral）",String(e.category||"recent_pending"));if(o===null)return null;const i=window.prompt("可见范围（private / shared / public）",String(e.visibility||"private"));if(i===null)return null;const r=window.prompt("重要度（1-5）",String(e.importance??3));if(r===null)return null;const s=window.prompt("过期时间 ISO（可留空）",String(e.expires_at||""));return s===null?null:{agent_id:Tn(),content:String(a||"").trim(),raw_content:String(a||"").trim(),category:String(o||"").trim()||"recent_pending",visibility:String(i||"").trim()||"private",importance:Math.max(1,Math.min(5,Number(r)||3)),expires_at:String(s||"").trim()||null}}async function Tr(){const t=Ba();if(!t||!t.content)return;const e=await fetch(`${S}/api/memories`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),a=await e.json().catch(()=>({}));if(!e.ok)throw new Error(a?.detail||`HTTP ${e.status}`)}async function Er(t){const e=n.memoryServiceEntries.find(r=>String(r.id)===String(t));if(!e)return;const a=Ba(e);if(!a||!a.content)return;const o=await fetch(`${S}/api/memories/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),i=await o.json().catch(()=>({}));if(!o.ok)throw new Error(i?.detail||`HTTP ${o.status}`)}async function Pr(t){if(t=String(t||"").trim(),!t)throw new Error("missing memory id");if(!window.confirm("删除这条记忆？"))return;const e=await fetch(`${S}/api/memories/${encodeURIComponent(t)}`,{method:"DELETE"}),a=await e.json().catch(()=>({}));if(!e.ok)throw new Error(a?.detail||`HTTP ${e.status}`);n.memoryServiceEntries=(n.memoryServiceEntries||[]).filter(o=>String(o.id||"")!==t)}function Lr(){const t=Xt();return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>同步后端</h3>
          <p class="section-eyebrow">前端快照会本地保存，并自动 push/pull 到后端。</p>
          ${M("数据库","Supabase")}
          ${M("后端接口",S)}
          ${M("设备 ID",mn())}
          ${M("上次同步",ct(t.last_server_updated_at,{fallback:"暂无",includeYear:!0}))}
          <div class="ai-inline-actions" style="margin-top:10px;">
            <button class="ghost-action" data-action="sync-pull-now">立即拉取</button>
            <button class="ghost-action" data-action="sync-push-now">立即上传</button>
          </div>
        </div>
      </section>
    `}function qr(){const t=n.globalSettings;return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>导出格式</h3>
          <div class="theme-choice-list">
            ${["Markdown","JSON","TXT"].map(a=>`
              <button class="theme-choice-item ${t.exportFormat===a?"active":""}" data-action="pick-export-format" data-format="${a}">
                <span class="theme-choice-copy">
                  <strong>${d(a)}</strong>
                  <em>用于聊天记录导出</em>
                </span>
                <span class="theme-choice-check">${t.exportFormat===a?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `}function M(t,e,a="noop",o={}){const i=Object.entries(o).map(([r,s])=>` data-${r}="${d(String(s))}"`).join("");return`
      <button class="setting-row nav-row" data-action="${a}"${i}>
        <div class="setting-copy"><strong>${d(t)}</strong>${e?`<p>${d(e)}</p>`:""}</div>
        <span class="row-chevron">${g("chevron")}</span>
      </button>
    `}function Z(t,e){n.viewStack.push(n.currentView),typeof e=="function"&&e(),n.currentView=t,u()}function Dr(){n.currentView=n.viewStack.pop()||"settings",u()}async function Rr(){try{const t=await fetch(`${S}/api/settings/ai`);if(!t.ok)return;const e=await t.json();mr(e.settings?.aiSettings||e.settings?.ai||e.settings?.ai_settings||e.settings||{}),u()}catch(t){console.warn("[ai settings] load failed",t)}}async function za({silent:t=!0}={}){try{const e=new URLSearchParams({viewer_type:"user",viewer_id:"me"}),a=await fetch(`${S}/api/moments?${e.toString()}`);if(!a.ok){if(!t)throw new Error(`HTTP ${a.status}`);return}const o=await a.json().catch(()=>({}));if(!Array.isArray(o?.moments))return;o.moments.length>0&&(n.moments=va(n.moments,o.moments),k(120)),u()}catch(e){console.warn("[moments] load failed",e),t||(n.toast="朋友圈加载失败",u(),window.setTimeout(()=>{n.toast="",u()},1400))}}async function Or(t){const e=await fetch(`${S}/api/moments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),a=await e.json().catch(()=>({}));if(!e.ok)throw new Error(a?.detail||`HTTP ${e.status}`);return P(a?.moment||t)}async function Vr(t,e){const a=await fetch(`${S}/api/moments/${encodeURIComponent(t)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),o=await a.json().catch(()=>({}));if(!a.ok)throw new Error(o?.detail||`HTTP ${a.status}`);return o}async function Br(t,e,a){const o=new URLSearchParams({author_type:String(e||"user"),author_id:String(a||"me")}),i=await fetch(`${S}/api/moments/${encodeURIComponent(t)}?${o.toString()}`,{method:"DELETE"}),r=await i.json().catch(()=>({}));if(!i.ok)throw new Error(r?.detail||`HTTP ${i.status}`);return r}async function zr(t,e){const a=await fetch(`${S}/api/moments/${encodeURIComponent(t)}/like`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({actor_type:e.author_type,actor_id:e.author_id,actor_name:e.author_name})}),o=await a.json().catch(()=>({}));if(!a.ok)throw new Error(o?.detail||`HTTP ${a.status}`);return P(o?.moment||{})}async function Hr(t,e,a){const o=await fetch(`${S}/api/moments/${encodeURIComponent(t)}/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({actor_type:e.author_type,actor_id:e.author_id,actor_name:e.author_name,text:a})}),i=await o.json().catch(()=>({}));if(!o.ok)throw new Error(i?.detail||`HTTP ${o.status}`);return P(i?.moment||{})}async function Nr(t,e){const a=n.currentContactId||"",o=(e||"").trim()||null,i={agentId:a};if(t==="impression")i.impression=o;else if(t==="relationshipProgress")i.relationshipProgress=o;else if(t==="likesSummary")i.likesSummary=o;else return;try{n.toast="保存中…",u();const r=await fetch(`${S}/api/companion-state/summary`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!r.ok)throw new Error(`HTTP ${r.status}`);const s=await r.json().catch(()=>({}));n.companionState=Rt(s?.state||n.companionState),n.toast="已保存",u(),window.setTimeout(()=>{n.toast="",u()},1200)}catch(r){console.warn("[insight save]",r),n.toast="保存失败",u(),window.setTimeout(()=>{n.toast="",u()},1400)}}async function pt(t=n.currentContactId,{silent:e=!0}={}){try{const a=String(t||"").trim(),o=a?`?agent_id=${encodeURIComponent(a)}`:"",i=await fetch(`${S}/api/companion-state${o}`);if(!i.ok){if(!e)throw new Error(`HTTP ${i.status}`);return}const r=await i.json().catch(()=>({}));n.companionState=Rt(r?.state||{}),u()}catch(a){console.warn("[companion state] load failed",a),e||(n.toast="状态读取失败",u(),window.setTimeout(()=>{n.toast="",u()},1200))}}async function ae(t,{silent:e=!0}={}){const a=String(t||"").trim();if(!a)return"";try{const o=await fetch(`${S}/api/agents/${encodeURIComponent(a)}/persona`);if(!o.ok){if(!e)throw new Error(`HTTP ${o.status}`);return""}const i=await o.json().catch(()=>({})),r=b(a);return r&&(r.persona=String(i?.persona||""),n.currentView==="contactSettings"&&n.currentContactId===a&&u()),String(i?.persona||"")}catch(o){return console.warn("[agent persona] load failed",o),e||(n.toast="浜鸿璇诲彇澶辫触",u(),window.setTimeout(()=>{n.toast="",u()},1200)),""}}async function jr(t,e){const a=String(t||"").trim();if(a)try{await fetch(`${S}/api/agents/${encodeURIComponent(a)}/persona`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({persona:String(e||"")})})}catch(o){console.warn("[agent persona] save failed",o)}}function Fr(t,e,a=260){const o=String(t||"").trim();if(!o)return;yt.has(o)&&clearTimeout(yt.get(o));const i=window.setTimeout(()=>{yt.delete(o),jr(o,e)},a);yt.set(o,i)}async function Ha({silent:t=!0}={}){try{const e=await fetch(`${S}/api/mcp/library`);if(!e.ok){if(!t)throw new Error(`HTTP ${e.status}`);return}const a=await e.json();if(!Array.isArray(a.tools))return;const o=z(),i=a.tools.map(ft).filter(r=>$t(r.id));o.mcpLibrary={...o.mcpLibrary||{},tools:i},D(),u()}catch(e){console.warn("[mcp library] load failed",e),t||(n.toast="同步 MCP 工具失败",u(),window.setTimeout(()=>{n.toast="",u()},1300))}}async function D(){qe();const t=z();t.providers=(t.providers||[]).map(te),Object.keys(t.defaultModels||{}).forEach(e=>{e!=="voice"&&(t.defaultModels[e]=xn(t.defaultModels[e]))}),n.aiSettingsSaving=!0;try{await fetch(`${S}/api/settings/ai`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({settings:{...n.globalSettings,aiSettings:t}})})}catch(e){console.error("[ai settings] save failed",e)}finally{n.aiSettingsSaving=!1}}function Ur(){const t=z(),e=(t.mcpLibrary?.tools||[]).filter(a=>a.enabled!==!1).length;return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel">
          <h3>AI 接口</h3>
          ${M("默认模型","聊天 / 摘要 / Vision / 翻译 / 意识循环 / 语音","open-default-models")}
          ${M("模型供应商",`共 ${t.providers.length} 个`,"open-provider-catalog")}
          ${M("MCP 工具库",`已启用 ${e} 个`,"open-mcp-library")}
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>当前聊天默认</h3>
          ${M("聊天模型",Va("chat"))}
        </div>
      </section>
    `}function Kr(){const t=z();return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <div class="ai-inline-actions">
            <h3 style="margin:0;">MCP 工具库</h3>
            <button class="ghost-action" data-action="sync-mcp-library">同步工具</button>
          </div>
          <p class="section-eyebrow">只展示聊天主动场景常用工具，同步到输入框上方分类。</p>
          ${(Array.isArray(t.mcpLibrary?.tools)?t.mcpLibrary.tools:[]).map(ft).filter(a=>$t(a.id)).map(a=>`
            <div class="provider-catalog-row">
              <div class="provider-row-main" style="cursor:default;">
                <div class="setting-copy">
                  <strong>${d(a.label||a.id||"")}</strong>
                  <p>${d(a.description||a.prompt||a.id||"")}</p>
                </div>
              </div>
              <button class="switch-btn ${a.enabled!==!1?"on":"off"}" data-action="toggle-mcp-tool" data-tool-id="${d(a.id||"")}" aria-pressed="${a.enabled!==!1}">
                ${ye(a.enabled!==!1)}
              </button>
            </div>
          `).join("")}
        </div>
      </section>
    `}function Qr(){return`
      <section class="settings-page page-block ai-settings-page">
        <div class="default-model-list">
          ${["chat","summary","vision","translate","consciousness","voice"].map(e=>$r(e)).join("")}
        </div>
      </section>
    `}function Yr(){const t=U(n.activeModelSlot),e=n.activeModelSlotContext==="contact",a=b(n.currentContactId)||n.contacts[0];if(!e&&t==="voice"){const c=De("voice")||{};return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>${d(jt("voice"))}</h3>
          <p class="section-eyebrow">${d(Re("voice"))}</p>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>语音服务配置</h3>
          <label class="ai-field-label">Provider</label>
          <input id="voice-slot-provider-input" class="ai-input" value="${d(c.provider||"")}" placeholder="voice-mcp" data-plain-input="true" />
          <label class="ai-field-label">Service URL</label>
          <input id="voice-slot-service-url-input" class="ai-input" value="${d(c.service_url||c.base_url||"")}" placeholder="https://voice.example.com/speak" data-plain-input="true" />
          <label class="ai-field-label">Voice ID</label>
          <input id="voice-slot-voice-id-input" class="ai-input" value="${d(c.voice_id||c.voiceId||"")}" placeholder="default voice_id" data-plain-input="true" />
          <label class="ai-field-label">Speaker</label>
          <input id="voice-slot-speaker-input" class="ai-input" value="${d(c.speaker||"")}" placeholder="可选 speaker" data-plain-input="true" />
          <label class="ai-field-label">Emotion</label>
          <input id="voice-slot-emotion-input" class="ai-input" value="${d(c.emotion||"")}" placeholder="可选 emotion" data-plain-input="true" />
          <label class="ai-field-label">Speed</label>
          <input id="voice-slot-speed-input" class="ai-input" value="${d(c.speed??1)}" placeholder="1.0" data-plain-input="true" />
          <label class="ai-field-label">Format</label>
          <input id="voice-slot-format-input" class="ai-input" value="${d(c.format||"")}" placeholder="audio/mpeg" data-plain-input="true" />
        </div>
      </section>
    `}const o=e?{providerId:a?.settings?.modelProviderId||n.activeModelProviderId||A("chat")?.providerId||"openai",model:t==="consciousness"?a?.settings?.loopModel||"":a?.settings?.model||""}:De(t),i=z().providers.filter(c=>c.enabled),r=W(o.providerId)||W(A("chat")?.providerId)||i[0],s=J(r?.models||[]);return e?`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>${d(jt(t))}</h3>
          <p class="section-eyebrow">${d(Re(t))}</p>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>模型供应商</h3>
          <div class="ai-chip-row">
            ${i.map(c=>`<button class="ai-chip ${o.providerId===c.id?"active":""}" data-action="pick-slot-provider" data-slot="${t}" data-provider-id="${c.id}">${d(c.name)}</button>`).join("")}
          </div>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>模型列表</h3>
          <div class="provider-model-picker">
            <div class="provider-model-input-row">
              <input id="model-slot-input" class="ai-input provider-model-input" value="${d(o.model||"")}" placeholder="${d(s[0]||"输入或选择模型")}" autocomplete="off" data-plain-input="true" />
              <button class="provider-model-toggle" data-action="toggle-model-slot-menu" type="button" aria-label="灞曞紑妯″瀷鍒楄〃">
                ${g("chevron")}
              </button>
            </div>
            <p id="model-slot-hint" class="section-eyebrow provider-model-hint">${d(An(o.model||"",s))}</p>
            <div id="model-slot-menu" class="provider-model-menu"></div>
          </div>
          <div class="model-choice-list">
            ${Na(t,o,s)}
          </div>
        </div>
      </section>
    `:`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>${d(jt(t))}</h3>
          <p class="section-eyebrow">${d(Re(t))}</p>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>模型供应商</h3>
          <div class="ai-chip-row">
            ${i.map(c=>`<button class="ai-chip ${o.providerId===c.id?"active":""}" data-action="pick-slot-provider" data-slot="${t}" data-provider-id="${c.id}">${d(c.name)}</button>`).join("")}
          </div>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>模型列表</h3>
          <div class="provider-model-picker">
            <div class="provider-model-input-row">
              <input id="model-slot-input" class="ai-input provider-model-input" value="${d(o.model||"")}" placeholder="${d(s[0]||"输入或选择模型")}" autocomplete="off" data-plain-input="true" />
              <button class="provider-model-toggle" data-action="toggle-model-slot-menu" type="button" aria-label="展开模型列表">
                ${g("chevron")}
              </button>
            </div>
            <p id="model-slot-hint" class="section-eyebrow provider-model-hint">${d(An(o.model||"",s))}</p>
            <div id="model-slot-menu" class="provider-model-menu"></div>
          </div>
          <div class="model-choice-list">
            ${Na(t,o,s)}
          </div>
        </div>
      </section>
    `}function Xr(t){return`
      <div class="provider-catalog-row">
        <button class="provider-row-main" data-action="open-provider-editor" data-provider="${t.id}">
          <div class="setting-copy">
            <strong>${d(t.name)}</strong>
            <p>${d(t.defaultModel||"未设置默认模型")}</p>
          </div>
          <span class="provider-inline-state ${t.enabled?"enabled":"disabled"}">${t.enabled?"已启用":"已禁用"}</span>
          <span class="row-chevron">${g("chevron")}</span>
        </button>
        <button class="switch-btn ${t.enabled?"on":"off"}" data-action="toggle-provider-enabled" data-provider-id="${t.id}" aria-pressed="${t.enabled}">
          ${ye(t.enabled)}
        </button>
      </div>
    `}function Gr(){const t=n.providerSearch.trim().toLowerCase(),e=z().providers.filter(a=>!t||a.name.toLowerCase().includes(t)||a.id.toLowerCase().includes(t)).sort((a,o)=>{const i=+!!o.enabled-+!!a.enabled;return i!==0?i:String(a.name||a.id||"").localeCompare(String(o.name||o.id||""),"zh-Hans-CN")});return`
      <section class="settings-page page-block ai-settings-page">
        <div class="search-pill glass-frost ai-search-row">
          <span class="search-icon">${g("search")}</span>
          <input class="ai-search-input" value="${d(n.providerSearch)}" data-action="provider-search" placeholder="搜索供应商" />
        </div>
        <div class="settings-group glass-frost ai-panel provider-catalog-group">
          ${e.map(a=>Xr(a)).join("")}
        </div>
      </section>
    `}function Jr(t){const e=new Set,a=(Array.isArray(t._allModels)?t._allModels:[]).filter(h=>{const v=q(h?.id||h?.name||""),$=v.toLowerCase();return!v||e.has($)?!1:(e.add($),!0)}),o=t._selectedModelIds instanceof Set?t._selectedModelIds:new Set(t._selectedModelIds||[]),i=o.size,r={};for(const h of a){const v=h.vendor||"Other";r[v]||(r[v]=[]),r[v].push(h)}const s=["OpenAI","Anthropic","Google","DeepSeek","Qwen","GLM","Meta","Mistral","Moonshot","Doubao","ERNIE","Hunyuan","Baichuan","Spark","01.AI","InternLM","Other"],c=[...new Set([...s.filter(h=>r[h]),...Object.keys(r)])],l=a.map(h=>h.id),p=l.length>0&&l.every(h=>o.has(h)),m=c.map(h=>{const v=r[h]||[],$=!!n.providerModelVendorOpen[h],_=v.filter(I=>o.has(I.id)).length,T=v.length>0&&v.every(I=>o.has(I.id)),x=$?`
          <div class="vendor-group-body">
            ${v.map(I=>{const C=o.has(I.id),V=a.findIndex(ot=>ot.id===I.id);return`
              <div class="pool-model-row">
                <span class="pool-model-name">${d(I.name)}</span>
                <span class="pool-model-caps">${br(I)}</span>
                <button class="pool-model-btn${C?" selected":""}"
                  data-action="${C?"remove-provider-model":"add-provider-model"}"
                  data-model-index="${V}" type="button">${C?"−":"+"}</button>
              </div>`}).join("")}
          </div>`:"";return`
        <div class="vendor-group">
          <div class="vendor-group-head">
            <button class="vendor-group-toggle" data-action="toggle-provider-vendor-group" data-vendor="${d(h)}" type="button">
              <span class="vendor-group-name">${d(h)}</span>
              ${_?`<span class="vendor-group-sel">${_} 已选</span>`:""}
              <span class="vendor-group-badge">${v.length}</span>
              <span class="vendor-group-chevron${$?" open":""}">${g("chevron")}</span>
            </button>
            <button class="pool-vendor-selall${T?" all-selected":""}" data-action="toggle-vendor-all-provider-models" data-vendor="${d(h)}" type="button" title="${T?"全不选":"全选"}">${T?"−全":"+全"}</button>
          </div>
          ${x}
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
      </div>`}function Na(t,e,a){const o=J(a),i=q(e?.model||"");return o.length?o.map((r,s)=>`
          <button class="model-choice-item ${i===r?"active":""}" data-action="pick-slot-model" data-slot="${t}" data-model-index="${s}">
            <span class="model-choice-name">${d(r)}</span>
            <span class="model-choice-check">${i===r?"已选":""}</span>
          </button>
        `).join(""):'<div class="model-choice-empty">当前供应商还没有可选模型，请先在“模型供应商”页同步并保存。</div>'}function Wr(){const t=O(),e=Zt(t.apiPath||t.api_path||"",{allowEmpty:!0}),a=ur(t),o=!!n.providerAdvancedOpen||!!e,i=n.providerModelSyncStatus?.[t.id],r=dr(t.apiKey||""),s=!!t._apiKeyDirty,c=s?String(t.apiKey||""):r,l=s?n.providerKeyVisible?"text":"password":"text",p=s?n.providerKeyVisible?"隐藏":"显示":r?"更换":"显示";return`
      <section class="settings-page page-block ai-settings-page provider-editor-page">
        <div class="settings-group glass-frost ai-panel provider-editor-card">

          <div class="prov-sec">
            <h3 class="prov-sec-title">接口配置</h3>
            <label class="ai-field-label">名称</label>
            <input id="provider-name-input" class="ai-input" value="${d(t.name||"")}" placeholder="例如 SiliconFlow" data-plain-input="true" />
            <label class="ai-field-label">Base URL</label>
            <input id="provider-base-input" class="ai-input" value="${d(t.baseUrl||"")}" placeholder="https://api.example.com/v1" data-plain-input="true" />
            <div class="provider-advanced-head">
              <span class="section-eyebrow">Base URL 与 API 路径一起拼接请求地址</span>
              <button class="provider-advanced-toggle" data-action="toggle-provider-advanced" type="button">
                <span>高级选项</span>
                <span class="advanced-chevron ${o?"open":""}">${g("chevron")}</span>
              </button>
            </div>
            <div class="provider-advanced-panel ${o?"open":""}">
              <label class="ai-field-label">API 路径（可选）</label>
              <input id="provider-api-path-input" class="ai-input" value="${d(e)}" placeholder="${d(a)}" data-plain-input="true" />
              <p class="section-eyebrow">留空时自动使用 ${d(a)}</p>
            </div>
            <label class="ai-field-label">API Key</label>
            <div class="provider-key-row">
              <input id="provider-key-input" class="ai-input provider-key-input" type="${l}" value="${d(c)}" placeholder="sk-..." autocomplete="off" autocapitalize="off" spellcheck="false" data-plain-input="true" data-masked="${!s&&r?"true":"false"}" />
              <button class="provider-key-toggle" data-action="toggle-provider-key-visible" type="button" aria-label="${p} API Key">${p}</button>
            </div>
            ${r?`<p class="section-eyebrow provider-key-mask">已保存：${d(r)}</p>`:""}
          </div>

          <div class="prov-sec-divider"></div>

          <div class="prov-sec">
            <h3 class="prov-sec-title">默认模型</h3>
            <div class="provider-model-picker">
              <div class="provider-model-input-row">
                <input id="provider-default-model-input" class="ai-input provider-model-input" value="${d(t.defaultModel||"")}" placeholder="gpt-5.4" autocomplete="off" data-plain-input="true" />
                <button class="provider-model-toggle" data-action="toggle-provider-model-menu" type="button" aria-label="展开模型列表">
                  ${g("chevron")}
                </button>
              </div>
              <p id="provider-default-model-hint" class="section-eyebrow provider-model-hint">${d(Oa(t.defaultModel||"",t.models||[]))}</p>
              <div id="provider-default-model-menu" class="provider-model-menu ${n.providerModelMenuOpen?"open":""}"></div>
            </div>
          </div>

          <div class="prov-sec-divider"></div>

          <div class="prov-sec">
            <div class="prov-sec-title-row">
              <h3 class="prov-sec-title" style="margin:0;">模型列表</h3>
              <button class="prov-sync-btn" data-action="sync-provider-models" data-provider="${t.id}" type="button" ${n.providerModelSyncingId===t.id?"disabled":""}>${g("reroll")}${n.providerModelSyncingId===t.id?"同步中":"同步"}</button>
            </div>
            ${Jr(t)}
            ${i?.message?`<p class="provider-sync-status ${d(i.type||"")}">${d(i.message)}</p>`:'<p class="provider-sync-status muted">同步会优先请求真实模型列表；失败时保留当前列表。</p>'}
          </div>

          <div class="prov-sec-divider"></div>

          ${ut("启用供应商","关闭后将不会出现在模型选择中",!!t.enabled,"toggle-provider-enabled",t.id)}

          <div class="prov-save-row">
            <button class="prov-save-btn-main" data-action="save-provider-editor" data-provider="${t.id}" type="button">保存供应商</button>
          </div>
        </div>
      </section>
    `}async function Zr(){const t=O();if(n.providerModelSyncingId)return;const e=document.getElementById("provider-base-input")?.value?.trim()||"",a=document.getElementById("provider-key-input"),o=t._apiKeyDirty?a?.value?.trim()||"":t.apiKey||"",i=In({...t,baseUrl:e});if(!e){const r=Mn(t);if(!r.length){It(t.id,"error","请先填写 Base URL 再同步模型"),u();return}const s=r.map(ee);t._allModels=s,s.forEach(c=>{n.providerModelVendorOpen[c.vendor]=!0}),It(t.id,"success",`已载入内置列表 ${r.length} 个模型`),u();return}n.providerModelSyncingId=t.id||n.providerDraftId||"syncing",It(t.id,"muted","正在同步模型..."),u();try{const r=await fetch(`${S}/api/settings/ai/discover-models`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({provider_id:t.id||i,provider_name:t.name||"",base_url:e,api_key:o})}),s=r.headers.get("content-type")||"",c=await r.text();if(!r.ok){let x="";try{const I=s.includes("application/json")?JSON.parse(c):null;x=I?.detail||I?.message||""}catch{}throw new Error(x||`HTTP ${r.status}`)}if(!s.includes("application/json"))throw new Error("后端返回的不是 JSON，已阻止写入模型列表");let l={};try{l=JSON.parse(c||"{}")}catch{throw new Error("后端返回 JSON 解析失败，已阻止写入模型列表")}const p=J(Array.isArray(l.models)?l.models:[]),m=Mn({...t,baseUrl:e}),f=J([...p,...m]);if(!f.length){It(t.id,"error","没有获取到模型，已保留当前默认模型和已有列表。"),u();return}const h=f.map(ee),v=new Set(f.map(x=>x.toLowerCase())),$=[...h];(t._allModels||[]).forEach(x=>{const I=q(x?.id||x?.name||"");!I||v.has(I.toLowerCase())||$.push(ee(I))}),t._allModels=$,[...new Set(h.map(x=>x.vendor))].forEach(x=>{n.providerModelVendorOpen[x]=!0}),t._selectedModelIds instanceof Set||(t._selectedModelIds=new Set(t._selectedModelIds||[])),t.models=[...t._selectedModelIds];const T=Math.max(0,f.length-p.length);It(t.id,"success",l.is_fallback||l.source==="fallback"?`已载入内置列表 ${f.length} 个模型`:T?`已同步 ${p.length} 个模型，补充内置 ${T} 个`:`已同步 ${f.length} 个模型`),u(),xt()}catch(r){const s=String(r?.message||"同步模型失败");if(s.includes("Failed to fetch")){It(t.id,"error","同步失败：当前前端连不上后端接口。"),u();return}It(t.id,"error",`同步失败：${s}`),u()}finally{n.providerModelSyncingId="",u()}}me=function(){return _n.has(n.currentView)?!1:ir()},Qe=function(){if(!_n.has(n.currentView))return rr();const e={aiInterface:"AI 接口",mcpLibrary:"MCP 工具库",themeSettings:"主题模式",accountSettings:"我的账号",memoryService:"记忆服务",backendSync:"同步后端",exportSettings:"导出格式",defaultModels:"默认模型",modelSlot:jt(n.activeModelSlot),providerCatalog:"模型供应商",providerEditor:"编辑供应商",promptEditor:"提示词"},a=`chat-page-title ${n.currentView==="providerCatalog"?"provider-catalog-title":""}`.trim(),o=n.currentView==="providerCatalog"?`<button class="icon-btn ghost-circle" data-action="open-provider-editor-new" aria-label="新增供应商">${g("plus")}</button>`:'<span class="header-spacer"></span>';return`
      <header class="chat-page-header simple-header">
        <button class="icon-btn text-btn" data-action="back-sub-settings" aria-label="返回">${g("back")}</button>
        <div class="${a}">${d(e[n.currentView]||"设置")}</div>
        ${o}
      </header>
    `},Ye=function(){return n.currentView==="accountSettings"?Ir():n.currentView==="memoryService"?xr():n.currentView==="backendSync"?Lr():n.currentView==="exportSettings"?qr():n.currentView==="themeSettings"?_r():n.currentView==="aiInterface"?Ur():n.currentView==="mcpLibrary"?Kr():n.currentView==="defaultModels"?Qr():n.currentView==="modelSlot"?Yr():n.currentView==="providerCatalog"?Gr():n.currentView==="providerEditor"?Wr():n.currentView==="promptEditor"?kr():sr()},sn=function(e){const a=e.target.closest("[data-action]"),o=a?.dataset.action;if(!o)return La(e);if(o==="open-ai-interface")return Z("aiInterface");if(o==="open-mcp-library")return Z("mcpLibrary");if(o==="open-theme-settings")return Z("themeSettings");if(o==="open-account-settings")return Z("accountSettings");if(o==="open-account-avatar"){document.getElementById("account-avatar-file")?.click();return}if(o==="open-account-nickname"){const i=window.prompt("请输入昵称",n.accountProfile?.nickname||"小酒")?.trim();if(!i)return;n.accountProfile.nickname=i,n.toast="昵称已更新",u(),D(),k(120),window.setTimeout(()=>{n.toast="",u()},1200);return}if(o==="open-account-signature"){const i=window.prompt("请输入个性签名",n.accountProfile?.signature||"")?.trim();if(!i)return;n.accountProfile.signature=i,n.toast="个性签名已更新",u(),D(),k(120),window.setTimeout(()=>{n.toast="",u()},1200);return}if(o==="open-memory-service")return Z("memoryService",()=>{Ct(n.currentContactId)});if(o==="memory-service-refresh"){Ct(n.currentContactId,{silent:!1});return}if(o==="memory-service-sort"){n.memoryServiceSort=a.dataset.sort||"updated_at",Ct(n.currentContactId,{silent:!0});return}if(o==="memory-candidate-promote"){Cr(a.dataset.candidateId);return}if(o==="memory-candidate-dismiss"){Ar(a.dataset.candidateId);return}if(o==="memory-service-create"){Tr().then(()=>Ct(n.currentContactId,{silent:!1})).catch(i=>{console.warn("[memory service] create failed",i),n.toast="新建记忆失败",u(),window.setTimeout(()=>{n.toast="",u()},1200)});return}if(o==="memory-service-edit"){Er(a.dataset.memoryId).then(()=>Ct(n.currentContactId,{silent:!1})).catch(i=>{console.warn("[memory service] update failed",i),n.toast="编辑记忆失败",u(),window.setTimeout(()=>{n.toast="",u()},1200)});return}if(o==="memory-service-delete"){Pr(a.dataset.memoryId).then(()=>Ct(n.currentContactId,{silent:!1})).catch(i=>{console.warn("[memory service] delete failed",i),n.toast="删除记忆失败",u(),window.setTimeout(()=>{n.toast="",u()},1200)});return}if(o==="open-backend-sync")return Z("backendSync");if(o==="sync-pull-now"){xa();return}if(o==="sync-push-now"){dt(),_t(30),n.toast="已加入上传队列",u(),window.setTimeout(()=>{n.toast="",u()},1e3);return}if(o==="open-export-settings")return Z("exportSettings");if(o==="open-default-models")return Z("defaultModels");if(o==="open-model-slot")return Z("modelSlot",()=>{if(n.activeModelSlot=U(a.dataset.slot),n.activeModelSlotContext=a.dataset.context==="contact"?"contact":"global",n.modelSlotMenuOpen=!1,n.activeModelSlotContext==="contact"){const i=Q();n.activeModelProviderId=i?.settings?.modelProviderId||A("chat")?.providerId||n.activeModelProviderId||"openai"}else n.activeModelProviderId=A("chat")?.providerId||n.activeModelProviderId||"openai"});if(o==="open-provider-catalog")return Z("providerCatalog");if(o==="open-provider-editor-new")return Z("providerEditor",()=>{n.providerDraftId=`custom_${Date.now()}`,n.providerAdvancedOpen=!1,n.providerModelMenuOpen=!1,n.providerEditorDraft=Cn(n.providerDraftId)});if(o==="open-provider-editor")return Z("providerEditor",()=>{n.providerDraftId=a.dataset.provider;const i=W(n.providerDraftId);n.providerAdvancedOpen=!!String(i?.apiPath||i?.api_path||"").trim(),n.providerModelMenuOpen=!1,n.providerEditorDraft=Cn(n.providerDraftId)});if(o==="open-prompt-editor")return Z("promptEditor",()=>{n.activePromptSlot=U(a.dataset.slot)});if(o==="back-sub-settings")return Dr();if(o==="sync-provider-models"){Zr();return}if(o==="toggle-provider-key-visible"){const i=O();i._apiKeyDirty?n.providerKeyVisible=!n.providerKeyVisible:(i._apiKeyDirty=!0,i.apiKey="",n.providerKeyVisible=!0),u(),window.setTimeout(()=>document.getElementById("provider-key-input")?.focus(),0);return}if(o==="toggle-provider-advanced"){n.providerAdvancedOpen=!n.providerAdvancedOpen,u();return}if(o==="toggle-model-slot-menu"){n.modelSlotMenuOpen=!1,ne();return}if(o==="toggle-provider-model-menu"){n.providerModelMenuOpen=!n.providerModelMenuOpen,xt();return}if(o==="pick-provider-default-model"){const i=O(),r=document.getElementById("provider-default-model-input")?.value||i.defaultModel||"",s=qa(r,i.models),c=q(s[Number(a.dataset.modelIndex)]||a.dataset.model||"");if(!c)return;i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[])),i._selectedModelIds.add(c),i.models=[...i._selectedModelIds],i.defaultModel=c;const l=document.getElementById("provider-default-model-input");l&&(l.value=c),n.providerModelMenuOpen=!1,xt();return}if(o==="pick-slot-provider"){if(n.activeModelSlotContext==="contact"){const s=Q(),c=a.dataset.providerId||n.activeModelProviderId,l=W(c);n.activeModelProviderId=c,n.modelSlotMenuOpen=!1,s?.settings&&(s.settings.modelProviderId=c,(!q(s.settings.model)||!(l?.models||[]).includes(s.settings.model))&&(s.settings.model=l?.defaultModel||l?.models?.[0]||s.settings.model||"")),u(),k(150);return}const i=A(a.dataset.slot);i.providerId=a.dataset.providerId;const r=W(i.providerId);r&&(i.model=q(r.defaultModel)||r.models?.[0]||q(i.model)||""),n.modelSlotMenuOpen=!1,u(),D();return}if(o==="toggle-all-provider-models"){const i=O();i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[]));const s=(Array.isArray(i._allModels)?i._allModels:[]).map(l=>l.id);s.length>0&&s.every(l=>i._selectedModelIds.has(l))?s.forEach(l=>i._selectedModelIds.delete(l)):s.forEach(l=>i._selectedModelIds.add(l)),i.models=[...i._selectedModelIds],u();return}if(o==="toggle-vendor-all-provider-models"){const i=a.dataset.vendor,r=O();r._selectedModelIds instanceof Set||(r._selectedModelIds=new Set(r._selectedModelIds||[]));const c=(Array.isArray(r._allModels)?r._allModels:[]).filter(p=>(p.vendor||"Other")===i).map(p=>p.id);c.length>0&&c.every(p=>r._selectedModelIds.has(p))?c.forEach(p=>r._selectedModelIds.delete(p)):c.forEach(p=>r._selectedModelIds.add(p)),r.models=[...r._selectedModelIds],u();return}if(o==="toggle-provider-vendor-group"){const i=a.dataset.vendor;i&&(n.providerModelVendorOpen[i]=!n.providerModelVendorOpen[i]),u();return}if(o==="add-provider-model"){const i=O();i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[]));const s=(Array.isArray(i._allModels)?i._allModels:[])[Number(a.dataset.modelIndex)]||{},c=q(s.id||s.name||a.dataset.modelId||"");if(c&&i._selectedModelIds.add(c),c){i.defaultModel=c;const l=document.getElementById("provider-default-model-input");l&&(l.value=c)}i.models=[...i._selectedModelIds],u();return}if(o==="remove-provider-model"){const i=O();i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[]));const s=(Array.isArray(i._allModels)?i._allModels:[])[Number(a.dataset.modelIndex)]||{},c=q(s.id||s.name||a.dataset.modelId||"");c&&i._selectedModelIds.delete(c),i.models=[...i._selectedModelIds],u();return}if(o==="add-manual-provider-model"){const i=O(),r=document.getElementById("provider-manual-model-input"),s=q(r?.value||"");if((r?.value||"").trim()&&!s){alert("模型 ID 不合法，不能包含 HTML、控制字符或过长内容");return}if(!s)return;if(i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[])),Array.isArray(i._allModels)||(i._allModels=[]),!i._allModels.some(c=>c.id===s)){i._allModels.push(ee(s));const c=Da(s);n.providerModelVendorOpen[c]=!0}i._selectedModelIds.add(s),i.defaultModel=s,i.models=[...i._selectedModelIds],u();return}if(o==="toggle-slot-vendor-group"){const i=a.dataset.providerId;i&&(n.slotVendorGroupOpen[i]=!n.slotVendorGroupOpen[i]),u();return}if(o==="add-model-to-slot"){const i=a.dataset.slot,r=a.dataset.providerId,s=q(a.dataset.model||"");if(!i||!r||!s)return;const c=A(i);Array.isArray(c.selectedModels)||(c.selectedModels=[]),c.selectedModels.some(l=>l.providerId===r&&l.model===s)||c.selectedModels.push({providerId:r,model:s}),u(),D();return}if(o==="remove-model-from-slot"){const i=a.dataset.slot,r=a.dataset.providerId,s=a.dataset.model;if(!i||!s)return;const c=A(i);Array.isArray(c.selectedModels)&&(c.selectedModels=c.selectedModels.filter(l=>!(l.providerId===r&&l.model===s))),u(),D();return}if(o==="add-manual-slot-model"){const i=a.dataset.slot,r=document.getElementById("model-slot-manual-input"),s=q(r?.value||"");if((r?.value||"").trim()&&!s){alert("模型 ID 不合法，不能包含 HTML、控制字符或过长内容");return}if(!i||!s)return;const c=A(i);Array.isArray(c.manualModels)||(c.manualModels=[]),c.manualModels.includes(s)||c.manualModels.push(s),u(),D();return}if(o==="remove-manual-slot-model"){const i=a.dataset.slot,r=q(a.dataset.model||"");if(!i||!r)return;const s=A(i);Array.isArray(s.manualModels)&&(s.manualModels=s.manualModels.filter(c=>c!==r)),u(),D();return}if(o==="pick-theme-mode"){n.globalSettings.theme=a.dataset.theme||n.globalSettings.theme,u(),D();return}if(o==="pick-export-format"){n.globalSettings.exportFormat=a.dataset.format||n.globalSettings.exportFormat,u(),D();return}if(o==="toggle-mcp-tool"){const i=a.dataset.toolId,c=(z().mcpLibrary?.tools||[]).find(l=>String(l.id)===String(i));if(!c)return;c.enabled=c.enabled===!1,Xn(a,c.enabled!==!1),D();return}if(o==="sync-mcp-library"){Ha({silent:!1});return}if(o==="edit-contact-quick-action"){if(n.quickActionDragId)return;ui(a.dataset.quickId||"");return}if(o==="add-contact-quick-action"){const i=Q(),r=kt(i),s=`custom_${Date.now()}`;r.push({id:s,label:"新快捷动作",icon:"more",prompt:"",mcpToolId:"",enabled:!0}),i.settings.quickActions=r,n.contactQuickActionEditorId=s,u(),k(150);return}if(o==="close-contact-quick-action-editor"){if(e.target.closest('[data-stop-close="1"]')&&!e.target.hasAttribute("data-action"))return;n.contactQuickActionEditorId="",n.contactQuickMcpMenuOpen=!1,u();return}if(o==="toggle-contact-quick-mcp-menu"){n.contactQuickMcpMenuOpen=!n.contactQuickMcpMenuOpen,a.closest(".qae-select-shell")?.classList.toggle("open",n.contactQuickMcpMenuOpen);return}if(o==="pick-contact-quick-mcp"){const i=a.closest(".qae-select-shell"),r=a.dataset.mcpId||"",s=document.getElementById("contact-quick-mcp");s&&(s.value=r);const c=a.textContent?.trim()||"不调用 MCP",l=i?.querySelector(".qae-select-trigger span");l&&(l.textContent=c),i?.querySelectorAll(".qae-select-option").forEach(p=>{p.classList.toggle("active",p===a)}),n.contactQuickMcpMenuOpen=!1,i?.classList.remove("open");return}if(o==="save-contact-quick-action"){const i=Q(),r=kt(i),s=a.dataset.quickId||"",c=r.find(l=>l.id===s);if(!c)return;c.label=(document.getElementById("contact-quick-label")?.value||c.label||"").trim()||c.label||"蹇嵎鍔ㄤ綔",c.prompt=(document.getElementById("contact-quick-prompt")?.value||"").trim(),c.mcpToolId=(document.getElementById("contact-quick-mcp")?.value||"").trim(),c.mcpToolId&&$t(c.mcpToolId)&&(c.id=c.id||c.mcpToolId),i.settings.quickActions=r,n.contactQuickActionEditorId="",u(),k(150);return}if(o==="delete-contact-quick-action"){const i=Q(),r=a.dataset.quickId||"",s=kt(i).filter(c=>c.id!==r);i.settings.quickActions=s,n.contactQuickActionEditorId===r&&(n.contactQuickActionEditorId=""),n.quickActionSwipeOpenId="",u(),k(150);return}if(o==="pick-slot-model"){const i=A(a.dataset.slot),r=W(i?.providerId),s=J(r?.models||[]),c=q(s[Number(a.dataset.modelIndex)]||a.dataset.model||"");if(!c)return;if(n.activeModelSlotContext==="contact"){const p=b(n.currentContactId)||n.contacts[0];p?.settings&&(a.dataset.slot==="consciousness"?p.settings.loopModel=c:(p.settings.model=c,p.settings.modelProviderId=n.activeModelProviderId||p.settings.modelProviderId||A("chat")?.providerId||"openai")),n.modelSlotMenuOpen=!1,u(),k(150);return}const l=A(a.dataset.slot);l.model=c,a.dataset.providerId&&(l.providerId=a.dataset.providerId),n.modelSlotMenuOpen=!1,u(),D();return}if(o==="toggle-provider-enabled"){const i=W(a.dataset.providerId||a.dataset.key);i&&(i.enabled=!i.enabled,n.providerEditorDraft&&n.providerEditorDraft.id===i.id&&(n.providerEditorDraft.enabled=i.enabled)),u(),D();return}if(o==="save-provider-editor"){const i=a.dataset.provider,r=O(),s=r._selectedModelIds instanceof Set?r._selectedModelIds:new Set(r._selectedModelIds||[]),c=J([...s]),l=W(i),p=Zt(document.getElementById("provider-api-path-input")?.value||"",{allowEmpty:!0}),m=document.getElementById("provider-default-model-input")?.value?.trim()||"";let f="";try{f=m?pr(m,"默认模型"):c[0]||""}catch($){alert($.message||"默认模型不合法");return}if(!f){alert("默认模型不能为空，请手动输入或选择一个合法模型");return}const h={...l||{id:i},id:i,name:document.getElementById("provider-name-input")?.value?.trim()||"自定义供应商",baseUrl:document.getElementById("provider-base-input")?.value?.trim()||"",apiPath:p,api_path:p,apiKey:r._apiKeyDirty?document.getElementById("provider-key-input")?.value?.trim()||"":r.apiKey||"",defaultModel:f,models:c},v=z();v.providerModels={...v.providerModels||{},[i]:c},v.providers=v.providers.filter($=>$.id!==i),v.providers.push(h),qe(),n.providerEditorDraft=null,n.providerModelMenuOpen=!1,n.currentView="providerCatalog",u(),D();return}if(o==="save-slot-prompt"){const i=U(a.dataset.slot);z().defaultPrompts[i]=document.getElementById("slot-prompt-input")?.value||"",n.currentView="defaultModels",u(),D();return}if(o==="reset-slot-prompt"){const i=U(a.dataset.slot),r=Mt().defaultPrompts||{};z().defaultPrompts[i]=r[i]||"",u(),D();return}return La(e)},document.addEventListener("input",t=>{const e=t.target;if(e?.dataset?.action==="provider-search"){n.providerSearch=e.value||"",u();return}if(e?.id==="model-slot-input"){const a=b(n.currentContactId)||n.contacts[0],o=e.value||"",i=o?q(o):"";if(o&&!i){n.modelSlotMenuOpen=!1,ne();return}if(n.activeModelSlotContext==="contact")a?.settings&&(n.activeModelSlot==="consciousness"?a.settings.loopModel=i:a.settings.model=i);else{const r=A(n.activeModelSlot);r&&(r.model=i)}n.modelSlotMenuOpen=!1,ne();return}if(e?.id==="provider-name-input"){O().name=e.value||"";return}if(e?.id==="provider-base-input"){O().baseUrl=e.value||"";return}if(e?.id==="provider-api-path-input"){const a=O();a.apiPath=e.value||"",a.api_path=e.value||"";return}if(e?.id==="provider-key-input"){const a=O();e.dataset?.masked==="true"&&(e.value="",e.dataset.masked="false"),a._apiKeyDirty=!0,a.apiKey=String(e.value||"");return}if(e?.id==="provider-models-input"){O().models=String(e.value||"").split(",").map(a=>a.trim()).filter(Boolean),xt();return}if(e?.id==="voice-slot-provider-input"){const a=A("voice");a&&(a.provider=e.value||"");return}if(e?.id==="voice-slot-service-url-input"){const a=A("voice");a&&(a.service_url=e.value||"",a.base_url=e.value||"");return}if(e?.id==="voice-slot-voice-id-input"){const a=A("voice");a&&(a.voice_id=e.value||"");return}if(e?.id==="voice-slot-speaker-input"){const a=A("voice");a&&(a.speaker=e.value||"");return}if(e?.id==="voice-slot-emotion-input"){const a=A("voice");a&&(a.emotion=e.value||"");return}if(e?.id==="voice-slot-speed-input"){const a=A("voice");a&&(a.speed=e.value||"");return}if(e?.id==="voice-slot-format-input"){const a=A("voice");a&&(a.format=e.value||"");return}if(e?.id==="provider-default-model-input"){O().defaultModel=e.value||"",n.providerModelMenuOpen=!0,xt();return}if(e?.dataset?.contactField==="persona"){const a=Q();if(!a)return;a.persona=e.value||"",k(180),Fr(a.id,a.persona)}}),document.addEventListener("paste",t=>{const e=t.target;if(e?.id!=="provider-key-input")return;t.preventDefault();const a=String(t.clipboardData?.getData("text/plain")||"").trim();e.value=a;const o=O();o._apiKeyDirty=!0,o.apiKey=a,e.dispatchEvent(new Event("input",{bubbles:!0}))}),document.addEventListener("change",t=>{const e=t.target;if(e?.id==="nc-avatar-file"){const a=e.files?.[0];if(!a)return;n.newContactDraft={...n.newContactDraft||fe(),name:document.getElementById("nc-name")?.value||n.newContactDraft?.name||"",agentId:document.getElementById("nc-agent-id")?.value||n.newContactDraft?.agentId||"",bio:document.getElementById("nc-bio")?.value||n.newContactDraft?.bio||""},rn(a,"new-contact"),e.value="";return}if(e?.id==="account-avatar-file"){const a=e.files?.[0];if(!a)return;rn(a,"account"),e.value="";return}if(e?.id==="contact-avatar-file"){const a=e.files?.[0];if(!a||!b(n.currentContactId))return;rn(a,"contact"),e.value="";return}if(e?.id==="moment-image-input"){const a=e.files?.[0];if(!a)return;n.momentComposerImageName=a.name||"";const o=new FileReader;o.onload=()=>{n.momentComposerImage=typeof o.result=="string"?o.result:"",u()},o.readAsDataURL(a);return}if(e?.id==="chat-image-input"){on(e.files||[]),e.value="";return}if(e?.dataset?.action==="select-slot-model"){const a=A(e.dataset.slot);if(!a)return;a.model=e.value,D();return}String(e?.id||"").startsWith("voice-slot-")&&D()});function ts(t,e){const a=Q(),o=kt(a),i=o.findIndex(s=>s.id===t);if(i<0)return;const[r]=o.splice(i,1);if(!e)o.splice(0,0,r);else{const s=o.findIndex(c=>c.id===e);s<0?o.push(r):o.splice(s+1,0,r)}a.settings.quickActions=o,k(120)}const w={id:"",mode:"idle",startX:0,startY:0,currentY:0,hoverId:"",pendingDropId:null,pressTimer:null};function oe(){w.pressTimer&&(clearTimeout(w.pressTimer),w.pressTimer=null)}function ja(){oe(),w.id="",w.mode="idle",w.startX=0,w.startY=0,w.currentY=0,w.hoverId="",w.pendingDropId=null}function En(){y()?.querySelectorAll(".quick-action-swipe.drop-hint-after").forEach(t=>t.classList.remove("drop-hint-after"))}function es(t,e){const a=y()?.querySelector(`.quick-action-swipe[data-quick-id="${t}"]`);if(!a)return;const o=a.querySelector(".quick-action-row"),i=a.querySelector(".quick-action-delete");if(!o||!i)return;const r=Math.max(-74,Math.min(0,Number(e)||0)),s=Math.min(1,Math.abs(r)/74);o.style.transform=`translateX(${r}px)`,i.style.opacity=String(s),i.style.transform=`translateX(${18*(1-s)}px) scale(${.97+.03*s})`,i.style.pointerEvents=s>.98?"auto":"none"}function At(t){const e=y()?.querySelector(`.quick-action-swipe[data-quick-id="${t}"]`);if(!e)return;const a=e.querySelector(".quick-action-row"),o=e.querySelector(".quick-action-delete");a&&a.style.removeProperty("transform"),o&&(o.style.removeProperty("opacity"),o.style.removeProperty("transform"),o.style.removeProperty("pointer-events"))}function Fa(){if(y()?.querySelectorAll(".quick-action-swipe.quick-dragging").forEach(o=>o.classList.remove("quick-dragging")),y()?.querySelectorAll(".quick-action-row.touch-dragging").forEach(o=>{o.classList.remove("touch-dragging"),o.style.removeProperty("transform")}),!n.quickActionDragId)return;const t=y()?.querySelector(`.quick-action-row[data-quick-id="${n.quickActionDragId}"]`),e=t?.closest(".quick-action-swipe");if(!t||!e)return;e.classList.add("quick-dragging"),t.classList.add("touch-dragging");const a=w.currentY-w.startY;t.style.transform=`translateY(${a}px) scale(1.04) rotate(1.2deg)`}function ns(t){const e=Array.from(y()?.querySelectorAll(".quick-action-swipe[data-quick-id]")||[]).filter(o=>o.dataset.quickId!==n.quickActionDragId);if(!e.length)return"";let a="";for(const o of e){const i=o.getBoundingClientRect(),r=i.top+i.height/2;if(t>=r)a=o.dataset.quickId;else break}return a}function Ua(){const t=w.pendingDropId,e=n.quickActionDragId;En(),n.quickActionDragId="",n.quickActionDropHintId="",n.quickActionDropDirection="",n.quickActionReorderPulseId="",e&&t!==null&&ts(e,t),u()}function Ka(t,e,a){oe(),n.quickActionSwipeOpenId&&n.quickActionSwipeOpenId!==a&&(At(n.quickActionSwipeOpenId),n.quickActionSwipeOpenId="",u()),w.id=a,w.mode="pending",w.startX=t,w.startY=e,w.currentY=e,w.hoverId="",w.pressTimer=window.setTimeout(()=>{if(!(w.mode!=="pending"||!w.id)&&(w.mode="drag",w.pendingDropId=null,n.quickActionDragId=w.id,Fa(),navigator?.vibrate))try{navigator.vibrate(12)}catch{}},280)}function Qa(t,e,a){if(!w.id)return;const o=t-w.startX,i=e-w.startY;if(w.mode==="pending"){Math.abs(o)>12&&Math.abs(o)>Math.abs(i)?(oe(),w.mode="swipe"):Math.abs(i)>10&&(oe(),w.mode="cancelled");return}if(w.mode==="swipe"){const c=n.quickActionSwipeOpenId===w.id?-74:0,l=Math.max(-74,Math.min(0,c+o));es(w.id,l);return}if(w.mode!=="drag")return;a?.(),w.currentY=e,Fa();const r=ns(e);r!==w.pendingDropId&&(w.pendingDropId=r,En(),r&&y()?.querySelector(`.quick-action-swipe[data-quick-id="${r}"]`)?.classList.add("drop-hint-after"))}function Ya(t){if(w.id){if(oe(),w.mode==="swipe"){const e=n.quickActionSwipeOpenId===w.id,a=t-w.startX;(e?-74+a:a)<-36?(n.quickActionSwipeOpenId=w.id,At(w.id),u()):e&&a>22?(n.quickActionSwipeOpenId="",At(w.id),u()):(At(w.id),e&&(n.quickActionSwipeOpenId=w.id,u()))}w.mode==="drag"&&Ua(),ja()}}document.addEventListener("touchstart",t=>{if(en(t.target)||t.target.closest(".quick-action-open"))return;const e=t.target.closest(".quick-action-row");if(!e){!t.target.closest(".quick-action-delete")&&!t.target.closest(".quick-action-swipe")&&n.quickActionSwipeOpenId&&(At(n.quickActionSwipeOpenId),n.quickActionSwipeOpenId="",u());return}const a=t.touches?.[0];a&&Ka(a.clientX,a.clientY,e.dataset.quickId||"")},{passive:!0}),document.addEventListener("touchmove",t=>{const e=t.touches?.[0];e&&Qa(e.clientX,e.clientY,()=>t.preventDefault())},{passive:!1}),document.addEventListener("touchend",t=>{const e=t.changedTouches?.[0];Ya(e?.clientX||w.startX)},{passive:!0}),document.addEventListener("touchcancel",()=>{At(w.id),En(),w.mode==="drag"&&Ua(),ja()},{passive:!0});let Xa=0,Ga=0;function as(t){const e=t.target?.closest?.(".codex-toggle:not(.cc-toggle)");if(!e)return;const a=Date.now();if(a-Xa<320){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation?.();return}Xa=a,t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation?.(),$e(e.dataset.contactId)}function os(t){const e=t.target?.closest?.(".cc-toggle");if(!e)return;const a=Date.now();if(a-Ga<320){t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation?.();return}Ga=a,t.preventDefault(),t.stopPropagation(),t.stopImmediatePropagation?.(),Le(e.dataset.contactId)}["pointerdown","touchstart","mousedown","click"].forEach(t=>{document.addEventListener(t,as,!0),document.addEventListener(t,os,!0)}),document.addEventListener("mousedown",t=>{if(en(t.target)||t.target.closest(".quick-action-open"))return;const e=t.target.closest(".quick-action-row");if(!e||t.button!==0){!t.target.closest(".quick-action-delete")&&!t.target.closest(".quick-action-swipe")&&n.quickActionSwipeOpenId&&(At(n.quickActionSwipeOpenId),n.quickActionSwipeOpenId="",u());return}Ka(t.clientX,t.clientY,e.dataset.quickId||"")}),document.addEventListener("mousemove",t=>{Qa(t.clientX,t.clientY,()=>t.preventDefault())}),document.addEventListener("mouseup",t=>{Ya(t.clientX)});const is=Ze;Ze=function(){return is()},document.addEventListener("DOMContentLoaded",()=>{z(),Rr(),Ha(),za(),pt(),ae(n.currentContactId)}),document.addEventListener("focusin",t=>{const e=t.target;if(e?.id==="model-slot-input"){n.modelSlotMenuOpen=!1,ne();return}if(e?.id==="provider-default-model-input"&&(n.providerModelMenuOpen=!0,xt()),e?.id==="provider-key-input"&&e.dataset?.masked==="true"){const a=O();e.value="",e.dataset.masked="false",a._apiKeyDirty=!0,a.apiKey="",n.providerKeyVisible=!0,e.type="text"}}),document.addEventListener("click",t=>{if(_n.has(n.currentView)&&n.currentView==="modelSlot"&&!t.target.closest('#model-slot-input, .provider-model-picker, [data-action="toggle-model-slot-menu"]')&&n.modelSlotMenuOpen){n.modelSlotMenuOpen=!1,ne();return}if(n.currentView!=="providerEditor")return;!t.target.closest(".provider-model-picker")&&n.providerModelMenuOpen&&(n.providerModelMenuOpen=!1,xt())})})();
