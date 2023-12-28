// ANSI escape codes for colors
const color = {
    reset: "\x1b[0m",
    black: "\x1b[30m",
    red: "\x1b[31m",
    green: "\x1b[32m",
    yellow: "\x1b[33m",
    blue: "\x1b[34m",
    magenta: "\x1b[35m",
    cyan: "\x1b[36m",
    white: "\x1b[37m",
    brightBlack: "\x1b[90m",
    brightRed: "\x1b[91m",
    brightGreen: "\x1b[92m",
    brightYellow: "\x1b[93m",
    brightBlue: "\x1b[94m",
    brightMagenta: "\x1b[95m",
    brightCyan: "\x1b[96m",
    brightWhite: "\x1b[97m",
    reset: "\x1b[0m",
    bold: "\x1b[1m",
}
// console.log(color.black + 'Black text' + color.reset);
// console.log(color.brightBlack + 'Bright black text' + color.reset);
// console.log(color.red + 'Red text' + color.reset);
// console.log(color.green + 'Green text' + color.reset);
// console.log(color.yellow + 'Yellow text' + color.reset);
// console.log(color.blue + 'Blue text' + color.reset);
// console.log(color.magenta + 'Magenta text' + color.reset);
// console.log(color.cyan + 'Cyan text' + color.reset);
// console.log(color.white + 'White text' + color.reset);
// console.log(color.brightBlack + 'Bright black text' + color.reset);
// console.log(color.brightRed + 'Bright red text' + color.reset);
// console.log(color.brightGreen + 'Bright green text' + color.reset);
// console.log(color.brightYellow + 'Bright yellow text' + color.reset);
// console.log(color.brightBlue + 'Bright blue text' + color.reset);
// console.log(color.brightMagenta + 'Bright magenta text' + color.reset);
// console.log(color.brightCyan + 'Bright cyan text' + color.reset);
// console.log(color.brightWhite + 'Bright white text' + color.reset);
// console.log(`[${now.toISOString()}] Request: ${req.method} ${req.url} from ${req.headers.origin}`);
module.exports.logger = {
    reqLog: (req, res, next) => {
        const now = new Date();
        console.log(`${color.black}[${now.toLocaleString()}]${color.yellow} ${req.method}${color.cyan} ${req.url} ${color.reset}`)
        next()
    },
    info: (message) => timeLog(color.blue, message),
    error: (message) => timeLog(color.brightRed, message),
    warn: (message) => timeLog(color.yellow, message),
    debug: (...message) => timeLog(color.brightWhite, message, true),
}

const timeLog = (colorx, context, debug = false) => console.log(`${color.black}[${new Date().toLocaleString()}]${debug ? color.magenta + color.bold + 'debug ==========> ' + color.reset : ""}${colorx}`, context, `${debug ? color.magenta + color.bold + '<========== debug' : ""}${color.reset} `)