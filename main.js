/* ============ PROJECT DATA (single source of truth) ============ */
const projects = [
  {
    id:"qr-platform",
    idx:"01",
    name:"Grampanchayat QR & Gharpati Platform",
    tagline:"QR-based property/payment platform deployed across multiple grampanchayats.",
    role:"Development · Deployment · QA · Coordination",
    tech:["Python","Flask/Backend","UPI QR","cPanel/WHM","SSL"],
    overview:"An interactive QR and 'gharpati' (property-holder) platform used by multiple grampanchayats to manage property records and UPI-based payments, generate QR codes, and track collections.",
    purpose:"Give each grampanchayat a self-hosted, low-maintenance way to issue UPI QR codes for property dues, track who has paid, and export records for accounting.",
    myRole:[
      "Built and extended core dashboard features (filtering, sorting, statistics)",
      "Handled multi-instance production deployment for several grampanchayats",
      "Coordinated directly with senior engineers on production-readiness changes"
    ],
    developed:[
      "Payment filtering and sorting by amount remaining, paid/unpaid, approved/unapproved status",
      "Statistics page with CSV export across configurable month ranges",
      "Transaction-note feature embedding house number into UPI QR transaction notes",
      "UPI QR codes showing grampanchayat name, owner name, and house number on both preview and download",
      "Year support for records",
      "'Dakhla' (receipt/record) functionality",
      "Dashboard UI improvements and performance fixes for pages with thousands of records",
      "Fixed a duplicate-entry bug (triple entries) for a user record in Dapoli"
    ],
    tested:[
      "Verified multiple grampanchayat QR sites running correctly across different ports in cPanel",
      "Checked and approved QR codes for Dapoli, Ghivali, Gholwad, and Gandhare",
      "Validated dashboard performance under large record counts"
    ],
    deployed:[
      "Set up domains and subdomains and made sites live (e.g. gharpati platform on smartechsolutionsdg.net, Gandhare and Gholwad domains, saagmo.com subdomains)",
      "Configured SSL certificates for QR code websites",
      "Diagnosed and worked on server load issues",
      "Documented the WHM setup process for onboarding new grampanchayats"
    ],
    challenges:[
      "Keeping dashboards responsive once individual grampanchayats accumulated thousands of payment records",
      "Running many independent grampanchayat instances reliably on shared hosting infrastructure",
      "Coordinating production-readiness changes with a senior engineer under a live deployment"
    ],
    contributions:"Owned the feature work end-to-end for several dashboard and QR-generation improvements, while also handling the operational side — deployment, SSL, and cross-instance testing — that most 'feature dev' roles don't touch.",
    outcome:"Multiple grampanchayat instances (including Dapoli, Ghivali, Gholwad, Gandhare, and Mamachagav) are live in production on individual domains, with documentation in place for onboarding future grampanchayats.",
    timelineTag:"QR Platform"
  },
  {
    id:"smart-card",
    idx:"02",
    name:"Digital Smart Card / Business Card Platform",
    tagline:"A platform for creating and managing downloadable digital business cards.",
    role:"Development · Deployment",
    tech:["Auth/Sessions","PDF Generation","Responsive CSS"],
    overview:"A platform where users register, build a business profile, manage services, and generate a downloadable digital business card.",
    purpose:"Let a business owner create a profile once and produce a shareable, professional digital business card without design tools.",
    myRole:[
      "Built the core platform from user registration through PDF card generation",
      "Deployed the finished product live to a dedicated subdomain"
    ],
    developed:[
      "User registration, login, and user profile",
      "Business profile creation and editing",
      "Profile photo upload and edit flow",
      "Business deletion functionality",
      "Services management — add/edit services shown on the business info page",
      "Dashboard and a redesigned home page UI",
      "Password-visibility toggle on login/forms",
      "Admin / logged-in-user verification before allowing business-detail edits",
      "Responsive fixes for mobile sizing issues",
      "PDF business-card generation (replacing an earlier image-download option)"
    ],
    tested:[
      "Verified authentication/authorization checks so only the owning user or admin could edit a business",
      "Checked mobile responsiveness across sizing issues"
    ],
    deployed:[
      "Took the platform live at smartcard.smartechsolutionsdg.net"
    ],
    challenges:[
      "Getting profile/photo editing and PDF generation working reliably across devices",
      "Restricting edit access correctly between regular users and admins"
    ],
    contributions:"Primary developer on this project — built nearly every user-facing flow, from account creation to the final PDF export, and shipped it to production.",
    outcome:"Live, production platform at smartcard.smartechsolutionsdg.net supporting registration, business profiles, services, and PDF business-card downloads.",
    timelineTag:"Smart Card"
  },
  {
    id:"e-auction",
    idx:"03",
    name:"E-Auction Portal",
    tagline:"QA, requirements, and technical coordination on a client e-auction system.",
    role:"QA · Requirements · Technical Coordination · Deployment",
    tech:["Manual QA","Process Documentation","AI Chatbot Integration"],
    overview:"An e-auction portal built for a client. I did not develop the core system — my contribution was on the requirements, QA, coordination, and related AI-chatbot deployment side.",
    purpose:"Support a client-facing e-auction workflow, with my role focused on making sure the workflow was correctly understood, documented, and tested before and after each round of changes.",
    myRole:[
      "Attended requirement and review meetings with senior engineers",
      "Documented the auction workflow for the team",
      "Tested the portal, found and reported problems",
      "Coordinated fixes and communicated with the client/project stakeholders",
      "Deployed and hosted an AI chatbot related to the project on a new server"
    ],
    developed:[
      "Workflow documentation (PPT) describing how the e-auction process should work"
    ],
    tested:[
      "Inspected the e-auction portal, identified functional problems, and reported them to the senior engineer",
      "Verified functionality updates after fixes were made"
    ],
    deployed:[
      "Hosted the project's AI chatbot on a new server and coordinated with the digital marketer"
    ],
    challenges:[
      "Understanding an in-progress workflow well enough to document and test it accurately",
      "Communicating findings clearly between the client side and the development team"
    ],
    contributions:"Acted as the bridge between the client's requirements and the development team — reviewing the workflow, documenting it, breaking the system to find bugs, and making sure issues actually got fixed.",
    outcome:"Delivered workflow documentation and a tested feedback loop for the portal, plus a deployed AI chatbot and supporting promotional content for the project.",
    timelineTag:"E-Auction"
  },
  {
    id:"ai-chatbot",
    idx:"04",
    name:"AI Chatbot",
    tagline:"Training, tuning, and deployment of an AI chatbot used across two projects.",
    role:"Data Collection · Integration · Deployment",
    tech:["AI/Chatbot Platform","Server Deployment"],
    overview:"An AI chatbot integrated into both the e-auction project and the main SmarTech Solutions website, refined through iterative training-data work.",
    purpose:"Provide an automated first line of client-facing responses for SmarTech Solutions and the e-auction portal.",
    myRole:[
      "Collected and tested training data with a colleague",
      "Updated conversation flow and functionality",
      "Deployed the chatbot to production servers"
    ],
    developed:[
      "Conversation flow updates and functionality updates based on testing feedback",
      "AI chat integration on the smartechsolutions.in website"
    ],
    tested:[
      "Collected and tested chatbot training data with Gaurav Bhaiya"
    ],
    deployed:[
      "Hosted the chatbot on a new server for the e-auction project",
      "Got AI chat working live on smartechsolutions.in"
    ],
    challenges:[
      "Improving response quality through iterative training-data collection and testing",
      "Keeping the chatbot's flow consistent across two different projects"
    ],
    contributions:"Handled the practical, iterative work of getting a chatbot from 'trained' to 'actually working in production' — data collection, flow fixes, and deployment.",
    outcome:"A working AI chatbot live on the SmarTech Solutions website and hosted separately for the e-auction project.",
    timelineTag:"AI Chatbot"
  },
  {
    id:"smartech-website",
    idx:"05",
    name:"SmarTech Solutions Website",
    tagline:"The company's main marketing site — AI feature, forms, and client section.",
    role:"Development · Maintenance",
    tech:["Frontend","Forms","AI Integration"],
    overview:"The primary marketing and lead-generation website for SmarTech Solutions.",
    purpose:"Give SmarTech Solutions a live web presence with lead capture (enquiry/order forms) and an AI-assisted chat feature.",
    myRole:[
      "Added new features and forms to the live site",
      "Handled ongoing maintenance"
    ],
    developed:[
      "AI feature / chat integration",
      "Enquiry form",
      "Order form",
      "Clients section",
      "AI-generated promotional content and video for the site"
    ],
    tested:[
      "Checked form submissions and site functionality during updates"
    ],
    deployed:[
      "Maintained the live site at smartechsolutions.in"
    ],
    challenges:[
      "Integrating AI chat cleanly into an existing marketing site without disrupting other flows"
    ],
    contributions:"Added and maintained the site's core lead-generation and AI features.",
    outcome:"A live company site with working enquiry/order forms, a clients section, and an AI chat feature.",
    timelineTag:"SmarTech Website"
  },
  {
    id:"training-institute",
    idx:"06",
    name:"SmarTech Training Institute Website",
    tagline:"A separate site for SmarTech's training institute, converted to static and handed off for marketing.",
    role:"Development · Maintenance · Marketing Coordination",
    tech:["Static Frontend","Maps","Social Integration"],
    overview:"A dedicated website for SmarTech's training institute, kept intentionally separate from the main SmarTech Solutions site.",
    purpose:"Give the training institute its own simple, low-maintenance web presence listing courses and contact/location details.",
    myRole:[
      "Built and maintained course and content sections",
      "Converted the site to a fully static frontend",
      "Coordinated the social media handoff to the digital-marketing team"
    ],
    developed:[
      "Course information listings",
      "Location/map integration",
      "Social media links section",
      "Removed the backend entirely and rebuilt the site as a fully static frontend"
    ],
    tested:[
      "Checked posted content on Instagram and Facebook after handoff to confirm publishing"
    ],
    deployed:[
      "Maintained the static site in production",
      "Set up Twitter and YouTube accounts for the institute and handed off login access to the marketing team"
    ],
    challenges:[
      "Migrating a backend-driven site to static without losing content",
      "Coordinating a clean handoff of new social accounts to a non-technical marketing owner"
    ],
    contributions:"Simplified the site's architecture for easier long-term maintenance and set up the institute's initial social presence before handing ongoing marketing off to the digital-marketing team.",
    outcome:"A live, low-maintenance static site for the training institute with active social accounts managed by the marketing team.",
    timelineTag:"Training Institute"
  }
];

