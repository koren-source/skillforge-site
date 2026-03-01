const terminal = document.getElementById("terminal-output");

const demoLines = [
  { text: "skillforge scan x/@alexhormozi --intent build a sales funnel", type: "command" },
  { text: "Scanning @AlexHormozi found 847 videos", type: "output" },
  { text: "Scoring relevance against intent...", type: "output" },
  { text: "Top 6 videos selected:", type: "output" },
  { text: "- The $100M Sales System 98% match", type: "output" },
  { text: "- How to Close Anyone 94% match", type: "output" },
  { text: "- My Entire Funnel Explained 91% match", type: "output" },
  { text: "- Objection Handling Masterclass 87% match", type: "output" },
  { text: "- Cold Outreach at Scale 83% match", type: "output" },
  { text: "- Lead Qualification Framework 79% match", type: "output" },
  { text: "Proposed skills:", type: "output" },
  { text: "A) Sales funnel and closing framework", type: "output" },
  { text: "B) Cold outreach system", type: "output" },
  { text: "C) Lead qualification playbook", type: "output" },
  { text: "Run: skillforge build --proposal abc123 --skills A,B", type: "output" }
];

const delays = {
  character: 24,
  line: 440,
  loop: 1800
};

const sleep = (ms) => new Promise((resolve) => window.setTimeout(resolve, ms));

function render(text) {
  terminal.innerHTML = `${text}<span class="cursor" aria-hidden="true"></span>`;
}

async function typeLine(currentText, line) {
  const prefix = line.type === "command" ? "$ " : "";
  for (const char of `${prefix}${line.text}`) {
    currentText += char;
    render(currentText);
    await sleep(delays.character);
  }

  currentText += "\n";
  render(currentText);
  await sleep(delays.line);
  terminal.scrollTop = terminal.scrollHeight;
  return currentText;
}

async function runDemo() {
  while (true) {
    let currentText = "";
    render(currentText);

    for (const line of demoLines) {
      currentText = await typeLine(currentText, line);
    }

    await sleep(delays.loop);

    for (let i = currentText.length; i >= 0; i -= 3) {
      render(currentText.slice(0, i));
      await sleep(10);
    }

    await sleep(300);
  }
}

runDemo();
