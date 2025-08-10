// Enhanced Clash of Clans Player Comparison
const compareForm = document.getElementById('compareForm');
const compareResult = document.getElementById('compareResult');
const resetCompare = document.getElementById('resetCompare');
const compareBtn = document.querySelector('.hero-text a:not(.ctaa)');
const modal = document.getElementById('compareModal');
const closeModalBtn = document.querySelector('.modal .close');

if (compareForm && compareResult && resetCompare && compareBtn && modal && closeModalBtn) {
  // CoC-specific stat configuration 
  const cocStats = {
    stat1_1: { label: "Town Hall Level", isHigherBetter: true },
    stat1_2: { label: "Trophies", isHigherBetter: true },
    stat1_3: { label: "War Stars", isHigherBetter: true },
    stat2_1: { label: "Town Hall Level", isHigherBetter: true },
    stat2_2: { label: "Trophies", isHigherBetter: true },
    stat2_3: { label: "War Stars", isHigherBetter: true }
  };

  // Generate contextual tip based on comparison
  const generateComparisonTip = (stats1, stats2) => {
    const thDiff = stats1.townHall - stats2.townHall;

    if (thDiff >= 2) return "Higher Town Hall levels have significant advantages in war!";
    if (thDiff <= -2) return "Lower Town Hall can be useful for engineered war bases!";
    if (stats1.trophies > 5000 || stats2.trophies > 5000) return "Legend League players! Watch replays to learn strategies!";
    if (stats1.warStars > 1000 || stats2.warStars > 1000) return "Veteran players! Study their war bases!";

    return "Compare attack strategies to improve your gameplay!";
  };

  // Process comparison
  const processComparison = (e) => {
    e.preventDefault();

    const name1 = compareForm.name1.value.trim() || "Player 1";
    const name2 = compareForm.name2.value.trim() || "Player 2";

    const stats1 = {
      townHall: Math.max(1, Math.min(15, Number(compareForm.stat1_1.value) || 1)),
      trophies: Math.max(0, Number(compareForm.stat1_2.value) || 0),
      warStars: Math.max(0, Number(compareForm.stat1_3.value) || 0)
    };

    const stats2 = {
      townHall: Math.max(1, Math.min(15, Number(compareForm.stat2_1.value) || 1)),
      trophies: Math.max(0, Number(compareForm.stat2_2.value) || 0),
      warStars: Math.max(0, Number(compareForm.stat2_3.value) || 0)
    };

    const comparisons = [
      { label: "Town Hall", value1: stats1.townHall, value2: stats2.townHall, emoji: "🏰", isHigherBetter: true },
      { label: "Trophies", value1: stats1.trophies, value2: stats2.trophies, emoji: "🏆", isHigherBetter: true },
      { label: "War Stars", value1: stats1.warStars, value2: stats2.warStars, emoji: "⚔️", isHigherBetter: true }
    ];

    let rows = '', player1Wins = 0, player2Wins = 0;

    comparisons.forEach(stat => {
      let winner = '', cell1Class = '', cell2Class = '';

      if ((stat.value1 > stat.value2 && stat.isHigherBetter) || (stat.value1 < stat.value2 && !stat.isHigherBetter)) {
        winner = `<span class="winner-arrow">←</span>`;
        cell1Class = 'winner-cell';
        player1Wins++;
      } else if ((stat.value2 > stat.value1 && stat.isHigherBetter) || (stat.value2 < stat.value1 && !stat.isHigherBetter)) {
        winner = `<span class="winner-arrow">→</span>`;
        cell2Class = 'winner-cell';
        player2Wins++;
      } else {
        winner = `<span class="winner-arrow">↔</span>`;
      }

      rows += `
        <tr>
          <td class="${cell1Class}">${stat.value1} ${stat.emoji}</td>
          <td>${stat.label} ${winner}</td>
          <td class="${cell2Class}">${stat.value2} ${stat.emoji}</td>
        </tr>
      `;
    });

    const overallWinner = player1Wins > player2Wins
      ? `${name1} dominates!`
      : player2Wins > player1Wins
      ? `${name2} prevails!`
      : "It's a perfect tie!";

    const thDiff = Math.abs(stats1.townHall - stats2.townHall);
    const thComparison = thDiff > 0
      ? `${stats1.townHall > stats2.townHall ? name1 : name2} has ${thDiff} TH level${thDiff > 1 ? 's' : ''} advantage`
      : "Same Town Hall level";

    compareResult.innerHTML = `
      <div class="compare-header">
        <h3><span class="player1-color">${name1}</span> vs <span class="player2-color">${name2}</span></h3>
        <p class="compare-date">${new Date().toLocaleDateString()}</p>
      </div>
      <table class="compare-table">
        <tr>
          <th>${name1}</th>
          <th>Stats</th>
          <th>${name2}</th>
        </tr>
        ${rows}
      </table>
      <div class="comparison-summary">
        <div class="th-comparison">${thComparison}</div>
        <div class="overall-winner ${player1Wins > player2Wins ? 'player1-win' : player2Wins > player1Wins ? 'player2-win' : 'tie'}">
          ${overallWinner}
        </div>
      </div>
      <div class="comparison-tip">
        💡 Tip: ${generateComparisonTip(stats1, stats2)}
      </div>
    `;

    compareResult.style.display = 'block';
  };

  // Reset form
  const resetForm = () => {
    compareForm.reset();
    compareResult.style.display = 'none';
    compareResult.innerHTML = '';
  };

  // Modal controls
  const openModal = (e) => {
    e.preventDefault();
    modal.style.display = 'block';
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    modal.style.display = 'none';
    document.body.style.overflow = '';
  };

  // Event listeners
  compareBtn.addEventListener('click', openModal);
  closeModalBtn.addEventListener('click', closeModal);
  window.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });
  compareForm.addEventListener('submit', processComparison);
  resetCompare.addEventListener('click', resetForm);
}

