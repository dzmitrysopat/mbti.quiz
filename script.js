function startBtn(){
    document.getElementById("description").classList.add("hide");
    document.querySelector("img").classList.add("hide");
    document.querySelector("main div a").classList.add("hide");
    document.getElementById("quiz").classList.remove("hide");
}

const questions = [
    {
        question:"В свободной от деловых отношений компании Вы:",
        answers:["общаетесь со многими, включая и незнакомцев","общаетесь с немногими — вашими знакомыми"],
    },
    {
        question:"Вы человек скорее:",
        answers:["реалистичный, чем склонный теоретизировать","склонный теоретизировать, чем реалистичный"],
    },
    {
        question:"Что, по Вашему мнению, хуже:",
        answers:["«витать в облаках»","придерживаться проторенной дорожки"],
    },
    {
        question:"Вы более подвержены влиянию:",
        answers:["принципов, законов","эмоций, чувств"],
    },
    {
        question:"Вы более склонны:",
        answers:[" обращаться к сознанию другого человека","затрагивать чувства"],
    },
    {
        question:"Вы предпочитаете работать:",
        answers:["выполняя все точно в срок","не связывая себя определенными сроками"],
    },
    {
        question:"Вы склонны делать выбор:",
        answers:["довольно осторожно","внезапно, импульсивно"],
    },
    {
        question:"В компании (на вечеринке) Вы:",
        answers:[" остаетесь допоздна, не чувствуя усталости","быстро утомляетесь и предпочитаете пораньше уйти"],
    },
    {
        question:"Вас более привлекают:",
        answers:["здравомыслящие люди","люди с богатым воображением"],
    },
    {
        question:"Вам интереснее:",
        answers:["то, что происходит в действительности","те события, которые могут произойти"],
    },
    {
        question:"Оценивая поступки людей, Вы больше учитываете:",
        answers:["требования закона, чем обстоятельства","обстоятельства, чем требования закона"],
    },
    {
        question:"Обращаясь к другим, Вы склонны:",
        answers:["соблюдать формальности, этикет","проявлять свои личные, индивидуальные качества"],
    },
    {
        question:"Вы человек скорее:",
        answers:["точный, пунктуальный","неторопливый, медлительный"],
    },
    {
        question:"Вас больше беспокоит необходимость:",
        answers:["оставлять дела незаконченными","непременно доводить дела до конца"],
    },
    {
        question:"В кругу знакомых Вы, как правило:",
        answers:["в курсе происходящих там событий","узнаете о новостях с опозданием"],
    },
    {
        question:"Повседневные дела Вам нравится делать:",
        answers:["общепринятым способом","своим оригинальным способом"],
    },
    {
        question:"Предпочитаю таких писателей, которые:",
        answers:["выражаются буквально, напрямую","пользуются аналогиями, иносказаниями"],
    },
    {
        question:"Что вас больше привлекает:",
        answers:["стройность мысли","гармония человеческих отношений"],
    },
    {
        question:"Вы чувствуете себя увереннее:",
        answers:["в логических умозаключениях","в практических оценках ситуаций"],
    },
    {
        question:"Вы предпочитаете ситуации, когда:",
        answers:["все определено и устроено","все еще в перспективе и пока не улажено"],
    },
    {
        question:"Вы человек скорее:",
        answers:["серьезный, определенный","беззаботный, беспечный"],
    },
    {
        question:"Прибегая к разговору по телефону, Вы:",
        answers:["заранее не продумываете все, что нужно сказать"," мысленно «репетируете» то, что будет сказано"],
    },
    {
        question:"По Вашему мнению, факты:",
        answers:["важны сами по себе","есть проявления общих закономерностей"],
    },
    {
        question:"Фантазеры, мечтатели обычно:",
        answers:["раздражают вас","довольно симпатичны вам"],
    },
    {
        question:"Вы чаще действуете как человек: ",
        answers:["хладнокровный","эмоциональный, горячий"],
    },
    {
        question:"Что, по-Вашему, хуже:",
        answers:["быть несправедливым","быть беспощадным"],
    },
    {
        question:"Обычно Вы предпочитаете действовать:",
        answers:["тщательно оценив все возможности","полагаясь на волю случая"],
    },
    {
        question:"Вам приятнее:",
        answers:["покупать что-либо","иметь возможность купить"],
    },
    {
        question:"В компании Вы, как правило:",
        answers:["первым заводите беседу","ждете, когда с вами заговорят"],
    },
    {
        question:"По Вашему мнению, здравый смысл:",
        answers:["редко ошибается","часто попадает впросак"],
    },
    {
        question:"Детям часто не хватает:",
        answers:["практичности","воображения"],
    },
    {
        question:"В принятии решений Вы руководствуетесь скорее:",
        answers:["принятыми нормами","своими чувствами, ощущениями"],
    },
    {
        question:"Вы человек скорее:",
        answers:["твердый, чем мягкий","мягкий, чем твердый"],
    },
    {
        question:"Что, по-Вашему, больше впечатляет:",
        answers:["умение методично организовать","умение приспособиться и довольствоваться достигнутым"],
    },
    {
        question:" Вы больше цените:",
        answers:["определенность, законченность","открытость, многовариантность"],
    },
    {
        question:"Новые и нестандартные отношения с людьми:",
        answers:["стимулируют, придают Вам энергии","утомляют Вас"],
    },
    {
        question:"Вы чаще действуете как:",
        answers:["человек практического склада","человек оригинальный, необычный"],
    },
    {
        question:"Вы более склонны:",
        answers:["находить пользу в отношениях с людьми","понимать мысли и чувства других"],
    },
    {
        question:"Что приносит Вам больше удовлетворения:",
        answers:["тщательное и всестороннее обсуждение спорного вопроса","достижение соглашения по поводу спорного вопроса"],
    },
    {
        question:"Вы руководствуетесь более:",
        answers:["рассудком","велениями сердца"],
    },
    {
        question:"Вам удобнее выполнять работу:",
        answers:["по предварительной договоренности","которая подвернулась случайно"],
    },
    {
        question:"Вы обычно полагаетесь:",
        answers:["на организованность, порядок","на случайность, неожиданность"],
    },
    {
        question:"Вы предпочитаете иметь:",
        answers:["много друзей на непродолжительный срок","несколько старых друзей"],
    },
    {
        question:"Вы руководствуетесь в большей степени:",
        answers:["фактами, обстоятельствами","общими положениями, принципами"],
    },
    {
        question:"Вас больше интересуют:",
        answers:["производство и сбыт продукции","проектирование и исследования"],
    },
    {
        question:"Что Вы скорее сочтете за комплимент: ",
        answers:["«Вот очень логичный человек»","«Вот тонко чувствующий человек»"],
    },
    {
        question:"Вы более цените в себе:",
        answers:["невозмутимость","увлеченность"],
    },
    {
        question:"Вы предпочитаете высказывать:",
        answers:["окончательные и определенные утверждения","предварительные и неоднозначные утверждения"],
    },
    {
        question:"Вы лучше чувствуете себя:",
        answers:["после принятия решения","не ограничивая себя решениями "],
    },
    {
        question:"Общаясь с незнакомыми людьми, Вы:",
        answers:["легко завязываете продолжительные беседы","не всегда находите общие темы для разговора"],
    },
    {
        question:"Вы больше доверяете:",
        answers:["своему опыту","своим предчувствиям"],
    },
    {
        question:"Вы человек:",
        answers:["более практичный, чем изобретательный","более изобретательный, чем практичный"],
    },
    {
        question:"Кто заслуживает большего одобрения:",
        answers:["рассудительный, здравомыслящий человек","человек, глубоко переживающий"],
    },
    {
        question:"Вы более склонны:",
        answers:["быть прямым и беспристрастным","сочувствовать людям"],
    },
    {
        question:"Что, по-Вашему, предпочтительней:",
        answers:["удостовериться, что все подготовлено и улажено","предоставить событиям идти своим чередом"],
    },
    {
        question:"Отношения между людьми должны строиться:",
        answers:["на предварительной взаимной договоренности","в зависимости от обстоятельств"],
    },
    {
        question:" Когда звонит телефон, Вы:",
        answers:["торопитесь подойти первым","надеетесь, что подойдет кто-нибудь другой"],
    },
    {
        question:"Что вы цените в себе больше:",
        answers:["развитое чувство реальности","пылкое воображение "],
    },
    {
        question:"Вы больше придаете значения:",
        answers:["тому, что сказано","тому, как сказано"],
    },
    {
        question:"Что выглядит большим заблуждением:",
        answers:["излишняя пылкость, горячность","чрезмерная объективность, беспристрастность"],
    },
    {
        question:"Вы в основном считаете себя:",
        answers:[" трезвым и практичным","сердечным и отзывчивым"],
    },
    {
        question:"Какие ситуации привлекают Вас больше:",
        answers:["регламентированные и упорядоченные","неупорядоченные и нерегламентированные"],
    },
    {
        question:"Вы человек скорее:",
        answers:["педантичный, чем капризный","капризный, чем педантичный"],
    },
    {
        question:"Вы чаще склонны:",
        answers:["быть открытым, доступным людям","быть сдержанным, скрытным"],
    },
    {
        question:"В литературных произведениях Вы предпочитаете:",
        answers:[" буквальность, конкретность","образность, переносный смысл"],
    },
    {
        question:"Что для Вас труднее:",
        answers:["находить общий язык с другими","использовать других в своих интересах"],
    },
    {
        question:"Чего бы Вы себе больше пожелали:",
        answers:["ясности размышлений","умения сочувствовать"],
    },
    {
        question:"Что хуже:",
        answers:["быть неприхотливым","быть излишне привередливым"],
    },
    {
        question:"Вы предпочитаете:",
        answers:[" запланированные события","незапланированные события "],
    },
    {
        question:"Вы склонны поступать скорее:",
        answers:["обдуманно, чем импульсивно","импульсивно, чем обдуманно"],
    }
];