const skillGroups = [
  {name:"Development", items:["Python","Flask/Backend basics","HTML","CSS","JavaScript"]},
  {name:"Backend", items:["Authentication & Authorization","CRUD flows","Session/user management"]},
  {name:"Deployment", items:["Linux (cPanel/WHM)","Domains & Subdomains","SSL Certificates","Multi-instance Hosting"]},
  {name:"AI", items:["Chatbot Training Data","Chatbot Flow Design","AI Content/Video Generation"]},
  {name:"Professional", items:["QA / Testing","Requirements Gathering","Client Communication","Technical Documentation","Project Coordination"]}
];

const timelineData = [
  {date:"May 2026", title:"QR / Gharpati platform — feature build-out", tag:"qr-platform", detail:"Payment filtering & sorting, stats + CSV export, transaction notes, UPI QR upgrades, dashboard performance fixes for large record sets."},
  {date:"May – Jun 2026", title:"Multi-grampanchayat production deployment", tag:"qr-platform", detail:"Domains, subdomains, SSL, WHM setup, and going live across Dapoli, Ghivali, Gholwad, Gandhare, and Mamachagav."},
  {date:"Jun 2026", title:"Business Card platform built end-to-end", tag:"smart-card", detail:"Registration, profiles, services, PDF card generation, and production launch at smartcard.smartechsolutionsdg.net."},
  {date:"Jun – Jul 2026", title:"E-Auction QA & AI chatbot training", tag:"e-auction", detail:"Requirement meetings, workflow documentation, portal testing and bug reporting, plus chatbot training-data collection and flow updates."},
  {date:"Jul 2026", title:"AI video & chatbot rollout", tag:"ai-chatbot", detail:"AI promotional videos for the QR and e-auction projects, chatbot hosted on a new server, AI chat live on smartechsolutions.in."},
  {date:"Jul – Aug 2026", title:"Training institute site & marketing handoff", tag:"training-institute", detail:"Static frontend conversion, course/location content, and coordinating the institute's new social accounts with the marketing team."}
];

/* ============ RENDER: PROJECTS ============ */
const projGrid = document.getElementById('projGrid');
projects.forEach(p=>{
  const card = document.createElement('button');
  card.className='pcard';
  card.onclick=()=>openCaseStudy(p.id);
  card.innerHTML = `
    <div class="idx">${p.idx}</div>
    <h3>${p.name}</h3>
    <div class="role">${p.role}</div>
    <p>${p.tagline}</p>
    <div class="chips">${p.tech.map(t=>`<span class="chip">${t}</span>`).join('')}</div>
  `;
  projGrid.appendChild(card);
});

