'use strict';

Vue.component('PageHeader', {
  data() {
    return {
      text: '',
      visibleSearch: false,
      visibleMailBox: false,
      visiblePromocodeBox: false,
      visibleNav: false,
      pageOnTheTop: Boolean,
      extendedMenu: false,
      sessionId: '',
      testIsVisible: false,
    }
  },
  methods: {
    navMenuToggle(){
      this.visibleNav = !this.visibleNav;
    },
    navSubmit() {
      window.location=this.text;
    },
    showSearch(){
      this.visibleSearch = true;
      this.$refs.search.focus();
    },
    scrollEndHandling(){
      this.pageOnTheTop = window.pageYOffset === 0;
      this.testIsVisible = window.pageYOffset > window.innerHeight - 100;

      let isScrolling;
      window.addEventListener('scroll', (event) => {
        window.clearTimeout(isScrolling);
        isScrolling = setTimeout(() => {
          this.pageOnTheTop = window.pageYOffset === 0;
          this.visibleSearch = false;
          this.testIsVisible = window.pageYOffset > window.innerHeight - 100;
        }, 5);
      }, false);
    },
    startForm: function() {
      axios.post('/form/start/kpmi')
      .then(ans => {
        window.location = '/form/'+ans.data.data;
      })
    }
  },
  mounted() {
    this.scrollEndHandling();
  }
});

