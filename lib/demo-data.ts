import {
  UserProfile,
  Lesson,
  Conversation,
  Flashcard,
  QuizQuestion,
  WeakTopic,
  RevisionItem,
  UploadedDocument,
  VideoGenerationJob,
  CareerPath,
  DashboardStats,
  WeeklyActivity,
  ProgressData,
  Notification,
  TopicScore,
  CommunityPost,
} from './types';

export const demoUser: UserProfile = {
  id: 'demo-user',
  name: 'Alex',
  email: 'alex@studygen.ai',
  knowledgeLevel: 'intermediate',
  preferredLanguage: 'english',
  learningStyle: 'mixed',
  learningGoal: 'placement',
  studyTime: '1hour',
  topic: 'Java OOP',
  careerGoal: 'Full Stack Developer',
  createdAt: '2025-08-15T10:00:00Z',
  onboardingCompleted: true,
};

export const demoStats: DashboardStats = {
  topicsLearned: 12,
  testsCompleted: 8,
  averageScore: 74,
  learningStreak: 7,
  masteryPercentage: 68,
  timeSpent: 1840,
  flashcardsReviewed: 45,
  revisionCompleted: 3,
};

export const demoWeeklyActivity: WeeklyActivity[] = [
  { day: 'Mon', minutes: 45, topics: 2 },
  { day: 'Tue', minutes: 30, topics: 1 },
  { day: 'Wed', minutes: 60, topics: 3 },
  { day: 'Thu', minutes: 25, topics: 1 },
  { day: 'Fri', minutes: 50, topics: 2 },
  { day: 'Sat', minutes: 75, topics: 3 },
  { day: 'Sun', minutes: 40, topics: 2 },
];

export const demoProgressData: ProgressData[] = [
  { topic: 'Java OOP', mastery: 82, lessonsCompleted: 5, testsTaken: 3 },
  { topic: 'Computer Networks', mastery: 61, lessonsCompleted: 4, testsTaken: 2 },
  { topic: 'Cloud Computing', mastery: 45, lessonsCompleted: 2, testsTaken: 1 },
  { topic: 'SQL', mastery: 73, lessonsCompleted: 3, testsTaken: 2 },
  { topic: 'Data Structures', mastery: 55, lessonsCompleted: 3, testsTaken: 2 },
];

export const demoRecentLessons: Lesson[] = [
  {
    id: 'lesson-1',
    topic: 'Java OOP',
    title: 'Understanding Polymorphism in Java',
    level: 'intermediate',
    language: 'english',
    sections: [],
    estimatedTime: 20,
    createdAt: '2025-09-09T14:30:00Z',
    progress: 65,
  },
  {
    id: 'lesson-2',
    topic: 'Computer Networks',
    title: 'TCP/IP Protocol Suite Explained',
    level: 'intermediate',
    language: 'english',
    sections: [],
    estimatedTime: 25,
    createdAt: '2025-09-08T10:15:00Z',
    progress: 100,
  },
  {
    id: 'lesson-3',
    topic: 'SQL',
    title: 'Mastering SQL Joins',
    level: 'intermediate',
    language: 'english',
    sections: [],
    estimatedTime: 15,
    createdAt: '2025-09-07T16:45:00Z',
    progress: 40,
  },
  {
    id: 'lesson-4',
    topic: 'Cloud Computing',
    title: 'Introduction to AWS EC2',
    level: 'beginner',
    language: 'english',
    sections: [],
    estimatedTime: 30,
    createdAt: '2025-09-06T09:00:00Z',
    progress: 20,
  },
];

export const demoConversation: Conversation = {
  id: 'conv-1',
  title: 'Understanding Polymorphism',
  topic: 'Java OOP',
  createdAt: '2025-09-09T14:35:00Z',
  messages: [
    {
      id: 'msg-1',
      role: 'user',
      content: "What is polymorphism?",
      timestamp: '2025-09-09T14:35:00Z',
    },
    {
      id: 'msg-2',
      role: 'assistant',
      content:
        'Polymorphism means "many forms." In Java, it allows a single action to behave differently depending on the context.\n\nThe most common example is method overloading — where you can have multiple methods with the same name but different parameters. For instance, `print(int x)` and `print(String s)` are both called `print`, but Java knows which one to use based on what you pass.\n\nAnother form is method overriding — where a subclass provides its own implementation of a method defined in its parent class. This is what enables runtime polymorphism.\n\nWant me to show you a code example?',
      timestamp: '2025-09-09T14:35:15Z',
    },
  ],
};

