import React, { useState, useEffect, useRef } from 'react';
import { CChartLine } from '@coreui/react-chartjs';
import { getStyle } from '@coreui/utils';
import { useSelector } from 'react-redux';
import { sessionToken } from "../../../redux/slicer/sessionSlicer";

const TransactionChart = () => {
  const sessionTokens = useSelector(sessionToken);
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef(null);

  // Handle color scheme changes
  useEffect(() => {
    document.documentElement.addEventListener('ColorSchemeChange', () => {
      if (chartRef.current) {
        setTimeout(() => {
          chartRef.current.options.scales.x.grid.borderColor = getStyle('--cui-border-color-translucent');
          chartRef.current.options.scales.x.grid.color = getStyle('--cui-border-color-translucent');
          chartRef.current.options.scales.x.ticks.color = getStyle('--cui-body-color');
          chartRef.current.options.scales.y.grid.borderColor = getStyle('--cui-border-color-translucent');
          chartRef.current.options.scales.y.grid.color = getStyle('--cui-border-color-translucent');
          chartRef.current.options.scales.y.ticks.color = getStyle('--cui-body-color');
          chartRef.current.update();
        });
      }
    });
  }, [chartRef]);

  // Fetch data
  useEffect(() => {
    const token = sessionTokens;

    if (!token) {
      console.error("Token not found");
      return;
    }

    fetch('http://localhost:8080/dashboard/transaction-chart', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
    .then(response => response.json())
    .then(data => {
      if (data.status && data.data) {
        const results = data.data;

        // Group data by category
        const categories = { 'Flat Glass': [], 'Automotive Glass': [] };

        results.forEach((row) => {
          if (row.CATEGORY_NAME === 'Flat Glass') {
            categories['Flat Glass'].push({
              date: row.transaction_date,
              total_subtotal: row.total_subtotal,
            });
          } else if (row.CATEGORY_NAME === 'Automotive Glass') {
            categories['Automotive Glass'].push({
              date: row.transaction_date,
              total_subtotal: row.total_subtotal,
            });
          }
        });

        // Get unique dates from both categories and sort them
        const uniqueDates = [
          ...new Set([
            ...categories['Flat Glass'].map(item => item.date),
            ...categories['Automotive Glass'].map(item => item.date),
          ]),
        ].sort((a, b) => new Date(a) - new Date(b));

        // Prepare data for both categories
        const flatGlassSubtotal = uniqueDates.map(date => {
          const item = categories['Flat Glass'].find(item => item.date === date);
          return item ? item.total_subtotal : 0;
        });

        const autoGlassSubtotal = uniqueDates.map(date => {
          const item = categories['Automotive Glass'].find(item => item.date === date);
          return item ? item.total_subtotal : 0;
        });

        // Calculate combined total per day
        const combinedTotal = uniqueDates.map((date, index) => {
          return flatGlassSubtotal[index] + autoGlassSubtotal[index];
        });

        // Format dates for display
        const formattedDates = uniqueDates.map(date => {
          const d = new Date(date);
          return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        });

        setChartData({
          labels: formattedDates,
          datasets: [
            {
              label: 'Flat Glass - Sales',
              backgroundColor: `rgba(${getStyle('--cui-info-rgb') || '59, 149, 205'}, .1)`,
              borderColor: getStyle('--cui-info') || '#3e95cd',
              pointHoverBackgroundColor: getStyle('--cui-info') || '#3e95cd',
              borderWidth: 2,
              data: flatGlassSubtotal,
              tension: 0.4,
              fill: true,
            },
            {
              label: 'Automotive Glass - Sales',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-success') || '#8e5ea2',
              pointHoverBackgroundColor: getStyle('--cui-success') || '#8e5ea2',
              borderWidth: 2,
              data: autoGlassSubtotal,
              tension: 0.4,
            },
            {
              label: 'Total Sales',
              backgroundColor: 'transparent',
              borderColor: getStyle('--cui-danger') || '#dc3545',
              pointHoverBackgroundColor: getStyle('--cui-danger') || '#dc3545',
              borderWidth: 1,
              borderDash: [8, 5],
              data: combinedTotal,
              tension: 0.4,
            }
          ]
        });
        setIsLoading(false);
      } else {
        console.error("No data available for categories.");
        setIsLoading(false);
      }
    })
    .catch(error => {
      console.error('Error fetching chart data:', error);
      setIsLoading(false);
    });
  }, [sessionTokens]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!chartData) {
    return <div>No data available</div>;
  }

  // Format currency
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('id-ID', {
      style: 'currency',
      currency: 'IDR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <div>
      <h2>Daily Sales by Category</h2>
      <CChartLine
        ref={chartRef}
        style={{ height: '300px', marginTop: '20px' }}
        data={chartData}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'top',
            },
            tooltip: {
              mode: 'index',
              intersect: false,
              callbacks: {
                label: function(context) {
                  let label = context.dataset.label || '';
                  if (label) {
                    label += ': ';
                  }
                  if (context.parsed.y !== null) {
                    label += formatCurrency(context.parsed.y);
                  }
                  return label;
                }
              }
            },
          },
          scales: {
            x: {
              grid: {
                color: getStyle('--cui-border-color-translucent'),
                drawOnChartArea: false,
              },
              ticks: {
                color: getStyle('--cui-body-color'),
              },
            },
            y: {
              beginAtZero: true,
              border: {
                color: getStyle('--cui-border-color-translucent'),
              },
              grid: {
                color: getStyle('--cui-border-color-translucent'),
              },
              ticks: {
                color: getStyle('--cui-body-color'),
                maxTicksLimit: 5,
                callback: function(value) {
                  return formatCurrency(value);
                }
              },
            },
          },
          elements: {
            line: {
              tension: 0.4,
            },
            point: {
              radius: 0,
              hitRadius: 10,
              hoverRadius: 4,
              hoverBorderWidth: 3,
            },
          },
        }}
      />
    </div>
  );
};

export default TransactionChart;