new Vue({
  el: '#form',
  data: function() {
    return {
      curQ: {
        "text": '',
        "type_name": ''
      },
      firstlyAnswerQuestion: {
        en: 'Firstly answer the question.',
        ru: 'Ответь на вопрос, прежде чем перейти к следующему.',
      },
      forceRender: true,
      isLoading: false,
      isUpdating: null,
      questions: [],
      questionsPassed: 0,
      session: {
        data: {}
      },
      sessionId: '',
      userAnswer: null,
    }
  },
  delimiters: ['[[',']]'],
  computed: {
    progressScale() {
      return ((this.curQ.position - 1)*100/(this.questions.length - 1))
    },
  },
  methods: {
    createSessionCookie: function() {
      // Ставим/обновляем куки 
      // с идентификатором сессии заполненной анкеты.
      let cookie = 'kpmi_session=' + this.sessionId + ';';
      cookie += 'max-age=' + 86400e3 + ';';
      cookie += 'path=/;'
      cookie += 'samesite=strict;'
      document.cookie = cookie;
    },
    // Получение первого вопроса, на который пользователь не дал ответ.
    // Если пролог был пролистан, считается, что на него был дан ответ.
    getCurQ: function() {
      for(let i = 0; i < this.questions.length; i++) {
        if([null, undefined].includes(
          this.questions[i].user_answer)) {
          return this.questions[i];
        }
      }
    },
    // Навигация по анкете при помощи клавиатуры.
    keyNavigate: function(event) {
      if(event.key === 'Enter') this.nextQuestion();
      // if(event.key === 'Backspace') this.previousQuestion();
      if(this.curQ.type_name === 'hard') {
        if(event.key === 'ArrowLeft') {
          if(!this.userAnswer) this.userAnswer = 1;
          else if(this.userAnswer === 1) {
            this.userAnswer = this.curQ.answers.length;
          }
          else this.userAnswer -= 1;
        }
        if(event.key === 'ArrowRight') {
          let lastAnswer = this.curQ.answers.length;
          if(!this.userAnswer) this.userAnswer = lastAnswer;
          else if(this.userAnswer === lastAnswer) {
            this.userAnswer = 1;
          }
          else this.userAnswer += 1;
        }
      }
    },
    // Переход к следующему по порядку вопросу.
    nextQuestion: function() {
      if(this.curQ.position <= this.questions.length) {
        // При прохождении пролога делается отметка о том,
        // что на него был дан ответ.
        if(this.curQ.type_name === 'prlg') {
          this.curQ.user_answer = 1;
          this.userAnswer = 1;
          try {
            ym(71275162,'reachGoal','form_start');
          } catch (err) {}

          this.createSessionCookie();
        }
        // Валидация наличия ответа на обязательные вопросы.
        if(this.curQ.mandatory
          && (
            !this.userAnswer
            || (
              this.curQ.type_name === 'rank'
              && this.userAnswer.length !== this.curQ.answers.length
            )
          )
        ) {
          this.$q.notify({
            classes: 'error-message',
            message: this.firstlyAnswerQuestion[
              this.session.data.current_lang
            ],
            position: 'top',
            textColor: 'white'
          });
        }
        else {
          // Сохранение текущего времени ответа.
          if(!this.curQ.answer_time) this.curQ.answer_time = Date.now();

          // Сохранение текущего варианта ответа.
          this.questions[this.curQ.position-1].user_answer =
            this.userAnswer;
          
          let finish = false
          // Если ответ на вопрос о профессии содержательный,
          // запускаем цепочку вопросов с семдифом.
          // В противном случае заканчиваем анкету.
          if(this.curQ.position === 62) {
            // Регекс для проверки содержательности ответа.
            let regex = /^\.|^\-|без[ ]?работ|пенси|не[ ]?знаю|не[ ]?р[а|о]бота|^нет[ ]?$|^н[и|е][ ]?кем|^никто|^студент|уч[е|и]н[н]?и|уч[у|ю]сь|учащийся|уч[е|ё]ба|школа|школ[ь]?ни|^в школе|^менеджер(ом)?[ ]?$|^мам|мамой|мать|^пап|бомж|домохоз|д[е|и]крет|клоун|неудачн|^руководител(ь|ем)?[ ]?$|^консультант(ом)?$|^оператор(ом)?$|^аналитик(ом)?$|^диспетчер(ом)?$|^человек|^специалист(ом)?[ ]?$|делопроизводите|разнорабо|^начальник(ом)?$|^рабочи[й|м]$|документовед|^универсал$|^эксперт(ом)?$|в поиске|^ищу|н[и|е][ ]?где|хуй|таролог/gi
            if (this.userAnswer && this.userAnswer.search(regex) === -1)
            {
              ym(71275162,'reachGoal','full_filling')
            }
            else { finish = true }
          }

          // Завершение прохождения анкеты:
          // изменение статуса прохождения и переход на страницу интерпретации.
          if(this.curQ.position === this.questions.length || finish) {
            if(this.session.progress_status === 'main_in_progress')
            {
              this.session.progress_status = 'main_completed';
            }
            this.isLoading = true;
            window.clearTimeout(this.isUpdating);
            this.updateSession()
            .then(ans => {
              if(ans.data.status === 0) {
                // Цель Яндекс Метрики.
                ym(71275162,'reachGoal','form');

                this.createSessionCookie();

                window.location = '/form/' + this.sessionId;
              }
              else {
                this.$q.notify({
                  color: 'red',
                  message: ans.data.error,
                  position: 'top',
                  textColor: 'white'
                });
              }
            });
          }
          else {
            // Получение данных следующего вопроса.
            this.curQ = this.questions[this.curQ.position];
            
            // Быдловставочка для решения проблемы несменяющихся
            // вариантов ответов у некоторых пользователей.
            // Принудительный перерендер блока с элементами анкеты.
            this.forceRender = false;
            this.$nextTick(
              () => {
                this.forceRender = true;
              }
            );

            if(
              this.curQ.type_name !== 'prlg' &&
              this.curQ.hasOwnProperty('answers')
            )
              for(let i = 0; i < this.curQ.answers.length; i++) {
                this.curQ.answers[i].label = this.curQ.answers[i].ru_label
              }
            // Сохранение времени отображения вопроса.
            if(!this.curQ.show_time) {
              this.curQ.show_time = Date.now()
            }

            this.userAnswer = this.questions[this.curQ.position-1].user_answer
          }
        }
      };
    },
    // Переход к предыдущему по порядку вопросу.
    previousQuestion: function() {
      if(this.curQ.position > 1) {
        // Сохранение текущего варианта ответа.
        this.questions[this.curQ.position-1].user_answer = this.userAnswer

        // Получение данных предыдущего вопроса.
        this.curQ = this.questions[this.curQ.position - 2]

        this.userAnswer = this.questions[this.curQ.position-1].user_answer
      };
    },
    // Установка рейтинга варианта ответа для вопроса с ранжированием.
    rankSetRate: function(answerIndex) {
      // Перед началом работы с рейтингами нужно проверить содержимое
      // userAnswer. И если там ничего нет, то заполнить его рейтингами
      // вариантов ответов. Потому как они сохраняются в БД.
      if (!this.userAnswer) {
        this.userAnswer = '$'.repeat(this.curQ.answers.length)
        for (let idx = 0; idx < this.curQ.answers.length; idx++) {
          if (this.curQ.answers[idx].rate !== '') {
            let buf = this.userAnswer.split('')
            buf[this.curQ.answers[idx].rate-1] = idx + 1
            this.userAnswer = buf.join('')
          }
        }
        this.userAnswer = this.userAnswer.replace(/\$/g, '')
      }

      if (this.curQ.answers[answerIndex].rate !== '') {
        // Если у варианта ответа уже есть рейтинг, то нужно его сбросить.
        this.curQ.answers[answerIndex].rate = ''
        // Удаление из userAnswer индекса варианта ответа.
        this.userAnswer = this.userAnswer.replace(answerIndex + 1, '')
        // Пересчет значений рейтинга для варинтов ответа,
        // индексы которых остались в userAnswer.
        for (let idx = 0; idx < this.userAnswer.length; idx++) {
          this.curQ.answers[this.userAnswer[idx] - 1].rate = idx + 1
        }
      }
      else {        
        // Установка значения рейтинга
        // в зависимости от длины строки userAnswer.
        this.curQ.answers[answerIndex].rate = this.userAnswer.length + 1
        // Добавление в userAnswer позиции варианта ответа.
        this.userAnswer += answerIndex + 1
      }

      // Так как вопрос с ранжированием состоит из нескольких ответов,
      // то его нужно синхронизировать с основной структурой при каждом
      // измении. Иначе будут рассинхроны.
      this.questions[this.curQ.position-1].user_answer = this.userAnswer
    },
    // Сохранение данных сессии.
    updateSession: function() {
      if(['main_in_progress', 'main_completed'].includes(
        this.session.progress_status
      ))
        this.session.questions = this.questions;
      return axios.post('/form/update/'+this.sessionId, {
        session: this.session,
      })
      .then(ans => {
        if(ans.data.status != 0) {
          this.$q.notify({
            color: 'red',
            message: ans.data.error,
            position: 'top',
            textColor: 'white'
          });
        }
        return ans;
      });
    },
  },
  mounted: function() {
    // Передача id сессии из текущего URL.
    this.sessionId = 
        window.location.href.split('/').pop().split('#')[0].split('?')[0]
    // Получение данных о сессии пользователя по идентификатору.
    return axios.post('/form/get/'+this.sessionId)
    .then(ans => {
      if(ans.data.status === 0) {
        this.session = ans.data.data;
        this.questions = this.session.data.questions;
        this.curQ = this.getCurQ();
        if(
          this.curQ.type_name !== 'prlg' &&
          this.curQ.hasOwnProperty('answers')
        )
          for(let i = 0; i < this.curQ.answers.length; i++) {
            this.curQ.answers[i].label = this.session.data.current_lang === 'ru' ?
              this.curQ.answers[i].ru_label : this.curQ.answers[i].en_label;
          }
        document.addEventListener('keydown', this.keyNavigate);
        this.userAnswer = this.questions[this.curQ.position-1].user_answer;
        if(!this.curQ.show_time) this.curQ.show_time = Date.now();
        // Непрерывное асинхронное сохранение данных сессии.
        this.isUpdating = setInterval(() => {
          this.updateSession();
        }, 5000); // eslint-disable-line no-magic-numbers
      }
      else {
        this.$q.notify({
          color: 'red',
          message: ans.data.error,
          position: 'top',
          textColor: 'white'
        });
      }
    });
  }
})