function caseStudyHTML(p){
  const list = arr => `<ul>${arr.map(i=>`<li>${i}</li>`).join('')}</ul>`;
  return `
    <div class="eyebrow">Case Study ${p.idx}</div>
    <h2>${p.name}</h2>
    <div class="role">${p.role}</div>
    <div class="ms-block"><h4>Overview</h4><p>${p.overview}</p></div>
    <div class="ms-block"><h4>Purpose</h4><p>${p.purpose}</p></div>
    <div class="ms-block"><h4>My Role</h4>${list(p.myRole)}</div>
    <div class="ms-block"><h4>What I Developed</h4>${list(p.developed)}</div>
    <div class="ms-block"><h4>What I Tested</h4>${list(p.tested)}</div>
    <div class="ms-block"><h4>What I Deployed</h4>${list(p.deployed)}</div>
    <div class="ms-block"><h4>Technical Challenges</h4>${list(p.challenges)}</div>
    <div class="ms-block"><h4>How I Contributed</h4><p>${p.contributions}</p></div>
    <div class="ms-block"><h4>Technologies</h4><div class="ms-tech">${p.tech.map(t=>`<span class="chip">${t}</span>`).join('')}</div></div>
    <div class="ms-block"><h4>Outcome</h4><p>${p.outcome}</p></div>
  `;
}
function openCaseStudy(id){
  const p = projects.find(x=>x.id===id);
  if(!p) return null;
  document.getElementById('modalBody').innerHTML = caseStudyHTML(p);
  document.getElementById('modalBackdrop').classList.add('open');
  return p;
}
function closeModal(){ document.getElementById('modalBackdrop').classList.remove('open'); }
document.addEventListener('keydown', e=>{ if(e.key==='Escape') closeModal(); });

/* ============ RENDER: SKILLS ============ */
const skillGrid = document.getElementById('skillGrid');
skillGroups.forEach(g=>{
  const div = document.createElement('div');
  div.className='skill-cat';
  div.innerHTML = `<h5>${g.name}</h5><div class="skill-tags">${g.items.map(i=>`<span class="skill-tag">${i}</span>`).join('')}</div>`;
  skillGrid.appendChild(div);
});

/* ============ RENDER: TIMELINE ============ */
const tlWrap = document.getElementById('timeline');
timelineData.forEach((t,i)=>{
  const div = document.createElement('div');
  div.className='tl-item'+(i===0?' active':'');
  div.innerHTML = `<div class="tl-date">${t.date}</div><div class="tl-title">${t.title}</div><div class="tl-detail">${t.detail}</div>`;
  div.onclick = ()=>{ div.classList.toggle('active'); };
  tlWrap.appendChild(div);
});

/* ============ MODE SWITCH (Interactive / Classic) ============ */
function setMode(mode){
  const consoleSec = document.getElementById('console');
  document.getElementById('btnInteractive').classList.toggle('active', mode==='interactive');
  document.getElementById('btnClassic').classList.toggle('active', mode==='classic');
  consoleSec.style.display = mode==='interactive' ? '' : 'none';
}

/* ============ BOOT SEQUENCE ============ */
const bootEl = document.getElementById('bootLines');
const bootMsgs = ["Initializing environment...", "Loading portfolio module...", "Mounting virtual filesystem...", "Ready."];
let bi=0;
function typeBoot(){
  if(bi>=bootMsgs.length) return;
  bootEl.textContent += (bi>0?'\n':'') + bootMsgs[bi];
  bi++;
  setTimeout(typeBoot, 260);
}
typeBoot();

/* ============ CONSOLE ENGINE ============ */
const outputEl = document.getElementById('output');

function printLine(text, cls){
  const d = document.createElement('div');
  d.className = 'out-line ' + (cls||'out-dim');
  d.textContent = text;
  outputEl.appendChild(d);
  outputEl.scrollTop = outputEl.scrollHeight;
}
function printHTML(html){
  const d = document.createElement('div');
  d.className='out-line';
  d.innerHTML = html;
  outputEl.appendChild(d);
  outputEl.scrollTop = outputEl.scrollHeight;
}
function clearOutput(){
  outputEl.innerHTML='';
}
function printProjectCard(p){
  printHTML(`<div class="proj-card"><h4>${p.name}</h4><div class="tag">${p.role}</div><p>${p.overview}</p><p style="margin-top:10px;color:var(--amber);cursor:pointer;" onclick="openCaseStudy('${p.id}')">→ open full case study</p></div>`);
}

/* ---- environment switching ---- */
function switchEnv(env){
  // Cancel any running Python execution when switching env
  if(env !== 'python' && pyAbortController){ pyAbortController.abort(); }

  document.getElementById('pythonPane').classList.toggle('hidden', env!=='python');
  document.getElementById('linuxPane').classList.toggle('hidden', env!=='linux');
  document.getElementById('runBtn').style.display = env==='python' ? '' : 'none';

  // Status bar + stop button only shown in Python mode
  const cs = document.getElementById('consoleStatus');
  const sb = document.getElementById('stopBtn');
  if(cs){ cs.style.display = env==='python' ? '' : 'none'; }
  if(sb && env !== 'python'){ sb.style.display = 'none'; }

  outputEl.innerHTML='';
  if(env==='python'){
    renderQuickCmds([
      {label:'print(projects)', code:'from portfolio import projects\n\nprint(projects)'},
      {label:'projects.list()', code:'from portfolio import projects\n\nprojects.list()'},
      {label:'projects.show("qr-platform")', code:'from portfolio import projects\n\nprojects.show("qr-platform")'},
      {label:'skills.list()', code:'from portfolio import skills\n\nskills.list()'},
      {label:'experience.show()', code:'from portfolio import experience\n\nexperience.show()'},
      {label:'about()', code:'from portfolio import about\n\nabout()'},
      {label:'contact()', code:'from portfolio import contact\n\ncontact()'},
    ]);
    checkPythonHealth();
  } else {
    renderLinuxQuickCmds();
    // printLine('dipanshu@portfolio:~ $ # Linux (simulated)', 'out-cmd');
    // printLine("Virtual filesystem at /workspace  —  type 'help' for commands.", 'out-teal');
    setTimeout(()=>document.getElementById('linuxInput')?.focus(), 50);
  }
}

