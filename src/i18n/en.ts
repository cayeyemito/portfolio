import type { Messages } from './es'

// English strings: same shape as es.ts, enforced by the Messages type.
export const en: Messages = {
  nav: {
    label: 'Sections',
    projects: 'Projects',
    build: 'How it is built',
    experience: 'Experience',
    stack: 'Stack',
    contact: 'Contact',
    switchLanguage: 'Leer en español',
    menu: 'Menu',
    openMenu: 'Open menu',
    close: 'Close',
    closeMenu: 'Close menu',
  },
  theme: {
    light: 'Light theme',
  },
  profile: {
    focus: 'Backend and DevOps',
    intro:
      'I am a junior full stack developer based in Barcelona. I have been on both sides of a deployment, first looking after *the machines that build and ship the code*, and then writing *the code that reaches production*.',
    tags: ['Java', 'Spring Boot', 'TypeScript', 'Next.js', 'Azure', 'Terraform', 'Docker'],
    available: 'Open to work',
    languages: [
      { name: 'Spanish · Catalan', level: 'Native' },
      { name: 'English', level: 'Advanced' },
    ],
  },
  // Only English CVs on the English site.
  cvs: [
    {
      label: 'Full Stack / Backend',
      short: 'Full Stack CV',
      href: '/cv/Cayetano_Yeste_CV_FullStack_EN.pdf',
    },
    {
      label: 'DevOps / IT Operations',
      short: 'DevOps CV',
      href: '/cv/Cayetano_Yeste_CV_DevOps_EN.pdf',
    },
  ],
  experience: [
    {
      company: 'EY',
      role: 'Junior IT Consultant',
      period: 'Oct 2025 — Jun 2026',
      kind: 'Training contract · Barcelona, hybrid',
      points: [
        'I built new features and fixed bugs in the NH Hotels website, from the requirements analysis through to testing and deployment.',
        'On the backend, with Spring Boot, I wrote REST API endpoints, business logic and data access with JPA/Hibernate, plus the SQL queries that had to be written by hand.',
        'On the frontend, with Vue, I extended existing components, connected them to the API and built new ones.',
        'I brought the content managed in the Tridion CMS into the application.',
        'The project had no tests, so I wrote my own, with JUnit and on the frontend, to check my own changes. I wrote them with the help of generative AI, and they saved me a lot of manual checking.',
        'I deployed to the test environment with Jenkins jobs and worked with branches and pull requests in Git. We organised the work in Scrum sprints in Jira, and I also wrote technical documentation.',
      ],
    },
    {
      company: 'Itequia',
      role: 'DevOps Engineer · intern',
      period: 'Mar 2021 — Jun 2022',
      kind: 'Internship · IT consultancy of about 35 people',
      points: [
        'Together with a colleague, I looked after the Azure DevOps Pipelines build agents, on Windows machines both in Azure and on our own servers, so that every push got built and deployed.',
        'When an agent or a pipeline failed, I looked for the cause in the logs, and only restarted things to keep work going in the meantime.',
        'I wrote PowerShell and Bash scripts for maintenance, such as the daily backups, cleaning up old files and jobs on the SQL database.',
        'I handled incidents in Jira Service Management, and every day we had a follow-up meeting with management and the project managers.',
      ],
    },
    {
      company: 'Little Suite',
      role: 'Data analyst',
      period: 'Feb 2019 — Aug 2020',
      kind: 'Part time',
      points: [
        'I kept the MySQL databases running and looked after their integrity and security.',
        'I prepared Excel reports and presentations for management and for clients.',
      ],
    },
  ],
  education: {
    title: 'Education',
    items: [
      { period: '2024 — 2026', name: 'DAW · Web Application Development (VET diploma) · IFP' },
      {
        period: '2020 — 2022',
        name: "DAM · Multiplatform Application Development (VET diploma) · IES Joan d'Àustria",
      },
    ],
  },
  projects: {
    title: 'Projects',
    path: '~/work',
    part: 'My part',
    caseStudy: 'Read the case',
    repo: 'View the repository',
    workflows: {
      caption: 'GitHub Actions · workflows',
      rows: [
        { label: 'Pull request', steps: ['lint', 'test', 'build', 'terraform plan'] },
        { label: 'Push to main', steps: ['build', 'deploy · OIDC → Azure', 'smoke test'] },
      ],
      scheduled: 'Scheduled',
      scheduledNote: 'daily check of the site',
    },
  },
  home: {
    experienceTitle: 'Experience',
    experiencePath: 'CHANGELOG.md',
    stackTitle: 'Stack',
    stackNote: 'Technology → where I used it',
    stack: [
      {
        title: 'Backend and data',
        items: [
          { name: '*Java · Spring Boot*', where: 'EY' },
          { name: 'Supabase', where: '01' },
          { name: 'Python', where: '02' },
          { name: 'SQL', where: 'Itequia' },
          { name: 'MySQL', where: 'Little Suite' },
        ],
      },
      {
        title: 'Frontend and mobile',
        items: [
          { name: 'Vue', where: 'EY · 02' },
          { name: 'React · Next.js', where: '01' },
          { name: 'TypeScript', where: '01 · 02' },
          { name: 'Capacitor', where: '01' },
          { name: 'LiveKit', where: '01' },
        ],
      },
      {
        title: 'DevOps and cloud',
        items: [
          { name: '*GitHub Actions*', where: '02' },
          { name: 'Azure', where: 'Itequia · 02' },
          { name: 'Terraform · OIDC', where: '02' },
          { name: 'Azure DevOps · Jenkins', where: 'Itequia · EY' },
          { name: 'Docker · Linux', where: '01 · DAW' },
        ],
      },
    ],
    stackAlso: 'Also: PowerShell and Bash (Itequia) · Git and Jira (EY, Itequia)',
    contactLabel: 'Contact',
    contactTitle: "Let's talk",
    email: 'Email',
    copy: 'Copy',
    copied: 'Copied',
    copiedMessage: 'Email copied to the clipboard',
  },
  status: {
    allOk: 'All systems operational',
    failed: 'Some checks failed',
    justNow: 'just now',
    loading: 'Loading the latest report…',
    missing: 'No report yet: it is generated once a day.',
    error: 'The status report could not be read.',
    summaryOk: 'All good',
    checks: 'checks',
    check: 'Check',
    result: 'Result',
    pass: 'OK',
    fail: 'Failed',
    fullReport: 'See the full report →',
  },
  footer: {
    madeWith: 'Vue · Azure · Terraform · GitHub Actions',
    status: 'Status',
    source: 'Source code',
  },
  diagram: {
    title: 'Portfolio architecture',
    desc: 'A push to GitHub triggers GitHub Actions, which gets temporary access from Entra ID through OIDC and uploads the site with azcopy to an Azure Storage account with a static website. Visitors reach cayeyeste.com over HTTPS through Cloudflare, where a Worker fetches each page from Azure. Every read is logged in Log Analytics.',
    caption:
      'Deployments and visits end up in the same place, the Azure Storage account. GitHub stores no Azure credential.',
    you: 'You',
    repository: 'repository',
    temporary: 'OIDC, temporary',
    visitor: 'Visitor',
    browser: 'browser',
    site: 'static website + /status',
    deployLabel: 'Deployment',
    trafficLabel: 'Traffic',
  },
  frimee: {
    toc: 'Case contents',
    open: 'Open frimee.es',
    facts: [
      { label: 'Site', value: 'frimee.es' },
      { label: 'Hosting', value: 'Vercel' },
      { label: 'Team', value: '2 people' },
      { label: 'Stack', value: 'Next.js · Supabase · Firebase · Capacitor · LiveKit' },
      { label: 'Services', value: 'Google Maps · OpenAI · Claude · Sentry' },
    ],
    imageCaption: 'A trip plan in Frimee: activities by day and the route on the map.',
    video: {
      label:
        'A tour of Frimee: sign in, plans, itinerary, map with the route, shared expenses, chat with the assistant and the same app on Android.',
      caption: 'A 21-second tour of the web and the Android app, built from real screenshots.',
      pause: 'Pause the video',
      play: 'Play the video',
    },
    capturesTitle: 'Screenshots',
    captures: {
      web: 'Web',
      mobile: 'Android app',
      mobileNote: 'The same interface, packaged with Capacitor.',
      webShots: [
        {
          src: '/projects/frimee/web-itinerario.webp',
          width: 1552,
          height: 986,
          alt: 'Itinerary of a trip to New York: the day activities with times, travel between them and the route on the map',
        },
        {
          src: '/projects/frimee/web-chat.webp',
          width: 1286,
          height: 947,
          alt: 'Tokyo plan chat: the assistant suggests three restaurants and creates a poll to vote',
        },
      ],
      mobileShots: [
        {
          src: '/projects/frimee/movil-itinerario.webp',
          alt: 'Android app: itinerary of a day in Tokyo with two activities and the map',
        },
        {
          src: '/projects/frimee/movil-mapa.webp',
          alt: 'Android app: full-screen map with the route of the day',
        },
        {
          src: '/projects/frimee/movil-chat.webp',
          alt: 'Android app: poll created by the assistant in the plan chat',
        },
      ],
    },
    contextTitle: 'Context',
    context: [
      'When a group plans a trip, everything ends up scattered across messages, notes and loose payments. Frimee brings the activities, the map, the calendar, the shared expenses and the chat together in a single plan.',
      'It is a web app and an Android and iOS app built from the same code. We were two: Vicky did the design, part of the UI and pieces such as the push notifications, and I did most of the backend and the frontend.',
    ],
    featuresTitle: 'Key features',
    features: [
      {
        name: 'Chat and calls',
        text: 'The chat runs in real time on Supabase Realtime, and voice and video calls work through LiveKit.',
      },
      {
        name: 'Assistant in the chat',
        text: 'It runs on Claude Haiku from a Supabase function. It answers questions about the plan and can suggest changes, like adding an expense or an activity, which the group then accepts or turns down.',
      },
      {
        name: 'Receipts and tickets',
        text: 'They are read with OCR, using OpenAI, so the expense or the ticket goes into the plan without typing it in.',
      },
      {
        name: 'Map and alerts',
        text: 'Places and routes come from Google Maps, and alerts arrive as push notifications through Firebase.',
      },
    ],
    architectureTitle: 'Architecture',
    architecture: {
      caption: 'System view · three paths',
      clients: 'Clients',
      web: 'Web',
      browser: 'browser',
      app: 'Mobile app',
      direct: 'A · Direct',
      directNote: 'with public keys',
      server: 'B · Through the server',
      serverNote: 'only what needs secrets',
      functions: 'C · Supabase functions',
      functionsNote: 'background tasks',
      boxes: {
        supabase: 'data · login · real time',
        firebase: 'feed · photos · files',
        maps: 'maps',
        livekit: 'calls · video',
        api: 'call token · OCR · routes · delete account',
        token: 'issues the token',
        serviceKey: 'service key',
        ocr: 'receipt OCR',
        assistant: 'assistant',
        push: 'push notifications',
        sync: 'copies published plans to Firestore',
      },
      sentry: 'errors on the client, the server and the edge',
      hosting:
        'the Next.js site and its /api routes, deployed on every merge to main; frimee.es domain at IONOS',
    },
    architectureNote:
      'Clients talk to the services directly with public keys, and the server only steps in when something needs privileges. That is why the Supabase service key never reaches the client.',
    decisionsTitle: 'Decisions',
    why: 'Why',
    decisions: [
      {
        name: 'Next.js',
        note: 'one codebase, three outputs',
        what: 'The same project builds the site with a server and `/api` routes, a static export that Capacitor packages as the app (`BUILD_TARGET=capacitor`) and a standalone Docker image (`BUILD_TARGET=docker`).',
        why: 'We wanted the site and the app to come from the same code, and Next.js made that easy: the app is the site itself, exported and wrapped in Capacitor. The few things that need secret keys went into `/api` routes in the same project, so we did not have to build a separate backend.',
      },
      {
        name: 'Supabase',
        note: 'relational data, login and real time',
        what: 'PostgreSQL with RLS policies for plans, members, chats and expenses, along with authentication and Realtime for the chat. Anything that needs privileges, such as OCR, deleting an account or call tokens, lives in `/api` routes with the service key, while the assistant and the push notifications run in Supabase functions.',
        why: 'For everything with relations we wanted a real SQL database, and Supabase gave us one ready to use, with login and real time included. Since the client talks to the database directly, we protected the data with RLS policies, which was what worried me most.',
      },
      {
        name: 'Firebase',
        note: 'the social side and the files',
        what: 'Firestore holds the feed (posts, likes, comments and photos) and Firebase Storage the uploaded files, converted to WebP when they are images. Push notifications go out through Firebase Cloud Messaging.',
        why: 'Posts, comments and photos are standalone documents that get read a lot and need no relations, so Firestore and its Storage fitted them better than the relational database.',
      },
      {
        name: 'Capacitor',
        note: 'the same UI on Android and iOS',
        what: 'The app is the exported site inside a WebView. Plugins give access to native features: camera, location, push notifications and Android widgets (PlanWidget and CountdownWidget, with a plugin of our own).',
        why: '',
      },
      {
        name: 'LiveKit',
        note: 'voice and video calls',
        what: 'It is managed WebRTC on LiveKit Cloud. The token comes from `/api/livekit/token`, and only if the user is a member of the chat (otherwise it returns 403). It expires after an hour and the route is rate limited. Each call is tracked in the `llamadas` table, and a SQL script closes any that have been open for more than two hours.',
        why: 'Running group video calls ourselves meant setting up and maintaining a media server, and that was beyond what two people could handle. With LiveKit Cloud we only had to issue the token from our API, so we still decide who joins each call: if you are not in the chat, there is no token.',
      },
    ],
    challengeTitle: 'Challenge',
    challenge: {
      title: 'The session did not reach the server from the mobile app',
      text: [
        'On the web, the `/api` routes read the session from the cookie. But the app is a static export inside a WebView: the Supabase client keeps the session in localStorage and requests do not carry that cookie, so on mobile everything that went through the server, like receipt OCR or deleting the account, came back with a 401.',
        'I fixed it by having the clients send the access token in an `Authorization: Bearer` header, which each route validates against Supabase. On the web the cookie keeps working as before.',
      ],
      codeNote:
        'The highlighted line checks the token with Supabase instead of decoding it locally, so an expired or revoked token does not get through.',
    },
    learningsTitle: 'Lessons',
    learnings: [
      {
        name: 'What I would do differently',
        text: 'The same authentication block is copied into five routes. Today I would move it into a single `getRequestUser(req)` function with its own test, so a change to authentication does not have to be made five times.',
      },
      {
        name: 'Web and WebView from day one',
        text: 'The differences between the web and the WebView, like cookies versus tokens or the history (on mobile, the "go back" in settings behaved unpredictably and had to change), showed up late and meant fixes across many screens. Today I would test both from the start.',
      },
    ],
    other: 'Next',
  },
  build: {
    toc: 'Case contents',
    status: 'Status',
    lastDeploy: 'Last deploy',
    runs: 'See its runs on GitHub Actions',
    facts: [
      { label: 'Hosting', value: 'Azure Storage and Cloudflare' },
      { label: 'Region', value: 'Spain Central' },
      { label: 'Team', value: 'Solo project' },
      { label: 'Stack', value: 'Vue 3 · Vite · Terraform · GitHub Actions · Python' },
    ],
    repo: 'View the repository',
    other: 'Other project',
    lead: 'This is a static site. It is built with Vue 3 and Vite, served from Azure Storage and has Cloudflare in front for the domain and HTTPS. The Azure side is described in Terraform, GitHub Actions deploys it without storing any Azure credential and a Python script checks it once a day. [The code is on GitHub.](https://github.com/cayeyemito/portfolio)',
    architecture: 'Architecture',
    pipeline: 'Pipeline',
    pipelineText:
      'There are three GitHub Actions workflows, and the name of each one links to its real runs, so the ticks can be checked. They sign in to Azure with OIDC: on every run, Entra ID swaps the GitHub token for temporary access, and only when it comes from this repository and the branch or pull request it expects. The only stored secret is the Cloudflare token, which can do nothing but publish the Worker.',
    workflows: [
      {
        file: 'ci.yml',
        trigger: 'on every pull request',
        steps: [
          { name: 'npm ci' },
          { name: 'lint', detail: 'oxlint, ESLint and Prettier' },
          { name: 'tests', detail: 'Vitest, the Worker included' },
          { name: 'build' },
          { name: 'pytest · shellcheck', detail: 'operations script' },
          { name: 'terraform fmt · validate · plan', detail: 'plan posted on the PR' },
        ],
      },
      {
        file: 'deploy.yml',
        trigger: 'on every push to main',
        steps: [
          { name: 'build' },
          { name: 'azure/login', detail: 'OIDC with Entra ID, no secrets' },
          { name: 'azcopy copy · sync', detail: 'long cache for assets, short for HTML' },
          { name: 'smoke test', detail: 'the site answers 200' },
          { name: 'wrangler deploy', detail: 'Cloudflare Worker' },
        ],
      },
      {
        file: 'health.yml',
        trigger: 'every day at 06:00 UTC',
        steps: [
          { name: 'site_health.py', detail: 'HTTP, TLS, files and logs with KQL' },
          { name: 'publish /status', detail: 'report.html and report.json' },
        ],
      },
    ],
    iacTitle: 'Infrastructure as code',
    iacText:
      'The Azure side lives in `infra/azure/`, and the Terraform state is kept in a versioned storage account. Only three things were done by hand: that account, which has to exist before Terraform can start, the overall budget of the subscription and the Cloudflare setup.',
    iacItems: [
      'A storage account with the static website, which serves the `index.html` of every folder and `404.html` when a path does not exist. It only accepts HTTPS with TLS 1.2 and has no access keys, so everything that gets in does so with an identity.',
      'Two Entra ID identities with *federated credentials* for GitHub. The deploy one can only write to that account, and the one used by the pull request plan can only read.',
      'Access logs, kept in Log Analytics for 30 days with a daily cap so the cost cannot run away.',
      'A budget that warns at 50 % and 100 %, and also when the forecast for the month goes over the limit.',
      'Cloudflare sits in front, on the free plan, with the DNS of `cayeyeste.com` and the certificate. Azure Storage does accept a custom domain, but it gives it no HTTPS unless you pay for Front Door, so Cloudflare terminates TLS and a Worker (`infra/cloudflare/worker.js`) fetches each page from Azure under its own name, because the free plan cannot change the Host header. While it is at it, the Worker adds the security headers and drops the ones that give Azure away.',
    ],
    opsTitle: 'Operations',
    opsText:
      'Once a day, a scheduled workflow runs `ops/site_health.py`. It checks that the pages and the project links respond, how many days the certificate has left, that the account holds the files it should and which 4xx and 5xx errors have shown up in the logs, the last part with a KQL query to Log Analytics. The report is published at [/status](/status/), and if anything fails the job turns red and GitHub sends me an email.',
    fromAwsTitle: 'From AWS to Azure',
    fromAwsText:
      'I first designed it for AWS. That version is in `infra/aws/` and passes `terraform validate`, but it was never deployed, because the AWS account verification dragged on and I ended up building it on Azure. The architecture is the same and only the pieces change:',
    fromAwsHead: ['AWS', 'Azure'],
    fromAwsRows: [
      ['Private S3', 'Storage with a static website'],
      ['CloudFront and a CloudFront Function', 'Cloudflare and a Worker'],
      ['IAM roles with OIDC', 'Entra ID with federated credentials'],
      ['CloudFront logs', 'Log Analytics'],
      ['AWS Budgets', 'Azure budgets'],
    ],
    notCoveredTitle: 'What it does not cover',
    notHaveTitle: 'What it does not have',
    notHave: [
      'Kubernetes, which would make no sense for a static site.',
      'Real high availability, since everything is in a single subscription and a single region.',
      'A staging environment; each pull request is reviewed with the build and the Terraform plan.',
    ],
    wouldDoTitle: 'What I would do in production',
    wouldDo: [
      'Split the environments into separate subscriptions.',
      'Bring Cloudflare into Terraform too, since today it is set up in its dashboard.',
      'Run `terraform apply` from the pipeline, with manual approval, instead of locally.',
      'Add Azure Monitor alerts on 5xx errors instead of relying on the GitHub email.',
    ],
  },
}
