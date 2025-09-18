// Teacher Dashboard JavaScript

// Navigation functions
function navigateTo(page) {
    console.log(`Navigating to: ${page}`);

    // Show loading state
    showLoadingState();

    // Simulate navigation delay
    setTimeout(() => {
        hideLoadingState();

        switch(page) {
            case 'create-questions':
                // Redirect to create questions page
                window.location.href = 'create-questions.html';
                break;
            case 'view-questions':
                // Redirect to view questions page
                window.location.href = 'view-questions.html';
                break;
            case 'create-tests':
                // Redirect to create tests page
                alert('Redirecting to Create Tests page...\n(This would navigate to create-tests.html in a full implementation)');
                break;
            case 'analytics':
                // Redirect to analytics page
                window.location.href = 'view-analytics.html';
                break;
            default:
                console.log('Unknown page:', page);
        }
    }, 500);
}

// Logout function
function logout() {
    const confirmLogout = confirm('Are you sure you want to logout?');
    if (confirmLogout) {
        // Clear any stored session data
        localStorage.removeItem('userSession');
        sessionStorage.clear();

        // Redirect to login page
        alert('Logging out...\n(This would redirect to login.html in a full implementation)');
        // window.location.href = 'login.html';
    }
}

// Loading state functions
function showLoadingState() {
    // Create loading overlay
    const loadingOverlay = document.createElement('div');
    loadingOverlay.id = 'loading-overlay';
    loadingOverlay.innerHTML = `
        <div class="loading-spinner">
            <div class="spinner"></div>
            <p>Loading...</p>
        </div>
    `;

    // Add loading styles
    loadingOverlay.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(255, 255, 255, 0.9);
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 9999;
    `;

    const spinner = document.createElement('style');
    spinner.innerHTML = `
        .loading-spinner {
            text-align: center;
        }
        .spinner {
            width: 50px;
            height: 50px;
            border: 4px solid #f3f3f3;
            border-top: 4px solid #4CAF50;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto 1rem;
        }
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
        .loading-spinner p {
            color: #6c757d;
            font-weight: 500;
        }
    `;

    document.head.appendChild(spinner);
    document.body.appendChild(loadingOverlay);
}

function hideLoadingState() {
    const loadingOverlay = document.getElementById('loading-overlay');
    if (loadingOverlay) {
        loadingOverlay.remove();
    }
}

// Update stats dynamically
function updateStats() {
    const stats = [
        { selector: '.stat-card:nth-child(1) h3', value: Math.floor(Math.random() * 200) + 100 },
        { selector: '.stat-card:nth-child(2) h3', value: Math.floor(Math.random() * 15) + 5 },
        { selector: '.stat-card:nth-child(3) h3', value: Math.floor(Math.random() * 500) + 200 },
        { selector: '.stat-card:nth-child(4) h3', value: Math.floor(Math.random() * 30) + 70 + '%' }
    ];

    stats.forEach(stat => {
        const element = document.querySelector(stat.selector);
        if (element) {
            element.textContent = stat.value;
        }
    });
}

// Add animation to cards
function animateCards() {
    const cards = document.querySelectorAll('.action-card, .stat-card');

    cards.forEach((card, index) => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';

        setTimeout(() => {
            card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
        }, index * 100);
    });
}

// Add hover effects to action cards
function addHoverEffects() {
    const actionCards = document.querySelectorAll('.action-card');

    actionCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-4px) scale(1.02)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
}

// Initialize dashboard
function initDashboard() {
    console.log('Teacher Dashboard initialized');

    // Animate cards on load
    animateCards();

    // Add hover effects
    addHoverEffects();

    // Update stats every 30 seconds
    setInterval(updateStats, 30000);

    // Add keyboard navigation
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hideLoadingState();
        }
    });

    // Add click analytics
    document.querySelectorAll('.action-card').forEach((card, index) => {
        card.addEventListener('click', function() {
            console.log(`Action card ${index + 1} clicked`);
        });
    });
}

// Auto-refresh activity feed
function refreshActivityFeed() {
    const activities = [
        {
            icon: 'fas fa-user-check',
            text: '<strong>Sarah Johnson</strong> completed "Object Oriented Programming Quiz"',
            time: '1 hour ago',
            score: '92%'
        },
        {
            icon: 'fas fa-plus',
            text: 'New question added to <strong>"Database Systems"</strong> category',
            time: '3 hours ago',
            score: null
        },
        {
            icon: 'fas fa-clipboard-list',
            text: 'Test <strong>"Final Exam"</strong> scheduled',
            time: '5 hours ago',
            score: null
        }
    ];

    const activityList = document.querySelector('.activity-list');
    if (activityList) {
        // Randomly update activities (for demo purposes)
        setTimeout(() => {
            const randomActivity = activities[Math.floor(Math.random() * activities.length)];
            const firstActivity = activityList.querySelector('.activity-item');
            if (firstActivity) {
                firstActivity.querySelector('.activity-content p').innerHTML = randomActivity.text;
                firstActivity.querySelector('.activity-time').textContent = randomActivity.time;

                // Update score if available
                const scoreBadge = firstActivity.querySelector('.score-badge');
                if (randomActivity.score && scoreBadge) {
                    scoreBadge.textContent = randomActivity.score;
                } else if (scoreBadge) {
                    scoreBadge.style.display = 'none';
                }

                // Add flash effect
                firstActivity.style.background = '#e8f5e8';
                setTimeout(() => {
                    firstActivity.style.background = '#f8f9fa';
                }, 1000);
            }
        }, 5000);
    }
}

// Welcome message
function showWelcomeMessage() {
    const currentHour = new Date().getHours();
    let greeting;

    if (currentHour < 12) {
        greeting = 'Good Morning';
    } else if (currentHour < 18) {
        greeting = 'Good Afternoon';
    } else {
        greeting = 'Good Evening';
    }

    const welcomeText = document.querySelector('.welcome-text');
    if (welcomeText) {
        welcomeText.textContent = `${greeting}, Professor`;
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initDashboard();
    showWelcomeMessage();
    refreshActivityFeed();
});

// Handle window resize
window.addEventListener('resize', function() {
    // Adjust layout for mobile devices
    const isMobile = window.innerWidth < 768;
    const actionCards = document.querySelectorAll('.action-card');

    actionCards.forEach(card => {
        if (isMobile) {
            card.style.minHeight = 'auto';
        } else {
            card.style.minHeight = '300px';
        }
    });
});

// Export functions for potential use in other modules
window.TeacherDashboard = {
    navigateTo,
    logout,
    updateStats,
    refreshActivityFeed
};