function renderQuickCmds(list){
  const qc = document.getElementById('quickcmds');
  qc.innerHTML='';
  list.forEach(item=>{
    const b = document.createElement('button');
    b.className='qc'; b.textContent=item.label||item;
    b.onclick = ()=>{
      document.getElementById('pyCode').value = item.code||item;
      runPython();
    };
    qc.appendChild(b);
  });
}
function renderLinuxQuickCmds(){
  const qc = document.getElementById('quickcmds');
  qc.innerHTML='';
  const cmds = ['ls','pwd','tree','cat about.txt','cd projects','help'];
  cmds.forEach(cmd=>{
    const b = document.createElement('button');
    b.className='qc'; b.textContent=cmd;
    b.onclick = ()=>{
      const inp = document.getElementById('linuxInput');
      printLine('$ '+cmd, 'out-cmd');
      linuxDispatch(cmd);
    };
    qc.appendChild(b);
  });
}

/* ==========================================================
   PYTHON — REAL EXECUTION VIA BACKEND API
   ========================================================== */

let pyReady = false;
let pyExecuting = false;

function setPyStatus(state, text, sessionText){
  const dot  = document.getElementById('pyStatusDot');
  const msg  = document.getElementById('pyStatusText');
  const sess = document.getElementById('pySessionText');
  dot.className = 'py-status-dot ' + state;
  msg.textContent = '';
  msg.appendChild(dot);
  msg.appendChild(document.createTextNode(' ' + text));
  if(sess && sessionText !== undefined) sess.textContent = sessionText;
}

async function checkPythonHealth(){
  setPyStatus('starting','Starting Python sandbox…');
  document.getElementById('runBtn').disabled = true;
  try{
    const r = await fetch('/api/health', {signal: AbortSignal.timeout(5000)});
    if(r.ok){
      const data = await r.json();
      pyReady = true;
      if(data.sandbox === 'busy'){
        setPyStatus('busy','Python sandbox busy — try again shortly');
      } else {
        setPyStatus('ready','Python ready');
        document.getElementById('runBtn').disabled = false;
        runPython();
      }
    } else {
      setPyStatus('error','Python unavailable (server error)');
    }
  } catch(e){
    pyReady = false;
    setPyStatus('error','Python unavailable — running in offline mode');
    document.getElementById('runBtn').disabled = false;
    printLine('⚠  Backend not reachable. Open portfolio.html via the FastAPI server (python -m uvicorn backend.main:app).', 'out-amber');
    printLine('   For local dev: cd backend && pip install -r requirements.txt && python main.py', 'out-dim');
  }
}

function updateSessionDisplay(sessionData){
  if(!sessionData) return;
  const sess = document.getElementById('pySessionText');
  if(!sess) return;
  if(sessionData.active){
    const mins = Math.ceil(sessionData.expires_in_seconds / 60);
    const vars = sessionData.variable_count;
    sess.textContent = `Session active · ${vars} var${vars!==1?'s':''} · expires ~${mins}min`;
  } else {
    sess.textContent = 'New session';
  }
}

let pyAbortController = null;

function stopPython(){
  if(pyAbortController){ pyAbortController.abort(); }
}

async function runPython(){
  if(pyExecuting) return;
  const code = document.getElementById('pyCode').value;
  if(!code.trim()){ printLine('Nothing to run.', 'out-dim'); return; }

  if(!pyReady){
    printLine('⚠  Python backend not connected. Start the server first:', 'out-amber');
    printLine('   cd backend && pip install -r requirements.txt && python main.py', 'out-dim');
    return;
  }

  pyExecuting = true;
  pyAbortController = new AbortController();
  outputEl.innerHTML='';
  document.getElementById('runBtn').disabled = true;
  const stopBtn = document.getElementById('stopBtn');
  if(stopBtn){ stopBtn.style.display = 'flex'; }
  setPyStatus('executing','Executing…');



  try{
    const resp = await fetch('/api/python/execute', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({code}),
      signal: pyAbortController.signal,
    });

    const data = await resp.json();

    if(resp.status === 503){
      setPyStatus('busy','Sandbox busy — try again shortly');
      printLine('Python sandbox is currently busy. Please try again shortly.', 'out-amber');
    } else {
      if(data.stdout){
        data.stdout.split('\n').forEach((line, i, arr) => {
          if(i < arr.length - 1 || line){
            printLine(line, 'out-dim');
          }
        });
      }
      if(data.stderr){
        data.stderr.split('\n').forEach(line => {
          printLine(line, 'out-err');
        });
      }
      if(data.execution_ms !== undefined){
        printLine(`\nExecuted in ${data.execution_ms}ms`, 'out-exec-time');
      }
      updateSessionDisplay(data.session);
      if(data.timed_out){
        setPyStatus('ready','Python ready · last run timed out');
      } else if(data.error === 'sandbox_crash'){
        setPyStatus('ready','Python ready · sandbox crash (try smaller data)');
      } else {
        setPyStatus('ready','Python ready', '');
      }
    }
  } catch(err){
    if(err.name === 'AbortError'){
      printLine('\n⚡ Execution stopped by user.', 'out-amber');
      setPyStatus('ready','Python ready');
    } else {
      printLine('Network error: could not reach Python backend.', 'out-err');
      printLine('Make sure the server is running: python backend/main.py', 'out-dim');
      setPyStatus('error','Python unavailable');
      pyReady = false;
    }
  } finally {
    pyExecuting = false;
    pyAbortController = null;
    const stopBtn = document.getElementById('stopBtn');
    if(stopBtn){ stopBtn.style.display = 'none'; }
    if(pyReady) document.getElementById('runBtn').disabled = false;
  }
}

document.getElementById('pyCode').addEventListener('keydown', e=>{
  if(e.key==='Tab'){
    e.preventDefault();
    const ta = e.target;
    const start = ta.selectionStart;
    const end   = ta.selectionEnd;
    ta.value = ta.value.substring(0, start) + '    ' + ta.value.substring(end);
    ta.selectionStart = ta.selectionEnd = start + 4;
    return;
  }
  if((e.ctrlKey||e.metaKey) && e.key==='Enter'){
    e.preventDefault();
    runPython();
  }
});

/* ==========================================================
   LINUX — CLIENT-SIDE SIMULATED TERMINAL
   ========================================================== */

