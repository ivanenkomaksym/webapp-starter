// Topics configuration for Generative Consultant
// Each topic has an id, label, and input parameters
// Each input parameter has an id, label, type, and optional/mandatory flag

export type InputParamType = 'string' | 'int' | 'bool';

const FormatAsMarkdown = 'Format the output using Markdown for headings, lists, bold, italics, etc.';

export interface TopicInputParam {
  id: string;
  label: string;
  type: InputParamType;
  optional?: boolean; // false = mandatory, true = optional
}

export interface TopicConfig {
  id: string;
  label: string;
  description?: string;
  inputParams: TopicInputParam[];
  /**
   * Prompt template for this topic. Use {paramId} for input placeholders.
   * You can edit these templates later.
   */
  promptTemplate: string;
}

export const topicsConfig: TopicConfig[] = [
  {
    id: 'email-writing',
    label: 'Email Writing',
    description: 'Generate professional emails for any topic or industry.',
    inputParams: [
      { id: 'topic', label: 'Topic', type: 'string' },
      { id: 'industry', label: 'Industry', type: 'string', optional: true },
    ],
    promptTemplate: `Create engaging, non-generic content on {topic}. Avoid robotic or formulaic responses; use a conventional,
                     human-like tone, incorporate storytelling, examples, and unique insights. Make it feel fresh, original,
                     and compelling for the target audience of {industry}.` + FormatAsMarkdown
  },
  {
    id: 'market-research',
    label: 'Market Research',
    description: 'Get insights and research for your market or audience.',
    inputParams: [
      { id: 'product', label: 'Industry/Product', type: 'string' },
    ],
    promptTemplate: `Conduct market research on {product}. Identify trends, competitors,
                     consumer behavior, and growth opportunities. Provide insights backed by data, key statistics, and
                     strategic recommendations to leverage market gaps effectively.` + FormatAsMarkdown
  },
  {
    id: 'content-creation',
    label: 'Content Creation',
    description: 'Create engaging content for blogs, social media, and more.',
    inputParams: [
      { id: 'topic', label: 'Topic', type: 'string' },
      { id: 'industry', label: 'Industry', type: 'string' },
    ],
    promptTemplate: `Create engaging, non-generic content on {topic}. Avoid robotic or formulaic responses; use a conventional,
                     human-like tone, incorporate storytelling, examples, and unique insights. Make it feel fresh, original,
                     and compelling for the target audience of {industry}.` + FormatAsMarkdown
  },
  {
    id: 'product-description',
    label: 'Product Description',
    description: 'Generate compelling product descriptions.',
    inputParams: [
      { id: 'product', label: 'Product', type: 'string' },
      { id: 'brandLeader', label: 'Brand Leader', type: 'string' },
    ],
    promptTemplate: `Write a compelling product description for {product} in the style of {brandLeader}.
                     Capture the essense, value, and emotional appeal while highlighting key features and benefits.
                     Make it engaging, consise and aligned with the brand's unique voice.` + FormatAsMarkdown
  },
  {
    id: 'idea-generation',
    label: 'Idea Generation',
    description: 'Brainstorm new ideas for products, services, or content.',
    inputParams: [
      { id: 'topic', label: 'Goal', type: 'string' },
    ],
    promptTemplate: `Generate creative, out-of-the-box ideas for {topic}. Provide unique, practical, and innovative
                     solutions that haven't been overused. Use diverse brainstorming techniques like SCAMPER, mind mapping,
                     and lateral thinking to enhance creativity.` + FormatAsMarkdown
  },
  {
    id: 'education-learning',
    label: 'Education & Learning',
    description: 'Get educational content or learning plans.',
    inputParams: [
      { id: 'concept', label: 'Concept', type: 'string' },
      { id: 'audience', label: 'Audience', type: 'string' },
    ],
    promptTemplate: `Explain {concept} in simple terms for a {audience}. Use analogies, step-by-step explanations,
                     and interactive questioning to reinforce learning. Break complex ideas into digestible parts,
                     and include practical examples, and clear language to make it easy to understand.` + FormatAsMarkdown
  },
];