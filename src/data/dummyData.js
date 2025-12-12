// Centralized dummy data for the admin panel
// This file contains all mock data that will be replaced with API calls later

export const dummyUsers = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    mobile: "9876543210",
    aadhar: "123456789012",
    pan: "ABCDE1234F",
    registeredDate: "2025-01-15"
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    mobile: "8765432109",
    aadhar: "234567890123",
    pan: "BCDEF2345G",
    registeredDate: "2025-02-20"
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit.patel@example.com",
    mobile: "7654321098",
    aadhar: "345678901234",
    pan: "",
    registeredDate: "2025-03-10"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    mobile: "6543210987",
    aadhar: "",
    pan: "DEFGH4567J",
    registeredDate: "2025-04-05"
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    mobile: "9123456780",
    aadhar: "456789012345",
    pan: "EFGHI5678K",
    registeredDate: "2025-05-12"
  },
  {
    id: 6,
    name: "Anjali Desai",
    email: "anjali.desai@example.com",
    mobile: "8234567890",
    aadhar: "567890123456",
    pan: "",
    registeredDate: "2025-06-18"
  },
  {
    id: 7,
    name: "Rohit Gupta",
    email: "rohit.gupta@example.com",
    mobile: "7345678901",
    aadhar: "",
    pan: "GHIJK7890M",
    registeredDate: "2025-07-22"
  },
  {
    id: 8,
    name: "Pooja Verma",
    email: "pooja.verma@example.com",
    mobile: "6456789012",
    aadhar: "678901234567",
    pan: "HIJKL8901N",
    registeredDate: "2025-08-30"
  },
  {
    id: 9,
    name: "Karan Mehta",
    email: "karan.mehta@example.com",
    mobile: "9567890123",
    aadhar: "789012345678",
    pan: "",
    registeredDate: "2025-09-14"
  },
  {
    id: 10,
    name: "Neha Joshi",
    email: "neha.joshi@example.com",
    mobile: "8678901234",
    aadhar: "",
    pan: "JKLMN9012P",
    registeredDate: "2025-10-08"
  }
];

