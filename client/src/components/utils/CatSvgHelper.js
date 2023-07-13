import { CatPatternBicolor, CatPatternBicolorTabby, CatPatternCalico, CatPatternPointed, CatPatternSolid, CatPatternTabby, CatPatternTortoiseshell, CatPatternTuxedo, CatPatternVan} from "../CatSilhouettes";


export const getCatSvgComponent = (
	pattern,
	mainColor,
	secondaryColor,
	tertiaryColor
) => {

    const svgProps = {
        mainColor: mainColor,
        secondaryColor: secondaryColor,
        tertiaryColor: tertiaryColor,
	}; 
 
	switch (pattern) {
		case "bicolor":
			return <CatPatternBicolor {...svgProps} />;
		case "solid":
			return <CatPatternSolid {...svgProps} />;
		case "tabby":
			return <CatPatternTabby {...svgProps} />;
		case "bicolor":
			return <CatPatternBicolor {...svgProps} />;
		case "tuxedo":
			return <CatPatternTuxedo {...svgProps} />;
		case "bicolor":
			return <CatPatternBicolor {...svgProps} />;
		case "bicolorTabby":
			return <CatPatternBicolorTabby {...svgProps} />;
		case "van":
			return <CatPatternVan {...svgProps} />;
		case "tortoiseshell":
			return <CatPatternTortoiseshell {...svgProps} />;
		case "calico":
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