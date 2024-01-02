const terminalOutput = document.getElementById('output');
const inputField = document.getElementById('input');
//for auto complete command
const commands = ['about', 'contact', 'help', 'clear', 'whoami', 'gui', 'themes', 'time', 'github-repo'];
let commandHistory = [];
let historyIndex = -1;

function handleInput(event) {
    if (event.key === 'Enter') {
        const userInput = inputField.value.trim().toLowerCase();
        inputField.value = '';

        if (userInput) {
            commandHistory.unshift(userInput);
            historyIndex = -1;

            switch (userInput) {
                case 'about':
                    showOutput('<div class="about">Hello, I am <b>Sakib Mahmud</b>, founder of Pathgriho Network. I am from Dhaka, Bangladesh. Currently, I am studying computer science and engineering at NU Bangladesh.</div>');
                    break;
                case 'contact':
                    showOutput('Contact me at: <br> Facebook: [Link] <br> Twitter: [Link] <br> Portfolio: [Link]');
                    break;
                case 'help':
                    showOutput('Available commands: <br> <div class="command">- about [Know about sigmakib] <br> - contact [Contact Sigmakib] <br> - help <br> - clear <br> - whoami [Who are you?] <br> - gui <br> - themes [List of theme] <br> - time <br> - github-repo [clone this proect]</div>');
                    break;
                case 'clear':
                    clearOutput();
                    break;
                case 'whoami':
                    getIPAddress();
                    break;
                case 'gui':
                    navigateToPage('/sigmakib.html');
                    break;
                case 'themes':
                    showThemes();
                    break;
                case 'time':
                    showTime();
                    break;
                case 'github-repo':
                    openGitHubRepo();
                    break;
                default:
                    if (userInput.startsWith('theme set')) {
                        setTheme(userInput.substring('theme set'.length).trim());
                    } else {
                        showOutput(`Command not recognized: ${userInput}`);
                    }
            }
        }
    } else if (event.key === 'Tab') {
        autocompleteCommand();
        event.preventDefault();
    } else if (event.key === 'ArrowUp') {
        navigateCommandHistory(1);
    } else if (event.key === 'ArrowDown') {
        navigateCommandHistory(-1);
    }
}

function showOutput(message) {
    terminalOutput.innerHTML += `<br><div>${message}</div>`;
    terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function clearOutput() {
    terminalOutput.innerHTML = '';
}

function autocompleteCommand() {
    const userInput = inputField.value.trim().toLowerCase();
    const partialCommand = userInput.split(' ')[0];

    if (partialCommand.length > 0) {
        const matchingCommands = commands.filter(command => command.startsWith(partialCommand));

        if (matchingCommands.length === 1) {
            inputField.value = matchingCommands[0];
        } else if (matchingCommands.length > 1) {
            showOutput('Matching commands: ' + matchingCommands.join(', '));
        }
    }
}

async function getIPAddress() {
    try {
        const response = await fetch('https://api.ipify.org?format=json');
        const data = await response.json();
        const ipAddress = data.ip;
        showOutput(`Your IP address is: ${ipAddress}`);
    } catch (error) {
        showOutput('Error fetching IP address');
    }
}

function navigateToPage(page) {
    window.location.href = page;
}

function navigateCommandHistory(direction) {
    if (commandHistory.length === 0) {
        return;
    }

    historyIndex += direction;

    if (historyIndex < -1) {
        historyIndex = -1;
    } else if (historyIndex >= commandHistory.length) {
        historyIndex = commandHistory.length - 1;
    }

    inputField.value = historyIndex === -1 ? '' : commandHistory[historyIndex];
}

function showThemes() {
    showOutput('Available themes: <br> - light <br> - dark <br> - ubuntu <br> - powershell');
}

function setTheme(themeName) {
    const body = document.body;

    // Remove previous themes
    body.classList.remove('theme-light', 'theme-dark', 'theme-ubuntu', 'theme-powershell');

    switch (themeName) {
        case 'light':
            body.classList.add('theme-light');
            break;
        case 'dark':
            body.classList.add('theme-dark');
            break;
        case 'ubuntu':
            body.classList.add('theme-ubuntu');
            break;
        case 'powershell':
            body.classList.add('theme-powershell');
            break;
        default:
            showOutput(`Unknown theme: ${themeName}`);
    }
}

function showTime() {
    const currentTime = new Date().toLocaleTimeString();
    showOutput(`Current time is: ${currentTime}`);
}

function openGitHubRepo() {
    window.open('https://github.com/Sigmakib2/SigmakibCmd', '_blank');
}