export const dummyVendors = [
  {
    id: 1,
    name: "Solar Tech Solutions",
    ownerName: "Rajesh Kumar",
    email: "rajesh@solartech.com",
    mobile: "9876543210",
    aadhar: "123456789012",
    pan: "ABCDE1234F",
    gst: "27ABCDE1234F1Z5",
    businessAddress: "Shop No. 45, Industrial Area, Pune, Maharashtra - 411001",
    registeredDate: "2025-01-15",
    paymentStatus: "Completed",
    paymentId: "pay_1234567890",
    paymentAmount: 2376,
    status: "Active"
  },
  {
    id: 2,
    name: "Green Energy Enterprises",
    ownerName: "Priya Sharma",
    email: "priya@greenenergy.com",
    mobile: "8765432109",
    aadhar: "234567890123",
    pan: "BCDEF2345G",
    gst: "29BCDEF2345G1Z8",
    businessAddress: "Plot 12, Solar Park, Bangalore, Karnataka - 560001",
    registeredDate: "2025-02-20",
    paymentStatus: "Completed",
    paymentId: "pay_2345678901",
    paymentAmount: 2376,
    status: "Active"
  },
  {
    id: 3,
    name: "Bright Solar Systems",
    ownerName: "Amit Patel",
    email: "amit@brightsolar.com",
    mobile: "7654321098",
    aadhar: "345678901234",
    pan: "CDEFG3456H",
    gst: "24CDEFG3456H1Z3",
    businessAddress: "21, Gandhi Road, Ahmedabad, Gujarat - 380001",
    registeredDate: "2025-03-10",
    paymentStatus: "Completed",
    paymentId: "pay_3456789012",
    paymentAmount: 2376,
    status: "Active"
  },
  {
    id: 4,
    name: "Eco Power Solutions",
    ownerName: "Sneha Reddy",
    email: "sneha@ecopower.com",
    mobile: "6543210987",
    aadhar: "456789012345",
    pan: "DEFGH4567J",
    gst: "36DEFGH4567J1Z6",
    businessAddress: "15, Tech City, Hyderabad, Telangana - 500001",
    registeredDate: "2025-04-05",
    paymentStatus: "Pending",
    paymentId: "",
    paymentAmount: 2376,
    status: "Pending"
  },
  {
    id: 5,
    name: "Sunshine Solar Industries",
    ownerName: "Vikram Singh",
    email: "vikram@sunshineindustries.com",
    mobile: "9123456780",
    aadhar: "567890123456",
    pan: "EFGHI5678K",
    gst: "07EFGHI5678K1Z9",
    businessAddress: "Block B, Industrial Area, Delhi - 110001",
    registeredDate: "2025-05-12",
    paymentStatus: "Completed",
    paymentId: "pay_5678901234",
    paymentAmount: 2376,
    status: "Active"
  },
  {
    id: 6,
    name: "Renewable Tech India",
    ownerName: "Anjali Desai",
    email: "anjali@renewabletech.com",
    mobile: "8234567890",
    aadhar: "678901234567",
    pan: "FGHIJ6789L",
    gst: "27FGHIJ6789L1Z2",
    businessAddress: "32, Market Road, Mumbai, Maharashtra - 400001",
    registeredDate: "2025-06-18",
    paymentStatus: "Completed",
    paymentId: "pay_6789012345",
    paymentAmount: 2376,
    status: "Active"
  },
  {
    id: 7,
    name: "Solar Vision Technologies",
    ownerName: "Rohit Gupta",
    email: "rohit@solarvision.com",
    mobile: "7345678901",
    aadhar: "789012345678",
    pan: "GHIJK7890M",
    gst: "09GHIJK7890M1Z4",
    businessAddress: "56, Solar Complex, Lucknow, Uttar Pradesh - 226001",
    registeredDate: "2025-07-22",
    paymentStatus: "Completed",
    paymentId: "pay_7890123456",
    paymentAmount: 2376,
    status: "Active"
  },
  {
    id: 8,
    name: "Power Plus Solar",
    ownerName: "Pooja Verma",
    email: "pooja@powerplus.com",
    mobile: "6456789012",
    aadhar: "890123456789",
    pan: "HIJKL8901N",
    gst: "22HIJKL8901N1Z7",
    businessAddress: "78, Green Zone, Indore, Madhya Pradesh - 452001",
    registeredDate: "2025-08-30",
    paymentStatus: "Failed",
    paymentId: "",
    paymentAmount: 2376,
    status: "Inactive"
  },
  {
    id: 9,
    name: "NextGen Solar Solutions",
    ownerName: "Karan Mehta",
    email: "karan@nextgensolar.com",
    mobile: "9567890123",
    aadhar: "901234567890",
    pan: "JKLMN9012P",
    gst: "24JKLMN9012P1Z1",
    businessAddress: "90, Tech Park, Surat, Gujarat - 395001",
    registeredDate: "2025-09-14",
    paymentStatus: "Completed",
    paymentId: "pay_9012345678",
    paymentAmount: 2376,
    status: "Active"
  },
  {
    id: 10,
    name: "Clean Energy Hub",
    ownerName: "Neha Joshi",
    email: "neha@cleanenergyhub.com",
    mobile: "8678901234",
    aadhar: "012345678901",
    pan: "KLMNO0123Q",
    gst: "27KLMNO0123Q1Z5",
    businessAddress: "11, Energy Plaza, Nagpur, Maharashtra - 440001",
    registeredDate: "2025-10-08",
    paymentStatus: "Completed",
    paymentId: "pay_0123456789",
    paymentAmount: 2376,
    status: "Active"
  },
  {
    id: 11,
    name: "SunPower Distributors",
    ownerName: "Arjun Nair",
    email: "arjun@sunpower.com",
    mobile: "9234567801",
    aadhar: "123450987654",
    pan: "LMNOP1234R",
    gst: "32LMNOP1234R1Z8",
    businessAddress: "25, Commerce Street, Kochi, Kerala - 682001",
    registeredDate: "2025-11-02",
    paymentStatus: "Completed",
    paymentId: "pay_1123456789",
    paymentAmount: 2376,
    status: "Active"
  },
  {
    id: 12,
    name: "Agro Solar Systems",
    ownerName: "Divya Rao",
    email: "divya@agrosolar.com",
    mobile: "8345678912",
    aadhar: "234561098765",
    pan: "MNOPQ2345S",
    gst: "",
    businessAddress: "67, Farm Road, Coimbatore, Tamil Nadu - 641001",
    registeredDate: "2025-11-15",
    paymentStatus: "Pending",
    paymentId: "",
    paymentAmount: 2376,
    status: "Pending"
  }
];

