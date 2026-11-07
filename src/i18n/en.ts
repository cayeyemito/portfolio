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
      'Junior full stack developer in Barcelona. I have worked on both sides of the deploy: *the machines that build and ship*, and *the code that reaches production*.',
    tags: ['Java', 'Spring Boot', 'TypeScript', 'Next.js', 'Azure', 'Terraform', 'Docker'],
    available: 'Open to work',
    languages: [
      { name: 'Spanish · Catalan', level: 'Native' },
      { name: 'English', level: 'Advanced' },
    ],
  },
  // Only English CVs on the English site. The DevOps one will be added when it exists.
  cvs: [
    {
      label: 'Full Stack / Backend',
      short: 'Full Stack CV',
      href: '/cv/Cayetano_Yeste_CV_FullStack_EN.pdf',
    },
  ],
  experience: [
    {
      company: 'EY',
      role: 'Junior IT Consultant',
      period: 'Oct 2025 — Jun 2026',
      kind: 'Training contract',
      points: [
        'Features for the NH Hotels application with Spring Boot (REST API, JPA/Hibernate) and Vue, in a Scrum team',
        'Introduced the first unit tests (JUnit and frontend) in a project that had none',
        'Deployments to the test environment with Jenkins; Git flow with pull requests and Jira sprints',
      ],
    },
    {
      company: 'Itequia',
      role: 'DevOps Engineer · intern',
      period: 'Mar 2021 — Jun 2022',
      kind: 'Internship',
      points: [
        'Maintained the Azure DevOps Pipelines build agents: Windows VMs on Azure and on-premise',
        'Troubleshot failures from the logs, and wrote PowerShell and Bash scripts',
        'Daily backups and SQL databases',
        'Incidents in Jira Service Management',
      ],
    },
    {
      company: 'Little Suite',
      role: 'Data analyst',
      period: 'Feb 2019 — Aug 2020',
      kind: 'Part time',
      points: [
        'Managed MySQL databases, looking after their integrity and security',
        'Technical reports for management and clients',
      ],
    },
  ],
  education: {
    title: 'Education',
    items: [
      { period: '2024 — 2026', name: 'DAW · Web Application Development (VET diploma) · IFP' },
      {
        period: '2019 — 2022',
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
    lastDeploy: 'last deploy',
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
    desc: 'A push to GitHub triggers GitHub Actions, which gets temporary access from Entra ID through OIDC and uploads the site with azcopy to an Azure Storage account with a static website. Visitors connect over HTTPS and every read is logged in Log Analytics.',
    caption: 'Deployment on top, traffic below. No Azure secret is stored in GitHub.',
    you: 'You',
    repository: 'repository',
    temporary: 'OIDC, temporary',
    visitor: 'Visitor',
    browser: 'browser',
    site: 'static website + /status',
  },
  frimee: {
    toc: 'Case contents',
    open: 'Open frimee.es',
    facts: [
      { label: 'Site', value: 'frimee.es' },
      { label: 'Hosting', value: 'Hostinger' },
      { label: 'Team', value: '2 people' },
      { label: 'Stack', value: 'Next.js · Supabase · Firebase · Capacitor · LiveKit' },
      { label: 'Services', value: 'Google Maps · OpenAI · Claude · Sentry' },
    ],
    imageCaption: 'A trip plan in Frimee: activities by day and the route on the map.',
    contextTitle: 'Context',
    context: [
      'When a group plans a trip, everything ends up scattered across messages, notes and loose payments. Frimee brings the activities, the map, the calendar, the shared expenses and the chat together in a single plan.',
      'It is a web app and an Android and iOS app built from the same code. We were two: Vicky did the design and part of the UI, and I did the rest of the frontend and all of the backend.',
    ],
    featuresTitle: 'Key features',
    features: [
      {
        name: 'Chat and calls',
        text: 'Real-time chat with Supabase Realtime; voice and video calls with LiveKit.',
      },
      {
        name: 'Assistant in the chat',
        text: 'Claude Haiku, behind a Supabase function: answers questions and offers shortcuts, such as creating plans.',
      },
      {
        name: 'Receipts and tickets',
        text: 'Read with OCR (OpenAI) to add the expenses or the plan tickets without typing them.',
      },
      {
        name: 'Map and alerts',
        text: 'Google Maps for places and routes, and push notifications with Firebase.',
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
      hosting: 'the Next.js site and its /api routes, at frimee.es',
    },
    architectureNote:
      'Clients talk to the services directly with public keys. The server only steps in for what needs privileges, and the Supabase service key never reaches the client.',
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
        what: 'PostgreSQL with RLS policies for plans, members, chats and expenses, plus authentication and Realtime for the chat. Whatever needs privileges (OCR, account deletion, call tokens) lives in `/api` routes with the service key; the assistant and the push notifications, in Supabase functions.',
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
        what: 'Managed WebRTC with LiveKit Cloud. `/api/livekit/token` only issues the token if the user is a member of the chat (403 otherwise), it expires after 1 hour and the route is rate limited. Each call is tracked in the `llamadas` table, and a SQL script closes the ones left open for more than 2 hours.',
        why: 'Running group video calls ourselves meant setting up and maintaining a media server, and that was beyond what two people could handle. With LiveKit Cloud we only had to issue the token from our API, so we still decide who joins each call: if you are not in the chat, there is no token.',
      },
    ],
    challengeTitle: 'Challenge',
    challenge: {
      title: 'The session did not reach the server from the mobile app',
      text: [
        'On the web, the `/api` routes read the session from the cookie. But the app is a static export inside a WebView: the Supabase client keeps the session in localStorage and requests do not carry that cookie, so everything that went through the server returned 401 on mobile (routes, receipt OCR, account deletion…).',
        'The fix: clients send the access token in an `Authorization: Bearer` header and each route validates it against Supabase. On the web the cookie still works.',
      ],
      codeNote:
        'The highlighted line validates the token against Supabase instead of decoding it locally: an expired or revoked token does not get through.',
    },
    learningsTitle: 'Lessons',
    learnings: [
      {
        name: 'What I would do differently',
        text: 'The same authentication block is copied into five routes. Today I would move it into a single `getRequestUser(req)` function with its own test, so a change to authentication does not have to be made five times.',
      },
      {
        name: 'Web and WebView from day one',
        text: 'Cookies versus tokens and the WebView history (the "go back" in settings had to change because it behaved unpredictably on mobile) came up late and meant fixes across many screens.',
      },
    ],
    other: 'Next',
  },
  build: {
    toc: 'Case contents',
    status: 'Status',
    facts: [
      { label: 'Site', value: 'Azure Storage · static website' },
      { label: 'Region', value: 'Spain Central' },
      { label: 'Team', value: 'Solo project' },
      { label: 'Stack', value: 'Vue 3 · Vite · Terraform · GitHub Actions · Python' },
    ],
    repo: 'View the repository',
    other: 'Other project',
    lead: 'This is a static site: Vue 3 built with Vite and served over HTTPS from Azure Storage. All the infrastructure is in Terraform, GitHub Actions deploys it without storing any secret and a Python script checks it every day. [The code is on GitHub.](https://github.com/cayeyemito/portfolio)',
    architecture: 'Architecture',
    pipeline: 'Pipeline',
    pipelineText:
      'There are three GitHub Actions workflows. They sign in to Azure with OIDC: Entra ID exchanges the token of each run for temporary access, only when it comes from this repository and the expected branch or pull request, and with permissions limited to this storage account.',
    workflows: [
      {
        file: 'ci.yml',
        trigger: 'on every pull request',
        steps: [
          { name: 'npm ci' },
          { name: 'lint', detail: 'oxlint, ESLint and Prettier' },
          { name: 'tests', detail: 'Vitest' },
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
      'Everything lives in `infra/azure/`, with the Terraform state in a versioned storage account. Only that account and the overall budget were created by hand.',
    iacItems: [
      'Storage account with a static website (`index.html` in every folder and `404.html`), HTTPS and TLS 1.2 only, and no access keys: everything signs in with an identity.',
      'Two Entra ID identities with *federated credentials* for GitHub: the deploy one can only write to that account; the plan one can only read.',
      'Access logs in Log Analytics for 30 days, with a daily cap as a cost guard.',
      'Budget with alerts at 50 %, 100 % and on forecast.',
    ],
    opsTitle: 'Operations',
    opsText:
      'A scheduled workflow runs `ops/site_health.py` once a day. It checks that the pages and the project links respond, how many days the TLS certificate has left, that the site holds the expected files and which 4xx and 5xx errors show up in the logs, with a KQL query to Log Analytics. The report is published at [/status](/status/); if anything fails, the job turns red and GitHub sends an email.',
    fromAwsTitle: 'From AWS to Azure',
    fromAwsText:
      'The infrastructure was first designed for AWS: private S3, CloudFront with Origin Access Control, IAM roles with OIDC and AWS Budgets. It is still in `infra/aws/`, validated with `terraform validate` but never deployed, because the new account got stuck in verification. I moved it to Azure, where the architecture is the same idea with other pieces: Storage instead of S3, Entra ID instead of IAM and Log Analytics instead of the CloudFront logs.',
    notCoveredTitle: 'What it does not cover',
    notCoveredText:
      'There is no Kubernetes and no real high availability: it is a static site in a single subscription. There is no CDN either: on Azure it would have a fixed monthly fee (Front Door) and, for a portfolio, the Storage static website is enough. In production I would split environments into separate subscriptions, add Front Door with a custom domain and security headers, and move `terraform apply` into the pipeline with manual approval.',
  },
}
