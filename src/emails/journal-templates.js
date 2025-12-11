export function getUserEmailTemplate(data) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>ICSIFT Conference Submission Confirmation</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #2d3748;
        max-width: 650px;
        margin: 0 auto;
        padding: 0;
        background-color: #f7fafc;
      }
      .email-container {
        background-color: #ffffff;
        margin: 20px;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      }
      .header {
        background: linear-gradient(135deg, #2d5016 0%, #65a30d 50%, #84cc16 100%);
        color: white;
        padding: 40px 30px;
        text-align: center;
        position: relative;
      }
      .header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/><circle cx="50" cy="10" r="0.5" fill="white" opacity="0.15"/><circle cx="90" cy="40" r="0.5" fill="white" opacity="0.15"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        opacity: 0.3;
      }
      .header-content {
        position: relative;
        z-index: 1;
      }
      .conference-logo {
        font-size: 2.5em;
        font-weight: bold;
        margin: 0 0 10px 0;
        text-shadow: 2px 2px 4px rgba(0,0,0,0.3);
      }
      .conference-subtitle {
        font-size: 1.1em;
        opacity: 0.9;
        margin: 0;
        font-weight: 300;
      }
      .content {
        padding: 40px 30px;
        background-color: #ffffff;
      }
      .greeting {
        font-size: 1.2em;
        color: #2d5016;
        margin-bottom: 20px;
        font-weight: 600;
      }
      .main-message {
        font-size: 1.1em;
        margin-bottom: 25px;
        color: #4a5568;
      }
      .paper-title {
        font-weight: bold;
        color: #65a30d;
        font-size: 1.1em;
        padding: 3px 8px;
        background-color: #f0fdf4;
        border-radius: 6px;
        display: inline-block;
        margin: 0 2px;
      }
      .info-box {
        background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        border-left: 5px solid #65a30d;
        padding: 25px;
        margin: 25px 0;
        border-radius: 8px;
        box-shadow: 0 2px 8px rgba(0,0,0,0.05);
      }
      .info-title {
        color: #2d5016;
        font-weight: bold;
        font-size: 1.1em;
        margin-bottom: 15px;
      }
      .info-list {
        list-style: none;
        padding: 0;
        margin: 0;
      }
      .info-list li {
        padding: 8px 0;
        border-bottom: 1px solid #e5e7eb;
        display: flex;
        align-items: center;
      }
      .info-list li:last-child {
        border-bottom: none;
      }
      .info-label {
        font-weight: 600;
        color: #2d5016;
        min-width: 140px;
        position: relative;
      }
      .info-label::after {
        content: ':';
        margin-left: 5px;
      }
      .info-value {
        color: #4a5568;
        flex: 1;
      }
      .contact-section {
        background-color: #fafafa;
        padding: 20px;
        border-radius: 8px;
        margin: 25px 0;
        border: 1px solid #e5e7eb;
      }
      .signature {
        margin-top: 30px;
        color: #4a5568;
        line-height: 1.8;
      }
      .signature-title {
        color: #2d5016;
        font-weight: bold;
      }
      .footer {
        background-color: #2d5016;
        color: #a7f3d0;
        text-align: center;
        padding: 25px;
        font-size: 0.9em;
      }
      .footer-links {
        margin-top: 15px;
      }
      .footer-links a {
        color: #84cc16;
        text-decoration: none;
        margin: 0 10px;
        font-weight: 500;
      }
      .footer-links a:hover {
        text-decoration: underline;
      }
      @media (max-width: 600px) {
        .email-container {
          margin: 10px;
        }
        .header {
          padding: 30px 20px;
        }
        .content {
          padding: 30px 20px;
        }
        .conference-logo {
          font-size: 2em;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <div class="header-content">
          <h1 class="conference-logo">ICSIFT</h1>
          <p class="conference-subtitle">International Conference on Science, Innovation & Future Technology</p>
        </div>
      </div>
      
      <div class="content">
        <div class="greeting">Dear ${data.author},</div>
        
        <div class="main-message">
          Thank you for submitting your research paper 
          <span class="paper-title">"${data.paper_title}"</span> 
          to the International Conference on Science, Innovation & Future Technology (ICSIFT).
        </div>
        
        <p>We are pleased to confirm that your submission has been received and is now under review by our distinguished panel of experts. You will be notified about the review outcome and conference acceptance status within the next 2-3 weeks.</p>
        
        <div class="info-box">
          <div class="info-title">📋 Submission Summary</div>
          <ul class="info-list">
            <li>
              <span class="info-label">Paper Title</span>
              <span class="info-value">${data.paper_title}</span>
            </li>
            <li>
              <span class="info-label">Conference Track</span>
              <span class="info-value">${data.journal_name}</span>
            </li>
            <li>
              <span class="info-label">Submission Date</span>
              <span class="info-value">${new Date().toLocaleDateString('en-US', { 
                weekday: 'long', 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
            </li>
            <li>
              <span class="info-label">Submission ID</span>
              <span class="info-value">ICSIFT-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}</span>
            </li>
          </ul>
        </div>
        
        <div class="contact-section">
          <p><strong>📧 Need Assistance?</strong></p>
          <p>If you have any questions, need to make changes to your submission, or require additional information about the conference, please don't hesitate to contact us:</p>
          <p>📧 Email: <a href="mailto:info@icsift.org" style="color: #65a30d;">info@icsift.org</a><br>
          🌐 Website: <a href="https://icsift.org" style="color: #65a30d;">www.icsift.org</a></p>
        </div>
        
        <div class="signature">
          <div class="signature-title">Best regards,</div>
          Conference Organizing Committee<br>
          ICSIFT - International Conference on Science, Innovation & Future Technology<br>
          📧 info@icsift.org
        </div>
      </div>
      
      <div class="footer">
        <p>© ${new Date().getFullYear()} ICSIFT Conference. All rights reserved.</p>
        <div class="footer-links">
          <a href="#">Conference Website</a>
          <a href="#">Program Schedule</a>
          <a href="#">Contact Us</a>
        </div>
      </div>
    </div>
  </body>
  </html>
  `
}

export function getAdminEmailTemplate(data, fileUrl) {
  return `
  <!DOCTYPE html>
  <html>
  <head>
    <meta charset="utf-8">
    <title>New ICSIFT Conference Submission</title>
    <style>
      body {
        font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        line-height: 1.6;
        color: #2d3748;
        max-width: 700px;
        margin: 0 auto;
        padding: 0;
        background-color: #f7fafc;
      }
      .email-container {
        background-color: #ffffff;
        margin: 20px;
        border-radius: 12px;
        overflow: hidden;
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      }
      .header {
        background: linear-gradient(135deg, #2d5016 0%, #65a30d 50%, #84cc16 100%);
        color: white;
        padding: 30px;
        text-align: center;
        position: relative;
      }
      .header::before {
        content: '';
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grain" width="100" height="100" patternUnits="userSpaceOnUse"><circle cx="25" cy="25" r="1" fill="white" opacity="0.1"/><circle cx="75" cy="75" r="1" fill="white" opacity="0.1"/></pattern></defs><rect width="100" height="100" fill="url(%23grain)"/></svg>');
        opacity: 0.3;
      }
      .header-content {
        position: relative;
        z-index: 1;
      }
      .alert-badge {
        display: inline-block;
        background-color: #ef4444;
        color: white;
        padding: 8px 16px;
        border-radius: 20px;
        font-size: 0.9em;
        font-weight: bold;
        margin-bottom: 15px;
        animation: pulse 2s infinite;
      }
      @keyframes pulse {
        0% { opacity: 1; }
        50% { opacity: 0.7; }
        100% { opacity: 1; }
      }
      .header-title {
        font-size: 1.8em;
        margin: 0;
        font-weight: bold;
      }
      .header-subtitle {
        font-size: 1em;
        opacity: 0.9;
        margin: 10px 0 0 0;
      }
      .content {
        padding: 40px 30px;
      }
      .notification-banner {
        background: linear-gradient(135deg, #fef3c7 0%, #fde68a 100%);
        border: 2px solid #f59e0b;
        padding: 20px;
        border-radius: 10px;
        margin-bottom: 30px;
        text-align: center;
      }
      .notification-banner .icon {
        font-size: 2em;
        margin-bottom: 10px;
        display: block;
      }
      .notification-text {
        color: #92400e;
        font-weight: 600;
        font-size: 1.1em;
      }
      .details-section {
        background-color: #f8fafc;
        border-radius: 10px;
        overflow: hidden;
        margin: 30px 0;
        box-shadow: 0 4px 12px rgba(0,0,0,0.05);
      }
      .section-header {
        background: linear-gradient(135deg, #2d5016 0%, #65a30d 100%);
        color: white;
        padding: 20px;
        font-weight: bold;
        font-size: 1.2em;
        display: flex;
        align-items: center;
      }
      .section-header .icon {
        margin-right: 10px;
        font-size: 1.3em;
      }
      .details-table {
        width: 100%;
        border-collapse: collapse;
        background-color: white;
      }
      .details-table tr:nth-child(even) {
        background-color: #f8fafc;
      }
      .details-table tr:hover {
        background-color: #f0fdf4;
      }
      .details-table td {
        padding: 15px 20px;
        border-bottom: 1px solid #e2e8f0;
        vertical-align: top;
      }
      .field-label {
        font-weight: 600;
        color: #2d5016;
        min-width: 150px;
        width: 30%;
        border-right: 3px solid #84cc16;
        background-color: #f0fdf4;
      }
      .field-value {
        color: #4a5568;
        word-break: break-word;
      }
      .priority-row {
        border-left: 5px solid #65a30d;
      }
      .file-link {
        display: inline-flex;
        align-items: center;
        background: linear-gradient(135deg, #65a30d 0%, #84cc16 100%);
        color: white;
        text-decoration: none;
        padding: 12px 20px;
        border-radius: 8px;
        font-weight: 600;
        transition: all 0.3s ease;
        box-shadow: 0 4px 12px rgba(101, 163, 13, 0.3);
      }
      .file-link:hover {
        transform: translateY(-2px);
        box-shadow: 0 6px 16px rgba(101, 163, 13, 0.4);
        text-decoration: none;
        color: white;
      }
      .file-link .icon {
        margin-right: 8px;
        font-size: 1.2em;
      }
      .action-section {
        background: linear-gradient(135deg, #f0fdf4 0%, #dcfce7 100%);
        border-radius: 10px;
        padding: 25px;
        margin-top: 30px;
        border: 2px solid #84cc16;
      }
      .action-title {
        color: #2d5016;
        font-weight: bold;
        font-size: 1.2em;
        margin-bottom: 15px;
        display: flex;
        align-items: center;
      }
      .action-title .icon {
        margin-right: 10px;
      }
      .footer {
        background-color: #2d5016;
        color: #a7f3d0;
        text-align: center;
        padding: 25px;
        font-size: 0.9em;
      }
      .footer-links {
        margin-top: 15px;
      }
      .footer-links a {
        color: #84cc16;
        text-decoration: none;
        margin: 0 10px;
        font-weight: 500;
      }
      .urgent-flag {
        background-color: #dc2626;
        color: white;
        padding: 4px 8px;
        border-radius: 4px;
        font-size: 0.8em;
        font-weight: bold;
        margin-left: 10px;
      }
      @media (max-width: 600px) {
        .email-container {
          margin: 10px;
        }
        .content {
          padding: 20px;
        }
        .details-table td {
          padding: 12px 15px;
        }
        .field-label {
          min-width: auto;
          width: auto;
        }
      }
    </style>
  </head>
  <body>
    <div class="email-container">
      <div class="header">
        <div class="header-content">
          <span class="alert-badge">🚨 NEW SUBMISSION</span>
          <h1 class="header-title">ICSIFT Conference Submission</h1>
          <p class="header-subtitle">Administrative Notification</p>
        </div>
      </div>
      
      <div class="content">
        <div class="notification-banner">
          <span class="icon">📝</span>
          <div class="notification-text">A new research paper has been submitted to ICSIFT Conference</div>
        </div>
        
        <div class="details-section">
          <div class="section-header">
            <span class="icon">👤</span>
            Author & Submission Information
          </div>
          <table class="details-table">
            <tr class="priority-row">
              <td class="field-label">Conference Track</td>
              <td class="field-value"><strong>${data.journal_name}</strong></td>
            </tr>
            <tr>
              <td class="field-label">Primary Author</td>
              <td class="field-value">${data.author}</td>
            </tr>
            <tr>
              <td class="field-label">Email Address</td>
              <td class="field-value">
                <a href="mailto:${data.email}" style="color: #65a30d; font-weight: 600;">${data.email}</a>
              </td>
            </tr>
            <tr>
              <td class="field-label">Phone Number</td>
              <td class="field-value">${data.phone_number}</td>
            </tr>
            <tr>
              <td class="field-label">Country</td>
              <td class="field-value">${data.country} 🌍</td>
            </tr>
            <tr>
              <td class="field-label">Co-Author(s)</td>
              <td class="field-value">${data.co_author || 'Not specified'}</td>
            </tr>
          </table>
        </div>
        
        <div class="details-section">
          <div class="section-header">
            <span class="icon">📄</span>
            Research Paper Details
          </div>
          <table class="details-table">
            <tr class="priority-row">
              <td class="field-label">Paper Title</td>
              <td class="field-value"><strong>${data.paper_title}</strong></td>
            </tr>
            <tr>
              <td class="field-label">Department</td>
              <td class="field-value">${data.department}</td>
            </tr>
            <tr>
              <td class="field-label">Organization</td>
              <td class="field-value">${data.organization}</td>
            </tr>
            <tr>
              <td class="field-label">Additional Message</td>
              <td class="field-value">${data.message || 'No additional message provided'}</td>
            </tr>
            <tr>
              <td class="field-label">Submission Date</td>
              <td class="field-value">
                ${new Date().toLocaleDateString('en-US', { 
                  weekday: 'long', 
                  year: 'numeric', 
                  month: 'long', 
                  day: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </td>
            </tr>
            ${fileUrl ? `
            <tr class="priority-row">
              <td class="field-label">Submitted File</td>
              <td class="field-value">
                <a href="${fileUrl}" class="file-link">
                  <span class="icon">📎</span>
                  View/Download Research Paper
                </a>
              </td>
            </tr>
            ` : ''}
          </table>
        </div>
        
        <div class="action-section">
          <div class="action-title">
            <span class="icon">⚡</span>
            Next Actions Required
          </div>
          <p>• Review the submitted research paper for conference track alignment</p>
          <p>• Assign to appropriate review panel members</p>
          <p>• Send acknowledgment to review committee</p>
          <p>• Update submission tracking system</p>
          <p>• Schedule review timeline (Target: 2-3 weeks)</p>
        </div>
      </div>
      
      <div class="footer">
        <p>© ${new Date().getFullYear()} ICSIFT Conference - Administrative System. All rights reserved.</p>
       
      </div>
    </div>
  </body>
  </html>
  `
}