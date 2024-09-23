function Button({ value }) {
	return (
		<>
			<input
				type="submit"
				value={value}
				className="button-pushed cursor-pointer bg-color-main text-white font-bold p-2 rounded-sm"
			/>
		</>
	);
}

export default Button;
