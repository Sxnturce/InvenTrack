import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import logoInventory from "/inventoryLogo.webp";
import profilePhoto from "/profile.png";
import Options from "./partials/Options";
import { useState } from "react";

function Header({ children, change }) {
	const [active, setActive] = useState(false);
	return (
		<>
			<header className="w-full fixed top-0 flex justify-between z-10">
				<section
					className={`flex gap-8 items-center flex-shrink-0 flex-grow-1 basis-[250px] p-4 ${
						change ? "bg-gray-100 text-black" : " bg-color-main text-white"
					} `}
				>
					<div className="flex gap-2 items-center">
						<img
							src={logoInventory}
							alt="logo-invenTrack"
							className={`w-full max-w-9 ${change ? "invert-0" : "invert-[1]"}`}
						/>
						<h2 className="text-lg">
							Inven<span className="font-black">Track</span>
						</h2>
					</div>
					{children}
				</section>
				<div className="p-4 flex gap-6 items-center">
					<picture className="w-11 block rounded-full border-2 p-2">
						<img src={profilePhoto} alt="profile-photo" className="w-full" />
					</picture>
					<div className="flex gap-4 items-center px-2 relative z-10">
						<p className="select-none font-medium">Admin</p>
						<FontAwesomeIcon
							icon={!active ? faChevronDown : faChevronUp}
							onClick={() => {
								setActive(!active);
							}}
							className="text-gray-400 cursor-pointer text-sm"
						/>
						{active && <Options />}
					</div>
				</div>
			</header>
		</>
	);
}

export default Header;
