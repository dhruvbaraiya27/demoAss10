const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('../models/userModel');
const Job = require('../models/jobModel');
require('dotenv').config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    // Clear existing data
    await User.deleteMany({});
    await Job.deleteMany({});

    // Create multiple users
    const users = [
      {
        fullName: "Admin User",
        email: "admin@example.com",
        password: await bcrypt.hash("AdminPass123!", await bcrypt.genSalt(10)),
        type: "admin"
      },
      {
        fullName: "John Doe",
        email: "employee1@example.com",
        password: await bcrypt.hash("EmployeePass123!", await bcrypt.genSalt(10)),
        type: "employee"
      },
      {
        fullName: "Jane Smith",
        email: "employee2@example.com",
        password: await bcrypt.hash("EmployeePass456!", await bcrypt.genSalt(10)),
        type: "employee"
      }
    ];

    const savedUsers = await User.insertMany(users);

    // Create multiple jobs
    const jobs = [
      {
        companyName: "Tech Innovations",
        jobTitle: "Senior Software Engineer",
        description: "Seeking an experienced software engineer to join our cutting-edge team.",
        salary: 95000,
        createdBy: savedUsers[0]._id
      },
      {
        companyName: "Data Solutions",
        jobTitle: "Data Analyst",
        description: "Analyze and interpret complex data sets to drive business decisions.",
        salary: 75000,
        createdBy: savedUsers[0]._id
      },
      {
        companyName: "Cloud Dynamics",
        jobTitle: "Cloud Infrastructure Specialist",
        description: "Design and maintain scalable cloud infrastructure solutions.",
        salary: 85000,
        createdBy: savedUsers[0]._id
      },
      {
        companyName: "AI Frontiers",
        jobTitle: "Machine Learning Engineer",
        description: "Develop innovative AI and machine learning solutions.",
        salary: 105000,
        createdBy: savedUsers[0]._id
      }
    ];

    await Job.insertMany(jobs);

    console.log("Database seeded successfully with multiple users and jobs");
    mongoose.connection.close();
  } catch (error) {
    console.error("Seeding error:", error);
    mongoose.connection.close();
  }
};

// Run the seeding script
seedDatabase();