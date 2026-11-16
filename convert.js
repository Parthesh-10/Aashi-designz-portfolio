const fs = require('fs');
const path = require('path');

const srcDir = path.join(__dirname, '../portfolio-ayushi/views');
const destDir = path.join(__dirname, 'src/app');

function convertToJSX(html) {
  let jsx = html;
  
  // Remove includes
  jsx = jsx.replace(/<%- include\('.*?'\);? -%>/g, '');
  
  // Replace class= with className=
  jsx = jsx.replace(/class="/g, 'className="');
  jsx = jsx.replace(/for="/g, 'htmlFor="');
  
  // Make imgs self-closing
  jsx = jsx.replace(/<img(.*?)>/g, (match, p1) => {
    if (p1.endsWith('/')) return match;
    return `<img${p1} />`;
  });

  // Make brs self-closing
  jsx = jsx.replace(/<br>/g, '<br />');
  
  // Handle some specific inline styles if any
  jsx = jsx.replace(/style="([^"]+)"/g, (match, p1) => {
    return `style={{}}`; // Manual fix needed if any remain, but we know most are ok
  });

  return jsx.trim();
}

const pages = [
  { file: 'about.ejs', dest: 'about/page.js', name: 'About' },
  { file: 'branddesign.ejs', dest: 'service/branddesign/page.js', name: 'BrandDesign' },
  { file: 'contact.ejs', dest: 'contact/page.js', name: 'Contact' },
  { file: 'designstrategy.ejs', dest: 'service/designstrategy/page.js', name: 'DesignStrategy' },
  { file: 'graphicdesign.ejs', dest: 'service/graphicdesign/page.js', name: 'GraphicDesign' },
  { file: 'page404.ejs', dest: 'not-found.js', name: 'NotFound' },
  { file: 'privacypolicy.ejs', dest: 'privacypolicy/page.js', name: 'PrivacyPolicy' },
  { file: 'synctrip.ejs', dest: 'casestudy/synctrip/page.js', name: 'SyncTrip' },
  { file: 'uiuxdesign.ejs', dest: 'service/uiuxdesign/page.js', name: 'UiUxDesign' },
  { file: 'videoediting.ejs', dest: 'service/videoediting/page.js', name: 'VideoEditing' }
];

pages.forEach(p => {
  const content = fs.readFileSync(path.join(srcDir, p.file), 'utf8');
  let jsxContent = convertToJSX(content);
  
  const destPath = path.join(destDir, p.dest);
  fs.mkdirSync(path.dirname(destPath), { recursive: true });
  
  const output = `import Link from 'next/link';\n\nexport default function ${p.name}() {\n  return (\n    <>\n      ${jsxContent}\n    </>\n  );\n}\n`;
  
  fs.writeFileSync(destPath, output);
  console.log(`Converted ${p.file} to ${p.dest}`);
});