const _vfsCore = {
  type:'dir', name:'workspace',
  children:{
    'about.txt':{
      type:'file',
      content:[
        'Dipanshu Agarwal — Web Developer',
        '================================',
        '',
        "B.Sc. IT student working professionally as a web developer at SmarTech Solutions.",
        '',
        "Most of what I do isn't classroom work — it's building and modifying applications",
        "that are already live, testing systems before they reach production, and sitting",
        "in on requirement calls where the spec is still being figured out.",
        '',
        "Day to day that means writing features for a QR-based payment platform used by",
        "multiple grampanchayats, building a business-card platform from registration",
        "through PDF export, and handling the less glamorous side of shipping software:",
        "domains, SSL, cPanel/WHM, and debugging why a dashboard lags at ten thousand records.",
        '',
        "I'd rather learn against a real deployment than a tutorial.",
      ]
    },
    'skills.txt':{
      type:'file',
      content:[
        'Skills',
        '======',
        '',
        ...skillGroups.flatMap(g=>[
          g.name + ':',
          '  ' + g.items.join(', '),
          ''
        ])
      ]
    },
    'experience.txt':{
      type:'file',
      content:[
        'Work Experience',
        '===============',
        '',
        'SmarTech Solutions — Web Developer Intern',
        'Period: May 2026 – Present',
        '',
        'Areas:',
        '  • Development — Web applications, dashboards, forms, frontend/backend features',
        '  • QA & Testing — Application testing, bug identification and reporting',
        '  • Deployment & Infrastructure — Domain setup, SSL, cPanel/WHM, production deployment',
        '  • Requirements & Client Communication — Requirement-gathering, workflow documentation',
        '  • Technical Coordination — Bridging requirements between clients and development team',
        '  • AI & Digital Operations — AI chatbot training, flow updates, promotional video production',
      ]
    },
    'contact.txt':{
      type:'file',
      content:[
        'Contact',
        '=======',
        '',
        'Email:     dipanshu0919@gmail.com',
        'GitHub:    github.com/dipanshu0919',
        'LinkedIn:  linkedin.com/in/dipanshu-ashok-agarwal-3a3309370',
        'Instagram: instagram.com/dipanshu0919',
        'WhatsApp:  +91 8554048836',
      ]
    },
    'resume.txt':{
      type:'file',
      content:[
        'Resume',
        '======',
        '',
        'See the Resume section on this page or download the PDF.',
        '',
        'Summary:',
        '  B.Sc. IT student with hands-on professional experience building,',
        '  testing, and deploying real production web applications.',
      ]
    },
    'projects':{
      type:'dir',
      children: Object.fromEntries(projects.map(p=>[
        p.id,
        {
          type:'dir',
          children:{
            'README.md':{
              type:'file',
              _project_id: p.id,
              content: _buildProjectReadme(p)
            }
          }
        }
      ]))
    }
  }
};

function _buildProjectReadme(p){
  const lines = [
    `# ${p.name}`,
    '',
    `**Role:** ${p.role}`,
    `**Tech:** ${p.tech.join(', ')}`,
    '',
    '## Overview',
    p.overview,
    '',
    '## Purpose',
    p.purpose,
    '',
    '## My Role',
    ...p.myRole.map(r=>'- '+r),
    '',
    '## What I Developed',
    ...p.developed.map(r=>'- '+r),
    '',
    '## What I Tested',
    ...p.tested.map(r=>'- '+r),
    '',
    '## What I Deployed',
    ...p.deployed.map(r=>'- '+r),
    '',
    '## Technical Challenges',
    ...p.challenges.map(r=>'- '+r),
    '',
    '## Outcome',
    p.outcome,
  ];
  return lines;
}

const _vfsUser = {};
const VFS_ROOT = '/workspace';
let lnxCwd = []; 
let lnxHistory = [];
let lnxHistIdx  = -1;
let lnxOutput   = []; 

function lnxPathStr(){
  if(!lnxCwd.length) return VFS_ROOT;
  return VFS_ROOT + '/' + lnxCwd.join('/');
}
function lnxPathDisplay(){
  const p = lnxCwd.length ? '~/' + lnxCwd.join('/') : '~';
  return p;
}
function updateCwdLabel(){
  const el = document.getElementById('cwdLabel');
  if(el) el.textContent = lnxPathDisplay();
}

function lnxResolve(segments){
  let node = _vfsCore;
  let cur = node.children;
  for(const seg of segments){
    if(!cur || !cur[seg]) return null;
    node = cur[seg];
    cur = node.children||{};
  }
  return node;
}
function lnxUserKey(segs){ return segs.join('/'); }
function lnxUserNode(segs){
  const k = lnxUserKey(segs);
  return _vfsUser[k] || null;
}
function lnxListDir(segs){
  const core = lnxResolve(segs);
  const coreChildren = (core && core.type==='dir') ? Object.keys(core.children||{}) : [];
  const prefix = segs.join('/');
  const userKeys = Object.keys(_vfsUser).filter(k=>{
    const parts = k.split('/');
    const parent = parts.slice(0,-1).join('/');
    return parent === prefix && parts.length === segs.length+1;
  });
  const userNames = userKeys.map(k=>k.split('/').pop());
  return [...new Set([...coreChildren, ...userNames])];
}

function lnxGetNode(segs){
  const user = lnxUserNode(segs);
  if(user) return user;
  return lnxResolve(segs);
}
function lnxIsDir(segs){
  const n = lnxGetNode(segs);
  if(n && n.type==='dir') return true;
  const prefix = segs.join('/') + '/';
  return Object.keys(_vfsUser).some(k=>k.startsWith(prefix));
}

function parseCmdLine(raw){
  let redir = null;
  let pipe  = null;
  const redirMatch = raw.match(/^(.+?)\s*>\s*(\S+)\s*$/);
  if(redirMatch){
    raw = redirMatch[1];
    redir = redirMatch[2];
  }
  const pipeIdx = raw.indexOf('|');
  if(pipeIdx !== -1){
    pipe = raw.slice(pipeIdx+1).trim();
    raw  = raw.slice(0, pipeIdx).trim();
  }
  const parts = raw.trim().split(/\s+/).filter(Boolean);
  return {cmd: parts[0]||'', args: parts.slice(1), redir, pipe};
}

