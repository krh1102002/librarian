const StatCard = ({ title, value, subtitle, trend, color = "gray" }) => {
  const getColorClasses = (color) => {
    switch (color) {
      case 'blue':
        return 'text-blue-600';
      case 'green':
        return 'text-green-600';
      case 'red':
        return 'text-red-600';
      case 'yellow':
        return 'text-yellow-600';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div className="card p-6 text-center hover:shadow-xl transition-shadow">
      <div className={`text-3xl font-bold mb-2 ${getColorClasses(color)}`}>
        {value}
      </div>
      <div className="text-gray-600 text-sm uppercase tracking-wide mb-1">
        {title}
      </div>
      {subtitle && (
        <div className="text-xs text-gray-500">{subtitle}</div>
      )}
      {trend && (
        <div className={`text-xs mt-1 ${trend.positive ? 'text-green-600' : 'text-red-600'}`}>
          {trend.text}
        </div>
      )}
    </div>
  );
};

export default StatCard;