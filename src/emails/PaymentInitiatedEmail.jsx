const RegistrationEmailTemplate = (data) => {
  const isAdmin = data.recipient === "admin"
  const currencySymbol = data.currency === "USD" ? "$" : "€"

  return `
    <!DOCTYPE html>
    <html>
      <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${isAdmin ? "New Registration Payment Initiated" : "Your ICSIFT Registration Payment Initiated"}</title>
        <style>
          @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
          
          body {
            font-family: 'Inter', sans-serif;
            background-color: #f8faf5;
            margin: 0;
            padding: 0;
            color: #4d724d;
          }
          
          .container {
            max-width: 600px;
            margin: 0 auto;
            padding: 20px;
          }
          
          .header {
            text-align: center;
            margin-bottom: 30px;
          }
          
          .logo {
            margin-bottom: 20px;
          }
          
          .title {
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 10px;
            color: #1a2e1a;
          }
          
          .card {
            background-color: #ffffff;
            border-radius: 12px;
            padding: 20px;
            margin-bottom: 20px;
            border: 1px solid #d3e4c5;
            box-shadow: 0 2px 10px rgba(77, 114, 77, 0.1);
            position: relative;
            overflow: hidden;
          }
          
          .card::before {
            content: "";
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            height: 4px;
            background: #4d724d;
          }
          
          .section-title {
            font-size: 18px;
            font-weight: 600;
            margin-bottom: 15px;
            color: #1a2e1a;
          }
          
          .detail-row {
            display: flex;
            justify-content: space-between;
            margin-bottom: 10px;
            padding-bottom: 10px;
            border-bottom: 1px solid #d3e4c5;
          }
          
          .detail-row:last-child {
            border-bottom: none;
          }
          
          .detail-label {
            color: #4d724d;
            font-weight: 500;
          }
          
          .detail-value {
            color: #1a2e1a;
            font-weight: 600;
          }
          
          .highlight {
            background-color: #edf6e1;
            padding: 15px;
            border-radius: 8px;
            margin-top: 20px;
            border-left: 4px solid #4d724d;
            color: #4d724d;
          }
          
          .highlight p {
            color: #4d724d;
            margin: 0;
          }
          
          .button {
            display: inline-block;
            background: #4d724d;
            color: white;
            font-weight: bold;
            padding: 12px 24px;
            border-radius: 50px;
            text-decoration: none;
            margin-top: 20px;
            text-align: center;
          }
          
          .footer {
            text-align: center;
            margin-top: 30px;
            padding-top: 20px;
            border-top: 1px solid #d3e4c5;
            color: #4d724d;
            font-size: 14px;
          }
          
          .grid-pattern {
            background-image: radial-gradient(rgba(77, 114, 77, 0.1) 1px, transparent 1px);
            background-size: 20px 20px;
          }
          
          .card p, .card li {
            color: #4d724d;
          }
          
          ul {
            padding-left: 20px;
          }
          
          li {
            margin-bottom: 8px;
          }
          
          a {
            color: #4d724d;
            text-decoration: none;
            font-weight: 500;
          }
          
          a:hover {
            text-decoration: underline;
          }
        </style>
      </head>
      <body class="grid-pattern">
        <div class="container">
          <div class="header">
            
            <div class="title">
              ${isAdmin ? "New Registration Payment Initiated" : "Your Registration Payment Initiated"}
            </div>
          </div>
          
          <div class="card">
            <div class="section-title">Registration Payment Details</div>
            
            <div class="detail-row">
              <span class="detail-label">Registration Type:</span>
              <span class="detail-value">${data.ticket_category} - ${data.ticket_name}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Order ID:</span>
              <span class="detail-value">${data.order_id}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Amount:</span>
              <span class="detail-value">${currencySymbol}${data.amount}</span>
            </div>
            
            ${
              isAdmin
                ? `
            <div class="section-title" style="margin-top: 20px;">Registrant Information</div>
            
            <div class="detail-row">
              <span class="detail-label">Name:</span>
              <span class="detail-value">${data.billing_name}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Email:</span>
              <span class="detail-value">${data.billing_email}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Phone:</span>
              <span class="detail-value">${data.billing_tel}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Organization:</span>
              <span class="detail-value">${data.billing_organization || "Not provided"}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Designation:</span>
              <span class="detail-value">${data.billing_designation || "Not provided"}</span>
            </div>
            
            <div class="detail-row">
              <span class="detail-label">Address:</span>
              <span class="detail-value">${data.billing_address}, ${data.billing_city}, ${data.billing_state}, ${
                data.billing_zip
              }, ${data.billing_country}</span>
            </div>
            `
                : `
            <div class="highlight">
              <p>Your registration payment for ICSIFT 2025 has been initiated. Please note that your registration is not complete until payment is confirmed.</p>
            </div>
            
           
            `
            }
          </div>
          
          ${
            isAdmin
              ? `
          <div class="highlight">
            <p>This is a notification of a new registration payment initiated for the International Conference on Sustainability, Innovation and Future Technologies (ICSIFT), December 27th-28th, 2025, Bangkok, Thailand.</p>
          </div>
          `
              : `
          <div class="card">
            <div class="section-title">Payment Status</div>
            <p>Your payment is currently being processed. You will receive a confirmation email once your payment is complete. If you do not receive a confirmation within 24 hours, please contact our support team.</p>
            
            <div class="section-title" style="margin-top: 20px;">About the Conference</div>
            <p>The <strong>International Conference on Sustainability, Innovation and Future Technologies (ICSIFT)</strong> brings together industry leaders, researchers, and professionals to explore cutting-edge developments in sustainable technology solutions.</p>
            
            <div class="highlight">
              <p>The conference will take place on <strong>December 27th-28th, 2025</strong> at  <strong>Bangkok, Thailand</strong>.</p>
            </div>
            
            <div class="section-title" style="margin-top: 20px;">What's Next?</div>
            <p>Once your payment is confirmed, you will receive:</p>
            <ul>
              <li>Official confirmation of your registration</li>
              <li>Access instructions for the conference venue</li>
              <li>Preliminary conference schedule and materials</li>
              <li>Information about keynote speakers and special events</li>
            </ul>
          </div>
          `
          }
          
          <div class="footer">
            <p>© ${new Date().getFullYear()} International Conference on Sustainability, Innovation and Future Technologies</p>
            <p>For any questions, please contact <a href="mailto:info@icsift.com">info@icsift.com</a></p>
          </div>
        </div>
      </body>
    </html>
  `
}

export default RegistrationEmailTemplate