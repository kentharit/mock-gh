import "../styles/main.css";
import { Dispatch, SetStateAction } from "react";

/**
 * Interface to specify the props taken in by ControlledInput component.
 * Includes a value which is the command string typed into the input prompt
 *  and a setter to set its value.
 * Also ariaLabel which is a string representing the label of the input component.
 */
interface ControlledInputProps {
  value: string;
  setValue: Dispatch<SetStateAction<string>>;
  ariaLabel: string;
}

/** This is a function that sets a state containing the command string and uses an input component  */
export function ControlledInput({
  value,
  setValue,
  ariaLabel,
}: ControlledInputProps) {
  return (
    <input
      type="text"
      className="repl-command-box"
      value={value}
      placeholder="Enter command here!"
      onChange={(ev) => setValue(ev.target.value)}
      aria-label={ariaLabel}
    ></input>
  );
}
