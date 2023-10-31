/***
 * Copyright (C) Rodolfo Herrera Hernandez. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root
 * for full license information.
 *
 * =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
 *
 * The Moovilz Source Code.
 * 
 * For related information - https://github.com/CodeWithRodi/Moovilz/
 * 
 * :: https://moovilz.codewithrodi.com/
 * :: https://moovilz-backend.codewithrodi.com/
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
****/

const HandleCommandLineRequest = (XTerm, Command) => {
    const CommandsHandler = {
        Clear: () => XTerm.clear(),
        Echo: (...Arguments) => XTerm.writeln(Arguments.join(' ')),
        Version: () => XTerm.writeln('M&CS@1.0.0-Alpha'),
        Exit: () => SetIsCloudShellEnabled(false),
        Locale: () => XTerm.writeln(navigator.language),
        Help: () => {
            const HelpContent = [
                'Available Commands:',
                '-> \x1b[38;5;4mClear\x1b[0m: Clears the terminal.',
                '-> \x1b[38;5;4mEcho\x1b[0m: Writes the arguments to the terminal.',
                '-> \x1b[38;5;4mVersion\x1b[0m: Writes the current version of the software.',
                '-> \x1b[38;5;4mExit\x1b[0m: Closes the terminal.',
                '-> \x1b[38;5;4mLocale\x1b[0m: Writes the current locale of the browser.',
            ];
            HelpContent.forEach((Line) => XTerm.writeln(Line));
        }
    };
    const [CommandName, ...CommandArgs] = Command.split(' ');
    const CommandHandler = CommandsHandler?.[CommandName.slice(0, 1).toUpperCase() + CommandName.slice(1).toLowerCase()] || CommandsHandler?.[CommandName];
    if(!CommandHandler){
        XTerm.writeln(`${Command}: command not found.`);
        return;
    }
    return CommandHandler(...CommandArgs)
};

export const DisplayInitialCommandLineContent = (XTerm) => {
    const InitialLines = [
        '\x1b[38;5;3mM&CS@1.0.0-Alpha\x1b[0m',
        'Welcome to the \x1b[38;5;4mCloud Shell\x1b[0m, type "help" to get started.',
        'For more information about Cloud Shell or the software in general, visit:',
        '-> \x1b[38;5;4mhttps://moovilz-docs.codewithrodi.com/\x1b[0m \x1b[48;5;234m(The Official Moovilz Documentation)\x1b[0m',
        '-> \x1b[38;5;4mhttps://github.com/codewithrodi/Moovilz/\x1b[0m \x1b[48;5;234m(Source Code, MIT License)\x1b[0m',
        'Authenticating under the \x1b[38;5;3m"Guest"\x1b[0m roles, Happy Hacking!'
    ];
    InitialLines.forEach((Line) => XTerm.writeln(Line));
};

export const DisplayCommandLineInput = (XTerm) => {
    XTerm.write('\x1b[38;5;10m~Guest@CloudShell:\x1b[0m ')
};

// TODO: Use React-Redux!!! hahah 
let Buffer = '';

export const HandleXTermDataEvent = (Data, XTerm) => {
    const Code = Data.charCodeAt(0);
    if(Code === 13){
        XTerm.writeln('');
        const StatusCode = HandleCommandLineRequest(XTerm, Buffer);
        if(StatusCode === 2){
            return;
        }
        DisplayCommandLineInput(XTerm);
        Buffer = '';
    }else if(Code === 127){
        if(Buffer.length === 0){
            return;
        }
        XTerm.write('\b \b');
        Buffer = Buffer.slice(0, -1);
    }else if(Code < 32){
        return;
    }else{
        XTerm.write(Data);
        Buffer += Data;
    }
};