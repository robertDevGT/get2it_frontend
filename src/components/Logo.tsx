import { Link } from "react-router-dom";

type Props = {
  width?: number;
  height?: number;
}

export default function Logo({ width = 200, height = 120 }: Props) {
  return (
    <Link to={'/'}>
      <svg width={width} height={height} viewBox="0 0 200 120" xmlns="http://www.w3.org/2000/svg">
        <rect width="200" height="120" fill="transparent" rx="10" />

        <text x="30" y="75" font-family="Arial, sans-serif" font-size="80" font-weight="bold" fill="#2E4053">G</text>

        <text x="90" y="50" font-family="Arial, sans-serif" font-size="40" font-weight="600" fill="#28B463">ET</text>

        <text x="95" y="90" font-family="Arial, sans-serif" font-size="35" font-weight="500" fill="#2E4053">2IT</text>
      </svg>
    </Link>

  )
}
