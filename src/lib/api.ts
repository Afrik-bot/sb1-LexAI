// Types
export interface Update {
  title: string;
  date: Date;
  category: 'legislation' | 'court' | 'policy' | 'ethics' | 'compliance';
  summary: string;
  source: string;
  sourceUrl: string;
  region: 'us' | 'eu' | 'cn';
}

export interface Expert {
  name: string;
  title: string;
  organization: string;
  imageUrl: string;
  expertise: string[];
}

export interface Analysis {
  title: string;
  author: { name: string };
  summary: string;
}

// Mock data for development
export const mockUpdates: Update[] = [
  {
    title: 'EU AI Act: Final Draft Approved',
    date: new Date('2024-01-15'),
    category: 'legislation',
    summary: 'The European Parliament has approved the final draft of the AI Act, establishing comprehensive regulations for artificial intelligence systems.',
    source: 'European Commission',
    sourceUrl: 'https://ec.europa.eu',
    region: 'eu'
  },
  {
    title: 'US Supreme Court Ruling on AI Copyright',
    date: new Date('2024-01-14'),
    category: 'court',
    summary: 'Landmark decision on the copyrightability of AI-generated works, establishing new precedents for intellectual property rights.',
    source: 'Supreme Court',
    sourceUrl: 'https://supremecourt.gov',
    region: 'us'
  },
  {
    title: 'China Releases AI Development Guidelines',
    date: new Date('2024-01-13'),
    category: 'policy',
    summary: 'New guidelines focus on ethical AI development and implementation, emphasizing safety and social responsibility.',
    source: 'State Council of China',
    sourceUrl: 'https://www.gov.cn',
    region: 'cn'
  }
];

export const mockExperts: Expert[] = [
  {
    name: "Dr. Sarah Chen",
    title: "AI Ethics Researcher",
    organization: "Stanford Institute for AI Policy",
    imageUrl: "https://i.pravatar.cc/150?img=1",
    expertise: ["AI Ethics", "Policy Analysis", "Machine Learning"]
  },
  {
    name: "Prof. Michael Roberts",
    title: "Technology Law Professor",
    organization: "Harvard Law School",
    imageUrl: "https://i.pravatar.cc/150?img=2",
    expertise: ["Tech Law", "Digital Rights", "AI Regulation"]
  }
];

export const mockAnalyses: Analysis[] = [
  {
    title: "The EU AI Act: A New Era for AI Regulation",
    author: { name: "Dr. Elena Kovacs" },
    summary: "An in-depth analysis of the EU's comprehensive AI regulation and its global implications..."
  },
  {
    title: "BCI Regulation: Balancing Innovation and Safety",
    author: { name: "Dr. Sarah Chen" },
    summary: "Examining the regulatory challenges in brain-computer interface development..."
  }
];