export default [
  {
    title: 'Binary Search',
    summary: 'Binary Search Algorithm implementation in JS',
    author: 'Michael Obasi',
    date: new Date('2025-05-29T00:00:00.000Z'),
    content:
      '### About Binary Search\n\nBinary search is a search algorithm that finds the position of a target value within a sorted array. The algorithm repeatedly divides the search interval in half, comparing the target value to the middle element of the interval. If the target value matches the middle element, the search is complete. If the target value is less than the middle element, the search continues in the left half of the interval. If the target value is greater than the middle element, the search continues in the right half of the `interval`. The process repeats until the target value is found or the search interval is empty.\n\n---\n\n### Implementation\n\n```ts app/page.tsx\nfunction binarySearch(arr: number[], target: number): number {\n  let left = 0;\n  let right = arr.length - 1;\n\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) {\n      return mid;\n    } else if (arr[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n\n  return -1;\n}\n```\n\n### TEST\n\n```plaintext JStack File Structure\napp/\n  └── server/\n      ├── jstack.ts        # Initialize JStack\n      ├── index.ts         # Main appRouter\n      └── routers/         # Router directory\n          ├── user-router.ts\n          ├── post-router.ts\n          └── ...\n```\n\n<Description content="Binary Search Algorithm implementation in JS" />\n\n```ts server/jstack.ts {1,7}\nimport { jstack } from \'jstack\';\n\ninterface Env {\n  Bindings: { DATABASE_URL: string };\n}\n\nexport const j = jstack.init<Env>();\n\n/**\n * Public (unauthenticated) procedures\n * This is the base part you use to create new procedures.\n */\nexport const publicProcedure = j.procedure;\n```\n\n<Description content="Binary Search Algorithm implementation in JS" />\n\n```tsx app/page.tsx\nconst res = await client.post.recent.$get();\nconst post = await res.json();\n// ^ automatically type-safe: { post: Post }\n```\n\n### Another Implementation\n\n```bash Terminal\nnpx wrangler deploy server/index.ts\n```\n\n---\n\n### Analysis\n\n- Time Complexity: O(log n)\n- Space Complexity: O(1)\n\n---\n\n### Example\n\n```ts {4-10} server/routers/post-router.ts\nconst arr = [1, 2, 3, 4, 5];\nconst target = 3;\nconst result = binarySearch(arr, target);\nconsole.log(result); // Output: 2\n```\n\n---\n\n### Applications\n\n- Searching for an element in a sorted array\n- Finding the index of a target element\n- Implementing a binary search algorithm\n\n---\n\n### Limitations\n\n- Not efficient for large datasets\n- Not suitable for searching in unsorted arrays\n- Not recommended for production use\n\n---\n\n### Conclusion\n\nBinary search is a simple and easy-to-implement search algorithm, but it is not the most efficient for large datasets. It is best used for small datasets or when the dataset is sorted.\n\n---\n\n### References\n\n- [Binary Search Algorithm](https://www.geeksforgeeks.org/binary-search/)\n- [Binary Search Algorithm in JS](https://www.geeksforgeeks.org/binary-search-algorithm-in-js/)',
    _meta: {
      filePath: 'binary-search.mdx',
      fileName: 'binary-search.mdx',
      directory: '.',
      extension: 'mdx',
      path: 'binary-search',
    },
    headings: [
      {
        level: 3,
        text: 'About Binary Search',
        slug: 'about-binary-search',
      },
      {
        level: 3,
        text: 'Implementation',
        slug: 'implementation',
      },
      {
        level: 3,
        text: 'TEST',
        slug: 'test',
      },
      {
        level: 3,
        text: 'Another Implementation',
        slug: 'another-implementation',
      },
      {
        level: 3,
        text: 'Analysis',
        slug: 'analysis',
      },
      {
        level: 3,
        text: 'Example',
        slug: 'example',
      },
      {
        level: 3,
        text: 'Applications',
        slug: 'applications',
      },
      {
        level: 3,
        text: 'Limitations',
        slug: 'limitations',
      },
      {
        level: 3,
        text: 'Conclusion',
        slug: 'conclusion',
      },
      {
        level: 3,
        text: 'References',
        slug: 'references',
      },
    ],
    mdx: 'var Component=(()=>{var u=Object.create;var i=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var m=Object.getPrototypeOf,f=Object.prototype.hasOwnProperty;var x=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),y=(t,e)=>{for(var r in e)i(t,r,{get:e[r],enumerable:!0})},l=(t,e,r,s)=>{if(e&&typeof e=="object"||typeof e=="function")for(let a of g(e))!f.call(t,a)&&a!==r&&i(t,a,{get:()=>e[a],enumerable:!(s=p(e,a))||s.enumerable});return t};var b=(t,e,r)=>(r=t!=null?u(m(t)):{},l(e||!t||!t.__esModule?i(r,"default",{value:t,enumerable:!0}):r,t)),v=t=>l(i({},"__esModule",{value:!0}),t);var c=x((w,o)=>{o.exports=_jsx_runtime});var j={};y(j,{default:()=>d});var n=b(c());function h(t){let e={a:"a",code:"code",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",ul:"ul",...t.components},{Description:r}=e;return r||S("Description",!0),(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.h3,{children:"About Binary Search"}),`\n`,(0,n.jsxs)(e.p,{children:["Binary search is a search algorithm that finds the position of a target value within a sorted array. The algorithm repeatedly divides the search interval in half, comparing the target value to the middle element of the interval. If the target value matches the middle element, the search is complete. If the target value is less than the middle element, the search continues in the left half of the interval. If the target value is greater than the middle element, the search continues in the right half of the ",(0,n.jsx)(e.code,{children:"interval"}),". The process repeats until the target value is found or the search interval is empty."]}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h3,{children:"Implementation"}),`\n`,(0,n.jsx)(e.pre,{language:"ts",title:"app/page.tsx",meta:"app/page.tsx",code:`\\`\\`\\`ts app/page.tsx\nfunction binarySearch(arr: number[], target: number): number {\n  let left = 0;\n  let right = arr.length - 1;\n\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) {\n      return mid;\n    } else if (arr[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n\n  return -1;\n}\n\\`\\`\\``,children:(0,n.jsx)(e.code,{className:"language-ts",children:`function binarySearch(arr: number[], target: number): number {\n  let left = 0;\n  let right = arr.length - 1;\n\n  while (left <= right) {\n    const mid = Math.floor((left + right) / 2);\n    if (arr[mid] === target) {\n      return mid;\n    } else if (arr[mid] < target) {\n      left = mid + 1;\n    } else {\n      right = mid - 1;\n    }\n  }\n\n  return -1;\n}\n`})}),`\n`,(0,n.jsx)(e.h3,{children:"TEST"}),`\n`,(0,n.jsx)(e.pre,{language:"plaintext",title:"JStack File Structure",meta:"JStack File Structure",code:`\\`\\`\\`plaintext JStack File Structure\napp/\n  \\u2514\\u2500\\u2500 server/\n      \\u251C\\u2500\\u2500 jstack.ts        # Initialize JStack\n      \\u251C\\u2500\\u2500 index.ts         # Main appRouter\n      \\u2514\\u2500\\u2500 routers/         # Router directory\n          \\u251C\\u2500\\u2500 user-router.ts\n          \\u251C\\u2500\\u2500 post-router.ts\n          \\u2514\\u2500\\u2500 ...\n\\`\\`\\``,children:(0,n.jsx)(e.code,{className:"language-plaintext",children:`app/\n  \\u2514\\u2500\\u2500 server/\n      \\u251C\\u2500\\u2500 jstack.ts        # Initialize JStack\n      \\u251C\\u2500\\u2500 index.ts         # Main appRouter\n      \\u2514\\u2500\\u2500 routers/         # Router directory\n          \\u251C\\u2500\\u2500 user-router.ts\n          \\u251C\\u2500\\u2500 post-router.ts\n          \\u2514\\u2500\\u2500 ...\n`})}),`\n`,(0,n.jsx)(r,{content:"Binary Search Algorithm implementation in JS"}),`\n`,(0,n.jsx)(e.pre,{language:"ts",title:"server/jstack.ts",meta:"server/jstack.ts {1,7}",code:`\\`\\`\\`ts server/jstack.ts {1,7}\nimport { jstack } from \'jstack\';\n\ninterface Env {\n  Bindings: { DATABASE_URL: string };\n}\n\nexport const j = jstack.init<Env>();\n\n/**\n * Public (unauthenticated) procedures\n * This is the base part you use to create new procedures.\n */\nexport const publicProcedure = j.procedure;\n\\`\\`\\``,children:(0,n.jsx)(e.code,{className:"language-ts",children:`import { jstack } from \'jstack\';\n\ninterface Env {\n  Bindings: { DATABASE_URL: string };\n}\n\nexport const j = jstack.init<Env>();\n\n/**\n * Public (unauthenticated) procedures\n * This is the base part you use to create new procedures.\n */\nexport const publicProcedure = j.procedure;\n`})}),`\n`,(0,n.jsx)(r,{content:"Binary Search Algorithm implementation in JS"}),`\n`,(0,n.jsx)(e.pre,{language:"tsx",title:"app/page.tsx",meta:"app/page.tsx",code:"```tsx app/page.tsx\\nconst res = await client.post.recent.$get();\\nconst post = await res.json();\\n// ^ automatically type-safe: { post: Post }\\n```",children:(0,n.jsx)(e.code,{className:"language-tsx",children:`const res = await client.post.recent.$get();\nconst post = await res.json();\n// ^ automatically type-safe: { post: Post }\n`})}),`\n`,(0,n.jsx)(e.h3,{children:"Another Implementation"}),`\n`,(0,n.jsx)(e.pre,{language:"bash",title:"Terminal",meta:"Terminal",code:"```bash Terminal\\nnpx wrangler deploy server/index.ts\\n```",children:(0,n.jsx)(e.code,{className:"language-bash",children:`npx wrangler deploy server/index.ts\n`})}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h3,{children:"Analysis"}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsx)(e.li,{children:"Time Complexity: O(log n)"}),`\n`,(0,n.jsx)(e.li,{children:"Space Complexity: O(1)"}),`\n`]}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h3,{children:"Example"}),`\n`,(0,n.jsx)(e.pre,{language:"ts",meta:"{4-10} server/routers/post-router.ts",code:"```ts {4-10} server/routers/post-router.ts\\nconst arr = [1, 2, 3, 4, 5];\\nconst target = 3;\\nconst result = binarySearch(arr, target);\\nconsole.log(result); // Output: 2\\n```",children:(0,n.jsx)(e.code,{className:"language-ts",children:`const arr = [1, 2, 3, 4, 5];\nconst target = 3;\nconst result = binarySearch(arr, target);\nconsole.log(result); // Output: 2\n`})}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h3,{children:"Applications"}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsx)(e.li,{children:"Searching for an element in a sorted array"}),`\n`,(0,n.jsx)(e.li,{children:"Finding the index of a target element"}),`\n`,(0,n.jsx)(e.li,{children:"Implementing a binary search algorithm"}),`\n`]}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h3,{children:"Limitations"}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsx)(e.li,{children:"Not efficient for large datasets"}),`\n`,(0,n.jsx)(e.li,{children:"Not suitable for searching in unsorted arrays"}),`\n`,(0,n.jsx)(e.li,{children:"Not recommended for production use"}),`\n`]}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h3,{children:"Conclusion"}),`\n`,(0,n.jsx)(e.p,{children:"Binary search is a simple and easy-to-implement search algorithm, but it is not the most efficient for large datasets. It is best used for small datasets or when the dataset is sorted."}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h3,{children:"References"}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsx)(e.li,{children:(0,n.jsx)(e.a,{href:"https://www.geeksforgeeks.org/binary-search/",children:"Binary Search Algorithm"})}),`\n`,(0,n.jsx)(e.li,{children:(0,n.jsx)(e.a,{href:"https://www.geeksforgeeks.org/binary-search-algorithm-in-js/",children:"Binary Search Algorithm in JS"})}),`\n`]})]})}function d(t={}){let{wrapper:e}=t.components||{};return e?(0,n.jsx)(e,{...t,children:(0,n.jsx)(h,{...t})}):h(t)}function S(t,e){throw new Error("Expected "+(e?"component":"object")+" `"+t+"` to be defined: you likely forgot to import, pass, or provide it.")}return v(j);})();\n;return Component;',
    segments: ['binary-search'],
  },
  {
    title: 'test',
    summary:
      "Join the team at ContentCrafter Inc. as they embark on a hilarious adventure in Antarctica. From a penguin trying to steal a Collector's lunch to the Validators' meticulous review process and the Transformers' creative magic, this lighthearted story showcases the fun and camaraderie that goes into crafting unique content.",
    author: 'Emily Johnson',
    date: new Date('2024-08-15T00:00:00.000Z'),
    content:
      "Imagine this: you're on a remote island in the Antarctic, surrounded by a colony of curious penguins. You're just about to enjoy a well-deserved lunch after a long morning of content collecting when, out of nowhere, a cheeky penguin waddles up and makes a grab for your sandwich. Welcome to the wild and whimsical world of ContentCrafter Inc., where every day is an adventure filled with unexpected hilarity and heartwarming moments.\n\n## Penguin Shenanigans and Other Oddities\n\nOur story begins with the intrepid Collectors of ContentCrafter Inc., a group of adventurous souls who travel to the farthest corners of the globe in search of unique content. This time, their journey took them to the icy realms of Antarctica. Armed with cameras, notebooks, and an insatiable curiosity, they set out to capture the essence of this frozen wonderland.\n\nOne particularly memorable day, while documenting the daily life of a penguin colony, Collector Sam found himself in a bit of a pickle. As he sat down to enjoy his lunch, a particularly bold penguin decided that Sam's sandwich looked too good to resist. The ensuing tug-of-war between man and bird was a sight to behold, with Sam's colleagues laughing uncontrollably as they captured the moment on film.\n\nBut the penguin wasn't the only source of amusement. The Collectors also encountered a group of seals who seemed to think they were part of a synchronized swimming team, and a particularly grumpy albatross who took offense at their presence. Despite the challenges, the team managed to gather an array of fascinating and funny content, from penguin pranks to seal shenanigans.\n\n## Decoding the Antarctic Antics\n\nBack at ContentCrafter HQ, the Validators were eagerly awaiting the return of the Collectors. Their job was to sift through the collected content, ensuring its accuracy and quality. Validator Jane, known for her meticulous nature, was particularly excited about the penguin footage.\n\nAs Jane and her team began their review, they couldn't help but chuckle at the antics captured on film. However, their laughter quickly turned to groans when they realized just how much work lay ahead. The footage was filled with unexpected photobombs, shaky camera work, and more than a few instances of Sam's sandwich-stealing nemesis.\n\nValidator Mike, ever the perfectionist, spent hours trying to identify each penguin by its unique markings, while Validator Lucy attempted to translate the seemingly nonsensical squawks and chirps. The team also had to deal with the occasional prank from their colleagues, who thought it would be funny to insert clips of dancing penguins into the serious documentary footage.\n\nDespite the hurdles, the Validators managed to piece together a coherent and entertaining narrative, all while sharing plenty of laughs and inside jokes.\n\n## From Chaos to Content Gold\n\nWith the content validated, it was time for the Transformers to work their magic. This creative team was responsible for turning raw footage and notes into polished pieces that would captivate ContentCrafter's clients.\n\nTransformer Alex, known for his wild imagination, suggested turning the penguin footage into a mockumentary titled \"Penguins: The Real Rulers of Antarctica.\" His colleagues, Transformer Emma and Transformer Jack, were initially skeptical but soon found themselves brainstorming hilarious scenarios and witty dialogue.\n\nAs they worked, the Transformers encountered their fair share of funny moments. At one point, Alex accidentally added a soundtrack of dramatic opera music to a clip of a penguin slipping on ice, resulting in uncontrollable laughter from the entire team. Another time, Emma's attempt to create a serious narration was interrupted by Jack's impromptu penguin impressions.\n\nAfter countless revisions and plenty of creative brainstorming, the Transformers finally produced a piece that perfectly balanced humor and information. The final product was a hit, both with the clients and the rest of the ContentCrafter team.\n\n## A Journey Worth Every Laugh\n\nAs the team at ContentCrafter Inc. reflected on their latest adventure, they couldn't help but smile. From the Collectors' daring escapades to the Validators' meticulous efforts and the Transformers' creative genius, every step of the process was filled with laughter and camaraderie.\n\nIn the end, it wasn't just about the content they created; it was about the joy they found in the journey. And as they prepared for their next adventure, one thing was certain: at ContentCrafter Inc., every day is a new opportunity for fun, creativity, and a few unexpected surprises.",
    _meta: {
      filePath: 'jump-search.mdx',
      fileName: 'jump-search.mdx',
      directory: '.',
      extension: 'mdx',
      path: 'jump-search',
    },
    headings: [
      {
        level: 2,
        text: 'Penguin Shenanigans and Other Oddities',
        slug: 'penguin-shenanigans-and-other-oddities',
      },
      {
        level: 2,
        text: 'Decoding the Antarctic Antics',
        slug: 'decoding-the-antarctic-antics',
      },
      {
        level: 2,
        text: 'From Chaos to Content Gold',
        slug: 'from-chaos-to-content-gold',
      },
      {
        level: 2,
        text: 'A Journey Worth Every Laugh',
        slug: 'a-journey-worth-every-laugh',
      },
    ],
    mdx: 'var Component=(()=>{var u=Object.create;var r=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var f=Object.getOwnPropertyNames;var p=Object.getPrototypeOf,g=Object.prototype.hasOwnProperty;var y=(n,e)=>()=>(e||n((e={exports:{}}).exports,e),e.exports),w=(n,e)=>{for(var a in e)r(n,a,{get:e[a],enumerable:!0})},s=(n,e,a,i)=>{if(e&&typeof e=="object"||typeof e=="function")for(let o of f(e))!g.call(n,o)&&o!==a&&r(n,o,{get:()=>e[o],enumerable:!(i=m(e,o))||i.enumerable});return n};var b=(n,e,a)=>(a=n!=null?u(p(n)):{},s(e||!n||!n.__esModule?r(a,"default",{value:n,enumerable:!0}):a,n)),k=n=>s(r({},"__esModule",{value:!0}),n);var l=y((A,h)=>{h.exports=_jsx_runtime});var C={};w(C,{default:()=>d});var t=b(l());function c(n){let e={h2:"h2",p:"p",...n.components};return(0,t.jsxs)(t.Fragment,{children:[(0,t.jsx)(e.p,{children:"Imagine this: you\'re on a remote island in the Antarctic, surrounded by a colony of curious penguins. You\'re just about to enjoy a well-deserved lunch after a long morning of content collecting when, out of nowhere, a cheeky penguin waddles up and makes a grab for your sandwich. Welcome to the wild and whimsical world of ContentCrafter Inc., where every day is an adventure filled with unexpected hilarity and heartwarming moments."}),`\n`,(0,t.jsx)(e.h2,{children:"Penguin Shenanigans and Other Oddities"}),`\n`,(0,t.jsx)(e.p,{children:"Our story begins with the intrepid Collectors of ContentCrafter Inc., a group of adventurous souls who travel to the farthest corners of the globe in search of unique content. This time, their journey took them to the icy realms of Antarctica. Armed with cameras, notebooks, and an insatiable curiosity, they set out to capture the essence of this frozen wonderland."}),`\n`,(0,t.jsx)(e.p,{children:"One particularly memorable day, while documenting the daily life of a penguin colony, Collector Sam found himself in a bit of a pickle. As he sat down to enjoy his lunch, a particularly bold penguin decided that Sam\'s sandwich looked too good to resist. The ensuing tug-of-war between man and bird was a sight to behold, with Sam\'s colleagues laughing uncontrollably as they captured the moment on film."}),`\n`,(0,t.jsx)(e.p,{children:"But the penguin wasn\'t the only source of amusement. The Collectors also encountered a group of seals who seemed to think they were part of a synchronized swimming team, and a particularly grumpy albatross who took offense at their presence. Despite the challenges, the team managed to gather an array of fascinating and funny content, from penguin pranks to seal shenanigans."}),`\n`,(0,t.jsx)(e.h2,{children:"Decoding the Antarctic Antics"}),`\n`,(0,t.jsx)(e.p,{children:"Back at ContentCrafter HQ, the Validators were eagerly awaiting the return of the Collectors. Their job was to sift through the collected content, ensuring its accuracy and quality. Validator Jane, known for her meticulous nature, was particularly excited about the penguin footage."}),`\n`,(0,t.jsx)(e.p,{children:"As Jane and her team began their review, they couldn\'t help but chuckle at the antics captured on film. However, their laughter quickly turned to groans when they realized just how much work lay ahead. The footage was filled with unexpected photobombs, shaky camera work, and more than a few instances of Sam\'s sandwich-stealing nemesis."}),`\n`,(0,t.jsx)(e.p,{children:"Validator Mike, ever the perfectionist, spent hours trying to identify each penguin by its unique markings, while Validator Lucy attempted to translate the seemingly nonsensical squawks and chirps. The team also had to deal with the occasional prank from their colleagues, who thought it would be funny to insert clips of dancing penguins into the serious documentary footage."}),`\n`,(0,t.jsx)(e.p,{children:"Despite the hurdles, the Validators managed to piece together a coherent and entertaining narrative, all while sharing plenty of laughs and inside jokes."}),`\n`,(0,t.jsx)(e.h2,{children:"From Chaos to Content Gold"}),`\n`,(0,t.jsx)(e.p,{children:"With the content validated, it was time for the Transformers to work their magic. This creative team was responsible for turning raw footage and notes into polished pieces that would captivate ContentCrafter\'s clients."}),`\n`,(0,t.jsx)(e.p,{children:\'Transformer Alex, known for his wild imagination, suggested turning the penguin footage into a mockumentary titled "Penguins: The Real Rulers of Antarctica." His colleagues, Transformer Emma and Transformer Jack, were initially skeptical but soon found themselves brainstorming hilarious scenarios and witty dialogue.\'}),`\n`,(0,t.jsx)(e.p,{children:"As they worked, the Transformers encountered their fair share of funny moments. At one point, Alex accidentally added a soundtrack of dramatic opera music to a clip of a penguin slipping on ice, resulting in uncontrollable laughter from the entire team. Another time, Emma\'s attempt to create a serious narration was interrupted by Jack\'s impromptu penguin impressions."}),`\n`,(0,t.jsx)(e.p,{children:"After countless revisions and plenty of creative brainstorming, the Transformers finally produced a piece that perfectly balanced humor and information. The final product was a hit, both with the clients and the rest of the ContentCrafter team."}),`\n`,(0,t.jsx)(e.h2,{children:"A Journey Worth Every Laugh"}),`\n`,(0,t.jsx)(e.p,{children:"As the team at ContentCrafter Inc. reflected on their latest adventure, they couldn\'t help but smile. From the Collectors\' daring escapades to the Validators\' meticulous efforts and the Transformers\' creative genius, every step of the process was filled with laughter and camaraderie."}),`\n`,(0,t.jsx)(e.p,{children:"In the end, it wasn\'t just about the content they created; it was about the joy they found in the journey. And as they prepared for their next adventure, one thing was certain: at ContentCrafter Inc., every day is a new opportunity for fun, creativity, and a few unexpected surprises."})]})}function d(n={}){let{wrapper:e}=n.components||{};return e?(0,t.jsx)(e,{...n,children:(0,t.jsx)(c,{...n})}):c(n)}return k(C);})();\n;return Component;',
    segments: ['jump-search'],
  },
  {
    title: 'Linear Search',
    summary: 'Linear Search Algorithm in JS',
    author: 'Michael Obasi',
    date: new Date('2025-05-29T00:00:00.000Z'),
    content:
      '### About Linear Search\n\nLinear search is a simple search algorithm that sequentially checks each element of a list until the target element is found or the list is exhausted.\n\n---\n\n### Implementation\n\n```ts\nfunction linearSearch(arr: number[], target: number): number {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) {\n      return i;\n    }\n  }\n  return -1;\n}\n```\n\n---\n\n### Analysis\n\n- Time Complexity: O(n)\n- Space Complexity: O(1)\n\n---\n\n### Example\n\n```ts\nconst arr = [1, 2, 3, 4, 5];\nconst target = 3;\nconst result = linearSearch(arr, target);\nconsole.log(result); // Output: 2\n```\n\n---\n\n### Applications\n\n- Searching for an element in an unsorted array\n- Finding the index of a target element\n- Implementing a basic search algorithm\n\n---\n\n### Limitations\n\n- Not efficient for large datasets\n- Not suitable for searching in sorted arrays\n- Not recommended for production use\n\n---\n\n### Conclusion\n\nLinear search is a simple and easy-to-implement search algorithm, but it is not the most efficient for large datasets. It is best used for small datasets or when the dataset is not sorted.\n\n---\n\n### References\n\n- [Linear Search Algorithm](https://www.geeksforgeeks.org/linear-search/)\n- [Linear Search Algorithm in JS](https://www.geeksforgeeks.org/linear-search-algorithm-in-js/)',
    _meta: {
      filePath: 'linear-search.mdx',
      fileName: 'linear-search.mdx',
      directory: '.',
      extension: 'mdx',
      path: 'linear-search',
    },
    headings: [
      {
        level: 3,
        text: 'About Linear Search',
        slug: 'about-linear-search',
      },
      {
        level: 3,
        text: 'Implementation',
        slug: 'implementation',
      },
      {
        level: 3,
        text: 'Analysis',
        slug: 'analysis',
      },
      {
        level: 3,
        text: 'Example',
        slug: 'example',
      },
      {
        level: 3,
        text: 'Applications',
        slug: 'applications',
      },
      {
        level: 3,
        text: 'Limitations',
        slug: 'limitations',
      },
      {
        level: 3,
        text: 'Conclusion',
        slug: 'conclusion',
      },
      {
        level: 3,
        text: 'References',
        slug: 'references',
      },
    ],
    mdx: 'var Component=(()=>{var u=Object.create;var a=Object.defineProperty;var m=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var f=Object.getPrototypeOf,p=Object.prototype.hasOwnProperty;var x=(r,e)=>()=>(e||r((e={exports:{}}).exports,e),e.exports),b=(r,e)=>{for(var t in e)a(r,t,{get:e[t],enumerable:!0})},h=(r,e,t,l)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of g(e))!p.call(r,i)&&i!==t&&a(r,i,{get:()=>e[i],enumerable:!(l=m(e,i))||l.enumerable});return r};var S=(r,e,t)=>(t=r!=null?u(f(r)):{},h(e||!r||!r.__esModule?a(t,"default",{value:r,enumerable:!0}):t,r)),w=r=>h(a({},"__esModule",{value:!0}),r);var c=x((_,s)=>{s.exports=_jsx_runtime});var y={};b(y,{default:()=>d});var n=S(c());function o(r){let e={a:"a",code:"code",h3:"h3",hr:"hr",li:"li",p:"p",pre:"pre",ul:"ul",...r.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.h3,{children:"About Linear Search"}),`\n`,(0,n.jsx)(e.p,{children:"Linear search is a simple search algorithm that sequentially checks each element of a list until the target element is found or the list is exhausted."}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h3,{children:"Implementation"}),`\n`,(0,n.jsx)(e.pre,{language:"ts",meta:"",code:`\\`\\`\\`ts\nfunction linearSearch(arr: number[], target: number): number {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) {\n      return i;\n    }\n  }\n  return -1;\n}\n\\`\\`\\``,children:(0,n.jsx)(e.code,{className:"language-ts",children:`function linearSearch(arr: number[], target: number): number {\n  for (let i = 0; i < arr.length; i++) {\n    if (arr[i] === target) {\n      return i;\n    }\n  }\n  return -1;\n}\n`})}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h3,{children:"Analysis"}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsx)(e.li,{children:"Time Complexity: O(n)"}),`\n`,(0,n.jsx)(e.li,{children:"Space Complexity: O(1)"}),`\n`]}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h3,{children:"Example"}),`\n`,(0,n.jsx)(e.pre,{language:"ts",meta:"",code:"```ts\\nconst arr = [1, 2, 3, 4, 5];\\nconst target = 3;\\nconst result = linearSearch(arr, target);\\nconsole.log(result); // Output: 2\\n```",children:(0,n.jsx)(e.code,{className:"language-ts",children:`const arr = [1, 2, 3, 4, 5];\nconst target = 3;\nconst result = linearSearch(arr, target);\nconsole.log(result); // Output: 2\n`})}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h3,{children:"Applications"}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsx)(e.li,{children:"Searching for an element in an unsorted array"}),`\n`,(0,n.jsx)(e.li,{children:"Finding the index of a target element"}),`\n`,(0,n.jsx)(e.li,{children:"Implementing a basic search algorithm"}),`\n`]}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h3,{children:"Limitations"}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsx)(e.li,{children:"Not efficient for large datasets"}),`\n`,(0,n.jsx)(e.li,{children:"Not suitable for searching in sorted arrays"}),`\n`,(0,n.jsx)(e.li,{children:"Not recommended for production use"}),`\n`]}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h3,{children:"Conclusion"}),`\n`,(0,n.jsx)(e.p,{children:"Linear search is a simple and easy-to-implement search algorithm, but it is not the most efficient for large datasets. It is best used for small datasets or when the dataset is not sorted."}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h3,{children:"References"}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsx)(e.li,{children:(0,n.jsx)(e.a,{href:"https://www.geeksforgeeks.org/linear-search/",children:"Linear Search Algorithm"})}),`\n`,(0,n.jsx)(e.li,{children:(0,n.jsx)(e.a,{href:"https://www.geeksforgeeks.org/linear-search-algorithm-in-js/",children:"Linear Search Algorithm in JS"})}),`\n`]})]})}function d(r={}){let{wrapper:e}=r.components||{};return e?(0,n.jsx)(e,{...r,children:(0,n.jsx)(o,{...r})}):o(r)}return w(y);})();\n;return Component;',
    segments: ['linear-search'],
  },
];
