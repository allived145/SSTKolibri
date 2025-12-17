document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            const navbarToggler = document.querySelector('.navbar-toggler');
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if(navbarToggler && !navbarToggler.classList.contains('collapsed')) {
                navbarToggler.click();
            }
        }
    });
});

const scrollTopBtn = document.getElementById('scrollTop');

window.addEventListener('scroll', function() {
    if (window.pageYOffset > 300) {
        scrollTopBtn.classList.add('visible');
    } else {
        scrollTopBtn.classList.remove('visible');
    }
    
    const navbar = document.getElementById('mainNav');
    if (window.pageYOffset > 100) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

document.querySelectorAll('.gallery-tab').forEach(tab => {
    tab.addEventListener('click', function() {
        document.querySelectorAll('.gallery-tab').forEach(t => {
            t.classList.remove('active');
            t.classList.remove('btn-primary');
            t.classList.add('btn-outline-primary');
        });
        
        this.classList.add('active');
        this.classList.remove('btn-outline-primary');
        this.classList.add('btn-primary');
        
        document.querySelectorAll('.gallery-content').forEach(content => {
            content.classList.remove('active');
        });
        
        const tabId = this.getAttribute('data-tab');
        const selectedGallery = document.getElementById(`${tabId}-gallery`);
        if (selectedGallery) {
            selectedGallery.classList.add('active');
        }
    });
});

document.querySelectorAll('.faq-question').forEach(question => {
    question.addEventListener('click', function() {
        const answer = this.nextElementSibling;
        const icon = this.querySelector('i');
        
        document.querySelectorAll('.faq-answer').forEach(ans => {
            if (ans !== answer) {
                ans.classList.remove('active');
                const prevIcon = ans.previousElementSibling.querySelector('i');
                if (prevIcon) {
                    prevIcon.classList.remove('fa-chevron-up');
                    prevIcon.classList.add('fa-chevron-down');
                }
            }
        });
        
        if(answer.classList.contains('active')) {
            answer.classList.remove('active');
            icon.classList.remove('fa-chevron-up');
            icon.classList.add('fa-chevron-down');
        } else {
            answer.classList.add('active');
            icon.classList.remove('fa-chevron-down');
            icon.classList.add('fa-chevron-up');
        }
    });
});

const routeBtn = document.getElementById('buildRoute');
if (routeBtn) {
    routeBtn.addEventListener('click', function(e) {
        e.preventDefault();
        const address = encodeURIComponent('пр. 9-й Пятилетки, 26-А, Чебоксары');
        window.open(`https://yandex.ru/maps/?text=${address}`, '_blank');
    });
}

document.addEventListener('DOMContentLoaded', function() {
    const logoImg = document.querySelector('.logo-img');
    const logoFallback = document.querySelector('.logo-fallback');
    
    if (logoImg) {
        logoImg.onerror = function() {
            this.style.display = 'none';
            if (logoFallback) {
                logoFallback.style.display = 'flex';
            }
        };
        if (logoImg.complete && logoImg.naturalHeight !== 0) {
            if (logoFallback) {
                logoFallback.style.display = 'none';
            }
        }
    }
    
    const footerLogoImg = document.querySelector('.logo-footer-img');
    const footerLogoFallback = document.querySelector('.logo-footer-fallback');
    
    if (footerLogoImg) {
        footerLogoImg.onerror = function() {
            this.style.display = 'none';
            if (footerLogoFallback) {
                footerLogoFallback.style.display = 'flex';
            }
        };
        
        if (footerLogoImg.complete && footerLogoImg.naturalHeight !== 0) {
            if (footerLogoFallback) {
                footerLogoFallback.style.display = 'none';
            }
        }
    }
    
    const trainerImg = document.querySelector('.trainer-img');
    const trainerFallback = document.querySelector('.trainer-img-fallback');
    
    if (trainerImg) {
        trainerImg.onerror = function() {
            this.style.display = 'none';
            if (trainerFallback) {
                trainerFallback.style.display = 'flex';
            }
        };
        
        if (trainerImg.complete && trainerImg.naturalHeight !== 0) {
            if (trainerFallback) {
                trainerFallback.style.display = 'none';
            }
        }
    }
    
    const firstGallery = document.querySelector('.gallery-content');
    if (firstGallery) {
        firstGallery.classList.add('active');
    }
    
    const firstTab = document.querySelector('.gallery-tab');
    if (firstTab) {
        firstTab.classList.add('active');
        firstTab.classList.remove('btn-outline-primary');
        firstTab.classList.add('btn-primary');
    }
    
    initializeAnimations();
    
    initializeGalleryTabs();
});

function initializeGalleryTabs() {
    const tabs = ['all', 'training', 'performances', 'awards'];
    tabs.forEach(tab => {
        const gallery = document.getElementById(`${tab}-gallery`);
        if (!gallery) {
            const allGallery = document.getElementById('all-gallery');
            if (allGallery && tab !== 'all') {
                const newGallery = allGallery.cloneNode(true);
                newGallery.id = `${tab}-gallery`;
                newGallery.classList.remove('active');
                allGallery.parentNode.insertBefore(newGallery, allGallery.nextSibling);
            }
        }
    });
}

function initializeAnimations() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);
    
    document.querySelectorAll('.feature-card, .timeline-stage, .contact-card, .gallery-item').forEach(el => {
        observer.observe(el);
    });
}

