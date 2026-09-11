import type {
  LessonGenerationParams,
  QuizGenerationParams,
  VideoGenerationParams,
  AIContext,
} from './ai-service';
import type {
  Lesson,
  LessonSection,
  QuizQuestion,
  Flashcard,
  WeakTopic,
} from './types';

function delay(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function generateLessonDemo(
  params: LessonGenerationParams
): Promise<Lesson> {
  await delay(1500);

  const sections: LessonSection[] = [
    {
      id: 's1',
      title: 'What you will learn',
      content: `In this lesson on ${params.topic}, you will understand the core concepts, see real-world examples, and practice with hands-on exercises tailored to your ${params.level} level.`,
      order: 1,
    },
    {
      id: 's2',
      title: 'Prerequisites',
      content: params.level === 'beginner'
        ? 'No prior knowledge required. We will start from the very basics.'
        : 'Basic understanding of programming concepts and familiarity with the topic area.',
      order: 2,
    },
    {
      id: 's3',
      title: 'Simple explanation',
      content: `${params.topic} is a fundamental concept that forms the building block for more advanced topics. Think of it as a set of rules and patterns that help us solve specific problems efficiently. At its core, it involves understanding how different components interact with each other and how to structure them for optimal results.`,
      order: 3,
    },
    {
      id: 's4',
      title: 'Real-world analogy',
      content: `Imagine ${params.topic} like a well-organized kitchen. Each ingredient (data/component) has its place, recipes (procedures) tell you how to combine them, and the chef (you) follows the recipe to create a dish. If you change the recipe or ingredients, you get different results — but the structure of the kitchen stays the same.`,
      order: 4,
    },
    {
      id: 's5',
      title: 'Visual explanation',
      content: 'A visual diagram would show the relationship between components: inputs flow through a processing pipeline, with each stage transforming the data until the final output is produced.',
      order: 5,
    },
    {
      id: 's6',
      title: 'Example',
      content: `Let's look at a practical example of ${params.topic}:\n\nConsider a scenario where you need to apply this concept to solve a real problem. The key is to break down the problem into smaller, manageable parts and apply the concept to each part individually before combining the results.`,
      order: 6,
    },
    {
      id: 's7',
      title: 'Code example',
      content: `// Example code demonstrating ${params.topic}\nfunction demonstrate() {\n  // Step 1: Setup\n  const data = initialize();\n  \n  // Step 2: Apply the concept\n  const result = process(data);\n  \n  // Step 3: Output\n  console.log(result);\n}`,
      order: 7,
    },
    {
      id: 's8',
      title: 'Common mistakes',
      content: '1. Not understanding the fundamentals before jumping to advanced usage.\n2. Overcomplicating solutions when a simple approach works.\n3. Ignoring edge cases and error handling.\n4. Not testing with different inputs.',
      order: 8,
    },
    {
      id: 's9',
      title: 'Key takeaways',
      content: `• ${params.topic} is essential for building robust applications\n• Start simple, then add complexity gradually\n• Practice with real examples to solidify understanding\n• Always consider edge cases and error scenarios`,
      order: 9,
    },
    {
      id: 's10',
      title: 'Quick test',
      content: `Test your understanding:\n1. What is the primary purpose of ${params.topic}?\n2. Can you give a real-world example?\n3. What are two common mistakes to avoid?`,
      order: 10,
    },
  ];

  return {
    id: `lesson-${Date.now()}`,
    topic: params.topic,
    title: `${params.topic} — ${params.level === 'beginner' ? 'A Beginner\'s Guide' : params.level === 'advanced' ? 'Deep Dive' : 'Complete Guide'}`,
    level: params.level,
    language: params.language,
    sections,
    estimatedTime: params.duration === 'Deep dive' ? 45 : parseInt(params.duration) || 20,
    createdAt: new Date().toISOString(),
    progress: 0,
  };
}

export async function generateQuizDemo(
  params: QuizGenerationParams
): Promise<QuizQuestion[]> {
  await delay(1000);

  return [
    {
      id: `q-${Date.now()}-1`,
      question: `Which best describes the core concept of ${params.topic}?`,
      type: 'mcq',
      options: [
        'A design pattern for efficient problem solving',
        'A programming language feature',
        'A type of data structure',
        'A network protocol',
      ],
      correctAnswer: 'A design pattern for efficient problem solving',
      explanation: `${params.topic} is fundamentally about structured approaches to solving problems.`,
      topic: params.topic,
      difficulty: params.difficulty,
    },
    {
      id: `q-${Date.now()}-2`,
      question: `True or False: ${params.topic} requires understanding of basic programming concepts.`,
      type: 'true_false',
      options: ['True', 'False'],
      correctAnswer: 'True',
      explanation: 'Most topics build on fundamental programming knowledge.',
      topic: params.topic,
      difficulty: params.difficulty,
    },
    {
      id: `q-${Date.now()}-3`,
      question: `The process of _____ is central to ${params.topic}.`,
      type: 'fill_blank',
      correctAnswer: 'abstraction',
      explanation: 'Abstraction is key to understanding most CS concepts.',
      topic: params.topic,
      difficulty: params.difficulty,
    },
  ];
}

export async function generateFlashcardsDemo(
  topic: string
): Promise<Flashcard[]> {
  await delay(800);

  return [
    {
      id: `fc-${Date.now()}-1`,
      topic,
      front: `What is ${topic}?`,
      back: `${topic} is a core concept that provides structured approaches to problem-solving.`,
      difficulty: 'easy',
      status: 'new',
    },
    {
      id: `fc-${Date.now()}-2`,
      topic,
      front: `Name one key principle of ${topic}.`,
      back: 'Abstraction — hiding complexity behind simple interfaces.',
      difficulty: 'medium',
      status: 'new',
    },
    {
      id: `fc-${Date.now()}-3`,
      topic,
      front: `Give a real-world example of ${topic}.`,
      back: 'A TV remote: you press buttons (interface) without knowing the internal circuitry (implementation).',
      difficulty: 'medium',
      status: 'new',
    },
  ];
}

export async function analyzeWeakTopicsDemo(
  results: { topic: string; score: number }[]
): Promise<WeakTopic[]> {
  await delay(500);

  return results
    .filter((r) => r.score < 60)
    .map((r) => ({
      id: `wt-${Date.now()}-${r.topic}`,
      topic: r.topic,
      score: r.score,
      attempts: 1,
      recommendedAction:
        r.score < 40
          ? 'Start with the basics and build up gradually'
          : 'Review the explanation and practice with examples',
      lastTested: new Date().toISOString(),
    }));
}

export async function answerQuestionDemo(
  question: string,
  context: AIContext
): Promise<string> {
  await delay(1200);

  const levelPrefix = context.knowledgeLevel === 'beginner'
    ? "Let me explain this simply. "
    : context.knowledgeLevel === 'advanced'
    ? "Here's the technical explanation. "
    : '';

  const topicContext = context.topic ? `In the context of ${context.topic}, ` : '';

  return `${levelPrefix}${topicContext}that's a great question. Based on what we're learning, the answer involves understanding the relationship between the key components and how they interact.\n\nThe key thing to remember is that these concepts build on each other. Once you grasp the foundation, the more complex aspects become much clearer.\n\nWould you like me to show you an example or a diagram to make this clearer?`;
}

export async function generateVideoScriptDemo(
  params: VideoGenerationParams
): Promise<string> {
  await delay(600);

  return `[SCENE 1 - Introduction]\nNarrator: Welcome to this lesson on ${params.topic}. Today, we'll explore this concept step by step.\n\n[SCENE 2 - Core Concept]\nNarrator: At its heart, ${params.topic} is about...\n\n[SCENE 3 - Visual Example]\nNarrator: Let's look at a visual representation...\n\n[SCENE 4 - Code Example]\nNarrator: Here's how this works in practice...\n\n[SCENE 5 - Summary]\nNarrator: To recap, we've covered the essentials of ${params.topic}.`;
}
