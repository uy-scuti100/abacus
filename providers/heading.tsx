interface HeadingProps {
	title: string;
	description: string;
}
const Heading: React.FC<HeadingProps> = ({ title, description }) => {
	return (
		<div className="flex flex-col gap-1 pb-4">
			<h2 className="text-[2rem] md:text-3xl font-semibold tracking-tight font-mont">
				{title}
			</h2>
			<p className=" text-xs sm:text-sm text-muted-foreground font-mont w-[250px]">
				{description}
			</p>
		</div>
	);
};
export default Heading;
