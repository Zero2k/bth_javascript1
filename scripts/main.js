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

        function showSlide(n) {
            slides[currentSlide].classList.remove('active-slide');
            slides[n].classList.add('active-slide');
            currentSlide = n;

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
    };

    const game3 = function() {
        console.log('game3');
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

        function currentScore() {
            return points;
        }

        /* Return the object to make it visible. */
        return {
            partOfTest: partOfTest,
            currentScore: currentScore,
        };
    }());

    startGame();
};
