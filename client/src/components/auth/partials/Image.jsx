function Image({ img, contain }) {
	return (
		<>
			<div className="bg-gray-50 p-4 lg:p-10 rounded select-auto lg:select-none flex items-center justify-center">
				<img
					src={img}
					alt="login-img"
					className={`w-full max-w-[350px] lg:max-w-none h-auto lg:h-[500px] mx-auto ${
						contain && "object-contain"
					}`}
				/>
			</div>
		</>
	);
}

export default Image;
