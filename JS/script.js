 // Toggle hamburger menu
 function toggleMenu() {
    const menu = document.querySelector('.nav-menu');
    const hamburger = document.querySelector('.hamburger');
    menu.classList.toggle('active');
    hamburger.classList.toggle('active');
  }

  // Smooth scroll with navbar offset
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      e.preventDefault();
      const targetId = this.getAttribute('href');
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        const navbarHeight = document.querySelector('.navbar').offsetHeight;
        const scrollPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
        window.scrollTo({
          top: scrollPosition,
          behavior: 'smooth'
        });
      }
    });
  });

  // Fade-in animation on scroll
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('.fade-in').forEach(element => {
    observer.observe(element);
  });

  // Theme toggle
  function toggleTheme() {
    const body = document.body;
    const themeToggle = document.querySelector('.theme-toggle i');
    const currentTheme = body.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    body.setAttribute('data-theme', currentTheme);
    themeToggle.className = currentTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
    localStorage.setItem('theme', currentTheme);
  }

  // Apply saved theme on load
  document.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme') || 'dark';
    document.body.setAttribute('data-theme', savedTheme);
    const themeToggle = document.querySelector('.theme-toggle i');
    themeToggle.className = savedTheme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
  });

  // Form submission with AJAX for Formspree
  document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();
    const form = this;
    const formData = new FormData(form);

    fetch('https://formspree.io/f/xanokrdl', {
      method: 'POST',
      body: formData,
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(response => {
      if (response.ok) {
        // Show success pop-up
        const popup = document.getElementById('success-popup');
        popup.style.display = 'flex';
        setTimeout(() => popup.classList.add('show'), 10);
        // Clear form fields
        form.reset();
      } else {
        return response.json().then(errorData => {
          throw new Error(errorData.error || 'Failed to send message');
        });
      }
    })
    .catch(error => {
      console.error('Error:', error);
      alert('There was an error sending your message: ' + error.message + '. Please try again or contact me directly.');
    });
  });

  // Close pop-up
  function closePopup() {
    const popup = document.getElementById('success-popup');
    popup.classList.remove('show');
    setTimeout(() => popup.style.display = 'none', 500);
  }