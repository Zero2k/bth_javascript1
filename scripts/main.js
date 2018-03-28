window.onload = function() {
    const title = document.getElementById('title');
    const myContainer = document.getElementById('container');
    const points = [0, 0, 0, 0, 0];

    const part = {
        html: '',
        init: function(html) {
            this.html = html;
        },
        draw: function(element, event) {
            if (element === undefined) {
                element = event.target;
            }
            element.innerHTML = this.html;
        },
    };

    /* Introduction part of the test */
    const intro = function() {
        title.innerHTML = 'Intelligence - IQ-testet';

        function buildPart() {
            const introObj = Object.create(part);
            introObj.init(`
                <div class="quiz-container">
                <h2>Introduktion</h2>
                <p>I det här IQ-testet kommer du att utföra fem deltester som på olika sätt mäter din intelligens.</p>
                <p>Du får poäng för varje rätt svar och noll poäng när du svarar fel.<br>
                I slutet läggs dina poäng ihop och vi beräknar din intelligens.</p>
                </div>
                <button id="next">Starta första testet</button>
            `);
            introObj.draw(myContainer);
        }

        /* Create the HTML and render it */
        buildPart();

        const nextButton = document.getElementById('next');
        nextButton.onclick = function() {
            Test.partOfTest(1);
        };
    };

    /* First part of the test */
    const game1 = function() {
        title.innerHTML = 'Frågesport';

        function buildPart() {
            const quizz = Object.create(part);
            quizz.init(`
                <div class="quiz-container">
                <div id="quiz"></div>
                </div>
                <button id="next">Nästa fråga</button>
                <button id="submit">Avsluta första testet</button>
                <div id="results"></div>
            `);
            quizz.draw(myContainer);
        }

        const myQuestions = [
            {
                question: 'Ett exempel på en bank som skaffar kapital åt företag är?',
                answers: {
                    a: 'En investmentbank',
                    b: 'En kommersiell bank',
                    c: 'En online bank',
                },
                correctAnswer: 'a',
            },
            {
                question: 'Vilket av följande är inte ett mobilt operativsystem?',
                answers: {
                    a: 'Android',
                    b: 'iOS',
                    c: 'macOS',
                },
                correctAnswer: 'c',
            },
            {
                question: 'Vilket är namnet på det forskningsrapport som bidrog till att Bitcoin skapades?',
                answers: {
                    a: 'Bitcoin: a decentralised electronic cash system',
                    b: 'Bitcoin: a peer to peer electronic cash system',
                    c: 'Bitcoin: a peer to peer digital cash system',
                    d: 'Bitcoin: a peer to peer digital money system',
                },
                correctAnswer: 'b',
            },
            {
                question: 'Vad står P2P för?',
                answers: {
                    a: 'Password to Password',
                    b: 'Product to Product',
                    c: 'Peer to Peer',
                    d: 'Private Key to Public Key',
                },
                correctAnswer: 'c',
            },
            {
                question: 'Warren Buffett är ägare till vilket företag?',
                answers: {
                    a: 'AIG',
                    b: 'Geico',
                    c: 'AllState',
                    d: 'Progressive',
                },
                correctAnswer: 'a',
            },
        ];

        function buildQuiz() {
            /* we'll need a place to store the HTML output */
            const output = [];

            myQuestions.forEach((currentQuestion, questionNumber) => {
                /* we'll want to store the list of answer choices */
                const answers = [];

                /* and for each available answer... */
                for (let letter in currentQuestion.answers) {
                    answers.push(
                        `<label>
                            <input type="radio" name="question${questionNumber}" value="${letter}">
                            ${letter} :
                            ${currentQuestion.answers[letter]}
                        </label>`
                    );
                }

                /* add this question and its answers to the output */
                output.push(`<div class="slide">
                        <div class="question"> ${currentQuestion.question} </div>
                        <div class="answers"> ${answers.join('')} </div>
                    </div>`);
            });

            /* finally combine our output list into one string of HTML and put it on the page */
            quizContainer.innerHTML = output.join('');
        }

        function showResults() {
            /* gather answer containers from our quiz */
            const answerContainers = quizContainer.querySelectorAll('.answers');

            /* keep track of user's answers */
            let numCorrect = 0;

            myQuestions.forEach((currentQuestion, questionNumber) => {
                const answerContainer = answerContainers[questionNumber];
                const selector = `input[name=question${questionNumber}]:checked`;
                const userAnswer = (answerContainer.querySelector(selector) || {}).value;

                /* if answer is correct */
                if (userAnswer === currentQuestion.correctAnswer) {
                    /* add to the number of correct answers */
                    numCorrect++;

                    /* make the answers green */
                    answerContainers[questionNumber].style.color = "lightgreen";
                } else {
                    /* if answer is wrong make the answers red */
                    answerContainers[questionNumber].style.color = "red";
                }
            });

            /* calculate points */
            points[0] += numCorrect * 4;
            /* show number of correct answers out of total */
            resultsContainer.innerHTML = `${numCorrect} rätt av ${
                myQuestions.length
            }`;
            /* change to next test after 3 seconds */
            setTimeout(function() { Test.partOfTest(2); }, 3000);
        }

        /**
         * 
         * @param {Int} nr - Number of the current slide
         */
        function showSlide(nr) {
            slides[currentSlide].classList.remove('active-slide');
            slides[nr].classList.add('active-slide');
            currentSlide = nr;

            if (currentSlide === slides.length - 1) {
                nextButton.style.display = 'none';
                submitButton.style.display = 'inline-block';
            } else {
                nextButton.style.display = 'inline-block';
                submitButton.style.display = 'none';
            }
        }

        function showNextSlide() {
            showSlide(currentSlide + 1);
        }

        /* create the page */
        buildPart();

        const quizContainer = document.getElementById('quiz');
        const resultsContainer = document.getElementById('results');
        const submitButton = document.getElementById('submit');

        /* display quiz right away */
        buildQuiz();

        const nextButton = document.getElementById('next');
        const slides = document.querySelectorAll('.slide');
        let currentSlide = 0;

        showSlide(0);

        /* on submit, show results */
        submitButton.addEventListener(
            'click',
            showResults,
        );
        nextButton.addEventListener('click', showNextSlide);
    };

    const game2 = function() {
        console.log('game2');
        title.innerHTML = 'FizzBuzz';
        const fizzBuzzArray = [];

        function buildPart() {
            const fizzBuzz = Object.create(part);
            fizzBuzz.init(`
                <div class="quiz-container">
                <p>Detta test är utformat för att mäta dina mönster-matchande förmågor. Under detta test kommer du att möta en sekvens av värden och ord. Det är upp till dig att räkna ut vad nästa ord eller värde i sekvensen är:</p>
                <div id="fizzBuzz"></div>
                <div id="success"></div>
                <h3>Regler:</h3>
                <div id="rules"></div>
                </div>
            `);
            fizzBuzz.draw(myContainer);
        }

        /* create the page */
        buildPart();

        const fizzBuzzContainer = document.getElementById('fizzBuzz');
        const fizzBuzzRules = document.getElementById('rules');
        const fizzBuzzSuccess = document.getElementById('success');

        /**
         * 
         * @param {Int} start - Number between 1 - 100
         * @param {Int} stop - Number which equals to start + 10
         */
        function fizzBuzz(start, stop) {
            for (let i = start; i <= stop; i++) {
                if (i % 5 === 0) {
                    fizzBuzzArray.push('Buzz');
                } else if (i % 3 === 0) {
                    fizzBuzzArray.push('Fizz');
                } else {
                    fizzBuzzArray.push(i);
                }
            }
            return fizzBuzzArray;
        }
        const startNr = Math.floor(Math.random() * 100) + 1;
        const endNr = (startNr + 10);
        const fizzBussArr = fizzBuzz(startNr, endNr);
        const spliceValue = Math.floor(Math.random() * 10) + 1;
        console.log(spliceValue);
        const popValue = fizzBussArr.splice(spliceValue, 1, '?');
        console.log(popValue[0]);

        fizzBuzzContainer.innerHTML = `
            <p>${fizzBussArr}</p>
            <form id="answer_form">
            <button class="answer" value="Fizz">Fizz</button>
            <button class="answer" value="${spliceValue + startNr}">${spliceValue + startNr}</button>
            <button class="answer" value="Buzz">Buzz</button>
            <button class="answer" value="FizzBuzz">FizzBuzz</button>
            </form>
        `;

        fizzBuzzRules.innerHTML = 'Om ett tal är delbart med 3 ska det vara "Fizz", om det är delbart med 5 då är det "Buzz". Om det är delbart med båda är det "FizzBuzz", annars måste det vara ett nummer.';

        function disableTest() {
            const answer = document.getElementsByClassName('answer');
            for (let i = 0; i < answer.length; i++) {
                answer[i].disabled = true;
            }
        }

        function testAnswer() {
            disableTest();
            if (this.value == popValue[0]) {
                console.log('Correct answer');
                fizzBuzzSuccess.innerHTML = 'Ditt svar är rätt. Förbereder nästa test...'
                this.style.color = 'green';
                points[1] += 20;
            } else {
                console.log('Wrong answer');
                this.style.color = 'red';
            }
            setTimeout(function() { Test.partOfTest(3); }, 3000);
        }

        const answer = document.getElementsByClassName('answer');
        for (let i = 0; i < answer.length; i++) {
            answer[i].addEventListener('click', testAnswer);
        }
    };

    const game3 = function() {
        console.log('game3');
        title.innerHTML = 'Memory';

        function buildPart() {
            const memory = Object.create(part);
            memory.init(`
                <div class="quiz-container">
                <p>När du klickar på start kommer 10 flaggor att vissas under 5 sekunder. Därefter försvinner flagorna och din uppgift är att i rätt ordning försöka klicka på den ruta där den motsvarande flaggan finns.</p>
                <p>Testet pågår så länge du klickar rätt och för varje rätt så får du 2 poäng. Klickar du fel så avslutas testet och du skickas automatiskt vidare till sista testet.</p>
                <div id="memory"></div>
                <div id="flag-list"></div>
                <button id="start">Starta testet</button>
                </div>
            `);
            memory.draw(myContainer);
        }

        /* create the page */
        buildPart();

        /* Create memory game */
        function createMemory() {
            const memoryField = Object.create(part);
            memoryField.init(`
            <div id="container" class="grid-container">
                <div class="grid-item">
                    <div id="card-one" class="card-container">
                        <div class="front"></div>
                        <div class="back"></div>
                    </div>
                </div>
                <div class="grid-item">
                    <div id="card-two" class="card-container">
                        <div class="front"></div>
                        <div class="back"></div>
                    </div>
                </div>
                <div class="grid-item">
                    <div id="card-three" class="card-container">
                        <div class="front"></div>
                        <div class="back"></div>
                    </div>
                </div>
                <div class="grid-item">
                    <div id="card-four" class="card-container">
                        <div class="front"></div>
                        <div class="back"></div>
                    </div>
                </div>
                <div class="grid-item">
                    <div id="card-five" class="card-container">
                        <div class="front"></div>
                        <div class="back"></div>
                    </div>
                </div>
                <div class="grid-item">
                    <div id="card-six" class="card-container">
                        <div class="front"></div>
                        <div class="back"></div>
                    </div>
                </div>
                <div class="grid-item">
                    <div id="card-seven" class="card-container">
                        <div class="front"></div>
                        <div class="back"></div>
                    </div>
                </div>
                <div class="grid-item">
                    <div id="card-eight" class="card-container">
                        <div class="front"></div>
                        <div class="back"></div>
                    </div>
                </div>
                <div class="grid-item">
                    <div id="card-nine" class="card-container">
                        <div class="front"></div>
                        <div class="back"></div>
                    </div>
                </div>
                <div class="grid-item">
                    <div id="card-ten" class="card-container">
                        <div class="front"></div>
                        <div class="back"></div>
                    </div>
                </div>
            </div>
            `);
            memoryField.draw(memoryContainer);

            /* Elements */
            const myNodeList = document.getElementsByClassName('card-container');
            const cardArray = new Array(10);
            const correctCards = [{ id: 1, name: 'Danmark' }, { id: 2, name: 'Spanien' }, { id: 3, name: 'Grönland' }, { id: 4, name: 'Scotland' }, { id: 5, name: 'Belgien' }, { id: 3, name: 'Grönland' }, { id: 5, name: 'Belgien' }, { id: 1, name: 'Danmark' }, { id: 4, name: 'Scotland' }, { id: 2, name: 'Spanien' }];
            let currentGuess = -1;
            const flagList = document.getElementById('flag-list');

            show();
            setTimeout(function() { hide(); }, 5000);

            /**
             * Generate cards and check so there is no duplicates
             *
             * @param {Int} cardPosition - Position the card has in myNodeList
             */
            function generateCards(cardPosition) {
                let randomNumber = Math.floor((Math.random() * 5) +1);
                
                while(checkDuplicate(randomNumber)) {
                    randomNumber = Math.floor((Math.random() * 5) +1);
                }
                cardArray[cardPosition] = randomNumber;
            }

            /**
             * Check if there is duplicate of any card
             * 
             * @param {Int} number - Random number from function genereteCards.
             */
            function checkDuplicate(number) {
                let isDuplicate = false;
                let count = 0;

                for (let i = 0; i < 10; i++) {
                    if (cardArray[i] === number) {
                        count++;
                    }
                }
                if (count === 2) {
                    isDuplicate = true;
                }
                return isDuplicate;
            }

            /**
             * Create the flip effect when a card is clicked
             *
             * @param {Object} card - Object from NodeList located at specific location / index.
             */
            function flipCard(card) {
                card.style.transform = 'rotateY(0deg)';
                card.style.transform = 'rotateY(180deg)';
                card.classList.toggle('flipped');
            }

            /* Shows all card when the test start */
            function show() {
                for (let index = 0; index < myNodeList.length; index++) {
                    const element = document.getElementById(myNodeList[index].id);
                    element.id = index;
                    generateCards(index);
                    flipCard(myNodeList[index]);
                }
            }

            /* Used in setTimeout to hide all card after 5 seconds */
            function hide() {
                console.log('Card array: ', cardArray);
                console.log('Correct: ', correctCards);
                for (let index = 0; index < myNodeList.length; index++) {
                    let element = document.getElementById(myNodeList[index].id);
                    element.id = index;
                    element.addEventListener('click', function() {
                        currentGuess++
                        makeGuess(this, currentGuess);
                    });
                    flipCard(myNodeList[index])
                }
                flagList.innerHTML = correctCards.map((flag, index) => (
                    `${index + 1}. ${flag.name}`
                )).join(' ');
            }

            /**
             * Check if guessed card is correct by comparing cardArray and correctCards
             *
             * @param {Object} card - Current card
             * @param {Int} currentGuess - Guess count
             */
            function makeGuess(card, currentGuess) {
                console.log(currentGuess);
                console.log(correctCards[currentGuess]);
                console.log(cardArray[card.id]);
                if (currentGuess === 10) {
                    console.log('Send to next test');
                    Test.partOfTest(4);
                }

                if (cardArray[card.id] === correctCards[currentGuess].id) {
                    console.log('You got a match!');
                    points[2] += 2;
                    flipCard(card);
                } else {
                    console.log('Not a match!');
                    Test.partOfTest(4);
                }
            }

            /* Create all flags */
            function addFlags() {
                for (let i = 0; i < myNodeList.length; i++) {
                    const element = document.getElementById(i);

                    switch (cardArray[i]) {
                        case 1:
                            element.children[1].innerHTML = '<div class="flag denmark"></div>';
                            break;
                        case 2:
                            element.children[1].innerHTML = '<div class="flag spain"></div>';
                            break;
                        case 3:
                            element.children[1].innerHTML = '<div class="flag greenland"></div>';
                            break;
                        case 4:
                            element.children[1].innerHTML = '<div class="flag scotland"></div>';
                            break;
                        default:
                            element.children[1].innerHTML = '<div class="flag belgium"></div>';
                            break;
                    }
                }
            }
            addFlags();
        }

        const memoryContainer = document.getElementById('memory');
        const memoryStart = document.getElementById('start');

        memoryStart.addEventListener('click', function() {
            createMemory();
            memoryStart.remove();
        });
    };

    const game4 = function() {
        console.log('game4');
    };

    const game5 = function() {
        console.log('game5');
    };

    const end = function() {
        console.log('end');
    };

    const startGame = function () {
        intro();
    };

    window.Test = (function() {
        /**
         * 
         * @param {Int} testPart - Number of the test you want to reset.
         */
        function partOfTest(testPart) {
            switch (testPart) {
                case 0:
                    intro();
                    break;
                case 1:
                    game1();
                    break;
                case 2:
                    game2();
                    break;
                case 3:
                    game3();
                    break;
                case 4:
                    game4();
                    break;
                case 5:
                    game5();
                    break;
                default:
                    end();
                    break;
            }
        }

        /* Return the array with the current points */
        function currentScore() {
            return points;
        }

        /**
         * 
         * @param {Int} testPart - Number of the test you want to reset.
         */
        function reset(testPart) {
            switch (testPart) {
                case 1:
                    console.log("Reset test #1");
                    points[0] = 0;
                    game1();
                    break;
                case 2:
                    console.log("Reset test #2");
                    points[1] = 0;
                    game2();
                    break;
                case 3:
                    console.log("Reset test #3");
                    points[2] = 0;
                    game3();
                    break;
                case 4:
                    console.log("Reset test #4");
                    points[3] = 0;
                    game4();
                    break;
                case 5:
                    console.log("Reset test #5");
                    points[4] = 0;
                    game5();
                    break;
                default:
                    end();
                    break;
            }
        }

        /* Return the object to make it visible. */
        return {
            partOfTest: partOfTest,
            currentScore: currentScore,
            reset: reset,
        };
    }());

    startGame();
};
