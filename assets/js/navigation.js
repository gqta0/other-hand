/**
 * Spring Boot Tu Tiên Story - Navigation Script
 * Handles chapter navigation, progress tracking, and keyboard shortcuts
 */

(function () {
    'use strict';

    // ==========================================
    // Configuration
    // ==========================================
    const CONFIG = {
        storageKey: 'springboot-story-progress',
        totalChapters: 35,
        arcs: [
            { id: 1, name: 'Nhập Môn', chapters: [1, 2, 3, 4, 5] },
            { id: 2, name: 'Giao Tiếp Giang Hồ', chapters: [6, 7, 8, 9, 10] },
            { id: 3, name: 'Phòng Hộ Sơn Môn', chapters: [11, 12, 13, 14, 15] },
            { id: 4, name: 'Kho Tàng Bí Mật', chapters: [16, 17, 18, 19, 20] },
            { id: 5, name: 'Giao Dịch Công Bằng', chapters: [21, 22, 23, 24, 25] },
            { id: 6, name: 'Khía Cạnh Huyền Bí', chapters: [26, 27, 28, 29, 30] },
            { id: 7, name: 'Thử Thách Cuối', chapters: [31, 32, 33, 34, 35] }
        ]
    };

    // Arc folder mapping
    const ARC_FOLDERS = {
        1: 'arc-1-nhap-mon',
        2: 'arc-2-giao-tiep-giang-ho',
        3: 'arc-3-phong-ho-son-mon',
        4: 'arc-4-kho-tang-bi-mat',
        5: 'arc-5-giao-dich-cong-bang',
        6: 'arc-6-khia-canh-huyen-bi',
        7: 'arc-7-thu-thach-cuoi'
    };

    // ==========================================
    // Progress Tracking
    // ==========================================
    const Progress = {
        get() {
            try {
                const data = localStorage.getItem(CONFIG.storageKey);
                return data ? JSON.parse(data) : { read: [], current: 1 };
            } catch (e) {
                console.warn('Failed to load progress:', e);
                return { read: [], current: 1 };
            }
        },

        save(progress) {
            try {
                localStorage.setItem(CONFIG.storageKey, JSON.stringify(progress));
            } catch (e) {
                console.warn('Failed to save progress:', e);
            }
        },

        markAsRead(chapterNum) {
            const progress = this.get();
            if (!progress.read.includes(chapterNum)) {
                progress.read.push(chapterNum);
                progress.read.sort((a, b) => a - b);
            }
            progress.current = chapterNum;
            this.save(progress);
        },

        isRead(chapterNum) {
            return this.get().read.includes(chapterNum);
        },

        getPercentage() {
            const progress = this.get();
            return Math.round((progress.read.length / CONFIG.totalChapters) * 100);
        },

        getCurrentChapter() {
            return this.get().current;
        },

        reset() {
            this.save({ read: [], current: 1 });
        }
    };

    // ==========================================
    // Navigation Utilities
    // ==========================================
    const Navigation = {
        getArcForChapter(chapterNum) {
            for (const arc of CONFIG.arcs) {
                if (arc.chapters.includes(chapterNum)) {
                    return arc.id;
                }
            }
            return 1;
        },

        getChapterUrl(chapterNum) {
            const arcId = this.getArcForChapter(chapterNum);
            const arcFolder = ARC_FOLDERS[arcId];
            const chapterStr = String(chapterNum).padStart(2, '0');
            return `../${arcFolder}/chapter-${chapterStr}.html`;
        },

        getCurrentChapterFromUrl() {
            const match = window.location.pathname.match(/chapter-(\d+)\.html/);
            return match ? parseInt(match[1], 10) : null;
        },

        goToChapter(chapterNum) {
            if (chapterNum >= 1 && chapterNum <= CONFIG.totalChapters) {
                window.location.href = this.getChapterUrl(chapterNum);
            }
        },

        goToPrevious() {
            const current = this.getCurrentChapterFromUrl();
            if (current && current > 1) {
                this.goToChapter(current - 1);
            }
        },

        goToNext() {
            const current = this.getCurrentChapterFromUrl();
            if (current && current < CONFIG.totalChapters) {
                this.goToChapter(current + 1);
            }
        },

        goToIndex() {
            window.location.href = '../index.html';
        }
    };

    // ==========================================
    // Reading Progress Bar
    // ==========================================
    const ReadingProgress = {
        bar: null,

        init() {
            // Create progress bar element
            const progressContainer = document.createElement('div');
            progressContainer.className = 'reading-progress';
            progressContainer.innerHTML = '<div class="reading-progress-bar"></div>';
            document.body.prepend(progressContainer);

            this.bar = progressContainer.querySelector('.reading-progress-bar');

            // Update on scroll
            window.addEventListener('scroll', () => this.update(), { passive: true });
            this.update();
        },

        update() {
            if (!this.bar) return;

            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const progress = docHeight > 0 ? (scrollTop / docHeight) * 100 : 0;

            this.bar.style.width = `${Math.min(100, progress)}%`;

            // Mark as read when scrolled past 80%
            if (progress > 80) {
                const currentChapter = Navigation.getCurrentChapterFromUrl();
                if (currentChapter) {
                    Progress.markAsRead(currentChapter);
                }
            }
        }
    };

    // ==========================================
    // Keyboard Shortcuts
    // ==========================================
    const Keyboard = {
        init() {
            document.addEventListener('keydown', (e) => {
                // Ignore if typing in input
                if (e.target.matches('input, textarea')) return;

                switch (e.key) {
                    case 'ArrowLeft':
                        e.preventDefault();
                        Navigation.goToPrevious();
                        break;
                    case 'ArrowRight':
                        e.preventDefault();
                        Navigation.goToNext();
                        break;
                    case 'Home':
                        e.preventDefault();
                        Navigation.goToIndex();
                        break;
                    case 'd':
                    case 'D':
                        // Toggle dark mode
                        document.body.dispatchEvent(new CustomEvent('toggleDarkMode'));
                        break;
                }
            });
        }
    };

    // ==========================================
    // Floating Actions
    // ==========================================
    const FloatingActions = {
        init() {
            const container = document.querySelector('.floating-actions');
            if (!container) return;

            // Scroll to top button
            const scrollTopBtn = container.querySelector('[data-action="scroll-top"]');
            if (scrollTopBtn) {
                scrollTopBtn.addEventListener('click', () => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                });

                // Show/hide based on scroll position
                window.addEventListener('scroll', () => {
                    scrollTopBtn.style.opacity = window.scrollY > 300 ? '1' : '0';
                    scrollTopBtn.style.pointerEvents = window.scrollY > 300 ? 'auto' : 'none';
                }, { passive: true });
            }

            // Glossary toggle (handled by glossary.js)
        }
    };

    // ==========================================
    // Navigation UI
    // ==========================================
    const NavigationUI = {
        init() {
            const currentChapter = Navigation.getCurrentChapterFromUrl();
            if (!currentChapter) return;

            // Update navigation links
            const prevLink = document.querySelector('.chapter-nav-link.prev');
            const nextLink = document.querySelector('.chapter-nav-link.next');

            if (prevLink) {
                if (currentChapter > 1) {
                    prevLink.href = Navigation.getChapterUrl(currentChapter - 1);
                } else {
                    prevLink.style.visibility = 'hidden';
                }
            }

            if (nextLink) {
                if (currentChapter < CONFIG.totalChapters) {
                    nextLink.href = Navigation.getChapterUrl(currentChapter + 1);
                } else {
                    nextLink.style.visibility = 'hidden';
                }
            }

            // Mark current chapter as being read
            Progress.save({ ...Progress.get(), current: currentChapter });
        }
    };

    // ==========================================
    // Index Page Progress
    // ==========================================
    const IndexProgress = {
        init() {
            // Only run on index page
            if (!document.querySelector('.chapter-list')) return;

            const progress = Progress.get();

            // Update progress bar
            const progressBar = document.querySelector('.progress-fill');
            if (progressBar) {
                progressBar.style.width = `${Progress.getPercentage()}%`;
            }

            // Update progress text
            const progressText = document.querySelector('.progress-text');
            if (progressText) {
                progressText.textContent = `${progress.read.length}/${CONFIG.totalChapters} chapters (${Progress.getPercentage()}%)`;
            }

            // Mark read chapters
            document.querySelectorAll('.chapter-list a').forEach(link => {
                const match = link.href.match(/chapter-(\d+)\.html/);
                if (match) {
                    const chapterNum = parseInt(match[1], 10);
                    if (Progress.isRead(chapterNum)) {
                        link.classList.add('read');
                        const status = link.querySelector('.chapter-status');
                        if (status) {
                            status.textContent = '✓ Đã đọc';
                            status.style.color = 'var(--color-secondary)';
                        }
                    }
                }
            });

            // Continue reading button
            const continueBtn = document.querySelector('.continue-reading');
            if (continueBtn) {
                const currentChapter = Progress.getCurrentChapter();
                continueBtn.href = Navigation.getChapterUrl(currentChapter);
                continueBtn.querySelector('.chapter-num').textContent = `Chapter ${currentChapter}`;
            }
        }
    };

    // ==========================================
    // Voice Label Toggle
    // ==========================================
    function initVoiceLabels() {
        const showLabels = localStorage.getItem('showVoiceLabels') === 'true';
        const body = document.body;

        // Apply initial state
        if (showLabels) {
            body.classList.add('show-voice-labels');
        }

        // Add toggle button to header controls if it exists
        const headerControls = document.querySelector('.header-controls');
        if (headerControls) {
            // Check if button already exists
            if (headerControls.querySelector('.voice-toggle')) return;

            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'btn btn-secondary voice-toggle';
            toggleBtn.ariaLabel = 'Bật/Tắt tên nhân vật';
            toggleBtn.innerHTML = showLabels ? '🗣️' : '🤫'; // 🗣️ for speaking, 🤫 for quiet
            toggleBtn.title = 'Bật/Tắt tên nhân vật';

            toggleBtn.addEventListener('click', () => {
                const isShown = body.classList.toggle('show-voice-labels');
                localStorage.setItem('showVoiceLabels', isShown);
                toggleBtn.innerHTML = isShown ? '🗣️' : '🤫';
            });

            // Insert before the last item (usually glossary link) or append
            if (headerControls.firstChild) {
                headerControls.insertBefore(toggleBtn, headerControls.firstChild);
            } else {
                headerControls.appendChild(toggleBtn);
            }
        }
    }

    // ==========================================
    // Initialize
    // ==========================================
    function init() {
        initVoiceLabels();
        ReadingProgress.init();
        Keyboard.init();
        FloatingActions.init();
        NavigationUI.init();
        IndexProgress.init();
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose for external use
    window.StoryNavigation = {
        Progress,
        Navigation,
        Config: CONFIG
    };

})();
