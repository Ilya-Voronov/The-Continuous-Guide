let radioQuestions = [
  {
    number: 0,
    text: "Look! The boys ______ football in the yard",
    right: 1,
    variants: ["play", "are playing", "is playing"],
  },
  {
    number: 1,
    text: "She ______ a movie right now.",
    right: 2,
    variants: ["watches", "are watching", "is watching"],
  },
  {
    number: 2,
    text: "What ______ you ______ at the moment?",
    right: 1,
    variants: ["do / do", "are / doing", "is / doing"],
  },
  {
    number: 3,
    text: "My parents ______ dinner in the kitchen.",
    right: 1,
    variants: ["cooks", "are cooking", "is cooking"],
  },
  {
    number: 4,
    text: "Listen! The birds ______ beautifully.",
    right: 1,
    variants: ["sing", "are singing", "is singing"],
  },
  {
    number: 5,
    text: "I ______ for my exam this week.",
    right: 0,
    variants: ["am studying", "studies", "is studying"],
  },
  {
    number: 6,
    text: "______ he ______ his homework now?",
    right: 0,
    variants: ["Is / doing", "Does / do", "Are / doing"],
  },
  {
    number: 7,
    text: "They ______ to the party tonight.",
    right: 1,
    variants: ["go", "are going", "is going"],
  },
  {
    number: 8,
    text: "Why ______ she ______ so fast?",
    right: 2,
    variants: ["does / run", "are / running", "is / running"],
  },
  {
    number: 9,
    text: "The baby ______ right now. Don’t make noise!",
    right: 1,
    variants: ["sleeps", "is sleeping", "are sleeping"],
  },
];

let textQuestions = [
  {
    number: 10,
    text: "Мама сейчас печёт пирог",
    right: "Mom is baking a cake now",
  },
  {
    number: 11,
    text: "Сейчас я делаю моё домашнее задание по английскому",
    right: "I am doing my english homework now",
  },
  {
    number: 12,
    text: "Моя сестра не спит, она читает книгу",
    right: "My sister is not sleeping, she is reading a book",
  },
  {
    number: 13,
    text: "В данный момент мы переезжаем(to move) в новый дом",
    right: "We are moving to a new house at the moment",
  },
  {
    number: 14,
    text: "Твои родители всё ещё ремонтируют(to renovate) дом ?",
    right: "Are your parents still renovating the house ?",
  },
  {
    number: 15,
    text: "Мы летим в Париж на следующей неделе",
    right: "We are flying to Paris next week",
  },
];

let radioQuiz = "";
for (let i = 0; i < radioQuestions.length; i++) {
  radioQuiz =
    radioQuiz +
    `<li class="content"><p><b>${radioQuestions[i].text}</b></p>
        <div class='content__form-radio'>
          <label><input name='${i}' type='radio' value='0' /> ${radioQuestions[i].variants[0]} </label>
          <label><input name='${i}' type='radio' value='1'/> ${radioQuestions[i].variants[1]} </label><label>
          <input name='${i}' type='radio' value='2'/> ${radioQuestions[i].variants[2]} </label>
        </div>
      </li>`;
}
document.querySelector(".content__list--radio").innerHTML = radioQuiz;

let textQuiz = "";
for (let i = 0; i < textQuestions.length; i++) {
  textQuiz =
    textQuiz +
    `<li><p><b>${textQuestions[i].text}</b></p>
        <div class='content__form-text'>
          <label><input name=${textQuestions[i].number} type='text' /> </label>
        </div>
      </li>`;
}
document.querySelector(".content__list--text").innerHTML = textQuiz;

let radioAnswers = document.querySelectorAll("input[type='radio'");
let textAnswers = document.querySelectorAll("input[type='text']");
let button = document.querySelector(".content__form-button");
let displayScore = document.querySelector(".score");
let score = 0;

button.addEventListener("click", function () {
  button.disabled = true;

  for (let i = 0; i < radioAnswers.length; i++) {
    const answer = radioAnswers[i];

    for (let j = 0; j < radioQuestions.length; j++) {
      const question = radioQuestions[j];

      if (
        answer.checked &&
        answer.name == question.number &&
        answer.value == question.right
      ) {
        score++;
      }

      if (answer.name == question.number && answer.value != question.right) {
        answer.classList.add("incorrect-radio");
      } else {
        answer.classList.add("correct-radio");
      }
    }
  }

  for (let i = 0; i < textAnswers.length; i++) {
    const answer = textAnswers[i];

    for (let j = 0; j < textQuestions.length; j++) {
      const question = textQuestions[j];

      if (
        answer.name == question.number &&
        answer.value.toLowerCase() == question.right.toLowerCase()
      ) {
        score = score + 2;
      }

      if (answer.name == question.number) {
        answer.insertAdjacentHTML("afterend", `<p>${question.right}</p>`);
      }

      if (
        answer.name == question.number &&
        answer.value.toLowerCase() != question.right.toLowerCase()
      ) {
        answer.classList.add("incorrect-text");
      } else {
        answer.classList.add("correct-text");
      }
    }
  }

  let percent = Math.round((100 * score) / 22); //22 - общее количество баллов, 10 вопросов по 1 баллу, 6 вопросов по 2 балла
  let mark;
  let advice = "";

  if (percent < 60) {
    mark = 2;
    advice =
      "Тебе нужно обязательно повторить весь пройденный материал по Past Continuous! Главное: Не отчаиваться! Эта оценка – сигнал к действию.";
  } else if (percent < 70) {
    mark = 3;
    advice =
      "Ты на верном пути, но нужно чуть больше усилий для стабильного результата!";
  } else if (percent < 85) {
    mark = 4;
    advice =
      "Ты близок к отличному результату, молодец, но тебе ещё есть куда расти!";
  } else {
    mark = 5;
    advice = "Отлично! Но не стоит расслабляться, продолжай в том же духе!";
  }

  displayScore.innerHTML = `<h2>Ваш результат:</h2>
    <p><b>Набрано баллов:</b> ${score} (${percent}%)</p>
    <p><b>Оценка:</b> ${mark}</p>
    <h3><u>${advice}</u></h3>
    `;
});