export const dummyContacts = [
  {
    id: 1,
    name: "Rajesh Kumar",
    email: "rajesh.kumar@example.com",
    message: "I am interested in installing a 5KW solar system for my home. Can you please provide a quotation and installation timeline?",
    createdAt: "2025-12-10T10:30:00",
    status: "New"
  },
  {
    id: 2,
    name: "Priya Sharma",
    email: "priya.sharma@example.com",
    message: "What is the warranty period for the solar panels? Also, do you provide maintenance services?",
    createdAt: "2025-12-09T14:45:00",
    status: "Replied"
  },
  {
    id: 3,
    name: "Amit Patel",
    email: "amit.patel@example.com",
    message: "I need information about government subsidies available for solar panel installation in Gujarat.",
    createdAt: "2025-12-08T09:15:00",
    status: "In Progress"
  },
  {
    id: 4,
    name: "Sneha Reddy",
    email: "sneha.reddy@example.com",
    message: "Can you install solar panels for commercial buildings? We have a 10,000 sq ft office space.",
    createdAt: "2025-12-08T16:20:00",
    status: "New"
  },
  {
    id: 5,
    name: "Vikram Singh",
    email: "vikram.singh@example.com",
    message: "What are the payment options available? Do you offer EMI facility?",
    createdAt: "2025-12-07T11:00:00",
    status: "Replied"
  },
  {
    id: 6,
    name: "Anjali Desai",
    email: "anjali.desai@example.com",
    message: "I recently installed your solar system but facing some issues with the inverter. Please help!",
    createdAt: "2025-12-07T13:30:00",
    status: "In Progress"
  },
  {
    id: 7,
    name: "Rohit Gupta",
    email: "rohit.gupta@example.com",
    message: "Do you provide free site inspection? I want to check if my roof is suitable for solar installation.",
    createdAt: "2025-12-06T10:45:00",
    status: "Replied"
  },
  {
    id: 8,
    name: "Pooja Verma",
    email: "pooja.verma@example.com",
    message: "What is the average payback period for residential solar installations?",
    createdAt: "2025-12-05T15:10:00",
    status: "Replied"
  },
  {
    id: 9,
    name: "Karan Mehta",
    email: "karan.mehta@example.com",
    message: "I am interested in becoming a vendor/dealer for your solar products. Please share the details.",
    createdAt: "2025-12-05T09:30:00",
    status: "New"
  },
  {
    id: 10,
    name: "Neha Joshi",
    email: "neha.joshi@example.com",
    message: "Can you provide references of your previous installations in Nagpur area?",
    createdAt: "2025-12-04T14:00:00",
    status: "In Progress"
  },
  {
    id: 11,
    name: "Arjun Nair",
    email: "arjun@example.com",
    message: "What is the difference between on-grid and off-grid solar systems? Which one would you recommend for residential use?",
    createdAt: "2025-12-03T11:20:00",
    status: "Replied"
  },
  {
    id: 12,
    name: "Divya Rao",
    email: "divya.rao@example.com",
    message: "Do you offer financing options for agricultural solar installations?",
    createdAt: "2025-12-02T16:45:00",
    status: "New"
  },
  {
    id: 13,
    name: "Suresh Iyer",
    email: "suresh.iyer@example.com",
    message: "I need urgent support. My solar system stopped working after yesterday's rain.",
    createdAt: "2025-12-01T08:30:00",
    status: "In Progress"
  },
  {
    id: 14,
    name: "Kavita Singh",
    email: "kavita.singh@example.com",
    message: "What certifications do your solar panels have? Are they BIS certified?",
    createdAt: "2025-11-30T12:15:00",
    status: "Replied"
  },
  {
    id: 15,
    name: "Manoj Tiwari",
    email: "manoj.tiwari@example.com",
    message: "Can you share the detailed technical specifications and efficiency ratings of your solar panels?",
    createdAt: "2025-11-29T10:00:00",
    status: "Replied"
  }
];