function linuxKey(e){
  const input = e.target;
  if(e.key==='Enter'){
    e.preventDefault();
    const raw = input.textContent.trim();
    input.textContent='';
    lnxHistIdx = -1;
    if(raw){
      lnxHistory.unshift(raw);
      if(lnxHistory.length>100) lnxHistory.pop();
      printLine('$ '+raw, 'out-cmd');
      linuxDispatch(raw);
    }
    return;
  }
  if(e.key==='ArrowUp'){
    e.preventDefault();
    if(lnxHistIdx < lnxHistory.length-1){
      lnxHistIdx++;
      input.textContent = lnxHistory[lnxHistIdx];
      // Move cursor to end
      const range = document.createRange();
      const sel = window.getSelection();
      range.selectNodeContents(input);
      range.collapse(false);
      sel.removeAllRanges();
      sel.addRange(range);
    }
    return;
  }
  if(e.key==='ArrowDown'){
    e.preventDefault();
    if(lnxHistIdx > 0){
      lnxHistIdx--;
      input.textContent = lnxHistory[lnxHistIdx];
    } else if(lnxHistIdx === 0){
      lnxHistIdx = -1;
      input.textContent = '';
    }
    // Move cursor to end
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(input);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
    return;
  }
  if(e.key==='Tab'){
    e.preventDefault();
    lnxTabComplete(input);
    return;
  }
  if(e.key==='l' && e.ctrlKey){
    e.preventDefault();
    outputEl.innerHTML='';
    return;
  }
}

function lnxTabComplete(input){
  const val = input.textContent;
  const parts = val.split(/\s+/);
  let changed = false;
  if(parts.length <= 1){
    const cmds = ['ls','cd','cat','pwd','clear','help','whoami','echo','printf','tree',
      'history','head','tail','wc','grep','find','sort','uniq','date','uname',
      'free','df','mkdir','touch','cp','mv','rm','sudo','exit'];
    const partial = parts[0]||'';
    const matches = cmds.filter(c=>c.startsWith(partial));
    if(matches.length===1) { input.textContent = matches[0]+' '; changed = true; }
    else if(matches.length>1) printLine(matches.join('  '),'out-dim');
  } else {
    const partial = parts[parts.length-1]||'';
    const names = lnxListDir(lnxCwd);
    const matches = names.filter(n=>n.startsWith(partial));
    if(matches.length===1){
      parts[parts.length-1] = matches[0];
      input.textContent = parts.join(' ');
      changed = true;
    } else if(matches.length>1){
      printLine(matches.join('  '),'out-dim');
    }
  }
  
  if(changed){
    const range = document.createRange();
    const sel = window.getSelection();
    range.selectNodeContents(input);
    range.collapse(false);
    sel.removeAllRanges();
    sel.addRange(range);
  }
}

function linuxDispatch(raw){
  const {cmd, args, redir, pipe} = parseCmdLine(raw);
  const capturedLines = [];
  const origPrint = window._lnxPrint;
  if(redir || pipe){
    window._lnxCapture = capturedLines;
  }
  runLinuxCommand(cmd, args);
  window._lnxCapture = null;
  if(redir && capturedLines.length){
    const segs = [...lnxCwd, redir];
    _vfsUser[lnxUserKey(segs)] = {type:'file', content: capturedLines.map(l=>l.text)};
    printLine(`Wrote ${capturedLines.length} line(s) to ${redir}`, 'out-dim');
  }
  if(pipe && capturedLines.length){
    const pipeText = capturedLines.map(l=>l.text).join('\n');
    runPipeCommand(pipe, pipeText);
  }
}

window._lnxCapture = null;
function lnxPrint(text, cls){
  if(window._lnxCapture !== null){
    window._lnxCapture.push({text, cls});
  } else {
    printLine(text, cls);
  }
}

function runPipeCommand(pipe, inputText){
  const {cmd, args} = parseCmdLine(pipe);
  const lines = inputText.split('\n');
  if(cmd==='grep'){
    const pattern = args[0]||'';
    if(!pattern){ lnxPrint('grep: missing pattern','out-err'); return; }
    lines.filter(l=>l.includes(pattern)).forEach(l=>lnxPrint(l,'out-dim'));
  } else if(cmd==='sort'){
    [...lines].sort().forEach(l=>lnxPrint(l,'out-dim'));
  } else if(cmd==='uniq'){
    let prev=null;
    lines.forEach(l=>{ if(l!==prev){ lnxPrint(l,'out-dim'); prev=l; } });
  } else if(cmd==='head'){
    const n = parseInt(args[0])||10;
    lines.slice(0,n).forEach(l=>lnxPrint(l,'out-dim'));
  } else if(cmd==='tail'){
    const n = parseInt(args[0])||10;
    lines.slice(-n).forEach(l=>lnxPrint(l,'out-dim'));
  } else if(cmd==='wc'){
    lnxPrint(`${lines.length} lines, ${inputText.split(/\s+/).filter(Boolean).length} words, ${inputText.length} chars`,'out-dim');
  } else {
    lnxPrint(`pipe: unknown command '${cmd}'`,'out-err');
  }
}

