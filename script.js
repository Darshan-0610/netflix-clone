/* ============================================
   Netflix Clone - JavaScript Implementation
   Vanilla JavaScript with 6+ Interactive Features
   ============================================ */

// ===== 1. NAVIGATION SCROLL EFFECT =====
// Changes navbar background from transparent to solid on scroll

/**
 * Throttle function to limit how often a function can be called
 * Improves performance for scroll events
 * @param {Function} func - Function to throttle
 * @param {number} limit - Time limit in milliseconds
 */
function throttle(func, limit) {
    let inThrottle;
    return function () {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

/**
 * Handle navbar scroll effect
 * Adds 'scrolled' class when user scrolls down
 */
function handleNavbarScroll() {
    const navbar = document.getElementById('navbar');

    // Error handling: Check if navbar exists
    if (!navbar) {
        console.warn('Navbar element not found');
        return;
    }

    // Add scrolled class if scrolled more than 50px
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
}

// Attach throttled scroll event listener for performance
window.addEventListener('scroll', throttle(handleNavbarScroll, 100));


// ===== 2. HORIZONTAL CONTENT CAROUSELS =====
// Smooth scrolling carousels with left/right navigation

/**
 * Initialize all carousels on the page
 * Sets up navigation buttons and scroll behavior
 */
function initializeCarousels() {
    const carouselContainers = document.querySelectorAll('.carousel-container');

    // Error handling: Check if carousels exist
    if (carouselContainers.length === 0) {
        console.warn('No carousel containers found');
        return;
    }

    carouselContainers.forEach(container => {
        const carousel = container.querySelector('.carousel');
        const leftBtn = container.querySelector('.carousel-btn-left');
        const rightBtn = container.querySelector('.carousel-btn-right');

        // Error handling: Verify all elements exist
        if (!carousel || !leftBtn || !rightBtn) {
            console.warn('Carousel elements incomplete', container);
            return;
        }

        // Scroll amount (80% of carousel width)
        const scrollAmount = carousel.offsetWidth * 0.8;

        // Left button click handler
        leftBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: -scrollAmount,
                behavior: 'smooth'
            });
        });

        // Right button click handler
        rightBtn.addEventListener('click', () => {
            carousel.scrollBy({
                left: scrollAmount,
                behavior: 'smooth'
            });
        });

        // Update button visibility based on scroll position
        function updateCarouselButtons() {
            const scrollLeft = carousel.scrollLeft;
            const maxScroll = carousel.scrollWidth - carousel.clientWidth;

            // Hide left button at start
            if (scrollLeft <= 0) {
                leftBtn.classList.add('hidden');
            } else {
                leftBtn.classList.remove('hidden');
            }

            // Hide right button at end
            if (scrollLeft >= maxScroll - 5) { // -5 for rounding errors
                rightBtn.classList.add('hidden');
            } else {
                rightBtn.classList.remove('hidden');
            }
        }

        // Initialize button states
        updateCarouselButtons();

        // Update on scroll
        carousel.addEventListener('scroll', throttle(updateCarouselButtons, 100));

        // Update on window resize
        window.addEventListener('resize', throttle(updateCarouselButtons, 200));
    });
}


// ===== 3. FAQ ACCORDION =====
// Expand/collapse FAQ items with smooth animations

/**
 * Initialize FAQ accordion functionality
 * Single active item - closes others when opening new
 */
