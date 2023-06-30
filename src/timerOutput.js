export function timerOutput(secs) {
    let mins = Math.floor(secs / 60);
    let displayedSecs = secs > 59 ? `${secs - 60}` : secs;
    let outputSecs = displayedSecs < 10 ? `0${displayedSecs}` : displayedSecs
    let displayedMins = mins > 59 ? `${mins - 60}` : mins
    let outputMins = displayedMins < 10 ? `0${displayedMins}` : displayedMins

    return `${outputMins}m ${outputSecs}s`;
}