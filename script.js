const terminalForm = document.querySelector("#terminal-form");
const terminalInput = document.querySelector("#terminal-input");
const terminalOutput = document.querySelector("#terminal-output");
const commandButtons = document.querySelectorAll("[data-command]");
const commandHistory = [];
let historyIndex = 0;

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
