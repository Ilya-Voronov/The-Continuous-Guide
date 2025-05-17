let radioQuestions = [
  {
    number: 0,
    text: "What ______ you ______ at 5 p.m. yesterday?",
    right: 1,
    variants: ["was / doing ", "were / doing ", "did / do"],
  },
  {
    number: 1,
    text: "She ______ TV when I called her.",
    right: 0,
    variants: ["was watching", "watched", "were watching"],
  },
  {
    number: 2,
    text: "They ______ football when it started raining.",
    right: 1,
    variants: ["played", "were playing", "was playing"],
  },
  {
    number: 3,
    text: "I ______ a book while my brother ______ video games.",
    right: 1,
    variants: [
      "read / played",
      "was reading / was playing",
      "read / was playing",
    ],
  },
  {
    number: 4,
    text: "______ you ______ when the phone rang?",
    right: 0,
    variants: ["Were / sleeping", "Was / sleeping", "Did / sleep"],
  },
  {
    number: 5,
    text: "He ______ his homework at 8 p.m. yesterday.",
    right: 1,
    variants: ["did", "was doing", "were doing"],
  },
  {
    number: 6,
    text: "The children ______ outside when their mother called them.",
    right: 1,
    variants: ["played", "were playing", "was playing"],
  },
  {
    number: 7,
    text: "We ______ dinner when the lights went out.",
    right: 2,
    variants: ["was having", "had", "were having"],
  },
  {
    number: 8,
    text: "______ she ______ a shower when you arrived?",
    right: 0,
    variants: ["Was / taking", "Were / taking", "Did / take"],
  },
  {
    number: 9,
    text: "The sun ______, and the birds ______ when I woke up.",
    right: 1,
    variants: [
      "shone / sang",
      "was shining / were singing",
      "shone / were singing",
    ],
  },
];

let textQuestions = [
  {
    number: 10,
    text: "Я читал книгу, когда ты позвонил(call)",
    right: "I was reading a book when you called",
  },
  {
    number: 11,
    text: "Они играли в футбол, когда пошел(start) дождь",
    right: "They were playing football when it started raining",
  },
  {
    number: 12,
    text: "Что ты делал вчера в 7 вечера (7 p.m.) ?",
    right: "What were you doing at 7 p.m. yesterday ?",
  },
  {
    number: 13,
    text: "Она готовила(cook) ужин, пока он смотрел телевизор",
    right: "She was cooking dinner while he was watching TV",
  },
  {
    number: 14,
    text: "Мы не спали, когда начался(begin) шторм",
    right: "We were not sleeping when the storm began",
  },
  {
    number: 15,
    text: "Почему ты плакала, когда я тебя увидел ?",
    right: "Why were you crying when I saw you ?",
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

  let percent = Math.round((100 * score) / 22);
  let mark;
  let advice = "";

  if (percent < 60) {
    mark = 2;
    advice =
      "Тебе нужно обязательно повторить весь пройденный материал по Past Continuous! Главное: Не отчаиваться! Эта оценка – сигнал к действию.";
  } else if (percent < 75) {
    mark = 3;
    advice =
      "Ты на верном пути, но нужно чуть больше усилий для стабильного результата!";
  } else if (percent < 90) {
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
