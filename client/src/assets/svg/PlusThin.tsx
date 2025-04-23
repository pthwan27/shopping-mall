import * as React from "react";
import type { SVGProps } from "react";
const SvgPlusThin = (props: SVGProps<SVGSVGElement>) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" {...props}>
    <path
      stroke="current"
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M12 6v12M6 12h12"
    />
  </svg>
);
export default SvgPlusThin;
