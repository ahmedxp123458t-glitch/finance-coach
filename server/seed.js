const mongoose = require('mongoose');
const { connectDB } = require('./config/db');
const Transaction = require('./models/Transaction');
const SavingsGoal = require('./models/SavingsGoal');
const Budget = require('./models/Budget');

const seed = async () => {
  await connectDB();
  await Transaction.deleteMany({});
  await SavingsGoal.deleteMany({});
  await Budget.deleteMany({});

  await Transaction.insertMany([
    { userId: new mongoose.Types.ObjectId(), type: 'income', category: 'Salary', amount: 5000, date: new Date(), description: 'Monthly salary' },
    { userId: new mongoose.Types.ObjectId(), type: 'expense', category: 'Food', amount: 150, date: new Date(), description: 'Groceries' },
    { userId: new mongoose.Types.ObjectId(), type: 'expense', category: 'Rent', amount: 1200, date: new Date(), description: 'Apartment rent' },
    { userId: new mongoose.Types.ObjectId(), type: 'expense', category: 'Utilities', amount: 200, date: new Date(), description: 'Electricity bill' },
    { userId: new mongoose.Types.ObjectId(), type: 'income', category: 'Freelance', amount: 800, date: new Date(), description: 'Web project' }
  ]);

  await SavingsGoal.insertMany([
    { name: 'Emergency Fund', targetAmount: 10000, currentAmount: 3500, deadline: new Date('2026-12-31') },
    { name: 'Vacation', targetAmount: 3000, currentAmount: 1200, deadline: new Date('2026-09-01') },
    { name: 'New Laptop', targetAmount: 2000, currentAmount: 800, deadline: new Date('2026-08-15') }
  ]);

  await Budget.insertMany([
    { category: 'Food', monthlyLimit: 500, spent: 320 },
    { category: 'Rent', monthlyLimit: 1300, spent: 1200 },
    { category: 'Entertainment', monthlyLimit: 200, spent: 85 },
    { category: 'Transport', monthlyLimit: 150, spent: 60 }
  ]);

  console.log('Finance Coach data seeded successfully');
  process.exit(0);
};

seed().catch(err => { console.error(err); process.exit(1); });
