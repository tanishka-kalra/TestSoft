// View Questions JavaScript

let allQuestions = [];
let filteredQuestions = [];
let selectedQuestions = new Set();
let currentPage = 1;
let itemsPerPage = 12;
let currentView = 'card';
let currentQuestionId = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    loadQuestions();
    setupEventListeners();
});

function initializePage() {
    console.log('View Questions page initialized');
    setupFilters();
    setupPagination();
}

function setupEventListeners() {
    // Search input
    const searchInput = document.getElementById('searchInput');
    searchInput.addEventListener('input', debounce(handleSearch, 300));
    
    // Filter selects
    document.getElementById('categoryFilter').addEventListener('change', applyFilters);
    document.getElementById('sortBy').addEventListener('change', applySorting);
    
    // Difficulty checkboxes
    document.querySelectorAll('.difficulty-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Type checkboxes
    document.querySelectorAll('.type-checkbox').forEach(checkbox => {
        checkbox.addEventListener('change', applyFilters);
    });
    
    // Select all checkbox
    document.getElementById('selectAll').addEventListener('change', handleSelectAll);
}

function loadQuestions() {
    // Load questions from localStorage (simulating API call)
    const storedQuestions = localStorage.getItem('questions');
    
    if (storedQuestions) {
        allQuestions = JSON.parse(storedQuestions);
    } else {
        // Create sample questions if none exist
        allQuestions = generateSampleQuestions();
        localStorage.setItem('questions', JSON.stringify(allQuestions));
    }
    
    filteredQuestions = [...allQuestions];
    updateDisplay();
}

function generateSampleQuestions() {
    const sampleQuestions = [
        {
            id: 1,
            questionType: 'mcq',
            category: 'data-structures',
            difficulty: 'easy',
            questionText: 'What is the time complexity of accessing an element in an array by index?',
            options: [
                { id: 0, text: 'O(1)', isCorrect: true },
                { id: 1, text: 'O(log n)', isCorrect: false },
                { id: 2, text: 'O(n)', isCorrect: false },
                { id: 3, text: 'O(n²)', isCorrect: false }
            ],
            correctAnswers: [0],
            explanation: 'Array access by index is constant time O(1) because arrays provide direct memory access.',
            tags: ['array', 'time-complexity', 'basics'],
            createdAt: '2024-01-15T10:30:00Z',
            createdBy: 'Professor'
        },
        {
            id: 2,
            questionType: 'multiselect',
            category: 'algorithms',
            difficulty: 'medium',
            questionText: 'Which of the following are stable sorting algorithms?',
            options: [
                { id: 0, text: 'Merge Sort', isCorrect: true },
                { id: 1, text: 'Quick Sort', isCorrect: false },
                { id: 2, text: 'Insertion Sort', isCorrect: true },
                { id: 3, text: 'Heap Sort', isCorrect: false }
            ],
            correctAnswers: [0, 2],
            explanation: 'Merge Sort and Insertion Sort maintain the relative order of equal elements.',
            tags: ['sorting', 'stability', 'algorithms'],
            createdAt: '2024-01-14T14:20:00Z',
            createdBy: 'Professor'
        },
        {
            id: 3,
            questionType: 'mcq',
            category: 'database-systems',
            difficulty: 'hard',
            questionText: 'In a B+ tree with order m, what is the maximum number of keys in an internal node?',
            options: [
                { id: 0, text: 'm', isCorrect: false },
                { id: 1, text: 'm-1', isCorrect: true },
                { id: 2, text: 'm+1', isCorrect: false },
                { id: 3, text: '2m', isCorrect: false }
            ],
            correctAnswers: [1],
            explanation: 'In a B+ tree, an internal node of order m can have at most m-1 keys.',
            tags: ['btree', 'database', 'indexing'],
            createdAt: '2024-01-13T09:15:00Z',
            createdBy: 'Professor'
        },
        {
            id: 4,
            questionType: 'mcq',
            category: 'operating-systems',
            difficulty: 'medium',
            questionText: 'Which scheduling algorithm can lead to starvation?',
            options: [
                { id: 0, text: 'Round Robin', isCorrect: false },
                { id: 1, text: 'FCFS', isCorrect: false },
                { id: 2, text: 'Priority Scheduling', isCorrect: true },
                { id: 3, text: 'SJF (Non-preemptive)', isCorrect: false }
            ],
            correctAnswers: [2],
            explanation: 'Priority scheduling can cause low-priority processes to wait indefinitely.',
            tags: ['scheduling', 'starvation', 'os'],
            createdAt: '2024-01-12T16:45:00Z',
            createdBy: 'Professor'
        },
        {
            id: 5,
            questionType: 'multiselect',
            category: 'computer-networks',
            difficulty: 'easy',
            questionText: 'Which of the following are application layer protocols?',
            options: [
                { id: 0, text: 'HTTP', isCorrect: true },
                { id: 1, text: 'TCP', isCorrect: false },
                { id: 2, text: 'SMTP', isCorrect: true },
                { id: 3, text: 'IP', isCorrect: false }
            ],
            correctAnswers: [0, 2],
            explanation: 'HTTP and SMTP are application layer protocols, while TCP and IP are transport and network layer protocols respectively.',
            tags: ['protocols', 'osi-model', 'networking'],
            createdAt: '2024-01-11T11:30:00Z',
            createdBy: 'Professor'
        }
    ];
    
    return sampleQuestions;
}

function handleSearch() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const clearBtn = document.querySelector('.clear-search');
    
    if (searchTerm) {
        clearBtn.style.display = 'block';
    } else {
        clearBtn.style.display = 'none';
    }
    
    applyFilters();
}

