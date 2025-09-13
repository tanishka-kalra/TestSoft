// Create Questions JavaScript

let optionCounter = 0;
let testCaseCounter = 0;
let tagsArray = [];
let uploadedImage = null;

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    initializePage();
    setupEventListeners();
    addInitialOptions();
    addInitialTestCase();
});

function initializePage() {
    console.log('Create Questions page initialized');
    
    // Setup question type selector
    setupQuestionTypeSelector();
    
    // Setup difficulty selector
    setupDifficultySelector();
    
    // Setup file upload
    setupFileUpload();
    
    // Setup tags input
    setupTagsInput();
    
    // Setup form validation
    setupFormValidation();
}

function setupEventListeners() {
    // Form submission
    document.getElementById('questionForm').addEventListener('submit', handleFormSubmit);
    
    // Preview button
    document.addEventListener('click', function(e) {
        if (e.target.closest('.btn-secondary') && e.target.closest('.btn-secondary').onclick) {
            return; // Let onclick handle it
        }
    });
}

function setupQuestionTypeSelector() {
    const typeCards = document.querySelectorAll('.type-card:not(.disabled)');
    const questionType = document.getElementById('questionType');
    const optionsDescription = document.getElementById('optionsDescription');
    const optionsSection = document.querySelector('.form-section:has(#optionsContainer)');
    const codingSections = document.getElementById('codingSections');
    
    typeCards.forEach(card => {
        card.addEventListener('click', function() {
            if (this.classList.contains('disabled')) return;
            
            // Remove active class from all cards
            typeCards.forEach(c => c.classList.remove('active'));
            
            // Add active class to clicked card
            this.classList.add('active');
            
            // Update hidden input
            const type = this.dataset.type;
            questionType.value = type;
            
            if (type === 'coding') {
                // Show coding sections, hide options section
                optionsSection.style.display = 'none';
                codingSections.style.display = 'block';
            } else {
                // Show options section, hide coding sections
                optionsSection.style.display = 'block';
                codingSections.style.display = 'none';
                
                // Update description and regenerate options
                updateOptionsDescription(type);
                regenerateOptions();
            }
        });
    });
}

function setupDifficultySelector() {
    const difficultyBtns = document.querySelectorAll('.difficulty-btn');
    const difficultyInput = document.getElementById('difficulty');
    
    difficultyBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            // Remove active class from all buttons
            difficultyBtns.forEach(b => b.classList.remove('active'));
            
            // Add active class to clicked button
            this.classList.add('active');
            
            // Update hidden input
            difficultyInput.value = this.dataset.difficulty;
        });
    });
}

function setupFileUpload() {
    const uploadArea = document.getElementById('imageUpload');
    const fileInput = document.getElementById('questionImage');
    const preview = document.getElementById('imagePreview');
    
    uploadArea.addEventListener('click', () => fileInput.click());
    
    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.classList.add('drag-over');
    });
    
    uploadArea.addEventListener('dragleave', () => {
        uploadArea.classList.remove('drag-over');
    });
    
    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.classList.remove('drag-over');
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            handleImageUpload(files[0]);
        }
    });
    
    fileInput.addEventListener('change', (e) => {
        if (e.target.files.length > 0) {
            handleImageUpload(e.target.files[0]);
        }
    });
}

function handleImageUpload(file) {
    if (!file.type.startsWith('image/')) {
        alert('Please select a valid image file.');
        return;
    }
    
    if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Image size should be less than 5MB.');
        return;
    }
    
    const reader = new FileReader();
    reader.onload = function(e) {
        uploadedImage = e.target.result;
        displayImagePreview(uploadedImage, file.name);
    };
    reader.readAsDataURL(file);
}

function displayImagePreview(src, filename) {
    const preview = document.getElementById('imagePreview');
    preview.innerHTML = `
        <div class="image-container">
            <img src="${src}" alt="Question Image">
            <div class="image-info">
                <span>${filename}</span>
                <button type="button" onclick="removeImage()" class="remove-image-btn">
                    <i class="fas fa-times"></i>
                </button>
            </div>
        </div>
    `;
}

