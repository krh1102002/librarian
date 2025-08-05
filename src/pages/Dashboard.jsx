import { Link } from 'react-router-dom';
import Layout from '../components/Layout/Layout';
import StatCard from '../components/Common/StatCard';
import { libraryStats } from '../data/mockData';

const Dashboard = () => {
  const quickActions = [
    { title: 'Issue Book', description: 'Issue book to member', link: '/issue-book', color: 'btn-blue' },
    { title: 'Return Book', description: 'Process book return', link: '/return-book', color: 'btn-green' },
    { title: 'Collect Payment', description: 'Monthly fees & fines', link: '/collect-payment', color: 'btn-blue' },
    { title: 'Add New Book', description: 'Register new title', link: '/add-book', color: 'btn-primary' },
    { title: 'Add Member', description: 'Register new user', link: '/add-member', color: 'btn-primary' },
    { title: 'Overdue Books', description: 'View late returns', link: '/overdue-books', color: 'btn-red' }
  ];

  const recentActivities = [
    { time: '10:45 AM', text: 'Collected ₹500 monthly fee from John Doe (ID: 1234)' },
    { time: '10:30 AM', text: 'Issued "Clean Code" to Member #1087' },
    { time: '10:15 AM', text: 'Processed return: "JavaScript: The Good Parts" with ₹10 fine' },
    { time: '09:45 AM', text: 'Added new book: "Design Patterns" (5 copies)' },
    { time: '09:30 AM', text: 'Registered new member: Alice Smith' }
  ];

  const pendingTasks = [
    { title: 'Collect overdue fines', meta: '3 books, ₹85 total', priority: 'high' },
    { title: 'Follow up on unpaid fees', meta: '5 members', priority: 'medium' },
    { title: 'Organize Rack 3', meta: 'Programming section', priority: 'low' },
    { title: 'Update book catalog', meta: '12 new additions', priority: 'low' }
  ];

  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high': return 'bg-red-100 text-red-800';
      case 'medium': return 'bg-yellow-100 text-yellow-800';
      case 'low': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <Layout>
      {/* Welcome Section */}
      <div className="card p-8 mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Welcome Back, Sarah!</h1>
        <p className="text-xl text-gray-600">Here's your library overview for today, August 3rd, 2025</p>
      </div>

      {/* Alerts */}
      <div className="space-y-4 mb-8">
        <div className="bg-red-50 border border-red-200 text-red-800 px-4 py-3 rounded-lg flex items-center space-x-3">
          <span className="text-lg font-bold">🚨</span>
          <div>
            <strong>Urgent:</strong> 3 books are overdue and need immediate attention for fine collection.
          </div>
        </div>
        <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 px-4 py-3 rounded-lg flex items-center space-x-3">
          <span className="text-lg font-bold">⚠️</span>
          <div>
            <strong>Notice:</strong> 5 members have unpaid monthly fees due today.
          </div>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mb-8">
        <StatCard 
          title="Total Books" 
          value={libraryStats.totalBooks} 
          subtitle="+12 added this month" 
        />
        <StatCard 
          title="Currently Issued" 
          value={libraryStats.currentlyIssued} 
          subtitle="15 due this week" 
          color="blue"
        />
        <StatCard 
          title="Available Copies" 
          value={libraryStats.availableCopies} 
          subtitle="Ready for issue" 
          color="green"
        />
        <StatCard 
          title="Overdue Books" 
          value={libraryStats.overdueBooks} 
          subtitle="Need immediate action" 
          color="red"
        />
        <StatCard 
          title="Active Members" 
          value={libraryStats.activeMembers} 
          subtitle="2 new this week" 
        />
        <StatCard 
          title="Today's Collections" 
          value="₹2,850" 
          subtitle="Fees + Fines" 
          color="green"
        />
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid lg:grid-cols-3 gap-8">
        {/* Main Panel */}
        <div className="lg:col-span-2 space-y-8">
          {/* Quick Actions */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              Quick Actions
            </h2>
            <div className="grid md:grid-cols-3 gap-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  to={action.link}
                  className="p-4 border-2 border-gray-200 rounded-lg text-center hover:border-gray-800 hover:bg-gray-50 transition-all"
                >
                  <h3 className="font-semibold text-gray-800 mb-2">{action.title}</h3>
                  <p className="text-sm text-gray-600">{action.description}</p>
                </Link>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              Recent Activity
            </h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex space-x-4 py-3 border-b border-gray-100 last:border-b-0">
                  <div className="text-sm text-gray-500 min-w-16">{activity.time}</div>
                  <div className="text-sm text-gray-800">{activity.text}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar Panel */}
        <div className="space-y-6">
          {/* Pending Tasks */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              Pending Tasks
            </h2>
            <div className="space-y-4">
              {pendingTasks.map((task, index) => (
                <div key={index} className="flex justify-between items-center py-3 border-b border-gray-100 last:border-b-0">
                  <div>
                    <div className="font-medium text-gray-800">{task.title}</div>
                    <div className="text-sm text-gray-500">{task.meta}</div>
                  </div>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium uppercase ${getPriorityClass(task.priority)}`}>
                    {task.priority}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="card p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6 pb-2 border-b border-gray-200">
              Quick Stats
            </h2>
            <div className="space-y-4">
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Books Due Today:</span>
                <strong className="text-gray-800">7</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Payment Due:</span>
                <strong className="text-yellow-600">5 members</strong>
              </div>
              <div className="flex justify-between py-2 border-b border-gray-100">
                <span className="text-gray-600">Total Fines:</span>
                <strong className="text-red-600">₹85</strong>
              </div>
              <div className="flex justify-between py-2">
                <span className="text-gray-600">Available Books:</span>
                <strong className="text-green-600">158</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;