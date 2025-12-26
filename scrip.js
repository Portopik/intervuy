document.addEventListener('DOMContentLoaded', function() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    // Открываем первый вопрос при загрузке
    if (faqItems.length > 0) {
        openFaqItem(faqItems[0]);
    }
    
    // Добавляем обработчики на все вопросы
    faqItems.forEach(item => {
        const questionBtn = item.querySelector('.faq-question');
        
        questionBtn.addEventListener('click', function() {
            // Закрываем другие открытые вопросы
            faqItems.forEach(otherItem => {
                if (otherItem !== item && otherItem.classList.contains('active')) {
                    closeFaqItem(otherItem);
                }
            });
            
            // Открываем/закрываем текущий вопрос
            if (item.classList.contains('active')) {
                closeFaqItem(item);
            } else {
                openFaqItem(item);
            }
        });
        
        // Поддержка клавиатуры
        questionBtn.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                this.click();
            }
        });
        
        // Атрибуты доступности
        questionBtn.setAttribute('aria-expanded', 'false');
        questionBtn.setAttribute('role', 'button');
    });
    
    // Функция открытия вопроса
    function openFaqItem(item) {
        const answer = item.querySelector('.faq-answer');
        const answerContent = item.querySelector('.answer-content');
        
        // Получаем реальную высоту контента
        const contentHeight = answerContent.scrollHeight;
        
        // Устанавливаем высоту для анимации
        answer.style.maxHeight = contentHeight + 'px';
        
        // Добавляем класс active
        item.classList.add('active');
        
        // Обновляем атрибуты доступности
        const btn = item.querySelector('.faq-question');
        btn.setAttribute('aria-expanded', 'true');
        
        // Ждем завершения анимации, затем сбрасываем max-height
        setTimeout(() => {
            if (item.classList.contains('active')) {
                answer.style.maxHeight = 'none';
            }
        }, 500);
    }
    
    // Функция закрытия вопроса
    function closeFaqItem(item) {
        const answer = item.querySelector('.faq-answer');
        const answerContent = item.querySelector('.answer-content');
        
        // Получаем текущую высоту
        const contentHeight = answerContent.scrollHeight;
        
        // Временно устанавливаем фиксированную высоту перед анимацией
        answer.style.maxHeight = contentHeight + 'px';
        
        // Ждем следующего кадра для начала анимации
        requestAnimationFrame(() => {
            // Запускаем анимацию закрытия
            answer.style.maxHeight = '0';
            
            // Удаляем класс active после анимации
            setTimeout(() => {
                item.classList.remove('active');
                answer.style.maxHeight = '';
                
                // Обновляем атрибуты доступности
                const btn = item.querySelector('.faq-question');
                btn.setAttribute('aria-expanded', 'false');
            }, 300);
        });
    }
    
    // Анимация для кнопок
    const buttons = document.querySelectorAll('.btn');
    buttons.forEach(btn => {
        btn.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-3px)';
        });
        
        btn.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });
});