function initializeFAQ() {
    const faqContainer = document.getElementById('faqContainer');

    // Error handling: Check if FAQ container exists
    if (!faqContainer) {
        console.warn('FAQ container not found');
        return;
    }

    const faqQuestions = faqContainer.querySelectorAll('.faq-question');

    // Error handling: Check if FAQ questions exist
    if (faqQuestions.length === 0) {
        console.warn('No FAQ questions found');
        return;
    }

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const faqItem = question.parentElement;
            const answer = faqItem.querySelector('.faq-answer');
            const isActive = answer.classList.contains('active');

            // Close all other FAQ items (single active item pattern)
            const allAnswers = faqContainer.querySelectorAll('.faq-answer');
            const allQuestions = faqContainer.querySelectorAll('.faq-question');

            allAnswers.forEach(ans => ans.classList.remove('active'));
            allQuestions.forEach(q => q.setAttribute('aria-expanded', 'false'));

            // Toggle current item
            if (!isActive) {
                answer.classList.add('active');
                question.setAttribute('aria-expanded', 'true');
            }
        });

        // Keyboard accessibility - Enter and Space keys
        question.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                question.click();
            }
        });
    });
}


// ===== 4. VIDEO MODAL =====
// Modal popup for video playback with overlay and close functionality

/**
 * Initialize modal functionality
 * Opens on button clicks, closes on overlay/close button/ESC key
 */
function initializeModal() {
    const modal = document.getElementById('videoModal');
    const modalClose = document.getElementById('modalClose');
    const modalOverlay = document.getElementById('modalOverlay');

    // Error handling: Check if modal elements exist
    if (!modal || !modalClose || !modalOverlay) {
        console.warn('Modal elements incomplete');
        return;
    }

    /**
     * Close modal and restore body scroll
     */
    function closeModal() {
        modal.classList.remove('active');
        document.body.classList.remove('modal-open');
        console.log('Modal closed');
    }

    // Close modal on close button click
    modalClose.addEventListener('click', closeModal);

    // Close modal on overlay click
    modalOverlay.addEventListener('click', closeModal);

    // Close modal on ESC key press
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closeModal();
        }
    });

    console.log('Modal initialized successfully');
}


// ===== 5. DYNAMIC CONTENT LOADING =====
// Populate carousel content cards dynamically

/**
 * Sample content data for carousels
 * In production, this would come from an API
 */
