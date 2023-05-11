import { Chart, ChartConfiguration } from "chart.js";
import { useEffect, useRef } from "react";
import styles from "./SubmitChart.module.css";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useDispatch } from "react-redux";
import { socketActions } from "store/webSocket";
import { useSelector } from "react-redux";
import { RootState } from "store";

const SubmitChart = (props: { myData: number[] }) => {
  // const myData = useSelector((state: RootState) => {state.socket.})
  const { myData } = props;
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(socketActions.sendRequest());
  // }, []);

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);

  // 커스텀을 위한 chartjs-plugin-datalabels 플러그인 사용.
  Chart.register(ChartDataLabels);

  const chartConfig: ChartConfiguration = {
    type: "bar",
    data: {
      labels: myData, // label은 보여주지 않지만 canvas 너비 사이즈를 위해 라벨 갯수를 맞춰야함.
      datasets: [
        {
          label: "# of Votes",
          data: myData,
          borderWidth: 1,
          backgroundColor: ["#F75555", "#1BD392", "#FF981F", "#3779FF"],
          borderRadius: 20,
        },
      ],
    },
    options: {
      scales: {
        x: {
          display: false,
        },
        y: {
          display: false,
        },
      },
      // 애니메이션 속도 설정
      animation: {
        duration: 1500,
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          enabled: false,
        },
        // datalables plugin 세부설정
        datalabels: {
          anchor: "start",
          align: "end",
          color: "#ffff",
          font: {
            family: "GodoM",
            size: 20,
          },
          formatter: (value: number) => value + "명",
        },
      },
    },
  };

  useEffect(() => {
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (chartRef.current) {
      // chartRef.current가 null이 아닐 때만 생성자 호출
      chartInstanceRef.current = new Chart(chartRef.current, chartConfig);
    }
  }, []);

  return (
    <div className={styles.container}>
      <canvas ref={chartRef} className={styles.x} />
    </div>
  );
};

export default SubmitChart;
