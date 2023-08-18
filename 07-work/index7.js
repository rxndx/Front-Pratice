const QUESTIONS = [
    {
        question: 'Сколько хромосом у здорового человека?',
        answer: '46',
        type: 'prompt',
    },
    {
        question: 'Путин - хуйло?',
        answer: true,
        type: 'confirm',
    },
    {
        question: 'Сколько хромосом у Путина?',
        answer: '47',
        type: 'prompt',
    },
    {
        question: 'Сколько тупых овец в Московии (в млн)?',
        answer: '144',
        type: 'prompt',
    },
    {
        question: 'Снесли ли памятник Екатерине-2 в Одессе?',
        answer: true,
        type: 'confirm',
    },
    {
        question: 'Сколько черных пакетов выделяются на одного орка?',
        answer: '1',
        type: 'prompt',
    },
    {
        question: 'На сколько вы оцениваете работу ЗСУ от 1 до 10?',
        answer: '10',
        type: 'prompt',
    },
    {
        question: 'Со скольких позиций готовилось нападение на Беларусь?',
        answer: '4',
        type: 'prompt',
    },
    {
        question: 'Нужно ли сжигать сосийский флаг?',
        answer: true,
        type: 'confirm',
    },
    {
        question: 'Поддерживаете ли вы уход иностранных компаний из Московии?',
        answer: true,
        type: 'confirm',
    },
    {
        question: 'Считаете ли вы сосию своим домом?',
        answer: false,
        type: 'confirm',
    },
];

calculateScore.call(QUESTIONS);

function calculateScore() {
    let score = 0;

    for (const question of this) {
        const userAnswer = question.type === 'prompt' ? prompt(question.question) : confirm(question.question);
        if (userAnswer === question.answer) {
            score += 10;
        }
    }

    alert(`Ваш результат: ${score} очков.`);
}
