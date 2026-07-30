// Sevimli Pati Hafıza Oyunu - Ana Mantık & Modüller (30 Bölüm & Otomatik Temalar)

// 30 Bölüm Yapısı:
// Bölüm 1 - 10: Evcil Dostlar 🐱🐶
// Bölüm 11 - 20: Vahşi Orman 🦁🐘
// Bölüm 21 - 30: Deniz Altı 🐬🐙
const LEVELS = [
    // Evcil Dostlar (Bölüm 1 - 10)
    { id: 1, title: 'Bölüm 1: Minik Patiler', theme: 'pets', pairs: 2, star3Moves: 5, star2Moves: 8 },
    { id: 2, title: 'Bölüm 2: Sevimli Dostlar', theme: 'pets', pairs: 3, star3Moves: 8, star2Moves: 12 },
    { id: 3, title: 'Bölüm 3: Neşeli Kulübe', theme: 'pets', pairs: 4, star3Moves: 10, star2Moves: 15 },
    { id: 4, title: 'Bölüm 4: Zeki Dedektifler', theme: 'pets', pairs: 6, star3Moves: 14, star2Moves: 20 },
    { id: 5, title: 'Bölüm 5: Süper Kahramanlar', theme: 'pets', pairs: 6, star3Moves: 14, star2Moves: 20 },
    { id: 6, title: 'Bölüm 6: Pati Şampiyonu', theme: 'pets', pairs: 8, star3Moves: 18, star2Moves: 26 },
    { id: 7, title: 'Bölüm 7: Tatlı Yuvamız', theme: 'pets', pairs: 8, star3Moves: 18, star2Moves: 26 },
    { id: 8, title: 'Bölüm 8: Oyun Parkı', theme: 'pets', pairs: 10, star3Moves: 24, star2Moves: 34 },
    { id: 9, title: 'Bölüm 9: Yıldızlı Gece', theme: 'pets', pairs: 10, star3Moves: 24, star2Moves: 34 },
    { id: 10, title: 'Bölüm 10: Evcil Şampiyon', theme: 'pets', pairs: 12, star3Moves: 30, star2Moves: 42 },

    // Vahşi Orman (Bölüm 11 - 20)
    { id: 11, title: 'Bölüm 11: Safari Başlangıcı', theme: 'wild', pairs: 3, star3Moves: 8, star2Moves: 12 },
    { id: 12, title: 'Bölüm 12: Orman Yolu', theme: 'wild', pairs: 4, star3Moves: 10, star2Moves: 15 },
    { id: 13, title: 'Bölüm 13: Maymun Ağacı', theme: 'wild', pairs: 6, star3Moves: 14, star2Moves: 20 },
    { id: 14, title: 'Bölüm 14: Fil Krallığı', theme: 'wild', pairs: 6, star3Moves: 14, star2Moves: 20 },
    { id: 15, title: 'Bölüm 15: Aslan Yuvası', theme: 'wild', pairs: 8, star3Moves: 18, star2Moves: 26 },
    { id: 16, title: 'Bölüm 16: Zürafa Tepesi', theme: 'wild', pairs: 8, star3Moves: 18, star2Moves: 26 },
    { id: 17, title: 'Bölüm 17: Panda Bahçesi', theme: 'wild', pairs: 10, star3Moves: 24, star2Moves: 34 },
    { id: 18, title: 'Bölüm 18: Vahşi Vadi', theme: 'wild', pairs: 10, star3Moves: 24, star2Moves: 34 },
    { id: 19, title: 'Bölüm 19: Ormanın Sesi', theme: 'wild', pairs: 12, star3Moves: 30, star2Moves: 42 },
    { id: 20, title: 'Bölüm 20: Orman Kralı', theme: 'wild', pairs: 12, star3Moves: 30, star2Moves: 42 },

    // Deniz Altı (Bölüm 21 - 30)
    { id: 21, title: 'Bölüm 21: Mavi Dalgalar', theme: 'sea', pairs: 3, star3Moves: 8, star2Moves: 12 },
    { id: 22, title: 'Bölüm 22: Mercan Kayalığı', theme: 'sea', pairs: 4, star3Moves: 10, star2Moves: 15 },
    { id: 23, title: 'Bölüm 23: Yunus Dansı', theme: 'sea', pairs: 6, star3Moves: 14, star2Moves: 20 },
    { id: 24, title: 'Bölüm 24: Ahtapot Evi', theme: 'sea', pairs: 6, star3Moves: 14, star2Moves: 20 },
    { id: 25, title: 'Bölüm 25: Deniz Yıldızı', theme: 'sea', pairs: 8, star3Moves: 18, star2Moves: 26 },
    { id: 26, title: 'Bölüm 26: Istakoz Limanı', theme: 'sea', pairs: 8, star3Moves: 18, star2Moves: 26 },
    { id: 27, title: 'Bölüm 27: İnci İstiridye', theme: 'sea', pairs: 10, star3Moves: 24, star2Moves: 34 },
    { id: 28, title: 'Bölüm 28: Balına Körfezi', theme: 'sea', pairs: 10, star3Moves: 24, star2Moves: 34 },
    { id: 29, title: 'Bölüm 29: Okyanus Derinliği', theme: 'sea', pairs: 12, star3Moves: 30, star2Moves: 42 },
    { id: 30, title: 'Bölüm 30: Okyanus Şampiyonu', theme: 'sea', pairs: 12, star3Moves: 30, star2Moves: 42 }
];

