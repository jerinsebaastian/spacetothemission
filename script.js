// Valentine's Day Space Mission - Interactive Script
// Mission To The Moon for Aswani Vijoy

// ===== SECRET CODE CONFIGURATION =====
// The secret code is stored in a separate file (config.js) that you DON'T upload to GitHub
// This keeps your anniversary date private!
// Instructions: Create a file called 'config.js' in the same folder as this file
// =====================================

// Global Variables
let SECRET_CODE = ""; // Will be loaded from config.js
let musicPlaying = false;
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

// Secret Code Verification
function verifyCode() {
    const input = document.getElementById('secretCode').value;
    const errorMsg = document.getElementById('codeError');
    
    if (input === SECRET_CODE) {
        // Correct code - grant access
        errorMsg.style.color = 'var(--accent-cyan)';
        errorMsg.textContent = '✓ ACCESS GRANTED - LAUNCHING MISSION...';
        
        // Add success sound effect (visual feedback)
        document.querySelector('.mission-control-screen').style.boxShadow = '0 0 80px rgba(100, 255, 218, 0.8)';
        
        setTimeout(() => {
            goToPage(1); // Go to launch screen
        }, 1500);
    } else {
        // Wrong code
        errorMsg.style.color = 'var(--nebula-pink)';
        errorMsg.textContent = '✗ INVALID CODE - ACCESS DENIED';
        
        // Shake effect
        document.querySelector('.mission-control-screen').style.animation = 'shake 0.5s ease';
        setTimeout(() => {
            document.querySelector('.mission-control-screen').style.animation = '';
        }, 500);
        
        // Clear input
        document.getElementById('secretCode').value = '';
    }
}

// Allow Enter key to submit code
document.addEventListener('DOMContentLoaded', function() {
    const codeInput = document.getElementById('secretCode');
    if (codeInput) {
        codeInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                verifyCode();
            }
        });
    }
});

// Global Variables
let musicPlaying = false;
const bgMusic = document.getElementById('bgMusic');
const musicToggle = document.getElementById('musicToggle');

// Initialize on page load
document.addEventListener('DOMContentLoaded', function() {
    initializeBackground();
    initializeMusicControl();
    
    // Check if returning from game
    if (sessionStorage.getItem('gameCompleted') === 'true') {
        sessionStorage.removeItem('gameCompleted');
        goToPage(7); // Go to moon page
    }
});

// Background Animations
function initializeBackground() {
    createStars();
    createFloatingHearts();
    setInterval(createShootingStar, 4000);
}

function createStars() {
    const container = document.querySelector('.stars-container');
    const starCount = window.innerWidth > 768 ? 100 : 50;
    
    for (let i = 0; i < starCount; i++) {
        const star = document.createElement('div');
        star.className = 'star';
        
        const size = Math.random() * 3 + 1;
        star.style.width = `${size}px`;
        star.style.height = `${size}px`;
        star.style.left = `${Math.random() * 100}%`;
        star.style.top = `${Math.random() * 100}%`;
        star.style.animationDelay = `${Math.random() * 3}s`;
        
        container.appendChild(star);
    }
}

function createFloatingHearts() {
    const container = document.querySelector('.hearts-container');
    
    setInterval(() => {
        const heart = document.createElement('div');
        heart.className = 'floating-heart';
        heart.textContent = '❤️';
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDuration = `${Math.random() * 10 + 10}s`;
        
        container.appendChild(heart);
        
        setTimeout(() => heart.remove(), 15000);
    }, 3000);
}

