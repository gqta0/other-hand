/**
 * Spring Boot Tu Tiên Story - Glossary Script
 * Handles glossary sidebar, term highlighting, and dark mode toggle
 */

(function () {
    'use strict';

    // ==========================================
    // Glossary Data
    // ==========================================
    const GLOSSARY = {
        // Spring Core
        'ioc-container': {
            term: 'IoC Container',
            pronunciation: 'Ai Ô Xi Khăn Tây Nơ',
            metaphor: 'Linh Khí Tụ - Hồ linh khí trung tâm môn phái',
            category: 'Spring Core'
        },
        'dependency-injection': {
            term: 'Dependency Injection',
            pronunciation: 'Đi Pẹn Đẹn Xi In Giếc Sừn',
            metaphor: 'Linh Lực Quán Nhập - Kỹ thuật truyền linh lực',
            category: 'Spring Core'
        },
        'bean': {
            term: 'Bean',
            pronunciation: 'Bin',
            metaphor: 'Linh Đan - Viên đan dược có thể tái sử dụng',
            category: 'Spring Core'
        },
        'component': {
            term: '@Component',
            pronunciation: 'Ét Khăm Pô Nẹn',
            metaphor: 'Phù Chú Linh Khí - Ấn quyết đánh dấu',
            category: 'Spring Core'
        },
        'service': {
            term: '@Service',
            pronunciation: 'Ét Xơ Vịt',
            metaphor: 'Phù Chú Dịch Vụ - Ấn quyết nghiệp vụ',
            category: 'Spring Core'
        },
        'repository': {
            term: '@Repository',
            pronunciation: 'Ét Rê Pó Zi Tô Ri',
            metaphor: 'Phù Chú Kho Tàng - Bảo vệ dữ liệu',
            category: 'Spring Core'
        },
        'autowired': {
            term: '@Autowired',
            pronunciation: 'Ô Tô Wai Rơ',
            metaphor: 'Tự Động Kết Nối - Liên kết tự động',
            category: 'Spring Core'
        },

        // Spring Web MVC
        'dispatcher-servlet': {
            term: 'DispatcherServlet',
            pronunciation: 'Đít Pát Chớ Xớ Vờ Lét',
            metaphor: 'Truyền Tống Linh Đồng - Phân phối yêu cầu',
            category: 'Spring Web MVC'
        },
        'request-mapping': {
            term: '@RequestMapping',
            pronunciation: 'Ét Rê Quét Mép Ping',
            metaphor: 'Phù Chú Lộ Trình - Bản đồ chỉ đường',
            category: 'Spring Web MVC'
        },
        'controller': {
            term: '@Controller',
            pronunciation: 'Ét Khăn Trô Lơ',
            metaphor: 'Phù Chú Điều Khiển - Điều khiển luồng',
            category: 'Spring Web MVC'
        },
        'model': {
            term: 'Model',
            pronunciation: 'Mô Đồ',
            metaphor: 'Linh Khí Mô Hình - Khuôn mẫu thông tin',
            category: 'Spring Web MVC'
        },
        'view': {
            term: 'View',
            pronunciation: 'Viu',
            metaphor: 'Huyễn Cảnh - Ảo cảnh hiển thị',
            category: 'Spring Web MVC'
        },

        // Spring Security
        'authentication': {
            term: 'Authentication',
            pronunciation: 'Ô Thẹn Ti Kây Sừn',
            metaphor: 'Xác Thực Thân Phận - Kiểm tra thân phận',
            category: 'Spring Security'
        },
        'authorization': {
            term: 'Authorization',
            pronunciation: 'Ô Thô Rai Zây Sừn',
            metaphor: 'Phân Quyền Hạn - Phân chia quyền hạn',
            category: 'Spring Security'
        },
        'jwt': {
            term: 'JWT Token',
            pronunciation: 'Giây Đa Bờ Liu Tô Khẹn',
            metaphor: 'Linh Bài Thông Hành - Bài có thời hạn',
            category: 'Spring Security'
        },
        'secured': {
            term: '@Secured',
            pronunciation: 'Ét Xi Kiu',
            metaphor: 'Phù Chú Phòng Hộ - Bùa bảo vệ',
            category: 'Spring Security'
        },

        // MyBatis
        'mapper': {
            term: 'Mapper',
            pronunciation: 'Mép Pơ',
            metaphor: 'Bản Đồ Kho Tàng - Dẫn đường vào kho',
            category: 'MyBatis'
        },
        'sql': {
            term: 'SQL',
            pronunciation: 'Ét Kiu Eo',
            metaphor: 'Thần Chú Truy Vấn - Lấy báu vật',
            category: 'MyBatis'
        },
        'select': {
            term: '@Select',
            pronunciation: 'Ét Xơ Lếch',
            metaphor: 'Phù Chú Tuyển Chọn - Chọn lọc báu vật',
            category: 'MyBatis'
        },

        // Transaction
        'transactional': {
            term: '@Transactional',
            pronunciation: 'Ét Trần Xếch Sờ Nồ',
            metaphor: 'Phù Chú Giao Dịch - Đảm bảo toàn vẹn',
            category: 'Transaction'
        },
        'acid': {
            term: 'ACID',
            pronunciation: 'Ây Xít',
            metaphor: 'Tứ Đại Quy Tắc - Bốn nguyên tắc thiêng liêng',
            category: 'Transaction'
        },
        'propagation': {
            term: 'Propagation',
            pronunciation: 'Prô Pà Gây Sừn',
            metaphor: 'Truyền Dẫn Pháp Tắc - Cách truyền năng lượng',
            category: 'Transaction'
        },

        // AOP
        'aspect': {
            term: 'Aspect',
            pronunciation: 'Át Pếch',
            metaphor: 'Khía Cạnh Pháp - Pháp thuật xuyên suốt',
            category: 'AOP'
        },
        'before': {
            term: '@Before',
            pronunciation: 'Ét Bi Phò',
            metaphor: 'Phù Chú Tiền Trận - Kích hoạt trước',
            category: 'AOP'
        },
        'after': {
            term: '@After',
            pronunciation: 'Ét Áp Tơ',
            metaphor: 'Phù Chú Hậu Trận - Kích hoạt sau',
            category: 'AOP'
        },
        'around': {
            term: '@Around',
            pronunciation: 'Ét Ơ Rao',
            metaphor: 'Phù Chú Bao Vây - Bao quanh hành động',
            category: 'AOP'
        },
        'joinpoint': {
            term: 'JoinPoint',
            pronunciation: 'Giôi Poin',
            metaphor: 'Điểm Giao Hội - Nơi giao nhau',
            category: 'AOP'
        },

        // Testing
        'test': {
            term: '@Test',
            pronunciation: 'Ét Tét',
            metaphor: 'Phù Chú Thử Thách - Kiểm tra sức mạnh',
            category: 'Testing'
        },
        'junit': {
            term: 'JUnit',
            pronunciation: 'Giây Iu Nịt',
            metaphor: 'Thử Nghiệm Đơn Vị - Thử từng phần',
            category: 'Testing'
        },
        'mockito': {
            term: 'Mockito',
            pronunciation: 'Mô Ki Tô',
            metaphor: 'Huyễn Thuật Giả Lập - Tạo ảo ảnh',
            category: 'Testing'
        },
        'mockbean': {
            term: '@MockBean',
            pronunciation: 'Ét Mốc Bin',
            metaphor: 'Linh Đan Giả - Đan giả thử nghiệm',
            category: 'Testing'
        }
    };

    // ==========================================
    // Glossary Sidebar
    // ==========================================
    const GlossarySidebar = {
        sidebar: null,
        isOpen: false,

        init() {
            this.createSidebar();
            this.bindEvents();
        },

        createSidebar() {
            const sidebar = document.createElement('aside');
            sidebar.className = 'glossary-sidebar';
            sidebar.innerHTML = `
        <div class="glossary-sidebar-header">
          <h3>📚 Bảng Thuật Ngữ</h3>
          <button class="glossary-close" aria-label="Đóng">×</button>
        </div>
        <div class="glossary-sidebar-search">
          <input type="search" placeholder="Tìm kiếm..." class="glossary-search-input">
        </div>
        <div class="glossary-sidebar-content">
          ${this.renderCategories()}
        </div>
      `;

            // Add styles
            const style = document.createElement('style');
            style.textContent = `
        .glossary-sidebar {
          position: fixed;
          top: 0;
          right: -350px;
          width: 350px;
          height: 100vh;
          background: var(--bg-card);
          box-shadow: -4px 0 20px rgba(0, 0, 0, 0.1);
          z-index: 1000;
          transition: right 0.3s ease;
          display: flex;
          flex-direction: column;
          font-family: var(--font-sans);
        }

        .glossary-sidebar.open {
          right: 0;
        }

        .glossary-sidebar-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: var(--spacing-md) var(--spacing-lg);
          background: var(--color-primary);
          color: white;
        }

        .glossary-sidebar-header h3 {
          margin: 0;
          font-size: var(--text-lg);
          color: white;
        }

        .glossary-close {
          background: none;
          border: none;
          color: white;
          font-size: 24px;
          cursor: pointer;
          padding: 0;
          line-height: 1;
        }

        .glossary-sidebar-search {
          padding: var(--spacing-md);
          border-bottom: 1px solid var(--bg-secondary);
        }

        .glossary-search-input {
          width: 100%;
          padding: var(--spacing-sm) var(--spacing-md);
          border: 1px solid var(--text-muted);
          border-radius: var(--radius-md);
          font-size: var(--text-base);
        }

        .glossary-sidebar-content {
          flex: 1;
          overflow-y: auto;
          padding: var(--spacing-md);
        }

        .glossary-category {
          margin-bottom: var(--spacing-lg);
        }

        .glossary-category-title {
          font-size: var(--text-sm);
          font-weight: 600;
          color: var(--color-primary);
          text-transform: uppercase;
          letter-spacing: 0.5px;
          margin-bottom: var(--spacing-sm);
          padding-bottom: var(--spacing-xs);
          border-bottom: 2px solid var(--color-primary-light);
        }

        .glossary-term-item {
          padding: var(--spacing-sm);
          margin-bottom: var(--spacing-xs);
          border-radius: var(--radius-sm);
          cursor: pointer;
          transition: background 0.2s;
        }

        .glossary-term-item:hover {
          background: var(--bg-secondary);
        }

        .glossary-term-name {
          font-weight: 600;
          color: var(--text-primary);
          margin-bottom: 2px;
        }

        .glossary-term-pron {
          font-size: var(--text-sm);
          color: var(--color-secondary-dark);
          font-style: italic;
        }

        .glossary-term-meta {
          font-size: var(--text-xs);
          color: var(--text-muted);
          margin-top: 4px;
        }

        .glossary-overlay {
          position: fixed;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          background: rgba(0, 0, 0, 0.3);
          z-index: 999;
          opacity: 0;
          visibility: hidden;
          transition: all 0.3s;
        }

        .glossary-overlay.open {
          opacity: 1;
          visibility: visible;
        }

        @media (max-width: 480px) {
          .glossary-sidebar {
            width: 100%;
            right: -100%;
          }
        }
      `;
            document.head.appendChild(style);

            // Create overlay
            const overlay = document.createElement('div');
            overlay.className = 'glossary-overlay';

            document.body.appendChild(overlay);
            document.body.appendChild(sidebar);

            this.sidebar = sidebar;
            this.overlay = overlay;
        },

        renderCategories() {
            const categories = {};

            Object.entries(GLOSSARY).forEach(([key, item]) => {
                if (!categories[item.category]) {
                    categories[item.category] = [];
                }
                categories[item.category].push({ key, ...item });
            });

            return Object.entries(categories).map(([category, terms]) => `
        <div class="glossary-category" data-category="${category}">
          <div class="glossary-category-title">${category}</div>
          ${terms.map(term => `
            <div class="glossary-term-item" data-term="${term.key}">
              <div class="glossary-term-name">${term.term}</div>
              <div class="glossary-term-pron">${term.pronunciation}</div>
              <div class="glossary-term-meta">${term.metaphor}</div>
            </div>
          `).join('')}
        </div>
      `).join('');
        },

        bindEvents() {
            // Close button
            this.sidebar.querySelector('.glossary-close').addEventListener('click', () => this.close());

            // Overlay click
            this.overlay.addEventListener('click', () => this.close());

            // Search
            const searchInput = this.sidebar.querySelector('.glossary-search-input');
            searchInput.addEventListener('input', (e) => this.filterTerms(e.target.value));

            // Toggle button
            const toggleBtn = document.querySelector('[data-action="toggle-glossary"]');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => this.toggle());
            }

            // Term items - scroll to in content
            this.sidebar.querySelectorAll('.glossary-term-item').forEach(item => {
                item.addEventListener('click', () => {
                    const termKey = item.dataset.term;
                    this.highlightTermInContent(termKey);
                });
            });

            // Keyboard shortcut
            document.addEventListener('keydown', (e) => {
                if (e.key === 'Escape' && this.isOpen) {
                    this.close();
                }
                if (e.key === 'g' && !e.target.matches('input, textarea')) {
                    this.toggle();
                }
            });
        },

        open() {
            this.sidebar.classList.add('open');
            this.overlay.classList.add('open');
            this.isOpen = true;
            document.body.style.overflow = 'hidden';
        },

        close() {
            this.sidebar.classList.remove('open');
            this.overlay.classList.remove('open');
            this.isOpen = false;
            document.body.style.overflow = '';
        },

        toggle() {
            this.isOpen ? this.close() : this.open();
        },

        filterTerms(query) {
            const normalizedQuery = query.toLowerCase().trim();

            this.sidebar.querySelectorAll('.glossary-term-item').forEach(item => {
                const termKey = item.dataset.term;
                const term = GLOSSARY[termKey];

                const matches = normalizedQuery === '' ||
                    term.term.toLowerCase().includes(normalizedQuery) ||
                    term.pronunciation.toLowerCase().includes(normalizedQuery) ||
                    term.metaphor.toLowerCase().includes(normalizedQuery);

                item.style.display = matches ? '' : 'none';
            });

            // Hide empty categories
            this.sidebar.querySelectorAll('.glossary-category').forEach(cat => {
                const visibleItems = cat.querySelectorAll('.glossary-term-item[style=""]').length +
                    cat.querySelectorAll('.glossary-term-item:not([style])').length;
                cat.style.display = visibleItems > 0 ? '' : 'none';
            });
        },

        highlightTermInContent(termKey) {
            const techTerms = document.querySelectorAll(`.tech-term[data-term="${termKey}"]`);
            if (techTerms.length > 0) {
                techTerms[0].scrollIntoView({ behavior: 'smooth', block: 'center' });
                techTerms[0].classList.add('highlighted');
                setTimeout(() => techTerms[0].classList.remove('highlighted'), 2000);
                this.close();
            }
        }
    };

    // ==========================================
    // Dark Mode Toggle
    // ==========================================
    const DarkMode = {
        storageKey: 'springboot-story-theme',

        init() {
            // Load saved preference
            const savedTheme = localStorage.getItem(this.storageKey);
            if (savedTheme) {
                document.documentElement.setAttribute('data-theme', savedTheme);
            } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
                document.documentElement.setAttribute('data-theme', 'dark');
            }

            // Bind toggle button
            const toggleBtn = document.querySelector('.theme-toggle');
            if (toggleBtn) {
                toggleBtn.addEventListener('click', () => this.toggle());
            }

            // Listen for custom event
            document.body.addEventListener('toggleDarkMode', () => this.toggle());
        },

        toggle() {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem(this.storageKey, newTheme);
        },

        isDark() {
            return document.documentElement.getAttribute('data-theme') === 'dark';
        }
    };

    // ==========================================
    // Term Tooltips
    // ==========================================
    const TermTooltips = {
        init() {
            document.querySelectorAll('.tech-term[data-term]').forEach(term => {
                const termKey = term.dataset.term;
                const glossaryEntry = GLOSSARY[termKey];

                if (glossaryEntry) {
                    term.setAttribute('data-tooltip', `${glossaryEntry.pronunciation} - ${glossaryEntry.metaphor}`);
                }
            });
        }
    };

    // ==========================================
    // Initialize
    // ==========================================
    function init() {
        GlossarySidebar.init();
        DarkMode.init();
        TermTooltips.init();

        // Add highlighted term style
        const style = document.createElement('style');
        style.textContent = `
      .tech-term.highlighted {
        animation: highlight-pulse 1s ease-in-out;
      }
      
      @keyframes highlight-pulse {
        0%, 100% {
          background: transparent;
        }
        50% {
          background: var(--color-accent-light);
        }
      }
    `;
        document.head.appendChild(style);
    }

    // Run when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }

    // Expose for external use
    window.StoryGlossary = {
        GLOSSARY,
        GlossarySidebar,
        DarkMode
    };

})();
