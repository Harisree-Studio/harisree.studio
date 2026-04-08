/* ============================================
   HARISREE STUDIO - Main JavaScript
   ============================================ */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 800,
        easing: 'ease-out-cubic',
        once: true,
        offset: 80
    });

    // ============ PRELOADER ============
    window.addEventListener('load', () => {
        setTimeout(() => {
            document.getElementById('preloader').classList.add('loaded');
        }, 1500);
    });

    // ============ CUSTOM CURSOR ============
    const cursorDot = document.getElementById('cursorDot');
    const cursorOutline = document.getElementById('cursorOutline');
    let mouseX = 0, mouseY = 0;
    let outlineX = 0, outlineY = 0;

    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
        cursorDot.style.left = mouseX + 'px';
        cursorDot.style.top = mouseY + 'px';
    });

    function animateCursor() {
        outlineX += (mouseX - outlineX) * 0.15;
        outlineY += (mouseY - outlineY) * 0.15;
        cursorOutline.style.left = outlineX + 'px';
        cursorOutline.style.top = outlineY + 'px';
        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Cursor hover effects
    const hoverElements = document.querySelectorAll('a, button, input, textarea, select, .service-card, .video-card');
    hoverElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursorDot.classList.add('hover');
            cursorOutline.classList.add('hover');
        });
        el.addEventListener('mouseleave', () => {
            cursorDot.classList.remove('hover');
            cursorOutline.classList.remove('hover');
        });
    });

    // ============ NAVBAR ============
    const navbar = document.getElementById('navbar');
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.getElementById('navMenu');
    const navLinks = document.querySelectorAll('.nav-link');

    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }

        // Back to top
        const backToTop = document.getElementById('backToTop');
        if (window.scrollY > 500) {
            backToTop.classList.add('visible');
        } else {
            backToTop.classList.remove('visible');
        }

        // Active nav link based on scroll
        updateActiveNavLink();
    });

    navToggle.addEventListener('click', () => {
        navToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            navToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    function updateActiveNavLink() {
        const sections = document.querySelectorAll('section[id]');
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const top = section.offsetTop;
            const height = section.offsetHeight;
            const id = section.getAttribute('id');

            if (scrollPos >= top && scrollPos < top + height) {
                navLinks.forEach(link => link.classList.remove('active'));
                const activeLink = document.querySelector(`.nav-link[data-section="${id}"]`);
                if (activeLink) activeLink.classList.add('active');
            }
        });
    }

    // Back to top
    document.getElementById('backToTop').addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });

    // ============ HERO PARTICLES ============
    function createParticles() {
        const container = document.getElementById('heroParticles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('hero-particle');
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDuration = (Math.random() * 8 + 4) + 's';
            particle.style.animationDelay = (Math.random() * 5) + 's';
            particle.style.width = (Math.random() * 3 + 1) + 'px';
            particle.style.height = particle.style.width;
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            container.appendChild(particle);
        }
    }
    createParticles();

    // ============ COUNTER ANIMATION ============
    function animateCounters() {
        const counters = document.querySelectorAll('.stat-number');
        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000;
            const start = performance.now();

            function update(currentTime) {
                const elapsed = currentTime - start;
                const progress = Math.min(elapsed / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // easeOutCubic
                counter.textContent = Math.floor(target * eased);
                if (progress < 1) requestAnimationFrame(update);
                else counter.textContent = target;
            }
            requestAnimationFrame(update);
        });
    }

    // Trigger counter animation when hero is visible
    const heroObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                heroObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.3 });

    const heroStats = document.querySelector('.hero-stats');
    if (heroStats) heroObserver.observe(heroStats);

    // ============ PORTFOLIO VIDEOS ============
    // Admin-modifiable video data (stored in localStorage)
    const defaultVideos = [
        {
            id: 1,
            title: "Royal Kerala Wedding Highlights",
            category: "Wedding",
            url: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&hd=1&vq=hd1080"
        },
        {
            id: 2,
            title: "Traditional Housewarming Ceremony",
            category: "House Warming",
            url: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&hd=1&vq=hd1080"
        },
        {
            id: 3,
            title: "Newborn Photography Behind the Scenes",
            category: "Newborn",
            url: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&hd=1&vq=hd1080"
        },
        {
            id: 4,
            title: "Fashion Portfolio Showcase 2025",
            category: "Fashion",
            url: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&hd=1&vq=hd1080"
        },
        {
            id: 5,
            title: "Grand Birthday Celebration Coverage",
            category: "Birthday",
            url: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&hd=1&vq=hd1080"
        },
        {
            id: 6,
            title: "Maternity Shoot - Tender Moments",
            category: "Maternity",
            url: "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ?rel=0&modestbranding=1&hd=1&vq=hd1080"
        }
    ];

    async function getVideos() {
        try {
            const docRef = db.collection('portfolio').doc('videosList');
            const docSnap = await docRef.get();
            if (docSnap.exists) {
                return docSnap.data().videos || defaultVideos;
            }
        } catch (error) {
            console.error("Error fetching videos from Firebase:", error);
        }
        return defaultVideos;
    }

    async function saveVideos(videos) {
        try {
            await db.collection('portfolio').doc('videosList').set({
                videos: videos
            });
        } catch (error) {
            console.error("Error saving videos to Firebase:", error);
        }
    }

    /**
     * Extracts the YouTube video ID from ANY URL format.
     */
    function extractYouTubeId(url) {
        if (!url) return null;
        const patterns = [
            /youtube(?:-nocookie)?\.com\/embed\/([a-zA-Z0-9_-]{11})/,
            /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
            /youtu\.be\/([a-zA-Z0-9_-]{11})/,
            /youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/,
            /youtube\.com\/live\/([a-zA-Z0-9_-]{11})/
        ];
        for (const pattern of patterns) {
            const match = url.match(pattern);
            if (match) return match[1];
        }
        return null;
    }

    /**
     * Gets the best available YouTube thumbnail URL for a video ID.
     * Tries maxresdefault first (1280x720), falls back to hqdefault (480x360).
     */
    function getYouTubeThumbnail(videoId) {
        return `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`;
    }

    /**
     * Renders portfolio videos as thumbnail cards with a play overlay.
     * Clicking opens a lightbox with the actual embedded player.
     * Supports optional custom thumbnails set by admin.
     */
    async function renderPortfolioVideos() {
        const container = document.getElementById('portfolioVideos');
        const videos = await getVideos();
        container.innerHTML = '';

        videos.forEach(video => {
            const videoId = extractYouTubeId(video.url);
            // Use custom thumbnail if admin set one, otherwise auto-generate from YouTube
            const thumbnailUrl = video.thumbnail
                ? video.thumbnail
                : (videoId ? getYouTubeThumbnail(videoId) : '');

            const card = document.createElement('div');
            card.classList.add('video-card');
            card.innerHTML = `
                <div class="video-thumbnail" data-video-id="${videoId || ''}" data-url="${video.url}">
                    <img src="${thumbnailUrl}" alt="${video.title}" loading="lazy"
                         onerror="this.src='https://img.youtube.com/vi/${videoId}/hqdefault.jpg'">
                    <div class="video-play-overlay">
                        <div class="play-btn-circle">
                            <i class="fas fa-play"></i>
                        </div>
                    </div>
                </div>
                <div class="video-info">
                    <h4>${video.title}</h4>
                    <p>${video.category}</p>
                </div>
            `;

            // Click to open video in lightbox
            const thumbnail = card.querySelector('.video-thumbnail');
            thumbnail.addEventListener('click', () => {
                openVideoLightbox(videoId, video.url, video.title);
            });

            container.appendChild(card);
        });
    }

    /**
     * Opens the YouTube video directly in a new browser tab.
     * This is the most reliable approach — works from file://, http://, https://.
     */
    function openVideoLightbox(videoId, url, title) {
        // Build a direct YouTube watch URL
        const youtubeUrl = videoId
            ? `https://www.youtube.com/watch?v=${videoId}`
            : url;
        window.open(youtubeUrl, '_blank');
    }

    renderPortfolioVideos();

    // ============ TESTIMONIALS ============
    const testimonials = [
        {
            text: "Harisree Studio captured our wedding with such finesse and artistry that every photograph tells a beautiful story. The team's professionalism and attention to detail were extraordinary. They went above and beyond to ensure every precious moment was preserved flawlessly.",
            name: "Arun Krishnan",
            designation: "Client",
            initials: "AK"
        },
        {
            text: "We chose Harisree Studio for our newborn shoot and the results were absolutely magical. The way they handled our little one with such care while creating stunning compositions was remarkable. These photographs are treasures we'll cherish forever.",
            name: "Deepa Menon",
            designation: "Client",
            initials: "DM"
        },
        {
            text: "The commercial shoot for our brand exceeded all expectations. Harisree Studio understood our vision perfectly and delivered images that elevated our entire brand presence. Their creative approach and technical expertise are truly world-class.",
            name: "Rajesh Nair",
            designation: "Client",
            initials: "RN"
        },
        {
            text: "Our maternity shoot experience was absolutely wonderful. The team made us feel so comfortable and the photographs are simply breathtaking. Every shot captures the joy and anticipation of this beautiful journey with incredible artistry.",
            name: "Lakshmi Priya",
            designation: "Client",
            initials: "LP"
        },
        {
            text: "Harisree Studio covered our house warming ceremony and they captured every ritual, every blessing, and every smile with perfection. The video was cinematic quality and the photos were gallery-worthy. Highly recommend their services!",
            name: "Suresh Kumar",
            designation: "Client",
            initials: "SK"
        },
        {
            text: "The fashion portfolio they created for me opened so many doors in my modeling career. Their understanding of lighting, angles, and aesthetics is unparalleled. Working with Harisree Studio was a game-changing experience for my career.",
            name: "Anjali Venugopal",
            designation: "Client",
            initials: "AV"
        },
        {
            text: "We've been using Harisree Studio for all our corporate events and product shoots for over 5 years now. Their consistency, quality, and professionalism are unmatched. They always deliver beyond what we expect, every single time.",
            name: "Vinod Pillai",
            designation: "Client",
            initials: "VP"
        },
        {
            text: "The live coverage of our daughter's birthday was phenomenal. They captured every joyful moment, every candid smile, and every celebration detail perfectly. The final video montage brought tears of happiness to our eyes.",
            name: "Priya Rajan",
            designation: "Client",
            initials: "PR"
        }
    ];

    let currentTestimonial = 0;

    function renderTestimonials() {
        const slider = document.getElementById('testimonialsSlider');
        const dotsContainer = document.getElementById('testDots');

        // Create track
        const track = document.createElement('div');
        track.classList.add('testimonial-track');

        testimonials.forEach(t => {
            const card = document.createElement('div');
            card.classList.add('testimonial-card');
            card.innerHTML = `
                <div class="testimonial-stars">
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                    <i class="fas fa-star"></i>
                </div>
                <p class="testimonial-text">"${t.text}"</p>
                <div class="testimonial-author">
                    <div class="testimonial-avatar">${t.initials}</div>
                    <span class="testimonial-name">${t.name}</span>
                    <span class="testimonial-designation">${t.designation}</span>
                </div>
            `;
            track.appendChild(card);
        });

        slider.appendChild(track);

        // Create dots
        testimonials.forEach((_, i) => {
            const dot = document.createElement('div');
            dot.classList.add('test-dot');
            if (i === 0) dot.classList.add('active');
            dot.addEventListener('click', () => goToTestimonial(i));
            dotsContainer.appendChild(dot);
        });

        updateTestimonialPosition();
    }

    function goToTestimonial(index) {
        currentTestimonial = index;
        updateTestimonialPosition();
    }

    function updateTestimonialPosition() {
        const track = document.querySelector('.testimonial-track');
        if (!track) return;
        track.style.transform = `translateX(-${currentTestimonial * 100}%)`;

        // Update dots
        const dots = document.querySelectorAll('.test-dot');
        dots.forEach((d, i) => {
            d.classList.toggle('active', i === currentTestimonial);
        });
    }

    document.getElementById('testNext').addEventListener('click', () => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonialPosition();
    });

    document.getElementById('testPrev').addEventListener('click', () => {
        currentTestimonial = (currentTestimonial - 1 + testimonials.length) % testimonials.length;
        updateTestimonialPosition();
    });

    // Auto-slide testimonials
    let testimonialInterval = setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonialPosition();
    }, 5000);

    // Pause on hover
    const tSlider = document.getElementById('testimonialsSlider');
    tSlider.addEventListener('mouseenter', () => clearInterval(testimonialInterval));
    tSlider.addEventListener('mouseleave', () => {
        testimonialInterval = setInterval(() => {
            currentTestimonial = (currentTestimonial + 1) % testimonials.length;
            updateTestimonialPosition();
        }, 5000);
    });

    renderTestimonials();

    // ============ CONTACT FORM ============
    const contactForm = document.getElementById('contactForm');

    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();

        const name = document.getElementById('contactName').value.trim();
        const phone = document.getElementById('contactPhone').value.trim().replace(/\s+/g, '');
        const email = document.getElementById('contactEmail').value.trim();
        const projectType = document.getElementById('projectType').value;
        const budget = document.getElementById('budgetRange').value;
        const aboutProject = document.getElementById('aboutProject').value.trim();

        // Admin access check
        if (name.toLowerCase() === 'sreejith' && (phone === '09744150856' || phone === '9744150856' || phone === '+919744150856' || phone === '097441 50856'.replace(/\s/g, ''))) {
            document.getElementById('adminPopup').classList.add('active');
            return;
        }

        const submitBtn = document.getElementById('submitBtn');
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';

        // Send via Web3Forms
        try {
            const formData = new FormData();
            formData.append('access_key', 'f4ea4b51-1356-4534-a304-e98b8df37cac');
            formData.append('name', name);
            formData.append('phone', phone);
            formData.append('email', email || 'Not provided');
            formData.append('project_type', projectType || 'Not specified');
            formData.append('budget_range', budget || 'Not specified');
            formData.append('message', aboutProject || 'No details provided');
            formData.append('subject', `New Inquiry - ${projectType || 'General'} | Harisree Studio`);

            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });

            const result = await response.json();

            if (result.success) {
                showToast('Message sent successfully! We\'ll get back to you soon.', 'success');
                
                // Also send via WhatsApp
                const whatsappMsg = encodeURIComponent(
                    `*New Inquiry - Harisree Studio*\n\n` +
                    `*Name:* ${name}\n` +
                    `*Phone:* ${phone}\n` +
                    `*Email:* ${email || 'Not provided'}\n` +
                    `*Project Type:* ${projectType || 'Not specified'}\n` +
                    `*Budget:* ${budget || 'Not specified'}\n` +
                    `*About Project:* ${aboutProject || 'No details provided'}`
                );
                window.open(`https://wa.me/919744150856?text=${whatsappMsg}`, '_blank');

                contactForm.reset();
            } else {
                showToast('Failed to send message. Please try again.', 'error');
            }
        } catch (error) {
            showToast('Network error. Please try again later.', 'error');
        }

        submitBtn.disabled = false;
        submitBtn.innerHTML = '<span>Send Message</span><i class="fas fa-paper-plane"></i>';
    });

    // Admin popup handlers
    document.getElementById('popupClose').addEventListener('click', closeAdminPopup);
    document.getElementById('popupNo').addEventListener('click', closeAdminPopup);

    function closeAdminPopup() {
        document.getElementById('adminPopup').classList.remove('active');
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // ============ AI CHATBOT ============
    const aiChatbot = document.getElementById('aiChatbot');
    const aiFab = document.getElementById('aiFab');
    const chatbotClose = document.getElementById('chatbotClose');
    const chatbotMinimize = document.getElementById('chatbotMinimize');
    const chatbotInput = document.getElementById('chatbotInput');
    const chatbotSend = document.getElementById('chatbotSend');
    const chatbotMessages = document.getElementById('chatbotMessages');
    const btnAiAssist = document.getElementById('btnAiAssist');

    function openChatbot() {
        aiChatbot.classList.add('active');
        aiFab.style.display = 'none';
        if (chatbotMessages.children.length === 0) {
            addBotMessage("Hello! 👋 Welcome to Harisree Studio. I'm your AI assistant. How can I help you today? I can tell you about our services, pricing, help you book a session, or answer any questions you might have!");
        }
    }

    function closeChatbot() {
        aiChatbot.classList.remove('active');
        aiFab.style.display = 'flex';
    }

    aiFab.addEventListener('click', openChatbot);
    btnAiAssist.addEventListener('click', openChatbot);
    chatbotClose.addEventListener('click', closeChatbot);
    chatbotMinimize.addEventListener('click', closeChatbot);

    // Quick actions
    document.querySelectorAll('.quick-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            const query = btn.getAttribute('data-query');
            addUserMessage(query);
            processAIResponse(query);
        });
    });

    chatbotSend.addEventListener('click', sendChatMessage);
    chatbotInput.addEventListener('keypress', (e) => {
        if (e.key === 'Enter') sendChatMessage();
    });

    function sendChatMessage() {
        const msg = chatbotInput.value.trim();
        if (!msg) return;
        addUserMessage(msg);
        chatbotInput.value = '';
        processAIResponse(msg);
    }

    function addBotMessage(text) {
        const div = document.createElement('div');
        div.classList.add('chat-message', 'bot');
        div.innerHTML = `
            <div class="msg-avatar"><i class="fas fa-robot"></i></div>
            <div class="msg-bubble">${text}</div>
        `;
        chatbotMessages.appendChild(div);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function addUserMessage(text) {
        const div = document.createElement('div');
        div.classList.add('chat-message', 'user');
        div.innerHTML = `<div class="msg-bubble">${text}</div>`;
        chatbotMessages.appendChild(div);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
    }

    function showTyping() {
        const div = document.createElement('div');
        div.classList.add('chat-message', 'bot', 'typing-msg');
        div.innerHTML = `
            <div class="msg-avatar"><i class="fas fa-robot"></i></div>
            <div class="msg-bubble"><div class="typing-indicator"><span></span><span></span><span></span></div></div>
        `;
        chatbotMessages.appendChild(div);
        chatbotMessages.scrollTop = chatbotMessages.scrollHeight;
        return div;
    }

    function processAIResponse(query) {
        const typingEl = showTyping();
        const lowerQuery = query.toLowerCase();

        setTimeout(() => {
            typingEl.remove();
            let response = getAIResponse(lowerQuery);
            addBotMessage(response);
        }, 1000 + Math.random() * 1000);
    }

    function getAIResponse(query) {
        // Services
        if (query.includes('service') || query.includes('offer') || query.includes('what do you do')) {
            return "We offer a comprehensive range of professional photography & videography services:<br><br>" +
                "📸 <b>Wedding Shoot</b> - Cinematic wedding coverage<br>" +
                "👶 <b>Newborn Shoot</b> - Tender baby portraits<br>" +
                "🌿 <b>Lifestyle Photoshoot</b> - Natural candid captures<br>" +
                "🤰 <b>Maternity Shoot</b> - Beautiful motherhood moments<br>" +
                "👤 <b>Portrait Shoot</b> - Professional portraits<br>" +
                "🏢 <b>Commercial Photoshoot</b> - Brand & product imagery<br>" +
                "🎬 <b>Studio Sittings</b> - Controlled studio shoots<br>" +
                "🪪 <b>Passport Photo</b> - Ready in 2 minutes!<br>" +
                "👗 <b>Fashion Shoot</b> - Editorial fashion photography<br>" +
                "🏠 <b>House Warming</b> - Ceremony documentation<br>" +
                "📹 <b>Live Event Coverage</b> - Real-time event filming<br>" +
                "🎂 <b>Birthday Events</b> - Celebration photography<br><br>" +
                "Would you like to know more about any specific service?";
        }

        // Pricing
        if (query.includes('price') || query.includes('pricing') || query.includes('cost') || query.includes('rate') || query.includes('charge') || query.includes('budget') || query.includes('how much')) {
            return "Our pricing varies based on the type of service and your specific requirements. Here's a general overview:<br><br>" +
                "💍 <b>Wedding Packages:</b> Starting from ₹25,000<br>" +
                "👶 <b>Newborn/Maternity:</b> Starting from ₹8,000<br>" +
                "👤 <b>Portrait Sessions:</b> Starting from ₹5,000<br>" +
                "🏢 <b>Commercial:</b> Starting from ₹15,000<br>" +
                "🎬 <b>Event Coverage:</b> Starting from ₹10,000<br>" +
                "🪪 <b>Passport Photo:</b> ₹100 only!<br><br>" +
                "For a customized quote, please fill out our <a href='#contact' style='color: var(--primary-light); text-decoration: underline;'>contact form</a> or call us at <b>+91 97441 50856</b>.";
        }

        // Booking
        if (query.includes('book') || query.includes('appointment') || query.includes('schedule') || query.includes('session')) {
            return "Booking a session with us is easy! Here are your options:<br><br>" +
                "1️⃣ <b>Fill out our contact form</b> - Scroll down to the <a href='#contact' style='color: var(--primary-light); text-decoration: underline;'>Get In Touch</a> section<br>" +
                "2️⃣ <b>Call us directly</b> - <a href='tel:+919744150856' style='color: var(--primary-light);'>+91 97441 50856</a><br>" +
                "3️⃣ <b>WhatsApp us</b> - <a href='https://wa.me/919744150856' target='_blank' style='color: var(--primary-light);'>Send a message</a><br><br>" +
                "We recommend booking at least 2-3 weeks in advance for events. Passport photos are available as walk-ins! 📷";
        }

        // Location
        if (query.includes('location') || query.includes('where') || query.includes('address') || query.includes('visit') || query.includes('office')) {
            return "📍 <b>Harisree Studio</b> is based in <b>Kerala, India</b>.<br><br>" +
                "🌍 We provide services across:<br>" +
                "• All districts of <b>Kerala</b><br>" +
                "• Major cities across <b>India</b><br>" +
                "• Destination shoots (national & international)<br><br>" +
                "For studio visits, please call us at <b>+91 97441 50856</b> to schedule an appointment.";
        }

        // Experience
        if (query.includes('experience') || query.includes('how long') || query.includes('years') || query.includes('about')) {
            return "🏆 <b>About Harisree Studio:</b><br><br>" +
                "With <b>20+ years of experience</b> in the photography and videography industry, Harisree Studio has:<br><br>" +
                "✅ Completed <b>1000+ projects</b> across diverse genres<br>" +
                "✅ Served <b>2000+ happy clients</b><br>" +
                "✅ Providing services across <b>Kerala and India</b><br><br>" +
                "Our team combines artistic vision with cutting-edge technology to deliver visual masterpieces that stand the test of time.";
        }

        // Contact
        if (query.includes('contact') || query.includes('phone') || query.includes('call') || query.includes('whatsapp') || query.includes('reach')) {
            return "You can reach us through multiple channels:<br><br>" +
                "📞 <b>Phone:</b> <a href='tel:+919744150856' style='color: var(--primary-light);'>+91 97441 50856</a><br>" +
                "💬 <b>WhatsApp:</b> <a href='https://wa.me/919744150856' target='_blank' style='color: var(--primary-light);'>Message us</a><br>" +
                "📧 <b>Email:</b> studioharisree@gmail.com<br>" +
                "📝 <b>Form:</b> <a href='#contact' style='color: var(--primary-light); text-decoration: underline;'>Fill out our contact form</a><br><br>" +
                "We typically respond within 1-2 hours during business hours! 🕐";
        }

        // Wedding
        if (query.includes('wedding')) {
            return "💒 <b>Wedding Photography & Videography</b><br><br>" +
                "Our wedding packages include:<br><br>" +
                "📸 Pre-wedding photoshoot<br>" +
                "🎬 Cinematic highlight reel<br>" +
                "📹 Full ceremony & reception coverage<br>" +
                "🎨 Professional editing & color grading<br>" +
                "📁 High-resolution digital delivery<br>" +
                "📖 Premium album options<br>" +
                "👨‍👩‍👧‍👦 Candid + traditional photography<br><br>" +
                "Every wedding is unique, and we tailor our approach to perfectly match your vision. Contact us for a customized quote!";
        }

        // Passport
        if (query.includes('passport')) {
            return "🪪 <b>Passport Size Photo Service</b><br><br>" +
                "Get professional passport photos in just <b>2 minutes</b>!<br><br>" +
                "✅ Meets all official government standards<br>" +
                "✅ Digital and print copies available<br>" +
                "✅ Walk-in service available<br>" +
                "✅ Starting at just ₹100<br><br>" +
                "No appointment needed – just walk in during our business hours!";
        }

        // Greetings
        if (query.includes('hello') || query.includes('hi') || query.includes('hey') || query.includes('good morning') || query.includes('good evening')) {
            return "Hello! 😊 Welcome to Harisree Studio! I'm here to assist you with any questions about our photography and videography services. What would you like to know?";
        }

        // Thanks
        if (query.includes('thank') || query.includes('thanks') || query.includes('appreciate')) {
            return "You're welcome! 😊 It's my pleasure to help. If you have any more questions, feel free to ask. We look forward to creating beautiful memories with you! 📸✨";
        }

        // Portfolio
        if (query.includes('portfolio') || query.includes('work') || query.includes('sample') || query.includes('gallery')) {
            return "🎬 You can view our portfolio showcase right on this page! Scroll to the <a href='#portfolio' style='color: var(--primary-light); text-decoration: underline;'>Portfolio section</a> to see our featured videos.<br><br>" +
                "We also have an extensive gallery of our work. For specific examples in any genre (wedding, portrait, fashion, etc.), please reach out to us directly and we'll share relevant portfolios! 📸";
        }

        // Default
        return "Thank you for your question! While I try to help with common queries, for more specific or detailed information, I'd recommend:<br><br>" +
            "📞 <b>Call us:</b> <a href='tel:+919744150856' style='color: var(--primary-light);'>+91 97441 50856</a><br>" +
            "💬 <b>WhatsApp:</b> <a href='https://wa.me/919744150856' target='_blank' style='color: var(--primary-light);'>Send a message</a><br><br>" +
            "Or you can ask me about our <b>services, pricing, booking, location, experience,</b> or <b>wedding packages</b>! 😊";
    }

    // ============ TOAST NOTIFICATION ============
    function showToast(message, type) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();

        const toast = document.createElement('div');
        toast.classList.add('toast', type);
        toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'}"></i>${message}`;
        document.body.appendChild(toast);

        setTimeout(() => toast.classList.add('show'), 50);
        setTimeout(() => {
            toast.classList.remove('show');
            setTimeout(() => toast.remove(), 300);
        }, 4000);
    }

    // ============ SMOOTH REVEAL ON SCROLL ============
    const revealElements = document.querySelectorAll('.service-card, .video-card, .portfolio-stat');
    const revealObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    revealElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        revealObserver.observe(el);
    });

});
