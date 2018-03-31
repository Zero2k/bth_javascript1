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
    const intro = () => {
        title.innerHTML = 'Intelligence - IQ-testet';

        const buildPart = () => {
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
    const game1 = () => {
        title.innerHTML = 'Frågesport';

        const buildPart = () => {
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

        const buildQuiz = () => {
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

        const showResults = () => {
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
        const showSlide = (nr) => {
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

        const showNextSlide = () => {
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
        submitButton.addEventListener('click', showResults);
        nextButton.addEventListener('click', showNextSlide);
    };

    const game2 = () => {
        console.log('game2');
        title.innerHTML = 'FizzBuzz';
        const fizzBuzzArray = [];

        const buildPart = () => {
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
        const fizzBuzz = (start, stop) => {
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

        const disableTest = () => {
            const answer = document.getElementsByClassName('answer');
            for (let i = 0; i < answer.length; i++) {
                answer[i].disabled = true;
            }
        }

        const testAnswer = () => {
            disableTest();
            if (this.value == popValue[0]) {
                console.log('Correct answer');
                fizzBuzzSuccess.innerHTML = 'Ditt svar är rätt. Förbereder nästa test...';
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

    const game3 = () => {
        console.log('game3');
        title.innerHTML = 'Memory';

        const buildPart = () => {
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
        const createMemory = () => {
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
            const generateCards = (cardPosition) => {
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
            const checkDuplicate = (number) => {
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
            const flipCard = (card) => {
                card.style.transform = 'rotateY(0deg)';
                card.style.transform = 'rotateY(180deg)';
                card.classList.toggle('flipped');
            }

            /* Shows all card when the test start */
            const show = () => {
                for (let index = 0; index < myNodeList.length; index++) {
                    const element = document.getElementById(myNodeList[index].id);
                    element.id = index;
                    generateCards(index);
                    flipCard(myNodeList[index]);
                }
            }

            /* Used in setTimeout to hide all card after 5 seconds */
            const hide = () => {
                console.log('Card array: ', cardArray);
                console.log('Correct: ', correctCards);
                for (let index = 0; index < myNodeList.length; index++) {
                    let element = document.getElementById(myNodeList[index].id);
                    element.id = index;
                    element.addEventListener('click', function() {
                        currentGuess++;
                        makeGuess(this, currentGuess);
                    });
                    flipCard(myNodeList[index]);
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
            const makeGuess = (card, currentGuess) => {
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
            const addFlags = () => {
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

    const game4 = () => {
        console.log('game4');
        title.innerHTML = 'Visuell förmåga och läsförståelse';

        const buildPart = () => {
            const memory = Object.create(part);
            memory.init(`
                <div class="quiz-container">
                <p>När du klickar på "Start" så kommer 10 grafiska objekt att vissas under 15 sekunder. Det kommer även vissas en beskrivning för ett objekt.<br> (Nedan ser du ett av objekten som kommer att vissas)</p>
                <p>Din uppgift är att klicka på de objekt som motsvarar det som står i beskrivningen. Till exempel kan det stå "Klicka på en gula cirkelen" eller "Klicka på en röda fyrkanten".</p>
                <small>Du får 2 poäng för varje rätt och 0 poäng för varje fel.</small>
                <div id="find" style="text-decoration: underline; padding-top: 10px"></div>
                <button id="start" style="margin-top: 20px">Starta</button>
                <div id="gameboard">
                    <div id="box-grön" class="box center green"></div>
                </div>
                </div>
            `);
            memory.draw(myContainer);
        }

        /* create the page */
        buildPart();

        const gameboard = document.getElementById('gameboard');
        const box1 = document.getElementById('box-grön');
        const startButton = document.getElementById('start');
        const find = document.getElementById('find');
        let count = 0;
        let click = 0;
        const correctList = [];

        startButton.addEventListener('click', function() {
            startButton.remove();
            startGame();
        });

        /**
         * 
         * @param {Int} clickNr - Number of flags that have been clicked
         */
        const findValue = (clickNr) => {
            if (typeof correctList[clickNr] !== 'undefined' && typeof correctList[clickNr].value !== 'undefined') {
                find.innerHTML = correctList[clickNr].value;
            }
        };

        /* Create random element */
        const createRandomElement = () => {
            count++;
            const generateColor = Math.floor((Math.random() * 5) + 1);
            const generateCircle = Math.floor((Math.random() * 2) + 1);
            const x = (((Math.random() * 10) + 1) > 5) ? Math.floor((Math.random() * 500) + 1) + "px" : Math.floor((Math.random() * -500) + 1) + "px";
            const y = (((Math.random() * 10) + 1) > 5) ? Math.floor((Math.random() * 800) + 1) + "px" : Math.floor((Math.random() * -800) + 1) + "px";
            const dupe = box1.cloneNode(true);
            dupe.id = `box-${generateColor === 1 ? 'grön' : generateColor === 2 ? 'gul' : generateColor === 3 ? 'röd' : generateColor === 4 ? 'svart' : 'blå'}`;
            dupe.style.top = x;
            dupe.style.left = y;
            dupe.style.zIndex = box1.zIndex + 1;
            correctList.push({
                id: count,
                value: `Klicka på en ${generateColor === 1 ? 'grön' : generateColor === 2 ? 'gul' : generateColor === 3 ? 'röd' : generateColor === 4 ? 'svart' : 'blå'} ${generateCircle === 1 ? 'cirkel' : 'fyrkant'}`,
                correct: `box-${generateColor === 1 ? 'grön' : generateColor === 2 ? 'gul' : generateColor === 3 ? 'röd' : generateColor === 4 ? 'svart' : 'blå'}`,
            });

            if (generateCircle === 1) {
                dupe.classList.add('circle');
            }

            if (generateColor === 1) {
                dupe.classList.add('green');
            } else if (generateColor === 2) {
                dupe.classList.remove('green');
                dupe.classList.add('yellow');
            } else if (generateColor === 3) {
                dupe.classList.remove('green');
                dupe.classList.add('red');
            } else if (generateColor === 4) {
                dupe.classList.remove('green');
                dupe.classList.add('black');
            } else {
                dupe.classList.remove('green');
                dupe.classList.add('blue');
            }
            dupe.addEventListener('click', function() {
                checkCorrect(this);
            });
            gameboard.appendChild(dupe);
        };

        /* Start the game by running the createRandomElement to create 10 elements */
        const startGame = () => {
            for (let i = 0; i <= 9; i++) {
                createRandomElement();
                console.log(correctList);
            }

            box1.remove();
            findValue(click);

            gameOver = window.setTimeout(function() {
                Test.partOfTest(5);
            }, 15000);
        };

        /* Track how many time a element has been clicked */
        const checkGameEnd = (clickNr) => {
            if (clickNr === 9) {
                Test.partOfTest(5);
                console.log('Next game');
            }
        };

        /* Check if current box is the correct element */
        const checkCorrect = (box) => {
            checkGameEnd(click);
            if (correctList[click++].correct === box.id) {
                points[3] += 1;
                findValue(click);
                console.log('Correct');
            } else {
                findValue(click);
                console.log('Wrong');
            }
        };
    };

    const game5 = () => {
        console.log('game5');
        title.innerHTML = 'Reaktions- och Uppfattningsförmåga';
        const buildPart = () => {
            const memory = Object.create(part);
            memory.init(`
                <div class="quiz-container">
                <p>När du klickar på "Start" så kommer 10 grafiska objekt att vissas, varje objekt vissas under 1 sekund sen vissas ett nytt objekt.</p>
                <p>Din uppgift är att klicka på de objekt som uppfyller kraven som finns i listan nedan.</p>
                <div>| <b>Har en annan färg än röd</b> | <b>Har en annan form än kvadrat</b> | <b>Är gul och kvadrat</b> |</div>
                <button id="start" style="margin-top: 20px">Start</button>
                <div id="gameboard2"></div>
                </div>
            `);
            memory.draw(myContainer);
        }

        /* create the page */
        buildPart();

        /* List of all elements */
        const elementList = [];

        /* Generate random elements once the test start */
        (generateRandomElement = () => {
            for (let i = 0; i < 10; i++) {
                const generateColor = Math.floor((Math.random() * 5) + 1);
                const generateCircle = Math.floor((Math.random() * 2) + 1);
                let element = {
                    index: i,
                    form: `${generateCircle === 1 ? 'circle' : 'square'}`,
                    id: `box-${generateColor === 1 ? 'grön' : generateColor === 2 ? 'gul' : generateColor === 3 ? 'röd' : generateColor === 4 ? 'svart' : 'blå'}`,
                    color: `${generateColor === 1 ? 'green' : generateColor === 2 ? 'yellow' : generateColor === 3 ? 'red' : generateColor === 4 ? 'black' : 'blue'}`
                };
                elementList.push(element);
            }
        })();
        console.log(elementList);

        const gameboard = document.getElementById('gameboard2');
        const startButton = document.getElementById('start');
        let click = 0;

        /* Button to start the test */
        startButton.addEventListener('click', function() {
            startButton.remove();
            startLoop();
        });

        /* Loop through the list of elements and displays each element for 1 second */
        const startLoop = () => {
            console.log('Start Loop');

            for (let i = 0; i < 10; i++) {
                setTimeout(function timer() {
                    console.log('Element: ', i);

                    let newNode = document.createElement('div');
                    newNode.id = elementList[i].id;
                    newNode.classList.add('box', 'center', elementList[i].form, elementList[i].color);
                    click = 0;
                    newNode.addEventListener('click', function() {
                        click++;
                        checkCorrect(elementList[i], click);
                    });
                    gameboard.appendChild(newNode);
                    setTimeout( function() {
                        newNode.remove();
                    }, 1000);

                    /* Check if reach end of array / loop */
                    if(i === 9) {
                        console.log("End Loop");
                        Test.partOfTest(6);
                    }
                }, i * 2000);
            }
        };

        /**
         * 
         * @param {Int} element - Current element in elementList
         * @param {Int} clickNr - Number of click the element has received
         */
        const checkCorrect = (element, clickNr) => {
            if (clickNr <= 1) {
                if (element.form === 'square' && element.color === 'yellow') {
                    console.log('Correct');
                    points[4] += 4;
                } else if (element.form === 'circle' && element.color !== 'red') {
                    console.log('Correct');
                    points[4] += 4;
                } else {
                    console.log('False');
                    points[4] -= 2;
                }
            } else {
                console.log('You can only click once!');
            }
        };
    };

    const end = () => {
        console.log('end');
        title.innerHTML = 'Sammanfattning - Din intelligens';
        const buildPart = () => {
            const testEnd = Object.create(part);
            testEnd.init(`
                <div class="quiz-container">
                <p>Bra jobbat! Här är dina poäng och vi har beräknat din intelligens med vår hemliga formel:</p>
                <div id="score"></div>
                <hr>
                <div id="intelligence"></div>
                </div>
            `);
            testEnd.draw(myContainer);
        }

        /* create the page */
        buildPart();

        const score = document.getElementById('score');
        const intelligence = document.getElementById('intelligence');
        const testName = ['Frågesport', 'FizzBuzz', 'Memory', 'Visuell förmåga och läsförståelse', 'Reaktions- och Uppfattningsförmåga'];

        let result = '';
        for (let i = 0; i < points.length; i++) {
            result += `<br> ${testName[i]} : ${points[i]} poäng`;
        }
        score.innerHTML = result;

        intelligence.innerHTML = `Din intelligens är ${(points[0] + points[1] + points[2] + points[3] + points[4]) > 55 ? 'över genomsnittet' : 'under genomsnittet'}`;
    };

    const startGame = () => {
        intro();
    };

    window.Test = (function() {
        /**
         * 
         * @param {Int} testPart - Number of the test you want to reset.
         */
        const partOfTest = (testPart) => {
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
        const currentScore = () => {
            return points;
        }

        /**
         * 
         * @param {Int} testPart - Number of the test you want to reset.
         */
        const reset = (testPart) => {
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
