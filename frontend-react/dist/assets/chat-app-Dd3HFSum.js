(()=>{const lt=[{id:"ayan",name:"阿延",handle:"@ayan",bio:"小酒，今天也要开开心心哦～",status:"在线",roleTag:"特别关注",lastMessage:"先聊天详情页。头部、气泡、输入区一起收掉，其他页自然顺。",lastTime:"刚刚",unread:2,pinned:!0,avatar:"https://images.unsplash.com/photo-1517841905240-472988babdf9?w=300&q=80",theme:"rose",settings:{model:"gpt-5.4",modelProviderId:"openai",temperature:.72,topP:.9,contextCount:64,thinkBudget:48,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!0,proactiveFrequency:60,memoryEnabled:!0},roomBackground:"点阵",chatTheme:"default",bubbleTheme:"默认主题",topics:[{id:"t1",title:"最近状态",updatedAt:"今天 21:40",count:24},{id:"t2",title:"睡眠记录",updatedAt:"昨天",count:18},{id:"t3",title:"网页 UI",updatedAt:"3天前",count:41}],messages:[{id:"m1",role:"ai",text:"今天把你丢给我的文件都翻了一遍。页面可以更可爱，真正夹棒的是里面的空壳。",time:"21:48"},{id:"m2",role:"user",text:"所以该先改哪里？",time:"21:49"},{id:"m3",role:"ai",text:"先聊天详情页。头部、气泡、输入区一起收掉，其他页自然顺。",time:"21:49",thinking:"她已经给了明确起点，先改核心路径能更快出效果。"}]},{id:"azheng",name:"阿争",handle:"@azheng",bio:"我把草稿整理好了，要继续吗？",status:"忙碌",roleTag:"同事",lastMessage:"我把草稿整理好了，要继续吗？",lastTime:"12分钟前",unread:0,pinned:!1,avatar:"https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=300&q=80",theme:"mist",settings:{model:"gpt-5.4",modelProviderId:"openai",temperature:.45,topP:.8,contextCount:48,thinkBudget:36,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!1,proactiveFrequency:30,memoryEnabled:!0},roomBackground:"点阵",chatTheme:"default",bubbleTheme:"默认主题",topics:[{id:"t4",title:"版本梳理",updatedAt:"今天 23:18",count:12},{id:"t5",title:"说明文档",updatedAt:"昨天",count:8}],messages:[{id:"m4",role:"ai",text:"我把草稿整理好了，要继续吗？",time:"23:18"}]},{id:"xiaoying",name:"小樱",handle:"@sakura",bio:"周末去看展吗？",status:"在线",roleTag:"朋友",lastMessage:"周末去看展吗？",lastTime:"1小时前",unread:1,pinned:!1,avatar:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=300&q=80",theme:"cream",settings:{model:"gpt-5.4",modelProviderId:"openai",temperature:.66,topP:.95,contextCount:32,thinkBudget:24,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!0,proactiveFrequency:20,memoryEnabled:!1},roomBackground:"点阵",chatTheme:"default",bubbleTheme:"默认主题",topics:[{id:"t6",title:"周末计划",updatedAt:"今天",count:6}],messages:[{id:"m5",role:"ai",text:"周末去看展吗？我知道有个新的展。",time:"20:22"}]}],qn=[{id:"p0",contactId:"me",time:"23:36",mood:"开心",content:"今天的天空很温柔。",image:"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80",likes:["我"],comments:[]},{id:"p1",contactId:"ayan",time:"21:20",mood:"主动",content:"你醉了先看这个。",image:"",likes:["我","阿延"],comments:[{author:"我",text:"我收到了"}]},{id:"p2",contactId:"xiaoying",time:"19:08",mood:"经常",content:"晚上跑了三公里。",image:"",likes:[],comments:[]}],Za=[],dt=[{id:"health",label:"Health",icon:"health"},{id:"schedule",label:"日程",icon:"calendar"},{id:"weather",label:"天气",icon:"weather"},{id:"files",label:"文件",icon:"file"},{id:"quote",label:"引用",icon:"quote"},{id:"more",label:"更多",icon:"more"}];function eo(){return{tools:dt.map(e=>({id:e.id,label:e.label,icon:e.icon,prompt:"",enabled:!0}))}}const n={currentTab:"chats",currentView:"list",currentContactId:"",currentSettingsTab:"basic",cotLogMode:"long",activityLogEntries:[],activityLogLoading:!1,activityLogLoadedAt:"",quoteMomentId:null,quoteMessageId:null,momentComposerOpen:!1,momentComposerText:"",momentComposerImage:"",momentComposerImageName:"",momentComposerEditingId:"",momentsActorType:"user",commentSheetMomentId:null,activeMenuMomentId:null,activeBubbleToolsId:null,suppressBubbleToggle:!1,toast:"",topicConfirmOpen:!1,rpRooms:[],currentRpRoomId:"",currentRpMessages:[],conversations:{},rpMessages:{},rpRoomDialogOpen:!1,rpRoomDialogMode:"create",rpRoomForm:{name:"",world_setting:"",user_role:"",ai_role:""},rpBackView:"list",contacts:[],moments:structuredClone(Za),actions:structuredClone(dt),globalSettings:{theme:"奶油粉",notifications:!0,momentsNotify:!0,autoScroll:!0,defaultModel:"gpt-5.4",provider:"OpenAI",searchService:"默认搜索",voiceService:"未连接",mcpEnabled:!0,exportFormat:"json"},accountProfile:{avatar:"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80",nickname:"小酒",signature:"管理个人资料与基础偏好"},newContactAvatar:"",newContactDraft:{name:"",agentId:"",bio:"",avatar:""},avatarCropper:null,showAttach:!1,contactQuickActionEditorId:"",contactQuickMcpMenuOpen:!1,quickActionSwipeOpenId:"",quickActionDragId:"",quickActionSuppressClickUntil:0,quickActionDropHintId:"",quickActionReorderPulseId:"",quickActionDropDirection:"",contactPersonaExpanded:!1,contactModelAdvancedOpen:!1,chatAttachments:[],chatPasteError:"",companionState:{recent_topics:[],current_mood:"",open_loops:[],proactive_cooldown_until:null,impression:null,relationship_progress:null,likes_summary:null,summary_updated_at:null,updated_at:""},openThinkingIds:{},streamingAbortController:null,animatedMsgIds:{},assistantPlayback:{token:"",timer:null},historyLoadingContactIds:{},historyLoadedContactIds:{},rpCurtainRunning:!1},ve=new Map,y=()=>document.getElementById("chat-app-root"),b=e=>n.contacts.find(t=>t.id===e),Ue=e=>n.moments.find(t=>t.id===e),d=(e="")=>String(e).replaceAll("&","&amp;").replaceAll("<","&lt;").replaceAll(">","&gt;").replaceAll('"',"&quot;").replaceAll("'","&#39;"),pt=[{key:"default",name:"默认主题",desc:"干净柔和的默认聊天界面",roomTheme:"rose",aliases:["默认玫瑰","默认"]},{key:"pink",name:"蜜桃粉",desc:"更甜一点的粉色聊天氛围",roomTheme:"rose",aliases:["奶茶"]},{key:"dark",name:"夜色",desc:"低亮度深色聊天界面",roomTheme:"rose",aliases:[]},{key:"glass",name:"玻璃雾",desc:"通透轻雾感的玻璃界面",roomTheme:"mist",aliases:["晴空"]}],Ln=["windowsill","tape"];function Vt(e){const t=String(e||"").trim();return t&&pt.find(o=>o.key===t||o.name===t||o.aliases.includes(t))?.key||"default"}function Dn(e){const t=Vt(e);return pt.find(a=>a.key===t)||pt[0]}function Bt(e){return Vt(e?.chatTheme||e?.bubbleTheme)}function zt(e){return Dn(e).name}const On=1500,jt=8e3;function Rn(e){return e?e.replace(/<tool_call>[\s\S]*?<\/tool_call>/g,"").replace(/<tool_call>[\s\S]*$/,"").replace(/<\/?(thead|tbody|tr|td|th|table|tool|function|call)[^>]*>/gi,"").replace(/<[^>\n]{1,80}>/g,"").replace(/\n{3,}/g,`

`).trim():""}function ye(e){return e==null?"":typeof e=="string"?e:typeof e=="number"||typeof e=="boolean"?String(e):""}function Ht(e,t="",a=""){const o=Rn(ye(e));if(!o)return"";const i=o.replace(/\s+/g," ").trim(),r=ye(t).replace(/\s+/g," ").trim(),s=ye(a).replace(/\s+/g," ").trim();return!i||r&&(i===r||r.includes(i)&&i.length>=8)||s&&(s.includes(i)||s.slice(Math.max(0,s.length-i.length-12)).includes(i))?"":o}function Nt(e="",t=""){const a=ye(e),o=ye(t);return o?a?/[\s\n]$/.test(a)||/^[\s\n，。！？、；：,.!?;:）】》]/.test(o)?a+o:/[\x00-\x7F]$/.test(a)||/^[\x00-\x7F]/.test(o)?`${a} ${o}`:a+o:o:a}function Vn(){return new Promise(e=>requestAnimationFrame(e))}function to(e,t,a){const o=y()?.querySelector(`.message-row[data-msg-id="${e}"]`);if(!o)return;const i=o.querySelector(".message-text");if(i&&(i.textContent=t),a){lo(e,a);const r=o.querySelector(`#thinking-${e}`);if(r&&r.closest(".cot-wrapper")){r.textContent=Ke(a),r.classList.add("open","thinking-active"),r.setAttribute("aria-hidden","false");const s=o.querySelector(`#cot-wrapper-${e}`);s&&s.removeAttribute("data-slow")}n.openThinkingIds[e]=!0}}function Ke(e){const t=Rn(e);return t?t.length<=On?t:`（已截断，共 ${t.length} 字）
${t.slice(-On)}`:""}const no='<svg viewBox="0 0 24 24"><path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"/></svg>',ao='<svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>',oo='<svg viewBox="0 0 24 24"><path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/><circle cx="12" cy="12" r="3"/></svg>',io='<svg viewBox="0 0 24 24"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>',ro='<svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';function so(e){const t=String(e||"").toLowerCase();return/time|clock|date/.test(t)?ao:/view|read|file|diary|memory|search/.test(t)?oo:no}function co(e){const t=!!e.streaming,a=t?"tl-active":"tl-done",o=t?Ke(e.thinking):e.thinking||"",r=(o||"").replace(/\s+/g," ").trim()||"思考中…",s=r.length>36?r.slice(0,36)+"…":r;return`
        <div class="thinking-line ${a}" id="tl-line-${e.id}" data-action="toggle-thinking-line" data-id="${e.id}">
          <div class="thinking-dot"></div>
          <div class="thinking-text-wrap">
            <span class="thinking-text" id="tl-text-${e.id}">${d(s)}</span>
            <div class="thinking-heart">${io}</div>
            <div class="thinking-fade"></div>
          </div>
          <div class="thinking-expand">${ro}</div>
        </div>
        <div class="thinking-full" id="tl-full-${e.id}">
          <div class="thinking-full-inner" id="thinking-${e.id}">${d(o)}</div>
        </div>`}function uo(e=[]){return e.length?`<div class="tool-lines-wrap">${e.map(a=>{const o=a.status==="running"?"tl-active":"tl-done",i=`${a.name} → ${a.status==="running"?"调用中…":"完成"}`;return`
          <div class="tool-line ${o}">
            <div class="tool-dot"></div>
            <div class="tool-icon">${so(a.name)}</div>
            <span class="tool-text">${d(i)}</span>
          </div>`}).join("")}</div>`:""}function lo(e,t,a){const o=y()?.querySelector(`#tl-text-${e}`),i=y()?.querySelector(`#thinking-${e}`),r=y()?.querySelector(`#tl-line-${e}`),c=(t||"").replace(/\s+/g," ").trim()||"思考中…",l=c.length>36?c.slice(0,36)+"…":c;o&&(o.textContent=l),i&&(i.textContent=Ke(t)),r&&(r.classList.add("tl-active"),r.classList.remove("tl-done"))}const Bn=e=>new Promise(t=>window.setTimeout(t,e));function zn(e){const t=String(e||"").replace(/\r\n/g,`
`).trim();if(!t)return[];const o=t.replace(/[ \t]+\n/g,`
`).replace(/\n{3,}/g,`

`).split(/\n{2,}/).map(c=>String(c||"").trim()).filter(Boolean),i=[],r=c=>{const l=String(c||"").trim();if(l){if(i.length&&l.length<=4){i[i.length-1]+=l;return}i.push(l)}},s=c=>{const l=String(c||"").split(new RegExp("(?<=[。！？!?…])\\s*","u")).map(m=>m.trim()).filter(Boolean);if(l.length<=1){r(c);return}let p="";l.forEach(m=>{const f=p?`${p}${m}`:m;p&&f.length>90?(r(p),p=m):p=f}),r(p)};return o.forEach(c=>{const l=/[。！？!?…]\s*/u.test(c);c.length<=64||!l?r(c):s(c)}),i.filter(Boolean)}function po(e){const t=String(e||"").replace(/\r\n/g,`
`).trim();return!t||!t.includes(`
`)?t:t.split(/\n{2,}/).map(a=>{const o=a.split(`
`).map(r=>r.trim()).filter(Boolean);if(o.length<=1)return a.trim();const i=o.join("");return i.length<=32||o.every(r=>r.length<=8)?i:o.join(`
`)}).join(`

`)}function mo(e){const t=String(e||"").trim().length;return t<=10?300+Math.floor(Math.random()*201):t<=24?600+Math.floor(Math.random()*301):900+Math.floor(Math.random()*301)}function De(){n.assistantPlayback.token="",n.assistantPlayback.timer&&(window.clearTimeout(n.assistantPlayback.timer),n.assistantPlayback.timer=null)}async function jn(e,t,a={}){const o=Array.isArray(t)?t.filter(s=>String(s||"").trim()):[];if(!e||!o.length)return;De();const i=`reply_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;n.assistantPlayback.token=i;const r=Number.isInteger(a.startIndex)?a.startIndex:e.messages.length;for(let s=0;s<o.length;s+=1){if(n.assistantPlayback.token!==i)return;const c={id:`ai_chunk_${Date.now()}_${s}_${Math.random().toString(36).slice(2,6)}`,role:"ai",text:o[s],content:o[s],time:q(),created_at:new Date().toISOString()};if(s===0&&(a.thinking&&(c.thinking=a.thinking),a.toolCalls&&(c.toolCalls=a.toolCalls)),s===0&&a.replaceId){const l=e.messages.findIndex(p=>p.id===a.replaceId);l!==-1?e.messages[l]=c:e.messages.splice(Math.min(r,e.messages.length),0,c)}else{const l=Math.min(r+s,e.messages.length);e.messages.splice(l,0,c)}if(e.lastMessage=c.text,e.lastTime=c.time,u(),N(),s>=o.length-1)break;await new Promise(l=>{n.assistantPlayback.timer=window.setTimeout(l,mo(o[s]))}),n.assistantPlayback.timer=null}n.assistantPlayback.token===i&&(n.assistantPlayback.token="",n.assistantPlayback.timer=null),k(120)}function Oe(e){const t=e&&typeof e=="object"?e:{},a=i=>Array.isArray(i)?i.map(r=>String(r||"").trim()).filter(Boolean):[],o=i=>i!=null&&String(i).trim()?String(i).trim():null;return{recent_topics:a(t.recent_topics),current_mood:String(t.current_mood||"").trim(),open_loops:a(t.open_loops),proactive_cooldown_until:t.proactive_cooldown_until?String(t.proactive_cooldown_until):null,impression:o(t.impression),relationshipProgress:o(t.relationship_progress??t.relationshipProgress),likesSummary:o(t.likes_summary??t.likesSummary),summaryUpdatedAt:o(t.summary_updated_at??t.summaryUpdatedAt),updated_at:String(t.updated_at||"").trim()}}function fo(){const e=Oe(n.companionState);return e.current_mood?`情绪：${e.current_mood}`:e.open_loops[0]?`进行中：${e.open_loops[0]}`:e.recent_topics[0]?`最近话题：${e.recent_topics[0]}`:"暂无状态"}function we(){if(n.momentsActorType==="agent"){const e=Q();return{author_type:"agent",author_id:e?.id||n.currentContactId||"default",author_name:e?.name||"当前角色",avatar:e?.avatar||""}}return{author_type:"user",author_id:"me",author_name:n.accountProfile?.nickname||"我",avatar:n.accountProfile?.avatar||"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80"}}function P(e={}){const t=Array.isArray(e.likes)?e.likes:[],a=Array.isArray(e.comments)?e.comments:[],o=String(e.author_type||(e.contactId==="me"?"user":"agent")),i=String(e.author_id||(o==="user"?"me":e.contactId||"default"));return{id:String(e.id||`p${Date.now()}`),author_type:o,author_id:i,content:String(e.content||""),image:String(e.image||""),mood:String(e.mood||""),time:String(e.time||""),created_at:String(e.created_at||""),updated_at:String(e.updated_at||""),likes:t.map(r=>typeof r=="string"?{author_type:"user",author_id:r==="我"?"me":r,author_name:r}:{author_type:String(r?.author_type||"user"),author_id:String(r?.author_id||"me"),author_name:String(r?.author_name||"")}),comments:a.map(r=>({author_type:String(r?.author_type||"user"),author_id:String(r?.author_id||"me"),author_name:String(r?.author_name||r?.author||""),text:String(r?.text||"")}))}}function Hn(e){const t=P(e);if(t.author_type==="agent"){const a=b(t.author_id);return{name:a?.name||t.author_id||"角色",avatar:a?.avatar||""}}return{name:n.accountProfile?.nickname||"我",avatar:n.accountProfile?.avatar||"https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80"}}function Nn(e){const t=P(e);return t.author_type==="user"?t.author_id==="me":t.author_id===(n.currentContactId||Q()?.id||"default")}function Fn(e=[]){return e.map(t=>t.author_name||(t.author_type==="user"?"我":b(t.author_id)?.name||t.author_id)).join("、")}function go(e,t,a){const o=b(n.currentContactId);o&&(o[e]=t,n.toast=a,u(),k(120),window.setTimeout(()=>{n.toast="",u()},1200))}function ho(e){const t=String(e).toLowerCase();return["health","heart"].includes(t)?"health":["calendar","schedule","date"].includes(t)?"calendar":["weather","cloud"].includes(t)?"weather":["file","files","doc","document"].includes(t)?"file":["quote","reply"].includes(t)?"quote":(["more","tool","tools"].includes(t),"more")}const Ft={get_current_time:"时间",get_weather:"天气",get_health_summary:"健康",web_search:"搜索",fetch_url:"网页",add_todo:"待办",list_todos:"待办列表",complete_todo:"完成待办",add_note:"便签",list_notes:"便签列表"},Un=new Set(["get_current_time","get_weather","get_health_summary","web_search","fetch_url","add_todo","list_todos","complete_todo","add_note","list_notes"]);function Se(e){return Un.has(String(e||"").trim())}function fe(e,t){if(typeof e=="string"){const r=String(e||`mcp_${t}`);return{id:r,label:Ft[r]||e||`工具${t+1}`,icon:"more",prompt:"",mcpToolId:Se(r)?r:"",enabled:!0}}const a=e?.id||e?.toolId||e?.name||`mcp_${t}`,o=String(a),i=Ft[o]||e?.label||e?.name||e?.title||`工具${t+1}`;return{id:o,label:String(i),icon:ho(e?.icon||e?.type||e?.category||"more"),prompt:String(e?.prompt||e?.message||""),mcpToolId:String(e?.mcpToolId||e?.toolId||(Se(o)?o:"")),enabled:e?.enabled!==!1}}function Kn(){const t=z()?.mcpLibrary?.tools;if(!Array.isArray(t)||!t.length)return dt;const a=t.map(fe).filter(o=>Se(o.id)).filter(o=>o.enabled!==!1);return a.length?a:dt}function Q(){return b(n.currentContactId)||n.contacts[0]}function $e(e){return e?.settings?(!Array.isArray(e.settings.quickActions)||!e.settings.quickActions.length?e.settings.quickActions=Kn().map((t,a)=>({...fe(t,a)})):e.settings.quickActions=e.settings.quickActions.map((t,a)=>fe(t,a)),e.settings.quickActions):[]}function Ut(e=Q()){const t=$e(e).filter(a=>a.enabled!==!1);return t.length?t:Kn()}function g(e){const t='viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"',a={back:`<svg ${t}><path d="M15 18l-6-6 6-6"/></svg>`,plus:`<svg ${t}><path d="M12 5v14M5 12h14"/></svg>`,search:`<svg ${t}><circle cx="11" cy="11" r="6.5"/><path d="M20 20l-4.2-4.2"/></svg>`,history:`<svg ${t}><path d="M3 12a9 9 0 101.9-5.6"/><path d="M3 4v4h4"/><path d="M12 7v5l3 2"/></svg>`,settings:`<svg ${t}><path d="M12 3v3M12 18v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M3 12h3M18 12h3M4.9 19.1L7 17M17 7l2.1-2.1"/><circle cx="12" cy="12" r="3.3"/></svg>`,more:`<svg ${t}><circle cx="5" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="12" cy="12" r="1.4" fill="currentColor" stroke="none"/><circle cx="19" cy="12" r="1.4" fill="currentColor" stroke="none"/></svg>`,heart:`<svg ${t}><path d="M12 20.5s-7-4.4-7-10a4 4 0 017-2.5A4 4 0 0119 10.5c0 5.6-7 10-7 10z"/></svg>`,heartFilled:'<svg viewBox="0 0 24 24" fill="#B595C9" stroke="none" stroke-width="0"><path d="M12 20.5s-7-4.4-7-10a4 4 0 017-2.5A4 4 0 0119 10.5c0 5.6-7 10-7 10z"/></svg>',comment:`<svg ${t}><path d="M7 18l-3 2 1-3.8A7.8 7.8 0 014.2 13 7.8 7.8 0 1112 20a8 8 0 01-5-2z"/><path d="M8.5 10.5h7M8.5 13.5h4.5"/></svg>`,chatArrow:`<svg ${t}><path d="M4.8 18.2l.9-3.3A7.5 7.5 0 014.5 11 7.5 7.5 0 1112 18.5a7.4 7.4 0 01-3.6-.9z"/><path d="M10 9l4 3-4 3"/><path d="M14 12H8"/></svg>`,send:`<svg ${t}><path d="M21 3L10 14"/><path d="M21 3l-7 18-4-7-7-4z"/></svg>`,close:`<svg ${t}><path d="M18 6L6 18M6 6l12 12"/></svg>`,camera:`<svg ${t}><path d="M23 19a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h4l2-3h6l2 3h4a2 2 0 0 1 2 2z"></path><circle cx="12" cy="13" r="4"></circle></svg>`,attach:`<svg ${t}><path d="M21 11.5l-8.7 8.7a5 5 0 01-7.1-7.1l9.2-9.2a3.5 3.5 0 015 5L9 19.3a2 2 0 01-2.8-2.8l8.5-8.5"/></svg>`,quote:`<svg ${t}><path d="M9 7H5v5h4v5H4v-5c0-2.8 1.8-5 5-5zM20 7h-4v5h4v5h-5v-5c0-2.8 1.8-5 5-5z"/></svg>`,reroll:`<svg ${t}><path d="M20 11a8 8 0 10-2.3 5.7"/><path d="M20 4v7h-7"/></svg>`,cot:`<svg ${t}><path d="M12 4v16M4 12h16"/><path d="M7.5 7.5l9 9M16.5 7.5l-9 9" opacity="0.18"/></svg>`,bubbleHeart:`<svg ${t}><path d="M12 19.3s-5.8-3.5-5.8-8a3.7 3.7 0 016.1-2.8 3.7 3.7 0 015.9 2.8c0 4.5-5.6 8-5.6 8z"/></svg>`,weather:`<svg ${t}><path d="M6 16a4 4 0 010-8 5.5 5.5 0 0110.4-1.8A4 4 0 1118 16H6z"/></svg>`,calendar:`<svg ${t}><rect x="4" y="5" width="16" height="15" rx="3"/><path d="M8 3v4M16 3v4M4 10h16"/></svg>`,file:`<svg ${t}><path d="M8 3h6l5 5v11a2 2 0 01-2 2H8a2 2 0 01-2-2V5a2 2 0 012-2z"/><path d="M14 3v5h5"/></svg>`,health:`<svg ${t}><path d="M12 20s-6.5-4-6.5-9.2A4.3 4.3 0 0112 7a4.3 4.3 0 016.5 3.8C18.5 16 12 20 12 20z"/><path d="M9.2 12h1.8l1-2.1 1.2 4 1-1.9h1.6"/></svg>`,toggleOff:'<svg viewBox="0 0 52 32" fill="none"><rect x="1.5" y="1.5" width="49" height="29" rx="14.5" fill="rgba(255,255,255,.7)" stroke="rgba(150,122,133,.14)"/><circle cx="16" cy="16" r="11" fill="#fff"/></svg>',toggleOn:'<svg viewBox="0 0 52 32" fill="none"><rect x="1.5" y="1.5" width="49" height="29" rx="14.5" fill="#e9d7ff" stroke="rgba(120,90,150,.14)"/><circle cx="36" cy="16" r="11" fill="#fff"/></svg>',chevron:`<svg ${t}><path d="M9 6l6 6-6 6"/></svg>`,tabChat:`<svg ${t}><path d="M22 12c0-5.5-4.5-10-10-10S2 6.5 2 12c0 2 .6 3.9 1.6 5.4L2 22l4.8-1.3A9.9 9.9 0 0012 22c5.5 0 10-4.5 10-10z"></path></svg>`,tabMoments:`<svg ${t}><circle cx="12" cy="12" r="10"/><path d="M12 16v-4"/><path d="M12 8h.01"/></svg>`,tabSettings:`<svg ${t}><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.65 1.65 0 00.33 1.82l.06.06a2 2 0 010 2.83 2 2 0 01-2.83 0l-.06-.06a1.65 1.65 0 00-1.82-.33 1.65 1.65 0 00-1 1.51V21a2 2 0 01-2 2 2 2 0 01-2-2v-.09A1.65 1.65 0 009 19.4a1.65 1.65 0 00-1.82.33l-.06.06a2 2 0 01-2.83 0 2 2 0 010-2.83l.06-.06a1.65 1.65 0 00.33-1.82 1.65 1.65 0 00-1.51-1H3a2 2 0 01-2-2 2 2 0 012-2h.09A1.65 1.65 0 004.6 9a1.65 1.65 0 00-.33-1.82l-.06-.06a2 2 0 010-2.83 2 2 0 012.83 0l.06.06a1.65 1.65 0 001.82.33H9a1.65 1.65 0 001-1.51V3a2 2 0 012-2 2 2 0 012 2v.09a1.65 1.65 0 001 1.51 1.65 1.65 0 001.82-.33l.06-.06a2 2 0 012.83 0 2 2 0 010 2.83l-.06.06a1.65 1.65 0 00-.33 1.82V9a1.65 1.65 0 001.51 1H21a2 2 0 012 2 2 2 0 01-2 2h-.09a1.65 1.65 0 00-1.51 1z"/></svg>`,actionDots:'<svg viewBox="0 0 24 24" fill="currentColor"><circle cx="5" cy="12" r="1.5"/><circle cx="12" cy="12" r="1.5"/><circle cx="19" cy="12" r="1.5"/></svg>',pencil:`<svg ${t}><path d="M12 20h9"></path><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z"></path></svg>`,trash:`<svg ${t}><polyline points="3 6 5 6 21 6"></polyline><path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path></svg>`,stop:'<svg viewBox="0 0 24 24" fill="currentColor" stroke="none"><rect x="7" y="7" width="10" height="10" rx="2"/></svg>'};return a[e]||a.more}function Qn(){u()}function Kt(e){const t=()=>{const a=y()?.querySelector(".chat-app-body");a&&(a.scrollTop=e)};requestAnimationFrame(()=>{t(),requestAnimationFrame(t),window.setTimeout(t,0)})}function Yn(){const e=y()?.querySelector(".chat-app-body"),t=e?e.scrollTop:0,a=window.scrollY||window.pageYOffset||0;u(),Kt(t),requestAnimationFrame(()=>{window.scrollTo(0,a),requestAnimationFrame(()=>window.scrollTo(0,a))})}function ne(){if(n.currentView==="moments"){Yn();return}u()}function bo(e,t){n.moments=n.moments.map(a=>{const o=P(a);if(o.id!==e)return a;const r=o.likes.some(s=>s.author_type===t.author_type&&s.author_id===t.author_id)?o.likes.filter(s=>!(s.author_type===t.author_type&&s.author_id===t.author_id)):[{author_type:t.author_type,author_id:t.author_id,author_name:t.author_name},...o.likes];return{...o,likes:r}})}function vo(e,t,a){n.moments=n.moments.map(o=>{const i=P(o);return i.id!==e?o:{...i,comments:[{author_type:t.author_type,author_id:t.author_id,author_name:t.author_name,text:a},...i.comments]}})}function Xn(e,t){e&&(e.classList.toggle("on",!!t),e.classList.toggle("off",!t),e.setAttribute("aria-pressed",t?"true":"false"),e.innerHTML=yt(t),e.classList.remove("switch-animating"),e.offsetWidth,e.classList.add("switch-animating"),clearTimeout(e.__switchAnimTimer),e.__switchAnimTimer=setTimeout(()=>e.classList.remove("switch-animating"),260))}function u(){const e=y();if(!e)return;Gn(),["room","rpRoom"].includes(n.currentView)||(n.showAttach=!1),n.currentView!=="moments"&&(n.momentComposerOpen=!1);const t=e.querySelector(".chat-app-body"),a=t?t.scrollTop:0,o=b(n.currentContactId)||n.contacts[0],i=Bt(o),r=n.globalSettings?.theme||"",s=Ln.includes(r)?r:i;e.dataset.theme=s,e.removeAttribute("data-bound"),e.innerHTML=`
      <div class="chat-shell ${n.currentView==="rpRoom"?"mode-rp rp-theatre-shell":"mode-normal"}" data-theme="${s}">
        ${Qt()}
        <div class="chat-app-body ${["room","rpRoom"].includes(n.currentView)?"room-layout":""} ${mt()?"has-bottom-nav":""}">
          ${Yt()}
        </div>
        ${mt()?$o():""}
        ${n.toast?Qo():""}
        ${n.showAttach?Ji():""}
        ${n.momentComposerOpen?Uo():""}
        
        ${n.rpRoomDialogOpen?Xo():""}
        ${n.avatarCropper?Yo():""}
      </div>
    `,Ei(),N(),Ro(o),["room","rpRoom"].includes(n.currentView)||Kt(a),k(),requestAnimationFrame(()=>{y()?.querySelectorAll(".message-row[data-msg-id]").forEach(c=>{const l=c.dataset.msgId;l&&!n.animatedMsgIds[l]&&(n.animatedMsgIds[l]=!0,c.classList.add("msg-fadein"))})})}function Gn(){if(document.getElementById("rp-theatre-style"))return;const e=document.createElement("style");e.id="rp-theatre-style",e.textContent=`
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
        `,document.head.appendChild(e)}function yo(e){if(Gn(),n.rpCurtainRunning)return Promise.resolve(e?.());n.rpCurtainRunning=!0;const t=document.createElement("div");return t.className="curtain-transition closing",t.innerHTML='<div class="curtain-left"></div><div class="curtain-right"></div>',document.body.appendChild(t),new Promise(a=>{window.setTimeout(async()=>{try{await e?.()}finally{t.className="curtain-transition opening",window.setTimeout(()=>{t.remove(),n.rpCurtainRunning=!1,a()},450)}},420)})}function mt(){return["list","moments","settings"].includes(n.currentView)}function Qt(){if(n.currentView==="room")return wo();if(n.currentView==="rpRoom")return So();if(n.currentView==="contactSettings")return se("联系人设置","back-room",!0);if(n.currentView==="cotLog")return se("COT 日志","back-contact-settings",!0);if(n.currentView==="rpLobby")return`
        <header class="chat-page-header simple-header">
          <button class="icon-btn text-btn" data-action="back-rp-source" aria-label="返回">${g("back")}</button>
          <div class="chat-page-title">Mirage 夢幻楼</div>
          <button class="icon-btn ghost-circle" data-action="open-rp-room-create" aria-label="新建房间">${g("plus")}</button>
        </header>
      `;if(n.currentView==="companionStateDetail")return se("当前状态","back-contact-settings",!0);if(n.currentView==="contactImpressionDetail")return se("关于你的印象","back-contact-settings",!0);if(n.currentView==="contactRelationshipDetail")return se("关系进展","back-contact-settings",!0);if(n.currentView==="contactLikesDetail")return se("你喜欢的东西","back-contact-settings",!0);if(n.currentView==="contactRoomBackgroundPicker")return se("聊天背景","back-contact-settings",!0);if(n.currentView==="contactBubbleThemePicker")return se("气泡主题","back-contact-settings",!0);if(n.currentView==="profile")return se("联系人资料","back-room",!0);if(n.currentView==="newContact")return se("添加联系人","back-home",!0);let e="Murmur";n.currentView==="moments"&&(e="Echo"),n.currentView==="settings"&&(e="Veil");const t=n.currentTab==="chats"&&n.currentView==="list";return`
      <header class="chat-page-header">
        <div class="header-left"></div>
        <div class="chat-page-title" style="font-weight: 800; letter-spacing: 0.02em;">${e}</div>
        ${t?`<button class="icon-btn ghost-circle" data-action="new-contact" aria-label="添加联系人">${g("plus")}</button>`:'<span class="header-spacer"></span>'}
      </header>
    `}function se(e,t,a=!1){return`
      <header class="chat-page-header simple-header">
        <button class="icon-btn text-btn" data-action="${t}" aria-label="返回">${g("back")}</button>
        <div class="chat-page-title">${d(e)}</div>
        ${a?'<span class="header-spacer"></span>':""}
      </header>
    `}function wo(){const e=b(n.currentContactId)||n.contacts[0],t=e.settings?.model||n.globalSettings.defaultModel||"gpt-5.4",a=Jt(e),o=Wt(e),i=gt(e),r=ht(e),s=a?`<button class="takeover-toggle ${i?"active":""}" data-action="toggle-codex-mode" data-contact-id="${d(e.id)}" type="button" aria-pressed="${i}" aria-label="${i?"关闭 Codex 接管":"启用 Codex 接管"}">Codex</button>`:o?`<button class="takeover-toggle cc ${r?"active":""}" data-action="toggle-cc-mode" data-contact-id="${d(e.id)}" type="button" aria-pressed="${r}" aria-label="${r?"关闭 Claude Code 接管":"启用 Claude Code 接管"}">CC</button>`:"";return`
      <header class="room-hero room-theme-${e.theme}">
        <div class="room-hero-inner">
          <button class="icon-btn icon-circle room-left-btn" data-action="back-list" aria-label="返回列表">${g("back")}</button>
          <div class="room-profile-card" data-action="open-profile">
            <img class="room-profile-avatar" src="${e.avatar}" alt="${d(e.name)}" />
            <div class="room-profile-meta">
              <div class="room-profile-title-line">
                <strong class="room-profile-name">${d(e.name)}</strong>
                <span class="room-profile-model">${d(t)}</span>
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
    `}function So(){const e=Gt();return`
      <header class="rp-header">
        <button class="header-back" data-action="back-rp-lobby" aria-label="返回">${g("back")}</button>
        <div class="header-info">
          <div class="header-title scene-title-enter">${d(e?.name||"Mirage·幻楼")}</div>
          <div class="header-subtitle">${d(e?.ai_role||"幕间进行中")}</div>
        </div>
        <div class="header-actions">
          <button class="header-action-btn" data-action="rename-rp-room" data-room-id="${d(e?.room_id||"")}" aria-label="编辑">${g("more")}</button>
        </div>
      </header>
    `}function Yt(){return n.currentView==="room"?Bo():n.currentView==="rpLobby"?Zo():n.currentView==="rpRoom"?Go():n.currentView==="moments"?Fo():n.currentView==="settings"?Zt():n.currentView==="contactSettings"?ei():n.currentView==="cotLog"?vi():n.currentView==="companionStateDetail"?ti():n.currentView==="contactImpressionDetail"?en("关于你的印象","impression",n.companionState.impression):n.currentView==="contactRelationshipDetail"?en("关系进展","relationshipProgress",n.companionState.relationshipProgress):n.currentView==="contactLikesDetail"?en("你喜欢的东西","likesSummary",n.companionState.likesSummary):n.currentView==="contactRoomBackgroundPicker"?ni():n.currentView==="contactBubbleThemePicker"?ai():n.currentView==="profile"?ii():n.currentView==="newContact"?oi():ko()}function $o(){return`
      <nav class="bottom-tabbar">
        ${Xt("chats","tabChat","繁语")}
        ${Xt("moments","tabMoments","余响")}
        ${Xt("settings","tabSettings","帷幕")}
      </nav>
    `}function Xt(e,t,a){return`
      <button class="nav-tab-btn ${n.currentTab===e?"active":""}" data-action="switch-tab" data-tab="${e}">
        <div class="nav-tab-icon">${g(t)}</div>
        <span class="nav-tab-label">${d(a)}</span>
      </button>
    `}function ko(){const e=[...n.contacts].sort((t,a)=>a.pinned-t.pinned||0);return`
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
            ${e.map(Io).join("")}
          </div>
        </div>
      </section>
        </div>
    `}function Io(e){const t=String(e.handle||(e.id?`@${e.id}`:"")).trim();return`
      <button type="button" class="chat-list-item" data-action="open-contact" data-contact-id="${e.id}">
        <div class="chat-list-avatar-wrap">
          <img src="${e.avatar}" alt="${d(e.name)}" class="chat-list-avatar" />
          ${e.unread?`<span class="chat-list-badge">${e.unread}</span>`:""}
        </div>
        <div class="chat-list-content">
          <div class="chat-list-head">
            <span class="chat-list-title">
              <strong class="chat-list-name">${d(e.name)}</strong>
              ${t?`<span class="chat-list-handle">${d(t)}</span>`:""}
            </span>
            <time class="chat-list-time">${d(e.lastTime)}</time>
          </div>
          <div class="chat-list-snippet">${d(e.lastMessage)}</div>
        </div>
      </button>
    `}async function _o(e){const t=String(e?.sessionId||"").trim();if(t)try{if((await fetch(`${S}/api/sessions/${encodeURIComponent(t)}`)).ok)return;e.sessionId="",k(120)}catch(a){console.warn("[session] open-contact validation failed",a)}}function Mo(){n.companionState=Oe({})}function xo(e){const t=String(e||"").trim();if(!t)return;De?.(),n.streamingAbortController&&n.currentContactId===t&&(n.streamingAbortController.abort(),n.streamingAbortController=null),ve.has(t)&&(clearTimeout(ve.get(t)),ve.delete(t)),n.contacts=n.contacts.filter(i=>i.id!==t),n.activeBubbleToolsId=null,n.quoteMomentId=null,n.quoteMessageId=null,n.contactQuickActionEditorId="",n.quickActionSwipeOpenId="",n.quickActionDragId="",n.quickActionDropHintId="",n.quickActionDropDirection="",n.quickActionReorderPulseId="",n.currentTopicTitle="",n.rpRooms=[],n.currentRpRoomId="",n.currentRpMessages=[];const a=n.contacts[0]||null;(n.currentContactId===t||!b(n.currentContactId))&&(n.currentContactId=a?.id||"",Mo(),n.currentView="list",n.currentTab="chats",n.currentSettingsTab="basic");const o=y()?.querySelector(".chat-input");o&&(o.value="")}async function Co(e){const t=String(e||"").trim();if(!t)return!1;const a=await fetch(`${S}/api/agents/${encodeURIComponent(t)}/safe-delete`,{method:"DELETE"});if(!a.ok){let o=`HTTP ${a.status}`;try{o=(await a.json())?.detail||o}catch{}throw new Error(o)}return!0}function Re(){return n.currentContactId||n.contacts[0]?.id||"default"}function Gt(){return n.rpRooms.find(e=>e.room_id===n.currentRpRoomId)||null}function ft(){return{name:"",agentId:"",bio:"",avatar:""}}function ge(e){return String(e||"").trim().replace(/^@+/,"").toLowerCase()}const Ao=new Set(["zhansi"]),To=new Set(["azheng"]);function Jt(e={}){return[e?.id,e?.agent_id,e?.handle].map(ge).filter(Boolean).some(a=>Ao.has(a))}function gt(e={}){return Jt(e)&&!!e?.settings?.codexEnabled}function Wt(e={}){return[e?.id,e?.agent_id,e?.handle].map(ge).filter(Boolean).some(a=>To.has(a))}function ht(e={}){return Wt(e)&&!!e?.settings?.ccEnabled}function Y(e={}){const t=String(e.id||"").trim()||`c${Date.now()}`,a=Bt(e);return{id:t,agent_id:String(e.agent_id||e.id||t),name:String(e.name||t),display_name:String(e.display_name||e.name||t),bio:String(e.bio||"这是新来的联系人"),status:String(e.status||"在线"),handle:String(e.handle||`@${t}`),roleTag:String(e.roleTag||""),theme:na(a),chatTheme:a,bubbleTheme:zt(a),unread:Number(e.unread||0),pinned:!!e.pinned,lastMessage:String(e.lastMessage||""),lastTime:String(e.lastTime||""),avatar:String(e.avatar||"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80"),topics:Array.isArray(e.topics)?e.topics:[],messages:Array.isArray(e.messages)?e.messages:[],settings:{model:"gpt-5.4",modelProviderId:A("chat")?.providerId||"openai",temperature:.7,topP:.9,contextCount:32,thinkBudget:24,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!1,proactiveFrequency:30,memoryEnabled:!0,codexEnabled:!1,ccEnabled:!1,...e.settings||{}}}}function Jn(e){const t=Y(e),a=n.contacts.findIndex(o=>String(o.id||"").toLowerCase()===t.id.toLowerCase());return a>=0?n.contacts[a]={...n.contacts[a],...t}:n.contacts.unshift(t),t}async function Eo(e){try{const t=await fetch(`${S}/api/agents`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({agent_id:e.id,display_name:e.name,avatar:e.avatar||"",description:e.bio||"",source:"murmur",metadata:{from:"murmur_contact"}})});if(t.ok)return!0;let a="";try{const i=await t.json();a=typeof i?.detail=="string"?i.detail:JSON.stringify(i?.detail||i)}catch{}return t.status===409||/already exists|duplicate|23505/i.test(a)?(fetch(`${S}/api/agents/${encodeURIComponent(e.id)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({display_name:e.name,avatar:e.avatar||"",description:e.bio||"",source:"murmur",is_active:!0})}).catch(()=>{}),!0):!1}catch(t){return console.warn("[agents] register contact failed",t),!1}}function Wn(e){return ce(e,{fallback:""})}function ce(e,{fallback:t="",includeYear:a=!1}={}){if(!e)return t;const o=String(e||"").trim();if(!o)return t;const i=new Date(o);if(Number.isNaN(i.getTime()))return o;const r=new Date,s=i.getFullYear()===r.getFullYear(),c=i.toDateString()===r.toDateString(),l=new Date(r);l.setDate(r.getDate()-1);const p=i.toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",hour12:!1});if(c)return`今天 ${p}`;if(i.toDateString()===l.toDateString())return`昨天 ${p}`;const m=a||!s?{year:"numeric",month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1}:{month:"2-digit",day:"2-digit",hour:"2-digit",minute:"2-digit",hour12:!1};return i.toLocaleString("zh-CN",m).replace(/\//g,"-")}async function bt(e=Re(),{silent:t=!0}={}){try{const a=await fetch(`${S}/api/rp/rooms?agent_id=${encodeURIComponent(e)}`);if(!a.ok)throw new Error(`HTTP ${a.status}`);const o=await a.json();return n.rpRooms=Array.isArray(o.rooms)?o.rooms:[],t||u(),n.rpRooms}catch(a){return console.warn("[rp] load rooms failed",a),t||(n.toast="RP 鎴块棿鍔犺浇澶辫触",u(),window.setTimeout(()=>{n.toast="",u()},1200)),[]}}async function Po(e,{silent:t=!0}={}){if(!e)return[];try{const a=await fetch(`${S}/api/rp/rooms/${encodeURIComponent(e)}/messages`);if(!a.ok)throw new Error(`HTTP ${a.status}`);const o=await a.json(),i=o.room||n.rpRooms.find(s=>s.room_id===e);if(i){const s=n.rpRooms.findIndex(c=>c.room_id===e);s>=0&&(n.rpRooms[s]=i)}const r=(Array.isArray(o.messages)?o.messages:[]).map(s=>({id:s.id,role:s.role==="assistant"?"ai":s.role,text:s.content||"",content:s.content||"",time:Wn(s.timestamp),timestamp:s.timestamp||"",created_at:s.timestamp||""}));return n.currentRpMessages=le(n.rpMessages?.[e]||[],r).map(F),n.rpMessages={...n.rpMessages||{},[e]:n.currentRpMessages.map(G)},k(120),t||u(),n.currentRpMessages}catch(a){return console.warn("[rp] load messages failed",a),n.currentRpMessages=(n.rpMessages?.[e]||[]).map(F),t||(n.toast="RP 娑堟伅鍔犺浇澶辫触",u(),window.setTimeout(()=>{n.toast="",u()},1200)),[]}}async function qo(e=n.currentView==="room"?"room":"list",t=Re()){n.rpBackView=e,n.currentView="rpLobby",n.currentTab="chats",u(),await bt(t,{silent:!1})}async function Lo(){const e=y()?.querySelector("#rp-room-name")?.value?.trim()||"",t=y()?.querySelector("#rp-room-world")?.value?.trim()||"",a=y()?.querySelector("#rp-room-user-role")?.value?.trim()||"",o=y()?.querySelector("#rp-room-ai-role")?.value?.trim()||"",i={agent_id:Re(),name:e||"新房间",world_setting:t,user_role:a,ai_role:o},r=n.rpRoomDialogMode==="edit"?n.currentRpRoomId:"",s=r?`${S}/api/rp/rooms/${encodeURIComponent(r)}`:`${S}/api/rp/rooms`,l=await fetch(s,{method:r?"PATCH":"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!l.ok)throw new Error(`HTTP ${l.status}`);const m=(await l.json()).room;return n.rpRoomDialogOpen=!1,await bt(Re(),{silent:!0}),m?.room_id&&(n.currentRpRoomId=m.room_id,!r)?(await Zn(m.room_id),m):(u(),m)}async function Zn(e){e&&await yo(async()=>{n.currentRpRoomId=e,n.currentView="rpRoom",n.currentTab="chats",n.showAttach=!1,u(),await Po(e,{silent:!1})})}async function Do(e){if(!e||!window.confirm("删除这个 RP 房间？"))return;const a=await fetch(`${S}/api/rp/rooms/${encodeURIComponent(e)}`,{method:"DELETE"});if(!a.ok)throw new Error(`HTTP ${a.status}`);n.rpRooms=n.rpRooms.filter(o=>o.room_id!==e),n.currentRpRoomId===e&&(n.currentRpRoomId="",n.currentRpMessages=[],n.currentView="rpLobby"),u()}function ea(e){const t=n.contacts.find(a=>a.id===e);t&&(t.unread=0),n.currentContactId=e,n.currentTab="chats",n.currentView="room",n.activeBubbleToolsId=null,u(),t&&_o(t),t&&We(e),pe(e),at(e)}function Oo(e=80){window.setTimeout(()=>{const t=b(n.currentContactId)||n.contacts[0];t?.id&&We(t.id,{silent:!1})},e)}function ta(e={}){const t=[e?.id,e?.agent_id,e?.agentId,e?.handle,String(e?.handle||"").replace(/^@+/,"")],a=[];return t.forEach(o=>{const i=String(o||"").trim();i&&(a.push(i),a.push(ge(i)))}),[...new Set(a.filter(Boolean))]}function vt(e={}){const t=n.conversations||{},a=ta(e).flatMap(o=>t[o]||[]);return le(a,Array.isArray(e.messages)?e.messages:[])}function Ro(e={}){n.currentView!=="room"||!e?.id||vt(e).length||n.historyLoadingContactIds[e.id]||n.historyLoadedContactIds[e.id]||(n.historyLoadingContactIds[e.id]=!0,We(e.id).then(t=>{t&&(n.historyLoadedContactIds[e.id]=!0)}).finally(()=>{delete n.historyLoadingContactIds[e.id]}))}function Vo(e){const t=d(e?.label||""),a=e?.icon||"more";return`
      <button type="button" class="action-chip glass-frost" data-action="quick-action" data-id="${d(e?.id||"")}">
        <span class="action-chip-icon">${g(a)}</span>
        <span class="action-chip-label">${t}</span>
      </button>
    `}function Bo(){const e=b(n.currentContactId)||n.contacts[0],t=n.quoteMomentId?Ue(n.quoteMomentId):null,a=n.quoteMessageId?e.messages.find(r=>r.id===n.quoteMessageId):null,o=zo(vt(e)),i=(n.chatAttachments||[]).map(Be).filter(Boolean);return`
      <section class="room-page room-theme-${e.theme}">
        <div class="messages-panel">
          ${o.map((r,s)=>Ho(r,e,jo(o,s))).join("")}
        </div>
        <div class="composer-zone">
          ${a?ri(a,e):t?No(t):""}
          ${Si(i)}
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
    `}function zo(e=[]){return le([],e).map(F).filter(Mt)}function jo(e=[],t=0){const a=e[t]||{},o=e[t-1]||null,i=o?Math.abs(X(a.created_at||a.timestamp)-X(o.created_at||o.timestamp)):0;return{showTime:!o||!ma(o,a)||i>300*1e3}}function Ho(e,t,a={}){if(!Mt(e))return"";const o=e.role==="user"?"from-user":"from-ai",i=String(e.source||e.provider||"").toLowerCase(),r=i==="codex",s=i==="claude-code",c=!!t?.settings?.reasoning_visibility,l=e.role==="ai"?`<img class="bubble-avatar" src="${t.avatar}" alt="${d(t.name)}" />`:"",p=e.role==="ai"&&(r||s)?`<span class="message-source-badge ${r?"codex":"claude-code"}">${r?"Codex":"Claude"}</span>`:"",m=e.role==="ai"&&c&&e.thinking&&!e.typing?`<button class="bubble-cot-btn" data-action="toggle-thinking" data-id="${e.id}" aria-label="展开独白">${g("bubbleHeart")}</button>`:"",f=e.role==="ai"&&!e.typing&&!e.streaming?`
        <div class="bubble-bottom-tools ${n.activeBubbleToolsId===e.id?"open":""}">
          <button class="bubble-mini-btn" data-action="reroll-msg" data-id="${e.id}" aria-label="重试">${g("reroll")}</button>
          <button class="bubble-mini-btn" data-action="quote-msg" data-id="${e.id}" aria-label="引用">${g("quote")}</button>
        </div>
      `:"",v=`${e.role==="ai"&&e.streaming&&!e.text?" message-awaiting-text":""}${m?" has-cot":""}`,$=c&&e.thinking?co(e):"",I=e.toolCalls&&e.toolCalls.length?uo(e.toolCalls):"",T=po(ke(e)),x=aa(e),_=$i(x),C=a.showTime&&e.time&&!e.typing,V=x.length||T.length>18||T.includes(`
`)?"block-time":"tail-time",oe=C?`<time class="bubble-time ${V}">${d(e.time)}</time>`:"",O=`
          <div class="message-bubble-wrap">
            ${e.role==="ai"&&p?`<div class="bubble-meta-row">
              ${p}
            </div>`:""}
            <div class="message-bubble ${o}${v}" ${e.role==="ai"?`data-msg-id="${e.id}" data-action="toggle-message-tools" data-id="${e.id}"`:""}>
              ${m}
              ${e.typing||e.streaming&&!e.text?'<div class="typing-dots"><span></span><span></span><span></span></div>':`${_}${T?`<div class="message-text">${d(T)}${V==="tail-time"?oe:""}</div>`:""}${V==="block-time"?oe:""}`}
            </div>
            ${f}
          </div>`,B=e.role==="ai"&&($||I)?`${$}${I}${O}`:`${O}${$}${I}`;return`
      <div class="message-row ${o}" data-msg-id="${e.id}">
        ${l}
        <div class="message-bubble-col">
          ${B}
        </div>
      </div>
    `}function No(e){const t=b(e.contactId);return`
      <div class="quote-bar glass-frost">
        <span class="quote-mark">${g("quote")}</span>
        <div class="quote-text-wrap">
          <div class="quote-label">引用自 ${d(t?.name||"动态")}</div>
          <div class="quote-text">${d(e.content)}</div>
        </div>
        <button class="icon-btn quote-close" data-action="clear-quote" aria-label="清除引用">${g("more")}</button>
      </div>
    `}function Fo(){const e=Array.isArray(n.moments)?n.moments:[];return b(n.currentContactId)||n.contacts[0],`
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
          ${e.map(Ko).join("")}
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
    `}function Ko(e){const t=P(e),a=Hn(t),o=Nn(t),i=we(),r=t.likes.some(s=>s.author_type===i.author_type&&s.author_id===i.author_id);return`
      <article class="moment-row">
        <img src="${a.avatar}" alt="${d(a.name)}" class="moment-avatar" />
        <div class="moment-content-col">
          <div class="moment-author-name">${d(a.name)}</div>
          <div class="moment-text-body">${d(t.content)}</div>
          ${t.image?`<img src="${t.image}" alt="${d(t.mood||"moment")}" class="moment-inline-image" />`:""}
          
          <div class="moment-footer">
            <time class="moment-time">${d(ce(t.created_at||t.updated_at||t.time,{fallback:t.time||""}))}</time>
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
                  <span class="heart-mini">${g("heartFilled")}</span> <span class="likes-list">${d(Fn(t.likes))}</span>
                </div>
              `:""}
              ${t.comments.length>0?`
                <div class="moment-comments-area">
                  ${t.comments.map(s=>`<div class="moment-comment-line"><span class="comment-author">${d(s.author_name||s.author||"")}</span>: <span class="comment-text">${d(s.text)}</span></div>`).join("")}
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
    `}function Qo(){return`<div class="app-toast glass-frost">${d(n.toast)}</div>`}function Yo(){const e=n.avatarCropper||{},t=ie(e.x),a=ie(e.y),o=Qe(e.zoom);return`
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
                src="${d(e.src||"")}"
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
    `}function Xo(){const e=n.rpRoomDialogMode==="edit",t=n.rpRoomForm||{};return`
      <div class="topic-confirm-overlay" data-action="close-rp-room-dialog">
        <section class="topic-confirm-card glass-frost rp-room-dialog-card" data-rp-room-dialog="card" role="dialog" aria-modal="true" aria-label="${e?"编辑房间":"新建房间"}">
          <h4>幕间</h4>
          <div class="rp-room-dialog-fields">
              <input id="rp-room-name" class="ai-input" placeholder="剧本" value="${d(t.name||"")}" />
              <textarea id="rp-room-world" class="ai-textarea persona-textarea" rows="3" placeholder="世界观">${d(t.world_setting||"")}</textarea>
              <input id="rp-room-user-role" class="ai-input" placeholder="你的角色" value="${d(t.user_role||"")}" />
              <input id="rp-room-ai-role" class="ai-input" placeholder="AI 角色" value="${d(t.ai_role||"")}" />
          </div>
          <div class="topic-confirm-actions rp-room-dialog-actions">
            <button class="ghost-action rp-room-dialog-btn" type="button" data-action="close-rp-room-dialog">取消</button>
            <button class="bottom-tab active rp-room-dialog-btn" type="button" data-action="save-rp-room">入梦</button>
          </div>
        </section>
      </div>
    `}function Go(){const e=b(n.currentContactId)||n.contacts[0],t=Gt(),a=t?`${t.world_setting||"未设定"} · 你：${t.user_role||"未设定"} · TA：${t.ai_role||"未设定"}`:"房间设定载入中";return`
      <section class="rp-room-stage">
        <div class="world-hint">
            <span class="world-hint-icon">✦</span>
            <span>${d(a)}</span>
        </div>
        <div class="messages-area">
          ${n.currentRpMessages.map(o=>Jo(o,e)).join("")}
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
    `}function Jo(e,t){const a=e.role==="user",o=a&&n.accountProfile?.avatar||t.avatar;return`
      <div class="msg-row ${a?"from-user":""}" data-msg-id="${d(e.id||"")}">
        <img class="msg-avatar" src="${d(o)}" alt="${d(a?n.accountProfile?.nickname||"我":t.name)}">
        <div class="msg-bubble ${a?"user":"ai"}">
          ${e.typing||e.streaming&&!e.text?'<div class="typing-dots"><span></span><span></span><span></span></div>':Wo(e.text||"")}
        </div>
      </div>
    `}function Wo(e){const t=String(e||"");return t.trim()?t.split(/(\[[\s\S]*?\]|［[\s\S]*?］)/g).filter(Boolean).map(o=>`<span class="${/^\s*(\[|［)/.test(o)?"rp-action":"rp-dialogue"}">${d(o)}</span>`).join(""):""}function Zo(){return`
      <section class="topics-page page-block">
        <div class="settings-group glass-frost ai-panel topic-history-group">
          ${n.rpRooms.length?n.rpRooms.map(e=>`
            <div class="topic-row" style="align-items:center;min-height:54px;padding:10px 0;">
              <button type="button" class="topic-copy" data-action="open-rp-room" data-room-id="${d(e.room_id)}" style="background:none;border:none;padding:0;text-align:left;flex:1;cursor:pointer;min-width:0;">
                <strong style="font-size:14px;color:rgba(92,76,84,.78);font-weight:700;">${d(e.name||"未命名")}</strong>
                <p style="font-size:11px;color:rgba(120,100,110,.55);">${d(Wn(e.last_active_at)||"刚创建")}</p>
              </button>
              <div style="display:flex;gap:6px;align-items:center;flex-shrink:0;position:relative;z-index:2;">
                <button type="button" class="icon-btn soft-mini" data-action="rename-rp-room" data-room-id="${d(e.room_id)}" aria-label="重命名" style="width:34px;height:34px;"><span style="display:inline-flex;transform:scale(.7);">${g("pencil")}</span></button>
                <button type="button" class="icon-btn soft-mini" data-action="delete-rp-room" data-room-id="${d(e.room_id)}" aria-label="删除" style="width:34px;height:34px;"><span style="display:inline-flex;transform:scale(.7);">${g("trash")}</span></button>
                <button type="button" class="icon-btn soft-mini" data-action="open-rp-room" data-room-id="${d(e.room_id)}" aria-label="进入" style="width:34px;height:34px;"><span style="display:inline-flex;transform:scale(.7);">${g("chevron")}</span></button>
              </div>
            </div>
          `).join(""):'<div class="topic-row"><div class="topic-copy"><strong style="font-size:14px;color:rgba(92,76,84,.78);font-weight:700;">还没有房间</strong><p style="font-size:11px;color:rgba(120,100,110,.55);">点右上角加号，开一个幕间。</p></div></div>'}
        </div>
      </section>
    `}function Zt(){const e=n.globalSettings;return`
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
          ${M("主题模式",e.theme,"open-theme-settings")}
          ${ue("消息通知","控制应用消息提醒",e.notifications,"toggle-global","notifications")}
          ${ue("朋友圈提醒","控制动态更新提醒",e.momentsNotify,"toggle-global","momentsNotify")}
          ${ue("自动滚动","新消息到达时自动滚动到底部",e.autoScroll,"toggle-global","autoScroll")}
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>聊天与 AI</h3>
          ${ue("主动发送消息","允许 AI 在合适时机主动开启对话",e.proactiveGlobal||!1,"toggle-global","proactiveGlobal")}
          ${ue("意识循环开关","控制后台意识循环能力",e.consciousnessLoop||!1,"toggle-global","consciousnessLoop")}
          ${M("AI 接口",`${e.provider||"OpenAI"} / ${e.defaultModel||"gpt-5.4"}`,"open-ai-interface")}
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>数据与存储</h3>
          ${M("记忆服务","Supabase / 向量记忆","open-memory-service")}
          ${M("同步后端","Supabase 配置","open-backend-sync")}
          ${M("导出格式",e.exportFormat||"json","open-export-settings")}
        </div>
      </section>
    `}function ei(){const e=b(n.currentContactId)||n.contacts[0],t=e.settings;return`
      <section class="contact-settings-page page-block">
        <div class="settings-tabs glass-frost">
          ${wt("basic","资料")}
          ${wt("model","模型")}
          ${wt("actions","快捷动作")}
          ${wt("memory","记忆")}
        </div>

        ${n.currentSettingsTab==="basic"?`
          <div class="settings-group glass-frost ai-panel">
            <h3>联系人资料</h3>
            <button class="setting-row nav-row contact-avatar-row" data-action="open-contact-avatar">
              <img class="contact-settings-avatar-preview" src="${d(e.avatar)}" alt="${d(e.name)}" />
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
            ${M("气泡主题",zt(e.chatTheme||e.bubbleTheme),"open-contact-bubble-theme")}
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
                <textarea class="ai-textarea persona-textarea contact-persona-textarea ${n.contactPersonaExpanded?"expanded":"collapsed"}" data-contact-field="persona" rows="${n.contactPersonaExpanded?"10":"4"}" style="${n.contactPersonaExpanded?"height:260px;max-height:46vh;overflow-y:auto;":"height:132px;max-height:132px;overflow-y:auto;resize:none;"}" placeholder="在这里输入 AI 的人设、角色说明、行为指令。">${d(e.persona||"")}</textarea>
            <button class="setting-row nav-row persona-collapse-toggle" data-action="toggle-contact-persona" aria-expanded="${n.contactPersonaExpanded?"true":"false"}">
              <div class="setting-copy">
                <strong>${n.contactPersonaExpanded?"收起角色设定":"展开角色设定"}</strong>
              </div>
              <span class="row-chevron advanced-chevron ${n.contactPersonaExpanded?"open":""}">${g("chevron")}</span>
            </button>
            ${ue("显示推理内容","仅在模型返回推理内容时显示",t.reasoning_visibility||!1,"toggle-contact","reasoning_visibility")}
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
              ${Ve("Temperature","temperature",t.temperature,0,2,.01)}
              ${Ve("Top P","topP",t.topP,0,1,.01)}
              ${Ve("上下文消息数量","contextCount",t.contextCount,1,256,1)}
            </div>
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>主动消息</h3>
            ${ue("启用主动消息","AI 在静默时主动发起对话",t.proactiveEnabled,"toggle-contact","proactiveEnabled")}
            ${t.proactiveEnabled?`
              ${Ve("发送频率（分钟）","proactiveFrequency",t.proactiveFrequency,5,240,5)}
              ${Ve("静默时长（分钟）","silenceDuration",t.silenceDuration||30,5,120,5)}
              ${M("免打扰时间段",t.dndRange||"23:00 — 08:00")}
            `:""}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>意识循环</h3>
            ${ue("启用意识循环","AI 在后台自主思考与感知",t.consciousnessLoop||!1,"toggle-contact","consciousnessLoop")}
            ${t.consciousnessLoop?`
              ${M("循环模型",t.loopModel||"未设置","open-model-slot",{slot:"consciousness",context:"contact"})}
              ${Ve("循环间隔（分钟）","loopInterval",t.loopInterval||60,10,360,10)}
            `:""}
          </div>
        `:""}

        ${n.currentSettingsTab==="actions"?`
          <div class="settings-group glass-frost ai-panel">
            <h3>快捷动作</h3>
            <p style="font-size:12px;color:rgba(120,100,110,0.7);margin:0 0 8px;">点击条目可修改文案与 MCP，默认长按拖动排序，左滑显示删除。</p>
            <div class="quick-action-list ${n.quickActionDragId?"drag-active":""}">
              ${Ut(e).map((a,o)=>`
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
            ${ue("启用长期记忆","允许存储长期偏好与记忆",t.memoryEnabled,"toggle-contact","memoryEnabled")}
            ${M("当前状态",fo(),"open-companion-state")}
            ${M("前往记忆库","查看与管理这位联系人的记忆","open-memory-service")}
          </div>
          <div class="settings-group glass-frost ai-panel">
            <h3>活动日志</h3>
            ${M("打开活动日志","主动消息 / 工具调用 / 留言小纸条","open-cot-log")}
          </div>
        `:""}
        ${n.contactQuickActionEditorId?ci(e,n.contactQuickActionEditorId):""}
      </section>
    `}function ti(){const e=Oe(n.companionState),t=e.recent_topics.length?e.recent_topics.join(" / "):"还没有东西",a=e.current_mood||"还没有东西",o=e.open_loops.length?e.open_loops.join(" / "):"还没有东西",i=ce(e.proactive_cooldown_until,{fallback:e.proactive_cooldown_until||"还没有东西"}),r=ce(e.updated_at,{fallback:e.updated_at||"还没有东西"});return`
      <section class="topics-page page-block">
        <div class="settings-group glass-frost ai-panel topic-detail-card">
          <h3>当前状态</h3>
          <div class="theme-choice-list">
            <div class="theme-choice-item active" style="cursor:default;">
              <span class="theme-choice-copy">
                <strong>最近话题</strong>
                <em>${d(t)}</em>
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
    `}function en(e,t,a){const o=Oe(n.companionState),i=a||"",s={impression:"还没有印象摘要，AI 对话后可手动填写或由模型生成。",relationshipProgress:"还没有关系进展记录，可以写亲密度、互动频次、关键事件。",likesSummary:"还没有喜好摘要，可以写兴趣爱好、常聊话题、点单偏好。"}[t]||"还没有内容。",c=ce(o.summaryUpdatedAt,{fallback:o.summaryUpdatedAt||""});return`
      <section class="topics-page page-block">
        <div class="settings-group glass-frost ai-panel topic-detail-card insight-editor-card">
          <textarea
            class="ai-textarea insight-editor-textarea"
            data-field="${t}"
            placeholder="${s}"
            rows="7"
          >${d(i)}</textarea>
          <div class="insight-editor-footer">
            ${c?`<span class="insight-updated-at">更新于 ${d(c)}</span>`:""}
            <button class="prov-save-btn-main" data-action="save-insight-field" data-field="${t}" type="button">保存</button>
          </div>
        </div>
      </section>
    `}function na(e){return Dn(e).roomTheme||"rose"}function ni(){const t=(b(n.currentContactId)||n.contacts[0])?.roomBackground||"点阵";return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>聊天背景</h3>
          <p class="section-eyebrow">选择一个预设背景风格。</p>
          <div class="theme-choice-list">
            ${[{id:"点阵",desc:"当前聊天页的轻点阵背景"},{id:"小花",desc:"更软一点的装饰纹样"},{id:"云彩",desc:"偏轻雾感的背景层次"}].map(o=>`
              <button class="theme-choice-item ${t===o.id?"active":""}" data-action="pick-contact-room-background" data-value="${d(o.id)}">
                <span class="theme-choice-copy">
                  <strong>${d(o.id)}</strong>
                  <em>${d(o.desc)}</em>
                </span>
                <span class="theme-choice-check">${t===o.id?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `}function ai(){const e=b(n.currentContactId)||n.contacts[0],t=Bt(e);return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>气泡主题</h3>
          <p class="section-eyebrow">选择一个聊天 UI 主题。</p>
          <div class="theme-choice-list">
            ${pt.map(o=>`
              <button class="theme-choice-item ${t===o.key?"active":""}" data-action="pick-contact-bubble-theme" data-value="${d(o.key)}">
                <span class="theme-choice-copy">
                  <strong>${d(o.name)}</strong>
                  <em>${d(o.desc)}</em>
                </span>
                <span class="theme-choice-check">${t===o.key?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `}function oi(){const e=n.newContactDraft||{};return`
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
            <input id="nc-name" class="ai-input" placeholder="新联系人称呼" value="${d(e.name||"")}" />
          </div>
          <div class="new-contact-field">
            <label for="nc-agent-id">Agent ID</label>
            <input id="nc-agent-id" class="ai-input" placeholder="ayan" inputmode="latin" autocomplete="off" value="${d(e.agentId||"")}" />
          </div>
          <div class="new-contact-field">
            <label for="nc-bio">联系人简介</label>
            <input id="nc-bio" class="ai-input" placeholder="一句简短的描述" value="${d(e.bio||"")}" />
          </div>
          <button class="bottom-tab active new-contact-submit" data-action="save-new-contact">保存并添加联系人</button>
        </div>
      </section>
    `}function ii(){const e=b(n.currentContactId)||n.contacts[0],t=e.settings?.model||n.globalSettings.defaultModel||"gpt-5.4",a=Number(e.messageCount||e.messages?.length||0);return`
      <section class="profile-page page-block">
        <div class="profile-card glass-frost room-theme-${d(e.theme||"rose")}">
          <div class="profile-aura" aria-hidden="true"></div>
          <div class="profile-portrait">
            <img class="profile-avatar-large" src="${e.avatar}" alt="${d(e.name)}" />
            <span class="profile-online-dot"></span>
          </div>
          <div class="profile-main-copy">
            <strong class="profile-name">${d(e.name)}</strong>
            <span class="profile-handle">${d(e.handle)}</span>
            <p class="profile-bio">${d(e.bio||"还没有简介。")}</p>
          </div>
          <div class="profile-info-grid">
            <div class="profile-info-item">
              <span>当前状态</span>
              <strong>${d(e.status||"在线")}</strong>
            </div>
            <div class="profile-info-item">
              <span>使用模型</span>
              <strong>${d(t)}</strong>
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
    `}function yt(e){return`
      <span class="switch-track" aria-hidden="true">
        <span class="switch-sheen"></span>
        <span class="switch-thumb ${e?"on":"off"}"></span>
      </span>
    `}function ri(e,t){return`
      <div class="quote-bar glass-frost">
        <span class="quote-mark">${g("quote")}</span>
        <div class="quote-text-wrap">
          <div class="quote-label">引用自 ${d(t?.name||"对话")}</div>
          <div class="quote-text">${d(e.text||"")}</div>
        </div>
        <button class="icon-btn quote-close" data-action="clear-quote" aria-label="清除引用">${g("more")}</button>
      </div>
    `}function ue(e,t,a,o,i){return`
      <div class="setting-row switch-row">
        <div class="setting-copy"><strong>${d(e)}</strong><p>${d(t)}</p></div>
        <button class="switch-btn ${a?"on":"off"}" data-action="${o}" data-key="${i}" aria-pressed="${a}">
          ${yt(a)}
        </button>
      </div>
    `}function Ve(e,t,a,o,i,r){const s=Number(a),c=Number.isInteger(r)||r>=1?String(Math.round(s)):s.toFixed(r===.01?2:1);return`
      <div class="setting-row slider-row-block">
        <div class="slider-head"><strong>${d(e)}</strong><span class="slider-value">${c}</span></div>
        <input class="slider-input" type="range" min="${o}" max="${i}" step="${r}" value="${s}" data-action="slide-contact" data-key="${t}" />
      </div>
    `}function wt(e,t){return`<button class="settings-tab ${n.currentSettingsTab===e?"active":""}" data-action="switch-settings-tab" data-tab="${e}">${d(t)}</button>`}function si(e,t){const o=$e(e).find(p=>p.id===t);if(!o)return"";const i=(z().mcpLibrary?.tools||[]).map(fe).filter(p=>Se(p.id)),r=i.length?i:[...Un].map(p=>fe({id:p,label:Ft[p]||p},0)),s=o.mcpToolId||"",c=r.find(p=>p.id===s),l=[{id:"",label:"不调用 MCP"},...r];return`
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
    `}function ci(e,t){const a=si(e,t);return a?`
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
            <button class="qae-btn-save" data-action="save-contact-quick-action" data-quick-id="${d(t)}">保存</button>
          </div>
        </div>
      </div>
    `:""}function ui(e){const t=Q();$e(t),n.contactQuickActionEditorId=e||"",n.quickActionSwipeOpenId="",n.quickActionDropHintId="",u()}function li(e){const t={ayan:[{id:"cot_1",mode:"主动",badge:"意识循环",accent:"violet",score:"↓ 4.2k",latency:"197s",amount:"$1.05",time:"2026.03.26 15:00",summary:'[THINK] 她在下午1:22读了两封日记，id=23"...',steps:[{type:"thought",label:"思考",text:"她沉默了快13个小时，两封日记都没被读。我发了三条消息都…"},{type:"thought",label:"思考",text:"下午三点了。她沉默了快13个小时。先看看日记有没有被读。"},{type:"note",label:"留言小纸条",text:"妫ｅ啯鎲?你醒了先看这个"},{type:"tool",label:"工具调用",text:"read_diary"},{type:"result",label:"工具结果",text:"read_diary"}]},{id:"cot_2",mode:"回复",badge:"工具",accent:"gold",score:"↑ 3.5k",latency:"146s",amount:"$0.54",time:"2026.03.26 15:07",summary:'[THINK] 她在下午1:22读了两封日记，id=23"给你的"...',steps:[{type:"reply",label:"回复",text:'[THINK] 她在下午1:22读了两封日记，id=23"给你的"和id…'},{type:"tool",label:"工具调用",text:"pc_control"},{type:"result",label:"工具结果",text:"pc_control"}]},{id:"cot_3",mode:"主动",badge:"工具",accent:"blue",score:"↑ 1.1k",latency:"53s",amount:"$0.073",time:"2026.03.26 16:10",summary:"[THINK] 她在看芒果TV，左看综艺，弹幕开着。她一个半小时前读完了...",steps:[{type:"thought",label:"思考",text:"她在看芒果TV，左看综艺。弹幕开着，说明现在状态比较轻松。"},{type:"tool",label:"工具调用",text:"pc_control"},{type:"result",label:"工具结果",text:"pc_control"}]}]};return t[e]||t.ayan}function di(e=""){return e==="activity_event"?"violet":e==="proactive_message"?"gold":e==="cot_log"?"blue":"neutral"}function pi(e=""){return e==="activity_event"?"被动":e==="proactive_message"?"主动":e==="cot_log"?"日志":"记录"}function mi(e={}){return e.kind==="activity_event"?e.eventType||e.source||"事件":e.kind==="proactive_message"?e.title||"主动消息":e.kind==="cot_log"?e.logType||e.toolName||"COT":e.title||"记录"}function fi(e=""){return ce(e,{fallback:String(e||""),includeYear:!0})}function gi(e={}){const t=e.raw||{},a=[];if(e.kind==="activity_event")a.push({type:"thought",label:"事件",text:e.summary||e.title||""}),(e.gateStatus||e.messageHint||e.shouldHandle||e.shouldNotifyLlm)&&a.push({type:e.shouldHandle||e.shouldNotifyLlm?"result":"thought",label:"筛选",text:`${e.shouldHandle?"需要处理":"静默"}${e.shouldNotifyLlm?" / 可通知大模型":""}${e.messageHint?`：${e.messageHint}`:""}`}),t.gate_reason&&a.push({type:"thought",label:"原因",text:t.gate_reason});else if(e.kind==="proactive_message")a.push({type:"reply",label:"主动消息",text:e.summary||""}),t.reason_context&&a.push({type:"thought",label:"依据",text:String(t.reason_context).slice(0,220)});else{const o=e.toolName?"工具调用":"日志";a.push({type:e.toolName?"tool":"thought",label:o,text:e.summary||e.title||""}),t.content&&a.push({type:e.toolName?"result":"thought",label:"内容",text:String(t.content).slice(0,500)})}return{id:String(e.id||`${e.kind}_${e.occurredAt||e.createdAt||Date.now()}`),mode:pi(e.kind),badge:mi(e),accent:di(e.kind),score:e.shouldHandle||e.shouldNotifyLlm?"有效":"",latency:"",amount:e.source||"",time:fi(e.occurredAt||e.createdAt),summary:e.summary||e.title||"",steps:a.filter(o=>String(o.text||"").trim())}}async function hi({silent:e=!0}={}){const t=b(n.currentContactId)||n.contacts[0];n.activityLogLoading=!0,e||u();try{const a=new URLSearchParams({hours:"24",limit:"50",agent_id:t?.id||n.currentContactId||""});t?.sessionId&&a.set("session_id",t.sessionId);const o=await fetch(`${S}/api/activity-log/recent?${a.toString()}`);if(!o.ok)throw new Error(`HTTP ${o.status}`);const i=await o.json().catch(()=>({}));n.activityLogEntries=Array.isArray(i.items)?i.items.map(gi):[],n.activityLogLoadedAt=new Date().toISOString()}catch(a){console.warn("[activity log] load failed",a),e||(n.toast="活动日志加载失败")}finally{n.activityLogLoading=!1,u(),n.toast&&window.setTimeout(()=>{n.toast="",u()},1200)}}function bi(e){return`
      <div class="cot-log-step ${e.type}">
        <span class="cot-log-step-label">${d(e.label)}</span>
        <span class="cot-log-step-text">${d(e.text)}</span>
      </div>
    `}function vi(){const e=b(n.currentContactId)||n.contacts[0],t=n.cotLogMode==="note",a=n.activityLogLoadedAt?n.activityLogEntries:li(e.id),o=a.filter(r=>n.cotLogMode==="short"?r.mode!=="主动":n.cotLogMode==="note"?r.steps.some(s=>s.type==="note"):!0),i=a.filter(r=>r.steps.some(s=>s.type==="note")).length;return`
      <section class="cot-log-page page-block">
        <div class="cot-log-toolbar glass-frost">
          <button class="cot-log-tool-btn avatar" aria-label="${d(e.name)}">
            <img src="${e.avatar}" alt="${d(e.name)}" />
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
              ${t?"":`<div class="cot-log-summary">${d(r.summary)}</div>`}
              <div class="cot-log-steps">
                ${s.map(bi).join("")}
              </div>
            </article>
          `}).join("")}
        </div>
      </section>
    `}function tn(e){return!e||typeof e.closest!="function"?!1:!!e.closest('input:not([type="range"]):not([type="checkbox"]):not([type="radio"]):not([type="file"]), textarea, select, [contenteditable="true"]')}function yi(){return!!(window.matchMedia?.("(pointer: coarse)").matches||"ontouchstart"in window||navigator.maxTouchPoints>0)}function St(e){return!!e&&/^image\/(png|jpe?g|webp|gif|heic|heif)$/i.test(e.type||"")}function Be(e){return e?{id:e.id,kind:e.kind||"image",type:e.type||"image/*",name:e.name||"image",size:Number(e.size||0),url:e.url||""}:null}function aa(e={}){return Array.isArray(e.attachments)?e.attachments.map(Be).filter(t=>t&&t.url):[]}function wi(e={}){return aa(e).length>0}function nn(e,t=[]){const a=String(e||"").trim();if(!t.length)return a;const i=`[图片附件：${t.map(r=>r.name||"image").join(", ")}]`;return a?`${a}
${i}`:i}function an(e,t=[]){const a=String(e||"").trim();return a||(t.length?"[图片]":"")}function oa(e,t={}){const a=Be(e);return a?.url?`
      <div class="chat-attachment-thumb">
        <img src="${d(a.url)}" alt="${d(a.name||"图片")}" />
        ${t.removable?`<button type="button" class="chat-attachment-remove" data-action="remove-chat-attachment" data-id="${d(a.id)}" aria-label="移除图片">×</button>`:""}
      </div>
    `:""}function Si(e=[]){return e.length?`
      <div class="chat-attachment-tray">
        ${e.map(t=>oa(t,{removable:!0})).join("")}
      </div>
    `:""}function $i(e=[]){return e.length?`<div class="message-attachment-grid">${e.map(t=>oa(t)).join("")}</div>`:""}function ki(e){return new Promise((t,a)=>{if(!St(e)){a(new Error("只支持图片附件"));return}const o=new FileReader;o.onerror=()=>a(new Error("图片读取失败")),o.onload=()=>t({id:`att_${Date.now()}_${Math.random().toString(36).slice(2,7)}`,kind:"image",type:e.type||"image/*",name:e.name||"pasted-image",size:e.size||0,url:typeof o.result=="string"?o.result:""}),o.readAsDataURL(e)})}async function on(e=[]){const t=Array.from(e).filter(St);if(!t.length)return!1;try{const a=await Promise.all(t.map(ki));return n.chatAttachments=[...n.chatAttachments||[],...a].slice(0,6),n.chatPasteError="",n.showAttach=!1,u(),!0}catch(a){return console.warn("[chat] image attach failed",a),n.chatPasteError=a?.message||"图片添加失败",n.toast=n.chatPasteError,u(),window.setTimeout(()=>{n.toast="",u()},1400),!1}}function ia(e,t){if(!e||!t)return;const a=String(e.value||""),o=typeof e.selectionStart=="number"?e.selectionStart:a.length,i=typeof e.selectionEnd=="number"?e.selectionEnd:o;e.value=`${a.slice(0,o)}${t}${a.slice(i)}`;const r=o+t.length;e.setSelectionRange?.(r,r),e.dispatchEvent(new Event("input",{bubbles:!0}))}function Ii(e){if(!e)return"";const t=document.createElement("div");return t.innerHTML=e,(t.textContent||t.innerText||"").replace(/\n{3,}/g,`

`)}async function _i(e){if(n.currentView!=="room")return;const t=e.clipboardData;if(!t)return;const a=Array.from(t.files||[]).filter(St),o=Array.from(t.items||[]).filter(c=>c.kind==="file"&&/^image\//i.test(c.type||"")).map(c=>c.getAsFile()).filter(St),i=[...a,...o].filter((c,l,p)=>l===p.findIndex(m=>m.name===c.name&&m.size===c.size&&m.type===c.type)),r=t.getData("text/plain")||"",s=t.getData("text/html")||"";if(i.length){e.preventDefault(),await on(i),r.trim()&&ia(e.currentTarget,r);return}s&&(e.preventDefault(),ia(e.currentTarget,r||Ii(s)))}function Mi(e,t){t&&(n.avatarCropper={kind:e,src:t,x:50,y:50,zoom:1},u())}function ie(e){const t=Number(e);return Number.isFinite(t)?Math.min(100,Math.max(0,t)):50}function Qe(e){const t=Number(e);return Number.isFinite(t)?Math.min(2.4,Math.max(1,t)):1}function ra(){const e=n.avatarCropper;if(!e)return;e.x=ie(e.x),e.y=ie(e.y),e.zoom=Qe(e.zoom);const t=y(),a=t?.querySelector(".avatar-cropper-image");a&&(a.style.objectPosition=`${e.x}% ${e.y}%`,a.style.transform=`scale(${e.zoom})`),t?.querySelectorAll('[data-action="avatar-cropper-range"]').forEach(o=>{const i=o.dataset.key;i&&i in e&&(o.value=String(e[i]))})}function xi(e){const t=e.target?.closest?.(".avatar-cropper-viewport"),a=n.avatarCropper;!t||!a||(e.preventDefault(),n.avatarCropDrag={pointerId:e.pointerId,startClientX:e.clientX,startClientY:e.clientY,startX:ie(a.x),startY:ie(a.y)},t.setPointerCapture?.(e.pointerId))}function Ci(e){const t=n.avatarCropDrag,a=n.avatarCropper,o=y()?.querySelector(".avatar-cropper-viewport");if(!t||!a||!o||t.pointerId!==e.pointerId)return;e.preventDefault();const i=o.getBoundingClientRect(),r=Qe(a.zoom),s=i.width?(e.clientX-t.startClientX)/i.width*100/r:0,c=i.height?(e.clientY-t.startClientY)/i.height*100/r:0;a.x=ie(t.startX-s),a.y=ie(t.startY-c),ra()}function sa(e){const t=n.avatarCropDrag;!t||t.pointerId!==e.pointerId||(n.avatarCropDrag=null)}function rn(e,t){if(!e)return;const a=new FileReader;a.onload=()=>{const o=typeof a.result=="string"?a.result:"";Mi(t,o)},a.readAsDataURL(e)}function Ai(e){return new Promise((t,a)=>{const o=new Image;o.onload=()=>{const r=document.createElement("canvas");r.width=512,r.height=512;const s=r.getContext("2d");if(!s){a(new Error("canvas unavailable"));return}const c=Qe(e.zoom),l=Math.max(512/o.naturalWidth,512/o.naturalHeight),p=o.naturalWidth*l*c,m=o.naturalHeight*l*c,f=ie(e.x)/100,h=ie(e.y)/100,v=(512-p)*f,$=(512-m)*h;s.imageSmoothingEnabled=!0,s.imageSmoothingQuality="high",s.drawImage(o,v,$,p,m),t(r.toDataURL("image/jpeg",.9))},o.onerror=a,o.src=e.src})}async function Ti(){const e=n.avatarCropper;if(e?.src)try{const t=await Ai(e);if(e.kind==="new-contact")n.newContactDraft={...n.newContactDraft||ft(),avatar:t},n.newContactAvatar=t;else if(e.kind==="account")n.accountProfile.avatar=t,D(),k(120);else if(e.kind==="contact"){const a=b(n.currentContactId);a&&(a.avatar=t,k(120))}n.avatarCropper=null,n.toast="头像已更新",u(),window.setTimeout(()=>{n.toast="",u()},1200)}catch{n.toast="头像裁切失败",u(),window.setTimeout(()=>{n.toast="",u()},1200)}}function Ei(){const e=y();if(!e||e.dataset.bound==="1")return;e.dataset.bound="1",e.addEventListener("click",sn),e.addEventListener("input",Pi),e.addEventListener("pointerdown",xi),e.addEventListener("pointermove",Ci),e.addEventListener("pointerup",sa),e.addEventListener("pointercancel",sa);let t;const a=f=>{if(tn(f.target))return;const h=f.target.closest(".message-bubble.from-ai");h&&(t=window.setTimeout(()=>{const v=h.dataset.msgId;if(b(n.currentContactId)?.messages?.find(T=>T.id===v)?.text){n.quoteMomentId=null,n.quoteMessageId=v,u();const T=y()?.querySelector(".chat-input");T&&T.focus()}n.activeBubbleToolsId=v,n.suppressBubbleToggle=!0,navigator.vibrate&&navigator.vibrate(50)},550))},o=()=>clearTimeout(t);e.addEventListener("touchstart",a,{passive:!0}),e.addEventListener("touchend",o),e.addEventListener("touchmove",o,{passive:!0}),e.addEventListener("mousedown",a),e.addEventListener("mouseup",o),e.addEventListener("mousemove",o),e.addEventListener("mouseleave",o);const i=e.querySelector(".send-round");i&&i.addEventListener("click",f=>{f.stopPropagation(),n.streamingAbortController?(n.streamingAbortController.abort(),n.streamingAbortController=null,u()):n.currentView!=="rpRoom"&&ht(b(n.currentContactId))?Sn():n.currentView!=="rpRoom"&&gt(b(n.currentContactId))?$n():kn()});const r=e.querySelector(".soft-mini");r&&r.addEventListener("click",f=>{f.stopPropagation(),n.showAttach=!n.showAttach,u()});const s=e.querySelector(".codex-toggle:not(.cc-toggle)");s&&s.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),$t()});const c=e.querySelector(".cc-toggle");c&&c.addEventListener("click",f=>{f.preventDefault(),f.stopPropagation(),qt()}),e.querySelectorAll(".chat-list-item[data-contact-id]").forEach(f=>{f.addEventListener("click",h=>{h.preventDefault(),h.stopPropagation(),ea(f.dataset.contactId)})});const p=e.querySelector(".chat-input");p&&(p.addEventListener("paste",_i),p.addEventListener("keydown",f=>{f.key==="Enter"&&!f.shiftKey&&(f.preventDefault(),n.currentView!=="rpRoom"&&ht(b(n.currentContactId))?Sn():n.currentView!=="rpRoom"&&gt(b(n.currentContactId))?$n():kn())}),["room","rpRoom"].includes(n.currentView)&&!yi()&&p.focus());const m=e.querySelector("#chat-image-input");m&&m.addEventListener("change",async f=>{await on(f.target.files||[]),f.target.value=""})}function $t(e=n.currentContactId){const t=b(e)||b(n.currentContactId);if(t){if(n.currentContactId=t.id,!Jt(t)){t.settings={...t.settings||{},codexEnabled:!1},n.toast="只有阿湛能切 Codex",u(),window.setTimeout(()=>{n.toast="",u()},1200);return}t.settings={...t.settings||{},codexEnabled:!t.settings?.codexEnabled},n.toast=t.settings.codexEnabled?"Codex 已接管这个窗口":"Codex 已关闭",k(120),u(),window.setTimeout(()=>{n.toast="",u()},1200)}}window.__yuiToggleCodex=(e,t)=>{t?.preventDefault?.(),t?.stopPropagation?.(),t?.stopImmediatePropagation?.();const a=e?.dataset?.contactId||n.currentContactId;$t(a)},window.__yuiToggleCC=(e,t)=>{t?.preventDefault?.(),t?.stopPropagation?.(),t?.stopImmediatePropagation?.();const a=e?.dataset?.contactId||n.currentContactId;qt(a)};async function sn(e){const t=e.target.closest("[data-action]");if(!t)return;const a=t.dataset.action;if(a==="cancel-avatar-cropper"){n.avatarCropper=null,n.avatarCropDrag=null,u();return}if(a==="apply-avatar-cropper"){e.preventDefault(),e.stopPropagation(),await Ti();return}if(a==="switch-tab"&&(n.currentTab=t.dataset.tab,n.currentView=t.dataset.tab==="chats"?"list":t.dataset.tab,u()),a==="open-contact"){ea(t.dataset.contactId);return}if(a==="back-list"&&(n.currentView="list",n.currentTab="chats",n.quoteMomentId=null,u()),a==="back-room"&&(n.currentView="room",u()),a==="open-contact-settings"&&(n.currentSettingsTab="basic",n.currentView="contactSettings",u(),pe(),at(n.currentContactId)),a==="open-cot-log"){n._prevContactSettingsTab=n.currentSettingsTab,n.currentView="cotLog",n.cotLogMode="long",n.activityLogLoadedAt="",n.activityLogEntries=[],u(),hi({silent:!0});return}if(a==="back-contact-settings"){n.currentView="contactSettings",n.currentSettingsTab=n._prevContactSettingsTab||n.currentSettingsTab||"basic",n._prevContactSettingsTab=null,u();return}if(a==="switch-cot-log-mode"){n.cotLogMode=t.dataset.mode||"long",u();return}if(a==="open-rp-lobby"){qo(n.currentView==="room"?"room":"list",Re());return}if(a==="back-rp-source"){n.currentView=n.rpBackView||"list",u();return}if(a==="back-rp-lobby"){n.currentView="rpLobby",u();return}if(a==="open-rp-room-create"){n.rpRoomDialogMode="create",n.rpRoomForm={name:"",world_setting:"",user_role:"",ai_role:""},n.rpRoomDialogOpen=!0,u();return}if(a==="close-rp-room-dialog"){if(t.dataset.rpRoomDialog==="card"||e.target&&e.target!==t)return;n.rpRoomDialogOpen=!1,u();return}if(a==="save-rp-room"){try{await Lo(),n.toast=n.rpRoomDialogMode==="edit"?"幕间已更新":"已入梦"}catch(o){console.warn("[rp] save room failed",o),n.toast="房间保存失败"}u(),window.setTimeout(()=>{n.toast="",u()},1200);return}if(a==="open-rp-room"){e.preventDefault(),e.stopPropagation(),await Zn(t.dataset.roomId);return}if(a==="delete-rp-room"){e.preventDefault(),e.stopPropagation();try{await Do(t.dataset.roomId),n.toast="房间已删除"}catch(o){console.warn("[rp] delete room failed",o),n.toast="删除失败"}u(),window.setTimeout(()=>{n.toast="",u()},1200);return}if(a==="rename-rp-room"){e.preventDefault(),e.stopPropagation();const o=t.dataset.roomId,i=n.rpRooms.find(s=>s.room_id===o),r=window.prompt("剧本",i?.name||"")?.trim();if(!r||!o)return;try{const s=await fetch(`${S}/api/rp/rooms/${encodeURIComponent(o)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify({name:r})});if(!s.ok)throw new Error(`HTTP ${s.status}`);await bt(Re(),{silent:!0}),n.toast="房间已重命名"}catch(s){console.warn("[rp] rename room failed",s),n.toast="重命名失败"}u(),window.setTimeout(()=>{n.toast="",u()},1200);return}if(a==="open-profile"&&(n.currentView="profile",u()),a==="stop-streaming"){n.streamingAbortController&&(n.streamingAbortController.abort(),n.streamingAbortController=null);return}if(a==="toggle-thinking-line"){const o=t.closest("[data-id]")?.dataset.id||t.dataset.id,i=y()?.querySelector(`#tl-line-${o}`),r=y()?.querySelector(`#tl-full-${o}`);if(!i||!r)return;const s=r.classList.contains("tl-open");r.classList.toggle("tl-open",!s),i.classList.toggle("tl-expanded",!s);return}if(a==="toggle-thinking"){const o=t.dataset.id,r=!!!n.openThinkingIds[o];n.openThinkingIds[o]=r;const s=document.getElementById(`thinking-${o}`);s?(s.classList.toggle("open",r),s.setAttribute("aria-hidden",r?"false":"true"),t.setAttribute("aria-expanded",r?"true":"false")):u()}if(a==="toggle-message-tools"){if(e.preventDefault(),e.stopPropagation(),n.suppressBubbleToggle){n.suppressBubbleToggle=!1;return}const o=t.dataset.id,i=n.activeBubbleToolsId===o?null:o;n.activeBubbleToolsId=i;const r=y();r&&(r.querySelectorAll(".bubble-bottom-tools.open").forEach(s=>{s.classList.remove("open")}),i&&r.querySelector(`.message-row[data-msg-id="${CSS.escape(i)}"] .bubble-bottom-tools`)?.classList.add("open"));return}if(a==="go-chat-with-quote"&&(n.currentContactId=t.dataset.contactId,n.quoteMomentId=t.dataset.momentId,n.quoteMessageId=null,n.currentTab="chats",n.currentView="room",u(),We(n.currentContactId),pe(n.currentContactId),at(n.currentContactId)),a==="open-comments"){e.preventDefault(),e.stopPropagation(),t.blur?.();const o=t.dataset.momentId,i=n.commentSheetMomentId===o?null:o;n.commentSheetMomentId=i;const r=y();if(r&&(r.querySelectorAll(".moment-inline-comment.open").forEach(s=>s.classList.remove("open")),i)){const s=r.querySelector(`.moment-inline-comment .moment-comment-input[data-comment-input="${i}"]`)?.closest(".moment-inline-comment");s&&s.classList.add("open")}return}if(a==="submit-comment"){e.preventDefault(),e.stopPropagation();const o=t.dataset.momentId,r=y()?.querySelector(`[data-comment-input="${o}"]`)?.value?.trim();if(!o||!r)return;try{const s=await Dr(o,we(),r);n.moments=n.moments.map(c=>c.id===o?s:c),n.commentSheetMomentId=null,n.toast="已发送评论",k(120),ne(),window.setTimeout(()=>{n.toast="",ne()},1200)}catch(s){console.warn("[moments] comment failed",s),vo(o,we(),r),n.commentSheetMomentId=null,n.toast="已发送评论",k(120),ne(),window.setTimeout(()=>{n.toast="",ne()},1200)}return}if(a==="like-moment"){e.preventDefault(),e.stopPropagation();const o=t.dataset.momentId;if(!o)return;try{const i=await Lr(o,we());n.moments=n.moments.map(r=>r.id===o?i:r),k(120),ne()}catch(i){console.warn("[moments] like failed",i),bo(o,we()),k(120),ne()}return}if(a==="submit-comment"){const o=Ue(t.dataset.momentId),r=y()?.querySelector(`[data-comment-input="${t.dataset.momentId}"]`)?.value?.trim();o&&r&&(o.comments.unshift({author:"我",text:r}),n.commentSheetMomentId=null,n.toast="已发送评论",k(120),u(),window.setTimeout(()=>{n.toast="",u()},1200))}if(a==="like-moment"){e.preventDefault(),e.stopPropagation();const o=Ue(t.dataset.momentId);if(!o)return;const i="我",r=o.likes.includes(i);o.likes=o.likes.filter(p=>p!==i),r||o.likes.unshift(i);const s=t;s.innerHTML=o.likes.includes(i)?g("heartFilled"):g("heart");const c=t.closest(".moment-content-col");if(!c)return;let l=c.querySelector(`[data-moment-id-panel="${o.id}"]`);if(!l&&o.likes.length>0){l=document.createElement("div"),l.className="moment-interactions",l.setAttribute("data-moment-id-panel",o.id);const p=c.querySelector(".moment-inline-comment");p?c.insertBefore(l,p):c.appendChild(l)}if(l){const p=l.querySelector(".moment-likes-area");if(o.likes.length>0)if(p)p.querySelector(".likes-list").textContent=o.likes.join("、");else{const m=document.createElement("div");m.className="moment-likes-area",m.innerHTML=`<span class="heart-mini">${g("heartFilled")}</span> <span class="likes-list">${d(o.likes.join("、"))}</span>`,l.insertBefore(m,l.firstChild)}else p&&p.remove(),l.querySelector(".moment-comments-area")||l.remove()}}if(a==="toggle-moment-search"&&(n.momentSearchOpen=!0,u()),a==="toggle-moment-menu"&&(e.preventDefault(),e.stopPropagation(),t.blur?.(),n.activeMenuMomentId=n.activeMenuMomentId===t.dataset.momentId?null:t.dataset.momentId,Yn()),a==="delete-moment"){e.preventDefault(),e.stopPropagation();const o=P(Ue(t.dataset.momentId));if(!o?.id)return;try{await qr(o.id,o.author_type,o.author_id),n.moments=n.moments.filter(i=>i.id!==o.id),n.activeMenuMomentId=null,n.toast="已删除朋友圈",k(120),ne(),window.setTimeout(()=>{n.toast="",ne()},1200)}catch(i){console.warn("[moments] delete failed",i),n.toast="删除失败",ne(),window.setTimeout(()=>{n.toast="",ne()},1400)}return}if(a==="edit-moment"){e.preventDefault(),e.stopPropagation();const o=P(Ue(t.dataset.momentId));if(!o?.id)return;n.activeMenuMomentId=null,n.momentComposerEditingId=o.id,n.momentComposerText=o.content||"",n.momentComposerImage=o.image||"",n.momentComposerImageName=o.image?"已有图片":"",n.momentsActorType=o.author_type==="agent"?"agent":"user",n.momentComposerOpen=!0,ne();return}if(a==="new-moment"){e.preventDefault(),e.stopPropagation(),n.momentComposerEditingId="",n.momentComposerText="",n.momentComposerImage="",n.momentComposerImageName="",n.momentComposerOpen=!0,ne();return}if(a==="set-moments-actor"){n.toast="发朋友圈默认以我发布",u(),window.setTimeout(()=>{n.toast="",u()},1100);return}if(a==="publish-moment"){const o=(document.getElementById("moment-content-input")?.value||n.momentComposerText||"").trim();if(!o){n.toast="朋友圈内容还没写",u(),window.setTimeout(()=>{n.toast="",u()},1100);return}const i=we();try{if(n.momentComposerEditingId)await Pr(n.momentComposerEditingId,{author_type:i.author_type,author_id:i.author_id,visibility:"public",content:o,image:n.momentComposerImage||"",mood:"日常"}),await za({silent:!0}),n.toast="已更新朋友圈";else{const r=await Er({author_type:i.author_type,author_id:i.author_id,visibility:"public",content:o,image:n.momentComposerImage||"",mood:"日常"});n.moments.unshift(r),n.toast="已发布朋友圈"}n.currentTab="moments",n.currentView="moments",n.momentComposerOpen=!1,n.momentComposerEditingId="",n.momentComposerText="",n.momentComposerImage="",n.momentComposerImageName="",k(120),u(),window.setTimeout(()=>{n.toast="",u()},1100)}catch(r){console.warn("[moments] publish failed",r),n.toast=n.momentComposerEditingId?"更新失败":"发布失败",u(),window.setTimeout(()=>{n.toast="",u()},1400)}return}if(a==="delete-moment"&&(n.moments=n.moments.filter(o=>o.id!==t.dataset.momentId),n.activeMenuMomentId=null,n.toast="已删除朋友圈",u(),window.setTimeout(()=>{n.toast="",u()},1200)),a==="edit-moment"&&(n.activeMenuMomentId=null,n.toast="编辑功能即将支持",u(),window.setTimeout(()=>{n.toast="",u()},1200)),a==="filter-moments"&&(n.toast="筛选功能稍后补上",u(),window.setTimeout(()=>{n.toast="",u()},1100)),a==="new-moment"&&(n.momentComposerOpen=!0,u()),a==="close-moment-composer"&&(n.momentComposerOpen=!1,u()),a==="publish-moment"){const o=(document.getElementById("moment-content-input")?.value||n.momentComposerText||"").trim();if(!o){n.toast="朋友圈内容还没写",u(),window.setTimeout(()=>{n.toast="",u()},1100);return}n.moments.unshift({id:`p${Date.now()}`,contactId:"me",time:new Date().toLocaleTimeString("zh-CN",{hour:"2-digit",minute:"2-digit",hour12:!1}),mood:"日常",content:o,likes:[],comments:[],image:n.momentComposerImage||"https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1000&q=80"}),n.currentTab="moments",n.currentView="moments",n.momentComposerOpen=!1,n.momentComposerText="",n.momentComposerImage="",n.momentComposerImageName="",n.toast="已发布朋友圈",k(120),u(),window.setTimeout(()=>{n.toast="",u()},1100)}if(a==="remove-moment-image"&&(n.momentComposerImage="",n.momentComposerImageName="",u()),a==="new-contact"&&(n.newContactDraft=ft(),n.newContactAvatar="",n.currentView="newContact",u()),a==="pick-new-contact-avatar"){document.getElementById("nc-avatar-file")?.click();return}if(a==="save-new-contact"){n.newContactDraft={...n.newContactDraft||{},name:document.getElementById("nc-name")?.value?.trim()||n.newContactDraft?.name||"",agentId:document.getElementById("nc-agent-id")?.value?.trim()||n.newContactDraft?.agentId||"",bio:document.getElementById("nc-bio")?.value?.trim()||n.newContactDraft?.bio||""};const o=String(n.newContactDraft.name||"").trim(),i=ge(n.newContactDraft.agentId),r=String(n.newContactDraft.bio||"").trim(),s=n.newContactDraft.avatar||n.newContactAvatar||"https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=300&q=80";if(!o){n.toast="请填写联系人昵称",u(),window.setTimeout(()=>{n.toast="",u()},1200);return}if(i&&!/^[a-z0-9_-]+$/.test(i)){n.toast="Agent ID 只能用小写字母、数字、下划线或短横线",u(),window.setTimeout(()=>{n.toast="",u()},1500);return}if(i&&n.contacts.some(m=>String(m.id||"").toLowerCase()===i)){n.toast="这个 Agent ID 已经存在",u(),window.setTimeout(()=>{n.toast="",u()},1400);return}const c=i||"c"+Date.now(),l=Jn({id:c,name:o,bio:r||"这是新来的联系人",status:"在线",handle:"@"+c,unread:0,pinned:!1,lastMessage:"",lastTime:"",avatar:s,settings:{model:"gpt-5.4",modelProviderId:A("chat")?.providerId||"openai",temperature:.7,topP:.9,contextCount:32,thinkBudget:24,streamOutput:!0,reasoning_visibility:!1,proactiveEnabled:!1,proactiveFrequency:30,memoryEnabled:!0},topics:[],messages:[]}),p=await Eo(l);de(),Ie(100),n.newContactDraft=ft(),n.newContactAvatar="",n.toast=p?"已添加联系人":"已本地添加，后端登记失败",n.currentView="list",u(),window.setTimeout(()=>{n.toast="",u()},p?1200:1800)}if(a==="open-contact-avatar"){document.getElementById("contact-avatar-file")?.click();return}if(a==="open-contact-name"){const o=b(n.currentContactId);if(!o)return;const i=window.prompt("请输入昵称",o.name||"")?.trim();if(!i)return;o.name=i,n.toast="昵称已更新",u(),k(120),window.setTimeout(()=>{n.toast="",u()},1200);return}if(a==="open-contact-bio"){const o=b(n.currentContactId);if(!o)return;const i=window.prompt("请输入简介",o.bio||"")?.trim();if(typeof i!="string"||!i)return;o.bio=i,n.toast="简介已更新",u(),k(120),window.setTimeout(()=>{n.toast="",u()},1200);return}if(a==="open-contact-impression"){n._prevContactSettingsTab=n.currentSettingsTab,n.currentView="contactImpressionDetail",u(),pe(n.currentContactId);return}if(a==="open-contact-relationship"){n._prevContactSettingsTab=n.currentSettingsTab,n.currentView="contactRelationshipDetail",u(),pe(n.currentContactId);return}if(a==="open-contact-likes"){n._prevContactSettingsTab=n.currentSettingsTab,n.currentView="contactLikesDetail",u(),pe(n.currentContactId);return}if(a==="save-insight-field"){const o=t.dataset.field,i=document.querySelector(`.insight-editor-textarea[data-field="${o}"]`);i&&Or(o,i.value);return}if(a==="open-contact-room-background"){n._prevContactSettingsTab=n.currentSettingsTab,n.currentView="contactRoomBackgroundPicker",u();return}if(a==="open-contact-bubble-theme"){n._prevContactSettingsTab=n.currentSettingsTab,n.currentView="contactBubbleThemePicker",u();return}if(a==="delete-contact"){const o=b(n.currentContactId);if(!o||!window.confirm(`确定删除“${o.name}”吗？

会删除联系人及其陪伴状态。
会清理相关主动消息。
聊天记录和记忆不会立即永久删除。`))return;try{await Co(o.id),xo(o.id),n.toast="联系人已删除",u(),k(120),window.setTimeout(()=>{n.toast="",u()},1400)}catch(r){console.warn("[contact] delete failed",r),n.toast="删除失败",u(),window.setTimeout(()=>{n.toast="",u()},1400)}return}if(a==="pick-contact-room-background"){const o=String(t.dataset.value||"").trim();if(!o)return;go("roomBackground",o,"聊天背景已更新"),n.currentView="contactSettings",n.currentSettingsTab="basic",u();return}if(a==="pick-contact-bubble-theme"){const o=Vt(t.dataset.value),i=b(n.currentContactId);if(!i||!o)return;i.chatTheme=o,i.bubbleTheme=zt(o),i.theme=na(o),n.toast="气泡主题已更新",n.currentView="contactSettings",n.currentSettingsTab="basic",u(),k(120),window.setTimeout(()=>{n.toast="",u()},1200);return}if(a==="open-companion-state"){n._prevContactSettingsTab=n.currentSettingsTab,n.currentView="companionStateDetail",pe(n.currentContactId),u();return}if(a==="expand-actions"){n.showAttach=!n.showAttach,u();return}if(a==="remove-chat-attachment"){const o=t.dataset.id;n.chatAttachments=(n.chatAttachments||[]).filter(i=>i.id!==o),u();return}if(a==="clear-quote"&&(n.quoteMomentId=null,n.quoteMessageId=null,u()),a==="toggle-global"){const o=t.dataset.key;n.globalSettings[o]=!n.globalSettings[o],Xn(t,n.globalSettings[o]),D();return}if(a==="toggle-contact"){const o=b(n.currentContactId),i=t.dataset.key,s=y()?.querySelector(".chat-app-body")?.scrollTop??0;o.settings[i]=!o.settings[i],u(),Kt(s)}if(a==="back-home"&&(n.currentView==="list"?typeof window.closePage=="function"&&window.closePage("page-chat"):(n.currentTab="chats",n.currentView="list",u())),a==="switch-settings-tab"&&(n.currentSettingsTab=t.dataset.tab,n.contactQuickActionEditorId="",n.quickActionSwipeOpenId="",n.quickActionDropHintId="",n.quickActionDropDirection="",n.quickActionReorderPulseId="",n.currentSettingsTab!=="model"&&(n.contactModelAdvancedOpen=!1,n.contactPersonaExpanded=!1),u(),n.currentSettingsTab==="memory"&&pe(),n.currentSettingsTab==="model"&&at(n.currentContactId)),a==="toggle-contact-advanced"){n.contactModelAdvancedOpen=!n.contactModelAdvancedOpen,u();return}if(a==="toggle-contact-persona"){n.contactPersonaExpanded=!n.contactPersonaExpanded,u();return}if(a==="toggle-codex-mode"){$t(t.dataset.contactId);return}if(a==="toggle-cc-mode"){qt(t.dataset.contactId);return}if(a==="quick-action"){const o=t.dataset.id,i=y()?.querySelector(".chat-input"),r=Ut(Q()).find(c=>c.id===o),s={health:"帮我记一下健康相关的事情",schedule:"帮我看看接下来的日程",weather:"帮我查一下今天的天气",files:"帮我找一下刚才提到的文件",quote:"引用上一条消息继续聊",more:"打开更多快捷操作",get_current_time:"现在几点了？",get_weather:"帮我查一下今天天气",get_health_summary:"帮我总结一下今天的健康数据",web_search:"帮我搜索这个问题",fetch_url:"帮我解析这个网页",add_todo:"帮我记一个待办",list_todos:"帮我看看待办清单",complete_todo:"把这个待办标记完成",add_note:"帮我记一条便签",list_notes:"帮我看看最近便签"};i&&(i.value=r?.prompt||s[r?.mcpToolId||o]||s[o]||`${r?.label||""}`.trim())}if(a==="fake-send"){if(n.streamingAbortController){n.streamingAbortController.abort(),n.streamingAbortController=null,u();return}n.currentView==="rpRoom"?Xi():ht(b(n.currentContactId))?Sn():gt(b(n.currentContactId))?$n():kn()}if(a==="reroll-msg"&&Gi(t.dataset.id),a==="quote-msg"){const o=t.dataset.id;if(b(n.currentContactId)?.messages?.find(s=>s.id===o)?.text){n.quoteMomentId=null,n.quoteMessageId=o,u();const s=y()?.querySelector(".chat-input");s&&s.focus()}}if(a==="attach-option"){n.showAttach=!1;const o=t.dataset.label||"";if(o==="图片"||o==="拍照"){u(),requestAnimationFrame(()=>y()?.querySelector("#chat-image-input")?.click());return}n.toast=`${o} 功能稍后补上`,u(),window.setTimeout(()=>{n.toast="",u()},1200)}}function Pi(e){const t=e.target;if(t?.dataset?.action==="avatar-cropper-range"){const a=n.avatarCropper;if(!a)return;const o=t.dataset.key;a[o]=o==="zoom"?Qe(t.value):ie(t.value),ra();return}if((t?.id==="nc-name"||t?.id==="nc-agent-id"||t?.id==="nc-bio")&&(n.newContactDraft={...n.newContactDraft||{},...t.id==="nc-name"?{name:t.value||""}:{},...t.id==="nc-agent-id"?{agentId:t.value||""}:{},...t.id==="nc-bio"?{bio:t.value||""}:{}}),t.dataset.action==="slide-contact"){const a=b(n.currentContactId),o=t.dataset.key,i=Number(t.value);a.settings[o]=Number.isInteger(a.settings[o])?Math.round(i):i;const s=t.closest(".slider-row-block")?.querySelector(".slider-value");s&&(s.textContent=Number.isInteger(Number(t.step))||Number(t.step)>=1?String(Math.round(i)):i.toFixed(Number(t.step)===.01?2:1))}t.dataset.action==="moment-composer-input"&&(n.momentComposerText=t.value||"")}document.addEventListener("DOMContentLoaded",()=>{Ni(),Qn(),xa().finally(async()=>{await Yi(),Oi(),await ba({silent:!0})})});const S=window.__YUI_API_BASE__||(/^(localhost|127\.0\.0\.1)$/.test(location.hostname)?"":"https://api.somni-ref.top"),kt="murmur_local_state_v1",ca="murmur_sync_meta_v1",ua="murmur_device_id_v1",la=new Set(lt.map(e=>e.id)),da=new Set(qn.map(e=>e.id));let cn=null,un=null,It=!1,Ye=!1,pa=null,ln=!1,_t="",dn=null,pn=null;function mn(){try{const e=localStorage.getItem(ua);if(e)return e;const t=`dev_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;return localStorage.setItem(ua,t),t}catch{return`dev_fallback_${Date.now()}`}}function Xe(){try{const e=localStorage.getItem(ca),t=e?JSON.parse(e):{};return{last_server_updated_at:t?.last_server_updated_at||"",pending:!!t?.pending}}catch{return{last_server_updated_at:"",pending:!1}}}function ze(e={}){try{localStorage.setItem(ca,JSON.stringify({last_server_updated_at:e.last_server_updated_at||"",pending:!!e.pending}))}catch{}}function qi(){return ae(),n.currentRpRoomId&&Array.isArray(n.currentRpMessages)&&(n.rpMessages={...n.rpMessages||{},[n.currentRpRoomId]:n.currentRpMessages.map(G)}),hn({contacts:n.contacts,moments:n.moments,actions:n.actions,globalSettings:n.globalSettings,accountProfile:n.accountProfile,conversations:n.conversations,rpRooms:n.rpRooms,rpMessages:n.rpMessages})}function j(e){try{return JSON.stringify(e)}catch{return""}}function X(e){const t=String(e||"").trim();if(!t)return 0;const a=Date.parse(t);return Number.isFinite(a)?a:0}function ke(e={}){return String(e.content||e.text||e.message||e.body||e.raw_content||"").trim()}function Mt(e={}){return!!ke(e)||wi(e)||!!e.typing||!!e.streaming||!!e.thinking||Array.isArray(e.toolCalls)&&e.toolCalls.length>0}function fn(e={}){const t=X(e.created_at||e.timestamp);if(t)return Math.floor(t/6e4);const a=String(e.time||"").trim();return a||""}function ma(e={},t={}){const a=fn(e),o=fn(t);return!!a&&!!o&&a===o}function fa(e={},t={}){const a=G(e),o=G(t);if(a.role!==o.role||ke(a)!==ke(o)||(a.session_id||o.session_id)&&a.session_id!==o.session_id)return!1;const i=X(a.created_at||a.timestamp),r=X(o.created_at||o.timestamp);return i&&r?Math.abs(i-r)<=120*1e3:ma(a,o)}function xt(e={}){const t=G(e),a=new Set;t.id&&a.add(`id:${t.id}`),t.client_message_id&&a.add(`client:${t.client_message_id}`);const o=ke(t);if(o){const i=t.session_id||t.agent_id||"",r=fn(t);a.add(`soft:${i}|${t.role}|${r}|${o}`)}return a}function Ct(e=[],t={}){const a=F(t),o=xt(a);let i=e.findIndex(r=>{const s=xt(r);return[...o].some(c=>s.has(c))});return i===-1&&(i=e.findIndex(r=>fa(r,a))),i===-1?e.push(a):e[i]=F({...e[i],...a}),a}function G(e={}){const t=String(e.role||e.from||"").toLowerCase()==="user"||e.from==="me"?"user":"ai",a=ke(e),o=String(e.created_at||e.timestamp||""),i=String(e.time||""),r=[String(e.agent_id||""),t,o||i,a].join("|");return{id:String(e.id||r||`${t}_${Date.now()}_${Math.random().toString(36).slice(2,6)}`),session_id:String(e.session_id||""),agent_id:String(e.agent_id||""),client_message_id:String(e.client_message_id||e.clientMessageId||""),role:t,content:a,text:a,created_at:o,time:i,...e.model?{model:e.model}:{},...e.source?{source:e.source}:{},...e.provider?{provider:e.provider}:{},...e.attachments?{attachments:e.attachments}:{},...e.thinking?{thinking:e.thinking}:{},...e.toolCalls?{toolCalls:e.toolCalls}:{}}}function F(e={}){const t=G(e);return{...t,text:t.content,time:t.time||(t.created_at?ce(t.created_at,{fallback:""}):"")}}function je(e={}){return!e||typeof e!="object"?{}:Object.fromEntries(Object.entries(e).map(([t,a])=>[String(t),Array.isArray(a)?le([],a):[]]))}function le(e=[],t=[]){const a=[],o=new Map;return[...e,...t].forEach(i=>{const r=G(i);if(!Mt(r))return;let c=[...xt(r)].map(p=>o.get(p)).find(p=>p>=0);c>=0||(c=a.findIndex(p=>fa(p,r)));const l=c>=0?a[c]:null;if(!l||X(r.created_at)>=X(l.created_at)){const p={...l,...r},m=c>=0?c:a.length;a[m]=p,[...xt(p)].forEach(f=>o.set(f,m))}}),a.filter(Boolean).sort((i,r)=>{const s=X(i.created_at),c=X(r.created_at);return s||c?s-c:String(i.id).localeCompare(String(r.id))})}function ga(e={},t={}){const a=je(e),o=je(t);return Object.entries(o).forEach(([i,r])=>{a[i]=le(a[i]||[],r)}),a}function ae(){const e=je(n.conversations);(n.contacts||[]).forEach(t=>{if(!t?.id)return;const a=Array.isArray(t.messages)?t.messages:[];(a.length||e[t.id]?.length)&&(e[t.id]=le(e[t.id]||[],a),t.messages=e[t.id].map(F))}),n.conversations=e}function Ge(){const e=je(n.conversations);n.contacts=(n.contacts||[]).map(t=>{const o=(e[t.id]||(Array.isArray(t.messages)?t.messages.map(G):[])).map(F),i=o[o.length-1];return{...t,messages:o,lastMessage:i?.text||t.lastMessage||"",lastTime:i?.time||t.lastTime||""}}),n.conversations=e}function At(e=[],t=[]){const a=new Map;return e.map(Y).forEach(o=>a.set(o.id.toLowerCase(),o)),t.map(Y).forEach(o=>{const i=o.id.toLowerCase(),r=a.get(i);if(!r){a.set(i,o);return}const s=le(r.messages||[],o.messages||[]),c={...o,...r,id:r.id||o.id,agent_id:r.agent_id||o.agent_id||r.id||o.id,name:r.name||o.name,display_name:r.display_name||r.name||o.display_name||o.name,bio:r.bio||o.bio,status:r.status||o.status,handle:r.handle||o.handle,roleTag:r.roleTag||o.roleTag,avatar:r.avatar||o.avatar,settings:{...o.settings||{},...r.settings||{}},messages:s.map(F),lastMessage:r.lastMessage||o.lastMessage||s[s.length-1]?.content||"",lastTime:r.lastTime||o.lastTime||s[s.length-1]?.time||""};a.set(i,c)}),[...a.values()]}function Li(e=[]){for(let t=e.length-1;t>=0;t-=1){const a=String(e[t]?.session_id||"").trim();if(a)return a}return""}function Je(e={},t=""){const a=String(e.role||"").toLowerCase()==="user"?"user":"ai",o=String(e.created_at||""),i=ke(e),r=String(e.model||"");return G({id:e.id||`${t}|${a}|${o}|${i}`,session_id:e.session_id||"",agent_id:e.agent_id||t,role:a,content:i,text:i,created_at:o,time:o?ce(o,{fallback:""}):"",model:r,...r.toLowerCase()==="codex"?{source:"codex",provider:"codex"}:{}})}async function We(e,{silent:t=!0}={}){const a=b(e);if(!a?.id)return 0;try{const o=ta(a),i=[];console.info("[murmur] history request",{contact_id:a.id,tried:o});for(const m of o){const f=new URLSearchParams({agent_id:m,limit:"200"}),h=await fetch(`${S}/api/murmur/messages?${f.toString()}`);if(!h.ok){console.warn("[murmur] history fetch failed",{agent_id:m,status:h.status});continue}const v=await h.json().catch(()=>({})),$=Array.isArray(v?.messages)?v.messages:[];i.push(...$)}const r=le([],i.map(m=>Je(m,a.id)).filter(Mt));if(console.info("[murmur] history loaded",{agent_id:a.id,tried:o,raw:i.length,renderable:r.length,first:r[0]||null}),!r.length)return 0;const s=j({conversations:vt(a)}),c=le(vt(a),r);n.conversations={...n.conversations||{},[a.id]:c},a.messages=c.map(F);const l=a.messages[a.messages.length-1];l&&(a.lastMessage=l.text||"",a.lastTime=l.time||"");const p=Li(c);return p&&(a.sessionId=p),j({conversations:c})!==s&&(de(),Ie(300)),n.currentContactId===a.id&&n.currentView==="room"&&u(),r.length}catch(o){return console.error("[murmur] history load failed",o),0}}function Di(e={}){const t=String(e.agent_id||e.agentId||"").trim(),a=String(e.content||"").trim(),o=String(e.created_at||e.createdAt||new Date().toISOString());return G({id:e.id?`proactive_${e.id}`:`proactive_${t}_${o}_${a}`,agent_id:t,role:"ai",content:a,created_at:o,source:"proactive"})}async function ha(e){const t=String(e||"").trim();if(t)try{await fetch(`${S}/api/proactive/${encodeURIComponent(t)}/read`,{method:"POST"})}catch(a){console.warn("[proactive] mark read failed",a)}}async function ba({silent:e=!0}={}){if(!ln){ln=!0;try{const t=await fetch(`${S}/api/proactive?limit=20`);if(!t.ok)throw new Error(`HTTP ${t.status}`);const a=await t.json().catch(()=>({})),o=Array.isArray(a?.messages)?a.messages:[];if(!o.length)return;let i=!1;for(const r of o){const s=Di(r),c=s.agent_id||String(r.agent_id||"").trim();if(!c||!s.content){await ha(r.id);continue}let l=b(c);l||(l=Jn({id:c,agent_id:c,name:String(r.agent_name||r.display_name||c),handle:`@${c}`,messages:[]}));const p=(n.conversations?.[l.id]||l.messages||[]).length,m=le(n.conversations?.[l.id]||l.messages||[],[s]);n.conversations={...n.conversations||{},[l.id]:m},l.messages=m.map(F);const f=l.messages[l.messages.length-1];f&&(l.lastMessage=f.text||"",l.lastTime=f.time||""),m.length>p&&!(n.currentView==="room"&&n.currentContactId===l.id)&&(l.unread=Number(l.unread||0)+1),i=!0,await ha(r.id)}i&&(Ge(),de(),u(),n.currentView==="room"&&N())}catch(t){e||console.warn("[proactive] poll failed",t)}finally{ln=!1}}}function Oi(){pa||(pa=window.setInterval(()=>{ba({silent:!0})},15e3))}function va(e=[],t=[]){const a=new Map;return e.map(P).forEach(o=>a.set(o.id,o)),t.map(P).forEach(o=>{const i=a.get(o.id);if(!i){a.set(o.id,o);return}const r=X(o.updated_at||o.created_at||o.time),s=X(i.updated_at||i.created_at||i.time);a.set(o.id,r>s?{...i,...o}:{...o,...i})}),[...a.values()].sort((o,i)=>X(i.updated_at||i.created_at||i.time)-X(o.updated_at||o.created_at||o.time))}function Ri(e=[],t=[],a="id"){const o=new Map;return[...e||[],...t||[]].forEach(i=>{if(!i||typeof i!="object")return;const r=String(i[a]||i.id||"").trim();r&&o.set(r,{...o.get(r)||{},...i})}),[...o.values()]}const Vi="https://images.unsplash.com/photo-1607746882042-944635dfe10e?w=200&q=80";function ya(e){return!e||String(e)===Vi}function Bi(e={},t={}){const a={...e||{},...t||{}};return!ya(e?.avatar)&&ya(t?.avatar)&&(a.avatar=e.avatar),a}function de(){const e=qi(),t=j(e);if(!t||t===_t)return!1;_t=t;try{return localStorage.setItem(kt,JSON.stringify({client_updated_at:new Date().toISOString(),payload:e})),!0}catch{return!1}}function wa(){return dn||(dn=new Map(lt.map(e=>{const t=Y(e);return[t.id,j(t)]}))),dn}function Sa(){return pn||(pn=new Map(qn.map(e=>{const t=P(e);return[t.id,j(t)]}))),pn}function $a(e){if(!Array.isArray(e))return!1;const t=wa();return e.some(a=>{const o=Y(a);return!la.has(o.id)||t.get(o.id)!==j(o)})}function gn(e){if(!e||typeof e!="object")return!1;const t=String(e.id||e.agent_id||"").trim().toLowerCase();if(!la.has(t))return!1;const a=wa(),o=Y({...e,id:t});if(a.get(t)===j(o))return!0;const i=String(e.avatar||"").trim(),r=Array.isArray(e.topics)?e.topics.map(c=>String(c?.id||"")):[],s=Array.isArray(e.messages)?e.messages.map(c=>String(c?.id||"")):[];return t==="ayan"?i.includes("photo-1517841905240-472988babdf9")||s.some(c=>["m1","m2","m3"].includes(c))||r.some(c=>["t1","t2","t3"].includes(c)):t==="azheng"?i.includes("photo-1500530855697-b586d89ba3ee")||s.includes("m4")||r.some(c=>["t4","t5"].includes(c)):t==="xiaoying"?i.includes("photo-1507525428034-b723cf961d3e")||s.includes("m5")||r.includes("t6"):!1}function ka(e){return Array.isArray(e)?e.filter(t=>!gn(t)):[]}function zi(e){return Array.isArray(e)&&e.length>0&&e.every(t=>gn(t))}function hn(e={}){if(!e||typeof e!="object")return{};const t={...e};return Array.isArray(t.contacts)&&(t.contacts=ka(t.contacts).map(a=>Y(a))),t.conversations&&typeof t.conversations=="object"&&(t.conversations=je(t.conversations)),t.rpMessages&&typeof t.rpMessages=="object"&&(t.rpMessages=je(t.rpMessages)),Array.isArray(t.moments)&&(t.moments=Tt(t.moments).map(P)),t}function ji(e){if(!Array.isArray(e))return!1;const t=Sa();return e.some(a=>{const o=P(a);return!da.has(o.id)||t.get(o.id)!==j(o)})}function Ia(e){if(!e||typeof e!="object")return!1;const t=String(e.id||"").trim();if(!da.has(t))return!1;const a=Sa(),o=P(e);return a.get(t)===j(o)?!0:t==="p0"?String(e.image||"").includes("photo-1507525428034-b723cf961d3e")||String(e.content||"").includes("天空很温柔"):t==="p1"?String(e.content||"").includes("醉了先看这个"):t==="p2"?String(e.content||"").includes("晚上跑了三公里"):!1}function Tt(e){return Array.isArray(e)?e.filter(t=>!Ia(t)):[]}function Hi(e){return Array.isArray(e)&&e.length>0&&e.every(t=>Ia(t))}function _a(e,{source:t="local"}={}){if(!(!e||typeof e!="object")){if(Array.isArray(e.contacts)){const a=e.contacts.map(r=>Y(r)),o=ka(a).map(r=>Y(r)),i=$a(n.contacts);o.length?(n.contacts=At(n.contacts,o),b(n.currentContactId)||(n.currentContactId=n.contacts[0]?.id||"")):zi(a)?(i||(n.contacts=[]),b(n.currentContactId)||(n.currentContactId=n.contacts[0]?.id||""),console.warn(`[sync] ignored ${t} default mock contacts`)):i?n.contacts=n.contacts.map(r=>Y(r)):(n.contacts=[],n.currentContactId="")}else n.contacts=n.contacts.map(a=>Y(a));if(e.conversations&&typeof e.conversations=="object"?(n.conversations=ga(n.conversations,e.conversations),Ge()):ae(),Array.isArray(e.moments)){const a=e.moments.map(P),o=Tt(a).map(P),i=ji(n.moments);o.length?n.moments=va(Tt(n.moments),o):Hi(a)?(i||(n.moments=[]),console.warn(`[sync] ignored ${t} default mock moments`)):i?n.moments=Tt(n.moments).map(P):n.moments=[]}Array.isArray(e.rpRooms)&&(n.rpRooms=Ri(n.rpRooms||[],e.rpRooms||[],"room_id")),e.rpMessages&&typeof e.rpMessages=="object"&&(n.rpMessages=ga(n.rpMessages,e.rpMessages)),Array.isArray(e.actions)&&(n.actions=e.actions),e.globalSettings&&typeof e.globalSettings=="object"&&(n.globalSettings={...n.globalSettings,...e.globalSettings}),e.accountProfile&&typeof e.accountProfile=="object"&&(n.accountProfile=Bi(n.accountProfile,e.accountProfile)),z(),Lt()}}function Ni(){try{const e=localStorage.getItem(kt);if(!e)return;const t=JSON.parse(e);if(!t?.payload)return;_a(t.payload,{source:"local"});const a=hn(t.payload);_t=j(a),j(t.payload)!==_t&&localStorage.setItem(kt,JSON.stringify({client_updated_at:t.client_updated_at||new Date().toISOString(),payload:a}))}catch{}}function Ie(e=600){if(Ye)return;const t=Xe();ze({...t,pending:!0}),cn&&clearTimeout(cn),cn=window.setTimeout(()=>{Ma()},e)}async function Ma(){if(It||Ye)return;const e=Xe();if(!e.pending)return;let t=null;try{t=JSON.parse(localStorage.getItem(kt)||"null")}catch{}if(!t?.payload){ze({...e,pending:!1});return}const a=hn(t.payload);It=!0;try{const o=await fetch(`${S}/api/sync/push`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({device_id:mn(),client_updated_at:t.client_updated_at||new Date().toISOString(),payload:a})});if(!o.ok)throw new Error(`HTTP ${o.status}`);const i=await o.json().catch(()=>({}));ze({last_server_updated_at:i.server_updated_at||e.last_server_updated_at||"",pending:!1})}catch(o){console.warn("[sync] push failed",o),ze({...e,pending:!0})}finally{It=!1}}async function xa(){if(It)return;const e=Xe();if(e.pending&&(await Ma(),Xe().pending))return;const t=new URLSearchParams({device_id:mn()});e.last_server_updated_at&&t.set("since",e.last_server_updated_at);try{const a=await fetch(`${S}/api/sync/pull?${t.toString()}`);if(!a.ok)return;const o=await a.json().catch(()=>({})),i=$a(n.contacts);if(!o?.has_update||!o?.payload||o?.is_self&&i){o?.server_updated_at&&ze({...e,last_server_updated_at:o.server_updated_at,pending:e.pending});return}Ye=!0,_a(o.payload,{source:"remote"}),de(),ze({last_server_updated_at:o.server_updated_at||e.last_server_updated_at||"",pending:!1}),u()}catch(a){console.warn("[sync] pull failed",a)}finally{Ye=!1}}function Fi(e={}){const t=ge(e.agent_id||e.id);if(!t)return null;const a=String(e.display_name||e.name||t).trim()||t;return Y({id:t,agent_id:t,name:a,display_name:a,bio:String(e.description||e.subtitle||"").trim(),status:"在线",handle:String(e.display_handle||`@${t}`),roleTag:String(e.source||"agent"),avatar:String(e.avatar||"").trim(),pinned:!1,unread:0,lastMessage:"",lastTime:"",topics:[],messages:[]})}function Ca(e={}){const t=ge(e.agent_id||e.id);if(!t)return null;const a=lt.find(r=>String(r.id||"").toLowerCase()===t),o=String(e.last_message_at||""),i=String(e.last_message||"").trim();return Y({id:t,agent_id:t,name:String(a?.name||e.display_name||e.name||t).trim()||t,display_name:String(a?.name||e.display_name||e.name||t).trim()||t,bio:"",status:"在线",handle:`@${t}`,roleTag:"recovered",avatar:"",pinned:!1,unread:0,lastMessage:i,lastTime:o?ce(o,{fallback:""}):"",sessionId:String(e.session_id||""),messageCount:Number(e.message_count||0)||0,topics:[],messages:[]})}async function Ui({silent:e=!0}={}){try{const t=await fetch(`${S}/api/agents?include_inactive=true`);if(!t.ok)throw new Error(`HTTP ${t.status}`);const a=await t.json().catch(()=>({})),o=(Array.isArray(a?.agents)?a.agents:[]).filter(r=>r?.is_active!==!1).map(Fi).filter(Boolean).filter(r=>!gn(r));if(console.info("[agents] loaded",o.map(r=>({id:r.id,name:r.name,source:r.roleTag||""}))),!o.length)return;const i=j({contacts:n.contacts});n.contacts=At(n.contacts,o),Ge(),(!n.currentContactId||!n.contacts.some(r=>r.id===n.currentContactId))&&(n.currentContactId=n.contacts[0]?.id||""),j({contacts:n.contacts})!==i&&(de(),Ie(100)),Et(o),u()}catch(t){e||console.warn("[agents] load contacts failed",t)}}async function Ki({silent:e=!0}={}){try{const t=await fetch(`${S}/api/murmur/message-agents?limit=1000`);if(t.status===404){await Qi({silent:e});return}if(!t.ok)throw new Error(`HTTP ${t.status}`);const a=await t.json().catch(()=>({})),o=(Array.isArray(a?.agents)?a.agents:[]).map(Ca).filter(Boolean);if(console.info("[murmur] message agents loaded",o.map(r=>({id:r.id,lastMessage:r.lastMessage,count:r.messageCount||0}))),!o.length)return;const i=j({contacts:n.contacts});n.contacts=At(n.contacts,o),Ge(),(!n.currentContactId||!n.contacts.some(r=>r.id===n.currentContactId))&&(n.currentContactId=n.contacts[0]?.id||""),j({contacts:n.contacts})!==i&&(de(),Ie(100)),Et(o),u()}catch(t){e||console.warn("[murmur] load message agents failed",t)}}async function Qi({silent:e=!0}={}){const t=Array.from(new Set([...lt.map(r=>ge(r.id)).filter(Boolean),...n.contacts.map(r=>ge(r.id)).filter(Boolean)])),a=[];for(const r of t)if(r)try{const s=new URLSearchParams({agent_id:r,limit:"1"}),c=await fetch(`${S}/api/murmur/messages?${s.toString()}`);if(!c.ok)continue;const l=await c.json().catch(()=>({})),p=Array.isArray(l?.messages)?l.messages:[];if(!p.length)continue;const m=p[p.length-1]||{};a.push(Ca({agent_id:r,last_message:m.content||"",last_message_at:m.created_at||"",message_count:p.length,session_id:m.session_id||""}))}catch(s){e||console.warn("[murmur] message probe failed",r,s)}const o=a.filter(Boolean);if(console.info("[murmur] message agents probed",o.map(r=>({id:r.id,lastMessage:r.lastMessage,count:r.messageCount||0}))),!o.length)return;const i=j({contacts:n.contacts});n.contacts=At(n.contacts,o),Ge(),(!n.currentContactId||!n.contacts.some(r=>r.id===n.currentContactId))&&(n.currentContactId=n.contacts[0]?.id||""),j({contacts:n.contacts})!==i&&(de(),Ie(100)),Et(o),u()}async function Yi(){await Ui(),await Ki(),await Et(n.contacts),Oo(120)}async function Et(e=[]){const t=[...new Set((e||[]).map(a=>a?.id).filter(Boolean))];for(const a of t)if(!(n.historyLoadingContactIds[a]||n.historyLoadedContactIds[a])){n.historyLoadingContactIds[a]=!0;try{await We(a)&&(n.historyLoadedContactIds[a]=!0)}finally{delete n.historyLoadingContactIds[a]}}}function k(e=800){Ye||(un&&clearTimeout(un),un=window.setTimeout(()=>{de()&&Ie(500)},e))}function q(){const e=new Date;return`${String(e.getHours()).padStart(2,"0")}:${String(e.getMinutes()).padStart(2,"0")}`}function bn(e){const t=e?.settings?.modelProviderId||A("chat")?.providerId||"",a=W(t);if(!a?.baseUrl||!a?.apiKey)return{};const o=Ze(a.apiPath||a.api_path||"",{allowEmpty:!0});return{base_url:a.baseUrl,api_key:a.apiKey,...o?{api_path:o}:{}}}function vn(e){const t=e?.settings||{},a=Number(t.temperature);return Number.isFinite(a)?{temperature:a}:{}}function yn(e,t=""){let a="",o="";try{const s=JSON.parse(e),c=/^(thinking|reasoning|reason|thought|cot|inner_thought)$/i.test(t),l=/^(chat|message|content|text|assistant|reply|response|output)$/i.test(t);c?o=s.thinking??s.reasoning??s.reasoning_content??s.reasoningContent??s.content??s.text??s.delta??"":(a=s.content??s.text??s.delta??"",o=s.thinking??s.reasoning??s.reasoning_content??s.reasoningContent??"")}catch{/^(thinking|reasoning|reason|thought|cot|inner_thought)$/i.test(t)?o=e:a=e}const i=/^tool_call$/i.test(t);let r=null;if(i)try{const s=JSON.parse(e);s.name&&(r={name:String(s.name),status:String(s.status||"done")})}catch{}return{text:ye(a),thinking:ye(o),toolCall:r}}async function Pt(e){const t=String(e?.sessionId||"").trim();if(t){try{const r=await fetch(`${S}/api/sessions/${encodeURIComponent(t)}`);if(r.ok)return t;if(r.status!==404)throw new Error(`校验会话失败（HTTP ${r.status}）`)}catch(r){throw String(r?.message||"").includes("HTTP"),r}e.sessionId=""}const a=await fetch(`${S}/api/sessions`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({title:String(e?.name||"新对话").trim()||"新对话",model:String(e?.settings?.model||n.globalSettings?.defaultModel||"echo").trim()||"echo",source_app:"yui_nook"})}),o=await a.json().catch(()=>({}));if(!a.ok)throw new Error(o.detail||`创建会话失败（HTTP ${a.status}）`);const i=String(o?.session?.id||"").trim();if(!i)throw new Error("创建会话失败：后端没有返回 session.id");return e.sessionId=i,k(120),i}async function wn(e,t,a,o="/api/chat"){let i=await fetch(`${S}${o}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify(t),...a?{signal:a}:{}});if(i.ok)return i;let r="";try{const s=await i.json();r=String(s?.detail||"").trim()}catch{}if(o==="/api/chat"&&i.status===404&&r.includes("会话不存在")){e.sessionId="";const s=await Pt(e);if(t.session_id=s,i=await fetch(`${S}${o}`,{method:"POST",headers:{"Content-Type":"application/json",Accept:"text/event-stream"},body:JSON.stringify(t),...a?{signal:a}:{}}),i.ok)return i}throw new Error(`HTTP ${i.status}`)}async function Xi(){const e=y()?.querySelector(".chat-input"),t=e?.value?.trim();if(!t||!n.currentRpRoomId)return;const a=b(n.currentContactId)||n.contacts[0],o=Gt();if(!a||!o)return;const i=!!a?.settings?.reasoning_visibility,r=`rp_u_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;Ct(n.currentRpMessages,{id:r,client_message_id:r,role:"user",text:t,content:t,time:q(),timestamp:new Date().toISOString(),created_at:new Date().toISOString()}),e.value="";const s="rp_ai_"+Date.now();n.currentRpMessages.push({id:s,role:"ai",text:"",content:"",time:"",created_at:new Date().toISOString(),typing:!0}),n.currentRpRoomId&&(n.rpMessages[n.currentRpRoomId]=n.currentRpMessages.map(G)),k(120),u(),N();const c={room_id:n.currentRpRoomId,agent_id:o.agent_id||a.id,content:t,client_message_id:r,...a.persona?{persona:a.persona}:{},...a.settings.model?{model:a.settings.model}:{},...vn(a),...bn(a)},l=new AbortController;n.streamingAbortController=l,u();let p="";try{const m=await wn(a,c,l.signal,"/api/rp/chat"),f=()=>n.currentRpMessages.findIndex(_=>_.id===s);n.currentRpMessages[f()]={id:s,role:"ai",text:"",time:q(),typing:!1,streaming:!0},u();const h=m.body.getReader(),v=new TextDecoder;let $="",I="",T="";for(;;){const{done:_,value:C}=await h.read();if(_)break;$+=v.decode(C,{stream:!0});const V=$.split(`
`);$=V.pop()??"";for(const oe of V){const E=oe.trim();if(!E){T="";continue}if(E.startsWith("event:")){T=E.slice(6).trim();continue}if(!E.startsWith("data:"))continue;const O=E.slice(5).trim();if(O==="[DONE]")continue;const B=yn(O,T);let K=B.text;const he=Ht(B.thinking,p,I),me=i?he:"";me&&I.length<jt&&(I=Nt(I,me)),K&&(p+=K);const ee=f();ee!==-1&&(n.currentRpMessages[ee]={id:s,role:"ai",text:p,content:p,...i&&I?{thinking:I}:{},time:q(),typing:!1,streaming:!0},u(),N())}}const x=n.currentRpMessages.findIndex(_=>_.id===s);x!==-1&&p.trim()?n.currentRpMessages[x]={...n.currentRpMessages[x],text:p,content:p,...i&&I?{thinking:I}:{},streaming:!1,typing:!1,time:q(),created_at:new Date().toISOString()}:x!==-1&&n.currentRpMessages.splice(x,1),n.streamingAbortController=null,await bt(o.agent_id||a.id,{silent:!0}),n.currentRpRoomId&&(n.rpMessages[n.currentRpRoomId]=n.currentRpMessages.map(G)),k(120),u(),N()}catch(m){const f=m.name==="AbortError",h=n.currentRpMessages.findIndex(v=>v.id===s);h!==-1&&(f&&!p.trim()?n.currentRpMessages.splice(h,1):n.currentRpMessages[h]={id:s,role:"ai",text:m.name==="AbortError"?p:`连接失败：${m.message}`,content:m.name==="AbortError"?p:`连接失败：${m.message}`,time:q(),created_at:new Date().toISOString(),typing:!1}),n.streamingAbortController=null,n.currentRpRoomId&&(n.rpMessages[n.currentRpRoomId]=n.currentRpMessages.map(G)),k(120),u()}}function qt(e=n.currentContactId){const t=b(e)||b(n.currentContactId);if(t){if(n.currentContactId=t.id,!Wt(t)){t.settings={...t.settings||{},ccEnabled:!1},n.toast="只有阿筝能切 Claude Code",u(),window.setTimeout(()=>{n.toast="",u()},1200);return}t.settings={...t.settings||{},ccEnabled:!t.settings?.ccEnabled},n.toast=t.settings.ccEnabled?"Claude Code 已接管这个窗口":"Claude Code 已关闭",k(120),u(),window.setTimeout(()=>{n.toast="",u()},1200)}}async function Sn(){const e=y()?.querySelector(".chat-input"),t=e?.value?.trim()||"",a=(n.chatAttachments||[]).map(Be).filter(Boolean);if(!t&&!a.length)return;const o=nn(t,a),i=b(n.currentContactId);if(!i)return;De();const r=`u_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;Ct(i.messages,{id:r,client_message_id:r,role:"user",text:t,content:t,attachments:a,time:q(),created_at:new Date().toISOString()}),i.lastMessage=an(t,a),i.lastTime="刚刚",e.value="",n.chatAttachments=[];const s="ai_"+Date.now();i.messages.push({id:s,role:"ai",text:"",content:"",time:"",created_at:new Date().toISOString(),typing:!0,source:"claude-code"}),ae(),k(120),u(),N();const c=new AbortController;n.streamingAbortController=c,u();try{const l=await fetch(`${S}/api/claude-code/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversation_key:`yui:${i.id}`,agent_id:i.id,content:o,client_message_id:r,reset:!1}),signal:c.signal}),p=await l.json().catch(()=>({}));if(!l.ok)throw new Error(p.detail||`HTTP ${l.status}`);const m=String(p.reply||"").trim(),f=p.user_message&&typeof p.user_message=="object"?Je(p.user_message,i.id):null,h=p.assistant_message&&typeof p.assistant_message=="object"?{...Je(p.assistant_message,i.id),source:"claude-code",provider:"claude-code"}:null,v=i.messages.findIndex(I=>I.id===r);v!==-1&&f&&(i.messages[v]=F({...f,content:t,text:t,attachments:a,client_message_id:r}));const $=i.messages.findIndex(I=>I.id===s);$!==-1&&m?i.messages[$]={...h?F(h):{},id:h?.id||s,role:"ai",text:m,content:m,source:"claude-code",provider:"claude-code",time:h?.time||q(),created_at:h?.created_at||new Date().toISOString(),typing:!1}:$!==-1&&i.messages.splice($,1),i.lastMessage=m||o,i.lastTime=q(),ae(),k(120),u(),N()}catch(l){const p=l.name==="AbortError";p||console.error("[cc chat] error:",l);const m=i.messages.findIndex(f=>f.id===s);if(m!==-1){const f=p?"":`Claude Code 连接失败：${l.message}`;f?i.messages[m]={id:s,role:"ai",text:f,content:f,source:"claude-code",provider:"claude-code",time:q(),created_at:new Date().toISOString(),typing:!1}:i.messages.splice(m,1)}ae(),k(120),u()}finally{n.streamingAbortController=null,u()}}async function $n(){const e=y()?.querySelector(".chat-input"),t=e?.value?.trim()||"",a=(n.chatAttachments||[]).map(Be).filter(Boolean);if(!t&&!a.length)return;const o=nn(t,a),i=b(n.currentContactId);if(!i)return;De();const r=`u_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;Ct(i.messages,{id:r,client_message_id:r,role:"user",text:t,content:t,attachments:a,time:q(),created_at:new Date().toISOString()}),i.lastMessage=an(t,a),i.lastTime="刚刚",e.value="",n.chatAttachments=[];const s="ai_"+Date.now();i.messages.push({id:s,role:"ai",text:"",content:"",time:"",created_at:new Date().toISOString(),typing:!0,source:"codex"}),ae(),k(120),u(),N();const c=new AbortController;n.streamingAbortController=c,u();try{const l=await fetch(`${S}/api/codex/chat`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({conversation_key:`yui:${i.id}`,agent_id:i.id,content:o,client_message_id:r,reset:!1}),signal:c.signal}),p=await l.json().catch(()=>({}));if(!l.ok)throw new Error(p.detail||`HTTP ${l.status}`);const m=String(p.reply||"").trim(),f=p.user_message&&typeof p.user_message=="object"?Je(p.user_message,i.id):null,h=p.assistant_message&&typeof p.assistant_message=="object"?{...Je(p.assistant_message,i.id),source:"codex",provider:"codex"}:null,v=i.messages.findIndex(I=>I.id===r);v!==-1&&f&&(i.messages[v]=F({...f,content:t,text:t,attachments:a,client_message_id:r}));const $=i.messages.findIndex(I=>I.id===s);$!==-1&&m?i.messages[$]={...h?F(h):{},id:h?.id||s,role:"ai",text:m,content:m,source:"codex",provider:"codex",time:h?.time||q(),created_at:h?.created_at||new Date().toISOString(),typing:!1}:$!==-1&&i.messages.splice($,1),i.lastMessage=m||o,i.lastTime=q(),ae(),k(120),u(),N()}catch(l){const p=l.name==="AbortError";p||console.error("[codex chat] error:",l);const m=i.messages.findIndex(f=>f.id===s);if(m!==-1){const f=p?"":`Codex 连接失败：${l.message}`;f?i.messages[m]={id:s,role:"ai",text:f,content:f,source:"codex",provider:"codex",time:q(),created_at:new Date().toISOString(),typing:!1}:i.messages.splice(m,1)}ae(),k(120),u()}finally{n.streamingAbortController=null,u()}}const He={},Aa=1500;async function Ta(e){const t=He[e];if(!t||!t.texts.length)return;const a=t.texts.splice(0);t.timer&&(clearTimeout(t.timer),t.timer=null),t.listener&&(y()?.querySelector(".chat-input")?.removeEventListener("input",t.listener),t.listener=null),delete He[e];const o=b(e);if(!o)return;const i=!!o?.settings?.reasoning_visibility;let r="";try{r=await Pt(o)}catch{return}const s=a.join(`
`),c=`u_${Date.now()}_${Math.random().toString(36).slice(2,8)}`,l="ai_"+Date.now();o.messages.push({id:l,role:"ai",text:"",content:"",time:"",created_at:new Date().toISOString(),typing:!0}),ae(),k(120),u(),N();let p=0,m=!1,f=null;const h=()=>{const E=y()?.querySelector(`#thinking-${l}`);if(!E)return;E.textContent=Ke(C),E.classList.add("open","thinking-active"),E.setAttribute("aria-hidden","false");const O=y()?.querySelector(`#cot-wrapper-${l}`);O&&O.removeAttribute("data-slow"),n.openThinkingIds[l]=!0},v=()=>{f===null&&(f=requestAnimationFrame(()=>{f=null,h()}))},$=()=>{f!==null&&(cancelAnimationFrame(f),f=null)},I=setInterval(()=>{if(!p)return;const E=y()?.querySelector(`#cot-wrapper-${l}`);E&&E.toggleAttribute("data-slow",Date.now()-p>8e3)},2e3),T={session_id:r,agent_id:o.id,content:s,client_message_id:c,...o.persona?{persona:o.persona}:{},...o.settings.model?{model:o.settings.model}:{},...vn(o),...bn(o)},x=new AbortController;n.streamingAbortController=x,u();let _="",C="",V=null,oe=!1;try{const E=await wn(o,T,x.signal),O=()=>o.messages.findIndex(rt=>rt.id===l);o.messages[O()]={id:l,role:"ai",text:"",content:"",time:q(),created_at:new Date().toISOString(),typing:!1,streaming:!0},u();const B=E.body.getReader(),K=new TextDecoder;let he="",me="";for(;;){const{done:rt,value:Ee}=await B.read();if(rt)break;he+=K.decode(Ee,{stream:!0});const st=he.split(`
`);he=st.pop()??"";let be=0;for(const Rt of st){const Pe=Rt.trim();if(!Pe){me="";continue}if(Pe.startsWith("event:")){me=Pe.slice(6).trim();continue}if(!Pe.startsWith("data:"))continue;const ct=Pe.slice(5).trim();if(ct==="[DONE]")continue;const te=yn(ct,me);let qe=te.text;const ut=Ht(te.thinking,_,C),Le=i?ut:"";if(Le){C.length<jt&&(C=Nt(C,Le)),p=Date.now();const re=O();re!==-1&&(o.messages[re]={id:l,role:"ai",text:_,thinking:C,time:q(),typing:!1,streaming:!0},m?v():(m=!0,n.openThinkingIds[l]=!0,u(),N()))}if(te.toolCall){const re=te.toolCall;V||(V=[]);const Ja=V.find(Wa=>Wa.name===re.name&&Wa.status!=="done");Ja?Ja.status=re.status:V.push({name:re.name,status:re.status});const Pn=O();Pn!==-1&&(o.messages[Pn]={...o.messages[Pn],toolCalls:V.slice(),streaming:!0},u())}if(qe){_+=qe;const re=O();re!==-1&&(o.messages[re]={...o.messages[re],text:_,content:_,time:q(),typing:!1,streaming:!0},oe?to(l,_,C):(oe=!0,u(),N()))}be+=1,be>=32&&(be=0,v(),await Vn())}}clearInterval(I),$(),n.streamingAbortController=null;const ee=O(),H=_.trim();o.lastMessage=H||"已处理",o.lastTime=q();const Te=y()?.querySelector(`#thinking-${l}`);Te&&Te.classList.remove("thinking-active");const it=y()?.querySelector(`#cot-wrapper-${l}`);it&&it.removeAttribute("data-slow"),i&&C&&delete n.openThinkingIds[l];const Fe=zn(H);ee!==-1&&Fe.length>1?(o.messages.splice(ee,1),u(),N(),await Bn(180),await jn(o,Fe,{startIndex:ee,thinking:i?C:"",toolCalls:V})):(ee!==-1&&H?o.messages[ee]={id:l,role:"ai",text:H,content:H,...i&&C?{thinking:C}:{},...V?{toolCalls:V}:{},time:q(),created_at:new Date().toISOString(),typing:!1}:ee!==-1&&o.messages.splice(ee,1),ae(),k(120),u(),N())}catch(E){clearInterval(I),$(),n.streamingAbortController=null;const O=E.name==="AbortError";O||console.error("[chat SSE] error:",E);const B=o.messages.findIndex(K=>K.id===l);if(B!==-1){const K=O?_.trim():`连接失败：${E.message}，请稍后再试。`;K?o.messages[B]={id:l,role:"ai",text:K,content:K,...i&&C?{thinking:C}:{},time:q(),created_at:new Date().toISOString(),typing:!1}:o.messages.splice(B,1)}O&&_&&(o.lastMessage=_,o.lastTime=q()),ae(),k(120),u()}}async function kn(){const e=y()?.querySelector(".chat-input"),t=e?.value?.trim()||"",a=(n.chatAttachments||[]).map(Be).filter(Boolean);if(!t&&!a.length)return;const o=nn(t,a),i=b(n.currentContactId);if(!i)return;De();let r="";try{r=await Pt(i)}catch{n.toast="无法创建会话，请稍后再试。",u(),window.setTimeout(()=>{n.toast="",u()},1500);return}const s=`u_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;Ct(i.messages,{id:s,client_message_id:s,session_id:r,agent_id:i.id,role:"user",text:t,content:t,attachments:a,time:q(),created_at:new Date().toISOString()}),i.lastMessage=an(t,a),i.lastTime="刚刚",e.value="",n.chatAttachments=[],ae(),k(120),u(),N(),He[i.id]||(He[i.id]={texts:[],timer:null,listener:null});const c=He[i.id];c.texts.push(o),c.timer&&clearTimeout(c.timer),c.listener||(c.listener=()=>{const l=He[i.id];l?.texts.length&&(clearTimeout(l.timer),l.timer=setTimeout(()=>Ta(i.id),Aa))},e.addEventListener("input",c.listener)),c.timer=setTimeout(()=>Ta(i.id),Aa)}async function Gi(e){const t=b(n.currentContactId);if(!t)return;De();const a=!!t?.settings?.reasoning_visibility,o=t.messages.findIndex(l=>l.id===e);if(o===-1||t.messages[o].role!=="ai")return;let i="";try{i=await Pt(t)}catch(l){console.error("[session] create failed:",l),n.toast=`无法创建会话：${l.message}`,u(),window.setTimeout(()=>{n.toast="",u()},1500);return}t.messages[o]={...t.messages[o],typing:!0,text:"",streaming:!1},u();const r=[...t.messages].reverse().find(l=>l.role==="user");if(!r)return;const s={session_id:i,agent_id:t.id,content:r.text,...t.persona?{persona:t.persona}:{},...t.settings.model?{model:t.settings.model}:{},...vn(t),...bn(t)},c=new AbortController;n.streamingAbortController=c;try{const l=await wn(t,s,c.signal);t.messages[o]={...t.messages[o],typing:!1,text:"",streaming:!0},u();const p=l.body.getReader(),m=new TextDecoder;let f="",h="",v="",$=null;const I=e;let T="",x=0,_=!1,C=null;const V=()=>{const H=y()?.querySelector(`#thinking-${I}`);if(!H)return;H.textContent=Ke(v),H.classList.add("open","thinking-active"),H.setAttribute("aria-hidden","false");const Te=y()?.querySelector(`#cot-wrapper-${I}`);Te&&Te.removeAttribute("data-slow"),n.openThinkingIds[I]=!0},oe=()=>{C===null&&(C=requestAnimationFrame(()=>{C=null,V()}))},E=()=>{C!==null&&(cancelAnimationFrame(C),C=null)},O=setInterval(()=>{if(!x)return;const H=y()?.querySelector(`#cot-wrapper-${I}`);H&&H.toggleAttribute("data-slow",Date.now()-x>8e3)},2e3);for(;;){const{done:H,value:Te}=await p.read();if(H)break;f+=m.decode(Te,{stream:!0});const it=f.split(`
`);f=it.pop()??"";let Fe=0;for(const rt of it){const Ee=rt.trim();if(!Ee){T="";continue}if(Ee.startsWith("event:")){T=Ee.slice(6).trim();continue}if(!Ee.startsWith("data:"))continue;const st=Ee.slice(5).trim();if(st==="[DONE]")continue;const be=yn(st,T);let Rt=be.text;const Pe=Ht(be.thinking,h,v),ct=a?Pe:"";if(ct){v.length<jt&&(v=Nt(v,ct)),x=Date.now();const te=t.messages.findIndex(qe=>qe.id===I);te!==-1&&(t.messages[te]={...t.messages[te],thinking:v,streaming:!0},_?oe():(_=!0,n.openThinkingIds[I]=!0,u()))}if(be.toolCall){const te=be.toolCall;$||($=[]);const qe=$.find(Le=>Le.name===te.name&&Le.status!=="done");qe?qe.status=te.status:$.push({name:te.name,status:te.status});const ut=t.messages.findIndex(Le=>Le.id===I);ut!==-1&&(t.messages[ut]={...t.messages[ut],toolCalls:$.slice(),streaming:!0},u())}Rt&&(h+=Rt),Fe+=1,Fe>=32&&(Fe=0,oe(),await Vn())}}clearInterval(O),E(),n.streamingAbortController=null;const B=t.messages.findIndex(H=>H.id===I),K=h.trim(),he=y()?.querySelector(`#thinking-${I}`);he&&he.classList.remove("thinking-active");const me=y()?.querySelector(`#cot-wrapper-${I}`);me&&me.removeAttribute("data-slow"),a&&v&&delete n.openThinkingIds[I];const ee=zn(K);B!==-1&&ee.length>1?(t.messages.splice(B,1),u(),await Bn(180),await jn(t,ee,{startIndex:B,thinking:a?v:"",toolCalls:$})):(B!==-1&&K?t.messages[B]={...t.messages[B],text:K,...a&&v?{thinking:v}:{},...$?{toolCalls:$}:{},streaming:!1}:B!==-1&&t.messages.splice(B,1),u())}catch(l){clearInterval(_rerollSlowTimer),_cancelRerollFlush(),n.streamingAbortController=null;const p=l.name==="AbortError";p||console.error("[reroll SSE] error:",l);const m=t.messages.findIndex(f=>f.id===rerollId);if(m!==-1){const f=p?fullText.trim():`重试失败：${l.message}`;f?t.messages[m]={...t.messages[m],text:f,...fullThinking?{thinking:fullThinking}:{},...fullToolCalls?{toolCalls:fullToolCalls}:{},streaming:!1}:t.messages.splice(m,1)}u()}}function N(){requestAnimationFrame(()=>{const e=y()?.querySelector(".messages-panel");e&&(e.scrollTop=e.scrollHeight)})}function Ji(){const e=b(n.currentContactId)||n.contacts[0]||{},t=n.currentView==="room"?Ut(e).map(Vo).join(""):"";return`
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
    `}const Ea=window.openPage;typeof Ea=="function"&&(window.openPage=function(t,a){Ea(t,a),t==="page-chat"&&Qn()});const Wi=[{id:"openai",name:"OpenAI",enabled:!0,baseUrl:"https://api.openai.com/v1",apiPath:"",apiKey:"",models:["gpt-5.4","gpt-5.4-mini","gpt-4.1-mini"],defaultModel:"gpt-5.4"},{id:"openrouter",name:"OpenRouter",enabled:!0,baseUrl:"https://openrouter.ai/api/v1",apiPath:"",apiKey:"",models:["openai/gpt-5","anthropic/claude-sonnet-4.5","anthropic/claude-opus-4.1","anthropic/claude-3.7-sonnet"],defaultModel:"openai/gpt-5"},{id:"gemini",name:"Gemini",enabled:!0,baseUrl:"https://generativelanguage.googleapis.com/v1beta/openai",apiPath:"",apiKey:"",models:["gemini-2.5-pro","gemini-2.5-flash"],defaultModel:"gemini-2.5-pro"},{id:"deepseek",name:"DeepSeek",enabled:!1,baseUrl:"https://api.deepseek.com/v1",apiPath:"",apiKey:"",models:["deepseek-chat","deepseek-reasoner"],defaultModel:"deepseek-chat"},{id:"qwen",name:"阿里云千问",enabled:!1,baseUrl:"https://dashscope.aliyuncs.com/compatible-mode/v1",apiPath:"",apiKey:"",models:["qwen-max","qwen-plus","qwen-turbo"],defaultModel:"qwen-max"},{id:"zhipu",name:"智谱",enabled:!1,baseUrl:"https://open.bigmodel.cn/api/paas/v4",apiPath:"",apiKey:"",models:["glm-4.5","glm-4-air"],defaultModel:"glm-4.5"},{id:"siliconflow",name:"SiliconFlow",enabled:!1,baseUrl:"https://api.siliconflow.cn/v1",apiPath:"",apiKey:"",models:["deepseek-ai/DeepSeek-V3","deepseek-ai/DeepSeek-R1","Qwen/Qwen2.5-72B-Instruct"],defaultModel:"deepseek-ai/DeepSeek-V3"}],Pa={openai:["gpt-5.4","gpt-5.4-mini","gpt-4.1","gpt-4.1-mini","o4-mini"],openrouter:["openai/gpt-5","openai/gpt-4.1","anthropic/claude-sonnet-4.5","anthropic/claude-opus-4.1","anthropic/claude-3.7-sonnet","anthropic/claude-3.5-sonnet","anthropic/claude-3.5-haiku","google/gemini-2.5-pro","google/gemini-2.5-flash","deepseek/deepseek-chat","deepseek/deepseek-r1","qwen/qwen-max"],aggregate:["openai/gpt-5","gpt-5","gpt-4.1","anthropic/claude-sonnet-4.5","anthropic/claude-opus-4.1","anthropic/claude-3.7-sonnet","claude-sonnet-4-5","claude-opus-4-1","claude-3-7-sonnet-latest","google/gemini-2.5-pro","google/gemini-2.5-flash","deepseek/deepseek-chat","qwen/qwen-max"],anthropic:["claude-opus-4-5","claude-sonnet-4-5","claude-haiku-4-5","claude-opus-4-1","claude-sonnet-4-0","claude-3-7-sonnet-latest","claude-3-5-haiku-latest"],gemini:["gemini-2.5-pro","gemini-2.5-flash","gemini-2.0-flash","gemini-1.5-pro"],deepseek:["deepseek-chat","deepseek-reasoner"],zhipu:["glm-4.5","glm-4-air","glm-4-flash"],siliconflow:["deepseek-ai/DeepSeek-V3","deepseek-ai/DeepSeek-R1","Qwen/Qwen2.5-72B-Instruct","Qwen/Qwen2.5-32B-Instruct","THUDM/GLM-4-9B-0414"]},In=new Set(["aiInterface","defaultModels","modelSlot","providerCatalog","providerEditor","promptEditor","themeSettings","accountSettings","memoryService","backendSync","exportSettings","mcpLibrary"]),Zi=mt,er=Qt,tr=Yt,qa=sn;n.viewStack=n.viewStack||[],n.activeModelSlot=n.activeModelSlot||"chat",n.activeModelSlotContext=n.activeModelSlotContext||"global",n.activeModelProviderId=n.activeModelProviderId||"",n.providerDraftId=n.providerDraftId||null,n.providerAdvancedOpen=!!n.providerAdvancedOpen,n.providerEditorDraft=n.providerEditorDraft||null,n.providerModelMenuOpen=!!n.providerModelMenuOpen,n.providerModelSyncingId=n.providerModelSyncingId||"",n.providerModelSyncStatus=n.providerModelSyncStatus&&typeof n.providerModelSyncStatus=="object"?n.providerModelSyncStatus:{},n.providerKeyVisible=!!n.providerKeyVisible,n.modelSlotMenuOpen=!!n.modelSlotMenuOpen,n.providerSearch=n.providerSearch||"",n.activePromptSlot=n.activePromptSlot||"summary";function U(e){const t=String(e||"").trim();return t?t==="ocr"?"vision":t==="title"?"summary":t:"chat"}n.aiSettingsSaving=!1,n.memoryServiceEntries=Array.isArray(n.memoryServiceEntries)?n.memoryServiceEntries:[],n.memoryServiceLoading=!!n.memoryServiceLoading,n.slotVendorGroupOpen=n.slotVendorGroupOpen&&typeof n.slotVendorGroupOpen=="object"?n.slotVendorGroupOpen:{},n.providerModelVendorOpen=n.providerModelVendorOpen&&typeof n.providerModelVendorOpen=="object"?n.providerModelVendorOpen:{};function nr(){return"/chat/completions"}function Ze(e,{allowEmpty:t=!1}={}){const a=String(e||"").trim();return a?a.startsWith("/")?a:`/${a}`:t?"":nr()}function ar(e={}){return Ze(e.apiPath||e.api_path||"",{allowEmpty:!1})}function et(e={}){const t=Ze(e.apiPath||e.api_path||"",{allowEmpty:!0});return{...e,baseUrl:e.baseUrl||e.base_url||"",apiKey:e.apiKey||e.api_key||"",apiPath:t,api_path:t,models:J(e.models),defaultModel:L(e.defaultModel||e.default_model||"")}}function L(e){if(typeof e!="string")return"";const t=e.trim().replace(/\s+/g," ");return!t||t.length>180||/[<>]/.test(t)||/<\/?[a-z][\s\S]*>/i.test(t)||/<!doctype|<html|<\/div|<\/body/i.test(t)||/[\u0000-\u001f\u007f]/.test(t)?"":t}function J(e){const t=Array.isArray(e)?e:[],a=new Set,o=[];return t.forEach(i=>{const r=typeof i=="string"?i:i&&typeof i=="object"?i.id||i.name||i.model||i.slug:"",s=L(r),c=s.toLowerCase();s&&!a.has(c)&&(a.add(c),o.push(s))}),o}function _n(e={}){const t=String(e.id||"").toLowerCase(),a=String(e.name||"").toLowerCase(),o=String(e.baseUrl||e.base_url||"").toLowerCase();return t.includes("openrouter")||a.includes("openrouter")||o.includes("openrouter.ai")?"openrouter":t.includes("jiushi")||a.includes("玖时")||o.includes("jiushi.xin")?"aggregate":t.includes("silicon")||a.includes("silicon")||o.includes("siliconflow")?"siliconflow":t.includes("deepseek")||a.includes("deepseek")||o.includes("deepseek")?"deepseek":t.includes("anthropic")||t.includes("claude")||a.includes("anthropic")||a.includes("claude")||o.includes("anthropic.com")?"anthropic":t.includes("gemini")||a.includes("gemini")||o.includes("generativelanguage")?"gemini":t.includes("zhipu")||a.includes("智谱")||o.includes("bigmodel")?"zhipu":t.includes("openai")||a.includes("openai")||o.includes("openai.com")?"openai":t||"custom"}function or(e={}){const t=_n(e);if(t==="aggregate"||t==="openrouter")return!0;if(["openai","anthropic","gemini","deepseek","zhipu","siliconflow"].includes(t))return!1;const a=String(e.baseUrl||e.base_url||"").toLowerCase();return a?!/(openai\.com|anthropic\.com|generativelanguage|deepseek\.com|bigmodel\.cn|siliconflow\.cn)/.test(a):!1}function Mn(e={}){const t=_n(e),a=Pa[t]||[],o=or(e)?Pa.aggregate:[];return J([...a,...o])}function ir(e=""){const t=String(e||"").trim();if(!t)return"";const a=t.slice(-4);return`${t.startsWith("sk-")?"sk-":""}••••${a}`}function _e(e,t,a){const o=String(e||n.providerDraftId||"current");n.providerModelSyncStatus[o]={type:t,message:a}}function rr(e,t="模型"){const a=L(e);if(!a)throw new Error(`${t} 不是合法模型 ID，不能包含 HTML、控制字符或过长内容`);return a}function xn(e={}){const t={...e||{}};return t.model&&(t.model=L(t.model)),t.providerId&&(t.providerId=String(t.providerId||"").trim()),t}function Me(){return{providers:Wi.map(e=>et({...e,models:[...e.models]})),defaultModels:{chat:{providerId:"openai",model:"gpt-5.4",useChatModel:!1},summary:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},vision:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},translate:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},consciousness:{providerId:"openai",model:"gpt-5.4-mini",useChatModel:!1},voice:{provider:"",service_url:"",base_url:"",voice_id:"",speaker:"",emotion:"",speed:1,format:""}},defaultPrompts:{chat:"Respond naturally, stay consistent with the current role and context, and keep the tone warm and clear.",summary:"Write a concise conversation summary with key facts, action items, and follow-ups.",translate:"Translate the content accurately while preserving tone and formatting when possible.",vision:"Extract visible text from the image and explain key visual information clearly.",consciousness:"Review recent context, infer useful next-step thoughts, and keep the result concise and actionable."},mcpLibrary:eo()}}function z(){if(!n.globalSettings.aiSettings)n.globalSettings.aiSettings=Me();else{const e=n.globalSettings.aiSettings;e.defaultModels=e.defaultModels||{},e.defaultPrompts=e.defaultPrompts||{},e.providers=Array.isArray(e.providers)?e.providers:[];const t=new Map(e.providers.map(a=>[a.id,et(a)]));Me().providers.forEach(a=>{t.has(a.id)||t.set(a.id,a)}),e.providers=[...t.values()],e.defaultModels.ocr&&!e.defaultModels.vision&&(e.defaultModels.vision={...e.defaultModels.ocr}),e.defaultPrompts.ocr&&!e.defaultPrompts.vision&&(e.defaultPrompts.vision=e.defaultPrompts.ocr),delete e.defaultModels.ocr,delete e.defaultPrompts.ocr,delete e.defaultModels.title,delete e.defaultPrompts.title,Object.entries(Me().defaultModels).forEach(([a,o])=>{e.defaultModels[a]||(e.defaultModels[a]={...o}),a!=="voice"&&(e.defaultModels[a]=xn(e.defaultModels[a]))}),Object.entries(Me().defaultPrompts).forEach(([a,o])=>{typeof e.defaultPrompts[a]!="string"&&(e.defaultPrompts[a]=o)})}return n.globalSettings.aiSettings}function sr(e={}){const t=Me(),a={...e||{}};a.defaultModels?.ocr&&!a.defaultModels?.vision&&(a.defaultModels={...a.defaultModels,vision:a.defaultModels.ocr}),a.defaultPrompts?.ocr&&!a.defaultPrompts?.vision&&(a.defaultPrompts={...a.defaultPrompts,vision:a.defaultPrompts.ocr});const o={providers:t.providers,defaultModels:{...t.defaultModels},defaultPrompts:{...t.defaultPrompts},mcpLibrary:{...t.mcpLibrary,tools:[...t.mcpLibrary?.tools||[]]}};if(Array.isArray(a.providers)&&a.providers.length){const i=new Map(t.providers.map(r=>[r.id,r]));a.providers.forEach(r=>{const s=et(r);i.set(s.id,{...i.get(s.id),...s,models:Array.isArray(s.models)&&s.models.length?s.models:i.get(s.id)?.models||[]})}),o.providers=[...i.values()]}a.defaultModels&&Object.keys(o.defaultModels).forEach(i=>{if(a.defaultModels[i]){const r={...o.defaultModels[i],...a.defaultModels[i]};o.defaultModels[i]=i==="voice"?r:xn(r)}}),a.defaultPrompts&&Object.keys(o.defaultPrompts).forEach(i=>{typeof a.defaultPrompts[i]=="string"&&(o.defaultPrompts[i]=a.defaultPrompts[i])}),a.mcpLibrary&&Array.isArray(a.mcpLibrary.tools)&&(o.mcpLibrary={...o.mcpLibrary,...a.mcpLibrary,tools:a.mcpLibrary.tools.map(fe)}),n.globalSettings.aiSettings=o,typeof a.consciousnessLoop=="boolean"&&(n.globalSettings.consciousnessLoop=a.consciousnessLoop),Lt()}function Lt(){const e=z(),t=e.defaultModels.chat,a=e.providers.find(o=>o.id===t.providerId);n.globalSettings.defaultModel=L(t.model)||Me().defaultModels.chat.model,n.globalSettings.provider=a?.name||"OpenAI"}function W(e){return z().providers.find(t=>t.id===e)}function Cn(e=n.providerDraftId){const t=et(W(e)||{id:e||`custom_${Date.now()}`,name:"",enabled:!0,baseUrl:"",apiPath:"",apiKey:"",models:[],defaultModel:""}),a=J(t.models),o=J([...a,...Mn(t)]).map(tt);return{...t,models:a,_allModels:o,_selectedModelIds:new Set(a),_apiKeyDirty:!1}}function R(){return(!n.providerEditorDraft||n.providerEditorDraft.id!==n.providerDraftId)&&(n.providerEditorDraft=Cn()),n.providerEditorDraft}function La(e="",t=[]){const a=String(e||"").trim().toLowerCase(),o=J(t);return a?o.filter(i=>String(i||"").toLowerCase().includes(a)):o}function Da(e){const t=String(e||"").toLowerCase();return/deepseek/.test(t)?"DeepSeek":/\bglm\b|chatglm/.test(t)?"GLM":/\bqwen\b|qwq/.test(t)?"Qwen":/\bgpt[-\d]|^gpt|^o[134][-\d]|text-davinci|text-curie/.test(t)?"OpenAI":/claude/.test(t)?"Anthropic":/gemini|gemma/.test(t)?"Google":/\bllama\b|meta-llama/.test(t)?"Meta":/mistral|mixtral|codestral/.test(t)?"Mistral":/\byi[-/_]/.test(t)?"01.AI":/moonshot|kimi/.test(t)?"Moonshot":/hunyuan/.test(t)?"Hunyuan":/ernie|wenxin/.test(t)?"ERNIE":/doubao/.test(t)?"Doubao":/baichuan/.test(t)?"Baichuan":/spark/.test(t)?"Spark":/internlm/.test(t)?"InternLM":"Other"}function Oa(e){const t=String(e||"").toLowerCase(),a=["chat","text"];return/vl\b|vision|visual|\bvision\b|-v\d|\bimg\b/.test(t)&&a.push("vision"),/reason|r1\b|think\b|cot\b/.test(t)&&a.push("reasoning"),/image|draw|flux|paint|artist|diffusion/.test(t)&&a.push("image"),a.push("tools"),a}function tt(e){const t=String(e||"").trim();return{id:t,name:t,vendor:Da(t),capabilities:Oa(t)}}const cr={chat:"瀵硅瘽",text:"鏂囨湰",reasoning:"鎺ㄧ悊",tools:"宸ュ叿璋冪敤",vision:"瑙嗚",image:"鐢熷浘"},ur=["reasoning","tools","vision","image"],lr={reasoning:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M5 .5A3 3 0 0 0 2.8 5.9l.2.3V8h4V6.2l.2-.3A3 3 0 0 0 5 .5zm-1.2 8h2.4v.5c0 .28-.22.5-.5.5H4.3a.5.5 0 0 1-.5-.5V8.5z"/></svg>',tools:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path d="M7.5 1a2 2 0 0 0-1.86 2.73L1.2 8.16a.6.6 0 0 0 .84.84l4.43-4.44A2 2 0 1 0 7.5 1zm0 3a1 1 0 1 1 0-2 1 1 0 0 1 0 2z"/></svg>',vision:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M5 2C2.5 2 .8 5 .8 5S2.5 8 5 8s4.2-3 4.2-3S7.5 2 5 2zm0 4.5A1.5 1.5 0 1 1 5 3.5a1.5 1.5 0 0 1 0 3z"/></svg>',image:'<svg width="10" height="10" viewBox="0 0 10 10" fill="currentColor" aria-hidden="true"><path fill-rule="evenodd" d="M1.5 1A.5.5 0 0 0 1 1.5v7a.5.5 0 0 0 .5.5h7a.5.5 0 0 0 .5-.5v-7A.5.5 0 0 0 8.5 1h-7zM2 8l2-2.5 1.3 1.7 1.7-2.2L9 8H2zm.8-4.3a.7.7 0 1 0 1.4 0 .7.7 0 0 0-1.4 0z"/></svg>'};function dr(e){return(Array.isArray(e?.capabilities)?e.capabilities:Oa(e?.name||"")).filter(a=>ur.includes(a)).map(a=>`<span class="model-cap-badge cap-${a}" title="${cr[a]||a}">${lr[a]||a}</span>`).join("")}function Ra(e="",t=[]){const a=String(e||"").trim();return!Array.isArray(t)||!t.length?"还没有已同步模型，仍可手动输入并保存。":a?t.some(i=>String(i).toLowerCase()===a.toLowerCase())?"已匹配到已同步列表中的模型。":"当前模型不在已同步列表中，可继续手动保存。":`已同步 ${t.length} 个模型，可搜索或展开列表选择。`}function An(e="",t=[]){const a=String(e||"").trim();return!Array.isArray(t)||!t.length?"当前供应商还没有同步模型，可切换供应商或先同步。":a?t.some(i=>String(i).toLowerCase()===a.toLowerCase())?"已匹配到当前供应商模型。":"当前输入不在同步列表中。":`已同步 ${t.length} 个模型，可搜索或展开列表选择。`}function xe(){const e=R(),t=document.getElementById("provider-default-model-input"),a=document.getElementById("provider-default-model-menu"),o=document.getElementById("provider-default-model-hint");if(!a||!o)return;const i=t?.value||e.defaultModel||"",r=J([...Array.isArray(e.models)?e.models:[],...Array.isArray(e._allModels)?e._allModels.map(c=>c?.id||c?.name||""):[]]),s=La(i,r);if(o.textContent=Ra(i,r),!n.providerModelMenuOpen){a.innerHTML="",a.classList.remove("open");return}a.classList.add("open"),a.innerHTML=s.length?s.map((c,l)=>`
          <button class="provider-model-option ${String(c).toLowerCase()===String(i).trim().toLowerCase()?"active":""}" data-action="pick-provider-default-model" data-model-index="${l}" type="button">
            <span>${d(c)}</span>
            ${String(c).toLowerCase()===String(i).trim().toLowerCase()?"<em>已选</em>":""}
          </button>
        `).join(""):'<div class="provider-model-empty">没有获取到模型，仍可手动输入保存。</div>'}function A(e){return z().defaultModels[U(e)]}function pr(){const e=n.activeModelSlot,t=n.activeModelSlotContext==="contact",a=b(n.currentContactId)||n.contacts[0],o=t?{providerId:a?.settings?.modelProviderId||n.activeModelProviderId||A("chat")?.providerId||"openai",model:e==="consciousness"?a?.settings?.loopModel||"":a?.settings?.model||""}:Dt(e),i=W(o?.providerId)||W(A("chat")?.providerId);return{slot:o,provider:i,models:i?.models||[]}}function nt(){const e=document.getElementById("model-slot-menu"),t=document.getElementById("model-slot-hint"),a=document.getElementById("model-slot-input");if(!e||!t)return;const{slot:o,models:i}=pr(),r=a?.value||o?.model||"";t.textContent=An(r,J(i)),e.innerHTML="",e.classList.remove("open")}function Dt(e){return A(U(e))}function Ne(e){const t=U(e);return{chat:"聊天模型",summary:"摘要模型",vision:"Vision 模型",translate:"翻译模型",consciousness:"意识循环模型",voice:"语音模型"}[t]||t}function Ot(e){const t=U(e);return{chat:"全局默认使用的聊天模型。",summary:"用于生成对话摘要，推荐选择便宜且稳定的模型。",vision:"用于识图、OCR 与截图分析的统一入口。",translate:"用于翻译消息内容，推荐选择速度快的模型。",consciousness:"用于意识循环、主动思考与相关后台能力。",voice:"用于文本转语音，读取语音服务地址与 voice ID。"}[t]||""}function Va(e){const t=U(e),a=Dt(t);if(t==="voice"){if(!a)return"未设置";const i=a.provider||"语音服务",r=a.voice_id||a.voiceId||"未设置";return`${i} / ${r}`}const o=W(a?.providerId);return a?`${o?.name||"未设置"} / ${a.model||"未设置"}`:"未设置"}function mr(e){return z().defaultPrompts?.[U(e)]||""}function fr(e){const t=U(e);return{chat:g("comment"),summary:g("file"),vision:g("search"),translate:g("chatArrow"),consciousness:g("history"),voice:g("mic")}[t]||g("file")}function gr(e){const t=U(e);return t!=="chat"&&t!=="voice"}function hr(e){return`
      <article class="default-model-card">
        <div class="default-model-head">
          <div class="default-model-icon">${fr(e)}</div>
          <div class="default-model-copy">
            <strong>${d(Ne(e))}</strong>
            <p>${d(Ot(e))}</p>
          </div>
          ${gr(e)?`<button class="model-gear-btn" data-action="open-prompt-editor" data-slot="${e}" aria-label="提示词设置">${g("settings")}</button>`:'<span class="header-spacer"></span>'}
        </div>
        <button class="model-value-pill" data-action="open-model-slot" data-slot="${e}">
          <span class="model-value-badge">使</span>
          <span>${d(Va(e))}</span>
        </button>
      </article>
    `}function br(){const e=U(n.activePromptSlot),t=mr(e);return`
      <section class="settings-page page-block ai-settings-page ai-prompt-page">
        <div class="settings-group glass-frost ai-panel ai-form-group">
          <h3>${d(Ne(e))} 提示词</h3>
          <p class="section-eyebrow">用于定义这个能力位的默认提示词模板，后续接入对应后端任务时会直接使用这里的内容。</p>
          <textarea id="slot-prompt-input" class="ai-textarea ai-prompt-textarea" placeholder="在这里输入默认提示词">${d(t)}</textarea>
          <p class="section-eyebrow">变量位后续可以继续扩展，目前先支持按能力位单独保存。</p>
        </div>
        <div class="settings-group glass-frost ai-panel ai-prompt-actions">
          <button class="ghost-action prompt-reset-btn" data-action="reset-slot-prompt" data-slot="${e}">重置为默认</button>
          <button class="bottom-tab active prompt-save-btn" data-action="save-slot-prompt" data-slot="${e}">保存</button>
        </div>
      </section>
    `}function vr(){const e=[{id:"奶油粉",key:"rose",desc:"柔和粉白"},{id:"云雾灰",key:"mist",desc:"冷淡浅灰"},{id:"奶油杏",key:"cream",desc:"暖调米白"}],t=[{id:"windowsill",key:"windowsill",name:"窗台",desc:"鼠尾草·陶土·亚麻 · 冷静工具感"},{id:"tape",key:"tape",name:"磁带",desc:"磨砂玻璃·钓色·等宽字 · 软件诚实"}],a=n.globalSettings.theme,o=Ln.includes(a);return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>全局配色</h3>
          <p class="section-eyebrow">首页、列表、设置页的底色调。</p>
          <div class="theme-choice-list">
            ${e.map(i=>`
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
            ${t.map(i=>`
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
    `}function yr(){const e=n.accountProfile||{};return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>我的账号</h3>
          ${M("头像","更换头像","open-account-avatar")}
          ${M("昵称",e.nickname||"小酒","open-account-nickname")}
          ${M("个性签名",e.signature||"管理个人资料与基础偏好","open-account-signature")}
          <input id="account-avatar-file" class="moment-image-input" type="file" accept="image/*" />
        </div>
      </section>
    `}function wr(e){const t=Math.max(0,Math.min(100,Number(e)||0)),a=t>60?"#c9908a":t>30?"#c8a07a":"#b0b0b8";return`<span style="display:inline-flex;align-items:center;gap:4px;font-size:10px;color:${a};">
          <span style="display:inline-block;width:${Math.round(t*.36)}px;max-width:36px;min-width:2px;height:3px;border-radius:2px;background:${a};"></span>
          ${t>0?`热度 ${t}`:""}
        </span>`}function Sr(){const e=b(n.currentContactId)||n.contacts[0],t=Array.isArray(n.memoryServiceEntries)?n.memoryServiceEntries:[],a=Array.isArray(n.memoryCandidates)?n.memoryCandidates:[],o=n.memoryServiceSort||"updated_at",i=[{key:"updated_at",label:"最新"},{key:"importance",label:"最重要"},{key:"temperature",label:"有温度"}];return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>记忆服务</h3>
          <p class="section-eyebrow">当前联系人：${d(e?.name||"未命名")}。这里直接读写后端 memories，不再以本地假数据为准。</p>
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
          ${t.map(r=>{const s=r.compressed_content||r.raw_content||r.content||"未命名记忆",c=r.importance??3,l=r.temperature??0,p="★".repeat(c)+"☆".repeat(5-c);return`
            <div class="theme-choice-item active" style="cursor:default; display:block;">
              <div class="theme-choice-copy" style="display:block;">
                <strong>${d(s)}</strong>
                <em style="display:flex;align-items:center;gap:8px;flex-wrap:wrap;margin-top:3px;">
                  <span>${d(r.category||"")}</span>
                  <span style="color:#c9908a;">${p}</span>
                  ${wr(l)}
                </em>
                ${r.expires_at?`<em>过期：${d(String(r.expires_at))}</em>`:""}
              </div>
              <div class="ai-inline-actions" style="margin-top:10px;">
                <button class="ghost-action" data-action="memory-service-edit" data-memory-id="${d(String(r.id||""))}">编辑</button>
                <button class="ghost-action" data-action="memory-service-delete" data-memory-id="${d(String(r.id||""))}">删除</button>
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
    `}function Tn(){return String(n.currentContactId||b(n.currentContactId)?.id||"default").trim()||"default"}async function Ce(e=Tn(),{silent:t=!0}={}){const a=String(e||"").trim();if(a){n.memoryServiceLoading=!0,u();try{const o=n.memoryServiceSort||"updated_at",i=new URLSearchParams({agent_id:a,sort_by:o,order:"desc",limit:"100"}),[r,s]=await Promise.all([fetch(`${S}/api/memories?${i.toString()}`),fetch(`${S}/api/consciousness/memory-candidates?agent_id=${encodeURIComponent(a)}&limit=20`)]);if(!r.ok)throw new Error(`HTTP ${r.status}`);const c=await r.json().catch(()=>({}));if(n.memoryServiceEntries=Array.isArray(c?.memories)?c.memories:[],s.ok){const l=await s.json().catch(()=>({}));n.memoryCandidates=Array.isArray(l?.candidates)?l.candidates:[]}}catch(o){console.warn("[memory service] load failed",o),t||(n.toast="记忆加载失败",window.setTimeout(()=>{n.toast="",u()},1200))}finally{n.memoryServiceLoading=!1,u()}}}async function $r(e){const t=Tn();try{const a=await fetch(`${S}/api/consciousness/memory-candidates/${encodeURIComponent(e)}/promote?agent_id=${encodeURIComponent(t)}`,{method:"POST",headers:{"Content-Type":"application/json"},body:"{}"});if(!a.ok)throw new Error(`HTTP ${a.status}`);n.memoryCandidates=(n.memoryCandidates||[]).filter(o=>String(o.id)!==String(e)),n.toast="✓ 已采纳为正式记忆",window.setTimeout(()=>{n.toast="",u()},1800),await Ce(t,{silent:!0})}catch(a){console.warn("[memory] promote failed",a)}}async function kr(e){try{const t=await fetch(`${S}/api/consciousness/memory-candidates/${encodeURIComponent(e)}`,{method:"DELETE"});if(!t.ok)throw new Error(`HTTP ${t.status}`);n.memoryCandidates=(n.memoryCandidates||[]).filter(a=>String(a.id)!==String(e)),u()}catch(t){console.warn("[memory] dismiss failed",t)}}function Ba(e=null){const t=e||{},a=window.prompt("记忆内容",String(t.raw_content||t.content||"").trim());if(a===null)return null;const o=window.prompt("分层 / category（core_profile / recent_pending / deep / ephemeral）",String(t.category||"recent_pending"));if(o===null)return null;const i=window.prompt("可见范围（private / shared / public）",String(t.visibility||"private"));if(i===null)return null;const r=window.prompt("重要度（1-5）",String(t.importance??3));if(r===null)return null;const s=window.prompt("过期时间 ISO（可留空）",String(t.expires_at||""));return s===null?null:{agent_id:Tn(),content:String(a||"").trim(),raw_content:String(a||"").trim(),category:String(o||"").trim()||"recent_pending",visibility:String(i||"").trim()||"private",importance:Math.max(1,Math.min(5,Number(r)||3)),expires_at:String(s||"").trim()||null}}async function Ir(){const e=Ba();if(!e||!e.content)return;const t=await fetch(`${S}/api/memories`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),a=await t.json().catch(()=>({}));if(!t.ok)throw new Error(a?.detail||`HTTP ${t.status}`)}async function _r(e){const t=n.memoryServiceEntries.find(r=>String(r.id)===String(e));if(!t)return;const a=Ba(t);if(!a||!a.content)return;const o=await fetch(`${S}/api/memories/${encodeURIComponent(e)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(a)}),i=await o.json().catch(()=>({}));if(!o.ok)throw new Error(i?.detail||`HTTP ${o.status}`)}async function Mr(e){if(!window.confirm("删除这条记忆？"))return;const t=await fetch(`${S}/api/memories/${encodeURIComponent(e)}`,{method:"DELETE"}),a=await t.json().catch(()=>({}));if(!t.ok)throw new Error(a?.detail||`HTTP ${t.status}`)}function xr(){const e=Xe();return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>同步后端</h3>
          <p class="section-eyebrow">前端快照会本地保存，并自动 push/pull 到后端。</p>
          ${M("数据库","Supabase")}
          ${M("后端接口",S)}
          ${M("设备 ID",mn())}
          ${M("上次同步",ce(e.last_server_updated_at,{fallback:"暂无",includeYear:!0}))}
          <div class="ai-inline-actions" style="margin-top:10px;">
            <button class="ghost-action" data-action="sync-pull-now">立即拉取</button>
            <button class="ghost-action" data-action="sync-push-now">立即上传</button>
          </div>
        </div>
      </section>
    `}function Cr(){const e=n.globalSettings;return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>导出格式</h3>
          <div class="theme-choice-list">
            ${["Markdown","JSON","TXT"].map(a=>`
              <button class="theme-choice-item ${e.exportFormat===a?"active":""}" data-action="pick-export-format" data-format="${a}">
                <span class="theme-choice-copy">
                  <strong>${d(a)}</strong>
                  <em>用于聊天记录导出</em>
                </span>
                <span class="theme-choice-check">${e.exportFormat===a?"已选":""}</span>
              </button>
            `).join("")}
          </div>
        </div>
      </section>
    `}function M(e,t,a="noop",o={}){const i=Object.entries(o).map(([r,s])=>` data-${r}="${d(String(s))}"`).join("");return`
      <button class="setting-row nav-row" data-action="${a}"${i}>
        <div class="setting-copy"><strong>${d(e)}</strong>${t?`<p>${d(t)}</p>`:""}</div>
        <span class="row-chevron">${g("chevron")}</span>
      </button>
    `}function Z(e,t){n.viewStack.push(n.currentView),typeof t=="function"&&t(),n.currentView=e,u()}function Ar(){n.currentView=n.viewStack.pop()||"settings",u()}async function Tr(){try{const e=await fetch(`${S}/api/settings/ai`);if(!e.ok)return;const t=await e.json();sr(t.settings?.aiSettings||t.settings?.ai||t.settings?.ai_settings||t.settings||{}),u()}catch(e){console.warn("[ai settings] load failed",e)}}async function za({silent:e=!0}={}){try{const t=new URLSearchParams({viewer_type:"user",viewer_id:"me"}),a=await fetch(`${S}/api/moments?${t.toString()}`);if(!a.ok){if(!e)throw new Error(`HTTP ${a.status}`);return}const o=await a.json().catch(()=>({}));if(!Array.isArray(o?.moments))return;o.moments.length>0&&(n.moments=va(n.moments,o.moments),k(120)),u()}catch(t){console.warn("[moments] load failed",t),e||(n.toast="朋友圈加载失败",u(),window.setTimeout(()=>{n.toast="",u()},1400))}}async function Er(e){const t=await fetch(`${S}/api/moments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}),a=await t.json().catch(()=>({}));if(!t.ok)throw new Error(a?.detail||`HTTP ${t.status}`);return P(a?.moment||e)}async function Pr(e,t){const a=await fetch(`${S}/api/moments/${encodeURIComponent(e)}`,{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}),o=await a.json().catch(()=>({}));if(!a.ok)throw new Error(o?.detail||`HTTP ${a.status}`);return o}async function qr(e,t,a){const o=new URLSearchParams({author_type:String(t||"user"),author_id:String(a||"me")}),i=await fetch(`${S}/api/moments/${encodeURIComponent(e)}?${o.toString()}`,{method:"DELETE"}),r=await i.json().catch(()=>({}));if(!i.ok)throw new Error(r?.detail||`HTTP ${i.status}`);return r}async function Lr(e,t){const a=await fetch(`${S}/api/moments/${encodeURIComponent(e)}/like`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({actor_type:t.author_type,actor_id:t.author_id,actor_name:t.author_name})}),o=await a.json().catch(()=>({}));if(!a.ok)throw new Error(o?.detail||`HTTP ${a.status}`);return P(o?.moment||{})}async function Dr(e,t,a){const o=await fetch(`${S}/api/moments/${encodeURIComponent(e)}/comments`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({actor_type:t.author_type,actor_id:t.author_id,actor_name:t.author_name,text:a})}),i=await o.json().catch(()=>({}));if(!o.ok)throw new Error(i?.detail||`HTTP ${o.status}`);return P(i?.moment||{})}async function Or(e,t){const a=n.currentContactId||"",o=(t||"").trim()||null,i={agentId:a};if(e==="impression")i.impression=o;else if(e==="relationshipProgress")i.relationshipProgress=o;else if(e==="likesSummary")i.likesSummary=o;else return;try{n.toast="保存中…",u();const r=await fetch(`${S}/api/companion-state/summary`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(i)});if(!r.ok)throw new Error(`HTTP ${r.status}`);const s=await r.json().catch(()=>({}));n.companionState=Oe(s?.state||n.companionState),n.toast="已保存",u(),window.setTimeout(()=>{n.toast="",u()},1200)}catch(r){console.warn("[insight save]",r),n.toast="保存失败",u(),window.setTimeout(()=>{n.toast="",u()},1400)}}async function pe(e=n.currentContactId,{silent:t=!0}={}){try{const a=String(e||"").trim(),o=a?`?agent_id=${encodeURIComponent(a)}`:"",i=await fetch(`${S}/api/companion-state${o}`);if(!i.ok){if(!t)throw new Error(`HTTP ${i.status}`);return}const r=await i.json().catch(()=>({}));n.companionState=Oe(r?.state||{}),u()}catch(a){console.warn("[companion state] load failed",a),t||(n.toast="状态读取失败",u(),window.setTimeout(()=>{n.toast="",u()},1200))}}async function at(e,{silent:t=!0}={}){const a=String(e||"").trim();if(!a)return"";try{const o=await fetch(`${S}/api/agents/${encodeURIComponent(a)}/persona`);if(!o.ok){if(!t)throw new Error(`HTTP ${o.status}`);return""}const i=await o.json().catch(()=>({})),r=b(a);return r&&(r.persona=String(i?.persona||""),n.currentView==="contactSettings"&&n.currentContactId===a&&u()),String(i?.persona||"")}catch(o){return console.warn("[agent persona] load failed",o),t||(n.toast="浜鸿璇诲彇澶辫触",u(),window.setTimeout(()=>{n.toast="",u()},1200)),""}}async function Rr(e,t){const a=String(e||"").trim();if(a)try{await fetch(`${S}/api/agents/${encodeURIComponent(a)}/persona`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({persona:String(t||"")})})}catch(o){console.warn("[agent persona] save failed",o)}}function Vr(e,t,a=260){const o=String(e||"").trim();if(!o)return;ve.has(o)&&clearTimeout(ve.get(o));const i=window.setTimeout(()=>{ve.delete(o),Rr(o,t)},a);ve.set(o,i)}async function ja({silent:e=!0}={}){try{const t=await fetch(`${S}/api/mcp/library`);if(!t.ok){if(!e)throw new Error(`HTTP ${t.status}`);return}const a=await t.json();if(!Array.isArray(a.tools))return;const o=z(),i=a.tools.map(fe).filter(r=>Se(r.id));o.mcpLibrary={...o.mcpLibrary||{},tools:i},D(),u()}catch(t){console.warn("[mcp library] load failed",t),e||(n.toast="同步 MCP 工具失败",u(),window.setTimeout(()=>{n.toast="",u()},1300))}}async function D(){Lt();const e=z();e.providers=(e.providers||[]).map(et),Object.keys(e.defaultModels||{}).forEach(t=>{t!=="voice"&&(e.defaultModels[t]=xn(e.defaultModels[t]))}),n.aiSettingsSaving=!0;try{await fetch(`${S}/api/settings/ai`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({settings:{...n.globalSettings,aiSettings:e}})})}catch(t){console.error("[ai settings] save failed",t)}finally{n.aiSettingsSaving=!1}}function Br(){const e=z(),t=(e.mcpLibrary?.tools||[]).filter(a=>a.enabled!==!1).length;return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel">
          <h3>AI 接口</h3>
          ${M("默认模型","聊天 / 摘要 / Vision / 翻译 / 意识循环 / 语音","open-default-models")}
          ${M("模型供应商",`共 ${e.providers.length} 个`,"open-provider-catalog")}
          ${M("MCP 工具库",`已启用 ${t} 个`,"open-mcp-library")}
        </div>
        <div class="settings-group glass-frost ai-panel">
          <h3>当前聊天默认</h3>
          ${M("聊天模型",Va("chat"))}
        </div>
      </section>
    `}function zr(){const e=z();return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <div class="ai-inline-actions">
            <h3 style="margin:0;">MCP 工具库</h3>
            <button class="ghost-action" data-action="sync-mcp-library">同步工具</button>
          </div>
          <p class="section-eyebrow">只展示聊天主动场景常用工具，同步到输入框上方分类。</p>
          ${(Array.isArray(e.mcpLibrary?.tools)?e.mcpLibrary.tools:[]).map(fe).filter(a=>Se(a.id)).map(a=>`
            <div class="provider-catalog-row">
              <div class="provider-row-main" style="cursor:default;">
                <div class="setting-copy">
                  <strong>${d(a.label||a.id||"")}</strong>
                  <p>${d(a.description||a.prompt||a.id||"")}</p>
                </div>
              </div>
              <button class="switch-btn ${a.enabled!==!1?"on":"off"}" data-action="toggle-mcp-tool" data-tool-id="${d(a.id||"")}" aria-pressed="${a.enabled!==!1}">
                ${yt(a.enabled!==!1)}
              </button>
            </div>
          `).join("")}
        </div>
      </section>
    `}function jr(){return`
      <section class="settings-page page-block ai-settings-page">
        <div class="default-model-list">
          ${["chat","summary","vision","translate","consciousness","voice"].map(t=>hr(t)).join("")}
        </div>
      </section>
    `}function Hr(){const e=U(n.activeModelSlot),t=n.activeModelSlotContext==="contact",a=b(n.currentContactId)||n.contacts[0];if(!t&&e==="voice"){const c=Dt("voice")||{};return`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>${d(Ne("voice"))}</h3>
          <p class="section-eyebrow">${d(Ot("voice"))}</p>
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
    `}const o=t?{providerId:a?.settings?.modelProviderId||n.activeModelProviderId||A("chat")?.providerId||"openai",model:e==="consciousness"?a?.settings?.loopModel||"":a?.settings?.model||""}:Dt(e),i=z().providers.filter(c=>c.enabled),r=W(o.providerId)||W(A("chat")?.providerId)||i[0],s=J(r?.models||[]);return t?`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>${d(Ne(e))}</h3>
          <p class="section-eyebrow">${d(Ot(e))}</p>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>模型供应商</h3>
          <div class="ai-chip-row">
            ${i.map(c=>`<button class="ai-chip ${o.providerId===c.id?"active":""}" data-action="pick-slot-provider" data-slot="${e}" data-provider-id="${c.id}">${d(c.name)}</button>`).join("")}
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
            ${Ha(e,o,s)}
          </div>
        </div>
      </section>
    `:`
      <section class="settings-page page-block ai-settings-page">
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>${d(Ne(e))}</h3>
          <p class="section-eyebrow">${d(Ot(e))}</p>
        </div>
        <div class="settings-group glass-frost ai-panel compact-panel">
          <h3>模型供应商</h3>
          <div class="ai-chip-row">
            ${i.map(c=>`<button class="ai-chip ${o.providerId===c.id?"active":""}" data-action="pick-slot-provider" data-slot="${e}" data-provider-id="${c.id}">${d(c.name)}</button>`).join("")}
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
            ${Ha(e,o,s)}
          </div>
        </div>
      </section>
    `}function Nr(e){return`
      <div class="provider-catalog-row">
        <button class="provider-row-main" data-action="open-provider-editor" data-provider="${e.id}">
          <div class="setting-copy">
            <strong>${d(e.name)}</strong>
            <p>${d(e.defaultModel||"未设置默认模型")}</p>
          </div>
          <span class="provider-inline-state ${e.enabled?"enabled":"disabled"}">${e.enabled?"已启用":"已禁用"}</span>
          <span class="row-chevron">${g("chevron")}</span>
        </button>
        <button class="switch-btn ${e.enabled?"on":"off"}" data-action="toggle-provider-enabled" data-provider-id="${e.id}" aria-pressed="${e.enabled}">
          ${yt(e.enabled)}
        </button>
      </div>
    `}function Fr(){const e=n.providerSearch.trim().toLowerCase(),t=z().providers.filter(a=>!e||a.name.toLowerCase().includes(e)||a.id.toLowerCase().includes(e)).sort((a,o)=>{const i=+!!o.enabled-+!!a.enabled;return i!==0?i:String(a.name||a.id||"").localeCompare(String(o.name||o.id||""),"zh-Hans-CN")});return`
      <section class="settings-page page-block ai-settings-page">
        <div class="search-pill glass-frost ai-search-row">
          <span class="search-icon">${g("search")}</span>
          <input class="ai-search-input" value="${d(n.providerSearch)}" data-action="provider-search" placeholder="搜索供应商" />
        </div>
        <div class="settings-group glass-frost ai-panel provider-catalog-group">
          ${t.map(a=>Nr(a)).join("")}
        </div>
      </section>
    `}function Ur(e){const t=new Set,a=(Array.isArray(e._allModels)?e._allModels:[]).filter(h=>{const v=L(h?.id||h?.name||""),$=v.toLowerCase();return!v||t.has($)?!1:(t.add($),!0)}),o=e._selectedModelIds instanceof Set?e._selectedModelIds:new Set(e._selectedModelIds||[]),i=o.size,r={};for(const h of a){const v=h.vendor||"Other";r[v]||(r[v]=[]),r[v].push(h)}const s=["OpenAI","Anthropic","Google","DeepSeek","Qwen","GLM","Meta","Mistral","Moonshot","Doubao","ERNIE","Hunyuan","Baichuan","Spark","01.AI","InternLM","Other"],c=[...new Set([...s.filter(h=>r[h]),...Object.keys(r)])],l=a.map(h=>h.id),p=l.length>0&&l.every(h=>o.has(h)),m=c.map(h=>{const v=r[h]||[],$=!!n.providerModelVendorOpen[h],I=v.filter(_=>o.has(_.id)).length,T=v.length>0&&v.every(_=>o.has(_.id)),x=$?`
          <div class="vendor-group-body">
            ${v.map(_=>{const C=o.has(_.id),V=a.findIndex(oe=>oe.id===_.id);return`
              <div class="pool-model-row">
                <span class="pool-model-name">${d(_.name)}</span>
                <span class="pool-model-caps">${dr(_)}</span>
                <button class="pool-model-btn${C?" selected":""}"
                  data-action="${C?"remove-provider-model":"add-provider-model"}"
                  data-model-index="${V}" type="button">${C?"−":"+"}</button>
              </div>`}).join("")}
          </div>`:"";return`
        <div class="vendor-group">
          <div class="vendor-group-head">
            <button class="vendor-group-toggle" data-action="toggle-provider-vendor-group" data-vendor="${d(h)}" type="button">
              <span class="vendor-group-name">${d(h)}</span>
              ${I?`<span class="vendor-group-sel">${I} 已选</span>`:""}
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
      </div>`}function Ha(e,t,a){const o=J(a),i=L(t?.model||"");return o.length?o.map((r,s)=>`
          <button class="model-choice-item ${i===r?"active":""}" data-action="pick-slot-model" data-slot="${e}" data-model-index="${s}">
            <span class="model-choice-name">${d(r)}</span>
            <span class="model-choice-check">${i===r?"已选":""}</span>
          </button>
        `).join(""):'<div class="model-choice-empty">当前供应商还没有可选模型，请先在“模型供应商”页同步并保存。</div>'}function Kr(){const e=R(),t=Ze(e.apiPath||e.api_path||"",{allowEmpty:!0}),a=ar(e),o=!!n.providerAdvancedOpen||!!t,i=n.providerModelSyncStatus?.[e.id],r=ir(e.apiKey||""),s=!!e._apiKeyDirty,c=s?String(e.apiKey||""):r,l=s?n.providerKeyVisible?"text":"password":"text",p=s?n.providerKeyVisible?"隐藏":"显示":r?"更换":"显示";return`
      <section class="settings-page page-block ai-settings-page provider-editor-page">
        <div class="settings-group glass-frost ai-panel provider-editor-card">

          <div class="prov-sec">
            <h3 class="prov-sec-title">接口配置</h3>
            <label class="ai-field-label">名称</label>
            <input id="provider-name-input" class="ai-input" value="${d(e.name||"")}" placeholder="例如 SiliconFlow" data-plain-input="true" />
            <label class="ai-field-label">Base URL</label>
            <input id="provider-base-input" class="ai-input" value="${d(e.baseUrl||"")}" placeholder="https://api.example.com/v1" data-plain-input="true" />
            <div class="provider-advanced-head">
              <span class="section-eyebrow">Base URL 与 API 路径一起拼接请求地址</span>
              <button class="provider-advanced-toggle" data-action="toggle-provider-advanced" type="button">
                <span>高级选项</span>
                <span class="advanced-chevron ${o?"open":""}">${g("chevron")}</span>
              </button>
            </div>
            <div class="provider-advanced-panel ${o?"open":""}">
              <label class="ai-field-label">API 路径（可选）</label>
              <input id="provider-api-path-input" class="ai-input" value="${d(t)}" placeholder="${d(a)}" data-plain-input="true" />
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
                <input id="provider-default-model-input" class="ai-input provider-model-input" value="${d(e.defaultModel||"")}" placeholder="gpt-5.4" autocomplete="off" data-plain-input="true" />
                <button class="provider-model-toggle" data-action="toggle-provider-model-menu" type="button" aria-label="展开模型列表">
                  ${g("chevron")}
                </button>
              </div>
              <p id="provider-default-model-hint" class="section-eyebrow provider-model-hint">${d(Ra(e.defaultModel||"",e.models||[]))}</p>
              <div id="provider-default-model-menu" class="provider-model-menu ${n.providerModelMenuOpen?"open":""}"></div>
            </div>
          </div>

          <div class="prov-sec-divider"></div>

          <div class="prov-sec">
            <div class="prov-sec-title-row">
              <h3 class="prov-sec-title" style="margin:0;">模型列表</h3>
              <button class="prov-sync-btn" data-action="sync-provider-models" data-provider="${e.id}" type="button" ${n.providerModelSyncingId===e.id?"disabled":""}>${g("reroll")}${n.providerModelSyncingId===e.id?"同步中":"同步"}</button>
            </div>
            ${Ur(e)}
            ${i?.message?`<p class="provider-sync-status ${d(i.type||"")}">${d(i.message)}</p>`:'<p class="provider-sync-status muted">同步会优先请求真实模型列表；失败时保留当前列表。</p>'}
          </div>

          <div class="prov-sec-divider"></div>

          ${ue("启用供应商","关闭后将不会出现在模型选择中",!!e.enabled,"toggle-provider-enabled",e.id)}

          <div class="prov-save-row">
            <button class="prov-save-btn-main" data-action="save-provider-editor" data-provider="${e.id}" type="button">保存供应商</button>
          </div>
        </div>
      </section>
    `}async function Qr(){const e=R();if(n.providerModelSyncingId)return;const t=document.getElementById("provider-base-input")?.value?.trim()||"",a=document.getElementById("provider-key-input"),o=e._apiKeyDirty?a?.value?.trim()||"":e.apiKey||"",i=_n({...e,baseUrl:t});if(!t){const r=Mn(e);if(!r.length){_e(e.id,"error","请先填写 Base URL 再同步模型"),u();return}const s=r.map(tt);e._allModels=s,s.forEach(c=>{n.providerModelVendorOpen[c.vendor]=!0}),_e(e.id,"success",`已载入内置列表 ${r.length} 个模型`),u();return}n.providerModelSyncingId=e.id||n.providerDraftId||"syncing",_e(e.id,"muted","正在同步模型..."),u();try{const r=await fetch(`${S}/api/settings/ai/discover-models`,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({provider_id:e.id||i,provider_name:e.name||"",base_url:t,api_key:o})}),s=r.headers.get("content-type")||"",c=await r.text();if(!r.ok){let x="";try{const _=s.includes("application/json")?JSON.parse(c):null;x=_?.detail||_?.message||""}catch{}throw new Error(x||`HTTP ${r.status}`)}if(!s.includes("application/json"))throw new Error("后端返回的不是 JSON，已阻止写入模型列表");let l={};try{l=JSON.parse(c||"{}")}catch{throw new Error("后端返回 JSON 解析失败，已阻止写入模型列表")}const p=J(Array.isArray(l.models)?l.models:[]),m=Mn({...e,baseUrl:t}),f=J([...p,...m]);if(!f.length){_e(e.id,"error","没有获取到模型，已保留当前默认模型和已有列表。"),u();return}const h=f.map(tt),v=new Set(f.map(x=>x.toLowerCase())),$=[...h];(e._allModels||[]).forEach(x=>{const _=L(x?.id||x?.name||"");!_||v.has(_.toLowerCase())||$.push(tt(_))}),e._allModels=$,[...new Set(h.map(x=>x.vendor))].forEach(x=>{n.providerModelVendorOpen[x]=!0}),e._selectedModelIds instanceof Set||(e._selectedModelIds=new Set(e._selectedModelIds||[])),e.models=[...e._selectedModelIds];const T=Math.max(0,f.length-p.length);_e(e.id,"success",l.is_fallback||l.source==="fallback"?`已载入内置列表 ${f.length} 个模型`:T?`已同步 ${p.length} 个模型，补充内置 ${T} 个`:`已同步 ${f.length} 个模型`),u(),xe()}catch(r){const s=String(r?.message||"同步模型失败");if(s.includes("Failed to fetch")){_e(e.id,"error","同步失败：当前前端连不上后端接口。"),u();return}_e(e.id,"error",`同步失败：${s}`),u()}finally{n.providerModelSyncingId="",u()}}mt=function(){return In.has(n.currentView)?!1:Zi()},Qt=function(){if(!In.has(n.currentView))return er();const t={aiInterface:"AI 接口",mcpLibrary:"MCP 工具库",themeSettings:"主题模式",accountSettings:"我的账号",memoryService:"记忆服务",backendSync:"同步后端",exportSettings:"导出格式",defaultModels:"默认模型",modelSlot:Ne(n.activeModelSlot),providerCatalog:"模型供应商",providerEditor:"编辑供应商",promptEditor:"提示词"},a=`chat-page-title ${n.currentView==="providerCatalog"?"provider-catalog-title":""}`.trim(),o=n.currentView==="providerCatalog"?`<button class="icon-btn ghost-circle" data-action="open-provider-editor-new" aria-label="新增供应商">${g("plus")}</button>`:'<span class="header-spacer"></span>';return`
      <header class="chat-page-header simple-header">
        <button class="icon-btn text-btn" data-action="back-sub-settings" aria-label="返回">${g("back")}</button>
        <div class="${a}">${d(t[n.currentView]||"设置")}</div>
        ${o}
      </header>
    `},Yt=function(){return n.currentView==="accountSettings"?yr():n.currentView==="memoryService"?Sr():n.currentView==="backendSync"?xr():n.currentView==="exportSettings"?Cr():n.currentView==="themeSettings"?vr():n.currentView==="aiInterface"?Br():n.currentView==="mcpLibrary"?zr():n.currentView==="defaultModels"?jr():n.currentView==="modelSlot"?Hr():n.currentView==="providerCatalog"?Fr():n.currentView==="providerEditor"?Kr():n.currentView==="promptEditor"?br():tr()},sn=function(t){const a=t.target.closest("[data-action]"),o=a?.dataset.action;if(!o)return qa(t);if(o==="open-ai-interface")return Z("aiInterface");if(o==="open-mcp-library")return Z("mcpLibrary");if(o==="open-theme-settings")return Z("themeSettings");if(o==="open-account-settings")return Z("accountSettings");if(o==="open-account-avatar"){document.getElementById("account-avatar-file")?.click();return}if(o==="open-account-nickname"){const i=window.prompt("请输入昵称",n.accountProfile?.nickname||"小酒")?.trim();if(!i)return;n.accountProfile.nickname=i,n.toast="昵称已更新",u(),D(),k(120),window.setTimeout(()=>{n.toast="",u()},1200);return}if(o==="open-account-signature"){const i=window.prompt("请输入个性签名",n.accountProfile?.signature||"")?.trim();if(!i)return;n.accountProfile.signature=i,n.toast="个性签名已更新",u(),D(),k(120),window.setTimeout(()=>{n.toast="",u()},1200);return}if(o==="open-memory-service")return Z("memoryService",()=>{Ce(n.currentContactId)});if(o==="memory-service-refresh"){Ce(n.currentContactId,{silent:!1});return}if(o==="memory-service-sort"){n.memoryServiceSort=a.dataset.sort||"updated_at",Ce(n.currentContactId,{silent:!0});return}if(o==="memory-candidate-promote"){$r(a.dataset.candidateId);return}if(o==="memory-candidate-dismiss"){kr(a.dataset.candidateId);return}if(o==="memory-service-create"){Ir().then(()=>Ce(n.currentContactId,{silent:!1})).catch(i=>{console.warn("[memory service] create failed",i),n.toast="新建记忆失败",u(),window.setTimeout(()=>{n.toast="",u()},1200)});return}if(o==="memory-service-edit"){_r(a.dataset.memoryId).then(()=>Ce(n.currentContactId,{silent:!1})).catch(i=>{console.warn("[memory service] update failed",i),n.toast="编辑记忆失败",u(),window.setTimeout(()=>{n.toast="",u()},1200)});return}if(o==="memory-service-delete"){Mr(a.dataset.memoryId).then(()=>Ce(n.currentContactId,{silent:!1})).catch(i=>{console.warn("[memory service] delete failed",i),n.toast="删除记忆失败",u(),window.setTimeout(()=>{n.toast="",u()},1200)});return}if(o==="open-backend-sync")return Z("backendSync");if(o==="sync-pull-now"){xa();return}if(o==="sync-push-now"){de(),Ie(30),n.toast="已加入上传队列",u(),window.setTimeout(()=>{n.toast="",u()},1e3);return}if(o==="open-export-settings")return Z("exportSettings");if(o==="open-default-models")return Z("defaultModels");if(o==="open-model-slot")return Z("modelSlot",()=>{if(n.activeModelSlot=U(a.dataset.slot),n.activeModelSlotContext=a.dataset.context==="contact"?"contact":"global",n.modelSlotMenuOpen=!1,n.activeModelSlotContext==="contact"){const i=Q();n.activeModelProviderId=i?.settings?.modelProviderId||A("chat")?.providerId||n.activeModelProviderId||"openai"}else n.activeModelProviderId=A("chat")?.providerId||n.activeModelProviderId||"openai"});if(o==="open-provider-catalog")return Z("providerCatalog");if(o==="open-provider-editor-new")return Z("providerEditor",()=>{n.providerDraftId=`custom_${Date.now()}`,n.providerAdvancedOpen=!1,n.providerModelMenuOpen=!1,n.providerEditorDraft=Cn(n.providerDraftId)});if(o==="open-provider-editor")return Z("providerEditor",()=>{n.providerDraftId=a.dataset.provider;const i=W(n.providerDraftId);n.providerAdvancedOpen=!!String(i?.apiPath||i?.api_path||"").trim(),n.providerModelMenuOpen=!1,n.providerEditorDraft=Cn(n.providerDraftId)});if(o==="open-prompt-editor")return Z("promptEditor",()=>{n.activePromptSlot=U(a.dataset.slot)});if(o==="back-sub-settings")return Ar();if(o==="sync-provider-models"){Qr();return}if(o==="toggle-provider-key-visible"){const i=R();i._apiKeyDirty?n.providerKeyVisible=!n.providerKeyVisible:(i._apiKeyDirty=!0,i.apiKey="",n.providerKeyVisible=!0),u(),window.setTimeout(()=>document.getElementById("provider-key-input")?.focus(),0);return}if(o==="toggle-provider-advanced"){n.providerAdvancedOpen=!n.providerAdvancedOpen,u();return}if(o==="toggle-model-slot-menu"){n.modelSlotMenuOpen=!1,nt();return}if(o==="toggle-provider-model-menu"){n.providerModelMenuOpen=!n.providerModelMenuOpen,xe();return}if(o==="pick-provider-default-model"){const i=R(),r=document.getElementById("provider-default-model-input")?.value||i.defaultModel||"",s=La(r,i.models),c=L(s[Number(a.dataset.modelIndex)]||a.dataset.model||"");if(!c)return;i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[])),i._selectedModelIds.add(c),i.models=[...i._selectedModelIds],i.defaultModel=c;const l=document.getElementById("provider-default-model-input");l&&(l.value=c),n.providerModelMenuOpen=!1,xe();return}if(o==="pick-slot-provider"){if(n.activeModelSlotContext==="contact"){const s=Q(),c=a.dataset.providerId||n.activeModelProviderId,l=W(c);n.activeModelProviderId=c,n.modelSlotMenuOpen=!1,s?.settings&&(s.settings.modelProviderId=c,(!L(s.settings.model)||!(l?.models||[]).includes(s.settings.model))&&(s.settings.model=l?.defaultModel||l?.models?.[0]||s.settings.model||"")),u(),k(150);return}const i=A(a.dataset.slot);i.providerId=a.dataset.providerId;const r=W(i.providerId);r&&(i.model=L(r.defaultModel)||r.models?.[0]||L(i.model)||""),n.modelSlotMenuOpen=!1,u(),D();return}if(o==="toggle-all-provider-models"){const i=R();i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[]));const s=(Array.isArray(i._allModels)?i._allModels:[]).map(l=>l.id);s.length>0&&s.every(l=>i._selectedModelIds.has(l))?s.forEach(l=>i._selectedModelIds.delete(l)):s.forEach(l=>i._selectedModelIds.add(l)),i.models=[...i._selectedModelIds],u();return}if(o==="toggle-vendor-all-provider-models"){const i=a.dataset.vendor,r=R();r._selectedModelIds instanceof Set||(r._selectedModelIds=new Set(r._selectedModelIds||[]));const c=(Array.isArray(r._allModels)?r._allModels:[]).filter(p=>(p.vendor||"Other")===i).map(p=>p.id);c.length>0&&c.every(p=>r._selectedModelIds.has(p))?c.forEach(p=>r._selectedModelIds.delete(p)):c.forEach(p=>r._selectedModelIds.add(p)),r.models=[...r._selectedModelIds],u();return}if(o==="toggle-provider-vendor-group"){const i=a.dataset.vendor;i&&(n.providerModelVendorOpen[i]=!n.providerModelVendorOpen[i]),u();return}if(o==="add-provider-model"){const i=R();i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[]));const s=(Array.isArray(i._allModels)?i._allModels:[])[Number(a.dataset.modelIndex)]||{},c=L(s.id||s.name||a.dataset.modelId||"");if(c&&i._selectedModelIds.add(c),c){i.defaultModel=c;const l=document.getElementById("provider-default-model-input");l&&(l.value=c)}i.models=[...i._selectedModelIds],u();return}if(o==="remove-provider-model"){const i=R();i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[]));const s=(Array.isArray(i._allModels)?i._allModels:[])[Number(a.dataset.modelIndex)]||{},c=L(s.id||s.name||a.dataset.modelId||"");c&&i._selectedModelIds.delete(c),i.models=[...i._selectedModelIds],u();return}if(o==="add-manual-provider-model"){const i=R(),r=document.getElementById("provider-manual-model-input"),s=L(r?.value||"");if((r?.value||"").trim()&&!s){alert("模型 ID 不合法，不能包含 HTML、控制字符或过长内容");return}if(!s)return;if(i._selectedModelIds instanceof Set||(i._selectedModelIds=new Set(i._selectedModelIds||[])),Array.isArray(i._allModels)||(i._allModels=[]),!i._allModels.some(c=>c.id===s)){i._allModels.push(tt(s));const c=Da(s);n.providerModelVendorOpen[c]=!0}i._selectedModelIds.add(s),i.defaultModel=s,i.models=[...i._selectedModelIds],u();return}if(o==="toggle-slot-vendor-group"){const i=a.dataset.providerId;i&&(n.slotVendorGroupOpen[i]=!n.slotVendorGroupOpen[i]),u();return}if(o==="add-model-to-slot"){const i=a.dataset.slot,r=a.dataset.providerId,s=L(a.dataset.model||"");if(!i||!r||!s)return;const c=A(i);Array.isArray(c.selectedModels)||(c.selectedModels=[]),c.selectedModels.some(l=>l.providerId===r&&l.model===s)||c.selectedModels.push({providerId:r,model:s}),u(),D();return}if(o==="remove-model-from-slot"){const i=a.dataset.slot,r=a.dataset.providerId,s=a.dataset.model;if(!i||!s)return;const c=A(i);Array.isArray(c.selectedModels)&&(c.selectedModels=c.selectedModels.filter(l=>!(l.providerId===r&&l.model===s))),u(),D();return}if(o==="add-manual-slot-model"){const i=a.dataset.slot,r=document.getElementById("model-slot-manual-input"),s=L(r?.value||"");if((r?.value||"").trim()&&!s){alert("模型 ID 不合法，不能包含 HTML、控制字符或过长内容");return}if(!i||!s)return;const c=A(i);Array.isArray(c.manualModels)||(c.manualModels=[]),c.manualModels.includes(s)||c.manualModels.push(s),u(),D();return}if(o==="remove-manual-slot-model"){const i=a.dataset.slot,r=L(a.dataset.model||"");if(!i||!r)return;const s=A(i);Array.isArray(s.manualModels)&&(s.manualModels=s.manualModels.filter(c=>c!==r)),u(),D();return}if(o==="pick-theme-mode"){n.globalSettings.theme=a.dataset.theme||n.globalSettings.theme,u(),D();return}if(o==="pick-export-format"){n.globalSettings.exportFormat=a.dataset.format||n.globalSettings.exportFormat,u(),D();return}if(o==="toggle-mcp-tool"){const i=a.dataset.toolId,c=(z().mcpLibrary?.tools||[]).find(l=>String(l.id)===String(i));if(!c)return;c.enabled=c.enabled===!1,Xn(a,c.enabled!==!1),D();return}if(o==="sync-mcp-library"){ja({silent:!1});return}if(o==="edit-contact-quick-action"){if(n.quickActionDragId)return;ui(a.dataset.quickId||"");return}if(o==="add-contact-quick-action"){const i=Q(),r=$e(i),s=`custom_${Date.now()}`;r.push({id:s,label:"新快捷动作",icon:"more",prompt:"",mcpToolId:"",enabled:!0}),i.settings.quickActions=r,n.contactQuickActionEditorId=s,u(),k(150);return}if(o==="close-contact-quick-action-editor"){if(t.target.closest('[data-stop-close="1"]')&&!t.target.hasAttribute("data-action"))return;n.contactQuickActionEditorId="",n.contactQuickMcpMenuOpen=!1,u();return}if(o==="toggle-contact-quick-mcp-menu"){n.contactQuickMcpMenuOpen=!n.contactQuickMcpMenuOpen,a.closest(".qae-select-shell")?.classList.toggle("open",n.contactQuickMcpMenuOpen);return}if(o==="pick-contact-quick-mcp"){const i=a.closest(".qae-select-shell"),r=a.dataset.mcpId||"",s=document.getElementById("contact-quick-mcp");s&&(s.value=r);const c=a.textContent?.trim()||"不调用 MCP",l=i?.querySelector(".qae-select-trigger span");l&&(l.textContent=c),i?.querySelectorAll(".qae-select-option").forEach(p=>{p.classList.toggle("active",p===a)}),n.contactQuickMcpMenuOpen=!1,i?.classList.remove("open");return}if(o==="save-contact-quick-action"){const i=Q(),r=$e(i),s=a.dataset.quickId||"",c=r.find(l=>l.id===s);if(!c)return;c.label=(document.getElementById("contact-quick-label")?.value||c.label||"").trim()||c.label||"蹇嵎鍔ㄤ綔",c.prompt=(document.getElementById("contact-quick-prompt")?.value||"").trim(),c.mcpToolId=(document.getElementById("contact-quick-mcp")?.value||"").trim(),c.mcpToolId&&Se(c.mcpToolId)&&(c.id=c.id||c.mcpToolId),i.settings.quickActions=r,n.contactQuickActionEditorId="",u(),k(150);return}if(o==="delete-contact-quick-action"){const i=Q(),r=a.dataset.quickId||"",s=$e(i).filter(c=>c.id!==r);i.settings.quickActions=s,n.contactQuickActionEditorId===r&&(n.contactQuickActionEditorId=""),n.quickActionSwipeOpenId="",u(),k(150);return}if(o==="pick-slot-model"){const i=A(a.dataset.slot),r=W(i?.providerId),s=J(r?.models||[]),c=L(s[Number(a.dataset.modelIndex)]||a.dataset.model||"");if(!c)return;if(n.activeModelSlotContext==="contact"){const p=b(n.currentContactId)||n.contacts[0];p?.settings&&(a.dataset.slot==="consciousness"?p.settings.loopModel=c:(p.settings.model=c,p.settings.modelProviderId=n.activeModelProviderId||p.settings.modelProviderId||A("chat")?.providerId||"openai")),n.modelSlotMenuOpen=!1,u(),k(150);return}const l=A(a.dataset.slot);l.model=c,a.dataset.providerId&&(l.providerId=a.dataset.providerId),n.modelSlotMenuOpen=!1,u(),D();return}if(o==="toggle-provider-enabled"){const i=W(a.dataset.providerId||a.dataset.key);i&&(i.enabled=!i.enabled,n.providerEditorDraft&&n.providerEditorDraft.id===i.id&&(n.providerEditorDraft.enabled=i.enabled)),u(),D();return}if(o==="save-provider-editor"){const i=a.dataset.provider,r=R(),s=r._selectedModelIds instanceof Set?r._selectedModelIds:new Set(r._selectedModelIds||[]),c=J([...s]),l=W(i),p=Ze(document.getElementById("provider-api-path-input")?.value||"",{allowEmpty:!0}),m=document.getElementById("provider-default-model-input")?.value?.trim()||"";let f="";try{f=m?rr(m,"默认模型"):c[0]||""}catch($){alert($.message||"默认模型不合法");return}if(!f){alert("默认模型不能为空，请手动输入或选择一个合法模型");return}const h={...l||{id:i},id:i,name:document.getElementById("provider-name-input")?.value?.trim()||"自定义供应商",baseUrl:document.getElementById("provider-base-input")?.value?.trim()||"",apiPath:p,api_path:p,apiKey:r._apiKeyDirty?document.getElementById("provider-key-input")?.value?.trim()||"":r.apiKey||"",defaultModel:f,models:c},v=z();v.providerModels={...v.providerModels||{},[i]:c},v.providers=v.providers.filter($=>$.id!==i),v.providers.push(h),Lt(),n.providerEditorDraft=null,n.providerModelMenuOpen=!1,n.currentView="providerCatalog",u(),D();return}if(o==="save-slot-prompt"){const i=U(a.dataset.slot);z().defaultPrompts[i]=document.getElementById("slot-prompt-input")?.value||"",n.currentView="defaultModels",u(),D();return}if(o==="reset-slot-prompt"){const i=U(a.dataset.slot),r=Me().defaultPrompts||{};z().defaultPrompts[i]=r[i]||"",u(),D();return}return qa(t)},document.addEventListener("input",e=>{const t=e.target;if(t?.dataset?.action==="provider-search"){n.providerSearch=t.value||"",u();return}if(t?.id==="model-slot-input"){const a=b(n.currentContactId)||n.contacts[0],o=t.value||"",i=o?L(o):"";if(o&&!i){n.modelSlotMenuOpen=!1,nt();return}if(n.activeModelSlotContext==="contact")a?.settings&&(n.activeModelSlot==="consciousness"?a.settings.loopModel=i:a.settings.model=i);else{const r=A(n.activeModelSlot);r&&(r.model=i)}n.modelSlotMenuOpen=!1,nt();return}if(t?.id==="provider-name-input"){R().name=t.value||"";return}if(t?.id==="provider-base-input"){R().baseUrl=t.value||"";return}if(t?.id==="provider-api-path-input"){const a=R();a.apiPath=t.value||"",a.api_path=t.value||"";return}if(t?.id==="provider-key-input"){const a=R();t.dataset?.masked==="true"&&(t.value="",t.dataset.masked="false"),a._apiKeyDirty=!0,a.apiKey=String(t.value||"");return}if(t?.id==="provider-models-input"){R().models=String(t.value||"").split(",").map(a=>a.trim()).filter(Boolean),xe();return}if(t?.id==="voice-slot-provider-input"){const a=A("voice");a&&(a.provider=t.value||"");return}if(t?.id==="voice-slot-service-url-input"){const a=A("voice");a&&(a.service_url=t.value||"",a.base_url=t.value||"");return}if(t?.id==="voice-slot-voice-id-input"){const a=A("voice");a&&(a.voice_id=t.value||"");return}if(t?.id==="voice-slot-speaker-input"){const a=A("voice");a&&(a.speaker=t.value||"");return}if(t?.id==="voice-slot-emotion-input"){const a=A("voice");a&&(a.emotion=t.value||"");return}if(t?.id==="voice-slot-speed-input"){const a=A("voice");a&&(a.speed=t.value||"");return}if(t?.id==="voice-slot-format-input"){const a=A("voice");a&&(a.format=t.value||"");return}if(t?.id==="provider-default-model-input"){R().defaultModel=t.value||"",n.providerModelMenuOpen=!0,xe();return}if(t?.dataset?.contactField==="persona"){const a=Q();if(!a)return;a.persona=t.value||"",k(180),Vr(a.id,a.persona)}}),document.addEventListener("paste",e=>{const t=e.target;if(t?.id!=="provider-key-input")return;e.preventDefault();const a=String(e.clipboardData?.getData("text/plain")||"").trim();t.value=a;const o=R();o._apiKeyDirty=!0,o.apiKey=a,t.dispatchEvent(new Event("input",{bubbles:!0}))}),document.addEventListener("change",e=>{const t=e.target;if(t?.id==="nc-avatar-file"){const a=t.files?.[0];if(!a)return;n.newContactDraft={...n.newContactDraft||ft(),name:document.getElementById("nc-name")?.value||n.newContactDraft?.name||"",agentId:document.getElementById("nc-agent-id")?.value||n.newContactDraft?.agentId||"",bio:document.getElementById("nc-bio")?.value||n.newContactDraft?.bio||""},rn(a,"new-contact"),t.value="";return}if(t?.id==="account-avatar-file"){const a=t.files?.[0];if(!a)return;rn(a,"account"),t.value="";return}if(t?.id==="contact-avatar-file"){const a=t.files?.[0];if(!a||!b(n.currentContactId))return;rn(a,"contact"),t.value="";return}if(t?.id==="moment-image-input"){const a=t.files?.[0];if(!a)return;n.momentComposerImageName=a.name||"";const o=new FileReader;o.onload=()=>{n.momentComposerImage=typeof o.result=="string"?o.result:"",u()},o.readAsDataURL(a);return}if(t?.id==="chat-image-input"){on(t.files||[]),t.value="";return}if(t?.dataset?.action==="select-slot-model"){const a=A(t.dataset.slot);if(!a)return;a.model=t.value,D();return}String(t?.id||"").startsWith("voice-slot-")&&D()});function Yr(e,t){const a=Q(),o=$e(a),i=o.findIndex(s=>s.id===e);if(i<0)return;const[r]=o.splice(i,1);if(!t)o.splice(0,0,r);else{const s=o.findIndex(c=>c.id===t);s<0?o.push(r):o.splice(s+1,0,r)}a.settings.quickActions=o,k(120)}const w={id:"",mode:"idle",startX:0,startY:0,currentY:0,hoverId:"",pendingDropId:null,pressTimer:null};function ot(){w.pressTimer&&(clearTimeout(w.pressTimer),w.pressTimer=null)}function Na(){ot(),w.id="",w.mode="idle",w.startX=0,w.startY=0,w.currentY=0,w.hoverId="",w.pendingDropId=null}function En(){y()?.querySelectorAll(".quick-action-swipe.drop-hint-after").forEach(e=>e.classList.remove("drop-hint-after"))}function Xr(e,t){const a=y()?.querySelector(`.quick-action-swipe[data-quick-id="${e}"]`);if(!a)return;const o=a.querySelector(".quick-action-row"),i=a.querySelector(".quick-action-delete");if(!o||!i)return;const r=Math.max(-74,Math.min(0,Number(t)||0)),s=Math.min(1,Math.abs(r)/74);o.style.transform=`translateX(${r}px)`,i.style.opacity=String(s),i.style.transform=`translateX(${18*(1-s)}px) scale(${.97+.03*s})`,i.style.pointerEvents=s>.98?"auto":"none"}function Ae(e){const t=y()?.querySelector(`.quick-action-swipe[data-quick-id="${e}"]`);if(!t)return;const a=t.querySelector(".quick-action-row"),o=t.querySelector(".quick-action-delete");a&&a.style.removeProperty("transform"),o&&(o.style.removeProperty("opacity"),o.style.removeProperty("transform"),o.style.removeProperty("pointer-events"))}function Fa(){if(y()?.querySelectorAll(".quick-action-swipe.quick-dragging").forEach(o=>o.classList.remove("quick-dragging")),y()?.querySelectorAll(".quick-action-row.touch-dragging").forEach(o=>{o.classList.remove("touch-dragging"),o.style.removeProperty("transform")}),!n.quickActionDragId)return;const e=y()?.querySelector(`.quick-action-row[data-quick-id="${n.quickActionDragId}"]`),t=e?.closest(".quick-action-swipe");if(!e||!t)return;t.classList.add("quick-dragging"),e.classList.add("touch-dragging");const a=w.currentY-w.startY;e.style.transform=`translateY(${a}px) scale(1.04) rotate(1.2deg)`}function Gr(e){const t=Array.from(y()?.querySelectorAll(".quick-action-swipe[data-quick-id]")||[]).filter(o=>o.dataset.quickId!==n.quickActionDragId);if(!t.length)return"";let a="";for(const o of t){const i=o.getBoundingClientRect(),r=i.top+i.height/2;if(e>=r)a=o.dataset.quickId;else break}return a}function Ua(){const e=w.pendingDropId,t=n.quickActionDragId;En(),n.quickActionDragId="",n.quickActionDropHintId="",n.quickActionDropDirection="",n.quickActionReorderPulseId="",t&&e!==null&&Yr(t,e),u()}function Ka(e,t,a){ot(),n.quickActionSwipeOpenId&&n.quickActionSwipeOpenId!==a&&(Ae(n.quickActionSwipeOpenId),n.quickActionSwipeOpenId="",u()),w.id=a,w.mode="pending",w.startX=e,w.startY=t,w.currentY=t,w.hoverId="",w.pressTimer=window.setTimeout(()=>{if(!(w.mode!=="pending"||!w.id)&&(w.mode="drag",w.pendingDropId=null,n.quickActionDragId=w.id,Fa(),navigator?.vibrate))try{navigator.vibrate(12)}catch{}},280)}function Qa(e,t,a){if(!w.id)return;const o=e-w.startX,i=t-w.startY;if(w.mode==="pending"){Math.abs(o)>12&&Math.abs(o)>Math.abs(i)?(ot(),w.mode="swipe"):Math.abs(i)>10&&(ot(),w.mode="cancelled");return}if(w.mode==="swipe"){const c=n.quickActionSwipeOpenId===w.id?-74:0,l=Math.max(-74,Math.min(0,c+o));Xr(w.id,l);return}if(w.mode!=="drag")return;a?.(),w.currentY=t,Fa();const r=Gr(t);r!==w.pendingDropId&&(w.pendingDropId=r,En(),r&&y()?.querySelector(`.quick-action-swipe[data-quick-id="${r}"]`)?.classList.add("drop-hint-after"))}function Ya(e){if(w.id){if(ot(),w.mode==="swipe"){const t=n.quickActionSwipeOpenId===w.id,a=e-w.startX;(t?-74+a:a)<-36?(n.quickActionSwipeOpenId=w.id,Ae(w.id),u()):t&&a>22?(n.quickActionSwipeOpenId="",Ae(w.id),u()):(Ae(w.id),t&&(n.quickActionSwipeOpenId=w.id,u()))}w.mode==="drag"&&Ua(),Na()}}document.addEventListener("touchstart",e=>{if(tn(e.target)||e.target.closest(".quick-action-open"))return;const t=e.target.closest(".quick-action-row");if(!t){!e.target.closest(".quick-action-delete")&&!e.target.closest(".quick-action-swipe")&&n.quickActionSwipeOpenId&&(Ae(n.quickActionSwipeOpenId),n.quickActionSwipeOpenId="",u());return}const a=e.touches?.[0];a&&Ka(a.clientX,a.clientY,t.dataset.quickId||"")},{passive:!0}),document.addEventListener("touchmove",e=>{const t=e.touches?.[0];t&&Qa(t.clientX,t.clientY,()=>e.preventDefault())},{passive:!1}),document.addEventListener("touchend",e=>{const t=e.changedTouches?.[0];Ya(t?.clientX||w.startX)},{passive:!0}),document.addEventListener("touchcancel",()=>{Ae(w.id),En(),w.mode==="drag"&&Ua(),Na()},{passive:!0});let Xa=0,Ga=0;function Jr(e){const t=e.target?.closest?.(".codex-toggle:not(.cc-toggle)");if(!t)return;const a=Date.now();if(a-Xa<320){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation?.();return}Xa=a,e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation?.(),$t(t.dataset.contactId)}function Wr(e){const t=e.target?.closest?.(".cc-toggle");if(!t)return;const a=Date.now();if(a-Ga<320){e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation?.();return}Ga=a,e.preventDefault(),e.stopPropagation(),e.stopImmediatePropagation?.(),qt(t.dataset.contactId)}["pointerdown","touchstart","mousedown","click"].forEach(e=>{document.addEventListener(e,Jr,!0),document.addEventListener(e,Wr,!0)}),document.addEventListener("mousedown",e=>{if(tn(e.target)||e.target.closest(".quick-action-open"))return;const t=e.target.closest(".quick-action-row");if(!t||e.button!==0){!e.target.closest(".quick-action-delete")&&!e.target.closest(".quick-action-swipe")&&n.quickActionSwipeOpenId&&(Ae(n.quickActionSwipeOpenId),n.quickActionSwipeOpenId="",u());return}Ka(e.clientX,e.clientY,t.dataset.quickId||"")}),document.addEventListener("mousemove",e=>{Qa(e.clientX,e.clientY,()=>e.preventDefault())}),document.addEventListener("mouseup",e=>{Ya(e.clientX)});const Zr=Zt;Zt=function(){return Zr()},document.addEventListener("DOMContentLoaded",()=>{z(),Tr(),ja(),za(),pe(),at(n.currentContactId)}),document.addEventListener("focusin",e=>{const t=e.target;if(t?.id==="model-slot-input"){n.modelSlotMenuOpen=!1,nt();return}if(t?.id==="provider-default-model-input"&&(n.providerModelMenuOpen=!0,xe()),t?.id==="provider-key-input"&&t.dataset?.masked==="true"){const a=R();t.value="",t.dataset.masked="false",a._apiKeyDirty=!0,a.apiKey="",n.providerKeyVisible=!0,t.type="text"}}),document.addEventListener("click",e=>{if(In.has(n.currentView)&&n.currentView==="modelSlot"&&!e.target.closest('#model-slot-input, .provider-model-picker, [data-action="toggle-model-slot-menu"]')&&n.modelSlotMenuOpen){n.modelSlotMenuOpen=!1,nt();return}if(n.currentView!=="providerEditor")return;!e.target.closest(".provider-model-picker")&&n.providerModelMenuOpen&&(n.providerModelMenuOpen=!1,xe())})})();
