'use client';

import { getPeopleBetweenDates } from '@/config/drizzle-people';
import { useEffect, useState } from 'react';
import { Bar } from 'react-chartjs-2';
import 'chart.js/auto';

const today = new Date();

const legendPlugin = {
  id: 'custom-legend',
  afterDraw: (chart: any) => {
    const { ctx, chartArea: { top }, scales: { x, y } } = chart;
    const labels = chart.data.labels;
    const datasets = chart.data.datasets;

    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'bottom';
    ctx.font = '12px Arial';

    datasets.forEach((dataset: any) => {
      dataset.data.forEach((value: any, index: number) => {
        const barX = x.getPixelForValue(labels[index]);
        const barY = y.getPixelForValue(value);

        ctx.fillText(value.toString(), barX, barY + 10);
      });
    });

    ctx.restore();
  }
};

const ReportPage = () => {
  const [dates, setDates] = useState<[Date, Date]>([
    new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1),
    today,
  ]);
  const [data, setData] = useState({ males: 0, females: 0, others: 0 });
  const [filters, setFilters] = useState({
    hasAddiction: 'all', //yes, no, all
    hasDocument: 'all', //yes, no, all
    hasDeficiency: 'all', //yes, no, all
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await getPeopleBetweenDates(dates[0], dates[1]);
        const filteredData = response.filter(person => {
          const addictionMatch =
            filters.hasAddiction === 'all' ||
            (filters.hasAddiction === 'yes' && person.addiction) ||
            (filters.hasAddiction === 'no' && !person.addiction);

          const documentMatch =
            filters.hasDocument === 'all' ||
            (filters.hasDocument === 'yes' && person.document) ||
            (filters.hasDocument === 'no' && !person.document);

          const deficiencyMatch =
            filters.hasDeficiency === 'all' ||
            (filters.hasDeficiency === 'yes' && person.deficiency) ||
            (filters.hasDeficiency === 'no' && !person.deficiency);

          return addictionMatch && documentMatch && deficiencyMatch;
        });

        const males = filteredData.filter(person => person.gender === 'M').length;
        const females = filteredData.filter(person => person.gender === 'F').length;
        const others = filteredData.filter(person => person.gender === 'O').length;

        setData({ males, females, others });
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchData();
  }, [dates, filters]);

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newDates = [...dates];
    newDates[index] = new Date(event.target.value);
    setDates(newDates as [Date, Date]);
  };

  const handleFilterChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFilters(prevFilters => ({ ...prevFilters, [name]: value }));
  };

  const chartData = {
    labels: ['Homens', 'Mulheres', 'Outros'],
    datasets: [
      {
        label: 'Quantidade',
        data: [data.males, data.females, data.others],
        backgroundColor: ['#36A2EB', '#FF6384', '#FFCE56'],
      },
    ],
  };

  return (
    <div className='mx-auto flex w-2/3 flex-col items-center justify-center bg-white'>
      <div className='mb-4'>
        <label>
          Data Início:
          <input
            type='date'
            value={dates[0].toISOString().substring(0, 10)}
            onChange={(event) => handleDateChange(event, 0)}
          />
        </label>
        <label>
          Data Fim:
          <input
            type='date'
            value={dates[1].toISOString().substring(0, 10)}
            onChange={(event) => handleDateChange(event, 1)}
          />
        </label>
        <div>
          <label>
            Vício:
            <select name='hasAddiction' value={filters.hasAddiction} onChange={handleFilterChange}>
              <option value='all'>Ambos</option>
              <option value='yes'>Sim</option>
              <option value='no'>Não</option>
            </select>
          </label>
          <label>
            Documento:
            <select name='hasDocument' value={filters.hasDocument} onChange={handleFilterChange}>
              <option value='all'>Ambos</option>
              <option value='yes'>Sim</option>
              <option value='no'>Não</option>
            </select>
          </label>
          <label>
            Deficiência:
            <select name='hasDeficiency' value={filters.hasDeficiency} onChange={handleFilterChange}>
              <option value='all'>Ambos</option>
              <option value='yes'>Sim</option>
              <option value='no'>Não</option>
            </select>
          </label>
        </div>
      </div>
      <Bar data={chartData} plugins={[legendPlugin]} />
    </div>
  );
};

export default ReportPage;
