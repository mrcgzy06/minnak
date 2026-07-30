// Kedi & Köpek Kart Eşleştirme Oyunu - Ana Uygulama Mantığı (Tam Ekran Fluid UI/UX)

const LEVELS = [
    { id: 1, title: 'Bölüm 1: Minik Patiler', rows: 2, cols: 2, pairs: 2, star3Moves: 5, star2Moves: 8 },
    { id: 2, title: 'Bölüm 2: Sevimli Dostlar', rows: 2, cols: 3, pairs: 3, star3Moves: 8, star2Moves: 12 },
    { id: 3, title: 'Bölüm 3: Neşeli Kulübe', rows: 3, cols: 4, pairs: 6, star3Moves: 14, star2Moves: 20 },
    { id: 4, title: 'Bölüm 4: Zeki Dedektifler', rows: 4, cols: 4, pairs: 8, star3Moves: 18, star2Moves: 26 },
    { id: 5, title: 'Bölüm 5: Süper Kahramanlar', rows: 4, cols: 5, pairs: 10, star3Moves: 24, star2Moves: 34 },
    { id: 6, title: 'Bölüm 6: Pati Şampiyonu', rows: 4, cols: 6, pairs: 12, star3Moves: 30, star2Moves: 42 }
];

const CARD_IMAGES = [
    'assets/card1.jpg', 'assets/card2.jpg', 'assets/card3.jpg',
    'assets/card4.jpg', 'assets/card5.jpg', 'assets/card6.jpg',
    'assets/card7.jpg', 'assets/card8.jpg', 'assets/card9.jpg',
    'assets/card10.jpg', 'assets/card11.jpg', 'assets/card12.jpg',
    'assets/card13.jpg'
];

class MemoryGame {
    constructor() {
        this.currentLevel = 1;
        this.unlockedLevel = parseInt(localStorage.getItem('kedi_kopek_unlocked') || '1');
        this.starsData = JSON.parse(localStorage.getItem('kedi_kopek_stars') || '{}');
        
        this.moves = 0;
        this.matchedPairs = 0;
        this.timerSeconds = 0;
        this.timerInterval = null;
        this.flippedCards = [];
        this.isBusy = false;

        this.initDOMElements();
        this.bindEvents();
        this.renderLevelMap();
    }

    initDOMElements() {
        this.levelMapView = document.getElementById('level-map-view');
        this.gameView = document.getElementById('game-view');
        this.levelsContainer = document.getElementById('levels-container');
        this.cardsGridContainer = document.getElementById('cards-grid-container');
        this.cardsGrid = document.getElementById('cards-grid');
        this.currentLevelTitle = document.getElementById('current-level-title');
        
        this.totalStarsEl = document.getElementById('total-stars');
        this.timerText = document.getElementById('timer-text');
        this.movesText = document.getElementById('moves-text');
        
        this.btnAudio = document.getElementById('btn-audio');
        this.btnBackMap = document.getElementById('btn-back-map');
        this.btnRestart = document.getElementById('btn-restart');
        
        // Victory Modal
        this.victoryModal = document.getElementById('victory-modal');
        this.vStar1 = document.getElementById('v-star-1');
        this.vStar2 = document.getElementById('v-star-2');
        this.vStar3 = document.getElementById('v-star-3');
        this.vTime = document.getElementById('v-time');
        this.vMoves = document.getElementById('v-moves');
        this.btnModalMap = document.getElementById('btn-modal-map');
        this.btnModalNext = document.getElementById('btn-modal-next');
    }

    bindEvents() {
        this.btnAudio.addEventListener('click', () => {
            const isMuted = window.soundManager.toggleMute();
            this.btnAudio.textContent = isMuted ? '🔇' : '🔊';
            window.soundManager.playClick();
        });

        this.btnBackMap.addEventListener('click', () => {
            window.soundManager.playClick();
            this.showLevelMap();
        });

        this.btnRestart.addEventListener('click', () => {
            window.soundManager.playClick();
            this.startLevel(this.currentLevel);
        });

        this.btnModalMap.addEventListener('click', () => {
            window.soundManager.playClick();
            this.hideVictoryModal();
            this.showLevelMap();
        });

        this.btnModalNext.addEventListener('click', () => {
            window.soundManager.playClick();
            this.hideVictoryModal();
            if (this.currentLevel < LEVELS.length) {
                this.startLevel(this.currentLevel + 1);
            } else {
                this.showLevelMap();
            }
        });

        window.addEventListener('resize', () => {
            if (this.gameView.style.display === 'flex') {
                const levelConfig = LEVELS.find(l => l.id === this.currentLevel);
                if (levelConfig) {
                    this.applyGridConfig(levelConfig);
                }
            }
        });
    }

