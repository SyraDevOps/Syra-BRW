function createParticles() {
  const particlesContainer = document.getElementById('particles');
  if (!particlesContainer) return;
  
  const count = 40;
  
  for (let i = 0; i < count; i++) {
    const particle = document.createElement('div');
    particle.classList.add('particle');
    
    // Tamanho aleatório entre 2px e 6px
    const size = Math.random() * 4 + 2;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    
    // Posição aleatória
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.top = `${Math.random() * 100}%`;
    
    // Opacidade aleatória
    particle.style.opacity = Math.random() * 0.5;
    
    // Animação
    particle.style.animation = `floatParticle ${Math.random() * 10 + 10}s linear infinite`;
    particle.style.animationDelay = `${Math.random() * 5}s`;
    
    particlesContainer.appendChild(particle);
  }
}

// Inicializa os elementos quando o DOM estiver completamente carregado
document.addEventListener('DOMContentLoaded', function() {
  // Execute após um pequeno atraso para garantir que DOM esteja completamente carregado
  setTimeout(createParticles, 100);
});