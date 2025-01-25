// Initialize particles.js with updated configuration
particlesJS('particles-js', {
  particles: {
    number: { value: 120 },
    color: { value: ['#00d4ff', '#004c70', '#00ff95'] },
    shape: {
      type: 'circle',
      polygon: { nb_sides: 6 }
    },
    opacity: {
      value: 0.5,
      random: true,
      anim: {
        enable: true,
        speed: 1.5,
        opacity_min: 0.2,
        sync: false
      }
    },
    line_linked: {
      enable: true,
      distance: 180,
      color: '#00d4ff',
      opacity: 0.3,
      width: 1.2,
      triangles: {
        enable: true,
        color: '#004c70',
        opacity: 0.1
      }
    },
    move: {
      enable: true,
      speed: 2.5,
      direction: 'none',
      random: true,
      straight: false,
      out_mode: 'out',
      attract: {
        enable: true,
        rotateX: 800,
        rotateY: 1600
      }
    }
  },
  interactivity: {
    detect_on: 'canvas',
    events: {
      onhover: {
        enable: true,
        mode: ['grab', 'bubble']
      },
      onclick: {
        enable: true,
        mode: 'push'
      },
      resize: true
    },
    modes: {
      grab: {
        distance: 140,
        line_linked: {
          opacity: 1
        }
      },
      bubble: {
        distance: 200,
        size: 6,
        duration: 0.3,
        opacity: 0.8,
        speed: 3
      },
      push: {
        particles_nb: 4
      }
    }
  },
  retina_detect: true
});

// Enhanced background data visualization
const canvas = document.createElement('canvas');
canvas.id = 'dataVizBackground';
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-2';
canvas.style.opacity = '0.15';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// New visualization elements
function drawDataViz() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  const time = Date.now() * 0.001;

  // Draw code-like patterns
  ctx.strokeStyle = '#004c70';
  ctx.lineWidth = 1;
  for(let y = 0; y < canvas.height; y += 40) {
    const lineLength = Math.sin(time + y * 0.1) * 100 + 150;
    ctx.beginPath();
    ctx.moveTo(50, y);
    ctx.lineTo(50 + lineLength, y);
    ctx.stroke();
  }

  // Draw scatter plot visualization
  ctx.fillStyle = '#00d4ff';
  for(let i = 0; i < 30; i++) {
    const x = Math.sin(time + i) * canvas.width/5 + canvas.width/2;
    const y = Math.cos(time + i * 1.5) * canvas.height/5 + canvas.height/2;
    ctx.beginPath();
    ctx.arc(x, y, 2, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw animated line chart
  ctx.strokeStyle = '#00ff95';
  ctx.lineWidth = 2;
  ctx.beginPath();
  for(let x = 0; x < canvas.width; x += 20) {
    const y = canvas.height/2 + 
             Math.sin(x * 0.02 + time) * 50 + 
             Math.cos(x * 0.01 + time) * 25;
    if(x === 0) {
      ctx.moveTo(x, y);
    } else {
      ctx.lineTo(x, y);
    }
  }
  ctx.stroke();

  // Draw bar chart visualization
  const barWidth = 15;
  const barCount = 10;
  const barSpacing = 25;
  const startX = canvas.width - (barWidth + barSpacing) * barCount - 50;
  
  for(let i = 0; i < barCount; i++) {
    const height = Math.abs(Math.sin(time + i * 0.5)) * 100;
    const x = startX + i * (barWidth + barSpacing);
    const y = canvas.height - height - 50;
    
    const gradient = ctx.createLinearGradient(x, y, x, y + height);
    gradient.addColorStop(0, '#00d4ff');
    gradient.addColorStop(1, '#004c70');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(x, y, barWidth, height);
  }

  // Draw network nodes
  ctx.strokeStyle = '#004c70';
  ctx.fillStyle = '#00d4ff';
  const nodes = [];
  for(let i = 0; i < 5; i++) {
    nodes.push({
      x: Math.cos(time + i) * 100 + canvas.width/4,
      y: Math.sin(time + i) * 100 + canvas.height/4
    });
  }
  
  // Connect nodes
  for(let i = 0; i < nodes.length; i++) {
    for(let j = i + 1; j < nodes.length; j++) {
      ctx.beginPath();
      ctx.moveTo(nodes[i].x, nodes[i].y);
      ctx.lineTo(nodes[j].x, nodes[j].y);
      ctx.stroke();
    }
  }
  
  // Draw nodes
  nodes.forEach(node => {
    ctx.beginPath();
    ctx.arc(node.x, node.y, 4, 0, Math.PI * 2);
    ctx.fill();
  });

  requestAnimationFrame(drawDataViz);
}

drawDataViz();

// Counter animation
const counters = document.querySelectorAll('.counter');
const speed = 200;

counters.forEach(counter => {
  const updateCount = () => {
    const target = +counter.getAttribute('data-target');
    const count = +counter.innerText;
    const increment = target / speed;

    if (count < target) {
      counter.innerText = Math.ceil(count + increment);
      setTimeout(updateCount, 1);
    } else {
      counter.innerText = target;
    }
  };

  updateCount();
});

// Smooth scrolling for navigation links
document.querySelectorAll('nav a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const section = document.querySelector(this.getAttribute('href'));
    section.scrollIntoView({
      behavior: 'smooth'
    });
  });
});

