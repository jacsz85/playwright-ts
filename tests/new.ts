function premia(lataPracy: number): number {
    if (lataPracy < 3) {
        return 0;
    } else if (lataPracy < 3.5) {
        return 50;
    } else if (lataPracy < 5.8) {
        return 75;
    } else if (lataPracy < 8) {
        return 100;
    } else {
        return 120;
    }
}

const input = prompt("Podaj lata pracy:");
const lataPracy = Number(input);

console.log("Premia:", premia(lataPracy));