function runLinuxCommand(cmd, args){
  const BLOCKED = ['curl','wget','apt','apt-get','yum','dnf','npm','pip','cargo',
    'go','gem','brew','shutdown','reboot','poweroff','halt','kill','killall',
    'su','nc','netcat','nmap','ssh','scp','sftp','telnet','ftp',
    'python','python3','node','bash','sh','zsh','fish',
    'chmod','chown','passwd','useradd','userdel','mount','umount',
    'iptables','ufw','systemctl','service','cron','at','crontab'];
  if(BLOCKED.includes(cmd)){
    lnxPrint(`${cmd}: command not available in this sandbox.`, 'out-err');
    if(['curl','wget','requests'].includes(cmd))
      lnxPrint('Network access is disabled in this terminal.','out-dim');
    if(['pip','npm','apt','apt-get'].includes(cmd))
      lnxPrint('Package installation is not permitted.','out-dim');
    return;
  }

  const arg1 = args[0];

  switch(cmd){
    case 'pwd':
      lnxPrint(lnxPathStr(), 'out-dim');
      break;

    case 'cd': {
      if(!arg1 || arg1==='~' || arg1==='/'){
        lnxCwd=[];
        updateCwdLabel();
        break;
      }
      if(arg1==='..') {
        if(lnxCwd.length>0) lnxCwd.pop();
        updateCwdLabel();
        break;
      }
      const parts = arg1.replace(/^\/workspace\/?/,'').split('/').filter(Boolean);
      const newCwd = [...lnxCwd, ...parts];
      if(lnxIsDir(newCwd)){
        lnxCwd = newCwd;
        updateCwdLabel();
      } else {
        lnxPrint(`cd: ${arg1}: No such directory`, 'out-err');
      }
      break;
    }

    case 'ls': {
      let targetSegs = lnxCwd;
      if(arg1) {
        const rel = arg1.replace(/^\/workspace\/?/,'');
        targetSegs = rel ? [...lnxCwd, ...rel.split('/').filter(Boolean)] : lnxCwd;
      }
      const names = lnxListDir(targetSegs);
      if(!names.length){ lnxPrint('(empty)','out-dim'); break; }
      const flags = args.filter(a=>a.startsWith('-')).join('');
      if(flags.includes('l')){
        names.forEach(n=>{
          const childSegs = [...targetSegs, n];
          const node = lnxGetNode(childSegs);
          const isDir = !node || node.type==='dir' || lnxIsDir(childSegs);
          const size = isDir ? '-' : ((node?.content||[]).join('\n').length + 'B');
          lnxPrint(`${isDir?'d':'-'}rw-r--r-- 1 dipanshu portfolio  ${size.toString().padStart(6)}  ${n}`, 'out-dim');
        });
      } else {
        lnxPrint(names.join('   '), 'out-dim');
      }
      break;
    }

    case 'cat': {
      if(!arg1){ lnxPrint('cat: missing file operand','out-err'); break; }
      const segs = [...lnxCwd, arg1];
      const node = lnxGetNode(segs);
      if(!node || node.type==='dir'){
        lnxPrint(`cat: ${arg1}: No such file`,'out-err'); break;
      }
      (node.content||[]).forEach(l=>lnxPrint(l,'out-dim'));
      if(node._project_id){
        const p = projects.find(x=>x.id===node._project_id);
        if(p) printProjectCard(p);
      }
      break;
    }

    case 'head': {
      const nFlag = args.indexOf('-n');
      const n = nFlag>=0 ? parseInt(args[nFlag+1])||10 : 10;
      const fname = args.find(a=>!a.startsWith('-') && a!==args[nFlag+1]);
      if(!fname){ lnxPrint('head: missing file','out-err'); break; }
      const node = lnxGetNode([...lnxCwd, fname]);
      if(!node||node.type!=='file'){ lnxPrint(`head: ${fname}: No such file`,'out-err'); break; }
      (node.content||[]).slice(0,n).forEach(l=>lnxPrint(l,'out-dim'));
      break;
    }

    case 'tail': {
      const nFlag = args.indexOf('-n');
      const n = nFlag>=0 ? parseInt(args[nFlag+1])||10 : 10;
      const fname = args.find(a=>!a.startsWith('-') && a!==args[nFlag+1]);
      if(!fname){ lnxPrint('tail: missing file','out-err'); break; }
      const node = lnxGetNode([...lnxCwd, fname]);
      if(!node||node.type!=='file'){ lnxPrint(`tail: ${fname}: No such file`,'out-err'); break; }
      (node.content||[]).slice(-n).forEach(l=>lnxPrint(l,'out-dim'));
      break;
    }

    case 'wc': {
      if(!arg1){ lnxPrint('wc: missing file','out-err'); break; }
      const node = lnxGetNode([...lnxCwd, arg1]);
      if(!node||node.type!=='file'){ lnxPrint(`wc: ${arg1}: No such file`,'out-err'); break; }
      const text = (node.content||[]).join('\n');
      const lines = node.content.length;
      const words = text.split(/\s+/).filter(Boolean).length;
      const chars = text.length;
      lnxPrint(`  ${lines}  ${words}  ${chars} ${arg1}`, 'out-dim');
      break;
    }

    case 'grep': {
      const pattern = arg1;
      const fname   = args[1];
      if(!pattern){ lnxPrint('grep: missing pattern','out-err'); break; }
      if(!fname)  { lnxPrint('grep: missing file','out-err'); break; }
      const node = lnxGetNode([...lnxCwd, fname]);
      if(!node||node.type!=='file'){ lnxPrint(`grep: ${fname}: No such file`,'out-err'); break; }
      const matches = (node.content||[]).filter(l=>l.includes(pattern));
      if(!matches.length) lnxPrint('(no matches)', 'out-dim');
      else matches.forEach(l=>lnxPrint(l,'out-dim'));
      break;
    }

    case 'find': {
      const nameIdx = args.indexOf('-name');
      const pattern = nameIdx>=0 ? args[nameIdx+1] : arg1||'*';
      function findIn(segs, pat){
        const names = lnxListDir(segs);
        names.forEach(n=>{
          const childSegs=[...segs,n];
          const full=VFS_ROOT+'/'+childSegs.join('/');
          if(!pat || pat==='*' || n.includes(pat.replace(/\*/g,''))){
            lnxPrint(full,'out-dim');
          }
          if(lnxIsDir(childSegs)) findIn(childSegs, pat);
        });
      }
      findIn(lnxCwd, pattern);
      break;
    }

    case 'sort': {
      if(!arg1){ lnxPrint('sort: missing file','out-err'); break; }
      const node = lnxGetNode([...lnxCwd, arg1]);
      if(!node||node.type!=='file'){ lnxPrint(`sort: ${arg1}: No such file`,'out-err'); break; }
      [...(node.content||[])].sort().forEach(l=>lnxPrint(l,'out-dim'));
      break;
    }

    case 'uniq': {
      if(!arg1){ lnxPrint('uniq: missing file','out-err'); break; }
      const node = lnxGetNode([...lnxCwd, arg1]);
      if(!node||node.type!=='file'){ lnxPrint(`uniq: ${arg1}: No such file`,'out-err'); break; }
      let prev=null;
      (node.content||[]).forEach(l=>{ if(l!==prev){ lnxPrint(l,'out-dim'); prev=l; } });
      break;
    }

    case 'echo': {
      const text = args.join(' ');
      lnxPrint(text, 'out-dim');
      break;
    }

    case 'printf': {
      const fmt = (arg1||'').replace(/\\n/g,'\n').replace(/\\t/g,'\t');
      const rest = args.slice(1).join(' ');
      lnxPrint(fmt + rest, 'out-dim');
      break;
    }

    case 'tree': {
      function treeNode(segs, prefix){
        const names = lnxListDir(segs);
        names.forEach((n,i)=>{
          const isLast = i===names.length-1;
          const branch = isLast ? '└── ' : '├── ';
          lnxPrint(prefix+branch+n, 'out-dim');
          const childSegs=[...segs,n];
          if(lnxIsDir(childSegs)){
            treeNode(childSegs, prefix+(isLast?'    ':'│   '));
          }
        });
      }
      lnxPrint(lnxPathStr(), 'out-amber');
      treeNode(lnxCwd, '');
      break;
    }

    case 'mkdir': {
      if(!arg1){ lnxPrint('mkdir: missing operand','out-err'); break; }
      const segs=[...lnxCwd,arg1];
      _vfsUser[lnxUserKey(segs)] = {type:'dir'};
      lnxPrint(`Created directory ${arg1}`,'out-dim');
      break;
    }

    case 'touch': {
      if(!arg1){ lnxPrint('touch: missing operand','out-err'); break; }
      const segs=[...lnxCwd,arg1];
      if(!lnxGetNode(segs)){
        _vfsUser[lnxUserKey(segs)]={type:'file',content:[]};
      }
      lnxPrint(`Touched ${arg1}`,'out-dim');
      break;
    }

    case 'rm': {
      if(!arg1){ lnxPrint('rm: missing operand','out-err'); break; }
      const segs=[...lnxCwd,arg1];
      const key=lnxUserKey(segs);
      if(_vfsUser[key]){
        delete _vfsUser[key];
        lnxPrint(`Removed ${arg1}`,'out-dim');
      } else if(lnxResolve(segs)){
        lnxPrint(`rm: cannot remove '${arg1}': core filesystem is read-only`,'out-err');
      } else {
        lnxPrint(`rm: cannot remove '${arg1}': No such file or directory`,'out-err');
      }
      break;
    }

    case 'cp': {
      const src=args[0], dst=args[1];
      if(!src||!dst){ lnxPrint('cp: missing operand','out-err'); break; }
      const srcNode = lnxGetNode([...lnxCwd,src]);
      if(!srcNode||srcNode.type!=='file'){ lnxPrint(`cp: '${src}': No such file`,'out-err'); break; }
      _vfsUser[lnxUserKey([...lnxCwd,dst])] = {type:'file',content:[...(srcNode.content||[])]};
      lnxPrint(`Copied ${src} -> ${dst}`,'out-dim');
      break;
    }

    case 'mv': {
      const src=args[0], dst=args[1];
      if(!src||!dst){ lnxPrint('mv: missing operand','out-err'); break; }
      const srcKey = lnxUserKey([...lnxCwd,src]);
      const srcNode = _vfsUser[srcKey];
      if(!srcNode){ lnxPrint(`mv: '${src}': No such file (only user-created files can be moved)`,'out-err'); break; }
      _vfsUser[lnxUserKey([...lnxCwd,dst])] = srcNode;
      delete _vfsUser[srcKey];
      lnxPrint(`Moved ${src} -> ${dst}`,'out-dim');
      break;
    }

    case 'whoami':
      lnxPrint('dipanshu', 'out-dim');
      break;

    case 'date':
      lnxPrint(new Date().toUTCString() + '  [simulated portfolio sandbox]', 'out-dim');
      break;

    case 'uname': {
      const flags = args.join('');
      if(flags.includes('a')){
        lnxPrint('PortfolioOS 1.0.0 portfolio-sandbox x86_64 GNU/Linux [simulated]', 'out-dim');
      } else if(flags.includes('r')){
        lnxPrint('1.0.0-portfolio', 'out-dim');
      } else {
        lnxPrint('PortfolioOS', 'out-dim');
      }
      break;
    }

    case 'free': {
      lnxPrint('               total       used       free', 'out-dim');
      lnxPrint('Mem:          256Mi       64Mi      192Mi  [simulated sandbox]', 'out-dim');
      lnxPrint('Swap:           0Mi        0Mi        0Mi', 'out-dim');
      break;
    }

    case 'df': {
      lnxPrint('Filesystem      Size  Used Avail Use% Mounted on', 'out-dim');
      lnxPrint('portfolio-vfs   100M  12M   88M  12% /workspace  [simulated]', 'out-dim');
      break;
    }

    case 'history': {
      if(!lnxHistory.length){ lnxPrint('(empty history)','out-dim'); break; }
      [...lnxHistory].reverse().forEach((h,i)=>{
        lnxPrint(`  ${String(i+1).padStart(3)}  ${h}`, 'out-dim');
      });
      break;
    }

    case 'clear':
      outputEl.innerHTML='';
      break;

    case 'help': {
      const helpText = [
        ['Navigation',  'pwd, cd <dir>, ls [dir], ls -l [dir], tree'],
        ['Files',       'cat <file>, head [-n N] <file>, tail [-n N] <file>'],
        ['Search',      'grep <pattern> <file>, find [-name pattern], wc <file>'],
        ['Data',        'sort <file>, uniq <file>'],
        ['Output',      'echo [text], printf [fmt]'],
        ['File ops',    'mkdir <dir>, touch <file>, cp <src> <dst>, mv <src> <dst>, rm <file>'],
        ['System',      'whoami, date, uname [-a], free, df'],
        ['Terminal',    'history, clear, Ctrl+L, ↑↓ arrow history, Tab completion'],
        ['Pipes',       'cmd | grep pattern  ·  cmd | sort  ·  cmd | head'],
        ['Redirect',    'echo hello > file.txt'],
      ];
      lnxPrint('Portfolio Linux Terminal — Simulated (safe, client-side only)', 'out-amber');
      lnxPrint('', 'out-dim');
      helpText.forEach(([cat,cmds])=>{
        lnxPrint(`  ${cat.padEnd(12)} ${cmds}`, 'out-dim');
      });
      lnxPrint('', 'out-dim');
      lnxPrint('Portfolio commands:', 'out-teal');
      lnxPrint('  cat about.txt      cat skills.txt      cat experience.txt', 'out-dim');
      lnxPrint('  cat contact.txt    ls projects         cd projects && ls', 'out-dim');
      lnxPrint('  cd projects/qr-platform && cat README.md', 'out-dim');
      break;
    }

    case 'sudo':
      if(args.join(' ')==='hire dipanshu'){
        lnxPrint('Permission denied — but feel free to reach out via email!', 'out-err');
        lnxPrint('→ dipanshu0919@gmail.com', 'out-amber');
      } else {
        lnxPrint(`sudo: ${args.join(' ')}: command not available in this sandbox`, 'out-err');
      }
      break;

    case 'exit':
      lnxPrint('logout (session ended — refresh page to restart)', 'out-amber');
      break;

    case '':
      break;

    default:
      lnxPrint(`${cmd}: command not found — type 'help' for available commands`, 'out-err');
  }
}

// Hook linuxInput keydown
document.getElementById('linuxInput').addEventListener('keydown', linuxKey);

// Initialize
switchEnv('python');
updateCwdLabel();