class ThemeManager {
    constructor() {
        this.currentTheme = 'default';
        this.themes = {
            'default': {
                name: 'Default Theme',
                primary: '#2c5c2c',
                secondary: '#d4af37',
                accent: '#8b4513',
                light: '#f8f5f0',
                dark: '#1a331a',
                background: 'linear-gradient(rgba(44, 92, 44, 0.9), rgba(26, 51, 26, 0.95))',
                heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136',
                rhyme: 'Rooted in Christ, Serving in Love'
            },
            'valentines': {
                name: 'Valentine\'s Day',
                primary: '#c44569',
                secondary: '#ff7979',
                accent: '#eb4d4b',
                light: '#ffebee',
                dark: '#6d214f',
                background: 'linear-gradient(rgba(196, 69, 105, 0.9), rgba(109, 33, 79, 0.95))',
                heroImage: 'https://images.unsplash.com/photo-1519681393784-d120267933ba',
                rhyme: 'God\'s Love is Sweet, Our Hearts to Meet'
            },
            'easter': {
                name: 'Easter Celebration',
                primary: '#6c5ce7',
                secondary: '#a29bfe',
                accent: '#fd79a8',
                light: '#dfe6e9',
                dark: '#2d3436',
                background: 'linear-gradient(rgba(108, 92, 231, 0.9), rgba(45, 52, 54, 0.95))',
                heroImage: 'https://images.unsplash.com/photo-1464207687429-7505649dae38',
                rhyme: 'He is Risen, Death is Beaten'
            },
            'christmas': {
                name: 'Christmas Season',
                primary: '#2d3436',
                secondary: '#d63031',
                accent: '#00b894',
                light: '#dfe6e9',
                dark: '#2d3436',
                background: 'linear-gradient(rgba(45, 52, 54, 0.9), rgba(214, 48, 49, 0.95))',
                heroImage: 'https://images.unsplash.com/photo-1543886148-59472a663b0c',
                rhyme: 'Joy to the World, Our Savior\'s Birth'
            },
            'lunar-horse': {
                name: 'Lunar Horse Year',
                primary: '#e17055',
                secondary: '#fdcb6e',
                accent: '#00cec9',
                light: '#ffeaa7',
                dark: '#e17055',
                background: 'linear-gradient(rgba(225, 112, 85, 0.9), rgba(253, 203, 110, 0.95))',
                heroImage: 'https://images.unsplash.com/photo-1548187987-26033d7c5e11',
                rhyme: 'Galloping Forward, God\'s Grace Aboard'
            },
            'harvest': {
                name: 'Harvest Festival',
                primary: '#e67e22',
                secondary: '#f39c12',
                accent: '#d35400',
                light: '#fef9e7',
                dark: '#784212',
                background: 'linear-gradient(rgba(230, 126, 34, 0.9), rgba(120, 66, 18, 0.95))',
                heroImage: 'https://images.unsplash.com/photo-1544717305-2782549b5136',
                rhyme: 'Bountiful Blessings, Hearts Expressing'
            }
        };
        
        this.init();
    }
    
    init() {
        this.detectHoliday();
        this.applyTheme(this.currentTheme);
    }
    
    detectHoliday() {
        const today = new Date();
        const month = today.getMonth() + 1;
        const date = today.getDate();
        const year = today.getFullYear();
        
        // Valentine's Day (Feb 14)
        if (month === 2 && date === 14) {
            this.currentTheme = 'valentines';
            return;
        }
        
        // Easter (simplified detection - April)
        if (month === 4 && date >= 1 && date <= 30) {
            this.currentTheme = 'easter';
            return;
        }
        
        // Christmas (Dec 15-31)
        if (month === 12 && date >= 15) {
            this.currentTheme = 'christmas';
            return;
        }
        
        // Lunar Horse Year (Example: 2026 is Fire Horse Year)
        const lunarHorseYears = [202, 2014, 2002, 1990];
        if (lunarHorseYears.includes(year) && month === 1) {
            this.currentTheme = 'lunar-horse';
            return;
        }
        
        // Harvest Festival (Fall - Sep-Nov)
        if (month >= 9 && month <= 11) {
            this.currentTheme = 'harvest';
            return;
        }
        
        this.currentTheme = 'default';
    }
    
    applyTheme(themeName) {
        const theme = this.themes[themeName];
        if (!theme) return;
        
        // Apply CSS variables
        document.documentElement.style.setProperty('--primary', theme.primary);
        document.documentElement.style.setProperty('--secondary', theme.secondary);
        document.documentElement.style.setProperty('--accent', theme.accent);
        document.documentElement.style.setProperty('--light', theme.light);
        document.documentElement.style.setProperty('--dark', theme.dark);
        
        // Update hero background
        const heroSection = document.querySelector('.login-hero');
        if (heroSection) {
            heroSection.style.background = `${theme.background}, url(${theme.heroImage})`;
            heroSection.style.backgroundSize = 'cover';
            heroSection.style.backgroundPosition = 'center';
            
            // Update rhyme if exists
            const rhymeElement = document.getElementById('theme-rhyme');
            if (rhymeElement) {
                rhymeElement.textContent = theme.rhyme;
            }
        }
        
        // Add theme class to body for specific styling
        document.body.classList.remove(...Object.keys(this.themes));
        document.body.classList.add(themeName);
        
        // Trigger theme change animation
        this.animateThemeChange();
    }
    
