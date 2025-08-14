const validUsername = 'rcb';
const validPassword = 'kohli';

const loginPage = document.getElementById('loginPage');
const boardPage = document.getElementById('boardPage');
const applyPage = document.getElementById('applyPage');
const loginForm = document.getElementById('loginForm');
const loginError = document.getElementById('loginError');

loginForm.addEventListener('submit', function(e) {
  e.preventDefault();
  const usernameInput = document.getElementById('username').value.trim();
  const passwordInput = document.getElementById('password').value.trim();

  if (usernameInput === validUsername && passwordInput === validPassword) {
    loginError.textContent = '';
    loginPage.classList.remove('active');
    boardPage.classList.add('active');
    filterJobs();
  } else {
    loginError.textContent = 'Invalid username or password.';
  }
});

const jobs = [
  { title: 'Frontend Developer', category: 'engineering', company: 'Tech Co', location: 'hyd' },
  { title: 'UI/UX Designer', category: 'design', company: 'Creative Inc', location: 'vizag' },
  { title: 'Marketing Manager', category: 'marketing', company: 'BizGroup', location: 'guntur' },
  { title: 'Backend Developer', category: 'engineering', company: 'DevStudio', location: 'bangalore' },
  { title: 'Data Scientist', category: 'engineering', company: 'Data Corp', location: 'hyd' },
  { title: 'Graphic Designer', category: 'design', company: 'Design Studio', location: 'chennai' },
  { title: 'Product Manager', category: 'marketing', company: 'Tech Innovations', location: 'bangalore' },
  { title: 'HR Specialist', category: 'hr', company: 'PeopleCare', location: 'hyd' },
  { title: 'Financial Analyst', category: 'finance', company: 'FinPro', location: 'other' },
  { title: 'SEO Expert', category: 'marketing', company: 'WebBoosters', location: 'other' },
  { title: 'Cloud Architect', category: 'engineering', company: 'Cloudify', location: 'chennai' },
  { title: 'Mobile App Developer', category: 'engineering', company: 'AppDev', location: 'hyd' },
  { title: 'Content Writer', category: 'marketing', company: 'WriteRight', location: 'vizag' },
  { title: 'Office Manager', category: 'hr', company: 'AdminCorp', location: 'bangalore' },
  { title: 'Financial Advisor', category: 'finance', company: 'MoneyMatters', location: 'chennai' },
  { title: 'QA Engineer', category: 'engineering', company: 'QualityWorks', location: 'hyd' },
  { title: 'Social Media Manager', category: 'marketing', company: 'BuzzSocial', location: 'guntur' },
  { title: 'UX Researcher', category: 'design', company: 'UserFocus', location: 'bangalore' },
  { title: 'Payroll Specialist', category: 'hr', company: 'PayMasters', location: 'other' },
  { title: 'Investment Banker', category: 'finance', company: 'BankTrust', location: 'hyd' },
  { title: 'DevOps Engineer', category: 'engineering', company: 'CloudOps', location: 'chennai' }
];

const jobListEl = document.getElementById('jobList');
const searchInput = document.getElementById('searchInput');
const categoryFilter = document.getElementById('categoryFilter');
const locationFilter = document.getElementById('locationFilter');
const jobTitleApply = document.getElementById('jobTitleApply');
const applyForm = document.getElementById('applyForm');
const cancelApplyBtn = document.getElementById('cancelApplyBtn');

let currentJob = null;

function renderJobs(filteredJobs) {
  jobListEl.innerHTML = '';
  if (filteredJobs.length === 0) {
    jobListEl.innerHTML = '<p>No jobs found.</p>';
    return;
  }
  filteredJobs.forEach(job => {
    const card = document.createElement('div');
    card.className = 'job-card';
    const loc = job.location.charAt(0).toUpperCase() + job.location.slice(1);
    card.innerHTML = `
      <h3>${job.title}</h3>
      <p><strong>Company:</strong> ${job.company}</p>
      <p><strong>Location:</strong> ${loc}</p>
      <p><strong>Category:</strong> ${job.category}</p>
      <button class="btn" onclick="applyJob('${job.title}')">Apply</button>
    `;
    jobListEl.appendChild(card);
  });
}

function applyJob(title) {
  currentJob = jobs.find(job => job.title === title);
  if (!currentJob) return;
  boardPage.classList.remove('active');
  applyPage.classList.add('active');
  jobTitleApply.textContent = `Applying for: ${currentJob.title}`;
}

function filterJobs() {
  const keyword = searchInput.value.trim().toLowerCase();
  const category = categoryFilter.value;
  const location = locationFilter.value;

  const filtered = jobs.filter(job =>
    job.title.toLowerCase().includes(keyword) &&
    (category === 'all' || job.category === category) &&
    (location === 'all' || job.location === location)
  );

  renderJobs(filtered);
}

searchInput.addEventListener('input', filterJobs);
categoryFilter.addEventListener('change', filterJobs);
locationFilter.addEventListener('change', filterJobs);

cancelApplyBtn.addEventListener('click', () => {
  applyPage.classList.remove('active');
  boardPage.classList.add('active');
  applyForm.reset();
});

applyForm.addEventListener('submit', (e) => {
  e.preventDefault();
  alert(`Application submitted for ${currentJob.title}!\n` +
    `Name: ${document.getElementById('applicantName').value}\n` +
    `ID: ${document.getElementById('applicantId').value}\n` +
    `College: ${document.getElementById('applicantCollege').value}\n` +
    `Branch: ${document.getElementById('applicantBranch').value}`);
  applyForm.reset();
  applyPage.classList.remove('active');
  boardPage.classList.add('active');
});
// 🔴 Logout functionality
const logoutBtn = document.getElementById('logoutBtn');
logoutBtn.addEventListener('click', () => {
  boardPage.classList.remove('active');
  applyPage.classList.remove('active');
  loginPage.classList.add('active');
  loginForm.reset();
});
