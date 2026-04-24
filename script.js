// Theme Management
function toggleTheme() {
  const body = document.body;
  const icon = document.getElementById("themeIcon");
  if (body.getAttribute("data-theme") === "light") {
    body.setAttribute("data-theme", "dark");
    icon.innerHTML =
      '<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zM2 13h2c.55 0 1-.45 1-1s-.45-1-1-1H2c-.55 0-1 .45-1 1s.45 1 1 1zm18 0h2c.55 0 1-.45 1-1s-.45-1-1-1h-2c-.55 0-1 .45-1 1s.45 1 1 1zM11 2v2c0 .55.45 1 1 1s1-.45 1-1V2c0-.55-.45-1-1-1s-1 .45-1 1zm0 18v2c0 .55.45 1 1 1s1-.45 1-1v-2c0-.55-.45-1-1-1s-1 .45-1 1zM5.99 4.58c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41L5.99 4.58zm12.37 12.37c-.39-.39-1.03-.39-1.41 0s-.39 1.03 0 1.41l1.06 1.06c.39.39 1.03.39 1.41 0s.39-1.03 0-1.41l-1.06-1.06zm1.06-12.37c-.39-.39-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41s1.03.39 1.41 0l1.06-1.06c.39-.38.39-1.02 0-1.41zM5.99 19.42c.39.39 1.03.39 1.41 0l1.06-1.06c.39-.39.39-1.03 0-1.41s-1.03-.39-1.41 0l-1.06 1.06c-.39.39-.39 1.03 0 1.41z"/>';
  } else {
    body.setAttribute("data-theme", "light");
    icon.innerHTML =
      '<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9c0-.46-.04-.92-.1-1.36-.98 1.37-2.58 2.26-4.4 2.26-2.98 0-5.4-2.42-5.4-5.4 0-1.81.89-3.42 2.26-4.4-.44-.06-.9-.1-1.36-.1z"/>';
  }
}

// Splash Screen
window.addEventListener("load", () => {
  setTimeout(() => {
    document.getElementById("splash").classList.add("fade-out");
  }, 1500);
});

// Original Logic Preserved
const suggests = [
  "#818cf8",
  "#10b981",
  "#f59e0b",
  "#ef4444",
  "#8b5cf6",
  "#ec4899",
  "#0ea5e9",
  "#64748b",
  "#A9D0F5",
  "#A9F5D0",
  "#D0A9F5",
  "#F5D0A9",
  "#F5B86F",
  "#A9F5A9",
  "#F5A9D0",
  "#D8D8D8",
  "#E1F5FE",
  "#E8F5E9",
  "#F3E5F5",
  "#FFF3E0",
  "#FFEBEE",
  "#F1F8E9",
  "#E0F7FA",
  "#EFEBE9",
];

let currentSelection = "#818cf8";
let canvasSelection = "#ffffff";

function initPalette() {
  const grid = document.getElementById("suggestPalette");
  suggests.forEach((color) => {
    const div = document.createElement("div");
    div.className = "swatch";
    div.style.background = color;
    div.onclick = () => applyColor(color, "suggest", div);
    grid.appendChild(div);
  });
}

function applyColor(color, type, element = null) {
  currentSelection = color;
  document.getElementById("hexCode").innerText = color.toUpperCase();
  document
    .querySelectorAll(".swatch")
    .forEach((s) => s.classList.remove("active"));
  if (type === "suggest" && element) {
    element.classList.add("active");
    document.getElementById("manualPicker").value = color;
  }
  document
    .querySelectorAll(".t-header")
    .forEach((th) => (th.style.backgroundColor = color));
  // Brightness check for text color
  const r = parseInt(color.slice(1, 3), 16);
  const g = parseInt(color.slice(3, 5), 16);
  const b = parseInt(color.slice(5, 7), 16);
  const brightness = (r * 299 + g * 587 + b * 114) / 1000;
  document
    .querySelectorAll(".t-header")
    .forEach((th) => (th.style.color = brightness > 155 ? "#000" : "#fff"));
}

function applyCanvasColor(color) {
  canvasSelection = color;
  document.getElementById("canvasHexCode").innerText = color.toUpperCase();
  document.documentElement.style.setProperty("--canvas-bg", color);

  const table = document.getElementById("targetTable");
  if (table) {
    const isNotWhite = color.toLowerCase() !== "#ffffff";
    table.style.color = isNotWhite ? "#ffffff" : "#1e293b";

    const emptyState = table.querySelector(".empty-state");
    if (emptyState) {
      emptyState.style.color = isNotWhite ? "#cbd5e1" : "#64748b";
    }
  }
}

function applyFontSettings() {
  const headerFont = document.getElementById("headerFont").value;
  const bodyFont = document.getElementById("bodyFont").value;
  const headerSize = document.getElementById("headerSize").value + "px";
  const bodySize = document.getElementById("bodySize").value + "px";

  document.querySelectorAll("#targetTable th").forEach((th) => {
    th.style.fontFamily = headerFont;
    th.style.fontSize = headerSize;
  });

  document.querySelectorAll("#targetTable td").forEach((td) => {
    td.style.fontFamily = bodyFont;
    td.style.fontSize = bodySize;
  });

  document.getElementById("previewHeader").style.fontFamily = headerFont;
  document.getElementById("previewHeader").style.fontSize = headerSize;
  document.getElementById("previewBody").style.fontFamily = bodyFont;
  document.getElementById("previewBody").style.fontSize = bodySize;
}