const CARD_THEMES = {
    pets: [
        { src: 'assets/card1.jpg', name: 'Dedektif Bıyık', bio: 'Büyüteciyle her ipucunu bulur!' },
        { src: 'assets/card2.jpg', name: 'Kahraman Şanslı', bio: 'Peleriniyle yardıma koşar!' },
        { src: 'assets/card3.jpg', name: 'Uyku Güzeli', bio: 'Bulutlarda mışıl mışıl uyur.' },
        { src: 'assets/card4.jpg', name: 'Gözlüklü Çapkın', bio: 'Güneş gözlükleriyle çok havalı!' },
        { src: 'assets/card5.jpg', name: 'Usta Aşçı', bio: 'En tatlı kekleri o yapar.' },
        { src: 'assets/card6.jpg', name: 'Astronot Karabaş', bio: 'Uzayda kemik arıyor!' },
        { src: 'assets/card7.jpg', name: 'Korsan Bıyık', bio: 'Hazine haritasını sadece o bilir.' },
        { src: 'assets/card8.jpg', name: 'Ressam Pati', bio: 'Dünyayı rengarenk boyar.' },
        { src: 'assets/card9.jpg', name: 'Büyücü Pati', bio: 'Sihirli değneğiyle neşe saçar.' },
        { src: 'assets/card10.jpg', name: 'Hızlı Sürücü', bio: 'Scooterı ile rüzgar gibi geçer!' },
        { src: 'assets/card11.jpg', name: 'Oyuncu Kedi', bio: 'Kulaklığıyla en sevdiği şarkıları dinler.' },
        { src: 'assets/card12.jpg', name: 'Doktor Pati', bio: 'Hasta dostlarını iyileştirir.' },
        { src: 'assets/card13.jpg', name: 'Kelebek Avcısı', bio: 'Mavi kelebeklerle oynamaya bayılır.' }
    ],
    wild: [
        { src: 'assets/wild1.svg', name: 'Kral Aslan 🦁', bio: 'Ormanların cesur lideridir.' },
        { src: 'assets/wild2.svg', name: 'Sevimli Fil 🐘', bio: 'Hortumuyla serin sular püskürtür.' },
        { src: 'assets/wild3.svg', name: 'Zarif Zürafa 🦒', bio: 'En yüksek yaprakları yer.' },
        { src: 'assets/wild4.svg', name: 'Çizgili Zebra 🦓', bio: 'Koşu yarışlarında birincidir.' },
        { src: 'assets/wild5.svg', name: 'Neşeli Maymun 🐒', bio: 'Ağaçtan ağaca muz toplar.' },
        { src: 'assets/wild6.svg', name: 'Tombul Panda 🐼', bio: 'Bambu yapraklarını çok sever.' },
        { src: 'assets/wild7.svg', name: 'Ayı Bobo 🐻', bio: 'En tatlı balları o bulur.' },
        { src: 'assets/wild8.svg', name: 'Hızlı Kaplan 🐯', bio: 'Turuncu çizgileriyle güçlüdür.' },
        { src: 'assets/wild9.svg', name: 'Yeşil Timsah 🐊', bio: 'Nehirde güneşlenir.' },
        { src: 'assets/wild10.svg', name: 'Zıpzıp Kurbağa 🐸', bio: 'Nilüferde zıplar.' },
        { src: 'assets/wild11.svg', name: 'Renkli Papağan 🦜', bio: 'En güzel şarkıları söyler.' },
        { src: 'assets/wild12.svg', name: 'Uykucu Koala 🐨', bio: 'Okaliptüs ağacında uyur.' }
    ],
    sea: [
        { src: 'assets/sea1.svg', name: 'Zeki Yunus 🐬', bio: 'Denizde taklalar atarak yüzer.' },
        { src: 'assets/sea2.svg', name: 'Sevimli Ahtapot 🐙', bio: '8 kollu sarılma ustasıdır.' },
        { src: 'assets/sea3.svg', name: 'Hızlı Köpekbalığı 🦈', bio: 'Denizaltının en hızlısıdır.' },
        { src: 'assets/sea4.svg', name: 'Dev Balina 🐳', bio: 'Neşeli fıskiyeler yapar.' },
        { src: 'assets/sea5.svg', name: 'Bilge Kaplumbağa 🐢', bio: 'Denizlerde seyahat eder.' },
        { src: 'assets/sea6.svg', name: 'Kırmızı Yengeç 🦀', bio: 'Kumsalda yan yan yürür.' },
        { src: 'assets/sea7.svg', name: 'Deniz Yıldızı ⭐', bio: 'Kumsalı parlatır.' },
        { src: 'assets/sea8.svg', name: 'Palyaço Balığı 🐠', bio: 'Mercanlarda saklambaç oynar.' },
        { src: 'assets/sea9.svg', name: 'Deniz Anası 🪼', bio: 'Denizde ışık saçar.' },
        { src: 'assets/sea10.svg', name: 'Kırmızı Istakoz 🦞', bio: 'Deniz kabukları toplar.' },
        { src: 'assets/sea11.svg', name: 'Usta Fok 🦭', bio: 'Topu burnunda tutar.' },
        { src: 'assets/sea12.svg', name: 'İnci İstiridye 🦪', bio: 'Parlak sürprizler saklar.' }
    ]
};