const headerContainer = document.querySelector('#quiz-header');
const bodyContainer = document.querySelector('#test-body');
const listContainer = document.querySelector('#list');
const submitBtn = document.querySelector('#submit');
const progressContainer = document.querySelector('#progress');

let score = 0;
let questionIndex = 0;

clearPage();
showQuestion();

submitBtn.onclick = checkAnswer;

function clearPage(){
    headerContainer.innerHTML = '';
    listContainer.innerHTML = '';
}

function showQuestion(){
    // console.log('showQuestion');

    // Question
    const headerTemplate = `<h2 class="question">%question%</h2>`;
    const title = headerTemplate.replace('%question%', questions[questionIndex]['question']);
    headerContainer.innerHTML = title;

    // questionnumber
    const bodyTemplate = `<p class="number result">%number%</p>`;
    
    let number = `Вопрос ${questionIndex+1} из ${questions.length}`;
    // console.log(number);

    const questionNumber = bodyTemplate.replace('%number%', number);

    bodyContainer.innerHTML = questionNumber;

    // progressBar
    let step = questionIndex+1;
    const progressTemplate = 
    `<progress max="%max%" value="%step%" id="progress"></progress>`;

    
    // console.log(step);
    // console.log(questions.length);

    progressContainer.value = step;
    progressContainer.max = questions.length;

    // Answers
    let answerNumber = 1;

    for (answerText of questions[questionIndex]['answers']){
        // console.log(answerNumber, answerText);
        const questionTemplate = 
            `<label class="label__input answer-item">
            <input value="%number%" type="radio" class="answer" name="answer">
            <span class="answer-description">%answer%</span>
        </label>`;

        // let answerHTML = questionTemplate.replace('%answer%', answerText);
        //    listContainer.innerHTML = listContainer.innerHTML + answerHTML;
        // or

        const answerHTML = questionTemplate
                                    .replace('%answer%', answerText)
                                    .replace('%number%', answerNumber);
        
        listContainer.innerHTML += answerHTML;
        answerNumber++;
    }
} 

