const ConsoleEffevts = {
    Reset: "\x1b[0m",
    Dim: "\x1b[2m",
    Blink: "\x1b[5m",
}
export const dim = (s: string) => ConsoleEffevts.Dim + s + ConsoleEffevts.Reset;
export const blink = (s: string) => ConsoleEffevts.Blink + s + ConsoleEffevts.Reset;