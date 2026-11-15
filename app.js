if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('./sw.js').catch(() => {});
}

// Полная база тем ЕГЭ + банк случайных заданий по каждой теме (по 2-3 вариации на тему)
const EGE_CURRICULUM = [
  {
    id: 'rus',
    name: 'Русский язык',
    icon: '✍️',
    subtitle: 'Задания 1–27 · Орфография, пунктуация, сочинение',
    minutes: 0,
    topics: [
      {
        id: 'rus-1',
        block: 'Работа с текстом (№1–3)',
        title: 'Стилистический анализ текста, средства связи предложений',
        note: 'Обращай внимание на лексические повторы, указательные местоимения (этот, тот, такой), союзы и вводные слова в начале предложения. В №3 различай научный, публицистический, официально-деловой и художественный стили.',
        question: 'К какому стилю речи относится текст с обилием терминов, отглагольных существительных и строгой логичностью?',
        answer: 'научный',
        extraTasks: [
          { q: 'К какому стилю речи относятся законы, уставы, заявления и деловые справки (напишите прилагательное в И.п., например: научный)?', a: 'официально-деловой' },
          { q: 'Какой тип речи отвечает на вопросы «Почему? Отчего?» и содержит тезис, аргументы и вывод?', a: 'рассуждение' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'rus-2',
        block: 'Орфоэпия и лексика (№4–6)',
        title: 'Ударения, паронимы, лексические нормы (плеоназм и тавтология)',
        note: 'Глаголы на -ИТЬ обычно имеют ударение на окончании (включИт, позвонИт, кровоточИт, облегчИт). В женском роде прош. времени ударение падает на окончание: бралА, взялА, понялА (исключения: клАла, крАла, послАла).',
        question: 'В каком слове верно выделена ударная гласная: «баловАть» или «бАловать»?',
        answer: 'баловать',
        extraTasks: [
          { q: 'Запишите слово «торты» во множественном числе, выделив ударную гласную ЗАГЛАВНОЙ буквой (например: крАны).', a: 'тОрты' },
          { q: 'Запишите глагол «позвонит» с ударной ЗАГЛАВНОЙ буквой.', a: 'позвонИт' },
          { q: 'Какой пароним подходит: «... камень» (драгоценный / драгоценностный)?', a: 'драгоценный' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'rus-3',
        block: 'Грамматика (№7–8)',
        title: 'Морфологические и синтаксические нормы (виды ошибок №8)',
        note: 'Главные ловушки №8: 1) Деепричастный оборот (действие должно относиться к подлежащему). 2) Причастный оборот (определяемое слово не должно разрывать оборот). 3) Несогласованное приложение в кавычках при наличии родового слова стоит в И.п. (в романе «Война и мир»).',
        question: 'Напишите правильную форму родительного падежа множественного числа слова «носки» (пара ...).',
        answer: 'носков',
        extraTasks: [
          { q: 'Образуйте форму Р.п. мн. числа от слова «чулки» (нет ...).', a: 'чулок' },
          { q: 'Образуйте форму повелительного наклонения от глагола «лечь» (на пол).', a: 'ляг' },
          { q: 'Как правильно: «пара туфель» или «пара туфлей»?', a: 'пара туфель' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'rus-4',
        block: 'Орфография корней и приставок (№9–10)',
        title: 'Безударные, чередующиеся гласные в корне; ПРЕ-/ПРИ-, Ъ и Ь',
        note: 'Чередования, зависящие от суффикса -А-: -бер-/-бир-, -дер-/-дир-, -мер-/-мир-, -пер-/-пир-, -тер-/-тир-, -блест-/-блист-, -жег-/-жиг-, -стел-/-стил-, -чет-/-чит-, -кас-/-кос-, -лаг-/-лож-.',
        question: 'Какая буква пишется в слове «прик..сновение»?',
        answer: 'о',
        extraTasks: [
          { q: 'Какая буква пишется в слове «заг..релый»?', a: 'о' },
          { q: 'Какая буква пишется в приставке слова «пр..школьный» (участок)?', a: 'и' },
          { q: 'Какой знак (ъ или ь) пишется в слове «под..езд»?', a: 'ъ' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'rus-5',
        block: 'Суффиксы и окончания (№11–12)',
        title: 'Суффиксы разных частей речи и личные окончания глаголов / причастий',
        note: 'I спряжение (-у/-ю, -ет, -ут/-ют, суффиксы -ущ-/-ющ-, -ем-/-ом-): брить, стелить, зиждиться — исключения. II спряжение (-ишь, -ит, -ат/-ят, суффиксы -ащ-/-ящ-, -им-): 4 глагола на -ать и 7 на -еть.',
        question: 'Какая буква пропущена в слове «кле..щий» (карандаш)?',
        answer: 'я',
        extraTasks: [
          { q: 'Какая буква пропущена в глаголе «они бор..тся»?', a: 'ю' },
          { q: 'Какая буква пропущена в слове «затм..вать»?', a: 'е' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'rus-6',
        block: 'Слитное/раздельное написание и Н/НН (№13–15)',
        title: 'НЕ и НИ с разными частями речи, производные предлоги, Н и НН',
        note: 'В полных причастиях пишется НН, если есть: 1) приставка (кроме НЕ-), 2) зависимое слово, 3) -ОВА-/-ЕВА-, 4) образовано от глагола сов. вида. В кратких причастиях всегда одна Н.',
        question: 'Сколько букв «н» пишется в слове «жаре..ая в масле картошка» (1 или 2)?',
        answer: '2',
        extraTasks: [
          { q: 'Сколько букв «н» пишется в слове «серебря..ый» (1 или 2)?', a: '1' },
          { q: 'Как пишется слово «(в)течение (часа)»: слитно или раздельно?', a: 'раздельно' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'rus-7',
        block: 'Пунктуация в простом и сложном предложении (№16–18)',
        title: 'Однородные члены, ССП, причастные/деепричастные обороты, вводные слова',
        note: 'Перед одиночным союзом И в ССП запятая НЕ ставится, если есть общий второстепенный член предложения. Слова «однако» в начале предложения не выделяется запятой.',
        question: 'Является ли слово «всё-таки» вводным («да» или «нет»)?',
        answer: 'нет',
        extraTasks: [
          { q: 'Является ли слово «по-моему» вводным («да» или «нет»)?', a: 'да' },
          { q: 'Является ли слово «якобы» вводным («да» или «нет»)?', a: 'нет' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'rus-8',
        block: 'Сложные предложения и пунктуационный анализ (№19–21)',
        title: 'СПП, стык союзов (ТО, НО, ТАК), БСП, тире и двоеточие в тексте',
        note: 'На стыке союзов (например, «что если») запятая ставится только тогда, когда дальше НЕТ второй части союза (то, так, но).',
        question: 'Ставится ли запятая на стыке союзов в предложении: «Я знал, что если пойдёт дождь, то мы останемся дома» («да» или «нет»)?',
        answer: 'нет',
        extraTasks: [
          { q: 'Ставится ли запятая на стыке союзов: «Он сказал, что если успеет, зайдёт вечером» («да» или «нет»)?', a: 'да' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'rus-9',
        block: 'Средства выразительности (№22–26)',
        title: 'Тропы (метафора, эпитет, олицетворение), синтаксические средства и приёмы',
        note: 'Различай: тропы — скрытые/образные значения слов (метафора, метонимия, гипербола, литота); синтаксические средства — строение фраз (парцелляция, ряды однородных, риторический вопрос); приёмы — противопоставление, анафора, эпифора, градация.',
        question: 'Как называется приём намеренного деления предложения на несколько интонационно замкнутых отрезков точками?',
        answer: 'парцелляция',
        extraTasks: [
          { q: 'Как называется единоначатие (повтор одних и тех же слов в начале соседних строк или предложений)?', a: 'анафора' },
          { q: 'Как называется резкое противопоставление понятий, образов или состояний?', a: 'антитеза' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'rus-10',
        block: 'Сочинение ЕГЭ (№27)',
        title: 'Формулировка проблемы, комментарий (2 примера + связь), позиция автора',
        note: 'Обязательные элементы: 1) Проблема. 2) Пример 1 + пояснение. 3) Пример 2 + пояснение. 4) Указание и анализ смысловой связи между примерами. 5) Позиция автора. 6) Своя позиция + обоснование.',
        question: 'Сколько примеров-иллюстраций из прочитанного текста нужно привести в комментарии?',
        answer: '2',
        extraTasks: [
          { q: 'Сколько слов должно быть в сочинении ЕГЭ минимум, чтобы его проверили по всем критериям (напишите число)?', a: '150' }
        ],
        doneAt: null, stage: 0, solved: false
      }
    ]
  },
  {
    id: 'math-prof',
    name: 'Математика (Профиль)',
    icon: '📐',
    subtitle: '1-я и 2-я части · Тригонометрия, параметры, теория чисел',
    minutes: 0,
    topics: [
      {
        id: 'mp-1',
        block: 'Планиметрия и Стереометрия (№1, №3)',
        title: 'Треугольники, окружности, площади и объёмы многогранников и тел вращения',
        note: 'Площадь трапеции: S = ((a+b)/2)·h. Объём пирамиды и конуса равен 1/3 произведения площади основания на высоту. При увеличении всех линейных размеров в k раз площадь растёт в k² раз, объём — в k³ раз.',
        question: 'Во сколько раз увеличится объём куба, если все его рёбра увеличить в 3 раза?',
        answer: '27',
        extraTasks: [
          { q: 'Во сколько раз увеличится площадь поверхности шара, если его радиус увеличить в 4 раза?', a: '16' },
          { q: 'Объём цилиндра равен 18. Чему равен объём конуса с таким же основанием и высотой?', a: '6' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'mp-2',
        block: 'Векторы и Теория вероятностей (№2, №4–5)',
        title: 'Скалярное произведение векторов, классическая и сложная вероятность',
        note: 'Скалярное произведение a·b = x₁x₂ + y₁y₂ = |a|·|b|·cos(α). Если векторы перпендикулярны, их скалярное произведение равно 0. Для независимых событий P(A·B) = P(A)·P(B).',
        question: 'Чему равно скалярное произведение перпендикулярных векторов?',
        answer: '0',
        extraTasks: [
          { q: 'Найдите скалярное произведение векторов a(2; 3) и b(4; -1).', a: '5' },
          { q: 'Стрелок попадает в мишень с вероятностью 0.8. Какова вероятность промаха при одном выстреле?', a: '0.2' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'mp-3',
        block: 'Уравнения и преобразования (№6–7, №9)',
        title: 'Показательные, логарифмические, иррациональные и тригонометрические выражения',
        note: 'Основное логарифмическое тождество: a^(log_a(b)) = b. Формула перехода к новому основанию: log_a(b) = log_c(b) / log_c(a). Синус двойного угла: sin(2α) = 2·sin(α)·cos(α).',
        question: 'Чему равен log₂(32)?',
        answer: '5',
        extraTasks: [
          { q: 'Вычислите значение выражения: 3^(log₃(7)) + 2.', a: '9' },
          { q: 'Решите уравнение: 2^(x - 1) = 16.', a: '5' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'mp-4',
        block: 'Производная и исследование функций (№8, №12)',
        title: 'Геометрический и физический смысл производной, точки экстремума',
        note: 'f\'(x₀) = tg(α) = k (угловой коэффициент касательной). Если график производной f\'(x) лежит выше оси Ox, то сама функция f(x) возрастает.',
        question: 'Найдите производную функции f(x) = x³ в точке x₀ = 2.',
        answer: '12',
        extraTasks: [
          { q: 'Материальная точка движется по закону x(t) = t² + 4t. Найдите её скорость в момент времени t = 3.', a: '10' },
          { q: 'Чему равна производная константы f(x) = 2026?', a: '0' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'mp-5',
        block: 'Текстовые задачи и Графики функций (№10–11)',
        title: 'Движение по воде и прямой, сплавы, работа, прогрессии и сдвиги графиков',
        note: 'Средняя скорость = Весь путь / Всё время (НЕ среднее арифметическое скоростей!). При движении по течению v = v_соб + v_теч.',
        question: 'Теплоход прошёл 60 км за 2 часа, а следующие 60 км за 3 часа. Найдите среднюю скорость (в км/ч).',
        answer: '24',
        extraTasks: [
          { q: 'Собственная скорость катера 18 км/ч, скорость течения 2 км/ч. Сколько км катер пройдёт против течения за 3 часа?', a: '48' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'mp-6',
        block: 'Тригонометрическое уравнение (№13 — 2 часть)',
        title: 'Формулы приведения, однородные уравнения и отбор корней на отрезке',
        note: 'Правило лошади: от вертикальной оси (π/2, 3π/2) функция меняется на кофункцию. Знак ставим по исходной функции. Отбор корней обязательно подписываем на тригонометрической окружности (дуга + концы отрезка).',
        question: 'Чему равен cos(π/3)? Запишите в виде десятичной дроби.',
        answer: '0.5',
        extraTasks: [
          { q: 'Чему равен sin(π/6)? Запишите в виде десятичной дроби.', a: '0.5' },
          { q: 'Чему равен tg(π/4)?', a: '1' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'mp-7',
        block: 'Стереометрия 2-й части (№14)',
        title: 'Построение сечений, углы и расстояния в пространстве, метод координат',
        note: 'Теорема о трёх перпендикулярах: прямая в плоскости перпендикулярна наклонной ⇔ она перпендикулярна проекции этой наклонной.',
        question: 'Сколько граней у правильной четырёхугольной пирамиды?',
        answer: '5',
        extraTasks: [
          { q: 'Сколько рёбер у треугольной призмы?', a: '9' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'mp-8',
        block: 'Неравенства (№15)',
        title: 'Логарифмические, показательные неравенства и метод рационализации',
        note: 'Всегда начинай с ОДЗ! Знак разности log_a(f) − log_a(g) на ОДЗ совпадает со знаком произведения (a − 1)(f − g).',
        question: 'При каком значении основания логарифма a > 0 знак неравенства меняется на противоположный при потенцировании: a > 1 или 0 < a < 1 (напишите 1 или 0)?',
        answer: '0',
        extraTasks: [
          { q: 'Найдите наименьшее целое решение неравенства 2^x > 10.', a: '4' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'mp-9',
        block: 'Экономическая задача (№16)',
        title: 'Кредиты (аннуитет и дифференцированный платёж), вклады и оптимизация',
        note: 'В дифференцированном платеже тело долга уменьшается равномерно на S/n каждый период, а проценты начисляются на текущий остаток. Переплата = сумма всех начисленных процентов.',
        question: 'Вклад 1000 руб. увеличился на 15%. Сколько рублей стало на счёте?',
        answer: '1150',
        extraTasks: [
          { q: 'Взят кредит 600 тыс. руб. на 12 месяцев с равномерным уменьшением основного долга. На сколько тыс. руб. уменьшается основной долг каждый месяц?', a: '50' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'mp-10',
        block: 'Планиметрия 2-й части (№17)',
        title: 'Свойства медиан, биссектрис, высот, вписанных и описанных окружностей',
        note: 'Медианы треугольника пересекаются в одной точке и делятся в отношении 2:1, считая от вершины. Около четырёхугольника можно описать окружность ⇔ сумма противоположных углов равна 180°.',
        question: 'Чему равна сумма противоположных углов вписанного в окружность четырёхугольника (в градусах)?',
        answer: '180',
        extraTasks: [
          { q: 'Вписанный угол равен 35°. Чему равен центральный угол, опирающийся на ту же дугу (в градусах)?', a: '70' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'mp-11',
        block: 'Параметры и Теория чисел (№18–19)',
        title: 'Графический метод (xOa, xOy), симметрия, делимость и оценка + пример',
        note: 'Уравнение (x − a)² + (y − b)² = R² задаёт окружность с центром (a; b) и радиусом R. В №19 для получения 1 балла в пункте а) достаточно привести один конкретный пример.',
        question: 'Сколько корней имеет уравнение |x| = a при a = 0?',
        answer: '1',
        extraTasks: [
          { q: 'Сколько корней имеет уравнение x² = a при a = 9?', a: '2' }
        ],
        doneAt: null, stage: 0, solved: false
      }
    ]
  },
  {
    id: 'math-base',
    name: 'Математика (База)',
    icon: '🧮',
    subtitle: 'Задания 1–21 · Вычисления, геометрия, логика и вероятности',
    minutes: 0,
    topics: [
      {
        id: 'mb-1',
        block: 'Вычисления и единицы измерения (№1–4, №6–7)',
        title: 'Дроби, степени, корни, логарифмы и простейшие уравнения',
        note: 'При умножении степеней с одинаковым основанием показатели складываются, при делении — вычитаются. При возведении степени в степень показатели перемножаются.',
        question: 'Вычислите: 2⁵ · 2⁻³.',
        answer: '4',
        extraTasks: [
          { q: 'Вычислите: √16 · √9.', a: '12' },
          { q: 'Решите уравнение: 3x - 7 = 14.', a: '7' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'mb-2',
        block: 'Теория вероятностей и анализ данных (№5, №8, №14)',
        title: 'Классическая вероятность, графики, диаграммы и выбор оптимального варианта',
        note: 'Вероятность P(A) = m / n (число нужных исходов делим на общее число всех возможных исходов). Ответ всегда от 0 до 1.',
        question: 'В тарелке 20 пирожков: 14 с мясом, остальные с вишней. Какова вероятность вытащить пирожок с вишней?',
        answer: '0.3',
        extraTasks: [
          { q: 'Из 50 билетов к экзамену Петя выучил 40. Найдите вероятность того, что ему попадётся выученный билет.', a: '0.8' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'mb-3',
        block: 'Планиметрия и Стереометрия (№9–13)',
        title: 'Площади на клетках, теорема Пифагора, объёмы и площади поверхности',
        note: 'Площадь прямоугольного треугольника: S = (a · b) / 2. Объём цилиндра: V = πR²h. Объём конуса в 3 раза меньше.',
        question: 'Найдите площадь прямоугольного треугольника с катетами 6 и 8.',
        answer: '24',
        extraTasks: [
          { q: 'Найдите гипотенузу прямоугольного треугольника с катетами 5 и 12.', a: '13' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'mb-4',
        block: 'Текстовые задачи и числа (№15–17, №19–20)',
        title: 'Проценты, движение, работа, признаки делимости и смекалка',
        note: 'Число делится на 3 (и на 9), если сумма его цифр делится на 3 (на 9). Число делится на 4, если две его последние цифры образуют число, делящееся на 4.',
        question: 'Товар стоил 500 руб., его уценили на 20%. Сколько рублей он стал стоить?',
        answer: '400',
        extraTasks: [
          { q: 'Футболка стоила 800 руб., цену повысили на 25%. Сколько рублей она стала стоить?', a: '1000' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'mb-5',
        block: 'Логика и задачи на смекалку (№18, №21)',
        title: 'Анализ логических утверждений, неравенства на прямой, задачи на взвешивания',
        note: 'В задачах №21 проверяй крайние случаи и делимость. Если за каждый шаг величина меняется на чётное число, её чётность сохраняется (инвариант).',
        question: 'Сколько всего двузначных чисел делится на 10?',
        answer: '9',
        extraTasks: [
          { q: 'В доме 5 этажей, на каждом этаже по 4 квартиры. На каком этаже находится квартира №15?', a: '4' }
        ],
        doneAt: null, stage: 0, solved: false
      }
    ]
  },
  {
    id: 'phys',
    name: 'Физика',
    icon: '⚡',
    subtitle: 'Механика, МКТ, электродинамика, оптика и квантовая физика',
    minutes: 0,
    topics: [
      {
        id: 'ph-1',
        block: 'Кинематика и Динамика (№1–3, №22)',
        title: 'Равноускоренное движение, баллистика, законы Ньютона, сила трения и упругости',
        note: 'Путь при равноускоренном движении: S = v₀t + at²/2. Второй закон Ньютона: F_рез = m·a. Сила трения скольжения: F_тр = μ·N.',
        question: 'Тело массой 5 кг движется с ускорением 2 м/с². Чему равна равнодействующая всех сил (в Н)?',
        answer: '10',
        extraTasks: [
          { q: 'Автомобиль трогается с места с ускорением 3 м/с². Какой путь он пройдёт за 4 секунды (в м)?', a: '24' },
          { q: 'Жёсткость пружины 200 Н/м. Какая сила нужна, чтобы растянуть её на 0.05 м (в Н)?', a: '10' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'ph-2',
        block: 'Законы сохранения и Статика (№4–6, №26)',
        title: 'Импульс, закон сохранения энергии, работа, мощность, рычаги и колебания',
        note: 'Кинетическая энергия E_k = mv² / 2. Потенциальная E_p = mgh. Период математического маятника T = 2π√(l/g), пружинного T = 2π√(m/k).',
        question: 'Тело массой 2 кг движется со скоростью 3 м/с. Чему равна его кинетическая энергия (в Дж)?',
        answer: '9',
        extraTasks: [
          { q: 'Чему равен импульс тела массой 4 кг, движущегося со скоростью 5 м/с (в кг·м/с)?', a: '20' },
          { q: 'Во сколько раз увеличится период колебаний математического маятника, если его длину увеличить в 4 раза?', a: '2' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'ph-3',
        block: 'МКТ и Идеальный газ (№7–8, №23)',
        title: 'Уравнение Менделеева-Клапейрона, изопроцессы и влажность воздуха',
        note: 'pV = νRT = (m/M)RT. Изотермический (T=const): pV=const. Изобарный (p=const): V/T=const. Изохорный (V=const): p/T=const.',
        question: 'Во сколько раз увеличится давление идеального газа при изотермическом уменьшении его объёма в 4 раза?',
        answer: '4',
        extraTasks: [
          { q: 'Абсолютную температуру идеального газа в закрытом баллоне увеличили в 2 раза. Во сколько раз выросло давление?', a: '2' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'ph-4',
        block: 'Термодинамика и Тепловые явления (№9–10)',
        title: 'Первый закон термодинамики, внутренняя энергия, КПД тепловых машин',
        note: 'Q = ΔU + A. Для одноатомного газа ΔU = (3/2)νRΔT. При изохорном процессе работа газа A = 0. КПД цикла Карно: η = (T_н − T_х) / T_н.',
        question: 'Чему равна работа идеального газа при изохорном нагревании (в Дж)?',
        answer: '0',
        extraTasks: [
          { q: 'Газ получил 300 Дж теплоты и совершил работу 100 Дж. На сколько джоулей изменилась его внутренняя энергия?', a: '200' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'ph-5',
        block: 'Электростатика и Постоянный ток (№11–12, №24)',
        title: 'Закон Кулона, напряжённость, конденсаторы, закон Ома и мощность тока',
        note: 'Закон Ома для полной цепи: I = ЭДС / (R + r). Энергия заряженного конденсатора: W = CU²/2 = q²/(2C).',
        question: 'Сопротивление участка цепи 4 Ом, сила тока 2 А. Найдите напряжение на участке (в В).',
        answer: '8',
        extraTasks: [
          { q: 'Во сколько раз уменьшится сила кулоновского взаимодействия двух точечных зарядов, если расстояние между ними увеличить в 3 раза?', a: '9' },
          { q: 'Два резистора по 6 Ом соединены параллельно. Чему равно их общее сопротивление (в Ом)?', a: '3' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'ph-6',
        block: 'Магнетизм и Электромагнитная индукция (№13–15, №25)',
        title: 'Сила Ампера, сила Лоренца, закон Фарадея, правило Ленца и колебательный контур',
        note: 'Сила Ампера: F_A = I·B·l·sin(α) (правило левой руки). Сила Лоренца: F_Л = q·v·B·sin(α) — работу НЕ совершает, меняет только направление скорости. Период контура: T = 2π√(LC).',
        question: 'Чему равна работа силы Лоренца, действующей на движущийся в магнитном поле электрон (в Дж)?',
        answer: '0',
        extraTasks: [
          { q: 'Магнитный поток через контур равномерно уменьшился на 6 Вб за 2 секунды. Чему равен модуль ЭДС индукции (в В)?', a: '3' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'ph-7',
        block: 'Оптика (№16)',
        title: 'Законы отражения и преломления света, тонкие линзы, дифракционная решётка',
        note: 'Формула тонкой линзы: ±1/F = ±1/d ± 1/f. Оптическая сила D = 1/F (в дптр). Для собирающей линзы F > 0, для рассеивающей F < 0.',
        question: 'Фокусное расстояние собирающей линзы 0.5 м. Чему равна её оптическая сила (в дптр)?',
        answer: '2',
        extraTasks: [
          { q: 'Угол падения луча на плоское зеркало равен 35°. Чему равен угол отражения (в градусах)?', a: '35' }
        ],
        doneAt: null, stage: 0, solved: false
      },
      {
        id: 'ph-8',
        block: 'Квантовая и Ядерная физика (№17–18)',
        title: 'Фотоны, уравнение Эйнштейна для фотоэффекта, постулаты Бора, радиоактивный распад',
        note: 'Фотоэффект: hν = A_вых + E_k(max). При α-распаде (ядро гелия ⁴₂He) заряд Z уменьшается на 2, масса A — на 4. При β⁻-распаде (электрон ⁰₋₁e) Z растёт на 1, A не меняется.',
        question: 'На сколько единиц уменьшается массовое число ядра при альфа-распаде?',
        answer: '4',
        extraTasks: [
          { q: 'Сколько нейтронов содержит ядро атома гелия ⁴₂He?', a: '2' }
        ],
        doneAt: null, stage: 0, solved: false
      }
    ]
  }
];

// База игровых ачивок
const ACHIEVEMENTS_DB = [
  {
    id: 'first-blood',
    icon: '🎯',
    name: 'Первая кровь',
    desc: 'Освой свою самую первую тему из кодификатора ЕГЭ',
    rarity: 'common',
    rarityLabel: 'Обычная',
    xp: 100,
    target: 1,
    getVal: (m) => m.doneTopics
  },
  {
    id: 'quiz-starter',
    icon: '⚡',
    name: 'Разминка ума',
    desc: 'Реши 3 задачи ЕГЭ в карточках или в тренажёре',
    rarity: 'common',
    rarityLabel: 'Обычная',
    xp: 120,
    target: 3,
    getVal: (m) => m.totalPracticeSolved
  },
  {
    id: 'focus-hour',
    icon: '⏱',
    name: 'Час погружения',
    desc: 'Накопи 60 минут продуктивных занятий (таймером или вручную)',
    rarity: 'common',
    rarityLabel: 'Обычная',
    xp: 120,
    target: 60,
    getVal: (m) => m.totalMinutes
  },
  {
    id: 'streak-3',
    icon: '🔥',
    name: 'Искра дисциплины',
    desc: 'Удерживай ударный режим 3 дня подряд без пропусков',
    rarity: 'rare',
    rarityLabel: 'Редкая',
    xp: 200,
    target: 3,
    getVal: (m) => m.streak
  },
  {
    id: 'topics-10',
    icon: '📚',
    name: 'Знаток кодификатора',
    desc: 'Закрой 10 тем по любым предметам ЕГЭ',
    rarity: 'rare',
    rarityLabel: 'Редкая',
    xp: 250,
    target: 10,
    getVal: (m) => m.doneTopics
  },
  {
    id: 'quiz-master-15',
    icon: '🧠',
    name: 'Машина практики',
    desc: 'Безошибочно реши 15 задач ЕГЭ в тренажёре и карточках',
    rarity: 'rare',
    rarityLabel: 'Редкая',
    xp: 300,
    target: 15,
    getVal: (m) => m.totalPracticeSolved
  },
  {
    id: 'rus-master',
    icon: '✍️',
    name: 'Повелитель слова',
    desc: 'Освой все 10 тем по Русскому языку',
    rarity: 'epic',
    rarityLabel: 'Эпическая',
    xp: 450,
    target: 10,
    getVal: (m) => m.subDone['rus'] || 0
  },
  {
    id: 'math-prof-master',
    icon: '📐',
    name: 'Гроза параметров',
    desc: 'Освой все 11 тем по Профильной математике',
    rarity: 'epic',
    rarityLabel: 'Эпическая',
    xp: 500,
    target: 11,
    getVal: (m) => m.subDone['math-prof'] || 0
  },
  {
    id: 'phys-master',
    icon: '⚡',
    name: 'Повелитель квантов',
    desc: 'Освой все 8 разделов по Физике',
    rarity: 'epic',
    rarityLabel: 'Эпическая',
    xp: 450,
    target: 8,
    getVal: (m) => m.subDone['phys'] || 0
  },
  {
    id: 'math-base-master',
    icon: '🧮',
    name: 'Железная логика',
    desc: 'Освой все 5 блоков по Базовой математике',
    rarity: 'rare',
    rarityLabel: 'Редкая',
    xp: 300,
    target: 5,
    getVal: (m) => m.subDone['math-base'] || 0
  },
  {
    id: 'streak-7',
    icon: '🌋',
    name: 'Неделя огня',
    desc: 'Держи ударный режим 7 дней подряд',
    rarity: 'epic',
    rarityLabel: 'Эпическая',
    xp: 400,
    target: 7,
    getVal: (m) => m.streak
  },
  {
    id: 'marathon-10h',
    icon: '🚀',
    name: 'Марафонец (10 часов)',
    desc: 'Набери 600 минут чистого времени подготовки',
    rarity: 'epic',
    rarityLabel: 'Эпическая',
    xp: 500,
    target: 600,
    getVal: (m) => m.totalMinutes
  },
  {
    id: 'night-owl',
    icon: '🦉',
    name: 'Ночной дозор',
    desc: 'Секретная ачивка: позанимайся или реши задачу после 22:00',
    rarity: 'rare',
    rarityLabel: 'Секретная',
    xp: 250,
    target: 1,
    getVal: (m) => m.nightOwl ? 1 : 0
  },
  {
    id: 'ege-legend',
    icon: '👑',
    name: 'Легенда 100 баллов',
    desc: 'Закрой 100% всех тем по всем предметам ЕГЭ',
    rarity: 'legendary',
    rarityLabel: 'Легендарная',
    xp: 1000,
    target: 34,
    getVal: (m) => m.doneTopics
  }
];

let state = JSON.parse(localStorage.getItem('focusprep_ege_v6')) || {
  subjects: EGE_CURRICULUM,
  currentSubjectId: 'rus',
  dailyActivity: {},
  sessions: [],
  unlockedAchievements: [],
  practiceSolvedTotal: 0,
  nightOwl: false
};

if (!state.unlockedAchievements) state.unlockedAchievements = [];
if (typeof state.practiceSolvedTotal !== 'number') state.practiceSolvedTotal = 0;

function saveState() {
  localStorage.setItem('focusprep_ege_v6', JSON.stringify(state));
}

function getTodayKey() {
  return new Date().toISOString().split('T')[0];
}

function logActivity(points = 10) {
  const today = getTodayKey();
  state.dailyActivity[today] = (state.dailyActivity[today] || 0) + points;
  const hour = new Date().getHours();
  if (hour >= 22 || hour < 5) state.nightOwl = true;
  saveState();
  checkAchievements();
}

// Звук разблокировки ачивки
function playAchievementSound() {
  try {
    const ctx = new (window.AudioContext || window.webkitAudioContext)();
    const notes = [523.25, 659.25, 783.99, 1046.5];
    notes.forEach((freq, idx) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + idx * 0.08);
      gain.gain.setValueAtTime(0.18, ctx.currentTime + idx * 0.08);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + idx * 0.08 + 0.35);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + idx * 0.08);
      osc.stop(ctx.currentTime + idx * 0.08 + 0.35);
    });
    if (navigator.vibrate) navigator.vibrate([100, 60, 150]);
  } catch (e) {}
}

let toastTimeout = null;
function showAchievementToast(ach) {
  const toast = document.getElementById('achievementToast');
  document.getElementById('toastIcon').textContent = ach.icon;
  document.getElementById('toastRarity').textContent = `АЧИВКА ОТКРЫТА · ${ach.rarityLabel.toUpperCase()}`;
  document.getElementById('toastTitle').textContent = ach.name;
  document.getElementById('toastXp').textContent = `+${ach.xp} XP к уровню`;

  toast.classList.remove('hidden');
  playAchievementSound();
  document.getElementById('achNavDot').classList.remove('hidden');

  clearTimeout(toastTimeout);
  toastTimeout = setTimeout(() => toast.classList.add('hidden'), 4200);
}

// Сбор метрик игрока
function getPlayerMetrics() {
  let doneTopics = 0;
  let totalTopics = 0;
  let cardSolvedQuizzes = 0;
  let totalMinutes = 0;
  const subDone = {};

  state.subjects.forEach(s => {
    totalMinutes += s.minutes || 0;
    let sDone = 0;
    s.topics.forEach(t => {
      totalTopics++;
      if (t.doneAt) {
        doneTopics++;
        sDone++;
      }
      if (t.solved) cardSolvedQuizzes++;
    });
    subDone[s.id] = sDone;
  });

  const totalPracticeSolved = cardSolvedQuizzes + (state.practiceSolvedTotal || 0);
  const streak = calculateStreak();
  return {
    doneTopics,
    totalTopics,
    totalPracticeSolved,
    totalMinutes,
    subDone,
    streak,
    nightOwl: Boolean(state.nightOwl)
  };
}

// Проверка новых ачивок
function checkAchievements() {
  const metrics = getPlayerMetrics();
  let newlyUnlocked = null;

  ACHIEVEMENTS_DB.forEach(ach => {
    if (!state.unlockedAchievements.includes(ach.id)) {
      if (ach.getVal(metrics) >= ach.target) {
        state.unlockedAchievements.push(ach.id);
        newlyUnlocked = ach;
      }
    }
  });

  if (newlyUnlocked) {
    saveState();
    showAchievementToast(newlyUnlocked);
  }
  updateRankHeader();
}

function getRankInfo() {
  const m = getPlayerMetrics();
  const achXp = ACHIEVEMENTS_DB
    .filter(a => state.unlockedAchievements.includes(a.id))
    .reduce((sum, a) => sum + a.xp, 0);

  const totalXp = m.doneTopics * 50 + m.totalPracticeSolved * 30 + m.totalMinutes * 2 + achXp;
  const xpPerLevel = 300;
  const level = Math.floor(totalXp / xpPerLevel) + 1;
  const currentLvlXp = totalXp % xpPerLevel;

  const titles = [
    { min: 1, title: 'Новичок ЕГЭ', icon: '🎒' },
    { min: 3, title: 'Абитуриент', icon: '📘' },
    { min: 5, title: 'Знаток кодификатора', icon: '⚡' },
    { min: 8, title: 'Покоритель 80+', icon: '🔥' },
    { min: 12, title: 'Легенда 100 баллов', icon: '👑' }
  ];
  const rank = [...titles].reverse().find(r => level >= r.min) || titles[0];
  return { totalXp, level, currentLvlXp, xpPerLevel, title: rank.title, icon: rank.icon };
}

function updateRankHeader() {
  const info = getRankInfo();
  document.getElementById('topLvlBadge').textContent = `LVL ${info.level}`;
}

// Сброс
document.getElementById('resetDataBtn').addEventListener('click', () => {
  if (confirm('Сбросить прогресс и обновить базу тем ЕГЭ?')) {
    localStorage.removeItem('focusprep_ege_v6');
    location.reload();
  }
});

// --- Переключение экранов ---
function switchView(viewId) {
  document.querySelectorAll('.view').forEach(v => v.classList.remove('active'));
  document.getElementById(viewId).classList.add('active');

  document.querySelectorAll('.nav-item').forEach(b => b.classList.remove('active'));
  const navBtn = document.querySelector(`.nav-item[data-target="${viewId === 'view-subject-detail' ? 'view-home' : viewId}"]`);
  if (navBtn) navBtn.classList.add('active');

  if (viewId === 'view-home') renderHomeView();
  if (viewId === 'view-practice') initPracticeSelectors();
  if (viewId === 'view-timer') renderTodaySessions();
  if (viewId === 'view-stats') {
    document.getElementById('achNavDot').classList.add('hidden');
    renderAchievementsView();
  }
}

window.goHome = function() {
  switchView('view-home');
};

document.querySelectorAll('.nav-item').forEach(btn => {
  btn.addEventListener('click', () => switchView(btn.dataset.target));
});

document.getElementById('backToHomeBtn').addEventListener('click', () => switchView('view-home'));

// --- Кривая забывания Эббингауза ---
const INTERVALS = [1, 3, 7, 14];
function isTopicDue(topic) {
  if (!topic.doneAt || topic.stage >= INTERVALS.length) return false;
  const daysPassed = (Date.now() - topic.doneAt) / (1000 * 60 * 60 * 24);
  return daysPassed >= INTERVALS[topic.stage];
}

// --- Расчёт Стрика ---
function calculateStreak() {
  let streak = 0;
  const d = new Date();
  while (true) {
    const key = d.toISOString().split('T')[0];
    if ((state.dailyActivity[key] || 0) > 0) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      if (streak === 0 && key === getTodayKey()) {
        d.setDate(d.getDate() - 1);
        continue;
      }
      break;
    }
  }
  return streak;
}

// --- ГЛАВНЫЙ ЭКРАН ---
function renderHomeView() {
  updateRankHeader();
  const streak = calculateStreak();
  document.getElementById('topStreakBadge').textContent = `🔥 ${streak} дн.`;
  document.getElementById('heroStreakCount').textContent = streak;

  const weekStrip = document.getElementById('weekStrip');
  const dayNames = ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'];
  weekStrip.innerHTML = '';
  for (let i = 6; i >= 0; i--) {
    const d = new Date();
    d.setDate(d.getDate() - i);
    const key = d.toISOString().split('T')[0];
    const active = (state.dailyActivity[key] || 0) > 0;
    const chip = document.createElement('div');
    chip.className = `day-chip ${active ? 'active' : ''}`;
    chip.innerHTML = `${dayNames[d.getDay()]}<span>${active ? '🔥' : '·'}</span>`;
    weekStrip.appendChild(chip);
  }

  let totalTopics = 0;
  let completedTopics = 0;
  let totalDue = 0;

  const grid = document.getElementById('subjectsGrid');
  grid.innerHTML = '';

  state.subjects.forEach(sub => {
    const subTotal = sub.topics.length;
    const subDone = sub.topics.filter(t => t.doneAt).length;
    const subDue = sub.topics.filter(t => isTopicDue(t)).length;
    const subPercent = subTotal ? Math.round((subDone / subTotal) * 100) : 0;

    totalTopics += subTotal;
    completedTopics += subDone;
    totalDue += subDue;

    const card = document.createElement('button');
    card.className = 'subject-card-btn';
    card.onclick = () => openSubjectPage(sub.id);
    card.innerHTML = `
      <div class="sub-card-top">
        <div class="sub-card-left">
          <div class="sub-icon-box">${sub.icon || '📘'}</div>
          <div>
            <div class="sub-card-name">
              ${sub.name}
              ${subDue > 0 ? `<span class="sub-due-pill">Повторить: ${subDue}</span>` : ''}
            </div>
            <div class="sub-card-sub">Освоено ${subDone} из ${subTotal} тем (${subPercent}%)</div>
          </div>
        </div>
        <div class="sub-card-arrow">→</div>
      </div>
      <div class="progress-bar-bg">
        <div class="progress-bar-fill" style="width: ${subPercent}%"></div>
      </div>
    `;
    grid.appendChild(card);
  });

  const overallPercent = totalTopics ? Math.round((completedTopics / totalTopics) * 100) : 0;
  document.getElementById('overallPercent').textContent = `${overallPercent}%`;
  document.getElementById('overallProgressBar').style.width = `${overallPercent}%`;

  const banner = document.getElementById('dueReviewsBanner');
  const navBadge = document.getElementById('navBadge');
  if (totalDue > 0) {
    banner.textContent = `⚡ Пора повторить по Эббингаузу: ${totalDue} тем(ы)`;
    banner.classList.remove('hidden');
    navBadge.textContent = totalDue;
    navBadge.classList.remove('hidden');
  } else {
    banner.classList.add('hidden');
    navBadge.classList.add('hidden');
  }

  const timerSelect = document.getElementById('activeSubject');
  const prevSelectVal = timerSelect.value;
  timerSelect.innerHTML = state.subjects.map(s => `<option value="${s.id}">${s.name}</option>`).join('');
  if (prevSelectVal) timerSelect.value = prevSelectVal;
}

// --- ЭКРАН ПРЕДМЕТА ---
window.openSubjectPage = function(subId) {
  state.currentSubjectId = subId;
  saveState();
  renderSubjectDetail();
  switchView('view-subject-detail');
};

function renderSubjectDetail() {
  const sub = state.subjects.find(s => s.id === state.currentSubjectId) || state.subjects[0];
  const doneCount = sub.topics.filter(t => t.doneAt).length;
  const totalCount = sub.topics.length;
  const pct = totalCount ? Math.round((doneCount / totalCount) * 100) : 0;

  document.getElementById('subDetailTitle').textContent = sub.name;
  document.getElementById('subDetailBadge').textContent = sub.subtitle || 'Кодификатор ЕГЭ';
  document.getElementById('subDetailStat').textContent = `${doneCount} / ${totalCount}`;
  document.getElementById('subDetailBar').style.width = `${pct}%`;

  const container = document.getElementById('topicsContainer');
  container.innerHTML = sub.topics.map(t => {
    const isDone = Boolean(t.doneAt);
    const due = isTopicDue(t);
    return `
      <div class="topic-card ${due ? 'due-border' : ''} ${isDone ? 'done-card' : ''}">
        <div class="check-circle ${isDone ? 'done' : ''}" onclick="quickToggleTopic('${sub.id}', '${t.id}')">
          ${isDone ? '✓' : ''}
        </div>
        <div class="topic-body" onclick="openTopicDetail('${sub.id}', '${t.id}')">
          <div class="topic-block">${t.block || 'Раздел ЕГЭ'}</div>
          <div class="topic-title ${isDone ? 'done' : ''}">${t.title}</div>
          <div class="topic-badges">
            ${t.note ? '<span class="mini-pill">💡 Памятка</span>' : ''}
            ${t.question ? `<span class="mini-pill">${t.solved ? '✅ Решено' : '⚡ Задача'}</span>` : ''}
            ${due ? '<span class="mini-pill due">Повторить!</span>' : ''}
          </div>
        </div>
      </div>
    `;
  }).join('');
}

window.quickToggleTopic = function(subId, topicId) {
  const sub = state.subjects.find(s => s.id === subId);
  const topic = sub.topics.find(t => t.id === topicId);
  if (!topic.doneAt) {
    topic.doneAt = Date.now();
    topic.stage = 0;
    logActivity(15);
  } else if (isTopicDue(topic)) {
    topic.doneAt = Date.now();
    topic.stage += 1;
    logActivity(10);
  } else {
    topic.doneAt = null;
    topic.stage = 0;
    saveState();
  }
  renderSubjectDetail();
  renderHomeView();
};

// --- Карточка темы (Памятка + Мини-задача) ---
let activeModalSubId = null;
let activeModalTopicId = null;
const topicModal = document.getElementById('topicModal');

window.openTopicDetail = function(subId, topicId) {
  activeModalSubId = subId;
  activeModalTopicId = topicId;
  const sub = state.subjects.find(s => s.id === subId);
  const topic = sub.topics.find(t => t.id === topicId);

  document.getElementById('detailBlockTag').textContent = topic.block || sub.name;
  document.getElementById('detailTitle').textContent = topic.title;
  document.getElementById('detailNote').textContent = topic.note || 'Памятка для этой темы пока не добавлена.';

  const quizBox = document.getElementById('detailQuizBox');
  const feedback = document.getElementById('quizFeedback');
  const input = document.getElementById('quizAnswerInput');
  feedback.classList.add('hidden');
  input.value = '';

  if (topic.question) {
    quizBox.classList.remove('hidden');
    document.getElementById('detailQuestion').textContent = topic.question;
  } else {
    quizBox.classList.add('hidden');
  }

  const toggleBtn = document.getElementById('modalToggleDoneBtn');
  if (!topic.doneAt) {
    toggleBtn.textContent = 'Отметить тему изученной (+50 XP)';
  } else if (isTopicDue(topic)) {
    toggleBtn.textContent = 'Подтвердить повторение темы';
  } else {
    toggleBtn.textContent = 'Снять отметку об изучении';
  }

  topicModal.classList.remove('hidden');
};

document.getElementById('closeTopicModal').addEventListener('click', () => topicModal.classList.add('hidden'));

document.getElementById('checkQuizBtn').addEventListener('click', () => {
  const sub = state.subjects.find(s => s.id === activeModalSubId);
  const topic = sub.topics.find(t => t.id === activeModalTopicId);
  const userAns = document.getElementById('quizAnswerInput').value.trim().toLowerCase().replace(',', '.');
  const rightAns = topic.answer.trim().toLowerCase().replace(',', '.');
  const feedback = document.getElementById('quizFeedback');

  feedback.classList.remove('hidden', 'ok', 'err');
  if (userAns === rightAns) {
    topic.solved = true;
    feedback.textContent = '✓ Верно! +30 XP начислено, стрик продлён.';
    feedback.classList.add('ok');
    logActivity(15);
    renderSubjectDetail();
    renderHomeView();
  } else {
    feedback.textContent = `✕ Неверно. Правильный ответ: ${topic.answer}`;
    feedback.classList.add('err');
  }
});

document.getElementById('modalToggleDoneBtn').addEventListener('click', () => {
  quickToggleTopic(activeModalSubId, activeModalTopicId);
  topicModal.classList.add('hidden');
});

// --- Добавление своей темы ---
const addModal = document.getElementById('addModal');
document.getElementById('addTopicBtn').addEventListener('click', () => {
  document.getElementById('newTopicTitle').value = '';
  document.getElementById('newTopicNote').value = '';
  addModal.classList.remove('hidden');
});
document.getElementById('cancelAddModal').addEventListener('click', () => addModal.classList.add('hidden'));
document.getElementById('confirmAddModal').addEventListener('click', () => {
  const title = document.getElementById('newTopicTitle').value.trim();
  const note = document.getElementById('newTopicNote').value.trim();
  if (!title) return;
  const sub = state.subjects.find(s => s.id === state.currentSubjectId);
  sub.topics.push({
    id: 'custom-' + Date.now(),
    block: 'Дополнительная тема',
    title,
    note,
    question: null,
    answer: null,
    doneAt: null,
    stage: 0,
    solved: false
  });
  saveState();
  renderSubjectDetail();
  renderHomeView();
  addModal.classList.add('hidden');
});

// --- ЭКРАН ТРЕНАЖЁРА СЛУЧАЙНЫХ ЗАДАНИЙ ---
let currentPracticeTask = null;
let practiceCombo = 0;
let practiceBestCombo = 0;
let practiceSessionSolved = 0;
let practiceAnsweredCurrent = false;

const pracSubSelect = document.getElementById('practiceSubjectSelect');
const pracTopicSelect = document.getElementById('practiceTopicSelect');

function initPracticeSelectors() {
  const prevSub = pracSubSelect.value || 'all';
  pracSubSelect.innerHTML = `<option value="all">🎲 Все предметы (Микс)</option>` +
    state.subjects.map(s => `<option value="${s.id}">${s.icon} ${s.name}</option>`).join('');
  pracSubSelect.value = prevSub;
  updatePracticeTopicOptions();
  if (!currentPracticeTask) loadNextPracticeTask();
}

function updatePracticeTopicOptions() {
  const selectedSub = pracSubSelect.value;
  if (selectedSub === 'all') {
    pracTopicSelect.innerHTML = `<option value="all">Все темы</option>`;
    return;
  }
  const sub = state.subjects.find(s => s.id === selectedSub);
  pracTopicSelect.innerHTML = `<option value="all">Все темы предмета</option>` +
    (sub ? sub.topics.map(t => `<option value="${t.id}">${t.title}</option>`).join('') : '');
}

function getPracticePool() {
  const subFilter = pracSubSelect.value;
  const topicFilter = pracTopicSelect.value;
  const pool = [];

  state.subjects.forEach(sub => {
    if (subFilter !== 'all' && sub.id !== subFilter) return;
    sub.topics.forEach(t => {
      if (topicFilter !== 'all' && t.id !== topicFilter) return;
      if (t.question && t.answer) {
        pool.push({
          subName: sub.name,
          block: t.block,
          topicTitle: t.title,
          note: t.note,
          q: t.question,
          a: t.answer
        });
      }
    if (Array.isArray(t.extraTasks)) {
        t.extraTasks.forEach(ex => {
          pool.push({
            subName: sub.name,
            block: t.block,
            topicTitle: t.title,
            note: t.note,
            q: ex.q,
            a: ex.a
          });
        });
      }
    });
  });

  return pool;
}

function loadNextPracticeTask() {
  const pool = getPracticePool();
  document.getElementById('pracPoolSize').textContent = pool.length;

  const feedback = document.getElementById('pracFeedback');
  const hintBox = document.getElementById('pracHintBox');
  const input = document.getElementById('pracAnswerInput');

  feedback.classList.add('hidden');
  hintBox.classList.add('hidden');
  input.value = '';
  practiceAnsweredCurrent = false;

  if (pool.length === 0) {
    document.getElementById('pracSubBadge').textContent = 'Нет задач';
    document.getElementById('pracBlockBadge').textContent = '';
    document.getElementById('pracTopicTitle').textContent = 'Для этой темы пока нет готовых задач';
    document.getElementById('pracQuestionText').textContent = 'Выберите другую тему или «Все темы».';
    currentPracticeTask = null;
    return;
  }

  let candidate = pool[Math.floor(Math.random() * pool.length)];
  if (pool.length > 1 && currentPracticeTask && candidate.q === currentPracticeTask.q) {
    candidate = pool[(pool.indexOf(candidate) + 1) % pool.length];
  }
  currentPracticeTask = candidate;

  document.getElementById('pracSubBadge').textContent = candidate.subName;
  document.getElementById('pracBlockBadge').textContent = candidate.block || 'ЕГЭ';
  document.getElementById('pracTopicTitle').textContent = candidate.topicTitle;
  document.getElementById('pracQuestionText').textContent = candidate.q;
  document.getElementById('pracHintText').textContent = candidate.note || 'Вспомните базовое правило или формулу из этого раздела.';
}

pracSubSelect.addEventListener('change', () => {
  updatePracticeTopicOptions();
  loadNextPracticeTask();
});
pracTopicSelect.addEventListener('change', () => loadNextPracticeTask());

document.getElementById('pracToggleHintBtn').addEventListener('click', () => {
  document.getElementById('pracHintBox').classList.toggle('hidden');
});

document.getElementById('pracNextBtn').addEventListener('click', () => {
  loadNextPracticeTask();
});

document.getElementById('pracCheckBtn').addEventListener('click', () => {
  if (!currentPracticeTask) return;
  const userAns = document.getElementById('pracAnswerInput').value.trim().toLowerCase().replace(',', '.');
  const rightAns = currentPracticeTask.a.trim().toLowerCase().replace(',', '.');
  const feedback = document.getElementById('pracFeedback');

  if (!userAns) return;
  feedback.classList.remove('hidden', 'ok', 'err');

  if (userAns === rightAns) {
    if (!practiceAnsweredCurrent) {
      practiceAnsweredCurrent = true;
      practiceCombo++;
      practiceSessionSolved++;
      if (practiceCombo > practiceBestCombo) practiceBestCombo = practiceCombo;
      state.practiceSolvedTotal = (state.practiceSolvedTotal || 0) + 1;
      logActivity(15);
      renderHomeView();
    }
    document.getElementById('practiceComboBadge').textContent = `⚡ Комбо: ${practiceCombo}`;
    document.getElementById('pracSessionSolved').textContent = practiceSessionSolved;
    document.getElementById('pracBestCombo').textContent = practiceBestCombo;

    feedback.textContent = `✓ Верно! +30 XP (серия комбо: ${practiceCombo})`;
    feedback.classList.add('ok');
  } else {
    practiceCombo = 0;
    document.getElementById('practiceComboBadge').textContent = `⚡ Комбо: 0`;
    feedback.textContent = `✕ Неверно. Правильный ответ: ${currentPracticeTask.a}`;
    feedback.classList.add('err');
  }
});

// --- Таймер и учёт времени ---
let totalSeconds = 25 * 60;
let remainingSeconds = totalSeconds;
let timerType = 'work';
let timerInterval = null;
let endTime = null;

if (!state.sessions) state.sessions = [];

const circle = document.querySelector('.progress-ring__circle');
const radius = circle.r.baseVal.value;
const circumference = 2 * Math.PI * radius;
circle.style.strokeDasharray = `${circumference} ${circumference}`;

function setTimerMinutes(mins, type = 'work') {
  if (timerInterval) return;
  const clamped = Math.max(1, Math.min(300, mins));
  totalSeconds = clamped * 60;
  remainingSeconds = totalSeconds;
  timerType = type;
  document.getElementById('timerStatus').textContent = type === 'work' ? 'Готов к старту' : 'Время отдыха';
  updateTimerUI();
}

function updateTimerUI() {
  const mins = Math.floor(remainingSeconds / 60).toString().padStart(2, '0');
  const secs = (remainingSeconds % 60).toString().padStart(2, '0');
  document.getElementById('timeText').textContent = `${mins}:${secs}`;
  circle.style.strokeDashoffset = circumference - (remainingSeconds / totalSeconds) * circumference;
}

document.querySelectorAll('.pill').forEach(pill => {
  pill.addEventListener('click', () => {
    if (timerInterval) return;
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    pill.classList.add('active');
    setTimerMinutes(parseInt(pill.dataset.minutes, 10), pill.dataset.type);
  });
});

document.getElementById('minus5Btn').addEventListener('click', () => {
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  setTimerMinutes(Math.round(totalSeconds / 60) - 5, 'work');
});

document.getElementById('plus5Btn').addEventListener('click', () => {
  document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
  setTimerMinutes(Math.round(totalSeconds / 60) + 5, 'work');
});

document.getElementById('customTimeBtn').addEventListener('click', () => {
  if (timerInterval) return;
  const val = prompt('Введите длительность таймера в минутах (от 1 до 240):', Math.round(totalSeconds / 60));
  const parsed = parseInt(val, 10);
  if (!isNaN(parsed) && parsed > 0) {
    document.querySelectorAll('.pill').forEach(p => p.classList.remove('active'));
    setTimerMinutes(parsed, 'work');
  }
});

function commitStudyMinutes(mins, sourceLabel) {
  if (mins <= 0) return;
  const subId = document.getElementById('activeSubject').value;
  const sub = state.subjects.find(s => s.id === subId) || state.subjects[0];
  if (sub) sub.minutes += mins;

  state.sessions.unshift({
    date: getTodayKey(),
    time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    subjectName: sub ? sub.name : 'Предмет',
    minutes: mins,
    source: sourceLabel
  });

  logActivity(mins);
  renderHomeView();
  renderTodaySessions();
}

const startPauseBtn = document.getElementById('startPauseBtn');
const finishEarlyBtn = document.getElementById('finishEarlyBtn');
const timeAdjustRow = document.getElementById('timeAdjustRow');

startPauseBtn.addEventListener('click', () => {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    startPauseBtn.textContent = 'Продолжить';
    document.getElementById('timerStatus').textContent = 'Пауза';
  } else {
    endTime = Date.now() + remainingSeconds * 1000;
    startPauseBtn.textContent = 'Пауза';
    timeAdjustRow.classList.add('hidden');
    if (timerType === 'work') finishEarlyBtn.classList.remove('hidden');
    document.getElementById('timerStatus').textContent = timerType === 'work' ? 'Идёт фокус...' : 'Отдых...';

    timerInterval = setInterval(() => {
      remainingSeconds = Math.max(0, Math.round((endTime - Date.now()) / 1000));
      updateTimerUI();
      if (remainingSeconds <= 0) {
        clearInterval(timerInterval);
        timerInterval = null;
        startPauseBtn.textContent = 'Запустить';
        finishEarlyBtn.classList.add('hidden');
        timeAdjustRow.classList.remove('hidden');
        if (timerType === 'work') {
          commitStudyMinutes(Math.round(totalSeconds / 60), 'Таймер');
        }
        remainingSeconds = totalSeconds;
        document.getElementById('timerStatus').textContent = 'Сессия завершена!';
        updateTimerUI();
      }
    }, 500);
  }
});

finishEarlyBtn.addEventListener('click', () => {
  const elapsedMins = Math.max(1, Math.round((totalSeconds - remainingSeconds) / 60));
  clearInterval(timerInterval);
  timerInterval = null;
  commitStudyMinutes(elapsedMins, 'Таймер (досрочно)');
  remainingSeconds = totalSeconds;
  startPauseBtn.textContent = 'Запустить';
  finishEarlyBtn.classList.add('hidden');
  timeAdjustRow.classList.remove('hidden');
  document.getElementById('timerStatus').textContent = `Засчитано ${elapsedMins} мин!`;
  updateTimerUI();
});

document.getElementById('resetBtn').addEventListener('click', () => {
  clearInterval(timerInterval);
  timerInterval = null;
  remainingSeconds = totalSeconds;
  startPauseBtn.textContent = 'Запустить';
  finishEarlyBtn.classList.add('hidden');
  timeAdjustRow.classList.remove('hidden');
  document.getElementById('timerStatus').textContent = 'Готов к старту';
  updateTimerUI();
});

document.querySelectorAll('.chip-min').forEach(chip => {
  chip.addEventListener('click', () => {
    const input = document.getElementById('manualMinutesInput');
    const current = parseInt(input.value, 10) || 0;
    input.value = current + parseInt(chip.dataset.add, 10);
  });
});

document.getElementById('addManualTimeBtn').addEventListener('click', () => {
  const input = document.getElementById('manualMinutesInput');
  const mins = parseInt(input.value, 10);
  if (isNaN(mins) || mins <= 0) return;
  commitStudyMinutes(mins, 'Вручную');
  input.value = '';
});

function renderTodaySessions() {
  const today = getTodayKey();
  const todayList = (state.sessions || []).filter(s => s.date === today);
  const totalTodayMins = todayList.reduce((acc, s) => acc + s.minutes, 0);

  document.getElementById('todayTotalBadge').textContent = `${totalTodayMins} мин`;
  const container = document.getElementById('todaySessionsList');

  if (todayList.length === 0) {
    container.innerHTML = '<div class="session-meta">Сегодня пока нет записанных занятий</div>';
    return;
  }

  container.innerHTML = todayList.slice(0, 5).map(s => `
    <div class="session-row">
      <div>
        <strong>${s.subjectName}</strong>
        <div class="session-meta">${s.source} · в ${s.time}</div>
      </div>
      <strong style="color:#22d3ee;">+${s.minutes} мин</strong>
    </div>
  `).join('');
}

// --- ЭКРАН АЧИВОК ---
let currentAchFilter = 'all';

document.querySelectorAll('.ach-filter').forEach(btn => {
  btn.addEventListener('click', () => {
    document.querySelectorAll('.ach-filter').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentAchFilter = btn.dataset.filter;
    renderAchievementsView();
  });
});

function renderAchievementsView() {
  const metrics = getPlayerMetrics();
  const rank = getRankInfo();

  document.getElementById('playerRankIcon').textContent = rank.icon;
  document.getElementById('playerLevel').textContent = rank.level;
  document.getElementById('playerTitle').textContent = rank.title;
  document.getElementById('playerXp').textContent = rank.currentLvlXp;
  document.getElementById('playerNextXp').textContent = rank.xpPerLevel;
  document.getElementById('playerXpBar').style.width = `${Math.round((rank.currentLvlXp / rank.xpPerLevel) * 100)}%`;

  const unlockedCount = state.unlockedAchievements.length;
  document.getElementById('achUnlockedCount').textContent = `${unlockedCount}/${ACHIEVEMENTS_DB.length}`;

  const list = document.getElementById('achievementsList');
  const filtered = ACHIEVEMENTS_DB.filter(ach => {
    const isUnlocked = state.unlockedAchievements.includes(ach.id);
    if (currentAchFilter === 'unlocked') return isUnlocked;
    if (currentAchFilter === 'locked') return !isUnlocked;
    return true;
  });

  list.innerHTML = filtered.map(ach => {
    const isUnlocked = state.unlockedAchievements.includes(ach.id);
    const currentVal = Math.min(ach.target, ach.getVal(metrics));
    const pct = Math.round((currentVal / ach.target) * 100);
    const isSecretLocked = ach.id === 'night-owl' && !isUnlocked;

    return `
      <div class="ach-card ${isUnlocked ? 'unlocked ' + ach.rarity : 'locked'}">
        <div class="ach-icon">${isSecretLocked ? '❓' : ach.icon}</div>
        <div class="ach-content">
          <div class="ach-header-row">
            <span class="ach-name">${isSecretLocked ? 'Секретное достижение' : ach.name}</span>
            <span class="rarity-badge ${ach.rarity}">${ach.rarityLabel} · +${ach.xp} XP</span>
          </div>
          <div class="ach-desc">${isSecretLocked ? 'Выполни особое скрытое условие во время подготовки...' : ach.desc}</div>
          <div class="ach-progress-row">
            <div class="ach-bar-bg">
              <div class="ach-bar-fill" style="width: ${isUnlocked ? 100 : pct}%"></div>
            </div>
            <span class="ach-prog-num">${isUnlocked ? 'Получено ✓' : `${currentVal} / ${ach.target}`}</span>
          </div>
        </div>
      </div>
    `;
  }).join('');

  document.getElementById('statTopicsDone').textContent = `${metrics.doneTopics} / ${metrics.totalTopics}`;
  document.getElementById('statQuizzesSolved').textContent = metrics.totalPracticeSolved;
  document.getElementById('statTotalHours').textContent = (metrics.totalMinutes / 60).toFixed(1) + ' ч';

  document.getElementById('subjectBreakdown').innerHTML = state.subjects.map(s => {
    const done = s.topics.filter(t => t.doneAt).length;
    return `
      <div class="breakdown-item">
        <span>${s.name}</span>
        <strong>${done}/${s.topics.length} тем · ${s.minutes} мин</strong>
      </div>
    `;
  }).join('');
}

// Инициализация
updateTimerUI();
checkAchievements();
renderHomeView();
initPracticeSelectors();
renderTodaySessions();
renderAchievementsView();