function checkAnswer(){   
    // Находим выбранную радио кнопку
    const checkedRadio = listContainer.querySelector('input[type="radio"]:checked');
    
    // Если ответ не выбран - ничего не делаем, выходим из функции
    if (!checkedRadio){
        submitBtn.blur();
        return;
    }

    // узнаем номер ответа пользователя

    const userAnswer = parseInt(checkedRadio.value);
    // console.log(parseInt(checkedRadio.value));
    // Если ответ верный - увеличиваем счет
    // questions[questionIndex]['answers']
    // if (userAnswer === questions[questionIndex]['answers']){
        // score = score + userAnswer;
    // }

    // console.log('score = ', score);

    if (questionIndex !== questions.length - 1){
        // console.log('Это не последний вопрос');
        questionIndex++;
        clearPage();
        showQuestion();
    } else {
        // console.log('Это последний вопрос');
        clearPage();
        showResults();
    }
}

function showResults (){
    // console.log('showResults start');
    // console.log(score);

    const resultsTemplate = `
            <div class="results">
            <div class="result-comntainer">
            <h2 class="title">%title%</h2>
            <p class="result">%result%</p>
            </div>
            <h3 class="summary">%message%</h3>
            </div>
    `;

    let title, message, result;

    if (score <= 99){
        title = 'Ваш результат:';
        result = 'меньше 99 баллов'
        message = 'У Вас низкий уровень стресса!';
    } else if (score >= 100 && score <= 125){
        title = 'Ваш результат:';
        result = 'от 100 до 125 баллов'
        message = 'У Вас средний уровень стресса!';
    } else if (score >= 125){
        title = 'Ваш результат:';
        result = 'более 125 баллов'
        message = 'У Вас высокий уровень стресса!';
    }

    // Result
    // let result = `${score} из ${questions.length}`;

    const finalMessage = resultsTemplate
                        .replace('%title%', title)
                        .replace('%message%', message)
                        .replace('%result%',result)

    listContainer.innerHTML = finalMessage;
    bodyContainer.innerHTML = '';
    progressContainer.hidden = true;

    submitBtn.blur();
    submitBtn.innerText = 'Попробовать еще раз'
    submitBtn.onclick = () => history.go();
}

