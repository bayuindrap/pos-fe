import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';
import { useSelector } from 'react-redux'
import { sessionSelector, sessionToken } from "../../../redux/slicer/sessionSlicer";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

const TransactionChart = () => {
  const sessionTokens = useSelector(sessionToken);
  const [chartData, setChartData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const token = sessionTokens; // Mengambil token dari session atau state Anda

    if (!token) {
      console.error("Token not found");
      return;
    }

    fetch('http://localhost:8080/dashboard/transaction-chart', {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`, // Menggunakan token yang sudah disimpan
      },
    })
    .then(response => response.json())
    .then(data => {
      // Menangani data yang diterima dan pastikan data valid
      if (data.status && data.data) {
        const results = data.data;

        // Membagi data berdasarkan kategori
        const categories = { 'Flat Glass': [], 'Automotive Glass': [] };

        results.forEach((row) => {
          if (row.CATEGORY_NAME === 'Flat Glass') {
            categories['Flat Glass'].push({
              date: row.transaction_date,
              total_quantity: row.total_quantity,
              total_subtotal: row.total_subtotal,
            });
          } else if (row.CATEGORY_NAME === 'Automotive Glass') {
            categories['Automotive Glass'].push({
              date: row.transaction_date,
              total_quantity: row.total_quantity,
              total_subtotal: row.total_subtotal,
            });
          }
        });

        // Pastikan data tidak kosong untuk kedua kategori
        const chartData = {
          labels: [
            ...new Set([
              ...categories['Flat Glass'].map(item => item.date),
              ...categories['Automotive Glass'].map(item => item.date),
            ]),
          ], // Mendapatkan tanggal yang unik dari kedua kategori
          datasets: [
            {
              label: 'Flat Glass - Quantity',
              data: categories['Flat Glass'].map(item => item.total_quantity),
              borderColor: '#3e95cd',
              fill: false,
            },
            {
              label: 'Flat Glass - Subtotal',
              data: categories['Flat Glass'].map(item => item.total_subtotal),
              borderColor: '#3e95cd',
              fill: false,
              borderDash: [5, 5],
            },
            {
              label: 'Automotive Glass - Quantity',
              data: categories['Automotive Glass'].map(item => item.total_quantity),
              borderColor: '#8e5ea2',
              fill: false,
            },
            {
              label: 'Automotive Glass - Subtotal',
              data: categories['Automotive Glass'].map(item => item.total_subtotal),
              borderColor: '#8e5ea2',
              fill: false,
              borderDash: [5, 5],
            },
          ],
        };

        setChartData(chartData); // Set data chart ke state
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
  }, []); // Hanya dipanggil sekali saat mount

  if (isLoading) {
    return <div>Loading...</div>; // Menampilkan loading saat data sedang dimuat
  }

  if (!chartData) {
    return <div>No data available</div>; // Menampilkan pesan jika data tidak ditemukan
  }

  return (
    <div>
      <h2>Daily Transactions per Category</h2>
      <Line data={chartData} />
    </div>
  );
};

export default TransactionChart;
