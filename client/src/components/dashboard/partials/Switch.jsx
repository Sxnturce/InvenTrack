function Switch({ event }) {
	return (
		<label
			className="relative inline-block h-6 w-14 cursor-pointer rounded-full bg-neutral-200 transition [-webkit-tap-highlight-color:_transparent] has-[:checked]:bg-gray-500"
			onChange={event}
		>
			<input className="peer sr-only" id="sidebar" type="checkbox" />
			<span className="absolute inset-y-0 start-0 m-1 size-4 rounded-full bg-gray-300 ring-[6px] ring-inset ring-white transition-all peer-checked:start-8 peer-checked:w-2 peer-checked:bg-white peer-checked:ring-transparent"></span>
		</label>
	);
}

export default Switch;
