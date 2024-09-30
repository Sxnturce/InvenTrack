function LoadingComponent() {
	return (
		<div className="flex flex-row gap-2 w-full h-full justify-center items-center">
			<div className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:.7s]"></div>
			<div className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:.3s]"></div>
			<div className="w-4 h-4 rounded-full bg-black animate-bounce [animation-delay:.7s]"></div>
		</div>
	);
}

export default LoadingComponent;