export const demoFlashcards: Flashcard[] = [
  {
    id: 'fc-1',
    topic: 'Java OOP',
    front: 'What is polymorphism?',
    back: 'The ability of a single entity to take many forms — e.g., method overloading (compile-time) and method overriding (runtime).',
    difficulty: 'medium',
    status: 'learning',
  },
  {
    id: 'fc-2',
    topic: 'Java OOP',
    front: 'What is encapsulation?',
    back: 'Bundling data and methods that operate on that data within a single unit (class), and restricting direct access to some components.',
    difficulty: 'easy',
    status: 'known',
  },
  {
    id: 'fc-3',
    topic: 'Java OOP',
    front: 'What is inheritance in Java?',
    back: 'A mechanism where a subclass acquires properties and behaviors of a parent class using the `extends` keyword.',
    difficulty: 'easy',
    status: 'known',
  },
  {
    id: 'fc-4',
    topic: 'Java OOP',
    front: 'What is abstraction?',
    back: 'Hiding implementation details and showing only essential features. Achieved via abstract classes and interfaces.',
    difficulty: 'medium',
    status: 'learning',
  },
  {
    id: 'fc-5',
    topic: 'Java OOP',
    front: 'Difference between overloading and overriding?',
    back: 'Overloading: same method name, different parameters, same class (compile-time). Overriding: same signature, subclass redefines parent method (runtime).',
    difficulty: 'hard',
    status: 'difficult',
  },
  {
    id: 'fc-6',
    topic: 'Computer Networks',
    front: 'What is CIDR notation?',
    back: 'Classless Inter-Domain Routing — a compact way to represent IP addresses and their routing prefixes, e.g., 192.168.1.0/24 where /24 is the prefix length.',
    difficulty: 'hard',
    status: 'difficult',
  },
];

export const demoQuizQuestions: QuizQuestion[] = [
  {
    id: 'q-1',
    question: 'Which of the following is an example of runtime polymorphism in Java?',
    type: 'mcq',
    options: [
      'Method overloading',
      'Method overriding',
      'Constructor chaining',
      'Variable shadowing',
    ],
    correctAnswer: 'Method overriding',
    explanation:
      'Method overriding is resolved at runtime based on the actual object type, making it runtime polymorphism. Method overloading is resolved at compile time.',
    topic: 'Polymorphism',
    difficulty: 'intermediate',
  },
  {
    id: 'q-2',
    question: 'True or False: Java supports multiple inheritance through classes.',
    type: 'true_false',
    options: ['True', 'False'],
    correctAnswer: 'False',
    explanation:
      'Java does not support multiple inheritance through classes to avoid the diamond problem. It does support multiple inheritance through interfaces.',
    topic: 'Inheritance',
    difficulty: 'intermediate',
  },
  {
    id: 'q-3',
    question: 'The process of hiding implementation details and showing only essential features is called _____.',
    type: 'fill_blank',
    correctAnswer: 'Abstraction',
    explanation:
      'Abstraction is the OOP principle of hiding implementation details while exposing only the necessary functionality.',
    topic: 'Abstraction',
    difficulty: 'beginner',
  },
  {
    id: 'q-4',
    question: 'Write a Java method that demonstrates method overloading for adding two integers and two doubles.',
    type: 'coding',
    correctAnswer:
      'int add(int a, int b) { return a + b; }\ndouble add(double a, double b) { return a + b; }',
    explanation:
      'Method overloading allows multiple methods with the same name but different parameter types. The compiler resolves which method to call.',
    topic: 'Polymorphism',
    difficulty: 'intermediate',
  },
  {
    id: 'q-5',
    question: 'Explain the difference between an abstract class and an interface in Java (2-3 sentences).',
    type: 'short_answer',
    correctAnswer:
      'Abstract classes can have both implemented and abstract methods, and can contain instance variables. Interfaces (pre-Java 8) could only have abstract methods and constants. Since Java 8, interfaces can have default and static methods, but still cannot have instance variables.',
    explanation:
      'Key differences: abstract classes use "extends" (single inheritance), interfaces use "implements" (multiple). Abstract classes can have state, interfaces cannot.',
    topic: 'Abstraction',
    difficulty: 'advanced',
  },
];

