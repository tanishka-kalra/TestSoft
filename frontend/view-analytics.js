// Analytics Dashboard JavaScript

// Chart variables
let performanceTrendChart = null;
let scoreDistributionChart = null;
let categoryPerformanceChart = null;
let studyPatternsChart = null;

// Sample data for charts and analytics
const analyticsData = {
    performanceTrends: {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        datasets: [{
            label: 'Average Score',
            data: [72, 75, 78, 76, 81, 83],
            borderColor: '#4CAF50',
            backgroundColor: 'rgba(76, 175, 80, 0.1)',
            fill: true,
            tension: 0.4
        }, {
            label: 'Completion Rate',
            data: [85, 88, 92, 89, 94, 96],
            borderColor: '#17a2b8',
            backgroundColor: 'rgba(23, 162, 184, 0.1)',
            fill: true,
            tension: 0.4
        }]
    },
    scoreDistribution: {
        labels: ['0-20%', '21-40%', '41-60%', '61-80%', '81-100%'],
        datasets: [{
            data: [3, 12, 45, 67, 23],
            backgroundColor: [
                '#dc3545',
                '#ffc107',
                '#fd7e14',
                '#17a2b8',
                '#28a745'
            ],
            borderWidth: 2,
            borderColor: '#fff'
        }]
    },
    categoryPerformance: {
        labels: ['Data Structures', 'Algorithms', 'Database Systems', 'Operating Systems', 'Networks', 'Software Engineering'],
        datasets: [{
            label: 'Average Score',
            data: [85, 78, 72, 80, 75, 88],
            backgroundColor: [
                '#4CAF50',
                '#2196F3',
                '#FF9800',
                '#9C27B0',
                '#F44336',
                '#00BCD4'
            ],
            borderWidth: 1
        }]
    },
    studyPatterns: {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
            label: 'Active Students',
            data: [45, 67, 52, 78, 65, 28, 15],
            backgroundColor: 'rgba(76, 175, 80, 0.6)',
            borderColor: '#4CAF50',
            borderWidth: 2
        }]
    }
};

// Initialize page
document.addEventListener('DOMContentLoaded', function() {
    initializeAnalytics();
    setupEventListeners();
    updateMetrics();
    initializeCharts();
    startRealTimeUpdates();
});

// Initialize analytics dashboard
function initializeAnalytics() {
    console.log('Analytics dashboard initialized');
    
    // Set default time filter
    const defaultFilter = document.querySelector('.time-btn[data-period="30"]');
    if (defaultFilter) {
        defaultFilter.classList.add('active');
    }
    
    // Set current date for export modal
    const today = new Date();
    const fromDate = new Date(today.setDate(today.getDate() - 30));
    const toDate = new Date();
    
    document.getElementById('exportFromDate').value = fromDate.toISOString().split('T')[0];
    document.getElementById('exportToDate').value = toDate.toISOString().split('T')[0];
}

// Setup event listeners
function setupEventListeners() {
    // Time period filter buttons
    document.querySelectorAll('.time-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.time-btn').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            
            const period = this.getAttribute('data-period');
            updateDataForPeriod(period);
        });
    });
    
    // Chart controls
    const trendMetricSelect = document.getElementById('trendMetric');
    if (trendMetricSelect) {
        trendMetricSelect.addEventListener('change', function() {
            updatePerformanceTrendChart(this.value);
        });
    }
    
    // Close modal when clicking outside
    document.getElementById('exportModal').addEventListener('click', function(e) {
        if (e.target === this) {
            closeExportModal();
        }
    });
}

// Update metrics dynamically
function updateMetrics() {
    const metrics = {
        avgScore: Math.floor(Math.random() * 20) + 70 + '%',
        totalStudents: Math.floor(Math.random() * 100) + 300,
        testsCompleted: Math.floor(Math.random() * 500) + 1000,
        failureRate: (Math.random() * 10 + 5).toFixed(1) + '%'
    };
    
    Object.keys(metrics).forEach(key => {
        const element = document.getElementById(key);
        if (element) {
            element.textContent = metrics[key];
        }
    });
}

// Initialize all charts
function initializeCharts() {
    initializePerformanceTrendChart();
    initializeScoreDistributionChart();
    initializeCategoryPerformanceChart();
    initializeStudyPatternsChart();
}

// Initialize Performance Trend Chart
function initializePerformanceTrendChart() {
    const ctx = document.getElementById('performanceTrendChart');
    if (!ctx) return;
    
    performanceTrendChart = new Chart(ctx, {
        type: 'line',
        data: analyticsData.performanceTrends,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            interaction: {
                intersect: false,
                mode: 'index'
            },
            plugins: {
                legend: {
                    position: 'top',
                    labels: {
                        usePointStyle: true,
                        padding: 20
                    }
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            elements: {
                point: {
                    radius: 4,
                    hoverRadius: 6
                }
            }
        }
    });
}

// Initialize Score Distribution Chart
function initializeScoreDistributionChart() {
    const ctx = document.getElementById('scoreDistributionChart');
    if (!ctx) return;
    
    scoreDistributionChart = new Chart(ctx, {
        type: 'doughnut',
        data: analyticsData.scoreDistribution,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    position: 'bottom',
                    labels: {
                        padding: 15,
                        usePointStyle: true
                    }
                }
            },
            cutout: '60%'
        }
    });
}

// Initialize Category Performance Chart
function initializeCategoryPerformanceChart() {
    const ctx = document.getElementById('categoryPerformanceChart');
    if (!ctx) return;
    
    categoryPerformanceChart = new Chart(ctx, {
        type: 'bar',
        data: analyticsData.categoryPerformance,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    max: 100,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    },
                    ticks: {
                        callback: function(value) {
                            return value + '%';
                        }
                    }
                }
            },
            elements: {
                bar: {
                    borderRadius: 4
                }
            }
        }
    });
}

