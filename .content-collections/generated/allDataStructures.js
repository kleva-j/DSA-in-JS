export default [
  {
    title: 'Array',
    summary: 'Array Data Structure in JS',
    author: 'Michael Obasi',
    date: new Date('2025-05-29T00:00:00.000Z'),
    content:
      '# About Array\n\nObjects allow you to store keyed collections of values. That’s fine.\n\nBut quite often we find that we need an ordered collection, where we have a 1st, a 2nd, a 3rd element and so on. For example, we need that to store a list of something: users, goods, HTML elements etc.\n\nIt is not convenient to use an object here, because it provides no methods to manage the order of elements. We can’t insert a new property “between” the existing ones. Objects are just not meant for such use.\n\nAn array is a collection of elements of the same type stored in contiguous memory locations. Each element in the array is accessed using an index, which is a non-negative integer representing its position in the array.\n\n---\n\n## Implementation\n\n```ts\nconst array = [1, 2, 3, 4, 5];\n```\n\n---\n\n## Analysis\n\n- Time Complexity: O(1)\n- Space Complexity: O(1)\n\n---\n\n## Applications\n\n- Storing a collection of elements\n- Implementing a stack or queue\n- Implementing a priority queue\n- Implementing a hash table\n- Implementing a graph\n\n---\n\n## Limitations\n\n- Not efficient for large datasets\n- Not suitable for searching in sorted arrays\n- Not recommended for production use\n\n---\n\n## Conclusion\n\nArrays are a simple and easy-to-implement data structure, but it is not the most efficient for large datasets. It is best used for small datasets or when the dataset is not sorted.\n\n---\n\n## References\n\n- [Array in JS](https://www.geeksforgeeks.org/array-in-js/)',
    _meta: {
      filePath: 'array.mdx',
      fileName: 'array.mdx',
      directory: '.',
      extension: 'mdx',
      path: 'array',
    },
    headings: [
      {
        level: 1,
        text: 'About Array',
        slug: 'about-array',
      },
      {
        level: 2,
        text: 'Implementation',
        slug: 'implementation',
      },
      {
        level: 2,
        text: 'Analysis',
        slug: 'analysis',
      },
      {
        level: 2,
        text: 'Applications',
        slug: 'applications',
      },
      {
        level: 2,
        text: 'Limitations',
        slug: 'limitations',
      },
      {
        level: 2,
        text: 'Conclusion',
        slug: 'conclusion',
      },
      {
        level: 2,
        text: 'References',
        slug: 'references',
      },
    ],
    mdx: 'var Component=(()=>{var m=Object.create;var o=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var g=Object.getPrototypeOf,f=Object.prototype.hasOwnProperty;var y=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),w=(t,e)=>{for(var r in e)o(t,r,{get:e[r],enumerable:!0})},s=(t,e,r,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of p(e))!f.call(t,i)&&i!==r&&o(t,i,{get:()=>e[i],enumerable:!(a=u(e,i))||a.enumerable});return t};var x=(t,e,r)=>(r=t!=null?m(g(t)):{},s(e||!t||!t.__esModule?o(r,"default",{value:t,enumerable:!0}):r,t)),b=t=>s(o({},"__esModule",{value:!0}),t);var c=y((I,l)=>{l.exports=_jsx_runtime});var j={};w(j,{default:()=>d});var n=x(c());function h(t){let e={a:"a",code:"code",h1:"h1",h2:"h2",hr:"hr",li:"li",p:"p",pre:"pre",ul:"ul",...t.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.h1,{children:"About Array"}),`\n`,(0,n.jsx)(e.p,{children:"Objects allow you to store keyed collections of values. That\\u2019s fine."}),`\n`,(0,n.jsx)(e.p,{children:"But quite often we find that we need an ordered collection, where we have a 1st, a 2nd, a 3rd element and so on. For example, we need that to store a list of something: users, goods, HTML elements etc."}),`\n`,(0,n.jsx)(e.p,{children:"It is not convenient to use an object here, because it provides no methods to manage the order of elements. We can\\u2019t insert a new property \\u201Cbetween\\u201D the existing ones. Objects are just not meant for such use."}),`\n`,(0,n.jsx)(e.p,{children:"An array is a collection of elements of the same type stored in contiguous memory locations. Each element in the array is accessed using an index, which is a non-negative integer representing its position in the array."}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h2,{children:"Implementation"}),`\n`,(0,n.jsx)(e.pre,{language:"ts",meta:"",code:"```ts\\nconst array = [1, 2, 3, 4, 5];\\n```",children:(0,n.jsx)(e.code,{className:"language-ts",children:`const array = [1, 2, 3, 4, 5];\n`})}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h2,{children:"Analysis"}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsx)(e.li,{children:"Time Complexity: O(1)"}),`\n`,(0,n.jsx)(e.li,{children:"Space Complexity: O(1)"}),`\n`]}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h2,{children:"Applications"}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsx)(e.li,{children:"Storing a collection of elements"}),`\n`,(0,n.jsx)(e.li,{children:"Implementing a stack or queue"}),`\n`,(0,n.jsx)(e.li,{children:"Implementing a priority queue"}),`\n`,(0,n.jsx)(e.li,{children:"Implementing a hash table"}),`\n`,(0,n.jsx)(e.li,{children:"Implementing a graph"}),`\n`]}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h2,{children:"Limitations"}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsx)(e.li,{children:"Not efficient for large datasets"}),`\n`,(0,n.jsx)(e.li,{children:"Not suitable for searching in sorted arrays"}),`\n`,(0,n.jsx)(e.li,{children:"Not recommended for production use"}),`\n`]}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h2,{children:"Conclusion"}),`\n`,(0,n.jsx)(e.p,{children:"Arrays are a simple and easy-to-implement data structure, but it is not the most efficient for large datasets. It is best used for small datasets or when the dataset is not sorted."}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h2,{children:"References"}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsx)(e.li,{children:(0,n.jsx)(e.a,{href:"https://www.geeksforgeeks.org/array-in-js/",children:"Array in JS"})}),`\n`]})]})}function d(t={}){let{wrapper:e}=t.components||{};return e?(0,n.jsx)(e,{...t,children:(0,n.jsx)(h,{...t})}):h(t)}return b(j);})();\n;return Component;',
    segments: ['array'],
  },
  {
    title: 'Strings',
    summary: 'Strings Primitive Data Structure in JS',
    author: 'Michael Obasi',
    date: new Date('2025-05-29T00:00:00.000Z'),
    content:
      "# About Strings\n\nIn JavaScript, the textual data is stored as strings. A string is a sequence of characters, and it is one of the primitive data types in JavaScript. The internal format for strings is always UTF-16, it is not tied to the page encoding.\n\n**Special Character**\n\n- `\\n` - Newline\n- `\\t` - Tab\n- `\\r` - Carriage Return\n- `\\b` - Backspace\n- `\\f` - Form Feed\n- `\\\\` - Backslash\n- `\\'` - Single Quote\n- `\\\"` - Double Quote\n\n**Strings are immutable in JS**\nStrings can't be changed in JavaScript. It is impossible to change a character.\nLet’s try it to show that it doesn’t work:\n\n```ts\nlet str = 'Hi';\n\nstr[0] = 'h'; // error\nalert(str[0]); // doesn't work\n```\n\nThe usual workaround is to create a whole new string and assign it to str instead of the old one.\n\n**Workaround**\n\n```ts\nlet str = 'Hi';\nstr = 'h' + str[1]; // create a new string \"hI\" and assign it to str\nalert(str); // \"hI\"\n```\n\n---\n\n## Limitations\n\n- Not efficient for large datasets\n- Not suitable for searching in sorted arrays\n- Not recommended for production use\n\n---\n\n## Conclusion\n\nStrings are a simple and easy-to-implement data structure, but it is not the most efficient for large datasets. It is best used for small datasets or when the dataset is not sorted.\n\n---\n\n## References\n\n- [Strings in JS](https://www.geeksforgeeks.org/strings-in-js/)",
    _meta: {
      filePath: 'strings.mdx',
      fileName: 'strings.mdx',
      directory: '.',
      extension: 'mdx',
      path: 'strings',
    },
    headings: [
      {
        level: 1,
        text: 'About Strings',
        slug: 'about-strings',
      },
      {
        level: 2,
        text: 'Limitations',
        slug: 'limitations',
      },
      {
        level: 2,
        text: 'Conclusion',
        slug: 'conclusion',
      },
      {
        level: 2,
        text: 'References',
        slug: 'references',
      },
    ],
    mdx: 'var Component=(()=>{var g=Object.create;var s=Object.defineProperty;var u=Object.getOwnPropertyDescriptor;var p=Object.getOwnPropertyNames;var m=Object.getPrototypeOf,f=Object.prototype.hasOwnProperty;var w=(t,e)=>()=>(e||t((e={exports:{}}).exports,e),e.exports),S=(t,e)=>{for(var r in e)s(t,r,{get:e[r],enumerable:!0})},l=(t,e,r,a)=>{if(e&&typeof e=="object"||typeof e=="function")for(let i of p(e))!f.call(t,i)&&i!==r&&s(t,i,{get:()=>e[i],enumerable:!(a=u(e,i))||a.enumerable});return t};var b=(t,e,r)=>(r=t!=null?g(m(t)):{},l(e||!t||!t.__esModule?s(r,"default",{value:t,enumerable:!0}):r,t)),k=t=>l(s({},"__esModule",{value:!0}),t);var o=w((_,c)=>{c.exports=_jsx_runtime});var x={};S(x,{default:()=>h});var n=b(o());function d(t){let e={a:"a",code:"code",h1:"h1",h2:"h2",hr:"hr",li:"li",p:"p",pre:"pre",strong:"strong",ul:"ul",...t.components};return(0,n.jsxs)(n.Fragment,{children:[(0,n.jsx)(e.h1,{children:"About Strings"}),`\n`,(0,n.jsx)(e.p,{children:"In JavaScript, the textual data is stored as strings. A string is a sequence of characters, and it is one of the primitive data types in JavaScript. The internal format for strings is always UTF-16, it is not tied to the page encoding."}),`\n`,(0,n.jsx)(e.p,{children:(0,n.jsx)(e.strong,{children:"Special Character"})}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsxs)(e.li,{children:[(0,n.jsx)(e.code,{children:"\\\\n"})," - Newline"]}),`\n`,(0,n.jsxs)(e.li,{children:[(0,n.jsx)(e.code,{children:"\\\\t"})," - Tab"]}),`\n`,(0,n.jsxs)(e.li,{children:[(0,n.jsx)(e.code,{children:"\\\\r"})," - Carriage Return"]}),`\n`,(0,n.jsxs)(e.li,{children:[(0,n.jsx)(e.code,{children:"\\\\b"})," - Backspace"]}),`\n`,(0,n.jsxs)(e.li,{children:[(0,n.jsx)(e.code,{children:"\\\\f"})," - Form Feed"]}),`\n`,(0,n.jsxs)(e.li,{children:[(0,n.jsx)(e.code,{children:"\\\\\\\\"})," - Backslash"]}),`\n`,(0,n.jsxs)(e.li,{children:[(0,n.jsx)(e.code,{children:"\\\\\'"})," - Single Quote"]}),`\n`,(0,n.jsxs)(e.li,{children:[(0,n.jsx)(e.code,{children:\'\\\\"\'})," - Double Quote"]}),`\n`]}),`\n`,(0,n.jsxs)(e.p,{children:[(0,n.jsx)(e.strong,{children:"Strings are immutable in JS"}),`\nStrings can\'t be changed in JavaScript. It is impossible to change a character.\nLet\\u2019s try it to show that it doesn\\u2019t work:`]}),`\n`,(0,n.jsx)(e.pre,{language:"ts",meta:"",code:"```ts\\nlet str = \'Hi\';\\n\\nstr[0] = \'h\'; // error\\nalert(str[0]); // doesn\'t work\\n```",children:(0,n.jsx)(e.code,{className:"language-ts",children:`let str = \'Hi\';\n\nstr[0] = \'h\'; // error\nalert(str[0]); // doesn\'t work\n`})}),`\n`,(0,n.jsx)(e.p,{children:"The usual workaround is to create a whole new string and assign it to str instead of the old one."}),`\n`,(0,n.jsx)(e.p,{children:(0,n.jsx)(e.strong,{children:"Workaround"})}),`\n`,(0,n.jsx)(e.pre,{language:"ts",meta:"",code:`\\`\\`\\`ts\nlet str = \'Hi\';\nstr = \'h\' + str[1]; // create a new string "hI" and assign it to str\nalert(str); // "hI"\n\\`\\`\\``,children:(0,n.jsx)(e.code,{className:"language-ts",children:`let str = \'Hi\';\nstr = \'h\' + str[1]; // create a new string "hI" and assign it to str\nalert(str); // "hI"\n`})}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h2,{children:"Limitations"}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsx)(e.li,{children:"Not efficient for large datasets"}),`\n`,(0,n.jsx)(e.li,{children:"Not suitable for searching in sorted arrays"}),`\n`,(0,n.jsx)(e.li,{children:"Not recommended for production use"}),`\n`]}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h2,{children:"Conclusion"}),`\n`,(0,n.jsx)(e.p,{children:"Strings are a simple and easy-to-implement data structure, but it is not the most efficient for large datasets. It is best used for small datasets or when the dataset is not sorted."}),`\n`,(0,n.jsx)(e.hr,{}),`\n`,(0,n.jsx)(e.h2,{children:"References"}),`\n`,(0,n.jsxs)(e.ul,{children:[`\n`,(0,n.jsx)(e.li,{children:(0,n.jsx)(e.a,{href:"https://www.geeksforgeeks.org/strings-in-js/",children:"Strings in JS"})}),`\n`]})]})}function h(t={}){let{wrapper:e}=t.components||{};return e?(0,n.jsx)(e,{...t,children:(0,n.jsx)(d,{...t})}):d(t)}return k(x);})();\n;return Component;',
    segments: ['strings'],
  },
];