export const demoQuizResults: TopicScore[] = [
  { topic: 'Java OOP', score: 82 },
  { topic: 'Inheritance', score: 90 },
  { topic: 'Polymorphism', score: 48 },
  { topic: 'Abstraction', score: 76 },
];

export const demoWeakTopics: WeakTopic[] = [
  {
    id: 'wt-1',
    topic: 'Polymorphism',
    score: 48,
    attempts: 2,
    recommendedAction: 'Review explanation and practice with examples',
    lastTested: '2025-09-09T15:00:00Z',
  },
  {
    id: 'wt-2',
    topic: 'CIDR Notation',
    score: 55,
    attempts: 1,
    recommendedAction: 'Watch visual explanation on subnetting',
    lastTested: '2025-09-08T11:00:00Z',
  },
  {
    id: 'wt-3',
    topic: 'Tree Traversals',
    score: 60,
    attempts: 1,
    recommendedAction: 'Practice with flashcards and coding exercises',
    lastTested: '2025-09-07T17:00:00Z',
  },
];

export const demoRevisionItems: RevisionItem[] = [
  {
    id: 'rev-1',
    topic: 'Encapsulation',
    summary:
      'Encapsulation bundles data and methods into a class, controlling access through access modifiers (public, private, protected).',
    keyPoints: [
      'Protects internal state from unauthorized modification',
      'Achieved through access modifiers',
      'Enables data hiding and controlled access',
      'Foundation for maintaining invariants',
    ],
    commonMistakes: [
      'Making fields public instead of using getters/setters',
      'Not validating inputs in setters',
    ],
    nextReview: '2025-09-11T09:00:00Z',
    status: 'due',
  },
  {
    id: 'rev-2',
    topic: 'TCP/IP Protocol Suite',
    summary:
      'TCP/IP is a four-layer model (Application, Transport, Internet, Network Access) that standardizes communication across networks.',
    keyPoints: [
      'Application layer: HTTP, FTP, DNS, SMTP',
      'Transport layer: TCP (reliable) and UDP (fast)',
      'Internet layer: IP addressing and routing',
      'Network Access layer: physical transmission',
    ],
    commonMistakes: [
      'Confusing TCP (reliable) with UDP (fast but unreliable)',
      'Mixing up OSI 7-layer model with TCP/IP 4-layer model',
    ],
    nextReview: '2025-09-12T09:00:00Z',
    status: 'due',
  },
  {
    id: 'rev-3',
    topic: 'SQL Joins',
    summary:
      'SQL joins combine rows from multiple tables based on related columns. Types: INNER, LEFT, RIGHT, FULL OUTER, CROSS.',
    keyPoints: [
      'INNER JOIN: matching rows only',
      'LEFT JOIN: all left rows, matched right rows',
      'RIGHT JOIN: all right rows, matched left rows',
      'FULL OUTER: all rows from both tables',
    ],
    commonMistakes: [
      'Forgetting that LEFT JOIN includes unmatched left rows with NULLs',
      'Using WHERE instead of ON for join conditions',
    ],
    nextReview: '2025-09-13T09:00:00Z',
    status: 'reviewed',
  },
];

export const demoUploadedDocument: UploadedDocument = {
  id: 'doc-1',
  name: 'Computer Networks Unit 3.pdf',
  size: 2456789,
  pages: 42,
  uploadedAt: '2025-09-08T10:00:00Z',
  status: 'completed',
  summary:
    'This document covers Network Layer protocols, focusing on IP addressing, subnetting, CIDR notation, and routing algorithms. It explains the difference between IPv4 and IPv6, and provides detailed examples of subnet mask calculations.',
  keyConcepts: [
    'IP Addressing and Classes',
    'Subnetting and Subnet Masks',
    'CIDR Notation',
    'Routing Algorithms (Distance Vector, Link State)',
    'IPv4 vs IPv6',
    'NAT (Network Address Translation)',
  ],
  definitions: [
    {
      term: 'Subnet Mask',
      definition:
        'A 32-bit number that divides an IP address into network and host portions.',
    },
    {
      term: 'CIDR',
      definition:
        'Classless Inter-Domain Routing — a flexible way to allocate IP addresses without class restrictions.',
    },
    {
      term: 'NAT',
      definition:
        'Network Address Translation — maps private IP addresses to a public IP for external communication.',
    },
  ],
  formulas: [
    'Number of subnets = 2^n (n = borrowed bits)',
    'Hosts per subnet = 2^h - 2 (h = host bits)',
    'CIDR: /prefix determines network bits (e.g., /24 = 256 addresses)',
  ],
  sections: [
    {
      title: 'IP Addressing',
      summary: 'Covers IPv4 structure (32-bit, dotted decimal), address classes A-E, and special addresses.',
    },
    {
      title: 'Subnetting',
      summary: 'Explains how to divide networks into sub-networks, calculate subnet masks, and determine host ranges.',
    },
    {
      title: 'CIDR and Routing',
      summary: 'Introduces CIDR notation for efficient address allocation and compares distance vector vs link state routing.',
    },
  ],
  importantQuestions: [
    'What is the difference between classful and classless addressing?',
    'How do you calculate the number of subnets and hosts from a given CIDR notation?',
    'Compare Distance Vector and Link State routing protocols.',
    'Why was NAT introduced and how does it work?',
  ],
};

