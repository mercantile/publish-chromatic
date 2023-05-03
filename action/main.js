  query AncestorBuildsQuery($buildNumber: Int!, $skip: Int!, $limit: Int!) {
    app {
      build(number: $buildNumber) {
        ancestorBuilds(skip: $skip, limit: $limit) {
          id
          number
          commit
        }
      }
    }
  }
`;t.findAncestorBuildWithCommit=function({client:e},t,{page:r=10,limit:i=80}={}){return n(this,void 0,void 0,(function*(){let o=0;for(;o<i;){const{app:c}=yield e.runQuery(s,{buildNumber:t,skip:o,limit:Math.min(r,i-o)}),u=yield Promise.all(c.build.ancestorBuilds.map((e=>n(this,void 0,void 0,(function*(){return[e,yield(0,a.commitExists)(e.commit)]}))))),l=u.find((([e,t])=>t));if(l)return l[0];if(u.length<r)return null;o+=r}return null}))}},47743:function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function a(e){try{c(n.next(e))}catch(e){o(e)}}function s(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}c((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.getBaselineBuilds=void 0;const o=i(r(97907)).default`
  query BaselineCommitsQuery($branch: String!, $parentCommits: [String!]!) {
    app {
      baselineBuilds(branch: $branch, parentCommits: $parentCommits) {
        id
        number
        status(legacy: false)
        commit
        committedAt
        changeCount
      }
    }
  }
`;t.getBaselineBuilds=function({client:e},{branch:t,parentCommits:r}){return n(this,void 0,void 0,(function*(){const{app:n}=yield e.runQuery(o,{branch:t,parentCommits:r});return n.baselineBuilds}))}},8248:function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function a(e){try{c(n.next(e))}catch(e){o(e)}}function s(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}c((n=n.apply(e,t||[])).next())}))};Object.defineProperty(t,"__esModule",{value:!0}),t.getChangedFilesWithReplacement=void 0;const i=r(46524),o=r(54300);t.getChangedFilesWithReplacement=function(e,t){return n(this,void 0,void 0,(function*(){try{return{changedFiles:yield(0,i.getChangedFiles)(t.commit)}}catch(r){if(e.log.debug(`Got error fetching commit for #${t.number}(${t.commit}): ${r.message}`),r.message.match(/bad object/)){const r=yield(0,o.findAncestorBuildWithCommit)(e,t.number);if(r){e.log.debug(`Found replacement build for #${t.number}(${t.commit}): #${r.number}(${r.commit})`);return{changedFiles:yield(0,i.getChangedFiles)(r.commit),replacementBuild:r}}e.log.debug(`Couldn't find replacement for #${t.number}(${t.commit})`)}throw r}}))}},38337:function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function a(e){try{c(n.next(e))}catch(e){o(e)}}function s(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}c((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const o=i(r(35557)),a=i(r(19094)),s=i(r(46633)),c=i(r(91569)),u=i(r(79308)),l=i(r(68972)),p=i(r(9694)),d=i(r(30995)),A=r(46524),h=/^origin\//,f=e=>!(!e||"HEAD"===e)&&e;t.default=function({log:e},{branchName:t,patchBaseRef:r,ci:i}={}){return n(this,void 0,void 0,(function*(){let n,m=yield(0,A.getCommit)(),g=f(t)||f(r)||(yield(0,A.getBranch)());const{TRAVIS_COMMIT:y,TRAVIS_EVENT_TYPE:v,TRAVIS_PULL_REQUEST_SLUG:C,TRAVIS_REPO_SLUG:b,TRAVIS_PULL_REQUEST_SHA:E,TRAVIS_PULL_REQUEST_BRANCH:w,GITHUB_ACTIONS:_,GITHUB_EVENT_NAME:I,GITHUB_REPOSITORY:k,GITHUB_BASE_REF:S,GITHUB_HEAD_REF:B,GITHUB_SHA:D,CHROMATIC_SHA:x,CHROMATIC_BRANCH:Q,CHROMATIC_PULL_REQUEST_SHA:M,CHROMATIC_SLUG:L}=process.env,T=x&&Q,j="pull_request"===v,F="true"===_,R="pull_request"===I;if(!(yield(0,A.hasPreviousCommit)()))throw new Error((0,s.default)(F));if(T)m=yield(0,A.getCommit)(x).catch((t=>(e.warn((0,d.default)({sha:x,env:"CHROMATIC_SHA"})),e.debug(t),{commit:x,committedAt:Date.now()}))),M&&(m.mergeCommit=M),g=Q,n=L;else if(j){if(C===b&&e.warn((0,p.default)()),!E||!w)throw new Error((0,u.default)({TRAVIS_EVENT_TYPE:v}));m=yield(0,A.getCommit)(E).catch((t=>(e.warn((0,d.default)({sha:E,env:"TRAVIS_PULL_REQUEST_SHA"})),e.debug(t),{commit:E,committedAt:Date.now()}))),y&&(m.mergeCommit=y),g=w,n=C}else if(R){if(e.info((0,l.default)()),!B||!D)throw new Error((0,c.default)({GITHUB_EVENT_NAME:I}));if(S===B)throw new Error((0,a.default)());m=yield(0,A.getCommit)(B).catch((t=>(e.warn((0,d.default)({ref:B,sha:D,env:"GITHUB_HEAD_REF"})),e.debug(t),{commit:D,committedAt:Date.now()}))),m.mergeCommit=D,g=B,n=k}const{isCi:O,service:P,prBranch:N,branch:Y,commit:K,slug:U}=(0,o.default)(),H=process.env.CHROMATIC_ACTION?"chromaui/action":P;n=n||U,f(g)||(m=yield(0,A.getCommit)(K).catch((t=>(e.warn((0,d.default)({sha:K})),e.debug(t),{commit:K,committedAt:Date.now()}))),g=f(N)||f(Y)||f(process.env.HEAD)||f(process.env.GERRIT_BRANCH)||f(process.env.GITHUB_REF)||f(process.env.CI_BRANCH)||"HEAD");const G=O||!!i||!!process.env.CI||!!process.env.REPOSITORY_URL||!!process.env.GITHUB_REPOSITORY;return t||T||!h.test(g)||(e.warn("Ignoring 'origin/' prefix in branch name."),g=g.replace(h,"")),e.debug(`git info: ${JSON.stringify({commit:m,branch:g,slug:n,fromCI:G,ciService:H})}`),Object.assign(Object.assign({},m),{branch:g,slug:n,fromCI:G,ciService:H})}))}},39007:function(e,t,r){"use strict";var n=this&&this.__awaiter||function(e,t,r,n){return new(r||(r=Promise))((function(i,o){function a(e){try{c(n.next(e))}catch(e){o(e)}}function s(e){try{c(n.throw(e))}catch(e){o(e)}}function c(e){var t;e.done?i(e.value):(t=e.value,t instanceof r?t:new r((function(e){e(t)}))).then(a,s)}c((n=n.apply(e,t||[])).next())}))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0}),t.getParentCommits=t.FETCH_N_INITIAL_BUILD_COMMITS=void 0;const o=i(r(97907)),a=r(46524);t.FETCH_N_INITIAL_BUILD_COMMITS=20;const s=o.default`
  query FirstCommittedAtQuery($commit: String!, $branch: String!) {
    app {
      firstBuild(sortByCommittedAt: true) {
        committedAt
      }
      lastBuild(branch: $branch, sortByCommittedAt: true) {
        commit
        committedAt
      }
      pullRequest(mergeInfo: { commit: $commit, baseRefName: $branch }) {
        lastHeadBuild {
          commit
        }
      }
    }
  }