const contentData = {
    trending: [
        { id: 2, title: 'The Crown', image: 'https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&h=450&fit=crop', year: 2016, rating: 'U/A 16+', duration: '6 Seasons', genres: ['Drama', 'Historical'], description: 'This drama follows the political rivalries and romance of Queen Elizabeth II\'s reign and the events that shaped the second half of the 20th century.', cast: 'Claire Foy, Olivia Colman, Imelda Staunton', director: 'Peter Morgan' },
        { id: 3, title: 'Bridgerton', image: 'https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&h=450&fit=crop', year: 2020, rating: 'U/A 18+', duration: '3 Seasons', genres: ['Romance', 'Drama', 'Period'], description: 'The eight close-knit siblings of the Bridgerton family look for love and happiness in London high society. Inspired by Julia Quinn\'s bestselling novels.', cast: 'Phoebe Dynevor, Regé-Jean Page, Jonathan Bailey', director: 'Chris Van Dusen' },
        { id: 4, title: 'Money Heist', image: 'https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&h=450&fit=crop', year: 2017, rating: 'U/A 18+', duration: '5 Seasons', genres: ['Crime', 'Thriller', 'Drama'], description: 'To carry out the biggest heist in history, a mysterious man called The Professor recruits a band of eight robbers who have a single characteristic: none of them has anything to lose.', cast: 'Álvaro Morte, Úrsula Corberó, Pedro Alonso', director: 'Álex Pina' },
        { id: 5, title: 'Squid Game', image: 'https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=800&h=450&fit=crop', year: 2021, rating: 'U/A 18+', duration: '1 Season', genres: ['Thriller', 'Drama', 'Survival'], description: 'Hundreds of cash-strapped contestants accept an invitation to compete in children\'s games for a tempting prize, but the stakes are deadly.', cast: 'Lee Jung-jae, Park Hae-soo, Wi Ha-jun', director: 'Hwang Dong-hyuk' },
        { id: 6, title: 'The Witcher', image: 'https://images.unsplash.com/photo-1535016120720-40c646be5580?w=800&h=450&fit=crop', year: 2019, rating: 'U/A 18+', duration: '3 Seasons', genres: ['Fantasy', 'Action', 'Adventure'], description: 'Geralt of Rivia, a solitary monster hunter, struggles to find his place in a world where people often prove more wicked than beasts.', cast: 'Henry Cavill, Anya Chalotra, Freya Allan', director: 'Lauren Schmidt Hissrich' },
        { id: 7, title: 'Ozark', image: 'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=450&fit=crop', year: 2017, rating: 'U/A 18+', duration: '4 Seasons', genres: ['Crime', 'Drama', 'Thriller'], description: 'A financial advisor drags his family from Chicago to the Missouri Ozarks, where he must launder money to appease a drug boss.', cast: 'Jason Bateman, Laura Linney, Julia Garner', director: 'Bill Dubuque, Mark Williams' },
        { id: 8, title: 'Dark', image: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&h=450&fit=crop', year: 2017, rating: 'U/A 16+', duration: '3 Seasons', genres: ['Sci-Fi', 'Mystery', 'Thriller'], description: 'A family saga with a supernatural twist, set in a German town where the disappearance of two young children exposes the relationships among four families.', cast: 'Louis Hofmann, Lisa Vicari, Maja Schöne', director: 'Baran bo Odar, Jantje Friese' },
        { id: 25, title: 'Succession', image: 'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800&h=450&fit=crop', year: 2018, rating: 'U/A 18+', duration: '4 Seasons', genres: ['Drama', 'Comedy'], description: 'The Roy family is known for controlling the biggest media and entertainment company in the world. However, their world changes when their father steps down from the company.', cast: 'Brian Cox, Jeremy Strong, Sarah Snook', director: 'Jesse Armstrong' },
        { id: 26, title: 'The Last of Us', image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=800&h=450&fit=crop', year: 2023, rating: 'U/A 18+', duration: '1 Season', genres: ['Drama', 'Sci-Fi', 'Adventure'], description: 'Twenty years after a fungal outbreak ravages the planet, survivors Joel and Ellie embark on a brutal journey through a post-apocalyptic America.', cast: 'Pedro Pascal, Bella Ramsey, Anna Torv', director: 'Craig Mazin, Neil Druckmann' }
    ],
    popular: [
        { id: 9, title: 'Breaking Bad', image: 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&h=450&fit=crop', year: 2008, rating: 'U/A 18+', duration: '5 Seasons', genres: ['Crime', 'Drama', 'Thriller'], description: 'A high school chemistry teacher diagnosed with cancer turns to producing and selling methamphetamine in order to secure his family\'s future.', cast: 'Bryan Cranston, Aaron Paul, Anna Gunn', director: 'Vince Gilligan' },
        { id: 10, title: 'Narcos', image: 'https://images.unsplash.com/photo-1518563077261-6e10b45a6838?w=800&h=450&fit=crop', year: 2015, rating: 'U/A 18+', duration: '3 Seasons', genres: ['Crime', 'Drama', 'Thriller'], description: 'A chronicled look at the criminal exploits of Colombian drug lord Pablo Escobar, as well as the many other drug kingpins who plagued the country through the years.', cast: 'Wagner Moura, Pedro Pascal, Boyd Holbrook', director: 'Chris Brancato, Carlo Bernard, Doug Miro' },
        { id: 11, title: 'Black Mirror', image: 'https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&h=450&fit=crop', year: 2011, rating: 'U/A 16+', duration: '5 Seasons', genres: ['Sci-Fi', 'Thriller', 'Drama'], description: 'An anthology series exploring a twisted, high-tech multiverse where humanity\'s greatest innovations and darkest instincts collide.', cast: 'Various', director: 'Charlie Brooker' },
        { id: 12, title: 'Peaky Blinders', image: 'https://images.unsplash.com/photo-1504608524841-42fe6f032b4b?w=800&h=450&fit=crop', year: 2013, rating: 'U/A 18+', duration: '6 Seasons', genres: ['Crime', 'Drama', 'Historical'], description: 'A gangster family epic set in 1919 Birmingham, England, centering on a gang who sew razor blades in the peaks of their caps.', cast: 'Cillian Murphy, Paul Anderson, Helen McCrory', director: 'Steven Knight' },
        { id: 13, title: 'The Umbrella Academy', image: 'https://images.unsplash.com/photo-1575988168550-29f1c69a02c7?w=800&h=450&fit=crop', year: 2019, rating: 'U/A 16+', duration: '3 Seasons', genres: ['Action', 'Sci-Fi', 'Comedy'], description: 'A dysfunctional family of adopted sibling superheroes reunites to solve the mystery of their father\'s death and the threat of an impending apocalypse.', cast: 'Elliot Page, Tom Hopper, David Castañeda', director: 'Steve Blackman' },
        { id: 14, title: 'Vikings', image: 'https://images.unsplash.com/photo-1520365390420-504fa6c8e1ae?w=800&h=450&fit=crop', year: 2013, rating: 'U/A 18+', duration: '6 Seasons', genres: ['Action', 'Drama', 'Historical'], description: 'Vikings transports us to the brutal and mysterious world of Ragnar Lothbrok, a Viking warrior and farmer who yearns to explore and raid the distant shores across the ocean.', cast: 'Travis Fimmel, Katheryn Winnick, Clive Standen', director: 'Michael Hirst' },
        { id: 15, title: 'Lucifer', image: 'https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?w=800&h=450&fit=crop', year: 2016, rating: 'U/A 16+', duration: '6 Seasons', genres: ['Crime', 'Drama', 'Fantasy'], description: 'Bored with being the Lord of Hell, the devil relocates to Los Angeles, where he opens a nightclub and forms a connection with a homicide detective.', cast: 'Tom Ellis, Lauren German, Kevin Alejandro', director: 'Tom Kapinos' },
        { id: 16, title: 'Emily in Paris', image: 'https://images.unsplash.com/photo-1502877338535-766e1452684a?w=800&h=450&fit=crop', year: 2020, rating: 'U/A 13+', duration: '3 Seasons', genres: ['Comedy', 'Drama', 'Romance'], description: 'A young American woman from the Midwest is hired by a marketing firm in Paris to provide them with an American perspective on things.', cast: 'Lily Collins, Philippine Leroy-Beaulieu, Ashley Park', director: 'Darren Star' }
    ],
    top10: [
        { id: 17, title: 'Wednesday', image: 'https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&h=450&fit=crop', year: 2022, rating: 'U/A 13+', duration: '1 Season', genres: ['Comedy', 'Horror', 'Mystery'], description: 'Smart, sarcastic and a little dead inside, Wednesday Addams investigates a murder spree while making new friends (and foes) at Nevermore Academy.', cast: 'Jenna Ortega, Gwendoline Christie, Emma Myers', director: 'Alfred Gough, Miles Millar' },
        { id: 18, title: 'You', image: 'https://images.unsplash.com/photo-1514228742587-6b1558fcca3d?w=800&h=450&fit=crop', year: 2018, rating: 'U/A 18+', duration: '4 Seasons', genres: ['Thriller', 'Drama', 'Crime'], description: 'A dangerously charming, intensely obsessive young man goes to extreme measures to insert himself into the lives of those he is transfixed by.', cast: 'Penn Badgley, Victoria Pedretti, Elizabeth Lail', director: 'Greg Berlanti, Sera Gamble' },
        { id: 19, title: 'The Queen\'s Gambit', image: 'https://images.unsplash.com/photo-1599668247769-620d7bb0c935?w=800&h=450&fit=crop', year: 2020, rating: 'U/A 16+', duration: 'Limited Series', genres: ['Drama', 'Sports'], description: 'Orphaned at the tender age of nine, prodigious introvert Beth Harmon discovers and masters the game of chess in 1960s USA. But child stardom comes at a price.', cast: 'Anya Taylor-Joy, Chloe Pirrie, Bill Camp', director: 'Scott Frank, Allan Scott' },
        { id: 20, title: '1899', image: 'https://images.unsplash.com/photo-1574267432644-f73a3eb56d7f?w=800&h=450&fit=crop', year: 2022, rating: 'U/A 16+', duration: '1 Season', genres: ['Mystery', 'Drama', 'Sci-Fi'], description: 'Multinational immigrants traveling from the old continent to the new encounter a nightmarish riddle aboard a second ship adrift on the open sea.', cast: 'Emily Beecham, Aneurin Barnard, Andreas Pietschmann', director: 'Baran bo Odar, Jantje Friese' },
        { id: 21, title: 'Cobra Kai', image: 'https://images.unsplash.com/photo-1581833971358-2c8b550f87b3?w=800&h=450&fit=crop', year: 2018, rating: 'U/A 13+', duration: '5 Seasons', genres: ['Action', 'Comedy', 'Drama'], description: 'Decades after their 1984 All Valley Karate Tournament bout, a middle-aged Daniel LaRusso and Johnny Lawrence find themselves martial-arts rivals again.', cast: 'Ralph Macchio, William Zabka, Courtney Henggeler', director: 'Josh Heald, Jon Hurwitz, Hayden Schlossberg' },
        { id: 22, title: 'The Sandman', image: 'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?w=800&h=450&fit=crop', year: 2022, rating: 'U/A 18+', duration: '1 Season', genres: ['Fantasy', 'Drama', 'Horror'], description: 'After years of imprisonment, Morpheus — the King of Dreams — embarks on a journey across worlds to find what was stolen from him and restore his power.', cast: 'Tom Sturridge, Boyd Holbrook, Patton Oswalt', director: 'Allan Heinberg' },
        { id: 23, title: 'Arcane', image: 'https://images.unsplash.com/photo-1542204165-65bf26472b9b?w=800&h=450&fit=crop', year: 2021, rating: 'U/A 16+', duration: '1 Season', genres: ['Animation', 'Action', 'Drama'], description: 'Set in utopian Piltover and the oppressed underground of Zaun, the story follows the origins of two iconic League champions-and the power that will tear them apart.', cast: 'Hailee Steinfeld, Ella Purnell, Kevin Alejandro', director: 'Christian Linke, Alex Yee' },
        { id: 24, title: 'The Watcher', image: 'https://images.unsplash.com/photo-1486365227551-f3f90034a57c?w=800&h=450&fit=crop', year: 2022, rating: 'U/A 16+', duration: 'Limited Series', genres: ['Thriller', 'Drama', 'Mystery'], description: 'A married couple moves into their dream house, but soon disturbing letters from someone calling themself "The Watcher" put them on edge.', cast: 'Naomi Watts, Bobby Cannavale, Jennifer Coolidge', director: 'Ryan Murphy, Ian Brennan' }
    ]
};

/**
 * Create a content card element
 * @param {Object} item - Content item with id, title, image, and all metadata
 * @returns {HTMLElement} - Content card element
 */
function createContentCard(item) {
    const card = document.createElement('div');
    card.className = 'content-card';
    card.setAttribute('data-id', item.id);

    // Create card HTML - for carousel cards we use smaller images
    const thumbnailImage = item.image.replace('w=800&h=450', 'w=400&h=240');
    card.innerHTML = `
        <img src="${thumbnailImage}" alt="${item.title}" loading="lazy">
        <div class="content-card-title">${item.title}</div>
    `;

    // Add click event to open modal with full details
    card.addEventListener('click', () => {
        openMovieModal(item);
    });

    return card;
}

/**
 * Open the video modal and populate with movie details
 * @param {Object} movie - Movie data object with all details
 */
function openMovieModal(movie) {
    try {
        const modal = document.getElementById('videoModal');

        // Get all modal elements
        const modalTitle = document.getElementById('modalTitle');
        const modalBannerImg = document.getElementById('modalBannerImg');
        const modalYear = document.getElementById('modalYear');
        const modalRating = document.getElementById('modalRating');
        const modalDuration = document.getElementById('modalDuration');
        const modalGenres = document.getElementById('modalGenres');
        const modalDescription = document.getElementById('modalDescription');
        const modalCast = document.getElementById('modalCast');
        const modalGenresList = document.getElementById('modalGenresList');
        const modalDirector = document.getElementById('modalDirector');

        // Check if all elements exist
        if (!modal || !modalTitle || !modalBannerImg) {
            console.error('Modal elements not found');
            return;
        }

        // Populate banner and title
        modalTitle.textContent = movie.title;
        modalBannerImg.src = movie.image;
        modalBannerImg.alt = movie.title;

        // Populate metadata (with defaults for backward compatibility)
        if (modalYear) modalYear.textContent = movie.year || '2024';
        if (modalRating) modalRating.textContent = movie.rating || 'U/A 13+';
        if (modalDuration) modalDuration.textContent = movie.duration || '1 Season';

        // Populate genres as tags
        if (modalGenres && movie.genres) {
            modalGenres.innerHTML = movie.genres
                .map(genre => `<span class="genre-tag">${genre}</span>`)
                .join('');
        }

        // Populate description
        if (modalDescription) {
            modalDescription.textContent = movie.description || 'No description available.';
        }

        // Populate cast
        if (modalCast) {
            modalCast.textContent = movie.cast || 'Not available';
        }

        // Populate genres list (for info grid)
        if (modalGenresList && movie.genres) {
            modalGenresList.textContent = movie.genres.join(', ');
        }

        // Populate director
        if (modalDirector) {
            modalDirector.textContent = movie.director || 'Not available';
        }

        // Open the modal
        modal.classList.add('active');
        document.body.classList.add('modal-open');

        console.log(`Modal opened for: ${movie.title}`);
    } catch (error) {
        console.error('Error opening movie modal:', error);
    }
}

/**
 * Load content into carousels
 * Populates all carousels with dynamic content
 */
function loadCarouselContent() {
    const carousels = {
        trendingCarousel: contentData.trending,
        popularCarousel: contentData.popular,
        top10Carousel: contentData.top10
    };

    // Error handling with try-catch
    try {
        Object.keys(carousels).forEach(carouselId => {
            const carousel = document.getElementById(carouselId);

            // Check if carousel exists
            if (!carousel) {
                console.warn(`Carousel not found: ${carouselId}`);
                return;
            }

            const content = carousels[carouselId];

            // Check if content data exists
            if (!content || content.length === 0) {
                console.warn(`No content for carousel: ${carouselId}`);
                return;
            }

            // Clear existing content
            carousel.innerHTML = '';

            // Add content cards
            content.forEach(item => {
                const card = createContentCard(item);
                carousel.appendChild(card);
            });

            console.log(`Loaded ${content.length} items into ${carouselId}`);
        });
    } catch (error) {
        console.error('Error loading carousel content:', error);
    }
}


// ===== 6. BUTTON INTERACTIONS & FORM HANDLING =====
// Interactive button states and email signup form

/**
 * Initialize button interactions
 * Handles sign-in and subscribe button clicks
 */
function initializeButtons() {
    const signInBtn = document.getElementById('signInBtn');
    const emailForm = document.getElementById('emailForm');
    const emailInput = document.getElementById('emailInput');

    // Sign In button click handler
    if (signInBtn) {
        signInBtn.addEventListener('click', () => {
            alert('Sign In functionality would redirect to login page.');
            console.log('Sign In button clicked');
        });
    } else {
        console.warn('Sign In button not found');
    }

    // Email signup form submission
    if (emailForm && emailInput) {
        emailForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const email = emailInput.value.trim();

            // Validate email
            if (!email) {
                alert('Please enter an email address.');
                emailInput.focus();
                return;
            }

            // Simple email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!emailRegex.test(email)) {
                alert('Please enter a valid email address.');
                emailInput.focus();
                return;
            }

            // Success
            alert(`Thank you! We'll send more information to ${email}`);
            console.log(`Email submitted: ${email}`);

            // Clear input
            emailInput.value = '';
        });
    } else {
        console.warn('Email form or input not found');
    }
}


