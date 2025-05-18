let radioQuestions = [
  {
    number: 0,
    text: "This time tomorrow, I _____ on the beach.",
    right: 1,
    variants: ["will lie", "will be lying", "will lying"],
  },
  {
    number: 1,
    text: "At 8 PM tonight, they _____ dinner.",
    right: 1,
    variants: ["will cook", "will be cooking", "will be cook"],
  },
  {
    number: 2,
    text: "Don’t call her at 6 PM – she _____ a car.",
    right: 2,
    variants: ["will driving", "will be drive", "will be driving"],
  },
  {
    number: 3,
    text: "We _____ a movie tonight.",
    right: 0,
    variants: ["will be watching", "will watch", "will watching"],
  },
  {
    number: 4,
    text: "This time next week, you _____ your exams.",
    right: 0,
    variants: ["will be taking", "will take", "will taking"],
  },
  {
    number: 5,
    text: "She _____ TV when you arrive.",
    right: 1,
    variants: ["will watch", "will be watching", "will be watch"],
  },
  {
    number: 6,
    text: "At midnight, the party _____ still _____.",
    right: 2,
    variants: ["will / going", "will / go", "will be / going"],
  },
  {
    number: 7,
    text: "They _____ soccer this time tomorrow.",
    right: 1,
    variants: ["will play", "will be playing", "will playing"],
  },
  {
    number: 8,
    text: "I _____ for you at the station at 5 PM.",
    right: 1,
    variants: ["will wait", "will be waiting", "will waiting"],
  },
  {
    number: 9,
    text: "In 2030, people _____ flying cars.",
    right: 0,
    variants: ["will be using", "will use", "will using"],
  },
];

let textQuestions = [
  {
    number: 10,
    text: "В это время завтра я буду лететь в Москву",
    right: "This time tomorrow I will be flying to Moskow",
  },
  {
    number: 11,
    text: "Они будут ужинать, когда ты придёшь(to arrive)",
    right: "They will be having dinner when you arrive",
  },
  {
    number: 12,
    text: "В 8 утра (8 AM) он будет готовиться к экзамену",
    right: "At 8 AM he will be preparing for the exam",
  },
  {
    number: 13,
    text: "Мы будем работать над проектом весь вечер",
    right: "We will be working on the project all evening",
  },
  {
    number: 14,
    text: "Ты будешь ждать меня на вокзале ?",
    right: "Will you be waiting for me at the station ?",
  },
  {
    number: 15,
    text: "В следующем году в это время они будут путешествовать по Азии",
    right: "This time next year they will be traveling around Asia",
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