export const demoVideoJob: VideoGenerationJob = {
  id: 'vid-1',
  topic: 'Polymorphism in Java',
  level: 'intermediate',
  language: 'english',
  duration: '5 min',
  style: 'diagram_based',
  voiceLanguage: 'english',
  subtitles: 'both',
  status: 'completed',
  progress: 100,
  steps: [
    { name: 'Understanding topic', status: 'completed' },
    { name: 'Creating lesson script', status: 'completed' },
    { name: 'Planning scenes', status: 'completed' },
    { name: 'Creating visuals', status: 'completed' },
    { name: 'Generating narration', status: 'completed' },
    { name: 'Creating subtitles', status: 'completed' },
    { name: 'Rendering video', status: 'completed' },
    { name: 'Finalizing', status: 'completed' },
  ],
  createdAt: '2025-09-09T16:00:00Z',
  completedAt: '2025-09-09T16:05:30Z',
};

export const demoVideoLibrary: VideoGenerationJob[] = [
  demoVideoJob,
  {
    id: 'vid-2',
    topic: 'TCP/IP Protocol Suite',
    level: 'intermediate',
    language: 'english',
    duration: '8 min',
    style: 'clean_educational',
    voiceLanguage: 'english',
    subtitles: 'english',
    status: 'completed',
    progress: 100,
    steps: [],
    createdAt: '2025-09-07T10:00:00Z',
    completedAt: '2025-09-07T10:08:15Z',
  },
  {
    id: 'vid-3',
    topic: 'SQL Joins Explained',
    level: 'beginner',
    language: 'tamil',
    duration: '6 min',
    style: 'diagram_based',
    voiceLanguage: 'tamil',
    subtitles: 'both',
    status: 'completed',
    progress: 100,
    steps: [],
    createdAt: '2025-09-05T14:00:00Z',
    completedAt: '2025-09-05T14:06:20Z',
  },
  {
    id: 'vid-4',
    topic: 'Introduction to AWS EC2',
    level: 'beginner',
    language: 'english',
    duration: '10 min',
    style: 'presentation',
    voiceLanguage: 'english',
    subtitles: 'english',
    status: 'completed',
    progress: 100,
    steps: [],
    createdAt: '2025-09-03T09:00:00Z',
    completedAt: '2025-09-03T09:10:45Z',
  },
];

