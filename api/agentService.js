const express = require('express');
const router = express.Router();
const { ethers } = require('ethers');
const aiService = require('./aiService');
require('dotenv').config();

// Mock employee data - in a real app, this would come from a database
const employees = [
  { id: 1, name: "John Smith", accountId: "0xF947782C0CB4d3afa57912DA235894563950E2F4", salary: "0.1" },
  { id: 2, name: "Sarah Johnson", accountId: "0x2a5470B7CdB77bcb950015BB19CcDBc6AE8B26C3", salary: "0.15" },
  { id: 3, name: "Michael Brown", accountId: "0x8626f6940E2eb28930eFb4CeF49B2d1F2C9C1199", salary: "0.12" },
];

// Process natural language requests from the agent
router.post('/process', async (req, res) => {
  try {
    const { prompt, userId } = req.body;
    
    if (!prompt) {
      return res.status(400).json({ error: 'No prompt provided' });
    }
    
    // Use the AI service to process the prompt
    console.log(`Processing prompt: "${prompt}" from user ${userId}`);
    const aiResult = await aiService.callExternalAI(prompt);
    
    // Extract intent data
    const { intent, confidence, entities } = aiResult.data;
    console.log(`Detected intent: ${intent} with confidence: ${confidence}`);
    
    // Initialize response
    let response = {
      success: true,
      message: "I couldn't understand that request. Please try again.",
      action: "unknown",
      data: null
    };
    
    // Process the request based on the detected intent
    if (intent === 'process_payroll') {
      response = await processPayroll(userId, entities);
    } 
    else if (intent === 'check_balances') {
      response = await checkBalances(userId, entities);
    }
    else if (intent === 'update_employee_info') {
      response = await updateEmployeeInfo(prompt, userId, entities);
    }
    else if (intent === 'generate_reports') {
      response = await generateReports(prompt, userId, entities);
    }
    else if (intent === 'calculate_taxes') {
      response = await calculateTaxes(prompt, userId, entities);
    }
    
    // Add to user's activity log
    if (response.action !== "unknown") {
      // In a real app, you would log this activity to a database
      console.log(`User ${userId} performed action: ${response.action}`);
    }
    
    return res.json(response);
  } catch (error) {
    console.error('Error processing agent request:', error);
    return res.status(500).json({ 
      success: false, 
      message: 'An error occurred while processing your request', 
      error: error.message 
    });
  }
});

// Function to simulate processing payroll
async function processPayroll(userId, entities = {}) {
  // In a real app, this would interact with your payment system
  // and blockchain contracts
  
  const target = entities.target || 'all';
  console.log(`Processing payroll for target: ${target}`);
  
  return {
    success: true,
    message: "I've initiated the payroll process for all employees. The transactions have been successfully completed.",
    action: "process_payroll",
    data: {
      totalPaid: employees.reduce((sum, emp) => sum + parseFloat(emp.salary), 0),
      employeeCount: employees.length,
      timestamp: new Date().toISOString()
    }
  };
}

// Function to simulate checking balances
async function checkBalances(userId, entities = {}) {
  // In a real app, this would query actual account balances
  const accountsToCheck = entities.accounts || 'all';
  console.log(`Checking balances for: ${accountsToCheck}`);
  
  return {
    success: true,
    message: "I've checked all account balances. All accounts are in good standing with sufficient funds.",
    action: "check_balances",
    data: {
      accounts: [
        { name: "Operating Account", balance: "2.45 ETH", status: "Good" },
        { name: "Payroll Account", balance: "1.32 ETH", status: "Good" },
        { name: "Tax Reserve", balance: "0.75 ETH", status: "Good" }
      ],
      timestamp: new Date().toISOString()
    }
  };
}

// Function to simulate updating employee information
async function updateEmployeeInfo(prompt, userId, entities = {}) {
  // In a real app, this would update employee records in your database
  const employee = entities.employee || 'all employees';
  console.log(`Updating information for: ${employee}`);
  
  return {
    success: true,
    message: "I've updated the employee information as requested. All records are now up to date.",
    action: "update_employee_info",
    data: {
      updatedEmployees: 3,
      timestamp: new Date().toISOString()
    }
  };
}

// Function to simulate generating reports
async function generateReports(prompt, userId, entities = {}) {
  // In a real app, this would generate actual financial reports
  const reportType = entities.reportType || 'monthly';
  console.log(`Generating ${reportType} reports`);
  
  return {
    success: true,
    message: `I've generated the requested ${reportType} reports. You can view them in your reports section.`,
    action: "generate_reports",
    data: {
      reportType: reportType,
      reportCount: 3,
      reports: [
        { name: "Payroll Summary", url: "/reports/payroll-summary" },
        { name: "Tax Withholdings", url: "/reports/tax-withholdings" },
        { name: "Employee Benefits", url: "/reports/employee-benefits" }
      ],
      timestamp: new Date().toISOString()
    }
  };
}

// Function to simulate tax calculations
async function calculateTaxes(prompt, userId, entities = {}) {
  // In a real app, this would perform actual tax calculations
  const period = entities.period || 'quarter';
  console.log(`Calculating taxes for period: ${period}`);
  
  return {
    success: true,
    message: `I've performed the tax calculations for this ${period}. The results have been saved.`,
    action: "calculate_taxes",
    data: {
      period: period,
      totalTaxes: 0.42,
      breakdown: {
        federalTax: 0.25,
        stateTax: 0.12,
        localTax: 0.05
      },
      timestamp: new Date().toISOString()
    }
  };
}

module.exports = router; 