    updateTotalStars() {
        let total = 0;
        Object.values(this.starsData).forEach(s => total += s);
        this.totalStarsEl.textContent = total;
    }

    renderLevelMap() {
        this.updateTotalStars();
        this.levelsContainer.innerHTML = '';

        LEVELS.forEach(lvl => {
            const isUnlocked = lvl.id <= this.unlockedLevel;
            const stars = this.starsData[lvl.id] || 0;

            const card = document.createElement('div');
            card.className = `level-card ${isUnlocked ? 'unlocked' : 'locked'}`;
            
            card.innerHTML = `
                ${!isUnlocked ? '<div class="lock-badge">🔒</div>' : ''}
                <div class="level-number">Bölüm ${lvl.id}</div>
                <div class="level-title">${lvl.title.split(': ')[1]}</div>
                <div class="level-grid-info">${lvl.pairs * 2} Kart (${lvl.pairs} Çift)</div>
                <div class="stars-display">
                    <span class="star ${stars >= 1 ? 'active' : ''}">⭐</span>
                    <span class="star ${stars >= 2 ? 'active' : ''}">⭐</span>
                    <span class="star ${stars >= 3 ? 'active' : ''}">⭐</span>
                </div>
                <button class="btn ${isUnlocked ? 'btn-primary' : 'btn-secondary'}" ${!isUnlocked ? 'disabled' : ''}>
                    ${isUnlocked ? 'Oyna ▶' : 'Kilitli'}
                </button>
            `;

            if (isUnlocked) {
                card.addEventListener('click', () => {
                    window.soundManager.playClick();
                    this.startLevel(lvl.id);
                });
            }

            this.levelsContainer.appendChild(card);
        });
    }

    showLevelMap() {
        this.stopTimer();
        this.gameView.style.display = 'none';
        this.levelMapView.style.display = 'flex';
        this.renderLevelMap();
    }

    applyGridConfig(levelConfig) {
        if (!this.cardsGridContainer || !this.cardsGrid) return;

        // Get actual container dimensions with minimal padding
        const containerPadding = 8;
        const availableWidth = this.cardsGridContainer.clientWidth - (containerPadding * 2);
        const availableHeight = this.cardsGridContainer.clientHeight - (containerPadding * 2);

        if (availableWidth <= 0 || availableHeight <= 0) return;

        const vw = window.innerWidth;
        const totalCards = levelConfig.pairs * 2;
        const isDesktop = vw >= 768;

        let cols, rows;

        if (isDesktop) {
            // DESKTOP: Prioritize horizontal (landscape) layout
            if (totalCards === 24) { cols = 6; rows = 4; }
            else if (totalCards === 20) { cols = 5; rows = 4; }
            else if (totalCards === 16) { cols = 4; rows = 4; }
            else if (totalCards === 12) { cols = 4; rows = 3; }
            else if (totalCards === 6)  { cols = 3; rows = 2; }
            else if (totalCards === 4)  { cols = 2; rows = 2; }
        } else {
            // MOBILE: Prioritize vertical (portrait) layout
            if (totalCards === 24) { cols = 4; rows = 6; }
            else if (totalCards === 20) { cols = 4; rows = 5; }
            else if (totalCards === 16) { cols = 4; rows = 4; }
            else if (totalCards === 12) { cols = 3; rows = 4; }
            else if (totalCards === 6)  { cols = 2; rows = 3; }
            else if (totalCards === 4)  { cols = 2; rows = 2; }
        }

        // Gap scales with viewport but stays reasonable
        const gap = isDesktop ? 14 : 8;

        // Calculate the maximum card size that fits in both dimensions
        const maxCardW = (availableWidth - (cols - 1) * gap) / cols;
        const maxCardH = (availableHeight - (rows - 1) * gap) / rows;

        // Take the smaller of the two to maintain square cards, floor for clean pixels
        let cardSize = Math.floor(Math.min(maxCardW, maxCardH));

        // Minimum size: prevent unplayable tiny cards
        const minSize = isDesktop ? 80 : 56;
        cardSize = Math.max(minSize, cardSize);

        // Apply grid styles
        this.cardsGrid.style.gridTemplateColumns = `repeat(${cols}, ${cardSize}px)`;
        this.cardsGrid.style.gridTemplateRows = `repeat(${rows}, ${cardSize}px)`;
        this.cardsGrid.style.gap = `${gap}px`;

        // Apply card sizes
        const cardEls = this.cardsGrid.querySelectorAll('.card');
        cardEls.forEach(cardEl => {
            cardEl.style.width = `${cardSize}px`;
            cardEl.style.height = `${cardSize}px`;
        });
    }

