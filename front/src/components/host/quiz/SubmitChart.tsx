import styles from "./SubmitChart.module.css";
import { Bar } from "react-chartjs-2";
import { TooltipItem } from "chart.js";
import { Chart } from "chart.js";

interface MyChartData {
  labels: string[];
  datasets: {
    label: string;
    data: number[];
    backgroundColor: string[];
    borderWidth: number;
  }[];
}

const data: MyChartData = {
  labels: ["January", "February", "March", "April"],
  datasets: [
    {
      label: "My Dataset",
      data: [10, 20, 30, 40],
      backgroundColor: ["#F75555", "#1BD392","#FF981F","#3779FF"],
      borderWidth: 1,
    },
  ],
};

Chart.defaults.set('plugins.datalabels', {
  color: '#ffffff'
});

const options = {
  scales: {
    x: {
       display: false,
    },
    y: {
       display: false,
    }
 },
  plugins: {
    legend: {
      display: false, // 범례 사용 안 함
    },
    tooltip: {
      enabled: false, // 기존 툴팁 사용 안 함
      // callbacks: {
      //   label: function (context: TooltipItem<"bar">) {
      //     let label = context.dataset.label || "";
      //     console.log(context.parsed.y);
      //     if (label) {
      //       label += ": ";
      //     }
      //     if (context.parsed.y !== null) {
      //       label += context.parsed.y;
      //     }

      //     // 사용 예시: context 객체 내부의 값 읽어오기
      //     const tooltipData = context.chart.data.datasets[context.datasetIndex].data[context.dataIndex];
      //     console.log("Tooltip data:", tooltipData);
      //     return label;
      //   },
      // },
    },
    datalabels: {
      color: 'black',
            anchor: 'end',
            clamp: true,
            clip: true,
            align: '-135',
            offset: 1,
            formatter: function (value : number, context : number){
                let result = value + '명'
                return result
            },
            display: function(context: { dataIndex: number; }) {
              // if (data.datasets[0].data[context.dataIndex] === Math.max(...data.datasets[0].data) {
              //   return 1 } else {
              //   return 0
              // }
            }
    }
  },
};

const SubmitChart = () => {
  return <Bar data={data} options={options} />;
};
export default SubmitChart;
