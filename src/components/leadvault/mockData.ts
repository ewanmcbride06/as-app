// Realistic mock data for LeadVault

export interface Contact {
  id: string;
  name: string;
  avatar: string;
  title: string;
  company: string;
  companyLogo: string;
  domain: string;
  industry: string;
  employees: string;
  location: string;
  email: string;
  emailStatus: 'verified' | 'guessed' | 'unknown';
  linkedIn: string;
  lastUpdated: string;
  seniority: string;
  department: string;
}

export interface Company {
  id: string;
  name: string;
  logo: string;
  domain: string;
  industry: string;
  employees: string;
  revenue: string;
  location: string;
  techStack: string[];
  description: string;
  founded: string;
}

export interface LeadList {
  id: string;
  name: string;
  description: string;
  companiesCount: number;
  contactsCount: number;
  createdDate: string;
  owner: string;
  type: 'companies' | 'contacts' | 'mixed';
}

const industries = [
  'SaaS', 'Fintech', 'Healthcare', 'E-commerce', 'Marketing', 'HR Tech', 
  'Cybersecurity', 'AI/ML', 'EdTech', 'Real Estate', 'Logistics', 'Manufacturing'
];

const titles = [
  'CEO', 'CTO', 'CFO', 'VP of Sales', 'VP of Marketing', 'Head of Product',
  'Director of Engineering', 'Sales Manager', 'Marketing Manager', 'Account Executive',
  'SDR', 'BDR', 'Product Manager', 'RevOps Manager', 'Growth Lead'
];

const seniorities = ['C-level', 'VP', 'Head', 'Director', 'Manager', 'IC'];
const departments = ['Sales', 'Marketing', 'RevOps', 'Product', 'Operations', 'Finance', 'HR', 'Engineering'];

const companyNames = [
  'Acme Corp', 'TechFlow', 'DataSync', 'CloudNine', 'Innovex', 'Nextera', 
  'Quantum Labs', 'Velocity', 'Apex Systems', 'FutureTech', 'Pinnacle', 
  'Synergy Co', 'Momentum', 'Catalyst', 'Elevate', 'Zenith', 'Prism',
  'Orbit', 'Spark', 'Summit', 'Bridge', 'Forge', 'Atlas', 'Nova'
];

const firstNames = [
  'James', 'Sarah', 'Michael', 'Emily', 'David', 'Jessica', 'Robert', 'Ashley',
  'William', 'Amanda', 'Richard', 'Stephanie', 'Joseph', 'Nicole', 'Thomas',
  'Jennifer', 'Christopher', 'Elizabeth', 'Daniel', 'Michelle', 'Matthew', 'Laura',
  'Andrew', 'Megan', 'Joshua', 'Hannah', 'Brandon', 'Rachel', 'Kevin', 'Samantha'
];

const lastNames = [
  'Smith', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller', 'Davis',
  'Rodriguez', 'Martinez', 'Hernandez', 'Lopez', 'Gonzalez', 'Wilson', 'Anderson',
  'Thomas', 'Taylor', 'Moore', 'Jackson', 'Martin', 'Lee', 'Perez', 'Thompson',
  'White', 'Harris', 'Sanchez', 'Clark', 'Ramirez', 'Lewis', 'Robinson'
];

const locations = [
  'San Francisco, CA', 'New York, NY', 'Austin, TX', 'Boston, MA', 'Seattle, WA',
  'Los Angeles, CA', 'Chicago, IL', 'Denver, CO', 'Miami, FL', 'Atlanta, GA',
  'Portland, OR', 'San Diego, CA', 'Phoenix, AZ', 'Dallas, TX', 'Philadelphia, PA'
];

const techStacks = [
  'React', 'Angular', 'Vue', 'Node.js', 'Python', 'AWS', 'GCP', 'Azure',
  'Kubernetes', 'Docker', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch',
  'Salesforce', 'HubSpot', 'Marketo', 'Segment', 'Snowflake', 'Databricks'
];

const employeeRanges = ['1-10', '11-50', '51-200', '201-500', '501-1000', '1000+'];
const revenues = ['< $1M', '$1M-$10M', '$10M-$50M', '$50M-$100M', '$100M-$500M', '$500M+'];

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function randomItems<T>(arr: T[], count: number): T[] {
  const shuffled = [...arr].sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
}

function generateEmail(firstName: string, lastName: string, domain: string): string {
  const patterns = [
    `${firstName.toLowerCase()}@${domain}`,
    `${firstName.toLowerCase()}.${lastName.toLowerCase()}@${domain}`,
    `${firstName[0].toLowerCase()}${lastName.toLowerCase()}@${domain}`,
  ];
  return randomItem(patterns);
}