    animateThemeChange() {
        const elements = document.querySelectorAll('.navbar, .login-card, .quick-link-card');
        
        elements.forEach(element => {
            element.style.transition = 'all 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
            element.style.transform = 'scale(0.98)';
            
            setTimeout(() => {
                element.style.transform = 'scale(1)';
                
                // Add floating animation for holiday themes
                if (this.currentTheme !== 'default') {
                    element.style.animation = 'float 3s ease-in-out infinite';
                } else {
                    element.style.animation = 'none';
                }
            }, 100);
        });
        
        // Add floating animation keyframes
        if (!document.getElementById('theme-animations')) {
            const style = document.createElement('style');
            style.id = 'theme-animations';
            style.textContent = `
                @keyframes float {
                    0%, 100% { transform: translateY(0px); }
                    50% { transform: translateY(-10px); }
                }
                
                @keyframes confetti {
                    0% { transform: translateY(-100vh) rotate(0deg); opacity: 1; }
                    100% { transform: translateY(100vh) rotate(360deg); opacity: 0; }
                }
                
                @keyframes twinkle {
                    0%, 100% { opacity: 0.3; }
                    50% { opacity: 1; }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Add holiday-specific effects
        this.addHolidayEffects();
    }
    
    addHolidayEffects() {
        // Remove existing effects
        const existingEffects = document.querySelectorAll('.holiday-effect');
        existingEffects.forEach(effect => effect.remove());
        
        // Add effects based on theme
        switch(this.currentTheme) {
            case 'valentines':
                this.addHearts();
                break;
            case 'christmas':
                this.addSnowflakes();
                break;
            case 'easter':
                this.addEggs();
                break;
            case 'lunar-horse':
                this.addHorses();
                break;
        }
    }
    
    addHearts() {
        for (let i = 0; i < 20; i++) {
            const heart = document.createElement('div');
            heart.className = 'holiday-effect heart';
            heart.innerHTML = '❤️';
            heart.style.position = 'fixed';
            heart.style.top = `${Math.random() * 100}vh`;
            heart.style.left = `${Math.random() * 100}vw`;
            heart.style.fontSize = `${Math.random() * 20 + 10}px`;
            heart.style.opacity = Math.random() * 0.5 + 0.3;
            heart.style.zIndex = '9999';
            heart.style.pointerEvents = 'none';
            heart.style.animation = `confetti ${Math.random() * 10 + 10}s linear infinite`;
            heart.style.animationDelay = `${Math.random() * 5}s`;
            document.body.appendChild(heart);
        }
    }
    
    addSnowflakes() {
        for (let i = 0; i < 30; i++) {
            const snowflake = document.createElement('div');
            snowflake.className = 'holiday-effect snowflake';
            snowflake.innerHTML = '❄️';
            snowflake.style.position = 'fixed';
            snowflake.style.top = `${Math.random() * 100}vh`;
            snowflake.style.left = `${Math.random() * 100}vw`;
            snowflake.style.fontSize = `${Math.random() * 20 + 10}px`;
            snowflake.style.opacity = Math.random() * 0.7 + 0.3;
            snowflake.style.zIndex = '9999';
            snowflake.style.pointerEvents = 'none';
            snowflake.style.animation = `confetti ${Math.random() * 15 + 15}s linear infinite`;
            snowflake.style.animationDelay = `${Math.random() * 10}s`;
            document.body.appendChild(snowflake);
        }
    }
    
    addEggs() {
        for (let i = 0; i < 15; i++) {
            const egg = document.createElement('div');
            egg.className = 'holiday-effect egg';
            egg.innerHTML = '🥚';
            egg.style.position = 'fixed';
            egg.style.top = `${Math.random() * 100}vh`;
            egg.style.left = `${Math.random() * 100}vw`;
            egg.style.fontSize = `${Math.random() * 25 + 15}px`;
            egg.style.opacity = Math.random() * 0.6 + 0.4;
            egg.style.zIndex = '9999';
            egg.style.pointerEvents = 'none';
            egg.style.animation = `float ${Math.random() * 8 + 4}s ease-in-out infinite`;
            egg.style.animationDelay = `${Math.random() * 2}s`;
            document.body.appendChild(egg);
        }
    }
    
    addHorses() {
        for (let i = 0; i < 10; i++) {
            const horse = document.createElement('div');
            horse.className = 'holiday-effect horse';
            horse.innerHTML = '🐎';
            horse.style.position = 'fixed';
            horse.style.top = `${Math.random() * 100}vh`;
            horse.style.left = `${Math.random() * 100}vw`;
            horse.style.fontSize = `${Math.random() * 30 + 20}px`;
            horse.style.opacity = Math.random() * 0.5 + 0.3;
            horse.style.zIndex = '9999';
            horse.style.pointerEvents = 'none';
            horse.style.animation = `float ${Math.random() * 6 + 3}s ease-in-out infinite`;
            horse.style.animationDelay = `${Math.random() * 3}s`;
            document.body.appendChild(horse);
        }
    }
}