function parseSQL() {
  const input = document.getElementById("sqlInput").value.trim();
  const tbody = document.getElementById("tableBody");
  if (!input) return;

  const start = input.indexOf("(");
  const end = input.lastIndexOf(")");
  if (start === -1 || end === -1)
    return alert("Invalid SQL format. Please check your CREATE TABLE syntax.");

  tbody.innerHTML = "";
  const content = input.substring(start + 1, end);
  const lines = content.split(/,(?![^(]*\))/);

  const fks = {};
  const pks = new Set();

  const fkRegex =
    /FOREIGN KEY\s*\(\s*(?:`|")?(\w+)(?:`|")?\s*\)\s*REFERENCES\s*(?:`|")?(\w+)(?:`|")?\s*\(\s*(?:`|")?(\w+)(?:`|")?\s*\)/gi;
  let fkMatch;
  while ((fkMatch = fkRegex.exec(input)) !== null) {
    fks[fkMatch[1].trim()] = `FK (${fkMatch[2].trim()}.${fkMatch[3].trim()})`;
  }

  const pkGlobal = input.match(/PRIMARY KEY\s*\(\s*(.*?)\s*\)/i);
  if (pkGlobal)
    pkGlobal[1]
      .split(",")
      .forEach((k) => pks.add(k.trim().replace(/[`"']/g, "")));

  lines.forEach((line) => {
    let l = line.trim();
    if (
      !l ||
      /^(CONSTRAINT|PRIMARY KEY|UNIQUE KEY|KEY|CHECK|ENGINE|CHARSET)/i.test(l)
    )
      return;

    const m = l.match(/^(?:`|")?(\w+)(?:`|")?\s+(\w+)(?:\s*\((\d+)\))?(.*)/i);
    if (m) {
      const name = m[1],
        type = m[2],
        size = m[3] || "",
        rest = m[4] || "";
      let tags = [];

      if (pks.has(name) || /PRIMARY KEY/i.test(rest)) tags.push("PK");
      if (fks[name]) tags.push(fks[name]);
      if (/NOT NULL/i.test(rest)) {
        tags.push("NOT NULL");
      } else if (/PRIMARY KEY/i.test(rest) || fks[name]) {
        tags.push();
      } else {
        tags.push("NULL");
      }
      if (/AUTO_INCREMENT/i.test(rest)) tags.push("AI");

      const tr = document.createElement("tr");
      tr.innerHTML = `<td>${name}</td><td>${type}</td><td>${size}</td><td>${tags.join(", ")}</td>`;
      tbody.appendChild(tr);
    }
  });

  applyColor(currentSelection, "manual");
  applyFontSettings();
}

function exportToPNG() {
  const container = document.getElementById("tableContainer");
  html2canvas(container, {
    scale: 3,
    backgroundColor: canvasSelection, // Use chosen Canvas Background
  }).then((canvas) => {
    const a = document.createElement("a");
    a.download = "sql_morph_schema.png";
    a.href = canvas.toDataURL();
    a.click();
  });
}

initPalette();
applyColor(currentSelection, "manual");
applyCanvasColor(canvasSelection);
applyFontSettings();

// --- Adblock Detection Logic ---
const outbrainErrorCheck = async () => {
  try {
    const resp = await fetch("https://widgets.outbrain.com/outbrain.js");
    const text = await resp.text();
    return false;
  } catch (e) {
    return true;
  }
};
const adligatureErrorCheck = async () => {
  try {
    const resp = await fetch("https://adligature.com/", { mode: "no-cors" });
    const text = await resp.text();
    return false;
  } catch (e) {
    return true;
  }
};
const quantserveErrorCheck = async () => {
  try {
    const resp = await fetch("https://secure.quantserve.com/quant.js", {
      mode: "no-cors",
    });
    const text = await resp.text();
    return false;
  } catch (e) {
    return true;
  }
};
const adligatureCssErrorCheck = async () => {
  try {
    const resp = await fetch(
      "https://cdn.adligature.com/work.ink/prod/rules.css",
      { mode: "no-cors" },
    );
    const text = await resp.text();
    return false;
  } catch (e) {
    return true;
  }
};
const srvtrackErrorCheck = async () => {
  try {
    const resp = await fetch("https://srvtrck.com/assets/css/LineIcons.css", {
      mode: "no-cors",
    });
    const text = await resp.text();
    return false;
  } catch (e) {
    return true;
  }
};
const yieldkitCheck = async () => {
  try {
    const resp = await fetch(
      "https://js.srvtrck.com/v1/js?api_key=40710abb89ad9e06874a667b2bc7dee7&site_id=1f10f78243674fcdba586e526cb8ef08",
      { mode: "no-cors" },
    );
    const text = await resp.text();
    return false;
  } catch (e) {
    return true;
  }
};
const setIntervalCheck = () => {
  return new Promise((resolve) => {
    const timeout = setTimeout(() => {
      resolve(true);
    }, 2000);
    const interval = setInterval(() => {
      const a0b = "a0b";
      if (a0b == "a0b") {
        clearInterval(interval);
        clearTimeout(timeout);
        resolve(false);
      }
    }, 100);
  });
};
const detectedAdblock = async () => {
  const resp = await Promise.all([
    outbrainErrorCheck(),
    adligatureErrorCheck(),
    quantserveErrorCheck(),
    adligatureCssErrorCheck(),
    srvtrackErrorCheck(),
    setIntervalCheck(),
    yieldkitCheck(),
  ]);
  const isNotUsingAdblocker = resp.every((r) => r == false);
  return !isNotUsingAdblocker;
};

// Check after page load, and display unclosable popup
window.addEventListener("load", () => {
  setTimeout(() => {
    detectedAdblock().then((result) => {
      if (result) {
        document.getElementById("adblockModal").classList.add("active");
        document.body.style.overflow = "hidden"; // Prevent scrolling
      }
    });
  }, 2000);
});
