const StatusBadge = ({ status, children }) => {
  const getStatusClass = (status) => {
    switch (status) {
      case 'active':
      case 'current':
      case 'available':
      case 'returned':
        return 'status-active';
      case 'overdue':
      case 'critical':
        return 'status-overdue';
      case 'due':
      case 'due_soon':
      case 'warning':
        return 'status-due';
      case 'issued':
      case 'new':
        return 'status-current';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <span className={`status-badge ${getStatusClass(status)}`}>
      {children}
    </span>
  );
};

export default StatusBadge;