// Mobile menu toggle
const menuIcon = document.getElementById('menu-icon');
const navlist = document.querySelector('.navlist');
const navLinks = document.querySelectorAll('.navlist a');

if (menuIcon && navlist) {
  menuIcon.addEventListener('click', () => {
    navlist.classList.toggle('active');
  });

  navLinks.forEach(link => {
    link.addEventListener('click', () => {
      navlist.classList.remove('active');
    });
  });
}

// Smooth scroll navigation
navLinks.forEach(link => {
  link.addEventListener('click', function (e) {
    const text = this.textContent.trim().toLowerCase();
    let targetId = text.replace(' ', '');
    if (targetId === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else if (['about', 'clans', 'town', 'troops', 'contactus'].includes(targetId)) {
      if (targetId === 'contactus') targetId = 'contact';
      const section = document.getElementById(targetId);
      if (section) {
        section.scrollIntoView({ behavior: 'smooth' });
      }
    }
    e.preventDefault();
  });
});

// Watch Gameplay button
const watchBtn = document.querySelector('.hero-text a.ctaa');
if (watchBtn) {
  watchBtn.addEventListener('click', function (e) {
    e.preventDefault();
    window.open('https://www.youtube.com/results?search_query=clash+of+clans+gameplay', '_blank');
  });
}

// Social icons
const socialLinks = document.querySelectorAll('.icons a');
const socialUrls = [
  'https://www.youtube.com/@ClashofClans',
  'https://www.instagram.com/clashofclans/',
  'https://twitter.com/ClashofClans',
  'https://discord.com/invite/clashofclans'
];
socialLinks.forEach((link, i) => {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    window.open(socialUrls[i], '_blank');
  });
});

// Scroll down arrow
const scrollDown = document.querySelector('.scroll-down a');
if (scrollDown) {
  scrollDown.addEventListener('click', function (e) {
    e.preventDefault();
    window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' });
  });
}
// Character Theme Switcher
const characterSelect = document.getElementById('characterSelect');
const body = document.body;

