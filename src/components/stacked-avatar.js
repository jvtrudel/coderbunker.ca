import * as React from "react";
import { graphql, useStaticQuery } from 'gatsby';
import { GatsbyImage } from "gatsby-plugin-image";

export default function StackedAvatar({ sectionRefs, setTeamIndex }) {
  // query all team pics
  const data = useStaticQuery(graphql`{
    allFile(filter: {absolutePath: {regex: "/portraits/"}}, sort: {fields: base}) {
      edges {
        node {
          base
          childImageSharp {
            gatsbyImageData(
              width: 75,
              placeholder: BLURRED,
              layout: FIXED
            )
            id
          }
        }
      }
    }
  }`);

  const handleClick = (ev) => {
    const updatedTeamIndex = parseInt(ev.currentTarget.dataset.team)
    setTeamIndex(updatedTeamIndex)
    // Navigate to the team section
    const top = sectionRefs.current[2].offsetTop
    // Remove smooth scroll behavior to bypass the intersection observer
    window.scrollTo({ top })
  }

  const pics = data.allFile.edges;
  return (
    <div className="py-8">
      {pics.map((pic, i) => {
        const zIndex = pics.length - i;
        const translateX = i * -30;
        return (
          <button data-team={i} onClick={handleClick} key={pic.node.childImageSharp.id}>
            <GatsbyImage
              image={pic.node.childImageSharp.gatsbyImageData}
              className="inline-block rounded-full"
              style={{width: `75px`, height: `75px`, zIndex: `${zIndex}`, border: `1px solid var(--white)`, transform: `translateX(${translateX}%)`}}
              imgStyle={{objectPosition: `top center`}}
              alt="pic.node.base.split('.')[0]" />
          </button>
        );
      }).slice(0, 7)}
      {/* TODO: handle representation for members with count above 7 */}
    </div>
  );
}
