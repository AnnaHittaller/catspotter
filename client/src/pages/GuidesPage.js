import { StyledPage } from "../styles/styled/Styled_Page";
import { StyledSection } from "../styles/styled/Styled_Section";
import {
	StyledPBig,
	StyledP,
	StyledSpan,
	StyledSpanBold,
} from "../styles/styled/Styled_Text";
import {
	StyledH2Underline,
	StyledH3,
	StyledH4Underline,
} from "../styles/styled/Styled_Title";
import {
	StyledDivBorder,
	StyledDivLabel,
	StyledDivSimple,
	StyledDivSimpleGrid,
} from "../styles/styled/Styled_Div";
// import black from "../assets/colorSamples/black.png";
// import white from "../assets/colorSamples/white.png";
// import orange from "../assets/colorSamples/orange.png";
// import beige from "../assets/colorSamples/beige.png";
// import grey from "../assets/colorSamples/grey.png";
// import brown from "../assets/colorSamples/brown.png";
import {
	CatPatternBicolor,
	CatPatternBicolorTabby,
	CatPatternCalico,
	CatPatternPointed,
	CatPatternSolid,
	CatPatternTabby,
	CatPatternTortoiseshell,
	CatPatternTuxedo,
	CatPatternVan,
} from "../components/CatSilhouettes";

