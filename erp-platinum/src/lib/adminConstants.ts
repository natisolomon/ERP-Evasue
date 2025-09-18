// src/lib/adminConstants.ts

export const adminStats = [
  { title: "Total Users", value: "2,842", trend: "+12.5%", icon: "Users", variant: "cyan" },
  { title: "Active Sessions", value: "47", trend: "+3.2%", icon: "Activity", variant: "green" },
  { title: "System Alerts", value: "3", trend: "+1", icon: "AlertTriangle", variant: "amber" },
  { title: "Storage Used", value: "84%", trend: "+5.1%", icon: "Database", variant: "purple" },
];

export const recentActivity = [
  { user: "Sarah Lin", action: "created new user", time: "2 min ago", avatar: "SL" },
  { user: "James Wu", action: "updated permissions", time: "18 min ago", avatar: "JW" },
  { user: "Alex Rivera", action: "deleted inactive account", time: "1h ago", avatar: "AR" },
];

export const systemStatus = [
  { name: "Database", status: "Healthy", color: "green" },
  { name: "API Gateway", status: "Stable", color: "green" },
  { name: "Auth Service", status: "Degraded", color: "amber" },
  { name: "File Storage", status: "Critical", color: "red" },
];