const SHOP_HATS = [
    { id: 'none', emoji: '🎁', name: 'Klasik Pati', price: 0 },
    { id: 'crown', emoji: '👑', name: 'Kral Tacı Paketi', price: 5 },
    { id: 'detective', emoji: '🕵️', name: 'Dedektif Seti', price: 8 },
    { id: 'party', emoji: '🥳', name: 'Parti Kutusu', price: 10 },
    { id: 'glasses', emoji: '🕶️', name: 'Havalı Gözlük', price: 12 }
];

const CARD_SKINS = [
    { id: 'default', name: 'Pembe Neşe Paket', class: '', icon: '🐾', price: 0 },
    { id: 'rainbow', name: 'Gökkuşağı Kutusu', class: 'skin-rainbow', icon: '🌈', price: 6 },
    { id: 'jungle', name: 'Vahşi Orman Teması', class: 'skin-jungle', icon: '🌴', price: 10 },
    { id: 'ocean', name: 'Okyanus Dalgaları', class: 'skin-ocean', icon: '🐚', price: 10 },
    { id: 'space', name: 'Uzay Serisi Paket', class: 'skin-space', icon: '🚀', price: 12 },
    { id: 'gold', name: 'Altın Şampiyon', class: 'skin-gold', icon: '👑', price: 18 }
];

