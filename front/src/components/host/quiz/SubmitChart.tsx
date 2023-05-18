import { Chart, ChartConfiguration } from "chart.js";
import { useEffect, useRef } from "react";
import styles from "./SubmitChart.module.css";
import ChartDataLabels from "chartjs-plugin-datalabels";
import { useSelector } from "react-redux";
import { RootState } from "store";
import { SubmitAnswerResult } from "models/quiz";

const dataProcess = (props: SubmitAnswerResult[]) => {
  if (props.length >= 1) {
    if (
      props[0].answer === "one" ||
      props[0].answer === "two" ||
      props[0].answer === "three" ||
      props[0].answer === "four"
    ) {
      const resultArray = [0, 0, 0, 0];
      props.forEach((q) => {
        if (q.answer === "one") {
          resultArray[0] = q.count || 0;
        }
        if (q.answer === "two") {
          resultArray[1] = q.count || 0;
        }
        if (q.answer === "three") {
          resultArray[2] = q.count || 0;
        }
        if (q.answer === "four") {
          resultArray[3] = q.count || 0;
        }
      });

      return resultArray;
    } else if (props[0].answer === "o" || props[0].answer === "x") {
      const resultArray = [0, 0];
      props.forEach((q) => {
        q.answer === "o" && (resultArray[0] = q.count || 0);
        q.answer === "x" && (resultArray[1] = q.count || 0);
      });

      return resultArray;
    }
  }
};

const SubmitChart = () => {
  const result = useSelector((state: RootState) => state.socket.getSubmitAnswerResult);
  const data = dataProcess(result!);
  console.log("data:", data);

  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<Chart | null>(null);
  const backgroundColorArray =
    data?.length === 2 ? ["#1BD392", "#F75555"] : ["#F75555", "#1BD392", "#FF981F", "#3779FF"];

  // 커스텀을 위한 chartjs-plugin-datalabels 플러그인 사용.
  Chart.register(ChartDataLabels);

  const chartConfig: ChartConfiguration = {
    type: "bar",
    data: {
      labels: data, // label은 보여주지 않지만 canvas 너비 사이즈를 위해 라벨 갯수를 맞춰야함.
      datasets: [
        {
          label: "# of Votes",
          data: data!,
          borderWidth: 1,
          backgroundColor: backgroundColorArray,
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

  return <div className={styles.container}>{data && <canvas ref={chartRef} className={styles.x} />}</div>;
};

export default SubmitChart;