`,c=o.default`
  query HasBuildsWithCommitsQuery($commits: [String!]!) {
    app {
      hasBuildsWithCommits(commits: $commits)
    }
  }
    ${s.error} {bold Failed to extract stories from your Storybook}
    This is usually a problem with your published Storybook, not with Chromatic.

    Build and open your Storybook locally and check the browser console for errors.
    Visit your published Storybook at ${(0,c.default)((0,a.baseStorybookUrl)(t))}
    The following error was encountered while running your Storybook:
  `)}\n\n${e.trim()}`},622:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(22037),a=r(79986),s=r(96920),c=n(r(95433));t.default=({options:e,buildLogFile:t,spawnParams:r},{message:n},u)=>{const{buildScriptName:l}=e,p=u.split(o.EOL).filter((e=>e&&!e.startsWith("<s>")));return[(0,a.dedent)(i.default`
      The CLI tried to run your {bold ${l}} script, but the command failed. This indicates a problem with your Storybook. Here's what to do:

      - Check the Storybook build log printed below.
      - Run {bold npm run ${l}} or {bold yarn ${l}} yourself and make sure it outputs a valid Storybook by opening the generated {bold index.html} in your browser.
      - Review the build-storybook CLI options at ${(0,c.default)("https://storybook.js.org/docs/configurations/cli-options/#for-build-storybook")}
    `),n,i.default`${s.info} Spawn settings:\n{dim ${JSON.stringify(r,null,2)}}`,i.default`${s.info} Storybook build output:\n{dim ${t}}`,p.join("\n")].join("\n\n")}},89681:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=n(r(23450)),a=r(79986),s=r(96920),c=n(r(95433));t.default=({build:e,exitCode:t,isOnboarding:r})=>{const n=(0,o.default)("visual changes",e.changeCount,!0);return(0,a.dedent)(i.default`
    ${s.error} {bold Found ${n}}: Review the changes at ${(0,c.default)(r?e.app.setupUrl:e.webUrl)}
    
    ${s.info} For CI/CD use cases, this command failed with exit code ${t}
    Pass {bold --exit-zero-on-changes} to succeed this command regardless of changes.
    Pass {bold --auto-accept-changes} to succeed and automatically accept any changes.
  `)}},19622:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=n(r(23450)),a=r(79986),s=r(96920),c=n(r(95433));t.default=({build:e,exitCode:t})=>{const{errorCount:r,interactionTestFailuresCount:n,webUrl:u}=e,l=n>0,p=r-n>0,d=(0,o.default)("failed test",n,!0);let A;if(l&&p){A=`Encountered ${(0,o.default)("build error",r-n,!0)} and ${d}`}else if(l)A=`Encountered ${d}`;else{A=`Encountered ${(0,o.default)("build error",r,!0)}`}return(0,a.dedent)(i.default`
    ${s.error} {bold ${A}}: failing with exit code ${t}
    Pass {bold --allow-console-errors} to succeed this command regardless of runtime build errors.
    ${s.info} Review the errors at ${(0,c.default)(u)}
  `)}},35827:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920);t.default=(e,t)=>(0,o.dedent)(i.default`
    ${a.error} Invalid {bold ${e}}
    This option can only be used in conjunction with {bold ${t}}
  `)},8090:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920);t.default=()=>(0,o.dedent)(i.default`
    ${a.error} Invalid value to {bold --patch-build}
    The two branches cannot be identical.
  `)},16989:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=n(r(23450)),a=n(r(76003)),s=r(79986),c=n(r(95433)),u=({id:e,number:t,webUrl:r})=>({id:e,number:t,webUrl:r});t.default=function(e,t,r=(new Date).toISOString()){const{flags:n,options:l,sessionId:p,pkg:d,packageJson:A}=e,{scripts:h={}}=A,f=(0,c.default)(d.bugs.email),m=(0,c.default)(d.docs),g=[].concat(t),{git:y,storybook:v,spawnParams:C,exitCode:b,exitCodeKey:E,isolatorUrl:w,cachedUrl:_,build:I}=e,k=Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign(Object.assign({timestamp:r,sessionId:p,gitVersion:y&&y.version,nodePlatform:process.platform,nodeVersion:process.versions.node,packageName:d.name,packageVersion:d.version},v?{storybook:v}:{}),{flags:n}),l&&l.buildScriptName?{buildScript:h[l.buildScriptName]}:{}),C?{spawnParams:C}:{}),{exitCode:b,exitCodeKey:E,errorType:g.map((e=>e.name)).join("\n"),errorMessage:(0,a.default)(g[0].message.split("\n")[0].trim())}),w?{isolatorUrl:w}:{}),_?{cachedUrl:_}:{}),I&&{build:u(I)}),S=g.map((e=>e.stack)).filter(Boolean);return[g.map((e=>e.message)).join("\n"),S.length?i.default`{dim → View the full ${(0,o.default)("stacktrace",S.length)} below}\n`:"",(0,s.dedent)(i.default`
      If you need help, please chat with us at ${m} for the fastest response.
      You can also email the team at ${f} if chat is not an option.

      Please provide us with the above CLI output and the following info:
    `),i.default`{bold ${JSON.stringify(k,null,2)}}`,S.length?i.default`\n{dim ${S.join("\n\n")}}`:""].join("\n")}},22390:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(80568),s=r(96920),c=n(r(95433));t.default=function({title:e},{error:t,response:r,statusCode:n}={}){const u=t?i.default`\n{dim → ${t.message||t.toString()}}`:"",l=r&&r.statusText?` ${r.statusText}`:"",p=n?i.default`\n{dim → Status: ${n}${l}}`:"";return(0,o.dedent)(i.default`
    ${s.error} {bold Failed to ${(0,a.lcfirst)(e)}}

    Could not connect to the Chromatic API. Check your internet connection or try again later.
    Service status updates are provided at ${(0,c.default)("https://status.chromatic.com")}
    ${u}${p}
  `)}},19094:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920),s=n(r(95433));t.default=()=>(0,o.dedent)(i.default`
    ${a.error} {bold Cross-fork PR builds unsupported in custom GitHub workflows}
    GitHub actions triggered by a fork do not report their repository owner, so cannot be properly linked to a pull request in Chromatic.
    Consider using the official Chromatic GitHub Action, or set CHROMATIC_BRANCH to include the forked repository owner (e.g. owner:branch).
    ${a.info} Read more at ${(0,s.default)("https://www.chromatic.com/docs/github-actions")}
  `)},10947:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920);t.default=({command:e})=>(0,o.dedent)(i.default`
    ${a.error} {bold Unable to execute command}: ${e}
    Chromatic requires your Git repository to have at least one commit.
  `)},24755:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920);t.default=({command:e})=>(0,o.dedent)(i.default`
    ${a.error} {bold Unable to execute command}: ${e}
    Chromatic only works from inside a Git repository.
  `)},13803:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920);t.default=({command:e})=>(0,o.dedent)(i.default`
    ${a.error} {bold Unable to execute command}: ${e}
    Chromatic only works with Git installed.
  `)},46633:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920),s=n(r(95433));t.default=(e=!1)=>e?(0,o.dedent)(i.default`
      ${a.error} {bold Found only one commit}
      This typically means you have ran into one of the following scenarios:
      - You've checked out a shallow copy of the Git repository, which {bold actions/checkout@v2} does by default.
        In order for Chromatic to correctly determine baseline commits, we need access to the full Git history graph.
        With {bold actions/checkout@v2}, you can enable this by setting 'fetch-depth: 0'.
        ${a.info} Read more at ${(0,s.default)("https://www.chromatic.com/docs/github-actions")}
      - You've only made a single commit so far. 
        Please make at least one additional commit in order for Chromatic to be able to detect what's changed. 
    `):(0,o.dedent)(i.default`
      ${a.error} {bold Found only one commit}
      This typically means you have ran into one of the following scenarios:
      - You've checked out a shallow copy of the Git repository, which some CI systems do by default.
        In order for Chromatic to correctly determine baseline commits, we need access to the full Git history graph.
        Refer to your CI provider's documentation for details.
      - You've only made a single commit so far.  
        Please make at least one additional commit in order for Chromatic to be able to detect what's changed.
    `)},16173:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920),s=n(r(95433)),c=e=>`${e.charAt(0).toLowerCase()}${e.slice(1)}`;t.default=function({title:e},{message:t,extensions:r}){const n=t?i.default`\n{dim → ${r&&r.code?`${r.code}: ${t}`:t}}`:"";return(0,o.dedent)(i.default`
    ${a.error} {bold Failed to ${c(e)}}

    Error communicating with the Chromatic API. Check if your Chromatic client is up-to-date.
    Service status updates are provided at ${(0,s.default)("https://status.chromatic.com")}
    ${n}
  `)}},94591:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920);t.default=e=>(0,o.dedent)(i.default`
    ${a.error} Incompatible options: ${e.map((e=>i.default.bold(e))).join(", ")}
    These options cannot be used together.
  `)},47374:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920);t.default=()=>(0,o.dedent)(i.default`
    ${a.error} Invalid {bold --only-story-names}
    Value must be provided in the form {bold 'Path/To/MyStory'}.
    Globbing is supported, for example: 'Pages/**'
  `)},7728:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920);t.default=(e,t)=>(0,o.dedent)(i.default`
    ${a.error} Invalid value for {bold --branch-name} and/or {bold --repository-slug}
    The branch owner name prefix '${e}' does not match the repository owner '${t}'.
  `)},60589:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920);t.default=e=>(0,o.dedent)(i.default`
    ${a.error} {bold Invalid package.json}
    Found invalid package.json at {bold ${e}}
    Make sure this is a valid Node.js package file, is readable, and contains a {bold "scripts"} block.
  `)},46747:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920),s=n(r(95433));t.default=()=>(0,o.dedent)(i.default`
    ${a.error} Invalid value for {bold --patch-build}
    This option expects two branch names like {bold headbranch...basebranch}
    ${a.info} Read more at ${(0,s.default)("https://www.chromatic.com/docs/branching-and-baselines#patch-builds")}
  `)},94264:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920),s=n(r(95433));t.default=({projectToken:e})=>(0,o.dedent)(i.default`
    ${a.error} Invalid {bold --project-token} '${e}'
    You can find your project token on the Manage screen in your Chromatic project.
    Sign in to Chromatic at ${(0,s.default)("https://www.chromatic.com/start")}
    ${a.info} Read more at ${(0,s.default)("https://www.chromatic.com/docs/setup")}
  `)},75572:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920);t.default=()=>(0,o.dedent)(i.default`
    ${a.error} Invalid value for {bold --junit-report}
    If you pass a file path, make sure it ends with '.xml'
  `)},75499:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920);t.default=()=>(0,o.dedent)(i.default`
    ${a.error} Invalid value for {bold --repository-slug}
    The value must be in the format {bold ownerName/repositoryName}
    You can typically find this in the URL of your repository.
  `)},75503:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920);t.default=e=>(0,o.dedent)(i.default`
    ${a.error} You can only use one of {bold ${e.join(", ")}}
  `)},65559:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920),s=n(r(95433));t.default=({patchHeadRef:e,patchBaseRef:t})=>(0,o.dedent)(i.default`
    ${a.error} {bold Failed to retrieve the merge base}
    Are you sure the head branch is a descendant (i.e. fork) of the base branch?
    Try running this command yourself: {bold git merge-base ${e} ${t}}
    ${a.info} Read more at ${(0,s.default)("https://www.chromatic.com/docs/branching-and-baselines#how-the-merge-base-is-calculated")}
  `)},48720:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920);t.default=e=>(0,o.dedent)(i.default`
    ${a.error} {bold Build script not found}
    The CLI didn't find a script called {bold "${e}"} in your {bold package.json}.
    Make sure you set the {bold --build-script-name} option to the value of the script name that builds your Storybook.
  `)},91569:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920),s=n(r(95433));t.default=({GITHUB_EVENT_NAME:e})=>(0,o.dedent)(i.default`
    ${a.error} {bold Missing GitHub environment variable}
    \`GITHUB_EVENT_NAME\` environment variable is set to '${e}', but \`GITHUB_SHA\` and \`GITHUB_HEAD_REF\` are not both set.
    ${a.info} Read more at ${(0,s.default)("https://www.chromatic.com/docs/github-actions")}
  `)},63183:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920),s=n(r(95433));t.default=()=>(0,o.dedent)(i.default`
    ${a.error} {bold Missing project token}

    Sign in to ${(0,s.default)("https://www.chromatic.com/start")} and create a new project,
    or find your project token on the Manage screen in an existing project.
    Set your project token as the {bold CHROMATIC_PROJECT_TOKEN} environment variable
    or pass the {bold --project-token} command line option.

    ${a.info} Read more at ${(0,s.default)("https://www.chromatic.com/docs/setup")}
  `)},18483:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920),s=n(r(95433));t.default=({options:e,buildLogFile:t})=>{const{buildScriptName:r}=e;return(0,o.dedent)(i.default`
    ${a.error} {bold Cannot run a build with no stories}

    Your statically built Storybook exposes no stories. This indicates a problem with your Storybook. Here's what to do:

    - Check the build log at {bold ${t}}
    - Run {bold npm run ${r}} or {bold yarn ${r}} yourself and make sure it outputs a valid Storybook by opening the generated {bold index.html} in your browser.
    - Make sure you haven't accidently ignored all stories. See ${(0,s.default)("https://www.chromatic.com/docs/ignoring-elements#ignore-stories")} for details.
  `)}},79308:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920),s=n(r(95433));t.default=({TRAVIS_EVENT_TYPE:e})=>(0,o.dedent)(i.default`
    ${a.error} {bold Missing Travis environment variable}
    \`TRAVIS_EVENT_TYPE\` environment variable set to '${e}', but
    \`TRAVIS_PULL_REQUEST_SHA\` and \`TRAVIS_PULL_REQUEST_BRANCH\` are not both set.
    ${a.info} Read more at ${(0,s.default)("https://www.chromatic.com/docs/ci#travis-ci")}
  `)},45499:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920),s=n(r(95433));t.default=({statsPath:e,storybookDir:t,storybookBuildDir:r,entryFile:n,viewLayer:c="react"})=>{if(n){const c=r?i.default`Configure {bold --storybook-config-dir} with the value for {bold --config-dir} or {bold -c} from your build-storybook script.`:i.default`Configure {bold --build-script-name} to point at the {bold build-storybook} script which has {bold --config-dir} or {bold -c} set.`;return(0,o.dedent)(i.default`
      ${a.error} Did not find any CSF globs in {bold ${e}}
      Found an entry file at {bold ${n}} but expected it at {bold ${t}/generated-stories-entry.js}.
      ${c}
      ${a.info} Read more at ${(0,s.default)("https://www.chromatic.com/docs/turbosnap")}
    `)}return(0,o.dedent)(i.default`
    ${a.error} Did not find any CSF globs in {bold ${e}}
    Check your stories configuration in {bold ${t}/main.js}
    ${a.info} Read more at ${(0,s.default)(`https://storybook.js.org/docs/${c}/configure/overview`)}
  `)}},35422:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920);t.default=()=>(0,o.dedent)(i.default`
    ${a.error} {bold No package.json found}
    Chromatic only works from inside a JavaScript project.
    We expected to find a package.json somewhere up the directory tree.
    Are you sure you're running from your project directory?
  `)},6497:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920);t.default=e=>(0,o.dedent)(i.default`
    ${a.error} {bold Storybook package not installed}
    Could not find {bold ${e}} in {bold node_modules}.
    Most likely, you forgot to run {bold npm install} or {bold yarn} before running Chromatic.
  `)},83966:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=n(r(23450)),a=r(79986),s=r(96920);t.default=function({options:e,runtimeErrors:t=[],runtimeWarnings:r=[]}){const n=[...t,...r].map((e=>e.message||e.toString())),c=[...t,...r].map((e=>e.stack)).filter(Boolean),u=c.length?i.default`\n{dim → View the full ${(0,o.default)("stacktrace",c.length)} below}`:"",l=t.length,p=r.length,d=[l&&(0,o.default)("runtime error",l,!0),l&&p&&"and",p&&(0,o.default)("warning",p,!0)].filter(Boolean).join(" "),A=e.allowConsoleErrors?(0,a.dedent)(i.default`
      We'll ignore these errors because you passed the {bold --allow-console-errors} flag,
      but this is not recommended.`):(0,a.dedent)(i.default`
      If you want to continue despite runtime errors, you can pass the
      {bold --allow-console-errors} flag, but this is not recommended.`),h=(0,a.dedent)(i.default`
    You should probably fix these warnings, but we'll continue anyway.`);return(0,a.dedent)(i.default`
    ${l?s.error:s.warning} {bold Detected ${d} in your Storybook}
    ${n.join("\n")}${u}

    This is usually a problem with your Storybook, not with Chromatic.
    Run your Storybook locally and check your browser console for errors.

    ${l?A:h}
    ${c.length?i.default`\n{dim ${c.join("\n\n")}}`:""}
  `)}},52110:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(96920),a=e=>`${e.charAt(0).toLowerCase()}${e.slice(1)}`;t.default=function({title:e},t){return[i.default`${o.error} {bold Failed to ${a(e)}}`,t.message].join("\n")}},75559:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920);t.default=()=>(0,o.dedent)(i.default`
    ${a.error} {bold Workspace not clean}
    The git working directory must be clean before running a patch build.
    Use {bold git stash --include-untracked --keep-index} to stash changes before you continue.
  `)},93735:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(96920);t.default=e=>i.default`${o.error} {bold Workspace not up-to-date with remote}\n${e}`},47443:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920);t.default=e=>(0,o.dedent)(i.default`
    ${a.success} {bold Added script '${e}' to package.json}
    You can now run it here or in CI with 'npm run ${e}' or 'yarn ${e}'.

    ${a.info} Your project token was added to the script via the {bold --project-token} flag.
    If you're running Chromatic via continuous integration, we recommend setting
    the {bold CHROMATIC_PROJECT_TOKEN} environment variable in your CI environment.
    You can then remove the {bold --project-token} from your package.json script.
  `)},38984:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=n(r(23450)),s=r(96920),c=n(r(95433)),u=r(2333);t.default=({build:e,isOnboarding:t})=>{const{changes:r,snapshots:n,components:l,stories:p}=(0,u.stats)({build:e}),d=(0,a.default)("visual changes",e.changeCount,!0);return t?(0,o.dedent)(i.default`
      ${s.success} {bold Build passed. Welcome to Chromatic!}
      We found ${l} with ${p} and took ${n}.
      ${s.info} Please continue setup at ${(0,c.default)(e.app.setupUrl)}
    `):e.autoAcceptChanges&&e.changeCount?(0,o.dedent)(i.default`
      ${s.success} {bold Build ${e.number} passed!}
      Auto-accepted ${r}.
      ${s.info} View build details at ${(0,c.default)(e.webUrl)}
    `):(0,o.dedent)(i.default`
      ${s.success} {bold Build ${e.number} passed!}
      ${e.changeCount>0?d:"No visual changes"} were found in this build.
      ${s.info} View build details at ${(0,c.default)(e.webUrl)}
    `)}},68972:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920),s=n(r(95433));t.default=()=>(0,o.dedent)(i.default`
    ${a.info} {bold Use our GitHub Action}
    It appears you are using a GitHub Actions workflow, but are not using the official GitHub Action for Chromatic.
    Find it at ${(0,s.default)("https://github.com/marketplace/actions/publish-to-chromatic")}
  `)},33625:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920),s=r(95986);t.default=()=>(0,o.dedent)(i.default`
    ${a.info} {bold ${(0,s.skippedRebuild)().output}}
    A build for the same commit as the last build on the branch is considered a rebuild.
    If the last build is passed or accepted, the rebuild is skipped because it shouldn't change anything.
    You can override this using the {bold --force-rebuild} flag.
  `)},82395:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986);t.default=({pkg:e})=>(0,o.dedent)(i.default`
    {bold Chromatic CLI v${e.version}}
    {dim ${e.docs}}
  `)},88023:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920),s=({spec:e})=>i.default`{dim → }${e.component.name}/${e.name}`;t.default=e=>(0,o.dedent)(i.default`
    {bold Listing available stories:}
    ${e.map(s).join("\n")}

    ${a.info} Use {bold --only-story-names} to run a build for a specific component or story.
    Globs are supported, for example: {bold --only-story-names "${e[0].spec.component.name}/**"}
  `)},70973:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920);t.default=(e,t)=>{const r=o.dedent`
    "scripts": {
      "${e}": "${t}"
    }
  `;return(0,o.dedent)(i.default`
    ${a.info} No problem. You can add it to your package.json yourself like so:
    {dim ${r}}
  `)}},31908:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920);function s(e){return e.commit.substr(0,7)}t.default=({replacedBuild:e,replacementBuild:t})=>(0,o.dedent)(i.default`
    ${a.info} {bold Missing commit detected}
    When detecting git changes for TurboSnap, we couldn't find the commit (${s(e)}) for the most recent build (#${e.number}).
    To avoid re-snapshotting stories we know haven't changed, we copied from the most recent build (#${t.number}) that did have a commit (${s(t)}) instead.
  `)},64959:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920),s=n(r(95433)),c={github:"GitHub",gitlab:"GitLab",bitbucket:"Bitbucket"};t.default=e=>(0,o.dedent)(i.default`
    ${a.info} {bold Speed up Continuous Integration}
    Your project is linked to ${c[e]} so Chromatic will report results there.
    This means you can pass the {bold --exit-once-uploaded} flag to skip waiting for build results.
    Read more here: ${(0,s.default)("https://www.chromatic.com/docs/cli#chromatic-options")}
  `)},30375:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(80568),s=r(96920),c=n(r(95433)),u=r(2333);t.default=({build:e})=>{const{components:t,stories:r}=(0,u.stats)({build:e});return(0,o.dedent)(i.default`
    ${s.success} {bold Storybook published}
    We found ${t} with ${r}.
    ${s.info} View your Storybook at ${(0,c.default)((0,a.baseStorybookUrl)(e.cachedUrl))}
  `)}},56674:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=n(r(23450)),a=r(96920);t.default=(e,{changedFiles:t,affectedModules:r,modulesByName:n,normalize:s})=>{const c=e.log===console?"--mode (-m)":"--trace-changed",u=e.options.storybookBaseDir||".",l="expanded"===e.options.traceChanged,p=e=>((e,t,r)=>("."===t?e:e.replace(`${t}/`,i.default.dim(`${t}/`))).split("/").map(((e,t,n)=>{if(t<n.length-1)return e;const[,o,a=""]=e.match(/^(.+?)( \+ \d+ modules)?$/);return i.default.bold(o)+(r?i.default.magenta(a):i.default.dim(a))})).join("/"))(e,u,l),d=(0,o.default)("changed files",t.length,!0),A=(0,o.default)("affected story files",Object.keys(r).length,!0),h=i.default`${a.info} Traced {bold ${d}} to {bold ${A}}`;if("compact"===e.options.traceChanged){let e=!1;return`${h}:\n${Object.values(r).map((([t,...r])=>r.length?(e=!0,`${t} + ${r.length} modules`):t)).map((e=>i.default`— ${p(e)}`)).join("\n")}${e?i.default`\nSet {bold ${c}} to {bold 'expanded'} to reveal underlying modules.`:i.default`\nSet {bold ${c}} to reveal how these files are affected.`}`}const f=(e,t="")=>{if(!l)return"";const{modules:r}=n[e]||{};return r?r.reduce(((e,r)=>i.default`${e}\n${t}  ⎸  {dim ${s(r.name)}}`),""):""},m=new Set,g=Array.from(e.turboSnap.tracedPaths).map((e=>{const t=e.split("\n");return t.reduce(((e,r,n)=>{if(0===n)return i.default`— ${p(r)} {cyan [changed]}${f(r)}`;const o="  ".repeat(n);let a="";return n===t.length-1&&(m.has(r)?a=i.default` {yellow [duplicate]}`:m.add(r)),i.default`${e}\n${o}∟ ${p(r)}${a}${f(r,o)}`}),"").concat(i.default`\n${"  ".repeat(t.length)}∟ {cyan [story index]}`)})),y=i.default`\n\nSet {bold ${c}} to {bold 'expanded'} to reveal underlying modules.`;return`${h}:\n\n${g.join("\n\n")}${l?"":y}`}},86774:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=n(r(23450)),a=r(79986),s=r(96920);t.default=({build:e,options:t,skipSnapshots:r})=>{const n=(0,o.default)("snapshot",e.actualCaptureCount,!0),c=(0,o.default)("snapshot",e.inheritedCaptureCount,!0);return!t.interactive||r?(0,a.dedent)(i.default`
      ${s.success} {bold TurboSnap enabled}
      Capturing ${n} and skipping ${c}.
    `):(0,a.dedent)(i.default`
      ${s.success} {bold TurboSnap enabled}
      Captured ${n} and skipped ${c}.
    `)}},10335:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(96920);t.default=(e,t)=>i.default`${o.info} Wrote ${t} report to {bold ${e}}`},38734:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(80568),s=r(96920),c=n(r(95433));t.default=({turboSnap:e})=>{const{changedPackageFiles:t,changedStaticFiles:r,changedStorybookFiles:n}=e.bailReason,u=t||n||r,l=u.every((e=>(0,a.isPackageManifestFile)(e))),[p,...d]=u;let A=t?"package file":"static file";l&&(A="dependency"),n&&(A="Storybook config");let h="";return 1===d.length&&(h=i.default` or its module sibling {bold ${d[0]}}`),d.length>1&&(h=i.default` or one of its ${d.length} module siblings:\n{dim →} ${d.map((e=>i.default.bold(e))).join(i.default`\n{dim →} `)}`),(0,o.dedent)(i.default`
    ${s.warning} {bold TurboSnap disabled due to file change}
    Found a ${A} change in {bold ${p}}${h}
    A full build is required because this file cannot be linked to any specific stories.
    ${s.info} Read more at ${(0,c.default)("https://www.chromatic.com/docs/turbosnap#how-it-works")}
  `)}},27133:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920),s=n(r(95433));t.default=({billingUrl:e})=>(0,o.dedent)(i.default`
    ${a.warning} {bold Build limited}
    Visit ${(0,s.default)(e)} to verify your billing details.
  `)},67899:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920),s=n(r(95433)),c=e=>`--${e.replace(/[A-Z]/g,"-$&").toLowerCase()}`;t.default=({flag:e,replacement:t})=>(0,o.dedent)(i.default`
    ${a.warning} {bold Using deprecated option: ${c(e)}}
    This option is ${t?i.default`superceded by {bold ${c(t)}}`:"deprecated"} and may be removed in a future release.
    Refer to the changelog for more information: ${(0,s.default)("https://github.com/chromaui/chromatic-cli/blob/main/CHANGELOG.md")}
  `)},91307:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920);t.default=({sourceDir:e,options:t,packageJson:r},n)=>{const{buildScriptName:s}=t,c=r.scripts&&r.scripts[s];return(0,o.dedent)(i.default`
    ${a.warning} {bold Unexpected build directory}
    The CLI tried to build your Storybook at {bold ${e}}
    but instead it was built at {bold ${n}}
    Make sure your {bold "${s}"} script forwards the {bold --output-dir (-o)} flag to the {bold build-storybook} CLI.

    ${((e,t)=>{if(!t)return"";if(t.includes("npm run "))return(0,o.dedent)(i.default`
      It appears you're using {bold "npm run"} which is known to cause this problem.
      You can fix this by invoking {bold build-storybook} from your {bold "${e}"} script directly.
    `);const r=/(^|[ ])build-storybook([ ]|;|&&)/.test(t),n=/build-storybook.*(&&|;)/.test(t);return r&&n?(0,o.dedent)(i.default`
      This happens if {bold build-storybook} is not the last command in the script (e.g. you're using {bold &&} or {bold ;} to chain commands).
      You should use an npm {bold post*} script instead of command chaining.
    `):""})(s,c)}
  `).trim()}},73497:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920),s=n(r(95433));t.default=e=>{const t=1===e.length?"file":`${e.length} files`,r=e.map((e=>i.default.bold(e))),n=1===e.length?r[0]:i.default`\n{dim →} ${r.join(i.default`\n{dim →} `)}`;return(0,o.dedent)(i.default`
    ${a.warning} {bold TurboSnap disabled due to matching --externals}
    Found ${t} with changes: ${n}
    ${a.info} Read more at ${(0,s.default)("https://www.chromatic.com/docs/turbosnap#how-it-works")}
  `)}},25564:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920),s=n(r(95433));t.default=()=>(0,o.dedent)(i.default`
    ${a.warning} {bold TurboSnap disabled due to missing git history}
    Could not retrieve changed files since baseline commit(s).
    This typically happens after rebasing, force pushing, or when running against an ephemeral merge commit.
    ${a.info} Read more at ${(0,s.default)("https://www.chromatic.com/docs/turbosnap#how-it-works")}
  `)},43305:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920);t.default=()=>(0,o.dedent)(i.default`
    ${a.warning} {bold TurboSnap disabled due to rebuild}
    You appear to be rerunning an earlier build, because the baseline build has the same commit and branch name.
    Comparing against the same commit would yield zero changed files, so we would end up running a build with no snapshots.
    That's probably not what you want when rerunning a build, so we're just going to run a full build instead.
  `)},62220:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920);t.default=()=>(0,o.dedent)(i.default`
    ${a.warning} {bold TurboSnap disabled due to missing stats file}
    Did not find {bold preview-stats.json} in your built Storybook.
    Make sure you pass {bold --webpack-stats-json} when building your Storybook.
  `)},18722:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920),s=n(r(95433)),c="https://www.chromatic.com/docs/test#why-do-i-see-build-x-is-based-on-a-commit-without-ancestor-build";t.default=({announcedBuild:e,turboSnap:t})=>t?(0,o.dedent)(i.default`
      ${a.warning} {bold TurboSnap disabled due to missing ancestor build}
      An ancestor is required to determine which files have changed since the last Chromatic build.
      This usually happens when rebasing, force-pushing, squash-merging or running against an ephemeral merge commit.
      ${a.info} Read more at ${(0,s.default)(c)}
    `):(0,o.dedent)(i.default`
      ${a.warning} {bold No ancestor build found}
      Build ${e.number} is based on a commit without ancestor builds, which is unusual.
      This usually happens when rebasing, force-pushing, squash-merging or running against an ephemeral merge commit.
      ${a.info} Read more at ${(0,s.default)(c)}
    `)},30995:function(e,t,r){"use strict";var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}};Object.defineProperty(t,"__esModule",{value:!0});const i=n(r(34061)),o=r(79986),a=r(96920),s=n(r(95433));t.default=({ref:e,sha:t,env:r})=>e?(0,o.dedent)(i.default`
      ${a.warning} {bold Branch '${e}' does not exist}
      We tried to retrieve its latest commit but couldn't find it in your Git history.
      Falling back to ${t.slice(0,7)}, but commit details (date, author) will be missing.
      Pull request status updates likely won't work properly.
      Please use our official GitHub Action or forward the pull_request event info to us.
      ${a.info} Read more at ${(0,s.default)("https://www.chromatic.com/docs/github-actions")}
    `):r?(0,o.dedent)(i.default`
      ${a.warning} {bold Commit ${t.slice(0,7)} does not exist}
      We tried to retrieve the commit details but couldn't find it in your Git history.
      Check your {bold ${r}} environment variable.
    `):(0,o.dedent)(i.default`