class MemoryGame {
    constructor() {
        this.currentLevel = 1;
        this.unlockedLevel = parseInt(localStorage.getItem('kedi_kopek_unlocked') || '1');
        this.starsData = JSON.parse(localStorage.getItem('kedi_kopek_stars') || '{}');
        this.inventory = JSON.parse(localStorage.getItem('kedi_kopek_inv') || '{"hats":["none"],"skins":["default"],"equippedHat":"none","equippedSkin":"default"}');

        // State variables
        this.gameMode = '1p'; // '1p' or '2p'
        this.moves = 0;
        this.matchedPairs = 0;
        this.timerSeconds = 0;
        this.timerInterval = null;
        this.flippedCards = [];
        this.isBusy = false;

        // Combo state
        this.comboCount = 0;
        this.lastMatchTime = 0;

        // 2 Player Turn-by-Turn state
        this.currentPlayer = 1; // 1 or 2
        this.p1Score = 0;
        this.p2Score = 0;

        // Hint state
        this.hintsRemaining = 3;

        this.initDOMElements();
        this.bindEvents();
        this.updateVirtualPet();
        this.renderLevelMap();
        
        // Welcome audio greeting
        setTimeout(() => {
            if (window.soundManager) window.soundManager.playWelcome();
        }, 600);
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
        
        // Virtual Pet
        this.petAvatarBtn = document.getElementById('pet-avatar-btn');
        this.petHatDisplay = document.getElementById('pet-hat-display');
        this.petSpeech = document.getElementById('pet-speech');
        
        // Mode Selector
        this.modeSelector = document.getElementById('mode-selector');
        this.playerTurnTag = document.getElementById('player-turn-indicator');
        this.comboBanner = document.getElementById('combo-banner');
        this.btnHint = document.getElementById('btn-hint');
        this.hintCountEl = document.getElementById('hint-count');

        // Modals
        this.victoryModal = document.getElementById('victory-modal');
        this.victoryTitle = document.getElementById('victory-title');
        this.victorySubtitle = document.getElementById('victory-subtitle');
        this.vStar1 = document.getElementById('v-star-1');
        this.vStar2 = document.getElementById('v-star-2');
        this.vStar3 = document.getElementById('v-star-3');
        this.vTime = document.getElementById('v-time');
        this.vMoves = document.getElementById('v-moves');
        this.btnModalMap = document.getElementById('btn-modal-map');
        this.btnModalNext = document.getElementById('btn-modal-next');

        // Shop & Album
        this.btnOpenShop = document.getElementById('btn-open-shop');
        this.btnCloseShop = document.getElementById('btn-close-shop');
        this.shopModal = document.getElementById('shop-modal');
        this.shopItemsContainer = document.getElementById('shop-items-container');

        this.btnOpenAlbum = document.getElementById('btn-open-album');
        this.btnCloseAlbum = document.getElementById('btn-close-album');
        this.albumModal = document.getElementById('album-modal');
        this.albumGrid = document.getElementById('album-grid');
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

        // Virtual Pet Interaction
        this.petAvatarBtn.addEventListener('click', () => {
            window.soundManager.playPurr();
            this.petAvatarBtn.style.transform = 'scale(1.3) rotate(12deg)';
            setTimeout(() => { this.petAvatarBtn.style.transform = ''; }, 300);
            
            const messages = [
                'Miyav! Hoş geldin! Birlikte oynayalım mı? 🐱',
                'Birlikte harikayız! ⭐',
                'Bölümleri tamamla, yıldızları topla! 🚀',
                'Mağazadan bana yeni bir şapka alalım mı? 🎩'
            ];
            this.petSpeech.textContent = messages[Math.floor(Math.random() * messages.length)];
        });

        // Mode Selector
        this.modeSelector.querySelectorAll('.pill-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                window.soundManager.playClick();
                this.modeSelector.querySelectorAll('.pill-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.gameMode = btn.dataset.mode;
            });
        });

        // Hint Button
        this.btnHint.addEventListener('click', () => this.useHint());

        // Shop & Album Modal Openers
        this.btnOpenShop.addEventListener('click', () => {
            window.soundManager.playClick();
            this.openShopModal();
        });
        this.btnCloseShop.addEventListener('click', () => {
            window.soundManager.playClick();
            this.shopModal.classList.remove('active');
        });

        this.btnOpenAlbum.addEventListener('click', () => {
            window.soundManager.playClick();
            this.openAlbumModal();
        });
        this.btnCloseAlbum.addEventListener('click', () => {
            window.soundManager.playClick();
            this.albumModal.classList.remove('active');
        });

        // Shop Tabs
        document.querySelectorAll('.shop-tab').forEach(tab => {
            tab.addEventListener('click', () => {
                window.soundManager.playClick();
                document.querySelectorAll('.shop-tab').forEach(t => t.classList.remove('active'));
                tab.classList.add('active');
                this.renderShopItems(tab.dataset.tab);
            });
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

    updateVirtualPet() {
        const equippedHat = SHOP_HATS.find(h => h.id === this.inventory.equippedHat);
        this.petHatDisplay.textContent = (equippedHat && equippedHat.emoji !== '🎁') ? equippedHat.emoji : '';
    }

    getTotalStars() {
        let total = 0;
        Object.values(this.starsData).forEach(s => total += s);
        return total;
    }

    updateTotalStars() {
        this.totalStarsEl.textContent = this.getTotalStars();
    }

    renderLevelMap() {
        this.updateTotalStars();
        this.levelsContainer.innerHTML = '';

        LEVELS.forEach(lvl => {
            const isUnlocked = lvl.id <= this.unlockedLevel;
            const stars = this.starsData[lvl.id] || 0;

            const card = document.createElement('div');
            card.className = `level-card ${isUnlocked ? 'unlocked' : 'locked'}`;
            
            let themeIcon = '🐱';
            if (lvl.theme === 'wild') themeIcon = '🦁';
            else if (lvl.theme === 'sea') themeIcon = '🐬';

            card.innerHTML = `
                ${!isUnlocked ? '<div class="lock-badge">🔒</div>' : ''}
                <div class="level-number">${themeIcon} Bölüm ${lvl.id}</div>
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

        const containerPadding = 8;
        const availableWidth = this.cardsGridContainer.clientWidth - (containerPadding * 2);
        const availableHeight = this.cardsGridContainer.clientHeight - (containerPadding * 2);

        if (availableWidth <= 0 || availableHeight <= 0) return;

        const vw = window.innerWidth;
        const totalCards = levelConfig.pairs * 2;
        const isDesktop = vw >= 768;

        let cols, rows;

        if (isDesktop) {
            if (totalCards === 24) { cols = 6; rows = 4; }
            else if (totalCards === 20) { cols = 5; rows = 4; }
            else if (totalCards === 16) { cols = 4; rows = 4; }
            else if (totalCards === 12) { cols = 4; rows = 3; }
            else if (totalCards === 8)   { cols = 4; rows = 2; }
            else if (totalCards === 6)  { cols = 3; rows = 2; }
            else if (totalCards === 4)  { cols = 2; rows = 2; }
        } else {
            if (totalCards === 24) { cols = 4; rows = 6; }
            else if (totalCards === 20) { cols = 4; rows = 5; }
            else if (totalCards === 16) { cols = 4; rows = 4; }
            else if (totalCards === 12) { cols = 3; rows = 4; }
            else if (totalCards === 8)   { cols = 2; rows = 4; }
            else if (totalCards === 6)  { cols = 2; rows = 3; }
            else if (totalCards === 4)  { cols = 2; rows = 2; }
        }

        const gap = isDesktop ? 14 : 8;

        const maxCardW = (availableWidth - (cols - 1) * gap) / cols;
        const maxCardH = (availableHeight - (rows - 1) * gap) / rows;

        let cardSize = Math.floor(Math.min(maxCardW, maxCardH));
        const minSize = isDesktop ? 80 : 56;
        cardSize = Math.max(minSize, cardSize);

        this.cardsGrid.style.gridTemplateColumns = `repeat(${cols}, ${cardSize}px)`;
        this.cardsGrid.style.gridTemplateRows = `repeat(${rows}, ${cardSize}px)`;
        this.cardsGrid.style.gap = `${gap}px`;

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
        this.comboCount = 0;
        this.lastMatchTime = 0;
        this.hintsRemaining = 3;
        this.hintCountEl.textContent = '3';

        // 2 Player Turn-by-Turn setup
        this.currentPlayer = 1;
        this.p1Score = 0;
        this.p2Score = 0;

        if (this.gameMode === '2p') {
            this.playerTurnTag.style.display = 'inline-block';
            this.playerTurnTag.innerHTML = `Sıra: <strong style="font-size:1.1rem; color:#ffe66d;">${this.currentPlayer}. OYUNCU 👤</strong> (P1: 0 - P2: 0)`;
        } else {
            this.playerTurnTag.style.display = 'none';
        }

        this.movesText.textContent = '0';
        this.resetTimer();
        this.startTimer();

        this.levelMapView.style.display = 'none';
        this.gameView.style.display = 'flex';

        this.renderCards(levelConfig);
    }

    renderCards(levelConfig) {
        this.cardsGrid.innerHTML = '';
        
        const currentThemeKey = levelConfig.theme || 'pets';
        const cardPool = CARD_THEMES[currentThemeKey] || CARD_THEMES.pets;
        const selectedCards = cardPool.slice(0, levelConfig.pairs);
        const cardDeck = [...selectedCards, ...selectedCards];
        
        this.shuffle(cardDeck);

        const equippedSkin = CARD_SKINS.find(s => s.id === this.inventory.equippedSkin);
        const skinClass = equippedSkin ? equippedSkin.class : '';
        const skinIcon = equippedSkin ? equippedSkin.icon : '🐾';

        cardDeck.forEach((cardObj, index) => {
            const cardEl = document.createElement('div');
            cardEl.className = 'card';
            cardEl.dataset.key = cardObj.name;
            cardEl.dataset.index = index;

            let frontHTML = '';
            if (cardObj.src) {
                frontHTML = `<img src="${cardObj.src}" alt="${cardObj.name}" />`;
            } else if (currentThemeKey === 'wild') {
                frontHTML = `
                    <div class="card-front-illustrated card-front-wild">
                        <span class="card-character-badge">🌴 Orman</span>
                        <span class="card-character-avatar">${cardObj.emoji}</span>
                        <div class="card-character-ribbon">${cardObj.name}</div>
                    </div>
                `;
            } else if (currentThemeKey === 'sea') {
                frontHTML = `
                    <div class="card-front-illustrated card-front-sea">
                        <span class="card-character-badge">🌊 Deniz</span>
                        <span class="card-character-avatar">${cardObj.emoji}</span>
                        <div class="card-character-ribbon">${cardObj.name}</div>
                    </div>
                `;
            }

            cardEl.innerHTML = `
                <div class="card-face card-back ${skinClass}">
                    <div class="card-back-pattern">${skinIcon}</div>
                </div>
                <div class="card-face card-front">
                    ${frontHTML}
                </div>
            `;

            cardEl.addEventListener('click', () => this.handleCardClick(cardEl));
            this.cardsGrid.appendChild(cardEl);
        });

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

        if (card1.dataset.key === card2.dataset.key) {
            // Match found!
            const now = Date.now();
            if (now - this.lastMatchTime < 4500 && this.lastMatchTime !== 0) {
                this.comboCount++;
                this.showComboBanner(this.comboCount);
                window.soundManager.playCombo(this.comboCount);
            } else {
                this.comboCount = 1;
                window.soundManager.playMatch();
            }
            this.lastMatchTime = now;

            setTimeout(() => {
                card1.classList.add('matched');
                card2.classList.add('matched');
                this.flippedCards = [];
                this.isBusy = false;
                this.matchedPairs++;

                if (this.gameMode === '2p') {
                    if (this.currentPlayer === 1) this.p1Score++;
                    else this.p2Score++;
                    this.playerTurnTag.innerHTML = `Sıra: <strong style="font-size:1.1rem; color:#ffe66d;">${this.currentPlayer}. OYUNCU 👤</strong> (P1: ${this.p1Score} - P2: ${this.p2Score})`;
                }

                const levelConfig = LEVELS.find(l => l.id === this.currentLevel);
                if (this.matchedPairs === levelConfig.pairs) {
                    this.handleVictory(levelConfig);
                }
            }, 300);
        } else {
            // Mismatch
            this.comboCount = 0;
            setTimeout(() => {
                window.soundManager.playMismatch();
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                this.flippedCards = [];
                this.isBusy = false;

                // Turn switches on mismatch!
                if (this.gameMode === '2p') {
                    this.currentPlayer = this.currentPlayer === 1 ? 2 : 1;
                    this.playerTurnTag.innerHTML = `Sıra: <strong style="font-size:1.1rem; color:#ffe66d;">${this.currentPlayer}. OYUNCU 👤</strong> (P1: ${this.p1Score} - P2: ${this.p2Score})`;
                }
            }, 900);
        }
    }

    showComboBanner(count) {
        if (count < 2) return;
        this.comboBanner.textContent = `🔥 KOMBO x${count}! ⭐`;
        this.comboBanner.classList.add('active');
        setTimeout(() => {
            this.comboBanner.classList.remove('active');
        }, 1200);
    }

    useHint() {
        if (this.hintsRemaining <= 0 || this.isBusy) return;

        const unmatchedCards = Array.from(this.cardsGrid.querySelectorAll('.card:not(.matched):not(.flipped)'));
        if (unmatchedCards.length < 2) return;

        let pair1 = null, pair2 = null;
        for (let i = 0; i < unmatchedCards.length; i++) {
            for (let j = i + 1; j < unmatchedCards.length; j++) {
                if (unmatchedCards[i].dataset.key === unmatchedCards[j].dataset.key) {
                    pair1 = unmatchedCards[i];
                    pair2 = unmatchedCards[j];
                    break;
                }
            }
            if (pair1) break;
        }

        if (pair1 && pair2) {
            this.hintsRemaining--;
            this.hintCountEl.textContent = this.hintsRemaining;
            window.soundManager.playHint();

            pair1.classList.add('hint-glow');
            pair2.classList.add('hint-glow');

            setTimeout(() => {
                pair1.classList.remove('hint-glow');
                pair2.classList.remove('hint-glow');
            }, 1400);
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

        if (this.gameMode === '2p') {
            let winnerText = '';
            if (this.p1Score > this.p2Score) {
                winnerText = '🏆 1. OYUNCU KAZANDI!';
            } else if (this.p2Score > this.p1Score) {
                winnerText = '🏆 2. OYUNCU KAZANDI!';
            } else {
                winnerText = '🤝 MUHTEŞEM BERABERLİK!';
            }
            this.victoryTitle.textContent = winnerText;
            this.victorySubtitle.textContent = `1. Oyuncu: ${this.p1Score} Çift vs 2. Oyuncu: ${this.p2Score} Çift`;
        } else {
            this.victoryTitle.textContent = 'Tebrikler! 🎉';
            this.victorySubtitle.textContent = 'Bölümü Başarıyla Tamamladın!';
        }

        const earnedStars = this.calculateStars(levelConfig);
        
        if (this.currentLevel >= this.unlockedLevel && this.unlockedLevel < LEVELS.length) {
            this.unlockedLevel = this.currentLevel + 1;
            localStorage.setItem('kedi_kopek_unlocked', this.unlockedLevel.toString());
        }

        const prevStars = this.starsData[this.currentLevel] || 0;
        if (earnedStars > prevStars) {
            this.starsData[this.currentLevel] = earnedStars;
            localStorage.setItem('kedi_kopek_stars', JSON.stringify(this.starsData));
        }

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

    // Shop System
    openShopModal() {
        this.renderShopItems('hats');
        this.shopModal.classList.add('active');
    }

    renderShopItems(type) {
        const totalStars = this.getTotalStars();
        this.shopItemsContainer.innerHTML = '';

        if (type === 'hats') {
            SHOP_HATS.forEach(hat => {
                const isOwned = this.inventory.hats.includes(hat.id);
                const isEquipped = this.inventory.equippedHat === hat.id;

                const itemEl = document.createElement('div');
                itemEl.className = 'shop-item';
                itemEl.innerHTML = `
                    <div class="gift-badge">🎁 Sürpriz Kutu</div>
                    <div class="shop-item-icon">${hat.emoji}</div>
                    <div class="shop-item-name">${hat.name}</div>
                    <div class="shop-item-price">${hat.price === 0 ? 'Ücretsiz' : `${hat.price} ⭐`}</div>
                    <button class="btn ${isEquipped ? 'btn-secondary' : (isOwned ? 'btn-primary' : 'btn-accent')}">
                        ${isEquipped ? 'Giyildi' : (isOwned ? 'Giy' : 'Aç 🎁')}
                    </button>
                `;

                const btn = itemEl.querySelector('button');
                btn.addEventListener('click', () => {
                    if (isOwned) {
                        this.inventory.equippedHat = hat.id;
                        this.saveInventory();
                        this.updateVirtualPet();
                        this.renderShopItems('hats');
                    } else if (totalStars >= hat.price) {
                        this.inventory.hats.push(hat.id);
                        this.inventory.equippedHat = hat.id;
                        this.saveInventory();
                        this.updateVirtualPet();
                        this.renderShopItems('hats');
                    }
                });

                this.shopItemsContainer.appendChild(itemEl);
            });
        } else {
            CARD_SKINS.forEach(skin => {
                const isOwned = this.inventory.skins.includes(skin.id);
                const isEquipped = this.inventory.equippedSkin === skin.id;

                const itemEl = document.createElement('div');
                itemEl.className = 'shop-item';
                itemEl.innerHTML = `
                    <div class="gift-badge">🃏 Desen Paketi</div>
                    <div class="shop-item-icon">${skin.icon}</div>
                    <div class="shop-item-name">${skin.name}</div>
                    <div class="shop-item-price">${skin.price === 0 ? 'Ücretsiz' : `${skin.price} ⭐`}</div>
                    <button class="btn ${isEquipped ? 'btn-secondary' : (isOwned ? 'btn-primary' : 'btn-accent')}">
                        ${isEquipped ? 'Seçildi' : (isOwned ? 'Seç' : 'Aç 🎁')}
                    </button>
                `;

                const btn = itemEl.querySelector('button');
                btn.addEventListener('click', () => {
                    if (isOwned || totalStars >= skin.price) {
                        if (!isOwned) this.inventory.skins.push(skin.id);
                        this.inventory.equippedSkin = skin.id;
                        this.saveInventory();
                        this.renderShopItems('skins');

                        // Dynamically update existing card backs on game board
                        const cardBacks = document.querySelectorAll('.card-back');
                        cardBacks.forEach(cb => {
                            cb.className = `card-face card-back ${skin.class}`;
                            const patternEl = cb.querySelector('.card-back-pattern');
                            if (patternEl) patternEl.textContent = skin.icon;
                        });
                    }
                });

                this.shopItemsContainer.appendChild(itemEl);
            });
        }
    }

    saveInventory() {
        localStorage.setItem('kedi_kopek_inv', JSON.stringify(this.inventory));
    }

    // Sticker Album System
    openAlbumModal() {
        this.albumGrid.innerHTML = '';
        const levelConfig = LEVELS.find(l => l.id === this.currentLevel) || LEVELS[0];
        const currentPool = CARD_THEMES[levelConfig.theme] || CARD_THEMES.pets;

        currentPool.forEach((card, i) => {
            const isUnlocked = i < this.unlockedLevel * 2;
            const el = document.createElement('div');
            el.className = 'album-item';

            let mediaHTML = '';
            if (card.src) {
                mediaHTML = `<img src="${card.src}" style="width:100%; height:100%; object-fit:cover; border-radius:12px;" />`;
            } else {
                mediaHTML = `<span style="font-size:2.5rem;">${card.emoji}</span>`;
            }

            el.innerHTML = `
                <div class="gift-badge">${isUnlocked ? '🌟 Çıkartma' : '🔒 Kilitli Hediye'}</div>
                <div class="shop-item-icon" style="height:60px; display:flex; align-items:center; justify-content:center; margin-top:6px;">
                    ${isUnlocked ? mediaHTML : '🎁'}
                </div>
                <div class="shop-item-name">${isUnlocked ? card.name : 'Sürpriz Dost'}</div>
                <div style="font-size:0.75rem; color:#747d8c; margin-top:2px;">${isUnlocked ? card.bio : 'Bölümleri geç ve hediyeni aç!'}</div>
            `;
            this.albumGrid.appendChild(el);
        });
        this.albumModal.classList.add('active');
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
                    p.vy += 0.35;
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