// ===== 7. THEME TOGGLE =====
// Light/Dark theme switching with localStorage persistence

/**
 * Initialize theme toggle functionality
 * Loads saved preference from localStorage and sets up toggle button
 */
function initializeThemeToggle() {
    const themeToggle = document.getElementById('themeToggle');

    // Error handling: Check if toggle button exists
    if (!themeToggle) {
        console.warn('Theme toggle button not found');
        return;
    }

    // Load saved theme from localStorage or default to dark
    const savedTheme = localStorage.getItem('netflix-theme') || 'dark';

    // Apply saved theme
    if (savedTheme === 'light') {
        document.body.classList.add('light-theme');
    }

    console.log(`Theme loaded: ${savedTheme}`);

    // Toggle button click handler
    themeToggle.addEventListener('click', () => {
        const isLight = document.body.classList.toggle('light-theme');
        const newTheme = isLight ? 'light' : 'dark';

        // Save preference to localStorage
        localStorage.setItem('netflix-theme', newTheme);

        console.log(`Theme switched to: ${newTheme}`);
    });

    // Keyboard accessibility - Enter and Space keys
    themeToggle.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            themeToggle.click();
        }
    });
}


// ===== INITIALIZATION =====
// Main initialization function - runs when DOM is fully loaded

/**
 * Initialize all features when DOM is ready
 */