function removeImage() {
    uploadedImage = null;
    document.getElementById('imagePreview').innerHTML = '';
    document.getElementById('questionImage').value = '';
}

function setupTagsInput() {
    const tagsInput = document.getElementById('tags');
    
    tagsInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            addTag(this.value.trim());
            this.value = '';
        }
    });
    
    tagsInput.addEventListener('blur', function() {
        if (this.value.trim()) {
            addTag(this.value.trim());
            this.value = '';
        }
    });
}

function addTag(tagText) {
    if (!tagText || tagsArray.includes(tagText)) return;
    
    tagsArray.push(tagText);
    updateTagsDisplay();
}

function removeTag(tagText) {
    tagsArray = tagsArray.filter(tag => tag !== tagText);
    updateTagsDisplay();
}

function updateTagsDisplay() {
    const container = document.getElementById('tagsContainer');
    container.innerHTML = tagsArray.map(tag => `
        <span class="tag">
            ${tag}
            <span class="tag-remove" onclick="removeTag('${tag}')">
                <i class="fas fa-times"></i>
            </span>
        </span>
    `).join('');
}

function updateOptionsDescription(type) {
    const description = document.getElementById('optionsDescription');
    if (type === 'mcq') {
        description.textContent = 'Add answer options. Select the correct answer by clicking the radio button.';
    } else if (type === 'multiselect') {
        description.textContent = 'Add answer options. Select multiple correct answers by clicking the checkboxes.';
    }
}

function addInitialOptions() {
    // Add 4 initial options
    for (let i = 0; i < 4; i++) {
        addOption();
    }
}

function addInitialTestCase() {
    // Add one initial example test case
    addTestCase(true);
}