// Intersection Observer for fade-in animations
const observerOptions = {
  threshold: 0.2
};

const observer = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('fade-in');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('section').forEach(section => {
  observer.observe(section);
});

// Add smooth reveal for achievement cards
const achievementCards = document.querySelectorAll('.achievement-card');
const achievementOptions = {
    threshold: 0.3,
    rootMargin: '0px'
};

const achievementObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('fade-in');
            observer.unobserve(entry.target);
        }
    });
}, achievementOptions);

achievementCards.forEach(card => {
    achievementObserver.observe(card);
});

// Generate Dynamic Data Network
function createDataNetwork() {
  const network = document.createElement('div');
  network.className = 'data-network';
  
  // Create nodes
  for(let i = 0; i < 50; i++) {
    const node = document.createElement('div');
    node.className = 'node';
    node.style.cssText = `
      width: ${Math.random() * 80 + 20}px;
      height: ${Math.random() * 80 + 20}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-delay: ${Math.random() * 4}s;
    `;
    network.appendChild(node);
  }

  // Create connections
  for(let i = 0; i < 30; i++) {
    const connection = document.createElement('div');
    connection.className = 'connection';
    connection.style.cssText = `
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      width: ${Math.random() * 200 + 100}px;
      transform: rotate(${Math.random() * 360}deg);
      animation-delay: ${Math.random() * 6}s;
    `;
    network.appendChild(connection);
  }

  document.body.appendChild(network);
}

// Floating Data Points
function createDataPoints() {
  const colors = ['#00d4ff', '#004c70', '#00ff95'];
  
  for(let i = 0; i < 40; i++) {
    const point = document.createElement('div');
    point.className = 'data-point';
    point.style.cssText = `
      width: ${Math.random() * 20 + 5}px;
      height: ${Math.random() * 20 + 5}px;
      left: ${Math.random() * 100}%;
      top: ${Math.random() * 100}%;
      animation-duration: ${Math.random() * 10 + 5}s;
      background: radial-gradient(${colors[i%3]}, transparent);
    `;
    document.body.appendChild(point);
  }
}

// Init New Visuals
document.addEventListener('DOMContentLoaded', () => {
  createDataNetwork();
  createDataPoints();
  
  // Animate Project Icons
  document.querySelectorAll('.project-card .main-icon').forEach(icon => {
    icon.style.transition = 'transform 0.6s cubic-bezier(0.4, 0, 0.2, 1)';
  });
});