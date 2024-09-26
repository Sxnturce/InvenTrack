import { Line } from "react-chartjs-2";
import {
	Chart as ChartJS,
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler,
} from "chart.js";

ChartJS.register(
	CategoryScale,
	LinearScale,
	PointElement,
	LineElement,
	Title,
	Tooltip,
	Legend,
	Filler
);

const meses = [
	"Enero",
	"Febrero",
	"Marzo",
	"Abril",
	"Mayo",
	"Junio",
	"Julio",
	"Agosto",
	"Septiembre",
	"Octubre",
	"Noviembre",
	"Diciembre",
];

// Datos ficticios de ventas totales por mes
const ventasTotales = [
	5000, 6200, 4800, 7000, 5600, 6800, 7500, 6100, 7200, 8000, 7700, 6900,
];

const myGraphic = {
	labels: meses,
	datasets: [
		{
			label: "Ventas Totales (en S/.)",
			data: ventasTotales,
			tension: 0.4,
			fill: true,
			borderColor: "rgb(54, 162, 235)",
			backgroundColor: "rgba(54, 162, 235, 0.5)",
			pointRadius: 5,
			pointBorderColor: "rgba(54, 162, 235)",
			pointBackgroundColor: "rgba(54, 162, 235)",
		},
	],
};

const myOptions = {
	maintainAspectRatio: false,
	scales: {
		y: {
			min: 0,
			title: {
				display: true,
				text: "Ventas S/.", // Etiqueta para el eje Y
			},
		},
		x: {
			title: {
				display: true,
				text: "Meses", // Etiqueta para el eje X
			},
		},
	},
	plugins: {
		legend: {
			display: true,
		},
		title: {
			display: true,
			text: "Ventas Mensuales", // Título del gráfico
		},
	},
};

const LineChart = () => {
	return (
		<Line data={myGraphic} options={myOptions} width={"100%"} height={"100%"} />
	);
};

export default LineChart;
