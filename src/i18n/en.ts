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
  build: {
    eyebrow: 'DevOps project',
    title: 'How this site is built',
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
