import {
  Body,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Link,
  Preview,
  Section,
  Text,
  Img,
  Button,
} from "@react-email/components"
import { Tailwind } from "@react-email/tailwind"

const UserEmailTemplate = ({ name }) => {
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
            
            .green-button {
              background: linear-gradient(to right, #4d724d, #3c5c3c);
              color: white;
              font-weight: bold;
              padding: 12px 24px;
              border-radius: 30px;
              text-decoration: none;
              display: inline-block;
              text-align: center;
              box-shadow: 0 0 15px rgba(77, 114, 77, 0.7);
              transition: all 0.3s ease;
            }
            
            .green-button:hover {
              box-shadow: 0 0 20px rgba(77, 114, 77, 0.9);
            }
            
            .grid-pattern {
              background-image: radial-gradient(rgba(77, 114, 77, 0.15) 1px, transparent 1px);
              background-size: 20px 20px;
            }
          `}
        </style>
      </Head>
      <Preview>Thank you for contacting ICSIFT</Preview>
      <Tailwind>
        <Body className="bg-[#f8faf5] text-[#1a2e1a] font-sans grid-pattern">
          {/* Outer container */}
          <Container className="max-w-xl mx-auto my-10">
            {/* Header with logo */}
            <Section className="text-center mb-4">
              <Img
                src="https://icsift.com/singleLogo.svg"
                width="180"
                height="60"
                alt="ICSIFT Logo"
                className="mx-auto"
              />
            </Section>

            {/* Main content container */}
            <Container className="p-8 bg-white rounded-2xl shadow-lg border border-[#d3e4c5] green-border green-glow">
              {/* Header */}
              <Section className="text-center">
                <Heading className="text-2xl font-bold green-text">THANK YOU FOR CONTACTING US</Heading>
                <Hr className="border-t border-[#d3e4c5] my-6" />
              </Section>

              {/* Greeting */}
              <Section>
                <Text className="text-xl font-medium text-[#4d724d] text-center">Hello, {name}!</Text>
                <Text className="text-base text-[#1a2e1a] mt-4">
                  We've received your message and appreciate your interest in ICSIFT 2025: International Conference on
                  Sustainability, Innovation, and Future Technologies. Our team will review your inquiry and get back to
                  you as soon as possible.
                </Text>
                <Text className="text-base text-[#1a2e1a] mt-4">
                  In the meantime, you might find answers to common questions on our FAQ page.
                </Text>
              </Section>

              {/* Event details */}
              <Section className="mt-6">
                <div className="p-6 bg-[#f8faf5] rounded-xl border border-[#d3e4c5]">
                  <Text className="text-lg font-medium text-[#4d724d] mb-4">EVENT DETAILS:</Text>

                  <div className="mb-3 p-3 bg-white rounded-lg border-l-4 border-[#4d724d]">
                    <Text className="text-sm text-[#4d724d] uppercase tracking-wider mb-1">Date:</Text>
                    <Text className="text-[#1a2e1a]">December 26th - 27th, 2025</Text>
                  </div>

                  <div className="mb-3 p-3 bg-white rounded-lg border-l-4 border-[#b9d4a3]">
                    <Text className="text-sm text-[#4d724d] uppercase tracking-wider mb-1">Location:</Text>
                    <Text className="text-[#1a2e1a]">Bangkok, Thailand</Text>
                  </div>

                  <div className="p-3 bg-white rounded-lg border-l-4 border-[#d3e4c5]">
                    <Text className="text-sm text-[#4d724d] uppercase tracking-wider mb-1">Website:</Text>
                    <Link href="https://www.icsift.com" className="text-[#4d724d] underline">
                      www.icsift.com
                    </Link>
                  </div>
                </div>
              </Section>

              {/* CTA Button */}
              {/* <Section className="mt-8 text-center">
                <Button href="https://www.icsift.com" className="green-button">
                  EXPLORE OUR FAQ
                </Button>
              </Section> */}

              {/* Footer */}
              <Section className="mt-8 text-center">
                <Hr className="border-t border-[#d3e4c5] my-6" />
                <Text className="text-sm text-[#4d724d] text-center">
                  © 2025 ICSIFT: International Conference on Sustainability, Innovation, and Future Technologies
                </Text>
                <Text className="text-xs text-[#4d724d]/70 text-center mt-2">
                  This is an automated response. Please do not reply to this email.
                </Text>
              </Section>
            </Container>
          </Container>
        </Body>
      </Tailwind>
    </Html>
  )
}

export default UserEmailTemplate
