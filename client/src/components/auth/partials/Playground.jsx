import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

function Playground({ text }) {
	return (
		<>
			<button
				className={`button-pushed w-full p-2 bg-[#24292e] flex justify-center  gap-4 text-white font-semibold rounded`}
			>
				<FontAwesomeIcon icon={faGithub} className="text-[1.6rem]" />
				{text}
			</button>
		</>
	);
}

export default Playground;
