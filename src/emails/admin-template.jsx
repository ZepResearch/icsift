import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Preview,
  Section,
  Text,
  Row,
  Column,
  Img,
} from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

const AdminEmailTemplate = ({ name, email, subject, message, phoneNumber }) => {
  return (
    <Html>
      <Head>
        <style>
          {`
            @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
            
            body {
              font-family: 'Inter', sans-serif;
              background-color: #f8faf5;
              margin: 0;
              padding: 0;
            }
            
            .green-text {
              background: linear-gradient(to right, #4d724d, #b9d4a3);
              -webkit-background-clip: text;
              background-clip: text;
              -webkit-text-fill-color: transparent;
              text-fill-color: transparent;
            }
            
            .green-border {
              box-shadow: 0 0 15px rgba(77, 114, 77, 0.5), 0 0 30px rgba(185, 212, 163, 0.3);
            }
            
            .green-glow {
              position: relative;
            }
            
            .green-glow::before {
              content: "";
              position: absolute;
              top: -2px;
              left: -2px;
              right: -2px;
              bottom: -2px;
              background: linear-gradient(45deg, #4d724d, #b9d4a3, #d3e4c5);
              border-radius: 16px;
              z-index: -1;
              filter: blur(10px);
              opacity: 0.7;
            }
          `}
        </style>
      </Head>
      <Preview>New contact form submission from {name}</Preview>
      <Tailwind>
        <Body className="bg-[#f8faf5] text-[#1a2e1a] font-sans">
          {/* Outer container with background pattern */}
          <Container className="max-w-xl mx-auto my-10">
            {/* Header with logo */}
            {/* <Section className="text-center mb-4">
              <Img
                src="https://icsift.com/singleLogo.svg"
                width="180"
                height="60"
                alt="ICSIFT Logo"
                className="mx-auto"
              />
            </Section> */}

            {/* Main content container */}
            <Container className="p-8 bg-white rounded-2xl shadow-lg border border-[#d3e4c5] green-border green-glow">
              {/* Header */}
              <Section className="text-center">
                <Heading className="text-2xl font-bold green-text">NEW CONTACT FORM SUBMISSION</Heading>
                <Hr className="border-t border-[#d3e4c5] my-6" />
              </Section>

              {/* Intro text */}
              <Section>
                <Text className="text-lg font-medium text-[#4d724d]">
                  You have received a new contact form submission:
                </Text>
              </Section>

              {/* Submission details */}
              <Section className="mt-6 p-6 bg-[#f8faf5] rounded-xl border border-[#d3e4c5]">
                <Row>
                  <Column>
                    {/* Name */}
                    <div className="mb-5 p-4 bg-white rounded-lg border-l-4 border-[#4d724d]">
                      <Text className="text-sm text-[#4d724d] mb-1 uppercase tracking-wider">Name:</Text>
                      <Text className="text-base text-[#1a2e1a] font-medium">{name}</Text>
                    </div>

                    {/* Email */}
                    <div className="mb-5 p-4 bg-white rounded-lg border-l-4 border-[#b9d4a3]">
                      <Text className="text-sm text-[#4d724d] mb-1 uppercase tracking-wider">Email:</Text>
                      <Text className="text-base text-[#1a2e1a] font-medium">{email}</Text>
                    </div>

                    {/* Phone Number (if provided) */}
                    {phoneNumber && (
                      <div className="mb-5 p-4 bg-white rounded-lg border-l-4 border-[#d3e4c5]">
                        <Text className="text-sm text-[#4d724d] mb-1 uppercase tracking-wider">Phone Number:</Text>
                        <Text className="text-base text-[#1a2e1a] font-medium">{phoneNumber}</Text>
                      </div>
                    )}

                    {/* Subject */}
                    <div className="mb-5 p-4 bg-white rounded-lg border-l-4 border-[#4d724d]">
                      <Text className="text-sm text-[#4d724d] mb-1 uppercase tracking-wider">Subject:</Text>
                      <Text className="text-base text-[#1a2e1a] font-medium">{subject}</Text>
                    </div>

                    {/* Message */}
                    <div className="p-4 bg-white rounded-lg border-l-4 border-[#b9d4a3]">
                      <Text className="text-sm text-[#4d724d] mb-1 uppercase tracking-wider">Message:</Text>
                      <Text className="text-base text-[#1a2e1a] font-medium p-4 bg-[#f8faf5] rounded-lg border border-[#d3e4c5]">
                        {message}
                      </Text>
                    </div>
                  </Column>
                </Row>
              </Section>

              {/* Footer */}
              <Section className="mt-8 text-center">
                <div className="p-4 bg-[#f8faf5] rounded-lg border border-[#d3e4c5]">
                  <Text className="text-sm text-[#4d724d]">RESPOND PROMPTLY TO MAINTAIN ENGAGEMENT</Text>
                </div>
                <Hr className="border-t border-[#d3e4c5] my-6" />
                <Text className="text-sm text-[#4d724d] text-center">
                  © 2025 ICSIFT: International Conference on Sustainability, Innovation, and Future Technologies
                </Text>
              </Section>
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default AdminEmailTemplate
