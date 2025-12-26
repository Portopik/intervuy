document.addEventListener('DOMContentLoaded', function() {
    // Находим все элементы вопросов
    const questionItems = document.querySelectorAll('.question-item');
    
    // Добавляем обработчик клика на каждый вопрос
    questionItems.forEach(item => {
        const header = item.querySelector('.question-header');
        
        header.addEventListener('click', function() {
            // Закрываем другие открытые вопросы
            questionItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    closeQuestion(otherItem);
                }
            });
            
            // Открываем/закрываем текущий вопрос
            toggleQuestion(item);
        });
    });
    
    // Функция для переключения состояния вопроса
    function toggleQuestion(item) {
        if (item.classList.contains('active')) {
            closeQuestion(item);
        } else {
            openQuestion(item);
        }
    }
    
    // Функция открытия вопроса
    function openQuestion(item) {
        item.classList.add('active');
        
        // Добавляем небольшую задержку для плавности
        setTimeout(() => {
            const answerContent = item.querySelector('.answer-content');
            answerContent.style.maxHeight = answerContent.scrollHeight + 'px';
        }, 10);
    }
    
    // Функция закрытия вопроса
    function closeQuestion(item) {
        const answerContent = item.querySelector('.answer-content');
        answerContent.style.maxHeight = '0';
        
        // Удаляем класс active после завершения анимации
        setTimeout(() => {
            item.classList.remove('active');
        }, 300);
    }
    
    // Открываем первый вопрос по умолчанию (опционально)
    // openQuestion(questionItems[0]);
    
    // Добавляем поддержку клавиатуры
    questionItems.forEach(item => {
        const header = item.querySelector('.question-header');
        
        header.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                header.click();
            }
        });
        
        // Делаем элемент доступным для таб-навигации
        header.setAttribute('tabindex', '0');
        header.setAttribute('role', 'button');
        header.setAttribute('aria-expanded', 'false');
    });
});
