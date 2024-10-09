export const roleBasedFormFields = [
  {
    name: "Backstory",
    type: "textarea",
    placeholder:
      "With a background in software architecture and system design, the tech design agent has extensive experience in designing systems that integrate multiple technologies. It draws upon a wealth of knowledge in cloud computing, data architecture, and API integration to create robust solutions.",
    rows: 3,
  },
  {
    name: "description",
    type: "textarea",
    placeholder:
      "A specialized AI agent focused on designing technical solutions and architectures for complex systems.",
    rows: 3,
  },
  {
    name: "Goal",
    type: "textarea",
    placeholder:
      "To design and propose technical solutions that align with the project requirements and constraints, ensuring scalability, security, and performance.",
    rows: 3,
  },
  {
    name: "Role",
    type: "input",
    placeholder: "Tech Design Agent",
  },
  {
    name: "id",
    type: "input",
    placeholder: "tech_design_agent",
  },
  {
    name: "Prompt_Template",
    type: "textarea",
    placeholder: "Any Key points you need agent to be aware of.",
    rows: 3,
  },
  {
    name: "Response_Template",
    type: "textarea",
    placeholder: "How should your response be...",
    rows: 3,
  },
  {
    name: "System_Template",
    type: "textarea",
    placeholder: "Generic rules that should be followed by agent...",
    rows: 3,
  },
];

export const llmOptions = [
  {
    url: "https://cdn.prod.website-files.com/630d4d1c4a462569dd189855/6584a9975ade35940f95e9ba_2.webp",
    text: "Gemini",
  },
  {
    url: "https://logodownload.org/wp-content/uploads/2023/04/openai-logo-0.png",
    text: "OpenAI",
  },
];

export const reactBasedFormFields = [
  {
    name: "id",
    type: "text",
    placeholder: "Enter your ID",
    required: true,
  },
  {
    name: "Role",
    type: "text",
    placeholder: "Tech Design Agent",
    required: true,
  },
  {
    name: "description",
    type: "textarea",
    placeholder: "Describe the role",
    rows: 3,
    required: true,
  },
];