export const demoCareerPaths: CareerPath[] = [
  {
    id: 'career-1',
    title: 'Full Stack Developer',
    description: 'Master both frontend and backend development',
    icon: 'Code2',
    stages: [
      {
        id: 'stage-1',
        name: 'Fundamentals',
        level: 'beginner',
        skills: [
          { id: 's1', name: 'HTML & CSS', level: 'beginner', progress: 100, resources: ['Lesson: HTML Basics', 'Lesson: CSS Layouts'] },
          { id: 's2', name: 'JavaScript Basics', level: 'beginner', progress: 85, resources: ['Lesson: JS Fundamentals', 'Quiz: JS Basics'] },
          { id: 's3', name: 'Git & Version Control', level: 'beginner', progress: 60, resources: ['Lesson: Git Essentials'] },
        ],
      },
      {
        id: 'stage-2',
        name: 'Frontend Development',
        level: 'intermediate',
        skills: [
          { id: 's4', name: 'React', level: 'intermediate', progress: 45, resources: ['Lesson: React Components', 'Lesson: React Hooks'] },
          { id: 's5', name: 'TypeScript', level: 'intermediate', progress: 30, resources: ['Lesson: TS Types', 'Lesson: TS Interfaces'] },
          { id: 's6', name: 'CSS Frameworks', level: 'intermediate', progress: 70, resources: ['Lesson: Tailwind CSS'] },
        ],
      },
      {
        id: 'stage-3',
        name: 'Backend Development',
        level: 'intermediate',
        skills: [
          { id: 's7', name: 'Node.js & Express', level: 'intermediate', progress: 20, resources: ['Lesson: Node Basics', 'Lesson: REST APIs'] },
          { id: 's8', name: 'Databases (SQL)', level: 'intermediate', progress: 50, resources: ['Lesson: SQL Joins', 'Lesson: Database Design'] },
          { id: 's9', name: 'Authentication', level: 'intermediate', progress: 10, resources: ['Lesson: Auth Patterns'] },
        ],
      },
      {
        id: 'stage-4',
        name: 'Projects & Advanced',
        level: 'advanced',
        skills: [
          { id: 's10', name: 'System Design', level: 'advanced', progress: 0, resources: ['Lesson: Scalability', 'Lesson: Load Balancing'] },
          { id: 's11', name: 'Docker & Deployment', level: 'advanced', progress: 0, resources: ['Lesson: Docker Basics', 'Lesson: CI/CD'] },
        ],
      },
      {
        id: 'stage-5',
        name: 'Interview Preparation',
        level: 'advanced',
        skills: [
          { id: 's12', name: 'DSA', level: 'advanced', progress: 35, resources: ['Lesson: Arrays & Strings', 'Lesson: Trees & Graphs'] },
          { id: 's13', name: 'System Design Interviews', level: 'advanced', progress: 0, resources: ['Mock Test: System Design'] },
        ],
      },
    ],
  },
  {
    id: 'career-2',
    title: 'Java Developer',
    description: 'Become a proficient Java backend developer',
    icon: 'Coffee',
    stages: [
      {
        id: 'stage-1',
        name: 'Java Fundamentals',
        level: 'beginner',
        skills: [
          { id: 's1', name: 'Java Syntax & Basics', level: 'beginner', progress: 100, resources: ['Lesson: Java Variables', 'Lesson: Control Flow'] },
          { id: 's2', name: 'OOP Concepts', level: 'intermediate', progress: 70, resources: ['Lesson: Polymorphism', 'Lesson: Inheritance'] },
        ],
      },
      {
        id: 'stage-2',
        name: 'Advanced Java',
        level: 'intermediate',
        skills: [
          { id: 's3', name: 'Collections Framework', level: 'intermediate', progress: 55, resources: ['Lesson: ArrayList', 'Lesson: HashMap'] },
          { id: 's4', name: 'Multithreading', level: 'advanced', progress: 20, resources: ['Lesson: Threads', 'Lesson: Concurrency'] },
        ],
      },
      {
        id: 'stage-3',
        name: 'Frameworks',
        level: 'advanced',
        skills: [
          { id: 's5', name: 'Spring Boot', level: 'advanced', progress: 10, resources: ['Lesson: Spring Basics', 'Lesson: REST with Spring'] },
          { id: 's6', name: 'Hibernate/JPA', level: 'advanced', progress: 0, resources: ['Lesson: ORM Basics'] },
        ],
      },
    ],
  },
  {
    id: 'career-3',
    title: 'Data Analyst',
    description: 'Master data analysis and visualization',
    icon: 'BarChart3',
    stages: [
      {
        id: 'stage-1',
        name: 'Foundations',
        level: 'beginner',
        skills: [
          { id: 's1', name: 'Statistics Basics', level: 'beginner', progress: 80, resources: ['Lesson: Descriptive Stats', 'Lesson: Probability'] },
          { id: 's2', name: 'Excel', level: 'beginner', progress: 90, resources: ['Lesson: Excel Functions'] },
        ],
      },
      {
        id: 'stage-2',
        name: 'Data Tools',
        level: 'intermediate',
        skills: [
          { id: 's3', name: 'SQL', level: 'intermediate', progress: 73, resources: ['Lesson: SQL Joins', 'Lesson: Aggregations'] },
          { id: 's4', name: 'Python (Pandas)', level: 'intermediate', progress: 40, resources: ['Lesson: Pandas Basics', 'Lesson: Data Cleaning'] },
        ],
      },
      {
        id: 'stage-3',
        name: 'Visualization & Advanced',
        level: 'advanced',
        skills: [
          { id: 's5', name: 'Tableau/PowerBI', level: 'intermediate', progress: 15, resources: ['Lesson: Dashboards'] },
          { id: 's6', name: 'Statistical Analysis', level: 'advanced', progress: 5, resources: ['Lesson: Hypothesis Testing'] },
        ],
      },
    ],
  },
  {
    id: 'career-4',
    title: 'AI/ML Engineer',
    description: 'Build intelligent systems with machine learning',
    icon: 'BrainCircuit',
    stages: [
      {
        id: 'stage-1',
        name: 'Math & Python',
        level: 'beginner',
        skills: [
          { id: 's1', name: 'Linear Algebra', level: 'intermediate', progress: 50, resources: ['Lesson: Vectors & Matrices'] },
          { id: 's2', name: 'Python Programming', level: 'intermediate', progress: 75, resources: ['Lesson: Python Basics', 'Lesson: NumPy'] },
        ],
      },
      {
        id: 'stage-2',
        name: 'ML Fundamentals',
        level: 'intermediate',
        skills: [
          { id: 's3', name: 'Supervised Learning', level: 'intermediate', progress: 30, resources: ['Lesson: Linear Regression', 'Lesson: Classification'] },
          { id: 's4', name: 'Unsupervised Learning', level: 'advanced', progress: 10, resources: ['Lesson: Clustering', 'Lesson: Dimensionality Reduction'] },
        ],
      },
      {
        id: 'stage-3',
        name: 'Deep Learning',
        level: 'advanced',
        skills: [
          { id: 's5', name: 'Neural Networks', level: 'advanced', progress: 0, resources: ['Lesson: NN Basics', 'Lesson: Backpropagation'] },
          { id: 's6', name: 'Transformers & LLMs', level: 'advanced', progress: 0, resources: ['Lesson: Attention Mechanism'] },
        ],
      },
    ],
  },
  {
    id: 'career-5',
    title: 'Cloud Engineer',
    description: 'Design and manage cloud infrastructure',
    icon: 'Cloud',
    stages: [
      {
        id: 'stage-1',
        name: 'Cloud Basics',
        level: 'beginner',
        skills: [
          { id: 's1', name: 'Cloud Concepts', level: 'beginner', progress: 60, resources: ['Lesson: Cloud Models', 'Lesson: AWS EC2'] },
          { id: 's2', name: 'Networking', level: 'intermediate', progress: 55, resources: ['Lesson: TCP/IP', 'Lesson: VPC'] },
        ],
      },
      {
        id: 'stage-2',
        name: 'AWS Core Services',
        level: 'intermediate',
        skills: [
          { id: 's3', name: 'EC2 & VPC', level: 'intermediate', progress: 25, resources: ['Lesson: EC2 Instances', 'Lesson: VPC Setup'] },
          { id: 's4', name: 'S3 & Storage', level: 'intermediate', progress: 30, resources: ['Lesson: S3 Buckets'] },
        ],
      },
    ],
  },
  {
    id: 'career-6',
    title: 'DevOps Engineer',
    description: 'Automate and optimize software delivery',
    icon: 'GitBranch',
    stages: [],
  },
  {
    id: 'career-7',
    title: 'Cybersecurity Analyst',
    description: 'Protect systems from security threats',
    icon: 'ShieldCheck',
    stages: [],
  },
  {
    id: 'career-8',
    title: 'Python Developer',
    description: 'Build applications with Python',
    icon: 'FileCode2',
    stages: [],
  },
  {
    id: 'career-9',
    title: 'Software Testing',
    description: 'Ensure quality through testing',
    icon: 'CheckCircle2',
    stages: [],
  },
  {
    id: 'career-10',
    title: 'Business Analyst',
    description: 'Bridge business and technology',
    icon: 'Briefcase',
    stages: [],
  },
];

