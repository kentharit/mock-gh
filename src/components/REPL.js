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
import { useState } from "react";
import "../styles/main.css";
import { REPLHistory } from "./REPLHistory";
import { REPLInput } from "./REPLInput";
/*
  You'll want to expand this component (and others) for the sprints! Remember
  that you can pass "props" as function arguments. If you need to handle state
  at a higher level, just move up the hooks and pass the state/setter as a prop.
  
  This is a great top level component for the REPL. It's a good idea to have organize all components in a component folder.
  You don't need to do that for this gearup.
*/
export default function REPL() {
    // TODO: Add some kind of shared state that holds all the commands submitted.
    var _a = useState([]), commandList = _a[0], setCommandList = _a[1];
    return (_jsxs("div", __assign({ className: "repl" }, { children: [_jsx(REPLHistory, { commands: commandList }), _jsx("hr", {}), _jsx(REPLInput, { commands: commandList, setCommands: setCommandList })] })));
}