function clearSearch() {
    document.getElementById('searchInput').value = '';
    document.querySelector('.clear-search').style.display = 'none';
    applyFilters();
}

function applyFilters() {
    const searchTerm = document.getElementById('searchInput').value.toLowerCase();
    const category = document.getElementById('categoryFilter').value;
    const selectedDifficulties = Array.from(document.querySelectorAll('.difficulty-checkbox:checked')).map(cb => cb.value);
    const selectedTypes = Array.from(document.querySelectorAll('.type-checkbox:checked')).map(cb => cb.value);
    
    filteredQuestions = allQuestions.filter(question => {
        // Search filter
        if (searchTerm && !question.questionText.toLowerCase().includes(searchTerm) && 
            !question.tags.some(tag => tag.toLowerCase().includes(searchTerm))) {
            return false;
        }
        
        // Category filter
        if (category && question.category !== category) {
            return false;
        }
        
        // Difficulty filter
        if (selectedDifficulties.length > 0 && !selectedDifficulties.includes(question.difficulty)) {
            return false;
        }
        
        // Type filter
        if (selectedTypes.length > 0 && !selectedTypes.includes(question.questionType)) {
            return false;
        }
        
        return true;
    });
    
    applySorting();
    currentPage = 1;
    updateDisplay();
}

function applySorting() {
    const sortBy = document.getElementById('sortBy').value;
    
    filteredQuestions.sort((a, b) => {
        switch (sortBy) {
            case 'newest':
                return new Date(b.createdAt) - new Date(a.createdAt);
            case 'oldest':
                return new Date(a.createdAt) - new Date(b.createdAt);
            case 'difficulty':
                const difficultyOrder = { 'easy': 1, 'medium': 2, 'hard': 3 };
                return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
            case 'category':
                return a.category.localeCompare(b.category);
            case 'type':
                return a.questionType.localeCompare(b.questionType);
            default:
                return 0;
        }
    });
}

function clearAllFilters() {
    // Clear search
    document.getElementById('searchInput').value = '';
    document.querySelector('.clear-search').style.display = 'none';
    
    // Clear category
    document.getElementById('categoryFilter').value = '';
    
    // Clear difficulty checkboxes
    document.querySelectorAll('.difficulty-checkbox').forEach(cb => cb.checked = false);
    
    // Clear type checkboxes
    document.querySelectorAll('.type-checkbox').forEach(cb => cb.checked = false);
    
    // Reset sort
    document.getElementById('sortBy').value = 'newest';
    
    // Apply filters
    applyFilters();
}

function switchView(viewType) {
    currentView = viewType;
    
    // Update view buttons
    document.querySelectorAll('.view-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.view === viewType) {
            btn.classList.add('active');
        }
    });
    
    renderQuestions();
}

function updateDisplay() {
    updateStatistics();
    renderQuestions();
    renderPagination();
    updateBulkActions();
    
    // Show/hide empty state
    const emptyState = document.getElementById('emptyState');
    const questionsSection = document.querySelector('.questions-section');
    
    if (filteredQuestions.length === 0) {
        emptyState.style.display = 'block';
        questionsSection.style.display = 'none';
    } else {
        emptyState.style.display = 'none';
        questionsSection.style.display = 'block';
    }
}

function updateStatistics() {
    document.getElementById('totalQuestions').textContent = allQuestions.length;
    document.getElementById('filteredQuestions').textContent = filteredQuestions.length;
    document.getElementById('selectedQuestions').textContent = selectedQuestions.size;
}

