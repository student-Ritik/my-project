// Digital Resume Builder and Portfolio Generator
class ResumeBuilder {
  constructor() {
    this.resume = {
      personalInfo: {},
      summary: '',
      experience: [],
      education: [],
      skills: [],
      projects: [],
      certifications: []
    };
  }

  addPersonalInfo(name, email, phone, location, profileUrl) {
    this.resume.personalInfo = { name, email, phone, location, profileUrl };
    return this;
  }

  addSummary(summary) {
    this.resume.summary = summary;
    return this;
  }

  addExperience(company, position, duration, description) {
    this.resume.experience.push({ company, position, duration, description });
    return this;
  }

  addEducation(institution, degree, field, year) {
    this.resume.education.push({ institution, degree, field, year });
    return this;
  }

  addSkill(skill, level = 'Intermediate') {
    this.resume.skills.push({ skill, level });
    return this;
  }

  addProject(title, description, technologies, link) {
    this.resume.projects.push({ title, description, technologies, link });
    return this;
  }

  addCertification(name, issuer, date) {
    this.resume.certifications.push({ name, issuer, date });
    return this;
  }

  exportAsJSON() {
    return JSON.stringify(this.resume, null, 2);
  }

  exportAsHTML() {
    let html = `
    <html>
    <head>
      <title>${this.resume.personalInfo.name} - Resume</title>
      <style>
        body { font-family: Arial, sans-serif; max-width: 900px; margin: 0 auto; padding: 20px; }
        h1 { color: #2c3e50; border-bottom: 3px solid #3498db; }
        h2 { color: #34495e; margin-top: 30px; }
        .section { margin-bottom: 25px; }
        .contact { display: flex; gap: 20px; }
      </style>
    </head>
    <body>
      <h1>${this.resume.personalInfo.name}</h1>
      <div class="contact">
        <span>📧 ${this.resume.personalInfo.email}</span>
        <span>📱 ${this.resume.personalInfo.phone}</span>
        <span>📍 ${this.resume.personalInfo.location}</span>
      </div>
      
      <div class="section">
        <h2>Professional Summary</h2>
        <p>${this.resume.summary}</p>
      </div>

      <div class="section">
        <h2>Experience</h2>
        ${this.resume.experience.map(exp => `
          <div>
            <h3>${exp.position} at ${exp.company}</h3>
            <p><strong>${exp.duration}</strong></p>
            <p>${exp.description}</p>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <h2>Education</h2>
        ${this.resume.education.map(edu => `
          <div>
            <h3>${edu.degree} in ${edu.field}</h3>
            <p>${edu.institution} | ${edu.year}</p>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <h2>Skills</h2>
        <ul>
          ${this.resume.skills.map(s => `<li>${s.skill} - ${s.level}</li>`).join('')}
        </ul>
      </div>

      <div class="section">
        <h2>Projects</h2>
        ${this.resume.projects.map(proj => `
          <div>
            <h3><a href="${proj.link}">${proj.title}</a></h3>
            <p>${proj.description}</p>
            <p><strong>Tech:</strong> ${proj.technologies.join(', ')}</p>
          </div>
        `).join('')}
      </div>

      <div class="section">
        <h2>Certifications</h2>
        <ul>
          ${this.resume.certifications.map(cert => `<li>${cert.name} - ${cert.issuer} (${cert.date})</li>`).join('')}
        </ul>
      </div>
    </body>
    </html>
    `;
    return html;
  }

  getResume() {
    return this.resume;
  }
}

// Example Usage
const myResume = new ResumeBuilder();

myResume
  .addPersonalInfo('John Doe', 'john@example.com', '+1-234-567-8900', 'New York, NY', 'https://linkedin.com/in/johndoe')
  .addSummary('Experienced Full Stack Developer with expertise in JavaScript, React, and Node.js. Passionate about building scalable web applications.')
  .addExperience('Tech Corp', 'Senior Developer', '2021 - Present', 'Led development of multiple web applications using React and Node.js')
  .addExperience('Web Solutions', 'Junior Developer', '2019 - 2021', 'Developed responsive web interfaces with HTML, CSS, and JavaScript')
  .addEducation('State University', 'Bachelor of Science', 'Computer Science', '2019')
  .addSkill('JavaScript', 'Expert')
  .addSkill('React', 'Expert')
  .addSkill('Node.js', 'Advanced')
  .addSkill('MongoDB', 'Advanced')
  .addProject('E-Commerce Platform', 'Full-stack e-commerce application with payment integration', ['React', 'Node.js', 'MongoDB'], 'https://github.com/johndoe/ecommerce')
  .addProject('Task Manager App', 'Collaborative task management tool', ['React', 'Firebase'], 'https://github.com/johndoe/taskmanager')
  .addCertification('AWS Certified Solutions Architect', 'Amazon Web Services', '2022')
  .addCertification('React Advanced Patterns', 'Coursera', '2021');

// Export as HTML
console.log('Resume built successfully!');
console.log('HTML Export:', myResume.exportAsHTML());
console.log('JSON Export:', myResume.exportAsJSON());
