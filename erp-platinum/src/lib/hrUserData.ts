// src/lib/hrUserData.ts


export interface HRLeaveRequest {
  id: string;
  staffId: string;
  staffName: string;
  type: 'vacation' | 'sick' | 'personal' | 'unpaid';
  startDate: string;
  endDate: string;
  days: number;
  reason: string;
  status: 'pending' | 'approved' | 'rejected';
  submittedDate: string;
  approvedBy?: string;
  notes?: string;
}

export interface HRPerformanceReview {
  id: string;
  staffId: string;
  staffName: string;
  reviewer: string;
  reviewDate: string;
  rating: number;
  comments: string;
  goals: string[];
  nextReviewDate: string;
}

export interface HROnboarding {
  id: string;
  staffId: string;
  staffName: string;
  status: 'pending' | 'in_progress' | 'completed';
  startDate: string;
  tasks: {
    name: string;
    completed: boolean;
    dueDate: string;
    assignedTo: string;
  }[];
  documents: string[];
  notes?: string;
}
export const mockLeaveRequests: HRLeaveRequest[] = [
  {
    id: 'leave1',
    staffId: 'staff1',
    staffName: 'John Doe',
    type: 'vacation',
    startDate: '2024-06-01',
    endDate: '2024-06-07',
    days: 7,
    reason: 'Family vacation to Hawaii',
    status: 'pending',
    submittedDate: '2024-05-15',
  },
  {
    id: 'leave2',
    staffId: 'staff2',
    staffName: 'Jane Smith',
    type: 'sick',
    startDate: '2024-05-20',
    endDate: '2024-05-22',
    days: 3,
    reason: 'Flu recovery',
    status: 'approved',
    submittedDate: '2024-05-18',
    approvedBy: 'Michael Brown',
  },
  {
    id: 'leave3',
    staffId: 'staff3',
    staffName: 'Mike Johnson',
    type: 'personal',
    startDate: '2024-05-25',
    endDate: '2024-06-05',
    days: 12,
    reason: 'Wedding and honeymoon',
    status: 'approved',
    submittedDate: '2024-04-01',
    approvedBy: 'Lisa Davis',
    notes: 'Approved for extended leave due to special circumstances',
  },
];

export const mockPerformanceReviews: HRPerformanceReview[] = [
  {
    id: 'review1',
    staffId: 'staff1',
    staffName: 'John Doe',
    reviewer: 'Sarah Johnson',
    reviewDate: '2024-04-01',
    rating: 4.5,
    comments: 'Excellent technical skills and team leadership. Consistently delivers high-quality work.',
    goals: [
      'Lead the new project initiative',
      'Mentor junior developers',
      'Improve code review process',
    ],
    nextReviewDate: '2024-10-01',
  },
  {
    id: 'review2',
    staffId: 'staff2',
    staffName: 'Jane Smith',
    reviewer: 'Michael Brown',
    reviewDate: '2024-03-15',
    rating: 4.2,
    comments: 'Strong marketing campaigns and team management. Great communication skills.',
    goals: [
      'Increase social media engagement by 25%',
      'Launch new product campaign',
      'Improve team collaboration',
    ],
    nextReviewDate: '2024-09-15',
  },
];

export const mockOnboarding: HROnboarding[] = [
  {
    id: 'onboard1',
    staffId: 'staff4',
    staffName: 'Emily Wilson',
    status: 'in_progress',
    startDate: '2024-05-15',
    tasks: [
      {
        name: 'Complete HR paperwork',
        completed: true,
        dueDate: '2024-05-16',
        assignedTo: 'HR Department',
      },
      {
        name: 'Set up workstation',
        completed: true,
        dueDate: '2024-05-16',
        assignedTo: 'IT Department',
      },
      {
        name: 'Attend orientation',
        completed: false,
        dueDate: '2024-05-20',
        assignedTo: 'HR Department',
      },
      {
        name: 'Meet with manager',
        completed: false,
        dueDate: '2024-05-17',
        assignedTo: 'Sarah Johnson',
      },
    ],
    documents: ['Offer Letter', 'Employee Handbook', 'Tax Forms'],
    notes: 'Excited to join the engineering team',
  },
  {
    id: 'onboard2',
    staffId: 'staff5',
    staffName: 'David Lee',
    status: 'pending',
    startDate: '2024-06-01',
    tasks: [
      {
        name: 'Complete HR paperwork',
        completed: false,
        dueDate: '2024-06-02',
        assignedTo: 'HR Department',
      },
      {
        name: 'Set up workstation',
        completed: false,
        dueDate: '2024-06-02',
        assignedTo: 'IT Department',
      },
      {
        name: 'Attend orientation',
        completed: false,
        dueDate: '2024-06-05',
        assignedTo: 'HR Department',
      },
      {
        name: 'Meet with manager',
        completed: false,
        dueDate: '2024-06-03',
        assignedTo: 'Michael Brown',
      },
    ],
    documents: ['Offer Letter', 'Employee Handbook'],
  },
];