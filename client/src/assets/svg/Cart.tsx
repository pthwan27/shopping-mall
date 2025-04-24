import * as React from "react";
import type { SVGProps } from "react";
const SvgCart = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 -0.5 25 25"
    {...props}
  >
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M5.5 16.14A3.79 3.79 0 0 0 9.22 20h6.56a3.79 3.79 0 0 0 3.72-3.86l-.436-4.687A4.09 4.09 0 0 0 16 7.75a4 4 0 0 0-1.1-.158h-4.8A4 4 0 0 0 9 7.75a4.09 4.09 0 0 0-3.062 3.7z"
      clipRule="evenodd"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M10.006 14.122a1.975 1.975 0 0 1 0-2.64 1.6 1.6 0 0 1 2.4.14.124.124 0 0 0 .18 0 1.6 1.6 0 0 1 2.4-.14c.675.751.675 1.889 0 2.64l-1.232 1.34a1.727 1.727 0 0 1-2.505 0z"
      clipRule="evenodd"
    />
    <path
      stroke="#000"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={1.5}
      d="M16 9.389V7.368A3.436 3.436 0 0 0 12.5 4 3.436 3.436 0 0 0 9 7.368v2.02"
    />
  </svg>
);
export default SvgCart;