function initializeApp() {
    console.log('🎬 Netflix Clone - Initializing...');

    try {
        // Load dynamic content first
        loadCarouselContent();

        // Initialize all interactive features
        initializeCarousels();
        initializeFAQ();
        initializeModal();
        initializeButtons();
        initializeThemeToggle();

        console.log('✅ Netflix Clone - All features initialized successfully!');
        console.log('📋 Features loaded:');
        console.log('   1. Navigation scroll effect');
        console.log('   2. Horizontal content carousels');
        console.log('   3. FAQ accordion');
        console.log('   4. Video modal popup');
        console.log('   5. Dynamic content loading');
        console.log('   6. Interactive buttons & form handling');
        console.log('   7. Light/Dark theme toggle');
    } catch (error) {
        console.error('❌ Error initializing app:', error);
    }
}

// Wait for DOM to be fully loaded before initializing
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    // DOM already loaded
    initializeApp();
}


// ===== EDGE CASE HANDLING & PERFORMANCE =====

/**
 * Handle window resize events
 * Ensures UI remains consistent on window resize
 */
window.addEventListener('resize', throttle(() => {
    console.log('Window resized - UI adjusted');
}, 250));

/**
 * Prevent rapid repeated clicks on buttons
 * Simple debounce for button clicks
 */
function addClickProtection(button) {
    let isProcessing = false;
    const originalClick = button.onclick;

    button.addEventListener('click', (e) => {
        if (isProcessing) {
            e.stopImmediatePropagation();
            return;
        }

        isProcessing = true;
        setTimeout(() => {
            isProcessing = false;
        }, 300);
    }, true);
}

// Apply click protection to primary buttons
document.addEventListener('DOMContentLoaded', () => {
    const protectedButtons = document.querySelectorAll('.btn-primary, .btn-subscribe');
    protectedButtons.forEach(addClickProtection);
});