function renderQuestions() {
    const container = document.getElementById('questionsContainer');
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const questionsToShow = filteredQuestions.slice(startIndex, endIndex);
    
    if (currentView === 'card') {
        container.innerHTML = `<div class="questions-grid">${questionsToShow.map(renderQuestionCard).join('')}</div>`;
    } else {
        container.innerHTML = `
            <div class="questions-list">
                <div class="question-row" style="font-weight: 600; background: #e9ecef;">
                    <div>Select</div>
                    <div>Question</div>
                    <div>Category</div>
                    <div>Difficulty</div>
                    <div>Type</div>
                    <div>Created</div>
                    <div>Actions</div>
                </div>
                ${questionsToShow.map(renderQuestionRow).join('')}
            </div>
        `;
    }
    
    // Attach event listeners
    attachQuestionEventListeners();
}

function renderQuestionCard(question) {
    const categoryName = question.category.replace('-', ' ').toUpperCase();
    const difficultyStars = {
        'easy': '★',
        'medium': '★★',
        'hard': '★★★'
    };
    const typeNames = {
        'mcq': 'Single Choice',
        'multiselect': 'Multiple Choice'
    };
    
    const isSelected = selectedQuestions.has(question.id);
    const correctCount = question.correctAnswers.length;
    const totalOptions = question.options.length;
    
    return `
        <div class="question-card ${isSelected ? 'selected' : ''}" data-question-id="${question.id}">
            <div class="question-select">
                <input type="checkbox" ${isSelected ? 'checked' : ''} onchange="toggleQuestionSelection(${question.id})">
            </div>
            
            <div class="question-header">
                <div class="question-meta">
                    <div class="category-badge">${categoryName}</div>
                    <div class="difficulty-badge ${question.difficulty}">
                        ${difficultyStars[question.difficulty]} ${question.difficulty.toUpperCase()}
                    </div>
                    <div class="question-type">${typeNames[question.questionType]}</div>
                </div>
            </div>
            
            <div class="question-content" onclick="viewQuestion(${question.id})">
                <div class="question-text">${question.questionText}</div>
                <div class="question-options-count">
                    ${totalOptions} options • ${correctCount} correct answer${correctCount !== 1 ? 's' : ''}
                </div>
            </div>
            
            <div class="question-footer">
                <div class="question-tags">
                    ${question.tags.slice(0, 3).map(tag => `<span class="tag-mini">${tag}</span>`).join('')}
                    ${question.tags.length > 3 ? `<span class="tag-mini">+${question.tags.length - 3}</span>` : ''}
                </div>
                <div class="question-actions">
                    <button class="action-btn" onclick="editQuestion(${question.id})" title="Edit">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn danger" onclick="deleteQuestionConfirm(${question.id})" title="Delete">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
            
            <div class="question-date">
                Created: ${formatDate(question.createdAt)}
            </div>
        </div>
    `;
}

