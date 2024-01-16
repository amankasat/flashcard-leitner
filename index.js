const readline = require('readline');
// Create a readline interface.
const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

// Initialize Leitner boxes
// 3 box for now
const leitnerBoxes = [[], [], []];

function displayMenu() {
    // Clear the console
    console.clear();
    // Display menu options
    console.log('Leitner Flashcard System');
    console.log('1. Add Flashcard');
    console.log('2. Review Flashcards');
    console.log('3. Exit');
}

function addFlashcard() {
    rl.question('Enter the question: ', (question) => {
        rl.question('Enter the answer: ', (answer) => {
            leitnerBoxes[0].push({ question, answer });
            console.log('Flashcard added to Box 1');
            displayMenu();
            askForChoice();
        });
    });
}

function reviewFlashcards() {
    if (leitnerBoxes[0].length === 0 && leitnerBoxes[1].length === 0 && leitnerBoxes[2].length === 0) {
        console.log('No flashcards to review.');
        displayMenu();
        askForChoice();
    } else {
        const currentBox = leitnerBoxes.find(box => box.length > 0);
        // Get the first flashcard in the current box
        const flashcard = currentBox.shift();
        console.log('Question:', flashcard.question);
        rl.question('Press Enter to reveal the answer...', () => {
            console.log('Answer:', flashcard.answer);
            rl.question('Did you answer correctly? (y/n): ', (response) => {
                if (response.toLowerCase() === 'y') {
                    if (leitnerBoxes.indexOf(currentBox) < leitnerBoxes.length - 1) {
                        leitnerBoxes[leitnerBoxes.indexOf(currentBox) + 1].push(flashcard);
                        console.log('Flashcard moved to the next box.');
                    } else {
                        console.log('Flashcard mastered!');
                    }
                } else {
                    leitnerBoxes[0].push(flashcard);
                    console.log('Flashcard moved back to Box 1.');
                }
                displayMenu();
                askForChoice();
            });
        });
    }
}

function askForChoice() {
    rl.question('Enter your choice: ', (choice) => {
        switch (choice) {
            case '1':
                addFlashcard();
                break;
            case '2':
                reviewFlashcards();
                break;
            case '3':
                rl.close();
                break;
            default:
                console.log('Invalid choice. Please try again.');
                displayMenu();
                askForChoice();
                break;
        }
    });
}

displayMenu();
askForChoice();
