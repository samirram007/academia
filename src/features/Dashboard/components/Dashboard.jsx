
import { ArcElement, Chart as ChartJS, Legend, Tooltip } from 'chart.js';
import { Doughnut, Pie } from 'react-chartjs-2';

ChartJS.register(ArcElement, Tooltip, Legend);

const subjectsData = {
    labels: ['Math', 'English', 'Science', 'History'],
    datasets: [
        {
            label: 'Number of Students',
            data: [80, 60, 70, 40],
            backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(54, 162, 235, 0.2)',
                'rgba(255, 206, 86, 0.2)',
                'rgba(75, 192, 192, 0.2)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
            ],
            borderWidth: 1,
        },
    ],
};


const attendanceData = {
    labels: ['January', 'February', 'March'],
    datasets: [
        {
            label: 'Attendance',
            data: [80, 60, 70],
            backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(255, 255, 132, 0.8)', 'rgba(75, 192, 192, 0.2)'],
        }
    ]
};


const feesData = {
    labels: ['Term 1', 'Term 2'],
    datasets: [
        {
            label: 'Fees Collection',
            data: [30000, 25000],
            backgroundColor: ['rgba(255, 99, 132, 0.8)', 'rgba(255, 255, 132, 0.8)'],
        }
    ]
};

// ScoreData for LineChart

const scoresData = {
    labels: ['Term 1', 'Term 2', 'Term 3', 'Term 4', 'Term 5', 'Term 6', 'Term 7', 'Term 8', 'Term 9', 'Term 10'],
    datasets: [
        {
            label: 'Scores',
            data: [80, 60, 70, 40, 60, 70, 40, 60, 70, 40],
            backgroundColor: [
                'rgba(255, 99, 132, 0.8)',
            ],
        }
    ]

};


const Dashboard = () => {
    return (
        <div className='w-full h-full overflow-scroll'>
            {/* <QuickAccess/> */}
            <div className='grid grid-cols-8 gap-5'>
                <div className='col-span-2'>
                    <h2>Students per Subject</h2>
                    <Pie data={subjectsData} />
                </div>
                <div className='col-span-2'>
                    <h2>Monthly Attendance</h2>
                    <Pie data={attendanceData} />
                </div>

                <div className='col-span-2'>
                    <h2>Fees Collection</h2>
                    <Doughnut data={feesData} />
                </div>

                <div className='col-span-2'>
                    <h2>Test Scores</h2>
                    <Pie data={scoresData} />
                </div>


            </div>
        </div>
    );
};


export default Dashboard;