    startLevel(levelId) {
        this.currentLevel = levelId;
        const levelConfig = LEVELS.find(l => l.id === levelId);

        if (this.currentLevelTitle) {
            this.currentLevelTitle.textContent = levelConfig.title;
        }

        this.moves = 0;
        this.matchedPairs = 0;
        this.flippedCards = [];
        this.isBusy = false;

        this.movesText.textContent = '0';
        this.resetTimer();
        this.startTimer();

        // Screen Switch
        this.levelMapView.style.display = 'none';
        this.gameView.style.display = 'flex';

        this.renderCards(levelConfig);
    }

    renderCards(levelConfig) {
        this.cardsGrid.innerHTML = '';
        
        // Select required image pairs
        const selectedImages = CARD_IMAGES.slice(0, levelConfig.pairs);
        const cardDeck = [...selectedImages, ...selectedImages];
        
        // Shuffle deck
        this.shuffle(cardDeck);

        cardDeck.forEach((imgSrc, index) => {
            const cardEl = document.createElement('div');
            cardEl.className = 'card';
            cardEl.dataset.img = imgSrc;
            cardEl.dataset.index = index;

            cardEl.innerHTML = `
                <div class="card-face card-back">
                    <div class="card-back-pattern">🐾</div>
                </div>
                <div class="card-face card-front">
                    <img src="${imgSrc}" alt="Kedi Köpek Kartı" />
                </div>
            `;

            cardEl.addEventListener('click', () => this.handleCardClick(cardEl));
            this.cardsGrid.appendChild(cardEl);
        });

        // Apply dynamic layout calculation after DOM insertion
        requestAnimationFrame(() => {
            this.applyGridConfig(levelConfig);
        });
    }

    shuffle(array) {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
    }

    handleCardClick(cardEl) {
        if (this.isBusy || cardEl.classList.contains('flipped') || cardEl.classList.contains('matched')) {
            return;
        }

        window.soundManager.playFlip();
        cardEl.classList.add('flipped');
        this.flippedCards.push(cardEl);

        if (this.flippedCards.length === 2) {
            this.moves++;
            this.movesText.textContent = this.moves;
            this.checkMatch();
        }
    }

    checkMatch() {
        this.isBusy = true;
        const [card1, card2] = this.flippedCards;

        if (card1.dataset.img === card2.dataset.img) {
            // Match found!
            setTimeout(() => {
                window.soundManager.playMatch();
                card1.classList.add('matched');
                card2.classList.add('matched');
                this.flippedCards = [];
                this.isBusy = false;
                this.matchedPairs++;

                const levelConfig = LEVELS.find(l => l.id === this.currentLevel);
                if (this.matchedPairs === levelConfig.pairs) {
                    this.handleVictory(levelConfig);
                }
            }, 300);
        } else {
            // Mismatch
            setTimeout(() => {
                window.soundManager.playMismatch();
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                this.flippedCards = [];
                this.isBusy = false;
            }, 900);
        }
    }

