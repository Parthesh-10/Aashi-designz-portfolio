import { writeFileSync } from 'fs';

async function main() {
  const listRes = await fetch('http://127.0.0.1:9222/json/list');
  const tabs = await listRes.json();
  const pageTab = tabs.find(t => t.type === 'page');
  const ws = new WebSocket(pageTab.webSocketDebuggerUrl);

  let idCounter = 1;
  const pending = new Map();
  function send(method, params = {}) {
    return new Promise((resolve, reject) => {
      const id = idCounter++;
      pending.set(id, { resolve, reject });
      ws.send(JSON.stringify({ id, method, params }));
    });
  }
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.id && pending.has(data.id)) {
      const { resolve, reject } = pending.get(data.id);
      pending.delete(data.id);
      if (data.error) reject(data.error);
      else resolve(data.result);
    }
  };
  await new Promise((resolve) => ws.onopen = resolve);

  await send('Page.navigate', { url: 'http://localhost:3005/service/branddesign' });
  await new Promise((r) => setTimeout(r, 2000));

  // Step 1A: Select options
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        Array.from(document.querySelectorAll('.findyourfit-card-opt')).find(el => el.textContent.includes('Sales'))?.click();
        Array.from(document.querySelectorAll('.findyourfit-outline-pill')).find(el => el.textContent.includes('Organic'))?.click();
        Array.from(document.querySelectorAll('.findyourfit-circle-btn')).find(el => el.textContent.includes('Me'))?.click();
      })()
    `
  });
  await new Promise((r) => setTimeout(r, 300));

  // Click Next
  await send('Runtime.evaluate', {
    expression: `document.querySelector('.findyourfit-lime-btn')?.click();`
  });
  await new Promise((r) => setTimeout(r, 650));

  // Step 1B: Select options
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        Array.from(document.querySelectorAll('.findyourfit-outline-pill')).find(el => el.textContent.includes('Budget is tight'))?.click();
        Array.from(document.querySelectorAll('.findyourfit-plan-stair')).find(el => el.textContent.includes('1 Month Plan'))?.click();
      })()
    `
  });
  await new Promise((r) => setTimeout(r, 300));

  // Click Get free strategy
  await send('Runtime.evaluate', {
    expression: `document.querySelector('.findyourfit-lime-btn')?.click();`
  });
  await new Promise((r) => setTimeout(r, 650));

  // Step 2: Fill inputs & submit
  await send('Runtime.evaluate', {
    expression: `
      (() => {
        const setVal = (input, val) => {
          const setter = Object.getOwnPropertyDescriptor(window.HTMLInputElement.prototype, 'value')?.set;
          if (setter) setter.call(input, val);
          else input.value = val;
          input.dispatchEvent(new Event('input', { bubbles: true }));
          input.dispatchEvent(new Event('change', { bubbles: true }));
        };

        const nameInput = document.getElementById('fit-business-name');
        const phoneInput = document.getElementById('fit-phone');
        if (nameInput) setVal(nameInput, 'Brand Crafters');
        if (phoneInput) setVal(phoneInput, '9876543210');

        setTimeout(() => {
          document.querySelector('.findyourfit-purple-submit-btn')?.click();
        }, 300);
      })()
    `
  });
  await new Promise((r) => setTimeout(r, 1200));

  // Capture Thank You screen
  await send('Runtime.evaluate', {
    expression: `document.querySelector('.findyourfit-card')?.scrollIntoView({ behavior: 'instant', block: 'center' });`
  });
  await new Promise((r) => setTimeout(r, 300));

  const ss = await send('Page.captureScreenshot', { format: 'png' });
  writeFileSync('/Users/partheshuppal/.gemini/antigravity/brain/3df33e38-e744-4eee-a78f-e52d90fcc434/scratch/thankyou_screen.png', Buffer.from(ss.data, 'base64'));
  console.log('Saved thankyou_screen.png');
  ws.close();
}

main().catch(console.error);