function maskEmail(email: string): string {
  const [local, domain] = email.split('@');
  if (local.length <= 2) return `${local[0]}***@${domain}`;
  return `${local.slice(0, 2)}***@${domain}`;
}

export function generateContacts(count: number): Contact[] {
  const contacts: Contact[] = [];
  
  for (let i = 0; i < count; i++) {
    const firstName = randomItem(firstNames);
    const lastName = randomItem(lastNames);
    const company = randomItem(companyNames);
    const domain = `${company.toLowerCase().replace(/\s/g, '')}.com`;
    const email = generateEmail(firstName, lastName, domain);
    
    contacts.push({
      id: `contact-${i + 1}`,
      name: `${firstName} ${lastName}`,
      avatar: `https://api.dicebear.com/7.x/initials/svg?seed=${firstName}${lastName}`,
      title: randomItem(titles),
      company,
      companyLogo: `https://logo.clearbit.com/${domain}`,
      domain,
      industry: randomItem(industries),
      employees: randomItem(employeeRanges),
      location: randomItem(locations),
      email: maskEmail(email),
      emailStatus: randomItem(['verified', 'verified', 'verified', 'guessed', 'unknown'] as const),
      linkedIn: `linkedin.com/in/${firstName.toLowerCase()}${lastName.toLowerCase()}`,
      lastUpdated: `${Math.floor(Math.random() * 30) + 1}d ago`,
      seniority: randomItem(seniorities),
      department: randomItem(departments),
    });
  }
  
  return contacts;
}

export function generateCompanies(count: number): Company[] {
  const companies: Company[] = [];
  
  for (let i = 0; i < count; i++) {
    const name = i < companyNames.length ? companyNames[i] : `${randomItem(companyNames)} ${i}`;
    const domain = `${name.toLowerCase().replace(/\s/g, '')}.com`;
    
    companies.push({
      id: `company-${i + 1}`,
      name,
      logo: `https://logo.clearbit.com/${domain}`,
      domain,
      industry: randomItem(industries),
      employees: randomItem(employeeRanges),
      revenue: randomItem(revenues),
      location: randomItem(locations),
      techStack: randomItems(techStacks, Math.floor(Math.random() * 5) + 3),
      description: `${name} is a leading provider of innovative solutions in the ${randomItem(industries).toLowerCase()} space, helping businesses scale and grow efficiently.`,
      founded: `${2010 + Math.floor(Math.random() * 13)}`,
    });
  }
  
  return companies;
}

export function generateLists(): LeadList[] {
  return [
    {
      id: 'list-1',
      name: 'Q4 Outreach - Enterprise',
      description: 'Enterprise accounts for Q4 sales push',
      companiesCount: 245,
      contactsCount: 1250,
      createdDate: '2024-01-15',
      owner: 'Sarah Johnson',
      type: 'mixed',
    },
    {
      id: 'list-2',
      name: 'SaaS Decision Makers',
      description: 'VP+ level contacts at SaaS companies',
      companiesCount: 0,
      contactsCount: 856,
      createdDate: '2024-01-10',
      owner: 'Michael Chen',
      type: 'contacts',
    },
    {
      id: 'list-3',
      name: 'Series B+ Startups',
      description: 'High-growth startups with recent funding',
      companiesCount: 178,
      contactsCount: 0,
      createdDate: '2024-01-08',
      owner: 'Emily Davis',
      type: 'companies',
    },
    {
      id: 'list-4',
      name: 'West Coast Tech',
      description: 'Technology companies in CA, WA, OR',
      companiesCount: 312,
      contactsCount: 2045,
      createdDate: '2024-01-05',
      owner: 'James Wilson',
      type: 'mixed',
    },
    {
      id: 'list-5',
      name: 'Marketing Leaders',
      description: 'CMOs and VP Marketing contacts',
      companiesCount: 0,
      contactsCount: 432,
      createdDate: '2024-01-02',
      owner: 'Sarah Johnson',
      type: 'contacts',
    },
    {
      id: 'list-6',
      name: 'Healthcare Prospects',
      description: 'Healthcare and HealthTech companies',
      companiesCount: 89,
      contactsCount: 567,
      createdDate: '2023-12-28',
      owner: 'David Brown',
      type: 'mixed',
    },
  ];
}

export const mockContacts = generateContacts(100);
export const mockCompanies = generateCompanies(50);
export const mockLists = generateLists();
