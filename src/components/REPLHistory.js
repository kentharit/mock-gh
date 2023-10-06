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
import { jsxs as _jsxs, jsx as _jsx } from "react/jsx-runtime";
import "../styles/main.css";
export function REPLHistory(props) {
    return (_jsx("div", __assign({ className: "repl-history" }, { children: props.commands.map(function (command, id) { return (_jsxs("p", { children: [" ", command, " "] })); }) })));
}