function renderQuestionRow(question) {
    const categoryName = question.category.replace('-', ' ');
    const difficultyStars = {
        'easy': '★',
        'medium': '★★',
        'hard': '★★★'
    };
    const typeNames = {
        'mcq': 'Single',
        'multiselect': 'Multi'
    };
    
    const isSelected = selectedQuestions.has(question.id);
    
    return `
        <div class="question-row ${isSelected ? 'selected' : ''}" data-question-id="${question.id}">
            <input type="checkbox" ${isSelected ? 'checked' : ''} onchange="toggleQuestionSelection(${question.id})">
            <div class="question-text" onclick="viewQuestion(${question.id})">${question.questionText}</div>
            <div>${categoryName}</div>
            <div class="difficulty-badge ${question.difficulty}">
                ${difficultyStars[question.difficulty]} ${question.difficulty}
            </div>
            <div>${typeNames[question.questionType]}</div>
            <div>${formatDate(question.createdAt)}</div>
            <div>
                <button class="action-btn" onclick="editQuestion(${question.id})" title="Edit">
                    <i class="fas fa-edit"></i>
                </button>
                <button class="action-btn danger" onclick="deleteQuestionConfirm(${question.id})" title="Delete">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
}

function attachQuestionEventListeners() {
    // Add click handlers for question cards/rows
    document.querySelectorAll('.question-card, .question-row').forEach(element => {
        element.addEventListener('click', function(e) {
            // Don't trigger if clicking on interactive elements
            if (e.target.type === 'checkbox' || e.target.closest('button') || e.target.closest('.question-actions')) {
                return;
            }
            
            const questionId = parseInt(this.dataset.questionId);
            viewQuestion(questionId);
        });
    });
}

function renderPagination() {
    const pagination = document.getElementById('pagination');
    const totalPages = Math.ceil(filteredQuestions.length / itemsPerPage);
    
    if (totalPages <= 1) {
        pagination.innerHTML = '';
        return;
    }
    
    let paginationHtml = '';
    
    // Previous button
    paginationHtml += `
        <button ${currentPage === 1 ? 'disabled' : ''} onclick="changePage(${currentPage - 1})">
            <i class="fas fa-chevron-left"></i>
        </button>
    `;
    
    // Page numbers
    for (let i = 1; i <= totalPages; i++) {
        if (i === 1 || i === totalPages || (i >= currentPage - 1 && i <= currentPage + 1)) {
            paginationHtml += `
                <button class="${i === currentPage ? 'active' : ''}" onclick="changePage(${i})">
                    ${i}
                </button>
            `;
        } else if (i === currentPage - 2 || i === currentPage + 2) {
            paginationHtml += '<span>...</span>';
        }
    }
    
    // Next button
    paginationHtml += `
        <button ${currentPage === totalPages ? 'disabled' : ''} onclick="changePage(${currentPage + 1})">
            <i class="fas fa-chevron-right"></i>
        </button>
    `;
    
    pagination.innerHTML = paginationHtml;
}

function changePage(page) {
    currentPage = page;
    renderQuestions();
    renderPagination();
}

function toggleQuestionSelection(questionId) {
    if (selectedQuestions.has(questionId)) {
        selectedQuestions.delete(questionId);
    } else {
        selectedQuestions.add(questionId);
    }
    
    updateDisplay();
    updateSelectAllCheckbox();
}

function handleSelectAll() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const questionsOnPage = filteredQuestions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    
    if (selectAllCheckbox.checked) {
        questionsOnPage.forEach(q => selectedQuestions.add(q.id));
    } else {
        questionsOnPage.forEach(q => selectedQuestions.delete(q.id));
    }
    
    updateDisplay();
}

function updateSelectAllCheckbox() {
    const selectAllCheckbox = document.getElementById('selectAll');
    const questionsOnPage = filteredQuestions.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );
    
    const selectedOnPage = questionsOnPage.filter(q => selectedQuestions.has(q.id)).length;
    
    if (selectedOnPage === 0) {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = false;
    } else if (selectedOnPage === questionsOnPage.length) {
        selectAllCheckbox.checked = true;
        selectAllCheckbox.indeterminate = false;
    } else {
        selectAllCheckbox.checked = false;
        selectAllCheckbox.indeterminate = true;
    }
}

function updateBulkActions() {
    const bulkActions = document.getElementById('bulkActions');
    const selectedCount = document.getElementById('selectedCount');
    
    if (selectedQuestions.size > 0) {
        bulkActions.style.display = 'flex';
        selectedCount.textContent = selectedQuestions.size;
    } else {
        bulkActions.style.display = 'none';
    }
}

function viewQuestion(questionId) {
    currentQuestionId = questionId;
    const question = allQuestions.find(q => q.id === questionId);
    if (!question) return;
    
    const modal = document.getElementById('questionModal');
    const content = document.getElementById('questionDetailContent');
    
    const categoryName = question.category.replace('-', ' ').toUpperCase();
    const difficultyStars = {
        'easy': '★',
        'medium': '★★',
        'hard': '★★★'
    };
    const typeNames = {
        'mcq': 'Single Choice Question',
        'multiselect': 'Multiple Choice Question'
    };
    
    content.innerHTML = `
        <div class="question-detail">
            <div class="question-meta-detail">
                <div class="meta-item">
                    <strong>Category:</strong> ${categoryName}
                </div>
                <div class="meta-item">
                    <strong>Difficulty:</strong> 
                    <span class="difficulty-badge ${question.difficulty}">
                        ${difficultyStars[question.difficulty]} ${question.difficulty.toUpperCase()}
                    </span>
                </div>
                <div class="meta-item">
                    <strong>Type:</strong> ${typeNames[question.questionType]}
                </div>
                <div class="meta-item">
                    <strong>Created:</strong> ${formatDate(question.createdAt)}
                </div>
            </div>
            
            <div class="question-text-detail">
                <h4>Question:</h4>
                <p>${question.questionText}</p>
            </div>
            
            <div class="options-detail">
                <h4>Options:</h4>
                <div class="options-list">
                    ${question.options.map((option, index) => `
                        <div class="option-detail ${option.isCorrect ? 'correct' : ''}">
                            <span class="option-letter">${String.fromCharCode(65 + index)}.</span>
                            <span class="option-text">${option.text}</span>
                            ${option.isCorrect ? '<i class="fas fa-check correct-icon"></i>' : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
            
            ${question.explanation ? `
                <div class="explanation-detail">
                    <h4>Explanation:</h4>
                    <p>${question.explanation}</p>
                </div>
            ` : ''}
            
            ${question.tags.length > 0 ? `
                <div class="tags-detail">
                    <h4>Tags:</h4>
                    <div class="tags-list">
                        ${question.tags.map(tag => `<span class="tag">${tag}</span>`).join('')}
                    </div>
                </div>
            ` : ''}
        </div>
    `;
    
    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('questionModal').classList.remove('show');
    currentQuestionId = null;
}

function editQuestion() {
    if (currentQuestionId) {
        // In a real application, navigate to edit page with question ID
        alert(`Edit question ${currentQuestionId}\n(This would navigate to edit-question.html?id=${currentQuestionId})`);
        closeModal();
    }
}

function deleteQuestion() {
    if (currentQuestionId && confirm('Are you sure you want to delete this question?')) {
        allQuestions = allQuestions.filter(q => q.id !== currentQuestionId);
        localStorage.setItem('questions', JSON.stringify(allQuestions));
        
        selectedQuestions.delete(currentQuestionId);
        closeModal();
        applyFilters(); // Refresh the display
        
        showNotification('Question deleted successfully', 'success');
    }
}

function deleteQuestionConfirm(questionId) {
    if (confirm('Are you sure you want to delete this question?')) {
        allQuestions = allQuestions.filter(q => q.id !== questionId);
        localStorage.setItem('questions', JSON.stringify(allQuestions));
        
        selectedQuestions.delete(questionId);
        applyFilters(); // Refresh the display
        
        showNotification('Question deleted successfully', 'success');
    }
}

function exportSelected() {
    if (selectedQuestions.size === 0) {
        alert('Please select questions to export');
        return;
    }
    
    const questionsToExport = allQuestions.filter(q => selectedQuestions.has(q.id));
    const dataStr = JSON.stringify(questionsToExport, null, 2);
    const dataBlob = new Blob([dataStr], { type: 'application/json' });
    
    const link = document.createElement('a');
    link.href = URL.createObjectURL(dataBlob);
    link.download = `questions_export_${new Date().getTime()}.json`;
    link.click();
    
    showNotification(`${selectedQuestions.size} questions exported successfully`, 'success');
}

function deleteSelected() {
    if (selectedQuestions.size === 0) {
        alert('Please select questions to delete');
        return;
    }
    
    if (confirm(`Are you sure you want to delete ${selectedQuestions.size} selected questions?`)) {
        allQuestions = allQuestions.filter(q => !selectedQuestions.has(q.id));
        localStorage.setItem('questions', JSON.stringify(allQuestions));
        
        const deletedCount = selectedQuestions.size;
        selectedQuestions.clear();
        applyFilters(); // Refresh the display
        
        showNotification(`${deletedCount} questions deleted successfully`, 'success');
    }
}

// Utility functions
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
}

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas fa-${type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    // Add styles
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: ${type === 'success' ? '#d4edda' : '#d1ecf1'};
        color: ${type === 'success' ? '#155724' : '#0c5460'};
        border: 1px solid ${type === 'success' ? '#c3e6cb' : '#bee5eb'};
        padding: 12px 16px;
        border-radius: 8px;
        display: flex;
        align-items: center;
        gap: 8px;
        z-index: 3000;
        animation: slideInRight 0.3s ease;
    `;
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.remove();
    }, 3000);
}

function setupFilters() {
    // Initialize filter states
    // Could load saved filter preferences here
}

function setupPagination() {
    // Set items per page based on view
    itemsPerPage = currentView === 'card' ? 12 : 20;
}

// Navigation functions
function createNewQuestion() {
    window.location.href = 'create-questions.html';
}

function goBack() {
    window.location.href = 'teacher-dashboard.html';
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        // In a real app, clear session and redirect
        window.location.href = 'login.html';
    }
}

// Export functions for potential use
window.ViewQuestions = {
    applyFilters,
    clearAllFilters,
    switchView,
    viewQuestion,
    editQuestion,
    deleteQuestion,
    exportSelected,
    deleteSelected,
    toggleQuestionSelection,
    createNewQuestion,
    goBack,
    logout
};