export const demoNotifications: Notification[] = [
  {
    id: 'notif-1',
    type: 'warning',
    title: 'Weak topic detected',
    message: 'You scored 48% in Polymorphism. Review recommended before continuing.',
    date: '2025-09-09T15:05:00Z',
    read: false,
  },
  {
    id: 'notif-2',
    type: 'info',
    title: 'Revision due',
    message: 'Encapsulation is due for review today.',
    date: '2025-09-11T09:00:00Z',
    read: false,
  },
  {
    id: 'notif-3',
    type: 'success',
    title: 'Quiz completed',
    message: 'You scored 82% in Java OOP basics. Great progress!',
    date: '2025-09-08T12:00:00Z',
    read: true,
  },
];

export const demoRecommendations = [
  {
    title: 'Review Polymorphism',
    reason:
      'You struggled with polymorphism in your last quiz (48%). Review the core concept before moving to advanced OOP.',
    action: 'Review Now',
    href: '/lesson/polymorphism',
    priority: 'high' as const,
    icon: 'AlertCircle',
  },
  {
    title: 'Practice CIDR Notation',
    reason:
      'Subnetting questions were challenging. Practice with flashcards and visual examples.',
    action: 'Practice',
    href: '/flashcards',
    priority: 'medium' as const,
    icon: 'Layers',
  },
  {
    title: 'Continue AWS EC2',
    reason:
      'You started learning about AWS EC2 but are only 20% through. Pick up where you left off.',
    action: 'Continue',
    href: '/lesson/aws-ec2',
    priority: 'low' as const,
    icon: 'PlayCircle',
  },
];