// Character data with theme properties
const characters = {
    'village-girl': {
        name: "Village Girl",
        themeClass: "village-girl-theme",
        colors: {
            primary: "#d35400",
            secondary: "#a04000",
            accent: "#e67e22",
            lightAccent: "#f5b041",
            dark: "#784212"
        },
        image: "background.png",
        animationClass: "village-girl-animation"
    },
    hog: {
        name: "Hog Rider",
        themeClass: "hog-theme",
        colors: {
            primary: "#8b4513",
            secondary: "#5e2a04",
            accent: "#ffd700",
            lightAccent: "#ffeb99",
            dark: "#1a0a00"
        },
        image: "hog_rider.png"
    },
    archer: {
        name: "Archer Queen",
        themeClass: "archer-theme",
        colors: {
            primary: "#4a6ea9",
            secondary: "#2c3e50",
            accent: "#f1c40f",
            lightAccent: "#f9e79f",
            dark: "#1a1a2e"
        },
        image: "archer_queen.png"
    },
    goblin: {
        name: "Goblin",
        themeClass: "goblin-theme",
        colors: {
            primary: "#2ecc71",
            secondary: "#27ae60",
            accent: "#f39c12",
            lightAccent: "#f1c40f",
            dark: "#16a085"
        },
        image: "goblin.png",
        animationClass: "goblin-animation"
    },
    pekka: {
        name: "P.E.K.K.A",
        themeClass: "pekka-theme",
        colors: {
            primary: "#7f8c8d",
            secondary: "#34495e",
            accent: "#e74c3c",
            lightAccent: "#f5b7b1",
            dark: "#2c3e50"
        },
        image: "pekka.png"
    },
    wizard: {
        name: "Wizard",
        themeClass: "wizard-theme",
        colors: {
            primary: "#3498db",
            secondary: "#2980b9",
            accent: "#9b59b6",
            lightAccent: "#d2b4de",
            dark: "#1a237e"
        },
        image: "wizard.png"
    },
    barbarian: {
        name: "Barbarian King",
        themeClass: "barbarian-theme",
        colors: {
            primary: "#e67e22",
            secondary: "#d35400",
            accent: "#c0392b",
            lightAccent: "#f5b7b1",
            dark: "#4a235a"
        },
        image: "barbarian_king.png"
    }
};

// Set initial theme (Hog Rider)
let currentTheme = 'hog';

// Change theme function
function changeTheme(character) {
    // Remove all theme classes
    body.classList.remove(
        'hog-theme',
        'archer-theme', 
        'pekka-theme', 
        'wizard-theme', 
        'barbarian-theme',
        'goblin-theme',
        'village-girl-theme'
    );
    
    // Add selected theme class
    if (characters[character].themeClass) {
        body.classList.add(characters[character].themeClass);
    }
    
    // Update CSS variables
    document.documentElement.style.setProperty('--primary-color', characters[character].colors.primary);
    document.documentElement.style.setProperty('--secondary-color', characters[character].colors.secondary);
    document.documentElement.style.setProperty('--accent-color', characters[character].colors.accent);
    document.documentElement.style.setProperty('--light-accent', characters[character].colors.lightAccent);
    document.documentElement.style.setProperty('--dark-color', characters[character].colors.dark);
    
    // Update hero image
    const heroImg = document.querySelector('.hero-img img');
    if (heroImg) {
        heroImg.src = characters[character].image;
        heroImg.alt = characters[character].name;
    }
    
    // Update logo text if needed
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.textContent = characters[character].name;
    }
    
    currentTheme = character;
    
    // Save to localStorage for persistence
    localStorage.setItem('clashTheme', character);

    // Update hero text
    updateHeroText(character);
}

// Event listener for character select
if (characterSelect) {
    characterSelect.addEventListener('change', function() {
        changeTheme(this.value);
    });
    
    // Load saved theme from localStorage
    const savedTheme = localStorage.getItem('clashTheme');
    if (savedTheme && characters[savedTheme]) {
        characterSelect.value = savedTheme;
        changeTheme(savedTheme);
    }
}
// Update hero text based on character
function updateHeroText(character) {
    const heroText = document.querySelector('.hero-text');
    if (!heroText) return;
    
    const characterData = {
        hog: {
            title: "Hog Rider",
            description: "Charge into battle with the mighty Hog Rider! Known for his incredible speed and building-targeting attacks."
        },
        archer: {
            title: "Archer Queen",
            description: "Rule the battlefield with precision! The Archer Queen delivers deadly ranged attacks with her powerful bow."
        },
        pekka: {
            title: "P.E.K.K.A",
            description: "The ultimate war machine! P.E.K.K.A's massive armor and sword make her nearly unstoppable in combat."
        },
        wizard: {
            title: "Wizard",
            description: "Master of fireballs! The Wizard scorches enemies with explosive splash damage and deadly precision."
        },
        barbarian: {
            title: "Barbarian King",
            description: "Lead the charge with brute strength! The Barbarian King smashes through defenses with his mighty sword."
        },
        goblin: {
            title: "Goblin",
            description: "Sneaky and fast! Goblins love loot and dash straight for resources, making them perfect for quick raids."
        },
        'village-girl': {
            title: "Village Girl",
            description: "The heart of the village! She keeps everything running smoothly and inspires all troops to defend and build stronger."
        }
    };
    
    if (characterData[character]) {
        heroText.querySelector('h1').textContent = characterData[character].title;
        heroText.querySelector('p').textContent = characterData[character].description;
    }
}

