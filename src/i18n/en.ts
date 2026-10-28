import type { Messages } from './es'

// English strings: same shape as es.ts, enforced by the Messages type.
export const en: Messages = {
  nav: {
    label: 'Main',
    projects: 'Projects',
    build: 'How it is built',
    experience: 'Experience',
    contact: 'Contact',
    switchLanguage: 'Leer en español',
  },
  theme: {
    toDark: 'Switch to dark mode',
    toLight: 'Switch to light mode',
  },
  profile: {
    location: 'Barcelona · open to remote',
    headline: 'Junior DevOps and developer',
    intro:
      'Junior profile between DevOps and development. At EY I built the NH Hotels application with Vue and Java Spring and deployed it with Jenkins; at Itequia I maintained the Azure DevOps Pipelines build agents. I care about everything between the code and production.',
    cvButton: 'CV (PDF)',
  },
  // Only English CVs on the English site. The DevOps one will be added when it exists.
  cvs: [{ label: 'Full Stack CV', href: '/cv/Cayetano_Yeste_CV_FullStack_EN.pdf' }],
  experience: [
    {
      role: 'Junior IT Consultant',
      company: 'EY',
      period: 'Oct 2025 – Jun 2026',
      summary:
        'Full stack development of the NH Hotels application with Vue and Java Spring in a Scrum team, and deployment to the test environment with Jenkins. Introduced AI-assisted unit tests for my own code in a project with no test coverage.',
    },
    {
      role: 'DevOps Engineer Intern',
      company: 'Itequia',
      period: 'Mar 2021 – Jun 2022',
      summary:
        'Maintained the Azure DevOps Pipelines build agents (Windows VMs on Azure and on-premise), troubleshot failures from the logs, wrote PowerShell and Bash scripts and ran the daily backups.',
    },
    {
      role: 'Data Analyst',
      company: 'Little Suite',
      period: 'Feb 2019 – Aug 2020',
      summary:
        'Managed MySQL databases, looking after their integrity and security, and prepared technical reports for management and clients.',
    },
  ],
  projects: {
    title: 'Projects',
    demo: 'Live demo',
    repo: 'Repository',
  },
  home: {
    buildTitle: 'How this site is built',
    buildIntro:
      'This is a static site hosted on Azure Storage and served over HTTPS as a static website. The infrastructure is defined in Terraform, GitHub Actions deploys every push to `main` and a Python script checks it every day.',
    pipelineLabel: 'Pipeline steps',
    buildMore: 'See the pipeline, the infrastructure and the operations →',
    experienceTitle: 'Experience',
    cvsLabel: 'Full CV (PDF):',
    contactTitle: 'Contact',
    contactBefore: 'Write to me at',
    contactOr: 'or on',
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
    madeWith: 'Built with Vue, deployed on Azure with Terraform and GitHub Actions',
    status: 'Status',
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
      'The infrastructure was first designed for AWS: private S3, CloudFront with Origin Access Control, IAM roles with OIDC and AWS Budgets. It is still in `infra/aws/`, validated but never deployed, because the new account got stuck in verification. I moved it to Azure, where the architecture is the same idea with other pieces: Storage instead of S3, Entra ID instead of IAM and Log Analytics instead of the CloudFront logs.',
    notCoveredTitle: 'What it does not cover',
    notCoveredText:
      'There is no Kubernetes and no real high availability: it is a static site in a single subscription. There is no CDN either: on Azure it would have a fixed monthly fee (Front Door) and, for a portfolio, the Storage static website is enough. In production I would split environments into separate subscriptions, add Front Door with a custom domain and security headers, and move `terraform apply` into the pipeline with manual approval.',
  },
}
