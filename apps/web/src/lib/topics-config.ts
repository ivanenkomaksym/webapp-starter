// Topics configuration for Generative Consultant
// Each topic has an id, label, and input parameters
// Each input parameter has an id, label, type, and optional/mandatory flag

export type InputParamType = 'string' | 'int' | 'bool';

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
    promptTemplate: 'Write an email about {topic}{industry}.'
  },
  {
    id: 'market-research',
    label: 'Market Research',
    description: 'Get insights and research for your market or audience.',
    inputParams: [
      { id: 'concept', label: 'Concept', type: 'string' },
      { id: 'audienceType', label: 'Audience Type', type: 'string', optional: true },
    ],
    promptTemplate: 'Conduct market research on {concept} for the {audienceType} audience.'
  },
  {
    id: 'content-creation',
    label: 'Content Creation',
    description: 'Create engaging content for blogs, social media, and more.',
    inputParams: [
      { id: 'topic', label: 'Topic', type: 'string' },
      { id: 'audienceType', label: 'Audience Type', type: 'string', optional: true },
    ],
    promptTemplate: 'Create content about {topic} for {audienceType}.'
  },
  {
    id: 'product-description',
    label: 'Product Description',
    description: 'Generate compelling product descriptions.',
    inputParams: [
      { id: 'productName', label: 'Product Name', type: 'string' },
      { id: 'features', label: 'Features', type: 'string', optional: true },
    ],
    promptTemplate: 'Write a product description for {productName} highlighting {features}.'
  },
  {
    id: 'idea-generation',
    label: 'Idea Generation',
    description: 'Brainstorm new ideas for products, services, or content.',
    inputParams: [
      { id: 'goal', label: 'Goal', type: 'string' },
      { id: 'constraints', label: 'Constraints', type: 'string', optional: true },
    ],
    promptTemplate: 'Generate ideas to achieve {goal} considering {constraints}.'
  },
  {
    id: 'education-learning',
    label: 'Education & Learning',
    description: 'Get educational content or learning plans.',
    inputParams: [
      { id: 'subject', label: 'Subject', type: 'string' },
      { id: 'level', label: 'Level', type: 'string', optional: true },
    ],
    promptTemplate: 'Create a learning plan for {subject} at {level} level.'
  },
];