document.querySelectorAll('.gallery-item img').forEach(img => {
    img.onerror = function() {
        this.src = 'https://images.unsplash.com/photo-1547153760-18fc86324498?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80';
    };
});
document.getElementById('preRegistrationForm')?.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const formData = {
        childName: document.getElementById('childName').value,
        childAge: document.getElementById('childAge').value,
        parentName: document.getElementById('parentName').value,
        phone: document.getElementById('phone').value,
        email: document.getElementById('email').value,
        comment: document.getElementById('comment').value,
        timestamp: new Date().toISOString(),
        type: 'pre-registration'
    };
    
    const phoneRegex = /^\+7\s?\(?\d{3}\)?\s?\d{3}-?\d{2}-?\d{2}$/;
    if (!phoneRegex.test(formData.phone.replace(/\s/g, ''))) {
        showAlert('Пожалуйста, введите корректный номер телефона в формате +7 (XXX) XXX-XX-XX', 'danger');
        return;
    }
    
    const submitBtn = this.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin me-2"></i> Отправка...';
    submitBtn.disabled = true;
    
    setTimeout(() => {
        const form = document.getElementById('preRegistrationForm');
        const successHTML = `
            <div class="success-message" style="display: block;">
                <div class="success-icon mb-4">
                    <i class="fas fa-check"></i>
                </div>
                <h4 class="mb-3">Заявка принята</h4>
                <p class="text-muted mb-4">Ваша предварительная заявка успешно отправлена. Мы свяжемся с вами для подтверждения записи с 15 августа 2025 года.</p>
                <div class="alert alert-info">
                    <p class="mb-2"><strong>Номер вашей заявки:</strong> #${Date.now().toString().slice(-6)}</p>
                    <p class="mb-0 small">Сохраните этот номер для отслеживания статуса.</p>
                </div>
                <button type="button" class="btn btn-primary mt-3" data-bs-dismiss="modal">
                    Закрыть
                </button>
            </div>
        `;
        
        form.innerHTML = successHTML;
        
        console.log('Заявка на запись отправлена:', formData);
        
    }, 1500);
});

function showAlert(message, type) {
    const alertDiv = document.createElement('div');
    alertDiv.className = `alert alert-${type} alert-dismissible fade show mb-4`;
    alertDiv.innerHTML = `
        ${message}
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    `;
    
    const form = document.getElementById('preRegistrationForm');
    form.parentNode.insertBefore(alertDiv, form);
    
    setTimeout(() => {
        if (alertDiv.parentNode) {
            const bsAlert = new bootstrap.Alert(alertDiv);
            bsAlert.close();
        }
    }, 5000);
}

document.getElementById('phone')?.addEventListener('input', function(e) {
    let value = this.value.replace(/\D/g, '');
    
    if (value.startsWith('7') || value.startsWith('8')) {
        value = '+7' + value.slice(1);
    } else if (value.startsWith('9')) {
        value = '+7' + value;
    }
    
    if (value.length > 2) {
        value = value.slice(0, 2) + ' (' + value.slice(2);
    }
    if (value.length > 7) {
        value = value.slice(0, 7) + ') ' + value.slice(7);
    }
    if (value.length > 12) {
        value = value.slice(0, 12) + '-' + value.slice(12);
    }
    if (value.length > 15) {
        value = value.slice(0, 15) + '-' + value.slice(15);
    }
    if (value.length > 18) {
        value = value.slice(0, 18);
    }
    
    this.value = value;
});

document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('[data-registration-modal]').forEach(button => {
        button.addEventListener('click', function(e) {
            e.preventDefault();
            const modal = new bootstrap.Modal(document.getElementById('registrationModal'));
            modal.show();
        });
    });
});

