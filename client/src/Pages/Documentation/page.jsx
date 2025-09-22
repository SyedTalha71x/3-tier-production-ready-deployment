/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unescaped-entities */
import React, { useState } from 'react';
import { Typography, Collapse } from 'antd';
import { DownOutlined, SearchOutlined } from '@ant-design/icons';

const { Title, Paragraph, Text } = Typography;

export default function Documentation() {
  const [searchText, setSearchText] = useState('');

  const faqItems = [
    {
      key: '1',
      label: "How do I start creating a career roadmap?",
      children: <p>To start creating a career roadmap, navigate to the main page of NextGen Career and enter a prompt describing your career goals or the field you're interested in. Our AI will then generate a customized roadmap based on your input.</p>
    },
    {
      key: '2',
      label: "Can I save or export my roadmap?",
      children: <p>Yes, once your roadmap is generated in NextGen Career, you'll see options to save it to your account or export it as a PDF file. This allows you to revisit or share your roadmap later.</p>
    },
    {
      key: '3',
      label: "How accurate are the AI-generated roadmaps?",
      children: <p>NextGen Career's AI uses up-to-date information from various industries to create roadmaps. However, these should be used as general guidance and may not account for all individual circumstances or rapid changes in specific fields.</p>
    },
    {
      key: '4',
      label: "Can I customize the generated roadmap?",
      children: <p>Yes, after the AI generates your initial roadmap in NextGen Career, you can edit and customize it. You can add, remove, or modify steps, adjust timelines, and add personal notes to make it more relevant to your specific situation.</p>
    },
    {
      key: '5',
      label: "How often should I update my career roadmap?",
      children: <p>It's a good practice to review and update your NextGen Career roadmap every 6-12 months, or whenever you experience significant changes in your career or industry. This ensures your roadmap remains relevant and aligned with your current goals and market trends.</p>
    }
  ];

  return (
    <div className="min-h-screen text-white bg-blue-950 rounded-xl">
      <main className="container mx-auto px-4 py-8">

        <section className="mb-12">
          <Title level={2} style={{color: 'white'}} className="text-white">Introducing to NextGen Career</Title>
          <Paragraph className="text-white text-md">
            Welcome to the NextGen Career documentation! This guide will help you understand how to use our AI-powered tool to create personalized career roadmaps. Whether you're just starting your career journey or looking to make a change, our platform is designed to provide valuable insights and guidance.
          </Paragraph>
          <Paragraph className="text-white text-md">
            NextGen Career uses advanced artificial intelligence to analyze your input and generate a customized career path. This document will walk you through the process of using the tool, interpreting the results, and making the most of your career roadmap.
          </Paragraph>
        </section>

        <section className="mb-12">
          <Title level={2} style={{color: 'white'}} className="text-white">Getting Started</Title>
          <Paragraph className="text-white text-md">
            To begin your NextGen Career journey, follow these simple steps:
          </Paragraph>
          <ol className="list-decimal list-inside ml-4 mb-4 text-white text-md">
            <li>Navigate to the main page of the NextGen Career tool.</li>
            <li>Locate the input field labeled "Enter your career goals or interests".</li>
            <li>Type in a prompt that describes your career aspirations or the field you're interested in exploring.</li>
            <li>Click the "Generate Roadmap" button to start the AI analysis.</li>
          </ol>
          <Paragraph className="text-white text-md">
            Example prompts you can use:
          </Paragraph>
          <ul className="list-disc list-inside ml-4 mb-4 text-white text-md">
            <li>"I want to become a data scientist in the healthcare industry"</li>
            <li>"Career path for a marketing professional specializing in digital marketing"</li>
            <li>"Steps to transition from teaching to a career in educational technology"</li>
            <li>"How to advance from a junior software developer to a senior architect"</li>
          </ul>
        </section>

        <section className="mb-12">
          <Title level={2} style={{color: 'white'}} className="text-white">Using the AI Effectively</Title>
          <Paragraph className="text-white text-md">
            NextGen Career's AI is designed to understand and process a wide range of career-related queries. To get the most accurate and helpful roadmap, consider the following tips:
          </Paragraph>
          <ul className="list-disc list-inside ml-4 mb-4 text-white text-md">
            <li>Be as specific as possible about your goals or interests</li>
            <li>Include your current experience level or job title if applicable</li>
            <li>Mention any specific skills, technologies, or industries you're interested in</li>
            <li>If you have a timeframe in mind for your career transition or advancement, include it in your prompt</li>
          </ul>
          <Paragraph className="text-white text-md">
            The more detailed your input, the more tailored and accurate your NextGen Career roadmap will be. Don't worry if you're unsure about some aspects – the AI can work with general ideas and help you explore options you might not have considered.
          </Paragraph>
        </section>

        <section className="mb-12">
          <Title level={2} style={{color: 'white'}} className="text-white">Interpreting Your Career Roadmap</Title>
          <Paragraph className="text-white text-md">
            Once the AI generates your NextGen Career roadmap, you'll see a comprehensive overview of your potential career path. Here's what you can expect to find in your roadmap:
          </Paragraph>
          <ul className="list-disc list-inside ml-4 mb-4 text-white text-md">
            <li>Key milestones: Important achievements or positions to aim for in your career journey</li>
            <li>Recommended skills: Specific abilities and knowledge areas to develop</li>
            <li>Potential job titles: Roles you might hold at different stages of your career</li>
            <li>Estimated timeframes: Approximate durations for each stage or transition</li>
            <li>Educational requirements: Degrees, certifications, or training programs that may be beneficial</li>
            <li>Industry insights: Relevant trends or changes in your chosen field</li>
          </ul>
          <Paragraph className="text-white text-md">
            Remember, your NextGen Career roadmap is a guide, not a fixed path. It's designed to give you a clear direction and help you make informed decisions about your career development. You should view it as a flexible framework that can be adjusted based on your personal circumstances, opportunities that arise, and changes in your industry.
          </Paragraph>
          <Paragraph className="text-white text-md">
            As you progress in your career, revisit your roadmap regularly and update it to reflect your current goals and circumstances. The AI can generate new roadmaps as your aspirations evolve, ensuring you always have relevant guidance.
          </Paragraph>
        </section>

        <section className="mb-12">
          <Title level={2} style={{color: 'white'}} className="text-white">Conclusion</Title>
          <Paragraph className="text-white text-md">
            NextGen Career is a powerful tool designed to help you navigate your professional journey with confidence. By leveraging AI technology, we provide you with personalized insights and guidance to support your career development.
          </Paragraph>
          <Paragraph className="text-white text-md">
            Remember that while the roadmap offers valuable direction, your career is ultimately shaped by your decisions, efforts, and the unique opportunities you encounter. Use NextGen Career as a starting point for your career planning, and don't hesitate to adjust your path as you grow and your goals evolve.
          </Paragraph>
          <Paragraph className="text-white text-md">
            We're excited to be part of your career journey and look forward to helping you achieve your professional aspirations. If you have any questions or need further assistance, please don't hesitate to reach out to our support team.
          </Paragraph>
        </section>
      </main>

      <footer className="text-center py-4 bg-blue-800">
        <Text className="text-white ">&copy; {new Date().getFullYear()} NextGen Career. All rights reserved.</Text>
      </footer>
    </div>
  );
}