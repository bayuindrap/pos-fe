import React, { useState, useEffect, useRef } from 'react';
import { CChartBar } from '@coreui/react-chartjs';
import { useSelector } from 'react-redux';
import { sessionToken } from "../../../redux/slicer/sessionSlicer";
import { getStyle } from '@coreui/utils';

const SalesPerProductChart = () => {
  const sessionTokens = useSelector(sessionToken);
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const chartRef = useRef(null);

  useEffect(() => {
    const token = sessionTokens;

    if (!token) {
      console.error("Token not found");
      return;
    }

    fetch('http://localhost:8080/dashboard/sales-per-product', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    })
      .then(response => response.json())
      .then(data => {
        if (data.status && data.data) {
          const results = data.data;

          const productNames = results.map(row => row.product_name);
          const totalSales = results.map(row => row.total_sales);
          const totalQuantities = results.map(row => row.total_quantity);

          setChartData({
            labels: productNames,
            datasets: [
              {
                label: 'Total Sales (IDR)',
                backgroundColor: `rgba(${getStyle('--cui-info-rgb') || '59, 149, 205'}, .6)`,
                borderColor: getStyle('--cui-info') || '#3e95cd',
                borderWidth: 2,
                data: totalSales,
                tension: 0.4,
                fill: true,
              },
              {
                label: 'Total Quantity Sold',
                backgroundColor: `rgba(${getStyle('--cui-success-rgb') || '92, 184, 92'}, .6)`,
                borderColor: getStyle('--cui-success') || '#5cb85c',
                borderWidth: 2,
                data: totalQuantities,
                tension: 0.4,
                fill: true,
              }
            ]
          });
          setIsLoading(false);
        } else {
          console.error("No data available for products.");
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
      <h2>Sales Per Product</h2>
      <CChartBar
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
            bar: {
              tension: 0.4,
            },
          },
        }}
      />
    </div>
  );
};

export default SalesPerProductChart;
