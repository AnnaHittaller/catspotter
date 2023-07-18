import { CatPatternBicolor, CatPatternBicolorTabby, CatPatternCalico, CatPatternPointed, CatPatternSolid, CatPatternTabby, CatPatternTortoiseshell, CatPatternTuxedo, CatPatternVan} from "../components/CatSilhouettes";


export const getCatSvgComponent = (
	pattern,
	mainColor,
	secondaryColor,
	tertiaryColor
) => {

	 const defaultColors = {
			beige: "#e4cca7",
			grey: "#a6acb4",
			orange: "#e38120",
			brown: "#7a5c40",
			// Add more default colors as needed
		};

    const svgProps = {
			mainColor: defaultColors[mainColor] || mainColor,
			secondaryColor: defaultColors[secondaryColor] || secondaryColor,
			tertiaryColor: defaultColors[tertiaryColor] || tertiaryColor,
		}; 
 
	switch (pattern) {
		case "solid":
			return <CatPatternSolid {...svgProps} />;
		case "tabby":
			return <CatPatternTabby {...svgProps} />;
		case "bicolor":
			svgProps.mainColor = "white";
			return <CatPatternBicolor {...svgProps} />;
		case "tuxedo":
			svgProps.mainColor = "white";
			return <CatPatternTuxedo {...svgProps} />;
		case "bicolorTabby":
			svgProps.mainColor = "white";
			return <CatPatternBicolorTabby {...svgProps} />;
		case "van":
			svgProps.mainColor = "white";
			return <CatPatternVan {...svgProps} />;
		case "tortoiseshell":
			svgProps.mainColor = "#e38120";
			svgProps.secondaryColor = "black";
			return <CatPatternTortoiseshell {...svgProps} />;
		case "calico":
			svgProps.mainColor = "white";
			svgProps.secondaryColor = "#e38120";
			svgProps.tertiaryColor = "black";
			return <CatPatternCalico {...svgProps} />;
		case "pointed":
			return <CatPatternPointed {...svgProps} />;
		default:
			return null;
	}
};

// use it like this:
//  const svgComponent = getCatSvgComponent(cat.pattern, selectedColor, selectedSecondaryColor, selectedTertiaryColor);
//  {svgComponent}