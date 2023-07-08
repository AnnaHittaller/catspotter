import { v } from "../Variables";
import styled from "styled-components";

export const StyledDivSimple = styled.div`
	display: flex;
	align-items: ${(props) => props.align || "center"};
	justify-content: ${(props) => props.justify || "space-between"};
	background-color: ${(props) => props.bgColor || "transparent"};
	padding: ${(props) => props.padding || "1rem"};
	flex-wrap: ${(props) => props.wrap || "no-wrap"};
	flex-direction: ${(props) => props.flexDirection || ""};
	width: 100%;
	gap: ${(props) => props.gap || "1rem"};
`;

export const StyledDivSimpleRounded = styled(StyledDivSimple)`
	border-radius: ${v.borderRadius};
`;

export const StyledDivSimpleGrid = styled.div`
	display: grid;
	grid-template-columns: repeat(auto-fit, minmax(${(props) => props.min}, 1fr));
	align-content: ${(props) => props.align || "center"};
	justify-content: ${(props) => props.justify || "center"};
	justify-items: ${(props) => props.justifyitems || null};
	background-color: transparent;
	padding: ${(props) => props.padding || "1rem"};
	width: 100%;
	gap: 1rem;
`;

export const StyledDivBorder = styled(StyledDivSimple)`
	border-radius: ${v.borderRadius};
	border: 3px solid ${v.cadetGrey};
	justify-content: ${(props) => props.justify || "flex-start"};

	${(props) =>
		props.border === "mobile-none" &&
		`
   @media (max-width: 500px) {
        border: none;
        padding: 1rem 0 0 0;
        
          p {
          width: ${(props) => props.mobilewidth || "100%"};
        }
        
      }
  `}

	${(props) =>
		props.page === "home" &&
		`
    padding: 2rem;
    max-width: 1400px;
    margin: 0 auto;
    justify-content: flex-start;
    gap: 2rem;
    
    span {
      display: flex;
      gap: 1ch;
    }
    
    img {
       @media (max-width: 1200px) {
        width: 100px;
        }
       @media (max-width: 1000px) {
        display: none;
        }
    }
    
    
    &:nth-of-type(2) {
      flex-direction: row-reverse;
      
      img {
        transform: rotate(170deg);
      }
      
       @media (max-width: 500px) {
        flex-direction: column-reverse;
        }
    }
    
    &:nth-of-type(3) {
      img {
        transform: rotate(10deg);
      }
    }
    
    p {
      width: 40%;
      max-width: 450px;
      font-weight: 500;
    }
    
     @media (max-width: 1000px) {
        justify-content: space-between;
        
        p {
          width: 60%;
        }
        
        span {
          flex-direction: column;
        }
        }
      
      @media (max-width: 500px) {
        flex-direction: column-reverse;
        width: 100%;
        border: none;
        padding: 0;
        
          p {
          width: 100%;
          font-size: 14px;
        }
        
        span {
          flex-direction: row;
        }
      }
  `}

  ${(props) =>
		props.page === "guides" &&
		`
    flex-direction: column;
    align-items: flex-start;
    `}
`;

export const StyledDivLabel = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: flex-start;
	position: relative;
	text-align: ${(props) => props.textAlign || "center"};
	border: 2px solid ${v.columbiaBlue};
	border-radius: ${v.borderRadius};
	padding: ${(props) => props.padding || "1rem"};
	min-width: ${(props) => props.min};
	max-width: ${(props) => props.max};
	flex: 1;
	margin-top: 1rem;
	gap: 1rem;

	> label:nth-of-type(1) {
		font-size: ${v.mdSpacing};
		font-weight: 600;
		background: ${v.babyPowder};
		border-radius: ${v.borderRadius};
		padding: 0.25rem 0.5rem;
		border: none;
		position: absolute;
		top: 0;
		left: 50%;
		transform: translate(-50%, -50%);
		white-space: nowrap;
	}

	img {
		border-radius: ${v.borderRadius};
		width: 100%;
	}

	p {
		text-align: center;
		font-size: 14px;
		font-weight: 500;
	}
`;

export const StyledDivScrollbar = styled.div``;