function createShootingStar() {
    const container = document.querySelector('.shooting-stars-container');
    const star = document.createElement('div');
    star.className = 'shooting-star';
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 50}%`;
    
    container.appendChild(star);
    
    setTimeout(() => star.remove(), 3000);
}

// Music Control
function initializeMusicControl() {
    musicToggle.addEventListener('click', toggleMusic);
    
    // Try to play music on first user interaction
    document.addEventListener('click', function playOnFirstClick() {
        if (!musicPlaying) {
            playMusic();
        }
        document.removeEventListener('click', playOnFirstClick);
    }, { once: true });
}

function toggleMusic() {
    if (musicPlaying) {
        pauseMusic();
    } else {
        playMusic();
    }
}

function playMusic() {
    bgMusic.play().then(() => {
        musicPlaying = true;
        musicToggle.querySelector('.music-icon').textContent = '🔊';
    }).catch(err => {
        console.log('Music playback failed:', err);
    });
}

function pauseMusic() {
    bgMusic.pause();
    musicPlaying = false;
    musicToggle.querySelector('.music-icon').textContent = '🔇';
}

// Page Navigation
function goToPage(pageNumber) {
    // Hide current page
    document.querySelectorAll('.page').forEach(page => {
        page.classList.remove('active');
    });
    
    // Show target page
    const targetPage = document.getElementById(`page${pageNumber}`);
    if (targetPage) {
        targetPage.classList.add('active');
        currentPage = pageNumber;
        
        // Trigger page-specific animations
        if (pageNumber === 3) {
            animateStoryText();
        } else if (pageNumber === 4) {
            drawConstellation();
        } else if (pageNumber === 7) {
            animateMoonText();
        } else if (pageNumber === 8) {
            animateProposal();
        }
    }
}

function nextPage(pageNumber) {
    goToPage(pageNumber);
}

// PAGE 1 - Start Mission
function startMission() {
    goToPage(2);
    setTimeout(runTerminalAnimation, 500);
}

// PAGE 2 - Terminal Animation
function runTerminalAnimation() {
    const terminalText = document.getElementById('terminalText');
    const messages = [
        'Initializing Valentine Protocol...',
        'Scanning for cuteness levels...',
        'Analyzing data...',
        'Checking if Chundu is the cutest...',
        '█████████████████████ 100%',
        'CONFIRMED: Maximum cuteness detected ✓',
        '',
        'Access granted.',
        'Welcome, Commander Chundu. 🚀'
    ];
    
    let messageIndex = 0;
    let charIndex = 0;
    
    function typeMessage() {
        if (messageIndex < messages.length) {
            if (charIndex < messages[messageIndex].length) {
                terminalText.innerHTML += messages[messageIndex].charAt(charIndex);
                charIndex++;
                setTimeout(typeMessage, 50);
            } else {
                terminalText.innerHTML += '<br>';
                messageIndex++;
                charIndex = 0;
                setTimeout(typeMessage, 500);
            }
        } else {
            setTimeout(() => goToPage(3), 2000);
        }
    }
    
    typeMessage();
}

// PAGE 3 - Story Text Animation
function animateStoryText() {
    const elements = document.querySelectorAll('#page3 .fade-in-text');
    elements.forEach(element => {
        const delay = element.getAttribute('data-delay') || 0;
        setTimeout(() => {
            element.style.animationDelay = '0s';
            element.style.animation = 'fadeInUp 1s forwards';
        }, delay);
    });
}

// PAGE 4 - Constellation
function drawConstellation() {
    const svg = document.getElementById('constellation');
    const stars = [
        {x: 50, y: 50}, {x: 150, y: 80}, {x: 250, y: 60},
        {x: 200, y: 150}, {x: 100, y: 180}, {x: 300, y: 200}
    ];
    
    // Draw lines
    const connections = [[0,1], [1,2], [2,3], [3,4], [4,0], [1,3]];
    connections.forEach(([i, j]) => {
        const line = document.createElementNS('http://www.w3.org/2000/svg', 'line');
        line.setAttribute('x1', stars[i].x);
        line.setAttribute('y1', stars[i].y);
        line.setAttribute('x2', stars[j].x);
        line.setAttribute('y2', stars[j].y);
        line.classList.add('constellation-line');
        svg.appendChild(line);
    });
    
    // Draw stars
    stars.forEach(star => {
        const circle = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        circle.setAttribute('cx', star.x);
        circle.setAttribute('cy', star.y);
        circle.setAttribute('r', '5');
        circle.classList.add('constellation-star');
        svg.appendChild(circle);
    });
    
    // Click to reveal message
    svg.addEventListener('click', () => {
        svg.classList.add('constellation-active');
        document.getElementById('stargaze-reveal').classList.add('revealed');
    });
}

// PAGE 5 - Memory Galaxy
const memories = {
    rose: {
        title: "White Rose Planet 🤍",
        text: "// Replace this with your personal memory about giving her a white rose\n\nRemember that special moment when... [Add your memory here]"
    },
    chocolate: {
        title: "Chocolate Asteroid 🍫",
        text: "// Replace this with your personal memory about sharing chocolate\n\nThat time we... [Add your memory here]"
    },
    future: {
        title: "Future Nebula ✨",
        text: "// Replace this with your dreams and plans for the future together\n\nI see us... [Add your vision here]"
    }
};

function openMemory(type) {
    const modal = document.getElementById('memoryModal');
    const title = document.getElementById('memoryTitle');
    const text = document.getElementById('memoryText');
    
    title.textContent = memories[type].title;
    text.textContent = memories[type].text;
    
    modal.classList.add('active');
}

function closeMemory() {
    document.getElementById('memoryModal').classList.remove('active');
}

// Close modal when clicking outside
document.getElementById('memoryModal').addEventListener('click', function(e) {
    if (e.target === this) {
        closeMemory();
    }
});

// PAGE 6 - Game Skip (for testing)
function skipGame() {
    goToPage(7);
}

// PAGE 7 - Moon Page
function animateMoonText() {
    const elements = document.querySelectorAll('#page7 .fade-in-text');
    elements.forEach(element => {
        const delay = element.getAttribute('data-delay') || 0;
        setTimeout(() => {
            element.style.animationDelay = '0s';
            element.style.animation = 'fadeInUp 1s forwards';
        }, delay);
    });
}

function revealSecret() {
    document.getElementById('secret-message').classList.add('revealed');
    
    // Add extra sparkle effect
    const star = document.querySelector('.secret-star');
    star.style.animation = 'none';
    setTimeout(() => {
        star.style.animation = 'pulse 2s infinite';
    }, 10);
}

// PAGE 8 - Proposal
function animateProposal() {
    const elements = document.querySelectorAll('#page8 .fade-in-text');
    elements.forEach(element => {
        const delay = element.getAttribute('data-delay') || 0;
        setTimeout(() => {
            element.style.animationDelay = '0s';
            element.style.animation = 'fadeInUp 1s forwards';
        }, delay);
    });
}

function moveNoButton(event) {
    const btn = document.getElementById('noBtn');
    const maxX = window.innerWidth - btn.offsetWidth - 20;
    const maxY = window.innerHeight - btn.offsetHeight - 20;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    btn.style.position = 'fixed';
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
}

function moveNoButtonMobile(event) {
    event.preventDefault();
    const btn = document.getElementById('noBtn');
    const maxX = window.innerWidth - btn.offsetWidth - 20;
    const maxY = window.innerHeight - btn.offsetHeight - 20;
    
    const randomX = Math.random() * maxX;
    const randomY = Math.random() * maxY;
    
    btn.style.position = 'fixed';
    btn.style.left = randomX + 'px';
    btn.style.top = randomY + 'px';
}

function acceptProposal() {
    goToPage(9);
    createConfetti();
    
    // Make background glow brighter
    document.body.style.background = 'linear-gradient(180deg, #1a1a3e 0%, #2d1b4e 50%, #1a0b2e 100%)';
}

// PAGE 9 - Confetti Animation
function createConfetti() {
    const canvas = document.getElementById('confetti');
    const ctx = canvas.getContext('2d');
    
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const particles = [];
    const colors = ['#64ffda', '#e95aa3', '#f4f1de', '#ffffff'];
    
    for (let i = 0; i < 150; i++) {
        particles.push({
            x: Math.random() * canvas.width,
            y: Math.random() * canvas.height - canvas.height,
            size: Math.random() * 8 + 4,
            speedY: Math.random() * 3 + 2,
            speedX: Math.random() * 2 - 1,
            color: colors[Math.floor(Math.random() * colors.length)],
            shape: Math.random() > 0.5 ? 'circle' : 'star'
        });
    }
    
    function animate() {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        particles.forEach(p => {
            if (p.shape === 'circle') {
                ctx.beginPath();
                ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
                ctx.fillStyle = p.color;
                ctx.fill();
            } else {
                drawStar(ctx, p.x, p.y, 5, p.size, p.size / 2, p.color);
            }
            
            p.y += p.speedY;
            p.x += p.speedX;
            
            if (p.y > canvas.height) {
                p.y = -10;
                p.x = Math.random() * canvas.width;
            }
        });
        
        requestAnimationFrame(animate);
    }
    
    animate();
}

function drawStar(ctx, cx, cy, spikes, outerRadius, innerRadius, color) {
    let rot = Math.PI / 2 * 3;
    let x = cx;
    let y = cy;
    const step = Math.PI / spikes;
    
    ctx.beginPath();
    ctx.moveTo(cx, cy - outerRadius);
    
    for (let i = 0; i < spikes; i++) {
        x = cx + Math.cos(rot) * outerRadius;
        y = cy + Math.sin(rot) * outerRadius;
        ctx.lineTo(x, y);
        rot += step;
        
        x = cx + Math.cos(rot) * innerRadius;
        y = cy + Math.sin(rot) * innerRadius;
        ctx.lineTo(x, y);
        rot += step;
    }
    
    ctx.lineTo(cx, cy - outerRadius);
    ctx.closePath();
    ctx.fillStyle = color;
    ctx.fill();
}

function restartMission() {
    // Reset everything
    document.body.style.background = 'linear-gradient(180deg, #0a0e27 0%, #16213e 50%, #1a0b2e 100%)';
    document.getElementById('terminalText').innerHTML = '';
    
    // Reset all hidden elements
    document.querySelectorAll('.hidden-text').forEach(el => {
        el.classList.remove('revealed');
    });
    
    // Reset No button position
    const noBtn = document.getElementById('noBtn');
    noBtn.style.position = 'relative';
    noBtn.style.left = 'auto';
    noBtn.style.top = 'auto';
    
    // Go back to start
    goToPage(1);
}

// Handle window resize for canvas
window.addEventListener('resize', () => {
    const canvas = document.getElementById('confetti');
    if (canvas && currentPage === 9) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
});