    startTimer() {
        this.stopTimer();
        this.timerSeconds = 0;
        this.timerInterval = setInterval(() => {
            this.timerSeconds++;
            const mins = String(Math.floor(this.timerSeconds / 60)).padStart(2, '0');
            const secs = String(this.timerSeconds % 60).padStart(2, '0');
            this.timerText.textContent = `${mins}:${secs}`;
        }, 1000);
    }

    stopTimer() {
        if (this.timerInterval) {
            clearInterval(this.timerInterval);
            this.timerInterval = null;
        }
    }

    resetTimer() {
        this.stopTimer();
        this.timerText.textContent = '00:00';
    }

    calculateStars(levelConfig) {
        if (this.moves <= levelConfig.star3Moves) return 3;
        if (this.moves <= levelConfig.star2Moves) return 2;
        return 1;
    }

    handleVictory(levelConfig) {
        this.stopTimer();
        window.soundManager.playVictory();
        this.launchConfetti();

        const earnedStars = this.calculateStars(levelConfig);
        
        // Save progress
        if (this.currentLevel >= this.unlockedLevel && this.unlockedLevel < LEVELS.length) {
            this.unlockedLevel = this.currentLevel + 1;
            localStorage.setItem('kedi_kopek_unlocked', this.unlockedLevel.toString());
        }

        const prevStars = this.starsData[this.currentLevel] || 0;
        if (earnedStars > prevStars) {
            this.starsData[this.currentLevel] = earnedStars;
            localStorage.setItem('kedi_kopek_stars', JSON.stringify(this.starsData));
        }

        // Show Modal after short delay
        setTimeout(() => {
            this.vTime.textContent = this.timerText.textContent;
            this.vMoves.textContent = this.moves;

            this.vStar1.className = 'star';
            this.vStar2.className = 'star';
            this.vStar3.className = 'star';

            this.victoryModal.classList.add('active');

            setTimeout(() => { if (earnedStars >= 1) this.vStar1.classList.add('active'); }, 200);
            setTimeout(() => { if (earnedStars >= 2) this.vStar2.classList.add('active'); }, 500);
            setTimeout(() => { if (earnedStars >= 3) this.vStar3.classList.add('active'); }, 800);

            if (this.currentLevel === LEVELS.length) {
                this.btnModalNext.textContent = 'Şampiyon! 🏆';
            } else {
                this.btnModalNext.textContent = 'Sonraki ➡️';
            }
        }, 500);
    }

    hideVictoryModal() {
        this.victoryModal.classList.remove('active');
    }

    // Canvas Confetti Burst Animation
    launchConfetti() {
        const canvas = document.getElementById('confetti-canvas');
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;

        const particles = [];
        const colors = ['#ff6b6b', '#4ecdc4', '#ffe66d', '#a55eea', '#fbc531', '#48dbfb'];

        for (let i = 0; i < 90; i++) {
            particles.push({
                x: canvas.width / 2,
                y: canvas.height / 2,
                vx: (Math.random() - 0.5) * 14,
                vy: (Math.random() - 0.7) * 16,
                size: Math.random() * 10 + 6,
                color: colors[Math.floor(Math.random() * colors.length)],
                rotation: Math.random() * 360,
                rSpeed: (Math.random() - 0.5) * 10,
                opacity: 1
            });
        }

        let animationFrame;
        const render = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            let activeParticles = 0;

            particles.forEach(p => {
                if (p.opacity > 0) {
                    activeParticles++;
                    p.x += p.vx;
                    p.y += p.vy;
                    p.vy += 0.35; // Gravity
                    p.rotation += p.rSpeed;
                    p.opacity -= 0.012;

                    ctx.save();
                    ctx.translate(p.x, p.y);
                    ctx.rotate((p.rotation * Math.PI) / 180);
                    ctx.globalAlpha = Math.max(0, p.opacity);
                    ctx.fillStyle = p.color;
                    ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
                    ctx.restore();
                }
            });

            if (activeParticles > 0) {
                animationFrame = requestAnimationFrame(render);
            } else {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
            }
        };

        render();
    }
}

// Start Game on DOM Load
document.addEventListener('DOMContentLoaded', () => {
    window.game = new MemoryGame();
});