export default function GuidesPage() {
	return (
		<StyledPage>
			<StyledSection>
				<StyledH2Underline>Guides</StyledH2Underline>
				<StyledH3>Describing the cats correctly</StyledH3>
				<StyledPBig>
					This application serves the sole purpose of identifying cats seen on
					the street. As most times it is very difficult to give a precise
					description as for breed, sex, or even coat patterns, we are using
					simplified categories. This helps to be concise when matching
					infosheets in the database.
				</StyledPBig>
				<StyledDivBorder page="guides" border="mobile-none">
					<StyledH4Underline>1. Coat length</StyledH4Underline>
					<StyledP>
						<StyledSpanBold>Hairless: </StyledSpanBold>cats with no visible or
						very little hair. This can be either a natural condition for some
						cat breeds (like Siamese), or an effect of dermal problems.
					</StyledP>
					<StyledP>
						<StyledSpanBold>Short-haired: </StyledSpanBold> Short-haired: most
						of the common house cats belongs to this group. Think of the British
						Shorthair or Russian Blue breeds as an example.
					</StyledP>
					<StyledP>
						<StyledSpanBold>Long-haired: </StyledSpanBold>Long-haired: all cats
						with semi-long or long hair, like Norwegian Forest Cat, Persian, or
						Ragdoll.
					</StyledP>
				</StyledDivBorder>
				<StyledDivBorder page="guides" border="mobile-none">
					<StyledH4Underline>2. Coat pattern</StyledH4Underline>
					<StyledP>
						Please refer to the following illustrations. Try to choose a pattern
						which seems to be the most similar one to the cat you’re seeing. If
						in doubt (for example choosing the right two-colored variety), go
						with the broader category and choose bicolor instead of tuxedo for
						example.
					</StyledP>
					<StyledDivSimpleGrid padding="0" min="150px">
						<StyledDivLabel>
							<label>Solid</label>
							<CatPatternSolid />
							<p>
								Uniform color throughout the cat’s body, without any apparent
								markings or patterns.
							</p>
						</StyledDivLabel>
						<StyledDivLabel>
							<label>Bicolor</label>
							<CatPatternBicolor />
							<p>
								Usually predominantly white with patches of black, brown, cream
								or orange-colored fur.
							</p>
						</StyledDivLabel>
						<StyledDivLabel>
							<label>Tuxedo</label>
							<CatPatternTuxedo />
							<p>
								Black, brown or orange colored fur with white patches on the
								chest, belly and paws, sometimes on the face.
							</p>
						</StyledDivLabel>
						<StyledDivLabel>
							<label>Van</label>
							<CatPatternVan />
							<p>
								Predominantly white coat with a colored tail and sometimes with
								colored spots on the head.
							</p>
						</StyledDivLabel>
						<StyledDivLabel>
							<label>Pointed</label>
							<CatPatternPointed />
							<p>
								The face, ears, legs and tail are a darker color than the rest
								of the cat’s body.
							</p>
						</StyledDivLabel>
						<StyledDivLabel>
							<label>Tabby</label>
							<CatPatternTabby />
							<p>
								Very common pattern, with stripes or spots that run along the
								cat’s body.
							</p>
						</StyledDivLabel>
						<StyledDivLabel>
							<label>Bicolor tabby</label>
							<CatPatternBicolorTabby />
							<p>Tabby patterned coat usually with white patches.</p>
						</StyledDivLabel>
						<StyledDivLabel>
							<label>Tortoiseshell</label>
							<CatPatternTortoiseshell />
							<p>A mix of black and orange or cream-colored fur.</p>
						</StyledDivLabel>
						<StyledDivLabel>
							<label>Calico</label>
							<CatPatternCalico />
							<p>A mix of white, black and orange or cream-colored fur.</p>
						</StyledDivLabel>
					</StyledDivSimpleGrid>
				</StyledDivBorder>
				<StyledDivBorder page="guides" border="mobile-none">
					<StyledH4Underline>3. Coat color</StyledH4Underline>
					<StyledP>
						Cats can have a wide variety of fur colors, and you may not find
						here the one which looks exactly like the cat you are seeing. Try to
						choose the one which seems to be the most similar.
					</StyledP>
					<StyledDivSimpleGrid padding="0" min="110px" justifyitems="center">
						<StyledDivLabel max="170px">
							<label>Black</label>
							<img
								src="https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899490/catspotter-assets/black_ad4ue7.png"
								alt="black fur"
							/>
						</StyledDivLabel>
						<StyledDivLabel max="170px">
							<label>White</label>
							<img
								src="https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899490/catspotter-assets/white_wo7nva.png"
								alt="white fur"
							/>
						</StyledDivLabel>
						<StyledDivLabel max="170px">
							<label>Orange</label>
							<img
								src="https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899490/catspotter-assets/orange_bnn73i.png"
								alt="orange fur"
							/>
						</StyledDivLabel>
						<StyledDivLabel max="170px">
							<label>Beige</label>
							<img
								src="https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899490/catspotter-assets/beige_nndik4.png"
								alt="beige colored fur"
							/>
						</StyledDivLabel>
						<StyledDivLabel max="170px">
							<label>Grey / blue</label>
							<img
								src="https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899490/catspotter-assets/grey_o4wizu.png"
								alt="grey or blue fur"
							/>
						</StyledDivLabel>
						<StyledDivLabel max="170px">
							<label>Brown</label>
							<img
								src="https://res.cloudinary.com/dgum1eu6e/image/upload/v1688899490/catspotter-assets/brown_u8pjpb.png"
								alt="brown"
							/>
						</StyledDivLabel>
					</StyledDivSimpleGrid>
				</StyledDivBorder>
				<StyledDivBorder page="guides" border="mobile-none">
					<StyledH4Underline>4. Notes</StyledH4Underline>
					<StyledP>
						Here you can describe anything else: eye color, collars, special
						features, etc. If you have an assumption of the breed or sex of the
						cat, you can also give it here - but if you are unsure, it is better
						to leave out those details. Try to snap a photo, it converts more
						than words ever could.
					</StyledP>
				</StyledDivBorder>
				<StyledPBig>
					If seeing a cat with injuries, apparent health issues or in any sort
					of direct danger, please do not hesitate to help it! If you can safely
					catch it, take it to the nearest vet or animal welfare center. If not,
					call help and inform the local animal welfare organisation. Thank you!
				</StyledPBig>
			</StyledSection>
		</StyledPage>
	);
}