function addTestCase(isExample = false) {
    const container = document.getElementById('testCasesContainer');
    const testCaseId = `testcase_${testCaseCounter}`;
    
    const testCaseHtml = `
        <div class="test-case-item" data-test-case-id="${testCaseCounter}">
            <div class="test-case-header">
                <div class="test-case-label">
                    Test Case ${testCaseCounter + 1}
                    <span class="${isExample ? 'example-badge' : 'hidden-badge'}" id="badge_${testCaseCounter}">
                        ${isExample ? 'Example' : 'Hidden'}
                    </span>
                </div>
                <div class="test-case-type">
                    <label class="type-radio">
                        <input type="radio" name="type_${testCaseCounter}" value="example" ${isExample ? 'checked' : ''} 
                               onchange="updateTestCaseType(${testCaseCounter}, 'example')">
                        Example
                    </label>
                    <label class="type-radio">
                        <input type="radio" name="type_${testCaseCounter}" value="hidden" ${!isExample ? 'checked' : ''} 
                               onchange="updateTestCaseType(${testCaseCounter}, 'hidden')">
                        Hidden
                    </label>
                </div>
                <button type="button" class="remove-test-case-btn" onclick="removeTestCase(${testCaseCounter})">
                    <i class="fas fa-times"></i>
                </button>
            </div>
            <div class="test-case-content">
                <div class="test-case-input">
                    <label>Input</label>
                    <textarea placeholder="Enter the input for this test case..." required></textarea>
                </div>
                <div class="test-case-output">
                    <label>Expected Output</label>
                    <textarea placeholder="Enter the expected output..." required></textarea>
                </div>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', testCaseHtml);
    testCaseCounter++;
}

function removeTestCase(testCaseId) {
    const testCase = document.querySelector(`[data-test-case-id="${testCaseId}"]`);
    if (testCase) {
        testCase.remove();
        updateTestCaseNumbers();
    }
}

function updateTestCaseType(testCaseId, type) {
    const badge = document.getElementById(`badge_${testCaseId}`);
    if (badge) {
        badge.className = type === 'example' ? 'example-badge' : 'hidden-badge';
        badge.textContent = type === 'example' ? 'Example' : 'Hidden';
    }
}

function updateTestCaseNumbers() {
    const testCases = document.querySelectorAll('.test-case-item');
    testCases.forEach((testCase, index) => {
        const label = testCase.querySelector('.test-case-label');
        const labelText = label.childNodes[0];
        if (labelText) {
            labelText.textContent = `Test Case ${index + 1} `;
        }
    });
}

function addOption() {
    const container = document.getElementById('optionsContainer');
    const questionType = document.getElementById('questionType').value;
    const optionId = `option_${optionCounter}`;
    const inputType = questionType === 'mcq' ? 'radio' : 'checkbox';
    const inputName = questionType === 'mcq' ? 'correctAnswer' : 'correctAnswers';
    
    const optionHtml = `
        <div class="option-item" data-option-id="${optionCounter}">
            <div class="option-selector">
                <input type="${inputType}" name="${inputName}" value="${optionCounter}" id="${optionId}">
            </div>
            <input type="text" class="option-input" placeholder="Enter option text..." required>
            <div class="option-actions">
                <button type="button" class="remove-option-btn" onclick="removeOption(${optionCounter})">
                    <i class="fas fa-trash"></i>
                </button>
            </div>
        </div>
    `;
    
    container.insertAdjacentHTML('beforeend', optionHtml);
    optionCounter++;
    
    // Ensure minimum 2 options
    updateRemoveButtons();
}

function removeOption(optionId) {
    const option = document.querySelector(`[data-option-id="${optionId}"]`);
    if (option) {
        option.remove();
        updateRemoveButtons();
    }
}

function updateRemoveButtons() {
    const options = document.querySelectorAll('.option-item');
    const removeButtons = document.querySelectorAll('.remove-option-btn');
    
    // Disable remove buttons if only 2 options left
    removeButtons.forEach(btn => {
        btn.disabled = options.length <= 2;
        btn.style.opacity = options.length <= 2 ? '0.5' : '1';
        btn.style.cursor = options.length <= 2 ? 'not-allowed' : 'pointer';
    });
}

function regenerateOptions() {
    // Clear existing options
    const container = document.getElementById('optionsContainer');
    container.innerHTML = '';
    optionCounter = 0;
    
    // Add initial options
    addInitialOptions();
}

function previewQuestion() {
    const formData = gatherFormData();
    if (!validateFormData(formData, false)) {
        return;
    }
    
    generatePreview(formData);
    showPreview();
}

function gatherFormData() {
    const questionType = document.getElementById('questionType').value;
    const category = document.getElementById('category').value;
    const difficulty = document.getElementById('difficulty').value;
    const questionText = document.getElementById('questionText').value;
    const explanation = document.getElementById('explanation').value;
    
    if (questionType === 'coding') {
        // Gather coding question data
        const problemDescription = document.getElementById('problemDescription').value;
        const inputFormat = document.getElementById('inputFormat').value;
        const outputFormat = document.getElementById('outputFormat').value;
        const constraints = document.getElementById('constraints').value;
        const solutionTemplate = document.getElementById('solutionTemplate').value;
        const templateLanguage = document.getElementById('templateLanguage').value;
        const timeLimit = document.getElementById('timeLimit').value;
        const memoryLimit = document.getElementById('memoryLimit').value;
        
        // Gather test cases
        const testCases = [];
        document.querySelectorAll('.test-case-item').forEach((item, index) => {
            const input = item.querySelector('.test-case-input textarea').value;
            const output = item.querySelector('.test-case-output textarea').value;
            const isExample = item.querySelector('input[value="example"]').checked;
            
            testCases.push({
                id: index,
                input: input,
                expectedOutput: output,
                isExample: isExample
            });
        });
        
        return {
            questionType,
            category,
            difficulty,
            questionText,
            problemDescription,
            inputFormat,
            outputFormat,
            constraints,
            testCases,
            solutionTemplate,
            templateLanguage,
            timeLimit: parseInt(timeLimit),
            memoryLimit: parseInt(memoryLimit),
            explanation,
            tags: tagsArray,
            image: uploadedImage
        };
    } else {
        // Gather MCQ/Multiselect data
        const options = [];
        const correctAnswers = [];
        
        document.querySelectorAll('.option-item').forEach((item, index) => {
            const text = item.querySelector('.option-input').value;
            const isCorrect = item.querySelector('input[type="radio"], input[type="checkbox"]').checked;
            
            options.push({
                id: index,
                text: text,
                isCorrect: isCorrect
            });
            
            if (isCorrect) {
                correctAnswers.push(index);
            }
        });
        
        return {
            questionType,
            category,
            difficulty,
            questionText,
            explanation,
            options,
            correctAnswers,
            tags: tagsArray,
            image: uploadedImage
        };
    }
}

function validateFormData(formData, showAlerts = true) {
    const errors = [];
    
    if (!formData.category) {
        errors.push('Please select a category');
    }
    
    if (!formData.questionText.trim()) {
        errors.push('Please enter the question text');
    }
    
    if (formData.questionType === 'coding') {
        // Validate coding question specific fields
        if (!formData.problemDescription.trim()) {
            errors.push('Please enter the problem description');
        }
        
        if (formData.testCases.length === 0) {
            errors.push('Please add at least one test case');
        }
        
        const emptyTestCases = formData.testCases.filter(tc => !tc.input.trim() || !tc.expectedOutput.trim());
        if (emptyTestCases.length > 0) {
            errors.push('Please fill in all test case inputs and outputs');
        }
        
        const exampleTestCases = formData.testCases.filter(tc => tc.isExample);
        if (exampleTestCases.length === 0) {
            errors.push('Please mark at least one test case as an example');
        }
        
        if (formData.timeLimit < 1 || formData.timeLimit > 60) {
            errors.push('Time limit must be between 1 and 60 seconds');
        }
        
        if (formData.memoryLimit < 16 || formData.memoryLimit > 512) {
            errors.push('Memory limit must be between 16 and 512 MB');
        }
    } else {
        // Validate MCQ/Multiselect specific fields
        if (formData.options.length < 2) {
            errors.push('Please add at least 2 options');
        }
        
        const emptyOptions = formData.options.filter(opt => !opt.text.trim());
        if (emptyOptions.length > 0) {
            errors.push('Please fill in all option texts');
        }
        
        if (formData.correctAnswers.length === 0) {
            errors.push('Please select at least one correct answer');
        }
        
        if (formData.questionType === 'mcq' && formData.correctAnswers.length > 1) {
            errors.push('Single choice questions can have only one correct answer');
        }
    }
    
    if (errors.length > 0 && showAlerts) {
        alert('Please fix the following errors:\\n\\n' + errors.join('\\n'));
    }
    
    return errors.length === 0;
}

function generatePreview(formData) {
    const previewContent = document.getElementById('previewContent');
    let previewHtml = '';
    
    if (formData.questionType === 'coding') {
        // Generate coding question preview
        previewHtml = `
            <div class="preview-question">
                <div class="question-meta">
                    <span class="difficulty-badge ${formData.difficulty}">${formData.difficulty.toUpperCase()}</span>
                    <span class="category-badge">${formData.category.replace('-', ' ').toUpperCase()}</span>
                    <span class="type-badge coding">CODING</span>
                </div>
                
                <h4>${formData.questionText}</h4>
                
                ${formData.problemDescription ? `
                    <div class="problem-description">
                        <h5>Problem Description:</h5>
                        <p>${formData.problemDescription}</p>
                    </div>
                ` : ''}
                
                ${formData.inputFormat || formData.outputFormat ? `
                    <div class="io-format">
                        ${formData.inputFormat ? `
                            <div class="input-format">
                                <h6>Input Format:</h6>
                                <p>${formData.inputFormat}</p>
                            </div>
                        ` : ''}
                        ${formData.outputFormat ? `
                            <div class="output-format">
                                <h6>Output Format:</h6>
                                <p>${formData.outputFormat}</p>
                            </div>
                        ` : ''}
                    </div>
                ` : ''}
                
                ${formData.constraints ? `
                    <div class="constraints">
                        <h6>Constraints:</h6>
                        <p>${formData.constraints}</p>
                    </div>
                ` : ''}
                
                ${formData.testCases.filter(tc => tc.isExample).length > 0 ? `
                    <div class="example-cases">
                        <h6>Example Test Cases:</h6>
                        ${formData.testCases.filter(tc => tc.isExample).map((testCase, index) => `
                            <div class="example-case">
                                <div class="example-input">
                                    <strong>Input:</strong>
                                    <pre>${testCase.input}</pre>
                                </div>
                                <div class="example-output">
                                    <strong>Output:</strong>
                                    <pre>${testCase.expectedOutput}</pre>
                                </div>
                            </div>
                        `).join('')}
                    </div>
                ` : ''}
                
                <div class="evaluation-info">
                    <div class="time-limit">Time Limit: ${formData.timeLimit}s</div>
                    <div class="memory-limit">Memory Limit: ${formData.memoryLimit}MB</div>
                    <div class="total-cases">Total Test Cases: ${formData.testCases.length}</div>
                </div>
                
                ${formData.solutionTemplate ? `
                    <div class="solution-template">
                        <h6>Code Template (${formData.templateLanguage}):</h6>
                        <pre class="code-preview">${formData.solutionTemplate}</pre>
                    </div>
                ` : ''}
            </div>
        `;
    } else {
        // Generate MCQ/Multiselect preview
        const difficultyStars = {
            'easy': '★',
            'medium': '★★',
            'hard': '★★★'
        };
        
        previewHtml = `
            <div class="preview-question">
                <div class="question-meta">
                    <span class="category-badge">${formData.category.replace('-', ' ').toUpperCase()}</span>
                    <span class="difficulty-badge">${difficultyStars[formData.difficulty]} ${formData.difficulty.toUpperCase()}</span>
                    <span class="type-badge">${formData.questionType === 'mcq' ? 'SINGLE CHOICE' : 'MULTIPLE CHOICE'}</span>
                </div>
                
                <h4>${formData.questionText}</h4>
        `;
        
        if (formData.image) {
            previewHtml += `<img src="${formData.image}" alt="Question Image" style="max-width: 100%; margin: 1rem 0; border-radius: 6px;">`;
        }
        
        previewHtml += `
                <div class="preview-options">
                    ${formData.options.map((option, index) => `
                        <div class="preview-option ${option.isCorrect ? 'correct' : ''}">
                            <span class="option-letter">${String.fromCharCode(65 + index)}.</span>
                            ${option.text}
                            ${option.isCorrect ? '<i class="fas fa-check" style="margin-left: auto; color: #4CAF50;"></i>' : ''}
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    if (formData.explanation) {
        previewHtml += `
            <div class="explanation-preview">
                <h5>Explanation:</h5>
                <p>${formData.explanation}</p>
            </div>
        `;
    }
    
    if (formData.tags.length > 0) {
        previewHtml += `
            <div class="tags-preview">
                <strong>Tags:</strong> ${formData.tags.join(', ')}
            </div>
        `;
    }
    
    previewContent.innerHTML = previewHtml;
}

function showPreview() {
    document.getElementById('previewPanel').classList.add('show');
}

function closePreview() {
    document.getElementById('previewPanel').classList.remove('show');
}

function handleFormSubmit(e) {
    e.preventDefault();
    
    const formData = gatherFormData();
    if (!validateFormData(formData)) {
        return;
    }
    
    // Simulate saving the question
    console.log('Saving question:', formData);
    
    // Show loading state
    showSaveLoading();
    
    // Simulate API call
    setTimeout(() => {
        hideSaveLoading();
        showSuccessModal();
        
        // Store the question (in a real app, this would be sent to a server)
        storeQuestion(formData);
    }, 1500);
}

function showSaveLoading() {
    const submitBtn = document.querySelector('.btn-primary');
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Saving...';
    submitBtn.disabled = true;
}

function hideSaveLoading() {
    const submitBtn = document.querySelector('.btn-primary');
    submitBtn.innerHTML = '<i class="fas fa-save"></i> Save Question';
    submitBtn.disabled = false;
}

function storeQuestion(formData) {
    // In a real application, this would send data to a server
    const existingQuestions = JSON.parse(localStorage.getItem('questions') || '[]');
    
    const question = {
        id: Date.now(),
        ...formData,
        createdAt: new Date().toISOString(),
        createdBy: 'Professor' // In real app, get from user session
    };
    
    existingQuestions.push(question);
    localStorage.setItem('questions', JSON.stringify(existingQuestions));
    
    console.log('Question stored:', question);
}

function showSuccessModal() {
    document.getElementById('successModal').classList.add('show');
}

function closeModal() {
    document.getElementById('successModal').classList.remove('show');
}

function createAnother() {
    closeModal();
    resetForm();
}

function resetForm() {
    // Reset form fields
    document.getElementById('questionForm').reset();
    document.getElementById('questionType').value = 'mcq';
    document.getElementById('difficulty').value = 'easy';
    
    // Reset question type selector
    document.querySelectorAll('.type-card').forEach(card => {
        card.classList.remove('active');
        if (card.dataset.type === 'mcq') {
            card.classList.add('active');
        }
    });
    
    // Show options section, hide coding sections
    const optionsSection = document.querySelector('.form-section:has(#optionsContainer)');
    const codingSections = document.getElementById('codingSections');
    if (optionsSection) optionsSection.style.display = 'block';
    if (codingSections) codingSections.style.display = 'none';
    
    // Reset difficulty selector
    document.querySelectorAll('.difficulty-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.dataset.difficulty === 'easy') {
            btn.classList.add('active');
        }
    });
    
    // Clear tags
    tagsArray = [];
    updateTagsDisplay();
    
    // Clear image
    removeImage();
    
    // Reset options
    regenerateOptions();
    
    // Reset test cases
    const testCasesContainer = document.getElementById('testCasesContainer');
    if (testCasesContainer) {
        testCasesContainer.innerHTML = '';
        testCaseCounter = 0;
        addInitialTestCase();
    }
    
    // Close preview
    closePreview();
}

function setupFormValidation() {
    // Real-time validation
    const requiredFields = ['category', 'questionText'];
    
    requiredFields.forEach(fieldId => {
        const field = document.getElementById(fieldId);
        if (field) {
            field.addEventListener('blur', function() {
                validateField(this);
            });
        }
    });
}

function validateField(field) {
    const isValid = field.value.trim() !== '';
    field.style.borderColor = isValid ? '#e9ecef' : '#dc3545';
    
    // Remove any existing error message
    const existingError = field.parentNode.querySelector('.error-message');
    if (existingError) {
        existingError.remove();
    }
    
    // Add error message if invalid
    if (!isValid) {
        const errorMsg = document.createElement('div');
        errorMsg.className = 'error-message';
        errorMsg.style.color = '#dc3545';
        errorMsg.style.fontSize = '0.8rem';
        errorMsg.style.marginTop = '0.25rem';
        errorMsg.textContent = 'This field is required';
        field.parentNode.appendChild(errorMsg);
    }
}

// Navigation functions
function goBack() {
    if (confirm('Are you sure you want to go back? Any unsaved changes will be lost.')) {
        window.location.href = 'teacher-dashboard.html';
    }
}

function logout() {
    if (confirm('Are you sure you want to logout? Any unsaved changes will be lost.')) {
        // In a real app, clear session and redirect
        window.location.href = 'login.html';
    }
}

// Export functions for potential use
window.CreateQuestions = {
    addOption,
    removeOption,
    addTestCase,
    removeTestCase,
    updateTestCaseType,
    previewQuestion,
    closePreview,
    resetForm,
    goBack,
    logout
};
