
document.addEventListener('DOMContentLoaded', () => {
  // Loader
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    loader.classList.add('hidden');
  });

  // Navigation toggle for mobile
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');

  navToggle.addEventListener('click', () => {
    navToggle.classList.toggle('active');
    navMenu.classList.toggle('show');
  });

  // Smooth scroll for nav links
  document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const targetID = link.getAttribute('href').slice(1);
      const targetSection = document.getElementById(targetID);
      if (targetSection) {
        targetSection.scrollIntoView({ behavior: 'smooth' });
      }
      // Close menu if on mobile
      if (navMenu.classList.contains('show')) {
        navMenu.classList.remove('show');
        navToggle.classList.remove('active');
      }
    });
  });

  // Back to Top button
  const backToTop = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 300) {
      backToTop.classList.add('show');
    } else {
      backToTop.classList.remove('show');
    }
  });

  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Modal handling
  const modal = document.getElementById('success-modal');
  window.openModal = () => {
    modal.classList.add('show');
  };
  window.closeModal = () => {
    modal.classList.remove('show');
  };

  // Replace with your actual web app URL
const SHEET_API_URL = 'https://script.google.com/macros/s/AKfycbyxrSW-KJJ6UJn3MghMabyK0PKnJXvQzDKy22Dna5n0kfUUfGzv-L4Sk2WM0NY9qhtHLA/exec';

async function sendMessageToSheet(data) {
  try {
    const response = await fetch(SHEET_API_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    });
    const resultText = await response.text();
    if (resultText === 'Success') {
      return 'Success';
    } else {
      throw new Error('Failed to save message');
    }
  } catch (error) {
    console.error(error);
    return 'Error';
  }
}

const contactForm = document.getElementById('contact-form');

contactForm.addEventListener('submit', async (e) => {
  e.preventDefault();

  const data = {
    name: document.getElementById('name').value,
    email: document.getElementById('email').value,
    subject: document.getElementById('subject').value,
    message: document.getElementById('message').value,
  };

  const result = await sendMessageToSheet(data);
  if (result === 'Success') {
    openModal();
    contactForm.reset();
  } else {
    alert('Failed to send message. Please try again.');
  }
});

  // Animate skill bars when visible
  const skillProgresses = document.querySelectorAll('.skill-progress');
  const observerOptions = {
    threshold: 0.5
  };
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const progress = entry.target;
        const width = progress.getAttribute('data-width');
        progress.style.width = width;
        observer.unobserve(progress);
      }
    });
  }, observerOptions);
  skillProgresses.forEach(sp => observer.observe(sp));
});





