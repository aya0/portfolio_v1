## Overview

This is a dependency-free static website built with semantic HTML, modern CSS, and vanilla JavaScript. It can be opened locally in a browser or deployed to any static hosting provider.

### Highlights

- Terminal-style hero section with an interactive command prompt
- Command history using the `↑` and `↓` arrow keys
- Quick navigation between education, projects, skills, and contact sections
- Responsive layout for desktop and mobile screens
- Reduced-motion support for users who prefer less animation
- Accessible labels, live terminal output, semantic sections, and keyboard-friendly controls
- Direct links to GitHub, LinkedIn, and email

## Tech Stack

- **HTML5** — page structure and semantic content
- **CSS3** — responsive layout, terminal-inspired visual system, and animations
- **Vanilla JavaScript** — terminal commands, command history, output rendering, and smooth scrolling
- **Google Fonts** — Inter, JetBrains Mono, and Space Grotesk

## Project Structure

```text
portfolio/
├── main.html     # Portfolio page markup and content
├── styles.css    # Theme, layout, responsive rules, and component styles
├── script.js     # Interactive terminal behavior
└── README.md     # Project documentation
```

## Interactive Terminal

The terminal accepts the following commands:

| Command | Action |
| --- | --- |
| `help` | Display the available commands |
| `whoami` | Show Aya's profile |
| `education` | Scroll to the academic record |
| `projects` | Scroll to featured projects |
| `skills` | Scroll to the technical skills matrix |
| `contact` | Scroll to contact details |
| `ls` | List the portfolio sections |
| `clear` | Clear terminal output |

Commands are case-insensitive. Unknown commands return an explanatory error message.

## License

This repository represents a personal portfolio. Contact the author before reusing personal content, project descriptions, branding, or profile information.
