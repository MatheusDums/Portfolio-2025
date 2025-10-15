// Theme Toggle

// Theme Toggle
const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;
const icon = themeToggle.querySelector('i');

let currentTheme = 'light';

themeToggle.addEventListener('click', () => {
    if (currentTheme === 'light') {
        html.setAttribute('data-theme', 'dark');
        icon.classList.remove('fa-moon');
        icon.classList.add('fa-sun');
        currentTheme = 'dark';
    } else {
        html.removeAttribute('data-theme');
        icon.classList.remove('fa-sun');
        icon.classList.add('fa-moon');
        currentTheme = 'light';
    }
});

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
            
            // Fechar menu mobile após clicar
            const navbarCollapse = document.querySelector('.navbar-collapse');
            if (navbarCollapse.classList.contains('show')) {
                navbarCollapse.classList.remove('show');
            }
        }
    });
});

// Navbar Shadow on Scroll
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.style.boxShadow = '0 5px 20px rgba(0,0,0,0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
    }
});

// Form Submission
const contactForm = document.getElementById('contactForm');
const statusDiv = document.getElementById('mensagemStatus');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Coleta os dados do formulário
        const formData = new FormData(contactForm);
        
        try {
            // Envia os dados para o PHP
            const response = await fetch('processar_formulario.php', {
                method: 'POST',
                body: formData
            });
            
            const result = await response.json();
            
            if (result.success) {
                // Limpa o formulário e mostra mensagem de sucesso
                contactForm.reset();
                statusDiv.textContent = result.message;
                statusDiv.style.color = 'var(--accent)';
            } else {
                // Mostra mensagem de erro
                statusDiv.textContent = result.message;
                statusDiv.style.color = '#dc3545';
            }
            
            // Mostra a mensagem
            statusDiv.style.display = 'block';
            
            // Esconde a mensagem após 3 segundos
            setTimeout(() => {
                statusDiv.style.display = 'none';
            }, 3000);

        } catch (error) {
            console.error('Erro ao enviar mensagem:', error);
            statusDiv.textContent = 'Erro ao enviar mensagem. Por favor, tente novamente.';
            statusDiv.style.color = '#dc3545';
            statusDiv.style.display = 'block';
        }
    });
}