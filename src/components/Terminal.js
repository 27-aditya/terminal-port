"use client"; 
import { useEffect, useRef, useState } from "react";

const XTerminal = () => {
    const [input, setInput] = useState("");
    const [output, setOutput] = useState([]);
    const [history, setHistory] = useState([]);
    const [historyIndex, setHistoryIndex] = useState(-1);
    const userInputRef = useRef(null);

    const starWarsArt = `
         _______.___________.    ___      .______       __       _______ 
        /       |           |   /   \\     |   _  \\     |  |     |   ____|
       |   (----\`---|  |----\`  /  ^  \\    |  |_)  |    |  |     |  |__   
        \\   \\       |  |      /  /_\\  \\   |   _  <     |  |     |   __|  
    .----)   |      |  |     /  _____  \\  |  |_)  |    |  \`----.|  |____ 
    |_______/       |__|    /__/     \\__\\ |______/     |_______||_______|
    `;

    const cowsay = (message) => {
        return `
        ${"-".repeat(message.length + 4)}
        < ${message} >
        ${"-".repeat(message.length + 4)}
               \\   ^__^
                \\  (oo)\\_______
                   (__)\\       )\\
                       ||----w |
                       ||     ||
        `;
    };

    const handleInputChange = (event) => {
        setInput(event.target.value);
    };

    const handleInputSubmit = (event) => {
        if (event.key === "Enter") {
            event.preventDefault();
            if (input.trim() !== "") {
                setHistory([...history, input]);
                setHistoryIndex(-1);
            }
            processCommand(input);
            setInput("");
        } else if (event.key === "ArrowUp") {
            if (history.length > 0) {
                const newIndex = historyIndex === -1 ? history.length - 1 : Math.max(0, historyIndex - 1);
                setHistoryIndex(newIndex);
                setInput(history[newIndex]);
            }
        } else if (event.key === "ArrowDown") {
            if (historyIndex !== -1) {
                const newIndex = historyIndex < history.length - 1 ? historyIndex + 1 : -1;
                setHistoryIndex(newIndex);
                setInput(historyIndex === -1 ? "" : history[newIndex]);
            }
        }
    };

    const processCommand = (command) => {
        let response = "";
        const args = command.split(" ");

        switch (args[0]) {
            case "help":
                response = "Available commands: whoami, help, projects, about, socials, date, echo [message], rps [rock/scissors/paper], coin-toss, ascii-art, cowsay [message], vader, yoda, r2d2, clear";
                break;
            case "whoami":
                response = "A pest in my life";
                break;
            case "about":
                response = "This is a simple terminal emulator built using React & Tailwind.";
                break;
            case "projects":
                response = "1. Terminal Emulator (this one) \n2. A Twitter/X bot \n3. A Web Forums App \n4. Shell written in Rust";
                break;
            case "socials":
                response = "GitHub: github.com/27-aditya";
                break;
            case "date":
                response = new Date().toString();
                break;
            case "echo":
                response = args.slice(1).join(" ") || "Usage: echo [message]";
                break;
            case "clear":
                setOutput([]);
                return;
            case "rps":
                const choices = ["rock", "paper", "scissors"];
                const userChoice = args[1];
                const botChoice = choices[Math.floor(Math.random() * choices.length)];

                if (!choices.includes(userChoice)) {
                    response = "Usage: rps [rock/paper/scissors]";
                } else if (userChoice === botChoice) {
                    response = `I chose ${botChoice}. It's a tie!`;
                } else if (
                    (userChoice === "rock" && botChoice === "scissors") ||
                    (userChoice === "paper" && botChoice === "rock") ||
                    (userChoice === "scissors" && botChoice === "paper")
                ) {
                    response = `I chose ${botChoice}. You win!`;
                } else {
                    response = `I chose ${botChoice}. You lose!`;
                }
                break;
            case "coin-toss":
                response = Math.random() < 0.5 ? "Heads" : "Tails";
                break;
            case "ascii-art":
                response = starWarsArt;
                break;
            case "cowsay":
                const message = args.slice(1).join(" ");
                response = message ? cowsay(message) : "Usage: cowsay [message]";
                break;
            case "yoda":
                response = "Do or do not, there is no try.";
                break;
            case "vader":
                response = "I find your lack of faith disturbing.";
                break;
            case "r2d2":
                response = "Beep boop beep!";
                break;                
            default:
                response = `Command not found: ${command}`;
        }

        handleOutput(command, response);
    };

    const handleOutput = (command, response) => {
        let res = `aditya@null:~$ ${command}`;
        setOutput([...output, res, response]);
    };

    return (
        <>
            <div className="terminal-output overflow-y-auto px-2">
                {output.map((line, index) => (
                    <pre key={index} className="text-black text-lg font-mono whitespace-pre-wrap">{line}</pre>
                ))}
            </div>
            <div className="flex items-center space-x-2 px-2">
                <span className="block text-black text-lg font-mono">aditya@null:~$</span>
                <input
                    ref={userInputRef}
                    type="text"
                    value={input}
                    onChange={handleInputChange}
                    onKeyDown={handleInputSubmit}
                    className="font-mono text-lg bg-transparent border-none text-black focus:ring-0 outline-none w-full"
                    autoFocus
                />
            </div>
        </>
    );
};

export default XTerminal;
