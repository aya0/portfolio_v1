const terminalForm = document.querySelector("#terminal-form");
const terminalInput = document.querySelector("#terminal-input");
const terminalOutput = document.querySelector("#terminal-output");
const commandButtons = document.querySelectorAll("[data-command]");
const projectCards = document.querySelectorAll("[data-repository]");
const skillsGrid = document.querySelector(".skills-grid");
const skillsSection = document.querySelector("#skills");
const commandHistory = [];
let historyIndex = 0;
const pointerReactive = document.querySelectorAll(".pointer-reactive");
const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
let pointerFrame;
let pointerX = window.innerWidth / 2;
let pointerY = window.innerHeight / 2;

const commands = {
  help: {
    output: "Available commands:\n  help        Show this command list\n  whoami      Print Aya's profile\n  education   Jump to academic record\n  projects    Jump to featured projects\n  skills      Jump to the skills matrix\n  contact     Open contact details\n  clear       Clear terminal output\n  ls          List portfolio sections",
  },
  whoami: {
    output: "Aya Abd Al-Karem — Computer Science student and AI Engineer / Full-Stack Developer.",
  },
  ls: {
    output: "education/  projects/  skills/  contact/  bio.json",
  },
  education: { target: "education", output: "Opening academic_record..." },
  projects: { target: "projects", output: "Opening featured production projects..." },
  skills: { target: "skills", output: "Loading technical skills matrix..." },
  contact: { target: "contact", output: "Opening terminal contact dispatch..." },
};

if (skillsGrid && skillsSection) {
  if (reducedMotion.matches) {
    skillsGrid.classList.add("is-visible");
  } else {
    const skillsObserver = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      skillsGrid.classList.add("is-visible");
      skillsObserver.disconnect();
    }, { threshold: 0.1, rootMargin: "0px 0px -10% 0px" });
    skillsObserver.observe(skillsSection);
  }
}

function updatePointerMotion() {
  pointerFrame = undefined;
  document.documentElement.style.setProperty("--pointer-x", `${pointerX}px`);
  document.documentElement.style.setProperty("--pointer-y", `${pointerY}px`);

  const offsetX = pointerX - window.innerWidth / 2;
  const offsetY = pointerY - window.innerHeight / 2;
  document.documentElement.style.setProperty("--parallax-x", `${offsetX * 0.018}px`);
  document.documentElement.style.setProperty("--parallax-y", `${offsetY * 0.018}px`);
  pointerReactive.forEach((element) => {
    const depth = Number(element.dataset.parallaxDepth) || 0;
    element.style.transform = `translate3d(${offsetX * depth}px, ${offsetY * depth}px, 0)`;
  });
}

if (!reducedMotion.matches) {
  const handlePointerMove = (event) => {
    pointerX = event.clientX;
    pointerY = event.clientY;
    if (!pointerFrame) pointerFrame = window.requestAnimationFrame(updatePointerMotion);
  };

  window.addEventListener("mousemove", handlePointerMove, { passive: true });
  window.addEventListener("pointermove", handlePointerMove, { passive: true });
  window.addEventListener("mouseleave", () => {
    pointerX = window.innerWidth / 2;
    pointerY = window.innerHeight / 2;
    if (!pointerFrame) pointerFrame = window.requestAnimationFrame(updatePointerMotion);
  });
}

function addOutput(command, message, isError = false) {
  const entry = document.createElement("div");
  entry.className = `terminal-entry${isError ? " terminal-error" : ""}`;

  const commandLine = document.createElement("div");
  commandLine.className = "command";
  commandLine.innerHTML = '<span class="prompt">aya@portfolio:~$</span>';
  const commandText = document.createElement("span");
  commandText.textContent = command;
  commandLine.append(commandText);

  const response = document.createElement("pre");
  response.className = "terminal-response";
  response.textContent = message;
  entry.append(commandLine, response);
  terminalOutput.append(entry);
  terminalOutput.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function runCommand(rawCommand) {
  const command = rawCommand.trim().toLowerCase();
  if (!command) return;

  commandHistory.push(rawCommand.trim());
  historyIndex = commandHistory.length;

  if (command === "clear") {
    terminalOutput.replaceChildren();
    return;
  }

  const selectedCommand = commands[command];
  if (!selectedCommand) {
    addOutput(rawCommand.trim(), `command not found: ${command}\nType "help" to see the available portfolio commands.`, true);
    return;
  }

  addOutput(rawCommand.trim(), selectedCommand.output);
  if (selectedCommand.target) {
    window.setTimeout(() => {
      document.querySelector(`#${selectedCommand.target}`).scrollIntoView({ behavior: "smooth" });
    }, 150);
  }
}

terminalForm.addEventListener("submit", (event) => {
  event.preventDefault();
  runCommand(terminalInput.value);
  terminalInput.value = "";
});

terminalInput.addEventListener("keydown", (event) => {
  if (event.key !== "ArrowUp" && event.key !== "ArrowDown") return;
  event.preventDefault();
  if (event.key === "ArrowUp" && historyIndex > 0) historyIndex -= 1;
  if (event.key === "ArrowDown" && historyIndex < commandHistory.length) historyIndex += 1;
  terminalInput.value = commandHistory[historyIndex] || "";
});

commandButtons.forEach((button) => {
  button.addEventListener("click", () => {
    terminalInput.value = button.dataset.command;
    terminalForm.requestSubmit();
    terminalInput.focus();
  });
});

projectCards.forEach((card) => {
  const openRepository = () => {
    window.open(card.dataset.repository, "_blank", "noopener,noreferrer");
  };

  card.addEventListener("click", (event) => {
    if (event.target.closest("a")) return;
    openRepository();
  });

  card.addEventListener("keydown", (event) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openRepository();
  });
});