export const suggestedTopics = [
  'Java', 'Python', 'C Programming', 'Data Structures & Algorithms',
  'DBMS', 'Computer Networks', 'Operating Systems', 'Cloud Computing',
  'AWS', 'Machine Learning', 'React', 'Node.js', 'SQL',
  'Cybersecurity', 'Web Development', 'System Design',
  'Docker', 'Kubernetes', 'Git', 'Interview Preparation',
];

export const demoCommunityPosts: CommunityPost[] = [
  {
    id: 'post-1',
    authorId: 'user-2',
    authorName: 'Priya Sharma',
    authorRole: 'Final Year CS Student',
    title: 'New TensorFlow 2.16 features that make ML easier for beginners',
    content: 'TensorFlow 2.16 just dropped and it has some game-changing features for beginners:\n\n1. Keras 3 is now the default high-level API, making it much easier to switch between TensorFlow, PyTorch, and JAX backends\n2. New distribution API simplifies distributed training\n3. Better integration with Google Cloud TPUs\n\nIf you are just starting with ML, this is the perfect time. The new API is significantly more intuitive than before. I have been testing it for a week and the learning curve is much gentler now.',
    topic: 'Machine Learning',
    tags: ['TensorFlow', 'Keras', 'Deep Learning', 'Beginner Friendly'],
    likes: 47,
    likedByMe: false,
    comments: [
      {
        id: 'c1',
        authorId: 'user-3',
        authorName: 'Rahul Verma',
        authorRole: 'AI/ML Engineer',
        content: 'This is great! The Keras 3 multi-backend support is a huge win. No more rewriting code when switching frameworks.',
        likes: 12,
        createdAt: '2025-09-10T08:30:00Z',
      },
      {
        id: 'c2',
        authorId: 'user-4',
        authorName: 'Sneha Patel',
        authorRole: 'Data Science Student',
        content: 'Do you have any good resources for getting started with the new API? The official docs seem a bit sparse right now.',
        likes: 5,
        createdAt: '2025-09-10T09:15:00Z',
      },
    ],
    createdAt: '2025-09-10T07:00:00Z',
    pinned: true,
  },
  {
    id: 'post-2',
    authorId: 'user-5',
    authorName: 'Arjun Kumar',
    authorRole: 'Full Stack Developer',
    title: 'React Server Components vs Client Components - A practical guide',
    content: 'After spending a month migrating our production app to React Server Components, here are my key takeaways:\n\n1. Use Server Components for data fetching, static content, and heavy computations\n2. Use Client Components only when you need state, effects, or browser APIs\n3. The "use client" directive marks the boundary - everything imported by a client component is also client-side\n4. You can pass server data as props to client components, but not functions\n\nThe biggest gotcha: context providers must be in client components, which means they wrap client-only subtrees.',
    topic: 'Web Development',
    tags: ['React', 'Next.js', 'Performance', 'Architecture'],
    likes: 63,
    likedByMe: true,
    comments: [
      {
        id: 'c3',
        authorId: 'user-2',
        authorName: 'Priya Sharma',
        authorRole: 'Final Year CS Student',
        content: 'This is exactly what I needed! The context provider part tripped me up last week. Thank you!',
        likes: 8,
        createdAt: '2025-09-09T16:00:00Z',
      },
    ],
    createdAt: '2025-09-09T14:30:00Z',
  },
  {
    id: 'post-3',
    authorId: 'user-6',
    authorName: 'Karthik R',
    authorRole: 'Cloud Engineer',
    title: 'AWS announced free tier extension for Lambda - 1M free requests/month',
    content: 'AWS just extended the free tier for Lambda functions:\n\n- 1 million free requests per month (up from 400K)\n- 400,000 GB-seconds of compute time\n- No expiry on the free tier (previously 12 months)\n\nThis is huge for students building projects! You can now run serverless APIs practically for free. Combined with API Gateway free tier (1M requests), you can host a full backend at zero cost.',
    topic: 'Cloud Computing',
    tags: ['AWS', 'Lambda', 'Serverless', 'Free Tier'],
    likes: 89,
    likedByMe: false,
    comments: [
      {
        id: 'c4',
        authorId: 'user-7',
        authorName: 'Deepak Singh',
        authorRole: 'DevOps Engineer',
        content: 'This is amazing! Do you know if this applies to existing accounts or only new ones?',
        likes: 3,
        createdAt: '2025-09-09T11:00:00Z',
      },
      {
        id: 'c5',
        authorId: 'user-6',
        authorName: 'Karthik R',
        authorRole: 'Cloud Engineer',
        content: 'Applies to all accounts, both new and existing! The free tier is now permanent.',
        likes: 15,
        createdAt: '2025-09-09T11:15:00Z',
      },
    ],
    createdAt: '2025-09-09T10:30:00Z',
  },
  {
    id: 'post-4',
    authorId: 'user-8',
    authorName: 'Aishwarya N',
    authorRole: 'Placement Candidate',
    title: 'Top 10 DSA patterns that crack 80% of interview problems',
    content: 'After solving 500+ LeetCode problems, I realized most fall into these 10 patterns:\n\n1. Two Pointers - for array/string problems\n2. Sliding Window - for substring/subarray optimization\n3. Fast & Slow Pointers - for linked list cycles\n4. Merge Intervals - for overlapping ranges\n5. Cyclic Sort - for range-based array problems\n6. BFS/DFS - for tree/graph traversal\n7. Topological Sort - for dependency ordering\n8. Binary Search - for sorted search spaces\n9. Dynamic Programming - for optimal substructure\n10. Backtracking - for combination/permutation problems\n\nMaster these patterns and you can solve most interview problems by recognition, not brute force.',
    topic: 'Interview Preparation',
    tags: ['DSA', 'Interviews', 'Patterns', 'LeetCode'],
    likes: 156,
    likedByMe: true,
    comments: [
      {
        id: 'c6',
        authorId: 'user-9',
        authorName: 'Vikram Reddy',
        authorRole: 'Software Engineer at Google',
        content: 'Great list! I would also add Union Find for graph connectivity problems. It shows up more often than people expect.',
        likes: 22,
        createdAt: '2025-09-08T18:00:00Z',
      },
    ],
    createdAt: '2025-09-08T17:00:00Z',
  },
  {
    id: 'post-5',
    authorId: 'user-3',
    authorName: 'Rahul Verma',
    authorRole: 'AI/ML Engineer',
    title: 'Understanding Transformers: A visual intuition for beginners',
    content: 'If you are struggling to understand Transformers, here is a simple way to think about it:\n\nImagine you are at a party with 100 people. You want to talk to the most relevant person. You scan the room, give each person an "attention score" based on relevance, and focus on the top few. That is what self-attention does for words in a sentence.\n\nMulti-head attention is like having multiple criteria for relevance - one head looks at grammar, another at meaning, another at position. The model learns which heads to trust for different tasks.\n\nThe key innovation: unlike RNNs that process sequentially, Transformers look at all words simultaneously, making them parallelizable and much faster to train.',
    topic: 'AI/ML',
    tags: ['Transformers', 'NLP', 'Deep Learning', 'Attention'],
    likes: 98,
    likedByMe: false,
    comments: [],
    createdAt: '2025-09-08T12:00:00Z',
  },
];