// Initialize Study Patterns Chart
function initializeStudyPatternsChart() {
    const ctx = document.getElementById('studyPatternsChart');
    if (!ctx) return;
    
    studyPatternsChart = new Chart(ctx, {
        type: 'bar',
        data: analyticsData.studyPatterns,
        options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                x: {
                    grid: {
                        display: false
                    }
                },
                y: {
                    beginAtZero: true,
                    grid: {
                        color: 'rgba(0, 0, 0, 0.1)'
                    }
                }
            },
            elements: {
                bar: {
                    borderRadius: 4
                }
            }
        }
    });
}

// Update data for selected time period
function updateDataForPeriod(period) {
    console.log(`Updating data for ${period} days period`);
    
    // Simulate data update based on period
    let multiplier = 1;
    switch(period) {
        case '7':
            multiplier = 0.9;
            break;
        case '30':
            multiplier = 1;
            break;
        case '90':
            multiplier = 1.1;
            break;
        case '365':
            multiplier = 1.2;
            break;
    }
    
    // Update metrics
    updateMetrics();
    
    // Update charts with new data
    updateChartsData(multiplier);
}

// Update charts with new data
function updateChartsData(multiplier) {
    // Update performance trend chart
    if (performanceTrendChart) {
        performanceTrendChart.data.datasets[0].data = 
            performanceTrendChart.data.datasets[0].data.map(value => 
                Math.min(100, Math.max(0, Math.round(value * multiplier)))
            );
        performanceTrendChart.update('active');
    }
    
    // Update category performance chart
    if (categoryPerformanceChart) {
        categoryPerformanceChart.data.datasets[0].data = 
            categoryPerformanceChart.data.datasets[0].data.map(value => 
                Math.min(100, Math.max(0, Math.round(value * multiplier)))
            );
        categoryPerformanceChart.update('active');
    }
}

// Update performance trend chart based on metric selection
function updatePerformanceTrendChart(metric) {
    if (!performanceTrendChart) return;
    
    let newData = [];
    switch(metric) {
        case 'average':
            newData = [72, 75, 78, 76, 81, 83];
            break;
        case 'completion':
            newData = [85, 88, 92, 89, 94, 96];
            break;
        case 'participation':
            newData = [78, 82, 85, 83, 87, 90];
            break;
    }
    
    performanceTrendChart.data.datasets[0].data = newData;
    performanceTrendChart.data.datasets[0].label = metric.charAt(0).toUpperCase() + metric.slice(1);
    performanceTrendChart.update('active');
}

// Start real-time updates
function startRealTimeUpdates() {
    // Update metrics every 30 seconds
    setInterval(updateMetrics, 30000);
    
    // Update charts every 2 minutes
    setInterval(() => {
        const randomMultiplier = 0.95 + Math.random() * 0.1; // 0.95 to 1.05
        updateChartsData(randomMultiplier);
    }, 120000);
}

// Navigation functions
function goBack() {
    window.location.href = 'teacher-dashboard.html';
}

function logout() {
    if (confirm('Are you sure you want to logout?')) {
        window.location.href = 'index.html';
    }
}

// Export functionality
function exportAnalytics() {
    document.getElementById('exportModal').classList.add('show');
}

function closeExportModal() {
    document.getElementById('exportModal').classList.remove('show');
}

function performExport() {
    const format = document.querySelector('input[name="exportFormat"]:checked').value;
    const fromDate = document.getElementById('exportFromDate').value;
    const toDate = document.getElementById('exportToDate').value;
    
    // Get selected sections
    const sections = [];
    document.querySelectorAll('.section-checkboxes input:checked').forEach(checkbox => {
        sections.push(checkbox.parentElement.textContent.trim());
    });
    
    // Simulate export process
    const loadingBtn = document.querySelector('.btn-primary');
    const originalText = loadingBtn.innerHTML;
    
    loadingBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Exporting...';
    loadingBtn.disabled = true;
    
    setTimeout(() => {
        // Reset button
        loadingBtn.innerHTML = originalText;
        loadingBtn.disabled = false;
        
        // Close modal
        closeExportModal();
        
        // Show success message
        alert(`Analytics report exported successfully!\n\nFormat: ${format.toUpperCase()}\nPeriod: ${fromDate} to ${toDate}\nSections: ${sections.length}`);
        
        // In a real application, this would trigger actual file download
        console.log('Export details:', { format, fromDate, toDate, sections });
    }, 2000);
}

// View functions for different sections
function viewAllStudents() {
    alert('Redirecting to detailed student performance page...');
    // In real implementation: window.location.href = 'student-performance.html';
}

function viewAllQuestions() {
    alert('Redirecting to detailed question analysis page...');
    // In real implementation: window.location.href = 'question-analysis.html';
}

function viewTestHistory() {
    alert('Redirecting to test history page...');
    // In real implementation: window.location.href = 'test-history.html';
}

// Utility functions
function formatNumber(num) {
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

function formatPercentage(num) {
    return (num * 100).toFixed(1) + '%';
}

function getRandomColor() {
    const colors = ['#4CAF50', '#2196F3', '#FF9800', '#9C27B0', '#F44336', '#00BCD4'];
    return colors[Math.floor(Math.random() * colors.length)];
}

// Error handling
window.addEventListener('error', function(e) {
    console.error('Analytics dashboard error:', e.error);
});

// Performance monitoring
if ('performance' in window) {
    window.addEventListener('load', function() {
        setTimeout(function() {
            const perfData = performance.timing;
            const loadTime = perfData.loadEventEnd - perfData.navigationStart;
            console.log('Analytics dashboard loaded in:', loadTime + 'ms');
        }, 0);
    });
}
