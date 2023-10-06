var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import "../styles/main.css";
import { useState } from "react";
import { ControlledInput } from "./ControlledInput";
// You can use a custom interface or explicit fields or both! An alternative to the current function header might be:
// REPLInput(history: string[], setHistory: Dispatch<SetStateAction<string[]>>)
export function REPLInput(props) {
    // Remember: let React manage state in your webapp.
    // Manages the contents of the input box
    var _a = useState(""), commandString = _a[0], setCommandString = _a[1];
    // TODO WITH TA : add a count state
    var _b = useState(0), count = _b[0], setCount = _b[1];
    function handleSubmit() {
        setCount(count + 1);
        props.setCommands(props.commands.concat(commandString));
        setCommandString("");
        console.log(count); // doesn't actually display new value because it is async it updates at next render
    }
    // TODO WITH TA: build a handleSubmit function called in button onClick
    // TODO: Once it increments, try to make it push commands... Note that you can use the `...` spread syntax to copy what was there before
    // add to it with new commands.
    /**
     * We suggest breaking down this component into smaller components, think about the individual pieces
     * of the REPL and how they connect to each other...
     */
    return (_jsxs("div", __assign({ className: "repl-input" }, { children: [_jsxs("fieldset", { children: [_jsx("legend", { children: "Enter a command:" }), _jsx(ControlledInput, { value: commandString, setValue: setCommandString, ariaLabel: "Command input" })] }), _jsxs("button", __assign({ onClick: handleSubmit }, { children: ["Submitted ", count, " times"] }))] })));
}
